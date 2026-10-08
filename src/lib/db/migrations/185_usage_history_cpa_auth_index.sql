-- Opaque CLIProxyAPI auth_index from X-CPA-TRACE-ID (#11725).
-- The human-readable account label is resolved at read time from the
-- sanitized #11314 account-health projection. This column never stores
-- management payloads, paths, tokens, or emails. NULL when attribution
-- is missing or the header shape is not understood.
ALTER TABLE usage_history ADD COLUMN cpa_auth_index TEXT;
