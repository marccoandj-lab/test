# Design Spec: Authentication System Overhaul

**Date**: 2026-04-16
**Topic**: Auth Overhaul (Email/Password & Google)
**Aesthetic**: Luminous Neo-Auth (Glassmorphism + State-aware Accents)
**DFII Score**: 13/15

## 1. Purpose & Goals
The goal is to fix current friction in the Email/Password authentication flow, specifically addressing:
1.  **Clarity**: Subconscious distinction between "Login" and "Sign Up".
2.  **Reliability**: Robust feedback and recovery (resend) for the email verification process.
3.  **Aesthetics**: Aligning the Auth screen with the game's premium "Glassmorphism" look.

## 2. Design Direction: "Luminous Neo-Auth"

### Visual Thesis
An interface that "breathes" with the user's intent. The background glow and border accents shift dynamically based on whether the user is logging in or creating a new account.

*   **Login Mode**: Slate-900 background with **Blue-600** primary accents and glow.
*   **Sign Up Mode**: Slate-900 background with **Emerald-500** primary accents and glow.

### Differentiation Anchor
A sliding **Segmented Tab Control** at the top of the auth card. This isn't just a toggle; it's a structural element that dictates the card's accent colors and the visibility of form fields.

## 3. Component Architecture

### `Auth.tsx` (Root Container)
Manages the global state of the auth flow.
*   `activeTab`: 'login' | 'signup'
*   `viewState`: 'form' | 'verification_sent' | 'loading'
*   `errorMessage`: User-friendly translated strings.

### `AuthTabs` (Sub-component)
A glassmorphic tab switcher with a layout-transitioning underline (Framer Motion).
*   **Visual**: Uses `bg-white/5` and `backdrop-blur-md`.

### `AuthForm` (Sub-component)
*   **Fields**: 
    *   Email (Always)
    *   Password (Always)
    *   Confirm Password (Sign Up only)
*   **Transitions**: Smooth height animation when fields appear/disappear.
*   **Submit Button**: Large, gradient button (Blue-to-Indigo for Login, Emerald-to-Teal for Sign Up).

### `VerificationSentView` (Sub-component)
Replaces the form after a successful `signUp`.
*   **Icon**: Pulse-animated envelope SVG.
*   **Email Display**: Confirms which email the link was sent to.
*   **Action Row**:
    *   `Resend Email` button with a visible 60s countdown timer.
    *   `Back to Login` link.

## 4. Technical Implementation

### Supabase Integration
*   **Sign Up**: Use `supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } })`.
*   **Resend**: Use `supabase.auth.resend({ type: 'signup', email })`.

### Validation & Errors
*   **Client-side**: Basic email format check and password matching.
*   **Server-side**: Catch Supabase errors (e.g., `rate_limit_exceeded`, `user_already_exists`) and display clear feedback.

### Resend Cooldown
*   A local `useEffect` timer will manage the button's `disabled` state to prevent SMTP spamming and stay within Supabase's free tier limits.

## 5. Success Criteria
*   [ ] User can switch between Login and Sign Up with zero confusion.
*   [ ] User receives clear, high-contrast feedback after signing up.
*   [ ] User can successfully resend a verification email if the first one is lost.
*   [ ] The UI matches the existing "EconomySwitch" visual language perfectly.
