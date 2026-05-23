import test from "node:test";
import assert from "node:assert/strict";

// #2289 ("remove implicit API key request caps") reverted the configurable default
// rate limits introduced in #2266: keys with no explicitly-configured rate limits are
// now unlimited by default, and `buildDefaultRateLimits` was removed. This test was
// originally written for that removed feature; it now guards the current contract —
// that no implicit per-key cap creeps back in. Keys still opt into explicit limits via
// Settings/API Manager, and provider/account quota controls handle upstream 429s.
test("apiKeyPolicy exposes no implicit default rate limits (#2289)", async () => {
  const { DEFAULT_RATE_LIMITS } = await import("../../src/shared/utils/apiKeyPolicy.ts");
  assert.deepEqual(DEFAULT_RATE_LIMITS, []);
});
