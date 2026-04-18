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
      initial={{ opacity: 0, scale: 1.05 }} 
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute inset-0 flex flex-col p-4 sm:p-6 bg-slate-950 overflow-y-auto overflow-x-hidden min-h-screen pb-12"
    >
      {/* Dynamic Background */}
      <motion.div 
         animate={{ backgroundColor: flipped ? "rgba(16, 185, 129, 0.15)" : "rgba(59, 130, 246, 0.15)" }}
         className="absolute inset-0 transition-colors duration-1000 -z-10"
      />

      <div className="text-center mt-6 z-10 shrink-0">
        <h2 className="text-xl md:text-2xl font-black text-white drop-shadow-md">
          {language === 'en' ? 'Two Economic Worlds' : 'Dva ekonomska sveta'}
        </h2>
        <p className="text-slate-400 text-xs md:text-sm mt-2">
          {language === 'en' ? 'Swipe the card left or right to change perspective.' : 'Prevuci kartu levo ili desno da promeniš perspektivu.'}
        </p>
      </div>

      {/* 3D Card Area - Takes up available space but shrinks to avoid overlap */}
      <div className="flex-1 min-h-0 relative w-full flex items-center justify-center mt-6 perspective-1000 z-10" style={{ perspective: 1200 }}>
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
          className="w-full max-w-xs h-full max-h-[420px] cursor-grab active:cursor-grabbing relative"
        >
          {/* Front / Linear Economy */}
          <div 
            className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-slate-900 to-blue-900/80 border border-blue-500/30 backdrop-blur-xl flex flex-col items-center justify-center p-6 shadow-[0_20px_50px_rgba(37,99,235,0.2)] overflow-hidden"
            style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-[40px] pointer-events-none" />
             
             <div className="w-full flex-1 flex flex-col items-center justify-center">
                 <div className="relative mb-6">
                   <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full scale-125 animate-pulse" />
                   <motion.img 
                     animate={{ y: [0, -8, 0] }} 
                     transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                     src="/assets/6.png" 
                     className="w-32 h-32 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] relative z-10" 
                   />
                 </div>
                 <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white mb-1">Linear</h3>
                 <p className="text-blue-300/80 text-[10px] font-bold uppercase tracking-widest text-center mb-6">Take • Make • Waste</p>
                 
                 <div className="flex flex-col gap-3 w-full">
                   <div className="bg-slate-950/60 p-3 rounded-2xl flex items-center gap-3 text-white border border-blue-500/20">
                     <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-lg">📈</div>
                     <span className="flex-1 text-xs font-bold">{language === 'en' ? 'Maximize Profit' : 'Brza zarada, visoki porezi'}</span>
                   </div>
                   <div className="bg-slate-950/60 p-3 rounded-2xl flex items-center gap-3 text-white border border-blue-500/20">
                     <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-lg">🏭</div>
                     <span className="flex-1 text-xs font-bold">{language === 'en' ? 'Deplete Resources' : 'Trošenje resursa'}</span>
                   </div>
                 </div>
             </div>
             
             <motion.div 
               animate={{ opacity: [0.3, 1, 0.3] }} 
               transition={{ duration: 2, repeat: Infinity }}
               className="mt-6 text-blue-400 text-[10px] font-black uppercase tracking-widest bg-blue-500/10 px-4 py-2 rounded-full ring-1 ring-blue-500/30"
             >
               {language === 'en' ? 'Tap to Flip' : 'Dodirni kartu za obrt'}
             </motion.div>
          </div>

          {/* Back / Circular Economy */}
          <div 
            className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-slate-900 to-emerald-900/90 border border-emerald-500/40 backdrop-blur-xl flex flex-col items-center justify-center p-6 shadow-[0_20px_50px_rgba(16,185,129,0.2)] overflow-hidden"
            style={{ transform: 'rotateY(180deg)', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-[40px] pointer-events-none" />

             <div className="w-full flex-1 flex flex-col items-center justify-center">
                 <div className="relative mb-6">
                   <div className="absolute inset-0 bg-emerald-500/30 blur-xl rounded-full scale-125 animate-pulse" />
                   <motion.img 
                     animate={{ y: [0, -8, 0] }} 
                     transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                     src="/assets/8.png" 
                     className="w-32 h-32 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] relative z-10" 
                   />
                 </div>
                 <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-white mb-1">Circular</h3>
                 <p className="text-emerald-300/80 text-[10px] font-bold uppercase tracking-widest text-center mb-6">Reduce • Reuse • Recycle</p>

                 <div className="flex flex-col gap-3 w-full">
                   <div className="bg-slate-950/60 p-3 rounded-2xl flex items-center gap-3 text-white border border-emerald-500/30">
                     <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-lg">♻️</div>
                     <span className="flex-1 text-xs font-bold">{language === 'en' ? 'Extend Lifespan' : 'Manji porez, duži vek'}</span>
                   </div>
                   <div className="bg-slate-950/60 p-3 rounded-2xl flex items-center gap-3 text-white border border-emerald-500/30">
                     <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-lg">🌱</div>
                     <span className="flex-1 text-xs font-bold">{language === 'en' ? 'Restore Ecosystems' : 'Obnova ekosistema'}</span>
                   </div>
                 </div>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Area - Guaranteed Space */}
      <div className="shrink-0 w-full max-w-sm mx-auto h-[160px] flex items-center justify-center z-20">
        <AnimatePresence>
          {showWords ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="flex flex-col gap-4 w-full"
            >
              <div className="flex gap-2">
                <div className="flex-1 bg-slate-900/90 border border-emerald-500/30 p-3 rounded-xl shadow-lg backdrop-blur-md flex flex-col items-center justify-center gap-1 text-center">
                  <span className="text-lg">⚖️</span>
                  <span className="text-white text-[10px] font-black uppercase">{t.profit_vs_sustainability}</span>
                </div>
                <div className="flex-1 bg-slate-900/90 border border-emerald-500/30 p-3 rounded-xl shadow-lg backdrop-blur-md flex flex-col items-center justify-center gap-1 text-center">
                  <span className="text-lg">🛡️</span>
                  <span className="text-white text-[10px] font-black uppercase">{t.risk_vs_resilience}</span>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="w-full relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative w-full py-4 bg-slate-900/90 text-white font-black uppercase tracking-widest text-sm rounded-2xl border border-white/10 backdrop-blur-md flex items-center justify-center gap-3">
                  {language === 'en' ? 'Continue' : 'Nastavi'} <span className="text-xl">→</span>
                </div>
              </motion.button>
            </motion.div>
          ) : (
             <div className="flex flex-col items-center text-center opacity-50">
               <span className="text-3xl mb-2 animate-bounce">👆</span>
               <p className="text-xs text-white font-medium uppercase tracking-widest">
                 {language === 'en' ? 'Interact with the card' : 'Istraži kartu'}
               </p>
             </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
