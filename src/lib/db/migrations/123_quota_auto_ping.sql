-- Quota auto-ping (#6977): opt-in warm-up pings that keep a connection's quota
-- window fresh right after it resets, so the first real request doesn't land in
-- a cold/inactive window. Tracks the last successful ping and which reset window
-- it targeted, so the scheduler never re-pings the same reset twice.
-- Plain TEXT columns — rowToCamel passes them through as-is; NULL = never pinged.
ALTER TABLE provider_connections ADD COLUMN last_ping_at TEXT;
ALTER TABLE provider_connections ADD COLUMN last_pinged_reset_key TEXT;
