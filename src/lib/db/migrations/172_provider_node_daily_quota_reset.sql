-- 172: per-node daily quota reset clock (IANA timezone + local hour).
-- Used by TPD cooldown when upstream omits X-RateLimit-Reset.
-- Both columns nullable: empty = operator has not configured a clock.

ALTER TABLE provider_nodes ADD COLUMN daily_quota_reset_timezone TEXT;
ALTER TABLE provider_nodes ADD COLUMN daily_quota_reset_hour INTEGER;
