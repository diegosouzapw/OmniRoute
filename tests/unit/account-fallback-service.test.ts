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
  recordProviderFailure,
  isProviderInCooldown,
  getProviderCooldownRemainingMs,
  clearProviderFailure,
  isProviderFailureCode,
  getProvidersInCooldown,
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
  const oauthProfile = getProviderProfile("claude");
  assert.equal(oauthProfile.transientCooldown, PROVIDER_PROFILES.oauth.transientCooldown);
  assert.equal(
    oauthProfile.rateLimitCooldown,
    oauthProfile.useUpstreamRetryHints ? 0 : oauthProfile.baseCooldownMs
  );
  assert.equal(oauthProfile.maxBackoffLevel, PROVIDER_PROFILES.oauth.maxBackoffLevel);
  assert.equal(
    oauthProfile.circuitBreakerThreshold,
    PROVIDER_PROFILES.oauth.circuitBreakerThreshold
  );
  assert.equal(oauthProfile.circuitBreakerReset, PROVIDER_PROFILES.oauth.circuitBreakerReset);
  assert.equal(oauthProfile.baseCooldownMs, PROVIDER_PROFILES.oauth.transientCooldown);
  assert.equal(oauthProfile.failureThreshold, PROVIDER_PROFILES.oauth.circuitBreakerThreshold);
  assert.equal(oauthProfile.resetTimeoutMs, PROVIDER_PROFILES.oauth.circuitBreakerReset);

  const apiKeyProfile = getProviderProfile("openai");
  assert.equal(apiKeyProfile.transientCooldown, PROVIDER_PROFILES.apikey.transientCooldown);
  assert.equal(
    apiKeyProfile.rateLimitCooldown,
    apiKeyProfile.useUpstreamRetryHints ? 0 : apiKeyProfile.baseCooldownMs
  );
  assert.equal(apiKeyProfile.maxBackoffLevel, PROVIDER_PROFILES.apikey.maxBackoffLevel);
  assert.equal(
    apiKeyProfile.circuitBreakerThreshold,
    PROVIDER_PROFILES.apikey.circuitBreakerThreshold
  );
  assert.equal(apiKeyProfile.circuitBreakerReset, PROVIDER_PROFILES.apikey.circuitBreakerReset);
  assert.equal(apiKeyProfile.baseCooldownMs, PROVIDER_PROFILES.apikey.transientCooldown);
  assert.equal(apiKeyProfile.failureThreshold, PROVIDER_PROFILES.apikey.circuitBreakerThreshold);
  assert.equal(apiKeyProfile.resetTimeoutMs, PROVIDER_PROFILES.apikey.circuitBreakerReset);
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
      baseCooldownMs: 125,
      useUpstreamRetryHints: false,
      maxBackoffSteps: 2,
      failureThreshold: 60,
      resetTimeoutMs: 500,
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

// Provider-level failure circuit breaker tests
test("isProviderFailureCode correctly identifies provider-wide transient error codes", () => {
  assert.equal(isProviderFailureCode(429), false);
  assert.equal(isProviderFailureCode(408), true);
  assert.equal(isProviderFailureCode(500), true);
  assert.equal(isProviderFailureCode(502), true);
  assert.equal(isProviderFailureCode(503), true);
  assert.equal(isProviderFailureCode(504), true);
  assert.equal(isProviderFailureCode(401), false);
  assert.equal(isProviderFailureCode(403), false);
  assert.equal(isProviderFailureCode(400), false);
  assert.equal(isProviderFailureCode(404), false);
  assert.equal(isProviderFailureCode(200), false);
});

test("recordProviderFailure tracks failures and triggers cooldown after threshold", () => {
  const originalNow = Date.now;
  let now = 1_700_000_000_000;
  Date.now = () => now;

  try {
    const provider = "test-provider";

    // Clear any existing state
    clearProviderFailure(provider);
    assert.equal(isProviderInCooldown(provider), false);
    assert.equal(getProviderCooldownRemainingMs(provider), null);

    // Record 4 failures - should not trigger cooldown yet
    for (let i = 0; i < 4; i++) {
      recordProviderFailure(provider);
      now += 1000; // 1 second between failures
    }
    assert.equal(isProviderInCooldown(provider), false);

    // 5th failure - should trigger cooldown
    recordProviderFailure(provider);
    assert.equal(isProviderInCooldown(provider), true);

    const remaining = getProviderCooldownRemainingMs(provider);
    assert.ok(remaining !== null);
    assert.ok(remaining > 0);
    assert.ok(remaining <= 10 * 60 * 1000); // 10 minutes max

    // Check getProvidersInCooldown returns the provider
    const inCooldown = getProvidersInCooldown();
    assert.ok(inCooldown.some((p) => p.provider === provider));
    assert.equal(inCooldown.find((p) => p.provider === provider)?.failureCount, 5);

    // Simulate cooldown expiration
    now += 11 * 60 * 1000; // 11 minutes later
    assert.equal(isProviderInCooldown(provider), false);
    assert.equal(getProviderCooldownRemainingMs(provider), null);
    assert.equal(
      getProvidersInCooldown().some((p) => p.provider === provider),
      false
    );
  } finally {
    Date.now = originalNow;
    clearProviderFailure("test-provider");
  }
});

test("checkFallbackError no longer mutates provider breaker state on per-connection failures", () => {
  const provider = "test-provider-check";
  clearProviderFailure(provider);

  for (let i = 0; i < 5; i++) {
    checkFallbackError(429, "rate limited", 0, null, provider);
  }

  assert.equal(isProviderInCooldown(provider), false);
  clearProviderFailure(provider);
});

test("checkFallbackError does not record provider failure for non-transient errors", () => {
  const originalNow = Date.now;
  let now = 1_700_000_000_000;
  Date.now = () => now;

  try {
    const provider = "test-provider-no-record";
    clearProviderFailure(provider);

    // Simulate 5 auth errors (401) - should NOT trigger provider cooldown
    for (let i = 0; i < 5; i++) {
      checkFallbackError(401, "unauthorized", 0, null, provider);
      now += 1000;
    }

    // Provider should NOT be in cooldown
    assert.equal(isProviderInCooldown(provider), false);
  } finally {
    Date.now = originalNow;
    clearProviderFailure("test-provider-no-record");
  }
});

test("clearProviderFailure removes provider from cooldown", () => {
  const originalNow = Date.now;
  let now = 1_700_000_000_000;
  Date.now = () => now;

  try {
    const provider = "test-provider-clear";
    clearProviderFailure(provider);

    // Trigger cooldown
    for (let i = 0; i < 5; i++) {
      recordProviderFailure(provider);
      now += 1000;
    }
    assert.equal(isProviderInCooldown(provider), true);

    // Clear the failure state
    clearProviderFailure(provider);
    assert.equal(isProviderInCooldown(provider), false);
    assert.equal(getProviderCooldownRemainingMs(provider), null);
  } finally {
    Date.now = originalNow;
    clearProviderFailure("test-provider-clear");
  }
});

// Daily quota exhausted detection tests
test("isDailyQuotaExhausted detects today's quota errors", () => {
  const { isDailyQuotaExhausted } = accountFallback;
  assert.equal(isDailyQuotaExhausted("You have exceeded today's quota for model X"), true);
  assert.equal(isDailyQuotaExhausted("exceeded your daily quota"), true);
  assert.equal(isDailyQuotaExhausted("Please try again tomorrow"), true);
  assert.equal(isDailyQuotaExhausted("rate limit exceeded"), false);
  assert.equal(isDailyQuotaExhausted(""), false);
  assert.equal(isDailyQuotaExhausted(null), false);
});

test("getMsUntilTomorrow returns positive value less than 24 hours", () => {
  const { getMsUntilTomorrow } = accountFallback;
  const ms = getMsUntilTomorrow();
  assert.ok(ms > 0, "should be positive");
  assert.ok(ms <= 24 * 60 * 60 * 1000, "should be <= 24 hours");
});

test("checkFallbackError locks model until tomorrow for daily quota exhaustion", () => {
  const result = checkFallbackError(
    429,
    "You have exceeded today's quota for model moonshotai/Kimi-K2.5, please try again tomorrow"
  );
  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(result.dailyQuotaExhausted, true);
  assert.ok(result.cooldownMs > 0, "cooldown should be positive");
  assert.ok(result.cooldownMs <= 24 * 60 * 60 * 1000, "cooldown should be <= 24 hours");
});

test("checkFallbackError detects daily quota with 'try again tomorrow'", () => {
  const result = checkFallbackError(429, "Please try again tomorrow");
  assert.equal(result.shouldFallback, true);
  assert.equal(result.dailyQuotaExhausted, true);
});

test("checkFallbackError detects daily quota with 'daily quota'", () => {
  const result = checkFallbackError(429, "You have exceeded your daily quota");
  assert.equal(result.shouldFallback, true);
  assert.equal(result.dailyQuotaExhausted, true);
});
