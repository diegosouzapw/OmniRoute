-- 041: Add real usage receipt fields to compression analytics.

ALTER TABLE compression_analytics ADD COLUMN actual_prompt_tokens INTEGER;
ALTER TABLE compression_analytics ADD COLUMN actual_completion_tokens INTEGER;
ALTER TABLE compression_analytics ADD COLUMN actual_total_tokens INTEGER;
ALTER TABLE compression_analytics ADD COLUMN actual_cache_read_tokens INTEGER;
ALTER TABLE compression_analytics ADD COLUMN actual_cache_write_tokens INTEGER;
ALTER TABLE compression_analytics ADD COLUMN estimated_usd_saved REAL;
ALTER TABLE compression_analytics ADD COLUMN mcp_description_tokens_saved INTEGER DEFAULT 0;
ALTER TABLE compression_analytics ADD COLUMN multimodal_skip_count INTEGER DEFAULT 0;
ALTER TABLE compression_analytics ADD COLUMN receipt_source TEXT;
ALTER TABLE compression_analytics ADD COLUMN validation_fallback INTEGER DEFAULT 0;
ALTER TABLE compression_analytics ADD COLUMN output_mode TEXT;

CREATE INDEX IF NOT EXISTS idx_compression_analytics_request_id
  ON compression_analytics(request_id);
CREATE INDEX IF NOT EXISTS idx_compression_analytics_receipt_source
  ON compression_analytics(receipt_source);
