import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-default-rl-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "default-rate-limit-test-secret";

// Mirror the constants in apiKeyPolicy.ts so the tests document the contract
// rather than re-deriving it from the implementation under test.
const LEGACY_DEFAULT = [
  { limit: 1000, window: 86400 },
  { limit: 5000, window: 604800 },
  { limit: 20000, window: 2592000 },
];

test.after(async () => {
  const coreDb = await import("../../src/lib/db/core.ts");
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("apiKeyPolicy exposes no implicit default rate limits (#2289)", async () => {
  const { DEFAULT_RATE_LIMITS } = await import("../../src/shared/utils/apiKeyPolicy.ts");
  assert.deepEqual(DEFAULT_RATE_LIMITS, []);
});

test("buildDefaultRateLimits: unset / empty env disables implicit fallback limits", async () => {
  const { buildDefaultRateLimits } = await import("../../src/shared/utils/apiKeyPolicy.ts");

  // No env override means UI-unrestricted API keys really stay unrestricted.
  assert.deepEqual(buildDefaultRateLimits(undefined), []);
  assert.deepEqual(buildDefaultRateLimits(""), []);
  assert.deepEqual(buildDefaultRateLimits("   "), []);
});

test("buildDefaultRateLimits: explicit '0' opts out — no fallback rules", async () => {
  const { buildDefaultRateLimits } = await import("../../src/shared/utils/apiKeyPolicy.ts");

  // Explicit "0" remains accepted for deployments that already set it.
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

test("buildDefaultRateLimits: malformed non-empty input falls back to the legacy default", async () => {
  const { buildDefaultRateLimits } = await import("../../src/shared/utils/apiKeyPolicy.ts");

  // A typo in an explicit deployment config should not silently disable rate limits.
  assert.deepEqual(buildDefaultRateLimits("-5"), LEGACY_DEFAULT);
  assert.deepEqual(buildDefaultRateLimits("not-a-number"), LEGACY_DEFAULT);
  assert.deepEqual(buildDefaultRateLimits("1000 requests"), LEGACY_DEFAULT);
  assert.deepEqual(buildDefaultRateLimits("3.14"), LEGACY_DEFAULT);
});
