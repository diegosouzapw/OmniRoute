import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { loadSqliteRuntime, clearRuntimeCache } from "../../../bin/cli/runtime/sqliteRuntime.mjs";

test("loadSqliteRuntime returns a result with driver and source", async () => {
  clearRuntimeCache();
  const r = await loadSqliteRuntime();
  assert.ok(r, "result is truthy");
  assert.ok(typeof r.driver === "object", "driver is object");
  assert.ok(typeof r.source === "string", "source is string");
});

test("loaded driver is one of the known kinds", async () => {
  clearRuntimeCache();
  const r = await loadSqliteRuntime();
  assert.ok(
    ["better-sqlite3", "node-sqlite", "sql-js"].includes(r.driver.kind),
    `kind="${r.driver.kind}" must be known`
  );
});

test("loadSqliteRuntime caches the result (same object reference)", async () => {
  clearRuntimeCache();
  const a = await loadSqliteRuntime();
  const b = await loadSqliteRuntime();
  assert.strictEqual(a, b, "second call returns cached object");
});

test("runtime dir exists after loadSqliteRuntime when runtime source used", async () => {
  clearRuntimeCache();
  const r = await loadSqliteRuntime();
  if (r.source === "runtime-installed-now" || r.source === "runtime") {
    const runtimeDir = join(homedir(), ".omniroute", "runtime");
    assert.ok(existsSync(runtimeDir), "runtime dir created");
  }
});

test("clearRuntimeCache allows fresh resolution", async () => {
  clearRuntimeCache();
  const first = await loadSqliteRuntime();
  clearRuntimeCache();
  const second = await loadSqliteRuntime();
  // Both should resolve to the same kind, but are different call results
  assert.equal(first.driver.kind, second.driver.kind, "same driver kind after cache clear");
});
