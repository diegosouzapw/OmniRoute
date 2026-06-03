-- 087: Quota pool groups — quota_groups table + quota_pools.group_id (Part B1).
--
-- Introduces a first-class Group entity that organises quota pools.
-- A key allocated to any pool of a group sees and may use every model
-- of every pool in that group (scope/enforce wired in subsequent tasks).
-- Idempotent via CREATE TABLE/INSERT OR IGNORE (new table) + the migration
-- runner's "duplicate column name" catch (ALTER TABLE ADD COLUMN).
-- The UPDATE backfill is a safe no-op after the first run (group_id is
-- already non-NULL for all rows).

CREATE TABLE IF NOT EXISTS quota_groups (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Seed a default group so the UI always has at least one to select.
-- Stable id ensures this INSERT is idempotent on any subsequent run.
INSERT OR IGNORE INTO quota_groups (id, name) VALUES ('group-demo', 'GroupDemo');

-- Add group_id to pools (nullable; backfilled below).
-- Re-run safety: the migration runner catches "duplicate column name" and
-- marks the migration as applied without re-executing the rest of the file,
-- so the UPDATE below only runs on the first application.
ALTER TABLE quota_pools ADD COLUMN group_id TEXT;

-- Backfill: assign every existing pool with no group to the default group.
UPDATE quota_pools SET group_id = 'group-demo' WHERE group_id IS NULL OR group_id = '';
