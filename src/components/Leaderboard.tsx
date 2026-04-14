import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { translations } from '../i18n/translations';
import { RankBadge } from './RankBadge';
import { formatNumber } from '../utils/format';
import { motion } from 'framer-motion';

interface LeaderboardProps {
  onBack: () => void;
  currentUserId?: string;
  language: 'en' | 'sr';
}

interface PlayerStats {
  id: string;
  username: string;
  avatar_url: string;
  wins: number;
  correct_quizzes: number;
  total_capital: number;
  value_chain_correct: number;
  uljez_correct: number;
  srp: number;
  rank: string;
}

type TabCategory = 'wins' | 'quizzes' | 'capital' | 'chains' | 'intruders';

export const Leaderboard: React.FC<LeaderboardProps> = ({ onBack, currentUserId, language }) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<TabCategory>('wins');
  const [players, setPlayers] = useState<PlayerStats[]>([]);
  const [myRank, setMyRank] = useState<{ rank: number, stats: PlayerStats } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard(true);
    
    const channel = supabase
      .channel('leaderboard_updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'profiles' },
        () => {
          fetchLeaderboard(false);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeTab]);

  const fetchLeaderboard = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const orderBy = 
        activeTab === 'wins' ? 'wins' : 
        activeTab === 'quizzes' ? 'correct_quizzes' : 
        activeTab === 'capital' ? 'total_capital' :
        activeTab === 'chains' ? 'value_chain_correct' : 'uljez_correct';
      
      let { data, error } = await supabase
        .from('profiles')
        .select('id, username, avatar_url, wins, correct_quizzes, total_capital, value_chain_correct, uljez_correct, srp, rank')
        .order(orderBy, { ascending: false })
        .limit(50);

      if (error) throw error;
      
      const statsData = (data || []) as PlayerStats[];
      setPlayers(statsData);

      if (currentUserId) {
        const myPlayerTopList = statsData.find(p => p.id === currentUserId);
        if (myPlayerTopList) {
          const rank = statsData.findIndex(p => p.id === currentUserId) + 1;
          setMyRank({ rank, stats: myPlayerTopList });
        } else {
          const { data: myData } = await supabase
            .from('profiles')
            .select('id, username, avatar_url, wins, correct_quizzes, total_capital, value_chain_correct, uljez_correct, srp, rank')
            .eq('id', currentUserId)
            .single();

          if (myData) {
            const typedMyData = myData as PlayerStats;
            const myValue = 
              activeTab === 'wins' ? typedMyData.wins : 
              activeTab === 'quizzes' ? typedMyData.correct_quizzes : 
              activeTab === 'capital' ? typedMyData.total_capital :
              activeTab === 'chains' ? typedMyData.value_chain_correct : typedMyData.uljez_correct;
            
            const { count } = await supabase
              .from('profiles')
              .select('*', { count: 'exact', head: true })
              .gt(orderBy, myValue);

            setMyRank({ rank: (count || 0) + 1, stats: typedMyData });
          }
        }
      }
    } catch (err) {
      console.error('Leaderboard error:', err);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const getCategoryLabel = (tab: TabCategory) => {
    switch (tab) {
      case 'wins': return t.leaderboard.wins;
      case 'quizzes': return t.leaderboard.quizzes;
      case 'capital': return t.leaderboard.capital;
      case 'chains': return t.leaderboard.value_chains;
      case 'intruders': return t.leaderboard.intruders;
    }
  };

  const getCategoryValue = (player: PlayerStats, tab: TabCategory) => {
    switch (tab) {
      case 'wins': return player.wins;
      case 'quizzes': return player.correct_quizzes;
      case 'capital': return `$${formatNumber(player.total_capital)}`;
      case 'chains': return player.value_chain_correct;
      case 'intruders': return player.uljez_correct;
    }
  };

  const top3 = players.slice(0, 3);
  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean) as PlayerStats[];
  const others = players.slice(3);

  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center p-6 z-50 overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-lg w-full h-[90vh] bg-white/5 p-8 rounded-[40px] border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="text-slate-500 hover:text-white transition-colors text-sm flex items-center gap-2 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> {t.ui.back_to_menu}
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 p-1.5 bg-black/40 rounded-3xl border border-white/5 mb-8">
          {(['wins', 'quizzes', 'capital', 'chains', 'intruders'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[60px] py-3 rounded-2xl text-[9px] font-black uppercase tracking-wider transition-all ${
                activeTab === tab ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-8">
            {players.length > 0 && (
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
                      <div className="text-center">
                        <p className="text-white font-black text-xs truncate">{player.username}</p>
                        <p className="text-slate-500 text-[10px]">{getCategoryValue(player, activeTab)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="space-y-2 mt-4">
              {others.map((player, idx) => (
                <div 
                  key={player.id} 
                  className={`bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all ${player.id === currentUserId ? 'ring-2 ring-indigo-500/50 bg-indigo-500/5' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-slate-600 font-black text-xs w-6 text-center">{idx + 4}</span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                      <img src={`/assets/${player.avatar_url || '1'}.png`} className="w-7 h-7 object-contain" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-bold text-xs">{player.username}</h4>
                        {player.id && <span className="text-blue-400 font-mono text-[8px] font-black uppercase tracking-widest">#{player.id.substring(0, 6).toUpperCase()}</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        {player.id === currentUserId && <span className="text-indigo-400 text-[8px] font-black uppercase tracking-widest italic">{language === 'en' ? "That's You" : "To si ti"}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-black text-xs">{getCategoryValue(player, activeTab)}</p>
                    <p className="text-slate-500 text-[8px] font-bold uppercase tracking-tight">{tabToMetric(activeTab, language)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* My Rank Indicator */}
        {myRank && !players.slice(0, 50).some(p => p.id === currentUserId) && (
          <div className="mt-4 p-4 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl flex items-center justify-between animate-fade-in ring-2 ring-indigo-500/20">
            <div className="flex items-center gap-4">
              <span className="text-indigo-400 font-black text-xs w-6 text-center">#{myRank.rank}</span>
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                <img src={`/assets/${myRank.stats.avatar_url || '1'}.png`} className="w-7 h-7 object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-white font-bold text-xs">{myRank.stats.username}</h4>
                  {myRank.stats.id && <span className="text-blue-400 font-mono text-[8px] font-black uppercase tracking-widest">#{myRank.stats.id.substring(0, 6).toUpperCase()}</span>}
                </div>
                <span className="text-indigo-400 text-[8px] font-black uppercase tracking-widest italic">{language === 'en' ? "That's You" : "To si ti"}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-black text-xs">{getCategoryValue(myRank.stats, activeTab)}</p>
              <p className="text-slate-500 text-[8px] font-bold uppercase tracking-tight">{tabToMetric(activeTab, language)}</p>
            </div>
          </div>
        )}

        {/* Global Stats Summary */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em]">
          <span>{language === 'en' ? 'Current Category:' : 'Trenutna kategorija:'}</span>
          <span className="text-amber-500">{getCategoryLabel(activeTab)}</span>
        </div>
      </div>
    </div>
  );
};

const tabToMetric = (tab: TabCategory, language: 'en' | 'sr') => {
  switch (tab) {
    case 'wins': return language === 'en' ? 'Wins' : 'Pobede';
    case 'quizzes': return language === 'en' ? 'Correct' : 'Tačno';
    case 'capital': return 'USD';
    case 'chains': return language === 'en' ? 'Chains' : 'Lanci';
    case 'intruders': return language === 'en' ? 'Found' : 'Pronađeno';
  }
};
