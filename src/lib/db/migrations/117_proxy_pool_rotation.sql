-- Migration 117: native proxy-pool round-robin / egress IP rotation (#6365)
--
-- Lifts the UNIQUE(scope, scope_id) hard constraint on proxy_assignments so N
-- proxies can attach to a single scope as a POOL, and adds a per-assignment
-- `position` ordering column. A companion `proxy_scope_rotation` table holds the
-- per-scope rotation strategy plus the persisted monotonic round-robin cursor.
--
-- Backward-compatible: existing single assignments are copied verbatim and become
-- a pool of size 1 (position 0). The alive-predicate + #6246 fail-closed guard are
-- untouched — an empty / all-dead pool still resolves to null (never direct egress).
--
-- SQLite cannot DROP a table-level UNIQUE constraint in place, so the assignments
-- table is rebuilt via the canonical rename/copy/drop pattern. The whole file runs
-- inside the migration runner's per-file transaction (all-or-nothing). Idempotency
-- is guarded by isSchemaAlreadyApplied(case "117") → proxy_assignments.position.

ALTER TABLE proxy_assignments RENAME TO proxy_assignments_pre117;

CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL,
  scope TEXT NOT NULL,
  scope_id TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(scope, scope_id, proxy_id),
  FOREIGN KEY (proxy_id) REFERENCES proxy_registry(id) ON DELETE RESTRICT
);

INSERT INTO proxy_assignments (id, proxy_id, scope, scope_id, position, created_at, updated_at)
  SELECT id, proxy_id, scope, scope_id, 0, created_at, updated_at
  FROM proxy_assignments_pre117;

DROP TABLE proxy_assignments_pre117;

CREATE INDEX IF NOT EXISTS idx_proxy_assignments_proxy_id ON proxy_assignments(proxy_id);
CREATE INDEX IF NOT EXISTS idx_proxy_assignments_scope ON proxy_assignments(scope, scope_id);

-- Per-scope rotation state. scope_id is normalized ('__global__' for the global
-- scope) so the primary key is always non-null. `cursor` is the monotonic
-- round-robin counter (never Math.random); `rotated_at` + `sticky_window_minutes`
-- support a future sticky strategy without another migration.
CREATE TABLE IF NOT EXISTS proxy_scope_rotation (
  scope TEXT NOT NULL,
  scope_id TEXT NOT NULL,
  strategy TEXT NOT NULL DEFAULT 'round-robin',
  cursor INTEGER NOT NULL DEFAULT 0,
  sticky_window_minutes INTEGER NOT NULL DEFAULT 30,
  rotated_at TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (scope, scope_id)
);
