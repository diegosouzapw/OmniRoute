-- 133_context_cache_protection_default_true.sql
-- Upgrades existing combos to use context caching protection by default.
-- This tags combo responses with <omniModel>provider/model</omniModel> and pins
-- the model for session continuity — enabling prompt cache hits on repeated
-- requests within the same conversation fingerprint.
-- Migration 005 (already shipped) is left untouched — its column DEFAULT stays 0
-- and migrations are immutable once released. New combos already default to 1 at
-- the application layer via createComboSchema's `.default(true)`, which is what
-- actually determines the value written on INSERT (see src/lib/db/combos.ts).

UPDATE combos
SET context_cache_protection = 1
WHERE context_cache_protection IS NULL OR context_cache_protection = 0;
