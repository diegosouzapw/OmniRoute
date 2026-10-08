-- 192_call_logs_added_wait.sql
-- Per-request added wait imposed by OmniRoute before dispatch (egress pacing,
-- park-and-resume) with its cause. Additive: NULL means no wait was imposed.
-- No index: aggregate reads WHERE added_wait_ms IS NOT NULL stay unindexed
-- until measured.

ALTER TABLE call_logs ADD COLUMN added_wait_ms INTEGER DEFAULT NULL;
ALTER TABLE call_logs ADD COLUMN added_wait_cause TEXT DEFAULT NULL;
