import React from 'react';
import { motion } from 'framer-motion';
import { translations, Language } from '../../i18n/translations';

interface Step3Props {
  onComplete: () => void;
  language: Language;
}

export const Step3_CTA: React.FC<Step3Props> = ({ onComplete, language }) => {
  const t = translations[language].onboarding;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-900"
    >
      <div className="w-full max-w-sm mb-12 space-y-2">
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '66%' }}
            transition={{ duration: 0.8 }}
            className="h-full bg-blue-500 rounded-full"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-sm mb-12">
        <motion.div 
           initial={{ opacity:0, x: -20 }} animate={{ opacity:1, x:0 }} transition={{ delay: 0.2 }}
           className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10"
        >
           <span className="text-2xl">📊</span>
           <span className="text-white font-bold">{t.financial_literacy}</span>
        </motion.div>
        <motion.div 
           initial={{ opacity:0, x: -20 }} animate={{ opacity:1, x:0 }} transition={{ delay: 0.4 }}
           className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10"
        >
           <span className="text-2xl">♻️</span>
           <span className="text-white font-bold">{t.circular_economy}</span>
        </motion.div>
        <motion.div 
           initial={{ opacity:0, x: -20 }} animate={{ opacity:1, x:0 }} transition={{ delay: 0.6 }}
           className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10"
        >
           <span className="text-2xl">🌍</span>
           <span className="text-white font-bold">{t.play_based_learning}</span>
        </motion.div>
      </div>

      <h2 className="text-xl font-medium text-white mb-8 text-center px-4 leading-relaxed">
        {t.cta_text}
      </h2>

      <button 
        onClick={onComplete}
        className="w-full max-w-sm py-5 bg-gradient-to-r from-blue-600 to-green-600 hover:scale-105 text-white font-black uppercase tracking-widest rounded-2xl shadow-[0_0_40px_rgba(34,197,94,0.3)] transition-all active:scale-95 text-xs mb-6"
      >
        {t.create_account_and_start}
      </button>

      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
        {t.social_proof}
      </p>
    </motion.div>
  );
};
