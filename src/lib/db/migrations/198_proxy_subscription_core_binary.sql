-- 198_proxy_subscription_core_binary.sql
-- Core binary column for proxy subscriptions: opt-in native verification
-- of the generated core configuration before atomic replacement.
--
--   core_binary_path — absolute path of the core binary used to verify the
--                       rendered candidate (`<binary> check -c <candidate>`).
--                       Empty/NULL = current behavior unchanged (write beside
--                       only, never replace the adopted file).
--
-- Purely additive: no backfill, no index, existing rows read NULL.

ALTER TABLE proxy_subscriptions ADD COLUMN core_binary_path TEXT;
