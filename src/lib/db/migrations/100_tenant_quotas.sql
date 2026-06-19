-- Migration 100: tenant_quotas
--
-- Per-tenant quota ledger for the A2A `quota-management` skill
-- (closes 1/6 remaining DEBT-006 a2a skill stubs). The primary key is
-- (tenant_id, resource) so a single tenant can hold independent caps
-- for tokens / requests / cost_usd without a second table.
--
-- Concurrency: the `consume` path issues a single
--   UPDATE tenant_quotas
--      SET used = used + ?
--    WHERE tenant_id = ? AND resource = ?
--      AND used + ? <= "limit"
-- statement. SQLite serialises writes, so two concurrent debits cannot
-- both succeed past the cap — the loser sees `changes() === 0` and is
-- reported as `over_limit`. There is no read-then-write window in the
-- application code.
--
-- The ledger is intentionally append-style: a `reset` UPSERTs the cap
-- and zeros `used`; historic `used` values are not preserved (callers
-- that need history should consult `usage_history`).

CREATE TABLE IF NOT EXISTS tenant_quotas (
  tenant_id   TEXT NOT NULL,
  resource    TEXT NOT NULL,
  used        REAL NOT NULL DEFAULT 0,
  "limit"     REAL NOT NULL DEFAULT 0,
  reset_at    TEXT NOT NULL,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (tenant_id, resource),
  CHECK (resource IN ('tokens', 'requests', 'cost_usd')),
  CHECK (used >= 0),
  CHECK ("limit" >= 0)
);

CREATE INDEX IF NOT EXISTS idx_tq_tenant    ON tenant_quotas(tenant_id);
CREATE INDEX IF NOT EXISTS idx_tq_reset     ON tenant_quotas(reset_at);
CREATE INDEX IF NOT EXISTS idx_tq_resource  ON tenant_quotas(resource);
