import React from 'react';
import { motion } from 'framer-motion';
import { translations, Language } from '../i18n/translations';
import { cn } from '../utils/cn';

interface RankBadgeProps {
  rank: string;
  language: Language;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'roadmap';
  showName?: boolean;
  className?: string;
}

const RANK_ICONS: Record<string, string> = {
  'Novice': '/assets/rank_icons/a1.png',
  'Apprentice': '/assets/rank_icons/22.png',
  'Professional': '/assets/rank_icons/33.png',
  'Expert': '/assets/rank_icons/44.png',
  'Strategist': '/assets/rank_icons/55-removebg-preview.png',
  'Visionary': '/assets/rank_icons/66.png',
  'Economy Legend': '/assets/rank_icons/final.png',
};

const RANK_COLORS: Record<string, string> = {
  'Novice': 'from-slate-400 to-slate-600',
  'Apprentice': 'from-emerald-400 to-teal-600',
  'Professional': 'from-blue-400 to-indigo-600',
  'Expert': 'from-purple-400 to-pink-600',
  'Strategist': 'from-amber-400 to-orange-600',
  'Visionary': 'from-rose-400 to-red-600',
  'Economy Legend': 'from-yellow-300 via-amber-500 to-yellow-600 animate-pulse',
};

export const RankBadge: React.FC<RankBadgeProps> = ({ 
  rank, 
  language, 
  size = 'md', 
  variant = 'default',
  showName = true, 
  className 
}) => {
  const t = translations[language];
  
  const getRankKey = (r: string) => {
    switch (r) {
      case 'Novice': return 'novice';
      case 'Apprentice': return 'apprentice';
      case 'Professional': return 'professional';
      case 'Expert': return 'expert';
      case 'Strategist': return 'strategist';
      case 'Visionary': return 'visionary';
      case 'Economy Legend': return 'legend';
      default: return 'novice';
    }
  };

  const rankKey = getRankKey(rank);
  const colorClass = RANK_COLORS[rank] || RANK_COLORS['Novice'];

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-14 h-14',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32 md:w-40 md:h-40',
  };

  const isRoadmap = variant === 'roadmap';

  const badgeContent = (
    <div className={cn(
      "relative rounded-xl overflow-hidden shadow-lg border border-white/20 group",
      sizeClasses[size],
      "bg-gradient-to-br",
      colorClass
    )}>
      <img 
        src={RANK_ICONS[rank] || RANK_ICONS['Novice']}
        alt={rank}
        className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
      />
      
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
    </div>
  );

  if (isRoadmap) {
    return (
      <div className={cn("flex flex-col items-center gap-6", className)}>
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          {badgeContent}
          {/* Roadmap glow effect */}
          <div className={cn(
            "absolute -inset-4 rounded-[40px] blur-2xl -z-10 opacity-40",
            "bg-gradient-to-br",
            colorClass
          )} />
        </motion.div>

        {showName && (
          <div className="flex flex-col items-center text-center">
            <span className="text-xs md:text-sm text-slate-500 font-black uppercase tracking-[0.2em] leading-none mb-1">
              {t.ranked.rank}
            </span>
            <span className={cn(
              "font-black italic tracking-tighter text-2xl md:text-4xl uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-2xl"
            )}>
              {t.ranked.ranks[rankKey as keyof typeof t.ranked.ranks]}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {badgeContent}
      
      {showName && (
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">
            {t.ranked.rank}
          </span>
          <span className={cn(
            "font-black italic tracking-tight",
            size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-xl'
          )}>
            {t.ranked.ranks[rankKey as keyof typeof t.ranked.ranks]}
          </span>
        </div>
      )}
    </div>
  );
};
