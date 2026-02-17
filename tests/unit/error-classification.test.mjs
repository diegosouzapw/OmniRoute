import test from "node:test";
import assert from "node:assert/strict";

const { checkFallbackError, getProviderProfile } =
  await import("../../open-sse/services/accountFallback.ts");

const { getProviderCategory } = await import("../../open-sse/config/providerRegistry.ts");

const { COOLDOWN_MS, PROVIDER_PROFILES, RateLimitReason } =
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
  assert.deepEqual(profile, PROVIDER_PROFILES.oauth);
});

test("getProviderProfile: API provider returns apikey profile", () => {
  const profile = getProviderProfile("groq");
  assert.deepEqual(profile, PROVIDER_PROFILES.apikey);
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

test("502 transient: exponential backoff 5s → 10s → 20s → 40s → 60s (capped)", () => {
  const cooldowns = [];
  for (let level = 0; level < 6; level++) {
    const result = checkFallbackError(502, "", level, null, null);
    cooldowns.push(result.cooldownMs);
    assert.equal(result.shouldFallback, true);
    assert.equal(result.newBackoffLevel, level + 1);
    assert.equal(result.reason, RateLimitReason.SERVER_ERROR);
  }
  // Without provider: uses COOLDOWN_MS.transientInitial (5s) as base
  assert.equal(cooldowns[0], COOLDOWN_MS.transientInitial); // 5s
  assert.equal(cooldowns[1], COOLDOWN_MS.transientInitial * 2); // 10s
  assert.equal(cooldowns[2], COOLDOWN_MS.transientInitial * 4); // 20s
  assert.equal(cooldowns[3], COOLDOWN_MS.transientInitial * 8); // 40s
  // Level 4: 5s * 16 = 80s → capped at 60s
  assert.equal(cooldowns[4], COOLDOWN_MS.transientMax); // 60s
  assert.equal(cooldowns[5], COOLDOWN_MS.transientMax); // 60s (stays capped)
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

test("401 auth error: still uses flat cooldown, no backoff", () => {
  const result = checkFallbackError(401, "", 0, null, "groq");
  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, COOLDOWN_MS.unauthorized);
  assert.equal(result.newBackoffLevel, undefined);
});

test("400 bad request: still returns shouldFallback false", () => {
  const result = checkFallbackError(400, "", 0, null, "groq");
  assert.equal(result.shouldFallback, false);
});
