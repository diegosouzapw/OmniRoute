-- Migration 102: Persist VACUUM scheduler state
-- Issue: #4437 — auto_vacuum + scheduled VACUUM never execute; lastVacuumAt
-- was hardcoded to null in getDatabaseSettings() and there was no scheduler
-- wired to write it. This migration adds the persistent key_value rows
-- (with defaults) so the existing UI rendering at SystemStorageTab.tsx:695
-- starts showing real data and the scheduler has a place to write back to.
--
-- The actual scheduler is created in src/lib/db/vacuumScheduler.ts and is
-- wired into src/instrumentation-node.ts. This migration only seeds
-- default values so a fresh DB has a deterministic baseline.
--
-- Namespaces match src/lib/db/vacuumScheduler.ts constants. The values
-- are read by getDatabaseSettings() in src/lib/db/databaseSettings.ts
-- (formerly hardcoded `lastVacuumAt: null` at the original line 241).

INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES
  ('vacuum', 'last_vacuum_at',          'null'),
  ('vacuum', 'last_vacuum_duration_ms', 'null'),
  ('vacuum', 'last_vacuum_error',       'null'),
  ('vacuum', 'total_vacuum_count',      '0'),
  ('vacuum', 'next_scheduled_vacuum_at','null');
