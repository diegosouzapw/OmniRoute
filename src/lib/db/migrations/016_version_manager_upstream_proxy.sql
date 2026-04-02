-- Migration 016: Version Manager & Upstream Proxy tables
-- 
-- Adds two tables for CLIProxyAPI integration:
--   version_manager       — binary lifecycle management for CLI tools (CLIProxyAPI, etc.)
--   upstream_proxy_config — per-provider routing mode (native vs CLIProxyAPI vs fallback)

-- --------------------------------------------------------------------------
-- Table: version_manager
-- Tracks installed versions, process state, and update settings for
-- externally managed CLI tools (initially CLIProxyAPI).
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS version_manager (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  tool              TEXT NOT NULL UNIQUE,           -- 'cliproxyapi' | 'omniroute'
  current_version   TEXT,                           -- latest known release version
  installed_version TEXT,                           -- currently installed version
  pinned_version    TEXT,                           -- user-pinned version (null = auto)
  binary_path       TEXT,                           -- absolute path to binary
  status            TEXT NOT NULL DEFAULT 'not_installed',  -- not_installed | installed | running | stopped | error
  pid               INTEGER,                        -- process ID when running
  port              INTEGER DEFAULT 8317,           -- managed tool's port
  api_key           TEXT,                           -- API key for CLIProxyAPI (from its config)
  management_key    TEXT,                           -- CLIProxyAPI management secret key
  auto_update       INTEGER NOT NULL DEFAULT 1,    -- 1 = auto-update enabled
  auto_start        INTEGER NOT NULL DEFAULT 0,    -- 1 = start with OmniRoute
  last_health_check TEXT,                           -- ISO timestamp
  last_update_check TEXT,                           -- ISO timestamp
  health_status     TEXT DEFAULT 'unknown',         -- unknown | healthy | unhealthy | timeout
  config_overrides  TEXT,                           -- JSON blob for CLIProxyAPI config overrides
  error_message     TEXT,                           -- last error message
  created_at        TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at        TEXT NOT NULL DEFAULT (datetime('now'))
);

-- --------------------------------------------------------------------------
-- Table: upstream_proxy_config
-- Per-provider routing configuration for CLIProxyAPI passthrough mode.
-- Determines whether each provider uses OmniRoute's native executor,
-- delegates to CLIProxyAPI, or uses fallback (native first, then CLIProxyAPI).
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS upstream_proxy_config (
  id                        INTEGER PRIMARY KEY AUTOINCREMENT,
  provider_id               TEXT NOT NULL UNIQUE,          -- e.g., 'antigravity', 'claude', 'codex'
  mode                      TEXT NOT NULL DEFAULT 'native', -- 'native' | 'cliproxyapi' | 'fallback'
  cliproxyapi_model_mapping TEXT,                           -- JSON: { "ag/gemini-3-pro": "gemini-3-pro-high", ... }
  native_priority           INTEGER NOT NULL DEFAULT 1,    -- order in fallback chain (1 = first)
  cliproxyapi_priority      INTEGER NOT NULL DEFAULT 2,    -- order in fallback chain
  enabled                   INTEGER NOT NULL DEFAULT 1,
  created_at                TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at                TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_upc_provider ON upstream_proxy_config(provider_id);
CREATE INDEX IF NOT EXISTS idx_upc_mode ON upstream_proxy_config(mode);
CREATE INDEX IF NOT EXISTS idx_vm_tool ON version_manager(tool);
CREATE INDEX IF NOT EXISTS idx_vm_status ON version_manager(status);
