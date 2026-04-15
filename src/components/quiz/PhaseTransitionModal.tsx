import React from 'react';
import { motion } from 'framer-motion';
import { Language, translations } from '../../i18n/translations';

interface PhaseTransitionModalProps {
  phase: 'swot' | 'phase2';
  language: Language;
  onNext: () => void;
}

export const PhaseTransitionModal: React.FC<PhaseTransitionModalProps> = ({ phase, language, onNext }) => {
  const t = translations[language];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-3xl px-6"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 text-center shadow-2xl space-y-8"
      >
        <div className="space-y-4">
          <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">{phase === 'swot' ? '📊' : '🔄'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white">
            {phase === 'swot' ? t.quiz.swot_phase : t.quiz.phase_2}
          </h2>
          <p className="text-slate-400 text-sm font-bold leading-relaxed">
            {phase === 'swot' ? t.quiz.swot_intro : t.quiz.next_phase}
          </p>
        </div>

        {phase === 'swot' && (
          <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-2xl">
            <p className="text-indigo-400 font-black text-xs uppercase tracking-widest mb-1">{t.quiz.swot_fixed}</p>
            <p className="text-slate-500 text-[10px] font-bold">Each answer affects your final capital by ±35,000 SC.</p>
          </div>
        )}

        <button
          onClick={onNext}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-indigo-900/20"
        >
          {language === 'en' ? 'CONTINUE ➔' : 'NASTAVI ➔'}
        </button>
      </motion.div>
    </motion.div>
  );
};
