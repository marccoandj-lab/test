# EconomySwitch - Dokumentacija arhitekture i razvoja

Ovaj dokument definiše tehnički "Source of Truth" za **EconomySwitch**, edukativnu P2P aplikaciju koja integriše finansijsku simulaciju sa principima održivog razvoja.

## 1. Konceptualni okvir
EconomySwitch je distribuirana igra na ploči dizajnirana za edukaciju korisnika o funkcionisanju tržišta kapitala i ekološkoj odgovornosti. Igrački progres se ostvaruje kroz interakciju sa dinamički generisanom mapom, rešavanje edukativnih modula i upravljanje portfoliom.

## 2. Tehnološki stek
*   **Frontend**: React 19 (Vite 7), TypeScript 5.9, Tailwind CSS 4.1.x, Framer Motion (animacije).
*   **Komunikacija**: PeerJS za P2P sesije; Express signaling server na Render platformi.
*   **Infrastruktura i podaci**: Supabase (PostgreSQL, Realtime, Auth), Node.js (Web Push, Cron).
*   **PWA**: Service Worker manifest v3 za offline dostupnost.

## 3. Arhitektura sistema
*   **Multiplayer logika**: Bazirana na Peer-to-Peer modelu gde "Host" peer deluje kao autoritativni izvor stanja sesije, upravljajući sinhronizacijom špilova i akcijama igrača.
*   **Generisanje sveta**: Algoritam za dinamičko proširenje mape ("infinite map") baziran na poziciji igrača.
*   **Upravljanje stanjem**: Centralizovani state menadžment preko `App.tsx` sa obaveznom propagacijom akcija kroz `MultiplayerManager.ts`.

## 4. Šema baze podataka (`profiles` tabela)
Tabela `profiles` služi kao primarno skladište korisničkih podataka:
*   **Identifikacija**: `id` (UUID), `display_id` (6-char unique).
*   **Statistike**: `wins`, `games_played`, `total_capital` (BigInt), detaljne statistike po tipovima polja.
*   **Konfiguracija**: `notification_settings` (JSONB), `character_usage` (JSONB).

## 5. Razvojna pravila i standardi
1.  **Tipizacija**: Obavezna upotreba interfejsa iz `src/types/game.ts`.
2.  **Audio**: Centralizovan sistem kroz `playSFX(type)`.
3.  **Responzivnost**: Mobile-first Tailwind dizajn uz primenu glassmorphism estetike.
4.  **Integritet podataka**: Ažuriranje statistika isključivo putem RPC funkcije `increment_profile_stats` kako bi se osigurala atomičnost u distribuiranom okruženju.
5.  **Putanja resursa**: Svi asseti se referenciraju sa `/assets/` putanjom (mapirano na `/public/assets/`).

## 6. Operativne smernice
*   Sve promene u šemi baze moraju pratiti migracione skripte u `database_sql_scripts/`.
*   Konfiguracija okruženja (Supabase, VAPID ključevi) je obavezna za lokalni rad.
*   Konzistentnost između koda i SQL skripti je imperativ.
