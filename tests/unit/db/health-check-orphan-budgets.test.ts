/**
 * Regression: automatic health-check repair must not delete the live spend
 * policy of a synthetic (non-persisted) API key identity.
 *
 * The deployment-time env key authenticates without an `api_keys` row, so its
 * `domain_budgets` / `domain_cost_history` rows used to look like broken
 * references and were deleted every repair cycle — silently, because
 * `checkBudget()` is fail-open when no budget row exists.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

import { runDbHealthCheck, type DbHealthCheckResult } from "../../../src/lib/db/healthCheck.ts";
import { SYNTHETIC_ENV_API_KEY_ID } from "../../../src/shared/constants/apiKeyIdentities.ts";
import type { SqliteAdapter } from "../../../src/lib/db/adapters/types.ts";

const MANAGED_KEY_ID = "11111111-2222-3333-4444-555555555555";
const REAL_ORPHAN_ID = "99999999-8888-7777-6666-555555555555";

type Harness = {
  db: SqliteAdapter;
  cleanup: () => void;
  backups: number;
  run: (autoRepair?: boolean) => DbHealthCheckResult;
  budgetIds: () => string[];
  historyIds: () => string[];
};

function adapt(raw: Database.Database, name: string): SqliteAdapter {
  return {
    driver: "better-sqlite3" as const,
    get open() {
      return raw.open;
    },
    name,
    prepare: (sql: string) => raw.prepare(sql),
    exec: (sql: string) => raw.exec(sql),
    pragma: (p: string, o?: { simple?: boolean }) => raw.pragma(p, o),
    transaction: (fn: (...args: unknown[]) => unknown) => raw.transaction(fn),
    immediate: (fn: () => void) => raw.transaction(fn).immediate(),
    backup: async () => undefined,
    checkpoint: () => undefined,
    close: () => raw.close(),
    raw,
  };
}

function makeHarness(seed: {
  managedKey?: boolean;
  budgets?: string[];
  history?: string[];
}): Harness {
  const dir = mkdtempSync(path.join(tmpdir(), "omniroute-healthcheck-"));
  const file = path.join(dir, "storage.sqlite");
  const raw = new Database(file);
  raw.exec(`
    CREATE TABLE api_keys (id TEXT PRIMARY KEY, name TEXT);
    CREATE TABLE domain_budgets (api_key_id TEXT PRIMARY KEY, daily_limit_usd REAL);
    CREATE TABLE domain_cost_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      api_key_id TEXT NOT NULL,
      cost REAL,
      timestamp INTEGER
    );
    CREATE TABLE db_meta (key TEXT PRIMARY KEY, value TEXT);
    INSERT INTO db_meta (key, value) VALUES ('schema_version', '1');
  `);
  if (seed.managedKey !== false) {
    raw.prepare("INSERT INTO api_keys (id, name) VALUES (?, ?)").run(MANAGED_KEY_ID, "managed");
  }
  for (const id of seed.budgets ?? []) {
    raw.prepare("INSERT INTO domain_budgets (api_key_id, daily_limit_usd) VALUES (?, 15)").run(id);
  }
  for (const id of seed.history ?? []) {
    raw
      .prepare("INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES (?, 0.01, ?)")
      .run(id, Date.now());
  }
  const db = adapt(raw, file);
  const harness: Harness = {
    db,
    backups: 0,
    cleanup: () => {
      raw.close();
      rmSync(dir, { recursive: true, force: true });
    },
    run: (autoRepair = true) =>
      runDbHealthCheck(db, {
        autoRepair,
        skipIntegrityCheck: true,
        expectedSchemaVersion: "1",
        createBackupBeforeRepair: () => {
          harness.backups += 1;
          return true;
        },
      }),
    budgetIds: () =>
      (
        raw.prepare("SELECT api_key_id FROM domain_budgets ORDER BY api_key_id").all() as {
          api_key_id: string;
        }[]
      ).map((r) => r.api_key_id),
    historyIds: () =>
      (
        raw.prepare("SELECT api_key_id FROM domain_cost_history ORDER BY api_key_id").all() as {
          api_key_id: string;
        }[]
      ).map((r) => r.api_key_id),
  };
  return harness;
}

test("CASE A — a managed key's budget and history survive repair", () => {
  const h = makeHarness({ budgets: [MANAGED_KEY_ID], history: [MANAGED_KEY_ID] });
  try {
    h.run();
    assert.deepEqual(h.budgetIds(), [MANAGED_KEY_ID]);
    assert.deepEqual(h.historyIds(), [MANAGED_KEY_ID]);
  } finally {
    h.cleanup();
  }
});

test("CASE B — the synthetic env key's budget and history survive repair", () => {
  const h = makeHarness({
    budgets: [SYNTHETIC_ENV_API_KEY_ID],
    history: [SYNTHETIC_ENV_API_KEY_ID],
  });
  try {
    const result = h.run();
    assert.deepEqual(h.budgetIds(), [SYNTHETIC_ENV_API_KEY_ID]);
    assert.deepEqual(h.historyIds(), [SYNTHETIC_ENV_API_KEY_ID]);
    assert.equal(
      result.issues.filter((i) => i.type === "broken_reference").length,
      0,
      "a synthetic owner must not even be reported as a broken reference"
    );
  } finally {
    h.cleanup();
  }
});

test("CASE C — a genuine orphan is still removed", () => {
  const h = makeHarness({ budgets: [REAL_ORPHAN_ID], history: [REAL_ORPHAN_ID] });
  try {
    const result = h.run();
    assert.deepEqual(h.budgetIds(), []);
    assert.deepEqual(h.historyIds(), []);
    assert.equal(result.repairedCount, 2);
  } finally {
    h.cleanup();
  }
});

test("CASE D — orphan budget only", () => {
  const h = makeHarness({ budgets: [REAL_ORPHAN_ID] });
  try {
    h.run();
    assert.deepEqual(h.budgetIds(), []);
  } finally {
    h.cleanup();
  }
});

test("CASE E — orphan history only", () => {
  const h = makeHarness({ history: [REAL_ORPHAN_ID] });
  try {
    h.run();
    assert.deepEqual(h.historyIds(), []);
  } finally {
    h.cleanup();
  }
});

test("CASE F — nothing orphaned emits no destructive repair", () => {
  const h = makeHarness({
    budgets: [MANAGED_KEY_ID, SYNTHETIC_ENV_API_KEY_ID],
    history: [MANAGED_KEY_ID, SYNTHETIC_ENV_API_KEY_ID],
  });
  try {
    h.run();
    assert.equal(h.budgetIds().length, 2);
    assert.equal(h.backups, 0, "a no-op repair must not take a backup");
  } finally {
    h.cleanup();
  }
});

test("CASE G — mixed owners: only the orphan goes", () => {
  const h = makeHarness({
    budgets: [MANAGED_KEY_ID, SYNTHETIC_ENV_API_KEY_ID, REAL_ORPHAN_ID],
    history: [MANAGED_KEY_ID, SYNTHETIC_ENV_API_KEY_ID, REAL_ORPHAN_ID],
  });
  try {
    h.run();
    assert.deepEqual(h.budgetIds().sort(), [MANAGED_KEY_ID, SYNTHETIC_ENV_API_KEY_ID].sort());
    assert.deepEqual(h.historyIds().sort(), [MANAGED_KEY_ID, SYNTHETIC_ENV_API_KEY_ID].sort());
  } finally {
    h.cleanup();
  }
});

test("CASE H — backup still precedes a destructive repair", () => {
  const h = makeHarness({ budgets: [REAL_ORPHAN_ID] });
  try {
    const result = h.run();
    assert.equal(h.backups, 1);
    assert.equal(result.backupCreated, true);
  } finally {
    h.cleanup();
  }
});

test("CASE I — the env-key budget survives repeated repair cycles", () => {
  const h = makeHarness({
    budgets: [SYNTHETIC_ENV_API_KEY_ID],
    history: [SYNTHETIC_ENV_API_KEY_ID],
  });
  try {
    for (let cycle = 0; cycle < 5; cycle += 1) h.run();
    assert.deepEqual(h.budgetIds(), [SYNTHETIC_ENV_API_KEY_ID]);
    assert.deepEqual(h.historyIds(), [SYNTHETIC_ENV_API_KEY_ID]);
  } finally {
    h.cleanup();
  }
});

test("CASE J — fail-open is never reached through maintenance", () => {
  // The budget check is fail-open when the row is absent, so "row still there
  // after maintenance" is the property that keeps the ceiling enforceable.
  const h = makeHarness({ budgets: [SYNTHETIC_ENV_API_KEY_ID] });
  try {
    h.run();
    assert.equal(h.budgetIds().includes(SYNTHETIC_ENV_API_KEY_ID), true);
  } finally {
    h.cleanup();
  }
});

test("read-only check reports nothing destructive", () => {
  const h = makeHarness({ budgets: [REAL_ORPHAN_ID] });
  try {
    h.run(false);
    assert.deepEqual(h.budgetIds(), [REAL_ORPHAN_ID], "autoRepair=false must not delete");
    assert.equal(h.backups, 0);
  } finally {
    h.cleanup();
  }
});
