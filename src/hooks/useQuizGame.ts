import { useState, useEffect, useCallback } from 'react';
import { RankedQuestion, SwotScenario, rankedLinearQuizzes, rankedCircularQuizzes, swotScenarios, RANKED_REWARDS, SWOT_PENALTY } from '../data/rankedQuestions';
import { supabase } from '../lib/supabase';

export type QuizPhase = 'cooldown' | 'phase1' | 'swot' | 'phase2' | 'summary';
export type QuizTheme = 'linear' | 'circular';

interface QuizState {
  phase: QuizPhase;
  startingTheme: QuizTheme;
  currentTheme: QuizTheme | 'swot';
  questions: RankedQuestion[];
  swotQuestions: SwotScenario[];
  currentIndex: number;
  capital: number;
  correctCount: number;
  wrongCount: number;
  attemptsUsed: number;
  lastAttemptDate: string;
  isLoading: boolean;
  timeLeft: number;
}

const QUESTIONS_PER_PHASE = 8;
const SWOT_QUESTIONS = 4;
const PHASE_TIME = 15; // seconds per question

export const useQuizGame = (userId: string | undefined) => {
  const [state, setState] = useState<QuizState>({
    phase: 'cooldown',
    startingTheme: 'linear',
    currentTheme: 'linear',
    questions: [],
    swotQuestions: [],
    currentIndex: 0,
    capital: 0,
    correctCount: 0,
    wrongCount: 0,
    attemptsUsed: 0,
    lastAttemptDate: '',
    isLoading: true,
    timeLeft: PHASE_TIME,
  });

  // Shuffle helper
  const shuffle = <T,>(array: T[]): T[] => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const fetchAttempts = useCallback(async () => {
    if (!userId) return;
    
    const now = new Date();
    const today = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    
    try {
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('attempts_used, attempt_date')
        .eq('user_id', userId)
        .eq('attempt_date', today)
        .maybeSingle();

      if (error) throw error;

      setState(prev => ({
        ...prev,
        attemptsUsed: data?.attempts_used || 0,
        lastAttemptDate: data?.attempt_date || today,
        isLoading: false
      }));
    } catch (err) {
      console.error('Error fetching quiz attempts:', err);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [userId]);

  useEffect(() => {
    fetchAttempts();
  }, [fetchAttempts]);

  const initGame = useCallback(() => {
    const startTheme: QuizTheme = Math.random() > 0.5 ? 'linear' : 'circular';
    const oppositeTheme: QuizTheme = startTheme === 'linear' ? 'circular' : 'linear';

    const p1Pool = startTheme === 'linear' ? rankedLinearQuizzes : rankedCircularQuizzes;
    const p2Pool = oppositeTheme === 'linear' ? rankedLinearQuizzes : rankedCircularQuizzes;

    const p1Questions = shuffle(p1Pool).slice(0, QUESTIONS_PER_PHASE);
    const p2Questions = shuffle(p2Pool).slice(0, QUESTIONS_PER_PHASE);
    const swotPool = shuffle(swotScenarios).slice(0, SWOT_QUESTIONS);

    setState(prev => ({
      ...prev,
      phase: 'cooldown',
      startingTheme: startTheme,
      currentTheme: startTheme,
      questions: [...p1Questions, ...p2Questions],
      swotQuestions: swotPool,
      currentIndex: 0,
      capital: 0,
      correctCount: 0,
      wrongCount: 0,
      timeLeft: PHASE_TIME,
    }));

    // Start cooldown
    setTimeout(() => {
      setState(prev => ({ ...prev, phase: 'phase1' }));
    }, 3000);
  }, []);

  const nextQuestion = useCallback(() => {
    setState(prev => {
      const isPhase1End = prev.phase === 'phase1' && prev.currentIndex === QUESTIONS_PER_PHASE - 1;
      const isSwotEnd = prev.phase === 'swot' && prev.currentIndex === SWOT_QUESTIONS - 1;
      const isPhase2End = prev.phase === 'phase2' && prev.currentIndex === QUESTIONS_PER_PHASE - 1;

      if (isPhase1End) {
        return { ...prev, phase: 'swot', currentIndex: 0, currentTheme: 'swot', timeLeft: PHASE_TIME };
      }
      if (isSwotEnd) {
        const oppositeTheme = prev.startingTheme === 'linear' ? 'circular' : 'linear';
        return { ...prev, phase: 'phase2', currentIndex: 0, currentTheme: oppositeTheme, timeLeft: PHASE_TIME };
      }
      if (isPhase2End) {
        return { ...prev, phase: 'summary' };
      }

      return { ...prev, currentIndex: prev.currentIndex + 1, timeLeft: PHASE_TIME };
    });
  }, []);

  const handleAnswer = useCallback((isCorrect: boolean) => {
    setState(prev => {
      let reward = 0;
      if (prev.phase === 'swot') {
        reward = isCorrect ? SWOT_PENALTY : -SWOT_PENALTY;
      } else {
        const q = prev.questions[prev.phase === 'phase1' ? prev.currentIndex : prev.currentIndex + QUESTIONS_PER_PHASE];
        const rewards = RANKED_REWARDS[q.difficulty];
        reward = isCorrect ? rewards.reward : -rewards.penalty;
      }

      return {
        ...prev,
        capital: Math.max(0, prev.capital + reward),
        correctCount: prev.correctCount + (isCorrect ? 1 : 0),
        wrongCount: prev.wrongCount + (isCorrect ? 0 : 1),
      };
    });
    nextQuestion();
  }, [nextQuestion]);

  // Timer effect
  useEffect(() => {
    if (state.phase === 'summary' || state.phase === 'cooldown' || state.isLoading) return;

    const timer = setInterval(() => {
      setState(prev => {
        if (prev.timeLeft <= 1) {
          // Time out is treated as wrong answer
          setTimeout(() => handleAnswer(false), 0);
          return { ...prev, timeLeft: PHASE_TIME };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.phase, state.isLoading, handleAnswer]);

  const calculateSRP = (capital: number): number => {
    if (capital < 0) return 0;
    if (capital < 200000) return 10;
    if (capital < 500000) return 25;
    if (capital < 850000) return 50;
    return 100;
  };

  const completeQuiz = useCallback(async () => {
    if (!userId) return;
    const srp = calculateSRP(state.capital);
    
    const now = new Date();
    const today = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;

    try {
      const { error } = await supabase.rpc('record_quiz_completion', {
        p_user_id: userId,
        p_date: today,
        p_srp_earned: srp
      });

      if (error) throw error;
      await fetchAttempts(); // Refresh attempts
    } catch (err) {
      console.error('Error recording quiz completion:', err);
    }
  }, [userId, state.capital, fetchAttempts]);

  return {
    state,
    initGame,
    handleAnswer,
    completeQuiz,
    calculateSRP
  };
};
