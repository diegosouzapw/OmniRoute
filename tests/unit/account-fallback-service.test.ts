import test from "node:test";
import assert from "node:assert/strict";

const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const accountSelector = await import("../../open-sse/services/accountSelector.ts");
const { RateLimitReason, COOLDOWN_MS, PROVIDER_PROFILES } =
  await import("../../open-sse/config/constants.ts");

const {
  isOAuthInvalidToken,
  parseRetryFromErrorText,
  checkFallbackError,
  filterAvailableAccounts,
  getEarliestRateLimitedUntil,
  formatRetryAfter,
  applyErrorState,
  lockModelIfPerModelQuota,
  isModelLocked,
  getModelLockoutInfo,
  hasPerModelQuota,
  getProviderProfile,
  recordModelLockoutFailure,
  clearModelLock,
  shouldMarkAccountExhaustedFrom429,
} = accountFallback;

const { selectAccount } = accountSelector;

function withMockedNow(now, fn) {
  const originalNow = Date.now;
  Date.now = () => now;
  try {
    return fn();
  } finally {
    Date.now = originalNow;
  }
}

test("isOAuthInvalidToken detects refreshable oauth failures", () => {
  assert.equal(
    isOAuthInvalidToken("Invalid authentication credentials for this OAuth 2 session"),
    true
  );
  assert.equal(isOAuthInvalidToken("plain rate limit"), false);
});

test("parseRetryFromErrorText parses both compact reset formats", () => {
  assert.equal(parseRetryFromErrorText("Your quota will reset after 2h30m14s"), 9_014_000);
  assert.equal(parseRetryFromErrorText("The pool will reset after 45m"), 2_700_000);
  assert.equal(parseRetryFromErrorText("This will reset after 30s"), 30_000);
  assert.equal(parseRetryFromErrorText("No reset metadata"), null);
});

test("checkFallbackError marks deactivated accounts as permanent auth failures", () => {
  const result = checkFallbackError(401, "This account has been deactivated");
  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.AUTH_ERROR);
  assert.equal(result.permanent, true);
  assert.ok(result.cooldownMs >= 300 * 24 * 60 * 60 * 1000);
});

test("checkFallbackError treats exhausted credits as long quota cooldowns", () => {
  const result = checkFallbackError(429, "credit_balance_too_low");
  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(result.creditsExhausted, true);
  assert.equal(result.cooldownMs, COOLDOWN_MS.paymentRequired ?? 3600 * 1000);
});

test("checkFallbackError honors Retry-After header for rate limits", () => {
  withMockedNow(1_700_000_000_000, () => {
    const headers = new Headers({ "retry-after": "120" });
    const result = checkFallbackError(429, "Rate limit hit", 3, null, "openai", headers);

    assert.equal(result.shouldFallback, true);
    assert.equal(result.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
    assert.equal(result.newBackoffLevel, 0);
    assert.equal(result.cooldownMs, 120_000);
  });
});

test("checkFallbackError honors x-ratelimit-reset for transient 5xx errors", () => {
  withMockedNow(1_700_000_000_000, () => {
    const resetSeconds = Math.floor((Date.now() + 90_000) / 1000);
    const headers = new Headers({ "x-ratelimit-reset": String(resetSeconds) });
    const result = checkFallbackError(503, "upstream unavailable", 1, null, "openai", headers);

    assert.equal(result.shouldFallback, true);
    assert.equal(result.reason, RateLimitReason.SERVER_ERROR);
    assert.equal(result.newBackoffLevel, 0);
    assert.ok(result.cooldownMs >= 89_000);
    assert.ok(result.cooldownMs <= 90_000);
  });
});

test("checkFallbackError keeps generic 400 client errors terminal", () => {
  const result = checkFallbackError(400, "bad request payload");
  assert.deepEqual(result, {
    shouldFallback: false,
    cooldownMs: 0,
    reason: RateLimitReason.UNKNOWN,
  });
});

test("filterAvailableAccounts skips exclusion and active cooldowns but keeps recovered ones", () => {
  withMockedNow(1_700_000_000_000, () => {
    const accounts = [
      { id: "exclude-me" },
      { id: "cooling", rateLimitedUntil: new Date(Date.now() + 60_000).toISOString() },
      { id: "recovered", rateLimitedUntil: new Date(Date.now() - 1_000).toISOString() },
      { id: "healthy" },
    ];

    const available = filterAvailableAccounts(accounts, "exclude-me");
    assert.deepEqual(
      available.map((account) => account.id),
      ["recovered", "healthy"]
    );
  });
});

test("getEarliestRateLimitedUntil returns the shortest future cooldown and formatRetryAfter humanizes it", () => {
  withMockedNow(1_700_000_000_000, () => {
    const earliest = getEarliestRateLimitedUntil([
      { id: "expired", rateLimitedUntil: new Date(Date.now() - 5_000).toISOString() },
      { id: "later", rateLimitedUntil: new Date(Date.now() + 90_000).toISOString() },
      { id: "earliest", rateLimitedUntil: new Date(Date.now() + 30_000).toISOString() },
    ]);

    assert.equal(earliest, new Date(Date.now() + 30_000).toISOString());
    assert.equal(formatRetryAfter(earliest), "reset after 30s");
  });
});

test("applyErrorState and selectAccount advance to the next account after an auth failure", () => {
  withMockedNow(1_700_000_000_000, () => {
    const accounts = [
      { id: "conn-a", backoffLevel: 0 },
      { id: "conn-b", backoffLevel: 0 },
    ];

    const firstSelection = selectAccount(accounts, "fill-first");
    assert.equal(firstSelection.account.id, "conn-a");

    const failedFirst = applyErrorState(firstSelection.account, 401, "Unauthorized", "claude");
    assert.equal(failedFirst.status, "error");
    assert.equal(failedFirst.lastError.reason, RateLimitReason.AUTH_ERROR);

    const candidates = filterAvailableAccounts([failedFirst, accounts[1]], failedFirst.id);
    const nextSelection = selectAccount(candidates, "fill-first");
    assert.equal(nextSelection.account.id, "conn-b");
  });
});

test("lockModelIfPerModelQuota only locks supported providers and real models", () => {
  const geminiConnectionId = `gemini-${Date.now()}`;
  const openAiConnectionId = `openai-${Date.now()}`;
  const compatibleConnectionId = `compatible-${Date.now()}`;
  const compatibleProvider = "openai-compatible-custom-node";
  const compatibleModel = "custom-model-a";

  assert.equal(hasPerModelQuota("gemini"), true);
  assert.equal(hasPerModelQuota("openai"), false);
  assert.equal(hasPerModelQuota(compatibleProvider, compatibleModel), true);

  assert.equal(
    lockModelIfPerModelQuota(
      "gemini",
      geminiConnectionId,
      "gemini-2.5-pro",
      RateLimitReason.RATE_LIMIT_EXCEEDED,
      30_000
    ),
    true
  );
  assert.equal(isModelLocked("gemini", geminiConnectionId, "gemini-2.5-pro"), true);

  assert.equal(
    lockModelIfPerModelQuota(
      "openai",
      openAiConnectionId,
      "gpt-5-mini",
      RateLimitReason.RATE_LIMIT_EXCEEDED,
      30_000
    ),
    false
  );
  assert.equal(isModelLocked("openai", openAiConnectionId, "gpt-5-mini"), false);

  assert.equal(
    lockModelIfPerModelQuota(
      compatibleProvider,
      compatibleConnectionId,
      compatibleModel,
      RateLimitReason.RATE_LIMIT_EXCEEDED,
      30_000
    ),
    true
  );
  assert.equal(isModelLocked(compatibleProvider, compatibleConnectionId, compatibleModel), true);
});

test("getProviderProfile differentiates oauth and api-key providers", () => {
  assert.deepEqual(getProviderProfile("claude"), PROVIDER_PROFILES.oauth);
  assert.deepEqual(getProviderProfile("openai"), PROVIDER_PROFILES.apikey);
});

test("shouldMarkAccountExhaustedFrom429 skips connection poisoning for compatible providers", () => {
  assert.equal(shouldMarkAccountExhaustedFrom429("gemini", "gemini-2.5-pro"), false);
  assert.equal(
    shouldMarkAccountExhaustedFrom429("openai-compatible-custom-node", "any-model"),
    false
  );
  assert.equal(shouldMarkAccountExhaustedFrom429("openai", "gpt-4o-mini"), true);
});

test("recordModelLockoutFailure uses provider profile cooldowns, backoff, and reset window", () => {
  const originalNow = Date.now;
  let now = 1_700_000_000_000;
  Date.now = () => now;

  try {
    const compatibleProvider = "openai-compatible-custom-node";
    const compatibleModel = "custom-model-a";
    const profile = {
      transientCooldown: 250,
      rateLimitCooldown: 125,
      maxBackoffLevel: 2,
      circuitBreakerThreshold: 60,
      circuitBreakerReset: 500,
    };

    const first = recordModelLockoutFailure(
      compatibleProvider,
      "conn-compatible",
      compatibleModel,
      "rate_limited",
      429,
      0,
      profile
    );
    now += 50;
    const second = recordModelLockoutFailure(
      compatibleProvider,
      "conn-compatible",
      compatibleModel,
      "rate_limited",
      429,
      0,
      profile
    );
    now += 50;
    const third = recordModelLockoutFailure(
      compatibleProvider,
      "conn-compatible",
      compatibleModel,
      "rate_limited",
      429,
      0,
      profile
    );

    const info = getModelLockoutInfo(compatibleProvider, "conn-compatible", compatibleModel);

    assert.equal(first.failureCount, 1);
    assert.equal(first.cooldownMs, 125);
    assert.equal(second.failureCount, 2);
    assert.equal(second.cooldownMs, 250);
    assert.equal(third.failureCount, 3);
    assert.equal(third.cooldownMs, 500);
    assert.equal(info.failureCount, 3);

    clearModelLock(compatibleProvider, "conn-compatible", compatibleModel);
    now += 600;

    const afterReset = recordModelLockoutFailure(
      compatibleProvider,
      "conn-compatible",
      compatibleModel,
      "rate_limited",
      429,
      0,
      profile
    );

    assert.equal(afterReset.failureCount, 1);
    assert.equal(afterReset.cooldownMs, 125);
  } finally {
    Date.now = originalNow;
    clearModelLock("openai-compatible-custom-node", "conn-compatible", "custom-model-a");
  }
});
