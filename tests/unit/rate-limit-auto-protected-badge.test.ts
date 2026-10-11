import test from "node:test";
import assert from "node:assert/strict";

const { isConnectionAutoProtected } =
  await import("../../open-sse/services/rateLimitManager/autoProtection.ts");
const { DEFAULT_RESILIENCE_SETTINGS } = await import("../../src/lib/resilience/settings.ts");

const queue = DEFAULT_RESILIENCE_SETTINGS.requestQueue;
const apiKeyConn = { provider: "openai", isActive: true, rateLimitProtection: false };

test.afterEach(() => {
  delete process.env.RATE_LIMIT_AUTO_ENABLE;
});

test("active API-key connection without explicit protection is auto-protected by default", () => {
  assert.equal(isConnectionAutoProtected(apiKeyConn, queue), true);
});

test("explicit protection is reported by the explicit flag, not as auto", () => {
  assert.equal(
    isConnectionAutoProtected({ ...apiKeyConn, rateLimitProtection: true }, queue),
    false
  );
});

test("inactive connections and OAuth providers are not auto-protected", () => {
  assert.equal(isConnectionAutoProtected({ ...apiKeyConn, isActive: false }, queue), false);
  assert.equal(isConnectionAutoProtected({ ...apiKeyConn, provider: "claude" }, queue), false);
});

test("RATE_LIMIT_AUTO_ENABLE=false disables auto-protection; =true forces it over the dashboard setting", () => {
  process.env.RATE_LIMIT_AUTO_ENABLE = "false";
  assert.equal(isConnectionAutoProtected(apiKeyConn, queue), false);
  process.env.RATE_LIMIT_AUTO_ENABLE = "true";
  assert.equal(
    isConnectionAutoProtected(apiKeyConn, { ...queue, autoEnableApiKeyProviders: false }),
    true
  );
});
