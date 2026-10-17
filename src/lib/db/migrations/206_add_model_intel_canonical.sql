-- 206_add_model_intel_canonical.sql
-- Add canonicalization columns to model_intelligence for cross-source ID mapping
--
-- Replay safety: bare ALTER TABLE ADD COLUMN statements are replayed via the
-- applyMigrationSkippingExistingColumns fallback in migrationRunner.ts
-- (duplicate column name strips already-landed ADD COLUMNs before re-exec).

ALTER TABLE model_intelligence ADD COLUMN canonical_id TEXT;
ALTER TABLE model_intelligence ADD COLUMN source_id TEXT;
ALTER TABLE model_intelligence ADD COLUMN match_confidence REAL;

CREATE INDEX IF NOT EXISTS idx_mi_canonical_id ON model_intelligence (canonical_id);
CREATE INDEX IF NOT EXISTS idx_mi_source_id ON model_intelligence (source_id);

-- Backfill: rows written before 206 carry NULL canonical_id; default to lower(model).
UPDATE model_intelligence SET canonical_id = lower(model) WHERE canonical_id IS NULL;
