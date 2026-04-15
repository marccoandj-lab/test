import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Language, translations } from '../../i18n/translations';
import { formatNumber } from '../../utils/format';

interface QuizSummaryScreenProps {
  capital: number;
  srp: number;
  correctCount: number;
  wrongCount: number;
  language: Language;
  onClose: () => void;
}

export const QuizSummaryScreen: React.FC<QuizSummaryScreenProps> = ({
  capital,
  srp,
  correctCount,
  wrongCount,
  language,
  onClose,
}) => {
  const t = translations[language];
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const nextReset = new Date();
      nextReset.setHours(24, 0, 0, 0);
      const diff = nextReset.getTime() - now.getTime();
      
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      
      setCountdown(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md w-full bg-slate-900/60 backdrop-blur-3xl border border-white/10 rounded-[40px] p-8 md:p-10 shadow-2xl space-y-8 z-10"
    >
      <div className="text-center space-y-2">
        <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">📊</span>
        </div>
        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">
          {t.quiz.summary_title}
        </h2>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
          {language === 'en' ? 'Challenge Completed' : 'Izazov završen'}
        </p>
      </div>

      <div className="grid gap-4">
        <div className="bg-white/5 p-6 rounded-3xl border border-white/5 flex flex-col items-center">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{t.quiz.capital_earned}</p>
          <p className="text-3xl font-black text-emerald-400">{formatNumber(capital)} SC</p>
        </div>

        <div className="bg-blue-600/10 p-6 rounded-3xl border border-blue-500/20 flex flex-col items-center">
          <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-1">{t.quiz.srp_earned}</p>
          <p className="text-3xl font-black text-white">{srp} SRP</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-600/5 p-4 rounded-2xl border border-emerald-500/10 text-center">
          <p className="text-emerald-400 text-xl font-black">{correctCount}</p>
          <p className="text-slate-500 text-[9px] font-black uppercase">{t.quiz.correct_answers}</p>
        </div>
        <div className="bg-rose-600/5 p-4 rounded-2xl border border-rose-500/10 text-center">
          <p className="text-rose-400 text-xl font-black">{wrongCount}</p>
          <p className="text-slate-500 text-[9px] font-black uppercase">{t.quiz.wrong_answers}</p>
        </div>
      </div>

      <div className="text-center space-y-2 pt-4">
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
          {t.quiz.reset_info}
        </p>
        <p className="text-2xl font-mono font-black text-white tracking-[0.2em]">
          {countdown}
        </p>
      </div>

      <button
        onClick={onClose}
        className="w-full bg-white hover:bg-slate-200 text-slate-950 font-black py-4 rounded-2xl transition-all active:scale-95 shadow-xl"
      >
        {t.quiz.back_to_lobby.toUpperCase()}
      </button>
    </motion.div>
  );
};
