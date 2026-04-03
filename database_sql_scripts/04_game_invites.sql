-- 1. Game Invites (Multiplayer invite) tabela
CREATE TABLE IF NOT EXISTS public.game_invites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    issuer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    room_code TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Omogucavanje RLS Polisa
ALTER TABLE public.game_invites ENABLE ROW LEVEL SECURITY;

-- 3. Sigurnosna pravila - Igrač može manipulisati invite sesijama u kojima on učestvuje
DROP POLICY IF EXISTS "Users can see their own invites" ON public.game_invites;
CREATE POLICY "Users can see their own invites"
ON public.game_invites FOR SELECT
USING (auth.uid() = issuer_id OR auth.uid() = receiver_id);

DROP POLICY IF EXISTS "Users can manage their own invites" ON public.game_invites;
CREATE POLICY "Users can manage their own invites"
ON public.game_invites FOR ALL
USING (auth.uid() = issuer_id OR auth.uid() = receiver_id);
