import test from "node:test";
import assert from "node:assert/strict";

const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const accountSelector = await import("../../open-sse/services/accountSelector.ts");
const { RateLimitReason, COOLDOWN_MS, PROVIDER_PROFILES } =
  await import("../../open-sse/config/constants.ts");
const { getCircuitBreaker } = await import("../../src/shared/utils/circuitBreaker.ts");

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
  getProviderBreakerState,
  isCreditsExhausted,
  CREDITS_EXHAUSTED_SIGNALS,
} = accountFallback;

const { selectAccount } = accountSelector;

/** Build a full ProviderProfile from partial overrides (test helper). */
function makeProfile(overrides: Record<string, unknown> = {}): any {
  return {
    baseCooldownMs: 125,
    useUpstreamRetryHints: false,
    maxBackoffSteps: 3,
    failureThreshold: 60,
    resetTimeoutMs: 5000,
    transientCooldown: 125,
    rateLimitCooldown: 125,
    maxBackoffLevel: 3,
    circuitBreakerThreshold: 60,
    circuitBreakerReset: 5000,
    providerFailureThreshold: 5,
    providerFailureWindowMs: 300000,
    providerCooldownMs: 60000,
    ...overrides,
  };
}

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

test("parseRetryFromErrorText parses Antigravity 'Resets in XhYmZs' phrasing", () => {
  assert.equal(
    parseRetryFromErrorText(
      "Individual quota reached. Contact your administrator to enable overages. " +
        "Resets in 164h27m24s."
    ),
    (164 * 3600 + 27 * 60 + 24) * 1000
  );
  assert.equal(parseRetryFromErrorText("Resets in 2h7m23s"), 7_643_000);
  assert.equal(parseRetryFromErrorText("Reset in 45m"), 2_700_000);
});

test("parseRetryFromErrorText caps extreme reset windows at 30 days", () => {
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
  // 100 days → capped to 30
  assert.equal(parseRetryFromErrorText("Resets in 2400h"), thirtyDaysMs);
  // Absurd value → capped
  assert.equal(parseRetryFromErrorText("Resets in 999999h"), thirtyDaysMs);
});

test("checkFallbackError locks Antigravity quota-reached 429 for the full reset window", () => {
  const message =
    "Individual quota reached. Contact your administrator to enable overages. " +
    "Resets in 164h27m24s.";
  const result = checkFallbackError(
    429,
    message,
    0,
    "gemini-3.5-flash-high",
    "antigravity",
    null,
    makeProfile()
  );

  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(result.usedUpstreamRetryHint, true);
  // Full parsed window (≈164.46h), under the 30-day cap — not the generic ~5s rate-limit backoff.
  assert.equal(result.cooldownMs, (164 * 3600 + 27 * 60 + 24) * 1000);
});

test("recordModelLockoutFailure honors a multi-day exactCooldownMs (under 30-day cap)", () => {
  const provider = "antigravity";
  const connectionId = "conn-quota-window";
  const model = "gemini-3.5-flash-high";
  const exactCooldownMs = (164 * 3600 + 27 * 60 + 24) * 1000;

  clearModelLock(provider, connectionId, model);
  const lockout = recordModelLockoutFailure(
    provider,
    connectionId,
    model,
    "quota_exhausted",
    429,
    0,
    makeProfile(),
    { exactCooldownMs }
  );

  assert.equal(lockout.cooldownMs, exactCooldownMs);
  assert.equal(isModelLocked(provider, connectionId, model), true);
  clearModelLock(provider, connectionId, model);
});

test("checkFallbackError marks deactivated accounts as permanent auth failures", () => {
  const result = checkFallbackError(401, "This account has been deactivated");
  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.AUTH_ERROR);
  assert.equal(result.permanent, true);
  assert.ok(result.cooldownMs >= 300 * 24 * 60 * 60 * 1000);
});

test("checkFallbackError classifies 'free tier of the model has been exhausted' as quota exhausted", () => {
  const result = checkFallbackError(429, "free tier of the model has been exhausted");
  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(result.creditsExhausted, true);
});

test("checkFallbackError treats non-429 exhausted credits as long quota cooldowns", () => {
  const result = checkFallbackError(402, "credit_balance_too_low");
  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(result.creditsExhausted, true);
  assert.equal(result.cooldownMs, COOLDOWN_MS.paymentRequired ?? 3600 * 1000);
});

test("checkFallbackError keeps API-key 429 exhausted-credit text on the resilience cooldown path", () => {
  const result = checkFallbackError(
    429,
    "credit_balance_too_low",
    0,
    null,
    "openai",
    null,
    makeProfile()
  );

  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
  assert.equal(result.creditsExhausted, undefined);
  assert.equal(result.cooldownMs, 125);
});

test("checkFallbackError preserves OAuth 429 exhausted-credit semantics", () => {
  const result = checkFallbackError(
    429,
    "credit_balance_too_low",
    0,
    null,
    "codex",
    null,
    makeProfile()
  );

  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(result.creditsExhausted, true);
  assert.equal(result.cooldownMs, COOLDOWN_MS.paymentRequired ?? 3600 * 1000);
});

test("checkFallbackError keeps API-key 429 quota text on the status-based resilience path", () => {
  const result = checkFallbackError(429, "quota exceeded", 0, null, "openai", null, makeProfile());

  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
  assert.equal(result.cooldownMs, 125);
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

test("checkFallbackError treats a genuine 400 model-access error as combo fallback", () => {
  const result = checkFallbackError(400, "The model `foo` does not exist or is not available");
  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.MODEL_CAPACITY);
});

test("checkFallbackError does NOT treat a bad-credential 400 as model-access fallback", () => {
  // Phrased so it would otherwise match MODEL_ACCESS_DENIED_PATTERNS ("...api key
  // ... model"), but the bad-credential signal must keep it terminal so the real
  // auth error surfaces instead of silently exhausting every combo target.
  const result = checkFallbackError(400, "Invalid API key provided for model gpt-4o");
  assert.deepEqual(result, {
    shouldFallback: false,
    cooldownMs: 0,
    reason: RateLimitReason.UNKNOWN,
  });
});

test("checkFallbackError still honors structured model_not_found even with credential-like text", () => {
  // Structured codes are authoritative and unaffected by the credential guard.
  const result = checkFallbackError(400, "unauthorized-ish blob", 0, null, "openai", null, null, {
    code: "model_not_found",
  });
  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.MODEL_CAPACITY);
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
      { rateLimitedUntil: new Date(Date.now() - 5_000).toISOString() },
      { rateLimitedUntil: new Date(Date.now() + 90_000).toISOString() },
      { rateLimitedUntil: new Date(Date.now() + 30_000).toISOString() },
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
  assert.equal(shouldMarkAccountExhaustedFrom429("openai", "gpt-4o-mini"), false);
  assert.equal(shouldMarkAccountExhaustedFrom429("claude", "claude-sonnet-4-6"), true);
});

test("shouldMarkAccountExhaustedFrom429 does not poison quota cache for transient 429s", () => {
  assert.equal(
    shouldMarkAccountExhaustedFrom429("kiro", "claude-opus-4.7", undefined, "rate_limit"),
    false
  );
  assert.equal(
    shouldMarkAccountExhaustedFrom429("kiro", "claude-opus-4.7", undefined, "transient"),
    false
  );
  assert.equal(
    shouldMarkAccountExhaustedFrom429("kiro", "claude-opus-4.7", undefined, "quota_exhausted"),
    true
  );
});

test("hasPerModelQuota returns true for GitHub Copilot provider (#1624)", () => {
  assert.equal(hasPerModelQuota("github"), true);
  assert.equal(hasPerModelQuota("github", "gpt-5.1-codex-max"), true);
  assert.equal(hasPerModelQuota("github", "gpt-5-mini"), true);
});

test("shouldMarkAccountExhaustedFrom429 skips connection-wide lockout for GitHub (#1624)", () => {
  assert.equal(shouldMarkAccountExhaustedFrom429("github", "gpt-5.1-codex-max"), false);
  assert.equal(shouldMarkAccountExhaustedFrom429("github", "gpt-5-mini"), false);
  assert.equal(shouldMarkAccountExhaustedFrom429("github", "claude-haiku-4.5"), false);
});

test("lockModelIfPerModelQuota locks individual GitHub models without poisoning the connection (#1624)", () => {
  const connectionId = `github-${Date.now()}`;

  // A 429 on a high-PRU model should lock ONLY that model
  assert.equal(
    lockModelIfPerModelQuota(
      "github",
      connectionId,
      "gpt-5.1-codex-max",
      RateLimitReason.RATE_LIMIT_EXCEEDED,
      30_000
    ),
    true
  );
  assert.equal(isModelLocked("github", connectionId, "gpt-5.1-codex-max"), true);

  // Other models on the same connection should remain unlocked
  assert.equal(isModelLocked("github", connectionId, "gpt-5-mini"), false);
  assert.equal(isModelLocked("github", connectionId, "claude-haiku-4.5"), false);
});

test("recordModelLockoutFailure uses provider profile cooldowns, backoff, and reset window", () => {
  const originalNow = Date.now;
  let now = 1_700_000_000_000;
  Date.now = () => now;

  try {
    const compatibleProvider = "openai-compatible-custom-node";
    const compatibleModel = "custom-model-a";
    const profile = makeProfile({
      maxBackoffSteps: 2,
      maxBackoffLevel: 2,
      resetTimeoutMs: 500,
    });

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
  assert.equal(isProviderFailureCode(429), true);
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

    const threshold = PROVIDER_PROFILES.apikey.circuitBreakerThreshold;

    // Record failures up to threshold - 1
    for (let i = 0; i < threshold - 1; i++) {
      recordProviderFailure(provider);
      now += 1000; // 1 second between failures
    }
    assert.equal(isProviderInCooldown(provider), false);

    // Final failure to trigger threshold
    recordProviderFailure(provider);
    assert.equal(isProviderInCooldown(provider), true);

    const remaining = getProviderCooldownRemainingMs(provider);
    assert.ok(remaining !== null);
    assert.ok(remaining > 0);
    assert.ok(remaining <= 10 * 60 * 1000); // 10 minutes max

    // Check getProvidersInCooldown returns the provider
    const inCooldown = getProvidersInCooldown();
    assert.ok(inCooldown.some((p) => p.provider === provider));
    assert.equal(inCooldown.find((p) => p.provider === provider)?.failureCount, threshold);

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

test("recordProviderFailure honors runtime provider breaker profile", () => {
  const provider = "test-provider-runtime-profile";
  clearProviderFailure(provider);

  try {
    const runtimeProfile = {
      failureThreshold: PROVIDER_PROFILES.apikey.circuitBreakerThreshold + 7,
      resetTimeoutMs: PROVIDER_PROFILES.apikey.circuitBreakerReset + 45_000,
    };

    recordProviderFailure(provider, undefined, "conn-runtime-profile", runtimeProfile);

    const breaker = getCircuitBreaker(provider);
    assert.equal(breaker.failureThreshold, runtimeProfile.failureThreshold);
    assert.equal(breaker.resetTimeout, runtimeProfile.resetTimeoutMs);
    assert.equal(isProviderInCooldown(provider), false);

    const breakerAfterStatusCheck = getCircuitBreaker(provider);
    assert.equal(breakerAfterStatusCheck.failureThreshold, runtimeProfile.failureThreshold);
    assert.equal(breakerAfterStatusCheck.resetTimeout, runtimeProfile.resetTimeoutMs);
  } finally {
    clearProviderFailure(provider);
  }
});

test("recordProviderFailure preserves provider breaker cooldown while open", () => {
  const originalNow = Date.now;
  let now = 1_700_000_000_000;
  Date.now = () => now;

  try {
    const provider = "test-provider-open-cooldown-stability";
    const profile = { failureThreshold: 1, resetTimeoutMs: 60_000 };
    clearProviderFailure(provider);

    recordProviderFailure(provider, undefined, "conn-open-cooldown", profile);
    assert.equal(isProviderInCooldown(provider), true);

    const openedAt = getProviderBreakerState(provider)?.lastFailureTime;
    const initialRemaining = getProviderCooldownRemainingMs(provider);
    assert.equal(openedAt, now);
    assert.equal(initialRemaining, 60_000);

    now += 10_000;
    recordProviderFailure(provider, undefined, "conn-open-cooldown-later", profile);

    assert.equal(getProviderBreakerState(provider)?.lastFailureTime, openedAt);
    assert.equal(getProviderCooldownRemainingMs(provider), 50_000);
  } finally {
    Date.now = originalNow;
    clearProviderFailure("test-provider-open-cooldown-stability");
  }
});

test("recordProviderFailure keeps recent connection dedupe entries when pruning", () => {
  const originalNow = Date.now;
  const now = 1_700_000_000_000;
  Date.now = () => now;

  try {
    const provider = "test-provider-dedupe-prune";
    const profile = { failureThreshold: 20_000, resetTimeoutMs: 60_000 };
    clearProviderFailure(provider);

    for (let i = 0; i <= 10_000; i++) {
      recordProviderFailure(provider, undefined, `conn-${i}`, profile);
    }

    const beforeDuplicate = getProviderBreakerState(provider)?.failureCount;
    recordProviderFailure(provider, undefined, "conn-10000", profile);
    const afterDuplicate = getProviderBreakerState(provider)?.failureCount;

    assert.equal(afterDuplicate, beforeDuplicate);
    assert.equal(isProviderInCooldown(provider), false);
  } finally {
    Date.now = originalNow;
    clearProviderFailure("test-provider-dedupe-prune");
  }
});

test("recordProviderFailure refreshes insertion order for existing dedupe keys", () => {
  const originalNow = Date.now;
  let now = 1_700_000_000_000;
  Date.now = () => now;

  try {
    const provider = "test-provider-dedupe-lru";
    const profile = { failureThreshold: 20_000, resetTimeoutMs: 60_000 };
    clearProviderFailure(provider);

    for (let i = 0; i < 9_999; i++) {
      recordProviderFailure(provider, undefined, `conn-${i}`, profile);
    }

    now += 10_000;
    recordProviderFailure(provider, undefined, "conn-0", profile);

    for (let i = 10_000; i < 10_050; i++) {
      recordProviderFailure(provider, undefined, `conn-${i}`, profile);
    }

    const breakerState = getProviderBreakerState(provider);
    assert.equal(breakerState?.failureCount !== undefined, true);
    assert.equal(isProviderInCooldown(provider), false);
  } finally {
    Date.now = originalNow;
    clearProviderFailure("test-provider-dedupe-lru");
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
    const threshold = PROVIDER_PROFILES.apikey.circuitBreakerThreshold;
    for (let i = 0; i < threshold; i++) {
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

test("checkFallbackError locks model until tomorrow for non-429 daily quota exhaustion", () => {
  const result = checkFallbackError(
    402,
    "You have exceeded today's quota for model moonshotai/Kimi-K2.5, please try again tomorrow"
  );
  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(result.dailyQuotaExhausted, true);
  assert.ok(result.cooldownMs > 0, "cooldown should be positive");
  assert.ok(result.cooldownMs <= 24 * 60 * 60 * 1000, "cooldown should be <= 24 hours");
});

test("checkFallbackError routes API-key 429 'try again tomorrow' through resilience cooldown", () => {
  const result = checkFallbackError(
    429,
    "Please try again tomorrow",
    0,
    null,
    "openai",
    null,
    makeProfile()
  );
  assert.equal(result.shouldFallback, true);
  assert.equal(result.dailyQuotaExhausted, undefined);
  assert.equal(result.cooldownMs, 125);
});

test("checkFallbackError routes API-key 429 'daily quota' text through resilience cooldown", () => {
  const result = checkFallbackError(
    429,
    "You have exceeded your daily quota",
    0,
    null,
    "openai",
    null,
    makeProfile()
  );
  assert.equal(result.shouldFallback, true);
  assert.equal(result.dailyQuotaExhausted, undefined);
  assert.equal(result.cooldownMs, 125);
});

test("checkFallbackError preserves OAuth 429 daily quota semantics", () => {
  const result = checkFallbackError(
    429,
    "You have exceeded your daily quota",
    0,
    null,
    "codex",
    null,
    makeProfile()
  );

  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(result.dailyQuotaExhausted, true);
  assert.ok(result.cooldownMs > 0);
});

// ModelScope daily quota lockout tests (commit 0456a1f5)
test("recordModelLockoutFailure sets cooldown until tomorrow 0:00 for quota_exhausted reason", () => {
  const originalNow = Date.now;
  // Use a fixed local time (noon) to ensure predictable results
  const testDate = new Date();
  testDate.setHours(12, 0, 0, 0); // Set to noon today
  const now = testDate.getTime();
  Date.now = () => now;

  try {
    const provider = "modelscope";
    const connectionId = "test-conn-modelscope-1";
    const model = "qwen/Qwen2.5-Coder-32B-Instruct";

    // Clear any existing state
    clearModelLock(provider, connectionId, model);

    const profile = makeProfile();

    // Calculate milliseconds until tomorrow 00:00 local time
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const expectedMsUntilTomorrow = tomorrow.getTime() - now;

    // Account for timezone offset: function uses local time, test env may use UTC
    const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

    // Record failure with quota_exhausted reason
    const result = recordModelLockoutFailure(
      provider,
      connectionId,
      model,
      "quota_exhausted",
      429,
      0, // fallbackCooldownMs should be overridden to ms until tomorrow
      profile
    );

    // Verify the cooldown is set to ms until tomorrow 0:00 (with tolerance)
    // The cooldown should be close to expectedMsUntilTomorrow
    const tolerance = 60 * 1000; // 1 minute tolerance
    // Calculate difference between actual and expected values
    const diff = Math.abs(result.cooldownMs - expectedMsUntilTomorrow);

    // Allow ±5 minutes tolerance (300,000 ms)
    assert.ok(
      diff <= 300_000,
      `cooldown should be ms until tomorrow 0:00 (expected ${expectedMsUntilTomorrow}ms, got ${result.cooldownMs}ms, diff ${diff}ms)`
    );

    // Verify model is locked
    assert.equal(isModelLocked(provider, connectionId, model), true);

    const lockInfo = getModelLockoutInfo(provider, connectionId, model);
    assert.ok(lockInfo !== null, "lockInfo should not be null");
    assert.ok(lockInfo.remainingMs > 0, "remaining time should be positive");

    clearModelLock(provider, connectionId, model);
  } finally {
    Date.now = originalNow;
    clearModelLock("modelscope", "test-conn-modelscope-1", "qwen/Qwen2.5-Coder-32B-Instruct");
  }
});

test("recordModelLockoutFailure uses regular backoff for non-quota reasons", () => {
  const originalNow = Date.now;
  const now = 1_700_000_000_000;
  Date.now = () => now;

  try {
    const provider = "modelscope";
    const connectionId = "test-conn-modelscope-2";
    const model = "qwen/Qwen2.5-Coder-32B-Instruct";

    clearModelLock(provider, connectionId, model);

    const profile = makeProfile({
      baseCooldownMs: 5000,
      transientCooldown: 5000,
      rateLimitCooldown: 5000,
    });

    // Record failure with rate_limited reason (not quota_exhausted)
    const result = recordModelLockoutFailure(
      provider,
      connectionId,
      model,
      "rate_limited",
      429,
      0,
      profile
    );

    // Verify the cooldown uses regular profile baseCooldownMs (5000ms)
    assert.ok(
      result.cooldownMs < 24 * 60 * 60 * 1000,
      "cooldown should be less than 24h for non-quota reasons"
    );
    assert.equal(result.cooldownMs, 5000, "cooldown should use profile baseCooldownMs");

    clearModelLock(provider, connectionId, model);
  } finally {
    Date.now = originalNow;
    clearModelLock("modelscope", "test-conn-modelscope-2", "qwen/Qwen2.5-Coder-32B-Instruct");
  }
});

// Test for hour quota related error messages
test("checkFallbackError classifies hour quota errors correctly", () => {
  // For OAuth providers (e.g., codex), hour quota errors should be QUOTA_EXHAUSTED
  const result1 = checkFallbackError(
    429,
    "Coding Plan hour quota has been exceeded",
    0,
    null,
    "codex"
  );
  assert.equal(result1.shouldFallback, true);
  assert.equal(result1.reason, RateLimitReason.QUOTA_EXHAUSTED);

  const result2 = checkFallbackError(429, "hour quota exceeded", 0, null, "codex");
  assert.equal(result2.shouldFallback, true);
  assert.equal(result2.reason, RateLimitReason.QUOTA_EXHAUSTED);

  const result3 = checkFallbackError(429, "Your hour quota is exceeded", 0, null, "codex");
  assert.equal(result3.shouldFallback, true);
  assert.equal(result3.reason, RateLimitReason.QUOTA_EXHAUSTED);

  const result4 = checkFallbackError(429, "hour quota depleted", 0, null, "codex");
  assert.equal(result4.shouldFallback, true);
  assert.equal(result4.reason, RateLimitReason.QUOTA_EXHAUSTED);

  // For API-key providers with 402 status, hour quota errors should be QUOTA_EXHAUSTED
  const result5 = checkFallbackError(402, "hour quota has been exceeded", 0, null, "openai");
  assert.equal(result5.shouldFallback, true);
  assert.equal(result5.reason, RateLimitReason.QUOTA_EXHAUSTED);

  const result6 = checkFallbackError(
    403,
    "Coding Plan hour quota has been exceeded",
    0,
    null,
    "openai"
  );
  assert.equal(result6.shouldFallback, true);
  assert.equal(result6.reason, RateLimitReason.QUOTA_EXHAUSTED);
});

// Test for classifyErrorText function with hour quota
test("classifyErrorText handles hour quota messages", () => {
  const { classifyErrorText } = accountFallback;

  assert.equal(
    classifyErrorText("Coding Plan hour quota has been exceeded"),
    RateLimitReason.QUOTA_EXHAUSTED
  );
  assert.equal(classifyErrorText("hour quota exceeded"), RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(classifyErrorText("Your hour quota is exceeded"), RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(classifyErrorText("hour quota has been exceeded"), RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(classifyErrorText("quota has been exceeded"), RateLimitReason.QUOTA_EXHAUSTED);
});

// ─── Model Access Denied (structured error codes + regex fallback) ─────

test("checkFallbackError detects model access denied via structured error code (OpenAI)", () => {
  const result = checkFallbackError(
    400,
    "The model `gpt-5` does not exist",
    0,
    null,
    "openai",
    null,
    null,
    { code: "model_not_found", type: null }
  );
  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, 0);
  assert.equal(result.reason, RateLimitReason.MODEL_CAPACITY);
});

test("checkFallbackError detects model access denied via structured error type (Anthropic not_found_error)", () => {
  const result = checkFallbackError(
    400,
    "model: claude-sonnet-4-7-20260515",
    0,
    null,
    "anthropic",
    null,
    null,
    { code: null, type: "not_found_error" }
  );
  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, 0);
  assert.equal(result.reason, RateLimitReason.MODEL_CAPACITY);
});

test("checkFallbackError detects model access denied via structured error type (Anthropic permission_error) when the message confirms the model", () => {
  const result = checkFallbackError(
    400,
    "you do not have access to the requested model",
    0,
    null,
    "anthropic",
    null,
    null,
    { code: null, type: "permission_error" }
  );
  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, 0);
  assert.equal(result.reason, RateLimitReason.MODEL_CAPACITY);
});

test("checkFallbackError does NOT fallback on a permission_error that is a key/feature scope issue (not model access)", () => {
  // permission_error is ambiguous on Anthropic — also raised for API-key scope,
  // org restrictions and feature gating. Without a model-related message it must
  // surface the real error instead of silently exhausting every combo target.
  const result = checkFallbackError(
    400,
    "Your API key does not have permission to use the Message Batches API",
    0,
    null,
    "anthropic",
    null,
    null,
    { code: null, type: "permission_error" }
  );
  assert.equal(result.shouldFallback, false);
});

test("checkFallbackError detects model access denied via regex fallback (invalid model)", () => {
  const result = checkFallbackError(
    400,
    "Invalid model: gpt-5-turbo",
    0,
    null,
    "some-provider",
    null,
    null
  );
  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, 0);
  assert.equal(result.reason, RateLimitReason.MODEL_CAPACITY);
});

test("checkFallbackError does NOT fallback on generic 400 without model access denied", () => {
  const result = checkFallbackError(400, "bad request payload", 0, null, "openai", null, null);
  assert.equal(result.shouldFallback, false);
});

test("checkFallbackError ignores structured error with unrelated code on 400", () => {
  const result = checkFallbackError(400, "something went wrong", 0, null, "openai", null, null, {
    code: "invalid_api_key",
    type: null,
  });
  // "invalid_api_key" is not in MODEL_ACCESS_DENIED_CODES,
  // no MODEL_ACCESS_DENIED_PATTERNS match either → shouldFallback: false
  assert.equal(result.shouldFallback, false);
});

// ─── Gemini RPM 429 Classification (CREDITS_EXHAUSTED_SIGNALS fix) ─────

test("isCreditsExhausted returns false for Gemini RPM 429 body text", () => {
  const geminiRpmText = "Resource has been exhausted (e.g. check quota).";
  assert.equal(isCreditsExhausted(geminiRpmText), false);
});

test("isCreditsExhausted returns true for actual credits-exhausted signals", () => {
  assert.equal(isCreditsExhausted("insufficient_quota"), true);
  assert.equal(isCreditsExhausted("credits exhausted"), true);
  assert.equal(isCreditsExhausted("payment required"), true);
  assert.equal(isCreditsExhausted("free tier of the model has been exhausted"), true);
  assert.equal(isCreditsExhausted("exceeded your current usage quota"), true);
});

test("CREDITS_EXHAUSTED_SIGNALS no longer contains generic gRPC resource-exhausted patterns", () => {
  // These patterns were removed because they falsely matched Gemini RPM 429 errors
  assert.equal(CREDITS_EXHAUSTED_SIGNALS.includes("resource has been exhausted"), false);
  assert.equal(CREDITS_EXHAUSTED_SIGNALS.includes("resource_exhausted"), false);
  assert.equal(CREDITS_EXHAUSTED_SIGNALS.includes("check quota"), false);
});

test("checkFallbackError classifies Gemini RPM 429 as RATE_LIMIT_EXCEEDED (not QUOTA_EXHAUSTED)", () => {
  // provider=null → preserveQuota429=true → text quota checks run
  // isCreditsExhausted must NOT match Gemini's "Resource has been exhausted"
  const result = checkFallbackError(
    429,
    "Resource has been exhausted (e.g. check quota).",
    0,
    null,
    null,
    null,
    makeProfile()
  );
  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
  assert.equal(result.creditsExhausted, undefined);
  assert.equal(result.dailyQuotaExhausted, undefined);
  assert.ok(result.cooldownMs > 0, "cooldownMs should be positive");
});

test("checkFallbackError classifies Gemini RPM 429 as RATE_LIMIT_EXCEEDED for API-key provider", () => {
  // provider="gemini" → preserveQuota429=false → status-based rule applies
  const result = checkFallbackError(
    429,
    "Resource has been exhausted (e.g. check quota).",
    0,
    null,
    "gemini",
    null,
    makeProfile()
  );
  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
  assert.equal(result.cooldownMs, 125); // makeProfile().baseCooldownMs
});

test("checkFallbackError still classifies genuine OAuth quota-exhausted text as QUOTA_EXHAUSTED", () => {
  // Regression: OAuth providers must still get QUOTA_EXHAUSTED for actual quota messages
  const result = checkFallbackError(
    429,
    "Coding Plan hour quota has been exceeded",
    0,
    null,
    "codex",
    null,
    makeProfile()
  );
  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.QUOTA_EXHAUSTED);
});

test("checkFallbackError preserves daily-quota exhaustion for non-429 status codes", () => {
  // Non-429 status codes with daily quota text must still be QUOTA_EXHAUSTED
  const result = checkFallbackError(
    402,
    "You have exceeded today's quota, please try again tomorrow"
  );
  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(result.dailyQuotaExhausted, true);
});

// ─── Gemini 429 → Model Lockout: rate_limited (not quota_exhausted) ────

test("Gemini RPM 429: recordModelLockoutFailure uses exponential backoff for rate_limited reason", () => {
  const originalNow = Date.now;
  const now = 1_700_000_000_000;
  Date.now = () => now;
  const provider = "gemini";
  const connectionId = "test-conn-gemini-rpm";
  const model = "gemini/gemma-4-31b-it";

  try {
    clearModelLock(provider, connectionId, model);

    const profile = makeProfile({
      baseCooldownMs: 5000,
      transientCooldown: 5000,
      rateLimitCooldown: 5000,
    });

    // auth.ts flow: 429 + fallbackResult.reason=RATE_LIMIT_EXCEEDED
    // → reason="rate_limited" → recordModelLockoutFailure
    const first = recordModelLockoutFailure(
      provider,
      connectionId,
      model,
      "rate_limited",
      429,
      0,
      profile
    );
    assert.equal(first.failureCount, 1);
    assert.equal(first.cooldownMs, 5000, "first failure: 5s base cooldown");

    const second = recordModelLockoutFailure(
      provider,
      connectionId,
      model,
      "rate_limited",
      429,
      0,
      profile
    );
    assert.equal(second.failureCount, 2);
    assert.equal(second.cooldownMs, 10000, "second failure: 10s exponential backoff");

    assert.equal(isModelLocked(provider, connectionId, model), true);
    clearModelLock(provider, connectionId, model);
  } finally {
    Date.now = originalNow;
    clearModelLock("gemini", "test-conn-gemini-rpm", "gemini/gemma-4-31b-it");
  }
});

test("Gemini RPD (quota_exhausted) still triggers midnight lockout in recordModelLockoutFailure", () => {
  // Regression: real daily quota exhaustion must still produce midnight reset
  const originalNow = Date.now;
  const testDate = new Date();
  testDate.setHours(12, 0, 0, 0);
  const now = testDate.getTime();
  Date.now = () => now;
  const provider = "gemini";
  const connectionId = "test-conn-gemini-rpd";
  const model = "gemini/gemma-4-31b-it";

  try {
    clearModelLock(provider, connectionId, model);
    const profile = makeProfile();
    const result = recordModelLockoutFailure(
      provider,
      connectionId,
      model,
      "quota_exhausted",
      429,
      0,
      profile
    );

    // Must lock until midnight, NOT exponential backoff
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const expected = tomorrow.getTime() - now;
    assert.ok(
      Math.abs(result.cooldownMs - expected) <= 300_000,
      `cooldown should be until tomorrow (expected ~${expected}, got ${result.cooldownMs})`
    );
    clearModelLock(provider, connectionId, model);
  } finally {
    Date.now = originalNow;
    clearModelLock("gemini", "test-conn-gemini-rpd", "gemini/gemma-4-31b-it");
  }
});

// ─── G-02: X-Omni-Fallback-Hint: connection_cooldown ─────────────────────────
// When 9router executor signals a supervisor-not-running 503, checkFallbackError
// must return 5s cooldown with skipProviderBreaker:true — not trip the circuit breaker.

test("G-02: X-Omni-Fallback-Hint connection_cooldown on 503 returns 5s cooldown + skipProviderBreaker", () => {
  const headers = new Headers({ "X-Omni-Fallback-Hint": "connection_cooldown" });
  const result = checkFallbackError(
    503,
    "9router is not running (state: stopped)",
    0,
    null,
    "9router",
    headers
  );
  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, 5_000);
  assert.equal(result.skipProviderBreaker, true);
  assert.equal(result.newBackoffLevel, 0);
  assert.equal(result.reason, "service_not_running");
});

test("G-02: X-Omni-Fallback-Hint connection_cooldown header lookup is case-insensitive (lowercase header key)", () => {
  // Headers object normalises keys to lowercase — test the plain-object path
  const headers: Record<string, string> = { "x-omni-fallback-hint": "connection_cooldown" };
  const result = checkFallbackError(
    503,
    "9router is not running (state: stopped)",
    0,
    null,
    "9router",
    headers
  );
  assert.equal(result.skipProviderBreaker, true);
  assert.equal(result.cooldownMs, 5_000);
});

test("G-02: hint header is ignored for non-503 status codes", () => {
  const headers = new Headers({ "X-Omni-Fallback-Hint": "connection_cooldown" });
  // 502 should NOT trigger the hint path even if the header is present
  const result = checkFallbackError(502, "bad gateway", 0, null, "9router", headers);
  assert.equal(result.skipProviderBreaker, undefined); // normal path, no skip flag
});

test("G-02: 503 without hint header follows normal circuit-breaker path", () => {
  // A plain 503 from a real upstream must still feed the circuit breaker
  const result = checkFallbackError(503, "service unavailable", 0, null, "openai", null);
  assert.equal(result.skipProviderBreaker, undefined);
  assert.ok(result.cooldownMs > 0);
});

test("G-02: five consecutive 503 service_not_running do NOT trip provider circuit breaker (flag)", () => {
  // Verify that every call returns skipProviderBreaker:true so callers can skip recordProviderFailure
  const headers = new Headers({ "X-Omni-Fallback-Hint": "connection_cooldown" });
  for (let i = 0; i < 5; i++) {
    const result = checkFallbackError(
      503,
      "9router is not running (state: stopped)",
      0,
      null,
      "9router",
      headers
    );
    assert.equal(
      result.skipProviderBreaker,
      true,
      `call ${i + 1} should have skipProviderBreaker:true`
    );
  }
  // Verify the circuit breaker for 9router is NOT open after those 5 calls
  const { isProviderInCooldown, clearProviderFailure } = accountFallback;
  assert.equal(
    isProviderInCooldown("9router"),
    false,
    "9router circuit breaker must remain closed"
  );
  clearProviderFailure("9router"); // cleanup
});

test("recordModelLockoutFailure caps cooldown at BACKOFF_CONFIG.max to prevent absurdly long lockouts", () => {
  const originalNow = Date.now;
  let now = 1_700_000_000_000;
  Date.now = () => now;

  try {
    const provider = "openai";
    const connectionId = "conn-capped";
    const model = "gpt-5-trillium";

    clearModelLock(provider, connectionId, model);

    // Fire 9 consecutive failures so the backoff exceeds the 120s cap
    // baseCooldownMs=1000 (getQuotaCooldown(0)), failure 9: 1000*2^8=256000 > 120000
    let lastResult;
    for (let i = 0; i < 9; i++) {
      lastResult = recordModelLockoutFailure(
        provider,
        connectionId,
        model,
        "rate_limited",
        429,
        0,
        null
      );
      now += 50; // each failure within the reset window
    }

    assert.ok(
      lastResult.cooldownMs <= 120_000,
      `cooldown ${lastResult.cooldownMs}ms should not exceed BACKOFF_CONFIG.max (120000ms)`
    );
    assert.equal(lastResult.cooldownMs, 120_000);
    assert.equal(lastResult.failureCount, 9);

    clearModelLock(provider, connectionId, model);
  } finally {
    Date.now = originalNow;
  }
});

test("recordModelLockoutFailure groups provider aliases under canonical provider", () => {
  const providerAlias = "cx";
  const providerCanonical = "codex";
  const connectionId = "conn-alias-test";
  const model = "gpt-5.5";

  clearModelLock(providerCanonical, connectionId, model);
  clearModelLock(providerAlias, connectionId, model);

  const result1 = recordModelLockoutFailure(
    providerAlias,
    connectionId,
    model,
    "rate_limited",
    429,
    1000,
    null
  );

  assert.equal(isModelLocked(providerAlias, connectionId, model), true);
  assert.equal(isModelLocked(providerCanonical, connectionId, model), true);

  clearModelLock(providerCanonical, connectionId, model);
});

test("recordModelLockoutFailure escalates backoff correctly after cooldown expiration (long interval)", () => {
  const originalNow = Date.now;
  let now = 1_700_000_000_000;
  Date.now = () => now;

  try {
    const provider = "openai";
    const connectionId = "conn-long-interval";
    const model = "gpt-5-escalate";

    clearModelLock(provider, connectionId, model);

    const profile = makeProfile({
      baseCooldownMs: 120000,
      resetTimeoutMs: 30000,
    });

    const first = recordModelLockoutFailure(
      provider,
      connectionId,
      model,
      "rate_limited",
      429,
      120000,
      profile,
      { maxCooldownMs: 1800000 }
    );
    assert.equal(first.failureCount, 1);
    assert.equal(first.cooldownMs, 120000);

    now += 130000;

    const second = recordModelLockoutFailure(
      provider,
      connectionId,
      model,
      "rate_limited",
      429,
      120000,
      profile,
      { maxCooldownMs: 1800000 }
    );
    assert.equal(second.failureCount, 2);
    assert.equal(second.cooldownMs, 240000);

    clearModelLock(provider, connectionId, model);
  } finally {
    Date.now = originalNow;
  }
});
// ── Custom banned signals (PR #3454) ──────────────────────────────────────────
// Operators can extend ACCOUNT_DEACTIVATED_SIGNALS with provider-specific
// permanent-ban phrasing via Settings → Security. These persist in the
// key_value settings store and are applied at boot + on hot-reload through
// setCustomBannedSignals(). Regression guard for the merge/detection behavior.

const {
  setCustomBannedSignals,
  getMergedBannedSignals,
  isAccountDeactivated,
  ACCOUNT_DEACTIVATED_SIGNALS,
} = accountFallback;

test("getMergedBannedSignals returns built-in list unchanged when no custom signals", () => {
  setCustomBannedSignals([]);
  const merged = getMergedBannedSignals();
  assert.deepEqual(merged, ACCOUNT_DEACTIVATED_SIGNALS);
});

test("getMergedBannedSignals appends custom signals to the built-in list", () => {
  setCustomBannedSignals(["api key revoked", "tenant suspended"]);
  const merged = getMergedBannedSignals();
  // Built-ins still present
  for (const sig of ACCOUNT_DEACTIVATED_SIGNALS) {
    assert.ok(merged.includes(sig), `built-in signal "${sig}" must survive merge`);
  }
  // Custom appended
  assert.ok(merged.includes("api key revoked"));
  assert.ok(merged.includes("tenant suspended"));
  setCustomBannedSignals([]); // cleanup
});

test("isAccountDeactivated still matches built-in signals when custom list is empty", () => {
  setCustomBannedSignals([]);
  assert.equal(isAccountDeactivated("Your account has been suspended"), true);
  assert.equal(isAccountDeactivated("rate limit exceeded, retry later"), false);
});

test("isAccountDeactivated matches a custom signal after setCustomBannedSignals", () => {
  setCustomBannedSignals([]);
  // Before registration the custom phrase is not a ban signal
  assert.equal(
    isAccountDeactivated("Error: API key revoked by administrator"),
    false,
    "custom phrase must not match before it is registered"
  );

  setCustomBannedSignals(["api key revoked"]);
  // Case-insensitive substring match against the merged list
  assert.equal(
    isAccountDeactivated("Error: API key revoked by administrator"),
    true,
    "custom phrase must match once registered (case-insensitive substring)"
  );

  // Built-ins remain matchable alongside custom signals
  assert.equal(isAccountDeactivated("account_deactivated"), true);

  setCustomBannedSignals([]); // cleanup — restore module state for other tests
});
