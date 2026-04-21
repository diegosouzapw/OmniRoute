-- Migration 030: Add mcp_scopes to api_keys
ALTER TABLE api_keys ADD COLUMN mcp_scopes TEXT;
