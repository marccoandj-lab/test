-- Table to track daily quiz attempts for the Ranked Quiz Mode
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  attempt_date date DEFAULT current_date,
  attempts_used int DEFAULT 0,
  total_srp_earned bigint DEFAULT 0,
  PRIMARY KEY (user_id, attempt_date)
);

-- Index for faster lookups by user and date
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_date ON public.quiz_attempts (user_id, attempt_date);

-- RLS Policies
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'quiz_attempts' AND policyname = 'Users can view their own quiz attempts'
  ) THEN
    CREATE POLICY "Users can view their own quiz attempts" 
    ON public.quiz_attempts FOR SELECT 
    USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'quiz_attempts' AND policyname = 'Users can update their own quiz attempts'
  ) THEN
    CREATE POLICY "Users can update their own quiz attempts" 
    ON public.quiz_attempts FOR ALL 
    USING (auth.uid() = user_id);
  END IF;
END $$;

-- RPC Function to increment quiz attempts and SRP atomically
CREATE OR REPLACE FUNCTION public.record_quiz_completion(p_user_id uuid, p_date date, p_srp_earned integer)
RETURNS void AS $$
BEGIN
  INSERT INTO public.quiz_attempts (user_id, attempt_date, attempts_used, total_srp_earned)
  VALUES (p_user_id, p_date, 1, p_srp_earned)
  ON CONFLICT (user_id, attempt_date)
  DO UPDATE SET 
    attempts_used = quiz_attempts.attempts_used + 1,
    total_srp_earned = quiz_attempts.total_srp_earned + EXCLUDED.total_srp_earned;

  -- Also update the global SRP in the profiles table
  UPDATE public.profiles
  SET srp = srp + p_srp_earned
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
