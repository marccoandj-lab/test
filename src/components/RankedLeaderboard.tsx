import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { translations, Language } from '../i18n/translations';
import { RankBadge } from './RankBadge';
import { motion, AnimatePresence } from 'framer-motion';
import { formatNumber } from '../utils/format';

interface RankedLeaderboardProps {
  onBack: () => void;
  currentUserId?: string;
  language: Language;
}

interface RankedPlayer {
  id: string;
  username: string;
  avatar_url: string;
  srp: number;
  rank: string;
}

export const RankedLeaderboard: React.FC<RankedLeaderboardProps> = ({ onBack, currentUserId, language }) => {
  const t = translations[language];
  const [players, setPlayers] = useState<RankedPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [myRank, setMyRank] = useState<{ position: number; stats: RankedPlayer } | null>(null);

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
        .limit(100);

      if (error) throw error;
      
      const rankedData = (data || []) as RankedPlayer[];
      setPlayers(rankedData);

      if (currentUserId) {
        const myIndex = rankedData.findIndex(p => p.id === currentUserId);
        if (myIndex !== -1) {
          setMyRank({ position: myIndex + 1, stats: rankedData[myIndex] });
        } else {
          // Fetch specific stats for me if I'm not in top 100
          const { data: myData } = await supabase
            .from('profiles')
            .select('id, username, avatar_url, srp, rank')
            .eq('id', currentUserId)
            .single();
          
          if (myData) {
            const { count } = await supabase
              .from('profiles')
              .select('*', { count: 'exact', head: true })
              .gt('srp', myData.srp);
            
            setMyRank({ position: (count || 0) + 1, stats: myData as RankedPlayer });
          }
        }
      }
    } catch (err) {
      console.error('Error fetching ranked leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const top3 = players.slice(0, 3);
  const others = players.slice(3);

  // Reorder for Podium: [2, 1, 3] or [Place 2, Place 1, Place 3]
  const podiumOrder = top3.length === 3 ? [top3[1], top3[0], top3[2]] : top3;

  return (
    <div className="fixed inset-0 bg-[#FCF9EF] flex flex-col items-center z-50 overflow-hidden font-sans">
      {/* Header Area */}
      <div className="w-full max-w-lg px-6 pt-10 pb-6 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 text-slate-900 transition-transform active:scale-90"
        >
          <span className="text-xl">❮</span>
        </button>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          {t.lobby.leaderboard}
        </h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className="flex-1 w-full max-w-lg overflow-y-auto custom-scrollbar-light px-6 pb-20">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Podium Section */}
              <div className="flex items-end justify-center gap-2 pt-12 pb-4 px-4">
                {podiumOrder.map((player) => {
                  const place = top3.indexOf(player) + 1;
                  
                  return (
                    <div key={player.id} className="flex flex-col items-center w-1/3 group">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: place * 0.1 }}
                        className="relative mb-4"
                      >
                        <div className={`w-16 h-16 rounded-full border-4 ${place === 1 ? 'border-amber-400' : 'border-white'} overflow-hidden bg-white shadow-xl`}>
                          <img src={`/assets/${player.avatar_url}.png`} className="w-full h-full object-contain p-2" alt="" />
                        </div>
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                           <RankBadge rank={player.rank} language={language} size="sm" showName={false} />
                        </div>
                      </motion.div>
                      <div className="text-center mb-2 px-1">
                        <p className="text-[11px] font-black text-slate-900 truncate w-full">{player.username}</p>
                        <p className="text-[9px] font-bold text-slate-400">{formatNumber(player.srp)} points</p>
                      </div>
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: place === 1 ? 160 : place === 2 ? 128 : 96 }}
                        className={`w-full bg-[#CCEACD] rounded-t-3xl flex flex-col items-center justify-start pt-4 shadow-sm`}
                      >
                        <span className="text-2xl font-black text-emerald-800/40">{place}</span>
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              {/* My Position Card */}
              {myRank && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#F98864] rounded-[2.5rem] p-6 text-white flex items-center justify-between shadow-lg shadow-orange-700/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md p-1 border border-white/30 overflow-hidden">
                      <img src={`/assets/${myRank.stats.avatar_url}.png`} className="w-full h-full object-contain" alt="" />
                    </div>
                    <div>
                      <p className="text-white font-black text-lg flex items-center gap-2">
                        {myRank.stats.username}
                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">YOU</span>
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <div>
                          <p className="text-white/60 text-[9px] font-black uppercase tracking-widest">Points</p>
                          <p className="text-lg font-black leading-none">{formatNumber(myRank.stats.srp)}</p>
                        </div>
                        <div className="w-[1px] h-6 bg-white/20" />
                        <div>
                          <p className="text-white/60 text-[9px] font-black uppercase tracking-widest">Rank</p>
                          <p className="text-[10px] font-black flex items-center gap-1">
                             {(t.ranked.ranks as any)[myRank.stats.rank.toLowerCase().replace(' ', '') === 'economylegend' ? 'legend' : myRank.stats.rank.toLowerCase()]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/60 text-[9px] font-black uppercase tracking-widest">Position</p>
                    <p className="text-3xl font-black italic">{myRank.position}</p>
                  </div>
                </motion.div>
              )}

              {/* Others List */}
              <div className="space-y-4 pt-4">
                {others.map((player, idx) => (
                  <motion.div 
                    key={player.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                  >
                    <div className="flex items-center gap-5">
                      <span className="text-lg font-black text-slate-300 w-6">{(idx + 4).toString().padStart(2, '0')}</span>
                      <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 overflow-hidden">
                        <img src={`/assets/${player.avatar_url}.png`} className="w-full h-full object-contain p-1" alt="" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{player.username}</p>
                        <p className="text-[10px] font-bold text-slate-400">{formatNumber(player.srp)} points</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <RankBadge rank={player.rank} language={language} size="sm" showName={false} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
