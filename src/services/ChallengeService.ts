import { ChallengeType, DailyChallenge } from '../types/game';
import { supabase } from '../lib/supabase';

export const RANK_THRESHOLDS = [
  { name: 'Novice', minSrp: 0 },
  { name: 'Apprentice', minSrp: 500 },
  { name: 'Professional', minSrp: 1200 },
  { name: 'Expert', minSrp: 2500 },
  { name: 'Strategist', minSrp: 5000 },
  { name: 'Visionary', minSrp: 10000 },
  { name: 'Economy Legend', minSrp: 25000 },
];

export const CHALLENGE_TEMPLATES = [
  { type: 'QUIZ_MASTER' as ChallengeType, label: 'Answer quizzes correctly', targets: [3, 5, 10], rewards: [30, 60, 100] },
  { type: 'CAPITAL_COLLECTOR' as ChallengeType, label: 'Collect capital', targets: [50000, 150000, 500000], rewards: [30, 60, 100] },
  { type: 'AUCTION_WINNER' as ChallengeType, label: 'Win auctions', targets: [1, 2, 3], rewards: [30, 60, 100] },
  { type: 'JAIL_ESCAPIST' as ChallengeType, label: 'Skip jail', targets: [1, 2, 4], rewards: [30, 60, 100] },
  { type: 'INVESTMENT_GENIUS' as ChallengeType, label: 'Gain capital from investments', targets: [20000, 100000, 300000], rewards: [30, 60, 100] },
  { type: 'VALUE_CHAIN_EXPERT' as ChallengeType, label: 'Solve value chains', targets: [2, 4, 8], rewards: [30, 60, 100] },
  { type: 'INTRUDER_FINDER' as ChallengeType, label: 'Find intruders', targets: [2, 4, 8], rewards: [30, 60, 100] }
];

export class ChallengeService {
  static getRankForSrp(srp: number): string {
    for (let i = RANK_THRESHOLDS.length - 1; i >= 0; i--) {
      if (srp >= RANK_THRESHOLDS[i].minSrp) {
        return RANK_THRESHOLDS[i].name;
      }
    }
    return 'Novice';
  }

  static getNextRank(srp: number) {
    const currentRankIdx = RANK_THRESHOLDS.findIndex(r => r.name === this.getRankForSrp(srp));
    if (currentRankIdx < RANK_THRESHOLDS.length - 1) {
      return RANK_THRESHOLDS[currentRankIdx + 1];
    }
    return null;
  }

  static generateDailyChallenges(): DailyChallenge[] {
    const shuffled = [...CHALLENGE_TEMPLATES].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    
    return selected.map((template, idx) => {
      // Pick a random difficulty (0: Easy, 1: Medium, 2: Hard)
      const difficulty = Math.floor(Math.random() * 3);
      return {
        id: `challenge_${Date.now()}_${idx}`,
        type: template.type,
        label: template.label,
        target: template.targets[difficulty],
        current: 0,
        reward: template.rewards[difficulty],
        claimed: false
      };
    });
  }

  static async checkAndResetChallenges(userId: string, currentChallenges: any[], lastReset: string) {
    const now = new Date();
    const lastResetDate = new Date(lastReset);
    
    // Check if it's 10 AM or later
    const resetHour = 10;
    
    // A reset is needed if:
    // 1. The last reset was on a previous day and it's now past 10 AM today
    // 2. The last reset was today BEFORE 10 AM, and it's now past 10 AM
    
    const isToday = now.toDateString() === lastResetDate.toDateString();
    const isPastResetTime = now.getHours() >= resetHour;
    
    let needsReset = false;
    if (!isToday && isPastResetTime) {
      needsReset = true;
    } else if (isToday && lastResetDate.getHours() < resetHour && isPastResetTime) {
      needsReset = true;
    } else if (!isToday && !isPastResetTime && (now.getTime() - lastResetDate.getTime()) > 24 * 60 * 60 * 1000) {
      // It's a new day, but before 10 AM. We should still reset if the last reset was more than 24h ago
      needsReset = true;
    }

    if (needsReset || !currentChallenges || currentChallenges.length === 0) {
      const newChallenges = this.generateDailyChallenges();
      const { data, error } = await supabase
        .from('profiles')
        .update({
          daily_challenges: newChallenges,
          last_challenge_reset: now.toISOString()
        })
        .eq('id', userId)
        .select()
        .single();
      
      if (error) {
        console.error("Error resetting challenges:", error);
        return null;
      }
      return data;
    }
    return null;
  }

  static async updateProgress(userId: string, challenges: DailyChallenge[], type: ChallengeType, amount: number) {
    const challengeIdx = challenges.findIndex(c => c.type === type && !c.claimed && c.current < c.target);
    if (challengeIdx === -1) return null;

    const challenge = challenges[challengeIdx];
    const newCurrent = Math.min(challenge.target, challenge.current + amount);
    
    if (newCurrent === challenge.current) return null;

    const { error } = await supabase.rpc('update_challenge_progress', {
      user_id: userId,
      challenge_idx: challengeIdx,
      progress_increment: amount
    });

    if (error) {
      console.error("Error updating challenge progress:", error);
      return null;
    }

    const updatedChallenges = [...challenges];
    updatedChallenges[challengeIdx] = { ...challenge, current: newCurrent };
    return updatedChallenges;
  }

  static async claimReward(userId: string, challenges: DailyChallenge[], challengeIdx: number) {
    const challenge = challenges[challengeIdx];
    if (challenge.claimed || challenge.current < challenge.target) return null;

    const { error } = await supabase.rpc('claim_challenge_reward', {
      user_id: userId,
      challenge_idx: challengeIdx,
      srp_reward: challenge.reward
    });

    if (error) {
      console.error("Error claiming challenge reward:", error);
      return null;
    }

    const updatedChallenges = [...challenges];
    updatedChallenges[challengeIdx] = { ...challenge, claimed: true };
    return updatedChallenges;
  }
}
