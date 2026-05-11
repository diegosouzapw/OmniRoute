-- 040_oneproxy_proxy_fields.sql
-- Add 1proxy-specific columns to proxy_registry to support free proxy
-- marketplace integration (Issue #1788).
--
-- New columns:
--   source          — 'manual' or 'oneproxy' (distinguishes origin)
--   quality_score   — 0-100 quality rating from 1proxy validation
--   latency_ms      — measured latency in milliseconds
--   anonymity       — transparent, anonymous, or elite
--   google_access   — whether proxy can access Google (0/1)
--   last_validated  — ISO timestamp of last validation
--   country_code    — two-letter ISO country code

ALTER TABLE proxy_registry ADD COLUMN source TEXT NOT NULL DEFAULT 'manual';
ALTER TABLE proxy_registry ADD COLUMN quality_score INTEGER;
ALTER TABLE proxy_registry ADD COLUMN latency_ms INTEGER;
ALTER TABLE proxy_registry ADD COLUMN anonymity TEXT;
ALTER TABLE proxy_registry ADD COLUMN google_access INTEGER DEFAULT 0;
ALTER TABLE proxy_registry ADD COLUMN last_validated TEXT;
ALTER TABLE proxy_registry ADD COLUMN country_code TEXT;

CREATE INDEX IF NOT EXISTS idx_proxy_registry_source ON proxy_registry(source);
CREATE INDEX IF NOT EXISTS idx_proxy_registry_quality ON proxy_registry(quality_score DESC);
CREATE INDEX IF NOT EXISTS idx_proxy_registry_country ON proxy_registry(country_code);
