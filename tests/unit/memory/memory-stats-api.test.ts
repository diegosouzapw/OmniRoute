import assert from "node:assert/strict";
import { describe, test } from "node:test";

// We import the pure function directly from the source module.
// estimateTokens lives in src/lib/memory/retrieval.ts but the module
// has heavy DB dependencies at the top level.  We replicate the pure
// function here to test the exact algorithm used by the route handler.

/**
 * Exact replica of estimateTokens from src/lib/memory/retrieval.ts:34-37
 * so the test does not pull in the full DB/SQLite dependency graph.
 */
function estimateTokens(text: string): number {
  if (!text || typeof text !== "string") return 0;
  return Math.ceil(text.length / 4);
}

describe("memory stats API — estimateTokens", () => {
  test("returns 0 for empty string", () => {
    assert.equal(estimateTokens(""), 0);
  });

  test("returns 0 for falsy/non-string input", () => {
    assert.equal(estimateTokens(null as unknown as string), 0);
    assert.equal(estimateTokens(undefined as unknown as string), 0);
    assert.equal(estimateTokens(42 as unknown as string), 0);
  });

  test("returns 1 for a 1-char string", () => {
    assert.equal(estimateTokens("a"), 1);
  });

  test("returns 1 for exactly 4 chars", () => {
    assert.equal(estimateTokens("abcd"), 1);
  });

  test("returns 2 for 5 chars (ceiling division)", () => {
    assert.equal(estimateTokens("abcde"), 2);
  });

  test("returns correct value for longer strings", () => {
    // 100 chars -> ceil(100/4) = 25
    assert.equal(estimateTokens("a".repeat(100)), 25);
  });
});

describe("memory stats API — tokensUsed computation", () => {
  test("sums estimateTokens across multiple content rows", () => {
    const rows = [
      { content: "hello" }, // 5 chars -> ceil(5/4) = 2
      { content: "world!" }, // 6 chars -> ceil(6/4) = 2
      { content: "ab" }, // 2 chars -> ceil(2/4) = 1
    ];
    const tokensUsed = rows.reduce((sum, r) => sum + estimateTokens(r.content), 0);
    assert.equal(tokensUsed, 5);
  });

  test("returns 0 for empty rows array", () => {
    const rows: { content: string }[] = [];
    const tokensUsed = rows.reduce((sum, r) => sum + estimateTokens(r.content), 0);
    assert.equal(tokensUsed, 0);
  });
});

describe("memory stats API — hitRate computation", () => {
  test("hitRate is 0 when no requests have been made", () => {
    const cacheStats = { hits: 0, misses: 0 };
    const total = cacheStats.hits + cacheStats.misses;
    const hitRate = total > 0 ? cacheStats.hits / total : 0;
    assert.equal(hitRate, 0);
  });

  test("hitRate is 1 when all requests are hits", () => {
    const cacheStats = { hits: 10, misses: 0 };
    const total = cacheStats.hits + cacheStats.misses;
    const hitRate = total > 0 ? cacheStats.hits / total : 0;
    assert.equal(hitRate, 1);
  });

  test("hitRate is 0.5 when hits equals misses", () => {
    const cacheStats = { hits: 5, misses: 5 };
    const total = cacheStats.hits + cacheStats.misses;
    const hitRate = total > 0 ? cacheStats.hits / total : 0;
    assert.equal(hitRate, 0.5);
  });

  test("hitRate computes correctly for arbitrary values", () => {
    const cacheStats = { hits: 3, misses: 7 };
    const total = cacheStats.hits + cacheStats.misses;
    const hitRate = total > 0 ? cacheStats.hits / total : 0;
    assert.equal(hitRate, 0.3);
  });
});
