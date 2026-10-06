// #12861 — the shared process-crash guard (already installed for the
// dev server and the WS/API-bridge servers) needs to also recognize the
// recoverable DIRECT_RESPONSE_START_TIMEOUT code so a stray escaped
// rejection from that path is swallowed and logged instead of taking the
// process down, exactly like a benign client-abort already is.
import test from "node:test";
import assert from "node:assert/strict";
import {
  isClientAbortError,
  isIntentionalComboAbort,
  isRecoverableUpstreamTimeoutError,
  isUpstreamNetworkError,
  shouldSwallowUncaught,
} from "../../src/shared/utils/httpClientAbortGuard.mjs";

test("isRecoverableUpstreamTimeoutError recognizes DIRECT_RESPONSE_START_TIMEOUT", () => {
  const err = Object.assign(new Error("Direct response did not start within 30000ms"), {
    code: "DIRECT_RESPONSE_START_TIMEOUT",
    name: "TimeoutError",
  });
  assert.equal(isRecoverableUpstreamTimeoutError(err), true);
  // A raw string abort reason rejects waiters with the string itself.
  assert.equal(isRecoverableUpstreamTimeoutError("DIRECT_RESPONSE_START_TIMEOUT"), true);
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

test("isIntentionalComboAbort recognizes hedge-cancelled aborts (message and cause variants)", () => {
  const byMessage = Object.assign(new Error("hedge-cancelled"), { name: "AbortError" });
  assert.equal(isIntentionalComboAbort(byMessage), true);

  const byCause = Object.assign(new Error("This operation was aborted"), {
    name: "AbortError",
    cause: "hedge-cancelled",
  });
  assert.equal(isIntentionalComboAbort(byCause), true);

  const perModelTimeout = Object.assign(new Error("combo-per-model-timeout"), {
    name: "AbortError",
  });
  assert.equal(isIntentionalComboAbort(perModelTimeout), true);
});

test("isIntentionalComboAbort rejects client aborts with unknown reasons", () => {
  const clientGone = Object.assign(new Error("request_signal_aborted"), { name: "AbortError" });
  assert.equal(isIntentionalComboAbort(clientGone), false);
  assert.equal(isIntentionalComboAbort(new Error("hedge-cancelled")), false);
  assert.equal(isIntentionalComboAbort(null), false);
});

test("isIntentionalComboAbort accepts a bare string abort reason", () => {
  // AbortSignal.reason is whatever was handed to abort(); a raw string reason
  // rejects waiters with the string itself, not an Error object.
  assert.equal(isIntentionalComboAbort("hedge-cancelled"), true);
  assert.equal(isIntentionalComboAbort("combo-per-model-timeout"), true);
  assert.equal(isIntentionalComboAbort("client-gone"), false);
  assert.equal(isIntentionalComboAbort(""), false);
});

test("isUpstreamNetworkError recognizes fetch failures and proxy unreachable", () => {
  const fetchFailed = Object.assign(new TypeError("fetch failed"), {
    cause: Object.assign(new Error("socket disconnected"), { code: "ECONNRESET" }),
  });
  assert.equal(isUpstreamNetworkError(fetchFailed), true);

  const proxyUnreachable = Object.assign(new TypeError("fetch failed"), {
    code: "PROXY_UNREACHABLE",
  });
  assert.equal(isUpstreamNetworkError(proxyUnreachable), true);

  const undiciSocket = Object.assign(new Error("other side closed"), { code: "UND_ERR_SOCKET" });
  assert.equal(isUpstreamNetworkError(undiciSocket), true);
});

test("isUpstreamNetworkError rejects genuine errors", () => {
  assert.equal(isUpstreamNetworkError(new TypeError("Cannot read properties of undefined")), false);
  assert.equal(isUpstreamNetworkError(new Error("fetch failedish")), false);
  assert.equal(isUpstreamNetworkError(null), false);
  assert.equal(isUpstreamNetworkError("a string"), false);
});

test("shouldSwallowUncaught swallows the 2026-09-14 agnes-storm crash shapes", () => {
  // 06:11:04 exit 7: hedge cancellation escaped while the sibling leg won.
  const hedge = Object.assign(new Error("hedge-cancelled"), { name: "AbortError" });
  assert.equal(shouldSwallowUncaught(hedge, "uncaughtException"), true);
  assert.equal(shouldSwallowUncaught(hedge, "unhandledRejection"), true);

  // 06:27:38 exit 7: undici fetch failure against a flapping upstream.
  const fetchFailed = Object.assign(new TypeError("fetch failed"), {
    code: "PROXY_UNREACHABLE",
  });
  assert.equal(shouldSwallowUncaught(fetchFailed, "uncaughtException"), true);
  assert.equal(shouldSwallowUncaught(fetchFailed, "unhandledRejection"), true);
});

test("shouldSwallowUncaught still surfaces genuine bugs after the extension", () => {
  const genuineBug = new TypeError("Cannot read properties of undefined");
  assert.equal(shouldSwallowUncaught(genuineBug, "uncaughtException"), false);

  const unknownAbort = Object.assign(new Error("mystery"), { name: "AbortError" });
  assert.equal(shouldSwallowUncaught(unknownAbort, "unhandledRejection"), false);
});
