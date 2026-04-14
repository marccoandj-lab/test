import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { translations } from '../i18n/translations';
import { RankBadge } from './RankBadge';
import { motion, AnimatePresence } from 'framer-motion';
import { formatNumber } from '../utils/format';

interface RankedLeaderboardProps {
  onBack: () => void;
  onEnterRoadmap: () => void;
  currentUserId: string;
  language: 'en' | 'sr';
  userSrp: number;
  userRank: string;
}

interface RankedEntry {
  id: string;
  username: string;
  avatar_url: string;
  srp: number;
  rank: string;
}

export const RankedLeaderboard: React.FC<RankedLeaderboardProps> = ({ 
  onBack, 
  onEnterRoadmap,
  currentUserId,
  language,
  userSrp,
  userRank
}) => {
  const [entries, setEntries] = useState<RankedEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const t = translations[language];

  useEffect(() => {
    fetchRankedData();
  }, []);

  const fetchRankedData = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, avatar_url, srp, rank')
        .order('srp', { ascending: false })
        .limit(20);

      if (error) throw error;
      setEntries(data || []);
    } catch (err) {
      console.error('Error fetching ranked data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0: return 'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-900 border-amber-200';
      case 1: return 'bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-500 text-slate-900 border-cyan-200';
      case 2: return 'bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 text-white border-rose-300';
      default: return 'bg-white/5 text-white/90 border-white/10 hover:bg-white/10';
    }
  };

  const getRankNumberIcon = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `${index + 1}`;
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0f172a] flex flex-col items-center justify-center p-4 z-50 overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-md h-[85vh] bg-slate-900/90 rounded-[3rem] border-4 border-amber-500/30 flex flex-col shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
      >
        {/* Ribbon Header */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 w-80 flex flex-col items-center">
          <div className="relative w-full text-center">
            {/* Ribbon Wings */}
            <div className="absolute top-4 left-0 w-8 h-10 bg-rose-700 rounded-lg skew-y-6 -z-10" />
            <div className="absolute top-4 right-0 w-8 h-10 bg-rose-700 rounded-lg -skew-y-6 -z-10" />
            
            {/* Ribbon Body */}
            <div className="mx-6 py-4 bg-gradient-to-b from-rose-400 to-rose-600 rounded-2xl shadow-[0_8px_0px_#9f1239] border-t border-white/30">
              <h2 className="text-2xl font-black text-white tracking-widest italic uppercase drop-shadow-md">
                {t.lobby.leaderboard}
              </h2>
            </div>
          </div>
        </div>

        {/* Action Buttons Header */}
        <div className="pt-16 pb-4 px-8 flex justify-between items-center bg-white/5 rounded-t-[3rem]">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-white hover:bg-slate-700 transition-colors shadow-lg"
          >
            ✕
          </button>
          <div className="text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t.ranked.srp}</p>
            <p className="text-xl font-black text-amber-400">✨ {formatNumber(userSrp)}</p>
          </div>
          <button
            onClick={onEnterRoadmap}
            className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 hover:bg-amber-500/30 transition-colors shadow-lg"
          >
            🗺️
          </button>
        </div>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4 space-y-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
              <p className="text-slate-400 font-bold italic animate-pulse tracking-widest">{t.ui.loading}</p>
            </div>
          ) : (
            <AnimatePresence>
              {entries.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    flex items-center gap-3 p-3 rounded-[2rem] border-2 shadow-lg transition-all
                    ${getRankColor(index)}
                    ${player.id === currentUserId ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 border-white/50' : ''}
                  `}
                >
                  <div className={`
                    w-16 h-16 rounded-full overflow-hidden border-4 flex-shrink-0 bg-slate-800 shadow-2xl
                    ${index < 3 ? 'border-white/60' : 'border-white/20'}
                  `}>
                    <img src={`/assets/${player.avatar_url}.png`} alt={player.username} className="w-full h-full object-cover scale-110" />
                  </div>
                  
                  <div className="flex-1 overflow-hidden ml-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black opacity-50">{getRankNumberIcon(index)}</span>
                      <p className="font-bold truncate tracking-tight text-sm">
                        {player.username} 
                        {player.id === currentUserId && <span className="ml-1 opacity-60 text-[10px] italic">{t.ui.you}</span>}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                       <RankBadge rank={player.rank} language={language} size="sm" showName={true} />
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className={`px-4 py-1.5 rounded-full font-black text-sm flex items-center gap-1.5 shadow-inner ${index < 2 ? 'bg-black/10' : 'bg-black/20'}`}>
                      <span className="text-xs">✨</span>
                      {formatNumber(player.srp)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Footer Info */}
        <div className="p-6 bg-slate-800/50 rounded-b-[3rem] border-t border-white/5">
          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400">
            <span>{t.ranked.rank}: {userRank}</span>
            <span>{t.ranked.srp}: {formatNumber(userSrp)}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
