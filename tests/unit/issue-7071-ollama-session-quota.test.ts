/**
 * Issue #7071 — Ollama Cloud's 5-hour "session" usage-limit 429 is never
 * recognized as quota-exhausted. The upstream returns a body like:
 *   "you (<account>) have reached your session usage limit"
 *
 * This exactly mirrors the already-fixed "weekly usage limit" gap (#3709,
 * #6638): ollama-cloud is an apikey-category provider (not oauth), so the
 * oauth-only `shouldUseQuotaSignal` gate in checkFallbackError skips the
 * generic subscription-quota-text branch (#2321) for its 429s. Without a
 * dedicated, ungated session check the account fell through to the generic
 * 429 backoff (~3s, capped low) and got retried within the same 5-hour
 * session window instead of cooling down for the session's duration —
 * combo/LKGP routing cycled back to the "exhausted" account instead of
 * advancing to the next one.
 *
 * This test proves: (1) the session-usage-limit text is classified as
 * QUOTA_EXHAUSTED with a cooldown far longer than the generic backoff cap,
 * for BOTH apikey and oauth provider categories, and (2) unrelated
 * session-expired/auth wording and the sibling weekly-quota text are
 * unaffected.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");
const { isSessionUsageLimitText, buildSessionQuotaFallback, isWeeklyUsageLimitText } =
  await import("../../open-sse/services/quotaTextCooldowns.ts");
const { RateLimitReason, BACKOFF_CONFIG } = await import("../../open-sse/config/constants.ts");
const { BACKOFF_CONFIG: ERROR_BACKOFF_CONFIG } = await import("../../open-sse/config/errorConfig.ts");

const SESSION_BODY = "you (acme-corp) have reached your session usage limit";
const SESSION_COOLDOWN_MS = 5 * 60 * 60 * 1000; // 5 hours

test("#7071 sanity: weekly text IS recognized (already fixed by #3709/#6638)", () => {
  assert.equal(isWeeklyUsageLimitText("you (acme-corp) have reached your weekly usage limit"), true);
});

test("#7071 isSessionUsageLimitText matches the ollama-cloud 429 body", () => {
  assert.equal(isSessionUsageLimitText(SESSION_BODY.toLowerCase()), true);
  assert.equal(isSessionUsageLimitText("session limit reached, try later"), true);
  assert.equal(isSessionUsageLimitText("rate_limit_exceeded: too many requests"), false);
  // Must not false-positive on unrelated "session expired" auth errors.
  assert.equal(isSessionUsageLimitText("your session has expired, please log in again"), false);
  assert.equal(isSessionUsageLimitText("session token invalid"), false);
});

test("#7071 buildSessionQuotaFallback returns a 5h QUOTA_EXHAUSTED cooldown, far above the generic backoff cap", () => {
  const result = buildSessionQuotaFallback(SESSION_BODY);
  assert.ok(result, "expected a non-null fallback for session-usage-limit text");
  assert.equal(result!.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(result!.cooldownMs, SESSION_COOLDOWN_MS);
  assert.ok(result!.cooldownMs > (ERROR_BACKOFF_CONFIG.max ?? BACKOFF_CONFIG.max));
});

test("#7071 buildSessionQuotaFallback returns null for unrelated error text", () => {
  assert.equal(buildSessionQuotaFallback("rate_limit_exceeded: too many requests"), null);
  assert.equal(buildSessionQuotaFallback("your session has expired, please log in again"), null);
});

test("#7071 BUG: checkFallbackError misclassifies ollama-cloud session-quota 429 as generic RATE_LIMIT_EXCEEDED instead of QUOTA_EXHAUSTED", () => {
  const out = checkFallbackError(
    429,
    SESSION_BODY,
    0, // backoffLevel
    null, // model
    "ollama-cloud", // provider (apikey category)
    null, // headers
    null, // profileOverride
    null // structuredError
  );

  assert.equal(out.shouldFallback, true);
  assert.equal(
    out.reason,
    RateLimitReason.QUOTA_EXHAUSTED,
    `expected QUOTA_EXHAUSTED for session-usage-limit text, got reason=${out.reason} cooldownMs=${out.cooldownMs}`
  );
  assert.equal(out.cooldownMs, SESSION_COOLDOWN_MS);
});

test("#7071 checkFallbackError: oauth-category provider with session-limit text also gets the long cooldown", () => {
  const out = checkFallbackError(429, SESSION_BODY, 0, null, "claude", null, null, null);
  assert.equal(out.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(out.cooldownMs, SESSION_COOLDOWN_MS);
});

test("#7071 checkFallbackError: ollama-cloud generic rate-limit body is unaffected (no false positive)", () => {
  const out = checkFallbackError(
    429,
    "rate_limit_exceeded: too many requests",
    0,
    null,
    "ollama-cloud",
    null,
    null,
    null
  );
  assert.equal(out.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
  assert.ok(
    out.cooldownMs <= 2 * 60 * 1000,
    "generic rate limit text must keep the normal short backoff, not the 5h session cooldown"
  );
});
