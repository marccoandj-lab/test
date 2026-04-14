# Product Requirements Document (PRD): Strategic Switch (Ranked Solo Mod) \- V3

## 1\. Uvod i Pregled Projekta

"Strategic Switch" je visoko-kompetitivni solo mod za digitalnu verziju igre **Economy Switch**. Fokus je na brzom, edukativnom iskustvu koje simulira prelazak sa linearne na cirkularnu ekonomiju kroz 16 pitanja i strateške SWOT analize.

## 2\. Korisničko Iskustvo i Tok Igre

### 2.1. Dnevni Limit i Pristup

* **Pravilo:** Svaki korisnik ima pravo na tačno **4 pokušaja dnevno**.  
* **Reset:** Brojač se resetuje u 00:00 prema lokalnom vremenu servera.

### 2.2. Inicijalizacija: 50/50 Start

Prilikom pokretanja moda, sistem nasumično dodeljuje startnu poziciju:

* **Plava Tabla (Linear):** Fokus na tradicionalnu ekonomiju.  
* **Zelena Tabla (Circular):** Fokus na održivost.  
* **Početni kapital:** Igrač uvek kreće sa **150.000 €**.

## 3\. Detaljne Funkcionalnosti Moda

### 3.1. Faza 1: Prvih 8 Pitanja

* **Struktura težine:** 3 Laka, 3 Srednja, 2 Teška.  
* **Matrica isplate i kazne:**  
  * Lako: \+10.000 € / \-5.000 €  
  * Srednje: \+20.000 € / \-10.000 €  
  * Teško: \+50.000 € / \-25.000 €

### 3.2. Most: SWOT Analiza (Core Mehanika)

* **Zadatak:** Klasifikovati scenario u S, W, O ili T kategoriju.  
* **Uslov za prolaz:** Vezati **3 tačna odgovora zaredom**.  
* **Kaznena mera:** Svaki netačan odgovor oduzima **35.000 €** i resetuje progres na 0/3.

### 3.3. Faza 2: Switch i Finalnih 8 Pitanja

* Automatski prelazak na suprotnu tablu nakon SWOT-a.  
* Cilj: Završiti 16\. pitanje sa saldom od **500.000 €**.

## 4\. Generisanje Sadržaja (AI Generator)

* **Kviz Pitanja:** AI mora generisati bazu od ukupno **160 pitanja**.  
  * **80 pitanja** za Plavu tablu (Linearna ekonomija).  
  * **80 pitanja** za Zelenu tablu (Cirkularna ekonomija).  
  * Pitanja moraju biti podeljena po težini (Lako/Srednje/Teško) u srazmeri 40/30/10 po tabli.  
* **SWOT Scenariji:** AI generiše set od 40 različitih scenarija za prelaznu fazu.

## 5\. Baza Podataka (Supabase Schema)

Za implementaciju ovog moda, kreiraju se sledeće tabele u Supabase-u:

\-- Tabela za pitanja

CREATE TABLE questions (

  id UUID PRIMARY KEY DEFAULT uuid\_generate\_v4(),

  category TEXT NOT NULL, \-- 'linear' ili 'circular'

  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),

  question\_text TEXT NOT NULL,

  correct\_answer TEXT NOT NULL,

  distractors TEXT\[\] NOT NULL,

  created\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()

);

\-- Tabela za SWOT scenarije

CREATE TABLE swot\_scenarios (

  id UUID PRIMARY KEY DEFAULT uuid\_generate\_v4(),

  scenario\_text TEXT NOT NULL,

  correct\_category TEXT CHECK (correct\_category IN ('S', 'W', 'O', 'T')),

  explanation TEXT

);

\-- Tabela za praćenje dnevnih pokušaja i RP

CREATE TABLE user\_ranked\_stats (

  user\_id UUID REFERENCES auth.users PRIMARY KEY,

  daily\_attempts\_left INTEGER DEFAULT 4,

  current\_rp INTEGER DEFAULT 0,

  last\_attempt\_date DATE DEFAULT CURRENT\_DATE

);

---

## 6\. Monetizacija

* **Čekovi za osiguranje:** Sprečavaju gubitak novca.  
* **Zatvorski Otkup (Revive):** 75.000 € za povratak iz bankrota.

