-- 177_memory_fts_au_conditional.sql
-- Fix: memory_fts_au trigger reindexes on every UPDATE, including access_count bumps.
--
-- The AFTER UPDATE trigger from 023_fix_memory_fts_uuid.sql fires unconditionally,
-- so recordMemoryAccess() (which only touches access_count / last_accessed_at)
-- still deletes+reinserts the FTS row each time, growing memory_fts_data /
-- memory_fts_docsize without bound (observed: 180 data rows per memory).
--
-- Fix: recreate the trigger with a WHEN clause that restricts it to updates
-- that actually change content or key — the only columns FTS5 indexes.
--
-- Also run an FTS5 optimize pass to compact existing tombstoned segments.

-- 1. Drop the unconditional trigger
DROP TRIGGER IF EXISTS memory_fts_au;

-- 2. Recreate with WHEN clause: only fire when content or key actually change
CREATE TRIGGER IF NOT EXISTS memory_fts_au AFTER UPDATE ON memories
WHEN old.content IS DISTINCT FROM new.content OR old.key IS DISTINCT FROM new.key
BEGIN
  INSERT INTO memory_fts(memory_fts, rowid, content, key)
    VALUES('delete', old.memory_id, old.content, old.key);
  INSERT INTO memory_fts(rowid, content, key)
    VALUES (new.memory_id, new.content, new.key);
END;

-- 3. Compact existing FTS5 segments to reclaim space from accumulated tombstones
INSERT INTO memory_fts(memory_fts) VALUES('optimize');
