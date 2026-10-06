/**
 * PROXY_AUTO_DISABLE — non-destructive sibling of PROXY_AUTO_REMOVE (#6246 policy D).
 *
 * Mirrors tests/unit/proxy-health-decide-action-6246.test.ts. Where that suite
 * covers the existing autoRemove-only behavior (untouched here), this suite
 * covers the new `autoDisable` input: same consecutive-failure threshold, but
 * the action at threshold is a soft `status: "dead"` write instead of deletion,
 * and recovery re-activates exactly like autoRemove's does.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { decideProxyHealthAction } = await import("../../src/lib/proxyHealth/decision.ts");

test("D: default (autoDisable off, autoRemove off) never mutates status on failure", () => {
  const d = decideProxyHealthAction({
    outcome: "fail",
    priorFailures: 0,
    autoRemove: false,
    autoDisable: false,
    removeAfter: 3,
  });
  assert.equal(d.setStatus, null);
  assert.equal(d.remove, false);
  assert.equal(d.failures, 1);
});

test("D: with autoDisable on, does NOT downgrade before the consecutive threshold", () => {
  const d = decideProxyHealthAction({
    outcome: "fail",
    priorFailures: 1, // this probe makes it 2, threshold is 3
    autoRemove: false,
    autoDisable: true,
    removeAfter: 3,
  });
  assert.equal(d.setStatus, null, "2 < 3 failures must not flip dead");
  assert.equal(d.remove, false);
  assert.equal(d.failures, 2);
});

test("D: with autoDisable on, soft-disables (status=dead) at the threshold — never removes", () => {
  const d = decideProxyHealthAction({
    outcome: "fail",
    priorFailures: 2, // this probe makes it 3 == threshold
    autoRemove: false,
    autoDisable: true,
    removeAfter: 3,
  });
  assert.equal(d.setStatus, "dead");
  assert.equal(d.remove, false, "auto-disable must never delete the proxy row");
  assert.equal(d.failures, 3);
});

test("D: when both autoRemove and autoDisable are on, the destructive action wins", () => {
  const d = decideProxyHealthAction({
    outcome: "fail",
    priorFailures: 2,
    autoRemove: true,
    autoDisable: true,
    removeAfter: 3,
  });
  assert.equal(d.setStatus, "inactive");
  assert.equal(d.remove, true, "auto-remove takes precedence when both flags are set");
});

test("D: ok probe re-activates a proxy that autoDisable manages, and resets the streak", () => {
  const d = decideProxyHealthAction({
    outcome: "ok",
    priorFailures: 5,
    autoRemove: false,
    autoDisable: true,
    removeAfter: 3,
  });
  assert.equal(d.clearFailures, true);
  assert.equal(d.setStatus, "active", "recovery flips a soft-disabled proxy back to active");
  assert.equal(d.failures, 0);
});

test("D: inconclusive probes stay neutral under autoDisable, same as under autoRemove", () => {
  const d = decideProxyHealthAction({
    outcome: "inconclusive",
    priorFailures: 2,
    autoRemove: false,
    autoDisable: true,
    removeAfter: 3,
  });
  assert.equal(d.setStatus, null);
  assert.equal(d.remove, false);
  assert.equal(d.failures, 2);
  assert.equal(d.clearFailures, false);
});

test("D: autoDisable defaults to false when omitted — behaves exactly like pre-existing callers", () => {
  const d = decideProxyHealthAction({
    outcome: "fail",
    priorFailures: 2,
    autoRemove: false,
    removeAfter: 3,
  });
  assert.equal(d.setStatus, null, "omitting autoDisable must not silently opt in");
  assert.equal(d.remove, false);
});
