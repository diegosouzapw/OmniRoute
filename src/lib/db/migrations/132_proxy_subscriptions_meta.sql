-- 132_proxy_subscriptions_meta.sql
-- Observability columns for proxy subscriptions. Track the last error time and
-- a consecutive-failure counter so an operator can tell a transient blip
-- (one failed scheduled refresh) apart from a persistently broken subscription
-- (cloudflare outage vs. a typo'd URL / dead endpoint).

ALTER TABLE proxy_subscriptions ADD COLUMN last_error_at TEXT;
ALTER TABLE proxy_subscriptions ADD COLUMN consecutive_failures INTEGER NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_proxy_subscriptions_last_error ON proxy_subscriptions(last_error_at);
