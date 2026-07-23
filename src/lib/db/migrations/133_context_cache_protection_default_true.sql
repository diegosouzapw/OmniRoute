-- 133_context_cache_protection_default_true.sql
-- Upgrades existing combos to use context caching protection by default.
-- This tags combo responses with <omniModel>provider/model</omniModel> and pins
-- the model for session continuity — enabling prompt cache hits on repeated
-- requests within the same conversation fingerprint.
-- New combos already default to 1 via the updated 005 migration and Zod schema.

UPDATE combos
SET context_cache_protection = 1
WHERE context_cache_protection IS NULL OR context_cache_protection = 0;
