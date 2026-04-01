import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameMap } from './components/GameMap';
import GameModal from './components/GameModalContainer';
import { StartScreen } from './components/StartScreen';
import { Sidebar } from './components/Sidebar';
import { generateLevels } from './data/levelGenerator';
import { Level, GameMode } from './data/gameData';
import { multiplayer, GameState as MPState } from './services/MultiplayerManager';
import { AvatarType, Player, NotificationSettings } from './types/game';

import { SettingsModal } from './components/SettingsModal';
import { supabase } from './lib/supabase';
import { Auth } from './components/Auth';
import { Session } from '@supabase/supabase-js';
import { translations, Language } from './i18n/translations';

const WINNING_BALANCE = 1000000;
const MUSIC_TRACKS = [
  '/assets/music/music1.mp3',
  '/assets/music/music2.mp3'
];

export const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<{
    username: string,
    display_id?: string,
    avatar_url: string,
    wins: number,
    games_played: number,
    total_capital: number,
    character_usage: Record<string, number>,
    correct_quizzes: number,
    wrong_quizzes: number,
    investment_gains: number,
    investment_losses: number,
    jail_visits: number,
    jail_skips: number,
    auction_wins: number,
    taxes_paid: number
  } | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Helper to generate a unique short display ID
  const generateDisplayId = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const [gameState, setGameState] = useState<'start' | 'lobby' | 'playing' | 'victory'>('start');
  const [isSinglePlayer, setIsSinglePlayer] = useState(true);
  const [mpState, setMpState] = useState<MPState | null>(null);
  const [pendingInvite, setPendingInvite] = useState<{ id: string, roomCode: string, issuerName: string, issuerId: string } | null>(null);

  const [levels, setLevels] = useState<Level[]>(generateLevels(300, 'finance'));
  const [balance, setBalance] = useState(150000);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [mode, setMode] = useState<GameMode>('finance');

  // Local UI states
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isMoving, setIsMoving] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [lastDiceRoll, setLastDiceRoll] = useState<number | null>(null);
  const [showExpiry, setShowExpiry] = useState(false);
  const [showTurnModal, setShowTurnModal] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    enabled: false,
    slots: ["09:00", "18:00"]
  });

  const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || "BF-7c3glrSbaxtlAiMCeXWNt2pb8XRgTtIEoiN45ExScF1fGeQxBsk17Xg8w0jDizluKCbjQGCEmK7WU8v4bScA";

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const subscribeToPush = async (settings: NotificationSettings) => {
    if (!session?.user.id) return;

    try {
      if (settings.enabled) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const registration = await navigator.serviceWorker.ready;
          
          const existingSubscription = await registration.pushManager.getSubscription();
          if (existingSubscription) {
            await existingSubscription.unsubscribe();
          }

          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
          });

          // Save subscription directly to Supabase to bypass Server-Side missing Authorization header!
          const { error: dbError } = await supabase.from('push_subscriptions').upsert({
            user_id: session.user.id,
            subscription: subscription
          }, { onConflict: 'user_id, subscription' });

          if (dbError) {
              console.error("DB error saving subscription:", dbError);
              throw dbError;
          }
        } else {
          // If denied, disable in settings
          settings.enabled = false;
        }
      }
      
      // Update profile with new settings
      setNotificationSettings(settings);
      updateSupabaseProfile({ notification_settings: settings });
    } catch (err) {
      console.error('Push subscription failed:', err);
    }
  };

  // Audio state
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('eib_volume');
    return saved !== null ? parseFloat(saved) : 0.1;
  });
  const [trackIndex, setTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(() => {
    const saved = localStorage.getItem('eib_music_enabled');
    return saved !== null ? saved === 'true' : false;
  });
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('eib_language') as Language) || 'en');

  const t = translations[language];

  // Singleplayer Stats
  const [singlePlayerStats, setSinglePlayerStats] = useState({
    correctQuizzes: 0,
    wrongQuizzes: 0,

    investmentGains: 0,
    investmentLosses: 0,
    jailVisits: 0,
    jailSkips: 0,
    auctionWins: 0, // Not used in SP but for structural compatibility
    taxesPaid: 0
  });

  const [userName, setUserName] = useState(() => localStorage.getItem('eib_username') || "Player 1");
  const [userAvatar, setUserAvatar] = useState<AvatarType>(() => (localStorage.getItem('eib_avatar') as AvatarType) || "1");

  // Auth & Profile Effect
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      setIsAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url, wins, games_played, total_capital, character_usage, correct_quizzes, wrong_quizzes, investment_gains, investment_losses, jail_visits, jail_skips, auction_wins, taxes_paid')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setProfile(data as any);
        const newName = data.username || "Player";
        const newAvatar = (data.avatar_url as AvatarType) || "1";
        setUserName(newName);
        setUserAvatar(newAvatar);
        localStorage.setItem('eib_username', newName);
        localStorage.setItem('eib_avatar', newAvatar);
        multiplayer.setMyId(userId);
      } else {
        // Create initial profile if it doesn't exist
        const { data: { user } } = await supabase.auth.getUser();
        // Use part of UUID as fallback for professional default name
        const shortId = userId.substring(0, 6).toUpperCase();
        const initialName = user?.user_metadata?.full_name || `Investor_${shortId}`;
        const newDisplayId = generateDisplayId();

        const newProfile = {
          id: userId,
          username: initialName,
          display_id: newDisplayId,
          avatar_url: '1',
          wins: 0,
          games_played: 0,
          total_capital: 0,
          character_usage: {},
          correct_quizzes: 0,
          wrong_quizzes: 0,
          investment_gains: 0,
          investment_losses: 0,
          jail_visits: 0,
          jail_skips: 0,
          auction_wins: 0,
          taxes_paid: 0,
          notification_settings: { enabled: false, slots: ["09:00", "18:00"] }
        };

        const { error: insertError } = await supabase.from('profiles').insert([newProfile]);

        if (!insertError) {
          setProfile(newProfile as any);
          setUserName(initialName);
          setUserAvatar('1');
          multiplayer.setMyId(userId);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const updateSupabaseProfile = async (updates: Partial<{
    username: string,
    avatar_url: string,
    wins: number,
    games_played: number,
    total_capital: number,
    character_usage: Record<string, number>,
    correct_quizzes: number,
    wrong_quizzes: number,
    investment_gains: number,
    investment_losses: number,
    jail_visits: number,
    jail_skips: number,
    auction_wins: number,
    taxes_paid: number,
    notification_settings: NotificationSettings
  }>) => {
    if (!session?.user.id) return;
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.user.id);

      if (error) throw error;

      // Refresh local profile
      const { data } = await supabase
        .from('profiles')
        .select('username, avatar_url, wins, games_played, total_capital, character_usage, correct_quizzes, wrong_quizzes, investment_gains, investment_losses, jail_visits, jail_skips, auction_wins, taxes_paid, notification_settings')
        .eq('id', session.user.id)
        .single();

      if (data) {
        setProfile(data);
        if (data.notification_settings) {
          setNotificationSettings(data.notification_settings);
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCloseTurnModal = useCallback(() => {
    setShowTurnModal(false);
  }, []);

  const handleAcceptInvite = async () => {
    if (!pendingInvite) return;

    // 1. Mark invite as accepted in DB
    await supabase.from('game_invites').update({ status: 'accepted' }).eq('id', pendingInvite.id);

    // 2. Join the specified room
    multiplayer.joinRoom(pendingInvite.roomCode, userName, userAvatar as any);
    
    // 3. Update local state to show lobby
    setIsSinglePlayer(false);
    setGameState('lobby');
    setPendingInvite(null);
  };

  const handleDeclineInvite = async () => {
    if (!pendingInvite) return;
    await supabase.from('game_invites').update({ status: 'declined' }).eq('id', pendingInvite.id);
    setPendingInvite(null);
  };

  const handleLeaveRoom = () => {
    multiplayer.leaveRoom();
    setGameState('start');
    setMpState(null);
  };

  const handleExitGame = () => {
    if (!isSinglePlayer) {
      multiplayer.leaveRoom();
    }
    setGameState('start');
    setMpState(null);
    setCurrentLevelIndex(0);
    setBalance(150000);
    setMode('finance');
    setIsSettingsOpen(false);
  };

  // Taxation track
  const myExemption = isSinglePlayer ? 0 : (mpState?.players.find(p => p.id === multiplayer.getMyId())?.taxExemptTurns || 0);
  const prevExemption = useRef(myExemption);

  useEffect(() => {
    if (prevExemption.current > 0 && myExemption === 0) {
      setShowExpiry(true);
      setTimeout(() => setShowExpiry(false), 5000);
    }
    prevExemption.current = myExemption;
  }, [myExemption]);

  const prevTurnIndex = useRef<number | null>(null);

  // Audio control effect
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    localStorage.setItem('eib_language', language);
  }, [language]);

  useEffect(() => {
    if (isMusicPlaying && audioRef.current) {
      audioRef.current.play().catch(err => console.log("Track switch play blocked:", err));
    }
  }, [trackIndex, isMusicPlaying]);

  const startMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsMusicPlaying(true);
      }).catch(err => {
        console.log("Audio play blocked, waiting for user interaction:", err);
      });
    }
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
      localStorage.setItem('eib_music_enabled', 'false');
    } else {
      audioRef.current.play().then(() => {
        setIsMusicPlaying(true);
        localStorage.setItem('eib_music_enabled', 'true');
      }).catch(err => console.log("Toggle play failed:", err));
    }
  }, [isMusicPlaying]);

  // SFX Player
  const playSFX = useCallback((type: 'dice_roll' | 'correct' | 'incorrect' | 'win' | 'loss' | 'jail' | 'click' | 'victory') => {
    const sfx = new Audio(`/assets/sfx/${type}.mp3`);
    sfx.volume = volume * 0.8; // SFX slightly quieter than music
    sfx.play().catch(() => {
      // Gracefully fail if SFX files are missing
      // console.warn(`SFX file not found or play blocked: ${type}`);
    });
  }, [volume]);

  // Expose playSFX globally for components
  useEffect(() => {
    (window as any).playSFX = playSFX;
  }, [playSFX]);

  // Real-time Invites Listener
  useEffect(() => {
    if (!session?.user.id) return;

    const channel = supabase
      .channel('game_invites_realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'game_invites',
          filter: `receiver_id=eq.${session.user.id}`
        },
        async (payload) => {
          console.log("Invite received:", payload);
          const invite = payload.new;
          const { data: issuer } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', invite.issuer_id)
            .single();

          setPendingInvite({
            id: invite.id,
            roomCode: invite.room_code,
            issuerName: issuer?.username || 'Someone',
            issuerId: invite.issuer_id
          });
          playSFX('click');
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session, playSFX]);

  const handleTrackEnd = useCallback(() => {
    setTrackIndex(prev => (prev + 1) % MUSIC_TRACKS.length);
  }, []);

  // Auto-play music on first user interaction (Browser compliance)
  useEffect(() => {
    const playOnFirstInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsMusicPlaying(true);
            console.log("Music started successfully on interaction");
          })
          .catch(err => console.log("Auto-play interaction failed:", err));
      }
      // Remove all listeners after first successful or attempted interaction
      ['click', 'touchstart', 'mousedown', 'keydown'].forEach(event =>
        window.removeEventListener(event, playOnFirstInteraction)
      );
    };

    ['click', 'touchstart', 'mousedown', 'keydown'].forEach(event =>
      window.addEventListener(event, playOnFirstInteraction)
    );

    return () => {
      ['click', 'touchstart', 'mousedown', 'keydown'].forEach(event =>
        window.removeEventListener(event, playOnFirstInteraction)
      );
    };
  }, []);

  useEffect(() => {
    multiplayer.init((state) => {
      if (!isSinglePlayer && state.status === 'playing') {
        const myId = multiplayer.getMyId();
        const myIndex = state.players.findIndex(p => p.id === myId);
        const anyoneInteracting = state.players.some(p => p.isInteracting);

        if (state.currentTurnIndex === myIndex) {
          // Trigger announcement only when index CHANGED to us AND no one is interacting
          // AND we are not in jail (jailed players don't roll, so don't show turn popup)
          const myProfile = state.players[myIndex];
          if (prevTurnIndex.current !== myIndex && !anyoneInteracting && myProfile.status !== 'jail') {
            setShowTurnModal(true);
            prevTurnIndex.current = myIndex;
          }
        } else {
          // If it's not our turn, keep track of the current global turn index
          if (prevTurnIndex.current !== state.currentTurnIndex) {
            prevTurnIndex.current = state.currentTurnIndex;
            // Ensure modal is hidden if turn passed away from us
            setShowTurnModal(false);
          }
        }
      }

      setMpState(state);
      if (state.levels && state.levels.length > 0) {
        setLevels(state.levels);
      }
      if (state.status === 'playing' && gameState !== 'playing') {
        setGameState('playing');
      }
    }, (error) => {
      alert(error);
      // If we are in lobby or playing and host is gone, we might need to reset
      if (gameState !== 'start') {
        setGameState('start');
      }
    });
  }, [gameState, isSinglePlayer]);

  useEffect(() => {
    const handler = (e: any) => setShowMobileSidebar(e.detail);
    window.addEventListener('toggle-mobile-sidebar', handler);
    return () => window.removeEventListener('toggle-mobile-sidebar', handler);
  }, []);

  const handleStart = (name: string, avatar: string, isSingle: boolean) => {
    setIsSinglePlayer(isSingle);
    setUserName(name);
    setUserAvatar(avatar as AvatarType);

    // Start music ONLY if it's supposed to be playing (checked from localStorage/state)
    const musicEnabled = localStorage.getItem('eib_music_enabled') !== 'false';
    if (musicEnabled && isMusicPlaying) {
      startMusic();
    }

    if (isSingle) {
      // Use existing already generated levels instead of resetting to 0/100
      setBalance(150000); // Reset balance for new game
      setGameState('playing');
    } else {
      setGameState('lobby');
    }
  };

  const handleRollDice = () => {
    if (isMoving || isRolling) return;

    // Block if ANY player is interacting with a modal
    const anyoneInteracting = mpState?.players.some(p => p.isInteracting);
    if (!isSinglePlayer && anyoneInteracting) return;

    if (!isSinglePlayer && mpState) {
      const myId = multiplayer.getMyId();
      const myIndex = mpState.players.findIndex(p => p.id === myId);
      if (myIndex !== mpState.currentTurnIndex) return;
    }

    setIsRolling(true);
    playSFX('dice_roll');
    setTimeout(() => {
      const roll = Math.floor(Math.random() * 6) + 1;
      setLastDiceRoll(roll);
      setIsRolling(false);
      animateMovement(roll);
    }, 1600);
  };

  const animateMovement = async (steps: number) => {
    setIsMoving(true);
    let currentPos = currentLevelIndex;
    const finalTargetPos = currentPos + steps;
    const isHost = isSinglePlayer || mpState?.players.find(p => p.id === multiplayer.getMyId())?.isHost;
    const currentMode = isSinglePlayer ? mode : (mpState?.mode || 'finance');

    if (isHost && finalTargetPos >= levels.length - 40) {
      const newLevels = generateLevels(150, currentMode, levels[levels.length - 1].id + 1);
      const updatedLevels = [...levels, ...newLevels];
      setLevels(prev => [...prev, ...newLevels]);
      if (!isSinglePlayer) {
        multiplayer.sendAction({ type: 'UPDATE_LEVELS', levels: updatedLevels });
      }
    }

    for (let i = 0; i < steps; i++) {
      currentPos++;
      setCurrentLevelIndex(currentPos);
      await new Promise(resolve => setTimeout(resolve, 350));
    }

    setIsMoving(false);

    if (!isSinglePlayer) {
      multiplayer.sendAction({ type: 'ACTION_DICE_ROLL', steps });

      // Track jail visits for multiplayer profile
      const landingField = levels[currentPos].type;
      if (landingField === 'jail') {
        playSFX('jail');
        if (profile) {
          updateSupabaseProfile({ jail_visits: (profile.jail_visits || 0) + 1 });
        }
      }
    } else {
      // Landing triggers in SP
      const landingField = levels[currentPos].type;
      if (landingField === 'jail') {
        playSFX('jail');
        setSinglePlayerStats(prev => ({ ...prev, jailVisits: prev.jailVisits + 1 }));
      }
    }

    const landingField = levels[currentPos].type;
    if (landingField === 'switch' && !isSinglePlayer) {
      const newMode = gameMode === 'finance' ? 'sustainability' : 'finance';
      multiplayer.sendAction({ type: 'ACTION_THEME_SWITCH', mode: newMode });
    } else {
      setActiveModal(landingField);
      if (!isSinglePlayer) {
        multiplayer.sendAction({ type: 'ACTION_INTERACTION_START' });
      }
    }
  };

  const myProfile = isSinglePlayer ? {
    id: multiplayer.getMyId(),
    name: userName,
    avatar: userAvatar,
    capital: balance,
    position: currentLevelIndex,
    isHost: true,
    status: 'playing' as const,
    taxExemptTurns: 0,
    hasPaidTax: false,
    isInteracting: false,
    jailSkipped: false,
    stats: singlePlayerStats
  } : mpState?.players.find(p => p.id === multiplayer.getMyId());
  const currentBalance = isSinglePlayer ? balance : (myProfile?.capital || 0);

  // Sync singleplayer profile into multiplayer state (ONLY UI MOCK) for modals
  useEffect(() => {
    if (isSinglePlayer && myProfile) {
      multiplayer.state.players = [myProfile];
    }
  }, [isSinglePlayer, myProfile, singlePlayerStats]);

  useEffect(() => {
    if (currentBalance >= WINNING_BALANCE) {
      if (isSinglePlayer) {
        multiplayer.state.status = 'finished';
      }
      setGameState('victory');
      playSFX('victory');
      if (profile) {
        updateSupabaseProfile({
          wins: (profile.wins || 0) + 1
        });
      }
    }
  }, [currentBalance, isSinglePlayer]);

  if (isAuthLoading) {
    return (
      <div className="fixed inset-0 bg-slate-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  const gameMode = isSinglePlayer ? mode : (mpState?.mode || 'finance');

  return (
    <div className={`fixed inset-0 overflow-hidden transition-colors duration-1000 ${gameMode === 'finance' ? 'bg-slate-900 bg-finance-pattern' : 'bg-emerald-950 bg-eco-pattern'
      }`}>
      {/* Background Audio */}
      <audio
        ref={(el) => {
          audioRef.current = el;
          if (el) el.volume = volume;
        }}
        src={MUSIC_TRACKS[trackIndex]}
        autoPlay={true}
        preload="auto"
        onEnded={handleTrackEnd}
        onPlay={(e) => (e.currentTarget.volume = volume)}
        onCanPlay={(e) => (e.currentTarget.volume = volume)}
      >
        <source src={MUSIC_TRACKS[trackIndex]} type="audio/mpeg" />
      </audio>

      {/* Screen Routing */}
      {gameState === 'start' ? (
        <StartScreen
          onStart={handleStart}
          initialName={userName}
          initialAvatar={userAvatar}
          profileData={profile}
          onProfileUpdate={(newName, newAvatar) => {
            setUserName(newName);
            setUserAvatar(newAvatar as AvatarType);
            if (profile) {
              setProfile({ ...profile, username: newName, avatar_url: newAvatar });
            }
          }}
          language={language}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      ) : gameState === 'lobby' && mpState ? (
        <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center p-6 z-50">
          <div className="max-w-md w-full bg-white/5 p-8 rounded-[32px] border border-white/10 backdrop-blur-xl space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white tracking-tight">{t.lobby.waiting_for_players}</h2>
              <p className="text-blue-400 font-mono tracking-wider text-lg">{t.lobby.room_code}: <span className="text-white font-black">{mpState.roomId}</span></p>
              <p className="text-slate-500 text-xs">Share this code with your friends!</p>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">
                Connected Friends ({mpState.players.length}/6)
              </p>
              <div className="space-y-2">
                {mpState.players.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 animate-fade-in">
                    <div className="flex items-center gap-4">
                      <img
                        src={`/assets/${p.avatar}.png`}
                        alt=""
                        className="w-10 h-10 object-contain rounded-lg bg-white/5 p-1"
                      />
                      <span className="text-white font-medium">{p.name} {p.id === multiplayer.getMyId() && t.ui.you}</span>
                    </div>
                    {p.isHost && <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full font-bold uppercase tracking-tighter">Host</span>}
                  </div>
                ))}
                {mpState.players.length < 2 && (
                  <div className="p-4 border border-dashed border-white/10 rounded-2xl text-center">
                    <p className="text-slate-600 text-sm italic">{t.lobby.waiting_for_players}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleLeaveRoom}
                className="flex-1 py-4 rounded-2xl font-bold bg-white/5 text-slate-400 hover:bg-white/10 transition-all border border-white/10"
              >
                {t.ui.back_to_menu}
              </button>
              {mpState.players.find(p => p.id === multiplayer.getMyId())?.isHost && (
                <button
                  disabled={mpState.players.length < 2}
                  onClick={() => multiplayer.startGame()}
                  className={`flex-[2] py-4 rounded-2xl font-bold transition-all shadow-xl ${mpState.players.length < 2
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:scale-105 active:scale-95 shadow-blue-900/40'
                    }`}
                >
                  {t.lobby.start_game}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <Sidebar
            players={isSinglePlayer ? [myProfile as Player] : (mpState?.players || [])}
            currentTurnIndex={mpState?.currentTurnIndex || 0}
            myId={isSinglePlayer ? 'single' : multiplayer.getMyId()}
            levels={levels}
            showOnMobile={showMobileSidebar}
            language={language}
          />


          <GameMap
            levels={levels}
            currentLevel={currentLevelIndex}
            currentPlayer={myProfile as Player}
            mode={gameMode}
            balance={currentBalance}
            onRollDice={handleRollDice}
            jailed={myProfile?.status === 'jail'}
            diceValue={lastDiceRoll}
            isRolling={isRolling}
            isMoving={isMoving}
            animatingLevel={currentLevelIndex}
            taxExemptionTurns={isSinglePlayer ? 0 : (myProfile?.taxExemptTurns || 0)}
            isMyTurn={isSinglePlayer ? true : (mpState?.currentTurnIndex === mpState?.players.findIndex(p => p.id === multiplayer.getMyId()))}
            players={isSinglePlayer ? [myProfile as Player] : (mpState?.players || [])}
            currentTurnIndex={isSinglePlayer ? 0 : (mpState?.currentTurnIndex || 0)}
            language={language}
          />

          <GameModal
            activeField={activeModal}
            onClose={() => {
              setActiveModal(null);
              if (!isSinglePlayer) {
                multiplayer.sendAction({ type: 'ACTION_INTERACTION_END' });
              }
            }}
            balance={currentBalance}
            levelIndex={currentLevelIndex}
            mode={gameMode}
            levels={levels}
            players={isSinglePlayer ? [myProfile as Player] : (mpState?.players || [])}
            isSinglePlayer={isSinglePlayer}
            onBalanceChange={(change, metadata) => {
              if (change > 0 && profile) {
                updateSupabaseProfile({ total_capital: (profile.total_capital || 0) + change });
              }

              // SFX based on change and context
              if (activeModal === 'quiz') {
                playSFX(change > 0 ? 'correct' : 'incorrect');
              } else if (activeModal === 'investment') {
                playSFX(change > 0 ? 'win' : change < 0 ? 'loss' : 'click');
              } else if (change > 0) {
                playSFX('win');
              } else if (change < 0) {
                playSFX('loss');
              }

              if (isSinglePlayer) {
                setBalance(prev => prev + change);
                if (activeModal === 'quiz') {
                  if (change > 0) setSinglePlayerStats(prev => ({ ...prev, correctQuizzes: prev.correctQuizzes + 1 }));
                  else setSinglePlayerStats(prev => ({ ...prev, wrongQuizzes: prev.wrongQuizzes + 1 }));
                } else if (activeModal === 'investment') {
                  if (change > 0) setSinglePlayerStats(prev => ({ ...prev, investmentGains: prev.investmentGains + change }));
                  else if (change < 0) setSinglePlayerStats(prev => ({ ...prev, investmentLosses: prev.investmentLosses + Math.abs(change) }));
                } else if (activeModal === 'tax_small') {
                  setSinglePlayerStats(prev => ({ ...prev, taxesPaid: prev.taxesPaid + 1 }));
                }
              } else {
                // Multiplayer Stats Tracking
                if (profile) {
                  if (activeModal === 'quiz') {
                    if (change > 0) updateSupabaseProfile({ correct_quizzes: (profile.correct_quizzes || 0) + 1 });
                    else updateSupabaseProfile({ wrong_quizzes: (profile.wrong_quizzes || 0) + 1 });
                  } else if (activeModal === 'investment') {
                    if (change > 0) updateSupabaseProfile({ investment_gains: (profile.investment_gains || 0) + change });
                    else if (change < 0) updateSupabaseProfile({ investment_losses: (profile.investment_losses || 0) + Math.abs(change) });
                  }
                }

                if (activeModal === 'investment' && metadata?.type === 'investment') {
                  multiplayer.sendAction({
                    type: 'ACTION_INVEST',
                    result: metadata.multiplier || 1.0,
                    stake: metadata.stake || 0,
                    amount: change
                  });
                } else {
                  // Quiz or other reward/penalty
                  multiplayer.sendAction({
                    type: 'ACTION_QUIZ_RESULT',
                    reward: change > 0 ? change : 0,
                    penalty: change < 0 ? -change : 0,
                    success: change > 0
                  });
                }
              }
            }}

            onModeChange={(newMode) => {
              if (isSinglePlayer) {
                setMode(newMode);
              } else {
                multiplayer.sendAction({ type: 'ACTION_THEME_SWITCH', mode: newMode });
              }
            }}
            onTaxExemption={(turns) => {
              if (!isSinglePlayer) {
                multiplayer.sendAction({ type: 'ACTION_TAX_EXEMPT', turns });
              }
            }}
            onAuctionWin={() => {
              if (profile) {
                updateSupabaseProfile({ auction_wins: (profile.auction_wins || 0) + 1 });
              }
            }}
            language={language}
          />
        </>
      )}

      {/* Exemption Expiry Notification - Fixed Position to top-24 */}
      {showExpiry && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] animate-bounce">
          <div className="bg-rose-500 text-white px-6 py-3 rounded-2xl shadow-2xl border border-rose-400 flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-black text-sm uppercase tracking-wider leading-none">Tax Exemption Expired!</p>
              <p className="text-[10px] text-rose-100 font-bold opacity-80">You are now liable for taxes again.</p>
            </div>
          </div>
        </div>
      )}

      {showTurnModal && (
        <GameModal
          activeField="turn_announcement"
          onClose={handleCloseTurnModal}
          balance={0}
          levelIndex={0}
          mode={gameMode}
          levels={[]}
          players={[]}
          isSinglePlayer={false}
          onBalanceChange={() => { }}

          onModeChange={() => { }}
          onTaxExemption={() => { }}
          language={language}
        />
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        volume={volume}
        onVolumeChange={(v) => {
          setVolume(v);
          localStorage.setItem('eib_volume', v.toString());
        }}
        isPlaying={isMusicPlaying}
        onTogglePlay={toggleMusic}
        mode={gameMode}
        showMobileSidebar={showMobileSidebar}
        onToggleSidebar={setShowMobileSidebar}
        language={language}
        onLanguageChange={setLanguage}
        notificationSettings={notificationSettings}
        onNotificationSettingsChange={subscribeToPush}
        isInGame={gameState !== 'start'}
        onExitGame={handleExitGame}
      />

      {/* Floating Settings Button - Hidden on Start and Lobby screens */}
      {gameState !== 'start' && gameState !== 'lobby' && (
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="fixed top-6 right-6 z-[60] w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-xl flex items-center justify-center text-xl shadow-2xl transition-all active:scale-90"
          title="Settings"
        >
          ⚙️
        </button>
      )}

      {/* Invite Notification Popup */}
      {pendingInvite && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-slide-down w-[320px]">
          <div className="bg-slate-900/90 border border-indigo-500/30 backdrop-blur-2xl p-5 rounded-[24px] shadow-2xl shadow-indigo-500/20 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-2xl animate-pulse">
                🎮
              </div>
              <div>
                <h4 className="text-white font-black text-sm tracking-tight">{t.invites.title}</h4>
                <p className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest">
                  {t.invites.from} {pendingInvite.issuerName}
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              {t.invites.message}
            </p>

            <div className="flex gap-2">
              <button
                onClick={handleAcceptInvite}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-black text-[10px] uppercase tracking-widest py-3 rounded-xl transition-all shadow-lg active:scale-95"
              >
                {t.invites.join}
              </button>
              <button
                onClick={handleDeclineInvite}
                className="px-4 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-black text-[10px] uppercase tracking-widest py-3 rounded-xl transition-all border border-white/5 active:scale-95"
              >
                {t.invites.skip}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
