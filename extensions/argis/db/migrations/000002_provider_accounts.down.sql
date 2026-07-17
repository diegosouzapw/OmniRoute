-- Rollback migration: provider_accounts
-- Drops tables and indexes created in migration 002

-- Drop indexes
DROP INDEX IF EXISTS idx_endpoint_health_endpoint;
DROP INDEX IF EXISTS idx_usage_snapshots_account_window;
DROP INDEX IF EXISTS idx_model_endpoints_status;
DROP INDEX IF EXISTS idx_model_endpoints_model;
DROP INDEX IF EXISTS idx_model_endpoints_account;
DROP INDEX IF EXISTS idx_provider_accounts_active;

-- Drop tables (in reverse dependency order)
DROP TABLE IF EXISTS endpoint_health;
DROP TABLE IF EXISTS account_usage_snapshots;
DROP TABLE IF EXISTS model_endpoints;
DROP TABLE IF EXISTS provider_account_limits;
DROP TABLE IF EXISTS provider_accounts;
