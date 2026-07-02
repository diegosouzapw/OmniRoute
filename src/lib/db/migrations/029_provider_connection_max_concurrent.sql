-- 029_provider_connection_max_concurrent.sql
-- Adds account-native concurrency cap to provider_connections.
-- This defines the maximum concurrent requests allowed for a specific account (connection).
-- Coexists with existing combo-level concurrencyPerModel, which is separate.

-- Add max_concurrent column (NULL = unlimited, uses provider defaults or combo rules)
ALTER TABLE provider_connections ADD COLUMN max_concurrent INTEGER;

-- Index for provider-level filtering
CREATE INDEX IF NOT EXISTS idx_pc_max_concurrent ON provider_connections(provider, max_concurrent);
