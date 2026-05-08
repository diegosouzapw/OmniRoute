-- Migration 045: Add tokens_compressed to call_logs
-- Tracks how many tokens were removed by proactive context compression.
-- NULL = compression not applied. N > 0 = tokens eliminated.
ALTER TABLE call_logs ADD COLUMN tokens_compressed INTEGER DEFAULT NULL;
