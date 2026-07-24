// Regression guard for #8396: after a burst of retryable failures (e.g. 429s), the
// connection-level cooldown computed by checkFallbackError() must never exceed
// profile.maxCooldownMs. Before the fix, getScaledBaseCooldown() scaled
// baseCooldownMs * 2^backoffLevel with NO absolute ceiling on the connection-level
// path (unlike the model-lockout path, which already clamps to maxCooldownMs). A
// legacy-migrated OAuth profile with baseCooldownMs=60000 and maxBackoffSteps=8
// produced cooldownMs = 60000 * 2^8 = 15,360,000ms (~4.27h), blowing straight past
// an operator-configured maxCooldownMs of 10 minutes.
import test from "node:test";
import assert from "node:assert/strict";
import { checkFallbackError, type ProviderProfile } from "../../open-sse/services/accountFallback.ts";

const legacyMigratedOAuthProfile: ProviderProfile = {
  baseCooldownMs: 60000,
  useUpstreamRetryHints: false,
  maxCooldownMs: 600000, // operator-configured 10-minute ceiling
  maxBackoffSteps: 8,
  failureThreshold: 3,
  resetTimeoutMs: 30 * 60 * 1000,
  transientCooldown: 5000,
  rateLimitCooldown: 60000,
  maxBackoffLevel: 8,
  circuitBreakerThreshold: 3,
  circuitBreakerReset: 60000,
  providerFailureThreshold: 3,
  providerFailureWindowMs: 60000,
  providerCooldownMs: 60000,
};

test("#8396: connection-level 429 cooldown after a high-failureIndex burst is capped at profile.maxCooldownMs", () => {
  const result = checkFallbackError(
    429,
    "",
    8, // backoffLevel — a large failureIndex from a sustained 429 burst
    "some-model",
    "test-oauth-provider",
    null,
    legacyMigratedOAuthProfile
  );

  assert.equal(result.shouldFallback, true);
  assert.ok(
    result.cooldownMs <= legacyMigratedOAuthProfile.maxCooldownMs,
    `expected cooldownMs to be capped at ${legacyMigratedOAuthProfile.maxCooldownMs}ms ` +
      `(profile.maxCooldownMs), but got ${result.cooldownMs}ms — no absolute ceiling was ` +
      "applied on the connection-level 429 cooldown path"
  );
});

test("#8396: an upstream Retry-After hint is honored (bypasses the exponential scale entirely)", () => {
  const apikeyProfile: ProviderProfile = {
    ...legacyMigratedOAuthProfile,
    useUpstreamRetryHints: true,
  };
  const headers = new Headers({ "retry-after": "30" });

  const result = checkFallbackError(429, "", 8, "some-model", "test-apikey-provider", headers, apikeyProfile);

  assert.equal(result.usedUpstreamRetryHint, true);
  assert.ok(
    result.cooldownMs <= 31000 && result.cooldownMs >= 29000,
    `expected the ~30s upstream Retry-After hint to be honored, got ${result.cooldownMs}ms`
  );
});

test("#8396: a single 429 (low backoffLevel) still cools down normally, well under the cap", () => {
  const result = checkFallbackError(
    429,
    "",
    0, // first failure
    "some-model",
    "test-oauth-provider",
    null,
    legacyMigratedOAuthProfile
  );

  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, legacyMigratedOAuthProfile.baseCooldownMs);
  assert.ok(result.cooldownMs < legacyMigratedOAuthProfile.maxCooldownMs);
});
