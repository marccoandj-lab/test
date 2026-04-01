# Improve Statistics Tracking and Profile UI

Enhance the "My Profile" statistics section with better number formatting (K, M), more detailed metrics, and ensure both single-player and multi-player stats are captured correctly.

## Objectives
- Implement `formatNumber` utility for compact statistics display.
- Add missing statistics (`jail_skips`, `taxes_paid`) to tracking and display.
- Refactor "My Profile" UI for a more detailed and visually appealing statistics overview.
- Ensure all statistics are correctly updated in Supabase from both game modes.

## Proposed Changes

### 1. New Utility: `src/utils/format.ts`
- Create a `formatNumber` helper to convert numbers like 1,500 to '1.5K' and 2,000,000 to '2M'.

### 2. Type Definitions: `src/types/game.ts`
- (Verified: `Player` already has the required fields in `stats`).

### 3. Profile Screen: `src/components/StartScreen.tsx`
- Update `profileData` interface to include `jail_skips` and `taxes_paid`.
- Update `saveProfile` to handle the new fields.
- Refactor the "Detailed Statistics" section to display:
  - Total Capital (formatted)
  - Wins & Games Played
  - Quizzes: Correct vs. Wrong
  - Investments: Gains vs. Losses
  - Jail: Visits vs. Skips
  - Auction Wins
  - Taxes Paid
- Use `formatNumber` for all monetary and large numeric values.

### 4. App Orchestration: `src/App.tsx`
- Update `fetchProfile` and `updateSupabaseProfile` to include `jail_skips` and `taxes_paid`.
- Ensure single-player actions (tax payment, jail skip, auction win) call `updateSupabaseProfile`.

### 5. Multiplayer: `src/services/MultiplayerManager.ts`
- (Multiplayer stats are mostly tracked in the `Player` object during game and displayed at the end, but we should ensure they persist to Supabase for the current user if possible at the end of the game).
- *Note: Host currently handles state, we need to ensure local user profile is updated when they perform actions or when the game ends.*

## Implementation Steps

### Phase 1: Utilities & Infrastructure
1. Create `src/utils/format.ts`.
2. Update `App.tsx` interfaces and fetch queries.
3. Update `StartScreen.tsx` interface and `saveProfile`.

### Phase 2: UI Refactoring
1. Import `formatNumber` in `StartScreen.tsx`.
2. Redesign the statistics grid in the Profile view to be more comprehensive and organized.

### Phase 3: Logic Updates
1. Update `App.tsx` to increment `jail_skips` and `taxes_paid` when these actions occur.
2. Ensure `auction_wins` are tracked in SP if applicable (currently SP doesn't have auctions, but the structure should be ready).

## Verification Plan

### Manual Verification
1. **Profile Display**: Open "My Profile" and verify numbers > 1000 use 'K' and > 1M use 'M'.
2. **New Stats**: Verify "Jail Skips" and "Taxes Paid" appear in the list.
3. **Data Persistence**: 
   - Play a single-player game, skip jail, pay taxes, and verify the stats increment in the profile after the game.
   - Check if total capital accumulates correctly.
4. **Multi-language**: Verify SR and EN translations for new labels.
