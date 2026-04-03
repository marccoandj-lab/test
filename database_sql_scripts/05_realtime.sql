BEGIN;

-- Osiguravamo cist pocetak brisanjem i ponovnim kreiranjem (idempotentna migracija)
-- Podesavanje realtime publikacija za Supabase 
DROP PUBLICATION IF EXISTS supabase_realtime;
CREATE PUBLICATION supabase_realtime;

-- Omogucavamo realne objave (Realtime) za game_invites
ALTER PUBLICATION supabase_realtime ADD TABLE public.game_invites;

-- Napomena: ako ikad zelis omoguciti i friend invite realtime, to se dodaje na isti spisak ovde
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.friends;

COMMIT;
