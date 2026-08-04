-- Add custom_headers_json column to provider_nodes
-- Stores JSON object of custom HTTP headers to send with requests to this provider
-- NULL = no custom headers (backward compatible)
-- Column uses _json suffix so rowToCamel auto-parses it
ALTER TABLE provider_nodes ADD COLUMN custom_headers_json TEXT;
