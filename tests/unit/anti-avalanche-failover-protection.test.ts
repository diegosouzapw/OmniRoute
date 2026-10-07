import test from "node:test";
import assert from "node:assert/strict";
import {
  evaluateAvalancheRisk,
  formatAntiAvalancheMessage,
  resolveAvalancheSettings,
  DEFAULT_AVALANCHE_BURST_COOLDOWN_MS,
} from "../../open-sse/services/accountFallback/antiAvalanche.ts";

test("Anti-Avalanche: small payload without explicit token metric does not suppress fallback", () => {
  const result = evaluateAvalancheRisk({
    status: 429,
    errorText: "Rate limit exceeded. Please try again later.",
    provider: "gemini",
    model: "gemini-3.8-flash",
    promptTokens: 1200,
    fallbackAttemptCount: 0,
  });

  assert.equal(result.isAvalancheRisk, false);
  assert.equal(result.shouldSuppressFallback, false);
  assert.equal(result.suggestedCooldownMs, 0);
});

test("Anti-Avalanche: explicit Gemini TPM metric in error text triggers immediate suppression (0 retries)", () => {
  const tpmError =
    "Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_input_token_count, limit: 16000";
  const result = evaluateAvalancheRisk({
    status: 429,
    errorText: tpmError,
    provider: "gemini",
    model: "gemini-3.8-flash",
    promptTokens: 25000,
    fallbackAttemptCount: 0,
  });

  assert.equal(result.isAvalancheRisk, true);
  assert.equal(result.reason, "explicit_tpm_limit");
  assert.equal(result.shouldSuppressFallback, true);
  assert.equal(result.suggestedCooldownMs, DEFAULT_AVALANCHE_BURST_COOLDOWN_MS);
  assert.match(result.explanation || "", /Token rate limit/);
});

test("Anti-Avalanche: OpenAI-style tokens per minute 429 triggers immediate suppression", () => {
  const openaiTpmError =
    "Rate limit reached for model gpt-4o on tokens per minute (TPM): Limit 30000, Requested 45000.";
  const result = evaluateAvalancheRisk({
    status: 429,
    errorText: openaiTpmError,
    provider: "openai",
    model: "gpt-4o",
    promptTokens: 45000,
    fallbackAttemptCount: 0,
  });

  assert.equal(result.isAvalancheRisk, true);
  assert.equal(result.reason, "explicit_tpm_limit");
  assert.equal(result.shouldSuppressFallback, true);
});

test("Anti-Avalanche: massive payload (>= 100k tokens, incident repro) immediately suppresses failover", () => {
  // Incident condition: 115,618 tokens hitting 429
  const result = evaluateAvalancheRisk({
    status: 429,
    errorText: "Resource has been exhausted (e.g. check quota).",
    provider: "gemini",
    model: "gemini-3.8-flash",
    promptTokens: 115618,
    fallbackAttemptCount: 0,
  });

  assert.equal(result.isAvalancheRisk, true);
  assert.equal(result.reason, "oversized_payload_rate_limit");
  assert.equal(result.shouldSuppressFallback, true);
  assert.equal(result.suggestedCooldownMs, 60000);
  assert.match(result.explanation || "", /Massive payload/);
});

test("Anti-Avalanche: oversized payload (50k-100k tokens) allows 1 retry then suppresses consecutive failure", () => {
  // Attempt 0: first key fails on 60k tokens -> allow 1 failover to test if key was just busy
  const attempt0 = evaluateAvalancheRisk({
    status: 429,
    errorText: "Too Many Requests",
    provider: "gemini",
    model: "gemini-3.8-flash",
    promptTokens: 60000,
    fallbackAttemptCount: 0,
  });

  assert.equal(attempt0.isAvalancheRisk, true);
  assert.equal(attempt0.reason, "oversized_payload_rate_limit");
  assert.equal(attempt0.shouldSuppressFallback, false);

  // Attempt 1: second key ALSO fails on 60k tokens -> suppress failover to protect keys 3..8
  const attempt1 = evaluateAvalancheRisk({
    status: 429,
    errorText: "Too Many Requests",
    provider: "gemini",
    model: "gemini-3.8-flash",
    promptTokens: 60000,
    fallbackAttemptCount: 1,
  });

  assert.equal(attempt1.isAvalancheRisk, true);
  assert.equal(attempt1.reason, "oversized_payload_rate_limit");
  assert.equal(attempt1.shouldSuppressFallback, true);
  assert.match(attempt1.explanation || "", /Cascading fallback suppressed/);
});

test("Anti-Avalanche: HTTP 413 Payload Too Large suppresses failover immediately", () => {
  const result = evaluateAvalancheRisk({
    status: 413,
    errorText: "Request entity too large",
    provider: "anthropic",
    model: "claude-3-5-sonnet",
    promptTokens: 180000,
    fallbackAttemptCount: 0,
  });

  assert.equal(result.isAvalancheRisk, true);
  assert.equal(result.reason, "payload_too_large");
  assert.equal(result.shouldSuppressFallback, true);
});

test("Anti-Avalanche: HTTP 400 context length overflow suppresses failover immediately", () => {
  const result = evaluateAvalancheRisk({
    status: 400,
    errorText:
      "InvalidRequestError: This model's maximum context length is 32768 tokens. However, your messages resulted in 35000 tokens.",
    provider: "openai",
    model: "gpt-4",
    promptTokens: 35000,
    fallbackAttemptCount: 0,
  });

  assert.equal(result.isAvalancheRisk, true);
  assert.equal(result.reason, "context_length_exceeded");
  assert.equal(result.shouldSuppressFallback, true);
});

test("Anti-Avalanche: disabled via settings bypasses protection", () => {
  const result = evaluateAvalancheRisk({
    status: 429,
    errorText: "generate_content_free_tier_input_token_count",
    provider: "gemini",
    model: "gemini-3.8-flash",
    promptTokens: 115618,
    fallbackAttemptCount: 5,
    settings: { avalancheProtectionEnabled: false },
  });

  assert.equal(result.isAvalancheRisk, false);
  assert.equal(result.shouldSuppressFallback, false);
});

test("Anti-Avalanche: formatAntiAvalancheMessage provides actionable guidance", () => {
  const msg = formatAntiAvalancheMessage(
    "gemini",
    "gemini-3.8-flash",
    115618,
    "oversized_payload_rate_limit",
    "RESOURCE_EXHAUSTED"
  );

  assert.match(msg, /Anti-Avalanche/);
  assert.match(msg, /115,618/);
  assert.match(msg, /agy\/\*/);
  assert.match(msg, /RESOURCE_EXHAUSTED/);
});

test("Anti-Avalanche: resolveAvalancheSettings respects custom thresholds", () => {
  const custom = resolveAvalancheSettings({
    avalancheTokenThreshold: 30000,
    avalancheMaxRetries: 2,
    avalancheBurstCooldownMs: 45000,
  });

  assert.equal(custom.enabled, true);
  assert.equal(custom.tokenThreshold, 30000);
  assert.equal(custom.maxRetries, 2);
  assert.equal(custom.burstCooldownMs, 45000);
});

test("Anti-Avalanche: markAccountUnavailable honors suppressFallback and bounds lockout cooldown", async () => {
  const { markAccountUnavailable } = await import("../../src/sse/services/auth.ts");
  const providersDb = await import("../../src/lib/db/providers.ts");

  const conn = await providersDb.createProviderConnection({
    provider: "gemini",
    authType: "apikey",
    name: "Anti-Avalanche Test Key",
    apiKey: "test-gemini-key-avalanche",
  });
  const connId = (conn as { id: string }).id;

  const result = await markAccountUnavailable(
    connId,
    429,
    "Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_input_token_count, limit: 16000",
    "gemini",
    "gemini-3.8-flash",
    null,
    {
      isAvalancheRisk: true,
      avalancheCooldownMs: 60000,
      suppressFallback: true,
    }
  );

  assert.equal(result.shouldFallback, false, "suppressFallback must return shouldFallback: false");
  assert.equal(
    result.cooldownMs,
    60000,
    "cooldown must be bounded to 60000ms instead of escalating to 1800s"
  );
});

test("Anti-Avalanche: normal 429 without suppressFallback still allows fallback", async () => {
  const { markAccountUnavailable } = await import("../../src/sse/services/auth.ts");
  const providersDb = await import("../../src/lib/db/providers.ts");

  const conn = await providersDb.createProviderConnection({
    provider: "gemini",
    authType: "apikey",
    name: "Normal Fallback Test Key",
    apiKey: "test-gemini-key-normal",
  });
  const connId = (conn as { id: string }).id;

  const result = await markAccountUnavailable(
    connId,
    429,
    "Rate limit exceeded (generic RPM)",
    "gemini",
    "gemini-3.8-flash"
  );

  assert.equal(result.shouldFallback, true, "normal 429 must allow fallback across accounts");
});
