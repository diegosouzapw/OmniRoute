-- 022_add_memory_fts5.sql
-- Full-Text Search (FTS5) virtual table for memory fast searching.
-- Provides efficient semantic and exact-match searching on memory content and keys.

-- Some legacy/test databases may have version 015 marked as applied but still be missing the
-- base memories table. Recreate the table defensively here so FTS setup does not fail.
CREATE TABLE IF NOT EXISTS memories (
  id TEXT PRIMARY KEY,
  api_key_id TEXT NOT NULL,
  session_id TEXT,
  type TEXT NOT NULL CHECK(type IN ('factual', 'episodic', 'procedural', 'semantic')),
  key TEXT,
  content TEXT NOT NULL,
  metadata TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_memories_api_key ON memories(api_key_id);
CREATE INDEX IF NOT EXISTS idx_memories_session ON memories(session_id);
CREATE INDEX IF NOT EXISTS idx_memories_type ON memories(type);
CREATE INDEX IF NOT EXISTS idx_memories_expires ON memories(expires_at);

-- Transitional setup only: create the FTS table shell without backfilling data or
-- attaching UUID-based triggers. The follow-up migration 023_fix_memory_fts_uuid.sql
-- converts memories to a stable INTEGER-backed join key, recreates the FTS table,
-- and performs the real backfill safely.
CREATE VIRTUAL TABLE IF NOT EXISTS memory_fts USING fts5(
  content,
  key,
  content='memories'
);
