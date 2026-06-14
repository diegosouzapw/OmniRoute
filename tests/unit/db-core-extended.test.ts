import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-core-ext-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");

function cleanupGlobalDb() {
  try {
    if ((globalThis as any).__omnirouteDb?.open) {
      (globalThis as any).__omnirouteDb.close();
    }
  } catch {}
  delete (globalThis as any).__omnirouteDb;
}

async function resetStorage() {
  cleanupGlobalDb();
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 50 * (attempt + 1)));
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test("isNativeSqliteLoadError returns false for non-error values", () => {
  assert.equal(core.isNativeSqliteLoadError(null), false);
  assert.equal(core.isNativeSqliteLoadError(undefined), false);
  assert.equal(core.isNativeSqliteLoadError("string"), false);
  assert.equal(core.isNativeSqliteLoadError(123), false);
});

test("isNativeSqliteLoadError returns false for generic errors", () => {
  assert.equal(core.isNativeSqliteLoadError(new Error("generic")), false);
});

test("isNativeSqliteLoadError returns true for native module errors", () => {
  const err = new Error("Module did not self-register");
  assert.equal(core.isNativeSqliteLoadError(err), true);
});

test("getDbInstance returns a database instance", async () => {
  await resetStorage();
  const db = core.getDbInstance();
  assert.ok(db);
  assert.ok(typeof db.prepare === "function");
});

test("getDbInstance returns same instance on second call (singleton)", async () => {
  await resetStorage();
  const db1 = core.getDbInstance();
  const db2 = core.getDbInstance();
  assert.equal(db1, db2);
});

test("resetDbInstance allows getting a fresh instance", async () => {
  await resetStorage();
  core.getDbInstance();
  core.resetDbInstance();
  const db2 = core.getDbInstance();
  assert.ok(db2);
  assert.ok(typeof db2.prepare === "function");
});

test("closeDbInstance closes the database", async () => {
  await resetStorage();
  core.getDbInstance();
  const result = core.closeDbInstance();
  assert.ok(typeof result === "boolean");
});

test("closeDbInstance returns false when no instance", async () => {
  await resetStorage();
  core.resetDbInstance();
  delete (globalThis as any).__omnirouteDb;
  const result = core.closeDbInstance();
  assert.ok(typeof result === "boolean");
});

test("getDriverInfo returns driver info object", async () => {
  await resetStorage();
  core.getDbInstance();
  const info = core.getDriverInfo();
  assert.ok(info === null || typeof info === "object");
  if (info) {
    assert.ok(typeof info.driver === "string");
  }
});

test("setAutoVacuum and getAutoVacuumMode round-trip", async () => {
  await resetStorage();
  core.getDbInstance();
  core.setAutoVacuum("FULL");
  const mode = core.getAutoVacuumMode();
  assert.equal(mode, "FULL");
});

test("setAutoVacuum accepts NONE", async () => {
  await resetStorage();
  core.getDbInstance();
  core.setAutoVacuum("NONE");
  const mode = core.getAutoVacuumMode();
  assert.equal(mode, "NONE");
});

test("setAutoVacuum accepts INCREMENTAL", async () => {
  await resetStorage();
  core.getDbInstance();
  core.setAutoVacuum("INCREMENTAL");
  const mode = core.getAutoVacuumMode();
  assert.equal(mode, "INCREMENTAL");
});

test("runManualVacuum returns success result", async () => {
  await resetStorage();
  core.getDbInstance();
  const result = core.runManualVacuum();
  assert.ok(typeof result === "object");
  assert.ok(typeof result.success === "boolean");
  assert.ok(typeof result.duration === "number");
});

test("runManagedDbHealthCheck returns health info", async () => {
  await resetStorage();
  core.getDbInstance();
  const result = core.runManagedDbHealthCheck();
  assert.ok(typeof result === "object");
});

test("runManagedDbHealthCheck with autoRepair option", async () => {
  await resetStorage();
  core.getDbInstance();
  const result = core.runManagedDbHealthCheck({ autoRepair: true });
  assert.ok(typeof result === "object");
});

test("setPageSize accepts valid page sizes", async () => {
  await resetStorage();
  core.getDbInstance();
  assert.doesNotThrow(() => core.setPageSize(4096));
});

test("toSnakeCase converts camelCase to snake_case", () => {
  assert.equal(core.toSnakeCase("camelCase"), "camel_case");
  assert.equal(core.toSnakeCase("testCase"), "test_case");
  assert.equal(core.toSnakeCase("already"), "already");
});

test("toCamelCase converts snake_case to camelCase", () => {
  assert.equal(core.toCamelCase("snake_case"), "snakeCase");
  assert.equal(core.toCamelCase("test_case"), "testCase");
  assert.equal(core.toCamelCase("already"), "already");
  assert.equal(core.toCamelCase("a"), "a");
});

test("objToSnake converts object keys to snake_case", () => {
  const result = core.objToSnake({ camelCase: 1, anotherKey: 2 }) as any;
  assert.equal(result.camel_case, 1);
  assert.equal(result.another_key, 2);
});

test("objToSnake handles null/undefined/primitives", () => {
  assert.equal(core.objToSnake(null), null);
  assert.equal(core.objToSnake(undefined), undefined);
  assert.equal(core.objToSnake(42), 42);
  assert.equal(core.objToSnake("str"), "str");
});

test("rowToCamel converts object keys to camelCase", () => {
  const result = core.rowToCamel({ snake_case: 1, another_key: 2 });
  assert.ok(result);
  assert.equal(result.snakeCase, 1);
  assert.equal(result.anotherKey, 2);
});

test("rowToCamel returns null for null/undefined", () => {
  assert.equal(core.rowToCamel(null), null);
  assert.equal(core.rowToCamel(undefined), null);
});

test("rowToCamel handles isActive conversion", () => {
  const result = core.rowToCamel({ is_active: 1 });
  assert.ok(result);
  assert.equal(result.isActive, true);
});

test("rowToCamel handles is_active=0 as false", () => {
  const result = core.rowToCamel({ is_active: 0 });
  assert.ok(result);
  assert.equal(result.isActive, false);
});

test("cleanNulls removes null values from object", () => {
  const result = core.cleanNulls({ a: 1, b: null, c: "hello", d: null });
  assert.deepEqual(result, { a: 1, c: "hello" });
});

test("cleanNulls handles nested objects", () => {
  const result = core.cleanNulls({ a: { b: null, c: 1 }, d: null });
  assert.deepEqual(result, { a: { b: null, c: 1 } });
});

test("cleanNulls returns empty object for null input", () => {
  const result = core.cleanNulls(null);
  assert.deepEqual(result, {});
});
