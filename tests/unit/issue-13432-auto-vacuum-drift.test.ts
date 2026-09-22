/**
 * Regression test for #13432 — migration 046 seeds
 * `databaseSettings.autoVacuumMode = "INCREMENTAL"` into the key_value config
 * store for every database it runs against, including pre-existing ones, but
 * never touches the live SQLite `auto_vacuum` pragma (that requires a
 * `VACUUM`). The only automatic startup path
 * (`applyStoredDatabaseOptimizationSettings`) deliberately skips applying it
 * synchronously — reapplying it inline at boot would reintroduce the
 * blocking-VACUUM-on-a-multi-GB-database hazard tracked by #12821.
 *
 * Fix: detect the drift at startup (never fix it synchronously there), log +
 * persist it, and let the existing out-of-request vacuumScheduler reconcile
 * it (pragma flip + one-time conversion VACUUM) on its next scheduled run.
 * Once auto_vacuum is actually INCREMENTAL, subsequent scheduled runs use a
 * bounded `PRAGMA incremental_vacuum` batch instead of an unconditional full
 * `VACUUM`.
 *
 * DB isolation pattern mirrors tests/unit/db/vacuum-scheduler.test.ts:
 * temp DATA_DIR, resetDbInstance() before each test, cleanup in test.after().
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13432-"));
const originalDataDir = process.env.DATA_DIR;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
core.resetDbInstance();

const optimizationSettings = await import("../../src/lib/db/optimizationSettings.ts");
const scheduler = await import("../../src/lib/db/vacuumScheduler.ts");

function seedMigration046Config(mode: "NONE" | "FULL" | "INCREMENTAL") {
  // Simulate src/lib/db/migrations/046_database_settings.sql:41 running
  // against a pre-existing database: it only ever touches the config store.
  const db = core.getDbInstance();
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "databaseSettings",
    "autoVacuumMode",
    JSON.stringify(mode)
  );
}

function readPersistedDriftRecord(): unknown {
  const db = core.getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get("scheduler", "vacuumDrift") as { value: string } | undefined;
  return row ? JSON.parse(row.value) : undefined;
}

test.beforeEach(() => {
  scheduler.__resetForTests();
  const db = core.getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace IN ('scheduler', 'databaseSettings')").run();
});

test.after(() => {
  scheduler.__resetForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

test("issue #13432: startup drift detection records the mismatch WITHOUT running a blocking VACUUM", () => {
  const db = core.getDbInstance();

  const initialLiveMode = optimizationSettings.getAutoVacuumModeForDb(db);
  assert.equal(initialLiveMode, "NONE", "sanity: fresh test DB defaults to auto_vacuum=NONE");

  seedMigration046Config("INCREMENTAL");

  // Simulate the next app startup (src/lib/db/core.ts calls this on every boot).
  optimizationSettings.applyStoredDatabaseOptimizationSettings(db);

  // The core bug: the live pragma must NOT have been synchronously flipped —
  // that is the #12821 blocking-VACUUM-at-boot hazard this fix must avoid.
  assert.equal(
    optimizationSettings.getAutoVacuumModeForDb(db),
    "NONE",
    "startup path must never run a synchronous VACUUM to fix drift"
  );

  // But the drift must now be detected and persisted for the scheduler to
  // reconcile out-of-request.
  const persisted = readPersistedDriftRecord();
  assert.deepEqual(persisted, { configured: "INCREMENTAL", live: "NONE" });
});

test("issue #13432: vacuumScheduler.runNow() reconciles a pending startup drift out-of-request", async () => {
  const db = core.getDbInstance();
  seedMigration046Config("INCREMENTAL");
  optimizationSettings.applyStoredDatabaseOptimizationSettings(db);
  assert.deepEqual(readPersistedDriftRecord(), { configured: "INCREMENTAL", live: "NONE" });

  scheduler.init();
  try {
    const result = await scheduler.runNow();
    assert.equal(result.success, true);

    // The scheduler's bounded, out-of-request reconcile run is where the
    // one-time conversion VACUUM is allowed to happen.
    assert.equal(optimizationSettings.getAutoVacuumModeForDb(db), "INCREMENTAL");
    assert.equal(scheduler.getState().autoVacuumDrift, null);
    assert.equal(readPersistedDriftRecord(), null);
  } finally {
    scheduler.stop();
  }
});

test("issue #13432: once INCREMENTAL is actually in effect and no drift remains, runNow() uses a bounded PRAGMA incremental_vacuum instead of a full VACUUM", async () => {
  const db = core.getDbInstance();
  seedMigration046Config("INCREMENTAL");
  optimizationSettings.applyStoredDatabaseOptimizationSettings(db);

  scheduler.init();
  try {
    // First run reconciles the drift (pragma flip + one-time VACUUM).
    await scheduler.runNow();
    assert.equal(optimizationSettings.getAutoVacuumModeForDb(db), "INCREMENTAL");
    assert.equal(scheduler.getState().autoVacuumDrift, null);

    // Second run: no drift left, live mode is INCREMENTAL — must take the
    // bounded incremental-vacuum path (reported via lastReclaimedPages),
    // never the unconditional full VACUUM this scheduler used to always run.
    const second = await scheduler.runNow();
    assert.equal(second.success, true);
    assert.equal(typeof scheduler.getState().lastReclaimedPages, "number");
  } finally {
    scheduler.stop();
  }
});
