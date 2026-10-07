/**
 * tests/unit/circuit-breaker-local-execution.test.ts
 *
 * Tests for local process execution error isolation:
 * Local host execution faults (e.g. spawn ENOENT, binary missing, EPIPE, exit codes)
 * must be identified via `isLocalExecutionError` and prevented from tripping provider-wide
 * circuit breakers or marking provider connections/accounts as disabled.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { isLocalExecutionError } from "../../src/shared/utils/circuitBreaker.ts";
import { shouldTripProviderBreakerForResult } from "../../src/sse/handlers/chatPredicates.ts";
import {
  shouldRecordProviderBreakerFailure,
  shouldSkipConnDisable,
} from "../../open-sse/services/combo/comboPredicates.ts";

test("isLocalExecutionError: correctly identifies system spawn and process errors", () => {
  assert.equal(isLocalExecutionError({ code: "ENOENT" }), true);
  assert.equal(isLocalExecutionError({ code: "EACCES" }), true);
  assert.equal(isLocalExecutionError({ code: "EPIPE" }), true);
  assert.equal(isLocalExecutionError({ code: "ERR_CHILD_PROCESS_STDIO_MAXBUFFER" }), true);

  assert.equal(isLocalExecutionError(new Error("spawn ollama ENOENT")), true);
  assert.equal(isLocalExecutionError("command not found: llama-cli"), true);
  assert.equal(isLocalExecutionError("child process exited with code 1"), true);
  assert.equal(isLocalExecutionError("local host execution error: process killed"), true);

  assert.equal(isLocalExecutionError(new Error("502 Bad Gateway")), false);
  assert.equal(isLocalExecutionError({ code: "ECONNREFUSED" }), false);
  assert.equal(isLocalExecutionError(null), false);
  assert.equal(isLocalExecutionError(undefined), false);
});

test("shouldTripProviderBreakerForResult: local execution error does NOT trip single-model breaker", () => {
  const result = {
    status: 500,
    error: new Error("spawn llama-cli ENOENT"),
  };
  assert.equal(shouldTripProviderBreakerForResult(result, false, false), false);
});

test("shouldRecordProviderBreakerFailure: local execution error does NOT record failure for combo breaker", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: false,
      status: 500,
      sameProviderNext: false,
      error: new Error("spawn python ENOENT"),
    }),
    false
  );
});

test("shouldSkipConnDisable: local execution error skips disabling provider connection", () => {
  const result = {
    status: 500,
    error: { code: "ENOENT" },
  };
  assert.equal(shouldSkipConnDisable(result, false, false, "local-provider"), true);
});
