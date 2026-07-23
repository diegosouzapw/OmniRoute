-- 125_provider_connection_quota_visibility.sql
-- Controls whether a provider connection is shown in quota-focused dashboard views.
-- This is presentation-only and does not affect routing or provider-limit collection.

ALTER TABLE provider_connections ADD COLUMN quota_visible INTEGER NOT NULL DEFAULT 1;
