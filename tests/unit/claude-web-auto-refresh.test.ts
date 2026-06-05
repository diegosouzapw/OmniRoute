import test from "node:test";
import assert from "node:assert/strict";
import { clearCfClearanceCache } from "../../open-sse/services/claudeTurnstileSolver";
import {
  injectCfClearance,
  refreshCookie,
  getCacheInfo,
  createAutoRefreshMiddleware,
} from "../../open-sse/services/claudeWebAutoRefresh";
import {
  getCfClearanceToken,
  getCacheStatus,
  setCfClearanceTokenForTesting,
} from "../../open-sse/services/claudeTurnstileSolver";

const TEST_CF_CLEARANCE_TOKEN = "test_cf_clearance_token_1234567890";

test.before(() => {
  setCfClearanceTokenForTesting(TEST_CF_CLEARANCE_TOKEN);
  clearCfClearanceCache();
});

test.after(() => {
  clearCfClearanceCache();
  setCfClearanceTokenForTesting(null);
});

test("should handle cache status when empty", () => {
  const status = getCacheStatus();
  assert.strictEqual(status.hasCached, false);
});

// Tests requiring a real Playwright browser (getCfClearanceToken → solveTurnstile)
// are skipped in CI because the chromium_headless_shell binary is not installed.
// They are retained as documentation of the intended live behavior.

test.skip("should get or solve cf_clearance token [requires playwright]", async () => {
  const token = await getCfClearanceToken();
  assert.ok(token);
  assert.strictEqual(typeof token, "string");
  assert.ok(token.length > 10);
});

test.skip("should cache token on subsequent calls [requires playwright]", async () => {
  clearCfClearanceCache();

  const token1 = await getCfClearanceToken();
  const status1 = getCacheStatus();
  assert.strictEqual(status1.hasCached, true);
  assert.ok(status1.expiresIn > 0);

  const token2 = await getCfClearanceToken();
  assert.strictEqual(token2, token1);
});

test.skip("should force refresh when requested [requires playwright]", async () => {
  const token1 = await getCfClearanceToken();
  const token2 = await getCfClearanceToken({ force: true });
  assert.ok(token2);
  assert.strictEqual(typeof token2, "string");
});

test("should inject cf_clearance into empty cookie", () => {
  const result = injectCfClearance("", "test_token_123");
  assert.strictEqual(result, "cf_clearance=test_token_123");
});

test("should inject cf_clearance with existing cookie", () => {
  const result = injectCfClearance("sessionKey=abc123", "test_token_456");
  assert.ok(result.includes("sessionKey=abc123"));
  assert.ok(result.includes("cf_clearance=test_token_456"));
});

test("should replace existing cf_clearance", () => {
  const original = "sessionKey=abc123; cf_clearance=old_token";
  const result = injectCfClearance(original, "new_token_789");
  assert.ok(result.includes("sessionKey=abc123"));
  assert.ok(result.includes("cf_clearance=new_token_789"));
  assert.ok(!result.includes("old_token"));
});

test.skip("should refresh cookie successfully [requires playwright]", async () => {
  const original = "sessionKey=test123";
  const result = await refreshCookie(original);
  assert.strictEqual(result.cfClearanceInjected, true);
  assert.ok(result.cookie.includes("sessionKey=test123"));
  assert.ok(result.cookie.includes("cf_clearance="));
  assert.strictEqual(result.attempt, 1);
});

test.skip("should include cf_clearance in refreshed cookie [requires playwright]", async () => {
  const original = "sessionKey=xyz789";
  const result = await refreshCookie(original);
  const parts = result.cookie.split("; ");
  const cfClearancePart = parts.find((p) => p.startsWith("cf_clearance="));
  assert.ok(cfClearancePart);
  assert.ok(cfClearancePart.match(/^cf_clearance=.{10,}$/));
});

test("should report empty cache", () => {
  clearCfClearanceCache();
  const info = getCacheInfo();
  assert.strictEqual(info.hasCached, false);
  assert.ok(info.message.includes("No cached"));
});

test.skip("should report cached token info [requires playwright]", async () => {
  clearCfClearanceCache();
  await getCfClearanceToken();
  const info = getCacheInfo();
  assert.strictEqual(info.hasCached, true);
  assert.ok(info.expiresIn > 0);
  assert.ok(info.message.includes("expires in"));
});

test("should create middleware function", () => {
  const middleware = createAutoRefreshMiddleware();
  assert.strictEqual(typeof middleware, "function");
});

test.skip("should handle complete refresh flow [requires playwright]", async () => {
  clearCfClearanceCache();

  const token = await getCfClearanceToken();
  assert.ok(token);

  const cacheInfo = getCacheInfo();
  assert.strictEqual(cacheInfo.hasCached, true);

  const cookie = injectCfClearance("sessionKey=abc", token);
  assert.ok(cookie.includes("cf_clearance="));

  const middleware = createAutoRefreshMiddleware();
  assert.strictEqual(typeof middleware, "function");
});
