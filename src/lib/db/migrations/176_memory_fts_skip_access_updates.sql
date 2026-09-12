-- 176_memory_fts_skip_access_updates.sql
-- recordMemoryAccess() updates access_count / last_accessed_at on every
-- retrieval. The AFTER UPDATE trigger from 023 rewrote the FTS5 row for
-- those telemetry columns too, so memory_fts_data / memory_fts_docsize
-- grew without bound (live: 962 memories -> 175k FTS data rows).
--
-- Recreate memory_fts_au so it only reindexes when content, key, or
-- memory_id actually change. memory_id still belongs here: createMemory
-- inserts then backfills memory_id, and that UPDATE must stay in FTS.

DROP TRIGGER IF EXISTS memory_fts_au;

CREATE TRIGGER IF NOT EXISTS memory_fts_au AFTER UPDATE ON memories
WHEN
  NEW.content IS NOT OLD.content OR
  NEW.key IS NOT OLD.key OR
  NEW.memory_id IS NOT OLD.memory_id
BEGIN
  INSERT INTO memory_fts(memory_fts, rowid, content, key)
    VALUES('delete', old.memory_id, old.content, old.key);
  INSERT INTO memory_fts(rowid, content, key)
    VALUES (new.memory_id, new.content, new.key);
END;
