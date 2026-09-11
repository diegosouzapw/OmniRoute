// #12861 — the shared process-crash guard (already installed for the
// dev server and the WS/API-bridge servers) needs to also recognize the
// recoverable DIRECT_RESPONSE_START_TIMEOUT code so a stray escaped
// rejection from that path is swallowed and logged instead of taking the
// process down, exactly like a benign client-abort already is.
import test from "node:test";
import assert from "node:assert/strict";
import {
  isClientAbortError,
  isRecoverableUpstreamTimeoutError,
  shouldSwallowUncaught,
} from "../../src/shared/utils/httpClientAbortGuard.mjs";

test("isRecoverableUpstreamTimeoutError recognizes DIRECT_RESPONSE_START_TIMEOUT", () => {
  const err = Object.assign(new Error("Direct response did not start within 30000ms"), {
    code: "DIRECT_RESPONSE_START_TIMEOUT",
    name: "TimeoutError",
  });
  assert.equal(isRecoverableUpstreamTimeoutError(err), true);
});

test("isRecoverableUpstreamTimeoutError rejects unrelated error codes", () => {
  assert.equal(isRecoverableUpstreamTimeoutError(new Error("boom")), false);
  assert.equal(
    isRecoverableUpstreamTimeoutError(Object.assign(new Error("x"), { code: "ECONNRESET" })),
    false
  );
  assert.equal(isRecoverableUpstreamTimeoutError(null), false);
  assert.equal(isRecoverableUpstreamTimeoutError(undefined), false);
  assert.equal(isRecoverableUpstreamTimeoutError("a string, not an object"), false);
});

test("isRecoverableUpstreamTimeoutError does not overlap with isClientAbortError's own codes", () => {
  // These two predicates should classify disjoint sets of codes; a
  // DIRECT_RESPONSE_START_TIMEOUT is not a client abort and vice versa.
  const timeoutErr = { code: "DIRECT_RESPONSE_START_TIMEOUT" };
  assert.equal(isClientAbortError(timeoutErr), false);
  assert.equal(isRecoverableUpstreamTimeoutError(timeoutErr), true);

  const abortErr = { code: "ECONNRESET" };
  assert.equal(isClientAbortError(abortErr), true);
  assert.equal(isRecoverableUpstreamTimeoutError(abortErr), false);
});

test("shouldSwallowUncaught swallows DIRECT_RESPONSE_START_TIMEOUT for uncaughtException and unhandledRejection origins", () => {
  const err = Object.assign(new Error("timeout"), { code: "DIRECT_RESPONSE_START_TIMEOUT" });
  assert.equal(shouldSwallowUncaught(err, "uncaughtException"), true);
  assert.equal(shouldSwallowUncaught(err, "unhandledRejection"), true);
  assert.equal(shouldSwallowUncaught(err, undefined), true);
});

test("shouldSwallowUncaught still surfaces genuine errors (no code, no client-abort message)", () => {
  const genuineBug = new TypeError("Cannot read properties of undefined");
  assert.equal(shouldSwallowUncaught(genuineBug, "uncaughtException"), false);
  assert.equal(shouldSwallowUncaught(genuineBug, "unhandledRejection"), false);
});

test("shouldSwallowUncaught still swallows the original client-abort cases (no regression)", () => {
  const aborted = new Error("aborted");
  assert.equal(shouldSwallowUncaught(aborted, "uncaughtException"), true);

  const econnreset = Object.assign(new Error("socket hang up"), { code: "ECONNRESET" });
  assert.equal(shouldSwallowUncaught(econnreset, "unhandledRejection"), true);
});
