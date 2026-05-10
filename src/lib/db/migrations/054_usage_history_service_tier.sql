-- Migration 051: Track effective service tier for usage analytics
-- Used to distinguish Codex Fast (priority) requests from standard requests.
ALTER TABLE usage_history ADD COLUMN service_tier TEXT DEFAULT 'standard';
CREATE INDEX IF NOT EXISTS idx_uh_service_tier ON usage_history(service_tier);
