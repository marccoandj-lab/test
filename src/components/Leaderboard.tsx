import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { translations } from '../i18n/translations';

interface LeaderboardProps {
  onBack: () => void;
  currentUserId?: string;
  language: 'en' | 'sr';
}

interface PlayerStats {
  id: string;
  username: string;
  avatar_url: string;
  display_id?: string;
  wins: number;
  correct_quizzes: number;
  total_capital: number;
}

type TabCategory = 'wins' | 'quizzes' | 'capital';

export const Leaderboard: React.FC<LeaderboardProps> = ({ onBack, currentUserId, language }) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<TabCategory>('wins');
  const [players, setPlayers] = useState<PlayerStats[]>([]);
  const [myRank, setMyRank] = useState<{ rank: number, stats: PlayerStats } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
    // Auto-refresh every 30 seconds while leaderboard is open
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const orderBy = activeTab === 'wins' ? 'wins' : activeTab === 'quizzes' ? 'correct_quizzes' : 'total_capital';
      
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, display_id, avatar_url, wins, correct_quizzes, total_capital')
        .order(orderBy, { ascending: false })
        .limit(50);

      if (error) throw error;
      setPlayers(data || []);

      if (currentUserId) {
        const myPlayerTopList = (data || []).find(p => p.id === currentUserId);
        if (myPlayerTopList) {
          const rank = (data || []).findIndex(p => p.id === currentUserId) + 1;
          setMyRank({ rank, stats: myPlayerTopList });
        } else {
          // Fetch my specific stats and count people above me
          const { data: myData } = await supabase
            .from('profiles')
            .select('id, username, display_id, avatar_url, wins, correct_quizzes, total_capital')
            .eq('id', currentUserId)
            .single();

          if (myData) {
            const myValue = activeTab === 'wins' ? myData.wins : activeTab === 'quizzes' ? myData.correct_quizzes : myData.total_capital;
            
            const { count } = await supabase
              .from('profiles')
              .select('*', { count: 'exact', head: true })
              .gt(orderBy, myValue);

            setMyRank({ rank: (count || 0) + 1, stats: myData });
          }
        }
      }
    } catch (err) {
      console.error('Leaderboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryLabel = (tab: TabCategory) => {
    switch (tab) {
      case 'wins': return t.leaderboard.wins;
      case 'quizzes': return t.leaderboard.quizzes;
      case 'capital': return t.leaderboard.capital;
    }
  };

  const getCategoryValue = (player: PlayerStats, tab: TabCategory) => {
    switch (tab) {
      case 'wins': return player.wins;
      case 'quizzes': return player.correct_quizzes;
      case 'capital': return `$${player.total_capital.toLocaleString()}`;
    }
  };

  const top3 = players.slice(0, 3);
  const others = players.slice(3);

  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center p-6 z-50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-[160px]" />
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
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">{language === 'en' ? 'Global Hall of Fame' : 'Globalna dvorana slavnih'}</span>
          </div>
        </div>

        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-black text-white italic tracking-tight drop-shadow-xl">
            <span className="text-amber-500">{language === 'en' ? 'Global' : 'Globalna'}</span> {t.lobby.leaderboard}
          </h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
            {language === 'en' ? 'Competing with strategy & sustainability' : 'Takmičenje uz strategiju i održivost'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 p-1 bg-black/40 rounded-3xl border border-white/5 mb-8">
          {(['wins', 'quizzes', 'capital'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all ${
                activeTab === tab 
                ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg' 
                : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab === 'wins' ? t.leaderboard.wins : tab === 'quizzes' ? t.leaderboard.quizzes : t.leaderboard.capital}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
            <p className="text-slate-600 text-xs font-bold uppercase tracking-widest animate-pulse">{language === 'en' ? 'Fetching Rankings...' : 'Učitavanje rang liste...'}</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-8">
            {/* Podium Section */}
            {players.length > 0 && (
              <div className="flex items-end justify-center gap-2 px-2 pt-12 pb-4">
                {/* 2nd Place */}
                {top3[1] && (
                  <div className="flex flex-col items-center gap-3 w-1/3">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border-2 border-slate-400 p-2 shadow-2xl">
                        <img src={`/assets/${top3[1].avatar_url || '1'}.png`} className="w-10 h-10 object-contain" />
                      </div>
                      <div className="absolute -top-3 -left-3 w-8 h-8 bg-slate-400 rounded-full border-2 border-slate-900 flex items-center justify-center text-slate-900 font-bold text-xs ring-4 ring-slate-400/20 shadow-lg">2</div>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-black text-xs truncate max-w-[80px]">{top3[1].username}</p>
                      {top3[1].display_id && <p className="text-blue-400 font-mono text-[8px] font-black uppercase tracking-widest -mt-0.5">#{top3[1].display_id}</p>}
                      <p className="text-slate-500 text-[10px] whitespace-nowrap mt-1">{getCategoryValue(top3[1], activeTab)}</p>
                    </div>
                    <div className="h-16 w-full bg-gradient-to-b from-slate-400/20 to-transparent rounded-t-xl border-x border-t border-slate-400/10" />
                  </div>
                )}

                {/* 1st Place */}
                {top3[0] && (
                  <div className="flex flex-col items-center gap-3 w-1/3 -mt-8">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-[24px] bg-gradient-to-br from-amber-400 to-orange-500 p-0.5 shadow-[0_20px_50px_-10px_rgba(245,158,11,0.5)]">
                        <div className="w-full h-full rounded-[22px] bg-slate-900 flex items-center justify-center p-2">
                          <img src={`/assets/${top3[0].avatar_url || '1'}.png`} className="w-12 h-12 object-contain" />
                        </div>
                      </div>
                      <div className="absolute -top-4 -left-4 w-10 h-10 bg-amber-500 rounded-full border-2 border-slate-900 flex items-center justify-center text-slate-900 font-black text-sm ring-8 ring-amber-500/10 shadow-lg animate-bounce">1</div>
                    </div>
                    <div className="text-center">
                      <p className="text-amber-500 font-black text-sm truncate max-w-[100px]">{top3[0].username}</p>
                      {top3[0].display_id && <p className="text-blue-400/60 font-mono text-[8px] font-black uppercase tracking-widest -mt-0.5">#{top3[0].display_id}</p>}
                      <p className="text-amber-200/50 text-[10px] whitespace-nowrap mt-1">{getCategoryValue(top3[0], activeTab)}</p>
                    </div>
                    <div className="h-24 w-full bg-gradient-to-b from-amber-500/30 to-transparent rounded-t-2xl border-x border-t border-amber-500/20" />
                  </div>
                )}

                {/* 3rd Place */}
                {top3[2] && (
                  <div className="flex flex-col items-center gap-3 w-1/3">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border-2 border-orange-700 p-2 shadow-2xl">
                        <img src={`/assets/${top3[2].avatar_url || '1'}.png`} className="w-8 h-8 object-contain" />
                      </div>
                      <div className="absolute -top-2 -left-2 w-7 h-7 bg-orange-700 rounded-full border-2 border-slate-900 flex items-center justify-center text-orange-200 font-bold text-[10px] ring-4 ring-orange-700/20 shadow-lg">3</div>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-black text-xs truncate max-w-[70px]">{top3[2].username}</p>
                      {top3[2].display_id && <p className="text-blue-400/60 font-mono text-[8px] font-black uppercase tracking-widest -mt-0.5">#{top3[2].display_id}</p>}
                      <p className="text-slate-500 text-[10px] whitespace-nowrap mt-1">{getCategoryValue(top3[2], activeTab)}</p>
                    </div>
                    <div className="h-12 w-full bg-gradient-to-b from-orange-700/20 to-transparent rounded-t-xl border-x border-t border-orange-700/10" />
                  </div>
                )}
              </div>
            )}

            {/* List Section */}
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
                        {player.display_id && <span className="text-blue-400 font-mono text-[8px] font-black uppercase tracking-widest">#{player.display_id}</span>}
                      </div>
                      {player.id === currentUserId && <span className="text-indigo-400 text-[8px] font-black uppercase tracking-widest italic">{language === 'en' ? "That's You" : "To si ti"}</span>}
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
                  {myRank.stats.display_id && <span className="text-blue-400 font-mono text-[8px] font-black uppercase tracking-widest">#{myRank.stats.display_id}</span>}
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
  }
};
