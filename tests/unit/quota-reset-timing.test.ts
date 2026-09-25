import test from "node:test";
import assert from "node:assert/strict";

import {
  buildErrorBody,
  errorResponse,
  parseRetryAfterHeader,
  resolveRetryAfterInstant,
  unavailableResponse,
} from "../../open-sse/utils/error.ts";
import { computeFixedWindowResetAt } from "../../src/shared/utils/rateLimiter.ts";

type TimedErrorBody = {
  error: {
    message: string;
    code?: string;
    retry_after?: number;
    reset_at?: string;
  };
};

function assertRetryFieldsNear(
  value: { retry_after: number; reset_at: string } | null,
  expectedResetMs: number,
  expectedSeconds: number
): void {
  assert.ok(value);
  assert.ok(
    Math.abs(Date.parse(value.reset_at) - expectedResetMs) <= 5,
    `${value.reset_at} should resolve near ${new Date(expectedResetMs).toISOString()}`
  );
  assert.ok(
    Math.abs(value.retry_after - expectedSeconds) <= 1,
    `${value.retry_after}s should be within one second of ${expectedSeconds}s`
  );
}

test("resolveRetryAfterInstant resolves each supported future hint shape", () => {
  const now = Date.now();
  const futureMs = now + 60_000;
  const futureIso = new Date(futureMs).toISOString();

  assertRetryFieldsNear(resolveRetryAfterInstant(futureIso), futureMs, 60);
  assertRetryFieldsNear(resolveRetryAfterInstant(new Date(futureMs)), futureMs, 60);
  assertRetryFieldsNear(resolveRetryAfterInstant(futureMs), futureMs, 60);

  const durationStartedAt = Date.now();
  const duration = resolveRetryAfterInstant(3_600);
  assert.ok(duration);
  assert.ok(duration.retry_after === 3_599 || duration.retry_after === 3_600);
  assert.ok(
    Math.abs(Date.parse(duration.reset_at) - (durationStartedAt + 3_600_000)) <= 20,
    duration.reset_at
  );
});

test("resolveRetryAfterInstant rejects missing, malformed, numeric-string, and elapsed hints", () => {
  const invalid: Array<string | number | Date | null | undefined> = [
    null,
    undefined,
    "",
    "3600",
    "not-a-date",
    Number.NaN,
    Number.POSITIVE_INFINITY,
    0,
    -1,
    new Date(Date.now() - 60_000),
    Date.now() - 60_000,
  ];

  for (const value of invalid) {
    assert.equal(resolveRetryAfterInstant(value), null, String(value));
  }
});

test("buildErrorBody emits timing fields only for a valid future reset", () => {
  const resetAt = new Date(Date.now() + 90_000).toISOString();
  const timed = buildErrorBody(429, "Daily budget exceeded", undefined, {
    code: "budget_exceeded",
    retryAfter: resetAt,
  }) as TimedErrorBody;

  assert.equal(timed.error.code, "budget_exceeded");
  assert.ok(timed.error.retry_after === 89 || timed.error.retry_after === 90);
  assert.equal(timed.error.reset_at, resetAt);

  for (const retryAfter of [null, "invalid", new Date(Date.now() - 60_000).toISOString()]) {
    const untimed = buildErrorBody(429, "Daily budget exceeded", undefined, {
      code: "budget_exceeded",
      retryAfter,
    }) as TimedErrorBody;
    assert.equal("retry_after" in untimed.error, false);
    assert.equal("reset_at" in untimed.error, false);
  }
});

test("errorResponse keeps Retry-After header and body timing in sync", async () => {
  const resetAt = new Date(Date.now() + 120_000).toISOString();
  const response = errorResponse(429, "Token limit exceeded", {
    code: "token_limit_exceeded",
    retryAfter: resetAt,
  });
  const body = (await response.json()) as TimedErrorBody;
  const header = Number(response.headers.get("Retry-After"));

  assert.ok(header === 119 || header === 120);
  assert.equal(header, body.error.retry_after);
  assert.equal(body.error.reset_at, resetAt);

  const untimed = errorResponse(429, "Token limit exceeded", {
    code: "token_limit_exceeded",
  });
  assert.equal(untimed.headers.get("Retry-After"), null);
  assert.equal("retry_after" in ((await untimed.json()) as TimedErrorBody).error, false);
});

test("unavailableResponse exposes reset timing in its body and preserves its legacy message", async () => {
  const resetMs = Date.now() + 180_000;
  const resetAt = new Date(resetMs).toISOString();
  // The first unavailableResponse call reads the RETRY_AFTER_PROVENANCE_ENABLED flag, which
  // lazily opens and migrates the test DB (seconds on a loaded runner). Bound retry_after by
  // the clock on both sides of the call instead of assuming the call is instantaneous.
  const calledAt = Date.now();
  const response = unavailableResponse(
    429,
    "All accounts are unavailable",
    resetAt,
    "reset after 3m"
  );
  const returnedAt = Date.now();
  const body = (await response.json()) as TimedErrorBody;

  assert.equal(body.error.message, "All accounts are unavailable (reset after 3m)");
  const retryAfter = body.error.retry_after ?? -1;
  assert.ok(
    retryAfter >= Math.floor((resetMs - returnedAt) / 1000) &&
      retryAfter <= Math.ceil((resetMs - calledAt) / 1000),
    `retry_after ${retryAfter} must match the reset instant measured around the call`
  );
  assert.equal(body.error.reset_at, resetAt);
  assert.ok(
    Math.abs(Number(response.headers.get("Retry-After")) - (body.error.retry_after ?? 0)) <= 1
  );
});

test("parseRetryAfterHeader resolves seconds and HTTP dates and rejects unusable values", () => {
  const secondsStartedAt = Date.now();
  const seconds = parseRetryAfterHeader(new Headers({ "Retry-After": "90" }));
  assert.ok(seconds);
  assert.ok(Math.abs(Date.parse(seconds) - (secondsStartedAt + 90_000)) <= 20);

  const httpDate = new Date(Math.ceil((Date.now() + 120_000) / 1000) * 1000).toUTCString();
  assert.equal(
    parseRetryAfterHeader(new Headers({ "Retry-After": httpDate })),
    new Date(httpDate).toISOString()
  );

  for (const value of [
    "0",
    "-1",
    "90garbage",
    "garbage",
    new Date(Date.now() - 60_000).toUTCString(),
  ]) {
    assert.equal(parseRetryAfterHeader(new Headers({ "Retry-After": value })), null, value);
  }
  assert.equal(parseRetryAfterHeader(new Headers()), null);
  assert.equal(parseRetryAfterHeader(null), null);
});

test("computeFixedWindowResetAt returns the next exact fixed-window boundary", () => {
  assert.equal(computeFixedWindowResetAt(3_601, 3_600), 7_200_000);
  assert.equal(computeFixedWindowResetAt(7_200, 3_600), 10_800_000);
});
