/**
 * Issue #2321 — Anthropic OAuth (Claude Pro/Team) 429 responses with phrases
 * like "Usage Limit Reached" must be classified as QUOTA_EXHAUSTED with a
 * long cooldown, not as a generic RATE_LIMIT_EXCEEDED with a ~5s base
 * cooldown. Without this fix all Pro accounts on the same subscription
 * cascade into a tight retry loop until the 5h quota window resets.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { classifyErrorText, parseRetryFromErrorText, checkFallbackError } =
  await import("../../open-sse/services/accountFallback.ts");
const { RateLimitReason } = await import("../../open-sse/config/constants.ts");

test("#2321 classifyErrorText flags 'Usage Limit Reached' as QUOTA_EXHAUSTED", () => {
  const out = classifyErrorText("Usage Limit Reached. Please wait until 10:00 AM");
  assert.equal(out, RateLimitReason.QUOTA_EXHAUSTED);
});

test("#2321 classifyErrorText flags 'Claude Pro usage limit reached' as QUOTA_EXHAUSTED", () => {
  const out = classifyErrorText("Claude Pro usage limit reached.");
  assert.equal(out, RateLimitReason.QUOTA_EXHAUSTED);
});

test("#2321 classifyErrorText flags possessive 'you've reached your usage limit'", () => {
  const out = classifyErrorText("Sorry — you've reached your usage limit for this model.");
  assert.equal(out, RateLimitReason.QUOTA_EXHAUSTED);
});

test("#2321 classifyErrorText still returns RATE_LIMIT_EXCEEDED for generic rate_limit", () => {
  // Regression guard: short-term rate limits (per-minute TPM) must remain
  // transient so we don't lock accounts for an hour after a normal burst.
  const out = classifyErrorText("rate_limit_exceeded: too many requests");
  assert.equal(out, RateLimitReason.RATE_LIMIT_EXCEEDED);
});

test("#2321 parseRetryFromErrorText extracts an ISO timestamp", () => {
  const future = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  const ms = parseRetryFromErrorText(`Usage Limit Reached. Try again at ${future}`);
  assert.ok(ms !== null, "expected non-null wait time");
  assert.ok(ms! > 30 * 60 * 1000 && ms! <= 60 * 60 * 1000, `expected ~1h wait, got ${ms}ms`);
});

test("#2321 parseRetryFromErrorText ignores past ISO timestamps", () => {
  const past = "2020-01-01T00:00:00Z";
  const ms = parseRetryFromErrorText(`Try again at ${past}`);
  assert.equal(ms, null);
});

test("#2321 parseRetryFromErrorText still handles the 'reset after Xh' format (backward compat)", () => {
  const ms = parseRetryFromErrorText("Your quota will reset after 1h30m");
  assert.equal(ms, (60 + 30) * 60 * 1000);
});

test("#2321 checkFallbackError returns ~1h cooldown for OAuth 429 + Usage Limit Reached", () => {
  const out = checkFallbackError(
    429,
    "Usage Limit Reached. Please wait until 5h.",
    0,
    null,
    "claude" // OAuth provider
  );
  assert.equal(out.shouldFallback, true);
  assert.equal(out.reason, RateLimitReason.QUOTA_EXHAUSTED);
  // Either the 1h default OR an upstream retry hint — both are far above
  // the ~5s base cooldown that caused the cascade.
  assert.ok(
    out.cooldownMs >= 5 * 60 * 1000,
    `expected long cooldown (>=5min), got ${out.cooldownMs}ms`
  );
});

test("#2321 checkFallbackError honors ISO timestamp from body when present", () => {
  const futureMs = 45 * 60 * 1000;
  const future = new Date(Date.now() + futureMs).toISOString();
  const out = checkFallbackError(
    429,
    `Claude Pro usage limit reached. Try again at ${future}`,
    0,
    null,
    "claude"
  );
  assert.equal(out.reason, RateLimitReason.QUOTA_EXHAUSTED);
  // Within ~30s of the requested wait time.
  assert.ok(
    Math.abs(out.cooldownMs - futureMs) < 30_000,
    `expected ~${futureMs}ms cooldown, got ${out.cooldownMs}ms`
  );
});

test("#2321 generic 429 without quota keyword still gets the short cooldown path", () => {
  // Regression guard: plain rate-limit must NOT get the 1h cooldown.
  const out = checkFallbackError(429, "rate_limit_exceeded", 0, null, "claude");
  assert.equal(out.shouldFallback, true);
  // Generic 429 keeps the short retryable path (< 5 min).
  assert.ok(
    out.cooldownMs < 5 * 60 * 1000,
    `expected short cooldown (<5min), got ${out.cooldownMs}ms`
  );
});
