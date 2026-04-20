-- Migration 028: Add expires_at to api_keys
ALTER TABLE api_keys ADD COLUMN expires_at INTEGER;
