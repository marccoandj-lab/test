# EconomySwitch - Development & Technical Specification

Ovaj fajl služi kao "Source of Truth" za projekat EconomySwitch. Svi razvojni koraci i komunikacija sa AI asistentom moraju se pridržavati informacija u ovom dokumentu kako bi se izbegli nesporazumi i tehničke greške.

## 1. Pregled Projekta
EconomySwitch je edukativna "board game" aplikacija koja simulira finansijsko tržište i ekološku održivost. Igrači se kreću po beskonačnoj mapi, rešavaju kvizove, investiraju kapital i upravljaju porezima u cilju dostizanja kapitala od 1,000,000.

## 2. Tehnološki Stack
- **Frontend**: React 19 (Vite 7), TypeScript 5.9
- **Styling**: Tailwind CSS 4.1.x, Framer Motion (animacije)
- **Multiplayer**: PeerJS (P2P komunikacija), dedicated signaling server na Renderu
- **Backend/Server**: Express (Signaling server, Web Push servis i statički hosting)
- **Database/Auth**: Supabase (@supabase/supabase-js) sa Realtime podrškom
- **Notifications**: Web Push API, `web-push`, `node-cron` za periodične podsetnike
- **PWA**: Service Workers, Manifest v3
- **I18n**: Podrška za Engleski i Srpski jezik

## 3. Struktura Projekta
- `server.js`: Glavni server fajl koji orkestrira PeerJS signaling, statički hosting i inicijalizaciju notifikacija.
- `src/App.tsx`: Glavni kontejner igre, state management, auth i UI orkestracija.
- `src/services/`:
  - `MultiplayerManager.ts`: Kompleksna P2P logika. Host je "Source of Truth", upravlja špilovima (decks) i sinhronizacijom.
  - `NotificationService.js`: Server-side logika za push notifikacije i cron poslove.
- `src/components/`:
  - `GameMap.tsx`: Vizuelni prikaz table, animacija kretanja i dice roll.
  - `GameModalContainer.tsx`: Centralna logika za polja (Kvizovi, Investicije, Porezi, Jail).
  - `GameModal.tsx`: UI komponenta za prikaz sadržaja polja.
  - `StartScreen.tsx`: Lobby interfejs sa profilima i statistikama.
  - `Leaderboard.tsx`: Globalni rang igrača iz baze.
  - `Socials.tsx`: Sistem prijatelja, pretraga korisnika i slanje pozivnica za igru.
  - `EducationScreen.tsx`: Edukativni resursi.
  - `Auth.tsx`: Login i registracija korisnika preko Supabase.
  - `Sidebar.tsx`: Navigacija i brzi pristup profilu.
  - `SettingsModal.tsx`: Podešavanja jezika i notifikacija.
  - `LegalScreen.tsx`: TOS i Privacy Policy.
- `src/data/`:
  - `gameData.ts`: Centralni repozitorijum kvizova, investicija i lanca vrednosti.
  - `levelGenerator.ts`: Generator "beskonačne" mape.
  - `avatars.ts`: Definisanje dostupnih avatara.
- `src/i18n/`: `translations.ts` (prevodi za sve UI elemente).
- `src/lib/`: `supabase.ts` (inicijalizacija Supabase klijenta).
- `src/utils/`: `cn.ts` (Tailwind class merging), `format.ts` (formatiranje valuta).
- `src/types/`: `game.ts` (TypeScript interfejsi).
- `database_sql_scripts/`: SQL migracije za Supabase (01-07).

## 4. Ključne Mehanike i Logika
### Multiplayer & Infinite Map
- **P2P Model**: PeerJS povezuje igrače direktno. Host upravlja globalnim state-om.
- **Infinite Generation**: Mapa se dinamički proširuje kada bilo koji igrač priđe kraju trenutne dužine.
- **Deck Management**: Quizzes, Cost Analysis, Value Chain i Uljez se izvlače iz mešanih špilova (decks) kako bi se osigurala jedinstvenost pitanja.
- **Timers**: `turnTimer` (60s) i `interactionTimer` (35s) za održavanje tempa.

### Supabase Integracija & Stats
- **Atomic Increments**: Statistike profila se ažuriraju putem `increment_profile_stats` RPC funkcije kako bi se izbeglo gubljenje podataka pri paralelnim sesijama.
- **Realtime Invites**: Igrači primaju pozivnice za igru trenutno preko Supabase Realtime kanala.

### Push Notifikacije
- **VAPID Keys**: Obavezni za autentifikaciju push servisa.
- **Scheduled Reminders**: `node-cron` šalje motivacione poruke korisnicima u definisanim slotovima (npr. 09:00, 18:00).

### Game Modes
- `finance`: Tamno plava tema (Slate-900), fokus na kapitalu i tržištu.
- `sustainability`: Zelena tema (Emerald-950), fokus na cirkularnoj ekonomiji.

## 5. Tabela `profiles` (Schema)
- `id` (uuid, primary key)
- `display_id` (text, unique 6-char ID)
- `username` (text), `avatar_url` (text)
- `wins`, `games_played`, `total_capital` (bigint)
- `character_usage` (jsonb) - mapa korišćenja karaktera
- `notification_settings` (jsonb) - enabled, slots
- **Statistike (integer/bigint):**
  - `correct_quizzes`, `wrong_quizzes`
  - `cost_analysis_correct`, `cost_analysis_wrong`
  - `value_chain_correct`, `value_chain_wrong`
  - `uljez_correct`, `uljez_wrong`
  - `investment_gains`, `investment_losses`
  - `jail_visits`, `jail_skips`, `auction_wins`, `taxes_paid`
- `updated_at` (timestamptz)

## 6. Pravila za Razvoj (Pravilo 0)
1. **Tipovi**: Uvek koristi definisane interfejse iz `src/types/game.ts`.
2. **SFX**: Koristi globalnu `playSFX(type)` funkciju za zvučne efekte.
3. **Putanja**: Asseti su u `/public/assets/`, ali se u kodu referenciraju kao `/assets/`.
4. **Responzivnost**: Mobile-first pristup sa Tailwind klasama.
5. **Multiplayer State**: Svaka akcija koja menja kapital ili poziciju mora ići kroz `multiplayer.sendAction`.
6. **Statistike**: Koristi RPC `increment_profile_stats` za ažuriranje statistika u bazi.

## 7. Uputstva za AI Asistenta
- **Estetika**: Glassmorphism, vibrantni gradijenti i visoki kontrast su standard.
- **Environment**: Proveri `.env` za `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_VAPID_PUBLIC_KEY` i `VAPID_PRIVATE_KEY`.
- **Consistency**: Održavaj konzistentnost između koda i SQL skripti u `database_sql_scripts/`.

---
*Poslednja izmena: 2026-04-13*
