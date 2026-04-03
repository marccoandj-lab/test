-- 1. Pravi novu tabelu u kojoj Backend pamti Subscription vezu od sw.js radnika za PUSH notifikacije
CREATE TABLE IF NOT EXISTS public.push_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    subscription JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, subscription)
);

-- 2. Omogucavanje Row Level Security za tabelu push_subscriptions
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- 3. Sigurnosna politika - upravljanje sopstvenim subscripcijama (idempotentno, ako je iz nekog razloga stara ostala, rusi se)
DROP POLICY IF EXISTS "Users can manage their own subscriptions" ON public.push_subscriptions;

CREATE POLICY "Users can manage their own subscriptions"
ON public.push_subscriptions
FOR ALL
TO public
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
