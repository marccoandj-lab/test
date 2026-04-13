import React from 'react';
import { translations, Language } from '../i18n/translations';
import { cn } from '../utils/cn';

interface RankBadgeProps {
  rank: string;
  language: Language;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
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

export const RankBadge: React.FC<RankBadgeProps> = ({ rank, language, size = 'md', showName = true }) => {
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
  };

  return (
    <div className="flex items-center gap-3">
      <div className={cn(
        "relative rounded-xl flex items-center justify-center shadow-lg border border-white/20 overflow-hidden group",
        sizeClasses[size],
        "bg-gradient-to-br",
        colorClass
      )}>
        <img 
          src={RANK_ICONS[rank] || RANK_ICONS['Novice']}
          alt={rank}
          className="w-full h-full object-contain transition-transform group-hover:scale-110"
        />
        
        {/* Glossy overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
      </div>

      
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
