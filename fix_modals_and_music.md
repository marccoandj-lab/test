# Fix Modals, Switch Redesign, and Music Persistence

This plan addresses four issues:
1.  **Modal Animation**: Fixes the delay in floating elements within modals.
2.  **Switch Modal Redesign**: Modernizes the design of the Switch modal to match other game modals.
3.  **Initial Volume**: Fixes the music volume starting at the wrong level.
4.  **Music Persistence**: Ensures music state (on/off) is preserved when transitioning from StartScreen to game modes.

## Changes

### 1. Fix Modal Floating Animations
-   Update `src/components/GameModal.tsx`:
    -   Modify `FloatingSymbols` component to use a negative `animationDelay` (e.g., `-${Math.random() * 10}s`). This ensures the animation is already "in progress" when the modal appears, eliminating the initial static delay.

### 2. Redesign Switch Modal
-   Update `src/components/GameModal.tsx`:
    -   Rewrite `SwitchModal` to use the base `Modal` component.
    -   Add `FloatingSymbols` for visual consistency.
    -   Implement a more vibrant UI with improved icons, arrows, and informative text about the mode switch.
    -   Increase auto-close timer slightly for better readability.

### 3. Fix Music Volume and Persistence
-   Update `src/App.tsx`:
    -   Change initial `volume` state to `0.1` (10%) to match user preference.
    -   Ensure `audioRef.current.volume` is synchronized immediately.
    -   Add logic to `handleStart` to only call `startMusic()` if music was already playing or explicitly enabled on the StartScreen, rather than forcing it on.
    -   Use `localStorage` to persist music enabled/disabled state if necessary.

## Verification & Testing
-   **Animations**: Open any modal (Quiz, Investment, etc.) and verify symbols move immediately.
    -   **Switch Modal**: Land on a Switch field and verify the new high-quality design.
    -   **Volume**: Start the app and verify the music isn't too loud or too quiet (should be at 10%).
    -   **Music Persistence**: Turn off music on StartScreen, enter a game, and verify music remains off.
