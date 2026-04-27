import test from "node:test";
import assert from "node:assert/strict";

const { checkFallbackError, getProviderProfile, parseRetryFromErrorText } =
  await import("../../open-sse/services/accountFallback.ts");

const { getProviderCategory } = await import("../../open-sse/config/providerRegistry.ts");

const { BACKOFF_CONFIG, COOLDOWN_MS, PROVIDER_PROFILES, RateLimitReason } =
  await import("../../open-sse/config/constants.ts");

// ─── Provider Category Tests ────────────────────────────────────────────────

test("getProviderCategory: OAuth providers return 'oauth'", () => {
  assert.equal(getProviderCategory("claude"), "oauth");
  assert.equal(getProviderCategory("codex"), "oauth");
  assert.equal(getProviderCategory("github"), "oauth");
  assert.equal(getProviderCategory("antigravity"), "oauth");
  assert.equal(getProviderCategory("cursor"), "oauth");
  assert.equal(getProviderCategory("kiro"), "oauth");
  assert.equal(getProviderCategory("gemini-cli"), "oauth");
  assert.equal(getProviderCategory("cline"), "oauth");
});

test("getProviderCategory: API key providers return 'apikey'", () => {
  assert.equal(getProviderCategory("groq"), "apikey");
  assert.equal(getProviderCategory("fireworks"), "apikey");
  assert.equal(getProviderCategory("cerebras"), "apikey");
  assert.equal(getProviderCategory("nvidia"), "apikey");
  assert.equal(getProviderCategory("openai"), "apikey");
  assert.equal(getProviderCategory("anthropic"), "apikey");
  assert.equal(getProviderCategory("deepseek"), "apikey");
  assert.equal(getProviderCategory("gemini"), "apikey");
});

test("getProviderCategory: unknown provider defaults to 'apikey'", () => {
  assert.equal(getProviderCategory("nonexistent"), "apikey");
});

// ─── Provider Profile Tests ─────────────────────────────────────────────────

test("getProviderProfile: OAuth provider returns oauth profile", () => {
  const profile = getProviderProfile("claude");
  assert.equal(profile.baseCooldownMs, PROVIDER_PROFILES.oauth.transientCooldown);
  assert.equal(profile.useUpstreamRetryHints, false);
  assert.equal(profile.maxBackoffSteps, PROVIDER_PROFILES.oauth.maxBackoffLevel);
  assert.equal(profile.failureThreshold, PROVIDER_PROFILES.oauth.circuitBreakerThreshold);
  assert.equal(profile.resetTimeoutMs, PROVIDER_PROFILES.oauth.circuitBreakerReset);
  assert.equal(profile.transientCooldown, PROVIDER_PROFILES.oauth.transientCooldown);
  assert.equal(
    profile.rateLimitCooldown,
    profile.useUpstreamRetryHints ? 0 : profile.baseCooldownMs
  );
  assert.equal(profile.maxBackoffLevel, PROVIDER_PROFILES.oauth.maxBackoffLevel);
  assert.equal(profile.circuitBreakerThreshold, PROVIDER_PROFILES.oauth.circuitBreakerThreshold);
  assert.equal(profile.circuitBreakerReset, PROVIDER_PROFILES.oauth.circuitBreakerReset);
});

test("getProviderProfile: API provider returns apikey profile", () => {
  const profile = getProviderProfile("groq");
  assert.equal(profile.baseCooldownMs, PROVIDER_PROFILES.apikey.transientCooldown);
  assert.equal(profile.useUpstreamRetryHints, true);
  assert.equal(profile.maxBackoffSteps, PROVIDER_PROFILES.apikey.maxBackoffLevel);
  assert.equal(profile.failureThreshold, PROVIDER_PROFILES.apikey.circuitBreakerThreshold);
  assert.equal(profile.resetTimeoutMs, PROVIDER_PROFILES.apikey.circuitBreakerReset);
  assert.equal(profile.transientCooldown, PROVIDER_PROFILES.apikey.transientCooldown);
  assert.equal(
    profile.rateLimitCooldown,
    profile.useUpstreamRetryHints ? 0 : profile.baseCooldownMs
  );
  assert.equal(profile.maxBackoffLevel, PROVIDER_PROFILES.apikey.maxBackoffLevel);
  assert.equal(profile.circuitBreakerThreshold, PROVIDER_PROFILES.apikey.circuitBreakerThreshold);
  assert.equal(profile.circuitBreakerReset, PROVIDER_PROFILES.apikey.circuitBreakerReset);
});

test("getProviderProfile: profiles have different thresholds", () => {
  const oauth = getProviderProfile("claude");
  const api = getProviderProfile("groq");
  assert.ok(
    oauth.circuitBreakerThreshold < api.circuitBreakerThreshold,
    "OAuth should have lower threshold than API"
  );
  assert.ok(
    oauth.maxBackoffLevel > api.maxBackoffLevel,
    "OAuth should have higher max backoff level"
  );
});

// ─── Exponential Backoff for Transient Errors ───────────────────────────────

test("502 transient: exponential backoff doubles until the configured max backoff step", () => {
  const cooldowns = [];
  for (let level = 0; level < 6; level++) {
    const result = checkFallbackError(502, "", level, null, null);
    cooldowns.push(result.cooldownMs);
    assert.equal(result.shouldFallback, true);
    assert.equal(result.newBackoffLevel, level + 1);
    assert.equal(result.reason, RateLimitReason.SERVER_ERROR);
  }
  assert.deepEqual(cooldowns, [
    COOLDOWN_MS.transientInitial,
    COOLDOWN_MS.transientInitial * 2,
    COOLDOWN_MS.transientInitial * 4,
    COOLDOWN_MS.transientInitial * 8,
    COOLDOWN_MS.transientInitial * 16,
    COOLDOWN_MS.transientInitial * 32,
  ]);
});

test("502 with OAuth provider: uses oauth profile transientCooldown", () => {
  const result = checkFallbackError(502, "", 0, null, "claude");
  assert.equal(result.cooldownMs, PROVIDER_PROFILES.oauth.transientCooldown); // 5s
  assert.equal(result.newBackoffLevel, 1);
});

test("502 with API provider: uses apikey profile transientCooldown", () => {
  const result = checkFallbackError(502, "", 0, null, "groq");
  assert.equal(result.cooldownMs, PROVIDER_PROFILES.apikey.transientCooldown); // 3s
  assert.equal(result.newBackoffLevel, 1);
});

test("502 with API provider: backoff respects apikey maxBackoffLevel", () => {
  const maxLevel = PROVIDER_PROFILES.apikey.maxBackoffLevel;
  const result = checkFallbackError(502, "", maxLevel, null, "groq");
  assert.equal(result.newBackoffLevel, maxLevel); // Capped
});

test("502 with OAuth provider: backoff respects oauth maxBackoffLevel", () => {
  const maxLevel = PROVIDER_PROFILES.oauth.maxBackoffLevel;
  const result = checkFallbackError(502, "", maxLevel, null, "claude");
  assert.equal(result.newBackoffLevel, maxLevel); // Capped
});

// ─── Other Error Types Still Work ───────────────────────────────────────────

test("429 rate limit: still uses quota-based exponential backoff", () => {
  const result = checkFallbackError(429, "", 0, null, "groq");
  assert.equal(result.shouldFallback, true);
  assert.equal(result.newBackoffLevel, 1);
  assert.equal(result.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
});

test("401 auth error: returns terminal auth semantics without connection cooldown", () => {
  const result = checkFallbackError(401, "", 0, null, "groq");
  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, 0);
  assert.equal(result.baseCooldownMs, 0);
  assert.equal(result.newBackoffLevel, undefined);
  assert.equal(result.reason, RateLimitReason.AUTH_ERROR);
});

test("400 bad request: still returns shouldFallback false", () => {
  const result = checkFallbackError(400, "", 0, null, "groq");
  assert.equal(result.shouldFallback, false);
});

// ─── T07: Retry Time Parsing from Error Text ─────────────────────────────────

test("parseRetryFromErrorText: parses 27h41m36s format", () => {
  const result = parseRetryFromErrorText("Your quota will reset after 27h41m36s");
  assert.equal(result, 27 * 3600 * 1000 + 41 * 60 * 1000 + 36 * 1000);
});

test("parseRetryFromErrorText: parses 2h30m format", () => {
  const result = parseRetryFromErrorText("quota will reset after 2h30m");
  assert.equal(result, 2 * 3600 * 1000 + 30 * 60 * 1000);
});

test("parseRetryFromErrorText: parses 45m format", () => {
  const result = parseRetryFromErrorText("reset after 45m");
  assert.equal(result, 45 * 60 * 1000);
});

test("parseRetryFromErrorText: parses 30s format", () => {
  const result = parseRetryFromErrorText("reset after 30s");
  assert.equal(result, 30 * 1000);
});

test("parseRetryFromErrorText: returns null for invalid format", () => {
  const result = parseRetryFromErrorText("invalid error message");
  assert.equal(result, null);
});

test("parseRetryFromErrorText: parses will reset after variant", () => {
  const result = parseRetryFromErrorText("quota will reset after 5h");
  assert.equal(result, 5 * 3600 * 1000);
});

// ─── T06: Keyword Matching for Long Cooldowns ────────────────────────────────

test("quota reset text is ignored when upstream retry hints are disabled", () => {
  const result = checkFallbackError(
    429,
    "Your quota will reset after 27h41m36s",
    0,
    null,
    "antigravity",
    null
  );
  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, PROVIDER_PROFILES.oauth.transientCooldown);
  assert.equal(result.newBackoffLevel, 1);
  assert.equal(result.usedUpstreamRetryHint, false);
});

test("quota reset text is honored when upstream retry hints are enabled", () => {
  const result = checkFallbackError(
    429,
    "You have exhausted your capacity. Your quota will reset after 2h",
    0,
    null,
    "groq",
    null
  );
  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, 2 * 60 * 60 * 1000);
  assert.equal(result.newBackoffLevel, 0);
  assert.equal(result.usedUpstreamRetryHint, true);
});

test("high transient backoff levels clamp to the configured maxBackoffSteps", () => {
  const result = checkFallbackError(502, "", BACKOFF_CONFIG.maxLevel + 5, null, null);
  assert.equal(result.newBackoffLevel, BACKOFF_CONFIG.maxLevel);
  assert.equal(
    result.cooldownMs,
    COOLDOWN_MS.transientInitial * Math.pow(2, BACKOFF_CONFIG.maxLevel)
  );
});
