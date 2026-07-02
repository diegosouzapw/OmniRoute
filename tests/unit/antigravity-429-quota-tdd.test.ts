import { test } from "node:test";
import assert from "node:assert/strict";

import { classify429 as classify429AG } from "../../open-sse/services/antigravity429Engine.ts";
import { classify429 as classify429Shared } from "../../src/shared/utils/classify429.ts";
import {
  parseRetryFromErrorText,
  checkFallbackError,
} from "../../open-sse/services/accountFallback.ts";

test("TDD S1: classify429 (Antigravity engine) detects INSUFFICIENT_G1_CREDITS_BALANCE", () => {
  const msg = JSON.stringify({
    error: {
      code: 429,
      message: "Resource has been exhausted (e.g. check quota).",
      status: "RESOURCE_EXHAUSTED",
      details: [
        {
          "@type": "type.googleapis.com/google.rpc.ErrorInfo",
          reason: "INSUFFICIENT_G1_CREDITS_BALANCE",
        },
      ],
    },
  });

  const category = classify429AG(msg);
  assert.equal(category, "quota_exhausted");
});

test("TDD S1: classify429 (Shared utility) detects INSUFFICIENT_G1_CREDITS_BALANCE", () => {
  const body = {
    error: {
      code: 429,
      message: "Resource has been exhausted (e.g. check quota).",
      status: "RESOURCE_EXHAUSTED",
      details: [
        {
          "@type": "type.googleapis.com/google.rpc.ErrorInfo",
          reason: "INSUFFICIENT_G1_CREDITS_BALANCE",
        },
      ],
    },
  };

  const kind = classify429Shared({ status: 429, body });
  assert.equal(kind, "quota_exhausted");
});

test("TDD S2: Regression: standard Gemini rate limit 'queries per minute limit was reached' -> rate_limit (shared) and rate_limited (AG)", () => {
  const msg =
    "RESOURCE_EXHAUSTED: Resource has been exhausted (e.g. queries per minute limit was reached).";
  assert.notEqual(classify429AG(msg), "quota_exhausted");
  assert.equal(classify429Shared({ status: 429, body: msg }), "rate_limit");
});

test("TDD S3: parseRetryFromErrorText parses resets in 5h and resets in 164h27m24s", () => {
  // Antigravity returns: "Individual quota reached. Contact your administrator to enable overages. Resets in 5h."
  const msg5h =
    "Individual quota reached. Contact your administrator to enable overages. Resets in 5h.";
  const msgWeekly =
    "Individual quota reached. Contact your administrator to enable overages. Resets in 164h27m24s.";

  const val5h = parseRetryFromErrorText(msg5h);
  assert.equal(val5h, 5 * 3600 * 1000);

  const valWeekly = parseRetryFromErrorText(msgWeekly);
  assert.equal(valWeekly, 164 * 3600 * 1000 + 27 * 60 * 1000 + 24 * 1000);
});

test("TDD S3: checkFallbackError extracts retry hint for oauth providers even if useUpstreamRetryHints is false", () => {
  const errorText =
    "Individual quota reached. Contact your administrator to enable overages. Resets in 5h.";
  const res = checkFallbackError(
    429,
    errorText,
    0,
    "gemini-3.5-flash",
    "antigravity", // which uses oauth provider profile (useUpstreamRetryHints: false)
    null
  );

  assert.equal(res.shouldFallback, true);
  assert.equal(res.usedUpstreamRetryHint, false);
  // Connection cooldown should be the default/scaled backoff cooldown (e.g. ~5000 ms) because useUpstreamRetryHints is false
  assert.notEqual(res.cooldownMs, 5 * 3600 * 1000);
  // But quotaResetHintMs MUST be the precise parsed reset time (5h = 18,000,000 ms)
  assert.equal(res.quotaResetHintMs, 5 * 3600 * 1000);
});
