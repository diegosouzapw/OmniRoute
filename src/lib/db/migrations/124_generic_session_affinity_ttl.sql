-- #7274: generalize session affinity TTL to all providers, not just Codex.
-- Carries the existing 'codexSessionAffinityTtlMs' setting value over to the
-- new generic 'sessionAffinityTtlMs' key so existing Codex users keep their
-- configured TTL after the rename (backward-compatible, additive, idempotent
-- per this repo's key_value migration conventions — see 014_unified_log_artifacts.sql).
INSERT OR IGNORE INTO key_value (namespace, key, value)
SELECT 'settings', 'sessionAffinityTtlMs', value
FROM key_value
WHERE namespace = 'settings' AND key = 'codexSessionAffinityTtlMs';
