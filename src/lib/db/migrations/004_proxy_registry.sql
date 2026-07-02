CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT,
  password TEXT,
  region TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_proxy_registry_status ON proxy_registry(status);
CREATE INDEX IF NOT EXISTS idx_proxy_registry_host ON proxy_registry(host);

CREATE TABLE IF NOT EXISTS proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL,
  scope TEXT NOT NULL,
  scope_id TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(scope, scope_id),
  FOREIGN KEY (proxy_id) REFERENCES proxy_registry(id) ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS idx_proxy_assignments_proxy_id ON proxy_assignments(proxy_id);
CREATE INDEX IF NOT EXISTS idx_proxy_assignments_scope ON proxy_assignments(scope, scope_id);
