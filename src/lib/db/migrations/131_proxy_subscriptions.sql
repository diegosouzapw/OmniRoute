-- 131_proxy_subscriptions.sql
-- User-supplied proxy subscriptions (Karing-style): the operator pastes a
-- subscription URL that resolves to a pool of proxy nodes. Nodes are synced
-- into proxy_registry (source='subscription', subscription_id set) and bound
-- through the existing account/provider/global scope resolution.
--
-- Columns:
--   name                 — human label
--   url                  — subscription link
--   enabled              — 0/1 master on/off switch
--   mode                 — 'global' (bind pool to global scope) or
--                          'rule' (bind pool to selected provider scopes only)
--   rule_providers       — JSON array of provider ids used in 'rule' mode
--   local_core_endpoint  — optional local SOCKS5/HTTP endpoint (e.g. a running
--                          sing-box/clash) that fronts SS/VMess/Trojan/VLESS nodes
--   update_interval_minutes — auto-refresh period
--   last_fetched_at      — last successful/attempted fetch timestamp
--   status               — 'ok' | 'error' | 'empty'
--   error                — last error / warning message
--   last_nodes           — redacted node summary (JSON) for display without re-fetch

CREATE TABLE IF NOT EXISTS proxy_subscriptions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  enabled INTEGER NOT NULL DEFAULT 0,
  mode TEXT NOT NULL DEFAULT 'global',
  rule_providers TEXT,
  local_core_endpoint TEXT,
  update_interval_minutes INTEGER NOT NULL DEFAULT 60,
  last_fetched_at TEXT,
  status TEXT NOT NULL DEFAULT 'empty',
  error TEXT,
  last_nodes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_proxy_subscriptions_enabled ON proxy_subscriptions(enabled);

-- Tag subscription-sourced rows in the registry so refresh/cleanup can scope to them.
ALTER TABLE proxy_registry ADD COLUMN subscription_id TEXT;

CREATE INDEX IF NOT EXISTS idx_proxy_registry_subscription ON proxy_registry(subscription_id);
