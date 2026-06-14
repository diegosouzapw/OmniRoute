-- 077: Per-API-key default for omitted chat completion stream flags.

ALTER TABLE api_keys ADD COLUMN stream_default_mode TEXT NOT NULL DEFAULT 'legacy';
