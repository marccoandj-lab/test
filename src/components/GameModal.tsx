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
    ? 'from-blue-900/90 to-indigo-900/90 bg-finance-pattern'
    : 'from-green-900/90 to-teal-900/90 bg-eco-pattern';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4" lang={language}>
      <div className="absolute inset-0 bg-black/70 animate-backdrop-fade" onClick={onClose} />
      <div className={`relative w-full sm:max-w-lg bg-gradient-to-br ${bgClass} rounded-[2rem] border border-white/20 shadow-2xl max-h-[95vh] overflow-hidden animate-modal-pop`}>
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        </div>
        <div className="relative z-10 overflow-y-auto max-h-[95vh]">
          {children}
        </div>
      </div>
    </div>
  );
}

function FloatingSymbols({ symbols, count = 12, animationClass }: { symbols: string[], count?: number, animationClass: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`absolute text-3xl opacity-20 ${animationClass}`}
          style={{
            left: `${(i * (100 / count)) + Math.random() * 5}%`,
            animationDelay: `-${Math.random() * 10}s`,
            animationDuration: `${3 + Math.random() * 3}s`,
            fontSize: `${1.5 + Math.random() * 2}rem`
          }}
        >
          {symbols[i % symbols.length]}
        </span>
      ))}
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
  const symbols = mode === 'finance' ? ['$', '💰', '💵', '💎'] : ['🌱', '✨', '🍃', '🌞'];

  return (
    <Modal onClose={() => { }} mode={mode} language={language}>
      <FloatingSymbols symbols={symbols} animationClass="animate-float-up" count={15} />
      <div className="p-6 text-center relative z-10">
        <div className="text-6xl mb-4 animate-bounce drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">{icon}</div>
        <h2 className="text-2xl font-black text-white mb-2 tracking-tight">{title[language]}</h2>
        <p className="text-white/70 mb-6 text-sm leading-relaxed">{description[language]}</p>

        {phase === 'intro' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 mb-4 shadow-inner">
              <p className="text-emerald-400 font-black mb-3 uppercase tracking-[0.2em] text-xs">
                {language === 'en' ? 'Income Formula' : 'Formula prihoda'}
              </p>
              <div className="flex items-center justify-center gap-6">
                <div className="text-4xl animate-pulse">🎲</div>
                <div className="text-white font-black text-2xl">×</div>
                <div className="text-emerald-400 font-black text-2xl">20,000 SC</div>
              </div>
            </div>
            <button
              onClick={handleRoll}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black py-5 rounded-[1.5rem] transition-all active:scale-95 text-xl shadow-[0_10px_20px_-5px_rgba(16,185,129,0.3)] border-b-4 border-emerald-700 active:border-b-0"
            >
              {language === 'en' ? 'ROLL TO EARN! 🎲' : 'BACI ZA ZARADU! 🎲'}
            </button>
          </div>
        )}

        {phase === 'rolling' && (
          <div className="py-8">
            <div className="flex justify-center mb-8">
              <div className="w-28 h-28 rounded-3xl border-4 border-white/30 bg-white/10 flex items-center justify-center animate-dice-spin shadow-2xl backdrop-blur-sm">
                <span className="text-7xl text-white">{diceFaces[displayDice]}</span>
              </div>
            </div>
            <p className="text-emerald-400 font-black animate-pulse uppercase tracking-[0.25em] text-sm">
              {language === 'en' ? 'Calculating Income...' : 'Obračunavanje prihoda...'}
            </p>
          </div>
        )}

        {phase === 'result' && (
          <div className="space-y-6 animate-modal-pop">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-3xl border-4 border-emerald-400/50 bg-emerald-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.3)] scale-110">
                <span className="text-6xl text-white drop-shadow-md">{diceFaces[diceValue - 1]}</span>
              </div>
            </div>
            
            <div className="bg-emerald-500/40 rounded-[2rem] p-6 border-2 border-emerald-400/30 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <p className="text-emerald-200 text-[10px] uppercase font-black tracking-[0.3em] mb-2">{language === 'en' ? 'TOTAL PROFIT' : 'UKUPAN PROFIT'}</p>
              <p className="text-5xl font-black text-white drop-shadow-sm">+{finalAmount.toLocaleString(language === 'en' ? 'en-US' : 'sr-RS')} SC</p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="px-3 py-1 bg-emerald-950/40 rounded-full text-emerald-200/70 text-[10px] font-bold">
                  {diceValue} × 20,000
                </span>
              </div>
            </div>

            <p className="text-white/60 text-[11px] italic font-medium">💡 {language === 'en' ? 'Smart income management is the key to financial freedom!' : 'Pametno upravljanje prihodima je ključ finansijske slobode!'}</p>

            <button
              onClick={() => onResult(finalAmount)}
              className="w-full bg-white text-emerald-900 font-black py-5 rounded-[1.5rem] transition-all active:scale-95 text-xl shadow-xl hover:bg-emerald-50"
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
  const symbols = mode === 'finance' ? ['-', '📉', '💸', '🏦'] : ['🥀', '⚠️', '🌪️', '🧊'];

  return (
    <Modal onClose={() => { }} mode={mode} language={language}>
      {!isInsured && <FloatingSymbols symbols={symbols} animationClass="animate-rain-down" count={15} />}
      <div className="p-6 text-center relative z-10">
        <div className="relative inline-block">
          <div className="text-6xl mb-4 drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]">{icon}</div>
          {!isInsured && (
            <div className="absolute -top-1 -right-4 bg-rose-500 text-white text-[9px] font-black px-3 py-1 rounded-full animate-bounce shadow-lg border border-white/20">
              {language === 'en' ? 'LIABILITY' : 'OBAVEZA'}
            </div>
          )}
        </div>

        <h2 className="text-2xl font-black text-white mb-2 tracking-tight">{title[language]}</h2>
        <p className="text-white/70 mb-6 text-sm leading-relaxed">{description[language]}</p>

        {phase === 'intro' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md border border-rose-500/20 rounded-3xl p-6 mb-4 shadow-inner">
              <p className="text-rose-400 font-black mb-3 uppercase tracking-[0.2em] text-xs">
                {language === 'en' ? 'Expense Formula' : 'Formula troška'}
              </p>
              <div className="flex items-center justify-center gap-6">
                <div className="text-4xl animate-pulse">🎲</div>
                <div className="text-white font-black text-2xl">×</div>
                <div className="text-rose-400 font-black text-2xl">20,000 SC</div>
              </div>
            </div>
            <button
              onClick={handleRoll}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-black py-5 rounded-[1.5rem] transition-all active:scale-95 text-xl shadow-[0_10px_20px_-5px_rgba(244,63,94,0.3)] border-b-4 border-rose-800 active:border-b-0"
            >
              {language === 'en' ? 'ROLL TO PAY! 🎲' : 'BACI ZA PLAĆANJE! 🎲'}
            </button>
          </div>
        )}

        {phase === 'rolling' && (
          <div className="py-8">
            <div className="flex justify-center mb-8">
              <div className="w-28 h-28 rounded-3xl border-4 border-white/30 bg-white/10 flex items-center justify-center animate-dice-spin shadow-2xl backdrop-blur-sm">
                <span className="text-7xl text-white">{diceFaces[displayDice]}</span>
              </div>
            </div>
            <p className="text-rose-400 font-black animate-pulse uppercase tracking-[0.25em] text-sm">
              {language === 'en' ? 'Calculating Expense...' : 'Obračunavanje troškova...'}
            </p>
          </div>
        )}

        {phase === 'result' && (
          <div className="space-y-6 animate-modal-pop">
            {!isInsured && (
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-3xl border-4 border-rose-400/50 bg-rose-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.3)] scale-110">
                  <span className="text-6xl text-white drop-shadow-md">{diceFaces[diceValue - 1]}</span>
                </div>
              </div>
            )}
            
            <div className={`${isInsured ? 'bg-emerald-500/30 border-emerald-400/30' : 'bg-rose-500/40 border-rose-400/30'} rounded-[2rem] p-6 border-2 shadow-2xl relative overflow-hidden`}>
              <p className={`${isInsured ? 'text-emerald-300' : 'text-rose-200'} text-[10px] uppercase font-black tracking-[0.3em] mb-2`}>
                {isInsured ? (language === 'en' ? '🛡️ PROTECTED' : '🛡️ ZAŠTIĆENO') : (language === 'en' ? 'TOTAL DEBT' : 'UKUPAN DUG')}
              </p>
              <p className={`text-5xl font-black ${isInsured ? 'text-emerald-400' : 'text-white'} drop-shadow-sm`}>
                {isInsured ? '0 SC' : `-${finalAmount.toLocaleString(language === 'en' ? 'en-US' : 'sr-RS')} SC`}
              </p>
              {!isInsured && (
                 <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="px-3 py-1 bg-rose-950/40 rounded-full text-rose-200/70 text-[10px] font-bold">
                    {diceValue} × 20,000
                  </span>
                </div>
              )}
            </div>

            {isInsured ? (
              <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-2xl p-4 mb-6 animate-pulse shadow-inner">
                <p className="text-emerald-400 font-black text-sm uppercase mb-1 tracking-tight">{language === 'en' ? '🛡️ Insurance Covered!' : '🛡️ Osiguranje pokriveno!'}</p>
                <p className="text-xs text-emerald-100/70">{language === 'en' ? 'Your insurance saved you from this expense.' : 'Vaše osiguranje vas je poštedelo ovog troška.'}</p>
              </div>
            ) : (
              <p className="text-white/60 text-[11px] italic font-medium">💡 {language === 'en' ? 'Always keep an emergency fund for 3-6 months of expenses!' : 'Uvek imajte fond za hitne slučajeve za 3-6 meseci troškova!'}</p>
            )}

            <button
              onClick={() => onResult(finalAmount)}
              className={`w-full ${isInsured ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-white text-rose-900'} font-black py-5 rounded-[1.5rem] transition-all active:scale-95 text-xl shadow-xl`}
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
    if (!answered) return `${c.base} cursor-pointer hover:translate-x-1 shadow-md hover:shadow-lg transition-all duration-300`;
    if (idx === quiz.correct) return `${c.correct} cursor-default scale-[1.02] shadow-emerald-500/20 shadow-xl border-emerald-400 z-10`;
    if (idx === selected && idx !== quiz.correct) return `${c.wrong} cursor-default grayscale-[0.5] opacity-80`;
    return `bg-white/5 border-white/10 text-white/30 cursor-default opacity-40 scale-[0.98]`;
  };

  const timerColor = timeLeft > 15 ? 'text-emerald-400' : timeLeft > 8 ? 'text-amber-400' : 'text-rose-400';

  return (
    <Modal onClose={() => { }} mode={mode} language={language}>
      <FloatingSymbols symbols={['❓', '❔', '🤔', '💡']} animationClass="animate-float-random" count={8} />
      <div className="p-6 relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="text-4xl animate-bounce">❓</div>
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full -z-10" />
          </div>
          <div className="flex-1">
            <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.2em] mb-0.5">{language === 'en' ? 'CHALLENGE' : 'IZAZOV'}</p>
            <p className="text-white font-black text-lg tracking-tight leading-tight">
              {mode === 'finance' ? (language === 'en' ? 'Financial Literacy' : 'Finansijska pismenost') : (language === 'en' ? 'Eco Awareness' : 'Ekološka svest')}
            </p>
          </div>
          {!answered && (
            <div className={`relative w-14 h-14 flex items-center justify-center rounded-2xl border-2 border-white/20 bg-white/5 ${timerColor} font-black text-xl shadow-inner animate-pulse`}>
              {timeLeft}
            </div>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 mb-6 border border-white/20 shadow-2xl relative group">
          <div className="absolute -top-3 left-6 px-3 py-1 bg-white text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
            {language === 'en' ? 'Question' : 'Pitanje'}
          </div>
          <p className="text-white text-base font-bold leading-relaxed tracking-tight">{quiz.question[language]}</p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          {quiz.options[language].map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={answered}
              className={`
                w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-300
                text-sm font-bold leading-snug active:scale-[0.97]
                ${getOptionClass(idx)}
              `}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 flex items-center justify-center rounded-xl bg-white/10 border border-white/10 font-black`}>
                  {OPTION_LABELS[idx]}
                </span>
                <span className="flex-1">{option.replace(/^[A-D]\)\s*/, '')}</span>
                {answered && idx === quiz.correct && <span className="text-xl animate-bounce">✨</span>}
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-3 mt-auto">
          <div className="flex-1 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-3 flex flex-col items-center">
            <p className="text-emerald-400/60 text-[8px] font-black uppercase tracking-widest mb-1">{language === 'en' ? 'REWARD' : 'NAGRADA'}</p>
            <p className="text-emerald-400 font-black text-sm">+{quiz.reward.toLocaleString()} SC</p>
          </div>
          <div className="flex-1 bg-rose-500/10 border border-rose-500/20 rounded-2xl p-3 flex flex-col items-center">
            <p className="text-rose-400/60 text-[8px] font-black uppercase tracking-widest mb-1">{language === 'en' ? 'PENALTY' : 'KAZNA'}</p>
            <p className="text-rose-400 font-black text-sm">-{quiz.penalty.toLocaleString()} SC</p>
          </div>
        </div>

        {answered && (
          <div className={`mt-6 rounded-3xl p-5 border-2 animate-modal-pop shadow-2xl ${selected === quiz.correct ? 'bg-emerald-500/30 border-emerald-400/30' : 'bg-rose-500/30 border-rose-400/30'}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{selected === quiz.correct ? '🎉' : '💨'}</span>
              <p className="text-white font-black text-xl">
                {selected === quiz.correct ? tDict.modals.correct : tDict.modals.wrong}
              </p>
            </div>
            <p className="text-white/80 text-xs leading-relaxed mb-4 font-medium">{quiz.explanation[language]}</p>
            <div className={`inline-block px-4 py-2 rounded-xl font-black text-lg shadow-lg ${selected === quiz.correct ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
              {selected === quiz.correct ? `+${quiz.reward.toLocaleString()} SC` : `-${quiz.penalty.toLocaleString()} SC`}
            </div>
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
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const symbols = toMode === 'finance' ? ['💼', '📈', '💹', '🏦'] : ['🌱', '🌿', '🍃', '🌞'];

  return (
    <Modal onClose={() => { }} mode={toMode} language={language}>
      <FloatingSymbols symbols={symbols} animationClass="animate-float-up" count={12} />
      <div className="p-8 text-center relative z-10">
        <div className="text-7xl mb-6 animate-bounce drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">🔄</div>
        <h2 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase italic">{language === 'en' ? 'Topic Switched!' : 'Tema promenjena!'}</h2>
        <p className="text-white/60 mb-8 text-sm leading-relaxed px-4">{language === 'en' ? 'The entire market is switching its focus!' : 'Čitavo tržište menja svoj fokus!'}</p>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[2.5rem] p-6 mb-8 shadow-inner relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <div className="flex items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-4xl border border-white/10 grayscale opacity-50">
                {fromMode === 'finance' ? '💼' : '🌱'}
              </div>
              <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">{fromMode === 'finance' ? (language === 'en' ? 'Finance' : 'Finansije') : (language === 'en' ? 'Sustainability' : 'Održivost')}</span>
            </div>
            
            <div className="text-white/20 text-4xl animate-pulse">➜</div>

            <div className="flex flex-col items-center gap-2">
              <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-5xl border-2 shadow-2xl animate-modal-pop ${toMode === 'finance' ? 'bg-blue-500/20 border-blue-400/50' : 'bg-emerald-500/20 border-emerald-400/50'}`}>
                {toMode === 'finance' ? '💼' : '🌱'}
              </div>
              <span className={`text-xs font-black uppercase tracking-widest ${toMode === 'finance' ? 'text-blue-400' : 'text-emerald-400'}`}>
                {toMode === 'finance' ? (language === 'en' ? 'Finance' : 'Finansije') : (language === 'en' ? 'Sustainability' : 'Održivost')}
              </span>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl p-5 border-2 shadow-2xl transition-all ${toMode === 'sustainability'
          ? 'bg-emerald-500/30 border-emerald-400/30'
          : 'bg-blue-500/30 border-blue-400/30'
          }`}>
          <p className={`text-xl font-black mb-2 uppercase tracking-tighter ${toMode === 'sustainability' ? 'text-emerald-300' : 'text-blue-300'}`}>
            {toMode === 'sustainability' ? (language === 'en' ? '🌱 Eco Era' : '🌱 Ekološka Era') : (language === 'en' ? '💼 Market Boom' : '💼 Tržišni Bum')}
          </p>
          <p className="text-white/80 text-sm leading-relaxed font-medium">
            {toMode === 'sustainability'
              ? (language === 'en' ? 'Questions are now about ecology, ESG and green energy.' : 'Pitanja su sada o ekologiji, ESG kriterijumima i zelenoj energiji.')
              : (language === 'en' ? 'Questions are now about budgeting, investing and finance.' : 'Pitanja su sada o budžetiranju, investiranju i finansijama.')}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="w-2 h-2 rounded-full bg-white/20 animate-ping" />
          <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-black">
            {language === 'en' ? 'Switching Perspective...' : 'Menjanje perspektive...'}
          </p>
        </div>
      </div>
    </Modal>
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
  const symbols = mode === 'finance' ? ['📈', '💹', '🏢', '🏦'] : ['🌿', '☀️', '⚡', '🌊'];

  return (
    <Modal onClose={() => { }} mode={mode} language={language}>
      <FloatingSymbols symbols={symbols} animationClass="animate-float-up" count={10} />
      <div className="p-6 text-center relative z-10">
        {phase === 'choose' && (
          <div className={`absolute top-0 right-0 w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 font-black ${timerColor} animate-pulse`}>
            {timeLeft}
          </div>
        )}
        <div className="text-5xl mb-4 drop-shadow-xl">📊</div>
        <h2 className="text-2xl font-black text-white mb-2 tracking-tight">{language === 'en' ? 'Investment Opportunity' : 'Prilika za investiciju'}</h2>
        <p className="text-white/60 text-xs mb-6 leading-relaxed px-4">{language === 'en' ? 'The market is volatile. Choose your stake wisely and let the dice decide your fate.' : 'Tržište je promenljivo. Mudro odaberite svoj ulog i pustite kockicu da odluči o vašoj sudbini.'}</p>

        {phase === 'choose' && (
          <>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 mb-6 border border-white/20 shadow-inner">
              <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.2em] mb-1">{language === 'en' ? 'Available Capital' : 'Raspoloživi kapital'}</p>
              <p className="text-3xl font-black text-white">{balance.toLocaleString()} SC</p>
            </div>

            <div className="bg-white/5 rounded-[2rem] p-4 mb-6 border border-white/10 overflow-hidden">
              <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-3">{language === 'en' ? 'Probable Outcomes:' : 'Mogući ishodi:'}</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-rose-500/20 rounded-xl p-2 border border-rose-500/30">
                  <span className="block text-[10px] text-rose-300 font-bold mb-0.5">⚀ ⚁</span>
                  <span className="block text-xs font-black text-white">0x</span>
                </div>
                <div className="bg-rose-500/10 rounded-xl p-2 border border-rose-500/20">
                  <span className="block text-[10px] text-rose-300 font-bold mb-0.5">⚂</span>
                  <span className="block text-xs font-black text-white">0.5x</span>
                </div>
                <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                  <span className="block text-[10px] text-white/40 font-bold mb-0.5">⚃</span>
                  <span className="block text-xs font-black text-white">1x</span>
                </div>
                <div className="bg-emerald-500/20 rounded-xl p-2 border border-emerald-500/30">
                  <span className="block text-[10px] text-emerald-300 font-bold mb-0.5">⚄</span>
                  <span className="block text-xs font-black text-white">2x</span>
                </div>
                <div className="bg-amber-500/30 rounded-xl p-2 border border-amber-400/50 col-span-2">
                  <span className="block text-[10px] text-amber-300 font-black mb-0.5 tracking-tighter">⚅ JACKPOT</span>
                  <span className="block text-xs font-black text-white text-center">4x</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {investOptions.map(amount => {
                const canAfford = balance >= amount;
                return (
                  <button
                    key={amount}
                    disabled={!canAfford}
                    onClick={() => handleInvest(amount)}
                    className={`font-black py-4 rounded-2xl border-2 transition-all active:scale-95 text-sm ${canAfford ? "bg-blue-600/30 hover:bg-blue-500 border-blue-400/30 text-white shadow-lg" : "bg-slate-800 border-white/5 text-white/20 cursor-not-allowed opacity-50"}`}
                  >
                    {amount.toLocaleString()} SC
                  </button>
                );
              })}
            </div>
            <button onClick={handleSkip} className="w-full text-white/40 hover:text-white/60 font-black py-3 text-xs uppercase tracking-widest transition-colors">{language === 'en' ? 'Skip Opportunity' : 'Preskoči priliku'} ▶</button>
          </>
        )}

        {phase === 'rolling' && (
          <div className="py-10">
            <p className="text-white/50 text-xs font-black uppercase tracking-[0.2em] mb-4">{language === 'en' ? 'Invested' : 'Investirano'}: <span className="text-blue-400">{investAmount.toLocaleString()} SC</span></p>
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 rounded-[2.5rem] border-4 border-white/30 bg-white/10 flex items-center justify-center animate-dice-spin shadow-2xl backdrop-blur-md">
                <span className="text-8xl text-white">{diceFaces[displayDice]}</span>
              </div>
            </div>
          </div>
        )}

        {phase === 'result' && resultInfo && (
          <div className="animate-modal-pop">
            <div className="mb-6 relative inline-block">
               <div className="text-8xl mb-2">
                 {resultInfo.result === 'win' ? '🐂' : resultInfo.result === 'lose' ? '🐻' : '⚖️'}
               </div>
               <div className={`absolute -bottom-2 -right-2 w-14 h-14 rounded-2xl border-4 border-white bg-slate-900 flex items-center justify-center shadow-xl text-3xl`}>
                 {diceFaces[diceValue - 1]}
               </div>
            </div>
            
            <h3 className={`text-2xl font-black mb-2 ${resultInfo.result === 'win' ? 'text-emerald-400' : resultInfo.result === 'lose' ? 'text-rose-400' : 'text-white'}`}>
              {resultInfo.message[language]}
            </h3>
            
            <div className={`rounded-[2.5rem] p-8 mb-8 border-2 shadow-2xl relative overflow-hidden group ${resultInfo.result === 'win' ? 'bg-emerald-500/30 border-emerald-400/30' : resultInfo.result === 'lose' ? 'bg-rose-500/30 border-rose-400/30' : 'bg-white/10 border-white/20'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{language === 'en' ? 'NET PROFIT' : 'NETO PROFIT'}</p>
              <p className="text-5xl font-black text-white">{(Math.round(investAmount * resultInfo.multiplier) - investAmount).toLocaleString()} SC</p>
              <div className="mt-4 inline-block px-4 py-1.5 bg-black/30 rounded-full text-white/60 text-[10px] font-black">
                {investAmount.toLocaleString()} × {resultInfo.multiplier}x
              </div>
            </div>

            <button onClick={handleClose} className={`w-full font-black py-5 rounded-[1.5rem] transition-all text-xl shadow-2xl active:scale-95 ${resultInfo.result === 'win' ? 'bg-emerald-500 hover:bg-emerald-400 text-white' : 'bg-rose-500 hover:bg-rose-400 text-white'}`}>{language === 'en' ? 'Claim & Continue' : 'Preuzmi i nastavi'} ▶</button>
          </div>
        )}
      </div>
    </Modal>
  );
}

// ── TAX SMALL MODAL ──
export function TaxSmallModal({ taxExemptionTurns, onClose, mode, amount, language }: { taxExemptionTurns: number, onClose: () => void, mode: GameMode, amount: number, language: 'en' | 'sr' }) {
  const isExempt = taxExemptionTurns > 0;
  const symbols = ['⚠️', '💸', '🏦', '📑'];

  useEffect(() => {
    if (isExempt) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [onClose, isExempt]);

  return (
    <Modal onClose={() => { }} mode={mode} language={language}>
      {!isExempt && <FloatingSymbols symbols={symbols} animationClass="animate-rain-down" count={8} />}
      <div className="p-8 text-center relative z-10">
        <div className="text-7xl mb-6 drop-shadow-2xl animate-pulse">⚠️</div>
        <h2 className="text-3xl font-black text-white mb-2 tracking-tighter italic uppercase">{language === 'en' ? 'Caution!' : 'Pažnja!'}</h2>
        {isExempt ? (
          <div className="bg-emerald-500/20 border-2 border-emerald-400/30 rounded-[2rem] p-8 mb-4 shadow-xl backdrop-blur-sm">
            <p className="text-emerald-400 font-black text-2xl mb-2 text-center">{language === 'en' ? '🛡️ Tax Exempted!' : '🛡️ Oslobođeni poreza!'}</p>
            <p className="text-white/50 text-xs mt-2 font-medium">
              {language === 'en' ? `You are safe from collection for ${taxExemptionTurns} more turns.` : `Sigurni ste od naplate još ${taxExemptionTurns} poteza.`}
            </p>
          </div>
        ) : (
          <>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] p-6 mb-6 shadow-inner">
              <p className="text-amber-400 font-black text-xl mb-3 uppercase tracking-tight">{language === 'en' ? 'Vulnerable Zone' : 'Ranjiva zona'}</p>
              <p className="text-white/70 text-sm leading-relaxed mb-6 font-medium">
                {language === 'en' ? 'You are standing on a small tax field. This incurs a fee and makes you vulnerable to large tax collections!' : 'Nalazite se na polju za mali porez. Ovo povlači naknadu i čini vas ranjivim na velike naplate poreza!'}
              </p>
              <div className="bg-rose-500/30 border-2 border-rose-500/40 rounded-2xl p-4 inline-block shadow-lg">
                <p className="text-white font-black text-2xl">{language === 'en' ? 'Tax Fee' : 'Taksa'}: {amount.toLocaleString()} SC</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-white text-rose-900 font-black py-5 rounded-[1.5rem] transition-all shadow-2xl active:scale-95 text-lg"
            >
              {language === 'en' ? 'PAY TAX & CONTINUE' : 'PLATI POREZ I NASTAVI'}
            </button>
          </>
        )}
        {isExempt && <p className="text-white/30 text-[10px] animate-pulse font-black uppercase tracking-widest mt-4">{language === 'en' ? 'Closing in 3s...' : 'Zatvaranje za 3s...'}</p>}
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
  const symbols = ['💰', '🏦', '📜', '⚖️'];

  return (
    <Modal onClose={onClose} mode={mode} language={language}>
      <FloatingSymbols symbols={symbols} animationClass="animate-float-up" count={10} />
      <div className="p-8 text-center relative z-10">
        <div className="text-7xl mb-6 animate-bounce drop-shadow-2xl">🏦</div>
        <h2 className="text-3xl font-black text-white mb-2 tracking-tighter italic uppercase">{language === 'en' ? 'Tax Inspection' : 'Poreska inspekcija'}</h2>
        <p className="text-white/60 text-sm mb-8 leading-relaxed px-4">{language === 'en' ? 'Collect taxes from players currently on small tax fields.' : 'Naplatite porez od igrača koji su trenutno na poljima malog poreza.'}</p>

        {targets.length > 0 ? (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-5 max-h-56 overflow-y-auto custom-scrollbar">
              <p className="text-[10px] text-white/40 uppercase font-black mb-4 tracking-[0.2em]">{language === 'en' ? 'Liable Players:' : 'Obveznici:'}</p>
              <div className="space-y-3">
                {targets.map(p => (
                  <div key={p.id} className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 p-1.5 border border-white/10 flex items-center justify-center">
                        <img src={`/assets/${p.avatar}.png`} alt="" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-sm font-black text-white">{p.name}</span>
                    </div>
                    <span className={`text-sm font-black ${p.taxExemptTurns > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {p.taxExemptTurns > 0 ? (language === 'en' ? '🛡️ EXEMPT' : '🛡️ OSLOBOĐEN') : `-${amountPerPlayer.toLocaleString()} SC`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-500/20 border-2 border-emerald-400/30 rounded-[2rem] p-6 shadow-inner relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <p className="text-emerald-300 text-[10px] uppercase font-black tracking-[0.3em] mb-2">{language === 'en' ? 'TOTAL COLLECTION' : 'UKUPNA NAPLATA'}</p>
              <p className="text-4xl font-black text-white drop-shadow-md">{totalPotential.toLocaleString()} SC</p>
            </div>

            <button
              onClick={() => onCollect(targets.filter(p => p.taxExemptTurns === 0).map(p => p.id))}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-5 rounded-[1.5rem] transition-all shadow-2xl text-xl border-b-4 border-emerald-700 active:border-b-0"
            >
              {language === 'en' ? 'COLLECT ALL 💰' : 'NAPLATI SVE 💰'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-rose-500/10 border-2 border-rose-400/20 rounded-[2rem] p-10 shadow-inner">
              <p className="text-rose-300 font-black text-xl mb-3 tracking-tight">{language === 'en' ? 'No Takers!' : 'Nema obveznika!'}</p>
              <p className="text-white/40 text-sm leading-relaxed">{language === 'en' ? 'There are no players currently on small tax fields. You collect nothing this time.' : 'Trenutno nema igrača na poljima malog poreza. Ovog puta ne naplaćujete ništa.'}</p>
            </div>
            <button onClick={onClose} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-5 rounded-[1.5rem] transition-all text-lg shadow-xl uppercase tracking-widest border border-white/5">{language === 'en' ? 'Continue' : 'Nastavi'} ▶</button>
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

  const symbols = ['⚖️', '🔨', '📜', '💎'];

  return (
    <Modal onClose={() => { }} mode={mode} language={language}>
      <FloatingSymbols symbols={symbols} animationClass="animate-float-random" count={8} />
      <div className="p-8 text-center relative z-10">
        <div className="text-7xl mb-6 drop-shadow-2xl">⚖️</div>
        <h2 className="text-3xl font-black text-white mb-2 tracking-tighter italic uppercase">{language === 'en' ? 'Multiplayer Auction' : 'Multiplayer aukcija'}</h2>
        <p className="text-white/60 mb-8 italic text-sm leading-relaxed px-4">{language === 'en' ? 'Everyone in the session is rolling for the Exemption Card!' : 'Svi u sesiji se takmiče za karticu oslobađanja od poreza!'}</p>

        {!allRolled ? (
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-6 border border-white/20 mb-6 text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <p className="text-[10px] text-white/40 uppercase font-black tracking-[0.3em] mb-3">{language === 'en' ? 'Upcoming Roller' : 'Sledeći na redu'}:</p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/5 p-1.5 border border-white/10 flex items-center justify-center">
                  <img src={`/assets/${activeRoller.avatar}.png`} alt="" className="w-full h-full object-contain" />
                </div>
                <span className="text-2xl font-black text-white tracking-tight">{activeRoller.name} {activeRoller.id === myId && `(${language === 'en' ? 'You' : 'Ti'})`}</span>
              </div>
            </div>

            <button
              onClick={handleRoll}
              disabled={!isMyTurnToRoll || hasRolled}
              className={`w-full py-6 rounded-[2rem] font-black text-2xl transition-all shadow-2xl ${!isMyTurnToRoll || hasRolled
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-white/5 opacity-50'
                : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:scale-105 active:scale-95 shadow-amber-900/40 border-b-4 border-amber-800 active:border-b-0'
                }`}
            >
              {hasRolled ? (language === 'en' ? 'Rolled! ⏳' : 'Bačeno! ⏳') : isMyTurnToRoll ? (language === 'en' ? 'ROLL DICE! 🎲' : 'BACI KOCKICU! 🎲') : (language === 'en' ? 'Waiting... ⏳' : 'Čekanje... ⏳')}
            </button>

            <div className="grid grid-cols-3 gap-4">
              {players.map(p => {
                const pRoll = rolls[p.id];
                const isRollingNow = players[turnIndex]?.id === p.id;
                return (
                  <div key={p.id} className="flex flex-col items-center gap-2">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border-2 transition-all shadow-lg ${pRoll
                      ? 'bg-emerald-500/20 border-emerald-400 shadow-emerald-500/10'
                      : isRollingNow
                        ? 'bg-blue-500/20 border-blue-400 animate-pulse shadow-blue-500/10'
                        : 'bg-white/5 border-white/10 opacity-30'
                      }`}>
                      {pRoll ? pRoll : '🎲'}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest truncate w-full text-center ${isRollingNow ? 'text-blue-400' : 'text-white/40'}`}>
                      {p.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="animate-modal-pop">
            <div className="grid grid-cols-1 gap-3 mb-8 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
              {players.map(p => (
                <div key={p.id} className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${p.id === winnerId ? 'bg-emerald-500/30 border-emerald-400 shadow-xl scale-[1.02] z-10' : 'bg-white/5 border-white/5 opacity-60'}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 p-1 border border-white/10 flex items-center justify-center">
                      <img src={`/assets/${p.avatar}.png`} alt="" className="w-full h-full object-contain" />
                    </div>
                    <span className={`text-sm font-black ${p.id === winnerId ? 'text-white' : 'text-white/60'}`}>{p.name}</span>
                  </div>
                  <span className={`font-black text-2xl ${p.id === winnerId ? 'text-white drop-shadow-md' : 'text-white/40'}`}>{rolls[p.id]}</span>
                </div>
              ))}
            </div>
            <div className={`rounded-[2rem] p-6 mb-8 border-2 shadow-2xl relative overflow-hidden group ${winnerId === multiplayer.getMyId() ? 'bg-emerald-500/30 border-emerald-400/40 animate-pulse' : 'bg-white/5 border-white/10'}`}>
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <p className="text-white font-black text-center text-lg tracking-tight">
                {winnerId === multiplayer.getMyId() ? (language === 'en' ? '🎉 You Won Tax Exemption!' : '🎉 Osvojili ste oslobađanje od poreza!') : `😢 ${players.find(p => p.id === winnerId)?.name} ${language === 'en' ? 'Won' : 'je pobedio'}!`}
              </p>
            </div>
            {canContinue ? (
              <button onClick={() => onResult(winnerId === players[currentPlayerIndex].id)} className="w-full bg-white text-emerald-900 hover:bg-emerald-50 font-black py-5 rounded-[1.5rem] transition-all shadow-2xl text-xl uppercase tracking-[0.1em]">
                {language === 'en' ? 'Continue' : 'Nastavi'} ▶
              </button>
            ) : (
              <div className="p-6 bg-white/5 rounded-[1.5rem] border-2 border-dashed border-white/10 italic text-white/30 text-sm font-medium">
                {language === 'en' ? `Waiting for ${players[currentPlayerIndex]?.name} to continue...` : `Čekanje da ${players[currentPlayerIndex]?.name} nastavi...`}
              </div>
            )}
          </div>
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
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ 
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 60px)',
          backgroundSize: '100% 100%' 
        }} />
      </div>
      <div className="p-8 text-center relative z-10">
        <div className="relative inline-block mb-6">
          <div className="text-7xl mb-2 drop-shadow-2xl grayscale-[0.3]">⛓️</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl animate-shake-gentle">{icon}</div>
        </div>
        
        <h2 className="text-3xl font-black text-white mb-3 tracking-tighter uppercase italic">{title[language]}</h2>
        <p className="text-white/60 text-sm mb-8 leading-relaxed px-6">{description[language]}</p>

        <div className="bg-rose-950/40 border-2 border-rose-500/30 rounded-[2rem] p-6 mb-8 shadow-inner relative overflow-hidden group">
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-rose-500/10 blur-2xl rounded-full" />
          <p className="text-rose-400 text-[10px] uppercase font-black tracking-[0.3em] mb-1">{language === 'en' ? 'Bail Amount' : 'Iznos kaucije'}</p>
          <p className="text-4xl font-black text-white">{jailFine.toLocaleString()} SC</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={onPay}
            disabled={!canAfford}
            className={`w-full font-black py-5 rounded-[1.5rem] transition-all active:scale-95 text-lg shadow-xl ${canAfford
              ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-950/40 border-b-4 border-emerald-800 active:border-b-0"
              : "bg-slate-800 text-white/10 cursor-not-allowed border-2 border-white/5 opacity-50"
              }`}
          >
            {language === 'en' ? 'PAY BAIL & EXIT' : 'PLATI KAUCIJU I IZAĐI'}
          </button>
          <button
            onClick={onSkip}
            className="w-full bg-slate-800/80 hover:bg-slate-700 text-white/60 font-black py-4 rounded-[1.25rem] transition-all active:scale-95 text-xs uppercase tracking-widest border border-white/5"
          >
            {language === 'en' ? 'Wait & Skip Turn' : 'Čekaj i preskoči red'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ── INSURANCE MODAL ──
export function InsuranceModal({ balance, price, onBuy, onClose, mode, language }: { balance: number, price: number, onBuy: (price: number) => void, onClose: () => void, mode: GameMode, language: 'en' | 'sr' }) {
  const canAfford = balance >= price;
  const symbols = ['🛡️', '📜', '💎', '✨'];

  return (
    <Modal onClose={onClose} mode={mode} language={language}>
      <FloatingSymbols symbols={symbols} animationClass="animate-float-up" count={10} />
      <div className="p-8 text-center relative z-10">
        <div className="text-7xl mb-6 drop-shadow-2xl animate-float">🛡️</div>
        <h2 className="text-3xl font-black text-white mb-2 tracking-tighter italic uppercase">{language === 'en' ? 'Purchase Insurance' : 'Kupite osiguranje'}</h2>
        <p className="text-white/60 text-sm mb-8 leading-relaxed px-4">{language === 'en' ? 'Invest in insurance to stay exempt from taxes and fees for the next 3 rounds.' : 'Investirajte u osiguranje kako biste bili oslobođeni poreza i naknada u naredna 3 kruga.'}</p>

        <div className="bg-white/10 backdrop-blur-md border-2 border-amber-500/20 rounded-[2.5rem] p-8 mb-8 shadow-inner relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <p className="text-amber-300 text-[10px] uppercase mb-2 tracking-[0.3em] font-black opacity-80">{language === 'en' ? 'Insurance Premium' : 'Premija osiguranja'}</p>
          <p className="text-5xl font-black text-amber-400 drop-shadow-md">{price.toLocaleString()} SC</p>
        </div>

        {!canAfford && (
          <div className="bg-rose-500/20 border-2 border-rose-500/30 rounded-[1.5rem] p-4 mb-8 animate-shake-gentle">
            <p className="text-rose-400 text-sm font-black mb-1">⚠️ {language === 'en' ? 'Insufficient Funds' : 'Nedovoljno sredstava'}</p>
            <p className="text-white/50 text-[10px] font-medium leading-tight">{language === 'en' ? 'You need more capital to secure this protection.' : 'Potrebno vam je više kapitala za ovu zaštitu.'}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white/50 font-black py-5 rounded-[1.5rem] transition-all active:scale-95 border border-white/5 text-xs uppercase tracking-widest"
          >
            ❌ {language === 'en' ? 'Skip' : 'Preskoči'}
          </button>
          <button
            onClick={() => onBuy(price)}
            disabled={!canAfford}
            className={`font-black py-5 rounded-[1.5rem] transition-all text-lg shadow-2xl ${canAfford
              ? "bg-white text-emerald-900 hover:bg-emerald-50 scale-105"
              : "bg-slate-900 text-white/10 cursor-not-allowed border-2 border-white/5 opacity-50"
              }`}
          >
            ✅ {language === 'en' ? 'Buy Now' : 'Kupi sada'}
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
