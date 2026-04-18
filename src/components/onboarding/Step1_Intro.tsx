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
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex flex-col items-center justify-between p-6 bg-slate-950 overflow-hidden"
    >
      {/* Background Animated Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/30 rounded-full blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-green-600/20 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

      <motion.div 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="w-full flex justify-center mt-12 z-10"
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-slate-900/80 ring-1 ring-white/10 rounded-[32px] p-6 backdrop-blur-xl shadow-2xl">
             <img src="/logo.png" alt="EconomySwitch" className="w-24 h-24 object-contain drop-shadow-2xl" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-6xl drop-shadow-xl text-white font-black mix-blend-overlay">ES</span>' }} />
          </div>
        </div>
      </motion.div>

      <motion.div 
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ delay: 0.4, type: "spring", bounce: 0.5 }}
         className="relative z-10 flex flex-col items-center mt-auto mb-16 px-4 w-full"
      >
        {/* Avatars Hero */}
        <div className="flex -space-x-4 mb-8">
           <motion.img animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} src="/assets/1.png" className="w-16 h-16 rounded-full border-2 border-slate-900 shadow-[0_0_20px_rgba(59,130,246,0.5)] bg-blue-900/50 object-cover" />
           <motion.img animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} src="/assets/2.png" className="w-20 h-20 rounded-full border-4 border-slate-900 shadow-[0_0_30px_rgba(34,197,94,0.5)] z-10 bg-green-900/50 object-cover" />
           <motion.img animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} src="/assets/3.png" className="w-16 h-16 rounded-full border-2 border-slate-900 shadow-[0_0_20px_rgba(59,130,246,0.5)] bg-purple-900/50 object-cover" />
        </div>

        <h2 className="text-3xl md:text-4xl font-black text-center text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 mb-6 drop-shadow-sm max-w-sm leading-tight tracking-tight">
          {t.intro_text}
        </h2>
        
        <p className="text-slate-400 text-sm md:text-base text-center max-w-sm mb-12 leading-relaxed font-medium px-4">
          {language === 'en' 
            ? "Step into a simulation where your financial decisions shape the world. Will you optimize for profit, or build for the future?" 
            : "Zakorači u simulaciju gde tvoje finansijske odluke oblikuju svet. Da li optimizuješ za profit, ili gradiš za budućnost?"}
        </p>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="relative w-full max-w-sm group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative w-full py-5 bg-slate-900/90 text-white font-black uppercase tracking-widest text-sm rounded-2xl border border-white/10 backdrop-blur-md flex items-center justify-center gap-3">
            {t.start_experience} <span className="text-xl">→</span>
          </div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
