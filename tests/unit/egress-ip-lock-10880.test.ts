// #10880 — egress-bucketed cooldown: when an allowlisted provider (opencode,
// opencode-go, opencode-cli) confirms quota_exhausted OR rate_limit_exceeded,
// markAccountUnavailable cools down the failing connection C AND every sibling
// sharing C's last known egress IP BEFORE they are tried (N-1 wasted upstream
// calls avoided — same shape as #10460/#10525). The first section pins the
// BRANCH-INVARIANT behavior: sibling marking, terminal-sibling safety,
// unique-IP isolation, C written by the branch itself, disableCooling bypass,
// and both accepted reasons. The second section pins the WIRING-LEVEL
// contract with a rotation replica of chat.ts step 8 that always walks the
// whole pool: ONE upstream call when three connections share an egress IP,
// against THREE for the same pool on a non-allowlisted provider (the paired
// counter-test — the 1-vs-3 gap is the measurement; a lone "=== 1" would also
// pass on a loop that stops early), and ONE on the combo path too. Plus
// non-regression guards (account-scoped 401/403 rotation preserved,
// agentrouter exclusivity, out-of-allowlist providers, unresolvable egress IP,
// longer sibling cooldowns never shortened, allowlist position guard,
// cross-provider isolation).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #10460/#10525: DATA_DIR must be assigned BEFORE any transitive DB import —
// core.ts captures resolveWritableDataDir at module-load time.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-egress-lock-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");
const auth = await import("../../src/sse/services/auth.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");

// Real opencode 429 envelopes (providerErrorRules.ts:67-72). On the
// markAccountUnavailable path no headers/structuredError reach
// checkFallbackError and opencode is not in FULL_TEXT_RULE_PROVIDERS, so the
// opencode-specific rules never match. Verified empirically: the first body
// is intercepted by the subscription-quota text fallback
// (quotaTextCooldowns.ts — "usage limit reached" is a substring of "monthly
// usage limit reached") → quota_exhausted with a 1h cooldown and no
// newBackoffLevel; the second matches the global "quota_has_been_exceeded"
// text rule → quota_exhausted with a scaled backoff. The RATE_LIMIT_EXCEEDED
// arm of the branch stays live for allowlisted siblings whose envelopes
// carry no quota text (e.g. "rate limit reached"). Both bodies prove the
// predicate accepts quota_exhausted; the branch is additionally guarded for
// rate_limit_exceeded in auth.ts.
const REAL_OPENCODE_429 = '{"error":{"message":"monthly usage limit reached"}}';
const QUOTA_EXHAUSTED_429 = '{"error":{"message":"quota has been exceeded"}}';

const SHARED_EGRESS_IP = "203.0.113.9";
const OTHER_EGRESS_IP = "203.0.113.88";

let seedSeq = 0;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

// #3023 apikey dedup: createProviderConnection merges on key VALUE, so each
// seeded connection needs its own key — the agentrouter fixture's shared key
// would collapse 3 seeds into 1 row.
async function seedConnection(
  provider: string,
  overrides: Record<string, unknown> = {}
): Promise<string> {
  const conn = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    apiKey: `${provider}-key-${++seedSeq}`,
    isActive: true,
    testStatus: "active",
    ...overrides,
  });
  return (conn as Record<string, unknown>).id as string;
}

function seedProxyLog(connectionId: string, egressIp: string, provider: string = "opencode") {
  proxyLogger.logProxyEvent({
    status: "success",
    provider,
    targetUrl: "https://api.opencode.ai/chat",
    egressIp,
    connectionId,
  });
  // logProxyEvent only ENQUEUES the row for the 1s/100-entry background batch
  // (proxyLogger.ts:enqueueProxyLog). The egress-lock lookup that follows reads
  // proxy_logs synchronously, so without an explicit flush the row is not yet on
  // disk and the sibling-egress-IP resolution finds nothing — a timing race that
  // makes the whole suite flaky (it happens to pass only when the batch timer
  // fires in the gap). Flush synchronously so the seeded egress IP is durable
  // before markAccountUnavailable() reads it.
  proxyLogger.flushProxyLogsSync();
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("siblings sharing the egress IP are cooled down with the same cooldown", async () => {
  await resetStorage();
  const connA = await seedConnection("opencode");
  const connB = await seedConnection("opencode");
  const connC = await seedConnection("opencode");
  seedProxyLog(connA, SHARED_EGRESS_IP);
  seedProxyLog(connB, SHARED_EGRESS_IP);
  seedProxyLog(connC, SHARED_EGRESS_IP);

  // Body = the REAL opencode 429 envelope ("monthly usage limit reached").
  // Verified empirically: on this path it is intercepted by the
  // subscription-quota text fallback → quota_exhausted (1h window), which
  // the branch accepts by design — exactly the production case.
  const result = await auth.markAccountUnavailable(
    connA,
    429,
    REAL_OPENCODE_429,
    "opencode",
    "model-x",
    null,
    {}
  );
  assert.equal(result.shouldFallback, true);
  const [b, c] = await Promise.all([
    providersDb.getProviderConnectionById(connB),
    providersDb.getProviderConnectionById(connC),
  ]);
  assert.ok(new Date(String(b!.rateLimitedUntil)).getTime() > Date.now(), "sibling B cooled");
  assert.ok(new Date(String(c!.rateLimitedUntil)).getTime() > Date.now(), "sibling C cooled");
  assert.equal(b!.testStatus, "unavailable");
  assert.equal(c!.testStatus, "unavailable");
});

// ─── Wiring-level integration tests (#10880) ───────────────────────────────
// The tests above pin the branch's invariants in isolation. These tests
// replicate the account-rotation contract of chat.ts step 8 (try connections
// in order, call markAccountUnavailable on 429, advance on shouldFallback —
// the #10525 pattern) and wire it to the REAL markAccountUnavailable and the
// REAL proxy_logs-backed egress lookup, so the N-1 wasted upstream calls are
// proven avoided end-to-end, not just in a single call.

const AGENTROUTER_QUOTA_429 = '{"error":{"message":"账户额度不足，请充值后重试"}}';
const TOO_MANY_REQUESTS_429 = '{"error":{"message":"too many requests"}}';
const RATE_LIMIT_TEXT_429 = '{"error":{"message":"rate limit reached"}}';

/**
 * Replica of the account-rotation contract of chat.ts step 8: walk the pool in
 * order, skip whatever the credential selection would skip
 * (`rateLimitedUntil > now`, the predicate documented in AGENTS.md →
 * "Connection Cooldown"), and spend one upstream call on every connection it
 * does NOT skip. It is a replica of the selection predicate, not the real
 * selector — but it runs the REAL markAccountUnavailable against the REAL
 * proxy_logs-backed lookup, and it walks the pool to the END on purpose: no
 * early return, so the call count is decided ONLY by what the branch wrote to
 * the DB. The count is meaningful because the same helper yields 3 for a
 * non-allowlisted provider (see the paired counter-test below) — 1-vs-3 is the
 * proof, a bare "=== 1" would also pass on a loop that stops after one call.
 */
async function rotateWholePool(
  ids: string[],
  body: string,
  provider: string,
  options: Record<string, unknown> = {}
): Promise<{ upstreamCalls: number; tried: string[] }> {
  const tried: string[] = [];
  for (const id of ids) {
    const conn = await providersDb.getProviderConnectionById(id);
    const untilMs =
      conn && conn.rateLimitedUntil ? new Date(String(conn.rateLimitedUntil)).getTime() : 0;
    if (untilMs > Date.now()) continue; // the rotation skips a cooled connection
    tried.push(id);
    await auth.markAccountUnavailable(id, 429, body, provider, "model-x", null, options);
  }
  return { upstreamCalls: tried.length, tried };
}

test("three connections sharing one egress IP: ONE upstream call for the whole pool", async () => {
  await resetStorage();
  const connA = await seedConnection("opencode");
  const connB = await seedConnection("opencode");
  const connC = await seedConnection("opencode");
  seedProxyLog(connA, SHARED_EGRESS_IP);
  seedProxyLog(connB, SHARED_EGRESS_IP);
  seedProxyLog(connC, SHARED_EGRESS_IP);

  // Body = the REAL opencode 429 envelope ("monthly usage limit reached").
  // On the markAccountUnavailable path checkFallbackError intercepts it with
  // the subscription-quota text fallback (quotaTextCooldowns.ts — "usage
  // limit reached" is a substring) BEFORE the status_429 rule → classified
  // quota_exhausted with a 1h cooldown and no newBackoffLevel. That is the
  // exact production case; the egress branch accepts BOTH quota_exhausted
  // and rate_limit_exceeded, so the wiring contract holds for either arm.
  const { upstreamCalls, tried } = await rotateWholePool(
    [connA, connB, connC],
    REAL_OPENCODE_429,
    "opencode"
  );
  assert.equal(upstreamCalls, 1, "exactly one upstream call for the whole pool");
  assert.deepEqual(tried, [connA], "only the first connection was ever tried");
  const [a, b, c] = await Promise.all([
    providersDb.getProviderConnectionById(connA),
    providersDb.getProviderConnectionById(connB),
    providersDb.getProviderConnectionById(connC),
  ]);
  assert.equal(a!.testStatus, "unavailable", "failing connection C cooled too");
  assert.ok(
    new Date(String(b!.rateLimitedUntil)).getTime() > Date.now(),
    "sibling B cooled before being tried"
  );
  assert.ok(
    new Date(String(c!.rateLimitedUntil)).getTime() > Date.now(),
    "sibling C cooled before being tried"
  );
  assert.equal(b!.testStatus, "unavailable");
  assert.equal(c!.testStatus, "unavailable");
});

test("counter-test: the SAME rotation burns N calls for a non-allowlisted provider", async () => {
  await resetStorage();
  const connA = await seedConnection("ollama-cloud");
  const connB = await seedConnection("ollama-cloud");
  const connC = await seedConnection("ollama-cloud");
  seedProxyLog(connA, SHARED_EGRESS_IP, "ollama-cloud");
  seedProxyLog(connB, SHARED_EGRESS_IP, "ollama-cloud");
  seedProxyLog(connC, SHARED_EGRESS_IP, "ollama-cloud");

  // Same shared IP, same helper, same 429 — only the allowlist differs. This
  // is what makes the "=== 1" above a measurement instead of an artifact of
  // the harness: without the branch, the pool costs one call per connection.
  const { upstreamCalls } = await rotateWholePool(
    [connA, connB, connC],
    TOO_MANY_REQUESTS_429,
    "ollama-cloud"
  );
  assert.equal(upstreamCalls, 3, "N-1 wasted calls remain for a provider that did not opt in");
});

test("combo path: one upstream call too — the pool is cooled, the combo advances", async () => {
  await resetStorage();
  const connA = await seedConnection("opencode");
  const connB = await seedConnection("opencode");
  const connC = await seedConnection("opencode");
  seedProxyLog(connA, SHARED_EGRESS_IP);
  seedProxyLog(connB, SHARED_EGRESS_IP);
  seedProxyLog(connC, SHARED_EGRESS_IP);

  // The combo caller downgrades persistUnavailableState to false for a 429
  // (chat.ts step 8). The branch ignores that downgrade, exactly like the
  // connection-scoped agentrouter branch above it: the generic path would
  // otherwise lock per MODEL, which says nothing about the exhausted IP and
  // leaves the combo burning one guaranteed-failed call per sibling. This is
  // the acceptance criterion of #10880 ("combo advances", the #10525 pattern).
  const { upstreamCalls, tried } = await rotateWholePool(
    [connA, connB, connC],
    REAL_OPENCODE_429,
    "opencode",
    { isCombo: true, persistUnavailableState: false }
  );
  assert.equal(upstreamCalls, 1, "combo rotation also spends exactly one call");
  assert.deepEqual(tried, [connA]);
  const [a, b, c] = await Promise.all([
    providersDb.getProviderConnectionById(connA),
    providersDb.getProviderConnectionById(connB),
    providersDb.getProviderConnectionById(connC),
  ]);
  for (const [label, conn] of [
    ["A", a],
    ["B", b],
    ["C", c],
  ] as const) {
    assert.ok(
      new Date(String(conn!.rateLimitedUntil)).getTime() > Date.now(),
      `connection ${label} cooled on the combo path`
    );
    assert.equal(conn!.testStatus, "unavailable");
    assert.notEqual(conn!.testStatus, "banned", "never terminal, combo path included");
  }
});

test("account-scoped 401/403 still rotate across all connections (rotation preserved)", async () => {
  // opencode is egress-bucketed ONLY for 429 quota/rate-limit signals: a 401
  // (auth) or 403 (forbidden) is account-scoped and must keep the legacy
  // rotation — every connection is tried, no egress lock pre-cools siblings.
  // A 429 is deliberately absent from this loop: for an allowlisted provider
  // it IS the new egress-bucketed signal and is covered by the wiring test
  // above (exactly one call, siblings pre-cooled).
  for (const status of [401, 403]) {
    await resetStorage();
    const ids: string[] = [];
    for (let i = 0; i < 3; i++) {
      const id = await seedConnection("opencode");
      seedProxyLog(id, SHARED_EGRESS_IP);
      ids.push(id);
    }
    let upstreamCalls = 0;
    const tried: string[] = [];
    for (const id of ids) {
      tried.push(id);
      upstreamCalls += 1;
      const res = await auth.markAccountUnavailable(
        id,
        status,
        '{"error":{"message":"request rejected"}}',
        "opencode",
        "model-x",
        null,
        {}
      );
      assert.equal(res.shouldFallback, true, `status ${status} must keep rotating`);
    }
    assert.equal(upstreamCalls, 3, `status ${status}: all three connections were tried`);
    assert.equal(tried.length, 3, `status ${status}: no sibling was pre-cooled by the branch`);
    const [b, c] = await Promise.all([
      providersDb.getProviderConnectionById(ids[1]),
      providersDb.getProviderConnectionById(ids[2]),
    ]);
    // No egress lock: the branch writes rateLimitedUntil + testStatus
    // "unavailable" on IP-sharing siblings (applyEgressIpLockout) — a null
    // cooldown proves the lock never fired for either status.
    assert.ok(!b!.rateLimitedUntil, `status ${status}: no egress lock applied to sibling B`);
    assert.ok(!c!.rateLimitedUntil, `status ${status}: no egress lock applied to sibling C`);
    // b/c were THEMSELVES tried (that is what "rotation preserved" means), so
    // each carries the legacy account-scoped marking, never the branch's
    // "unavailable": a 401 resolves to terminal "expired" (auth.ts
    // resolveTerminalConnectionStatus), a 403 "request rejected" resolves to
    // no terminal status → the connection stays "active".
    assert.equal(
      b!.testStatus,
      status === 401 ? "expired" : "active",
      `status ${status}: legacy account-scoped marking, not the egress branch's unavailable`
    );
    assert.equal(
      c!.testStatus,
      status === 401 ? "expired" : "active",
      `status ${status}: legacy account-scoped marking, not the egress branch's unavailable`
    );
  }
});

test("agentrouter stays connection-scoped: IP-sharing siblings are NOT pre-cooled", async () => {
  await resetStorage();
  const connA = await seedConnection("agentrouter");
  const connB = await seedConnection("agentrouter");
  const connC = await seedConnection("agentrouter");
  seedProxyLog(connA, SHARED_EGRESS_IP);
  seedProxyLog(connB, SHARED_EGRESS_IP);
  seedProxyLog(connC, SHARED_EGRESS_IP);

  // The agentrouter account-quota body (账户额度不足) matches the
  // agentrouter-user-quota-exhausted rule (scope "connection") — the
  // agentrouter branch fires and cools ONLY the failing connection, never its
  // IP-sharing siblings. The egress branch sits AFTER it and must not
  // re-scope this failure to the shared egress IP.
  const result = await auth.markAccountUnavailable(
    connA,
    429,
    AGENTROUTER_QUOTA_429,
    "agentrouter",
    "model-x",
    null,
    {}
  );
  assert.equal(result.shouldFallback, true);

  const [a, b, c] = await Promise.all([
    providersDb.getProviderConnectionById(connA),
    providersDb.getProviderConnectionById(connB),
    providersDb.getProviderConnectionById(connC),
  ]);
  assert.equal(
    a!.testStatus,
    "unavailable",
    "the agentrouter branch cooled the failing connection"
  );
  assert.ok(
    new Date(String(a!.rateLimitedUntil)).getTime() > Date.now(),
    "failing connection carries a cooldown window"
  );
  assert.equal(b!.testStatus, "active", "sibling B untouched — agentrouter exclusivity");
  assert.ok(!b!.rateLimitedUntil, "sibling B must not inherit the failing connection's cooldown");
  assert.equal(c!.testStatus, "active", "sibling C untouched — agentrouter exclusivity");
  assert.ok(!c!.rateLimitedUntil, "sibling C must not inherit the failing connection's cooldown");
});

test("an out-of-allowlist provider with a RATE_LIMIT_EXCEEDED 429 stays per-connection", async () => {
  await resetStorage();
  const connA = await seedConnection("ollama-cloud");
  const connB = await seedConnection("ollama-cloud");
  const connC = await seedConnection("ollama-cloud");
  seedProxyLog(connA, SHARED_EGRESS_IP);
  seedProxyLog(connB, SHARED_EGRESS_IP);
  seedProxyLog(connC, SHARED_EGRESS_IP);

  // "too many requests" carries no quota-exhaustion keyword → on this path
  // checkFallbackError classifies it rate_limit_exceeded via the 429 status
  // rule (ollama-cloud is apikey-category, so the quota-text fallbacks are
  // gated off) — the very reason the egress branch accepts. The classification
  // is asserted positively so the test proves the reason arm MATCHES; only
  // the allowlist predicate keeps the branch from firing for ollama-cloud.
  const classification = accountFallback.checkFallbackError(
    429,
    TOO_MANY_REQUESTS_429,
    0,
    "model-x",
    "ollama-cloud",
    null,
    null
  );
  assert.equal(
    classification.reason,
    "rate_limit_exceeded",
    "classification must be the reason the egress branch accepts"
  );
  assert.equal(classification.newBackoffLevel, 1, "backoff scales like the status_429 rule");

  const result = await auth.markAccountUnavailable(
    connA,
    429,
    TOO_MANY_REQUESTS_429,
    "ollama-cloud",
    "model-x",
    null,
    {}
  );
  assert.equal(result.shouldFallback, true);

  const [a, b, c] = await Promise.all([
    providersDb.getProviderConnectionById(connA),
    providersDb.getProviderConnectionById(connB),
    providersDb.getProviderConnectionById(connC),
  ]);
  assert.equal(a!.testStatus, "active", "per-connection behavior: connection stays selectable");
  assert.ok(!a!.rateLimitedUntil, "per-connection behavior: connection is not cooled");
  const lockout = accountFallback.getModelLockoutInfo("ollama-cloud", connA, "model-x");
  assert.ok(lockout, "positive: the pre-existing per-model lockout is what fires instead");
  assert.equal(b!.testStatus, "active", "sibling B untouched — egress branch must not fire");
  assert.ok(!b!.rateLimitedUntil, "sibling B must not be cooled");
  assert.equal(c!.testStatus, "active", "sibling C untouched — egress branch must not fire");
  assert.ok(!c!.rateLimitedUntil, "sibling C must not be cooled");
});

test("egress IP not resolvable (no proxy_logs row): behavior unchanged, no crash", async () => {
  await resetStorage();
  const connA = await seedConnection("opencode");
  const connB = await seedConnection("opencode");
  const connC = await seedConnection("opencode");
  // NO proxy_logs rows: the egress lookup has nothing to resolve and the
  // branch must degrade to today's behavior (C cooled, siblings untouched).

  const result = await auth.markAccountUnavailable(
    connA,
    429,
    REAL_OPENCODE_429,
    "opencode",
    "model-x",
    null,
    {}
  );
  assert.equal(result.shouldFallback, true);

  const [a, b, c] = await Promise.all([
    providersDb.getProviderConnectionById(connA),
    providersDb.getProviderConnectionById(connB),
    providersDb.getProviderConnectionById(connC),
  ]);
  assert.equal(a!.testStatus, "unavailable", "C is still cooled by the branch itself");
  assert.ok(
    new Date(String(a!.rateLimitedUntil)).getTime() > Date.now(),
    "C must carry a future rateLimitedUntil"
  );
  assert.equal(b!.testStatus, "active", "a cold egress cache must not cool siblings");
  assert.ok(!b!.rateLimitedUntil, "sibling B must not be cooled");
  assert.equal(c!.testStatus, "active", "a cold egress cache must not cool siblings");
  assert.ok(!c!.rateLimitedUntil, "sibling C must not be cooled");
});

test("a sibling with a longer existing cooldown is not shortened", async () => {
  await resetStorage();
  const connA = await seedConnection("opencode");
  const futureCooldown = new Date(Date.now() + 10 * 60 * 1000).toISOString();
  const connB = await seedConnection("opencode", {
    testStatus: "unavailable",
    rateLimitedUntil: futureCooldown,
  });
  const connC = await seedConnection("opencode");
  seedProxyLog(connA, SHARED_EGRESS_IP);
  seedProxyLog(connB, SHARED_EGRESS_IP);
  seedProxyLog(connC, SHARED_EGRESS_IP);

  // "rate limit reached" carries no quota-exhaustion keyword → status_429 →
  // rate_limit_exceeded with the transient-scaled backoff (~seconds, capped
  // at 2min) — far shorter than conn-b's pre-seeded 10min window. The
  // sibling write must skip a connection that is ALREADY cooling, never
  // reset or shorten it.
  const result = await auth.markAccountUnavailable(
    connA,
    429,
    RATE_LIMIT_TEXT_429,
    "opencode",
    "model-x",
    null,
    {}
  );
  assert.equal(result.shouldFallback, true);

  const [a, b, c] = await Promise.all([
    providersDb.getProviderConnectionById(connA),
    providersDb.getProviderConnectionById(connB),
    providersDb.getProviderConnectionById(connC),
  ]);
  assert.equal(a!.testStatus, "unavailable", "positive control: C is cooled");
  assert.equal(
    b!.rateLimitedUntil,
    futureCooldown,
    "the longer pre-existing cooldown is kept verbatim — never shortened"
  );
  assert.equal(b!.testStatus, "unavailable", "the sibling keeps its status");
  assert.ok(
    new Date(String(c!.rateLimitedUntil)).getTime() > Date.now(),
    "a fresh sibling gets the applied cooldown while B keeps its longer window"
  );
});

test("position-guard: the allowlist predicate is the guard that gates the branch", async () => {
  // The egress guard (isEgressBucketedLockScope) is not mockable from a test
  // (static import, allowlist not exported) — so verify positively at the
  // rotation level: a provider NOT in the allowlist (ollama-cloud) hit with
  // the SAME rate_limit_exceeded 429 keeps the legacy rotation — all three
  // connections are tried, none pre-cooled. If the allowlist predicate
  // stopped gating the branch, conn-a's 429 would pre-cool b/c and this
  // rotation would stop at ONE call. Complementary negative proof (one-off
  // manual check): comment the branch condition in auth.ts out, run the full
  // file, expect the wiring test to FAIL on the final b/c asserts ("sibling B
  // cooled before being tried"), then restore.
  await resetStorage();
  const connA = await seedConnection("ollama-cloud");
  const connB = await seedConnection("ollama-cloud");
  const connC = await seedConnection("ollama-cloud");
  seedProxyLog(connA, SHARED_EGRESS_IP);
  seedProxyLog(connB, SHARED_EGRESS_IP);
  seedProxyLog(connC, SHARED_EGRESS_IP);

  let upstreamCalls = 0;
  const tried: string[] = [];
  for (const id of [connA, connB, connC]) {
    const conn = await providersDb.getProviderConnectionById(id);
    const untilMs =
      conn && conn.rateLimitedUntil ? new Date(String(conn.rateLimitedUntil)).getTime() : 0;
    if (untilMs > Date.now()) continue; // rotation skips cooled
    tried.push(id);
    upstreamCalls += 1;
    await auth.markAccountUnavailable(
      id,
      429,
      TOO_MANY_REQUESTS_429,
      "ollama-cloud",
      "model-x",
      null,
      {}
    );
  }
  assert.equal(
    upstreamCalls,
    3,
    "all three connections tried — the branch did not pre-cool siblings"
  );
  assert.equal(tried.length, 3, "no sibling was skipped by a cooldown");
});

test("a sibling in a TERMINAL status is never overwritten by the cooldown", async () => {
  await resetStorage();
  const connA = await seedConnection("opencode");
  const connB = await seedConnection("opencode", { testStatus: "banned" });
  seedProxyLog(connA, SHARED_EGRESS_IP);
  seedProxyLog(connB, SHARED_EGRESS_IP);

  const result = await auth.markAccountUnavailable(
    connA,
    429,
    REAL_OPENCODE_429,
    "opencode",
    "model-x",
    null,
    {}
  );
  assert.equal(result.shouldFallback, true);

  const [a, b] = await Promise.all([
    providersDb.getProviderConnectionById(connA),
    providersDb.getProviderConnectionById(connB),
  ]);
  assert.equal(a!.testStatus, "unavailable", "positive control: C is cooled");
  assert.equal(
    b!.testStatus,
    "banned",
    "a terminal sibling must keep its status — never downgraded by an IP-level signal"
  );
  assert.ok(!b!.rateLimitedUntil, "a terminal sibling must not be given a cooldown window");
});

test("a connection with a unique egress IP is locked alone", async () => {
  await resetStorage();
  const connA = await seedConnection("opencode");
  const connB = await seedConnection("opencode");
  seedProxyLog(connA, SHARED_EGRESS_IP);
  seedProxyLog(connB, OTHER_EGRESS_IP);

  const result = await auth.markAccountUnavailable(
    connA,
    429,
    REAL_OPENCODE_429,
    "opencode",
    "model-x",
    null,
    {}
  );
  assert.equal(result.shouldFallback, true);

  const [a, b] = await Promise.all([
    providersDb.getProviderConnectionById(connA),
    providersDb.getProviderConnectionById(connB),
  ]);
  assert.equal(a!.testStatus, "unavailable", "positive control: C is cooled");
  assert.equal(
    b!.testStatus,
    "active",
    "a connection egressing through a different IP must be untouched"
  );
  assert.ok(!b!.rateLimitedUntil, "a connection with its own egress IP must not be cooled");
});

test("never terminal + failing connection C IS written by the branch (backoffLevel set)", async () => {
  await resetStorage();
  const connA = await seedConnection("opencode");
  seedProxyLog(connA, SHARED_EGRESS_IP);

  const result = await auth.markAccountUnavailable(
    connA,
    429,
    REAL_OPENCODE_429,
    "opencode",
    "model-x",
    null,
    {}
  );
  assert.equal(result.shouldFallback, true);

  const a = await providersDb.getProviderConnectionById(connA);
  // the branch writes C itself (updateProviderConnection) BEFORE
  // applyEgressIpLockout and BEFORE returning — the per-model block
  // (opencode is passthroughModels:true) would otherwise lockModel
  // in-memory and C would stay "active", retried next episode.
  assert.equal(a!.testStatus, "unavailable", "C must be marked by the branch itself");
  assert.ok(
    new Date(String(a!.rateLimitedUntil)).getTime() > Date.now(),
    "C must carry a future rateLimitedUntil"
  );
  // The REAL opencode envelope is intercepted by the subscription-quota text
  // fallback (quotaTextCooldowns.ts — "usage limit reached" matches
  // "monthly usage limit reached") BEFORE the 429 status rule, so
  // fallbackResult carries no newBackoffLevel: the branch's
  // `newBackoffLevel ?? backoffLevel` mechanically keeps the connection's
  // current level (0). Pin the write itself via testStatus/rateLimitedUntil,
  // not the reason — see the QUOTA_EXHAUSTED test for the newBackoffLevel arm.
  assert.equal(a!.backoffLevel, 0, "no newBackoffLevel on this envelope → current level kept");
  assert.notEqual(
    a!.testStatus,
    "credits_exhausted",
    "never terminal: a renewing quota window, not credits_exhausted"
  );
  assert.notEqual(a!.testStatus, "banned", "never terminal: not banned");
  assert.notEqual(a!.testStatus, "expired", "never terminal: not expired");
});

test("disableCooling connection skips the egress branch entirely", async () => {
  await resetStorage();
  const connA = await seedConnection("opencode", {
    providerSpecificData: { disableCooling: true },
  });
  const connB = await seedConnection("opencode");
  const connC = await seedConnection("opencode");
  seedProxyLog(connA, SHARED_EGRESS_IP);
  seedProxyLog(connB, SHARED_EGRESS_IP);
  seedProxyLog(connC, SHARED_EGRESS_IP);

  const result = await auth.markAccountUnavailable(
    connA,
    429,
    REAL_OPENCODE_429,
    "opencode",
    "model-x",
    null,
    {}
  );
  assert.equal(result.shouldFallback, true);

  const [a, b, c] = await Promise.all([
    providersDb.getProviderConnectionById(connA),
    providersDb.getProviderConnectionById(connB),
    providersDb.getProviderConnectionById(connC),
  ]);
  assert.equal(a!.testStatus, "active", "disableCooling keeps C selectable (today's behavior)");
  assert.ok(!a!.rateLimitedUntil, "disableCooling must not cool the connection");
  assert.equal(b!.testStatus, "active", "sibling B untouched — branch skipped");
  assert.equal(c!.testStatus, "active", "sibling C untouched — branch skipped");
  assert.ok(!b!.rateLimitedUntil && !c!.rateLimitedUntil, "no sibling cooldown when disabled");
});

test("a QUOTA_EXHAUSTED body triggers the egress lock too (both reasons covered)", async () => {
  await resetStorage();
  const connA = await seedConnection("opencode");
  const connB = await seedConnection("opencode");
  const connC = await seedConnection("opencode");
  seedProxyLog(connA, SHARED_EGRESS_IP);
  seedProxyLog(connB, SHARED_EGRESS_IP);
  seedProxyLog(connC, SHARED_EGRESS_IP);

  // "quota has been exceeded" matches the global errorConfig text rule →
  // quota_exhausted (NOT rate_limit_exceeded): proves the predicate accepts
  // both reasons, not only the real-world rate_limit_exceeded path.
  const result = await auth.markAccountUnavailable(
    connA,
    429,
    QUOTA_EXHAUSTED_429,
    "opencode",
    "model-x",
    null,
    {}
  );
  assert.equal(result.shouldFallback, true);

  const [a, b, c] = await Promise.all([
    providersDb.getProviderConnectionById(connA),
    providersDb.getProviderConnectionById(connB),
    providersDb.getProviderConnectionById(connC),
  ]);
  assert.equal(a!.testStatus, "unavailable", "C cooled on quota_exhausted");
  // "quota_has_been_exceeded" is a backoff:true rule → buildRetryableFallback
  // sets newBackoffLevel (1 at level 0) → the branch's `newBackoffLevel ??
  // backoffLevel` write surfaces it (the other arm of the never-terminal
  // test's `??`).
  assert.equal(a!.backoffLevel, 1, "newBackoffLevel flows through the branch's C write");
  assert.ok(new Date(String(b!.rateLimitedUntil)).getTime() > Date.now(), "sibling B cooled");
  assert.ok(new Date(String(c!.rateLimitedUntil)).getTime() > Date.now(), "sibling C cooled");
  assert.equal(b!.testStatus, "unavailable");
  assert.equal(c!.testStatus, "unavailable");
});

test("a RATE_LIMIT_EXCEEDED 429 (no quota text) triggers the egress lock with a scaled backoff", async () => {
  // "rate limit reached" carries no quota-exhaustion keyword (see the
  // QUOTA_PATTERNS list in classify429.ts) and opencode is an apikey
  // provider, so the quota-text fallbacks are all skipped and the 429
  // status rule classifies the envelope as rate_limit_exceeded via
  // buildRetryableFallback — which scales the backoff level (1 at level 0).
  // This is the arm of the branch that stays live in production for
  // allowlisted providers whose 429 envelopes do not mention quota.
  await resetStorage();
  const connA = await seedConnection("opencode");
  const connB = await seedConnection("opencode");
  const connC = await seedConnection("opencode");
  seedProxyLog(connA, SHARED_EGRESS_IP);
  seedProxyLog(connB, SHARED_EGRESS_IP);
  seedProxyLog(connC, SHARED_EGRESS_IP);

  const result = await auth.markAccountUnavailable(
    connA,
    429,
    '{"error":{"message":"rate limit reached"}}',
    "opencode",
    "model-x",
    null,
    {}
  );
  assert.equal(result.shouldFallback, true);

  const [a, b, c] = await Promise.all([
    providersDb.getProviderConnectionById(connA),
    providersDb.getProviderConnectionById(connB),
    providersDb.getProviderConnectionById(connC),
  ]);
  assert.equal(a!.testStatus, "unavailable", "C cooled on rate_limit_exceeded");
  assert.ok(
    new Date(String(a!.rateLimitedUntil)).getTime() > Date.now(),
    "C must carry a future rateLimitedUntil"
  );
  // buildRetryableFallback scales the backoff (1 at level 0) → the branch's
  // `newBackoffLevel ?? backoffLevel` write surfaces it, like the
  // QUOTA_EXHAUSTED test.
  assert.equal(a!.backoffLevel, 1, "newBackoffLevel flows through the branch's C write");
  assert.ok(new Date(String(b!.rateLimitedUntil)).getTime() > Date.now(), "sibling B cooled");
  assert.ok(new Date(String(c!.rateLimitedUntil)).getTime() > Date.now(), "sibling C cooled");
  assert.equal(b!.testStatus, "unavailable");
  assert.equal(c!.testStatus, "unavailable");
});

test("cross-provider: an unrelated provider sharing the egress IP is NOT cooled", async () => {
  await resetStorage();
  const connA = await seedConnection("opencode");
  const connB = await seedConnection("opencode");
  const connC = await seedConnection("opencode");
  const connAnthropic = await seedConnection("anthropic");
  seedProxyLog(connA, SHARED_EGRESS_IP);
  seedProxyLog(connB, SHARED_EGRESS_IP);
  seedProxyLog(connC, SHARED_EGRESS_IP);
  seedProxyLog(connAnthropic, SHARED_EGRESS_IP, "anthropic");

  // The egress IP budget is PER PROVIDER (the opencode free tier is
  // IP-bucketed, not account-bucketed — see #9611): in the default no-proxy
  // deployment every provider egresses through the host's single IP, so
  // without the provider filter one opencode 429 would cool the whole pool —
  // including paid healthy connections of unrelated providers — for 1h. The
  // sibling query is scoped to the allowlisted provider family; the
  // anthropic connection sharing the same IP must stay untouched.
  const result = await auth.markAccountUnavailable(
    connA,
    429,
    REAL_OPENCODE_429,
    "opencode",
    "model-x",
    null,
    {}
  );
  assert.equal(result.shouldFallback, true);

  const [a, b, c, anthropic] = await Promise.all([
    providersDb.getProviderConnectionById(connA),
    providersDb.getProviderConnectionById(connB),
    providersDb.getProviderConnectionById(connC),
    providersDb.getProviderConnectionById(connAnthropic),
  ]);
  assert.equal(a!.testStatus, "unavailable", "failing opencode connection cooled");
  assert.equal(b!.testStatus, "unavailable", "opencode sibling B cooled");
  assert.equal(c!.testStatus, "unavailable", "opencode sibling C cooled");
  assert.equal(anthropic!.testStatus, "active", "anthropic connection untouched");
  assert.ok(!anthropic!.rateLimitedUntil, "anthropic connection must carry no cooldown");
});
