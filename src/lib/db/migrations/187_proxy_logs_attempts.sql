-- attempt_number: 1-based position of the row within its request journal
-- (1..N for N sends sharing one correlation_id). NULL for legacy rows.
-- attempt_issue: outcome of the send within its journal — served for the send
-- the request settled on, abandoned for earlier sends. NULL for legacy rows.
-- No index: not a query dimension (count requests via correlation_id).
ALTER TABLE proxy_logs ADD COLUMN attempt_number INTEGER;
ALTER TABLE proxy_logs ADD COLUMN attempt_issue TEXT;
