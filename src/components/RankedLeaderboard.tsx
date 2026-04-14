import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { translations } from '../i18n/translations';
import { RankBadge } from './RankBadge';
import { motion } from 'framer-motion';
import { formatNumber } from '../utils/format';

interface RankedLeaderboardProps {
  onBack: () => void;
  onEnterRoadmap: () => void;
  currentUserId?: string;
  language: 'en' | 'sr';
  userSrp: number;
  userRank: string;
}

interface RankedPlayer {
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
  const t = translations[language];
  const [players, setPlayers] = useState<RankedPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRankings();
  }, []);

  const fetchRankings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, avatar_url, srp, rank')
        .order('srp', { ascending: false })
        .limit(50);

      if (error) throw error;
      setPlayers((data || []) as RankedPlayer[]);
    } catch (err) {
      console.error('Error fetching ranked leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#f0f0f0] flex flex-col items-center justify-center p-4 z-50 overflow-hidden text-slate-900 border-[12px] border-slate-900">
      {/* Background brutalist accents */}
      <div className="absolute top-20 right-[-50px] w-64 h-64 bg-amber-400 border-[4px] border-slate-900 rotate-12 -z-10 shadow-[8px_8px_0px_#000]" />
      <div className="absolute bottom-20 left-[-50px] w-48 h-48 bg-blue-500 border-[4px] border-slate-900 -rotate-12 -z-10 shadow-[8px_8px_0px_#000]" />

      <div className="relative z-10 max-w-lg w-full h-[92vh] flex flex-col gap-6">
        {/* Header Block */}
        <div className="bg-white border-[4px] border-slate-900 p-6 shadow-[8px_8px_0px_#000] relative">
          <button
            onClick={onBack}
            className="absolute -top-4 -left-4 bg-rose-500 text-white border-[4px] border-slate-900 px-4 py-1 font-black uppercase text-xs shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-95"
          >
            ← {t.ui.back_to_menu}
          </button>
          
          <div className="space-y-1 mt-2">
            <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
              <span className="bg-amber-400 px-2 border-[2px] border-slate-900 shadow-[4px_4px_0px_#000] inline-block mr-2 transform -rotate-1">RANKED</span> 
              <span className="block mt-1">HALL OF FAME</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Only the best strategists survive the market.</p>
          </div>
        </div>

        {/* User Stats Block */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-500 border-[4px] border-slate-900 p-4 shadow-[8px_8px_0px_#000] flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase text-white/80">Your Rank</p>
              <p className="text-xl font-black text-white italic uppercase truncate w-24">{(t.ranked.ranks as any)[userRank.toLowerCase().replace(' ', '') === 'economylegend' ? 'legend' : userRank.toLowerCase()] || userRank}</p>
            </div>
            <div className="bg-white border-[2px] border-slate-900 p-1 shadow-[4px_4px_0px_#000]">
               <RankBadge rank={userRank} language={language} size="sm" showName={false} />
            </div>
          </div>
          <div className="bg-emerald-400 border-[4px] border-slate-900 p-4 shadow-[8px_8px_0px_#000] group cursor-pointer hover:bg-emerald-300 transition-colors" onClick={onEnterRoadmap}>
             <p className="text-[10px] font-black uppercase text-slate-800">Total Mastery</p>
             <div className="flex items-center gap-1">
               <p className="text-2xl font-black text-slate-900">✨ {formatNumber(userSrp)}</p>
               <span className="text-xs group-hover:translate-x-1 transition-transform">➔</span>
             </div>
          </div>
        </div>

        {/* Leaderboard Block */}
        <div className="flex-1 bg-white border-[4px] border-slate-900 shadow-[8px_8px_0px_#000] flex flex-col overflow-hidden">
          <div className="bg-slate-900 text-white p-3 flex justify-between items-center border-b-[4px] border-slate-900">
            <span className="text-[10px] font-black uppercase tracking-widest">TOP 50 STRATEGISTS</span>
            <div className="flex gap-1">
               <div className="w-2 h-2 rounded-full bg-rose-500" />
               <div className="w-2 h-2 rounded-full bg-amber-400" />
               <div className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar-light p-4 space-y-3">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center gap-4">
                 <div className="w-12 h-12 border-[6px] border-slate-200 border-t-slate-900 border-l-slate-900 animate-spin" />
                 <p className="text-xs font-black uppercase italic">Calculating supremacy...</p>
              </div>
            ) : (
              players.map((player, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={player.id}
                  className={`flex items-center gap-3 border-[3px] border-slate-900 p-3 shadow-[4px_4px_0px_#000] relative group hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] transition-all bg-white
                  ${player.id === currentUserId ? 'bg-amber-100 !border-amber-500 shadow-amber-500' : ''}`}
                >
                  <div className="text-sm font-black italic w-6 text-center">{idx + 1}</div>
                  <div className="w-10 h-10 border-[2px] border-slate-900 bg-white p-1">
                    <img src={`/assets/${player.avatar_url}.png`} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className="font-black uppercase italic text-xs truncate">{player.username}</h4>
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">#{player.id.substring(0, 6).toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-indigo-600">{formatNumber(player.srp)} SRP</p>
                    <div className="flex justify-end mt-1">
                       <RankBadge rank={player.rank} language={language} size="sm" showName={false} />
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Footer Block */}
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-[8px_8px_0px_#000] border-[4px] border-slate-900">
           <div className="flex flex-col">
             <span className="text-[8px] font-black uppercase text-slate-400">Current Season</span>
             <span className="text-xs font-black uppercase italic tracking-tighter">Season 2: Industrial Boom</span>
           </div>
           <button 
             onClick={onEnterRoadmap}
             className="bg-amber-400 text-slate-900 border-[3px] border-slate-900 px-4 py-2 font-black uppercase text-[10px] shadow-[4px_4px_0px_white] hover:bg-amber-300 transition-colors active:scale-95"
           >
             View Roadmap ➔
           </button>
        </div>
      </div>
    </div>
  );
};
