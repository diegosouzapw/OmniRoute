/**
 * TDD — #6246 proxy health regression (part 2, A+B+C).
 *
 * Before this fix the sweep marked a proxy `inactive` on the FIRST failed probe,
 * unconditionally, and treated any error (including our own timeout or the probe
 * TARGET being down) as a proxy failure. That flipped healthy paid proxies to
 * inactive, which then dropped them from egress selection ("my proxies are not
 * being used anymore").
 *
 * The decision is extracted into a pure, network-free function so it can be
 * unit-tested exhaustively:
 *   A — only downgrade after `removeAfter` CONSECUTIVE conclusive failures.
 *   B — an inconclusive probe (our timeout / probe-target error) never penalizes.
 *   C — by default (PROXY_AUTO_REMOVE off) the health check NEVER mutates status;
 *       it only counts/logs. Status downgrade happens only when auto-remove is on.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { decideProxyHealthAction } = await import("../../src/lib/proxyHealth/decision.ts");

test("C: default (autoRemove off) never mutates status on failure — only counts", () => {
  const d = decideProxyHealthAction({
    outcome: "fail",
    priorFailures: 0,
    autoRemove: false,
    removeAfter: 3,
  });
  assert.equal(d.setStatus, null, "must not downgrade status by default");
  assert.equal(d.remove, false);
  assert.equal(d.failures, 1, "still counts the failure for logging");
});

test("C: default (autoRemove off) never downgrades even after many failures", () => {
  const d = decideProxyHealthAction({
    outcome: "fail",
    priorFailures: 9,
    autoRemove: false,
    removeAfter: 3,
  });
  assert.equal(d.setStatus, null);
  assert.equal(d.remove, false);
  assert.equal(d.failures, 10);
});

test("A: with autoRemove on, does NOT downgrade before the consecutive threshold", () => {
  const d = decideProxyHealthAction({
    outcome: "fail",
    priorFailures: 1, // this probe makes it 2, threshold is 3
    autoRemove: true,
    removeAfter: 3,
  });
  assert.equal(d.setStatus, null, "2 < 3 failures must not flip inactive");
  assert.equal(d.remove, false);
  assert.equal(d.failures, 2);
});

test("A: with autoRemove on, downgrades + removes at the consecutive threshold", () => {
  const d = decideProxyHealthAction({
    outcome: "fail",
    priorFailures: 2, // this probe makes it 3 == threshold
    autoRemove: true,
    removeAfter: 3,
  });
  assert.equal(d.setStatus, "inactive");
  assert.equal(d.remove, true);
  assert.equal(d.failures, 3);
});

test("B: an inconclusive probe never penalizes (no count bump, no status change)", () => {
  const d = decideProxyHealthAction({
    outcome: "inconclusive",
    priorFailures: 2,
    autoRemove: true,
    removeAfter: 3,
  });
  assert.equal(d.setStatus, null, "inconclusive must not touch status");
  assert.equal(d.remove, false);
  assert.equal(d.failures, 2, "failure streak is preserved, not incremented");
  assert.equal(d.clearFailures, false);
});

test("ok: resets the failure streak; re-activates only when autoRemove manages status", () => {
  const onAuto = decideProxyHealthAction({
    outcome: "ok",
    priorFailures: 2,
    autoRemove: true,
    removeAfter: 3,
  });
  assert.equal(onAuto.clearFailures, true);
  assert.equal(onAuto.setStatus, "active");
  assert.equal(onAuto.failures, 0);

  const offAuto = decideProxyHealthAction({
    outcome: "ok",
    priorFailures: 2,
    autoRemove: false,
    removeAfter: 3,
  });
  assert.equal(offAuto.clearFailures, true);
  assert.equal(offAuto.setStatus, null, "default mode never touches user-controlled status");
  assert.equal(offAuto.failures, 0);
});
