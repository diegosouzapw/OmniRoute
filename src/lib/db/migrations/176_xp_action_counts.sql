-- Migration 176: Durable per-key/per-action counters for gamification (#12546)
--
-- getActionCount() (src/lib/gamification/badges.ts) and checkActionCountBadges()
-- (src/lib/gamification/events.ts) used to count rows directly in xp_audit_log,
-- which cleanupXpAuditLog() prunes by retention.xpAuditLog (default 30 days). So
-- the "lifetime" action-count milestones (First Token, Token Consumer, …) were
-- really "requests in the last 30 days" and were lost once the audit rows aged
-- out. This table keeps a durable running total per (api_key_id, action) that the
-- retention prune never touches — mirroring how user_levels.total_xp is a durable
-- aggregate rather than a live COUNT over xp_audit_log.

CREATE TABLE IF NOT EXISTS xp_action_counts (
  api_key_id TEXT NOT NULL,
  action TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (api_key_id, action)
) WITHOUT ROWID;

-- Backfill current lifetime totals from whatever xp_audit_log rows survive today.
-- Uses the same per-row weight getActionCount() applied: the metadata `amount`
-- when present (token_share records the shared amount there), otherwise 1.
-- INSERT OR IGNORE keeps the migration idempotent if it is ever re-executed.
INSERT OR IGNORE INTO xp_action_counts (api_key_id, action, count, updated_at)
SELECT
  api_key_id,
  action,
  SUM(COALESCE(CAST(json_extract(metadata, '$.amount') AS INTEGER), 1)) AS count,
  datetime('now')
FROM xp_audit_log
GROUP BY api_key_id, action;
