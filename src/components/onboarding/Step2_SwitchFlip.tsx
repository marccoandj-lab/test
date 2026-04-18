import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations, Language } from '../../i18n/translations';

interface Step2Props {
  onNext: () => void;
  language: Language;
}

export const Step2_SwitchFlip: React.FC<Step2Props> = ({ onNext, language }) => {
  const t = translations[language].onboarding;
  const [flipped, setFlipped] = useState(false);
  const [showWords, setShowWords] = useState(false);

  useEffect(() => {
    if (flipped) {
      setShowWords(true);
    }
  }, [flipped]);

  const handleFlip = () => {
    if (!flipped) setFlipped(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.1 }} 
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-950 overflow-hidden"
    >
      {/* Dynamic Background */}
      <motion.div 
         animate={{ backgroundColor: flipped ? "rgba(16, 185, 129, 0.15)" : "rgba(59, 130, 246, 0.15)" }}
         className="absolute inset-0 transition-colors duration-1000"
      />

      <div className="relative w-full max-w-sm aspect-[3/4.5] z-10 perspective-1000" style={{ perspective: 1200 }}>
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={(_, info) => {
            if (info.offset.x > 30 || info.offset.x < -30) {
              handleFlip();
            }
          }}
          onClick={handleFlip}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 1.2, type: 'spring', bounce: 0.3 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="w-full h-full cursor-grab active:cursor-grabbing relative"
        >
          {/* Front / Linear Economy */}
          <div 
            className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-blue-900/80 to-slate-900/90 border border-blue-500/30 backdrop-blur-xl p-8 flex flex-col items-center justify-between shadow-[0_20px_50px_rgba(37,99,235,0.3)]"
            style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
          >
             <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-[50px] pointer-events-none" />
             
             <div className="w-full flex-1 flex flex-col items-center justify-center">
                 <div className="relative mb-8 mt-4">
                   <div className="absolute inset-0 bg-blue-500/40 blur-xl rounded-full scale-150 animate-pulse" />
                   <motion.img 
                     animate={{ y: [0, -10, 0] }} 
                     transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                     src="/assets/6.png" 
                     className="w-44 h-44 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] relative z-10" 
                   />
                 </div>
                 <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white mb-2">Linear</h3>
                 <p className="text-blue-300/80 text-xs font-bold uppercase tracking-widest text-center mb-10">Take • Make • Waste</p>
                 
                 <div className="flex flex-col gap-4 w-full">
                   <div className="bg-slate-950/50 p-4 rounded-2xl flex items-center gap-4 text-white font-medium border border-blue-500/20 shadow-inner">
                     <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-xl">📈</div>
                     <span className="flex-1 text-sm tracking-wide">{language === 'en' ? 'Maximize Profit' : 'Maksimizacija profita'}</span>
                   </div>
                   <div className="bg-slate-950/50 p-4 rounded-2xl flex items-center gap-4 text-white font-medium border border-blue-500/20 shadow-inner">
                     <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-xl">🏭</div>
                     <span className="flex-1 text-sm tracking-wide">{language === 'en' ? 'Deplete Resources' : 'Iscrpljivanje resursa'}</span>
                   </div>
                 </div>
             </div>
             
             <motion.div 
               animate={{ opacity: [0.5, 1, 0.5] }} 
               transition={{ duration: 2, repeat: Infinity }}
               className="mt-8 text-blue-400 text-[10px] font-black uppercase tracking-widest bg-blue-500/10 px-5 py-2.5 rounded-full ring-1 ring-blue-500/30"
             >
               {language === 'en' ? 'Tap to Flip Perspective' : 'Dodirni za obrt perspektive'}
             </motion.div>
          </div>

          {/* Back / Circular Economy */}
          <div 
            className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-emerald-900/90 to-slate-900/90 border border-emerald-500/40 backdrop-blur-xl p-8 flex flex-col items-center justify-between shadow-[0_20px_50px_rgba(16,185,129,0.3)]"
            style={{ transform: 'rotateY(180deg)', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
          >
             <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/20 rounded-full blur-[50px] pointer-events-none" />

             <div className="w-full flex-1 flex flex-col items-center justify-center">
                 <div className="relative mb-8 mt-4">
                   <div className="absolute inset-0 bg-emerald-500/40 blur-xl rounded-full scale-150 animate-pulse" />
                   <motion.img 
                     animate={{ y: [0, -10, 0] }} 
                     transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                     src="/assets/8.png" 
                     className="w-44 h-44 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] relative z-10" 
                   />
                 </div>
                 <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-white mb-2">Circular</h3>
                 <p className="text-emerald-300/80 text-xs font-bold uppercase tracking-widest text-center mb-10">Reduce • Reuse • Recycle</p>

                 <div className="flex flex-col gap-4 w-full">
                   <div className="bg-slate-950/50 p-4 rounded-2xl flex items-center gap-4 text-white font-medium border border-emerald-500/30 shadow-inner">
                     <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-xl">♻️</div>
                     <span className="flex-1 text-sm tracking-wide">{language === 'en' ? 'Extend Lifespan' : 'Produženi vek trajanja'}</span>
                   </div>
                   <div className="bg-slate-950/50 p-4 rounded-2xl flex items-center gap-4 text-white font-medium border border-emerald-500/30 shadow-inner">
                     <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-xl">🌱</div>
                     <span className="flex-1 text-sm tracking-wide">{language === 'en' ? 'Restore Ecosystems' : 'Obnova ekosistema'}</span>
                   </div>
                 </div>
             </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showWords && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute z-20 flex flex-col gap-3 w-full max-w-sm px-6 pointer-events-auto"
            style={{ bottom: "5%" }}
          >
            <div className="bg-slate-900/95 border border-emerald-500/30 p-4 sm:p-5 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center justify-center gap-3">
              <span className="text-2xl">⚖️</span>
              <span className="text-white font-black tracking-wide text-base sm:text-lg">{t.profit_vs_sustainability}</span>
            </div>
            <div className="bg-slate-900/95 border border-emerald-500/30 p-4 sm:p-5 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center justify-center gap-3 ml-6 sm:ml-8 mb-4">
              <span className="text-2xl">🛡️</span>
              <span className="text-white font-black tracking-wide text-base sm:text-lg">{t.risk_vs_resilience}</span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="w-full relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative w-full py-4 sm:py-5 bg-slate-900/90 text-white font-black uppercase tracking-widest text-sm rounded-2xl border border-white/10 backdrop-blur-md flex items-center justify-center gap-3">
                {language === 'en' ? 'Continue' : 'Nastavi'} <span className="text-xl">→</span>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
