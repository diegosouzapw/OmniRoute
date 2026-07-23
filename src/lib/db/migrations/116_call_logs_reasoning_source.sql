-- #6187: reasoning-token accounting is blind to reasoning_content / <think> models.
-- Some providers (e.g. stepfun step-3.7-flash) emit reasoning content in the
-- assistant message but report reasoning_tokens=0 in usage, so the usage-derived
-- tokens_reasoning column under-represents reasoning.
--
-- These two columns record reasoning PRESENCE/SOURCE and the raw CHARACTER count
-- of observed reasoning content. They are deliberately SEPARATE from the priced
-- tokens_reasoning column: reasoning_chars is a character count, NOT a token
-- count, and must never enter cost math.
--   reasoning_source: NULL | 'usage' | 'content' | 'think'
--   reasoning_chars : NULL when unknown, else raw char count of observed reasoning
ALTER TABLE call_logs ADD COLUMN reasoning_source TEXT DEFAULT NULL;
ALTER TABLE call_logs ADD COLUMN reasoning_chars INTEGER DEFAULT NULL;
