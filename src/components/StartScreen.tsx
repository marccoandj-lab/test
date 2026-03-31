import React, { useState, useEffect } from 'react';
import { translations } from '../i18n/translations';
import { multiplayer } from '../services/MultiplayerManager';
import { supabase } from '../lib/supabase';
import { AvatarType } from '../types/game';
import { Socials } from './Socials';
import { Leaderboard } from './Leaderboard';

interface StartScreenProps {
  onStart: (name: string, avatar: string, isSingle: boolean) => void;
  initialName?: string;
  initialAvatar?: string;
  onProfileUpdate?: (name: string, avatar: string) => void;
  profileData?: {
    display_id?: string;
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

const AVATAR_MAP: Record<string, string> = {
  '1': 'Novak Switchovic',
  '2': 'Leonardo Da Switchy',
  '3': 'Switchola Jokić',
  '4': 'Switchopatra',
  '5': 'Wolfgang Switchodeus Mozart',
  '6': 'Switchbert Einstein',
  '7': 'Switchola Tesla',
  '8': 'Frida Switchlo',
  '9': 'Switch'
};

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
  const [showMultiplayerMenu, setShowMultiplayerMenu] = useState(false);
  const [isCheckingName, setIsCheckingName] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);

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

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    (window as any).playSFX?.('click');
    alert(language === 'en' ? 'ID copied to clipboard!' : 'ID kopiran u clipboard!');
  };

  const checkUsernameUnique = async (newName: string) => {
    if (newName === initialName) return true;
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', newName)
      .maybeSingle();
    
    if (error) return false;
    return !data;
  };

  const saveProfile = async (overrideName?: string) => {
    const finalName = overrideName || name;
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // Check uniqueness if name changed
      if (finalName !== initialName) {
        setIsCheckingName(true);
        const isUnique = await checkUsernameUnique(finalName);
        setIsCheckingName(false);
        if (!isUnique) {
          setNameError(language === 'en' ? 'Username already taken!' : 'Korisničko ime je zauzeto!');
          return false;
        }
      }

      const currentUsage = profileData?.character_usage || {};
      const isStartingGame = mode === 'create' || mode === 'join' || mode === 'single';
      const newUsage = isStartingGame 
        ? { ...currentUsage, [avatar]: (currentUsage[avatar] || 0) + 1 }
        : currentUsage;
      
      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        username: finalName,
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

      if (error) {
        if (error.code === '23505') {
          setNameError(language === 'en' ? 'Username already taken!' : 'Korisničko ime je zauzeto!');
          return false;
        }
        throw error;
      }

      localStorage.setItem('eib_username', finalName);
      localStorage.setItem('eib_avatar', avatar);

      if (onProfileUpdate) {
        onProfileUpdate(finalName, avatar);
      }
      setNameError(null);
      return true;
    }
    return false;
  };

  const handleAction = async () => {
    if (!name) return alert(language === 'en' ? 'Enter your name!' : 'Unesite svoje ime!');

    (window as any).playSFX?.('click');
    const saved = await saveProfile();
    if (!saved) return;

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
        <div className="max-w-md w-full space-y-6 bg-white/5 p-8 rounded-[32px] border border-white/10 backdrop-blur-xl max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl">
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
                  <div className="relative">
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => { setName(e.target.value); setNameError(null); }}
                      className={`w-full bg-black/30 border ${nameError ? 'border-rose-500' : 'border-white/10'} rounded-lg p-2 text-white outline-none focus:ring-2 ${nameError ? 'focus:ring-rose-500' : 'focus:ring-blue-500'}`}
                      placeholder={language === 'en' ? 'Enter name' : 'Unesite ime'}
                      autoFocus
                    />
                    {isCheckingName && (
                      <div className="absolute right-3 top-2.5">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                  {nameError && <p className="text-rose-500 text-[10px] font-bold uppercase">{nameError}</p>}
                  
                  {userId && (
                    <div className="inline-flex items-center gap-1.5 bg-blue-600/10 px-2 py-0.5 rounded border border-blue-500/10 mb-2">
                      <span className="text-blue-400 font-mono text-[9px] font-black tracking-widest">#{userId.substring(0, 6).toUpperCase()}</span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button 
                      onClick={async () => { 
                        const success = await saveProfile(); 
                        if (success) setIsEditingName(false); 
                      }} 
                      disabled={isCheckingName}
                      className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white px-3 py-1 rounded-lg text-xs font-bold transition-colors"
                    >
                      {t.ui.save}
                    </button>
                    <button 
                      onClick={() => { setName(initialName); setNameError(null); setIsEditingName(false); }} 
                      className="bg-white/5 hover:bg-white/10 text-white px-3 py-1 rounded-lg text-xs font-bold transition-colors"
                    >
                      {t.ui.cancel}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
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
                  {userId && (
                    <div className="flex items-center gap-2 mt-1">
                      <div 
                        onClick={() => copyToClipboard(userId.substring(0, 6).toUpperCase())}
                        className="bg-blue-600/20 border border-blue-500/30 px-2 py-0.5 rounded flex items-center gap-1.5 cursor-pointer hover:bg-blue-600/30 transition-all group/id"
                      >
                        <span className="text-blue-400 font-mono text-[10px] font-black tracking-widest">#{userId.substring(0, 6).toUpperCase()}</span>
                        <span className="text-[8px] opacity-40 group-hover/id:opacity-100 transition-opacity">📋</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">{AVATAR_MAP[avatar] || 'Economy Strategist'}</p>
            </div>
          </div>

          {isChangingAvatar && (
            <div className="bg-black/30 p-4 rounded-2xl border border-white/10 animate-fade-in">
              <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-3 text-center">{language === 'en' ? 'Select Your Identity' : 'Odaberi identitet'}</p>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(AVATAR_MAP).map(([id]) => (
                  <button
                    key={id}
                    onClick={async () => { setAvatar(id); setIsChangingAvatar(false); setName(name); await saveProfile(); }}
                    className={`p-2 rounded-xl border transition-all flex flex-col items-center justify-center gap-1 ${avatar === id
                      ? 'bg-blue-600/20 border-blue-500 scale-105 ring-2 ring-blue-500/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                  >
                    <img src={`/assets/${id}.png`} alt="" className="w-10 h-10 object-contain" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
              <p className="text-blue-400 text-2xl font-black">{profileData?.wins || 0}</p>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{t.leaderboard.wins}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
              <p className="text-emerald-400 text-2xl font-black">{profileData?.games_played || 0}</p>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{language === 'en' ? 'Played' : 'Odigrano'}</p>
            </div>
          </div>

          <div className="space-y-3 bg-white/5 p-5 rounded-2xl border border-white/5">
            <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-2">{language === 'en' ? 'Detailed Statistics' : 'Detaljna statistika'}</p>
            <div className="grid grid-cols-2 gap-y-4">
              <div>
                <p className="text-white font-bold text-sm">{profileData?.correct_quizzes || 0}</p>
                <p className="text-slate-500 text-[9px] font-bold uppercase tracking-tighter">{language === 'en' ? 'Correct Quizzes' : 'Tačni kvizovi'}</p>
              </div>
              <div>
                <p className="text-white font-bold text-sm">{(profileData?.investment_gains || 0).toLocaleString()} SC</p>
                <p className="text-slate-500 text-[9px] font-bold uppercase tracking-tighter">{language === 'en' ? 'Investment Gains' : 'Dobici od invest.'}</p>
              </div>
              <div>
                <p className="text-white font-bold text-sm">{profileData?.jail_visits || 0}</p>
                <p className="text-slate-500 text-[9px] font-bold uppercase tracking-tighter">{language === 'en' ? 'Jail Visits' : 'Posete zatvoru'}</p>
              </div>
              <div>
                <p className="text-white font-bold text-sm">{(profileData?.total_capital || 0).toLocaleString()} SC</p>
                <p className="text-slate-500 text-[9px] font-bold uppercase tracking-tighter">{language === 'en' ? 'Lifetime Capital' : 'Ukupan kapital'}</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/20 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-2xl">🏆</div>
            <div>
              <p className="text-white font-bold text-sm">{AVATAR_MAP[mostUsedAvatarId] || 'Strategist'}</p>
              <p className="text-amber-500/70 text-[9px] font-black uppercase tracking-widest">{language === 'en' ? 'Most Used Character' : 'Najčešći karakter'}</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onOpenSettings}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl border border-white/10 transition-all active:scale-95"
            >
              ⚙️ {t.ui.settings}
            </button>
            <button
              onClick={handleSignOut}
              className="flex-1 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white font-bold py-4 rounded-2xl border border-rose-500/20 transition-all active:scale-95"
            >
              🚪 {language === 'en' ? 'Sign Out' : 'Odjavi se'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'socials') {
    return <Socials onBack={() => setMode('initial')} onInviteSent={(code) => { setRoomCode(code); onStart(name, avatar, false); }} currentUserId={userId || ''} language={language} />;
  }

  if (mode === 'leaderboard') {
    return <Leaderboard onBack={() => setMode('initial')} currentUserId={userId || ''} language={language} />;
  }

  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col items-center p-6 z-50 overflow-y-auto custom-scrollbar">
      <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden fixed">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-600 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-lg w-full flex flex-col items-center gap-6 py-8 my-auto">
        <div className="text-center space-y-2 animate-modal-pop">
          <div className="inline-block p-4 bg-white/5 rounded-[32px] border border-white/10 mb-4 backdrop-blur-xl shadow-2xl">
            <img src="/logo.png" alt="EconomySwitch Logo" className="w-24 h-24 object-contain" />
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase drop-shadow-2xl">
            <span className="text-blue-500">Economy</span><span className="text-emerald-500">Switch</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px]">Financial & Sustainability Strategy</p>
        </div>

        <div className="w-full animate-modal-pop" style={{ animationDelay: '0.2s' }}>
          {/* Always show Quick Profile for easy access */}
          <div className="bg-black/30 p-4 rounded-2xl border border-white/10 mb-4 backdrop-blur-md">
            <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-3 text-center">{language === 'en' ? 'Game Profile' : 'Profil za igru'}</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                <img src={`/assets/${avatar}.png`} alt="" className="w-9 h-9 object-contain" />
              </div>
              <div className="flex-1">
                <p className="text-white font-black text-sm">{name}</p>
                {userId && <p className="text-blue-400 font-mono text-[9px] font-black tracking-widest">#{userId.substring(0, 6).toUpperCase()}</p>}
              </div>
              <button onClick={() => setMode('profile')} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-xs border border-white/5">✏️</button>
            </div>
          </div>

          {!showMultiplayerMenu ? (
            <div className="flex flex-col gap-4">
              <button
                onClick={() => { onStart(name, avatar, true); }}
                className="group relative w-full bg-gradient-to-br from-white to-slate-200 p-6 rounded-[2rem] shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="text-slate-900 font-black text-2xl italic tracking-tight">{t.lobby.single_player}</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Master the economy alone</p>
                  </div>
                  <span className="text-4xl">🚀</span>
                </div>
              </button>

              <button
                onClick={() => { setMode('create'); setShowMultiplayerMenu(true); }}
                className="group relative w-full bg-slate-800 border border-white/10 p-6 rounded-[2rem] shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
              >
                <div className="relative flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="text-white font-black text-2xl italic tracking-tight">{t.lobby.multiplayer}</h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Compete with the world</p>
                  </div>
                  <span className="text-4xl group-hover:rotate-12 transition-transform">👥</span>
                </div>
              </button>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <button
                  onClick={() => setMode('socials')}
                  className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">🤝</span>
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">{language === 'en' ? 'Social' : 'Prijatelji'}</span>
                </button>
                <button
                  onClick={() => setMode('leaderboard')}
                  className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">🏆</span>
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">{language === 'en' ? 'Global' : 'Rang lista'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full space-y-4">
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
                <div className="flex gap-4 mb-8 p-1 bg-black/40 rounded-2xl border border-white/5">
                  <button
                    onClick={() => setMode('create')}
                    className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'create' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    {t.lobby.create_game}
                  </button>
                  <button
                    onClick={() => setMode('join')}
                    className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'join' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    {t.lobby.join_game}
                  </button>
                </div>

                {mode === 'join' && (
                  <div className="space-y-4 mb-6">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-blue-500 font-bold">#</div>
                      <input
                        type="text"
                        maxLength={6}
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                        placeholder="ENTER ROOM CODE"
                        className="w-full bg-black/40 border-2 border-white/10 rounded-2xl py-4 pl-10 pr-4 text-white font-black tracking-[0.3em] outline-none focus:border-blue-500 transition-all text-center placeholder:text-slate-700 placeholder:tracking-normal placeholder:font-bold placeholder:text-xs"
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleAction()}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-5 rounded-[1.5rem] transition-all active:scale-95 shadow-xl shadow-blue-900/20 text-lg italic tracking-tight"
                >
                  {mode === 'create' ? t.lobby.create_game.toUpperCase() : t.lobby.join_game.toUpperCase()} ➔
                </button>
              </div>

              <button
                onClick={() => setShowMultiplayerMenu(false)}
                className="w-full py-4 text-slate-500 font-bold uppercase tracking-widest text-[10px] hover:text-white transition-colors"
              >
                ← {t.ui.back_to_menu}
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col items-center gap-2 opacity-40">
          <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.3em]">Version 2.0.4 - Strategic Edition</p>
          <div className="flex gap-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </div>
  );
};
