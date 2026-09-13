-- 149_memory_fts_trigger_content_only.sql
-- Fix: memory_fts_au trigger fires on EVERY UPDATE (including access_count bumps),
-- generating unbounded FTS5 tombstones/segments that bloat memory_fts_data/docsize.
--
-- Root cause: the AFTER UPDATE trigger in 023 has no WHEN clause, so a
-- recordMemoryAccess() call (which only touches access_count + last_accessed_at)
-- triggers a full delete+insert cycle in the FTS index — content is unchanged.
--
-- Fix: replace the trigger with one guarded by `WHEN old.content IS NOT new.content
-- OR old.key IS NOT new.key`.  Use IS NOT to handle NULLs correctly.
--
-- Also run FTS 'optimize' to compact accumulated tombstones from prior runs.

-- Step 1: Drop the old unguarded trigger
DROP TRIGGER IF EXISTS memory_fts_au;

-- Step 2: Recreate with content-change guard
CREATE TRIGGER IF NOT EXISTS memory_fts_au AFTER UPDATE ON memories
WHEN old.content IS NOT new.content OR old.key IS NOT new.key
BEGIN
  INSERT INTO memory_fts(memory_fts, rowid, content, key)
    VALUES('delete', old.memory_id, old.content, old.key);
  INSERT INTO memory_fts(rowid, content, key)
    VALUES (new.memory_id, new.content, new.key);
END;

-- Step 3: Compact FTS5 index (merge tombstones and small segments)
INSERT INTO memory_fts(memory_fts) VALUES('optimize');
