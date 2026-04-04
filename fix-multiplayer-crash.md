# Plan - Fix Multiplayer "Undefined Avatar" Crash

## Objective
Fix the `TypeError: Cannot read properties of undefined (reading 'avatar')` crash occurring in multiplayer mode during joining or starting games.

## Root Causes
1.  **ID Mismatch (Race Condition)**: `multiplayer.myId` is initialized to `''`. In `App.tsx`, it's updated inside `fetchProfile`. If a player joins a room *before* `fetchProfile` completes (e.g., via a fast invite click), they join with ID `''`. Once `fetchProfile` finishes, `myId` changes to the real UUID. Components then look for the UUID in the player list but only find `''`, resulting in `undefined` and a crash.
2.  **Missing Guard Checks**: `GameMap`, `Sidebar`, and `GameModal` components directly access `.avatar` on player objects without verifying if the object exists.
3.  **State Sync Timing**: During the transition from lobby to game, there's a brief moment where the synchronized state might be incomplete.

## Proposed Changes

### 1. Fix ID Initialization in `src/App.tsx`
- Call `multiplayer.setMyId(session.user.id)` immediately when the session is retrieved, before starting the `fetchProfile` async call.

### 2. Add Defensive Programming in Components
- **`src/components/GameMap.tsx`**: Add `currentPlayer &&` guard before rendering the avatar and name on the map.
- **`src/components/Sidebar.tsx`**: Add `player &&` guard inside the map loop.
- **`src/components/GameModal.tsx`**: Add guards for `activeRoller` and `winner` in `AuctionModal` and `VictoryModal`.
- **`src/App.tsx`**: Add `p &&` guard in the lobby player list.

### 3. Improve `MultiplayerManager.ts` Robustness
- Add safety checks in `handleAction` to ensure `players.length > 0` before modulo operations.

## Implementation Steps

### Step 1: Fix `App.tsx` Auth logic
- Update the session `useEffect` to set the ID immediately.

### Step 2: Update Components with Guards
- Patch `GameMap.tsx`, `Sidebar.tsx`, and `GameModal.tsx` with safety checks.

### Step 3: Verify and Cleanup
- Ensure no other direct property access exists on potentially undefined player objects.

## Verification
- Run the app.
- Clear local storage/cache.
- Log in and immediately accept an invite.
- Verify that the game loads without crashing.
