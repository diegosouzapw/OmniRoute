import { test } from "node:test";
import assert from "node:assert/strict";
import { isModelCapacityOverloadError } from "../../../src/shared/utils/circuitBreaker.ts";
import {
  shouldTripProviderBreakerForResult,
  classifyProviderBreakerResult,
} from "../../../src/sse/handlers/chatPredicates.ts";
import { shouldRecordProviderBreakerFailure } from "../../../open-sse/services/combo/comboPredicates.ts";

/**
 * Live incident 2026-09-03 (X500 offical-fable): Anthropic returned
 * STREAM_EARLY_EOF wrapping "Overloaded" as HTTP 502. That 502 opened the
 * whole-provider `claude` breaker. The single-target combo then pre-skipped
 * with ALL_TARGETS_SKIPPED in ~43ms even though the account, pin, and quota
 * were healthy. Model capacity (529 / Overloaded) is not a provider outage.
 */

const OTHER_COMBO_ARGS = {
  isStreamReadinessFailure: false,
  sameProviderNext: false,
  skipProviderBreaker: false,
  requestScopedFailure: false,
} as const;

const LIVE_EOF_OVERLOADED = "Stream ended before producing a non-ping SSE event: Overloaded";
const PLAIN_EOF = "Stream ended before producing a non-ping SSE event";

test("isModelCapacityOverloadError: live STREAM_EARLY_EOF Overloaded text", () => {
  assert.equal(isModelCapacityOverloadError(LIVE_EOF_OVERLOADED), true);
});

test("isModelCapacityOverloadError: bare Overloaded / HTTP 529", () => {
  assert.equal(isModelCapacityOverloadError("Overloaded"), true);
  assert.equal(isModelCapacityOverloadError("[529]: Overloaded"), true);
  assert.equal(isModelCapacityOverloadError(529), true);
  assert.equal(isModelCapacityOverloadError({ message: "overloaded_error" }), true);
});

test("isModelCapacityOverloadError: a plain early EOF is NOT capacity", () => {
  assert.equal(isModelCapacityOverloadError(PLAIN_EOF), false);
  assert.equal(isModelCapacityOverloadError("502 Bad Gateway"), false);
  assert.equal(isModelCapacityOverloadError(null), false);
  assert.equal(isModelCapacityOverloadError(undefined), false);
});

test("combo: STREAM_EARLY_EOF Overloaded 502 does NOT record a whole-provider breaker failure", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({
      ...OTHER_COMBO_ARGS,
      isStreamReadinessFailure: true,
      isStreamEarlyEof: true,
      status: 502,
      error: LIVE_EOF_OVERLOADED,
    }),
    false
  );
});

test("combo: a plain STREAM_EARLY_EOF 502 still records a breaker failure", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({
      ...OTHER_COMBO_ARGS,
      isStreamReadinessFailure: true,
      isStreamEarlyEof: true,
      status: 502,
      error: PLAIN_EOF,
    }),
    true
  );
});

test("combo: HTTP 529 Overloaded does not record even if someone later adds 529 to the status set", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({
      ...OTHER_COMBO_ARGS,
      status: 529,
      error: "[529]: Overloaded",
    }),
    false
  );
});

test("combo: HTTP 529 status alone does not record a breaker failure", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({
      ...OTHER_COMBO_ARGS,
      status: 529,
      error: "upstream error",
    }),
    false
  );
});

test("combo: a genuine 502 without Overloaded still records", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({
      ...OTHER_COMBO_ARGS,
      status: 502,
      error: "upstream error",
    }),
    true
  );
});

test("single-model: STREAM_EARLY_EOF Overloaded 502 does NOT trip the provider breaker", () => {
  assert.equal(
    shouldTripProviderBreakerForResult(
      {
        status: 502,
        errorCode: "STREAM_EARLY_EOF",
        errorType: "stream_early_eof",
        error: LIVE_EOF_OVERLOADED,
      },
      false,
      false
    ),
    false
  );
});

test("single-model: a genuine 502 without Overloaded still trips", () => {
  assert.equal(
    shouldTripProviderBreakerForResult(
      { status: 502, errorCode: null, errorType: null, error: "upstream error" },
      false,
      false
    ),
    true
  );
});

test("single-model: HTTP 529 does not trip", () => {
  assert.equal(
    shouldTripProviderBreakerForResult(
      { status: 529, errorCode: null, errorType: null, error: "Overloaded" },
      false,
      false
    ),
    false
  );
});

test("classifyProviderBreakerResult: Overloaded 502 on the single-model path is ignore", () => {
  assert.equal(
    classifyProviderBreakerResult(
      {
        success: false,
        status: 502,
        errorCode: "STREAM_EARLY_EOF",
        errorType: "stream_early_eof",
        error: LIVE_EOF_OVERLOADED,
      },
      false,
      false
    ),
    "ignore"
  );
});

test("classifyProviderBreakerResult: Overloaded 529 on the single-model path is ignore", () => {
  assert.equal(
    classifyProviderBreakerResult(
      { success: false, status: 529, errorCode: null, errorType: null, error: "Overloaded" },
      false,
      false
    ),
    "ignore"
  );
});
