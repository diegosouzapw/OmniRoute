import test from "node:test";
import assert from "node:assert/strict";

/**
 * Provider-specific error rules extend the global ERROR_RULES with per-provider
 * signatures: headers, body markers, and a lock scope that tells the fallback
 * engine whether to lock the model, the connection, or the entire provider.
 *
 * Each provider has its own quota model:
 *   - Opencode: account-wide quota. A 429 with `x-ratelimit-remaining-requests: 0`
 *     means the ORG is out, not just this model.
 *   - Minimax: per-model quota. A 429 with `x-model-quota-remaining: <model>=0`
 *     means only that specific model is locked.
 *   - Anything else: falls back to global ERROR_RULES.
 */

const { classifyError, checkFallbackError } = await import(
  "../../open-sse/services/accountFallback.ts"
);
const { RateLimitReason } = await import(
  "../../open-sse/config/constants.ts"
);

test("S1: Opencode 429 with x-ratelimit-remaining-requests=0 → QUOTA_EXHAUSTED, not RATE_LIMIT_EXCEEDED", () => {
  // Opencode uses account-wide quota. The header `x-ratelimit-remaining-requests: 0`
  // signals the whole org is out, so this MUST classify as QUOTA_EXHAUSTED so the
  // engine locks the provider connection (not just the model), forcing fallback to
  // a different provider.
  const reason = classifyError(429, "Rate limit reached", {
    provider: "opencode",
    headers: { "x-ratelimit-remaining-requests": "0" },
    body: { error: { message: "Rate limit reached" } },
  });
  assert.equal(
    reason,
    RateLimitReason.QUOTA_EXHAUSTED,
    "Opencode account-wide quota exhaustion must classify as QUOTA_EXHAUSTED so the connection is locked, not the model"
  );
});

test("S2: Minimax 429 with x-model-quota-remaining header → QUOTA_EXHAUSTED with model scope", async () => {
  // Minimax uses per-model quota. The header `x-model-quota-remaining: haiku=0`
  // signals ONLY that model is locked; other models on the same connection must
  // remain available. classifyError returns the reason; the caller (combo.ts)
  // reads the scope from providerRuleMatch to decide lockModel vs updateProviderConnection.
  const { providerRuleRegistry, getProviderErrorRuleMatch } = await import(
    "../../open-sse/config/providerErrorRules.ts"
  );

  // The registry must be loaded for minimax
  const minimaxRules = providerRuleRegistry.get("minimax");
  assert.ok(
    minimaxRules && minimaxRules.length > 0,
    "minimax must be registered in the provider rule registry"
  );

  // The match function returns { reason, scope } for the given provider + status + headers
  const match = getProviderErrorRuleMatch("minimax", 429, {
    "x-model-quota-remaining": "haiku=0",
  });
  assert.ok(match, "minimax must have a rule that matches 429 + per-model quota header");
  assert.equal(match.reason, "quota_exhausted");
  assert.equal(
    match.scope,
    "model",
    "Minimax per-model quota must scope the lock to the model only"
  );
});

test("S3: Regression — provider with no rules falls back to global ERROR_RULES unchanged", () => {
  // A provider not in the registry (e.g. "unknown-vendor") must NOT cause
  // classifyError to crash or return a different result. It must behave
  // identically to the pre-feature implementation: global text/status rules.
  const reason = classifyError(429, "rate limit reached", {
    provider: "unknown-vendor",
    headers: {},
    body: null,
  });
  assert.equal(
    reason,
    RateLimitReason.RATE_LIMIT_EXCEEDED,
    "Unknown providers must fall through to global rules without modification"
  );

  // And without any context at all (old call sites), still works.
  const reasonNoCtx = classifyError(429, "rate limit reached");
  assert.equal(reasonNoCtx, RateLimitReason.RATE_LIMIT_EXCEEDED);
});

test("S4: End-to-end — checkFallbackError forwards provider+headers to classifyError", () => {
  // The wiring test: when combo.ts calls checkFallbackError with provider=opencode
  // and headers containing x-ratelimit-remaining-requests: 0, the reason must be
  // QUOTA_EXHAUSTED (not RATE_LIMIT_EXCEEDED). This proves the registry is ACTIVE
  // in the production fallback path, not just callable in isolation.
  //
  // Simulate what combo.ts:3849 does — it passes provider, headers, and structuredError.
  // For Opencode with account-wide quota exhausted, the fallback should signal
  // quota_exhausted so the combo router skips remaining targets from the same provider.
  const result = checkFallbackError(
    429,
    "rate limit reached", // generic body that would normally be RATE_LIMIT_EXCEEDED
    0, // backoffLevel
    null, // model
    "opencode", // provider
    { "x-ratelimit-remaining-requests": "0" }, // headers
    null, // profileOverride
    null // structuredError
  );

  assert.equal(
    result.reason,
    RateLimitReason.QUOTA_EXHAUSTED,
    "checkFallbackError must forward provider+headers to classifyError so the Opencode quota rule fires"
  );
  assert.equal(
    result.shouldFallback,
    true,
    "quota_exhausted must trigger fallback to the next provider"
  );
});
