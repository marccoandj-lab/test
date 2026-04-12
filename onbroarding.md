# PRD — Economy Switch Onboarding & Conversion System
**Verzija:** 3.0 — FINALNA  
**Datum:** April 2026  
**Namenjeno:** Claude Code  
**Projekat:** Economy Switch — edukativna društvena igra  

---

## 0. Instrukcije za Claude Code

Ovo je kompletan, finalizovan plan. **Nema pitanja koja treba postavljati korisniku — sve odluke su donete.** Implementiraj direktno prema ovom dokumentu.

### Redosled rada

**KORAK 1 — Brainstorm (pre kodiranja)**
Primeni **Brainstorm skill**. Predloži korisniku 2–3 koncepta vizuelnog identiteta i tona. Prikaži mini style guide za svaki (font par, paleta, primer hero headline). Čekaj da korisnik izabere pre nego što počneš kodiranje.

**KORAK 2 — Implementacija**
Primeni **Frontend Design skill** za svaki ekran. Svaki ekran mora biti production-grade i vizuelno distinktivan.

Obavezna pravila dizajna:
- Font: izaberi memorabilan par — npr. Syne + DM Mono, Clash Display + Satoshi, Playfair Display + Inter Tight. Nikad Inter, Roboto ili Arial kao primarni font
- Boje: izvuci iz branding materijala u `/public` folderu. Dominantna paleta sa oštrim akcentima
- Motion: staggered reveals na page load, hover states koji iznenađuju, animovani tranzicije između koraka
- Layout: asimetričan gde ima smisla, grid-breaking elementi, generous negative space
- Pozadine: teksture, geometrijski paterni ili layered transparencies — ne solid bela

---

## 1. Vizija

Economy Switch onboarding nije vodič kroz pravila. On **stvara želju za kupovinom** pre nego što korisnik vidi cenu.

### Konverziona arhitektura — AIDA model

```
AWARENESS  →  Landing page
               Cilj: Zainteresovati za 3 sekunde. Ne "šta je igra" — "hoću ovo."

INTEREST   →  Onboarding koraci (3 koraka)
               Cilj: Personalizacija. Korisnik oseća da je igra napravljena za njega.

DESIRE     →  Simulacija poteza
               Cilj: Korisnik mora fizički da odigra jedan potez. Ko odigra — kupuje.

ACTION     →  Paywall
               Cilj: Tri jasna plana. Cena izgleda mala u odnosu na vrednost.
```

### Šta onboarding ne sme da radi

- Ne sme da objašnjava pravila (za to postoji in-app help)
- Ne sme da izgleda kao generički SaaS onboarding
- Ne sme da prikazuje paywall pre simulacije

---

## 2. Tech Stack — Fiksiran

| Parametar | Vrednost |
|---|---|
| Framework | **React + Vite** |
| CSS | **Tailwind CSS** |
| Backend / Auth | **Supabase** (već podešen, ima podatke) |
| Jezik interfejsa | **Engleski** (primarni) + **Srpski latinica** (sekundarni, i18n) |
| Branding assets | `/public` folder — pročitati pre Brainstorm koraka |

### Supabase napomene

Supabase je već podešen i sadrži podatke. Claude Code mora:
- Koristiti postojeći Supabase projekat (ne kreirati novi)
- Proveriti postojeću šemu pre kreiranja novih tabela
- Koristiti `supabase.auth` za sve auth operacije
- OTP verifikacija: `supabase.auth.signInWithOtp()` + `supabase.auth.verifyOtp()`

```typescript
// Inicijalizacija — koristiti env varijable
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

---

## 3. Branding

Sav branding materijal se nalazi u `/public` folderu projekta.

**Claude Code mora:** Pre Brainstorm koraka pročitati `/public` folder i identifikovati:
- Logo fajlove (SVG preferiran)
- Color palette (ako postoji brand guide)
- Fontove (ako su dostupni)
- Sve ilustracije ili grafičke elemente igre

Na osnovu toga, u Brainstorm koraku predložiti 2–3 vizuelna koncepta koji su konzistentni sa postojećim brand materialima, a ne generički.

**Vizuelni ton:** slobodan brainstorm — predložiti opcije korisniku. Preporučeni pravci za razmatranje:
- *Premium edukativno* — tamna paleta, zlatni akcenti, serif display font
- *Playful strategija* — živahne boje, bold tipografija, energičan layout
- *Moderni board game* — grafit + zelena + plava iz table, čisto i memorabilno

---

## 4. Marketing pozicioniranje

### Ciljna grupa — kombinovana

| Segment | Ko su | Šta ih motiviše |
|---|---|---|
| Roditelji | Kupuju za decu 8–16 god | "Moje dete će naučiti više nego iz udžbenika" |
| Nastavnici | Kupuju za odeljenje | "Konačno nešto što drži pažnju celog časa" |
| Studenti | Kupuju za sebe | "Učim ekonomiju kroz igru, ne kroz teoriju" |
| Board game entuzijasti | Kupuju za zabavu | "Strategija + ekonomija + takmičenje" |

### Primarna vrednosna propozicija

**Deca uče ekonomiju kroz zabavu** — ovo je srž poruke.

Svaki marketing tekst mora biti usmeren ka ovom ishodu. Ne opisivati mehaniku — opisivati transformaciju:
- ❌ "Igra ima zelenu i plavu tablu koje predstavljaju dve vrste ekonomije"
- ✅ "Dok pobjeđuju, uče kako novac zaista funkcioniše"

### Social proof

**100 igrača** je već odigralo Economy Switch.

Koristiti na landing page-u:
```
"100+ igrača već misli drugačije o ekonomiji."
ili
"Pridruži se 100+ porodica i škola koje su već otkrīle Economy Switch."
```

---

## 5. Ekranski flow — kompletan

```
/                    Landing page
         ↓
/signup              Signup (email/password ili Google OAuth)
/login               Login
         ↓
/verify              6-cifreni OTP (OBAVEZNO za email i OAuth)
         ↓
/onboarding/1        Ko si? (segmentacija)
/onboarding/2        Šta ti je važno? (personalizacija)
/onboarding/3        Simulacija poteza (aha momenat)
         ↓
/paywall             3 plana: Free / Pro / School
         ↓
/checkout/success    Uspešna kupovina → redirect na StartScreen
/start               StartScreen (ulaz u igru)
/forgot-password     Reset lozinke
```

---

## 6. Specifikacija ekrana

### 6.1 Landing Page

**Cilj:** Privuci pažnju za 3 sekunde. Nateraj korisnika da klikne CTA pre nego što pročita sve.

**Hero sekcija:**

Headline — Claude Code brainstormuje 5 opcija u Brainstorm koraku, korisnik bira. Primeri tonova:
- *"The board game where winners actually understand money."*
- *"Your kids will learn more economics here than in a year of school."*
- *"Two economies. One winner. Zero luck."*

Subheadline — jedna rečenica, emocionalna vrednost, ne opis igre.

CTA dugme (primarno): `"Start for free"` ili `"Try it free"`  
Micro-copy ispod: `"No credit card · Ready in 60 seconds"`

**Social proof traka** (odmah ispod hero):
```
"100+ players already think differently about economics."
[Logo ili ilustracija igre]
```

**3 vrednosne propozicije** — kartice, svaka sa emotivnim hook-om:

| Kartica | Headline | Body |
|---|---|---|
| 1 | "Learn by doing, not by reading." | Deca pamte ono što odigraju, ne ono što pročitaju. Economy Switch pretvara ekonomske koncepte u odluke koje se pamte. |
| 2 | "Two economies, one table." | Linearna i cirkularna ekonomija — nije teorija, to su dva različita načina razmišljanja. Koji sistem pobjeđuje? Igrajte i saznajte. |
| 3 | "Designed for Serbia. Built for the world." | Prva domaća igra koja uči ekonomske sisteme. Za porodice, škole i sve koji žele da razumeju kako novac zaista radi. |

**"How it works" sekcija** — 3 koraka:
```
1. Register → 2. Play one turn (feel it) → 3. Start your game
```

**Finalni CTA** (ponovi na dnu stranice):
```
"Join 100+ players. Start free today."
[Dugme: "Get started →"]
```

---

### 6.2 Signup

**Princip:** Svako polje košta ~5–10% konverzije. Samo neophodna polja.

```
[Logo]

Headline: "Create your account"

[Google OAuth dugme — primarni poziv]
  Tekst: "Continue with Google"

[Divider: "or"]

[Email input]        validacija onBlur
[Password input]     strength meter — 3 nivoa (Weak / OK / Strong)
                     real-time prikaz dok kuca

[Submit: "Create account →"]

[Legal — 11px]: "By continuing you agree to our Terms and Privacy Policy"

[Link]: "Already have an account? Sign in"
```

**Error poruke — human ton:**
- Email zauzet: `"This email is already registered. Sign in →"` (klikabilno)
- Lozinka slaba: vizuelni meter + `"Add a number or symbol for a stronger password"`

**Po uspešnom signup-u** → uvek `/verify` (OTP obavezan za oba metoda)

---

### 6.3 Login

```
[Google OAuth — primarni]

[Divider: "or"]

[Email]
[Password + "Forgot password?" link desno]

[Submit: "Sign in →"]

[Link]: "Don't have an account? Sign up free"
```

**Po uspešnom loginu:**
- Onboarding nije završen → `/onboarding/1`
- Onboarding završen, nema plana → `/paywall`
- Ima aktivan plan → `/start`

---

### 6.4 OTP Verifikacija — 6 cifara (Email i OAuth)

> OTP je obavezan za **oba** auth metoda — email/password i Google OAuth. Ovo je dodatni sigurnosni sloj koji se ne može preskočiti.

**OAuth tok:**
```
Korisnik klikne "Continue with Google"
→ Google OAuth flow
→ Aplikacija prima token
→ ODMAH prikazati /verify ekran
   Headline: "One last step."
   Body: "We sent a 6-digit code to [google email]"
```

**Email tok:**
```
Korisnik kreira nalog
→ ODMAH prikazati /verify ekran
   Headline: "Check your inbox."
   Body: "We sent a 6-digit code to [uneseni email]"
```

**UI elementi:**

```
[SVG ikona — envelope ili shield, ne emoji]

[Dinamični headline po kontekstu]

[Body sa emailom]
[Link: "Wrong email? Change it →"]

[6 × input polja]
  - Auto-focus na polje 1 po mount-u
  - Auto-advance na sledeće po unosu jedne cifre
  - Backspace briše i vraća fokus na prethodno
  - Paste celog koda → automatski raspodeli u 6 polja
  - inputmode="numeric" pattern="[0-9]*"
  - Vizuelno: veliki font (24px+), centered, razmak između polja

[Submit dugme: "Verify →"]
  → Auto-submit čim se unese 6. cifra (bez klika)
  → Loading spinner tokom API poziva

[Resend sekcija:]
  → Prvih 60s: "Resend code (60s)" — disabled, countdown vidljiv
  → Nakon 60s: "Resend code" — aktivno, klikabilno
  → Max 3 resend-a
  → Posle 3: "Too many attempts. Try again in 10 minutes."
```

**Greške:**
```
Pogrešan kod:
  → Sva polja postaju crvena
  → @keyframes shake animacija (400ms)
  → Poruka: "Incorrect code. X attempts remaining."

5 neuspešnih pokušaja:
  → "Account temporarily locked. Request a new code."

Istekao kod (10 min):
  → "Code expired. Request a new one."
```

**Supabase implementacija:**
```typescript
// Slanje OTP-a
const { error } = await supabase.auth.signInWithOtp({
  email: userEmail,
  options: { shouldCreateUser: false }  // korisnik već postoji
})

// Verifikacija
const { data, error } = await supabase.auth.verifyOtp({
  email: userEmail,
  token: otpCode,       // 6-cifreni string
  type: 'email'
})
```

---

### 6.5 Onboarding Korak 1 — Ko si?

**Progress:** 1 / 3

**Headline:** `"Who's playing?"` (ne "Select your role")  
**Subheadline:** `"We'll set up your experience around you."`

**Chip selekcija — single-select:**

| Chip label | Sub-label |
|---|---|
| Parent | "Playing with my kids" |
| Teacher | "Using it in class" |
| Student | "Learning through play" |
| Game lover | "Here for the strategy" |

**Personalizacija koja se aktivira od ovog trenutka:**

| Uloga | Efekat na ostatak toka |
|---|---|
| Parent | Naslovi naglašavaju edukativni ishod za decu |
| Teacher | School plan istaknut na paywallU, headline specifičan |
| Student | Naglasak na učenju, student-friendly CTA |
| Game lover | Naglasak na strategiji i takmičarskim elementima |

**Micro-copy ispod "Continue":** `"We only use this to personalize your experience"`

---

### 6.6 Onboarding Korak 2 — Šta ti je važno?

**Progress:** 2 / 3

**Headline:** `"What do you love about games?"` (ne "Select your preferences")  
**Subheadline:** `"Choose up to 2."`

**Chip selekcija — multi-select, max 2:**

```
"I love when I have to think"
"Best moments are playing together"
"Strategy beats luck every time"
"I want to understand how economies work"
"I'm in it to win"
```

**Dinamička poruka koja se pojavljuje odmah po selekciji:**

| Kombinacija | Poruka |
|---|---|
| "think" + "strategy" | `"Perfect. Economy Switch rewards long-term planning, not luck."` |
| "together" | `"2 to 8 players. Perfect for a family evening or classroom."` |
| "economies" | `"Two economic systems on one board — play both and decide which wins."` |
| "win" + "strategy" | `"The best players don't get lucky. They plan 3 turns ahead."` |

---

### 6.7 Onboarding Korak 3 — Simulacija Poteza

**Progress:** 3 / 3

**Svrha:** Ovo je najvažniji ekran. Korisnik koji odigra simulaciju kupuje 3× češće. Ne preskočiti, ne pojednostavljivati.

**Headline:** `"Play one turn. Feel how it works."`  
**Subheadline:** `"Pick a square, roll the dice."`

**UI:**

```
[Stilizovana minijatura table — ilustracija, ne foto]

[Izbor polja — 3 dugmeta:]
  ● Green square — Profit
  ○ Red square — Tax
  ○ Investment

[Kockica — 6 klikabilnih dugmadi: 1 2 3 4 5 6]
  Klik na broj = instant aktivacija
  Aktivan broj: vizuelno istaknut (border + background)

[Rezultat — animovano pojavljivanje fadeInUp 200ms:]
  Profit  → zelena pozadina, "+€X,XXX", micro konfeti
  Porez   → crvena pozadina, "−€X,XXX", subtle shake
  Invest  → boja po ishodu, iznos + objašnjenje kockice
```

**Formule — nepromenjivo iz pravilnika:**

```typescript
const PROFIT_PER_DICE = 15_000  // € × vrednost kockice
const TAX_PER_DICE    = 15_000  // € × vrednost kockice

const investmentOutcome = (dice: number, invested: number): number => ({
  1: invested / 5,      // "Investment lost most of its value"
  2: invested / 2,      // "Investment underperformed"
  3: invested - 5_000,  // "Slight loss"
  4: invested,          // "Break even"
  5: invested * 2,      // "Investment doubled"
  6: invested * 5,      // "5× return — jackpot"
})[dice]

// Investicija u simulaciji: fiksovano na €50,000 za demo
// Minimum u pravoj igri: €10,000
```

**Rezultat prikaz za investiciju:**
```
Dice 1: "−€40,000 · Your investment lost 80% of its value."  (crveno)
Dice 2: "−€25,000 · Investment underperformed."              (crveno)
Dice 3: "−€5,000 · Small loss."                              (crveno)
Dice 4: "€0 · Break even. At least you didn't lose."        (neutralno)
Dice 5: "+€50,000 · Your investment doubled."               (zeleno)
Dice 6: "+€200,000 · 5× return. You saw it coming."         (zeleno, konfeti)
```

**Transition ka paywallU** — ne suvog "Continue":
```
[Posle prvog odigranog poteza, pojavljuje se:]

"Now you know how it feels.
 Ready to play for real?"

[CTA: "Yes, let's go →"]
[Sekundarni: "Play another turn" — da se resetuje simulacija]
```

---

### 6.8 Paywall

**Headline — dinamičan po ulozi:**

| Uloga | Headline |
|---|---|
| Parent | `"Give them a game that teaches more than school."` |
| Teacher | `"Economics for the whole class. Less than one textbook."` |
| Student | `"An investment in yourself that pays in knowledge."` |
| Game lover | `"A real game deserves the full experience."` |

**Tri plana:**

---

#### FREE

```
Name: Free
Price: €0 / forever

Features:
  ✓ Singleplayer mode
  ✓ Full game rules in-app
  ✓ Basic statistics
  ✓ Digital question deck (limited)
  ✗ Multiplayer
  ✗ Social features
  ✗ Ad-free experience

CTA: "Continue free"
```

---

#### PRO ← [Badge: "Most popular"]

```
Name: Pro
Price: €5 / year
       (Billed annually — equivalent to €0.42/month)

Features:
  ✓ Everything in Free
  ✓ Full Multiplayer
  ✓ Social features
  ✓ Ad-free experience
  ✓ Unlimited question deck
  ✓ Advanced statistics & history
  ✓ Priority support

CTA primarni:  "Start 14-day free trial →"  (bez kartice)
CTA sekundarni: "Buy now — €5/year"         (direktno plaćanje)

Micro-copy: "No credit card for trial · Cancel anytime"
```

---

#### SCHOOL

```
Name: School Plan
Price: €120 / year

Features:
  ✓ Everything in Pro
  ✓ Up to 35 student accounts
  ✓ Teacher dashboard
  ✓ Class progress tracking
  ✓ Curriculum-aligned content
  ✓ Priority email support
  ✓ Invoice billing available

CTA: "Contact us for schools →"
     (otvara kontakt formu ili mailto, ne Paddle checkout)

Badge ispod: "Used in 10+ schools" (placeholder dok se ne ažurira)
```

---

**Toggle mesečno/godišnje:** Ne postoji (samo godišnje za Pro — €5/year).

**Trust signali ispod svih CTA dugmadi:**
```
[Shield] Secure payment via Paddle
[Calendar] Cancel anytime
[Card] No credit card for free trial
```

---

## 7. Payment Integration — Paddle (Srbija)

### Zašto Paddle

Stripe ne podržava Srbiju kao zemlju prodavca. Paddle funkcioniše kao **Merchant of Record** — Paddle formalno prodaje, obrađuje PDV, i šalje isplate na srpski devizni račun (EUR). Nema potrebe za srpskim payment gateway-om.

**Cena:** 5% + $0.50 po transakciji. Nema setup niti mesečnih naknada.

### Setup

```
1. Nalog na paddle.com (besplatno)
2. Verifikacija biznisa — potrebni: lična karta, adresa firme/preduzetnika
3. Kreirati produkte u Paddle dashboardu:
   - Economy Switch Pro — Annual: €5.00 / year
   (School plan je kontakt, ne Paddle checkout)
4. Dobiti Client Token i Webhook Secret
5. .env varijable:
   VITE_PADDLE_CLIENT_TOKEN=...
   PADDLE_WEBHOOK_SECRET=...     (server-side only)
   VITE_PADDLE_ENV=sandbox       # za testiranje
   VITE_PADDLE_ENV=production    # za produkciju
```

### Paddle.js integracija

```html
<!-- index.html -->
<script src="https://cdn.paddle.com/paddle/v2/paddle.js"></script>
```

```typescript
// paddle.ts — inicijalizacija
import { initializePaddle, Paddle } from '@paddle/paddle-js'

let paddle: Paddle | undefined

export async function getPaddle(): Promise<Paddle> {
  if (!paddle) {
    paddle = await initializePaddle({
      environment: import.meta.env.VITE_PADDLE_ENV,
      token: import.meta.env.VITE_PADDLE_CLIENT_TOKEN,
      eventCallback(event) {
        if (event.name === 'checkout.completed') {
          handleCheckoutCompleted(event.data)
        }
        if (event.name === 'checkout.closed') {
          handleCheckoutClosed()
        }
      },
    })
  }
  return paddle!
}

// Price ID-ovi iz Paddle dashboarda
export const PADDLE_PRICES = {
  proAnnual: 'pri_XXXXXXXXXX',   // popuniti po kreiranju produkta
} as const
```

```typescript
// Otvaranje checkoutA — overlay, ne redirect
export async function openProCheckout(userEmail: string, userId: string) {
  const paddle = await getPaddle()
  
  await paddle.Checkout.open({
    items: [{ priceId: PADDLE_PRICES.proAnnual, quantity: 1 }],
    customer: { email: userEmail },
    customData: { userId, plan: 'pro' },
    settings: {
      displayMode: 'overlay',
      theme: 'light',
      locale: 'en',
      successUrl: `${window.location.origin}/checkout/success`,
    },
  })
}
```

### Webhook handler (server-side)

Supabase Edge Function ili custom backend endpoint:

```typescript
// supabase/functions/paddle-webhook/index.ts
import { serve } from 'https://deno.land/std/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

serve(async (req) => {
  const body = await req.text()
  const signature = req.headers.get('paddle-signature')
  
  // Verifikacija potpisa — UVEK
  const isValid = verifyPaddleSignature(body, signature, Deno.env.get('PADDLE_WEBHOOK_SECRET'))
  if (!isValid) return new Response('Unauthorized', { status: 401 })
  
  const event = JSON.parse(body)
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )
  
  switch (event.event_type) {
    case 'subscription.created':
    case 'subscription.updated':
      await supabase
        .from('user_plans')
        .upsert({
          user_id: event.data.custom_data.userId,
          plan: 'pro',
          paddle_subscription_id: event.data.id,
          status: 'active',
          current_period_end: event.data.current_billing_period.ends_at,
        })
      break
      
    case 'subscription.cancelled':
      await supabase
        .from('user_plans')
        .update({ status: 'cancelled' })
        .eq('paddle_subscription_id', event.data.id)
      break
      
    case 'transaction.payment_failed':
      // Notify user — email ili in-app notifikacija
      await notifyPaymentFailed(event.data.custom_data.userId)
      break
  }
  
  return new Response('OK', { status: 200 })
})
```

### Test kartice (Sandbox)

```
Uspešno plaćanje: 4242 4242 4242 4242  Exp: 12/26  CVV: 100
Odbijeno plaćanje: 4000 0000 0000 0002
```

---

## 8. Baza podataka — Supabase šema

Proveriti postojeću šemu pre kreiranja. Ako ne postoje, dodati:

```sql
-- Planovi korisnika
CREATE TABLE user_plans (
  id                      uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id                 uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  plan                    text CHECK (plan IN ('free', 'pro', 'school')) DEFAULT 'free',
  paddle_subscription_id  text UNIQUE,
  status                  text CHECK (status IN ('active', 'cancelled', 'past_due')) DEFAULT 'active',
  trial_ends_at           timestamptz,
  current_period_end      timestamptz,
  created_at              timestamptz DEFAULT now(),
  updated_at              timestamptz DEFAULT now()
);

-- Onboarding progres
CREATE TABLE onboarding_progress (
  user_id                 uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role                    text,        -- 'parent' | 'teacher' | 'student' | 'gamer'
  motivations             text[],      -- max 2 vrednosti
  simulation_played       boolean DEFAULT false,
  completed               boolean DEFAULT false,
  completed_at            timestamptz,
  created_at              timestamptz DEFAULT now()
);

-- RLS politike
ALTER TABLE user_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own plan" ON user_plans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users manage own onboarding" ON onboarding_progress
  FOR ALL USING (auth.uid() = user_id);
```

---

## 9. State Management

```typescript
// Onboarding state — čuvati u Supabase + localStorage (sync)
interface OnboardingState {
  userId: string
  email: string
  authMethod: 'email' | 'google'
  otpVerified: boolean
  
  // Korak 1
  role: 'parent' | 'teacher' | 'student' | 'gamer' | null
  
  // Korak 2
  motivations: string[]   // max 2
  
  // Korak 3
  simulationPlayed: boolean
  
  // Meta
  currentStep: 1 | 2 | 3
  completed: boolean
}

// Čuvanje: pri svakom "Continue" kliku sync u Supabase
// Učitavanje: pri otvaranju /onboarding/* učitati iz Supabase
// Fallback: localStorage ako je offline
```

---

## 10. Routing i Route Guards

```typescript
// React Router v6 setup
const router = createBrowserRouter([
  { path: '/',                  element: <Landing /> },
  { path: '/signup',            element: <Signup /> },
  { path: '/login',             element: <Login /> },
  { path: '/verify',            element: <Verify /> },
  { path: '/forgot-password',   element: <ForgotPassword /> },
  {
    element: <RequireAuth />,   // Guard: mora biti autentifikovan + OTP verified
    children: [
      { path: '/onboarding/1',  element: <OnboardingStep1 /> },
      { path: '/onboarding/2',  element: <OnboardingStep2 /> },
      { path: '/onboarding/3',  element: <OnboardingStep3 /> },
      { path: '/paywall',       element: <Paywall /> },
      { path: '/checkout/success', element: <CheckoutSuccess /> },
      { path: '/start',         element: <StartScreen /> },
    ]
  }
])

// RequireAuth logika:
// 1. Nije ulogovan → /login
// 2. Ulogovan ali OTP nije verifikovan → /verify
// 3. Onboarding nije završen → /onboarding/[zadnji_korak]
// 4. Onboarding završen, nema plana → /paywall
// 5. Ima aktivan plan → propusti na traženu rutu
```

---

## 11. Animacije

```
Page transition između onboarding koraka:
  → slide-left + fade: novi korak dolazi sa desne, stari izlazi levo
  → Trajanje: 250ms ease-in-out

Progress bar:
  → transition: width 300ms ease
  → Boja: brand primarna boja

OTP greška:
  → @keyframes shake — horizontalni shake, 400ms

Simulacija rezultat:
  → fadeInUp 200ms + scale(0.9 → 1.0)
  → Profit: micro confetti (CSS only ili canvas-confetti)

Paywall plan hover:
  → transform: translateY(-3px), transition 150ms

Checkout success:
  → Confetti animacija, umerena
  → "Welcome to Pro!" sa scale-in animacijom

Page load (landing):
  → Staggered reveal: hero text, zatim CTA, zatim kartice
  → animation-delay: 0ms / 150ms / 300ms
```

---

## 12. i18n — Dvojezičnost

Interfejs je primarno na **engleskom**. Srpski (latinica) je dostupan kroz language switcher.

```typescript
// Preporuka: i18next + react-i18next
// Fajlovi: /locales/en/translation.json
//          /locales/sr/translation.json

// Minimalni set koji mora biti preveden:
// - Sve CTA labele
// - Sve error poruke
// - Onboarding naslovi i opcije
// - Paywall plan opisi
// Nije obavezno: legal tekst, FAQ
```

---

## 13. Accessibility

```
Forme:         label za svaki input (ne samo placeholder)
OTP polja:     aria-label="Digit 1 of 6" ... "Digit 6 of 6"
Progress bar:  role="progressbar" aria-valuenow aria-valuemax
Chips:         role="radio" (single-select), role="checkbox" (multi)
Fokus:         po prelasku koraka, fokus se pomerata na H1 novog koraka
Kontrast:      min 4.5:1 za tekst, 3:1 za UI elemente
Keyboard:      Tab/Shift+Tab, Enter aktivira dugmad, Esc zatvara modals
```

---

## 14. Validacije

| Polje | Pravilo | Poruka (EN) |
|---|---|---|
| Email | RFC format | "Enter a valid email address" |
| Email | Jedinstvenost (API) | "This email is already registered. Sign in →" |
| Password | Min 8 znakova | "Minimum 8 characters" |
| Password | Snaga | Vizuelni meter: Weak / OK / Strong |
| OTP | 6 cifara | "Enter all 6 digits" |
| OTP | Ispravnost | "Incorrect code. X attempts remaining." |
| OTP | Expiry | "Code expired. Request a new one." |

---

## 15. Analytics

Koristiti Supabase ili dodati Posthog (open source, bez GDPR problema):

```typescript
// Obavezni eventi:
posthog.capture('landing_viewed')
posthog.capture('signup_completed', { method: 'email' | 'google' })
posthog.capture('otp_verified', { attempts: number })
posthog.capture('onboarding_step_completed', { step: 1|2|3, role?: string })
posthog.capture('simulation_played', { field: string, dice: number, result: number })
posthog.capture('paywall_viewed', { role: string, simulation_played: boolean })
posthog.capture('plan_selected', { plan: 'free'|'pro'|'school' })
posthog.capture('checkout_completed', { plan: string, amount: number })
posthog.capture('checkout_abandoned', { plan: string })
```

---

## 16. Game Rules Konstante — Nepromenjivo

```typescript
// constants/gameRules.ts
export const GAME_RULES = {
  MIN_PLAYERS:           2,
  MAX_PLAYERS:           8,
  STARTING_CAPITAL:      150_000,   // € po igraču
  WIN_TARGET:            1_000_000, // €
  PROFIT_PER_DICE:       15_000,    // € × vrednost kockice
  TAX_PER_DICE:          15_000,    // € × vrednost kockice
  ENUMERATION_REWARD:    85_000,    // €
  MIN_INVESTMENT:        10_000,    // €
  AUCTION_START_PRICE:   35_000,    // €
  AUCTION_MIN_STEP:       2_000,    // €
  JAIL_BUY_OUT:          75_000,    // €
  INSURANCE_PRICE:       10_000,    // € po čeku
  MAX_INSURANCE_CHECKS:  2,
  
  investmentOutcome: (dice: 1|2|3|4|5|6, invested: number): number => ({
    1: invested / 5,
    2: invested / 2,
    3: invested - 5_000,
    4: invested,
    5: invested * 2,
    6: invested * 5,
  })[dice],
  
  SIMULATION_DEMO_INVESTMENT: 50_000,  // fiksovano za demo
} as const
```

---

## 17. Definicija "Gotovo"

### Auth + OTP
- [ ] Signup email/password radi, Supabase OTP se šalje i verifikuje
- [ ] Google OAuth radi, OTP ekran se prikazuje i verifikuje
- [ ] OTP auto-advance između polja
- [ ] OTP paste celog koda funkcioniše
- [ ] Resend cooldown 60s
- [ ] Shake animacija na pogrešnom kodu
- [ ] Blokiranje posle 5 neuspešnih pokušaja

### Onboarding
- [ ] Personalizacija na osnovu uloge vidljiva u headlineima i dinamičkim porukama
- [ ] Progress bar 1/3 → 2/3 → 3/3 precizno
- [ ] Multi-select max 2 na koraku 2 radi
- [ ] Dinamičke poruke na koraku 2 pojavljuju se po selekciji
- [ ] Simulacija koristi tačne formule iz GAME_RULES
- [ ] Transition ka paywallU posle simulacije
- [ ] Onboarding progress čuva se u Supabase

### Paywall + Payment
- [ ] Headline se menja po ulozi korisnika
- [ ] 3 plana prikazana: Free / Pro / School
- [ ] Pro ima dva CTA: Trial + Buy now
- [ ] School plan otvara kontakt, ne Paddle checkout
- [ ] Paddle sandbox checkout se otvara kao overlay
- [ ] Webhook obrađuje `subscription.created`
- [ ] Success screen → redirect na `/start`

### Dizajn
- [ ] Branding iz `/public` foldera primjenjen
- [ ] Font nije Inter/Roboto/Arial kao primarni
- [ ] Motion postoji na key momentima
- [ ] Mobile 360px+ izgleda odlično
- [ ] Nijedan ekran ne izgleda kao generički SaaS template

### Tehničko
- [ ] Nema console.error u produkcijskom buildu
- [ ] Route guards funkcionišu za sve zaštićene rute
- [ ] .env varijable nisu u git-u
- [ ] Loading states za sve async operacije
- [ ] Error states za sve potencijalne greške
- [ ] Supabase RLS politike aktivne

---

## 18. Post-Purchase Flow

Posle uspešnog plaćanja:

```
1. Paddle šalje webhook → Supabase funkcija ažurira user_plans tabelu
2. Prikazati /checkout/success ekran:
   - Confetti animacija
   - "Welcome to Pro, [ime]!" 
   - "Your 14-day trial has started."
   - [CTA: "Start playing →"] → /start
3. /start je StartScreen — ulazna tačka u igru
```

Posle Free plana (klik na "Continue free"):

```
→ Direktno na /start (bez checkout ekrana)
```

---

## 19. Tim Nalozi — 10 Pre-Aktiviranih Pro Naloga

### Šta treba izgraditi

Claude Code mora implementirati **admin skriptu i admin panel** koji vlasniku aplikacije (tebi) omogućava da kreira, upravlja i deli 10 unapred aktiviranih Pro naloga za članove tima — bez da svaki od njih prolazi kroz paywall ili plaćanje.

Ovo su interni nalozi za testiranje, demonstracije klijentima, prezentacije u školama i interno korišćenje tima.

---

### 19.1 Supabase šema — Team Accounts

Dodati u postojeću šemu (proveriti pre kreiranja):

```sql
-- Tabela za tim naloge
CREATE TABLE team_accounts (
  id                uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email             text UNIQUE NOT NULL,
  full_name         text NOT NULL,
  role_in_team      text NOT NULL,   -- npr. "Developer", "Sales", "Teacher Demo"
  invite_token      text UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  invite_sent_at    timestamptz,
  accepted_at       timestamptz,
  user_id           uuid REFERENCES auth.users(id),  -- popunjava se kad prihvate
  is_active         boolean DEFAULT true,
  notes             text,            -- interni opis, vidljiv samo adminu
  created_at        timestamptz DEFAULT now()
);

-- RLS: samo service_role može da čita/piše (admin only)
ALTER TABLE team_accounts ENABLE ROW LEVEL SECURITY;

-- Nijedan korisnik ne može direktno da pristupi ovoj tabeli
-- Sve operacije idu kroz Supabase Edge Functions sa service_role ključem
```

---

### 19.2 Admin skripta — Kreiranje 10 tim naloga

Claude Code kreira skriptu `scripts/create-team-accounts.ts` koju vlasnik pokréće **jednom** da postavi sve tim naloge:

```typescript
// scripts/create-team-accounts.ts
// Pokretanje: npx tsx scripts/create-team-accounts.ts
// Potrebno: SUPABASE_SERVICE_ROLE_KEY u .env

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config()

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!  // service_role, ne anon key
)

// ─── POPUNITI PRE POKRETANJA ──────────────────────────────────────────────────
const TEAM_MEMBERS = [
  { email: 'clan1@email.com',  full_name: 'Ime Prezime', role_in_team: 'Developer'      },
  { email: 'clan2@email.com',  full_name: 'Ime Prezime', role_in_team: 'Designer'       },
  { email: 'clan3@email.com',  full_name: 'Ime Prezime', role_in_team: 'Sales'          },
  { email: 'clan4@email.com',  full_name: 'Ime Prezime', role_in_team: 'Teacher Demo'   },
  { email: 'clan5@email.com',  full_name: 'Ime Prezime', role_in_team: 'Teacher Demo'   },
  { email: 'clan6@email.com',  full_name: 'Ime Prezime', role_in_team: 'Marketing'      },
  { email: 'clan7@email.com',  full_name: 'Ime Prezime', role_in_team: 'QA Tester'      },
  { email: 'clan8@email.com',  full_name: 'Ime Prezime', role_in_team: 'School Partner' },
  { email: 'clan9@email.com',  full_name: 'Ime Prezime', role_in_team: 'School Partner' },
  { email: 'clan10@email.com', full_name: 'Ime Prezime', role_in_team: 'Advisor'        },
]
// ─────────────────────────────────────────────────────────────────────────────

async function createTeamAccounts() {
  console.log('Creating 10 team accounts...\n')

  for (const member of TEAM_MEMBERS) {
    // 1. Kreirati zapis u team_accounts tabeli
    const { data: teamRecord, error: teamError } = await supabase
      .from('team_accounts')
      .insert({
        email:        member.email,
        full_name:    member.full_name,
        role_in_team: member.role_in_team,
      })
      .select()
      .single()

    if (teamError) {
      console.error(`✗ ${member.email}: ${teamError.message}`)
      continue
    }

    // 2. Kreirati Supabase auth korisnika sa automatski generisanom lozinkom
    const tempPassword = `ES-${Math.random().toString(36).slice(2, 10).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`

    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email:            member.email,
      password:         tempPassword,
      email_confirm:    true,   // odmah verifikovan, ne šalje se email
      user_metadata: {
        full_name:    member.full_name,
        is_team_account: true,
      },
    })

    if (authError) {
      console.error(`✗ Auth failed for ${member.email}: ${authError.message}`)
      continue
    }

    // 3. Aktivirati Pro plan direktno u user_plans tabeli
    await supabase.from('user_plans').insert({
      user_id:              authUser.user.id,
      plan:                 'pro',
      status:               'active',
      paddle_subscription_id: `TEAM-${teamRecord.id}`,  // ne pravi Paddle subscription
      current_period_end:   new Date('2099-12-31').toISOString(), // "nikad ne ističe"
    })

    // 4. Ažurirati team_accounts sa user_id i invite_sent_at
    await supabase
      .from('team_accounts')
      .update({
        user_id:       authUser.user.id,
        invite_sent_at: new Date().toISOString(),
      })
      .eq('id', teamRecord.id)

    // 5. Generisati magic link za prvо prijavljivanje (važi 24h)
    const { data: magicLink } = await supabase.auth.admin.generateLink({
      type:  'magiclink',
      email: member.email,
    })

    console.log(`✓ ${member.full_name} (${member.role_in_team})`)
    console.log(`  Email:       ${member.email}`)
    console.log(`  Temp pass:   ${tempPassword}`)
    console.log(`  Magic link:  ${magicLink?.properties?.action_link ?? 'N/A'}`)
    console.log(`  Plan:        Pro (aktiviran, ne ističe)`)
    console.log()
  }

  console.log('Done. Save the credentials above — they will not be shown again.')
}

createTeamAccounts()
```

**Pokretanje skripte:**
```bash
# 1. Popuniti TEAM_MEMBERS niz sa pravim podacima
# 2. Osigurati da je SUPABASE_SERVICE_ROLE_KEY u .env (ne commit-ovati)
npx tsx scripts/create-team-accounts.ts

# Output se štampa u terminal — sačuvati ga odmah
# Magic linkovi važe 24h od generisanja
```

---

### 19.3 Admin Panel — `/admin/team`

Claude Code kreira zaštićenu admin stranicu na ruti `/admin/team`. Dostupna je **isključivo** korisniku čiji je email upisan u env varijabli `VITE_ADMIN_EMAIL`.

```typescript
// Route guard za admin
// /admin/* → proveriti da li je auth.user.email === process.env.VITE_ADMIN_EMAIL
// Ako nije → redirect na /start sa greškom "Access denied"
```

**Šta admin panel prikazuje:**

```
┌─────────────────────────────────────────────────────────────────┐
│  Economy Switch — Team Accounts                    [+ Add new]  │
├──────┬──────────────────┬───────────────┬──────────┬───────────-┤
│  #   │  Name            │  Role         │  Status  │  Actions   │
├──────┼──────────────────┼───────────────┼──────────┼────────────┤
│  1   │  Ime Prezime     │  Developer    │  ✓ Active│  [Resend]  │
│  2   │  Ime Prezime     │  Designer     │  ✓ Active│  [Resend]  │
│  3   │  Ime Prezime     │  Sales        │  Pending │  [Resend]  │
│  ...                                                            │
│  10  │  Ime Prezime     │  Advisor      │  ✓ Active│  [Resend]  │
└─────────────────────────────────────────────────────────────────┘

[Export credentials CSV]   [Regenerate all invite links]
```

**Statusi:**
- `Pending` — nalog kreiran, osoba se još nije prijavila
- `Active` — osoba se prijavila i koristi nalog
- `Disabled` — privremeno deaktiviran

**Akcije po nalogu:**
- `Resend` — generiše novi magic link i kopira ga u clipboard (ili prikazuje u modalu)
- `Disable / Enable` — deaktivira ili reaktivira nalog (ne briše)
- `Reset password` — šalje email za reset lozinke

**Bulk akcije:**
- `Export credentials CSV` — download fajla sa svim emailovima, statusima, i instrukcijama
- `Regenerate all invite links` — generiše nove magic linkove za sve Pending naloge

---

### 19.4 Invite Email Template

Claude Code kreira HTML email template koji se koristi za slanje pristupa članovima tima. Vlasnik šalje ovaj email manuelno (ili kroz Supabase email service).

```html
<!-- templates/team-invite-email.html -->
<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; max-width: 480px; margin: 40px auto; color: #1a1a1a;">

  <h2 style="font-size: 22px; font-weight: 600;">You're on the Economy Switch team. 🎲</h2>

  <p>Hi {{full_name}},</p>

  <p>
    Your Economy Switch Pro account has been set up and is ready to use.
    You have full access to everything — no payment needed.
  </p>

  <p><strong>Your role:</strong> {{role_in_team}}</p>

  <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; margin: 24px 0;">
    <p style="margin: 0 0 8px; font-size: 13px; color: #666;">Your login details:</p>
    <p style="margin: 0;"><strong>Email:</strong> {{email}}</p>
    <p style="margin: 4px 0 0;"><strong>Temp password:</strong> {{temp_password}}</p>
    <p style="margin: 4px 0 0; font-size: 12px; color: #999;">Change your password after first login.</p>
  </div>

  <a href="{{magic_link}}"
     style="display: inline-block; background: #1D9E75; color: white; padding: 12px 24px;
            border-radius: 8px; text-decoration: none; font-weight: 600; margin-bottom: 8px;">
    Log in to Economy Switch →
  </a>

  <p style="font-size: 12px; color: #999; margin-top: 8px;">
    This link expires in 24 hours. After that, use your email and password to log in at
    <a href="{{app_url}}">{{app_url}}</a>.
  </p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">

  <h3 style="font-size: 16px;">How to use your account</h3>

  <ol style="font-size: 14px; line-height: 1.8; padding-left: 20px;">
    <li>Click the button above (or the link below) to log in for the first time.</li>
    <li>You'll skip the paywall — your Pro access is already active.</li>
    <li>Change your password in Settings after your first login.</li>
    <li>Use this account for testing, demos, or school presentations.</li>
    <li>Do not share your login credentials with anyone outside the team.</li>
  </ol>

  <p style="font-size: 13px; color: #666;">
    Questions? Reply to this email or contact the team owner directly.
  </p>

</body>
</html>
```

---

### 19.5 Kako podeliti naloge svom timu — Uputstvo za vlasnika

Sledeće uputstvo Claude Code kreira kao poseban fajl `docs/TEAM-ACCOUNTS-GUIDE.md`:

```markdown
# Economy Switch — Tim Nalozi: Uputstvo za vlasnika

## Korak 1 — Pripremi podatke

Otvori `scripts/create-team-accounts.ts` i popuni niz `TEAM_MEMBERS`:

```typescript
const TEAM_MEMBERS = [
  { email: 'marko@firma.com',   full_name: 'Marko Marković',  role_in_team: 'Developer'    },
  { email: 'ana@firma.com',     full_name: 'Ana Anić',        role_in_team: 'Designer'     },
  // ... ostali članovi
]
```

## Korak 2 — Pokreni skriptu

```bash
npx tsx scripts/create-team-accounts.ts
```

Skripta će ispisati u terminal:
- Email svake osobe
- Privremenu lozinku
- Magic link (važi 24h)
- Potvrdu da je Pro plan aktiviran

**Sačuvaj ovaj ispis odmah** — prikazuje se samo jednom.

## Korak 3 — Pošalji pristup

Za svakog člana tima:

1. Otvori email template iz `templates/team-invite-email.html`
2. Zameni `{{full_name}}`, `{{email}}`, `{{temp_password}}`, `{{magic_link}}`, `{{app_url}}`
3. Pošalji sa svog email klijenta

**Ili:** Koristi admin panel na `/admin/team`:
- Klikni `[Resend]` pored osobe → magic link se kopira u clipboard
- Pošalji link ručno kroz email, Slack, WhatsApp ili Viber

## Korak 4 — Pratenje prihvatanja

Na `/admin/team` možeš videti ko se prijavio:
- `Pending` = link poslat, osoba još nije kliknula
- `Active` = osoba se uspešno prijavila

Ako neko nije prihvatio u roku od 24h:
- Klikni `[Resend]` → novi magic link se generiše
- Pošalji novi link istoj osobi

## Upravljanje nalozima

### Ako neko napusti tim:
```
Admin panel → klikni [Disable] pored osobe
→ Nalog postaje neaktivan, osoba se ne može prijaviti
→ Pro plan se deaktivira
```

### Ako trebaš dodati novog člana:
```
Admin panel → [+ Add new]
→ Unesi ime, email, ulogu
→ Sistem kreira nalog i generiše magic link
→ Pošalji link novom članu
```

### Ako neko zaboravi lozinku:
```
Admin panel → [Reset password] pored osobe
→ Supabase šalje email za reset lozinke direktno osobi
```

### Ako trebaš videti sve naloge odjednom:
```
Admin panel → [Export credentials CSV]
→ Download tabele sa svim emailovima, ulogama i statusima
→ Ne sadrži lozinke (iz bezbednosnih razloga)
```

## Šta svaki član tima može da radi

Svi tim nalozi imaju **Pro plan bez datuma isteka**. To znači:

| Funkcionalnost | Tim nalog |
|---|---|
| Singleplayer | ✓ |
| Multiplayer | ✓ |
| Social features | ✓ |
| Ad-free | ✓ |
| Unlimited question deck | ✓ |
| Advanced statistics | ✓ |
| Pristup paywallU | ✗ (preskače se automatski) |
| Paddle plaćanje | ✗ (nije potrebno) |

## Bezbednosna pravila

- Nikad ne deliti `SUPABASE_SERVICE_ROLE_KEY` van .env fajla
- Magic linkovi važe **24 sata** — ako isteknu, generisati nove
- Privremene lozinke saopštiti samo direktno osobi (ne javno)
- Tim nalozi su označeni u bazi kao `is_team_account: true` — ne treba da se kombinuju sa pravim korisničkim nalozima
- Ako posumnjate na kompromitovan nalog, odmah kliknite [Disable] u admin panelu
```

---

### 19.6 Route Guard za Tim Naloge — Preskoči Paywall

Tim nalozi imaju `is_team_account: true` u `user_metadata`. Koristiti ovo da se preskoči paywall i onboarding:

```typescript
// hooks/useUserPlan.ts
export function useUserPlan() {
  const { user } = useAuth()

  const isTeamAccount = user?.user_metadata?.is_team_account === true

  const { data: plan } = useQuery({
    queryKey: ['user-plan', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('user_plans')
        .select('plan, status, current_period_end')
        .eq('user_id', user!.id)
        .single()
      return data
    },
    enabled: !!user && !isTeamAccount,
  })

  if (isTeamAccount) {
    return { plan: 'pro', status: 'active', isTeamAccount: true }
  }

  return { plan: plan?.plan ?? 'free', status: plan?.status, isTeamAccount: false }
}

// U route guard logici:
// Ako isTeamAccount === true → preskoči /onboarding/* i /paywall → idi direktno na /start
```

---

### 19.7 Checklist — Tim Nalozi

Dodati u Definiciju "Gotovo" (Sekcija 17):

**Tim Nalozi:**
- [ ] `scripts/create-team-accounts.ts` postoji i uspešno kreira 10 naloga
- [ ] Svaki kreiran nalog ima Pro plan aktivan u `user_plans` tabeli
- [ ] Admin panel `/admin/team` dostupan samo `VITE_ADMIN_EMAIL` korisniku
- [ ] Admin panel prikazuje status svakog naloga (Pending / Active / Disabled)
- [ ] `[Resend]` dugme generiše novi magic link i kopira ga u clipboard
- [ ] `[Disable]` deaktivira nalog i Pro plan
- [ ] `[Export CSV]` download-uje tabelu sa nalozima
- [ ] Email template postoji u `templates/team-invite-email.html`
- [ ] `docs/TEAM-ACCOUNTS-GUIDE.md` postoji i tačno opisuje svaki korak
- [ ] Tim nalozi preskakuju `/onboarding/*` i `/paywall` automatski
- [ ] `is_team_account: true` metadata pravilno prepoznat u route guard-u

---

---

## 20. Resend Email Integracija

### 20.1 Zašto Resend

Resend je email platforma napravljena za developere koji koriste React stack. Direktno se integriše sa Supabase-om, podržava **React Email** templating (emailovi se pišu kao React komponente, verzionišu u git-u), ima nativne webhooks za praćenje dostavljivosti, i besplatni tier pokriva 3.000 emailova mesečno — dovoljno za MVP i rani rast Economy Switch-a.

Resend se koristi za **dva različita tipa emailova**:
1. **Auth emailovi** — OTP, reset lozinke, email verifikacija. Supabase ih šalje automatski, ali kroz Resend SMTP umesto sopstvenog servera.
2. **Transakcioni/product emailovi** — dobrodošlica, potvrda kupovine, obaveštenja, tim pozivnice. Šalju se eksplicitno iz Supabase Edge Functions.

---

### 20.2 Setup — Korak po korak

**Korak 1 — Nalog i API ključ**
```
1. Otvori nalog na resend.com (besplatno)
2. Verifikuj domenov (npr. ekonomyswitch.com ili economy-switch.rs):
   Dashboard → Domains → Add Domain
   Dodaj DNS zapise koje Resend generiše (SPF, DKIM, DMARC)
   Bez verifikovanog domena emailovi idu u spam.
3. Kreiraj API ključ:
   Dashboard → API Keys → Create API Key
   Permisije: "Sending access" (ne Full access)
4. Dodaj u .env:
   RESEND_API_KEY=re_XXXXXXXXXX   (server-side only, nikad VITE_ prefix)
```

**Korak 2 — Supabase + Resend SMTP (za Auth emailove)**
```
Supabase Dashboard → Project Settings → Auth → SMTP Settings

Popuni:
  Host:       smtp.resend.com
  Port:       465
  Username:   resend
  Password:   [RESEND_API_KEY]
  Sender:     Economy Switch <noreply@ekonomyswitch.com>

Klikni Save. Od sada svi Supabase auth emailovi (OTP, reset) idu kroz Resend.
```

**Korak 3 — Instalacija paketa**
```bash
npm install resend @react-email/components
npm install -D @react-email/render
```

**Korak 4 — Folder struktura za emailove**
```
src/
  emails/
    components/
      EmailLayout.tsx       ← shared layout (logo, footer)
      EmailButton.tsx       ← branded CTA dugme
    templates/
      OtpEmail.tsx          ← OTP verifikacija
      WelcomeEmail.tsx      ← dobrodošlica posle registracije
      TrialStartedEmail.tsx ← početak 14-dnevnog triala
      PurchaseEmail.tsx     ← potvrda kupovine Pro plana
      PasswordResetEmail.tsx← reset lozinke
      TeamInviteEmail.tsx   ← pozivnica za tim nalog
      PaymentFailedEmail.tsx← neuspešno plaćanje
      TrialEndingEmail.tsx  ← upozorenje 3 dana pre kraja triala

supabase/
  functions/
    send-email/
      index.ts              ← Edge Function za slanje emailova
```

---

### 20.3 Shared Layout Komponenta

Svaki email koristi isti layout — logo, footer, boje iz branda:

```tsx
// src/emails/components/EmailLayout.tsx
import {
  Body, Container, Head, Html, Img,
  Preview, Section, Text, Hr, Link
} from '@react-email/components'

interface EmailLayoutProps {
  preview: string
  children: React.ReactNode
}

const brandGreen = '#1D9E75'
const bgColor    = '#f9fafb'
const textColor  = '#1a1a1a'
const mutedColor = '#6b7280'

export function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: bgColor, fontFamily: 'sans-serif', margin: 0 }}>
        <Container style={{
          maxWidth: '560px', margin: '40px auto',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
        }}>

          {/* Header */}
          <Section style={{ backgroundColor: brandGreen, padding: '24px 32px' }}>
            {/* Logo iz public foldera — koristiti apsolutni URL nakon deploya */}
            <Text style={{ color: '#ffffff', fontSize: '20px', fontWeight: '700', margin: 0 }}>
              Economy Switch
            </Text>
          </Section>

          {/* Content */}
          <Section style={{ padding: '32px' }}>
            {children}
          </Section>

          {/* Footer */}
          <Hr style={{ borderColor: '#e5e7eb', margin: 0 }} />
          <Section style={{ padding: '20px 32px', backgroundColor: bgColor }}>
            <Text style={{ color: mutedColor, fontSize: '12px', margin: 0, textAlign: 'center' }}>
              Economy Switch · Srbija{'\n'}
              <Link href="{{unsubscribe_url}}" style={{ color: mutedColor }}>
                Unsubscribe
              </Link>
              {' · '}
              <Link href="https://ekonomyswitch.com/privacy" style={{ color: mutedColor }}>
                Privacy Policy
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Reusable CTA dugme
export function EmailButton({ href, children }: { href: string; children: string }) {
  return (
    <Section style={{ textAlign: 'center', margin: '24px 0' }}>
      <Link href={href} style={{
        backgroundColor: '#1D9E75',
        color: '#ffffff',
        padding: '12px 28px',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '15px',
        textDecoration: 'none',
        display: 'inline-block',
      }}>
        {children}
      </Link>
    </Section>
  )
}
```

---

### 20.4 Email Templates — Svih 8

#### 1. OTP Email

```tsx
// src/emails/templates/OtpEmail.tsx
import { Text, Section } from '@react-email/components'
import { EmailLayout } from '../components/EmailLayout'

interface OtpEmailProps {
  otp: string
  userEmail: string
  expiresInMinutes: number
}

export function OtpEmail({ otp, userEmail, expiresInMinutes = 10 }: OtpEmailProps) {
  return (
    <EmailLayout preview={`Your Economy Switch code: ${otp}`}>
      <Text style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>
        Your verification code
      </Text>
      <Text style={{ color: '#6b7280', marginBottom: '24px' }}>
        Enter this code to verify {userEmail}
      </Text>

      {/* OTP prikaz */}
      <Section style={{
        backgroundColor: '#f3f4f6',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        marginBottom: '24px',
      }}>
        <Text style={{
          fontSize: '36px', fontWeight: '800',
          letterSpacing: '12px', color: '#1D9E75', margin: 0,
        }}>
          {otp}
        </Text>
      </Section>

      <Text style={{ color: '#6b7280', fontSize: '13px' }}>
        This code expires in {expiresInMinutes} minutes.
        If you didn't request this, you can safely ignore this email.
      </Text>
    </EmailLayout>
  )
}
```

---

#### 2. Welcome Email

```tsx
// src/emails/templates/WelcomeEmail.tsx
import { Text } from '@react-email/components'
import { EmailLayout, EmailButton } from '../components/EmailLayout'

interface WelcomeEmailProps {
  firstName: string
  startUrl: string
}

export function WelcomeEmail({ firstName, startUrl }: WelcomeEmailProps) {
  return (
    <EmailLayout preview={`Welcome to Economy Switch, ${firstName}!`}>
      <Text style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>
        Welcome, {firstName}. 🎲
      </Text>
      <Text style={{ color: '#374151', lineHeight: '1.7', marginBottom: '8px' }}>
        Your account is ready. Economy Switch is waiting.
      </Text>
      <Text style={{ color: '#374151', lineHeight: '1.7', marginBottom: '24px' }}>
        You're about to play the only board game where understanding money
        is your competitive advantage. Two economies, one board, one winner.
      </Text>

      <EmailButton href={startUrl}>Start playing →</EmailButton>

      <Text style={{ color: '#6b7280', fontSize: '13px', marginTop: '24px' }}>
        Questions? Just reply to this email — we read every message.
      </Text>
    </EmailLayout>
  )
}
```

---

#### 3. Trial Started Email

```tsx
// src/emails/templates/TrialStartedEmail.tsx
import { Text, Hr } from '@react-email/components'
import { EmailLayout, EmailButton } from '../components/EmailLayout'

interface TrialStartedEmailProps {
  firstName: string
  trialEndsAt: string   // formatted date string
  dashboardUrl: string
}

export function TrialStartedEmail({ firstName, trialEndsAt, dashboardUrl }: TrialStartedEmailProps) {
  return (
    <EmailLayout preview="Your 14-day Pro trial has started">
      <Text style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>
        Your Pro trial is live, {firstName}.
      </Text>
      <Text style={{ color: '#374151', lineHeight: '1.7', marginBottom: '20px' }}>
        You have full access to everything — multiplayer, social features,
        unlimited questions, and no ads. Explore freely for the next 14 days.
      </Text>

      <Hr style={{ borderColor: '#e5e7eb', margin: '20px 0' }} />

      <Text style={{ fontSize: '14px', color: '#374151', marginBottom: '4px' }}>
        <strong>Trial ends:</strong> {trialEndsAt}
      </Text>
      <Text style={{ fontSize: '13px', color: '#6b7280', marginBottom: '24px' }}>
        No charge until then. Cancel anytime — no questions asked.
      </Text>

      <EmailButton href={dashboardUrl}>Go to your account →</EmailButton>
    </EmailLayout>
  )
}
```

---

#### 4. Purchase Confirmation Email

```tsx
// src/emails/templates/PurchaseEmail.tsx
import { Text, Hr, Row, Column, Section } from '@react-email/components'
import { EmailLayout, EmailButton } from '../components/EmailLayout'

interface PurchaseEmailProps {
  firstName: string
  planName: string
  amount: string          // npr. "€5.00"
  billingCycle: string    // npr. "Annual"
  nextBillingDate: string
  receiptUrl: string
  startUrl: string
}

export function PurchaseEmail({
  firstName, planName, amount, billingCycle,
  nextBillingDate, receiptUrl, startUrl
}: PurchaseEmailProps) {
  return (
    <EmailLayout preview={`Payment confirmed — ${planName} plan activated`}>
      <Text style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>
        You're in, {firstName}. 🎉
      </Text>
      <Text style={{ color: '#374151', lineHeight: '1.7', marginBottom: '24px' }}>
        Your {planName} plan is active. Full access, no ads, and everything else.
      </Text>

      {/* Receipt box */}
      <Section style={{
        backgroundColor: '#f9fafb', borderRadius: '8px',
        padding: '16px 20px', marginBottom: '24px',
      }}>
        <Row>
          <Column><Text style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>Plan</Text></Column>
          <Column style={{ textAlign: 'right' }}>
            <Text style={{ margin: 0, fontSize: '13px', fontWeight: '600' }}>{planName}</Text>
          </Column>
        </Row>
        <Row>
          <Column><Text style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>Amount</Text></Column>
          <Column style={{ textAlign: 'right' }}>
            <Text style={{ margin: 0, fontSize: '13px', fontWeight: '600' }}>{amount}</Text>
          </Column>
        </Row>
        <Row>
          <Column><Text style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>Billing</Text></Column>
          <Column style={{ textAlign: 'right' }}>
            <Text style={{ margin: 0, fontSize: '13px', fontWeight: '600' }}>{billingCycle}</Text>
          </Column>
        </Row>
        <Hr style={{ borderColor: '#e5e7eb', margin: '12px 0' }} />
        <Row>
          <Column><Text style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>Next billing</Text></Column>
          <Column style={{ textAlign: 'right' }}>
            <Text style={{ margin: 0, fontSize: '13px', fontWeight: '600' }}>{nextBillingDate}</Text>
          </Column>
        </Row>
      </Section>

      <EmailButton href={startUrl}>Start playing →</EmailButton>

      <Text style={{ textAlign: 'center', fontSize: '13px', color: '#6b7280', marginTop: '12px' }}>
        <a href={receiptUrl} style={{ color: '#1D9E75' }}>View receipt</a>
        {' · '}
        Manage subscription in your account settings
      </Text>
    </EmailLayout>
  )
}
```

---

#### 5. Password Reset Email

```tsx
// src/emails/templates/PasswordResetEmail.tsx
import { Text } from '@react-email/components'
import { EmailLayout, EmailButton } from '../components/EmailLayout'

interface PasswordResetEmailProps {
  resetUrl: string
  expiresInMinutes: number
}

export function PasswordResetEmail({ resetUrl, expiresInMinutes = 60 }: PasswordResetEmailProps) {
  return (
    <EmailLayout preview="Reset your Economy Switch password">
      <Text style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>
        Reset your password
      </Text>
      <Text style={{ color: '#374151', lineHeight: '1.7', marginBottom: '24px' }}>
        We received a request to reset your password. Click the button below
        to choose a new one. This link expires in {expiresInMinutes} minutes.
      </Text>

      <EmailButton href={resetUrl}>Reset password →</EmailButton>

      <Text style={{ color: '#6b7280', fontSize: '13px', marginTop: '24px' }}>
        If you didn't request a password reset, ignore this email.
        Your password will not change.
      </Text>
    </EmailLayout>
  )
}
```

---

#### 6. Team Invite Email

```tsx
// src/emails/templates/TeamInviteEmail.tsx
import { Text, Hr, Section } from '@react-email/components'
import { EmailLayout, EmailButton } from '../components/EmailLayout'

interface TeamInviteEmailProps {
  fullName: string
  roleInTeam: string
  email: string
  tempPassword: string
  magicLink: string
  appUrl: string
}

export function TeamInviteEmail({
  fullName, roleInTeam, email, tempPassword, magicLink, appUrl
}: TeamInviteEmailProps) {
  return (
    <EmailLayout preview="You're on the Economy Switch team">
      <Text style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>
        You're on the team. 🎲
      </Text>
      <Text style={{ color: '#374151', lineHeight: '1.7', marginBottom: '8px' }}>
        Hi {fullName}, your Economy Switch Pro account is ready.
        You have full access — no payment needed.
      </Text>
      <Text style={{ color: '#6b7280', fontSize: '13px', marginBottom: '20px' }}>
        Your role: <strong style={{ color: '#1a1a1a' }}>{roleInTeam}</strong>
      </Text>

      <Section style={{
        backgroundColor: '#f3f4f6', borderRadius: '8px',
        padding: '16px 20px', marginBottom: '24px',
      }}>
        <Text style={{ margin: '0 0 4px', fontSize: '13px', color: '#6b7280' }}>
          Login details:
        </Text>
        <Text style={{ margin: '4px 0', fontSize: '14px' }}>
          <strong>Email:</strong> {email}
        </Text>
        <Text style={{ margin: '4px 0 0', fontSize: '14px' }}>
          <strong>Temp password:</strong> {tempPassword}
        </Text>
        <Text style={{ margin: '8px 0 0', fontSize: '12px', color: '#9ca3af' }}>
          Change your password after first login.
        </Text>
      </Section>

      <EmailButton href={magicLink}>Log in to Economy Switch →</EmailButton>

      <Text style={{ color: '#6b7280', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>
        This link expires in 24 hours. After that, log in at{' '}
        <a href={appUrl} style={{ color: '#1D9E75' }}>{appUrl}</a>
      </Text>

      <Hr style={{ borderColor: '#e5e7eb', margin: '24px 0 16px' }} />

      <Text style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
        How to use your account:
      </Text>
      <Text style={{ fontSize: '13px', color: '#374151', lineHeight: '1.8', margin: 0 }}>
        1. Click the button above to log in for the first time.<br />
        2. You'll skip the paywall — your Pro access is already active.<br />
        3. Change your password in Settings after first login.<br />
        4. Use this account for testing, demos, and school presentations.<br />
        5. Don't share your credentials with anyone outside the team.
      </Text>
    </EmailLayout>
  )
}
```

---

#### 7. Payment Failed Email

```tsx
// src/emails/templates/PaymentFailedEmail.tsx
import { Text } from '@react-email/components'
import { EmailLayout, EmailButton } from '../components/EmailLayout'

interface PaymentFailedEmailProps {
  firstName: string
  amount: string
  updatePaymentUrl: string
  gracePeriodDays: number
}

export function PaymentFailedEmail({
  firstName, amount, updatePaymentUrl, gracePeriodDays = 7
}: PaymentFailedEmailProps) {
  return (
    <EmailLayout preview="Action needed — payment unsuccessful">
      <Text style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>
        We couldn't process your payment, {firstName}.
      </Text>
      <Text style={{ color: '#374151', lineHeight: '1.7', marginBottom: '8px' }}>
        Your payment of <strong>{amount}</strong> for Economy Switch Pro did not go through.
        This can happen when a card expires or has insufficient funds.
      </Text>
      <Text style={{ color: '#374151', lineHeight: '1.7', marginBottom: '24px' }}>
        Your account will stay active for {gracePeriodDays} more days.
        Update your payment method to keep uninterrupted access.
      </Text>

      <EmailButton href={updatePaymentUrl}>Update payment method →</EmailButton>

      <Text style={{ color: '#6b7280', fontSize: '13px', marginTop: '20px' }}>
        If you have questions about your payment, just reply to this email.
      </Text>
    </EmailLayout>
  )
}
```

---

#### 8. Trial Ending Soon Email (3 dana pre isteka)

```tsx
// src/emails/templates/TrialEndingEmail.tsx
import { Text } from '@react-email/components'
import { EmailLayout, EmailButton } from '../components/EmailLayout'

interface TrialEndingEmailProps {
  firstName: string
  trialEndsAt: string
  upgradeUrl: string
  planPrice: string   // npr. "€5/year"
}

export function TrialEndingEmail({
  firstName, trialEndsAt, upgradeUrl, planPrice
}: TrialEndingEmailProps) {
  return (
    <EmailLayout preview={`Your trial ends on ${trialEndsAt} — keep your Pro access`}>
      <Text style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>
        3 days left in your trial, {firstName}.
      </Text>
      <Text style={{ color: '#374151', lineHeight: '1.7', marginBottom: '8px' }}>
        Your Economy Switch Pro trial ends on <strong>{trialEndsAt}</strong>.
        After that, your account switches to the free plan.
      </Text>
      <Text style={{ color: '#374151', lineHeight: '1.7', marginBottom: '24px' }}>
        Keep multiplayer, social features, and an ad-free experience for{' '}
        <strong>{planPrice}</strong> — less than a coffee.
      </Text>

      <EmailButton href={upgradeUrl}>Keep Pro access — {planPrice} →</EmailButton>

      <Text style={{ color: '#6b7280', fontSize: '13px', marginTop: '16px', textAlign: 'center' }}>
        If you don't upgrade, you'll automatically switch to the free plan.
        No charge.
      </Text>
    </EmailLayout>
  )
}
```

---

### 20.5 Supabase Edge Function — Email Sender

Centralni email sender koji koriste svi trigger-i:

```typescript
// supabase/functions/send-email/index.ts
import { serve } from 'https://deno.land/std/http/server.ts'
import { Resend } from 'npm:resend'
import { render } from 'npm:@react-email/render'

// Import templates (kompajlovati u Edge Function bundle)
import { OtpEmail }          from './templates/OtpEmail.tsx'
import { WelcomeEmail }      from './templates/WelcomeEmail.tsx'
import { TrialStartedEmail } from './templates/TrialStartedEmail.tsx'
import { PurchaseEmail }     from './templates/PurchaseEmail.tsx'
import { TeamInviteEmail }   from './templates/TeamInviteEmail.tsx'
import { PaymentFailedEmail }from './templates/PaymentFailedEmail.tsx'
import { TrialEndingEmail }  from './templates/TrialEndingEmail.tsx'

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))
const FROM   = 'Economy Switch <noreply@ekonomyswitch.com>'

type EmailType =
  | 'otp' | 'welcome' | 'trial_started' | 'purchase'
  | 'team_invite' | 'payment_failed' | 'trial_ending'

serve(async (req) => {
  // Verifikacija — samo interni Supabase pozivi
  const authHeader = req.headers.get('Authorization')
  if (authHeader !== `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { type, to, data }: { type: EmailType; to: string; data: Record<string, unknown> } =
    await req.json()

  let subject: string
  let html: string

  switch (type) {
    case 'otp':
      subject = `${data.otp} — Your Economy Switch code`
      html = render(OtpEmail({ otp: data.otp as string, userEmail: to, expiresInMinutes: 10 }))
      break

    case 'welcome':
      subject = `Welcome to Economy Switch, ${data.firstName}!`
      html = render(WelcomeEmail({ firstName: data.firstName as string, startUrl: data.startUrl as string }))
      break

    case 'trial_started':
      subject = 'Your 14-day Pro trial has started'
      html = render(TrialStartedEmail({
        firstName:    data.firstName as string,
        trialEndsAt:  data.trialEndsAt as string,
        dashboardUrl: data.dashboardUrl as string,
      }))
      break

    case 'purchase':
      subject = `Payment confirmed — ${data.planName} plan activated`
      html = render(PurchaseEmail({
        firstName:       data.firstName as string,
        planName:        data.planName as string,
        amount:          data.amount as string,
        billingCycle:    data.billingCycle as string,
        nextBillingDate: data.nextBillingDate as string,
        receiptUrl:      data.receiptUrl as string,
        startUrl:        data.startUrl as string,
      }))
      break

    case 'team_invite':
      subject = "You're on the Economy Switch team"
      html = render(TeamInviteEmail({
        fullName:     data.fullName as string,
        roleInTeam:   data.roleInTeam as string,
        email:        to,
        tempPassword: data.tempPassword as string,
        magicLink:    data.magicLink as string,
        appUrl:       data.appUrl as string,
      }))
      break

    case 'payment_failed':
      subject = 'Action needed — your payment was unsuccessful'
      html = render(PaymentFailedEmail({
        firstName:        data.firstName as string,
        amount:           data.amount as string,
        updatePaymentUrl: data.updatePaymentUrl as string,
        gracePeriodDays:  7,
      }))
      break

    case 'trial_ending':
      subject = `Your trial ends in 3 days — ${data.trialEndsAt}`
      html = render(TrialEndingEmail({
        firstName:   data.firstName as string,
        trialEndsAt: data.trialEndsAt as string,
        upgradeUrl:  data.upgradeUrl as string,
        planPrice:   data.planPrice as string,
      }))
      break

    default:
      return new Response('Unknown email type', { status: 400 })
  }

  const { data: result, error } = await resend.emails.send({ from: FROM, to, subject, html })

  if (error) {
    console.error('Resend error:', error)
    return new Response(JSON.stringify({ error }), { status: 500 })
  }

  return new Response(JSON.stringify({ id: result?.id }), { status: 200 })
})
```

**Deploy Edge Function:**
```bash
supabase functions deploy send-email
supabase secrets set RESEND_API_KEY=re_XXXXXXXXXX
```

---

### 20.6 Helper — Slanje emailova iz aplikacije

```typescript
// src/lib/email.ts
// Koristiti samo server-side (Supabase Edge Functions ili API routes)

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function sendEmail(
  type: string,
  to: string,
  data: Record<string, unknown>
) {
  const { error } = await supabase.functions.invoke('send-email', {
    body: { type, to, data },
  })
  if (error) throw error
}

// Konkretni helperi — čisti API za svaki email tip:

export const Emails = {
  sendOtp: (to: string, otp: string) =>
    sendEmail('otp', to, { otp }),

  sendWelcome: (to: string, firstName: string) =>
    sendEmail('welcome', to, {
      firstName,
      startUrl: `${process.env.APP_URL}/start`,
    }),

  sendTrialStarted: (to: string, firstName: string, trialEndsAt: Date) =>
    sendEmail('trial_started', to, {
      firstName,
      trialEndsAt: trialEndsAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      dashboardUrl: `${process.env.APP_URL}/start`,
    }),

  sendPurchaseConfirmation: (to: string, data: {
    firstName: string
    planName: string
    amount: string
    nextBillingDate: Date
    receiptUrl: string
  }) =>
    sendEmail('purchase', to, {
      ...data,
      billingCycle: 'Annual',
      nextBillingDate: data.nextBillingDate.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      }),
      startUrl: `${process.env.APP_URL}/start`,
    }),

  sendTeamInvite: (to: string, data: {
    fullName: string
    roleInTeam: string
    tempPassword: string
    magicLink: string
  }) =>
    sendEmail('team_invite', to, {
      ...data,
      appUrl: process.env.APP_URL!,
    }),

  sendPaymentFailed: (to: string, firstName: string, amount: string) =>
    sendEmail('payment_failed', to, {
      firstName,
      amount,
      updatePaymentUrl: `${process.env.APP_URL}/settings/billing`,
    }),

  sendTrialEnding: (to: string, firstName: string, trialEndsAt: Date) =>
    sendEmail('trial_ending', to, {
      firstName,
      trialEndsAt: trialEndsAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      upgradeUrl: `${process.env.APP_URL}/paywall`,
      planPrice: '€5/year',
    }),
}
```

---

### 20.7 Kada se koji email šalje — Trigger Mapa

| Email | Okidač | Gde se poziva |
|---|---|---|
| `otp` | Registracija ili OAuth login | Supabase Auth Hook (automatski) |
| `welcome` | OTP uspešno verifikovan (novi korisnik) | `/verify` route — posle `verifyOtp()` |
| `trial_started` | Klik na "Start 14-day free trial" → Paddle trial kreiran | Paddle webhook: `subscription.created` + `trial_period` |
| `purchase` | Uspešno plaćanje Pro plana | Paddle webhook: `transaction.completed` |
| `team_invite` | Admin kreira tim nalog | `scripts/create-team-accounts.ts` |
| `payment_failed` | Paddle javi neuspešno plaćanje | Paddle webhook: `transaction.payment_failed` |
| `trial_ending` | 3 dana pre isteka triala | Scheduled Supabase cron job (svaki dan u 9h) |

---

### 20.8 Scheduled Job — Trial Ending Reminder

```sql
-- Supabase Dashboard → Database → Extensions → enable pg_cron
-- Zatim u SQL Editor:

SELECT cron.schedule(
  'trial-ending-reminder',     -- ime job-a
  '0 9 * * *',                 -- svaki dan u 09:00 UTC
  $$
    SELECT
      net.http_post(
        url := current_setting('app.supabase_url') || '/functions/v1/trial-ending-check',
        headers := jsonb_build_object(
          'Authorization', 'Bearer ' || current_setting('app.service_role_key'),
          'Content-Type', 'application/json'
        ),
        body := '{}'::jsonb
      )
  $$
);
```

```typescript
// supabase/functions/trial-ending-check/index.ts
// Pronalazi korisnike kojima trial ističe za tačno 3 dana i šalje email

serve(async () => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const threeDaysFromNow = new Date()
  threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3)

  // Uzmi korisnike čiji trial ističe za 3 dana (±12h prozor)
  const { data: users } = await supabase
    .from('user_plans')
    .select('user_id, trial_ends_at, auth.users(email, raw_user_meta_data)')
    .eq('plan', 'pro')
    .eq('status', 'active')
    .gte('trial_ends_at', new Date(threeDaysFromNow.getTime() - 12 * 3600000).toISOString())
    .lte('trial_ends_at', new Date(threeDaysFromNow.getTime() + 12 * 3600000).toISOString())

  for (const user of users ?? []) {
    await supabase.functions.invoke('send-email', {
      body: {
        type: 'trial_ending',
        to:   user.auth.users.email,
        data: {
          firstName:   user.auth.users.raw_user_meta_data?.full_name?.split(' ')[0] ?? 'there',
          trialEndsAt: new Date(user.trial_ends_at).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'long', year: 'numeric'
          }),
          upgradeUrl: `${Deno.env.get('APP_URL')}/paywall`,
          planPrice:  '€5/year',
        },
      },
    })
  }

  return new Response('OK', { status: 200 })
})
```

---

### 20.9 Lokalni Preview Emailova

Resend dolazi sa preview serverom — emailovi se vide u browseru pre slanja:

```bash
# Instalacija
npm install -D @react-email/cli

# Pokretanje preview servera
npx react-email dev --dir src/emails/templates --port 3001

# Otvori http://localhost:3001
# Prikazuje sve templates sa live preview-om
# Svaka izmena u .tsx fajlu odmah se reflektuje
```

---

### 20.10 Env Varijable — Kompletan set za email

```bash
# .env (nikad commitovati)

# Resend
RESEND_API_KEY=re_XXXXXXXXXX          # server-side only

# Supabase (za Edge Functions)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...      # server-side only

# App
APP_URL=https://ekonomyswitch.com     # bez trailing slash
VITE_APP_URL=https://ekonomyswitch.com # client-side (za linkove u UI)

# Email
EMAIL_FROM=Economy Switch <noreply@ekonomyswitch.com>
```

---

### 20.11 Checklist — Resend Email Integracija

Dodati u Definiciju "Gotovo" (Sekcija 17):

**Email infrastruktura:**
- [ ] Resend nalog kreiran, domen verifikovan (SPF, DKIM, DMARC DNS zapisi)
- [ ] Supabase SMTP podešen da koristi Resend (za auth emailove)
- [ ] `RESEND_API_KEY` dodat u Supabase Edge Function Secrets
- [ ] Edge Function `send-email` deployana i testirana

**Templates:**
- [ ] `EmailLayout.tsx` — shared layout sa logom i footerom iz brand materijala
- [ ] `OtpEmail.tsx` — prikazuje 6-cifreni kod vizuelno istaknuto
- [ ] `WelcomeEmail.tsx` — šalje se odmah posle OTP verifikacije
- [ ] `TrialStartedEmail.tsx` — šalje se na Paddle `subscription.created` webhook
- [ ] `PurchaseEmail.tsx` — šalje se na Paddle `transaction.completed` webhook
- [ ] `PasswordResetEmail.tsx` — koristi Supabase reset link
- [ ] `TeamInviteEmail.tsx` — šalje se iz `create-team-accounts.ts` skripte
- [ ] `PaymentFailedEmail.tsx` — šalje se na Paddle `transaction.payment_failed` webhook
- [ ] `TrialEndingEmail.tsx` — šalje se 3 dana pre isteka triala

**Trigger logika:**
- [ ] Welcome email se šalje posle prvog uspešnog OTP-a (novi korisnik)
- [ ] Trial started email se šalje pri Paddle trial webhook-u
- [ ] Purchase email se šalje pri Paddle payment webhook-u
- [ ] Payment failed email se šalje pri Paddle failure webhook-u
- [ ] Trial ending cron job podešen (svaki dan 09:00 UTC)
- [ ] Team invite email se šalje iz create-team-accounts skripte

**Testiranje:**
- [ ] Lokalni preview server (`npx react-email dev`) radi za sve templates
- [ ] Test email poslan na sopstvenu adresu za svaki tip
- [ ] Resend dashboard prikazuje deliverability statistiku
- [ ] Emailovi ne završavaju u spam-u (verifikovan domen)

---

*Kraj PRD — verzija 3.2*  
*Economy Switch · React + Vite · Tailwind · Supabase · Paddle · Resend*  
*April 2026*