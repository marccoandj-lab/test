-- Add new columns to profiles for Daily Challenges and Ranked System
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS srp bigint DEFAULT 0,
ADD COLUMN IF NOT EXISTS rank text DEFAULT 'Novice',
ADD COLUMN IF NOT EXISTS daily_challenges jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS last_challenge_reset timestamptz DEFAULT now();

-- Atomic increment for SRP (Switch Ranked Points)
CREATE OR REPLACE FUNCTION public.increment_srp(user_id uuid, amount integer)
RETURNS void AS $$
BEGIN
  UPDATE public.profiles
  SET srp = srp + amount
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update challenge progress atomically
CREATE OR REPLACE FUNCTION public.update_challenge_progress(user_id uuid, challenge_idx integer, progress_increment integer)
RETURNS void AS $$
BEGIN
  -- We use the jsonb_set function to update the 'current' field of a specific challenge in the array
  UPDATE public.profiles
  SET daily_challenges = jsonb_set(
    daily_challenges,
    array[challenge_idx::text, 'current'],
    ((daily_challenges->challenge_idx->>'current')::int + progress_increment)::text::jsonb
  )
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Claim challenge reward and mark it as claimed
CREATE OR REPLACE FUNCTION public.claim_challenge_reward(user_id uuid, challenge_idx integer, srp_reward integer)
RETURNS void AS $$
BEGIN
  UPDATE public.profiles
  SET 
    srp = srp + srp_reward,
    daily_challenges = jsonb_set(
      daily_challenges,
      array[challenge_idx::text, 'claimed'],
      'true'::jsonb
    )
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
