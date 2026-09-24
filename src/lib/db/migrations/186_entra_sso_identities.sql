-- Migration 186: Entra ID SSO identities + API key provenance.
--
-- sso_identities binds an Entra user to the "shadow" api_keys row provisioned
-- for them on first sight. key_group_members has a FOREIGN KEY to api_keys(id),
-- so routing SSO users through a real key row means group policy, budgets and
-- call-log attribution apply unchanged instead of every path needing an SSO
-- branch. oid as PRIMARY KEY makes just-in-time provisioning idempotent under
-- concurrency.
--
-- api_keys.source distinguishes 'manual' from 'sso'. The UI uses it to label
-- SSO rows and to never render a copyable secret for them — an SSO shadow
-- key's secret is internal, and exposing it would create a static credential
-- that bypasses SSO.

CREATE TABLE IF NOT EXISTS sso_identities (
  oid           TEXT PRIMARY KEY NOT NULL,
  tenant_id     TEXT NOT NULL,
  upn           TEXT,
  display_name  TEXT,
  api_key_id    TEXT NOT NULL,
  -- key_groups ids resolved on the last successful auth, for drift detection.
  last_groups   TEXT NOT NULL DEFAULT '[]',
  last_seen_at  TEXT,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (api_key_id) REFERENCES api_keys(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_sso_identities_api_key
  ON sso_identities(api_key_id);

ALTER TABLE api_keys ADD COLUMN source TEXT NOT NULL DEFAULT 'manual';
