-- 052: Per-API-key combo restrictions and soft throttling.

ALTER TABLE api_keys ADD COLUMN allowed_combos TEXT;
ALTER TABLE api_keys ADD COLUMN throttle_delay_ms INTEGER;
