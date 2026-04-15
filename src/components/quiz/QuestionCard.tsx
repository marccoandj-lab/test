import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RankedQuestion, SwotScenario } from '../../data/rankedQuestions';
import { Language } from '../../i18n/translations';
import { formatNumber } from '../../utils/format';

interface QuestionCardProps {
  question?: RankedQuestion;
  swot?: SwotScenario;
  onAnswer: (isCorrect: boolean) => void;
  language: Language;
  timeLeft: number;
  totalTime: number;
  currentCapital: number;
  currentIndex: number;
  totalQuestions: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  swot,
  onAnswer,
  language,
  timeLeft,
  totalTime,
  currentCapital,
  currentIndex,
  totalQuestions,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    
    const isCorrect = question ? index === question.correct : true; // SWOT is always correct for now as per logic
    
    // Play SFX
    if (window.playSFX) {
      window.playSFX(isCorrect ? 'correct' : 'incorrect');
    }

    setTimeout(() => {
      onAnswer(isCorrect);
      setSelectedOption(null);
      setIsAnswered(false);
    }, 1000);
  };

  const handleSwotSelect = (category: 'S' | 'W' | 'O' | 'T') => {
    if (isAnswered) return;
    setIsAnswered(true);
    
    const isCorrect = swot ? category === swot.category : true;
    
    if (window.playSFX) {
      window.playSFX(isCorrect ? 'correct' : 'incorrect');
    }

    setTimeout(() => {
      onAnswer(isCorrect);
      setIsAnswered(false);
    }, 1000);
  };

  const progress = (timeLeft / totalTime) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl px-4 z-10"
    >
      {/* Stats Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl">
          <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-0.5">Current Capital</p>
          <p className="text-xl font-black text-emerald-400">{formatNumber(currentCapital)} SC</p>
        </div>
        
        <div className="relative w-16 h-16">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="4"
              className="text-white/5"
            />
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray={175.93}
              animate={{ strokeDashoffset: 175.93 * (1 - progress / 100) }}
              className={timeLeft < 5 ? "text-rose-500" : "text-blue-500"}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-black text-lg text-white">
            {timeLeft}
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl text-right">
          <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-0.5">Progress</p>
          <p className="text-xl font-black text-white">{currentIndex + 1} / {totalQuestions}</p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
          <motion.div 
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={question?.id || swot?.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                swot ? 'bg-indigo-500/20 text-indigo-400' : 
                question?.difficulty === 'easy' ? 'bg-emerald-500/20 text-emerald-400' :
                question?.difficulty === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                'bg-rose-500/20 text-rose-400'
              }`}>
                {swot ? 'SWOT ANALYSIS' : question?.difficulty}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                {swot ? swot.scenario[language] : question?.question[language]}
              </h2>
            </div>

            <div className="grid gap-4">
              {swot ? (
                <div className="grid grid-cols-2 gap-4">
                  {(['S', 'W', 'O', 'T'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleSwotSelect(cat)}
                      disabled={isAnswered}
                      className={`p-6 rounded-2xl border-2 transition-all font-black text-2xl flex flex-col items-center gap-2 ${
                        isAnswered && cat === swot.category
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                          : isAnswered
                          ? 'bg-white/5 border-white/5 opacity-50 grayscale'
                          : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20 text-white'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="text-[10px] uppercase tracking-widest opacity-60">
                        {cat === 'S' ? 'Strength' : cat === 'W' ? 'Weakness' : cat === 'O' ? 'Opportunity' : 'Threat'}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                question?.options[language].map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={isAnswered}
                    className={`w-full p-5 rounded-2xl border-2 text-left transition-all relative overflow-hidden group ${
                      isAnswered && idx === question.correct
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : isAnswered && selectedOption === idx
                        ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                        : isAnswered
                        ? 'bg-white/5 border-white/5 opacity-50'
                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm border-2 ${
                        isAnswered && idx === question.correct ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-white/10'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-lg font-medium">{option}</span>
                    </div>
                    {isAnswered && idx === question.correct && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl"
                      >
                        ✅
                      </motion.div>
                    )}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
