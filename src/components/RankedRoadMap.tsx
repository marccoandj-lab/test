import React from 'react';
import { motion } from 'framer-motion';
import { translations, Language } from '../i18n/translations';
import { RANK_THRESHOLDS } from '../services/ChallengeService';
import { cn } from '../utils/cn';
import { formatNumber } from '../utils/format';
import { RankBadge } from './RankBadge';

interface RankedRoadMapProps {
  onBack: () => void;
  currentSrp: number;
  currentRank: string;
  language: Language;
}

export const RankedRoadMap: React.FC<RankedRoadMapProps> = ({ onBack, currentSrp, currentRank, language }) => {
  const t = translations[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center p-3 md:p-6 z-50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-4xl w-full h-[95dvh] bg-white/5 p-4 md:p-8 rounded-[40px] border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col">
        <div className="flex items-center justify-between mb-4 md:mb-8 px-2">
          <button
            onClick={onBack}
            className="text-slate-500 hover:text-white transition-colors text-xs md:text-sm flex items-center gap-1.5 md:gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> {t.ui.back_to_menu}
          </button>
          <div className="flex gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">
              {language === 'en' ? 'Economic Mastery Path' : 'Put ekonomskog majstorstva'}
            </span>
          </div>
        </div>

        <div className="text-center space-y-1 md:space-y-2 mb-6 md:mb-10">
          <h1 className="text-3xl md:text-5xl font-black text-white italic tracking-tight drop-shadow-xl uppercase">
            {t.ranked.roadmap_title}
          </h1>
          <p className="text-slate-500 text-[8px] md:text-[12px] font-bold uppercase tracking-[0.3em] max-w-[400px] mx-auto leading-relaxed">
            {t.ranked.roadmap_desc}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 md:px-12 relative group/roadmap">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12 md:space-y-24 py-10 relative z-10"
          >
            {RANK_THRESHOLDS.map((rank, idx) => {
              const isUnlocked = currentSrp >= rank.minSrp;
              const isCurrent = currentRank === rank.name;
              const nextRank = RANK_THRESHOLDS[idx + 1];
              const progressToNext = nextRank 
                ? Math.min(100, Math.max(0, ((currentSrp - rank.minSrp) / (nextRank.minSrp - rank.minSrp)) * 100))
                : 100;

              const isEven = idx % 2 === 0;

              return (
                <motion.div 
                  key={rank.name}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                  className={cn(
                    "flex flex-col md:flex-row items-center gap-6 md:gap-20 relative w-full",
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  {/* Rank Island */}
                  <div className="relative z-10 flex-shrink-0">
                    <RankBadge 
                      rank={rank.name} 
                      language={language} 
                      size="xl" 
                      variant="roadmap" 
                      showName={false}
                      className={cn(
                        "transition-all duration-700",
                        !isUnlocked && "opacity-30 grayscale blur-[1px]"
                      )}
                    />
                    
                    {isCurrent && (
                      <motion.div 
                        layoutId="active-island-glow"
                        className="absolute -inset-10 bg-blue-500/20 rounded-full blur-[60px] -z-10"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3] 
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                    )}
                  </div>

                  {/* Floating Info Card */}
                  <div className={cn(
                    "flex-1 w-full max-w-[380px] p-5 md:p-7 rounded-[32px] border backdrop-blur-3xl transition-all duration-500 relative group",
                    isCurrent 
                      ? "bg-white/10 border-blue-500/40 shadow-[0_0_50px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/20" 
                      : isUnlocked 
                        ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 shadow-xl" 
                        : "bg-black/40 border-white/5 opacity-40"
                  )}>
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] leading-none block mb-1.5">
                            {t.ranked.rank}
                          </span>
                          <h3 className={cn(
                            "font-black italic tracking-tight text-xl sm:text-2xl md:text-3xl uppercase leading-[0.9] break-words",
                            isUnlocked ? "text-white" : "text-slate-500"
                          )}>
                            {(t.ranked.ranks as any)[rank.name.toLowerCase().replace(' ', '') === 'economylegend' ? 'legend' : rank.name.toLowerCase()]}
                          </h3>
                        </div>
                        
                        <div className="shrink-0 pt-1">
                          {isCurrent ? (
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)] animate-pulse" />
                          ) : isUnlocked ? (
                            <div className="text-emerald-500">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          ) : (
                            <div className="text-slate-700">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                         <span className="text-[11px] font-black text-slate-300 bg-white/5 px-2.5 py-1 rounded-xl border border-white/10 shadow-inner">
                           ✨ {formatNumber(rank.minSrp)} SRP
                         </span>
                         {isCurrent && (
                           <span className="text-[9px] font-black uppercase tracking-widest text-blue-400 animate-pulse bg-blue-500/10 px-2 py-1 rounded-lg border border-blue-500/20">
                             {t.ranked.current_rank}
                           </span>
                         )}
                      </div>

                      {isCurrent && nextRank && (
                        <div className="pt-4 space-y-3">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <span>{t.ranked.next_rank_req}</span>
                            <span className="text-blue-400">+{formatNumber(nextRank.minSrp - currentSrp)} SRP</span>
                          </div>
                          <div className="h-2.5 w-full bg-black/60 rounded-full overflow-hidden p-[2px] ring-1 ring-white/10 shadow-inner">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${progressToNext}%` }}
                              transition={{ duration: 2, ease: "circOut" }}
                              className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Decorative corner accent */}
                    {isCurrent && (
                      <div className="absolute -top-2 -right-2 w-10 h-10 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 right-0 w-[141%] h-[141%] bg-blue-500/20 rotate-45 translate-x-[50%] -translate-y-[50%] blur-sm" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em]">
          <span>{language === 'en' ? 'YOUR MASTERY SCORE:' : 'TVOJ REZULTAT MAJSTORSTVA:'}</span>
          <span className="text-blue-400 font-black italic">✨ {formatNumber(currentSrp)} SRP</span>
        </div>
      </div>
    </div>
  );
};
