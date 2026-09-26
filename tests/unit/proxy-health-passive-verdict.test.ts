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
  isPassiveSweepSkipEnabled,
  isProxyAttributedFailure,
  MAX_PASSIVE_VERDICT_ENTRIES,
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
  assert.equal(isProxyAttributedFailure({ error: "getaddrinfo EAI_AGAIN proxy.local" }), true);
});

test("attributed: unreachable host or network degrades", () => {
  assert.equal(isProxyAttributedFailure({ error: "connect EHOSTUNREACH 10.0.0.1:8080" }), true);
  assert.equal(isProxyAttributedFailure({ error: "connect ENETUNREACH 10.0.0.1:8080" }), true);
  assert.equal(isProxyAttributedFailure({ error: "read ENOTCONN on proxy socket" }), true);
  assert.equal(isProxyAttributedFailure({ error: "connect EHOSTDOWN 10.0.0.1:8080" }), true);
  assert.equal(isProxyAttributedFailure({ error: "connect ENETDOWN 10.0.0.1:8080" }), true);
});

test("attributed: coded proxy-leg socket death degrades", () => {
  assert.equal(
    isProxyAttributedFailure({ error: "proxy socket ERR_SOCKET_CLOSED after CONNECT" }),
    true
  );
  assert.equal(
    isProxyAttributedFailure({ error: "proxy socket ERR_SOCKET_TIMEOUT after CONNECT" }),
    true
  );
});

test("attributed: stalled handshake degrades", () => {
  assert.equal(isProxyAttributedFailure({ error: "socket hang up" }), true);
});

test("neutral: bare provider-side wording never blames the proxy", () => {
  assert.equal(
    isProxyAttributedFailure({ error: "upstream TLS error: provider cert expired" }),
    false
  );
  assert.equal(
    isProxyAttributedFailure({ error: "DNS resolution timed out at local resolver" }),
    false
  );
  assert.equal(isProxyAttributedFailure({ error: "handshake stalled with upstream" }), false);
  assert.equal(isProxyAttributedFailure({ error: "fetch failed: provider returned 502" }), false);
});

test("neutral: coded upstream TLS faults never blame the proxy", () => {
  assert.equal(
    isProxyAttributedFailure({ error: "CERT_HAS_EXPIRED for provider endpoint" }),
    false
  );
  assert.equal(
    isProxyAttributedFailure({ error: "ERR_TLS_CERT_ALTNAME_INVALID on upstream host" }),
    false
  );
  assert.equal(isProxyAttributedFailure({ error: "TLSV1_ALERT_unknown_ca from upstream" }), false);
  assert.equal(isProxyAttributedFailure({ error: "socket ERR_SOCKET error" }), false);
});

test("attributed: fetch failed with a bounded proxy code still degrades", () => {
  assert.equal(
    isProxyAttributedFailure({ error: "fetch failed: connect ECONNREFUSED 10.0.0.1" }),
    true
  );
});

test("neutral: broken pipe is never attributed", () => {
  assert.equal(isProxyAttributedFailure({ error: "write EPIPE on proxy socket" }), false);
});

test("neutral: aborted connection is never attributed", () => {
  assert.equal(isProxyAttributedFailure({ error: "connect ECONNABORTED 10.0.0.1:8080" }), false);
});

test("neutral: generic network error is never attributed", () => {
  assert.equal(isProxyAttributedFailure({ error: "fetch ERR_NETWORK from endpoint" }), false);
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

test("flag: passive sweep skip is opt-in, off by default", () => {
  assert.equal(isPassiveSweepSkipEnabled({}), false);
  assert.equal(isPassiveSweepSkipEnabled({ PROXY_HEALTH_PASSIVE_SKIP: "true" }), true);
  assert.equal(isPassiveSweepSkipEnabled({ PROXY_HEALTH_PASSIVE_SKIP: "false" }), false);
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

test("cache: bounded at MAX_PASSIVE_VERDICT_ENTRIES, oldest evicted first", () => {
  __resetPassiveVerdictCacheForTesting();
  try {
    for (let i = 0; i < MAX_PASSIVE_VERDICT_ENTRIES + 1; i++) {
      setCachedPassiveVerdict(`endpoint-${i}`, "healthy", ["acme"], 1000 + i);
    }
    assert.equal(getCachedPassiveVerdict("endpoint-0", 60_000, 2000), null);
    assert.deepEqual(
      getCachedPassiveVerdict(`endpoint-${MAX_PASSIVE_VERDICT_ENTRIES}`, 60_000, 2000),
      {
        verdict: "healthy",
        providers: ["acme"],
      }
    );
  } finally {
    __resetPassiveVerdictCacheForTesting();
  }
});
