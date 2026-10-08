-- 203_memory_fts_content_rowid.sql
-- Fix #15707: memory_fts accumulated orphan docs and new memories became unsearchable.
--
-- Root cause: memory_fts (023) had no content_rowid and memory_fts_ai indexed
-- new.memory_id, which is NULL at INSERT time, so FTS5 assigned its own auto rowid.
-- Since 178 the AFTER UPDATE trigger only fires on content/key changes, so setting
-- memory_id afterwards never reindexed. Once a legacy NULL-id row was updated, the FTS
-- rowids drifted from memories.memory_id and orphans were never reclaimed.
--
-- Fix: the triggers now own memory_id (assigned on insert, never NULL when indexed),
-- memory_fts is bound to memories.memory_id via content_rowid, and the index is rebuilt.

-- 1. Drop triggers first so the backfill below does not touch the stale index.
DROP TRIGGER IF EXISTS memory_fts_ai;
DROP TRIGGER IF EXISTS memory_fts_ai_assign;
DROP TRIGGER IF EXISTS memory_fts_au;
DROP TRIGGER IF EXISTS memory_fts_ad;

-- 2. Backfill NULL memory_id: rowid when free, otherwise an id above every existing one.
UPDATE memories SET memory_id = rowid
WHERE memory_id IS NULL
  AND rowid NOT IN (SELECT memory_id FROM memories WHERE memory_id IS NOT NULL);

UPDATE memories
SET memory_id = rowid + (SELECT MAX(MAX(memory_id), MAX(rowid)) FROM memories)
WHERE memory_id IS NULL;

-- 3. Recreate the index bound to memory_id (drops all orphan docs).
DROP TABLE IF EXISTS memory_fts;
CREATE VIRTUAL TABLE memory_fts USING fts5(
  content,
  key,
  content='memories',
  content_rowid='memory_id'
);

-- 4. Triggers. Rows with a NULL memory_id are never indexed directly; the assign
--    trigger gives them an id, which fires the AFTER UPDATE trigger to index them.
CREATE TRIGGER memory_fts_ai AFTER INSERT ON memories
WHEN new.memory_id IS NOT NULL
BEGIN
  INSERT INTO memory_fts(rowid, content, key) VALUES (new.memory_id, new.content, new.key);
END;

CREATE TRIGGER memory_fts_ai_assign AFTER INSERT ON memories
WHEN new.memory_id IS NULL
BEGIN
  UPDATE memories
  SET memory_id = (SELECT COALESCE(MAX(memory_id), 0) + 1 FROM memories)
  WHERE rowid = new.rowid;
END;

CREATE TRIGGER memory_fts_ad AFTER DELETE ON memories
WHEN old.memory_id IS NOT NULL
BEGIN
  INSERT INTO memory_fts(memory_fts, rowid, content, key)
    VALUES('delete', old.memory_id, old.content, old.key);
END;

CREATE TRIGGER memory_fts_au AFTER UPDATE ON memories
WHEN old.content IS DISTINCT FROM new.content
  OR old.key IS DISTINCT FROM new.key
  OR old.memory_id IS DISTINCT FROM new.memory_id
BEGIN
  INSERT INTO memory_fts(memory_fts, rowid, content, key)
    SELECT 'delete', old.memory_id, old.content, old.key WHERE old.memory_id IS NOT NULL;
  INSERT INTO memory_fts(rowid, content, key)
    SELECT new.memory_id, new.content, new.key WHERE new.memory_id IS NOT NULL;
END;

-- 5. Index every real row, then compact.
INSERT INTO memory_fts(memory_fts) VALUES('rebuild');
INSERT INTO memory_fts(memory_fts) VALUES('optimize');
