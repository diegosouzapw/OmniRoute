-- Migration 187: quota_schedules
--
-- Time-aware quota rules for a quota pool: each row is a recurring window
-- (days of week + start/end minute of day) that says WHEN OmniRoute may use
-- the accounts in the pool, and HOW MUCH of the account it may burn there.
--
-- Two orthogonal knobs per window (either, both, or neither may be set):
--
--   reserves        — "how much must be LEFT on the account", as a JSON array of
--                     {"window": <quota window>|"any", "percent": <0..100>} rules.
--                     Each rule is evaluated against the upstream saturation
--                     signal for that window, which reflects the WHOLE account
--                     (OmniRoute plus anyone else using it), so a human on the
--                     same account always keeps that headroom. Rules are ANDed:
--                     the first unsatisfied one closes the window. "any" means
--                     the most-consumed window of the plan decides, which is the
--                     right default when the operator does not want to think in
--                     terms of the provider's individual windows.
--                     Example: [{"window":"weekly","percent":30},
--                               {"window":"5h","percent":10}]
--                     keeps a weekly reserve big enough to survive the week while
--                     still letting a single 5h burst run almost to the edge.
--
--   budget_value    — "how much OMNIROUTE may consume here". Evaluated against
--   budget_unit       OmniRoute's OWN recorded consumption (quota_consumption
--   budget_window     rows keyed on "<pool_id>:sched:<schedule_id>"), so a third
--                     party burning the same account never eats this allowance
--                     and never inflates it.
--
-- Only countable units are accepted for budget_unit: 'percent' is excluded on
-- purpose because OmniRoute cannot attribute a share of an upstream percentage
-- to itself — the percent case is what `reserves` is for.
--
-- mode:
--   'allow' — the window admits traffic (subject to reserve/budget).
--   'block' — blackout; the window denies traffic outright.
--
-- Resolution (see src/lib/quota/schedules.ts):
--   * no rows for the pool            → schedules impose nothing (back-compat).
--   * a matching 'block' row          → blocked (blackout wins over allow).
--   * a matching 'allow' row          → that window's reserve/budget apply.
--   * no match, pool has 'allow' rows → blocked (outside permitted hours).
--   * no match, only 'block' rows     → allowed (blacklist semantics).
--   Ties are broken by priority DESC, then id ASC.
--
-- days is a CSV of JS getDay() values (0 = Sunday .. 6 = Saturday), e.g. "1,2,3,4,5".
-- start_minute/end_minute are minutes from local midnight. end_minute <= start_minute
-- means the window wraps past midnight, and `days` refers to the day it STARTS on.
-- timezone is an IANA zone (NULL = server local time).
--
-- Idempotent: safe to run more than once.

CREATE TABLE IF NOT EXISTS quota_schedules (
  id             TEXT    PRIMARY KEY,
  pool_id        TEXT    NOT NULL,
  label          TEXT,
  days           TEXT    NOT NULL,
  start_minute   INTEGER NOT NULL CHECK (start_minute >= 0 AND start_minute < 1440),
  end_minute     INTEGER NOT NULL CHECK (end_minute > 0 AND end_minute <= 1440),
  timezone       TEXT,
  mode           TEXT    NOT NULL DEFAULT 'allow' CHECK (mode IN ('allow','block')),
  reserves       TEXT,
  budget_value   REAL             CHECK (budget_value IS NULL OR budget_value > 0),
  budget_unit    TEXT             CHECK (budget_unit IS NULL OR budget_unit IN ('requests','tokens','usd')),
  budget_window  TEXT    NOT NULL DEFAULT 'daily' CHECK (budget_window IN ('hourly','5h','daily','weekly','monthly')),
  priority       INTEGER NOT NULL DEFAULT 0,
  enabled        INTEGER NOT NULL DEFAULT 1 CHECK (enabled IN (0,1)),
  created_at     TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_quota_schedules_pool
  ON quota_schedules(pool_id, enabled);
