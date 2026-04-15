import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Language, translations } from '../../i18n/translations';
import { supabase } from '../../lib/supabase';

interface QuizEntryButtonProps {
  userId: string | undefined;
  language: Language;
  onClick: () => void;
}

export const QuizEntryButton: React.FC<QuizEntryButtonProps> = ({ userId, language, onClick }) => {
  const t = translations[language];
  const [attemptsUsed, setAttemptsUsed] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const fetchAttempts = async () => {
      if (!userId) return;
      const now = new Date();
      const today = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
      
      const { data } = await supabase
        .from('quiz_attempts')
        .select('attempts_used')
        .eq('user_id', userId)
        .eq('attempt_date', today)
        .maybeSingle();

      setAttemptsUsed(data?.attempts_used || 0);
      setIsLoading(false);
    };

    fetchAttempts();
  }, [userId]);

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

  const isExhausted = attemptsUsed >= 4;

  return (
    <motion.button
      whileHover={!isExhausted ? { scale: 1.02 } : {}}
      whileTap={!isExhausted ? { scale: 0.98 } : {}}
      onClick={!isExhausted ? onClick : undefined}
      disabled={isExhausted || isLoading}
      className={`group relative w-full p-6 rounded-[2.5rem] shadow-2xl transition-all overflow-hidden border-2 ${
        isExhausted 
          ? 'bg-slate-900/50 border-white/5 grayscale cursor-not-allowed' 
          : 'bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 border-white/10 hover:border-blue-400/50'
      }`}
    >
      {!isExhausted && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/10 to-blue-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}

      <div className="relative flex items-center justify-between gap-4">
        <div className="text-left space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-black text-2xl italic tracking-tight">
              {t.quiz.entry_title}
            </h3>
            {isExhausted && (
              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[8px] font-black uppercase">
                {t.quiz.attempts_exhausted}
              </span>
            )}
          </div>
          <p className={isExhausted ? 'text-slate-500 text-[10px] font-bold uppercase tracking-widest' : 'text-blue-100/60 text-[10px] font-bold uppercase tracking-widest'}>
            {isExhausted ? `${t.quiz.reset_info} ${countdown}` : t.quiz.entry_desc}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-4xl mb-1">{isExhausted ? '⌛' : '🎯'}</span>
          <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
            isExhausted ? 'bg-white/5 text-slate-500' : 'bg-white/20 text-white'
          }`}>
            {attemptsUsed} / 4
          </div>
        </div>
      </div>
    </motion.button>
  );
};
