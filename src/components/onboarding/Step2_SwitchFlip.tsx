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
      const timer = setTimeout(() => {
        onNext();
      }, 1800); // give enough time to see the animation
      return () => clearTimeout(timer);
    }
  }, [flipped, onNext]);

  const handleFlip = () => {
    if (!flipped) setFlipped(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-900"
    >
      <div className="relative w-full max-w-sm aspect-[3/4]" style={{ perspective: 1000 }}>
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x > 30 || info.offset.x < -30) {
              handleFlip();
            }
          }}
          onClick={handleFlip}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Front / Linear Economy */}
          <div 
            className="absolute inset-0 rounded-3xl bg-blue-900/60 border border-white/20 backdrop-blur-md p-6 flex flex-col items-center justify-center gap-6"
            style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
          >
             <h3 className="text-xl font-bold text-white mb-4">Linear Economy</h3>
             <div className="flex flex-col gap-4 w-full">
               <div className="bg-white/10 p-4 rounded-xl flex items-center justify-center border border-white/10 gap-3 text-white font-medium">
                 <span className="text-2xl">📈</span> Profit
               </div>
               <div className="bg-white/10 p-4 rounded-xl flex items-center justify-center border border-white/10 gap-3 text-white font-medium">
                 <span className="text-2xl">💸</span> Porez / Tax
               </div>
               <div className="bg-white/10 p-4 rounded-xl flex items-center justify-center border border-white/10 gap-3 text-white font-medium">
                 <span className="text-2xl">🏦</span> Aukcija / Auction
               </div>
             </div>
             <p className="mt-8 text-white/50 text-xs italic">Swipe or Click to switch perspective</p>
          </div>

          {/* Back / Circular Economy */}
          <div 
            className="absolute inset-0 rounded-3xl bg-green-900/60 border border-white/20 backdrop-blur-md p-6 flex flex-col items-center justify-center gap-6"
            style={{ transform: 'rotateY(180deg)', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
          >
             <h3 className="text-xl font-bold text-white mb-4">Circular Economy</h3>
             <div className="flex flex-col gap-4 w-full">
               <div className="bg-white/10 p-4 rounded-xl flex items-center justify-center border border-white/10 gap-3 text-white font-medium">
                 <span className="text-2xl">♻️</span> Reciklaža / Recycle
               </div>
               <div className="bg-white/10 p-4 rounded-xl flex items-center justify-center border border-white/10 gap-3 text-white font-medium">
                 <span className="text-2xl">🛡️</span> Osiguranje / Insurance
               </div>
               <div className="bg-white/10 p-4 rounded-xl flex items-center justify-center border border-white/10 gap-3 text-white font-medium">
                 <span className="text-2xl">🌿</span> Održivost / Sustainability
               </div>
             </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showWords && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute flex items-center justify-center pointer-events-none mt-10"
          >
            <div className="flex flex-col items-center gap-2 text-white font-black text-xl drop-shadow-xl p-6 bg-slate-900/80 rounded-2xl border border-white/10 backdrop-blur-md">
              <span>{t.profit_vs_sustainability}</span>
              <span>{t.risk_vs_resilience}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
