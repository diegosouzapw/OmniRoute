import test from "node:test";
import assert from "node:assert/strict";

// Regression tests for the 2026-09-05 wedge incident: opencode h2 resets
// (ERR_HTTP2_STREAM_ERROR / UND_ERR_SOCKET) fanned out through every combo
// target (8 fallbacks / 18 decisions) because transport-class failures share
// the same egress. The bounded abort stops the combo after
// DEFAULT_TRANSPORT_ABORT_BOUND consecutive transport-class failures.
const {
  isTransportClassNetworkError,
  shouldAbortComboForTransportFailures,
  DEFAULT_TRANSPORT_ABORT_BOUND,
} = await import("../../open-sse/services/combo/comboPredicates.ts");

test("transport-class matcher: h2/socket/errno failures match", () => {
  const positives = [
    "[502]: fetch failed (cause: ERR_HTTP2_STREAM_ERROR: Stream closed with error code NGHTTP2_PROTOCOL_ERROR)",
    "[502]: terminated (cause: UND_ERR_SOCKET: other side closed)",
    "[502]: fetch failed (cause: ECONNRESET)",
    "socket hang up",
    "EADDRNOTAVAIL read error on egress",
  ];
  for (const text of positives) {
    assert.equal(isTransportClassNetworkError(text), true, `must match: ${text}`);
  }
});

test("transport-class matcher: quota/auth/body errors do NOT match", () => {
  const negatives = [
    "[429]: Weekly usage limit reached. Resets in 3 days.",
    "[403]: You have insufficient credits to make this request",
    "[400]: The reasoning_text in the thinking mode must be passed back to the API",
    "[503]: all targets were skipped by pre-dispatch filters",
  ];
  for (const text of negatives) {
    assert.equal(isTransportClassNetworkError(text), false, `must not match: ${text}`);
  }
});

test("bounded abort fires at the bound, not before", () => {
  assert.equal(DEFAULT_TRANSPORT_ABORT_BOUND >= 2, true, "bound must allow at least one fallback");
  assert.equal(shouldAbortComboForTransportFailures(DEFAULT_TRANSPORT_ABORT_BOUND - 1), false);
  assert.equal(shouldAbortComboForTransportFailures(DEFAULT_TRANSPORT_ABORT_BOUND), true);
  assert.equal(shouldAbortComboForTransportFailures(DEFAULT_TRANSPORT_ABORT_BOUND + 5), true);
  assert.equal(shouldAbortComboForTransportFailures(0), false);
});
