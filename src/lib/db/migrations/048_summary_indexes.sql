-- 048_summary_indexes.sql
-- Add composite indexes for efficient querying of summary tables

-- Composite indexes for daily_usage_summary
CREATE INDEX IF NOT EXISTS idx_daily_usage_provider_date
  ON daily_usage_summary(provider, date);

CREATE INDEX IF NOT EXISTS idx_daily_usage_model_date
  ON daily_usage_summary(model, date);

CREATE INDEX IF NOT EXISTS idx_daily_usage_provider_model_date_composite
  ON daily_usage_summary(provider, model, date);

-- Composite indexes for hourly_usage_summary
CREATE INDEX IF NOT EXISTS idx_hourly_usage_provider_date
  ON hourly_usage_summary(provider, date_hour);

CREATE INDEX IF NOT EXISTS idx_hourly_usage_model_date
  ON hourly_usage_summary(model, date_hour);

CREATE INDEX IF NOT EXISTS idx_hourly_usage_provider_model_date_composite
  ON hourly_usage_summary(provider, model, date_hour);

-- Add unique constraint to prevent duplicate aggregations
CREATE UNIQUE INDEX IF NOT EXISTS idx_daily_usage_unique
  ON daily_usage_summary(provider, model, date);

CREATE UNIQUE INDEX IF NOT EXISTS idx_hourly_usage_unique
  ON hourly_usage_summary(provider, model, date_hour);
