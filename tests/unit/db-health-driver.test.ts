import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-health-driver-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "db-health-driver-secret";

const core = await import("../../src/lib/db/core.ts");
const healthCheckDb = await import("../../src/lib/db/healthCheck.ts");
const driverFactory = await import("../../src/lib/db/adapters/driverFactory.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ─── describeDbDriver: pure decision ───────────────────

test("the sql.js WASM fallback is reported degraded", () => {
  assert.deepEqual(
    healthCheckDb.describeDbDriver({ driver: "sql.js", name: "/data/storage.sqlite" }),
    {
      name: "sql.js",
      degraded: true,
    }
  );
});

test("a native driver backed by a real file is not degraded", () => {
  for (const driver of ["better-sqlite3", "node:sqlite", "bun:sqlite"] as const) {
    assert.deepEqual(healthCheckDb.describeDbDriver({ driver, name: "/data/storage.sqlite" }), {
      name: driver,
      degraded: false,
    });
  }
});

test("an in-memory database is degraded even on a native driver", () => {
  for (const driver of ["better-sqlite3", "node:sqlite", "bun:sqlite", "sql.js"] as const) {
    assert.deepEqual(healthCheckDb.describeDbDriver({ driver, name: ":memory:" }), {
      name: driver,
      degraded: true,
    });
  }
});

// ─── runDbHealthCheck: wiring against ground truth ─────

test("the health check reports the driver of the database it actually ran against", () => {
  const db = core.getDbInstance();
  const result = healthCheckDb.runDbHealthCheck(db, { autoRepair: false });

  assert.equal(result.driver.name, db.driver);

  // Precondition: the fixture is file-backed, so `degraded` is asserted as a literal
  // rather than re-derived from the implementation's own condition.
  assert.ok(db.name.endsWith(".sqlite"), `expected a file-backed fixture, got ${db.name}`);
  assert.equal(result.driver.degraded, false);
});

test("an in-memory database opened through the real cascade is reported degraded", () => {
  // Same tryOpenSync() the cloud/build path reaches through openSqliteDatabase(), so the
  // `:memory:` name is observed from the adapter rather than assumed.
  const memoryAdapter = driverFactory.tryOpenSync(":memory:");
  assert.ok(memoryAdapter, "expected the native cascade to open an in-memory database");
  try {
    assert.equal(memoryAdapter.name, ":memory:");
    assert.equal(healthCheckDb.describeDbDriver(memoryAdapter).degraded, true);
  } finally {
    memoryAdapter.close();
  }
});
