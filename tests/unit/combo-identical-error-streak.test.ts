// Regression coverage for the identical-request-shape-error circuit breaker
// (combo.ts / comboPredicates.ts): a corrupted conversation history that one
// provider's protocol validation rejects with a 4xx "kind: model" error is
// certain to be rejected identically by every remaining fallback target,
// since the malformed payload itself — not the provider — is at fault.
// Without this breaker, production observed a single malformed request
// burning through all MAX_GLOBAL_ATTEMPTS (30) targets identically, taking
// 13+ minutes before the combo happened to reach a lenient-enough fallback
// or gave up.
import { test } from "node:test";
import assert from "node:assert/strict";

const { hasIdenticalModelErrorStreak, IDENTICAL_MODEL_ERROR_STREAK } = await import(
  "../../open-sse/services/combo/comboPredicates.ts"
);

function entry(overrides: Partial<{ status: number; error: string; kind: string }> = {}) {
  return {
    model: "gemini/gemini-3.1-flash-lite",
    status: 400,
    error: "[400]: Please ensure that function call turn comes immediately after a user turn or after a function response turn.",
    kind: "model",
    ...overrides,
  } as never;
}

test("false when fewer than the streak threshold have been attempted", () => {
  assert.equal(hasIdenticalModelErrorStreak([]), false);
  assert.equal(hasIdenticalModelErrorStreak([entry()]), false);
  assert.equal(
    hasIdenticalModelErrorStreak(Array.from({ length: IDENTICAL_MODEL_ERROR_STREAK - 1 }, () => entry())),
    false
  );
});

test("true once the last IDENTICAL_MODEL_ERROR_STREAK targets share status+error+kind", () => {
  const errors = Array.from({ length: IDENTICAL_MODEL_ERROR_STREAK }, () => entry());
  assert.equal(hasIdenticalModelErrorStreak(errors), true);
});

test("stays true once the streak is reached even with more matching entries after it", () => {
  const errors = Array.from({ length: IDENTICAL_MODEL_ERROR_STREAK + 2 }, () => entry());
  assert.equal(hasIdenticalModelErrorStreak(errors), true);
});

test("false when the tail is not all the same kind (a transient provider failure mixed in)", () => {
  const errors = [
    entry(),
    entry({ kind: "provider", status: 503, error: "[503]: upstream unavailable" }),
    entry(),
  ];
  assert.equal(hasIdenticalModelErrorStreak(errors), false);
});

test("false when the tail is not kind 'model' at all (e.g. every target rate-limited)", () => {
  const errors = Array.from({ length: IDENTICAL_MODEL_ERROR_STREAK }, () =>
    entry({ kind: "rate_limit", status: 429, error: "[429]: Provider returned error" })
  );
  assert.equal(hasIdenticalModelErrorStreak(errors), false);
});

test("false when the same status/kind repeats but with a genuinely different error message", () => {
  const errors = [
    entry({ error: "[400]: missing required field 'model'" }),
    entry({ error: "[400]: unknown tool 'foo'" }),
    entry({ error: "[400]: Please ensure that function call turn comes immediately after a user turn or after a function response turn." }),
  ];
  assert.equal(hasIdenticalModelErrorStreak(errors), false);
});

test("true even when an earlier, unrelated failure precedes the matching streak", () => {
  const errors = [
    entry({ kind: "auth", status: 401, error: "[401]: invalid api key" }),
    ...Array.from({ length: IDENTICAL_MODEL_ERROR_STREAK }, () => entry()),
  ];
  assert.equal(hasIdenticalModelErrorStreak(errors), true);
});

test("a custom streak length is honored", () => {
  const errors = Array.from({ length: 2 }, () => entry());
  assert.equal(hasIdenticalModelErrorStreak(errors, 2), true);
  assert.equal(hasIdenticalModelErrorStreak(errors, 3), false);
});
