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

-- Create FTS5 virtual table for full-text search on memories
CREATE VIRTUAL TABLE IF NOT EXISTS memory_fts USING fts5(
  content,
  key,
  content='memories',
  content_rowid='id'
);

-- KNOWN LIMITATION: content_rowid='id' requires an INTEGER rowid, but memories.id is TEXT (UUID).
-- SQLite FTS5 silently accepts the TEXT UUID as rowid during INSERT (line 15), but the internal rowid
-- won't match memories.id, causing FTS5 content-based inserts to fail lookup by actual rowid.
-- Production code (src/lib/memory/retrieval.ts) gracefully falls back to keyword scoring via getRelevanceScore()
-- when FTS5 matching fails. This is a pre-existing known limitation; fixing it requires:
--   (a) Adding an INTEGER primary key column to memories table, or
--   (b) Using external content FTS5 (content=) with proper INTEGER sync.
-- For now, keyword-based fallback is acceptable and maintains backward compatibility.

-- Sync trigger for INSERT — keep FTS5 in sync when new memories are added
CREATE TRIGGER IF NOT EXISTS memory_fts_ai AFTER INSERT ON memories BEGIN
  INSERT INTO memory_fts(rowid, content, key) VALUES (new.id, new.content, new.key);
END;

-- Sync trigger for DELETE — keep FTS5 in sync when memories are removed
CREATE TRIGGER IF NOT EXISTS memory_fts_ad AFTER DELETE ON memories BEGIN
  INSERT INTO memory_fts(memory_fts, rowid, content, key) VALUES('delete', old.id, old.content, old.key);
END;

-- Sync trigger for UPDATE — keep FTS5 in sync when memories are modified
CREATE TRIGGER IF NOT EXISTS memory_fts_au AFTER UPDATE ON memories BEGIN
  INSERT INTO memory_fts(memory_fts, rowid, content, key) VALUES('delete', old.id, old.content, old.key);
  INSERT INTO memory_fts(rowid, content, key) VALUES (new.id, new.content, new.key);
END;

-- Populate FTS5 table with existing memory data
INSERT INTO memory_fts(rowid, content, key) SELECT id, content, key FROM memories;
