-- Migration 060: Gamification leaderboard, badges, XP, token ledger, invites, community servers

CREATE TABLE IF NOT EXISTS leaderboard (
  api_key_id TEXT NOT NULL,
  scope TEXT NOT NULL DEFAULT 'global',
  score INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (api_key_id, scope)
) WITHOUT ROWID;

CREATE INDEX IF NOT EXISTS idx_leaderboard_scope_score
  ON leaderboard (scope, score DESC, api_key_id);

CREATE TABLE IF NOT EXISTS user_levels (
  api_key_id TEXT PRIMARY KEY,
  total_xp INTEGER NOT NULL DEFAULT 0,
  current_level INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
) WITHOUT ROWID;

CREATE TABLE IF NOT EXISTS badge_definitions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  category TEXT,
  rarity TEXT NOT NULL DEFAULT 'common',
  criteria TEXT,
  hidden INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS user_badges (
  api_key_id TEXT NOT NULL,
  badge_id TEXT NOT NULL,
  unlocked_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (api_key_id, badge_id)
) WITHOUT ROWID;

CREATE INDEX IF NOT EXISTS idx_user_badges_badge_id
  ON user_badges (badge_id);

CREATE TABLE IF NOT EXISTS xp_audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  api_key_id TEXT NOT NULL,
  action TEXT NOT NULL,
  xp_earned INTEGER NOT NULL,
  metadata TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_xp_audit_log_api_key_created
  ON xp_audit_log (api_key_id, created_at);

CREATE TABLE IF NOT EXISTS token_ledger (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  from_api_key_id TEXT NOT NULL,
  to_api_key_id TEXT NOT NULL,
  amount INTEGER NOT NULL CHECK (amount > 0),
  reason TEXT,
  idempotency_key TEXT UNIQUE,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS invite_tokens (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  token_hash TEXT NOT NULL UNIQUE,
  created_by TEXT NOT NULL,
  used_by TEXT,
  server_url TEXT,
  max_uses INTEGER NOT NULL DEFAULT 1,
  use_count INTEGER NOT NULL DEFAULT 0,
  expires_at TEXT,
  revoked_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_invite_tokens_code
  ON invite_tokens (code);

CREATE INDEX IF NOT EXISTS idx_invite_tokens_token_hash
  ON invite_tokens (token_hash);

CREATE TABLE IF NOT EXISTS community_servers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  api_key_hash TEXT NOT NULL,
  connected_at TEXT NOT NULL DEFAULT (datetime('now')),
  last_sync_at TEXT,
  status TEXT NOT NULL DEFAULT 'connected' CHECK (status IN ('connected', 'disconnected', 'error')),
  error_message TEXT
);
