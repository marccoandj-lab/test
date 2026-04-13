import React from 'react';
import { DailyChallenge } from '../types/game';
import { translations, Language } from '../i18n/translations';
import { formatNumber } from '../utils/format';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface DailyChallengesProps {
  challenges: DailyChallenge[];
  onClaim?: (index: number) => void;
  language: Language;
}

export const DailyChallenges: React.FC<DailyChallengesProps> = ({ challenges, onClaim, language }) => {
  const t = translations[language];

  if (!challenges || challenges.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/60 flex items-center gap-2">
          📅 {t.ranked.daily_title}
        </h3>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.ranked.reset_at}</span>
      </div>

      <div className="grid gap-3">
        {challenges.map((challenge, idx) => {
          const progress = Math.min(100, (challenge.current / challenge.target) * 100);
          const isComplete = challenge.current >= challenge.target;

          return (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "relative bg-white/5 border border-white/5 rounded-2xl p-4 overflow-hidden group transition-all",
                isComplete && !challenge.claimed ? "border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]" : "",
                challenge.claimed ? "opacity-60" : "hover:bg-white/10"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex flex-col">
                  <span className="text-white font-black text-xs tracking-tight">
                    {t.ranked.challenge_details[challenge.type]?.label || challenge.label}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[9px] text-emerald-500/80 font-bold uppercase tracking-wider">
                      {t.ranked.challenge_details[challenge.type]?.field}
                    </span>
                    <span className="text-[9px] text-slate-600 font-bold">•</span>
                    <span className={cn(
                      "text-[9px] font-bold uppercase tracking-wider",
                      t.ranked.challenge_details[challenge.type]?.mode === 'multiplayer' ? "text-indigo-400/80" : "text-emerald-500/80"
                    )}>
                      {t.ranked.modes[t.ranked.challenge_details[challenge.type]?.mode as keyof typeof t.ranked.modes]}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                    {formatNumber(challenge.current)} / {formatNumber(challenge.target)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20">
                    <span className="text-amber-500 text-xs">✨</span>
                    <span className="text-amber-500 font-black text-[10px]">{challenge.reward} SRP</span>
                  </div>
                </div>
              </div>

              <div className="relative h-2 w-full bg-black/40 rounded-full overflow-hidden mb-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className={cn(
                    "absolute inset-y-0 left-0 rounded-full",
                    isComplete ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-blue-500"
                  )}
                />
              </div>

              {isComplete && !challenge.claimed && (
                <button
                  onClick={() => onClaim && onClaim(idx)}
                  className="mt-3 w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black text-[10px] uppercase tracking-[0.2em] py-2 rounded-xl transition-all shadow-lg active:scale-95 animate-pulse"
                >
                  {t.ranked.claim}
                </button>
              )}

              {challenge.claimed && (
                <div className="mt-3 w-full bg-white/5 text-slate-500 font-black text-[10px] uppercase tracking-[0.2em] py-2 rounded-xl text-center border border-white/5">
                  ✅ {t.ranked.claimed}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
