import test from "node:test";
import assert from "node:assert/strict";

test("buildDefaultRateLimits: default ('0') returns no rules — unlimited", async () => {
  const { buildDefaultRateLimits } = await import("../../src/shared/utils/apiKeyPolicy.ts");

  // Explicit "0" — opt-out
  assert.deepEqual(buildDefaultRateLimits("0"), []);
  // Empty / missing env var — also unlimited
  assert.deepEqual(buildDefaultRateLimits(undefined), []);
  assert.deepEqual(buildDefaultRateLimits(""), []);
});

test("buildDefaultRateLimits: positive N yields N/day, 5N/week, 20N/month", async () => {
  const { buildDefaultRateLimits } = await import("../../src/shared/utils/apiKeyPolicy.ts");

  const rules = buildDefaultRateLimits("100");
  assert.deepEqual(rules, [
    { limit: 100, window: 86400 },
    { limit: 500, window: 604800 },
    { limit: 2000, window: 2592000 },
  ]);
});

test("buildDefaultRateLimits: negative or non-numeric input falls back to unlimited", async () => {
  const { buildDefaultRateLimits } = await import("../../src/shared/utils/apiKeyPolicy.ts");

  // Negative is treated as opt-out, not a poison value.
  assert.deepEqual(buildDefaultRateLimits("-5"), []);
  // Garbage input yields NaN → treated as unlimited rather than a thrown error
  // (that would crash module load, since the const is evaluated at import).
  assert.deepEqual(buildDefaultRateLimits("not-a-number"), []);
});
