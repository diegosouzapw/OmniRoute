-- 143: Per-API-key cache bypass for semantic cache (Phase 9.1).
-- "legacy" = cache behaves as normal (default). "bypass" = skip cache lookup
-- entirely, used by latency-sensitive clients that must measure real upstream time.

ALTER TABLE api_keys ADD COLUMN cache_default_mode TEXT NOT NULL DEFAULT 'legacy';
