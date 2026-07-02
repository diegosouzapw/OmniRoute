-- Migration 008: Registered Keys Provisioning API (#464)
--
-- Adds three tables:
--   registered_keys      — auto-provisioned API keys with quota metadata
--   provider_key_limits  — per-provider issuance limits
--   account_key_limits   — per-account issuance limits

-- --------------------------------------------------------------------------
-- Table: registered_keys
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS registered_keys (
  id            TEXT PRIMARY KEY,           -- UUID
  key           TEXT NOT NULL UNIQUE,       -- hashed key material (sha256)
  key_prefix    TEXT NOT NULL,              -- first 8 chars for display (e.g. "ork_abc1")
  name          TEXT NOT NULL,
  provider      TEXT NOT NULL DEFAULT '',   -- associated provider (optional)
  account_id    TEXT NOT NULL DEFAULT '',   -- account/tenant identifier
  is_active     INTEGER NOT NULL DEFAULT 1,
  revoked_at    TEXT,                       -- ISO timestamp, null if active
  expires_at    TEXT,                       -- ISO timestamp, null = no expiry
  idempotency_key TEXT UNIQUE,             -- prevents duplicate issue requests
  daily_budget  INTEGER,                   -- max requests per day (null = unlimited)
  hourly_budget INTEGER,                   -- max requests per hour (null = unlimited)
  daily_used    INTEGER NOT NULL DEFAULT 0,
  hourly_used   INTEGER NOT NULL DEFAULT 0,
  last_reset_day  TEXT NOT NULL DEFAULT '',  -- YYYY-MM-DD for daily reset tracking
  last_reset_hour TEXT NOT NULL DEFAULT '',  -- YYYY-MM-DDTHH for hourly reset tracking
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_registered_keys_provider  ON registered_keys(provider);
CREATE INDEX IF NOT EXISTS idx_registered_keys_account   ON registered_keys(account_id);
CREATE INDEX IF NOT EXISTS idx_registered_keys_active    ON registered_keys(is_active);
CREATE INDEX IF NOT EXISTS idx_registered_keys_idempotency ON registered_keys(idempotency_key);

-- --------------------------------------------------------------------------
-- Table: provider_key_limits  (per-provider issuance limits)
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS provider_key_limits (
  provider         TEXT PRIMARY KEY,
  max_active_keys  INTEGER,   -- null = unlimited
  daily_issue_limit  INTEGER, -- max keys per day
  hourly_issue_limit INTEGER, -- max keys per hour
  daily_issued     INTEGER NOT NULL DEFAULT 0,
  hourly_issued    INTEGER NOT NULL DEFAULT 0,
  last_reset_day   TEXT NOT NULL DEFAULT '',
  last_reset_hour  TEXT NOT NULL DEFAULT '',
  updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
);

-- --------------------------------------------------------------------------
-- Table: account_key_limits  (per-account issuance limits)
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS account_key_limits (
  account_id       TEXT PRIMARY KEY,
  max_active_keys  INTEGER,
  daily_issue_limit  INTEGER,
  hourly_issue_limit INTEGER,
  daily_issued     INTEGER NOT NULL DEFAULT 0,
  hourly_issued    INTEGER NOT NULL DEFAULT 0,
  last_reset_day   TEXT NOT NULL DEFAULT '',
  last_reset_hour  TEXT NOT NULL DEFAULT '',
  updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
);
