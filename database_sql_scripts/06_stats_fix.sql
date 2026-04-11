-- 06_stats_fix.sql
-- Dodavanje nedostajućih kolona za statistiku koje su dodate u kodu ali nedostaju u bazi
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS value_chain_correct integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS value_chain_wrong integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS uljez_correct integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS uljez_wrong integer DEFAULT 0;

-- Kreiranje ili ažuriranje robustne RPC funkcije za atomsko povećavanje statistike
-- Ova funkcija omogućava povećavanje bilo koje kolone za bilo koji iznos, 
-- sprečavajući trke u podacima (race conditions) tokom paralelnih sesija.
CREATE OR REPLACE FUNCTION increment_profile_stats(user_id uuid, stat_name text, amount int8)
RETURNS void AS $$
BEGIN
  EXECUTE format('UPDATE profiles SET %I = COALESCE(%I, 0) + $1 WHERE id = $2', stat_name, stat_name)
  USING amount, user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
