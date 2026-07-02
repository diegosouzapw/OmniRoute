-- 005_combo_agent_fields.sql
-- Safe migration for existing users: adds optional agent fields to combos.
-- Uses ADD COLUMN with DEFAULT NULL (SQLite compatible) — existing rows are untouched.
-- New fields are read as NULL by old code versions (backward compatible).

-- System prompt override: when set, injected as the first system message before
-- forwarding to the provider. Overrides any system message from the client.
ALTER TABLE combos ADD COLUMN system_message TEXT DEFAULT NULL;

-- Regex-based tool filter: when set, only tool calls whose "name" matches this
-- regex pattern are forwarded to the provider. Others are stripped silently.
-- Example: "^(gh_|create_file|web_fetch)" — allows only GitHub and web tools.
ALTER TABLE combos ADD COLUMN tool_filter_regex TEXT DEFAULT NULL;

-- Context caching protection: when 1, the proxy tags assistant responses with
-- <omniModel>provider/model</omniModel> and pins the model for the session.
ALTER TABLE combos ADD COLUMN context_cache_protection INTEGER DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_combos_cache_protection ON combos(context_cache_protection);
