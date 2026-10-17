-- Distinguish an in-flight artifact write from a terminal missing artifact.
-- The insertion-time deadline lets an exporter abandon a write after process death.
ALTER TABLE call_logs ADD COLUMN detail_pending_until INTEGER DEFAULT NULL;
