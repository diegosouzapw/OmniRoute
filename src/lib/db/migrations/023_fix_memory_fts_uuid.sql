-- 023_fix_memory_fts_uuid.sql
-- Fix FTS5 UUID/INTEGER mismatch that caused semantic search to always return 0 results.
--
-- Problem: memories.id is TEXT (UUID) but memory_fts.rowid is INTEGER.
-- The JOIN `JOIN memory_fts f ON m.id = f.rowid` always failed silently (UUID ≠ integer),
-- returning 0 results for all FTS5 searches.
--
-- Solution:
-- 1. Add INTEGER memory_id column that maps to SQLite's internal rowid
-- 2. Backfill memory_id = CAST(rowid AS INTEGER) for all existing rows
-- 3. Recreate memory_fts triggers to use memory_id (not UUID id) as rowid
-- 4. Repopulate FTS5 so JOIN on memory_id works correctly



-- Step 1: Add memory_id column (will hold SQLite rowid as INTEGER)
ALTER TABLE memories ADD COLUMN memory_id INTEGER;

-- Step 2: Backfill memory_id from SQLite's internal rowid for all existing rows
UPDATE memories SET memory_id = CAST(rowid AS INTEGER);

-- Step 3: Make memory_id NOT NULL and UNIQUE after backfill
CREATE UNIQUE INDEX IF NOT EXISTS idx_memories_memory_id ON memories(memory_id);

-- Step 4: Drop old broken triggers that used UUID as rowid
DROP TRIGGER IF EXISTS memory_fts_ai;
DROP TRIGGER IF EXISTS memory_fts_ad;
DROP TRIGGER IF EXISTS memory_fts_au;

-- Step 5: Drop and recreate memory_fts (without content_rowid, so FTS5 uses its own INTEGER rowid)
DROP TABLE IF EXISTS memory_fts;
CREATE VIRTUAL TABLE IF NOT EXISTS memory_fts USING fts5(
  content,
  key,
  content='memories'
);

-- Step 6: Recreate triggers using memory_id (INTEGER rowid) instead of id (UUID TEXT)
CREATE TRIGGER IF NOT EXISTS memory_fts_ai AFTER INSERT ON memories BEGIN
  INSERT INTO memory_fts(rowid, content, key) VALUES (new.memory_id, new.content, new.key);
END;

CREATE TRIGGER IF NOT EXISTS memory_fts_ad AFTER DELETE ON memories BEGIN
  INSERT INTO memory_fts(memory_fts, rowid, content, key) VALUES('delete', old.memory_id, old.content, old.key);
END;

CREATE TRIGGER IF NOT EXISTS memory_fts_au AFTER UPDATE ON memories BEGIN
  INSERT INTO memory_fts(memory_fts, rowid, content, key) VALUES('delete', old.memory_id, old.content, old.key);
  INSERT INTO memory_fts(rowid, content, key) VALUES (new.memory_id, new.content, new.key);
END;

-- Step 7: Repopulate FTS5 with correct memory_id values
INSERT INTO memory_fts(rowid, content, key) SELECT memory_id, content, key FROM memories;


