import test from "node:test";
import assert from "node:assert/strict";
import { formatCachePercentage } from "../../src/shared/utils/formatting";

test("formatCachePercentage", async (t) => {
  await t.test("returns 0 when tokensIn is 0, null, or undefined", () => {
    assert.strictEqual(formatCachePercentage(0, 100), 0);
    assert.strictEqual(formatCachePercentage(null, 100), 0);
    assert.strictEqual(formatCachePercentage(undefined, 100), 0);
  });

  await t.test("returns 0 when cacheRead is 0, null, or undefined", () => {
    assert.strictEqual(formatCachePercentage(100, 0), 0);
    assert.strictEqual(formatCachePercentage(100, null), 0);
    assert.strictEqual(formatCachePercentage(100, undefined), 0);
  });

  await t.test("returns 0 for negative values", () => {
    assert.strictEqual(formatCachePercentage(-100, 50), 0);
    assert.strictEqual(formatCachePercentage(100, -50), 0);
  });

  await t.test("calculates standard percentages correctly", () => {
    assert.strictEqual(formatCachePercentage(100, 50), 50);
    assert.strictEqual(formatCachePercentage(1000, 250), 25);
    assert.strictEqual(formatCachePercentage(3, 1), 33);
  });

  await t.test("clamps percentage at 100 when cacheRead > tokensIn", () => {
    assert.strictEqual(formatCachePercentage(100, 150), 100);
    assert.strictEqual(formatCachePercentage(50, 1000), 100);
  });
});
