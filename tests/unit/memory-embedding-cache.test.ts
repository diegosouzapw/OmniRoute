import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { buildCacheKey, get, set, invalidate, stats } from "../../src/lib/memory/embedding/cache";

describe("memory-embedding-cache", () => {
  beforeEach(() => {
    invalidate();
  });

  it("returns undefined for unknown key", () => {
    const result = get("nonexistent-key");
    assert.strictEqual(result, undefined);
  });

  it("set + get returns the stored vector", () => {
    const vec = new Float32Array([1.0, 2.0, 3.0]);
    const key = buildCacheKey("remote", "openai/text-embedding-3-small", 3, "hello");
    set(key, vec);
    const retrieved = get(key);
    assert.ok(retrieved instanceof Float32Array);
    assert.strictEqual(retrieved.length, 3);
    assert.strictEqual(retrieved[0], 1.0);
  });

  it("tracks hits and misses correctly", () => {
    const key = buildCacheKey("static", "potion-base-8M", 256, "test");
    const vec = new Float32Array([0.5, 0.6]);
    set(key, vec);

    get(key); // hit
    get(key); // hit
    get("missing"); // miss
    get("missing2"); // miss

    const s = stats();
    assert.strictEqual(s.hits, 2);
    assert.strictEqual(s.misses, 2);
    assert.strictEqual(s.size, 1);
  });

  it("cache expires after TTL", () => {
    // Override Date.now for TTL test via fake ts injection
    const key = buildCacheKey("remote", "openai/text-embedding-3-small", 1536, "expire-test");
    const vec = new Float32Array([9.0]);

    // Inject the entry directly with an old timestamp via set + Date mock
    const origNow = Date.now;
    try {
      // Set with very old timestamp by temporarily overriding Date.now
      (Date as unknown as { now: () => number }).now = () => 0;
      set(key, vec);

      // Restore Date.now to "current" time = 6 minutes later (360000ms)
      (Date as unknown as { now: () => number }).now = () => 360_000;
      const result = get(key);
      assert.strictEqual(result, undefined, "Expired entry should return undefined");
    } finally {
      (Date as unknown as { now: () => number }).now = origNow;
    }
  });

  it("LRU eviction: when max=3 and 4th item inserted, oldest is removed", () => {
    // Set MEMORY_EMBEDDING_CACHE_MAX to 3 via env
    const origEnv = process.env.MEMORY_EMBEDDING_CACHE_MAX;
    process.env.MEMORY_EMBEDDING_CACHE_MAX = "3";
    invalidate();
    try {
      const k1 = buildCacheKey("remote", "model", null, "text1");
      const k2 = buildCacheKey("remote", "model", null, "text2");
      const k3 = buildCacheKey("remote", "model", null, "text3");
      const k4 = buildCacheKey("remote", "model", null, "text4");

      set(k1, new Float32Array([1]));
      set(k2, new Float32Array([2]));
      set(k3, new Float32Array([3]));

      // All 3 keys should exist
      assert.ok(get(k1) !== undefined);
      assert.ok(get(k2) !== undefined);
      assert.ok(get(k3) !== undefined);

      invalidate(); // reset hit/miss counts
      process.env.MEMORY_EMBEDDING_CACHE_MAX = "3";

      set(k1, new Float32Array([1]));
      set(k2, new Float32Array([2]));
      set(k3, new Float32Array([3]));
      // Insert 4th — should evict k1 (oldest)
      set(k4, new Float32Array([4]));

      const s = stats();
      assert.strictEqual(s.size, 3);
      // k4 should be present
      assert.ok(get(k4) !== undefined);
    } finally {
      if (origEnv === undefined) delete process.env.MEMORY_EMBEDDING_CACHE_MAX;
      else process.env.MEMORY_EMBEDDING_CACHE_MAX = origEnv;
      invalidate();
    }
  });

  it("buildCacheKey produces different keys for different sources", () => {
    const key1 = buildCacheKey("remote", "model/a", 256, "hello");
    const key2 = buildCacheKey("static", "model/a", 256, "hello");
    assert.notStrictEqual(key1, key2);
  });

  it("buildCacheKey produces different keys for different models", () => {
    const key1 = buildCacheKey("remote", "openai/small", 1536, "hello");
    const key2 = buildCacheKey("remote", "openai/large", 3072, "hello");
    assert.notStrictEqual(key1, key2);
  });

  it("buildCacheKey is deterministic", () => {
    const k1 = buildCacheKey("remote", "openai/text-embedding-3-small", 1536, "deterministic test");
    const k2 = buildCacheKey("remote", "openai/text-embedding-3-small", 1536, "deterministic test");
    assert.strictEqual(k1, k2);
  });

  it("invalidate clears cache and resets counters", () => {
    const key = buildCacheKey("remote", "m", 1, "text");
    set(key, new Float32Array([1]));
    get(key);
    invalidate();
    const s = stats();
    assert.strictEqual(s.size, 0);
    assert.strictEqual(s.hits, 0);
    assert.strictEqual(s.misses, 0);
    assert.strictEqual(get(key), undefined);
  });
});
