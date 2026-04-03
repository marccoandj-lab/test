-- 1. Dodavanje nedostajucih kolona u profiles tabelu
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS wins bigint DEFAULT 0,
ADD COLUMN IF NOT EXISTS games_played bigint DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_capital bigint DEFAULT 0,
ADD COLUMN IF NOT EXISTS character_usage jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS notification_settings jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS correct_quizzes integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS wrong_quizzes integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS investment_gains bigint DEFAULT 0,
ADD COLUMN IF NOT EXISTS investment_losses bigint DEFAULT 0,
ADD COLUMN IF NOT EXISTS jail_visits integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS jail_skips integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS auction_wins integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS taxes_paid integer DEFAULT 0;

-- 2. Omogucavanje RLS (Row Level Security) uskladu sa dobrim praksama
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Ciscenje starih polisa i postavljanje novih, ispravnih

-- Tabela mora biti citljiva svima (kako bi Leaderboard i P2P multiplayer radili)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone." 
ON public.profiles FOR SELECT 
USING (true);

-- Korisnik moze sam da ubaci/kreira svoj red u bazi na samom startu igranja (ukoliko nema triger vec)
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
CREATE POLICY "Users can insert their own profile." 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Korisnik moze uredjivati samo svoju evidenciju o sticanju para/sakupljenim statistikama
DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;
CREATE POLICY "Users can update own profile." 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);
