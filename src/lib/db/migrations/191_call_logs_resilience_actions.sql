-- 191_call_logs_resilience_actions.sql
-- Per-attempt resilience summary: what OmniRoute did to save the request
-- (account rotations, park-and-replay, empty-turn retries, mid-stream
-- continuations, stored-error replay, buffered-turn verdict). Additive:
-- NULL means no resilience action was recorded. Compact JSON, closed keys.
-- No index: badge reads only, no search contract.

ALTER TABLE call_logs ADD COLUMN resilience_actions TEXT DEFAULT NULL;
