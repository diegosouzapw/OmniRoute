-- Migration 070: Add kind and encrypted metadata to webhooks
ALTER TABLE webhooks ADD COLUMN kind TEXT NOT NULL DEFAULT 'custom';
ALTER TABLE webhooks ADD COLUMN metadata_encrypted BLOB;
