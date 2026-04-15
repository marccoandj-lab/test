import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QuizTheme } from '../../hooks/useQuizGame';
import { Language, translations } from '../../i18n/translations';

interface CooldownOverlayProps {
  theme: QuizTheme;
  language: Language;
}

export const CooldownOverlay: React.FC<CooldownOverlayProps> = ({ theme, language }) => {
  const [count, setCount] = useState(3);
  const t = translations[language];

  useEffect(() => {
    if (count <= 0) return;
    const timer = setInterval(() => setCount(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [count]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-xl">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center space-y-8"
      >
        <div className="space-y-2">
          <p className="text-blue-400 font-black uppercase tracking-[0.3em] text-sm animate-pulse">
            {t.quiz.cooldown_msg}
          </p>
          <h2 className="text-white text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
            {t.quiz.starting_on}
          </h2>
        </div>

        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`px-8 py-4 rounded-3xl border-2 shadow-2xl ${
            theme === 'linear'
              ? 'bg-blue-600/20 border-blue-500 text-blue-400'
              : 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
          }`}
        >
          <span className="text-2xl md:text-4xl font-black uppercase tracking-tight">
            {theme === 'linear' ? t.quiz.linear_board : t.quiz.circular_board}
          </span>
        </motion.div>

        <div className="relative w-32 h-32 mx-auto">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="60"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="8"
              className="text-white/5"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="60"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={376.99}
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: 376.99 }}
              transition={{ duration: 3, ease: "linear" }}
              className={theme === 'linear' ? "text-blue-500" : "text-emerald-500"}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              key={count}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-black text-white"
            >
              {count}
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
