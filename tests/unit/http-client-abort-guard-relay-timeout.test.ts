// 2026-10-02 production exit 7 — RELAY_TIMEOUT (stamped by
// open-sse/utils/proxyFetch.ts on the pooled relay path, #9100/#9158, when an
// attempt exceeds RELAY_FETCH_TIMEOUT_MS) escaped as an unhandledRejection /
// uncaughtException and the process crash guard re-threw it because it is not
// one of its benign classes. Same escape class as #12861
// (DIRECT_RESPONSE_START_TIMEOUT): the request layer already handles the error
// as a plain 504 / combo fallback, so a stray copy delivered to nobody must
// never be process-fatal.
import test from "node:test";
import assert from "node:assert/strict";
import {
  isClientAbortError,
  isRecoverableUpstreamTimeoutError,
  shouldSwallowUncaught,
} from "../../src/shared/utils/httpClientAbortGuard.mjs";

function relayTimeout(): Error & { code?: string; errorCode?: string; statusCode?: number } {
  // Exact production shape (open-sse/utils/proxyFetch.ts relay loop).
  return Object.assign(
    new Error("[ProxyFetch] Relay timed out after 25000ms (https://relay.example)"),
    { code: "RELAY_TIMEOUT", errorCode: "relay_timeout", statusCode: 504 }
  );
}

test("isRecoverableUpstreamTimeoutError recognizes the RELAY_TIMEOUT production shape", () => {
  assert.equal(isRecoverableUpstreamTimeoutError(relayTimeout()), true);
  // errorCode-only variant (lib/usage/glmResetCards.ts accepts the same pair).
  assert.equal(
    isRecoverableUpstreamTimeoutError(
      Object.assign(new Error("relay stalled"), { errorCode: "relay_timeout" })
    ),
    true
  );
  // A raw string abort reason rejects waiters with the string itself.
  assert.equal(isRecoverableUpstreamTimeoutError("RELAY_TIMEOUT"), true);
  assert.equal(isRecoverableUpstreamTimeoutError("relay_timeout"), true);
});

test("isRecoverableUpstreamTimeoutError still recognizes DIRECT_RESPONSE_START_TIMEOUT (#12861)", () => {
  assert.equal(
    isRecoverableUpstreamTimeoutError(
      Object.assign(new Error("Direct response did not start within 30000ms"), {
        code: "DIRECT_RESPONSE_START_TIMEOUT",
      })
    ),
    true
  );
  assert.equal(isRecoverableUpstreamTimeoutError("DIRECT_RESPONSE_START_TIMEOUT"), true);
});

test("isRecoverableUpstreamTimeoutError rejects unrelated errors", () => {
  assert.equal(isRecoverableUpstreamTimeoutError(new Error("boom")), false);
  assert.equal(
    isRecoverableUpstreamTimeoutError(Object.assign(new Error("x"), { code: "ECONNRESET" })),
    false
  );
  assert.equal(
    isRecoverableUpstreamTimeoutError(Object.assign(new Error("x"), { errorCode: "relay_timeou" })),
    false
  );
  assert.equal(isRecoverableUpstreamTimeoutError(null), false);
  assert.equal(isRecoverableUpstreamTimeoutError(undefined), false);
  assert.equal(isRecoverableUpstreamTimeoutError("a string, not an object"), false);
});

test("isRecoverableUpstreamTimeoutError does not overlap with isClientAbortError's codes", () => {
  const timeoutErr = relayTimeout();
  assert.equal(isClientAbortError(timeoutErr), false);
  assert.equal(isRecoverableUpstreamTimeoutError(timeoutErr), true);

  const abortErr = { code: "ECONNRESET" };
  assert.equal(isClientAbortError(abortErr), true);
  assert.equal(isRecoverableUpstreamTimeoutError(abortErr), false);
});

test("shouldSwallowUncaught swallows RELAY_TIMEOUT for both process-level origins", () => {
  const err = relayTimeout();
  assert.equal(shouldSwallowUncaught(err, "uncaughtException"), true);
  assert.equal(shouldSwallowUncaught(err, "unhandledRejection"), true);
  assert.equal(shouldSwallowUncaught(err, undefined), true);
});

test("shouldSwallowUncaught still surfaces genuine errors after the extension", () => {
  const genuineBug = new TypeError("Cannot read properties of undefined");
  assert.equal(shouldSwallowUncaught(genuineBug, "uncaughtException"), false);
  assert.equal(shouldSwallowUncaught(genuineBug, "unhandledRejection"), false);

  const unknownCode = Object.assign(new Error("mystery"), { code: "RELAY_TIMEOU" });
  assert.equal(shouldSwallowUncaught(unknownCode, "unhandledRejection"), false);
});

test("shouldSwallowUncaught still swallows the pre-existing benign classes (no regression)", () => {
  assert.equal(shouldSwallowUncaught(new Error("aborted"), "uncaughtException"), true);
  assert.equal(
    shouldSwallowUncaught(
      Object.assign(new Error("Direct response did not start within 30000ms"), {
        code: "DIRECT_RESPONSE_START_TIMEOUT",
      }),
      "unhandledRejection"
    ),
    true
  );
  assert.equal(
    shouldSwallowUncaught(
      Object.assign(new Error("hedge-cancelled"), { name: "AbortError" }),
      "unhandledRejection"
    ),
    true
  );
  assert.equal(
    shouldSwallowUncaught(Object.assign(new TypeError("fetch failed"), {}), "unhandledRejection"),
    true
  );
});
