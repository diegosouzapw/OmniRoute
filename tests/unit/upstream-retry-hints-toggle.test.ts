import test from "node:test";
import assert from "node:assert/strict";

import { checkFallbackError, getProviderProfile } from "../../open-sse/services/accountFallback.ts";
import { RateLimitReason } from "../../open-sse/config/constants.ts";

const ANTIGRAVITY_RESET_TEXT =
  "Individual quota reached. Contact your administrator to enable overages. Resets in 164h27m24s.";
const RESET_164H = (164 * 3600 + 27 * 60 + 24) * 1000;

function antigravityProfile(useUpstreamRetryHints: boolean) {
  return {
    ...getProviderProfile("antigravity"),
    baseCooldownMs: 125,
    transientCooldown: 125,
    rateLimitCooldown: useUpstreamRetryHints ? 0 : 125,
    useUpstreamRetryHints,
  };
}

test("checkFallbackError ignores body reset text when upstream retry hints are disabled", () => {
  const result = checkFallbackError(
    429,
    ANTIGRAVITY_RESET_TEXT,
    0,
    "gemini-3-flash-agent",
    "antigravity",
    null,
    antigravityProfile(false)
  );

  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(result.usedUpstreamRetryHint, false);
  assert.equal(result.cooldownMs, 125);
});

test("checkFallbackError honors body reset text when upstream retry hints are enabled", () => {
  const result = checkFallbackError(
    429,
    ANTIGRAVITY_RESET_TEXT,
    0,
    "gemini-3-flash-agent",
    "antigravity",
    null,
    antigravityProfile(true)
  );

  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(result.usedUpstreamRetryHint, true);
  assert.equal(result.cooldownMs, RESET_164H);
});
