-- CCR durable block store (#9061).
--
-- The CCR engine keeps blocks in a process-local Map. That map loses entries to
-- cross-principal LRU eviction (5,000 entries / 64 MB global cap), to the 24h TTL, to
-- process restarts, and to multi-instance deployments where the MCP retrieve call lands
-- on an instance that never ran the compression. Meanwhile `fidelityGateStep.ts` waives
-- fidelity verification for sampling engines *because* their drop is "CCR-recoverable",
-- and the model is told by the CCR protocol instruction that it can retrieve the block
-- verbatim.
--
-- This table is the second tier behind that Map: the Map stays the hot cache and keeps
-- its LRU/byte-budget behaviour untouched, and a block evicted from it is still readable
-- here. Scoping matches the in-memory store's compound key (principal + content hash).

CREATE TABLE IF NOT EXISTS ccr_blocks (
  principal_id     TEXT    NOT NULL,
  hash             TEXT    NOT NULL,
  content          TEXT    NOT NULL,
  bytes            INTEGER NOT NULL,
  chars            INTEGER NOT NULL,
  lines            INTEGER NOT NULL,
  content_type     TEXT    NOT NULL DEFAULT 'text/plain',
  source           TEXT    NOT NULL DEFAULT 'compression',
  created_at       INTEGER NOT NULL,
  last_accessed_at INTEGER NOT NULL,
  expires_at       INTEGER NOT NULL,
  PRIMARY KEY (principal_id, hash)
);

-- Pruning scans by expiry.
CREATE INDEX IF NOT EXISTS idx_ccr_blocks_expires ON ccr_blocks(expires_at);
