-- 073_memory_vec.sql
-- Memory Engine Redesign (plan 21): metadata table for sqlite-vec.
-- The actual virtual table `vec_memories(memory_id INTEGER, embedding float[N])`
-- is created in runtime by src/lib/memory/vectorStore.ts because N depends on
-- the active embedding model (which can change at any time via UI).

CREATE TABLE IF NOT EXISTS memory_vec_meta (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  active_dim INTEGER,
  embedding_signature TEXT,
  last_reset_at TEXT,
  vec_loaded INTEGER NOT NULL DEFAULT 0
);

INSERT OR IGNORE INTO memory_vec_meta (id, active_dim, embedding_signature, last_reset_at, vec_loaded)
VALUES (1, NULL, NULL, NULL, 0);

-- Add needs_reindex column to memories (idempotent via separate ALTER guarded by PRAGMA).
-- The PRAGMA-guard pattern is handled in the migration runner; here we just ensure the
-- column shape. If the column already exists, the ALTER fails silently and the runner
-- treats the migration as a no-op for that ALTER step.
ALTER TABLE memories ADD COLUMN needs_reindex INTEGER NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_memories_needs_reindex
  ON memories(needs_reindex)
  WHERE needs_reindex = 1;
