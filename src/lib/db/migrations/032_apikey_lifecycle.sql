-- Migration 032: API Key lifecycle hardening
--
-- Phase 3 of the unified-authz plan. Adds explicit lifecycle and policy
-- columns to api_keys without touching the existing `key` column. Existing
-- plain-text keys remain valid; key hashing is a separate follow-up step
-- once revocation/expiry are wired through the validator and policy layer.
--
-- New columns:
--   revoked_at      ISO timestamp, NULL when not revoked.
--   expires_at      ISO timestamp, NULL = no expiry.
--   last_used_at    ISO timestamp updated by validateApiKey on success.
--   key_prefix      first ~12 visible chars of the key, for safe display.
--   ip_allowlist    JSON array of CIDRs/IPs; NULL or [] = allow any.
--   scopes          JSON array of scope strings; NULL or [] = default scopes.

ALTER TABLE api_keys ADD COLUMN revoked_at TEXT;
ALTER TABLE api_keys ADD COLUMN expires_at TEXT;
ALTER TABLE api_keys ADD COLUMN last_used_at TEXT;
ALTER TABLE api_keys ADD COLUMN key_prefix TEXT;
ALTER TABLE api_keys ADD COLUMN ip_allowlist TEXT;
ALTER TABLE api_keys ADD COLUMN scopes TEXT;

CREATE INDEX IF NOT EXISTS idx_api_keys_revoked_at ON api_keys(revoked_at);
CREATE INDEX IF NOT EXISTS idx_api_keys_expires_at ON api_keys(expires_at);
