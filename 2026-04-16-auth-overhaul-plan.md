# Authentication System Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the authentication interface for better clarity, visual appeal, and robust email verification handling, including a "resend" mechanism.

**Architecture:** Refactor `Auth.tsx` into a state-driven component with clear "Login" vs "Sign Up" tabs and a dedicated "Verification Sent" screen. Use Framer Motion for smooth transitions.

**Tech Stack:** React 19, Supabase Auth, Tailwind CSS, Framer Motion.

---

### Task 1: Update Translations

**Files:**
- Modify: `src/i18n/translations.ts`

- [x] **Step 1: Add Auth translations**
Add a new `auth` section to both `en` and `sr` objects.

```typescript
// en
auth: {
  login: "Log In",
  signup: "Sign Up",
  email: "Email Address",
  password: "Password",
  confirm_password: "Confirm Password",
  forgot_password: "Forgot Password?",
  welcome_back: "Welcome back",
  create_account: "Create your account",
  processing: "PROCESSING...",
  google_auth: "Continue with Google",
  no_account: "Don't have an account?",
  has_account: "Already have an account?",
  verification_sent: "Verification Sent!",
  check_inbox: "Check your inbox",
  email_sent_to: "We've sent a verification link to",
  resend_email: "Resend Email",
  back_to_login: "Back to Login",
  resend_cooldown: "Resend in {seconds}s",
  errors: {
    passwords_dont_match: "Passwords do not match!",
    rate_limit: "Too many requests. Please wait.",
    unknown: "An unexpected error occurred."
  }
}
// sr
auth: {
  login: "Prijavi se",
  signup: "Registruj se",
  email: "Email Adresa",
  password: "Lozinka",
  confirm_password: "Potvrdi lozinku",
  forgot_password: "Zaboravljena lozinka?",
  welcome_back: "Dobrodošli nazad",
  create_account: "Kreirajte svoj nalog",
  processing: "OBRADA...",
  google_auth: "Nastavi sa Google-om",
  no_account: "Nemate nalog?",
  has_account: "Već imate nalog?",
  verification_sent: "Verifikacija poslata!",
  check_inbox: "Proverite sanduče",
  email_sent_to: "Poslali smo link za verifikaciju na",
  resend_email: "Ponovo pošalji email",
  back_to_login: "Nazad na prijavu",
  resend_cooldown: "Pošalji ponovo za {seconds}s",
  errors: {
    passwords_dont_match: "Lozinke se ne podudaraju!",
    rate_limit: "Previše zahteva. Molimo sačekajte.",
    unknown: "Došlo je do neočekivane greške."
  }
}
```

### Task 2: Core Refactor of `Auth.tsx` Structure

**Files:**
- Modify: `src/components/Auth.tsx`

- [x] **Step 1: Setup new state variables**
Add `confirmPassword`, `viewState` ('form' | 'verification'), and `resendTimer`.

- [x] **Step 2: Implement Resend Logic**
Add a `handleResend` function using `supabase.auth.resend`.

```typescript
const handleResend = async () => {
  if (resendTimer > 0 || !email) return;
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: { emailRedirectTo: window.location.origin }
    });
    if (error) throw error;
    setResendTimer(60);
  } catch (error: any) {
    setMessage({ type: 'error', text: error.message });
  }
};
```

- [x] **Step 3: Update `handleAuth` for Signup**
Include `confirmPassword` check and switch to `verification` viewState on success.

```typescript
if (isSignUp) {
  if (password !== confirmPassword) {
    setMessage({ type: 'error', text: t.auth.errors.passwords_dont_match });
    setLoading(false);
    return;
  }
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: window.location.origin }
  });
  if (error) throw error;
  setViewState('verification');
}
```

### Task 3: Redesign Auth UI

**Files:**
- Modify: `src/components/Auth.tsx`

- [x] **Step 1: Replace main JSX with New Design**
Implement the Tab Switcher, Dynamic Form, and Verification View.

- [x] **Step 2: Add Framer Motion animations**
Use `AnimatePresence` and `motion.div` for switching between states and viewStates.

- [x] **Step 3: Styling Accents**
Dynamically apply `border-blue-500` vs `border-emerald-500` and similar classes based on `activeTab`.

### Task 4: Verification & Final Testing

- [ ] **Step 1: Test Login flow**
Verify Google and Email login work.

- [ ] **Step 2: Test Signup flow**
Verify the new "Verification Sent" screen appears.
Verify the "Resend" button works and has a cooldown.

- [ ] **Step 3: Visual Polish**
Check responsiveness and transitions.
