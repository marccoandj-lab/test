import React from 'react';
import { motion } from 'framer-motion';
import { translations, Language } from '../../i18n/translations';

interface Step3Props {
  onComplete: () => void;
  language: Language;
}

import { Variants } from 'framer-motion';

const listVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -30, scale: 0.9 },
  show: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", bounce: 0.4 } }
};

export const Step3_CTA: React.FC<Step3Props> = ({ onComplete, language }) => {
  const t = translations[language].onboarding;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-950 overflow-hidden" 
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" />

      {/* Progress Line */}
      <div className="w-full max-w-sm mb-12 space-y-2 z-10 relative mt-8">
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden shadow-inner">
          <motion.div 
            initial={{ width: '40%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-blue-500 via-emerald-400 to-green-500 rounded-full relative"
          >
             <div className="absolute inset-0 bg-white/30 animate-[pulse_2s_ease-in-out_infinite]" />
          </motion.div>
        </div>
      </div>

      {/* Character Avatars Row */}
      <motion.div 
         initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
         className="flex items-end justify-center mb-8 z-10 relative"
      >
         <img src="/assets/7.png" className="w-20 h-20 -mr-4 drop-shadow-2xl z-0 blur-[1px] opacity-70" />
         <img src="/assets/5.png" className="w-28 h-28 z-20 drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]" />
         <img src="/assets/4.png" className="w-24 h-24 -ml-6 drop-shadow-2xl z-10 opacity-90" />
      </motion.div>

      <motion.div variants={listVariants} initial="hidden" animate="show" className="flex flex-col gap-4 w-full max-w-sm mb-10 z-10 relative">
        <motion.div variants={itemVariants} className="flex items-center gap-5 bg-slate-900/60 p-4 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl group hover:bg-slate-800/80 transition-colors">
           <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform shrink-0">
             <span className="text-2xl">📊</span>
           </div>
           <div className="flex flex-col">
              <span className="text-white font-black tracking-tight">{t.financial_literacy}</span>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{language === 'en' ? 'Master Markets' : 'Kreiraj kapital'}</span>
           </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex items-center gap-5 bg-slate-900/60 p-4 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl group hover:bg-slate-800/80 transition-colors">
           <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform shrink-0">
             <span className="text-2xl">♻️</span>
           </div>
           <div className="flex flex-col">
              <span className="text-white font-black tracking-tight">{t.circular_economy}</span>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{language === 'en' ? 'Build Resilience' : 'Održi svet'}</span>
           </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex items-center gap-5 bg-slate-900/60 p-4 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl group hover:bg-slate-800/80 transition-colors">
           <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform shrink-0">
             <span className="text-2xl">🎮</span>
           </div>
           <div className="flex flex-col">
              <span className="text-white font-black tracking-tight">{t.play_based_learning}</span>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{language === 'en' ? 'Learn with friends' : 'Uči kroz igru'}</span>
           </div>
        </motion.div>
      </motion.div>

      <motion.h2 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
        className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-8 text-center px-4 leading-tight z-10 relative tracking-tight"
      >
        {t.cta_text}
      </motion.h2>

      <motion.button 
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
        className="w-full max-w-sm py-5 bg-gradient-to-r from-emerald-500 to-blue-600 outline-none text-white font-black uppercase tracking-widest rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_rgba(59,130,246,0.6)] transition-all text-sm mb-6 z-10 relative overflow-hidden group border border-white/20"
      >
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
        <span className="drop-shadow-md">{t.create_account_and_start}</span>
      </motion.button>

      <motion.p 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="text-slate-300 border border-emerald-500/30 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 z-10 relative justify-center bg-slate-900/80 py-2.5 px-5 rounded-full shadow-2xl backdrop-blur-md"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)] border border-white/50" />
        {t.social_proof}
      </motion.p>
    </motion.div>
  );
};
