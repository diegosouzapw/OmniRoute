-- Migration 174: Incremental action-count cache for badge thresholds.
--
-- `checkActionCountBadges` (gamification/events.ts) and `getActionCount`
-- (gamification/badges.ts) previously ran `COUNT(*)` / `SUM(...)` over
-- `xp_audit_log` on every qualifying action. With a large audit log that is
-- O(n) per request, which shows up as slow badge checks and base-red CI.
--
-- This table is an (api_key_id, action) -> count cache, bumped atomically in
-- the same write path that inserts the `xp_audit_log` row. Readers fall back
-- to the old COUNT(*) scan only on a cache miss (e.g. rows that predate this
-- migration), so the hot path becomes O(1).

CREATE TABLE IF NOT EXISTS xp_action_counts (
  api_key_id TEXT NOT NULL,
  action TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (api_key_id, action)
) WITHOUT ROWID;

-- Backfill from existing audit log rows.
INSERT INTO xp_action_counts (api_key_id, action, count, updated_at)
SELECT api_key_id, action, COUNT(*), MAX(created_at)
FROM xp_audit_log
GROUP BY api_key_id, action;