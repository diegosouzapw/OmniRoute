/**
 * tests/unit/quota-groups-migration.test.ts
 *
 * Task B1 — first-class quota Group entity.
 *
 * Coverage:
 * - Migration file 088_quota_groups.sql exists and contains the expected SQL.
 * - After migrations run (fresh DB), quota_groups has a 'group-demo' row.
 * - createPool without groupId → pool.groupId === 'group-demo'.
 * - createPool with groupId: 'g1' (group pre-inserted) → pool.groupId === 'g1'.
 * - getPool and listPools both surface groupId.
 * - updatePool with groupId updates the group assignment.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── DB harness (mirrors quota-pool-connections.test.ts) ─────────────────────
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-groups-"));
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

// Helper to get a raw DB handle for inspection / seeding.
function getDb() {
  return core.getDbInstance() as unknown as {
    prepare: <TRow = unknown>(sql: string) => {
      all: (...params: unknown[]) => TRow[];
      get: (...params: unknown[]) => TRow | undefined;
      run: (...params: unknown[]) => { changes: number };
    };
  };
}

// ── B1.1: Migration file content ─────────────────────────────────────────────

test("migration 087 file exists", () => {
  const migrationPath = path.resolve("src/lib/db/migrations/088_quota_groups.sql");
  assert.ok(fs.existsSync(migrationPath), `migration file not found: ${migrationPath}`);
});

test("migration 087 contains quota_groups CREATE TABLE", () => {
  const sql = fs.readFileSync(
    path.resolve("src/lib/db/migrations/088_quota_groups.sql"),
    "utf8"
  );
  assert.ok(sql.includes("quota_groups"), "migration SQL should reference quota_groups");
  assert.ok(
    sql.includes("CREATE TABLE IF NOT EXISTS quota_groups"),
    "migration SQL should create quota_groups with IF NOT EXISTS"
  );
});

test("migration 087 seeds group-demo", () => {
  const sql = fs.readFileSync(
    path.resolve("src/lib/db/migrations/088_quota_groups.sql"),
    "utf8"
  );
  assert.ok(
    sql.includes("group-demo"),
    "migration SQL should insert the 'group-demo' seed row"
  );
  assert.ok(
    sql.includes("INSERT OR IGNORE INTO quota_groups"),
    "migration SQL should use INSERT OR IGNORE for idempotency"
  );
});

test("migration 087 adds group_id column to quota_pools", () => {
  const sql = fs.readFileSync(
    path.resolve("src/lib/db/migrations/088_quota_groups.sql"),
    "utf8"
  );
  assert.ok(
    sql.includes("ALTER TABLE quota_pools ADD COLUMN group_id"),
    "migration SQL should ALTER TABLE quota_pools to add group_id"
  );
});

test("migration 087 contains backfill UPDATE for existing pools", () => {
  const sql = fs.readFileSync(
    path.resolve("src/lib/db/migrations/088_quota_groups.sql"),
    "utf8"
  );
  assert.ok(
    sql.includes("UPDATE quota_pools SET group_id = 'group-demo'"),
    "migration SQL should backfill existing pools to group-demo"
  );
  assert.ok(
    sql.includes("group_id IS NULL OR group_id = ''"),
    "backfill should only touch pools without a group"
  );
});

// ── B1.2: Schema after migration ──────────────────────────────────────────────

test("after migrations run, quota_groups has a group-demo row named GroupDemo", () => {
  // Trigger DB initialisation (runs all migrations including 087).
  const db = getDb();

  const row = db
    .prepare<{ id: string; name: string }>(
      "SELECT id, name FROM quota_groups WHERE id = 'group-demo'"
    )
    .get();

  assert.ok(row, "group-demo row should exist in quota_groups");
  assert.equal(row!.id, "group-demo");
  assert.equal(row!.name, "GroupDemo");
});

test("quota_pools has a group_id column after migration", () => {
  const db = getDb();
  const cols = db
    .prepare<{ name: string }>("PRAGMA table_info(quota_pools)")
    .all()
    .map((r) => r.name);
  assert.ok(cols.includes("group_id"), "quota_pools should have a group_id column");
});

// ── B1.3: createPool defaults ─────────────────────────────────────────────────

test("createPool without groupId → pool.groupId === 'group-demo'", () => {
  // Ensure migrations have run.
  getDb();

  const pool = poolsDb.createPool({
    connectionId: "conn-1",
    name: "Default Group Pool",
  });

  assert.equal(pool.groupId, "group-demo", "groupId should default to 'group-demo'");

  // Re-read from DB to confirm persistence.
  const reread = poolsDb.getPool(pool.id);
  assert.ok(reread, "pool should be findable after creation");
  assert.equal(reread!.groupId, "group-demo", "persisted groupId should be 'group-demo'");
});

test("createPool with explicit groupId persists the given group", () => {
  const db = getDb();

  // Seed a custom group first (raw SQL, as quotaGroups module is not yet implemented).
  db.prepare("INSERT OR IGNORE INTO quota_groups (id, name) VALUES ('g1', 'Group One')").run();

  const pool = poolsDb.createPool({
    connectionId: "conn-g1",
    name: "G1 Pool",
    groupId: "g1",
  });

  assert.equal(pool.groupId, "g1", "groupId should be 'g1'");

  const reread = poolsDb.getPool(pool.id);
  assert.ok(reread, "pool should be findable after creation");
  assert.equal(reread!.groupId, "g1", "persisted groupId should be 'g1'");
});

// ── B1.4: listPools surfaces groupId ─────────────────────────────────────────

test("listPools returns groupId on every pool", () => {
  const db = getDb();
  db.prepare("INSERT OR IGNORE INTO quota_groups (id, name) VALUES ('g2', 'Group Two')").run();

  poolsDb.createPool({ connectionId: "lp-1", name: "Pool Default" });
  poolsDb.createPool({ connectionId: "lp-2", name: "Pool G2", groupId: "g2" });

  const pools = poolsDb.listPools();
  assert.equal(pools.length, 2);

  const pDef = pools.find((p) => p.name === "Pool Default")!;
  assert.equal(pDef.groupId, "group-demo");

  const pG2 = pools.find((p) => p.name === "Pool G2")!;
  assert.equal(pG2.groupId, "g2");
});

// ── B1.5: updatePool groupId ──────────────────────────────────────────────────

test("updatePool with groupId updates the group assignment", () => {
  const db = getDb();
  db.prepare("INSERT OR IGNORE INTO quota_groups (id, name) VALUES ('g3', 'Group Three')").run();

  const pool = poolsDb.createPool({ connectionId: "up-1", name: "Update Group Pool" });
  assert.equal(pool.groupId, "group-demo");

  const updated = poolsDb.updatePool(pool.id, { groupId: "g3" });
  assert.ok(updated, "updatePool should return the updated pool");
  assert.equal(updated!.groupId, "g3", "groupId should be updated to 'g3'");

  const reread = poolsDb.getPool(pool.id);
  assert.equal(reread!.groupId, "g3", "persisted groupId should be 'g3'");
});
