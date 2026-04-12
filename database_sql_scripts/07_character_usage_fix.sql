-- 07_character_usage_fix.sql
-- Funkcija za atomsko povećavanje broja korišćenja karaktera u JSONB polju
CREATE OR REPLACE FUNCTION increment_character_usage(user_id uuid, avatar_id text)
RETURNS void AS $$
BEGIN
  UPDATE profiles 
  SET character_usage = jsonb_set(
    COALESCE(character_usage, '{}'::jsonb),
    ARRAY[avatar_id],
    (COALESCE(character_usage->>avatar_id, '0')::int + 1)::text::jsonb
  )
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
