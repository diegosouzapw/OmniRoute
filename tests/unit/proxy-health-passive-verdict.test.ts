/**
 * Passive verdict from production traffic: unit cover for the attribution
 * mapping and the ternary fold. Every branch of the mapping is pinned:
 * proxy-fault errors degrade, ambiguous/transient/refusal rows stay neutral.
 */
import test from "node:test";
import assert from "node:assert/strict";

const {
  decidePassiveVerdict,
  getCachedPassiveVerdict,
  isProxyAttributedFailure,
  passiveVerdictKey,
  resolvePassiveCacheTtlMs,
  resolvePassiveWindowMs,
  setCachedPassiveVerdict,
  __resetPassiveVerdictCacheForTesting,
} = await import("../../src/lib/proxyHealth/passiveVerdict.ts");

test("attributed: connection refused degrades", () => {
  assert.equal(isProxyAttributedFailure({ error: "connect ECONNREFUSED 10.0.0.1:8080" }), true);
});

test("attributed: DNS failure degrades", () => {
  assert.equal(isProxyAttributedFailure({ error: "getaddrinfo ENOTFOUND proxy.local" }), true);
});

test("attributed: stalled handshake degrades", () => {
  assert.equal(isProxyAttributedFailure({ error: "socket hang up" }), true);
});

test("neutral: reset connection is never attributed", () => {
  assert.equal(isProxyAttributedFailure({ error: "read ECONNRESET" }), false);
});

test("neutral: transient timeout is never attributed", () => {
  assert.equal(isProxyAttributedFailure({ error: "connect ETIMEDOUT 10.0.0.1:8080" }), false);
});

test("neutral: any upstream answer means the proxy relayed", () => {
  assert.equal(
    isProxyAttributedFailure({ error: "connect ECONNREFUSED x", upstream_status: 500 }),
    false
  );
  assert.equal(
    isProxyAttributedFailure({ error: "connect ECONNREFUSED x", upstream_status: 429 }),
    false
  );
});

test("neutral: refused rows and refusal statuses stay neutral", () => {
  assert.equal(isProxyAttributedFailure({ status: "blocked" }), false);
  assert.equal(isProxyAttributedFailure({ status: "refused-by-target" }), false);
  assert.equal(isProxyAttributedFailure({ status: "429" }), false);
});

test("neutral: empty error with no answer proves nothing", () => {
  assert.equal(isProxyAttributedFailure({}), false);
});

test("verdict: consecutive attributed failures degrade", () => {
  const row = { status: "error", error: "connect ECONNREFUSED 10.0.0.1:8080" };
  assert.equal(decidePassiveVerdict({ rows: [row, row, row] }), "degraded");
});

test("verdict: fewer failures than the threshold stay unknown", () => {
  const row = { status: "error", error: "connect ECONNREFUSED 10.0.0.1:8080" };
  assert.equal(decidePassiveVerdict({ rows: [row, row] }), "unknown");
});

test("verdict: recent success is healthy", () => {
  assert.equal(decidePassiveVerdict({ rows: [{ status: "success" }] }), "healthy");
});

test("verdict: abandoned sends prove nothing", () => {
  assert.equal(
    decidePassiveVerdict({ rows: [{ status: "error", attempt_issue: "abandoned" }] }),
    "unknown"
  );
});

test("verdict: empty window is unknown", () => {
  assert.equal(decidePassiveVerdict({ rows: [] }), "unknown");
});

test("verdict: success resets the failure streak", () => {
  const fail = { status: "error", error: "connect ECONNREFUSED 10.0.0.1:8080" };
  const ok = { status: "success" };
  assert.equal(decidePassiveVerdict({ rows: [fail, fail, ok, fail, fail] }), "unknown");
});

test("key: endpoint", () => {
  assert.equal(passiveVerdictKey("h", 8080), "h:8080");
});

test("env: window defaults under the sweep interval, ttl under the window", () => {
  const windowMs = resolvePassiveWindowMs({});
  assert.ok(windowMs >= 60_000 && windowMs < 600_000);
  assert.equal(resolvePassiveWindowMs({ PROXY_PASSIVE_WINDOW_MS: "99999999" }) < 600_000, true);
  const ttlMs = resolvePassiveCacheTtlMs({});
  assert.ok(ttlMs >= 10_000 && ttlMs < windowMs);
});

test("cache: fresh hit, stale miss", () => {
  __resetPassiveVerdictCacheForTesting();
  try {
    setCachedPassiveVerdict("k", "degraded", ["acme"], 1000);
    assert.deepEqual(getCachedPassiveVerdict("k", 60_000, 2000), {
      verdict: "degraded",
      providers: ["acme"],
    });
    assert.equal(getCachedPassiveVerdict("k", 60_000, 1000 + 60_000), null);
  } finally {
    __resetPassiveVerdictCacheForTesting();
  }
});
