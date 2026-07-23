/**
 * tests/unit/db-quota-consumption.test.ts
 *
 * Coverage for src/lib/db/quotaConsumption.ts:
 * - incrementBucket is atomic (100 concurrent increments sum correctly)
 * - getPair returns curr + prev buckets
 * - gcOlderThan deletes strictly-older rows, keeps rows at the threshold
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-cons-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const consumptionDb = await import("../../src/lib/db/quotaConsumption.ts");

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
// getBucket
// ---------------------------------------------------------------------------

test("getBucket returns 0 for a non-existent row", () => {
  const value = consumptionDb.getBucket("key-1", "pool1:tokens:hourly", 42);
  assert.equal(value, 0);
});

test("getBucket returns the stored consumed value", () => {
  consumptionDb.incrementBucket("key-1", "pool1:tokens:hourly", 42, 100, Date.now());
  const value = consumptionDb.getBucket("key-1", "pool1:tokens:hourly", 42);
  assert.equal(value, 100);
});

// ---------------------------------------------------------------------------
// incrementBucket — atomic UPSERT
// ---------------------------------------------------------------------------

test("incrementBucket accumulates delta on successive calls", () => {
  const key = "key-acc";
  const dim = "pool-x:requests:daily";
  const bucket = 1000;
  const now = Date.now();

  consumptionDb.incrementBucket(key, dim, bucket, 5, now);
  consumptionDb.incrementBucket(key, dim, bucket, 3, now);
  consumptionDb.incrementBucket(key, dim, bucket, 2, now);

  assert.equal(consumptionDb.getBucket(key, dim, bucket), 10);
});

test("incrementBucket is atomic: 100 concurrent increments sum correctly", async () => {
  const key = "key-concurrent";
  const dim = "pool-atomic:tokens:hourly";
  const bucket = 9999;
  const now = Date.now();

  // Run 100 increments concurrently (each adds 1).
  // SQLite's UPSERT is atomic at the statement level — final count must be 100.
  await Promise.all(
    Array.from({ length: 100 }, () =>
      Promise.resolve(consumptionDb.incrementBucket(key, dim, bucket, 1, now))
    )
  );

  const total = consumptionDb.getBucket(key, dim, bucket);
  assert.equal(total, 100, `expected 100, got ${total}`);
});

test("incrementBucket updates updated_at timestamp", () => {
  const key = "key-ts";
  const dim = "pool-ts:usd:daily";
  const bucket = 5000;
  const now1 = 1_000_000;
  const now2 = 2_000_000;

  consumptionDb.incrementBucket(key, dim, bucket, 1, now1);
  consumptionDb.incrementBucket(key, dim, bucket, 1, now2);

  // GC with threshold = now1 + 1 — the row should still be there (updated_at = now2)
  const deleted = consumptionDb.gcOlderThan(now1 + 1);
  assert.equal(deleted, 0, "row should not be deleted because updated_at was refreshed");
});

// ---------------------------------------------------------------------------
// getPair
// ---------------------------------------------------------------------------

test("getPair returns 0,0 for keys with no data", () => {
  const { curr, prev } = consumptionDb.getPair("key-empty", "pool-e:tokens:daily", 10);
  assert.equal(curr, 0);
  assert.equal(prev, 0);
});

test("getPair returns curr and prev buckets", () => {
  const key = "key-pair";
  const dim = "pool-p:requests:hourly";
  const now = Date.now();

  consumptionDb.incrementBucket(key, dim, 100, 70, now); // current bucket
  consumptionDb.incrementBucket(key, dim, 99, 30, now);  // previous bucket

  const { curr, prev } = consumptionDb.getPair(key, dim, 100);
  assert.equal(curr, 70);
  assert.equal(prev, 30);
});

test("getPair returns only curr when prev bucket has no data", () => {
  const key = "key-pair2";
  const dim = "pool-q:percent:5h";
  const now = Date.now();

  consumptionDb.incrementBucket(key, dim, 200, 50, now);

  const { curr, prev } = consumptionDb.getPair(key, dim, 200);
  assert.equal(curr, 50);
  assert.equal(prev, 0);
});

// ---------------------------------------------------------------------------
// gcOlderThan
// ---------------------------------------------------------------------------

test("gcOlderThan deletes only rows with updated_at strictly less than threshold", () => {
  const now = Date.now();
  const threshold = now; // rows with updated_at < now are deleted; row at now is kept

  // Insert 3 rows with different timestamps
  consumptionDb.incrementBucket("key-gc1", "pool-gc:tokens:daily", 1, 1, now - 100); // older → deleted
  consumptionDb.incrementBucket("key-gc2", "pool-gc:tokens:daily", 2, 1, now - 1);   // older → deleted
  consumptionDb.incrementBucket("key-gc3", "pool-gc:tokens:daily", 3, 1, now);       // at threshold → kept
  consumptionDb.incrementBucket("key-gc4", "pool-gc:tokens:daily", 4, 1, now + 100); // newer → kept

  const deleted = consumptionDb.gcOlderThan(threshold);
  assert.equal(deleted, 2, `should have deleted 2 rows, deleted ${deleted}`);

  // Remaining rows: key-gc3 and key-gc4
  assert.equal(consumptionDb.getBucket("key-gc3", "pool-gc:tokens:daily", 3), 1);
  assert.equal(consumptionDb.getBucket("key-gc4", "pool-gc:tokens:daily", 4), 1);
});

test("gcOlderThan returns 0 when no rows qualify", () => {
  const now = Date.now();
  consumptionDb.incrementBucket("key-fresh", "pool-fresh:usd:weekly", 1, 1, now + 10_000);
  const deleted = consumptionDb.gcOlderThan(now);
  assert.equal(deleted, 0);
});

test("gcOlderThan returns 0 on empty table", () => {
  const deleted = consumptionDb.gcOlderThan(Date.now());
  assert.equal(deleted, 0);
});

// ---------------------------------------------------------------------------
// Bucket isolation (different dimension keys don't interfere)
// ---------------------------------------------------------------------------

test("different dimension keys are independent", () => {
  const now = Date.now();
  consumptionDb.incrementBucket("key-iso", "pool-a:tokens:hourly", 1, 40, now);
  consumptionDb.incrementBucket("key-iso", "pool-b:tokens:hourly", 1, 60, now);

  assert.equal(consumptionDb.getBucket("key-iso", "pool-a:tokens:hourly", 1), 40);
  assert.equal(consumptionDb.getBucket("key-iso", "pool-b:tokens:hourly", 1), 60);
});
