/**
 * Hang vs fail vs abort: a stalled handshake (resolved, TLS never
 * negotiated, our own deadline hit) is a `hang`, distinct from a frank
 * connection failure (`fail`) and from our own abort without those
 * conditions (`inconclusive`, today's behaviour, preserved).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { classifyProbeError } = await import("../../src/lib/proxyHealth/decision.ts");

test("local deadline + resolved + TLS never negotiated is a hang", () => {
  assert.equal(
    classifyProbeError({ aborted: true, resolved: true, tlsNegotiated: false }),
    "hang"
  );
});

test("local abort without the hang conditions stays inconclusive", () => {
  assert.equal(
    classifyProbeError({ aborted: true, resolved: false, tlsNegotiated: false }),
    "inconclusive"
  );
  assert.equal(
    classifyProbeError({ aborted: true, resolved: true, tlsNegotiated: true }),
    "inconclusive"
  );
});

test("a frank connection error is a fail, aborted or not", () => {
  assert.equal(
    classifyProbeError({ aborted: false, resolved: true, tlsNegotiated: false }),
    "fail"
  );
  assert.equal(
    classifyProbeError({ aborted: false, resolved: false, tlsNegotiated: false }),
    "fail"
  );
});
