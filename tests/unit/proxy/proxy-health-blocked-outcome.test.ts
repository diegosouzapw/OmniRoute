/**
 * A target that refuses the egress IP is not a healthy proxy (policy E).
 *
 * The probe classified any response under 500 as "ok", so a 401/403/429 from the
 * probe target — the shape a destination uses to refuse a banned or rate-limited
 * IP — was reported as a healthy proxy. The proxy did relay, so it is not
 * failing; but it is not serving that destination either, and "ok" hid that.
 *
 * `blocked` is deliberately NEUTRAL in the decision layer: one target refusing an
 * IP does not make the proxy dead, and the removal policy stays operator-owned.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { classifyProbeStatus, decideProxyHealthAction } =
  await import("../../../src/lib/proxyHealth/decision.ts");

// ─── classifyProbeStatus ───────────────────────────────

test("a target refusing the egress IP is blocked, not ok", () => {
  for (const status of [401, 403, 429]) {
    assert.equal(classifyProbeStatus(status), "blocked", `status ${status}`);
  }
});

test("a target that served the request is ok", () => {
  for (const status of [200, 204, 301, 400, 404]) {
    assert.equal(classifyProbeStatus(status), "ok", `status ${status}`);
  }
});

test("a 5xx from the target stays inconclusive — the proxy relayed fine", () => {
  for (const status of [500, 502, 503]) {
    assert.equal(classifyProbeStatus(status), "inconclusive", `status ${status}`);
  }
});

// ─── decideProxyHealthAction: policy E ─────────────────

test("blocked never counts as a failure and never touches status", () => {
  const d = decideProxyHealthAction({
    outcome: "blocked",
    priorFailures: 2,
    autoRemove: false,
    autoDisable: false,
    removeAfter: 3,
  });
  assert.deepEqual(d, { failures: 2, clearFailures: false, setStatus: null, remove: false });
});

test("blocked cannot remove or disable a proxy, even at the threshold with both flags on", () => {
  // The destructive path is the one that must never be reachable from `blocked`:
  // prior failures already sit at the threshold and both opt-ins are enabled, so
  // an outcome counted as a failure WOULD delete the proxy here.
  const d = decideProxyHealthAction({
    outcome: "blocked",
    priorFailures: 3,
    autoRemove: true,
    autoDisable: true,
    removeAfter: 3,
  });
  assert.equal(d.remove, false);
  assert.equal(d.setStatus, null);
  assert.equal(d.failures, 3, "the streak must be neither advanced nor reset");
});

test("blocked does not reset a failure streak the way ok does", () => {
  const blockedDecision = decideProxyHealthAction({
    outcome: "blocked",
    priorFailures: 2,
    autoRemove: true,
    autoDisable: false,
    removeAfter: 3,
  });
  const okDecision = decideProxyHealthAction({
    outcome: "ok",
    priorFailures: 2,
    autoRemove: true,
    autoDisable: false,
    removeAfter: 3,
  });
  assert.equal(blockedDecision.clearFailures, false);
  assert.equal(okDecision.clearFailures, true);
});

// ─── behaviour preservation for "Test All" ─────────────

test("alive keeps its exact prior meaning for every status", () => {
  // `/api/settings/proxies/auto-test` computed `alive = status < 500`. It now derives
  // it from the shared classifier; this asserts the two agree on the whole range, so
  // no proxy changes state under PROXY_HEALTH_AUTO_DEACTIVATE because of this PR.
  for (let status = 100; status < 600; status++) {
    const outcome = classifyProbeStatus(status);
    const alive = outcome === "ok" || outcome === "blocked";
    assert.equal(alive, status < 500, `status ${status}`);
  }
});

test("only the target-refusal statuses are flagged blocked across the whole range", () => {
  const flagged = [];
  for (let status = 100; status < 600; status++) {
    if (classifyProbeStatus(status) === "blocked") flagged.push(status);
  }
  assert.deepEqual(flagged, [401, 403, 429]);
});
