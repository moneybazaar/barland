
-- Allow any authenticated user to mark a token as used (only used_at field)
CREATE POLICY "Authenticated can mark token used"
  ON public.invite_tokens FOR UPDATE TO authenticated
  USING (used_at IS NULL)
  WITH CHECK (used_at IS NOT NULL);
