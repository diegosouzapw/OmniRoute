-- 0001_initial.sql
-- Initial schema for the OmniRoute Rust rewrite.
-- The CREATE TABLE statements below mirror the schema bootstrap in src/schema.rs
-- so the migration runner and the bootstrap stay in sync. Any divergence
-- should be resolved by editing both places.

CREATE TABLE IF NOT EXISTS schema_version (
    version INTEGER PRIMARY KEY,
    applied_at TEXT NOT NULL DEFAULT (datetime('now')),
    description TEXT
);
