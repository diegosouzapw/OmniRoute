-- 047_aggregation_tables.sql
-- Create aggregation tables for usage data summarization

-- Hourly usage summary table
CREATE TABLE IF NOT EXISTS hourly_usage_summary (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  date_hour TEXT NOT NULL, -- Format: YYYY-MM-DD HH:00:00
  total_requests INTEGER NOT NULL DEFAULT 0,
  total_input_tokens INTEGER NOT NULL DEFAULT 0,
  total_output_tokens INTEGER NOT NULL DEFAULT 0,
  total_cost REAL NOT NULL DEFAULT 0.0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Index for efficient queries by provider, model, and time range
CREATE INDEX IF NOT EXISTS idx_hourly_usage_provider_model_date 
  ON hourly_usage_summary(provider, model, date_hour);

-- Index for time-based queries
CREATE INDEX IF NOT EXISTS idx_hourly_usage_date 
  ON hourly_usage_summary(date_hour);

-- Daily usage summary table
CREATE TABLE IF NOT EXISTS daily_usage_summary (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  date TEXT NOT NULL, -- Format: YYYY-MM-DD
  total_requests INTEGER NOT NULL DEFAULT 0,
  total_input_tokens INTEGER NOT NULL DEFAULT 0,
  total_output_tokens INTEGER NOT NULL DEFAULT 0,
  total_cost REAL NOT NULL DEFAULT 0.0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Index for efficient queries by provider, model, and date
CREATE INDEX IF NOT EXISTS idx_daily_usage_provider_model_date 
  ON daily_usage_summary(provider, model, date);

-- Index for date-based queries
CREATE INDEX IF NOT EXISTS idx_daily_usage_date 
  ON daily_usage_summary(date);
