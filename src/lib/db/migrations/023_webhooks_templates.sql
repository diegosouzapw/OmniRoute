-- Migration 023: Add payload_template to webhooks
ALTER TABLE webhooks ADD COLUMN payload_template TEXT;
