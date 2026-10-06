CREATE TABLE IF NOT EXISTS exclusive_connection_leases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lease_owner_hash TEXT NOT NULL
    CHECK (length(lease_owner_hash) = 64 AND lease_owner_hash = lower(lease_owner_hash)),
  api_key_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  connection_id TEXT NOT NULL,
  generation INTEGER NOT NULL CHECK (generation > 0),
  state TEXT NOT NULL
    CHECK (state IN ('ACTIVE', 'RELEASED', 'EXPIRED', 'INVALIDATED')),
  acquired_at TEXT NOT NULL,
  renewed_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  ended_at TEXT,
  end_reason TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_exclusive_lease_active_owner
  ON exclusive_connection_leases(lease_owner_hash)
  WHERE state = 'ACTIVE';

CREATE UNIQUE INDEX IF NOT EXISTS idx_exclusive_lease_active_connection
  ON exclusive_connection_leases(connection_id)
  WHERE state = 'ACTIVE';

CREATE INDEX IF NOT EXISTS idx_exclusive_lease_owner_history
  ON exclusive_connection_leases(lease_owner_hash, generation, id);

CREATE INDEX IF NOT EXISTS idx_exclusive_lease_expiry
  ON exclusive_connection_leases(state, expires_at);
