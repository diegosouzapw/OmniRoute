-- Migration 071: Add kind and encrypted metadata to webhooks
-- (Originally numbered 068; renumbered to 071 to resolve a prefix collision with
--  068_free_proxies.sql. The version-only pending filter in migrationRunner.ts
--  would have silently skipped this migration on deployments that already had
--  free_proxies applied — leaving webhooks.kind / metadata_encrypted columns
--  absent. ALTER TABLE statements remain idempotent via the runner's
--  "duplicate column name" catch.)
ALTER TABLE webhooks ADD COLUMN kind TEXT NOT NULL DEFAULT 'custom';
ALTER TABLE webhooks ADD COLUMN metadata_encrypted BLOB;
