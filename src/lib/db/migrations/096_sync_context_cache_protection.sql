-- 096_sync_context_cache_protection.sql
-- Sync the context_cache_protection column with the JSON blob for existing combos.
-- Before this migration, the column was never written by the API, so existing rows
-- have 0 (from ADD COLUMN DEFAULT 0) even when the JSON blob has it set to true.
-- This migration brings them in sync so the column becomes the authoritative source.
UPDATE combos
SET context_cache_protection = 1
WHERE json_extract(data, '$.context_cache_protection') = 1
  AND (context_cache_protection IS NULL OR context_cache_protection = 0);
