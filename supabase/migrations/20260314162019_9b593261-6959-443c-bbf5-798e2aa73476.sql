
CREATE TABLE public.invite_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  token text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '7 days'),
  used_at timestamptz,
  invited_by uuid NOT NULL
);

ALTER TABLE public.invite_tokens ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins can select invite_tokens"
  ON public.invite_tokens FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert invite_tokens"
  ON public.invite_tokens FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update invite_tokens"
  ON public.invite_tokens FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Anon can select (to validate token on registration page)
CREATE POLICY "Anon can validate tokens"
  ON public.invite_tokens FOR SELECT TO anon
  USING (true);
