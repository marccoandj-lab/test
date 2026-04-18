import React from 'react';
import { motion } from 'framer-motion';
import { translations, Language } from '../../i18n/translations';

interface Step1Props {
  onNext: () => void;
  language: Language;
}

export const Step1_Intro: React.FC<Step1Props> = ({ onNext, language }) => {
  const t = translations[language].onboarding;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-900/40 to-green-900/40"
    >
      <div className="w-24 h-24 bg-white/10 rounded-[32px] flex items-center justify-center mb-8 border border-white/20 backdrop-blur-md shadow-2xl">
         <img src="/assets/logo/logo.png" alt="EconomySwitch" className="w-16 h-16 object-contain drop-shadow-xl" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-5xl">🔄</span>' }} />
      </div>
      <h2 className="text-2xl md:text-3xl font-black text-center text-white mb-12 drop-shadow-lg max-w-md leading-relaxed">
        {t.intro_text}
      </h2>
      <button 
        onClick={onNext}
        className="w-full max-w-sm py-4 bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest rounded-2xl border border-white/20 backdrop-blur-md transition-all active:scale-95 text-sm"
      >
        {t.start_experience}
      </button>
    </motion.div>
  );
};
