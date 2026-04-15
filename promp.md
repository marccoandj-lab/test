Ovaj plan je strukturiran za direktno izvršavanje od strane AI code assistant-a. Svi zahtevi su tehnički razrađeni, usklađeni sa poslatom dokumentacijom (Pravilnik ES.docx, Switch Kompanijski Izveštaj.pdf) i optimizovani za produkciju.
📦 1. ARHITEKTURA & TOK IGRE
Quiz Mode je potpuno nezavisan modul (ne deli state, rute niti komponente sa Singleplayer/Multiplayer). Tok je linearan i deterministički:
✅ Provera dnevnog limita (max 4/dan)
🎲 50/50 RANDOM IZBOR TABLI (blue ili green)
⏱️ 3s Cooldown Overlay
🟦/🟩 Phase 1 → 8 pitanja iz izabrane teme
🔄 SWOT Inter-phase → 4 pitanja (fiksno ±35k)
🟩/🟦 Phase 2 → 8 pitanja iz SUPROTNE teme
📊 Summary Screen → Tačno/Netačno, Kapital → SRP, DB Update, Countdown do 00:00
🗄️ 2. SUPABASE SQL SCHEMA
Fajl: database_sql-scripts/09....sql
Napomena: attempt_date koristi lokalni YYYY-MM-DD format kako bi reset u 00:00 bio precizan po vremenskoj zoni korisnika.
📚 3. @rankedQuestions.ts INTEGRACIJA & LOGIKA
Fajl mora eksportovati niz u sledećem formatu:
Engine Logika:
Učitaj sve: import { questions } from '@rankedQuestions';
Phase 1: shuffle(questions.filter(q => q.theme === selectedTheme)).slice(0, 8)
SWOT: shuffle(questions.filter(q => q.theme === 'swot')).slice(0, 4)
Phase 2: shuffle(questions.filter(q => q.theme === oppositeTheme)).slice(0, 8)
Validacija: Ako < 8 pitanja po temi ili < 4 SWOT, baci dev warning i fallback na theme: 'any' pitanja. U produkciji garantovati ≥20 po temi.
🎲 4. 50/50 IZBOR TABLI (EKSPlicitno)
Pre svakog pokretanja, sistem nasumično bira početnu stranu:
Uticaj na igru:
🎨 UI Tema: Aktivira odgovarajuću animiranu pozadinu, paletu i ikonografiju pre prvog pitanja.
📦 Redosled: Phase 1 koristi izabranu temu, Phase 2 koristi suprotnu.
🔄 Determinizam: Tema se bira jednom po rundi i ne menja se tokom igre.
📝 UI Labela: Tokom cooldown-a prikazuje: "Počinješ na: 🔵 Linearna Ekonomija" ili "🟢 Cirkularna Ekonomija".
🎨 5. UI/UX DIZAJN & KOMPONENTE
(Referenca: Switch Kompanijski Izveštaj.pdf – EdTech fokus, ciljna grupa srednjoškolci/studenti, "Switch" branding, istorijske ličnosti na novčanicama, čitljiv i moderan dizajn.)
Dizajn principi:
🔵 Blue Theme (Linear Economy): Gradijenti #0F172A → #1E3A8A, geometrijski/talasasti animirani pozadinski slojevi, akcenti u #38BDF8. Reflektuje "profit, rast, linearnu ekonomiju".
🟢 Green Theme (Circular Economy): Gradijenti #064E3B → #10B981, organski/listasti SVG animacije, akcenti u #34D399. Reflektuje "održivost, cirkularnost, životnu sredinu".
Mikro-interakcije: framer-motion za slide-in pitanja, pulse na tačan odgovor, shake na netačan, glassmorphism kartice, progres prsten.
Branding: Suptilna "Switch" maskota u ćoškovima, fontovi usklađeni sa app-om, novčani iznosi prikazani u stilu iz Pravilnik ES.docx (apoeni, format XX.XXX €).
Hijerarhija komponenti (/src/components/quiz/):
QuizEntryButton.tsx → Pozicioniran ispod Multiplayer na StartScreen
AnimatedBackground.tsx → Canvas/SVG layer sa tematskim animacijama
CooldownOverlay.tsx → 3s krug, tema labela
QuestionCard.tsx → Pitanje, 4 opcije, timer, trenutni kapital, progress bar
PhaseTransitionModal.tsx → SWOT uvod + vizuelni prelaz
QuizSummaryScreen.tsx → Summary, SRP konverzija, countdown do 00:00, CTA za povratak
⚙️ 6. STATE MANAGEMENT & SCORING
State Shape:
Scoring Logika (usklađeno sa Pravilnik ES rangiranjem i tvojim zahtevom):
Obična pitanja: correct ? +random(10k, 50k) : -random(10k, 50k)
SWOT pitanja: fixed ±35.000 €
Kapital ne pada ispod 0 (opcionalno: dozvoli minus, ali SRP = 0 ako < 0)
SRP Konverzija (Balansirana za max ~940k kapitala):
Kapital na kraju
Dodeljeni SRP
< 0
0
0 – 199.999
10
200k – 499.999
25
500k – 849.999
50
≥ 850.000
100 (Max)
🔄 7. DNEVNI LIMIT & RESET (00:00 LOKALNO)
Max: 4 pokušaja po danu
Reset: Fiksno u 00:00 lokalnog vremena korisnika
Countdown Logika:
ts
123456
UI Ponašanje:
Dok attempts_used < 4: Prikazuje Pokušaji: X/4
Nakon završetka igre (posebno ako je attempts_used === 4): Prikazuje Reset u: HH:MM:SS
DB update se dešava samo kada se summary faza završi (UPSERT sa ON CONFLICT)
📁 8. STRUKTURA FAJLOVA
🛠️ 9. KORAK-PO-KORAK VODIČ ZA IMPLEMENTACIJU
DB Setup: Pokreni SQL migraciju. Verifikuj RLS i indekse.
Question Engine: Implementiraj questionEngine.ts. Mapiraj @rankedQuestions.ts u 3 niza (blue/green/swot). Dodaj shuffle & slice logiku.
50/50 & State: Kreiraj useQuizGame.ts hook sa useReducer. Dodaj selectStartingTheme() i inicijalizuj state.
Daily Limit: Implementiraj checkDailyLimit() i recordCompletion(). Dodaj countdown timer sa setInterval.
UI/UX: Izradi komponente. Poveži AnimatedBackground sa theme state-om. Dodaj framer-motion tranzicije.
Routing: Poveži /quiz rutu. Ubaci dugme u StartScreen.
Testing: Proveri 4 pokušaja, reset u ponoć, 50/50 tema, scoring, SRP kalkulator, offline napuštanje.
⚠️ 10. EDGE CASES & VALIDATION CHECKLIST
Timezone koristi Intl.DateTimeFormat().resolvedOptions().timeZone za tačan lokalni 00:00
Spreči double-submit na summary ekranu (loading state + debounce)
Ako korisnik napusti app mid-game, pokušaj se ne broji dok se ne završi summary faza
Validiraj da @rankedQuestions.ts sadrži minimum 8 pitanja po temi + 4 SWOT. Fallback UI ako nema.
Novac formatiraj kao XX.XXX € (usklađeno sa Pravilnik ES)
RLS politike testirane sa anonimnim i auth korisnicima
Countdown se sinhronizuje sa lokalnim Date objektom, ne sa server time-om
Animacije ne smeju da blokiraju interakciju (pointer-events: none na background layer-ima)
UI je responsivan i prilagođen ciljnoj grupi iz Company Report (srednjoškolci, čitljivost, jasni kontrasti)
🚀 FINALNA DIREKTIVA ZA CODE ASSISTENT
⚠️ OBAVEZNO: Za realizaciju ovog moda moraš da koristiš Brainstorming skill, Frontend Design skill, i UI/UX Pro Max skill. Svaka komponenta mora biti vizuelno usklađena sa EconomySwitch brendom (referenca: Switch Kompanijski Izveštaj.pdf), animacije moraju biti fluidne i performantne, arhitektura koda modularna i spremna za produkciju. Ne praviti prečice. Implementiraj tačno po ovom planu, poštujući 50/50 logiku, @rankedQuestions.ts integraciju, scoring sistem i dnevni limit sa resetom u 00:00 lokalno.