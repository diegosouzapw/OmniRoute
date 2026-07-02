-- 027_skill_mode_and_metadata.sql
-- Adds per-skill mode metadata and indexing for provider/filter UX.

ALTER TABLE skills ADD COLUMN mode TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE skills ADD COLUMN source_provider TEXT;
ALTER TABLE skills ADD COLUMN tags TEXT;
ALTER TABLE skills ADD COLUMN install_count INTEGER NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_skills_mode ON skills(mode);
CREATE INDEX IF NOT EXISTS idx_skills_source_provider ON skills(source_provider);
