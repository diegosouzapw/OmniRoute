import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pricing-single-flight-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const readCache = await import("../../src/lib/db/readCache.ts");
const { rollupUsageHistoryBeforeDate } = await import("../../src/lib/usage/aggregateHistory.ts");

const PRICING_READ = "SELECT key, value FROM key_value WHERE namespace = ?";

function countPricingReads(db: ReturnType<typeof core.getDbInstance>) {
  const original = db.prepare.bind(db);
  const counter = { reads: 0 };
  db.prepare = ((sql: string) => {
    if (sql === PRICING_READ) counter.reads++;
    return original(sql);
  }) as typeof db.prepare;
  return {
    counter,
    restore: () => {
      db.prepare = original;
    },
  };
}

test.beforeEach(() => {
  readCache.invalidateDbCache();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("concurrent getCachedPricing misses share one pricing load", async () => {
  const db = core.getDbInstance();
  const spy = countPricingReads(db);
  try {
    const results = await Promise.all(
      Array.from({ length: 50 }, () => readCache.getCachedPricing())
    );
    assert.equal(spy.counter.reads, 3);
    assert.ok(results.every((pricing) => pricing === results[0]));
  } finally {
    spy.restore();
  }
});

test("invalidation during an in-flight pricing load starts a fresh load", async () => {
  const db = core.getDbInstance();
  const spy = countPricingReads(db);
  try {
    const before = readCache.getCachedPricing();
    readCache.invalidateDbCache("pricing");
    const after = readCache.getCachedPricing();
    const [stale, fresh] = await Promise.all([before, after]);
    assert.notEqual(stale, fresh);
    assert.equal(spy.counter.reads, 6);
    assert.equal(await readCache.getCachedPricing(), fresh);
    assert.equal(spy.counter.reads, 6);
  } finally {
    spy.restore();
  }
});

test("a failed shared pricing load rejects every waiter and is not cached", async () => {
  const db = core.getDbInstance();
  const original = db.prepare.bind(db);
  let failures = 0;
  db.prepare = ((sql: string) => {
    if (sql === PRICING_READ && failures === 0) {
      failures++;
      throw new Error("pricing read failed");
    }
    return original(sql);
  }) as typeof db.prepare;
  try {
    const waiters = Array.from({ length: 10 }, () => readCache.getCachedPricing());
    const settled = await Promise.allSettled(waiters);
    assert.equal(failures, 1);
    assert.ok(settled.every((result) => result.status === "rejected"));
  } finally {
    db.prepare = original;
  }

  // The slot was cleared on error: the next call starts a fresh load and succeeds.
  const spy = countPricingReads(db);
  try {
    const pricing = await readCache.getCachedPricing();
    assert.equal(typeof pricing, "object");
    assert.equal(spy.counter.reads, 3);
    assert.equal(await readCache.getCachedPricing(), pricing);
    assert.equal(spy.counter.reads, 3);
  } finally {
    spy.restore();
  }
});

test("usage_history rollup reads pricing once for a day of distinct token shapes", async () => {
  const db = core.getDbInstance();
  const insert = db.prepare(
    `INSERT INTO usage_history (provider, model, connection_id, tokens_input, tokens_output, success, latency_ms, timestamp)
     VALUES (?, ?, ?, ?, ?, 1, 100, ?)`
  );
  db.transaction(() => {
    for (let i = 0; i < 200; i++) {
      insert.run("openai", "gpt-4o", "conn-1", 1000 + i, 50 + i, "2026-01-01T12:00:00.000Z");
    }
  })();

  const spy = countPricingReads(db);
  try {
    const result = await rollupUsageHistoryBeforeDate("2026-01-02");
    assert.equal(result.errors, 0);
    assert.equal(result.processed, 200);
    assert.equal(spy.counter.reads, 3);
  } finally {
    spy.restore();
  }
});
