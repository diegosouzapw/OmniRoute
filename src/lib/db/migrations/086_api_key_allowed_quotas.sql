-- 085: Per-API-key quota-pool allow-list (Phase A1 — Quota Share redesign).
--
-- Adds `allowed_quotas` as a JSON TEXT array of quota-pool IDs. Empty array
-- means no quota-pool restriction (all pools accessible). Non-empty array
-- limits the key to the listed pool IDs only (enforcement added in Phase A2).
-- Idempotent via ADD COLUMN; safe to run more than once on older schemas.

ALTER TABLE api_keys ADD COLUMN allowed_quotas TEXT NOT NULL DEFAULT '[]';
