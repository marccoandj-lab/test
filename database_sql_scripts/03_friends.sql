-- 1. Tabela za dodavanje prijatelja
CREATE TABLE IF NOT EXISTS public.friends (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    friend_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted')),
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, friend_id)
);

-- 2. Omogucavamo RLS nad friends tabelom
ALTER TABLE public.friends ENABLE ROW LEVEL SECURITY;

-- 3. Sigurnosna pravila nad friends tabelom
DROP POLICY IF EXISTS "Users can see their own friends" ON public.friends;
CREATE POLICY "Users can see their own friends"
ON public.friends FOR SELECT
USING (auth.uid() = user_id OR auth.uid() = friend_id);

DROP POLICY IF EXISTS "Users can manage their own friends" ON public.friends;
CREATE POLICY "Users can manage their own friends"
ON public.friends FOR ALL
USING (auth.uid() = user_id OR auth.uid() = friend_id);
