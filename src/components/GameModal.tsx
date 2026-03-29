import React, { useState, useEffect } from 'react';
import { GameMode, QuizQuestion, getInvestmentResult } from '../data/gameData';
import { Player } from '../types/game';
import { multiplayer } from '../services/MultiplayerManager';
import { translations } from '../i18n/translations';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  mode: GameMode;
  language: 'en' | 'sr';
}

export function Modal({ onClose, children, mode, language }: ModalProps) {
  const bgClass = mode === 'finance'
    ? 'from-blue-900/90 to-indigo-900/90'
    : 'from-green-900/90 to-teal-900/90';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4" lang={language}>
      <div className="absolute inset-0 bg-black/70 animate-backdrop-fade" onClick={onClose} />
      <div className={`relative w-full sm:max-w-lg bg-gradient-to-br ${bgClass} rounded-[2rem] border border-white/20 shadow-2xl max-h-[95vh] overflow-y-auto animate-modal-pop`}>
        {children}
      </div>
    </div>
  );
}



const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

// Income Modal
interface IncomeModalProps {
  title: { en: string; sr: string };
  description: { en: string; sr: string };
  icon: string;
  mode: GameMode;
  onResult: (amount: number) => void;
  language: 'en' | 'sr';
}

export function IncomeModal({ title, description, icon, mode, onResult, language }: IncomeModalProps) {
  const [phase, setPhase] = useState<'intro' | 'rolling' | 'result'>('intro');
  const [diceValue, setDiceValue] = useState(1);
  const [displayDice, setDisplayDice] = useState(0);

  const handleRoll = () => {
    setPhase('rolling');
    const finalValue = Math.floor(Math.random() * 6) + 1;
    let frame = 0;
    const interval = setInterval(() => {
      setDisplayDice(Math.floor(Math.random() * 6));
      frame++;
      if (frame > 20) {
        clearInterval(interval);
        setDiceValue(finalValue);
        setDisplayDice(finalValue - 1);
        setPhase('result');
      }
    }, 80);
  };

  const finalAmount = diceValue * 20000;

  return (
    <Modal onClose={() => { }} mode={mode} language={language}>
      <div className="p-6 text-center">
        <div className="text-6xl mb-4 animate-bounce">{icon}</div>
        <h2 className="text-2xl font-bold text-white mb-2">{title[language]}</h2>
        <p className="text-white/70 mb-6 text-sm">{description[language]}</p>

        {phase === 'intro' && (
          <div className="space-y-6">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-4">
              <p className="text-emerald-400 font-bold mb-3 uppercase tracking-widest text-xs">
                {language === 'en' ? 'Income Formula' : 'Formula prihoda'}
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="text-3xl">🎲</div>
                <div className="text-white font-black text-xl">x</div>
                <div className="text-emerald-400 font-black text-xl">20,000 SC</div>
              </div>
            </div>
            <button
              onClick={handleRoll}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 text-lg shadow-xl shadow-emerald-500/20"
            >
              {language === 'en' ? 'ROLL TO EARN! 🎲' : 'BACI ZA ZARADU! 🎲'}
            </button>
          </div>
        )}

        {phase === 'rolling' && (
          <div className="py-8">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-2xl border-2 border-white/30 bg-white/10 flex items-center justify-center animate-dice-spin shadow-inner">
                <span className="text-6xl text-white">{diceFaces[displayDice]}</span>
              </div>
            </div>
            <p className="text-emerald-400 font-bold animate-pulse uppercase tracking-widest text-sm">
              {language === 'en' ? 'Calculating Income...' : 'Obračunavanje prihoda...'}
            </p>
          </div>
        )}

        {phase === 'result' && (
          <div className="space-y-6 animate-modal-pop">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-2xl border-2 border-emerald-400/50 bg-emerald-500/20 flex items-center justify-center shadow-lg shadow-emerald-500/10 scale-110">
                <span className="text-5xl text-white">{diceFaces[diceValue - 1]}</span>
              </div>
            </div>
            
            <div className="bg-emerald-500/30 rounded-2xl p-5 border border-emerald-400/30 shadow-inner">
              <p className="text-emerald-300 text-[10px] uppercase font-black tracking-widest mb-1">{language === 'en' ? 'TOTAL PROFIT' : 'UKUPAN PROFIT'}</p>
              <p className="text-4xl font-black text-emerald-400">+{finalAmount.toLocaleString(language === 'en' ? 'en-US' : 'sr-RS')} SC</p>
              <p className="text-emerald-200/50 text-[10px] mt-2 italic">
                {diceValue} x 20,000
              </p>
            </div>

            <p className="text-white/60 text-[10px] italic">💡 {language === 'en' ? 'Smart income management is the key to financial freedom!' : 'Pametno upravljanje prihodima je ključ finansijske slobode!'}</p>

            <button
              onClick={() => onResult(finalAmount)}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 text-lg shadow-xl"
            >
              {language === 'en' ? 'Collect & Continue ▶' : 'Pokupi i nastavi ▶'}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

// Expense Modal
interface ExpenseModalProps {
  title: { en: string; sr: string };
  description: { en: string; sr: string };
  icon: string;
  mode: GameMode;
  isInsured?: boolean;
  onResult: (amount: number) => void;
  language: 'en' | 'sr';
}

export function ExpenseModal({ title, description, icon, mode, isInsured, onResult, language }: ExpenseModalProps) {
  const [phase, setPhase] = useState<'intro' | 'rolling' | 'result'>(isInsured ? 'result' : 'intro');
  const [diceValue, setDiceValue] = useState(1);
  const [displayDice, setDisplayDice] = useState(0);

  const handleRoll = () => {
    setPhase('rolling');
    const finalValue = Math.floor(Math.random() * 6) + 1;
    let frame = 0;
    const interval = setInterval(() => {
      setDisplayDice(Math.floor(Math.random() * 6));
      frame++;
      if (frame > 20) {
        clearInterval(interval);
        setDiceValue(finalValue);
        setDisplayDice(finalValue - 1);
        setPhase('result');
      }
    }, 80);
  };

  const finalAmount = isInsured ? 0 : diceValue * 20000;

  return (
    <Modal onClose={() => { }} mode={mode} language={language}>
      <div className="p-6 text-center">
        <div className="relative">
          <div className="text-6xl mb-4">{icon}</div>
          {!isInsured && (
            <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-black px-2 py-1 rounded-full animate-pulse shadow-lg">
              {language === 'en' ? 'LIABILITY' : 'OBAVEZA'}
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">{title[language]}</h2>
        <p className="text-white/70 mb-6 text-sm">{description[language]}</p>

        {phase === 'intro' && (
          <div className="space-y-6">
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 mb-4">
              <p className="text-rose-400 font-bold mb-3 uppercase tracking-widest text-xs">
                {language === 'en' ? 'Expense Formula' : 'Formula troška'}
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="text-3xl">🎲</div>
                <div className="text-white font-black text-xl">x</div>
                <div className="text-rose-400 font-black text-xl">20,000 SC</div>
              </div>
            </div>
            <button
              onClick={handleRoll}
              className="w-full bg-rose-500 hover:bg-rose-400 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 text-lg shadow-xl shadow-rose-500/20"
            >
              {language === 'en' ? 'ROLL TO PAY! 🎲' : 'BACI ZA PLAĆANJE! 🎲'}
            </button>
          </div>
        )}

        {phase === 'rolling' && (
          <div className="py-8">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-2xl border-2 border-white/30 bg-white/10 flex items-center justify-center animate-dice-spin shadow-inner">
                <span className="text-6xl text-white">{diceFaces[displayDice]}</span>
              </div>
            </div>
            <p className="text-rose-400 font-bold animate-pulse uppercase tracking-widest text-sm">
              {language === 'en' ? 'Calculating Expense...' : 'Obračunavanje troškova...'}
            </p>
          </div>
        )}

        {phase === 'result' && (
          <div className="space-y-6 animate-modal-pop">
            {!isInsured && (
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-2xl border-2 border-rose-400/50 bg-rose-500/20 flex items-center justify-center shadow-lg shadow-rose-500/10 scale-110">
                  <span className="text-5xl text-white">{diceFaces[diceValue - 1]}</span>
                </div>
              </div>
            )}
            
            <div className={`${isInsured ? 'bg-emerald-500/30 border-emerald-400/30' : 'bg-rose-500/30 border-rose-400/30'} rounded-2xl p-5 border shadow-inner`}>
              <p className={`${isInsured ? 'text-emerald-300' : 'text-rose-300'} text-[10px] uppercase font-black tracking-widest mb-1`}>
                {isInsured ? (language === 'en' ? '🛡️ PROTECTED' : '🛡️ ZAŠTIĆENO') : (language === 'en' ? 'TOTAL DEBT' : 'UKUPAN DUG')}
              </p>
              <p className={`text-4xl font-black ${isInsured ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isInsured ? '0 SC' : `-${finalAmount.toLocaleString(language === 'en' ? 'en-US' : 'sr-RS')} SC`}
              </p>
              {!isInsured && (
                 <p className="text-rose-200/50 text-[10px] mt-2 italic">
                  {diceValue} x 20,000
                </p>
              )}
            </div>

            {isInsured ? (
              <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl p-3 mb-6 animate-pulse">
                <p className="text-emerald-400 font-black text-xs uppercase mb-1 tracking-tighter">{language === 'en' ? '🛡️ Insurance Covered!' : '🛡️ Osiguranje pokriveno!'}</p>
                <p className="text-[10px] text-emerald-100/70">{language === 'en' ? 'Your insurance saved you from this expense.' : 'Vaše osiguranje vas je poštedelo ovog troška.'}</p>
              </div>
            ) : (
              <p className="text-white/60 text-[10px] italic">💡 {language === 'en' ? 'Always keep an emergency fund for 3-6 months of expenses!' : 'Uvek imajte fond za hitne slučajeve za 3-6 meseci troškova!'}</p>
            )}

            <button
              onClick={() => onResult(finalAmount)}
              className={`w-full ${isInsured ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-rose-500 hover:bg-rose-400'} text-white font-bold py-4 rounded-2xl transition-all active:scale-95 text-lg shadow-xl`}
            >
              {isInsured ? (language === 'en' ? 'Thank you Insurance ▶' : 'Hvala osiguranju ▶') : (language === 'en' ? 'Continue ▶' : 'Nastavi ▶')}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

// Quiz Modal
interface QuizModalProps {
  quiz: QuizQuestion;
  mode: GameMode;
  onResult: (correct: boolean, reward: number, penalty: number) => void;
  language: 'en' | 'sr';
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];
const OPTION_COLORS = [
  { base: 'bg-blue-500/20 border-blue-400/30 hover:bg-blue-500/40 text-blue-100', selected: 'bg-blue-500/60 border-blue-300 text-white', correct: 'bg-emerald-500/40 border-emerald-400 text-emerald-100', wrong: 'bg-rose-500/40 border-rose-400 text-rose-100' },
  { base: 'bg-purple-500/20 border-purple-400/30 hover:bg-purple-500/40 text-purple-100', selected: 'bg-purple-500/60 border-purple-300 text-white', correct: 'bg-emerald-500/40 border-emerald-400 text-emerald-100', wrong: 'bg-rose-500/40 border-rose-400 text-rose-100' },
  { base: 'bg-amber-500/20 border-amber-400/30 hover:bg-amber-500/40 text-amber-100', selected: 'bg-amber-500/60 border-amber-300 text-white', correct: 'bg-emerald-500/40 border-emerald-400 text-emerald-100', wrong: 'bg-rose-500/40 border-rose-400 text-rose-100' },
  { base: 'bg-teal-500/20 border-teal-400/30 hover:bg-teal-500/40 text-teal-100', selected: 'bg-teal-500/60 border-teal-300 text-white', correct: 'bg-emerald-500/40 border-emerald-400 text-emerald-100', wrong: 'bg-rose-500/40 border-rose-400 text-rose-100' },
];

export function QuizModal({ quiz, mode, onResult, language }: QuizModalProps) {
  const tDict = translations[language];
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (answered) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer);
          if (!answered) {
            handleSelect(-1); // Timeout as wrong answer
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [answered]);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const isCorrect = idx === quiz.correct;
    setTimeout(() => {
      onResult(isCorrect, quiz.reward, quiz.penalty);
    }, 2200);
  };

  const getOptionClass = (idx: number) => {
    const c = OPTION_COLORS[idx];
    if (!answered) return `${c.base} cursor-pointer`;
    if (idx === quiz.correct) return `${c.correct} cursor-default`;
    if (idx === selected && idx !== quiz.correct) return `${c.wrong} cursor-default`;
    return `bg-white/5 border-white/10 text-white/30 cursor-default`;
  };

  const timerColor = timeLeft > 15 ? 'text-emerald-400' : timeLeft > 8 ? 'text-amber-400' : 'text-rose-400';

  return (
    <Modal onClose={() => { }} mode={mode} language={language}>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">❓</div>
          <div className="flex-1">
            <p className="text-white/60 text-xs uppercase tracking-wider">{language === 'en' ? 'Quiz Question' : 'Kviz pitanje'}</p>
            <p className="text-white font-semibold text-sm">{mode === 'finance' ? (language === 'en' ? '💼 Financial Literacy' : '💼 Finansijska pismenost') : (language === 'en' ? '🌱 Sustainability' : '🌱 Održivost')}</p>
          </div>
          {!answered && (
            <div className={`text-2xl font-black mr-2 ${timerColor} animate-pulse`}>
              {timeLeft}s
            </div>
          )}
          <div className="flex gap-2">
            <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-lg px-2 py-1 text-center">
              <p className="text-emerald-300 text-[10px]">✅ {language === 'en' ? 'Win' : 'Dobitak'}</p>
              <p className="text-emerald-400 font-black text-xs">+{quiz.reward.toLocaleString(language === 'en' ? 'en-US' : 'sr-RS')} SC</p>
            </div>
            <div className="bg-rose-500/20 border border-rose-400/30 rounded-lg px-2 py-1 text-center">
              <p className="text-rose-300 text-[10px]">❌ {language === 'en' ? 'Lose' : 'Gubitak'}</p>
              <p className="text-rose-400 font-black text-xs">-{quiz.penalty.toLocaleString(language === 'en' ? 'en-US' : 'sr-RS')} SC</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 mb-4 border border-white/10">
          <p className="text-white text-sm font-semibold leading-snug">{quiz.question[language]}</p>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          {quiz.options[language].map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={answered}
              className={`
                w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200
                text-sm font-medium leading-snug active:scale-98
                ${getOptionClass(idx)}
              `}
            >
              <span className="font-black mr-2">{OPTION_LABELS[idx]})</span>
              {option.replace(/^[A-D]\)\s*/, '')}
              {answered && idx === quiz.correct && <span className="float-right ml-2 font-serif">✅</span>}
              {answered && idx === selected && idx !== quiz.correct && <span className="float-right ml-2 font-serif">❌</span>}
            </button>
          ))}
        </div>

        {answered && (
          <div className={`rounded-2xl p-3 border animate-fade-in ${selected === quiz.correct ? 'bg-emerald-500/20 border-emerald-400/30' : 'bg-rose-500/20 border-rose-400/30'}`}>
            <p className="text-white font-black text-base mb-1">
              {selected === quiz.correct ? tDict.modals.correct : tDict.modals.wrong}
            </p>
            <p className="text-white/80 text-xs leading-relaxed mb-2">{quiz.explanation[language]}</p>
            <p className={`font-black text-lg ${selected === quiz.correct ? 'text-emerald-400' : 'text-rose-400'}`}>
              {selected === quiz.correct ? `+${quiz.reward.toLocaleString(language === 'en' ? 'en-US' : 'sr-RS')} SC` : `-${quiz.penalty.toLocaleString(language === 'en' ? 'en-US' : 'sr-RS')} SC`}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}




// Switch Modal
interface SwitchModalProps {
  fromMode: GameMode;
  toMode: GameMode;
  onClose: () => void;
  language: 'en' | 'sr';
}

export function SwitchModal({ fromMode, toMode, onClose, language }: SwitchModalProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const patternClass = toMode === 'finance' ? 'bg-finance-pattern' : 'bg-eco-pattern';
  const gradientClass = toMode === 'finance'
    ? 'from-blue-900/95 via-indigo-950/98 to-slate-900/98 border-blue-400/30'
    : 'from-green-900/95 via-teal-950/98 to-slate-900/98 border-green-400/30';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 animate-backdrop-fade" />
      <div className={`relative w-full max-w-sm bg-gradient-to-br ${gradientClass} ${patternClass} rounded-3xl border shadow-2xl p-8 text-center animate-modal-pop overflow-hidden`}>

        <div className={`absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-20 ${toMode === 'finance' ? 'bg-blue-400' : 'bg-green-400'}`} />
        <div className={`absolute -bottom-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 ${toMode === 'finance' ? 'bg-indigo-400' : 'bg-teal-400'}`} />

        <div className="relative z-10 text-6xl mb-4 animate-bounce">🔄</div>
        <h2 className="text-2xl font-black text-white mb-4">{language === 'en' ? 'Topic Switched!' : 'Tema promenjena!'}</h2>

        <div className="flex items-center justify-center gap-6 mb-5">
          <div className="flex flex-col items-center gap-1">
            <span className="text-4xl">{fromMode === 'finance' ? '💼' : '🌱'}</span>
            <span className="text-white/40 text-xs">{fromMode === 'finance' ? (language === 'en' ? 'Finance' : 'Finansije') : (language === 'en' ? 'Sustainability' : 'Održivost')}</span>
          </div>
          <div className="text-white/30 text-3xl font-bold">→</div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-4xl">{toMode === 'finance' ? '💼' : '🌱'}</span>
            <span className={`text-xs font-bold ${toMode === 'finance' ? 'text-blue-300' : 'text-green-300'}`}>
              {toMode === 'finance' ? (language === 'en' ? 'Finance' : 'Finansije') : (language === 'en' ? 'Environment' : 'Ekologija')}
            </span>
          </div>
        </div>

        <div className={`rounded-2xl p-4 mb-6 border ${toMode === 'sustainability'
          ? 'bg-green-500/20 border-green-400/30'
          : 'bg-blue-500/20 border-blue-400/30'
          }`}>
          <p className={`text-lg font-bold mb-1 ${toMode === 'sustainability' ? 'text-green-300' : 'text-blue-300'}`}>
            {toMode === 'sustainability' ? (language === 'en' ? '🌱 Now in Environment Mode!' : '🌱 Sada u ekološkom modu!') : (language === 'en' ? '💼 Now in Finance Mode!' : '💼 Sada u finansijskom modu!')}
          </p>
          <p className="text-white/60 text-sm leading-relaxed">
            {toMode === 'sustainability'
              ? (language === 'en' ? 'Questions are now about ecology, ESG and green energy.' : 'Pitanja su sada o ekologiji, ESG kriterijumima i zelenoj energiji.')
              : (language === 'en' ? 'Questions are now about budgeting, investing and finance.' : 'Pitanja su sada o budžetiranju, investiranju i finansijama.')}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white/30 animate-pulse" />
          <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">
            {language === 'en' ? 'Closing Automatically...' : 'Zatvaranje automatski...'}
          </p>
        </div>
      </div>
    </div>
  );
}

// Investment Modal
interface InvestmentModalProps {
  balance: number;
  mode: GameMode;
  onResult: (profit: number, stake: number, multiplier: number) => void;
  language: 'en' | 'sr';
}

export function InvestmentModal({ balance, mode, onResult, language }: InvestmentModalProps) {
  const [phase, setPhase] = useState<'choose' | 'rolling' | 'result'>('choose');
  const [investAmount, setInvestAmount] = useState(0);
  const [diceValue, setDiceValue] = useState(1);
  const [displayDice, setDisplayDice] = useState(0);
  const [resultInfo, setResultInfo] = useState<{ multiplier: number; message: { en: string; sr: string }; result: 'lose' | 'even' | 'win' } | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (phase !== 'choose') return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer);
          if (phase === 'choose') {
            handleSkip();
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  const investOptions = [5000, 25000, 75000, 100000];

  const handleInvest = (amount: number) => {
    setInvestAmount(amount);
    setPhase('rolling');

    const finalValue = Math.floor(Math.random() * 6) + 1;
    let frame = 0;
    const interval = setInterval(() => {
      setDisplayDice(Math.floor(Math.random() * 6));
      frame++;
      if (frame > 20) {
        clearInterval(interval);
        setDiceValue(finalValue);
        setDisplayDice(finalValue - 1);
        const res = getInvestmentResult(finalValue);
        setResultInfo(res);
        setPhase('result');
      }
    }, 80);
  };

  const handleClose = () => {
    if (!resultInfo) return;
    const profit = Math.round(investAmount * resultInfo.multiplier) - investAmount;
    onResult(profit, investAmount, resultInfo.multiplier);
  };

  const handleSkip = () => {
    onResult(0, 0, 1.0);
  };

  const timerColor = timeLeft > 15 ? 'text-emerald-400' : timeLeft > 8 ? 'text-amber-400' : 'text-rose-400';

  return (
    <Modal onClose={() => { }} mode={mode} language={language}>
      <div className="p-6 text-center relative">
        {phase === 'choose' && (
          <div className={`absolute top-6 right-6 text-2xl font-black ${timerColor} animate-pulse`}>
            {timeLeft}s
          </div>
        )}
        <div className="text-5xl mb-3">📊</div>
        <h2 className="text-2xl font-bold text-white mb-1">{language === 'en' ? 'Investment' : 'Investicija'}</h2>
        <p className="text-white/60 text-sm mb-4">{language === 'en' ? 'The fate of your investment depends on luck.' : 'Sudbina vaše investicije zavisi od sreće.'}</p>

        {phase === 'choose' && (
          <>
            <div className="bg-white/10 rounded-2xl p-4 mb-4 border border-white/10">
              <p className="text-white/60 text-xs uppercase tracking-wider mb-1">{language === 'en' ? 'Your Capital' : 'Vaš kapital'}</p>
              <p className="text-2xl font-black text-white">{balance.toLocaleString(language === 'en' ? 'en-US' : 'sr-RS')} SC</p>
            </div>

            <div className="bg-white/5 rounded-xl p-3 mb-4 border border-white/10">
              <p className="text-white/50 text-xs mb-2">{language === 'en' ? 'Outcomes:' : 'Ishodi:'}</p>
              <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                <div className="bg-rose-500/20 rounded-lg p-1.5 text-rose-300">⚀ 1=0x</div>
                <div className="bg-rose-500/15 rounded-lg p-1.5 text-rose-300">⚁ 2=0x</div>
                <div className="bg-rose-500/10 rounded-lg p-1.5 text-rose-300">⚂ 3=0.5x</div>
                <div className="bg-white/10 rounded-lg p-1.5 text-white/60">⚃ 4=1x</div>
                <div className="bg-emerald-500/20 rounded-lg p-1.5 text-emerald-300">⚄ 5=2x</div>
                <div className="bg-yellow-500/20 rounded-lg p-1.5 text-yellow-300 font-bold">⚅ 6=4x</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {investOptions.map(amount => {
                const canAfford = balance >= amount;
                return (
                  <button
                    key={amount}
                    disabled={!canAfford}
                    onClick={() => handleInvest(amount)}
                    className={`font-bold py-3 rounded-xl border transition-all ${canAfford ? "bg-blue-500/30 hover:bg-blue-500/50 border-blue-400/30 text-white" : "bg-gray-800 border-white/5 text-white/20 cursor-not-allowed"}`}
                  >
                    {amount.toLocaleString(language === 'en' ? 'en-US' : 'sr-RS')} SC
                  </button>
                );
              })}
            </div>
            <button onClick={handleSkip} className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-xl transition-all text-sm">{language === 'en' ? 'Skip Investment' : 'Preskoči investiciju'} ▶</button>
          </>
        )}

        {phase === 'rolling' && (
          <>
            <p className="text-white/70 mb-4">{language === 'en' ? 'Invested' : 'Investirano'}: <span className="text-blue-400 font-bold">{investAmount.toLocaleString(language === 'en' ? 'en-US' : 'sr-RS')} SC</span></p>
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-2xl border-2 border-white/30 bg-white/10 flex items-center justify-center animate-dice-spin">
                <span className="text-6xl">{diceFaces[displayDice]}</span>
              </div>
            </div>
          </>
        )}

        {phase === 'result' && resultInfo && (
          <>
            <p className="text-white/70 mb-3">{language === 'en' ? 'Invested' : 'Investirano'}: <span className="text-blue-400 font-bold">{investAmount.toLocaleString(language === 'en' ? 'en-US' : 'sr-RS')} SC</span></p>
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-2xl border-2 border-white/30 bg-white/10 flex items-center justify-center relative">
                <span className="text-5xl">{diceFaces[diceValue - 1]}</span>
              </div>
            </div>
            <p className="text-lg font-bold text-white mb-3">{resultInfo.message[language]}</p>
            <div className={`rounded-2xl p-4 mb-4 border ${resultInfo.result === 'win' ? 'bg-emerald-500/20 border-emerald-400/30' : resultInfo.result === 'lose' ? 'bg-rose-500/20 border-rose-400/30' : 'bg-white/10 border-white/20'}`}>
              <p className="text-2xl font-black text-white">{(Math.round(investAmount * resultInfo.multiplier) - investAmount).toLocaleString(language === 'en' ? 'en-US' : 'sr-RS')}</p>
            </div>
            <button onClick={handleClose} className={`w-full font-bold py-4 rounded-2xl transition-all text-lg ${resultInfo.result === 'win' ? 'bg-emerald-500 hover:bg-emerald-400 text-white' : 'bg-rose-500 hover:bg-rose-400 text-white'}`}>{language === 'en' ? 'Continue' : 'Nastavi'} ▶</button>
          </>
        )}
      </div>
    </Modal>
  );
}

// ── TAX SMALL MODAL ──
export function TaxSmallModal({ taxExemptionTurns, onClose, mode, amount, language }: { taxExemptionTurns: number, onClose: () => void, mode: GameMode, amount: number, language: 'en' | 'sr' }) {
  const isExempt = taxExemptionTurns > 0;

  useEffect(() => {
    if (isExempt) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [onClose, isExempt]);

  return (
    <Modal onClose={() => { }} mode={mode} language={language}>
      <div className="p-6 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-white mb-2">{language === 'en' ? 'Caution!' : 'Pažnja!'}</h2>
        {isExempt ? (
          <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-2xl p-6 mb-4">
            <p className="text-emerald-400 font-bold text-xl mb-1 text-center">{language === 'en' ? '🛡️ Tax Exempted!' : '🛡️ Oslobođeni poreza!'}</p>
            <p className="text-white/40 text-[10px] mt-2">
              {language === 'en' ? `You are safe from collection for ${taxExemptionTurns} more turns.` : `Sigurni ste od naplate još ${taxExemptionTurns} poteza.`}
            </p>
          </div>
        ) : (
          <>
            <div className="bg-amber-500/20 border border-amber-400/30 rounded-2xl p-6 mb-4">
              <p className="text-amber-400 font-bold text-lg mb-2">{language === 'en' ? 'Vulnerable Zone' : 'Ranjiva zona'}</p>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                {language === 'en' ? 'You are standing on a small tax field. This incurs a fee and makes you vulnerable to large tax collections!' : 'Nalazite se na polju za mali porez. Ovo povlači naknadu i čini vas ranjivim na velike naplate poreza!'}
              </p>
              <div className="bg-rose-500/20 border border-rose-500/30 rounded-xl p-3 inline-block">
                <p className="text-rose-400 font-black text-xl">{language === 'en' ? 'Tax Fee' : 'Taksa'}: {amount.toLocaleString(language === 'en' ? 'en-US' : 'sr-RS')} SC</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-rose-500 hover:bg-rose-400 text-white font-black py-4 rounded-2xl transition-all shadow-lg active:scale-95"
            >
              {language === 'en' ? 'PAY TAX & CONTINUE' : 'PLATI POREZ I NASTAVI'}
            </button>
          </>
        )}
        {isExempt && <p className="text-white/30 text-[10px] animate-pulse">{language === 'en' ? 'Closing in 3s...' : 'Zatvaranje za 3s...'}</p>}
      </div>
    </Modal>
  );
}

// ── TAX LARGE MODAL ──
interface TaxLargeModalProps {
  targets: Player[];
  onCollect: (targetIds: string[]) => void;
  onClose: () => void;
  mode: GameMode;
  language: 'en' | 'sr';
}

export function TaxLargeModal({ targets, onCollect, onClose, mode, language }: TaxLargeModalProps) {
  const amountPerPlayer = 35000;
  const totalPotential = targets.length * amountPerPlayer;

  return (
    <Modal onClose={onClose} mode={mode} language={language}>
      <div className="p-6 text-center">
        <div className="text-6xl mb-4 animate-pulse">🏦</div>
        <h2 className="text-2xl font-bold text-white mb-2">{language === 'en' ? 'Tax Inspection' : 'Poreska inspekcija'}</h2>
        <p className="text-white/60 text-sm mb-6 italic">{language === 'en' ? 'Collect taxes from players currently on small tax fields.' : 'Naplatite porez od igrača koji su trenutno na poljima malog poreza.'}</p>

        {targets.length > 0 ? (
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 max-h-48 overflow-y-auto">
              <p className="text-[10px] text-white/40 uppercase font-bold mb-3 tracking-widest">{language === 'en' ? 'Liable Players:' : 'Obveznici:'}</p>
              <div className="space-y-2">
                {targets.map(p => (
                  <div key={p.id} className="flex items-center justify-between bg-white/5 p-2 rounded-xl">
                    <div className="flex items-center gap-2">
                      <img
                        src={`/assets/${p.avatar}.png`}
                        alt=""
                        className="w-8 h-8 object-contain rounded-lg bg-white/5 p-1"
                      />
                      <span className="text-xs font-medium text-white">{p.name}</span>
                    </div>
                    <span className="text-rose-400 text-xs font-bold">{p.taxExemptTurns > 0 ? (language === 'en' ? '🛡️ EXEMPT' : '🛡️ OSLOBOĐEN') : `-${amountPerPlayer.toLocaleString(language === 'en' ? 'en-US' : 'sr-RS')} SC`}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-2xl p-4">
              <p className="text-white/60 text-[10px] uppercase font-bold tracking-widest mb-1">{language === 'en' ? 'Total Collection' : 'Ukupna naplata'}</p>
              <p className="text-3xl font-black text-emerald-400">{totalPotential.toLocaleString(language === 'en' ? 'en-US' : 'sr-RS')} SC</p>
            </div>

            <button
              onClick={() => onCollect(targets.filter(p => p.taxExemptTurns === 0).map(p => p.id))}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-emerald-500/20 text-lg"
            >
              {language === 'en' ? 'COLLECT ALL 💰' : 'NAPLATI SVE 💰'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-rose-500/10 border border-rose-400/20 rounded-2xl p-8">
              <p className="text-rose-300 font-bold mb-2">{language === 'en' ? 'No Takers!' : 'Nema obveznika!'}</p>
              <p className="text-white/40 text-xs">{language === 'en' ? 'There are no players currently on small tax fields. You collect nothing this time.' : 'Trenutno nema igrača na poljima malog poreza. Ovog puta ne naplaćujete ništa.'}</p>
            </div>
            <button onClick={onClose} className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 rounded-2xl transition-all">{language === 'en' ? 'Continue' : 'Nastavi'} ▶</button>
          </div>
        )}
      </div>
    </Modal>
  );
}

// ── AUCTION MODAL ──
interface AuctionModalProps {
  onResult: (won: boolean) => void;
  mode: GameMode;
  players: Player[];
  currentPlayerIndex: number;
  canContinue?: boolean;
  language: 'en' | 'sr';
}

export function AuctionModal({ onResult, mode, players, currentPlayerIndex, canContinue = true, language }: AuctionModalProps) {
  const [hasRolled, setHasRolled] = useState(false);
  const myId = multiplayer.getMyId();
  const auctionState = multiplayer.state.auction;
  const isHost = players.find(p => p.id === myId)?.isHost;

  useEffect(() => {
    if (isHost && !auctionState.active) {
      multiplayer.sendAction({ type: 'ACTION_AUCTION_START' });
    }
  }, [isHost]);

  const handleRoll = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    multiplayer.sendAction({ type: 'ACTION_AUCTION_ROLL', roll });
    setHasRolled(true);
  };

  const rolls = auctionState.rolls || {};
  const turnIndex = auctionState.turnIndex || 0;
  const allRolled = turnIndex >= players.length;

  let winnerId: string | null = null;
  if (allRolled) {
    const rollsList = Object.entries(rolls);
    const maxVal = Math.max(...rollsList.map(([_, r]) => r));
    const winners = players.filter(p => rolls[p.id] === maxVal);
    winnerId = winners[0]?.id || null;
  }

  const myIndex = players.findIndex(p => p.id === myId);
  const isMyTurnToRoll = myIndex === turnIndex;
  const activeRoller = players[turnIndex] || players[0];

  return (
    <Modal onClose={() => { }} mode={mode} language={language}>
      <div className="p-6 text-center">
        <div className="text-6xl mb-4">⚖️</div>
        <h2 className="text-2xl font-bold text-white mb-2">{language === 'en' ? 'Multiplayer Auction' : 'Multiplayer aukcija'}</h2>
        <p className="text-white/70 mb-6 italic text-sm">{language === 'en' ? 'Everyone in the session is rolling for the Exemption Card!' : 'Svi u sesiji se takmiče za karticu oslobađanja od poreza!'}</p>

        {!allRolled ? (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-4 text-center">
              <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">{language === 'en' ? 'Upcoming Roller' : 'Sledeći na redu'}:</p>
              <div className="flex items-center justify-center gap-2">
                <img
                  src={`/assets/${activeRoller.avatar}.png`}
                  alt=""
                  className="w-8 h-8 object-contain"
                />
                <span className="text-white font-bold">{activeRoller.name} {activeRoller.id === myId && `(${language === 'en' ? 'You' : 'Ti'})`}</span>
              </div>
            </div>

            <button
              onClick={handleRoll}
              disabled={!isMyTurnToRoll || hasRolled}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-xl ${!isMyTurnToRoll || hasRolled
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:scale-105 active:scale-95 shadow-amber-900/40'
                }`}
            >
              {hasRolled ? (language === 'en' ? 'Rolled! ⏳' : 'Bačeno! ⏳') : isMyTurnToRoll ? (language === 'en' ? 'Roll Dice! 🎲' : 'Baci kockicu! 🎲') : (language === 'en' ? 'Waiting for Turn... ⏳' : 'Čekanje na red... ⏳')}
            </button>

            <div className="grid grid-cols-3 gap-3">
              {players.map(p => {
                const pRoll = rolls[p.id];
                const isRollingNow = players[turnIndex]?.id === p.id;
                return (
                  <div key={p.id} className="flex flex-col items-center gap-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl border-2 transition-all ${pRoll
                      ? 'bg-emerald-500/20 border-emerald-400'
                      : isRollingNow
                        ? 'bg-blue-500/20 border-blue-400 animate-pulse'
                        : 'bg-white/5 border-white/10 opacity-50'
                      }`}>
                      {pRoll ? pRoll : '🎲'}
                    </div>
                    <span className={`text-[10px] truncate w-16 text-center ${isRollingNow ? 'text-blue-400 font-bold' : 'text-white/40'}`}>
                      {p.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-2 mb-6 max-h-40 overflow-y-auto pr-1">
              {players.map(p => (
                <div key={p.id} className={`flex items-center justify-between p-3 rounded-xl border ${p.id === winnerId ? 'bg-emerald-500/20 border-emerald-400/40' : 'bg-white/5 border-white/5'}`}>
                  <div className="flex items-center gap-2">
                    <img
                      src={`/assets/${p.avatar}.png`}
                      alt=""
                      className="w-6 h-6 object-contain"
                    />
                    <span className={`text-xs font-bold ${p.id === winnerId ? 'text-emerald-300' : 'text-white/60'}`}>{p.name}</span>
                  </div>
                  <span className={`font-black text-xl ${p.id === winnerId ? 'text-emerald-400' : 'text-white/40'}`}>{rolls[p.id]}</span>
                </div>
              ))}
            </div>
            <div className={`rounded-2xl p-4 mb-6 ${winnerId === multiplayer.getMyId() ? 'bg-emerald-500/20 border border-emerald-400/30' : 'bg-white/5 border border-white/10'}`}>
              <p className="text-white font-bold text-center">
                {winnerId === multiplayer.getMyId() ? (language === 'en' ? '🎉 You Won Tax Exemption!' : '🎉 Osvojili ste oslobađanje od poreza!') : `😢 ${players.find(p => p.id === winnerId)?.name} ${language === 'en' ? 'Won' : 'je pobedio'}!`}
              </p>
            </div>
            {canContinue ? (
              <button onClick={() => onResult(winnerId === players[currentPlayerIndex].id)} className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-95 animate-pulse">
                {language === 'en' ? 'Continue' : 'Nastavi'} ▶
              </button>
            ) : (
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 italic text-white/40 text-sm">
                {language === 'en' ? `Waiting for ${players[currentPlayerIndex]?.name} to continue...` : `Čekanje da ${players[currentPlayerIndex]?.name} nastavi...`}
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
}

// ── JAIL MODAL ──
export function JailModal({ title, description, icon, jailFine, balance, mode, onPay, onSkip, language }: { title: { en: string, sr: string }, description: { en: string, sr: string }, icon: string, jailFine: number, balance: number, mode: GameMode, onPay: () => void, onSkip: () => void, language: 'en' | 'sr' }) {
  const canAfford = balance >= jailFine;
  return (
    <Modal onClose={() => { }} mode={mode} language={language}>
      <div className="p-6 text-center">
        <div className="text-5xl mb-4">{icon}</div>
        <h2 className="text-2xl font-bold text-white mb-2">{title[language]}</h2>
        <p className="text-white/60 text-sm mb-6">{description[language]}</p>

        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 mb-6">
          <p className="text-rose-400 text-[10px] uppercase font-bold tracking-widest mb-1">{language === 'en' ? 'Get out fine' : 'Kazna za izlazak'}</p>
          <p className="text-3xl font-black text-white">{jailFine.toLocaleString(language === 'en' ? 'en-US' : 'sr-RS')} SC</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onSkip}
            className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 rounded-2xl transition-all active:scale-95"
          >
            {language === 'en' ? 'Skip Turn' : 'Preskoči red'}
          </button>
          <button
            onClick={onPay}
            disabled={!canAfford}
            className={`font-bold py-4 rounded-2xl transition-all ${canAfford
              ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/20"
              : "bg-gray-800 text-white/20 cursor-not-allowed border border-white/5"
              }`}
          >
            {language === 'en' ? 'Pay and Continue' : 'Plati i nastavi'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ── INSURANCE MODAL ──
export function InsuranceModal({ balance, price, onBuy, onClose, mode, language }: { balance: number, price: number, onBuy: (price: number) => void, onClose: () => void, mode: GameMode, language: 'en' | 'sr' }) {
  const canAfford = balance >= price;
  return (
    <Modal onClose={onClose} mode={mode} language={language}>
      <div className="p-6 text-center">
        <div className="text-6xl mb-4">🛡️</div>
        <h2 className="text-2xl font-bold text-white mb-2">{language === 'en' ? 'Purchase Insurance' : 'Kupite osiguranje'}</h2>
        <p className="text-white/60 text-sm mb-6">{language === 'en' ? 'Invest in insurance to stay exempt from taxes and fees for the next 3 rounds.' : 'Investirajte u osiguranje kako biste bili oslobođeni poreza i naknada u naredna 3 kruga.'}</p>

        <div className="bg-amber-500/20 border border-amber-400/30 rounded-2xl p-4 mb-6 text-center">
          <p className="text-amber-300 text-[10px] uppercase mb-1 tracking-widest font-bold">{language === 'en' ? 'Insurance Premium' : 'Premija osiguranja'}</p>
          <p className="text-4xl font-black text-amber-400">{price.toLocaleString(language === 'en' ? 'en-US' : 'sr-RS')} SC</p>
        </div>

        {!canAfford && (
          <div className="bg-rose-500/20 border border-rose-400/30 rounded-xl p-3 mb-6">
            <p className="text-rose-400 text-sm font-bold">⚠️ {language === 'en' ? 'Insufficient Funds' : 'Nedovoljno sredstava'}</p>
            <p className="text-white/60 text-xs">{language === 'en' ? 'You cannot afford this insurance right now.' : 'Trenutno ne možete priuštiti ovo osiguranje.'}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 rounded-2xl transition-all active:scale-95"
          >
            ❌ {language === 'en' ? 'Skip' : 'Preskoči'}
          </button>
          <button
            onClick={() => onBuy(price)}
            disabled={!canAfford}
            className={`font-bold py-4 rounded-2xl transition-all ${canAfford
              ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/20 scale-105"
              : "bg-gray-700 text-white/30 cursor-not-allowed border border-white/5 opacity-50"
              }`}
          >
            ✅ {language === 'en' ? 'Buy' : 'Kupi'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ── VICTORY MODAL ──
interface VictoryModalProps {
  players: Player[];
  language: 'en' | 'sr';
}

export function VictoryModal({ players, language }: VictoryModalProps) {
  const sortedPlayers = [...players].sort((a, b) => b.capital - a.capital);
  const winner = sortedPlayers[0];
  const t = translations[language];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl p-4 sm:p-8 my-auto overflow-hidden">
        {/* Animated Background effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-blue-500/20 to-transparent blur-3xl" />

        <div className="relative z-10 text-center">
          <div className="text-5xl sm:text-7xl mb-2 sm:mb-4 animate-bounce">🏆</div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mb-1 sm:mb-2 uppercase tracking-tighter">{language === 'en' ? 'Game Over!' : 'Kraj igre!'}</h1>
          <p className="text-white/50 text-[10px] sm:text-base mb-4 sm:mb-8 italic leading-tight">{language === 'en' ? 'The first player to reach 1,000,000 has been crowned!' : 'Prvi igrač koji je dostigao 1,000,000 je pobednik!'}</p>

          {/* Winner Stats */}
          <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-400/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-8 text-left">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shrink-0">
                <img
                  src={`/assets/${winner.avatar}.png`}
                  alt=""
                  className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
                />
              </div>
              <div className="min-w-0">
                <div className="text-[8px] sm:text-[10px] text-blue-400 font-bold uppercase tracking-widest">{language === 'en' ? 'Winner' : 'Pobednik'}</div>
                <div className="text-lg sm:text-2xl font-black text-white truncate">{winner.name}</div>
              </div>
              <div className="ml-auto text-right shrink-0">
                <div className="text-[8px] sm:text-[10px] text-white/40 uppercase font-bold tracking-widest">{t.stats.total_capital}</div>
                <div className="text-lg sm:text-2xl font-black text-green-400">{winner.capital.toLocaleString(language === 'en' ? 'en-US' : 'sr-RS')} SC</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              <StatItem label={t.stats.correct_quizzes} value={winner.stats.correctQuizzes} icon="✅" />
              <StatItem label={t.stats.wrong_quizzes} value={winner.stats.wrongQuizzes} icon="❌" />
              <StatItem label={t.stats.auction_wins} value={winner.stats.auctionWins} icon="⚖️" />
              <StatItem label={t.stats.investment_gains} value={`${winner.stats.investmentGains.toLocaleString(language === 'en' ? 'en-US' : 'sr-RS')} SC`} icon="📈" />
              <StatItem label={t.stats.investment_losses} value={`${winner.stats.investmentLosses.toLocaleString(language === 'en' ? 'en-US' : 'sr-RS')} SC`} icon="📉" />
              <StatItem label={t.stats.jail_visits} value={winner.stats.jailVisits} icon="🔒" />
            </div>
          </div>

          {/* Rankings - Hide in Singleplayer */}
          {sortedPlayers.length > 1 && (
            <div className="space-y-1.5 sm:space-y-2 max-h-32 sm:max-h-48 overflow-y-auto pr-1 custom-scrollbar">
              {sortedPlayers.map((p, idx) => (
                <div key={p.id} className={`flex items-center gap-2 sm:gap-4 p-2 sm:p-3 rounded-xl sm:rounded-2xl border ${idx === 0 ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/5'}`}>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-white/5 flex items-center justify-center font-bold text-white/50 text-xs sm:text-sm">{idx + 1}.</div>
                  <img
                    src={`/assets/${p.avatar}.png`}
                    alt=""
                    className="w-6 h-6 sm:w-8 sm:h-8 object-contain shrink-0"
                  />
                  <span className="font-bold text-white text-[11px] sm:text-sm truncate">{p.name}</span>
                  <span className="ml-auto font-black text-white/80 text-[11px] sm:text-sm shrink-0">{p.capital.toLocaleString(language === 'en' ? 'en-US' : 'sr-RS')} SC</span>
                </div>
              ))}
            </div>
          )}

          <button onClick={() => window.location.reload()} className="mt-4 sm:mt-8 w-full sm:w-auto px-8 py-3 sm:py-4 bg-white text-slate-900 font-black rounded-xl sm:rounded-2xl hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm uppercase tracking-widest">
            {t.modals.play_again}
          </button>
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value, icon }: { label: string, value: string | number, icon: string }) {
  return (
    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm">{icon}</span>
        <span className="text-[9px] text-white/40 uppercase font-bold truncate">{label}</span>
      </div>
      <div className="text-xs font-black text-white truncate">{value}</div>
    </div>
  );
}

// ── JAIL SKIP MODAL ──
interface JailSkipModalProps {
  onSkip: () => void;
  mode: GameMode;
  language: 'en' | 'sr';
}

export function JailSkipModal({ onSkip, mode, language }: JailSkipModalProps) {
  const t = translations[language];
  return (
    <Modal onClose={() => { }} mode={mode} language={language}>
      <div className="p-8 text-center">
        <div className="text-7xl mb-6 relative">
          🔒
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-rose-500/20 blur-2xl -z-10" />
        </div>
        <h2 className="text-3xl font-black text-white mb-2">{t.messages.jail_warning}</h2>
        <p className="text-white/50 text-base mb-8">{t.messages.jail_wait}</p>

        <button
          onClick={onSkip}
          className="w-full py-5 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-black rounded-[1.5rem] transition-all shadow-xl shadow-black/40 border border-white/10 active:scale-95 flex items-center justify-center gap-3 group"
        >
          <span className="text-xl group-hover:rotate-12 transition-transform">➡️</span>
          {t.modals.jail_skip.toUpperCase()}
        </button>
      </div>
    </Modal>
  );
}

// ── TURN ANNOUNCEMENT MODAL ──
export function TurnAnnouncementModal({ onComplete, language }: { onComplete: () => void, language: 'en' | 'sr' }) {
  const t = translations[language];
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-12 py-8 rounded-[2rem] shadow-2xl border-4 border-white/20 animate-modal-pop">
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic scale-110">
          {t.messages.your_turn} 🎲
        </h2>
      </div>
    </div>
  );
}
