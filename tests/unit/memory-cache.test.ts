import test from "node:test";
import assert from "node:assert/strict";

const { memoryCache } = await import("../../src/lib/memory/cache.ts");

const originalDateNow = Date.now;
const originalMaxSize = memoryCache.maxSize;

test.beforeEach(async () => {
  await memoryCache.clear();
  memoryCache.maxSize = originalMaxSize;
  Date.now = originalDateNow;
});

test.after(async () => {
  Date.now = originalDateNow;
  memoryCache.maxSize = originalMaxSize;
  await memoryCache.clear();
});

test("memoryCache tracks cache hits and misses and clear resets stats", async () => {
  await memoryCache.set("user:1", { value: 1 });

  assert.deepEqual(await memoryCache.get("user:1"), { value: 1 });
  assert.equal(await memoryCache.get("missing"), null);
  assert.deepEqual(memoryCache.stats(), {
    size: 1,
    maxSize: originalMaxSize,
    hits: 1,
    misses: 1,
  });

  await memoryCache.clear();
  assert.deepEqual(memoryCache.stats(), {
    size: 0,
    maxSize: originalMaxSize,
    hits: 0,
    misses: 0,
  });
});

test("memoryCache expires entries after their TTL elapses", async () => {
  let now = 1_000;
  Date.now = () => now;

  await memoryCache.set("ttl:key", "value", 50);
  assert.equal(await memoryCache.get("ttl:key"), "value");

  now = 1_060;
  assert.equal(await memoryCache.get("ttl:key"), null);
  assert.deepEqual(memoryCache.stats(), {
    size: 0,
    maxSize: originalMaxSize,
    hits: 1,
    misses: 1,
  });
});

test("memoryCache evicts the least recently used entry when full", async () => {
  memoryCache.maxSize = 2;

  await memoryCache.set("a", "value-a");
  await memoryCache.set("b", "value-b");
  assert.equal(await memoryCache.get("a"), "value-a");

  await memoryCache.set("c", "value-c");

  assert.equal(await memoryCache.get("a"), "value-a");
  assert.equal(await memoryCache.get("b"), null);
  assert.equal(await memoryCache.get("c"), "value-c");
  assert.deepEqual(memoryCache.stats(), {
    size: 2,
    maxSize: 2,
    hits: 3,
    misses: 1,
  });
});

test("memoryCache invalidates entries by regex pattern", async () => {
  await memoryCache.set("session:1", "a");
  await memoryCache.set("session:2", "b");
  await memoryCache.set("profile:1", "c");

  await memoryCache.invalidate("^session:");

  assert.equal(await memoryCache.get("session:1"), null);
  assert.equal(await memoryCache.get("session:2"), null);
  assert.equal(await memoryCache.get("profile:1"), "c");
  assert.deepEqual(memoryCache.stats(), {
    size: 1,
    maxSize: originalMaxSize,
    hits: 1,
    misses: 2,
  });
});
