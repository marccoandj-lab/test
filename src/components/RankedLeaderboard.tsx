import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { translations } from '../i18n/translations';
import { formatNumber } from '../utils/format';

interface RankedLeaderboardProps {
  onBack: () => void;
  onOpenRoadmap: () => void;
  currentUserId?: string;
  language: 'en' | 'sr';
}

interface PlayerRankStats {
  id: string;
  username: string;
  avatar_url: string;
  srp: number;
  rank: string;
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

export const RankedLeaderboard: React.FC<RankedLeaderboardProps> = ({ 
  onBack, 
  onOpenRoadmap,
  currentUserId, 
  language 
}) => {
  const t = translations[language];
  const [players, setPlayers] = useState<PlayerRankStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [myRank, setMyRank] = useState<{ rank: number, stats: PlayerRankStats } | null>(null);

  useEffect(() => {
    fetchRankings();

    const channel = supabase
      .channel('ranked_updates_v2')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'profiles' },
        () => fetchRankings()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchRankings = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, avatar_url, srp, rank')
        .order('srp', { ascending: false })
        .limit(50);

      if (error) throw error;

      const rankedData = (data || []) as PlayerRankStats[];
      setPlayers(rankedData);

      if (currentUserId) {
        const found = rankedData.find(p => p.id === currentUserId);
        if (found) {
          setMyRank({
            rank: rankedData.findIndex(p => p.id === currentUserId) + 1,
            stats: found
          });
        }
      }
    } catch (err) {
      console.error('Error fetching rankings:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderRankIcon = (rank: string) => {
    const icon = RANK_ICONS[rank] || RANK_ICONS['Novice'];
    return (
      <div className="relative group/badge">
        <div className="w-10 h-10 rounded-xl bg-slate-950/40 p-1.5 border border-white/10 flex items-center justify-center shadow-lg transition-all group-hover/badge:scale-110 group-hover/badge:border-blue-500/50">
          <img src={icon} alt={rank} className="w-full h-full object-contain" />
        </div>
        
        {/* Glow effect for high ranks */}
        {['Strategist', 'Visionary', 'Economy Legend'].includes(rank) && (
          <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full -z-10 animate-pulse" />
        )}
      </div>
    );
  };

  const getRankBadge = (rankPos: number) => {
    if (rankPos === 1) return <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center border-2 border-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.5)]"><span className="text-white font-black text-lg">1</span></div>;
    if (rankPos === 2) return <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center border-2 border-slate-200 shadow-lg"><span className="text-white font-black">2</span></div>;
    if (rankPos === 3) return <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-600 to-orange-800 flex items-center justify-center border-2 border-orange-500 shadow-lg"><span className="text-white font-black">3</span></div>;
    return <span className="text-slate-500 font-black text-sm w-10 text-center">{rankPos}</span>;
  };

  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 z-50 overflow-hidden">
      {/* Background with Circular Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, #475569 1px, transparent 0)',
          backgroundSize: '24px 24px' 
        }} 
      />
      
      {/* Glossy Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full h-[90vh] flex flex-col pt-12 pb-8">
        
        {/* Floating Header Badge */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-10 py-3 bg-blue-600 border-2 border-blue-400 rounded-2xl shadow-[0_8px_30px_-5px_rgba(37,99,235,0.6)] z-20">
          <h1 className="text-white font-black uppercase tracking-[0.2em] italic text-lg drop-shadow-lg">LEADERBOARD</h1>
        </div>

        <div className="flex-1 bg-slate-900/60 border border-white/10 rounded-[40px] backdrop-blur-3xl shadow-2xl flex flex-col overflow-hidden">
          
          {/* Top Actions */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
            <button
              onClick={onBack}
              className="text-slate-500 hover:text-white transition-colors text-xs font-bold flex items-center gap-2 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span> {t.ui.back_to_menu}
            </button>
            <button
               onClick={onOpenRoadmap}
               className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-500 text-[10px] font-black uppercase tracking-widest hover:bg-amber-500/20 hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(245,158,11,0.1)] flex items-center gap-2 group"
            >
              <span>Roadmap</span>
              <span className="group-hover:rotate-12 transition-transform">🗺️</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar space-y-3">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest animate-pulse">Synchronizing rankings...</p>
              </div>
            ) : (
              players.map((p, idx) => (
                <div 
                  key={p.id}
                  className={`relative flex items-center group transition-all duration-300 ${p.id === currentUserId ? 'scale-[1.02]' : ''}`}
                >
                  {/* Rank Indicator */}
                  <div className="flex-shrink-0 w-12 flex justify-center">
                    {getRankBadge(idx + 1)}
                  </div>

                  {/* Avatar Container */}
                  <div className="relative z-10 -ml-2">
                    <div className={`w-20 h-20 rounded-full bg-slate-800 p-1.5 border-4 ${idx < 3 ? 'border-amber-500/30' : 'border-white/5'} shadow-2xl transition-transform group-hover:scale-105 overflow-hidden`}>
                      <img src={`/assets/${p.avatar_url || '1'}.png`} className="w-full h-full object-contain drop-shadow-xl" alt="" />
                    </div>
                  </div>

                  {/* Player Info Strip */}
                  <div className={`flex-1 -ml-6 pl-10 pr-6 py-3 rounded-r-2xl border-y border-r transition-all duration-500 flex items-center justify-between ${
                    p.id === currentUserId 
                    ? 'bg-blue-600/30 border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.2)]' 
                    : 'bg-gradient-to-r from-blue-900/40 to-blue-800/20 border-white/10 group-hover:bg-blue-900/60'
                  }`}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-black text-sm uppercase tracking-tight truncate max-w-[140px] italic">{p.username}</h4>
                        {p.id === currentUserId && (
                          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[8px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20 animate-pulse">
                            YOU
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {renderRankIcon(p.rank)}
                      
                      <div className="text-right min-w-[70px]">
                        <p className={`text-xl font-black italic tracking-tighter leading-none ${p.id === currentUserId ? 'text-white' : 'text-blue-400 group-hover:text-blue-300'}`}>
                          {formatNumber(p.srp)}
                        </p>
                        <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest mt-1 opacity-60">{p.rank}</p>
                      </div>
                    </div>

                    {/* Glossy sheen effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* User Ranking Footer (If not in top 50) */}
          {myRank && !players.some(p => p.id === currentUserId) && (
            <div className="p-6 bg-blue-600/20 border-t border-white/10 backdrop-blur-xl flex items-center animate-modal-pop">
               <div className="flex-shrink-0 w-12 flex justify-center">
                  <span className="text-blue-400 font-black text-sm">#{myRank.rank}</span>
               </div>
               <div className="relative z-10 -ml-2">
                 <div className="w-16 h-16 rounded-full bg-blue-900/40 p-1 border-4 border-blue-500/30 overflow-hidden">
                    <img src={`/assets/${myRank.stats.avatar_url}.png`} className="w-full h-full object-contain" alt="" />
                 </div>
               </div>
               <div className="flex-1 -ml-6 pl-10 pr-6 py-3 bg-blue-600/40 rounded-r-2xl border-y border-r border-blue-400/30 flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-white font-black text-xs uppercase italic">{myRank.stats.username}</h4>
                    <p className="text-blue-300 text-[8px] font-black uppercase tracking-widest opacity-60">#{myRank.rank} {language === 'en' ? 'Global Rank' : 'Globalni rang'}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {renderRankIcon(myRank.stats.rank)}
                    <div className="text-right min-w-[70px]">
                      <p className="text-white font-black text-xl italic tracking-tighter leading-none">{formatNumber(myRank.stats.srp)}</p>
                      <p className="text-blue-300 text-[8px] font-black uppercase mt-1 opacity-80">{myRank.stats.rank}</p>
                    </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
