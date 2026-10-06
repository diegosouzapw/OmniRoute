import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-health-check-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "task-303-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const healthCheckDb = await import("../../src/lib/db/healthCheck.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function insertBrokenRows(db) {
  db.prepare(
    `INSERT INTO quota_snapshots
      (provider, connection_id, window_key, remaining_percentage, is_exhausted, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run("openai", "missing-conn", "monthly", 75, 0, new Date().toISOString());

  db.prepare(
    `INSERT INTO quota_snapshots
      (provider, connection_id, window_key, remaining_percentage, is_exhausted, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run("openai", "missing-conn-2", "monthly", 55, 0, "not-a-timestamp");

  db.prepare(
    "INSERT INTO domain_budgets (api_key_id, daily_limit_usd, monthly_limit_usd, warning_threshold) VALUES (?, ?, ?, ?)"
  ).run("missing-key", 10, 100, 0.8);
  db.prepare("INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES (?, ?, ?)").run(
    "missing-key",
    1.5,
    Date.now()
  );
  db.prepare("INSERT INTO domain_fallback_chains (model, chain) VALUES (?, ?)").run(
    "broken-model",
    "{invalid"
  );
  db.prepare(
    "INSERT INTO domain_lockout_state (identifier, attempts, locked_until) VALUES (?, ?, ?)"
  ).run("broken-lockout", "{invalid", null);
  db.prepare(
    "INSERT INTO domain_circuit_breakers (name, state, failure_count, last_failure_time, options) VALUES (?, ?, ?, ?, ?)"
  ).run("broken-breaker", "OPEN", 3, Date.now(), "{invalid");
}

test("runDbHealthCheck reports issues without mutating when autoRepair is disabled", async () => {
  const db = core.getDbInstance();
  insertBrokenRows(db);

  const result = healthCheckDb.runDbHealthCheck(db, { autoRepair: false });

  assert.equal(result.isHealthy, false);
  assert.equal(result.repairedCount, 0);
  assert.equal(result.issues.length, 6);
  assert.equal((db.prepare("SELECT COUNT(*) AS count FROM quota_snapshots").get() as any).count, 2);
  assert.equal((db.prepare("SELECT COUNT(*) AS count FROM domain_budgets").get() as any).count, 1);
  assert.equal(
    (db.prepare("SELECT COUNT(*) AS count FROM domain_fallback_chains").get() as any).count,
    1
  );
});

test("runDbHealthCheck tolerates databases without a combos table", async () => {
  const db = core.getDbInstance();
  db.exec("DROP TABLE combos");

  const result = healthCheckDb.runDbHealthCheck(db, { autoRepair: false });

  assert.equal(result.isHealthy, true);
  assert.equal(
    result.issues.some((issue) => issue.table === "combos"),
    false
  );
});

test("runDbHealthCheck auto-repairs orphan rows and invalid JSON payloads", async () => {
  const db = core.getDbInstance();
  insertBrokenRows(db);

  const result = healthCheckDb.runDbHealthCheck(db, {
    autoRepair: true,
    createBackupBeforeRepair: () => true,
  });

  assert.equal(result.isHealthy, false);
  assert.equal(result.backupCreated, true);
  assert.equal(result.repairedCount, 7);
  assert.equal((db.prepare("SELECT COUNT(*) AS count FROM quota_snapshots").get() as any).count, 0);
  assert.equal((db.prepare("SELECT COUNT(*) AS count FROM domain_budgets").get() as any).count, 0);
  assert.equal(
    (db.prepare("SELECT COUNT(*) AS count FROM domain_cost_history").get() as any).count,
    0
  );
  assert.equal(
    (db.prepare("SELECT COUNT(*) AS count FROM domain_fallback_chains").get() as any).count,
    0
  );
  assert.equal(
    (db.prepare("SELECT COUNT(*) AS count FROM domain_lockout_state").get() as any).count,
    0
  );
  assert.equal(
    (
      db
        .prepare("SELECT options FROM domain_circuit_breakers WHERE name = ?")
        .get("broken-breaker") as any
    ).options,
    null
  );
});

test("runDbHealthCheck repairs broken combo payloads, combo refs and stale connection pins", async () => {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  const activeConnection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Healthy Connection",
    apiKey: "sk-healthy",
  });
  db.prepare(
    "INSERT INTO combos (id, name, data, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(
    "combo-child",
    "combo-child",
    JSON.stringify({
      id: "combo-child",
      name: "combo-child",
      strategy: "priority",
      models: ["openai/gpt-4o-mini"],
      config: {},
      isActive: true,
      createdAt: now,
      updatedAt: now,
    }),
    0,
    now,
    now
  );

  db.prepare(
    "INSERT INTO combos (id, name, data, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).run("combo-invalid", "combo-invalid", "{invalid", 1, now, now);

  db.prepare(
    "INSERT INTO combos (id, name, data, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(
    "combo-broken",
    "combo-broken",
    JSON.stringify({
      id: "combo-broken",
      name: "combo-broken",
      strategy: "priority",
      models: [
        "combo-child",
        "combo-broken",
        { id: "ref-missing", kind: "combo-ref", comboName: "missing-child", weight: 0 },
        {
          id: "model-pinned",
          kind: "model",
          providerId: "openai",
          model: "openai/gpt-4o-mini",
          connectionId: "missing-connection",
          weight: 0,
        },
        {
          id: "model-healthy",
          kind: "model",
          providerId: "openai",
          model: "openai/gpt-4o-mini",
          connectionId: activeConnection.id,
          weight: 0,
        },
      ],
      config: {},
      isActive: true,
      createdAt: now,
      updatedAt: now,
    }),
    2,
    now,
    now
  );

  const result = healthCheckDb.runDbHealthCheck(db, {
    autoRepair: true,
    createBackupBeforeRepair: () => true,
  });
  const invalidCombo = JSON.parse(
    (db.prepare("SELECT data FROM combos WHERE id = ?").get("combo-invalid") as any).data
  );
  const repairedCombo = JSON.parse(
    (db.prepare("SELECT data FROM combos WHERE id = ?").get("combo-broken") as any).data
  );

  assert.equal(
    result.issues.some((issue) => issue.table === "combos"),
    true
  );
  assert.equal(result.repairedCount, 5);
  assert.equal(invalidCombo.isActive, false);
  assert.match(invalidCombo.repairNote, /invalid JSON/i);
  assert.equal(repairedCombo.models.length, 3);
  assert.equal(
    repairedCombo.models.some(
      (step) => step.kind === "combo-ref" && step.comboName === "combo-child"
    ),
    true
  );
  assert.equal("connectionId" in repairedCombo.models[1], false);
  assert.equal(repairedCombo.models[2].connectionId, activeConnection.id);
  assert.match(repairedCombo.repairNote, /broken combo step/i);
  assert.match(repairedCombo.repairNote, /legacy combo ref/i);
});

test("runDbHealthCheck diagnosis does not request backups for combo-only issues", async () => {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  let backupAttempts = 0;

  db.prepare(
    "INSERT INTO combos (id, name, data, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(
    "combo-broken",
    "combo-broken",
    JSON.stringify({
      id: "combo-broken",
      name: "combo-broken",
      strategy: "priority",
      models: [{ id: "ref-missing", kind: "combo-ref", comboName: "missing-child", weight: 0 }],
      config: {},
      isActive: true,
      createdAt: now,
      updatedAt: now,
    }),
    1,
    now,
    now
  );

  const result = healthCheckDb.runDbHealthCheck(db, {
    autoRepair: false,
    createBackupBeforeRepair: () => {
      backupAttempts += 1;
      return true;
    },
  });

  assert.equal(result.repairedCount, 0);
  assert.equal(result.backupCreated, false);
  assert.equal(backupAttempts, 0);
});

test("getDbInstance runs the startup health check synchronously by default (DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED off, #13717)", async () => {
  let db = core.getDbInstance();
  insertBrokenRows(db);
  core.resetDbInstance();

  // This file runs under `node --test`, so isAutomatedTestProcess() is true
  // and createManagedDbBackup() (the startup path's real callback) always
  // returns false — runDbHealthCheck's backup gate then aborts the repair
  // (by design, unrelated to #13717: see the parameterized
  // "backup ... blocks every mutation" cases in db-health-resource-bounds.test.ts).
  // That is exactly what lets this test observe the check's TIMING cleanly:
  // the abort is logged via console.warn synchronously inside getDbInstance()
  // when the flag is off, and only AFTER it returns when the flag is on
  // (covered end-to-end, including a real successful repair, by the
  // subprocess-isolated tests/unit/db-health-startup-deferred-flag-13717.test.ts,
  // which does not run under a test-process-detected NODE_ENV/argv).
  const warnings: string[] = [];
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    warnings.push(args.map(String).join(" "));
  };

  const previousForce = process.env.OMNIROUTE_FORCE_DB_HEALTHCHECK;
  process.env.OMNIROUTE_FORCE_DB_HEALTHCHECK = "1";
  try {
    // DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED is off (default, #13717): the
    // startup health check (and its backup-gated abort) has already run
    // synchronously by the time getDbInstance() returns — no polling needed.
    db = core.getDbInstance();
    assert.ok(
      warnings.some((w) => w.includes("Startup health-check failed")),
      "the synchronous branch must have already logged the aborted health check by the time getDbInstance() returns"
    );
  } finally {
    console.warn = originalWarn;
    if (previousForce === undefined) {
      delete process.env.OMNIROUTE_FORCE_DB_HEALTHCHECK;
    } else {
      process.env.OMNIROUTE_FORCE_DB_HEALTHCHECK = previousForce;
    }
  }

  // The backup-gated abort happens on the very first repair opportunity
  // runDbHealthCheck encounters, before any DELETE/UPDATE runs anywhere —
  // so every broken row inserted above is still present, unrepaired.
  assert.equal((db.prepare("SELECT COUNT(*) AS count FROM quota_snapshots").get() as any).count, 2);
  assert.equal((db.prepare("SELECT COUNT(*) AS count FROM domain_budgets").get() as any).count, 1);
});

// The DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED=on path (#13717) is exercised in
// its own subprocess-isolated test, tests/unit/db-health-startup-deferred-flag-13717.test.ts
// — a real file-backed DB routes the deferred check through runDbHealthInChild
// (a genuine child process), which this file's per-test full-migration reset
// harness is not built to interleave safely with.

test("getDbInstance skips automatic startup repair during tests unless forced", async () => {
  let db = core.getDbInstance();
  insertBrokenRows(db);
  core.resetDbInstance();

  db = core.getDbInstance();

  assert.equal((db.prepare("SELECT COUNT(*) AS count FROM quota_snapshots").get() as any).count, 2);
  assert.equal((db.prepare("SELECT COUNT(*) AS count FROM domain_budgets").get() as any).count, 1);
  assert.equal(
    (db.prepare("SELECT COUNT(*) AS count FROM domain_cost_history").get() as any).count,
    1
  );
  assert.equal(
    (db.prepare("SELECT COUNT(*) AS count FROM domain_fallback_chains").get() as any).count,
    1
  );
  assert.equal(
    (db.prepare("SELECT COUNT(*) AS count FROM domain_lockout_state").get() as any).count,
    1
  );
});

test("runDbHealthCheck repairs a drifted db_meta schema version", async () => {
  const db = core.getDbInstance();
  db.prepare("UPDATE db_meta SET value = ? WHERE key = 'schema_version'").run("0");

  const result = healthCheckDb.runDbHealthCheck(db, {
    autoRepair: true,
    createBackupBeforeRepair: () => true,
  });

  assert.equal(
    result.issues.some((issue) => issue.table === "db_meta"),
    true
  );
  assert.equal(
    (db.prepare("SELECT value FROM db_meta WHERE key = 'schema_version'").get() as any).value,
    "1"
  );
});

test("deleteApiKey removes domain budget and cost history rows for that key", async () => {
  const created = await apiKeysDb.createApiKey("Cleanup Key", "machine-health");
  const db = core.getDbInstance();

  db.prepare(
    "INSERT INTO domain_budgets (api_key_id, daily_limit_usd, monthly_limit_usd, warning_threshold) VALUES (?, ?, ?, ?)"
  ).run(created.id, 5, 50, 0.9);
  db.prepare("INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES (?, ?, ?)").run(
    created.id,
    0.5,
    Date.now()
  );

  assert.equal(await apiKeysDb.deleteApiKey(created.id), true);
  assert.equal(
    (
      db
        .prepare("SELECT COUNT(*) AS count FROM domain_budgets WHERE api_key_id = ?")
        .get(created.id) as any
    ).count,
    0
  );
  assert.equal(
    (
      db
        .prepare("SELECT COUNT(*) AS count FROM domain_cost_history WHERE api_key_id = ?")
        .get((created as any).id) as any
    ).count,
    0
  );
});

test("deleteProviderConnection and bulk delete remove related quota snapshots", async () => {
  const first = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Primary",
    apiKey: "sk-primary",
  });
  const second = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Secondary",
    apiKey: "sk-secondary",
  });
  const db = core.getDbInstance();

  db.prepare(
    `INSERT INTO quota_snapshots
      (provider, connection_id, window_key, remaining_percentage, is_exhausted, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run("openai", first.id, "monthly", 80, 0, new Date().toISOString());
  db.prepare(
    `INSERT INTO quota_snapshots
      (provider, connection_id, window_key, remaining_percentage, is_exhausted, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run("openai", second.id, "monthly", 40, 0, new Date().toISOString());

  assert.equal(await providersDb.deleteProviderConnection((first as any).id), true);
  assert.equal(
    (
      db.prepare("SELECT COUNT(*) AS count FROM quota_snapshots WHERE connection_id = ?") as any
    ).get(first.id).count,
    0
  );

  await providersDb.deleteProviderConnectionsByProvider("openai");
  assert.equal(
    (
      db
        .prepare("SELECT COUNT(*) AS count FROM quota_snapshots WHERE connection_id = ?")
        .get(second.id) as any
    ).count,
    0
  );
});
