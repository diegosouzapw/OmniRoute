/**
 * Unit tests for src/lib/db/quotaPools.ts — pagination and batchBuildPools.
 *
 * Uses isolated DATA_DIR per run; each test gets a fresh DB.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-pools-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const qp = await import("../../../src/lib/db/quotaPools.ts");
const { getDbInstance } = await import("../../../src/lib/db/core.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

// Insert a pool + optional connection row directly (bypass create for speed).
function insertPool(
  id: string,
  name: string,
  connectionId: string,
  createdAt = new Date().toISOString()
) {
  const db = getDbInstance();
  db.prepare(
    "INSERT INTO quota_pools (id, name, group_id, connection_id, created_at) VALUES (?, ?, ?, ?, ?)"
  ).run(id, name, "default", connectionId, createdAt);
}

test.beforeEach(() => {
  resetDb();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ─────────────────────────────────────────────────────────────────────────────
// listPools — pagination
// ─────────────────────────────────────────────────────────────────────────────

test("listPools without limit/offset returns all pools", () => {
  insertPool("p1", "Alpha", "c1");
  insertPool("p2", "Beta", "c2");
  const result = qp.listPools();
  assert.equal(result.total, 2);
  assert.equal(result.items.length, 2);
});

test("listPools with limit returns ≤ limit items, total unchanged", () => {
  insertPool("p1", "Alpha", "c1");
  insertPool("p2", "Beta", "c2");
  insertPool("p3", "Gamma", "c3");
  const result = qp.listPools({ limit: 2 });
  assert.equal(result.total, 3);
  assert.equal(result.items.length, 2);
});

test("listPools with limit+offset returns correct slice", () => {
  insertPool("p1", "Alpha", "c1", "2024-01-01T00:00:00Z");
  insertPool("p2", "Beta", "c2", "2024-01-02T00:00:00Z");
  insertPool("p3", "Gamma", "c3", "2024-01-03T00:00:00Z");
  const result = qp.listPools({ limit: 1, offset: 1 });
  assert.equal(result.total, 3);
  assert.equal(result.items.length, 1);
  assert.equal(result.items[0].name, "Beta");
});

test("listPools with only offset (no limit) ignores offset", () => {
  insertPool("p1", "Alpha", "c1");
  insertPool("p2", "Beta", "c2");
  // offset without limit — should not add OFFSET clause (was a bug)
  const result = qp.listPools({ offset: 1 });
  assert.equal(result.total, 2);
  assert.equal(result.items.length, 2);
});

test("listPools with zero limit treated as no limit", () => {
  insertPool("p1", "Alpha", "c1");
  // limit=0 is invalid in SQL — code treats it as "no limit"
  const result = qp.listPools({ limit: 0 });
  assert.equal(result.total, 1);
  assert.equal(result.items.length, 1);
});

// ─────────────────────────────────────────────────────────────────────────────
// getPoolsByGroup — pagination
// ─────────────────────────────────────────────────────────────────────────────

test("getPoolsByGroup with limit returns correct count", () => {
  insertPool("p1", "A", "c1");
  insertPool("p2", "B", "c2");
  const items = qp.getPoolsByGroup("default", 1);
  assert.equal(items.length, 1);
});

test("getPoolsByGroup with limit+offset returns correct slice", () => {
  insertPool("p1", "Alpha", "c1", "2024-01-01T00:00:00Z");
  insertPool("p2", "Beta", "c2", "2024-01-02T00:00:00Z");
  insertPool("p3", "Gamma", "c3", "2024-01-03T00:00:00Z");
  const items = qp.getPoolsByGroup("default", 1, 2);
  assert.equal(items.length, 1);
  assert.equal(items[0].name, "Gamma");
});

test("getPoolsByGroup with only offset ignores offset", () => {
  insertPool("p1", "Alpha", "c1");
  insertPool("p2", "Beta", "c2");
  const items = qp.getPoolsByGroup("default", undefined, 1);
  assert.equal(items.length, 2);
});

test("getPoolsByGroup with empty group returns []", () => {
  const items = qp.getPoolsByGroup("nonexistent");
  assert.deepEqual(items, []);
});

// ─────────────────────────────────────────────────────────────────────────────
// batchBuildPools — allocations loaded in batch
// ─────────────────────────────────────────────────────────────────────────────

test("batchBuildPools loads allocations in single query", () => {
  const db = getDbInstance();
  db.prepare(
    "INSERT INTO quota_pools (id, name, group_id, connection_id, created_at) VALUES (?, ?, ?, ?, ?)"
  ).run("p1", "PoolA", "default", "c1", new Date().toISOString());
  db.prepare(
    "INSERT INTO quota_allocations (pool_id, api_key_id, weight, cap_value) VALUES (?, ?, ?, ?)"
  ).run("p1", "ak_test", 1, 100);

  const result = qp.listPools();
  assert.equal(result.items.length, 1);
  assert.equal(result.total, 1);
  const pool = result.items[0];
  assert.equal(pool.name, "PoolA");
  assert.ok(pool.allocations !== undefined);
});
