-- Migration 009: Add requested_model to call_logs for billing transparency
-- Tracks the model the client *asked* for vs the model that was *actually routed*.
-- Needed when a combo falls back: requested_model ≠ model in call_logs.
-- Ref: sub2api commits 0b845c25 + 4edcfe1f (T01 sub2api gap analysis)
ALTER TABLE call_logs ADD COLUMN requested_model TEXT DEFAULT NULL;

-- Index for filtering/aggregating by requested_model in Analytics
CREATE INDEX IF NOT EXISTS idx_call_logs_requested_model
  ON call_logs(requested_model);
