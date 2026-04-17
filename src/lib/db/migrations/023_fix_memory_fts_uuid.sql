-- 023_fix_memory_fts_uuid.sql
-- Fix FTS5 UUID/INTEGER mismatch that caused semantic search to always return 0 results.
--
-- Problem: memories.id is TEXT (UUID) but memory_fts.rowid is INTEGER.
-- The JOIN `JOIN memory_fts f ON m.id = f.rowid` always failed silently (UUID ≠ integer),
-- returning 0 results for all FTS5 searches.
--
-- Solution:
-- 1. Use SQLite's internal rowid directly (no memory_id column needed)
-- 2. Recreate memory_fts triggers to use rowid
-- 3. Repopulate FTS5 so JOIN on rowid works correctly



-- Step 1: Drop old broken triggers that used UUID as rowid
DROP TRIGGER IF EXISTS memory_fts_ai;
DROP TRIGGER IF EXISTS memory_fts_ad;
DROP TRIGGER IF EXISTS memory_fts_au;

-- Step 2: Drop and recreate memory_fts (without content_rowid, so FTS5 uses its own INTEGER rowid)
DROP TABLE IF EXISTS memory_fts;
CREATE VIRTUAL TABLE IF NOT EXISTS memory_fts USING fts5(
  content,
  key,
  content='memories'
);

-- Step 3: Recreate triggers using SQLite's internal rowid
CREATE TRIGGER IF NOT EXISTS memory_fts_ai AFTER INSERT ON memories BEGIN
  INSERT INTO memory_fts(rowid, content, key) VALUES (new.rowid, new.content, new.key);
END;

CREATE TRIGGER IF NOT EXISTS memory_fts_ad AFTER DELETE ON memories BEGIN
  INSERT INTO memory_fts(memory_fts, rowid, content, key) VALUES('delete', old.rowid, old.content, old.key);
END;

CREATE TRIGGER IF NOT EXISTS memory_fts_au AFTER UPDATE ON memories BEGIN
  INSERT INTO memory_fts(memory_fts, rowid, content, key) VALUES('delete', old.rowid, old.content, old.key);
  INSERT INTO memory_fts(rowid, content, key) VALUES (new.rowid, new.content, new.key);
END;

-- Step 4: Repopulate FTS5 with correct rowid values
INSERT INTO memory_fts(rowid, content, key) SELECT rowid, content, key FROM memories;


