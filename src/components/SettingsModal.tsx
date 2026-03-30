import React from 'react';
import { GameMode } from '../data/gameData';
import { NotificationSettings } from '../types/game';
import { translations } from '../i18n/translations';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  mode: GameMode;
  showMobileSidebar: boolean;
  onToggleSidebar: (show: boolean) => void;
  language: 'en' | 'sr';
  onLanguageChange: (lang: 'en' | 'sr') => void;
  notificationSettings: NotificationSettings;
  onNotificationSettingsChange: (settings: NotificationSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  volume,
  onVolumeChange,
  isPlaying,
  onTogglePlay,
  mode,
  showMobileSidebar,
  onToggleSidebar,
  language,
  onLanguageChange,
  notificationSettings,
  onNotificationSettingsChange
}) => {
  if (!isOpen) return null;

  const t = translations[language].ui;
  const availableSlots = ["09:00", "13:00", "18:00", "21:00"];

  const toggleSlot = (slot: string) => {
    const newSlots = notificationSettings.slots.includes(slot)
      ? notificationSettings.slots.filter(s => s !== slot)
      : [...notificationSettings.slots, slot];
    onNotificationSettingsChange({ ...notificationSettings, slots: newSlots });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative w-full max-w-sm bg-slate-900 border-2 ${mode === 'finance' ? 'border-blue-500/30' : 'border-green-500/30'} rounded-[2.5rem] shadow-2xl overflow-y-auto max-h-[90vh] animate-modal-pop`}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">{t.game_center}</h2>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* Push Notifications Toggle */}
            <div className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center">
                <label className="text-white/60 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <span>🔔</span> {t.push_notifications}
                </label>
                <div 
                    onClick={() => onNotificationSettingsChange({ ...notificationSettings, enabled: !notificationSettings.enabled })}
                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${notificationSettings.enabled ? 'bg-blue-600' : 'bg-slate-700'}`}
                >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notificationSettings.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </div>
              <p className="text-[10px] text-white/30 italic">{t.notification_info}</p>
              
              {notificationSettings.enabled && (
                <div className="mt-4 space-y-3 pt-3 border-t border-white/5">
                  <p className="text-[10px] text-white/60 font-black uppercase tracking-widest">{t.notification_slots}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => toggleSlot(slot)}
                        className={`py-2 rounded-xl text-xs font-black transition-all ${notificationSettings.slots.includes(slot) ? 'bg-blue-600 text-white' : 'bg-slate-800 text-white/40'}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Music Control Row */}

            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                <button 
                    onClick={onTogglePlay}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all ${isPlaying ? 'bg-blue-600 shadow-lg shadow-blue-500/30' : 'bg-slate-800'}`}
                >
                    {isPlaying ? '⏸️' : '▶️'}
                </button>
                <div className="flex-1">
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-1">Background Music</p>
                    <p className="text-sm text-white font-bold">{isPlaying ? 'Playing Now' : 'Music Paused'}</p>
                </div>
            </div>

            {/* Volume Control */}
            <div className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center">
                <label className="text-white/60 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <span>🎵</span> Volume
                </label>
                <span className="text-white font-black text-sm">{Math.round(volume * 100)}%</span>
              </div>
              
              <div className="relative flex items-center group">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                  className={`w-full h-3 bg-white/5 rounded-full appearance-none cursor-pointer accent-white transition-all hover:bg-white/10`}
                  style={{
                    background: `linear-gradient(to right, ${mode === 'finance' ? '#3b82f6' : '#22c55e'} ${volume * 100}%, rgba(255,255,255,0.05) ${volume * 100}%)`
                  }}
                />
              </div>
            </div>

            {/* Mobile Sidebar Toggle - ONLY ON MOBILE */}
            <div className="lg:hidden space-y-3 bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center">
                <label className="text-white/60 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <span>👥</span> {language === 'en' ? 'Player Status Sidebar' : 'Bočna traka igrača'}
                </label>
                <div 
                    onClick={() => onToggleSidebar(!showMobileSidebar)}
                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${showMobileSidebar ? 'bg-blue-600' : 'bg-slate-700'}`}
                >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${showMobileSidebar ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </div>
              <p className="text-[10px] text-white/30 italic">{language === 'en' ? 'Toggle to show/hide player list during game.' : 'Uključi/isključi listu igrača tokom igre.'}</p>
            </div>

            {/* Language Selection */}
            <div className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                <label className="text-white/60 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <span>🌍</span> {language === 'en' ? 'Language' : 'Jezik'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <button 
                        onClick={() => onLanguageChange('en')}
                        className={`py-2 rounded-xl text-xs font-black transition-all ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-white/40'}`}
                    >
                        ENGLISH
                    </button>
                    <button 
                        onClick={() => onLanguageChange('sr')}
                        className={`py-2 rounded-xl text-xs font-black transition-all ${language === 'sr' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-white/40'}`}
                    >
                        SRPSKI
                    </button>
                </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`w-full mt-8 py-4 ${mode === 'finance' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-600 hover:bg-green-500'} text-white font-black rounded-2xl transition-all shadow-xl active:scale-95`}
          >
            {language === 'en' ? 'DONE' : 'GOTOVO'}
          </button>
        </div>
      </div>
    </div>
  );
};
