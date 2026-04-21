-- 026_provider_connections_block_extra_usage.sql
-- Adds per-connection toggle to block Claude Code extra usage billing.

ALTER TABLE provider_connections ADD COLUMN block_extra_usage INTEGER DEFAULT 1;
