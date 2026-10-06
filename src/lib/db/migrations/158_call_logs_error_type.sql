-- #10670: per-call error family, set at the single write point in
-- src/lib/usage/callLogs.ts from classifyProviderError. NULL for successes
-- (analytics filters by failure in SQL, so no need for a sentinel value).
ALTER TABLE call_logs ADD COLUMN error_type TEXT DEFAULT NULL;
