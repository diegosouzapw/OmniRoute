/**
 * Issue #3709 — Ollama Cloud free-tier accounts have a hard WEEKLY request
 * cap. On cap the upstream returns 429 with a body like:
 *   "you (<account>) have reached your weekly usage limit"
 *
 * ollama-cloud is an apikey-category provider (not oauth), so the existing
 * oauth-only `shouldUseQuotaSignal` gate in checkFallbackError skips the
 * generic subscription-quota-text branch (Issue #2321) for its 429s. Without
 * a dedicated, ungated weekly check the account fell through to the generic
 * 429 backoff (starts ~1s, caps at 2min) and got retried every few minutes
 * for the rest of the week — one account took 285x429 in 48h.
 *
 * This test proves: (1) the weekly-usage-limit text is classified as
 * QUOTA_EXHAUSTED with a cooldown far longer than the generic backoff cap,
 * for BOTH oauth and apikey provider categories, and (2) a sibling
 * under-quota connection is unaffected (multi-account: only the exhausted
 * connection's checkFallbackError call is affected — selection filtering
 * lives in auth.ts and is exercised by other suites).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");
const { isWeeklyUsageLimitText, buildWeeklyQuotaFallback } = await import(
  "../../open-sse/services/quotaTextCooldowns.ts"
);
const { RateLimitReason, BACKOFF_CONFIG } = await import("../../open-sse/config/constants.ts");
const { BACKOFF_CONFIG: ERROR_BACKOFF_CONFIG } = await import("../../open-sse/config/errorConfig.ts");

const WEEKLY_BODY = "you (acme-corp) have reached your weekly usage limit";

test("#3709 isWeeklyUsageLimitText matches the ollama-cloud 429 body", () => {
  assert.equal(isWeeklyUsageLimitText(WEEKLY_BODY.toLowerCase()), true);
  assert.equal(isWeeklyUsageLimitText("weekly limit reached, try later"), true);
  assert.equal(isWeeklyUsageLimitText("rate_limit_exceeded: too many requests"), false);
});

test("#3709 buildWeeklyQuotaFallback returns a 24h QUOTA_EXHAUSTED cooldown, far above the generic backoff cap", () => {
  const result = buildWeeklyQuotaFallback(WEEKLY_BODY);
  assert.ok(result, "expected a non-null fallback for weekly-usage-limit text");
  assert.equal(result!.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(result!.cooldownMs, 24 * 60 * 60 * 1000);
  // The generic 429 backoff caps at 2 minutes — the weekly cooldown must be
  // far longer, otherwise the account keeps getting retried every few
  // minutes for the rest of the week (the exact bug reported in #3709).
  assert.ok(result!.cooldownMs > (ERROR_BACKOFF_CONFIG.max ?? BACKOFF_CONFIG.max));
});

test("#3709 buildWeeklyQuotaFallback returns null for unrelated error text", () => {
  assert.equal(buildWeeklyQuotaFallback("rate_limit_exceeded: too many requests"), null);
  assert.equal(buildWeeklyQuotaFallback("Usage Limit Reached"), null);
});

test("#3709 checkFallbackError: apikey-category provider (ollama-cloud) 429 weekly-limit body → QUOTA_EXHAUSTED, 24h cooldown", () => {
  // Regression guard for the actual bug: without the fix, ollama-cloud (an
  // apikey-category provider) 429s skip quota-text classification entirely
  // (shouldUseQuotaSignal is oauth-only) and fall through to the generic
  // ~1s->2min exponential backoff.
  const out = checkFallbackError(
    429,
    WEEKLY_BODY,
    0, // backoffLevel
    null, // model
    "ollama-cloud", // provider (apikey category)
    null, // headers
    null, // profileOverride
    null // structuredError
  );

  assert.equal(out.shouldFallback, true);
  assert.equal(out.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(out.cooldownMs, 24 * 60 * 60 * 1000);
  assert.ok(
    out.cooldownMs > 5 * 60 * 1000,
    `expected cooldown far longer than the old 5-minute retry storm window, got ${out.cooldownMs}ms`
  );
});

test("#3709 checkFallbackError: oauth-category provider with weekly-limit text also gets the long cooldown", () => {
  // The weekly check is generic (not ollama-specific) and runs unconditionally,
  // so an oauth provider using the same wording is covered too.
  const out = checkFallbackError(429, WEEKLY_BODY, 0, null, "claude", null, null, null);
  assert.equal(out.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(out.cooldownMs, 24 * 60 * 60 * 1000);
});

test("#3709 checkFallbackError: ollama-cloud generic rate-limit body is unaffected (no false positive)", () => {
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
    "generic rate limit text must keep the normal short backoff, not the 24h weekly cooldown"
  );
});
