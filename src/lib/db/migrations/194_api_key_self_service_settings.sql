-- 194_api_key_self_service_settings.sql
-- Per-API-key self-service settings, kept in their own table instead of new
-- api_keys columns.
--
-- shared_quota_providers: JSON array of provider ids whose account quotas the
--   key holder may see through GET /v1/me/status (scope self:account-quota).
--   NULL = every provider the key can reach (the default, back-compat);
--   '[]' = none.
-- anthropic_ratelimit_headers: policy for forwarding upstream
--   anthropic-ratelimit-* / anthropic-organization-id headers to the client:
--   'auto' | 'forward' | 'strip'.
--
-- A missing row means defaults (NULL, 'forward'). Idempotent: safe to re-run.

CREATE TABLE IF NOT EXISTS api_key_self_service_settings (
  api_key_id                  TEXT PRIMARY KEY,
  shared_quota_providers      TEXT NULL,
  anthropic_ratelimit_headers TEXT NOT NULL DEFAULT 'forward',
  updated_at                  TEXT NOT NULL DEFAULT (datetime('now'))
);
