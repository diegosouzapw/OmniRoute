-- 056_provider_connection_quota_window_thresholds.sql
-- Per-window quota cutoffs on provider connections.
--
-- Shape of quota_window_thresholds_json (when set):
--   { "<windowName>": <integer 0-100>, ... }
--
-- A NULL column or missing key means "inherit the resilience-settings default
-- for that provider+window (or the global default if no per-window default)".
--
-- Window names match the quota keys surfaced by `getUsageForProvider`
-- (open-sse/services/usage.ts) and rendered by the Dashboard › Limits page,
-- so user-set cutoffs and displayed quotas refer to the same windows.

ALTER TABLE provider_connections ADD COLUMN quota_window_thresholds_json TEXT;
