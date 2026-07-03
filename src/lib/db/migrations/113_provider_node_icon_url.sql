-- Add icon_url column to provider_nodes
-- Stores an optional operator-supplied remote icon URL for OpenAI-/Anthropic-compatible
-- provider nodes. NULL = no custom icon (falls back to the built-in @lobehub/static resolution).
-- Plain TEXT column (no `_json` suffix) — rowToCamel passes it through as a string as-is.
ALTER TABLE provider_nodes ADD COLUMN icon_url TEXT;
