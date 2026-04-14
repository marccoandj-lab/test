import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { translations } from '../i18n/translations';
import { RankBadge } from './RankBadge';
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
      .channel('ranked_updates')
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
        .limit(100);

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
        } else {
          // Fetch specific user if not in top 100
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
            
            setMyRank({
              rank: (count || 0) + 1,
              stats: myData as PlayerRankStats
            });
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

  return (
    <div className="fixed inset-0 bg-slate-900/95 flex flex-col items-center justify-center p-6 z-50 overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-amber-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-[url('/assets/eco-pattern.png')] opacity-5" />
      </div>

      <div className="relative z-10 max-w-lg w-full h-[90vh] bg-slate-900/40 p-8 rounded-[40px] border border-white/10 backdrop-blur-3xl shadow-[0_0_50px_-12px_rgba(251,191,36,0.2)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="text-slate-500 hover:text-white transition-colors text-sm flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> {t.ui.back_to_menu}
          </button>
          <button
            onClick={onOpenRoadmap}
            className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
          >
            🗺️ {language === 'en' ? 'Rank Roadmap' : 'Mapa rangova'}
          </button>
        </div>

        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-full mb-2">
            <span className="animate-pulse">✨</span>
            <span className="text-[10px] text-amber-500 font-black uppercase tracking-widest">{language === 'en' ? 'Elite Season' : 'Elitna Sezona'}</span>
            <span className="animate-pulse">✨</span>
          </div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]">
            {language === 'en' ? 'Ranked' : 'Rangirana'} <span className="text-amber-500">Hall of Fame</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em]">Strategic Reputation Points (SRP)</p>
        </div>

        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest animate-pulse">Calculating Ranks...</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-8">
            {/* Podium Section */}
            {players.length > 0 && (
              <div className="flex items-end justify-center gap-2 px-2 pt-12 pb-4">
                {/* 2nd Place */}
                {top3[1] && (
                  <div className="flex flex-col items-center gap-3 w-1/3">
                    <div className="relative group">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border-2 border-slate-400 p-2 shadow-2xl transition-transform group-hover:scale-110">
                        <img src={`/assets/${top3[1].avatar_url || '1'}.png`} className="w-12 h-12 object-contain" />
                      </div>
                      <div className="absolute -top-3 -left-3 w-8 h-8 bg-slate-400 rounded-full border-2 border-slate-900 flex items-center justify-center text-slate-900 font-black text-xs shadow-lg">2</div>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-black text-[10px] truncate max-w-[80px]">{top3[1].username}</p>
                      <RankBadge rank={top3[1].rank} language={language} size="sm" showName={false} />
                      <p className="text-slate-400 text-[10px] font-black mt-1">{formatNumber(top3[1].srp)} SRP</p>
                    </div>
                    <div className="h-16 w-full bg-gradient-to-b from-slate-400/20 to-transparent rounded-t-xl border-x border-t border-slate-400/10" />
                  </div>
                )}

                {/* 1st Place */}
                {top3[0] && (
                  <div className="flex flex-col items-center gap-3 w-1/3 -mt-10">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 p-1 shadow-[0_20px_60px_-10px_rgba(245,158,11,0.6)] animate-float">
                        <div className="w-full h-full rounded-[28px] bg-slate-900 flex items-center justify-center p-2">
                          <img src={`/assets/${top3[0].avatar_url || '1'}.png`} className="w-16 h-16 object-contain" />
                        </div>
                      </div>
                      <div className="absolute -top-4 -left-4 w-12 h-12 bg-amber-500 rounded-full border-2 border-slate-900 flex items-center justify-center text-slate-900 font-black text-lg ring-8 ring-amber-500/10 shadow-lg animate-bounce">1</div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <RankBadge rank={top3[0].rank} language={language} size="md" showName={false} />
                      </div>
                    </div>
                    <div className="text-center pt-2">
                      <p className="text-amber-500 font-black text-sm truncate max-w-[120px] uppercase italic">{top3[0].username}</p>
                      <p className="text-amber-200/50 text-[11px] font-black tracking-widest">{formatNumber(top3[0].srp)} SRP</p>
                    </div>
                    <div className="h-24 w-full bg-gradient-to-b from-amber-500/40 via-amber-500/10 to-transparent rounded-t-3xl border-x border-t border-amber-500/20" />
                  </div>
                )}

                {/* 3rd Place */}
                {top3[2] && (
                  <div className="flex flex-col items-center gap-3 w-1/3">
                    <div className="relative group">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border-2 border-orange-800 p-2 shadow-2xl transition-transform group-hover:scale-110">
                        <img src={`/assets/${top3[2].avatar_url || '1'}.png`} className="w-10 h-10 object-contain" />
                      </div>
                      <div className="absolute -top-2 -left-2 w-7 h-7 bg-orange-800 rounded-full border-2 border-slate-900 flex items-center justify-center text-orange-200 font-black text-[10px] shadow-lg">3</div>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-black text-[10px] truncate max-w-[70px]">{top3[2].username}</p>
                      <RankBadge rank={top3[2].rank} language={language} size="sm" showName={false} />
                      <p className="text-slate-400 text-[10px] font-black mt-1">{formatNumber(top3[2].srp)} SRP</p>
                    </div>
                    <div className="h-12 w-full bg-gradient-to-b from-orange-800/20 to-transparent rounded-t-xl border-x border-t border-orange-800/10" />
                  </div>
                )}
              </div>
            )}

            {/* List Section */}
            <div className="space-y-3 mt-4">
              {others.map((player, idx) => (
                <div 
                  key={player.id} 
                  className={`relative overflow-hidden bg-white/5 p-4 rounded-3xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all ${player.id === currentUserId ? 'ring-2 ring-amber-500/50 bg-amber-500/5' : ''}`}
                >
                  <div className="flex items-center gap-4 z-10">
                    <span className="text-slate-600 font-black text-xs w-6 text-center">{idx + 4}</span>
                    <div className="relative">
                      <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                        <img src={`/assets/${player.avatar_url || '1'}.png`} className="w-8 h-8 object-contain" />
                      </div>
                      <div className="absolute -bottom-1 -right-1">
                        <RankBadge rank={player.rank} language={language} size="sm" showName={false} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-black text-xs uppercase tracking-tight">{player.username}</h4>
                        {player.id === currentUserId && <span className="text-amber-500 text-[8px] font-black uppercase tracking-widest italic">{language === 'en' ? "Your Rank" : "Tvoj rang"}</span>}
                      </div>
                      <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">{player.rank}</p>
                    </div>
                  </div>
                  <div className="text-right z-10">
                    <p className="text-amber-500 font-black text-sm italic">{formatNumber(player.srp)} SRP</p>
                    <div className="h-1 w-20 bg-black/40 rounded-full mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 group-hover:translate-x-full transition-transform duration-1000" 
                        style={{ width: '100%', transform: 'translateX(-50%)' }}
                      />
                    </div>
                  </div>
                  
                  {/* Hover Decoration */}
                  <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* My Current Standings (Fixed Bottom if not in list) */}
        {myRank && !players.slice(0, 100).some(p => p.id === currentUserId) && (
          <div className="mt-6 p-5 bg-amber-600/20 border border-amber-500/30 rounded-[32px] flex items-center justify-between animate-modal-pop ring-2 ring-amber-500/20 shadow-2xl backdrop-blur-3xl">
            <div className="flex items-center gap-4">
              <span className="text-amber-500 font-black text-sm w-8 text-center">#{myRank.rank}</span>
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center border-2 border-amber-500/30">
                  <img src={`/assets/${myRank.stats.avatar_url || '1'}.png`} className="w-9 h-9 object-contain" />
                </div>
                <div className="absolute -bottom-1 -right-1">
                  <RankBadge rank={myRank.stats.rank} language={language} size="sm" showName={false} />
                </div>
              </div>
              <div>
                <h4 className="text-white font-black text-sm uppercase tracking-tight">{myRank.stats.username}</h4>
                <div className="flex items-center gap-2">
                  <p className="text-amber-500 text-[9px] font-black uppercase tracking-widest italic">{language === 'en' ? "Currently at" : "Trenutno na"}</p>
                  <span className="text-slate-400 font-bold text-[9px] uppercase">{myRank.stats.rank}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-amber-400 font-black text-lg italic tracking-tighter">{formatNumber(myRank.stats.srp)} SRP</p>
              <p className="text-slate-500 text-[8px] font-black uppercase tracking-wider">{language === 'en' ? 'Keep Playing!' : 'Samo nastavi!'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
