import React, { useEffect, useState } from 'react';
import { useQuizGame, PHASE_TIME } from '../../hooks/useQuizGame';
import { AnimatedBackground } from './AnimatedBackground';
import { QuestionCard } from './QuestionCard';
import { CooldownOverlay } from './CooldownOverlay';
import { PhaseTransitionModal } from './PhaseTransitionModal';
import { QuizSummaryScreen } from './QuizSummaryScreen';
import { Language } from '../../i18n/translations';
import { AnimatePresence } from 'framer-motion';

interface QuizGameProps {
  userId: string | undefined;
  language: Language;
  onClose: () => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({ userId, language, onClose }) => {
  const { state, initGame, handleAnswer, completeQuiz, calculateSRP } = useQuizGame(userId);
  const [showTransition, setShowTransition] = useState<'swot' | 'phase2' | null>(null);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Handle phase transitions visibility
  useEffect(() => {
    if (state.phase === 'swot' && state.currentIndex === 0) {
      setShowTransition('swot');
    } else if (state.phase === 'phase2' && state.currentIndex === 0) {
      setShowTransition('phase2');
    } else {
      setShowTransition(null);
    }
  }, [state.phase, state.currentIndex]);

  // Handle completion
  useEffect(() => {
    if (state.phase === 'summary') {
      completeQuiz();
    }
  }, [state.phase, completeQuiz]);

  if (state.isLoading) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex items-center justify-center z-[200]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentQuestion = state.phase === 'phase1' 
    ? state.questions[state.currentIndex] 
    : state.phase === 'phase2' 
    ? state.questions[state.currentIndex + 8] 
    : undefined;

  const currentSwot = state.phase === 'swot' ? state.swotQuestions[state.currentIndex] : undefined;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black overflow-hidden select-none">
      <AnimatedBackground theme={state.currentTheme} />

      <AnimatePresence>
        {state.phase === 'cooldown' && (
          <CooldownOverlay theme={state.startingTheme} language={language} />
        )}

        {(state.phase === 'phase1' || state.phase === 'phase2' || state.phase === 'swot') && !showTransition && (
          <QuestionCard
            key={`${state.phase}-${state.currentIndex}`}
            question={currentQuestion}
            swot={currentSwot}
            onAnswer={handleAnswer}
            language={language}
            timeLeft={state.timeLeft}
            totalTime={PHASE_TIME}
            currentCapital={state.capital}
            currentIndex={state.phase === 'phase1' ? state.currentIndex : state.phase === 'phase2' ? state.currentIndex + 12 : state.currentIndex + 8}
            totalQuestions={20}
          />
        )}

        {showTransition && (
          <PhaseTransitionModal
            phase={showTransition}
            language={language}
            onNext={() => setShowTransition(null)}
          />
        )}

        {state.phase === 'summary' && (
          <QuizSummaryScreen
            capital={state.capital}
            srp={calculateSRP(state.capital)}
            correctCount={state.correctCount}
            wrongCount={state.wrongCount}
            language={language}
            onClose={onClose}
          />
        )}
      </AnimatePresence>

      {/* Exit Button - only visible in summary or if something goes wrong, but usually we want to lock them in */}
      {state.phase === 'summary' && (
        <button 
          onClick={onClose}
          className="fixed top-6 right-6 p-4 text-white/40 hover:text-white transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  );
};
