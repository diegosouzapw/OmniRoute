/**
 * tests/unit/db-quota-pools.test.ts
 *
 * CRUD coverage for src/lib/db/quotaPools.ts:
 * - create → list → get → update → delete lifecycle
 * - Returns null / false for missing IDs
 * - upsertAllocations replace strategy
 * - FK CASCADE: allocations removed when pool is deleted
 * - listAllocationsForApiKey cross-pool filtering
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-pools-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const { getDbInstance } = core;

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

// ---------------------------------------------------------------------------
// Basic CRUD
// ---------------------------------------------------------------------------

test("createPool creates a pool with no allocations", () => {
  const pool = poolsDb.createPool({ connectionId: "conn-1", name: "Test Pool" });

  assert.ok(pool.id, "should have an id");
  assert.equal(pool.connectionId, "conn-1");
  assert.equal(pool.name, "Test Pool");
  assert.ok(pool.createdAt, "should have createdAt");
  assert.deepEqual(pool.allocations, []);
});

test("createPool creates a pool with initial allocations", () => {
  const pool = poolsDb.createPool({
    connectionId: "conn-2",
    name: "Pool With Allocs",
    allocations: [
      { apiKeyId: "key-a", weight: 60, policy: "hard" },
      { apiKeyId: "key-b", weight: 40, policy: "soft" },
    ],
  });

  assert.equal(pool.allocations.length, 2);
  const keyA = pool.allocations.find((a) => a.apiKeyId === "key-a");
  assert.ok(keyA);
  assert.equal(keyA!.weight, 60);
  assert.equal(keyA!.policy, "hard");
});

test("listPools returns all pools in creation order", () => {
  poolsDb.createPool({ connectionId: "c1", name: "First" });
  poolsDb.createPool({ connectionId: "c2", name: "Second" });

  const pools = poolsDb.listPools();
  assert.equal(pools.length, 2);
  assert.equal(pools[0].name, "First");
  assert.equal(pools[1].name, "Second");
});

test("getPool returns pool by id", () => {
  const created = poolsDb.createPool({ connectionId: "c3", name: "Findable" });
  const found = poolsDb.getPool(created.id);
  assert.ok(found);
  assert.equal(found!.id, created.id);
  assert.equal(found!.name, "Findable");
});

test("getPool returns null for unknown id", () => {
  const found = poolsDb.getPool("nonexistent-id");
  assert.equal(found, null);
});

test("updatePool updates the name", () => {
  const pool = poolsDb.createPool({ connectionId: "c4", name: "Old Name" });
  const updated = poolsDb.updatePool(pool.id, { name: "New Name" });
  assert.ok(updated);
  assert.equal(updated!.name, "New Name");
  assert.equal(updated!.connectionId, "c4");
});

test("updatePool replaces allocations when provided", () => {
  const pool = poolsDb.createPool({
    connectionId: "c5",
    name: "P",
    allocations: [{ apiKeyId: "key-x", weight: 100, policy: "hard" }],
  });

  const updated = poolsDb.updatePool(pool.id, {
    allocations: [
      { apiKeyId: "key-y", weight: 70, policy: "burst" },
      { apiKeyId: "key-z", weight: 30, policy: "soft" },
    ],
  });

  assert.ok(updated);
  assert.equal(updated!.allocations.length, 2);
  const keyX = updated!.allocations.find((a) => a.apiKeyId === "key-x");
  assert.equal(keyX, undefined, "old allocation should be gone");
});

test("updatePool returns null for unknown id", () => {
  const result = poolsDb.updatePool("no-such-pool", { name: "Ghost" });
  assert.equal(result, null);
});

test("deletePool removes pool and returns true", () => {
  const pool = poolsDb.createPool({ connectionId: "c6", name: "Deletable" });
  const deleted = poolsDb.deletePool(pool.id);
  assert.equal(deleted, true);
  assert.equal(poolsDb.getPool(pool.id), null);
});

test("deletePool returns false for unknown id", () => {
  const result = poolsDb.deletePool("ghost-pool");
  assert.equal(result, false);
});

// ---------------------------------------------------------------------------
// upsertAllocations (replace strategy)
// ---------------------------------------------------------------------------

test("upsertAllocations replaces all previous allocations atomically", () => {
  const pool = poolsDb.createPool({
    connectionId: "c7",
    name: "Replace Test",
    allocations: [
      { apiKeyId: "k1", weight: 50, policy: "hard" },
      { apiKeyId: "k2", weight: 50, policy: "hard" },
    ],
  });

  poolsDb.upsertAllocations(pool.id, [
    { apiKeyId: "k3", weight: 100, policy: "soft", capValue: 500, capUnit: "tokens" },
  ]);

  const refreshed = poolsDb.getPool(pool.id)!;
  assert.equal(refreshed.allocations.length, 1);
  assert.equal(refreshed.allocations[0].apiKeyId, "k3");
  assert.equal(refreshed.allocations[0].capValue, 500);
  assert.equal(refreshed.allocations[0].capUnit, "tokens");
});

test("upsertAllocations with empty array removes all allocations", () => {
  const pool = poolsDb.createPool({
    connectionId: "c8",
    name: "Clear Test",
    allocations: [{ apiKeyId: "k99", weight: 100, policy: "hard" }],
  });

  poolsDb.upsertAllocations(pool.id, []);
  const refreshed = poolsDb.getPool(pool.id)!;
  assert.equal(refreshed.allocations.length, 0);
});

// ---------------------------------------------------------------------------
// FK CASCADE: delete pool → allocations gone
// ---------------------------------------------------------------------------

test("deletePool cascades to allocations", () => {
  const pool = poolsDb.createPool({
    connectionId: "c9",
    name: "With Allocs",
    allocations: [{ apiKeyId: "k-cascade", weight: 100, policy: "hard" }],
  });

  poolsDb.deletePool(pool.id);

  // After pool is deleted, listAllocationsForApiKey should find nothing for k-cascade
  const remaining = poolsDb.listAllocationsForApiKey("k-cascade");
  assert.equal(remaining.length, 0, "cascade should have removed allocation");
});

// ---------------------------------------------------------------------------
// listAllocationsForApiKey cross-pool filtering
// ---------------------------------------------------------------------------

test("listAllocationsForApiKey returns allocations across multiple pools for the same key", () => {
  const p1 = poolsDb.createPool({
    connectionId: "cx-1",
    name: "Pool A",
    allocations: [
      { apiKeyId: "shared-key", weight: 40, policy: "hard" },
      { apiKeyId: "other-key", weight: 60, policy: "soft" },
    ],
  });
  const p2 = poolsDb.createPool({
    connectionId: "cx-2",
    name: "Pool B",
    allocations: [{ apiKeyId: "shared-key", weight: 100, policy: "burst" }],
  });

  const results = poolsDb.listAllocationsForApiKey("shared-key");
  assert.equal(results.length, 2);

  const poolIds = results.map((r) => r.poolId).sort();
  assert.deepEqual(poolIds, [p1.id, p2.id].sort());
});

test("listAllocationsForApiKey returns empty for unknown key", () => {
  poolsDb.createPool({
    connectionId: "cz",
    name: "Irrelevant Pool",
    allocations: [{ apiKeyId: "someone-else", weight: 100, policy: "hard" }],
  });

  const results = poolsDb.listAllocationsForApiKey("unknown-key");
  assert.equal(results.length, 0);
});

test("allocation stores optional capValue and capUnit correctly", () => {
  const pool = poolsDb.createPool({
    connectionId: "c10",
    name: "Cap Test",
    allocations: [
      {
        apiKeyId: "k-cap",
        weight: 50,
        policy: "soft",
        capValue: 1000,
        capUnit: "requests",
      },
    ],
  });

  const found = poolsDb.getPool(pool.id)!;
  const alloc = found.allocations.find((a) => a.apiKeyId === "k-cap")!;
  assert.equal(alloc.capValue, 1000);
  assert.equal(alloc.capUnit, "requests");
});

// ---------------------------------------------------------------------------
// Guard A (issue #10): corrupted/unknown policy in the DB must be normalized to
// the most restrictive policy ('hard') at the read boundary — never trusted via
// `row.policy as Policy`. A garbage policy reaching the fair-share engine would
// fall through every switch case and silently ALLOW (fail-OPEN).
//
// The schema has CHECK (policy IN ('hard','soft','burst')), so we bypass it with
// PRAGMA ignore_check_constraints to simulate a legacy/corrupted row.
// ---------------------------------------------------------------------------

test("rowToAllocation normalizes an unknown DB policy to 'hard' (Guard A)", () => {
  const pool = poolsDb.createPool({
    connectionId: "c-guardA",
    name: "Corrupt Policy Pool",
    allocations: [{ apiKeyId: "k-corrupt", weight: 100, policy: "soft" }],
  });

  // Inject a corrupted policy directly, bypassing the CHECK constraint.
  const db = getDbInstance() as unknown as {
    pragma: (s: string) => unknown;
    prepare: (sql: string) => { run: (...p: unknown[]) => unknown };
  };
  db.pragma("ignore_check_constraints = ON");
  db.prepare("UPDATE quota_allocations SET policy = ? WHERE pool_id = ? AND api_key_id = ?").run(
    "bogus-policy",
    pool.id,
    "k-corrupt"
  );
  db.pragma("ignore_check_constraints = OFF");

  // Read through the domain module — the unknown policy must become 'hard'.
  const found = poolsDb.getPool(pool.id)!;
  const alloc = found.allocations.find((a) => a.apiKeyId === "k-corrupt")!;
  assert.equal(alloc.policy, "hard", "unknown DB policy must be normalized to 'hard'");

  // Same expectation via listAllocationsForApiKey (the other read path).
  const list = poolsDb.listAllocationsForApiKey("k-corrupt");
  assert.equal(list.length, 1);
  assert.equal(list[0].allocation.policy, "hard");
});

test("rowToAllocation preserves valid policies unchanged (Guard A regression)", () => {
  const pool = poolsDb.createPool({
    connectionId: "c-guardA-valid",
    name: "Valid Policy Pool",
    allocations: [
      { apiKeyId: "k-hard", weight: 34, policy: "hard" },
      { apiKeyId: "k-soft", weight: 33, policy: "soft" },
      { apiKeyId: "k-burst", weight: 33, policy: "burst" },
    ],
  });

  const found = poolsDb.getPool(pool.id)!;
  assert.equal(found.allocations.find((a) => a.apiKeyId === "k-hard")!.policy, "hard");
  assert.equal(found.allocations.find((a) => a.apiKeyId === "k-soft")!.policy, "soft");
  assert.equal(found.allocations.find((a) => a.apiKeyId === "k-burst")!.policy, "burst");
});
