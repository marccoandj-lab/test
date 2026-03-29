# EIB WEBAPP - Development & Technical Specification

Ovaj fajl služi kao "Source of Truth" za projekat EIB WEBAPP. Svi razvojni koraci i komunikacija sa AI asistentom moraju se pridržavati informacija u ovom dokumentu kako bi se izbegli nesporazumi i tehničke greške.

## 1. Pregled Projekta
EIB WEBAPP je edukativna "board game" aplikacija koja simulira finansijsko tržište i ekološku održivost. Igrači se kreću po mapi, rešavaju kvizove, investiraju kapital i upravljaju porezima u cilju dostizanja kapitala od 1,000,000.

## 2. Tehnološki Stack
- **Frontend**: React 19 (Vite), TypeScript 5.9
- **Styling**: Tailwind CSS 4.1.x
- **Multiplayer**: PeerJS (P2P komunikacija)
- **Database/Auth**: Supabase (@supabase/supabase-js)
- **Server**: Express (Signaling server za PeerJS i statički hosting na Renderu)
- **Pakovanje**: `vite-plugin-singlefile` se koristi po potrebi za standalone verzije.

## 3. Struktura Projekta
- `src/App.tsx`: Glavni kontejner igre, state management i UI orkestracija.
- `src/services/MultiplayerManager.ts`: P2P logika. Host je "Source of Truth", dok klijenti šalju akcije.
- `src/components/`:
  - `GameMap.tsx`: Vizuelni prikaz table i animacija kretanja.
  - `GameModal.tsx`: Logika za polja (Kvizovi, Investicije, Porezi, Jail).
  - `StartScreen.tsx`: Login/Lobby interfejs.
  - `Sidebar.tsx`: Statistika igrača u realnom vremenu.
  - `Auth.tsx`: Supabase OAuth i Email login.
- `src/data/`:
  - `gameData.ts`: Kviz pitanja, ishodi investicija i definicije polja.
  - `levelGenerator.ts`: Generator beskonačne mape.

## 4. Ključne Mehanike i Logika
### Multiplayer
- **P2P Model**: Igra koristi PeerJS. Prvi igrač (Host) kreira sobu, ostali se povezuju putem 6-cifrenog koda.
- **State Sync**: Sve promene balansa ili pozicije u MP modu moraju ići kroz `multiplayer.sendAction`. Host obrađuje akciju i šalje `STATE_UPDATE` svim klijentima.
- **Beskonačna Mapa**: Host generiše nove delove mape kada se igrač približi kraju trenutne dužine.

### Supabase Integracija (Profiles Table)
Tabela `profiles` u Supabase-u **mora** sadržati sledeća polja:
- `id` (uuid, primary key)
- `username` (text)
- `avatar_url` (text)
- `wins` (int8)
- `games_played` (int8)
- `total_capital` (int8)
- `character_usage` (jsonb)
- `correct_quizzes` (int4)
- `wrong_quizzes` (int4)
- `investment_gains` (int8)
- `investment_losses` (int8)
- `jail_visits` (int4)
- `auction_wins` (int4)

### Game Modes
- `finance`: Tamno plava tema (Slate-900), fokus na klasične finansije.
- `sustainability`: Zelena tema (Emerald-950), fokus na ekologiju i održivi razvoj.

## 5. Pravila za Prevenciju Grešaka (Pravilo 0)
1. **Nikada ne pretpostavljaj tipove**: Uvek koristi `Player`, `Level`, `GameState` tipove definisane u `types/game.ts` ili `services/MultiplayerManager.ts`.
2. **SFX Upravljanje**: Audio fajlovi se nalaze u `/assets/sfx/`. Koristi globalnu `playSFX(type)` funkciju.
3. **Putanja do Sredstava**: Svi asseti (audio, slike) moraju se referencirati iz `/assets/`.
4. **Responzivnost**: Mobilni prikaz širine < 768px koristi `showMobileSidebar` state i specifične animacije.
5. **Jail Mehanika**: Jailed igrači ne mogu bacati kockice dok ne plate kaznu ili preskoče potez.

## 6. Uputstva za AI Asistenta
- **Bez pretpostavki**: Ako je logika nejasna u `App.tsx` (koji je centralni fajl), uvek traži uvid u `MultiplayerManager`.
- **Zadaci vezani za UI**: Koristi premium estetiku (glassmorphism, vibrant gradients) kao što je već implementirano.
- **TypeScript**: Uvek održavaj strogu tipizaciju, naročito u `multiplayer.sendAction` pozivima.

---
*Poslednja izmena: 2026-03-29*
