import test from "node:test";
import assert from "node:assert/strict";

const {
  checkFallbackError,
  parseRetryAfterFromBody,
  classifyError,
  classifyErrorText,
  lockModel,
  isModelLocked,
  getModelLockoutInfo,
  getAllModelLockouts,
  getQuotaCooldown,
  getBackoffDuration,
  getAccountHealth,
  isAccountUnavailable,
  getUnavailableUntil,
  formatRetryAfter,
  filterAvailableAccounts,
  resetAccountState,
  applyErrorState,
} = await import("../../open-sse/services/accountFallback.js");

const { RateLimitReason, BACKOFF_STEPS_MS } = await import("../../open-sse/config/constants.js");

// ─── parseRetryAfterFromBody Tests ──────────────────────────────────────────

test("parseRetryAfterFromBody: parses Gemini retryDelay format", () => {
  const body = {
    error: {
      code: 429,
      message: "Resource has been exhausted",
      details: [{ "@type": "google.rpc.RetryInfo", retryDelay: "33s" }],
    },
  };
  const result = parseRetryAfterFromBody(body);
  assert.equal(result.retryAfterMs, 33000);
  assert.equal(result.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
});

test("parseRetryAfterFromBody: parses OpenAI retry message format", () => {
  const body = {
    error: {
      message: "Rate limit reached. Please retry after 20s.",
      type: "rate_limit_error",
    },
  };
  const result = parseRetryAfterFromBody(body);
  assert.equal(result.retryAfterMs, 20000);
  assert.equal(result.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
});

test("parseRetryAfterFromBody: classifies Anthropic rate_limit_error", () => {
  const body = {
    type: "error",
    error: { type: "rate_limit_error", message: "Too many requests" },
  };
  const result = parseRetryAfterFromBody(body);
  assert.equal(result.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
});

test("parseRetryAfterFromBody: handles string input", () => {
  const body = JSON.stringify({
    error: { details: [{ retryDelay: "10s" }] },
  });
  const result = parseRetryAfterFromBody(body);
  assert.equal(result.retryAfterMs, 10000);
});

test("parseRetryAfterFromBody: handles invalid JSON", () => {
  const result = parseRetryAfterFromBody("not json");
  assert.equal(result.retryAfterMs, null);
  assert.equal(result.reason, RateLimitReason.UNKNOWN);
});

test("parseRetryAfterFromBody: handles null/undefined", () => {
  assert.equal(parseRetryAfterFromBody(null).retryAfterMs, null);
  assert.equal(parseRetryAfterFromBody(undefined).retryAfterMs, null);
});

// ─── classifyError Tests ────────────────────────────────────────────────────

test("classifyError: 429 → RATE_LIMIT_EXCEEDED", () => {
  assert.equal(classifyError(429, ""), RateLimitReason.RATE_LIMIT_EXCEEDED);
});

test("classifyError: 401 → AUTH_ERROR", () => {
  assert.equal(classifyError(401, ""), RateLimitReason.AUTH_ERROR);
});

test("classifyError: 402 → QUOTA_EXHAUSTED", () => {
  assert.equal(classifyError(402, ""), RateLimitReason.QUOTA_EXHAUSTED);
});

test("classifyError: 503 → MODEL_CAPACITY", () => {
  assert.equal(classifyError(503, ""), RateLimitReason.MODEL_CAPACITY);
});

test("classifyError: text overrides status code", () => {
  // 500 normally → SERVER_ERROR, but quota text → QUOTA_EXHAUSTED
  assert.equal(classifyError(500, "quota exceeded"), RateLimitReason.QUOTA_EXHAUSTED);
});

test("classifyErrorText: handles various patterns", () => {
  assert.equal(classifyErrorText("rate limit reached"), RateLimitReason.RATE_LIMIT_EXCEEDED);
  assert.equal(classifyErrorText("too many requests"), RateLimitReason.RATE_LIMIT_EXCEEDED);
  assert.equal(classifyErrorText("capacity exceeded"), RateLimitReason.MODEL_CAPACITY);
  assert.equal(classifyErrorText("overloaded"), RateLimitReason.MODEL_CAPACITY);
  assert.equal(classifyErrorText("unauthorized"), RateLimitReason.AUTH_ERROR);
  assert.equal(classifyErrorText("random error"), RateLimitReason.UNKNOWN);
});

// ─── Per-Model Lockout Tests ────────────────────────────────────────────────

test("lockModel + isModelLocked: locks specific model", () => {
  lockModel("claude", "conn1", "claude-sonnet-4", "rate_limit_exceeded", 5000);
  assert.equal(isModelLocked("claude", "conn1", "claude-sonnet-4"), true);
});

test("isModelLocked: different model not locked", () => {
  lockModel("claude", "conn2", "claude-sonnet-4", "rate_limit_exceeded", 5000);
  assert.equal(isModelLocked("claude", "conn2", "claude-haiku-4"), false);
});

test("isModelLocked: returns false when no model specified", () => {
  assert.equal(isModelLocked("claude", "conn1", null), false);
  assert.equal(isModelLocked("claude", "conn1", undefined), false);
});

test("getModelLockoutInfo: returns lockout details", () => {
  lockModel("openai", "conn3", "gpt-4o", "quota_exhausted", 10000);
  const info = getModelLockoutInfo("openai", "conn3", "gpt-4o");
  assert.ok(info);
  assert.equal(info.reason, "quota_exhausted");
  assert.ok(info.remainingMs > 0);
});

test("getAllModelLockouts: returns active lockouts", () => {
  lockModel("test-provider", "conn-test", "test-model", "test", 10000);
  const lockouts = getAllModelLockouts();
  const found = lockouts.find((l) => l.model === "test-model");
  assert.ok(found);
  assert.equal(found.provider, "test-provider");
});

// ─── checkFallbackError Tests ────────────────────────────────────────────────

test("checkFallbackError: backward compatible without model param", () => {
  const result = checkFallbackError(429, "Rate limit hit", 0);
  assert.equal(result.shouldFallback, true);
  assert.ok(result.cooldownMs > 0);
  assert.equal(result.newBackoffLevel, 1);
  assert.equal(result.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
});

test("checkFallbackError: 400 does not trigger fallback", () => {
  const result = checkFallbackError(400, "bad request");
  assert.equal(result.shouldFallback, false);
});

test("checkFallbackError: server error has reason", () => {
  const result = checkFallbackError(500, "internal server error");
  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.SERVER_ERROR);
});

test("checkFallbackError: transient errors don't increase backoff level", () => {
  const result = checkFallbackError(502, "", 5);
  assert.equal(result.shouldFallback, true);
  assert.equal(result.newBackoffLevel, undefined);
});

// ─── Backoff Steps Tests ────────────────────────────────────────────────────

test("getBackoffDuration: follows step sequence", () => {
  assert.equal(getBackoffDuration(0), BACKOFF_STEPS_MS[0]); // 60s
  assert.equal(getBackoffDuration(1), BACKOFF_STEPS_MS[1]); // 120s
  assert.equal(getBackoffDuration(2), BACKOFF_STEPS_MS[2]); // 300s
  assert.equal(getBackoffDuration(4), BACKOFF_STEPS_MS[4]); // 1200s
});

test("getBackoffDuration: caps at max step", () => {
  assert.equal(getBackoffDuration(100), BACKOFF_STEPS_MS[BACKOFF_STEPS_MS.length - 1]);
});

// ─── Exponential backoff (original) Tests ───────────────────────────────────

test("getQuotaCooldown: exponential progression", () => {
  assert.equal(getQuotaCooldown(0), 1000);      // 1s
  assert.equal(getQuotaCooldown(1), 2000);      // 2s
  assert.equal(getQuotaCooldown(3), 8000);      // 8s
  assert.ok(getQuotaCooldown(20) <= 120000);    // Capped at 2min
});

// ─── Account Health Tests ───────────────────────────────────────────────────

test("getAccountHealth: healthy account = 100", () => {
  assert.equal(getAccountHealth({ backoffLevel: 0 }), 100);
});

test("getAccountHealth: degraded by backoff level", () => {
  assert.equal(getAccountHealth({ backoffLevel: 5 }), 50);
});

test("getAccountHealth: degraded by error + rateLimited", () => {
  const score = getAccountHealth({
    backoffLevel: 3,
    lastError: { message: "something" },
    rateLimitedUntil: new Date(Date.now() + 60000).toISOString(),
  });
  assert.equal(score, 20); // 100 - 30 - 20 - 30
});

test("getAccountHealth: null account = 0", () => {
  assert.equal(getAccountHealth(null), 0);
});

// ─── Account State Tests ────────────────────────────────────────────────────

test("resetAccountState: clears all error state", () => {
  const reset = resetAccountState({
    rateLimitedUntil: "2030-01-01",
    backoffLevel: 5,
    lastError: "something",
    status: "error",
  });
  assert.equal(reset.rateLimitedUntil, null);
  assert.equal(reset.backoffLevel, 0);
  assert.equal(reset.lastError, null);
  assert.equal(reset.status, "active");
});

test("applyErrorState: applies cooldown and reason", () => {
  const result = applyErrorState({ backoffLevel: 0 }, 429, "rate limit hit");
  assert.ok(result.rateLimitedUntil);
  assert.equal(result.backoffLevel, 1);
  assert.equal(result.status, "error");
  assert.ok(result.lastError.reason);
});

// ─── Utility Tests ──────────────────────────────────────────────────────────

test("isAccountUnavailable: false for null", () => {
  assert.equal(isAccountUnavailable(null), false);
});

test("isAccountUnavailable: true for future timestamp", () => {
  assert.equal(isAccountUnavailable(new Date(Date.now() + 60000).toISOString()), true);
});

test("isAccountUnavailable: false for past timestamp", () => {
  assert.equal(isAccountUnavailable(new Date(Date.now() - 1000).toISOString()), false);
});

test("formatRetryAfter: formats correctly", () => {
  const future = new Date(Date.now() + 150000).toISOString(); // 2.5 min
  const formatted = formatRetryAfter(future);
  assert.match(formatted, /reset after \d+m/);
});

test("filterAvailableAccounts: filters out rate-limited", () => {
  const accounts = [
    { id: "a", rateLimitedUntil: null },
    { id: "b", rateLimitedUntil: new Date(Date.now() + 60000).toISOString() },
    { id: "c", rateLimitedUntil: new Date(Date.now() - 1000).toISOString() },
  ];
  const available = filterAvailableAccounts(accounts);
  assert.equal(available.length, 2); // a and c (expired)
  assert.deepEqual(
    available.map((a) => a.id),
    ["a", "c"]
  );
});
