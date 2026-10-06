import test from "node:test";
import assert from "node:assert/strict";

import {
  selectLockoutCooldownMs,
  recordModelLockoutFailure,
  getModelLockoutInfo,
  clearAllModelLockouts,
  parseRetryFromErrorText,
  checkFallbackError,
  retryHintBypassesMaxCooldownMs,
} from "../../open-sse/services/accountFallback.ts";
import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";
import {
  parseDetailedRetryHintFromJsonBody,
  parseRetryHintFromJsonBody,
} from "../../open-sse/services/retryAfterJson.ts";

// Regression for #1308: a combo model-lockout was capped at the short base cooldown
// (~minutes) and discarded the long upstream quota reset that the central parser had
// already extracted (e.g. Antigravity "Resets in 160h27m24s"), so the exhausted model
// kept being retried within minutes.

const HOUR = 3600_000;
const RESET_160H = 160 * HOUR + 27 * 60_000 + 24_000; // "160h27m24s"

test("selectLockoutCooldownMs honors a parsed reset longer than the base cooldown", () => {
  // exponential backoff on, but a 160h upstream reset must win
  assert.equal(
    selectLockoutCooldownMs(RESET_160H, {
      baseCooldownMs: 5 * 60_000,
      useExponentialBackoff: true,
    }),
    RESET_160H
  );
});

test("selectLockoutCooldownMs preserves exponential backoff when no long reset is present", () => {
  // parsed cooldown <= base → return 0 so recordModelLockoutFailure applies its backoff
  assert.equal(
    selectLockoutCooldownMs(0, { baseCooldownMs: 5 * 60_000, useExponentialBackoff: true }),
    0
  );
});

test("selectLockoutCooldownMs falls back to base cooldown when backoff is disabled", () => {
  assert.equal(
    selectLockoutCooldownMs(0, { baseCooldownMs: 5 * 60_000, useExponentialBackoff: false }),
    5 * 60_000
  );
});

test("model lockout honors the long upstream reset end-to-end (#1308)", () => {
  clearAllModelLockouts();
  const exact = selectLockoutCooldownMs(RESET_160H, {
    baseCooldownMs: 5 * 60_000,
    useExponentialBackoff: true,
  });
  recordModelLockoutFailure(
    "antigravity",
    "conn-1",
    "claude-sonnet-4-6",
    "rate_limit",
    429,
    5 * 60_000,
    null,
    {
      exactCooldownMs: exact,
    }
  );
  const info = getModelLockoutInfo("antigravity", "conn-1", "claude-sonnet-4-6");
  assert.ok(info, "expected an active lockout");
  // remaining should be ~160h, NOT the ~5min base cooldown
  assert.ok(
    info.remainingMs > 150 * HOUR,
    `expected lockout ~160h, got ${Math.round(info.remainingMs / HOUR)}h`
  );
  clearAllModelLockouts();
});

test("central parseRetryFromErrorText parses Antigravity 'Resets in 160h27m24s'", () => {
  const ms = parseRetryFromErrorText("Individual quota reached. Resets in 160h27m24s.");
  assert.ok(ms && ms > 150 * HOUR, `expected ~160h, got ${ms}`);
});

test("antigravity executor parseRetryFromErrorMessage matches plural 'Resets in' (#1308)", () => {
  const executor = new AntigravityExecutor();
  const ms = executor.parseRetryFromErrorMessage("Individual quota reached. Resets in 160h27m24s.");
  assert.ok(ms && ms > 150 * HOUR, `expected ~160h, got ${ms}`);
});

test("prose reset above max is identified as text and capped", () => {
  const maxCooldownMs = 30 * 60_000;
  const result = checkFallbackError(
    429,
    "Individual quota reached. Resets in 131h.",
    0,
    "claude-sonnet-4-6",
    "antigravity",
    null,
    {
      baseCooldownMs: 5 * 60_000,
      maxCooldownMs,
      maxBackoffSteps: 3,
      useExponentialBackoff: true,
      useUpstreamRetryHints: true,
    }
  );

  assert.equal(result.retryHintSource, "body");
  assert.equal(retryHintBypassesMaxCooldownMs(result.retryHintSource), false);
});

test("Retry-After remains authoritative for model locks when connection hints are disabled", () => {
  const maxCooldownMs = 30 * 60_000;
  const result = checkFallbackError(
    429,
    "Individual quota reached.",
    0,
    "claude-sonnet-4-6",
    "antigravity",
    new Headers({ "retry-after": String(131 * 60 * 60) }),
    {
      baseCooldownMs: 5 * 60_000,
      maxCooldownMs,
      maxBackoffSteps: 3,
      useExponentialBackoff: true,
      useUpstreamRetryHints: false,
    }
  );

  assert.equal(result.retryHintSource, "header");
  const expectedResetMs = 131 * HOUR;
  const actualResetMs = result.quotaResetHintMs;
  assert.ok(typeof actualResetMs === "number", "expected a numeric Retry-After reset hint");
  assert.ok(
    actualResetMs <= expectedResetMs && actualResetMs >= expectedResetMs - 1_000,
    `expected Retry-After within one clock tick of ${expectedResetMs}ms, got ${actualResetMs}ms`
  );
  assert.equal(retryHintBypassesMaxCooldownMs(result.retryHintSource), true);
});

test("structured RetryInfo remains authoritative when connection hints are disabled", () => {
  const maxCooldownMs = 30 * 60_000;
  const body = JSON.stringify({
    error: {
      message: "Individual quota reached.",
      details: [{ "@type": "type.googleapis.com/google.rpc.RetryInfo", retryDelay: "2h" }],
    },
  });
  const result = checkFallbackError(429, body, 0, "claude-sonnet-4-6", "antigravity", null, {
    baseCooldownMs: 5 * 60_000,
    maxCooldownMs,
    maxBackoffSteps: 3,
    useExponentialBackoff: true,
    useUpstreamRetryHints: false,
  });

  assert.equal(result.retryHintSource, "google_rpc_retry_info");
  assert.equal(result.quotaResetHintMs, 2 * HOUR);
  assert.equal(retryHintBypassesMaxCooldownMs(result.retryHintSource), true);
});

test("detailed JSON parsing preserves provenance without breaking the numeric wrapper", () => {
  const genericBody = JSON.stringify({ error: { retry_after_ms: 2 * HOUR } });
  assert.deepEqual(parseDetailedRetryHintFromJsonBody(genericBody, 3 * HOUR), {
    retryAfterMs: 2 * HOUR,
    provenance: "body",
  });
  assert.equal(parseRetryHintFromJsonBody(genericBody, 3 * HOUR), 2 * HOUR);

  const retryInfoBody = JSON.stringify({
    error: {
      details: [{ "@type": "type.googleapis.com/google.rpc.RetryInfo", retryDelay: "26s" }],
    },
  });
  assert.deepEqual(parseDetailedRetryHintFromJsonBody(retryInfoBody, 10_000), {
    retryAfterMs: 26_000,
    provenance: "google_rpc_retry_info",
  });
  assert.equal(parseRetryHintFromJsonBody(retryInfoBody, 10_000), 26_000);
});
