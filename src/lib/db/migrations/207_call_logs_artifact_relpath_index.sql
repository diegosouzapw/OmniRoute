-- 207_call_logs_artifact_relpath_index.sql
-- The call-log rotation clears one row per deleted artifact, and the
-- referenced-artifact lookup filters on the same column, but that column
-- has no index, so each lookup scans the whole table. This partial index
-- covers only rows that reference an artifact, keeping the write cost off
-- the majority of rows without one. Additive only: speeds up the existing
-- lookups, no schema or behavior change for callers.

CREATE INDEX IF NOT EXISTS idx_cl_artifact_relpath
  ON call_logs(artifact_relpath)
  WHERE artifact_relpath IS NOT NULL;
