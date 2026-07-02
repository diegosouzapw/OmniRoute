-- Migration 012: Fix tokens_input to include cache tokens
--
-- Problem: Historical data stored tokens_input as just the base input_tokens
-- from the API, not including cache_read and cache_creation tokens.
--
-- Per Claude API docs:
-- Total input tokens = input_tokens + cache_creation_input_tokens + cache_read_input_tokens
--
-- This migration corrects historical records by adding cache tokens to tokens_input.
-- Only affects records where cache tokens exist.

-- Update tokens_input to include cache tokens
UPDATE usage_history
SET tokens_input = tokens_input + tokens_cache_read + tokens_cache_creation
WHERE tokens_cache_read > 0 OR tokens_cache_creation > 0;