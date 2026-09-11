-- 176: record TTFT (time to first forwarded stream chunk, ms) on call-log rows
-- so /dashboard/logs can compute tokens-per-second over GENERATION time
-- (duration - ttft) instead of end-to-end request duration (#13130). The repo's
-- own rule in open-sse/utils/generationThroughput.ts requires tok/s to exclude
-- TTFT (queueing + first-token wait); the dashboard previously divided by full
-- wall-clock duration, which makes thinking models (long pre-first-token phases,
-- e.g. kimi k2.6/k2.7/k3 with interleaved thinking) look dramatically slower
-- than they generate.
--
-- NULL (not 0) for: non-streaming requests (TTFT is not tracked there), rows
-- written before this migration, and failures that never forwarded a chunk.
-- Consumers MUST fall back to full duration when ttft_ms IS NULL.

ALTER TABLE call_logs ADD COLUMN ttft_ms INTEGER DEFAULT NULL;
