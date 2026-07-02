-- Add custom endpoint path columns to provider_nodes
-- Allows compatible providers to override default chat/models paths
-- NULL = use default path (backward compatible)
ALTER TABLE provider_nodes ADD COLUMN chat_path TEXT;
ALTER TABLE provider_nodes ADD COLUMN models_path TEXT;
