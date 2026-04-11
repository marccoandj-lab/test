import React, { useState } from 'react';
import { translations, Language } from '../i18n/translations';

interface LegalScreenProps {
  onBack: () => void;
  language: Language;
  initialSection?: 'terms' | 'privacy' | 'refund';
}

export const LegalScreen: React.FC<LegalScreenProps> = ({ 
  onBack, 
  language, 
  initialSection = 'terms' 
}) => {
  const t = translations[language];
  const [activeSection, setActiveSection] = useState<'terms' | 'privacy' | 'refund'>(initialSection);

  const sections = [
    { id: 'terms' as const, label: t.legal.terms, icon: '📜' },
    { id: 'privacy' as const, label: t.legal.privacy, icon: '🔒' },
    { id: 'refund' as const, label: t.legal.refund, icon: '💰' },
  ];

  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center p-6 z-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-2xl w-full flex flex-col bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-2xl shadow-2xl h-[85vh]">
        {/* Header */}
        <div className="p-8 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black italic text-white tracking-tight uppercase">
              {t.legal.title}
            </h2>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">
              {t.legal.last_updated}
            </p>
          </div>
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white transition-all active:scale-90"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-8 pt-6 flex gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${
                activeSection === section.id
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{section.icon}</span>
              <span className="hidden sm:inline">{section.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="max-w-prose mx-auto space-y-8 animate-fade-in" key={activeSection}>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-base">
                  {sections.find(s => s.id === activeSection)?.icon}
                </span>
                {sections.find(s => s.id === activeSection)?.label}
              </h3>
              
              <div className="max-w-none space-y-6">
                {activeSection === 'terms' && (
                  <div className="space-y-6 text-slate-300 leading-relaxed">
                    <p className="text-white font-medium italic opacity-90">
                      {t.legal.sections.terms.intro}
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-blue-400 font-bold uppercase text-[10px] tracking-[0.2em]">{t.legal.sections.terms.h1}</h4>
                      <p className="text-sm">{t.legal.sections.terms.subscription}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-blue-400 font-bold uppercase text-[10px] tracking-[0.2em]">{t.legal.sections.terms.h2}</h4>
                      <p className="text-sm">{t.legal.sections.terms.usage}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-blue-400 font-bold uppercase text-[10px] tracking-[0.2em]">{t.legal.sections.terms.h3}</h4>
                      <p className="text-sm">{t.legal.sections.terms.multiplayer}</p>
                    </div>
                  </div>
                )}

                {activeSection === 'privacy' && (
                  <div className="space-y-6 text-slate-300 leading-relaxed">
                    <div className="space-y-2">
                      <h4 className="text-emerald-400 font-bold uppercase text-[10px] tracking-[0.2em]">{t.legal.sections.privacy.h1}</h4>
                      <p className="text-sm">{t.legal.sections.privacy.data_collection}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-emerald-400 font-bold uppercase text-[10px] tracking-[0.2em]">{t.legal.sections.privacy.h2}</h4>
                      <p className="text-sm">{t.legal.sections.privacy.payment_data}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-emerald-400 font-bold uppercase text-[10px] tracking-[0.2em]">{t.legal.sections.privacy.h3}</h4>
                      <p className="text-sm">{t.legal.sections.privacy.notifications}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-emerald-400 font-bold uppercase text-[10px] tracking-[0.2em]">{t.legal.sections.privacy.h4}</h4>
                      <p className="text-sm">{t.legal.sections.privacy.sharing}</p>
                    </div>
                  </div>
                )}

                {activeSection === 'refund' && (
                  <div className="space-y-6 text-slate-300 leading-relaxed">
                    <div className="space-y-2">
                      <h4 className="text-amber-400 font-bold uppercase text-[10px] tracking-[0.2em]">{t.legal.sections.refund.h1}</h4>
                      <p className="text-sm">{t.legal.sections.refund.policy}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-amber-400 font-bold uppercase text-[10px] tracking-[0.2em]">{t.legal.sections.refund.h2}</h4>
                      <p className="text-sm">{t.legal.sections.refund.exceptions}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-amber-400 font-bold uppercase text-[10px] tracking-[0.2em]">{t.legal.sections.refund.h3}</h4>
                      <p className="text-sm">{t.legal.sections.refund.process}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-8 border-t border-white/5">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">{t.legal.need_help}</p>
                <p className="text-white text-sm font-medium">{t.legal.contact_support}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-8 border-t border-white/10">
          <button
            onClick={onBack}
            className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl border border-white/10 transition-all active:scale-95"
          >
            ← {t.ui.back_to_menu}
          </button>
        </div>
      </div>
    </div>
  );
};
