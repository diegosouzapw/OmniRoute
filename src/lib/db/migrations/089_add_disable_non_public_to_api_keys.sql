-- Migration: Add disable_non_public_models to api_keys
-- Description: Adds a flag to restrict API keys to discovered and public models.
ALTER TABLE api_keys ADD COLUMN disable_non_public_models INTEGER NOT NULL DEFAULT 0;
