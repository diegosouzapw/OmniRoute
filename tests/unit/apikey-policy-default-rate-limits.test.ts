import test from "node:test";
import assert from "node:assert/strict";

// Mirror the constants in apiKeyPolicy.ts so the tests document the contract
// rather than re-deriving it from the implementation under test.
const LEGACY_DEFAULT = [
  { limit: 1000, window: 86400 },
  { limit: 5000, window: 604800 },
  { limit: 20000, window: 2592000 },
];

test("buildDefaultRateLimits: unset / empty env falls back to the legacy 1000/day default", async () => {
  const { buildDefaultRateLimits } = await import("../../src/shared/utils/apiKeyPolicy.ts");

  // Unset and empty must both produce the legacy default — going unlimited
  // by accident on an upgrade would expose existing deployments.
  assert.deepEqual(buildDefaultRateLimits(undefined), LEGACY_DEFAULT);
  assert.deepEqual(buildDefaultRateLimits(""), LEGACY_DEFAULT);
  assert.deepEqual(buildDefaultRateLimits("   "), LEGACY_DEFAULT);
});

test("buildDefaultRateLimits: explicit '0' opts out — no fallback rules", async () => {
  const { buildDefaultRateLimits } = await import("../../src/shared/utils/apiKeyPolicy.ts");

  // The only way to become unlimited is to set the env var explicitly to "0".
  assert.deepEqual(buildDefaultRateLimits("0"), []);
});

test("buildDefaultRateLimits: positive N yields N/day, 5N/week, 20N/month", async () => {
  const { buildDefaultRateLimits } = await import("../../src/shared/utils/apiKeyPolicy.ts");

  assert.deepEqual(buildDefaultRateLimits("100"), [
    { limit: 100, window: 86400 },
    { limit: 500, window: 604800 },
    { limit: 2000, window: 2592000 },
  ]);
});

test("buildDefaultRateLimits: malformed input falls back to the legacy default, not unlimited", async () => {
  const { buildDefaultRateLimits } = await import("../../src/shared/utils/apiKeyPolicy.ts");

  // Zod (z.coerce.number().int().min(0)) rejects each of these.
  // The function must keep the secure default rather than silently returning
  // [] — a typo in deployment config should not silently disable rate limits.
  assert.deepEqual(buildDefaultRateLimits("-5"), LEGACY_DEFAULT);
  assert.deepEqual(buildDefaultRateLimits("not-a-number"), LEGACY_DEFAULT);
  assert.deepEqual(buildDefaultRateLimits("1000 requests"), LEGACY_DEFAULT);
  assert.deepEqual(buildDefaultRateLimits("3.14"), LEGACY_DEFAULT);
});
