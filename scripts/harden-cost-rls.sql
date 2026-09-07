-- Security hardening for the cost calculation tables.
-- Existing rows with a NULL user_id become inaccessible through the anon/authenticated API
-- until they are explicitly backfilled by an administrator.

BEGIN;

ALTER TABLE public.cost_estimates
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.cost_comparisons
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_cost_estimates_user_id
  ON public.cost_estimates(user_id);

CREATE INDEX IF NOT EXISTS idx_cost_comparisons_user_id
  ON public.cost_comparisons(user_id);

ALTER TABLE public.cost_estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cost_estimate_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cost_comparisons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "cost_estimates_select_own" ON public.cost_estimates;
DROP POLICY IF EXISTS "cost_estimates_insert_own" ON public.cost_estimates;
DROP POLICY IF EXISTS "cost_estimates_update_own" ON public.cost_estimates;
DROP POLICY IF EXISTS "cost_estimates_delete_own" ON public.cost_estimates;

CREATE POLICY "cost_estimates_select_own"
  ON public.cost_estimates
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "cost_estimates_insert_own"
  ON public.cost_estimates
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "cost_estimates_update_own"
  ON public.cost_estimates
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "cost_estimates_delete_own"
  ON public.cost_estimates
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "cost_items_select_own" ON public.cost_estimate_items;
DROP POLICY IF EXISTS "cost_items_insert_own" ON public.cost_estimate_items;
DROP POLICY IF EXISTS "cost_items_update_own" ON public.cost_estimate_items;
DROP POLICY IF EXISTS "cost_items_delete_own" ON public.cost_estimate_items;

CREATE POLICY "cost_items_select_own"
  ON public.cost_estimate_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.cost_estimates e
      WHERE e.id = cost_estimate_items.estimate_id
        AND e.user_id = auth.uid()
    )
  );

CREATE POLICY "cost_items_insert_own"
  ON public.cost_estimate_items
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.cost_estimates e
      WHERE e.id = cost_estimate_items.estimate_id
        AND e.user_id = auth.uid()
    )
  );

CREATE POLICY "cost_items_update_own"
  ON public.cost_estimate_items
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.cost_estimates e
      WHERE e.id = cost_estimate_items.estimate_id
        AND e.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.cost_estimates e
      WHERE e.id = cost_estimate_items.estimate_id
        AND e.user_id = auth.uid()
    )
  );

CREATE POLICY "cost_items_delete_own"
  ON public.cost_estimate_items
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.cost_estimates e
      WHERE e.id = cost_estimate_items.estimate_id
        AND e.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "cost_comparisons_select_own" ON public.cost_comparisons;
DROP POLICY IF EXISTS "cost_comparisons_insert_own" ON public.cost_comparisons;
DROP POLICY IF EXISTS "cost_comparisons_update_own" ON public.cost_comparisons;
DROP POLICY IF EXISTS "cost_comparisons_delete_own" ON public.cost_comparisons;

CREATE POLICY "cost_comparisons_select_own"
  ON public.cost_comparisons
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "cost_comparisons_insert_own"
  ON public.cost_comparisons
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1
      FROM public.cost_estimates e1
      WHERE e1.id = cost_comparisons.estimate_id_1
        AND e1.user_id = auth.uid()
    )
    AND EXISTS (
      SELECT 1
      FROM public.cost_estimates e2
      WHERE e2.id = cost_comparisons.estimate_id_2
        AND e2.user_id = auth.uid()
    )
  );

CREATE POLICY "cost_comparisons_update_own"
  ON public.cost_comparisons
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "cost_comparisons_delete_own"
  ON public.cost_comparisons
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

REVOKE ALL ON public.cost_estimates FROM anon;
REVOKE ALL ON public.cost_estimate_items FROM anon;
REVOKE ALL ON public.cost_comparisons FROM anon;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.cost_estimates TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cost_estimate_items TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cost_comparisons TO authenticated;

COMMIT;
