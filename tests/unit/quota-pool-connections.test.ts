/**
 * tests/unit/quota-pool-connections.test.ts
 *
 * Phase D1 — Multi-provider quota pools.
 *
 * Coverage:
 * - Migration file exists and contains expected SQL.
 * - createPool with connectionIds: [a, b] → getPool returns connectionIds.length === 2
 *   and connectionId === a (primary).
 * - updatePool replacing connectionIds → getPool reflects new set.
 * - deletePool removes join rows.
 * - Pool created the old way (single connectionId, no connectionIds arg) →
 *   connectionIds === [connectionId] (back-compat).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── DB harness (same pattern as db-quota-pools.test.ts) ────────────────────
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pool-conn-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (err: any) {
      if ((err?.code === "EBUSY" || err?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw err;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ── D1.1: Migration file ────────────────────────────────────────────────────

test("migration 086 file exists and contains quota_pool_connections DDL", () => {
  const migrationPath = path.resolve(
    "src/lib/db/migrations/087_quota_pool_connections.sql"
  );
  assert.ok(fs.existsSync(migrationPath), `migration file not found: ${migrationPath}`);

  const sql = fs.readFileSync(migrationPath, "utf8");
  assert.ok(
    sql.includes("quota_pool_connections"),
    "migration SQL should reference quota_pool_connections"
  );
  assert.ok(
    sql.includes("INSERT OR IGNORE INTO quota_pool_connections"),
    "migration SQL should contain the backfill INSERT"
  );
  assert.ok(
    sql.includes("SELECT id, connection_id FROM quota_pools"),
    "backfill SELECT should reference quota_pools columns"
  );
});

// ── D1.2: createPool with connectionIds ────────────────────────────────────

test("createPool with connectionIds: [a, b] → connectionIds.length === 2, connectionId === a", () => {
  const pool = poolsDb.createPool({
    connectionId: "conn-a",
    name: "Multi-conn Pool",
    connectionIds: ["conn-a", "conn-b"],
  });

  assert.ok(pool.id, "pool should have an id");
  assert.equal(pool.connectionId, "conn-a", "primary connectionId should be conn-a");
  assert.equal(pool.connectionIds.length, 2, "connectionIds should have 2 members");
  assert.ok(pool.connectionIds.includes("conn-a"), "conn-a should be a member");
  assert.ok(pool.connectionIds.includes("conn-b"), "conn-b should be a member");
  assert.equal(pool.connectionIds[0], "conn-a", "first connectionId should be the primary");
});

test("getPool reflects both connectionIds after multi-connection create", () => {
  const created = poolsDb.createPool({
    connectionId: "p-a",
    name: "Pool ABC",
    connectionIds: ["p-a", "p-b", "p-c"],
  });

  const found = poolsDb.getPool(created.id)!;
  assert.ok(found, "pool should be found");
  assert.equal(found.connectionId, "p-a");
  assert.equal(found.connectionIds.length, 3);
  assert.deepEqual([...found.connectionIds].sort(), ["p-a", "p-b", "p-c"].sort());
});

// ── D1.3: updatePool replacing connectionIds ────────────────────────────────

test("updatePool with new connectionIds replaces the join rows", () => {
  const pool = poolsDb.createPool({
    connectionId: "old-a",
    name: "Updatable Pool",
    connectionIds: ["old-a", "old-b"],
  });

  const updated = poolsDb.updatePool(pool.id, {
    connectionIds: ["new-x", "new-y"],
  });

  assert.ok(updated, "updatePool should return the updated pool");
  assert.equal(updated!.connectionId, "new-x", "primary should be updated to new-x");
  assert.equal(updated!.connectionIds.length, 2);
  assert.ok(updated!.connectionIds.includes("new-x"), "new-x should be a member");
  assert.ok(updated!.connectionIds.includes("new-y"), "new-y should be a member");
  assert.ok(!updated!.connectionIds.includes("old-a"), "old-a should be removed");
  assert.ok(!updated!.connectionIds.includes("old-b"), "old-b should be removed");

  // Re-read from DB to confirm persistence.
  const reread = poolsDb.getPool(pool.id)!;
  assert.equal(reread.connectionId, "new-x");
  assert.deepEqual([...reread.connectionIds].sort(), ["new-x", "new-y"].sort());
});

test("updatePool without connectionIds leaves join rows untouched", () => {
  const pool = poolsDb.createPool({
    connectionId: "stable-a",
    name: "Stable Pool",
    connectionIds: ["stable-a", "stable-b"],
  });

  poolsDb.updatePool(pool.id, { name: "Renamed Pool" });

  const reread = poolsDb.getPool(pool.id)!;
  assert.equal(reread.name, "Renamed Pool");
  assert.equal(reread.connectionIds.length, 2, "connectionIds should be unchanged");
  assert.ok(reread.connectionIds.includes("stable-a"));
  assert.ok(reread.connectionIds.includes("stable-b"));
});

// ── D1.4: deletePool removes join rows ────────────────────────────────────

test("deletePool removes quota_pool_connections rows", () => {
  const pool = poolsDb.createPool({
    connectionId: "del-a",
    name: "To Delete",
    connectionIds: ["del-a", "del-b"],
  });

  const deleted = poolsDb.deletePool(pool.id);
  assert.equal(deleted, true, "deletePool should return true");

  // Pool should be gone.
  assert.equal(poolsDb.getPool(pool.id), null, "pool should be null after deletion");

  // The join rows are cleaned up — no ghost references.
  // We verify indirectly: creating a new pool with the same connection IDs should work
  // without PK conflicts in quota_pool_connections.
  const newPool = poolsDb.createPool({
    connectionId: "del-a",
    name: "Reused conn",
    connectionIds: ["del-a", "del-b"],
  });
  assert.ok(newPool.id, "new pool with same conn IDs should be created without conflict");
});

// ── D1.5: Back-compat — single connectionId, no connectionIds arg ──────────

test("pool created with single connectionId (legacy) returns connectionIds === [connectionId]", () => {
  const pool = poolsDb.createPool({
    connectionId: "legacy-conn",
    name: "Legacy Pool",
  });

  assert.equal(pool.connectionId, "legacy-conn");
  assert.deepEqual(pool.connectionIds, ["legacy-conn"]);

  const found = poolsDb.getPool(pool.id)!;
  assert.deepEqual(found.connectionIds, ["legacy-conn"]);
});

test("listPools returns connectionIds on every pool", () => {
  poolsDb.createPool({ connectionId: "lc-1", name: "Pool 1" });
  poolsDb.createPool({
    connectionId: "lc-2",
    name: "Pool 2",
    connectionIds: ["lc-2", "lc-3"],
  });

  const pools = poolsDb.listPools();
  assert.equal(pools.length, 2);

  const p1 = pools.find((p) => p.name === "Pool 1")!;
  assert.deepEqual(p1.connectionIds, ["lc-1"]);

  const p2 = pools.find((p) => p.name === "Pool 2")!;
  assert.equal(p2.connectionIds.length, 2);
});
