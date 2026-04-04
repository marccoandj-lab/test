import React from 'react';
import { translations } from '../i18n/translations';

interface EducationScreenProps {
  onBack: () => void;
  language: 'en' | 'sr';
}

export const EducationScreen: React.FC<EducationScreenProps> = ({ onBack, language }) => {
  const t = translations[language];
  const edu = t.education;

  const resources = [
    {
      title: edu.finance_title,
      desc: edu.finance_desc,
      icon: '💰',
      link: language === 'en' 
        ? 'https://www.oecd.org/en/topics/financial-education.html' 
        : 'https://www.nbs.rs/sr/finansijska_edukacija/index.html',
      color: 'from-blue-500/20 to-indigo-500/20'
    },
    {
      title: edu.circular_title,
      desc: edu.circular_desc,
      icon: '♻️',
      link: 'https://www.ellenmacarthurfoundation.org/topics/circular-economy-introduction/overview',
      color: 'from-emerald-500/20 to-teal-500/20'
    },
    {
      title: edu.sustainability_title,
      desc: edu.sustainability_desc,
      icon: '🌍',
      link: 'https://sdgs.un.org/goals',
      color: 'from-green-500/20 to-emerald-500/20'
    }
  ];

  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center p-6 z-50 overflow-hidden">
      <div className="max-w-md w-full space-y-6 bg-white/5 p-8 rounded-[32px] border border-white/10 backdrop-blur-xl h-[90vh] flex flex-col shadow-2xl overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between mb-2 shrink-0">
          <button
            onClick={onBack}
            className="text-slate-500 hover:text-white transition-colors text-sm flex items-center gap-2"
          >
            ← {t.ui.back_to_menu}
          </button>
          <div className="flex gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{edu.title}</span>
          </div>
        </div>

        <div className="text-center space-y-1 shrink-0">
          <h2 className="text-2xl font-black text-white italic tracking-tight">{edu.title}</h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{edu.subtitle}</p>
        </div>

        {/* AI Assistant Card */}
        <div className="bg-gradient-to-br from-indigo-600/20 to-blue-600/20 border border-indigo-500/30 p-6 rounded-[2rem] relative overflow-hidden group shrink-0 shadow-xl">
          <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-all" />
          <div className="relative z-10 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🤖</span>
              <h3 className="text-white font-black text-lg tracking-tight">{edu.ai_assistant}</h3>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed font-medium">
              {edu.ai_desc}
            </p>
            <a
              href="https://economy-switch-ai-o3u6.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-3 rounded-xl transition-all active:scale-95 text-center text-xs uppercase tracking-widest shadow-lg shadow-indigo-900/40"
            >
              {edu.ask_ai}
            </a>
          </div>
        </div>

        {/* Grid of Resources */}
        <div className="grid grid-cols-1 gap-4">
          {resources.map((res, i) => (
            <div 
              key={i}
              className={`bg-gradient-to-br ${res.color} border border-white/5 p-5 rounded-3xl hover:border-white/20 transition-all group`}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl bg-white/5 w-12 h-12 flex items-center justify-center rounded-2xl border border-white/5 shadow-inner">
                  {res.icon}
                </span>
                <div className="flex-1 space-y-1">
                  <h4 className="text-white font-black text-sm uppercase tracking-tight">{res.title}</h4>
                  <p className="text-slate-400 text-[10px] leading-relaxed font-bold">
                    {res.desc}
                  </p>
                  <a
                    href={res.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-blue-400 hover:text-blue-300 text-[9px] font-black uppercase tracking-widest transition-colors group-hover:translate-x-1 duration-300"
                  >
                    {edu.open_resource}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-white/10 text-center shrink-0">
          <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.2em]">
            Empowering the next generation of economists
          </p>
        </div>
      </div>
    </div>
  );
};
