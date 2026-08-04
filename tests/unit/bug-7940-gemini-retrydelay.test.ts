import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parseRetryFromErrorText,
  recordModelLockoutFailure,
  clearAllModelLockouts,
  getModelLockoutInfo,
} from "../../open-sse/services/accountFallback.ts";

const GEMINI_429_BODY = JSON.stringify({
  error: {
    code: 429,
    message:
      "You exceeded your current quota, please check your plan and billing details. " +
      "Please retry in 26.660853464s.",
    status: "RESOURCE_EXHAUSTED",
    details: [
      {
        "@type": "type.googleapis.com/google.rpc.QuotaFailure",
        violations: [
          { quotaMetric: "generativelanguage.googleapis.com/generate_content_free_tier_requests" },
        ],
      },
      { "@type": "type.googleapis.com/google.rpc.RetryInfo", retryDelay: "26s" },
    ],
  },
});

test("parseRetryFromErrorText extracts Gemini RetryInfo.retryDelay (26s), not null", () => {
  const parsedMs = parseRetryFromErrorText(GEMINI_429_BODY);
  assert.notEqual(parsedMs, null, "expected the 26s RetryInfo hint to be parsed, got null");
  assert.ok(parsedMs! >= 25_000 && parsedMs! <= 28_000, `expected ~26000ms, got ${parsedMs}ms`);
});

test("recordModelLockoutFailure quota_exhausted with a short upstream hint must NOT fall back to midnight", () => {
  clearAllModelLockouts();
  const provider = "gemini",
    connectionId = "conn-7940",
    model = "gemini-2.5-flash";
  const quotaResetHintMs = parseRetryFromErrorText(GEMINI_429_BODY) ?? undefined;
  const result = recordModelLockoutFailure(provider, connectionId, model, "quota_exhausted", 429, 0, null, {
    exactCooldownMs: quotaResetHintMs ?? null,
  });
  const oneHourMs = 60 * 60 * 1000;
  assert.ok(result.cooldownMs < oneHourMs, `expected ~26s cooldown, got ${result.cooldownMs}ms`);
  clearAllModelLockouts();
});

test("parseRetryFromErrorText falls back to 'please retry in Ns' text when no JSON details are present", () => {
  const plainText =
    "429 RESOURCE_EXHAUSTED: You exceeded your current quota. Please retry in 12.5s.";
  const parsedMs = parseRetryFromErrorText(plainText);
  assert.notEqual(parsedMs, null, "expected the 12.5s text hint to be parsed, got null");
  assert.ok(parsedMs! >= 12_000 && parsedMs! <= 13_500, `expected ~12500ms, got ${parsedMs}ms`);
});

test("getModelLockoutInfo reflects the short lockout, not a multi-hour one", () => {
  clearAllModelLockouts();
  const provider = "gemini",
    connectionId = "conn-7940b",
    model = "gemini-2.5-flash";
  const quotaResetHintMs = parseRetryFromErrorText(GEMINI_429_BODY) ?? undefined;
  recordModelLockoutFailure(provider, connectionId, model, "quota_exhausted", 429, 0, null, {
    exactCooldownMs: quotaResetHintMs ?? null,
  });
  const info = getModelLockoutInfo(provider, connectionId, model);
  assert.ok(info, "expected an active lockout entry");
  const oneHourMs = 60 * 60 * 1000;
  assert.ok(info!.remainingMs < oneHourMs, `expected <1h remaining, got ${info!.remainingMs}ms`);
  clearAllModelLockouts();
});
