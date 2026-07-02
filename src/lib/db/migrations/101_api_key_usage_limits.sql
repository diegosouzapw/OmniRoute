-- Migration: per-API-key USD usage limits
ALTER TABLE api_keys ADD COLUMN usage_limit_enabled INTEGER NOT NULL DEFAULT 0;
ALTER TABLE api_keys ADD COLUMN daily_usage_limit_usd REAL;
ALTER TABLE api_keys ADD COLUMN weekly_usage_limit_usd REAL;
