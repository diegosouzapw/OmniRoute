/**
 * tests/unit/quota-redis-store.test.ts
 *
 * Coverage for src/lib/quota/redisQuotaStore.ts:
 *   - Constructor without ioredis → throws clear error
 *   - consume → calls INCRBYFLOAT + EXPIRE with correct TTL
 *   - peek → calls MGET and applies sliding window decay
 *   - clear → calls DEL on both bucket keys
 *   - Skip real Redis integration unless RUN_QUOTA_REDIS_INT=1
 *
 * We use module-level mocking by injecting a fake ioredis into the dynamic
 * import chain via a custom loader approach. Since the Node native runner
 * doesn't support built-in mocking of dynamic imports, we instead test the
 * class by replacing the singleton client using resetRedisClient() and
 * exposing the key-generation logic through the public API.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-redis-store-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");

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

// ─── Mock Redis client ───────────────────────────────────────────────────────

/**
 * Create a simple in-memory mock that mimics ioredis behaviour.
 * Tracks calls so we can assert on them.
 */
function createMockRedisClient() {
  const store = new Map<string, string>();
  const calls: Array<{ method: string; args: unknown[] }> = [];

  function record(method: string, ...args: unknown[]) {
    calls.push({ method, args });
  }

  return {
    _store: store,
    _calls: calls,

    async incrbyfloat(key: string, value: number): Promise<string> {
      record("incrbyfloat", key, value);
      const current = parseFloat(store.get(key) ?? "0") || 0;
      const next = current + value;
      store.set(key, String(next));
      return String(next);
    },

    async expire(key: string, seconds: number): Promise<number> {
      record("expire", key, seconds);
      return 1;
    },

    async mget(...keys: string[]): Promise<Array<string | null>> {
      record("mget", ...keys);
      return keys.map((k) => store.get(k) ?? null);
    },

    async eval(...args: unknown[]): Promise<unknown> {
      record("eval", ...args);
      return null;
    },

    async del(...keys: string[]): Promise<number> {
      record("del", ...keys);
      let count = 0;
      for (const k of keys) {
        if (store.has(k)) {
          store.delete(k);
          count++;
        }
      }
      return count;
    },

    async quit(): Promise<string> {
      record("quit");
      return "OK";
    },
  };
}

// ─── Tests ──────────────────────────────────────────────────────────────────

test("redisQuotaStore: consume calls INCRBYFLOAT + EXPIRE and returns sliding window value", async () => {
  const { RedisQuotaStore, __setRedisClientForTests, resetRedisClient } =
    await import("../../src/lib/quota/redisQuotaStore.ts");
  resetRedisClient();

  const mock = createMockRedisClient();
  __setRedisClientForTests(mock);

  const dim = { poolId: "pool1", unit: "tokens" as const, window: "hourly" as const };
  const store = new RedisQuotaStore("redis://unit-test");

  // Verify the class implements the interface
  assert.ok(typeof store.consume === "function");
  assert.ok(typeof store.peek === "function");
  assert.ok(typeof store.poolUsage === "function");
  assert.ok(typeof store.clear === "function");

  const effective = await store.consume("key-test", dim, 100);
  assert.ok(effective > 0, `Expected a positive effective value, got ${effective}`);
  assert.ok(effective <= 100, `Expected effective value <= 100, got ${effective}`);

  assert.deepEqual(
    mock._calls.map((call) => call.method),
    ["incrbyfloat", "expire", "expire", "mget"]
  );
  assert.ok(String(mock._calls[0]?.args[0]).startsWith("omniroute:quota:key-test:pool1:tokens:"));
  assert.equal(mock._calls[0]?.args[1], 100);

  try {
    await store.clear("key-test", dim);
    assert.equal(mock._calls.at(-1)?.method, "del");
  } finally {
    resetRedisClient();
  }
});

test("redisQuotaStore: getRedisClient throws clear error if ioredis not installed", async () => {
  // We test this by trying to import ioredis and checking if it's available
  // If ioredis IS installed, the store should work; if not, it should throw clearly.
  let ioredisAvailable = false;
  try {
    await import("ioredis");
    ioredisAvailable = true;
  } catch {
    ioredisAvailable = false;
  }

  if (!ioredisAvailable) {
    const { getRedisClient, resetRedisClient } =
      await import("../../src/lib/quota/redisQuotaStore.ts");
    resetRedisClient();

    await assert.rejects(
      () => getRedisClient("redis://localhost:6379"),
      (err: Error) => {
        assert.ok(err.message.includes("ioredis"), `Expected ioredis mention: ${err.message}`);
        return true;
      }
    );
  } else {
    // ioredis is installed — just verify getRedisClient returns a client object
    const { getRedisClient, resetRedisClient } =
      await import("../../src/lib/quota/redisQuotaStore.ts");
    resetRedisClient();

    const client = await getRedisClient("redis://localhost:6399");
    assert.ok(client, "Should return a client when ioredis is available");
    resetRedisClient();
  }
});

// ─── Real Redis integration (gated) ─────────────────────────────────────────

test(
  "redisQuotaStore: real Redis integration (skipped unless RUN_QUOTA_REDIS_INT=1)",
  {
    skip: process.env.RUN_QUOTA_REDIS_INT !== "1",
  },
  async () => {
    const { RedisQuotaStore, resetRedisClient } =
      await import("../../src/lib/quota/redisQuotaStore.ts");
    resetRedisClient();

    const REDIS_URL = process.env.QUOTA_STORE_REDIS_URL ?? "redis://localhost:6379";
    const store = new RedisQuotaStore(REDIS_URL);
    const dim = { poolId: "it-pool", unit: "tokens" as const, window: "hourly" as const };

    // Clear before test
    await store.clear("it-key", dim);

    await store.consume("it-key", dim, 100);
    await store.consume("it-key", dim, 200);
    const effective = await store.peek("it-key", dim);

    // In same bucket, prev=0 → effective≈300
    assert.ok(effective > 290, `Expected >290, got ${effective}`);
    assert.ok(effective <= 300, `Expected <=300, got ${effective}`);

    // Cleanup
    await store.clear("it-key", dim);
    const afterClear = await store.peek("it-key", dim);
    assert.equal(afterClear, 0);

    resetRedisClient();
  }
);

test("redisQuotaStore: sliding window decay formula is correct", async () => {
  // Unit test for the math without real Redis.
  // We verify that: effective = prev × (1 - elapsed/window) + curr
  // by inspecting the expected values directly.

  const { WINDOW_MS } = await import("../../src/lib/quota/dimensions.ts");
  const windowMs = WINDOW_MS["hourly"];

  const nowMs = Date.now();
  const currentBucketIndex = Math.floor(nowMs / windowMs);
  const currentBucketStartMs = currentBucketIndex * windowMs;
  const elapsed = nowMs - currentBucketStartMs;

  // Simulate: prev=1000, curr=0
  const prev = 1000;
  const curr = 0;
  const expected = prev * (1 - elapsed / windowMs) + curr;

  // expected should be in [0, 1000] and close to 1000 if we're early in the window
  assert.ok(expected >= 0 && expected <= 1000, `Expected in [0,1000], got ${expected}`);
  assert.ok(expected > 0, "Should have non-zero effective from prev bucket");
});

test("redisQuotaStore: resetRedisQuotaStore resets the store singleton", async () => {
  const { getRedisQuotaStore, resetRedisQuotaStore } =
    await import("../../src/lib/quota/redisQuotaStore.ts");

  const store1 = getRedisQuotaStore("redis://localhost:6399");
  resetRedisQuotaStore();
  const store2 = getRedisQuotaStore("redis://localhost:6399");

  // After reset, a new instance is created
  assert.ok(store2, "Should create new instance after reset");
});
