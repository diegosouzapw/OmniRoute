-- 006_detailed_request_logs.sql
-- Stores full request/response bodies at each pipeline stage for debugging.
-- Only populated when detailed_logs_enabled = 1 in settings (off by default).
-- Ring-buffer enforced via trigger: keeps only the last 500 entries.
-- Existing users are not impacted (table is new, feature is opt-in).

CREATE TABLE IF NOT EXISTS request_detail_logs (
  id TEXT PRIMARY KEY,
  call_log_id TEXT,                  -- FK to call_logs.id (optional, nullable)
  timestamp TEXT NOT NULL,
  -- The 4 pipeline stages (all nullable — only populated when available)
  client_request TEXT,               -- Raw body received from the client (JSON)
  translated_request TEXT,           -- Body after format translation (JSON)
  provider_response TEXT,            -- Raw body from the provider (JSON)
  client_response TEXT,              -- Final body sent to the client (JSON)
  -- Metadata
  provider TEXT,
  model TEXT,
  source_format TEXT,
  target_format TEXT,
  duration_ms INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_rdl_timestamp ON request_detail_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_rdl_call_log_id ON request_detail_logs(call_log_id);

-- Ring-buffer trigger: auto-delete oldest records beyond 500
CREATE TRIGGER IF NOT EXISTS trg_rdl_ring_buffer
AFTER INSERT ON request_detail_logs
BEGIN
  DELETE FROM request_detail_logs
  WHERE id IN (
    SELECT id FROM request_detail_logs
    ORDER BY timestamp ASC
    LIMIT MAX(0, (SELECT COUNT(*) FROM request_detail_logs) - 500)
  );
END;

-- Settings key for enabling/disabling detailed logs (default: disabled)
-- Inserted only if not already present (safe for existing installs)
INSERT OR IGNORE INTO key_value (namespace, key, value)
VALUES ('settings', 'detailed_logs_enabled', '0');
