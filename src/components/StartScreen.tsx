import React, { useState, useEffect } from 'react';
import { multiplayer } from '../services/MultiplayerManager';
import { supabase } from '../lib/supabase';
import { AVATARS, AVATAR_MAP } from '../data/avatars';
import { Socials } from './Socials';
import { Leaderboard } from './Leaderboard';
import { translations } from '../i18n/translations';

interface StartScreenProps {
  onStart: (name: string, avatar: string, isSingle: boolean) => void;
  initialName?: string;
  initialAvatar?: string;
  onProfileUpdate?: (name: string, avatar: string) => void;
  profileData?: {
    wins: number;
    games_played: number;
    total_capital: number;
    character_usage: Record<string, number>;
    correct_quizzes?: number;
    wrong_quizzes?: number;
    investment_gains?: number;
    investment_losses?: number;
    jail_visits?: number;
    auction_wins?: number;
  } | null;
  language: 'en' | 'sr';
  onOpenSettings?: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ 
  onStart, 
  onProfileUpdate,
  initialName = '', 
  initialAvatar = '1',
  profileData,
  language,
  onOpenSettings
}) => {
  const t = translations[language];
  const [name, setName] = useState(initialName);
  const [avatar, setAvatar] = useState<string>(initialAvatar);
  const [mode, setMode] = useState<'initial' | 'create' | 'join' | 'single' | 'profile' | 'socials' | 'leaderboard'>('initial');
  const [roomCode, setRoomCode] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isChangingAvatar, setIsChangingAvatar] = useState(false);

  useEffect(() => {
    if (initialName) setName(initialName);
  }, [initialName]);

  useEffect(() => {
    if (initialAvatar) setAvatar(initialAvatar);
  }, [initialAvatar]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserId(user.id);
    });
  }, []);

  const saveProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const currentUsage = profileData?.character_usage || {};
      // Increment character usage and games_played if starting ANY game session
      const isStartingGame = mode === 'create' || mode === 'join' || mode === 'single';
      const newUsage = isStartingGame 
        ? { ...currentUsage, [avatar]: (currentUsage[avatar] || 0) + 1 }
        : currentUsage;
      
      await supabase.from('profiles').upsert({
        id: user.id,
        username: name,
        avatar_url: avatar,
        updated_at: new Date().toISOString(),
        games_played: isStartingGame ? (profileData?.games_played || 0) + 1 : (profileData?.games_played || 0),
        wins: profileData?.wins || 0,
        total_capital: profileData?.total_capital || 0,
        character_usage: newUsage,
        correct_quizzes: profileData?.correct_quizzes || 0,
        wrong_quizzes: profileData?.wrong_quizzes || 0,
        investment_gains: profileData?.investment_gains || 0,
        investment_losses: profileData?.investment_losses || 0,
        jail_visits: profileData?.jail_visits || 0,
        auction_wins: profileData?.auction_wins || 0
      });

      localStorage.setItem('eib_username', name);
      localStorage.setItem('eib_avatar', avatar);

      if (onProfileUpdate) {
        onProfileUpdate(name, avatar);
      }
    }
  };

  const handleAction = async () => {
    if (!name) return alert(language === 'en' ? 'Enter your name!' : 'Unesite svoje ime!');

    (window as any).playSFX?.('click');
    await saveProfile();

    if (mode === 'single') {
      onStart(name, avatar, true);
    } else if (mode === 'create') {
      multiplayer.createRoom(name, avatar as any);
      onStart(name, avatar, false);
    } else if (mode === 'join') {
      if (!roomCode) return alert(language === 'en' ? 'Enter room code!' : 'Unesite kod sobe!');
      multiplayer.joinRoom(roomCode, name, avatar as any);
      onStart(name, avatar, false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (mode === 'profile') {
    const mostUsedAvatarId = profileData?.character_usage 
      ? Object.entries(profileData.character_usage).sort((a, b) => b[1] - a[1])[0]?.[0] 
      : '1';

    return (
      <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center p-6 z-50 overflow-hidden">
        <div className="max-w-md w-full space-y-6 bg-white/5 p-8 rounded-[32px] border border-white/10 backdrop-blur-xl max-h-[90vh] overflow-y-auto custom-scrollbar">
          <button
            onClick={() => setMode('initial')}
            className="text-slate-500 hover:text-white transition-colors text-sm flex items-center gap-2 mb-4"
          >
            ← {t.ui.back_to_menu}
          </button>

          <div className="flex items-center gap-6 pb-6 border-b border-white/10">
            <div className="relative group">
              <div className="w-20 h-20 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 overflow-hidden">
                <img src={`/assets/${avatar}.png`} alt="Avatar" className="w-16 h-16 object-contain" />
              </div>
              <button 
                onClick={() => setIsChangingAvatar(!isChangingAvatar)}
                className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-slate-900 transition-all active:scale-90 shadow-lg"
                title={language === 'en' ? 'Change Avatar' : 'Promeni avatar'}
              >
                🖼️
              </button>
            </div>
            <div className="flex-1">
              {isEditingName ? (
                <div className="space-y-2">
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={language === 'en' ? 'Enter name' : 'Unesite ime'}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button 
                      onClick={async () => { await saveProfile(); setIsEditingName(false); }} 
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-lg text-xs font-bold transition-colors"
                    >
                      {t.ui.save}
                    </button>
                    <button 
                      onClick={() => { setName(initialName); setIsEditingName(false); }} 
                      className="bg-white/5 hover:bg-white/10 text-white px-3 py-1 rounded-lg text-xs font-bold transition-colors"
                    >
                      {t.ui.cancel}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 group">
                  <h2 className="text-2xl font-black text-white truncate max-w-[180px]">{name}</h2>
                  <button 
                    onClick={() => setIsEditingName(true)} 
                    className="text-slate-500 hover:text-white transition-colors p-1"
                    title={language === 'en' ? 'Edit Name' : 'Promeni ime'}
                  >
                    ✏️
                  </button>
                </div>
              )}
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{AVATAR_MAP[avatar] || 'Economy Strategist'}</p>
            </div>
          </div>

          {isChangingAvatar && (
            <div className="bg-black/30 p-4 rounded-2xl border border-white/10 animate-fade-in">
              <p className="text-white text-xs font-black uppercase tracking-widest mb-4">{language === 'en' ? 'Choose Profile Character' : 'Izaberi lik za profil'}</p>
              <div className="grid grid-cols-3 gap-2">
                {AVATARS.map((a) => (
                  <button
                    key={a.id}
                    onClick={async () => { setAvatar(a.id); setIsChangingAvatar(false); await saveProfile(); }}
                    className={`p-2 rounded-xl border transition-all flex flex-col items-center justify-center gap-1 ${avatar === a.id
                      ? 'bg-blue-600/20 border-blue-500 scale-105 ring-2 ring-blue-500/50'
                      : 'bg-white/5 border-white/10 opacity-60 hover:opacity-100 hover:bg-white/10'
                      }`}
                  >
                    <img src={`/assets/${a.id}.png`} alt={a.name} className="w-10 h-10 object-contain" />
                    <span className="text-[8px] text-white/50 font-black text-center leading-tight h-6 flex items-center">
                      {a.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/30 p-4 rounded-2xl border border-white/5">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-tighter mb-1">{t.stats.wins}</p>
              <p className="text-2xl font-black text-green-500">{profileData?.wins || 0}</p>
            </div>
            <div className="bg-black/30 p-4 rounded-2xl border border-white/5">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-tighter mb-1">{t.stats.games_played}</p>
              <p className="text-2xl font-black text-blue-500">{profileData?.games_played || 0}</p>
            </div>
            <div className="col-span-2 bg-black/30 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-tighter mb-1">{t.stats.total_capital}</p>
                <p className="text-xl font-black text-amber-500">${(profileData?.total_capital || 0).toLocaleString()}</p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-xs font-black uppercase tracking-[0.2em]">{language === 'en' ? 'Economy Mastery' : 'Ekonomsko majstorstvo'}</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-black/30 p-3 rounded-xl border border-white/5 text-center">
                <p className="text-emerald-500 text-lg font-black">{profileData?.correct_quizzes || 0}</p>
                <p className="text-slate-500 text-[8px] font-bold uppercase">Correct</p>
              </div>
              <div className="bg-black/30 p-3 rounded-xl border border-white/5 text-center">
                <p className="text-rose-500 text-lg font-black">{profileData?.wrong_quizzes || 0}</p>
                <p className="text-slate-500 text-[8px] font-bold uppercase">Wrong</p>
              </div>
              <div className="bg-black/30 p-3 rounded-xl border border-white/5 text-center">
                <p className="text-blue-500 text-lg font-black">{profileData?.auction_wins || 0}</p>
                <p className="text-slate-500 text-[8px] font-bold uppercase">Auctions</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-xs font-black uppercase tracking-[0.2em]">{language === 'en' ? 'Financial History' : 'Finansijska istorija'}</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/30 p-3 rounded-xl border border-white/5 flex items-center gap-3">
                <div className="text-xl">📈</div>
                <div>
                  <p className="text-emerald-400 font-black text-sm">${(profileData?.investment_gains || 0).toLocaleString()}</p>
                  <p className="text-slate-500 text-[8px] font-bold uppercase">Total Gains</p>
                </div>
              </div>
              <div className="bg-black/30 p-3 rounded-xl border border-white/5 flex items-center gap-3">
                <div className="text-xl">📉</div>
                <div>
                  <p className="text-rose-400 font-black text-sm">${(profileData?.investment_losses || 0).toLocaleString()}</p>
                  <p className="text-slate-500 text-[8px] font-bold uppercase">Total Losses</p>
                </div>
              </div>
              <div className="bg-black/30 p-3 rounded-xl border border-white/5 flex items-center gap-3">
                <div className="text-xl">🔒</div>
                <div>
                  <p className="text-amber-400 font-black text-sm">{profileData?.jail_visits || 0}</p>
                  <p className="text-slate-500 text-[8px] font-bold uppercase">Jail Visits</p>
                </div>
              </div>
              <div className="bg-black/30 p-3 rounded-xl border border-white/5 flex items-center gap-3">
                <div className="text-xl">⚖️</div>
                <div>
                  <p className="text-blue-400 font-black text-sm">${((profileData?.investment_gains || 0) - (profileData?.investment_losses || 0)).toLocaleString()}</p>
                  <p className="text-slate-500 text-[8px] font-bold uppercase">Net Profit</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-xs font-black uppercase tracking-[0.2em]">{language === 'en' ? 'Character Stats' : 'Statistika likova'}</h3>
            <div className="bg-black/30 p-4 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-400 text-xs font-bold">Most Used Character:</span>
                <div className="flex items-center gap-2">
                  <img src={`/assets/${mostUsedAvatarId || '1'}.png`} className="w-6 h-6 object-contain" />
                  <span className="text-white font-black text-[10px]">{AVATAR_MAP[mostUsedAvatarId] || 'Unknown'}</span>
                </div>
              </div>
              <div className="grid grid-cols-9 gap-1">
                {AVATARS.map(a => {
                  const usage = profileData?.character_usage?.[a.id] || 0;
                  const maxUsage = Math.max(...Object.values(profileData?.character_usage || { '1': 1 }));
                  const height = usage > 0 ? (usage / maxUsage) * 100 : 5;
                  return (
                    <div key={a.id} className="flex flex-col items-center gap-1">
                      <div className="w-full bg-white/5 rounded-t-sm relative h-12 overflow-hidden" title={a.name}>
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-blue-500/40" 
                          style={{ height: `${height}%` }}
                        />
                      </div>
                      <span className="text-[6px] text-slate-600 font-bold rotate-45 mt-2 truncate w-8">{AVATAR_MAP[a.id]?.split(' ')[0]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <button
              onClick={handleSignOut}
              className="w-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-500 font-bold py-3 rounded-xl transition-all text-sm uppercase tracking-widest"
            >
              {language === 'en' ? 'Sign Out' : 'Odjavi se'}
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (mode === 'initial') {
    return (
      <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center p-6 text-center z-50 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-green-500 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-sm w-full space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight text-white italic drop-shadow-2xl">
              <span className="text-blue-500">Economy</span>
              <span className="text-green-500">Switch</span>
            </h1>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
              {language === 'en' ? 'Financial & Eco Strategy' : 'Finansijska i eko strategija'}
            </p>
          </div>

          <div className="grid gap-4">
            <button
              onClick={() => { (window as any).playSFX?.('click'); setMode('single'); }}
              className="group relative p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🚀
                </div>
                <div>
                  <h3 className="text-white font-bold">{t.lobby.single_player}</h3>
                  <p className="text-slate-500 text-xs">{language === 'en' ? 'Play alone and learn' : 'Igraj sam i nauči'}</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => { (window as any).playSFX?.('click'); setMode('create'); }}
              className="group relative p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🏠
                </div>
                <div>
                  <h3 className="text-white font-bold">{t.lobby.create_game}</h3>
                  <p className="text-slate-500 text-xs">{language === 'en' ? 'Be the host and invite friends' : 'Budi host i pozovi prijatelje'}</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => { (window as any).playSFX?.('click'); setMode('join'); }}
              className="group relative p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🔑
                </div>
                <div>
                  <h3 className="text-white font-bold">{t.lobby.join_game}</h3>
                  <p className="text-slate-500 text-xs">{language === 'en' ? 'Enter code to join friends' : 'Unesi kod da se pridružiš'}</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => { (window as any).playSFX?.('click'); setMode('profile'); }}
              className="group relative p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  👤
                </div>
                <div>
                  <h3 className="text-white font-bold">{t.lobby.profile}</h3>
                  <p className="text-slate-500 text-xs">{language === 'en' ? 'Stats, Wins & Settings' : 'Statistika, pobede i podešavanja'}</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => { (window as any).playSFX?.('click'); setMode('socials'); }}
              className="group relative p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  👥
                </div>
                <div>
                  <h3 className="text-white font-bold">{t.lobby.socials}</h3>
                  <p className="text-slate-500 text-xs">{language === 'en' ? 'Friends & Invitations' : 'Prijatelji i pozivnice'}</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => { (window as any).playSFX?.('click'); setMode('leaderboard'); }}
              className="group relative p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-amber-600/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🏆
                </div>
                <div>
                  <h3 className="text-white font-bold">{t.lobby.leaderboard}</h3>
                  <p className="text-slate-500 text-xs">{language === 'en' ? 'Global Rankings & Winners' : 'Globalno rangiranje i pobednici'}</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => { (window as any).playSFX?.('click'); onOpenSettings?.(); }}
              className="group relative p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-slate-500/20 flex items-center justify-center text-2xl group-hover:rotate-45 transition-transform">
                  ⚙️
                </div>
                <div>
                  <h3 className="text-white font-bold">{t.ui.settings}</h3>
                  <p className="text-slate-500 text-xs">{language === 'en' ? 'Audio & Language' : 'Audio i jezik'}</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'leaderboard') {
    return (
      <Leaderboard 
        currentUserId={userId || undefined}
        onBack={() => setMode('initial')}
        language={language}
      />
    );
  }

  if (mode === 'socials') {
    if (!userId) {
      return (
        <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center p-6 z-50">
          <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Socials...</p>
        </div>
      );
    }
    return (
      <Socials 
        currentUserId={userId}
        onBack={() => setMode('initial')}
        onInviteSent={() => {
          onStart(name, avatar, false);
        }}
        language={language}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center p-6 z-50 overflow-hidden">
      <div className="max-w-sm w-full space-y-8 bg-white/5 p-8 rounded-[32px] border border-white/10 backdrop-blur-xl">
        <button
          onClick={() => setMode('initial')}
          className="text-slate-500 hover:text-white transition-colors text-sm flex items-center gap-2"
        >
          ← {t.ui.back_to_menu}
        </button>

        <div className="space-y-6">
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-bold text-white capitalize">
              {mode.replace('_', ' ')} Mode
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2 block">
                Player Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white placeholder:text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {mode === 'join' && (
              <div>
                <label className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2 block">
                  Room Code
                </label>
                <input
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  placeholder="CODE123"
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white font-mono placeholder:text-slate-700 outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
            )}

            <div>
              <label className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2 block text-center">
                Select Character
              </label>
              <div className="grid grid-cols-3 gap-2">
                {AVATARS.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setAvatar(a.id)}
                    className={`p-2 rounded-xl border transition-all flex flex-col items-center justify-center gap-1 ${avatar === a.id
                      ? 'bg-blue-600/20 border-blue-500 scale-105 ring-2 ring-blue-500/50'
                      : 'bg-white/5 border-white/10 opacity-60 hover:opacity-100 hover:bg-white/10'
                      }`}
                  >
                    <img
                      src={`/assets/${a.id}.png`}
                      alt={a.name}
                      className="w-12 h-12 object-contain"
                    />
                    <span className="text-[8px] text-white/50 uppercase font-black text-center leading-tight h-6 flex items-center">
                      {a.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleAction}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-900/20 hover:scale-105 active:scale-95 transition-all"
          >
            {mode === 'join' ? 'CONNECT' : 'START ADVENTURE'}
          </button>
        </div>
      </div>
    </div>
  );
};
