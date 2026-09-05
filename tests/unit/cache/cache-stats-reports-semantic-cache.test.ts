import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { getPromptCache } from "../../../src/lib/cacheLayer.ts";
import {
  clearMemoryCache,
  getMemoryCacheStats,
  setCachedResponse,
} from "../../../src/lib/semanticCache.ts";

// Regression guard for /api/cache/stats.
//
// The route used to read getPromptCache() — an LRU that no request path writes
// to. It answered "0 hit / 0 miss, size 0" no matter how much traffic the
// semantic cache served, and two dashboard pages rendered that as fact.
//
// The first assertion fails against the old wiring: caching a response fills the
// semantic cache and leaves the prompt cache empty.
describe("cache stats report the cache that requests actually use", () => {
  it("counts an entry written through the semantic cache", () => {
    clearMemoryCache();
    getPromptCache().clear();

    const before = getMemoryCacheStats();
    setCachedResponse("sig-cache-stats-guard", "gpt-4.1", { choices: [] }, 42);
    const after = getMemoryCacheStats();

    assert.equal(after.size, before.size + 1);
    assert.equal(getPromptCache().getStats().size, 0);
  });

  it("keeps the shape the dashboards read, with a numeric hit rate", () => {
    const stats = getMemoryCacheStats();

    for (const key of ["size", "maxSize", "hits", "misses", "hitRate"]) {
      assert.ok(key in stats, `missing ${key}`);
    }
    // Both dashboard pages call hitRate.toFixed(1); a string would throw there.
    assert.equal(typeof stats.hitRate, "number");
    assert.equal(typeof stats.size, "number");
    assert.equal(typeof stats.maxSize, "number");
  });

  it("clears the in-memory entries", () => {
    setCachedResponse("sig-cache-stats-clear", "gpt-4.1", { choices: [] }, 1);
    assert.ok(getMemoryCacheStats().size > 0);

    clearMemoryCache();

    assert.equal(getMemoryCacheStats().size, 0);
  });
});
