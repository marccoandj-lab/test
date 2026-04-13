import { GameMode, Level } from '../data/gameData';

export type GameType = 'single' | 'multi';
export type AvatarType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type SessionState = 'WAITING_FOR_PLAYERS' | 'READY_TO_START' | 'IN_GAME' | 'PAUSED' | 'ENDED';

export interface NotificationSettings {
  enabled: boolean;
  slots: string[];
}

export type ChallengeType = 'QUIZ_MASTER' | 'CAPITAL_COLLECTOR' | 'AUCTION_WINNER' | 'JAIL_ESCAPIST' | 'INVESTMENT_GENIUS' | 'VALUE_CHAIN_EXPERT' | 'INTRUDER_FINDER';

export interface DailyChallenge {
  id: string;
  type: ChallengeType;
  label: string;
  target: number;
  current: number;
  reward: number;
  claimed: boolean;
}

export interface Profile {
  id: string;
  username: string;
  display_id?: string;
  avatar_url: string;
  wins: number;
  games_played: number;
  total_capital: number;
  character_usage: Record<string, number>;
  correct_quizzes: number;
  wrong_quizzes: number;
  cost_analysis_correct: number;
  cost_analysis_wrong: number;
  value_chain_correct: number;
  value_chain_wrong: number;
  uljez_correct: number;
  uljez_wrong: number;
  investment_gains: number;
  investment_losses: number;
  jail_visits: number;
  jail_skips: number;
  auction_wins: number;
  taxes_paid: number;
  srp: number;
  rank: string;
  daily_challenges: DailyChallenge[];
  last_challenge_reset: string;
  notification_settings?: NotificationSettings;
}

export interface Player {
  id: string;
  name: string;
  avatar: AvatarType;
  capital: number;
  position: number;
  isHost: boolean;
  status: 'playing' | 'waiting' | 'jail';
  taxExemptTurns: number;
  hasPaidTax: boolean;
  isInteracting: boolean;
  jailSkipped: boolean;
  activeItemIndex?: number;
  rank?: string;
  srp?: number;
  stats: {
    correctQuizzes: number;
    wrongQuizzes: number;
    costAnalysisCorrect: number;
    costAnalysisWrong: number;
    valueChainCorrect: number;
    valueChainWrong: number;
    uljezCorrect: number;
    uljezWrong: number;

    investmentGains: number;
    investmentLosses: number;
    jailVisits: number;
    jailSkips: number;
    auctionWins: number;
    taxesPaid: number;
  };
}

export interface GameState {
  id: string;
  roomCode: string | null;
  gameType: GameType;
  players: Player[];
  currentPlayerIndex: number;
  turnTimer: number; // 60s limit
  interactionTimer: number; // 35s limit
  taxPool: number;
  mode: GameMode;
  sessionState: SessionState;
  levels?: Level[];
  auction?: {
    active: boolean;
    rolls: Record<string, number>;
  };
}
