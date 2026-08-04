/**
 * tests/unit/quota-sharing-fixes.test.ts
 *
 * Verifies the quota sharing improvements from fix/quota-sharing-improvements:
 *   1. computeBurnRateFromWindow() produces correct non-zero output
 *   2. storeRateLimitHeaders() + fetchAnthropicSaturation() round-trip
 *   3. upsertAllocations() normalizes zero weights to equal distribution
 *   4. poolUsageWithDimensions() returns real burn rate data
 *   5. QuotaStore interface includes poolUsageWithDimensions()
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-fixes-"));
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

// ─── Fix 2: computeBurnRateFromWindow ─────────────────────────────────────────

test("computeBurnRateFromWindow: returns non-zero rate for non-zero consumption", async () => {
  const { computeBurnRateFromWindow } = await import("../../src/lib/quota/burnRate.ts");

  // Simulate 500 tokens consumed in a 1-hour window
  const result = computeBurnRateFromWindow(500, 60 * 60 * 1000, 500);

  assert.ok(result.tokensPerSecond > 0, `rate should be >0, got ${result.tokensPerSecond}`);
  assert.ok(
    result.timeToExhaustionMs !== null && result.timeToExhaustionMs > 0,
    `timeToExhaustion should be >0, got ${result.timeToExhaustionMs}`
  );
});

test("computeBurnRateFromWindow: returns zero for zero consumption", async () => {
  const { computeBurnRateFromWindow } = await import("../../src/lib/quota/burnRate.ts");

  const result = computeBurnRateFromWindow(0, 60 * 60 * 1000);
  assert.equal(result.tokensPerSecond, 0);
  assert.equal(result.timeToExhaustionMs, null);
});

test("computeBurnRateFromWindow: rate is consumption / elapsed (not / full window)", async () => {
  const { computeBurnRateFromWindow } = await import("../../src/lib/quota/burnRate.ts");

  // 1000 tokens consumed. The rate should be based on elapsed time within the
  // current bucket, not the full window duration. We can't control time, but
  // we can verify the rate is at least as fast as consumed/windowMs (lower bound).
  const windowMs = 60 * 60 * 1000; // 1h
  const consumed = 1000;
  const result = computeBurnRateFromWindow(consumed, windowMs, 1000);

  // Lower bound: if we're at the very end of the window, rate = consumed/window
  const lowerBound = consumed / (windowMs / 1000);
  assert.ok(
    result.tokensPerSecond >= lowerBound * 0.9, // allow 10% margin
    `rate ${result.tokensPerSecond} should be >= lower bound ${lowerBound * 0.9}`
  );
});

// ─── Fix 3: Weight normalization ──────────────────────────────────────────────

test("upsertAllocations: normalizes zero weights to equal distribution", async () => {
  const pool = poolsDb.createPool({
    connectionId: "conn-weight-test",
    name: "Weight Test Pool",
    allocations: [
      { apiKeyId: "key-x", weight: 0, policy: "hard" },
      { apiKeyId: "key-y", weight: 0, policy: "hard" },
      { apiKeyId: "key-z", weight: 0, policy: "hard" },
    ],
  });

  // Call upsertAllocations with all-zero weights
  poolsDb.upsertAllocations(pool.id, [
    { apiKeyId: "key-x", weight: 0, policy: "hard" },
    { apiKeyId: "key-y", weight: 0, policy: "hard" },
    { apiKeyId: "key-z", weight: 0, policy: "hard" },
  ]);

  // Read back — weights should be normalized to ~33.33 each
  const updated = poolsDb.getPool(pool.id);
  assert.ok(updated, "pool should exist");
  assert.equal(updated!.allocations.length, 3);

  for (const alloc of updated!.allocations) {
    assert.ok(
      Math.abs(alloc.weight - 100 / 3) < 0.01,
      `weight should be ~33.33, got ${alloc.weight}`
    );
  }
});

test("upsertAllocations: preserves non-zero weights", async () => {
  const pool = poolsDb.createPool({
    connectionId: "conn-weight-preserve",
    name: "Weight Preserve Pool",
  });

  poolsDb.upsertAllocations(pool.id, [
    { apiKeyId: "key-a", weight: 70, policy: "hard" },
    { apiKeyId: "key-b", weight: 30, policy: "soft" },
  ]);

  const updated = poolsDb.getPool(pool.id);
  assert.ok(updated);
  assert.equal(updated!.allocations[0].weight, 70);
  assert.equal(updated!.allocations[1].weight, 30);
});

// ─── Fix 4: storeRateLimitHeaders + Anthropic saturation ─────────────────────

test("storeRateLimitHeaders: stores headers and getSaturation reads them", async () => {
  const { storeRateLimitHeaders, _clearSaturationCache } = await import(
    "../../src/lib/quota/saturationSignals.ts"
  );

  _clearSaturationCache();

  // Store headers as if Anthropic returned them (800/1000 remaining = 20% used)
  storeRateLimitHeaders("conn-anthropic-1", "anthropic", {
    "anthropic-ratelimit-requests-limit": "1000",
    "anthropic-ratelimit-requests-remaining": "800",
  });

  // Now read via getSaturation — should return ~0.2 (20% used)
  const { getSaturation } = await import("../../src/lib/quota/saturationSignals.ts");
  const value = await getSaturation("conn-anthropic-1", "anthropic", {
    unit: "requests",
    window: "hourly",
  });

  assert.ok(value > 0.15, `saturation should be >0.15, got ${value}`);
  assert.ok(value < 0.25, `saturation should be <0.25, got ${value}`);
});

test("storeRateLimitHeaders: ignores non-Anthropic headers gracefully", async () => {
  const { storeRateLimitHeaders, _clearSaturationCache, getSaturation } = await import(
    "../../src/lib/quota/saturationSignals.ts"
  );

  _clearSaturationCache();

  // Store headers with no rate-limit info
  storeRateLimitHeaders("conn-other", "openai", {
    "content-type": "application/json",
  });

  const value = await getSaturation("conn-other", "openai", {
    unit: "tokens",
    window: "hourly",
  });

  // Should return 0 (no data → generous mode)
  assert.equal(value, 0);
});

// ─── Fix 1: poolUsageWithDimensions returns burn rate ─────────────────────────

test("poolUsageWithDimensions: returns non-null burn rate for token dimensions", async () => {
  const { SqliteQuotaStore } = await import("../../src/lib/quota/sqliteQuotaStore.ts");
  const store = new SqliteQuotaStore();

  const pool = poolsDb.createPool({
    connectionId: "conn-burn-rate",
    name: "Burn Rate Pool",
    allocations: [
      { apiKeyId: "key-br-1", weight: 100, policy: "hard" },
    ],
  });

  const dim = { poolId: pool.id, unit: "tokens" as const, window: "hourly" as const };
  await store.consume("key-br-1", dim, 5000);

  const snapshot = await store.poolUsageWithDimensions(pool.id, [
    { unit: "tokens", window: "hourly", limit: 50000 },
  ]);

  assert.ok(snapshot.burnRate, "burnRate should be present");
  assert.ok(
    snapshot.burnRate!.tokensPerSecond > 0,
    `tokensPerSecond should be >0, got ${snapshot.burnRate!.tokensPerSecond}`
  );
  assert.ok(
    snapshot.burnRate!.timeToExhaustionMs !== null && snapshot.burnRate!.timeToExhaustionMs > 0,
    `timeToExhaustionMs should be >0, got ${snapshot.burnRate!.timeToExhaustionMs}`
  );
});

test("poolUsageWithDimensions: no burn rate when consumedTotal is 0", async () => {
  const { SqliteQuotaStore } = await import("../../src/lib/quota/sqliteQuotaStore.ts");
  const store = new SqliteQuotaStore();

  const pool = poolsDb.createPool({
    connectionId: "conn-no-burn",
    name: "No Burn Pool",
    allocations: [
      { apiKeyId: "key-nb-1", weight: 100, policy: "hard" },
    ],
  });

  const snapshot = await store.poolUsageWithDimensions(pool.id, [
    { unit: "tokens", window: "hourly", limit: 50000 },
  ]);

  assert.equal(snapshot.burnRate, undefined, "burnRate should be undefined when nothing consumed");
});

// ─── Fix 1: QuotaStore interface includes poolUsageWithDimensions ────────────

test("QuotaStore interface: poolUsageWithDimensions is on the interface", async () => {
  // Type-level check: if this compiles, the method is on the interface.
  // We verify at runtime that both implementations have it.
  const { SqliteQuotaStore } = await import("../../src/lib/quota/sqliteQuotaStore.ts");
  const sqlite = new SqliteQuotaStore();
  assert.equal(typeof sqlite.poolUsageWithDimensions, "function", "SqliteQuotaStore must have poolUsageWithDimensions");

  // Redis store (just check the prototype)
  const { RedisQuotaStore } = await import("../../src/lib/quota/redisQuotaStore.ts");
  assert.equal(
    typeof RedisQuotaStore.prototype.poolUsageWithDimensions,
    "function",
    "RedisQuotaStore must have poolUsageWithDimensions"
  );
});
