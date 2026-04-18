# EconomySwitch - Struktura i funkcionalnosti

Ovaj dokument pruža detaljan pregled svih fajlova i funkcionalnosti u aplikaciji EconomySwitch.

---

## 1. Korenski Direktorijum
- `server.js`: Node.js/Express server. Upravlja PeerJS signaling-om (uspostavljanje konekcije između igrača), statičkim hostingom (serviranje `dist` foldera) i periodičnim push notifikacijama (koristeći `node-cron`).
- `package.json`: Definiše sve zavisnosti projekta (React, Supabase, PeerJS, Tailwind, itd.) i skripte za pokretanje/build.
- `vite.config.ts`: Konfiguracija za Vite build alat.
- `tsconfig.json`: TypeScript konfiguracija.
- `index.html`: Glavni ulazni HTML fajl za SPA (Single Page Application).

---

## 2. Direktorijum `src/` (Izvorni kod)
- `main.tsx`: Ulazna tačka za React aplikaciju.
- `App.tsx`: Centralna komponenta. Upravlja rutingom, glavnim state-om igre, proverom autentifikacije i UI orkestracijom.
- `index.css`: Globalni CSS stilovi, importuje Tailwind direktive.

### `src/components/` (UI Komponente)
- `Auth.tsx`: Login/Registracija forma povezana sa Supabase.
- `Sidebar.tsx`: Navigacija, brzi pristup profilu, izlogovanje.
- `StartScreen.tsx`: Lobby ekran. Prikaz avatara, start igre, statistike igrača.
- `GameMap.tsx`: Vizuelni render mape. Logika za kretanje igrača po kockicama i animacije bacanja kockica.
- `GameModalContainer.tsx`: Centralna logika za prikaz modalnih prozora (Kvizovi, Porezi, itd.).
- `GameModal.tsx`: Generički UI kontejner za sadržaj modala.
- `Socials.tsx`: Upravljanje prijateljima, slanje pozivnica (Realtime).
- `Leaderboard.tsx`: Prikaz ranga igrača iz baze.
- `SettingsModal.tsx`: Podešavanje jezika (i18n) i push notifikacija.
- `EducationScreen.tsx`: Prikaz edukativnih materijala.
- `RankBadge.tsx`, `RankedLeaderboard.tsx`, `RankedRoadMap.tsx`: Komponente za rangirani sistem (Daily Challenges).
- `quiz/`: Pod-direktorijum sa komponentama za kviz sistem (`QuizGame.tsx`, `QuestionCard.tsx`, itd.).

### `src/services/` (Poslovna logika)
- `MultiplayerManager.ts`: Srce igre. Povezuje igrače preko PeerJS-a. Host peer je izvor istine. Upravlja akcijama (kretanje, transakcije, izlačenje karata).
- `NotificationService.js`: Logika za interakciju sa Web Push API-jem i servisom notifikacija.
- `ChallengeService.ts`: Upravljanje dnevnim izazovima i rangiranjem.

### `src/data/` (Podaci)
- `gameData.ts`: Centralno skladište pitanja, podataka o investicijama i lancu vrednosti.
- `levelGenerator.ts`: Logika za generisanje "beskonačne" mape.
- `avatars.ts`: Spisak dostupnih avatara.
- `rankedQuestions.ts`: Pitanja za rangirani mod.

### `src/utils/`
- `cn.ts`: Funkcija za spajanje Tailwind klasa.
- `format.ts`: Pomoćne funkcije za formatiranje valuta (kapitala).

### `src/types/`
- `game.ts`: Interfejsi za sve objekte u igri (Igrač, Karta, Polje, itd.).

### `src/lib/`
- `supabase.ts`: Inicijalizacija Supabase klijenta.

### `src/i18n/`
- `translations.ts`: Objekt sa svim prevodima za UI (srpski/engleski).

---

## 3. Baza podataka
- `database_sql_scripts/`: SQL skripte za setup Supabase tabele (profiles, push subscriptions, friends, invites, stats, quiz attempts).

---

## 4. Funkcionalnosti
- **Autentifikacija**: Supabase Auth.
- **P2P Multiplayer**: PeerJS.
- **Dinamika igre**: Beskonačna mapa, bacanje kockica, izvlačenje špilova.
- **Statistika**: RPC funkcija `increment_profile_stats` za atomične promene.
- **Notifikacije**: Web Push API (cron).
- **Lokalizacija**: i18n podrška.
