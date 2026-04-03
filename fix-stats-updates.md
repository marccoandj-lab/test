# Plan - Fix Statistics and Real-time Updates

## Objective
Fix the issue where game statistics (wins, quizzes, investments, etc.) are not updating in the user's profile and leaderboard, specifically ensuring they work in both single-player and multiplayer modes and update immediately.

## Key Files
- `src/App.tsx`: Main game logic and Supabase update orchestration.
- `src/components/StartScreen.tsx`: Profile display and initial game state.
- `src/components/Leaderboard.tsx`: Display of global rankings.

## Implementation Steps

### 1. Update `src/App.tsx`
- **Unify Stat Updates**: Modify `onBalanceChange`, `animateMovement`, `onJailSkip`, `onAuctionWin`, and `onTaxPaid` to call `updateSupabaseProfile` for both single-player and multiplayer modes.
- **Lifetime Capital Tracking**: In `onBalanceChange`, add any positive balance changes to `total_capital` in the profile.
- **Immediate Sync**: Ensure `updateSupabaseProfile` is called immediately after an event occurs.
- **Fix Stat Mappings**: Ensure all statistics fields (e.g., `jail_skips`, `taxes_paid`) are correctly mapped to their Supabase column names.

### 2. Verify Stat Triggers in `src/App.tsx`
- **Quizzes**: `correct_quizzes`, `wrong_quizzes`.
- **Cost Analysis**: `cost_analysis_correct`, `cost_analysis_wrong`.
- **Investments**: `investment_gains`, `investment_losses`.
- **Jail**: `jail_visits`, `jail_skips`.
- **Taxes**: `taxes_paid`.
- **Auctions**: `auction_wins`.
- **Wins**: `wins` (updated when balance >= 1,000,000).

### 3. Verify Profile Refresh
- Ensure `updateSupabaseProfile` correctly refreshes the local `profile` state after a successful update to prevent stale data in subsequent updates.

## Verification Plan
1. **Single Player Test**: Play a single player game, answer a quiz, and check if the profile stats in the menu update.
2. **Multiplayer Test**: Play a multiplayer game, perform various actions (investment, auction), and verify Supabase updates.
3. **Leaderboard Test**: Check if the leaderboard reflects the new statistics after a game or action.
