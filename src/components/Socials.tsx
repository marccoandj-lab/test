import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { multiplayer } from '../services/MultiplayerManager';
import { translations } from '../i18n/translations';

interface SocialsProps {
  onBack: () => void;
  onInviteSent: (roomCode: string) => void;
  currentUserId: string;
  language: 'en' | 'sr';
}

interface UserProfile {
  id: string;
  username: string;
  avatar_url: string;
  display_id?: string;
}

interface FriendRelation {
  id: string;
  user_id: string;
  friend_id: string;
  status: 'pending' | 'accepted';
  profiles?: UserProfile;
}

export const Socials: React.FC<SocialsProps> = ({ onBack, onInviteSent, currentUserId, language }) => {
  const t = translations[language];
  const ts = t.socials as any;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [friends, setFriends] = useState<FriendRelation[]>([]);
  const [onlineUserIds, setOnlineUserIds] = useState<string[]>([]);
  const [isOnlineCollapsed, setIsOnlineCollapsed] = useState(false);
  const [isOfflineCollapsed, setIsOfflineCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'friends' | 'search' | 'requests'>('friends');

  useEffect(() => {
    fetchFriends();

    // Subscribe to global presence to see who is online
    const channel = supabase.channel('global-presence');
    
    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        setOnlineUserIds(Object.keys(state));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchFriends = async () => {
    setLoading(true);
    try {
      // Get all friend relations
      const { data, error } = await supabase
        .from('friends')
        .select('id, user_id, friend_id, status')
        .or(`user_id.eq.${currentUserId},friend_id.eq.${currentUserId}`);

      if (error) throw error;

      // Transform data to ensure we have the "other" person's profile
      const otherIds = (data || []).map((f: any) => 
        f.user_id === currentUserId ? f.friend_id : f.user_id
      );

      if (otherIds.length === 0) {
        setFriends([]);
        setLoading(false);
        return;
      }

      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id, username, avatar_url')
        .in('id', otherIds);

      if (profileError) throw profileError;

      const transformedFriends = (data || []).map((f: any) => {
        const otherId = f.user_id === currentUserId ? f.friend_id : f.user_id;
        const profile = profiles?.find(p => p.id === otherId);
        return { ...f, profiles: profile };
      });

      setFriends(transformedFriends as any);
    } catch (err) {
      console.error('Error fetching friends:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    const trimmed = searchQuery.trim();
    if (trimmed.length < 3) return;
    setLoading(true);
    try {
      // Check if searching by ID (e.g. #A1B2C3)
      const cleanQuery = trimmed.startsWith('#') ? trimmed.substring(1) : trimmed;
      
      // Since display_id doesn't exist in DB, we search by username
      // We also check if the cleanQuery matches the beginning of ANY UUID (partially)
      // but primarily we search by name now.
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, avatar_url')
        .neq('id', currentUserId)
        .ilike('username', `%${cleanQuery}%`)
        .limit(15);

      if (error) throw error;
      setSearchResults(data || []);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const sendFriendRequest = async (friendId: string) => {
    try {
      const { error } = await supabase
        .from('friends')
        .insert([{ user_id: currentUserId, friend_id: friendId, status: 'pending' }]);
      
      if (error) throw error;
      alert(language === 'en' ? 'Friend request sent!' : 'Zahtev za prijateljstvo je poslat!');
      setSearchResults(prev => prev.filter(u => u.id !== friendId));
    } catch (err) {
      console.error('Error sending friend request:', err);
      alert(language === 'en' ? 'Request already sent or error occurred.' : 'Zahtev je već poslat ili je došlo do greške.');
    }
  };

  const acceptFriendRequest = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('friends')
        .update({ status: 'accepted' })
        .eq('id', requestId);

      if (error) throw error;
      fetchFriends();
    } catch (err) {
      console.error('Error accepting request:', err);
    }
  };

  const removeFriend = async (relationId: string) => {
    if (!confirm(ts.confirm_remove)) return;
    
    try {
      const { error } = await supabase
        .from('friends')
        .delete()
        .eq('id', relationId);

      if (error) throw error;
      setFriends(prev => prev.filter(f => f.id !== relationId));
    } catch (err) {
      console.error('Error removing friend:', err);
    }
  };

  const inviteToPlay = async (friendId: string) => {    try {
      // 1. Create a room locally
      const myProfile = (await supabase.from('profiles').select('username, avatar_url').eq('id', currentUserId).single()).data;
      const roomCode = multiplayer.createRoom(myProfile?.username || 'Host', (myProfile?.avatar_url as any) || '1');
      
      // 2. Send invite via Supabase
      const { error } = await supabase
        .from('game_invites')
        .insert([{
          issuer_id: currentUserId,
          receiver_id: friendId,
          room_code: roomCode,
          status: 'pending'
        }]);

      if (error) throw error;
      
      onInviteSent(roomCode);
    } catch (err) {
      console.error('Invite error:', err);
    }
  };

  const pendingRequests = friends.filter(f => f.status === 'pending' && f.friend_id === currentUserId);
  const acceptedFriends = friends.filter(f => f.status === 'accepted');

  // Categorize friends by online status
  const onlineFriends = acceptedFriends.filter(f => f.profiles && onlineUserIds.includes(f.profiles.id));
  const offlineFriends = acceptedFriends.filter(f => f.profiles && !onlineUserIds.includes(f.profiles.id));

  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center p-6 z-50 overflow-hidden">
      <div className="max-w-md w-full space-y-6 bg-white/5 p-8 rounded-[32px] border border-white/10 backdrop-blur-xl h-[90vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onBack}
            className="text-slate-500 hover:text-white transition-colors text-sm flex items-center gap-2"
          >
            ← {t.ui.back_to_menu}
          </button>
          <div className="flex gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{language === 'en' ? 'Social Network' : 'Društvena mreža'}</span>
          </div>
        </div>

        <div className="flex gap-2 p-1 bg-black/30 rounded-2xl border border-white/5">
          {(['friends', 'search', 'requests'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab === 'friends' ? t.socials.friends : tab === 'search' ? t.socials.search_users : t.socials.friend_requests}
              {tab === 'requests' && pendingRequests.length > 0 && (
                <span className="ml-2 bg-rose-500 text-white text-[8px] px-1.5 py-0.5 rounded-full ring-2 ring-slate-900">
                  {pendingRequests.length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-1">
          {activeTab === 'search' && (
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder={language === 'en' ? "Search username (min 3 chars)..." : "Pretraži korisnika (min 3 znaka)..."}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-3 top-3 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95"
                >
                  {language === 'en' ? 'Find' : 'Pronađi'}
                </button>
              </div>

              <div className="space-y-2">
                {searchResults.map(user => (
                  <div key={user.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/20">
                        <img src={`/assets/${user.avatar_url || '1'}.png`} alt="" className="w-8 h-8 object-contain" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-bold">{user.username}</span>
                        {user.id && <span className="text-blue-400 font-mono text-[9px] font-black uppercase tracking-widest">#{user.id.substring(0, 6).toUpperCase()}</span>}
                      </div>
                    </div>
                    <button
                      onClick={() => sendFriendRequest(user.id)}
                      className="bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white border border-emerald-500/20 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                    >
                      {language === 'en' ? 'Add Friend' : 'Dodaj prijatelja'}
                    </button>
                  </div>
                ))}
                {searchResults.length === 0 && !loading && searchQuery.length >= 3 && (
                  <p className="text-center text-slate-600 text-xs italic py-8">{language === 'en' ? 'No users found.' : 'Korisnici nisu pronađeni.'}</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'friends' && (
            <div className="space-y-6">
              {/* Online Friends */}
              <div className="space-y-3">
                <button 
                  onClick={() => setIsOnlineCollapsed(!isOnlineCollapsed)}
                  className="w-full flex items-center justify-between px-2 py-1 hover:bg-white/5 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-white transition-colors">
                      {language === 'en' ? 'Online' : 'Na mreži'} ({onlineFriends.length})
                    </span>
                  </div>
                  <span className={`text-[10px] text-slate-600 transition-transform duration-300 ${isOnlineCollapsed ? '-rotate-90' : ''}`}>▼</span>
                </button>
                
                {!isOnlineCollapsed && (
                  <div className="space-y-3 animate-fade-in">
                    {onlineFriends.map(f => (
                      <div key={f.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 relative">
                            <img src={`/assets/${f.profiles?.avatar_url || '1'}.png`} alt="" className="w-9 h-9 object-contain" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 shadow-sm shadow-green-900/40" />
                          </div>
                          <div>
                            <h4 className="text-white font-black text-sm tracking-tight">{f.profiles?.username}</h4>
                            {f.profiles?.id && <p className="text-blue-400/60 font-mono text-[9px] font-black tracking-widest mb-1">#{f.profiles.id.substring(0, 6).toUpperCase()}</p>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => f.profiles && inviteToPlay(f.profiles.id)}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] shadow-lg shadow-blue-900/40 transition-all active:scale-95"
                          >
                            {language === 'en' ? 'Invite' : 'Pozovi'} 🎮
                          </button>
                          <button
                            onClick={() => removeFriend(f.id)}
                            className="p-2 text-slate-500 hover:text-rose-500 transition-colors"
                            title={ts.remove}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                    {onlineFriends.length === 0 && (
                      <p className="text-center text-slate-600 text-[10px] italic py-2">{language === 'en' ? 'No friends online.' : 'Nema prijatelja na mreži.'}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Offline Friends */}
              <div className="space-y-3">
                <button 
                  onClick={() => setIsOfflineCollapsed(!isOfflineCollapsed)}
                  className="w-full flex items-center justify-between px-2 py-1 hover:bg-white/5 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-700" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-white transition-colors">
                      {language === 'en' ? 'Offline' : 'Van mreže'} ({offlineFriends.length})
                    </span>
                  </div>
                  <span className={`text-[10px] text-slate-600 transition-transform duration-300 ${isOfflineCollapsed ? '-rotate-90' : ''}`}>▼</span>
                </button>

                {!isOfflineCollapsed && (
                  <div className="space-y-3 animate-fade-in opacity-60 grayscale-[0.5]">
                    {offlineFriends.map(f => (
                      <div key={f.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 relative">
                            <img src={`/assets/${f.profiles?.avatar_url || '1'}.png`} alt="" className="w-9 h-9 object-contain opacity-50" />
                          </div>
                          <div>
                            <h4 className="text-slate-400 font-bold text-sm tracking-tight">{f.profiles?.username}</h4>
                            {f.profiles?.id && <p className="text-slate-600 font-mono text-[9px] font-black tracking-widest mb-1">#{f.profiles.id.substring(0, 6).toUpperCase()}</p>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeFriend(f.id)}
                            className="p-2 text-slate-500 hover:text-rose-500 transition-colors"
                            title={ts.remove}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {acceptedFriends.length === 0 && (
                <div className="text-center py-12 space-y-4">
                  <div className="text-4xl text-slate-800 opacity-50">👥</div>
                  <p className="text-slate-600 text-sm font-medium">{language === 'en' ? 'Your friends list is empty.' : 'Vaša lista prijatelja je prazna.'}<br/>{language === 'en' ? 'Search for players to add them!' : 'Pretražite igrače da ih dodate!'}</p>
                  <button 
                    onClick={() => setActiveTab('search')}
                    className="text-blue-500 text-xs font-black uppercase tracking-widest hover:text-blue-400 transition-colors"
                  >
                    {language === 'en' ? 'Find Players' : 'Pronađi igrače'}
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="space-y-3">
              {pendingRequests.map(r => (
                <div key={r.id} className="bg-amber-500/5 p-4 rounded-2xl border border-amber-500/10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={`/assets/${r.profiles?.avatar_url || '1'}.png`} className="w-10 h-10 object-contain rounded-xl bg-white/5" />
                    <div className="flex flex-col">
                      <span className="text-white font-bold">{r.profiles?.username}</span>
                      {r.profiles?.id && <span className="text-blue-400 font-mono text-[9px] font-black uppercase tracking-widest">#{r.profiles.id.substring(0, 6).toUpperCase()}</span>}
                    </div>
                  </div>
                  <button
                    onClick={() => acceptFriendRequest(r.id)}
                    className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-all active:scale-95 shadow-lg shadow-emerald-900/20"
                  >
                    {language === 'en' ? 'Accept' : 'Prihvati'}
                  </button>
                </div>
              ))}
              {pendingRequests.length === 0 && (
                <p className="text-center text-slate-600 text-xs italic py-12">No pending requests.</p>
              )}
            </div>
          )}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-4">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <div className="pt-4 border-t border-white/10 text-center">
          <p className="text-slate-600 text-[9px] font-bold uppercase tracking-[0.2em]">{language === 'en' ? 'Build your empire with friends' : 'Gradi svoje carstvo sa prijateljima'}</p>
        </div>
      </div>
    </div>
  );
};
