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
    <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center p-6 z-50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-lg w-full h-[90vh] bg-white/5 p-8 rounded-[40px] border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="text-slate-500 hover:text-white transition-colors text-sm flex items-center gap-2 group"
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

        <div className="text-center space-y-2 mb-10">
          <h1 className="text-3xl font-black text-white italic tracking-tight drop-shadow-xl">
            {t.ranked.roadmap_title}
          </h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] max-w-[280px] mx-auto leading-relaxed">
            {t.ranked.roadmap_desc}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 relative">
          {/* Vertical Path Line */}
          <div className="absolute left-[31px] top-4 bottom-4 w-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: '100%' }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-blue-500 via-emerald-500 to-amber-500 opacity-20"
            />
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 relative"
          >
            {RANK_THRESHOLDS.map((rank, idx) => {
              const isUnlocked = currentSrp >= rank.minSrp;
              const isCurrent = currentRank === rank.name;
              const nextRank = RANK_THRESHOLDS[idx + 1];
              const progressToNext = nextRank 
                ? Math.min(100, Math.max(0, ((currentSrp - rank.minSrp) / (nextRank.minSrp - rank.minSrp)) * 100))
                : 100;

              return (
                <motion.div 
                  key={rank.name}
                  variants={cardVariants}
                  className="flex gap-6 relative"
                >
                  {/* Rank Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-500",
                      isUnlocked ? "bg-white/10 border-white/20 shadow-lg" : "bg-black/40 border-white/5 opacity-40 grayscale"
                    )}>
                      <RankBadge rank={rank.name} language={language} size="sm" showName={false} />
                    </div>
                    {isCurrent && (
                      <motion.div 
                        layoutId="active-glow"
                        className="absolute -inset-2 bg-blue-500/20 rounded-[24px] blur-xl -z-10"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>

                  {/* Rank Content */}
                  <div className={cn(
                    "flex-1 p-5 rounded-3xl border transition-all duration-500",
                    isCurrent 
                      ? "bg-white/10 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]" 
                      : isUnlocked 
                        ? "bg-white/5 border-white/10" 
                        : "bg-black/20 border-white/5 opacity-40"
                  )}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className={cn(
                          "font-black italic tracking-tight text-lg uppercase",
                          isUnlocked ? "text-white" : "text-slate-500"
                        )}>
                          {(t.ranked.ranks as any)[rank.name.toLowerCase().replace(' ', '') === 'economylegend' ? 'legend' : rank.name.toLowerCase()]}
                        </h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          {isUnlocked ? `✨ ${formatNumber(rank.minSrp)} SRP` : `🔒 ${formatNumber(rank.minSrp)} SRP`}
                        </p>
                      </div>
                      {isUnlocked && !isCurrent && (
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-black uppercase tracking-tighter border border-emerald-500/20">
                          {t.ranked.unlocked}
                        </span>
                      )}
                      {isCurrent && (
                        <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-black uppercase tracking-tighter border border-blue-500/20 animate-pulse">
                          {t.ranked.current_rank}
                        </span>
                      )}
                    </div>

                    {isCurrent && nextRank && (
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-400">
                          <span>{t.ranked.next_rank_req}</span>
                          <span className="text-blue-400">{formatNumber(currentSrp)} / {formatNumber(nextRank.minSrp)}</span>
                        </div>
                        <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 p-[1px]">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progressToNext}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-gradient-to-r from-blue-600 to-indigo-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                          />
                        </div>
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
