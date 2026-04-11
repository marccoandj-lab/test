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

*Kraj PRD — verzija 3.0 FINALNA*  
*Economy Switch · React + Vite · Tailwind · Supabase · Paddle*  
*April 2026*