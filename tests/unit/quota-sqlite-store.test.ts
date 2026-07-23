/**
 * tests/unit/quota-sqlite-store.test.ts
 *
 * Coverage for src/lib/quota/sqliteQuotaStore.ts:
 *   - Happy path: consume + peek returns correct value
 *   - Two consecutive consumes → sum
 *   - Bucket rotation: decayed sliding window
 *   - Concurrency: 50 parallel consumes → exact sum (mutex guards)
 *   - poolUsageWithDimensions: validates shape of PoolUsageSnapshot
 *   - clear() zeroes consumption
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sqlite-store-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const sqliteQuotaStoreModule = await import("../../src/lib/quota/sqliteQuotaStore.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (err: unknown) {
      const e = err as { code?: string };
      if ((e?.code === "EBUSY" || e?.code === "EPERM") && attempt < 9) {
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
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
});

test("sqliteQuotaStore public surface excludes removed singleton reset helper", () => {
  assert.equal(Object.hasOwn(sqliteQuotaStoreModule, "resetSqliteQuotaStore"), false);
  assert.equal(typeof sqliteQuotaStoreModule.getSqliteQuotaStore, "function");
  assert.equal(typeof sqliteQuotaStoreModule.SqliteQuotaStore, "function");
});

// Helper: make a dimension key
function makeDim(poolId = "pool-test", unit = "tokens" as const, window = "hourly" as const) {
  return { poolId, unit, window };
}

// ─── Happy path ──────────────────────────────────────────────────────────────

test("sqliteQuotaStore: consume(100) then peek returns ~100", async () => {
  const { SqliteQuotaStore } = await import("../../src/lib/quota/sqliteQuotaStore.ts");
  const store = new SqliteQuotaStore();
  const dim = makeDim();

  await store.consume("key-1", dim, 100);
  const effective = await store.peek("key-1", dim);

  // Since both consume and peek happen in the same bucket (milliseconds apart),
  // prev=0, elapsed≈0 → effective ≈ 100. Allow small delta for timing.
  assert.ok(effective > 99, `Expected >99, got ${effective}`);
  assert.ok(effective <= 100, `Expected <=100, got ${effective}`);
});

test("sqliteQuotaStore: peek on fresh key returns 0", async () => {
  const { SqliteQuotaStore } = await import("../../src/lib/quota/sqliteQuotaStore.ts");
  const store = new SqliteQuotaStore();
  const dim = makeDim();

  const effective = await store.peek("key-never-consumed", dim);
  assert.equal(effective, 0);
});

// ─── Two consecutive consumes ────────────────────────────────────────────────

test("sqliteQuotaStore: two consumes sum correctly", async () => {
  const { SqliteQuotaStore } = await import("../../src/lib/quota/sqliteQuotaStore.ts");
  const store = new SqliteQuotaStore();
  const dim = makeDim();

  await store.consume("key-2", dim, 100);
  await store.consume("key-2", dim, 200);
  const effective = await store.peek("key-2", dim);

  // 300 in current bucket, prev=0, elapsed≈0 → effective≈300
  assert.ok(effective > 299, `Expected >299, got ${effective}`);
  assert.ok(effective <= 300, `Expected <=300, got ${effective}`);
});

// ─── Bucket rotation and decayed sliding window ──────────────────────────────

test("sqliteQuotaStore: bucket rotation applies decay from prev bucket", async () => {
  const { SqliteQuotaStore } = await import("../../src/lib/quota/sqliteQuotaStore.ts");
  const { WINDOW_MS } = await import("../../src/lib/quota/dimensions.ts");
  const { incrementBucket } = await import("../../src/lib/db/quotaConsumption.ts");
  const store = new SqliteQuotaStore();
  const dim = makeDim("pool-rotate", "tokens", "hourly");
  const windowMs = WINDOW_MS["hourly"]; // 3600000 ms

  // Simulate: prev bucket has 1000 tokens
  const nowMs = Date.now();
  const currentBucket = Math.floor(nowMs / windowMs);
  const prevBucket = currentBucket - 1;
  const dimKey = `pool-rotate:tokens:hourly`;

  // Write directly to prev bucket (bypassing store)
  incrementBucket("key-rotate", dimKey, prevBucket, 1000, nowMs - windowMs);

  // Peek at 50% elapsed through current bucket
  // We can't easily fake time without mocking Date.now, so we verify the formula
  // by reading the pair directly and computing manually.
  const { getPair } = await import("../../src/lib/db/quotaConsumption.ts");
  const { curr, prev } = getPair("key-rotate", dimKey, currentBucket);

  assert.equal(curr, 0, "curr bucket should be empty");
  assert.equal(prev, 1000, "prev bucket should have 1000");

  // The sliding window formula: prev × (1 - elapsed/window) + curr
  // When elapsed is small (just started current bucket), prev contributes a lot
  const currentBucketStartMs = currentBucket * windowMs;
  const elapsed = nowMs - currentBucketStartMs;
  const expectedEffective = 1000 * (1 - elapsed / windowMs) + 0;

  const effective = await store.peek("key-rotate", dim);
  // Allow ±1% tolerance for timing
  const tolerance = expectedEffective * 0.01 + 1;
  assert.ok(
    Math.abs(effective - expectedEffective) < tolerance,
    `Expected ≈${expectedEffective.toFixed(2)}, got ${effective.toFixed(2)}`
  );
});

// ─── Concurrency: 50 parallel consumes ──────────────────────────────────────

test("sqliteQuotaStore: 50 concurrent consumes → exact sum (mutex guards)", async () => {
  const { SqliteQuotaStore } = await import("../../src/lib/quota/sqliteQuotaStore.ts");
  const store = new SqliteQuotaStore();
  const dim = makeDim("pool-concurrent", "tokens", "hourly");

  const N = 50;
  const COST = 10;

  // Fire 50 concurrent consumes
  await Promise.all(Array.from({ length: N }, () => store.consume("key-concurrent", dim, COST)));

  const effective = await store.peek("key-concurrent", dim);

  // Total should be exactly N × COST = 500 (within the same bucket)
  const expected = N * COST;
  // Allow ±0.1% for floating point
  assert.ok(
    Math.abs(effective - expected) < expected * 0.001 + 0.1,
    `Expected ≈${expected}, got ${effective}`
  );
});

// ─── poolUsageWithDimensions ─────────────────────────────────────────────────

test("sqliteQuotaStore: poolUsageWithDimensions returns correct shape", async () => {
  const { SqliteQuotaStore } = await import("../../src/lib/quota/sqliteQuotaStore.ts");
  const store = new SqliteQuotaStore();

  // Create a real pool with allocations
  const pool = poolsDb.createPool({
    connectionId: "conn-pool-usage",
    name: "Test Pool",
    allocations: [
      { apiKeyId: "key-a", weight: 60, policy: "hard" },
      { apiKeyId: "key-b", weight: 40, policy: "soft" },
    ],
  });

  const dim = makeDim(pool.id, "tokens", "hourly");
  await store.consume("key-a", dim, 300);
  await store.consume("key-b", dim, 200);

  const snapshot = await store.poolUsageWithDimensions(pool.id, [
    { unit: "tokens", window: "hourly", limit: 1000 },
  ]);

  assert.equal(snapshot.poolId, pool.id);
  assert.ok(snapshot.generatedAt, "generatedAt should be set");
  assert.ok(Array.isArray(snapshot.dimensions), "dimensions should be array");
  assert.equal(snapshot.dimensions.length, 1);

  const dimSnap = snapshot.dimensions[0];
  assert.equal(dimSnap.unit, "tokens");
  assert.equal(dimSnap.window, "hourly");
  assert.equal(dimSnap.limit, 1000);
  // consumedTotal should be close to 300 + 200 = 500
  assert.ok(
    dimSnap.consumedTotal > 490,
    `consumedTotal should be close to 500, got ${dimSnap.consumedTotal}`
  );
  assert.equal(dimSnap.perKey.length, 2);

  // Validate perKey shapes
  for (const pk of dimSnap.perKey) {
    assert.ok(typeof pk.apiKeyId === "string");
    assert.ok(typeof pk.consumed === "number");
    assert.ok(typeof pk.fairShare === "number");
    assert.ok(typeof pk.deficit === "number");
    assert.ok(typeof pk.borrowing === "boolean");
  }
});

test("sqliteQuotaStore: poolUsage for non-existent pool returns empty snapshot", async () => {
  const { SqliteQuotaStore } = await import("../../src/lib/quota/sqliteQuotaStore.ts");
  const store = new SqliteQuotaStore();

  const snapshot = await store.poolUsage("nonexistent-pool-id");
  assert.equal(snapshot.poolId, "nonexistent-pool-id");
  assert.equal(snapshot.dimensions.length, 0);
});

// ─── clear() ────────────────────────────────────────────────────────────────

test("sqliteQuotaStore: clear() zeroes consumption", async () => {
  const { SqliteQuotaStore } = await import("../../src/lib/quota/sqliteQuotaStore.ts");
  const store = new SqliteQuotaStore();
  const dim = makeDim("pool-clear", "tokens", "hourly");

  await store.consume("key-clear", dim, 500);
  const before = await store.peek("key-clear", dim);
  assert.ok(before > 0, "Should have consumed some");

  await store.clear("key-clear", dim);
  const after = await store.peek("key-clear", dim);
  // After clear, curr=0, prev=0 (both zeroed), so effective=0
  assert.equal(after, 0);
});

test("sqliteQuotaStore: clear() on fresh key is a no-op (no error)", async () => {
  const { SqliteQuotaStore } = await import("../../src/lib/quota/sqliteQuotaStore.ts");
  const store = new SqliteQuotaStore();
  const dim = makeDim("pool-clear-noop", "tokens", "hourly");

  // Should not throw
  await store.clear("key-fresh", dim);
  const val = await store.peek("key-fresh", dim);
  assert.equal(val, 0);
});

// ─── Multiple keys, same dimension (isolation) ───────────────────────────────

test("sqliteQuotaStore: different keys are isolated", async () => {
  const { SqliteQuotaStore } = await import("../../src/lib/quota/sqliteQuotaStore.ts");
  const store = new SqliteQuotaStore();
  const dim = makeDim("pool-iso", "tokens", "hourly");

  await store.consume("key-iso-a", dim, 100);
  await store.consume("key-iso-b", dim, 200);

  const a = await store.peek("key-iso-a", dim);
  const b = await store.peek("key-iso-b", dim);

  // Each key should only see its own consumption
  assert.ok(a < 110, `key-a should not see key-b's consumption, got ${a}`);
  assert.ok(b > 190, `key-b should have its own consumption, got ${b}`);
});
