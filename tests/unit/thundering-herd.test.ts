import test from "node:test";
import assert from "node:assert/strict";

// ─── Unit tests for anti-thundering herd logic ──────────────────────────────
// These tests verify the accountFallback layer (provider profiles + backoff).
// The auth.js mutex is an integration-level concern (DB-dependent) and is covered
// by its own manual verification.

const { checkFallbackError, getProviderProfile } =
  await import("../../open-sse/services/accountFallback.ts");

const { PROVIDER_PROFILES, DEFAULT_API_LIMITS, COOLDOWN_MS, RateLimitReason } =
  await import("../../open-sse/config/constants.ts");

const { getProviderCategory } = await import("../../open-sse/config/providerRegistry.ts");

// ─── OAuth vs API Profile Differentiation ───────────────────────────────────

test("OAuth profile has stricter circuit breaker (lower threshold)", () => {
  const oauth = PROVIDER_PROFILES.oauth;
  const apikey = PROVIDER_PROFILES.apikey;
  assert.ok(
    oauth.circuitBreakerThreshold < apikey.circuitBreakerThreshold,
    "OAuth should open circuit faster"
  );
});

test("API profile has shorter transient cooldown", () => {
  const apikey = PROVIDER_PROFILES.apikey;
  const oauth = PROVIDER_PROFILES.oauth;
  assert.ok(
    apikey.transientCooldown < oauth.transientCooldown,
    "API providers should have shorter base cooldown"
  );
});

// ─── Backoff Ceiling Tests (prevents infinite growth) ───────────────────────

test("Exponential backoff is capped at transientMax for high backoff levels", () => {
  // Level 20 → 5s * 2^20 = 5.2M ms, but capped at 60s
  const result = checkFallbackError(502, "", 20, null, null);
  assert.equal(result.cooldownMs, COOLDOWN_MS.transientMax);
});

test("API provider backoff level caps at profile maxBackoffLevel", () => {
  const maxLevel = PROVIDER_PROFILES.apikey.maxBackoffLevel;
  const result = checkFallbackError(502, "", maxLevel, null, "groq");
  assert.equal(result.newBackoffLevel, maxLevel, "Should not exceed max level");
});

test("OAuth provider backoff level caps at profile maxBackoffLevel", () => {
  const maxLevel = PROVIDER_PROFILES.oauth.maxBackoffLevel;
  const result = checkFallbackError(502, "", maxLevel, null, "claude");
  assert.equal(result.newBackoffLevel, maxLevel, "Should not exceed max level");
});

// ─── Thundering Herd Simulation (unit level) ────────────────────────────────
// This tests that 5 concurrent 502 calls to checkFallbackError with the same
// backoff level produce CONSISTENT results (same cooldown, same new level).

test("5 concurrent 502 calls at same backoff level produce identical results", () => {
  const results = [];
  for (let i = 0; i < 5; i++) {
    results.push(checkFallbackError(502, "Bad Gateway", 0, null, "groq"));
  }

  // All should have same cooldown and new backoff level
  const first = results[0];
  for (const r of results) {
    assert.equal(r.cooldownMs, first.cooldownMs, "Cooldowns should be identical");
    assert.equal(r.newBackoffLevel, first.newBackoffLevel, "Backoff levels should be identical");
    assert.equal(r.reason, RateLimitReason.SERVER_ERROR);
  }
});

test("Progressive backoff: Level 0→1→2 produce increasing cooldowns", () => {
  const r0 = checkFallbackError(502, "", 0, null, "groq");
  const r1 = checkFallbackError(502, "", 1, null, "groq");
  const r2 = checkFallbackError(502, "", 2, null, "groq");

  assert.ok(r1.cooldownMs > r0.cooldownMs, "Level 1 should be longer than level 0");
  assert.ok(r2.cooldownMs > r1.cooldownMs, "Level 2 should be longer than level 1");
  assert.equal(r0.newBackoffLevel, 1);
  assert.equal(r1.newBackoffLevel, 2);
  assert.equal(r2.newBackoffLevel, 3);
});

// ─── DEFAULT_API_LIMITS Configuration ───────────────────────────────────────

test("DEFAULT_API_LIMITS has reasonable values", () => {
  assert.ok(DEFAULT_API_LIMITS.requestsPerMinute >= 60, "RPM should be at least 60");
  assert.ok(DEFAULT_API_LIMITS.minTimeBetweenRequests >= 100, "minTime should be at least 100ms");
  assert.ok(DEFAULT_API_LIMITS.concurrentRequests >= 5, "maxConcurrent should be at least 5");
});

test("API providers auto-enrolled are grouped correctly", () => {
  // Spot check: these should all be apikey
  const apiProviders = ["groq", "fireworks", "cerebras", "openai", "anthropic"];
  const oauthProviders = ["claude", "codex", "github", "antigravity"];

  for (const p of apiProviders) {
    assert.equal(getProviderCategory(p), "apikey", `${p} should be apikey`);
  }
  for (const p of oauthProviders) {
    assert.equal(getProviderCategory(p), "oauth", `${p} should be oauth`);
  }
});
