-- #12849: track when a connection's synced model catalog was last written so
-- getActiveSyncedCatalog can stop treating it as authoritative forever. Plain
-- TEXT column (ISO timestamp) — rowToCamel passes it through as-is;
-- NULL = never synced (pre-existing rows fail open, same as today's no-sync
-- state, rather than staying pinned to a frozen snapshot indefinitely).
ALTER TABLE provider_connections ADD COLUMN synced_models_at TEXT;
