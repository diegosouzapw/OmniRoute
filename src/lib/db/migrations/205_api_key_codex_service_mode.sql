ALTER TABLE api_keys ADD COLUMN codex_service_mode TEXT NOT NULL DEFAULT 'inherit'
  CHECK (codex_service_mode IN ('inherit', 'default', 'priority', 'flex'));
