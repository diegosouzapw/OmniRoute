-- Migration 049: Add indexes to compression_analytics table for performance

CREATE INDEX IF NOT EXISTS idx_compression_analytics_timestamp 
  ON compression_analytics(timestamp);

CREATE INDEX IF NOT EXISTS idx_compression_analytics_provider 
  ON compression_analytics(provider);

CREATE INDEX IF NOT EXISTS idx_compression_analytics_provider_timestamp 
  ON compression_analytics(provider, timestamp);
