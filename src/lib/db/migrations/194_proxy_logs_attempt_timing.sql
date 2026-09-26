-- 194_proxy_logs_attempt_timing.sql
-- Per-attempt upstream timing on proxy_logs: send start -> response headers
-- received (headers_ms) and send start -> first useful body byte of the raw
-- upstream body (first_chunk_ms). Additive: NULL for legacy rows, for sends
-- that never reached the network, and until the first byte arrives on slow
-- streams (updated later via the owned db module). No index: not a query
-- dimension.

ALTER TABLE proxy_logs ADD COLUMN headers_ms INTEGER DEFAULT NULL;
ALTER TABLE proxy_logs ADD COLUMN first_chunk_ms INTEGER DEFAULT NULL;
