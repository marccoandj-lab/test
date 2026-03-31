# EIB WEBAPP - Development & Technical Specification

Ovaj fajl služi kao "Source of Truth" za projekat EIB WEBAPP. Svi razvojni koraci i komunikacija sa AI asistentom moraju se pridržavati informacija u ovom dokumentu kako bi se izbegli nesporazumi i tehničke greške.

## 1. Pregled Projekta
EIB WEBAPP je edukativna "board game" aplikacija koja simulira finansijsko tržište i ekološku održivost. Igrači se kreću po mapi, rešavaju kvizove, investiraju kapital i upravljaju porezima u cilju dostizanja kapitala od 1,000,000.

## 2. Tehnološki Stack
- **Frontend**: React 19 (Vite), TypeScript 5.9
- **Styling**: Tailwind CSS 4.1.x
- **Multiplayer**: PeerJS (P2P komunikacija)
- **Backend/Server**: Express (Signaling server za PeerJS, Web Push servis i statički hosting)
- **Database/Auth**: Supabase (@supabase/supabase-js)
- **Notifications**: Web Push API, `web-push`, `node-cron`
- **PWA**: Service Workers, Manifest v3
- **Pakovanje**: `vite-plugin-singlefile` se koristi po potrebi za standalone verzije.

## 3. Struktura Projekta
- `server.js`: Glavni server fajl koji orkestrira PeerJS signaling, statički hosting i inicijalizaciju notifikacija.
- `src/App.tsx`: Glavni kontejner igre, state management i UI orkestracija.
- `src/services/`:
  - `MultiplayerManager.ts`: P2P logika. Host je "Source of Truth", dok klijenti šalju akcije.
  - `NotificationService.js`: Logika za pretplatu na push notifikacije i cron posao za periodične podsetnike.
- `src/components/`:
  - `GameMap.tsx`: Vizuelni prikaz table i animacija kretanja.
  - `GameModal.tsx` & `GameModalContainer.tsx`: Logika za polja (Kvizovi, Investicije, Porezi, Jail).
  - `Leaderboard.tsx`: Prikaz najboljih igrača iz baze.
  - `SettingsModal.tsx`: Podešavanja profila i notifikacija.
  - `StartScreen.tsx`: Login/Lobby interfejs.
  - `Sidebar.tsx`: Statistika igrača u realnom vremenu.
- `src/data/`:
  - `gameData.ts`: Definicije polja, kvizova i ishoda investicija.
  - `levelGenerator.ts`: Generator beskonačne mape.
- `public/`: Sadrži `sw.js` (Service Worker) i `manifest.json`.

## 4. Ključne Mehanike i Logika
### Multiplayer
- **P2P Model**: Koristi PeerJS. Host kreira sobu, klijenti se povezuju putem koda.
- **State Sync**: Sve promene idu kroz `multiplayer.sendAction`. Host obrađuje i šalje `STATE_UPDATE`.
- **Timers**: Implementiran `turnTimer` (60s) i `interactionTimer` (35s) za održavanje tempa igre.

### Push Notifikacije
- **Pretplata**: Korisnici se pretplaćuju putem Browser API-ja, a podaci se čuvaju u `push_subscriptions` tabeli.
- **Reminders**: `node-cron` na serveru proverava `notification_settings` svakih sat vremena i šalje nasumične motivacione poruke.

### Supabase Integracija
#### Tabela `profiles`
- `id` (uuid, primary key)
- `username` (text), `avatar_url` (text)
- `wins`, `games_played`, `total_capital` (int8)
- `character_usage`, `notification_settings` (jsonb)
- `stats`: `correct_quizzes`, `wrong_quizzes`, `investment_gains`, `investment_losses`, `jail_visits`, `jail_skips`, `auction_wins`, `taxes_paid`.

#### Tabela `push_subscriptions`
- `id` (serial, pk)
- `user_id` (uuid, references profiles)
- `subscription` (jsonb)

### Game Modes
- `finance`: Tamno plava tema (Slate-900).
- `sustainability`: Zelena tema (Emerald-950).

## 5. Pravila za Prevenciju Grešaka (Pravilo 0)
1. **Tipovi**: Uvek koristi `Player`, `GameState`, `NotificationSettings` iz `types/game.ts`.
2. **SFX**: Koristi globalnu `playSFX(type)` funkciju. Audio je u `/assets/sfx/`.
3. **Putanja**: Asseti se referenciraju iz `/assets/`.
4. **Responzivnost**: Koristi `showMobileSidebar` za ekrane < 768px.
5. **Jail**: Jailed igrači moraju da plate ili preskoče potez pre bacanja kocke.

## 6. Uputstva za AI Asistenta
- **Multiplayer State**: Uvek proveri kako akcija utiče na `GameState` u `MultiplayerManager`.
- **Estetika**: Glassmorphism i vibrantni gradijenti su standard.
- **Environment**: VAPID ključevi su neophodni za rad push notifikacija (proveri `.env`).

---
*Poslednja izmena: 2026-03-31*
