import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { translations, Language } from '../i18n/translations';

interface AuthProps {
  language?: Language;
}

export const Auth: React.FC<AuthProps> = ({ language = 'en' }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [viewState, setViewState] = useState<'form' | 'verification'>('form');
  const [resendTimer, setResendTimer] = useState(0);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const t = translations[language];

  // Resend cooldown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (activeTab === 'signup') {
        if (password !== confirmPassword) {
          setMessage({ type: 'error', text: t.auth.errors.passwords_dont_match });
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
          }
        });
        if (error) throw error;
        setViewState('verification');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (error: any) {
      let errorText = error.error_description || error.message;
      if (error.message?.includes('rate limit')) errorText = t.auth.errors.rate_limit;
      setMessage({ type: 'error', text: errorText });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0 || !email) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: window.location.origin,
        }
      });
      if (error) throw error;
      setResendTimer(60);
      setMessage({ type: 'success', text: t.auth.verification_sent });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        }
      });
      if (error) throw error;
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    }
  };


  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center p-6 z-50 overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-1000">
        <motion.div 
          animate={{
            x: activeTab === 'login' ? '10%' : '-10%',
            backgroundColor: activeTab === 'login' ? '#3b82f6' : '#10b981'
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{
            x: activeTab === 'login' ? '-10%' : '10%',
            backgroundColor: activeTab === 'login' ? '#10b981' : '#3b82f6'
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px]" 
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative z-10 max-w-sm w-full bg-slate-900/40 p-1 rounded-[40px] border transition-all duration-500 shadow-2xl backdrop-blur-2xl ${
          activeTab === 'login' ? 'border-blue-500/30 shadow-blue-500/10' : 'border-emerald-500/30 shadow-emerald-500/10'
        }`}
      >
        <div className="bg-slate-900/80 p-8 rounded-[38px] space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black tracking-tighter text-white italic drop-shadow-2xl">
              <span className="text-blue-500">Economy</span>
              <span className="text-emerald-500">Switch</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
              {viewState === 'form' ? (activeTab === 'login' ? t.auth.welcome_back : t.auth.create_account) : t.auth.verification_sent}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {viewState === 'form' ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                {/* Tab Switcher */}
                <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5 relative overflow-hidden">
                  <motion.div
                    animate={{ x: activeTab === 'login' ? 0 : '100%' }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-xl shadow-lg ${
                      activeTab === 'login' ? 'bg-blue-600' : 'bg-emerald-600'
                    }`}
                  />
                  <button
                    onClick={() => { setActiveTab('login'); setMessage(null); }}
                    className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest relative z-10 transition-colors ${
                      activeTab === 'login' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {t.auth.login}
                  </button>
                  <button
                    onClick={() => { setActiveTab('signup'); setMessage(null); }}
                    className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest relative z-10 transition-colors ${
                      activeTab === 'signup' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {t.auth.signup}
                  </button>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-slate-500 text-[10px] uppercase font-black tracking-widest px-2">
                      {t.auth.email}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-500 text-[10px] uppercase font-black tracking-widest px-2">
                      {t.auth.password}
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                      required
                    />
                  </div>

                  <AnimatePresence>
                    {activeTab === 'signup' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-1 overflow-hidden"
                      >
                        <label className="text-slate-500 text-[10px] uppercase font-black tracking-widest px-2">
                          {t.auth.confirm_password}
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm"
                          required
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {message && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`text-[11px] font-bold p-4 rounded-2xl border ${
                        message.type === 'success' 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                          : 'bg-red-500/10 border-red-500/20 text-red-400'
                      }`}
                    >
                      {message.text}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full text-white font-black py-5 rounded-[20px] shadow-2xl transition-all active:scale-95 disabled:opacity-50 text-xs tracking-widest uppercase ${
                      activeTab === 'login' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-900/40 hover:shadow-blue-500/20' 
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-emerald-900/40 hover:shadow-emerald-500/20'
                    }`}
                  >
                    {loading ? t.auth.processing : (activeTab === 'login' ? t.auth.login : t.auth.signup)}
                  </button>
                </form>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/5"></div>
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-black tracking-tighter">
                    <span className="bg-slate-900/80 px-4 text-slate-600 backdrop-blur-sm">Or continue with</span>
                  </div>
                </div>

                <button
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest py-4 rounded-2xl transition-all active:scale-95"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="verification"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center space-y-6 py-4"
              >
                <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl flex items-center justify-center mx-auto text-4xl animate-bounce">
                  📧
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-xl font-black text-white">{t.auth.check_inbox}</h2>
                  <p className="text-slate-400 text-xs px-4">
                    {t.auth.email_sent_to} <span className="text-emerald-400 font-bold">{email}</span>. {t.auth.check_inbox}.
                  </p>
                </div>

                <div className="pt-4 space-y-3">
                  <button
                    onClick={handleResend}
                    disabled={loading || resendTimer > 0}
                    className="w-full bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/20 text-emerald-400 font-black text-[10px] uppercase tracking-widest py-4 rounded-2xl transition-all disabled:opacity-50"
                  >
                    {resendTimer > 0 
                      ? t.auth.resend_cooldown.replace('{seconds}', resendTimer.toString()) 
                      : t.auth.resend_email
                    }
                  </button>
                  <button
                    onClick={() => { setViewState('form'); setActiveTab('login'); setMessage(null); }}
                    className="text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
                  >
                    {t.auth.back_to_login}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
