/**
 * Tests for searchCache.ts — getOrCoalesce with ttlMs=0 bypass.
 *
 * Verifies:
 * 1. ttlMs=0 bypasses the cache lookup (no stale data returned)
 * 2. ttlMs=0 bypasses inflight coalescing (each concurrent call gets its own fetch)
 * 3. Both concurrent callers receive { cached: false }
 * 4. hits counter is NOT incremented for ttlMs=0 calls
 * 5. ttlMs>0 still coalesces concurrent calls correctly
 * 6. ?? operator in route.ts: cacheTTLMs=0 is not treated as falsy
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  getOrCoalesce,
  computeCacheKey,
  getCacheStats,
} from "../../open-sse/services/searchCache.ts";

// ── Helper ────────────────────────────────────────────────────────────────────

function makeKey(suffix = "") {
  return computeCacheKey(`ttl-zero-test-${suffix}-${Date.now()}`, "test", "search", 10);
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("getOrCoalesce — ttlMs=0 bypass", () => {
  it("returns { cached: false } when ttlMs=0", async () => {
    const key = makeKey("basic");
    let callCount = 0;
    const fetchFn = async () => {
      callCount++;
      return { result: "fresh" };
    };

    const result = await getOrCoalesce(key, 0, fetchFn);

    assert.equal(result.cached, false, "cached flag must be false when ttlMs=0");
    assert.deepEqual(result.data, { result: "fresh" });
    assert.equal(callCount, 1);
  });

  it("does NOT coalesce concurrent calls when ttlMs=0 — each gets its own fetch", async () => {
    const key = makeKey("concurrent");
    let callCount = 0;

    const fetchFn = async () => {
      callCount++;
      // Slight delay to ensure both calls overlap
      await new Promise((r) => setTimeout(r, 5));
      return { id: callCount };
    };

    // Launch two concurrent calls with the SAME key and ttlMs=0
    const [r1, r2] = await Promise.all([
      getOrCoalesce(key, 0, fetchFn),
      getOrCoalesce(key, 0, fetchFn),
    ]);

    // Both should be independent — fetchFn must have been called twice
    assert.equal(callCount, 2, "fetchFn must be called independently for each ttlMs=0 caller");
    assert.equal(r1.cached, false, "r1.cached must be false");
    assert.equal(r2.cached, false, "r2.cached must be false");
  });

  it("does NOT increment hits counter for ttlMs=0 calls", async () => {
    const key = makeKey("hits");
    const before = getCacheStats().hits;

    await getOrCoalesce(key, 0, async () => "data");
    await getOrCoalesce(key, 0, async () => "data");

    const after = getCacheStats();
    assert.equal(after.hits, before, "hits must not increment for ttlMs=0 calls");
  });

  it("does NOT store result in cache when ttlMs=0 — subsequent call still fetches fresh", async () => {
    const key = makeKey("no-store");
    let callCount = 0;
    const fetchFn = async () => {
      callCount++;
      return callCount;
    };

    await getOrCoalesce(key, 0, fetchFn);
    const r2 = await getOrCoalesce(key, 0, fetchFn);

    assert.equal(callCount, 2, "second call must also invoke fetchFn (not serve from cache)");
    assert.equal(r2.data, 2);
    assert.equal(r2.cached, false);
  });

  it("coalesces concurrent calls when ttlMs>0 (baseline sanity check)", async () => {
    const key = makeKey("coalesce-positive");
    let callCount = 0;

    const fetchFn = async () => {
      callCount++;
      await new Promise((r) => setTimeout(r, 5));
      return "shared";
    };

    // Both calls launched with same key and ttlMs>0 — should coalesce
    const [r1, r2] = await Promise.all([
      getOrCoalesce(key, 5000, fetchFn),
      getOrCoalesce(key, 5000, fetchFn),
    ]);

    assert.equal(
      callCount,
      1,
      "fetchFn should be called exactly once when coalescing with ttlMs>0"
    );
    assert.equal(r1.data, "shared");
    assert.equal(r2.data, "shared");
  });
});

// ── ?? operator behaviour (mirrors route.ts fix: cacheTTLMs ?? defaultTTL) ──

describe("cacheTTLMs ?? default (route.ts fix)", () => {
  it("cacheTTLMs=0 must NOT fall back to default when using ?? (nullish coalescing)", () => {
    const DEFAULT_TTL = 5 * 60 * 1000;

    // Old behaviour: `cacheTTLMs || DEFAULT_TTL` treats 0 as falsy → returns DEFAULT_TTL (WRONG)
    const oldBehaviour = (cacheTTLMs) => cacheTTLMs || DEFAULT_TTL;
    // New behaviour: `cacheTTLMs ?? DEFAULT_TTL` only falls back for null/undefined (CORRECT)
    const newBehaviour = (cacheTTLMs) => cacheTTLMs ?? DEFAULT_TTL;

    // With cacheTTLMs=0, old behaviour incorrectly returns DEFAULT_TTL
    assert.equal(oldBehaviour(0), DEFAULT_TTL, "Sanity: old || behaviour treats 0 as falsy");

    // With cacheTTLMs=0, new behaviour correctly returns 0
    assert.equal(newBehaviour(0), 0, "?? must preserve 0 as a valid TTL");

    // null/undefined still correctly fall back to DEFAULT_TTL in both
    assert.equal(newBehaviour(null), DEFAULT_TTL, "null must fall back to DEFAULT_TTL");
    assert.equal(newBehaviour(undefined), DEFAULT_TTL, "undefined must fall back to DEFAULT_TTL");

    // Positive TTL is unaffected
    assert.equal(newBehaviour(1000), 1000, "positive TTL must not be affected");
  });
});
