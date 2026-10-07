/**
 * Two ways an out-of-credit connection kept drawing quota-weighted traffic:
 *
 *   1. A 402 from upstream left the stored quota snapshot untouched, so the very
 *      next weighted draw still saw the old non-zero remaining and could pick the
 *      same dead connection again.
 *   2. A snapshot refreshed hours ago counted as confident headroom. Live incident:
 *      remaining=1%, is_exhausted=0, last refreshed 5h earlier, upstream answered
 *      402 "Grok Build usage balance exhausted".
 *
 * Staleness means "unknown", not "dead": a stale connection drops out of the A
 * pool but stays reachable through B, and is never deactivated.
 */
import test, { after, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-qw-stale-402-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const dbCore = await import("../../../src/lib/db/core.ts");
const db = await import("../../../src/lib/db/providers.ts");
const quotaCache = await import("../../../src/domain/quotaCache.ts");
const { registerQuotaFetcher } = await import("../../../open-sse/services/quotaPreflight.ts");
const { orderTargetsByQuotaWeighted, QUOTA_WEIGHTED_MAX_SNAPSHOT_AGE_MS } =
  await import("../../../open-sse/services/combo/quotaStrategies.ts");
const { resetAllCircuitBreakers } = await import("../../../src/shared/utils/circuitBreaker.ts");
const { _clearInflightForTest } =
  await import("../../../open-sse/services/combo/quotaShareInflight.ts");
const { _setSecureRandomFloatSource } = await import("../../../src/shared/utils/secureRandom.ts");

after(() => {
  dbCore.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

afterEach(() => {
  _setSecureRandomFloatSource(null);
  quotaCache.__clearForTests();
  resetAllCircuitBreakers();
  _clearInflightForTest();
});

const CLOCK_BASE = Date.now();
const iso = (ms = 86_400_000) => new Date(CLOCK_BASE + ms).toISOString();

function quotaAt(percentUsed: number, extra: Record<string, unknown> = {}) {
  return {
    used: percentUsed * 100,
    total: 100,
    percentUsed,
    resetAt: iso(7 * 86_400_000),
    window5h: { percentUsed, resetAt: iso(5 * 3600_000) },
    window7d: { percentUsed, resetAt: iso(7 * 86_400_000) },
    limitReached: false,
    ...extra,
  };
}

function makeTarget(provider: string, connectionId: string, model = "gemini-3.8-flash-high") {
  return {
    kind: "model" as const,
    stepId: `step-${connectionId}`,
    executionKey: `${provider}/${model}@${connectionId}`,
    modelStr: `${provider}/${model}`,
    provider,
    providerId: provider,
    connectionId,
    weight: 1,
    label: null,
  };
}

async function seedConnection(provider: string, name: string) {
  const row = await db.createProviderConnection({
    provider,
    name,
    isActive: true,
    testStatus: "active",
    authType: "apikey",
  });
  return String(row.id);
}

// ── Hole 1: a 402 must invalidate the snapshot ──────────────────────────────

test("markAccountExhaustedFromCredits: 402 flips the snapshot to exhausted", () => {
  const id = `credit-${randomUUID()}`;
  quotaCache.setQuotaCache(id, "grok-cli", {
    session: { remainingPercentage: 1, resetAt: iso() },
  });
  assert.equal(quotaCache.isAccountQuotaExhausted(id), false, "precondition: has headroom");

  quotaCache.markAccountExhaustedFromCredits(id, "grok-cli");

  assert.equal(quotaCache.isAccountQuotaExhausted(id), true);
  const entry = quotaCache.getQuotaCache(id);
  assert.equal(entry?.exhausted, true);
  assert.equal(
    quotaCache.getQuotaWeightedRemainingPercent(id),
    0,
    "a credit-exhausted connection reports no remaining headroom"
  );
});

test("a 402-marked connection loses the weighted draw to a healthy peer", async () => {
  const provider = "agy";
  const dead = await seedConnection(provider, `dead-${randomUUID()}`);
  const healthy = await seedConnection(provider, `ok-${randomUUID()}`);
  // Upstream still reports headroom for the dead account — the stale snapshot
  // that caused the incident. Only the 402 mark tells the truth.
  registerQuotaFetcher(provider, async () => quotaAt(0.6));

  quotaCache.setQuotaCache(dead, provider, { session: { remainingPercentage: 1, resetAt: iso() } });
  quotaCache.markAccountExhaustedFromCredits(dead, provider);

  _setSecureRandomFloatSource(() => 0);
  const ordered = await orderTargetsByQuotaWeighted(
    [makeTarget(provider, dead), makeTarget(provider, healthy)],
    "credit-402",
    { quotaWeightedFloorPercent: 1 },
    { warn() {} },
    null
  );

  assert.equal(ordered[0]?.connectionId, healthy, "402'd connection must not lead the order");
});

test("a 402 mark never deactivates or deletes the connection", () => {
  const id = `keep-${randomUUID()}`;
  quotaCache.setQuotaCache(id, "grok-cli", {
    session: { remainingPercentage: 40, resetAt: iso() },
  });
  quotaCache.markAccountExhaustedFromCredits(id, "grok-cli");

  const entry = quotaCache.getQuotaCache(id);
  assert.ok(entry, "the cache entry survives — a 402 is a credit state, not a dead key");
  assert.equal(entry?.connectionId, id);
  assert.equal(entry?.provider, "grok-cli");
});

test("a successful quota refresh clears the 402 mark", () => {
  const id = `refresh-${randomUUID()}`;
  quotaCache.markAccountExhaustedFromCredits(id, "grok-cli");
  assert.equal(quotaCache.isAccountQuotaExhausted(id), true);

  quotaCache.setQuotaCache(id, "grok-cli", {
    session: { remainingPercentage: 55, resetAt: iso() },
  });

  assert.equal(
    quotaCache.isAccountQuotaExhausted(id),
    false,
    "upstream saying there is headroom again outranks the earlier 402"
  );
});

// ── Hole 2: snapshot staleness is bounded ───────────────────────────────────

test("QUOTA_WEIGHTED_MAX_SNAPSHOT_AGE_MS is exported and shorter than the incident gap", () => {
  assert.equal(typeof QUOTA_WEIGHTED_MAX_SNAPSHOT_AGE_MS, "number");
  assert.ok(QUOTA_WEIGHTED_MAX_SNAPSHOT_AGE_MS > 0);
  assert.ok(
    QUOTA_WEIGHTED_MAX_SNAPSHOT_AGE_MS < 5 * 60 * 60 * 1000,
    "the 5h-old snapshot from the incident must not count as confident headroom"
  );
});

test("a stale snapshot yields the A pool to a freshly-observed peer", async () => {
  const provider = "agy";
  const stale = await seedConnection(provider, `stale-${randomUUID()}`);
  const fresh = await seedConnection(provider, `fresh-${randomUUID()}`);
  registerQuotaFetcher(provider, async () => quotaAt(0.6));

  quotaCache.setQuotaCache(stale, provider, {
    session: { remainingPercentage: 90, resetAt: iso() },
  });
  const staleEntry = quotaCache.getQuotaCache(stale);
  assert.ok(staleEntry);
  // Age the snapshot past the bound. Higher remaining than the fresh peer, so a
  // pass that ignored staleness would rank it first.
  staleEntry.fetchedAt = Date.now() - QUOTA_WEIGHTED_MAX_SNAPSHOT_AGE_MS - 60_000;

  quotaCache.setQuotaCache(fresh, provider, {
    session: { remainingPercentage: 40, resetAt: iso() },
  });

  _setSecureRandomFloatSource(() => 0);
  const ordered = await orderTargetsByQuotaWeighted(
    [makeTarget(provider, stale), makeTarget(provider, fresh)],
    "stale-vs-fresh",
    { quotaWeightedFloorPercent: 1 },
    { warn() {} },
    null
  );

  assert.equal(ordered[0]?.connectionId, fresh, "a fresh observation outranks a stale one");
  assert.ok(
    ordered.some((t) => t.connectionId === stale),
    "stale means unknown, not dead — it stays reachable behind the fresh peer"
  );
});

test("a snapshot exactly at the age bound still counts as fresh", async () => {
  const provider = "agy";
  const atBound = await seedConnection(provider, `at-bound-${randomUUID()}`);
  const younger = await seedConnection(provider, `younger-${randomUUID()}`);
  registerQuotaFetcher(provider, async () => quotaAt(0.6));

  quotaCache.setQuotaCache(atBound, provider, {
    session: { remainingPercentage: 90, resetAt: iso() },
  });
  const boundEntry = quotaCache.getQuotaCache(atBound);
  assert.ok(boundEntry);
  // A second inside the bound, not past it. The staleness test is strictly
  // greater, so this snapshot keeps its A-pool seat and its higher remaining
  // wins. The second of slack absorbs the clock advancing during the await.
  boundEntry.fetchedAt = Date.now() - QUOTA_WEIGHTED_MAX_SNAPSHOT_AGE_MS + 1_000;

  quotaCache.setQuotaCache(younger, provider, {
    session: { remainingPercentage: 40, resetAt: iso() },
  });

  _setSecureRandomFloatSource(() => 0);
  const ordered = await orderTargetsByQuotaWeighted(
    [makeTarget(provider, atBound), makeTarget(provider, younger)],
    "at-bound",
    { quotaWeightedFloorPercent: 1 },
    { warn() {} },
    null
  );

  assert.equal(
    ordered[0]?.connectionId,
    atBound,
    "a snapshot at exactly the bound has not aged out yet"
  );
});

test("an all-stale set still routes rather than returning nothing", async () => {
  const provider = "agy";
  const a = await seedConnection(provider, `stale-a-${randomUUID()}`);
  const b = await seedConnection(provider, `stale-b-${randomUUID()}`);
  registerQuotaFetcher(provider, async () => quotaAt(0.6));

  for (const id of [a, b]) {
    quotaCache.setQuotaCache(id, provider, {
      session: { remainingPercentage: 80, resetAt: iso() },
    });
    const entry = quotaCache.getQuotaCache(id);
    assert.ok(entry);
    entry.fetchedAt = Date.now() - QUOTA_WEIGHTED_MAX_SNAPSHOT_AGE_MS - 60_000;
  }

  _setSecureRandomFloatSource(() => 0);
  const ordered = await orderTargetsByQuotaWeighted(
    [makeTarget(provider, a), makeTarget(provider, b)],
    "all-stale",
    { quotaWeightedFloorPercent: 1 },
    { warn() {} },
    null
  );

  assert.equal(ordered.length, 2, "staleness must not empty the routing set");
});

test("a fresh snapshot is unaffected by the staleness bound", async () => {
  const provider = "agy";
  const high = await seedConnection(provider, `high-${randomUUID()}`);
  const low = await seedConnection(provider, `low-${randomUUID()}`);
  registerQuotaFetcher(provider, async () => quotaAt(0.6));

  quotaCache.setQuotaCache(high, provider, {
    session: { remainingPercentage: 90, resetAt: iso() },
  });
  quotaCache.setQuotaCache(low, provider, {
    session: { remainingPercentage: 20, resetAt: iso() },
  });

  _setSecureRandomFloatSource(() => 0);
  const ordered = await orderTargetsByQuotaWeighted(
    [makeTarget(provider, low), makeTarget(provider, high)],
    "both-fresh",
    { quotaWeightedFloorPercent: 1 },
    { warn() {} },
    null
  );

  assert.equal(ordered.length, 2);
  assert.ok(
    ordered.some((t) => t.connectionId === high),
    "both fresh connections remain eligible"
  );
});

// ── The 402 mark is wired into the attempt path, not just available ─────────
//
// Calling the helper directly cannot prove the call site exists: with the
// executeTargetAttempt hook deleted, every direct-call assertion above still
// passes. This drives a real 402 through the attempt loop instead.

function credits402(): Response {
  return new Response(
    JSON.stringify({ error: { message: "Grok Build usage balance exhausted" } }),
    { status: 402, headers: { "content-type": "application/json" } }
  );
}

function attemptState(target: Record<string, unknown>) {
  return {
    orderedTargets: [target],
    fallbackCount: 0,
    recordedAttempts: 0,
    comboErrors: [],
    lastError: null,
    lastStatus: null,
    earliestRetryAfter: null,
    comboExpired: false,
    exhaustedProviders: new Set(),
    exhaustedConnections: new Set(),
    transientRateLimitedProviders: new Set(),
    abortControllers: new Map([[0, new AbortController()]]),
    dispatchedTargets: new Set(),
    targetFailureTrust: new Map(),
    comboAttemptOrder: [],
    skippedForCircuitOpen: false,
    earliestCircuitOpenRetryMs: 0,
    globalAttempts: 0,
    observedFailure: false,
    allObservedFailuresQuota: true,
    observeFailure() {},
  };
}

function attemptDeps(response: () => Response) {
  return {
    strategy: "quota-weighted",
    combo: { name: "t", models: [] },
    config: {},
    log: { info() {}, warn() {}, debug() {}, error() {} },
    settings: null,
    resilienceSettings: { providerCooldown: { enabled: false } },
    sticky: { targets: [], messageHash: null, stuck: false },
    effectiveSessionId: null,
    preScreenMap: new Map(),
    quotaCutoffResetWindowConfig: {},
    maxRetries: 0,
    traceInvocationId: "inv-402",
    clientRequestedStream: false,
    handleSingleModelWithTimeout: async () => response(),
    body: { messages: [{ role: "user", content: "hi" }] },
    startTime: Date.now(),
    releaseStickyPinOnFailure() {},
    clearStaleLKGP() {},
  };
}

test("a 402 through the attempt path marks the connection exhausted", async () => {
  const { executeTargetAttempt } =
    await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
  const connectionId = `attempt-${randomUUID()}`;
  quotaCache.setQuotaCache(connectionId, "grok-cli", {
    session: { remainingPercentage: 1, resetAt: iso() },
  });
  assert.equal(
    quotaCache.isAccountQuotaExhausted(connectionId),
    false,
    "precondition: the stale snapshot still claims headroom"
  );

  const target = {
    kind: "model" as const,
    stepId: "s1",
    executionKey: `grok-cli/grok@${connectionId}`,
    modelStr: "grok-cli/grok",
    provider: "grok-cli",
    providerId: null,
    connectionId,
    weight: 1,
    label: null,
  };

  await executeTargetAttempt({
    index: 0,
    state: attemptState(target) as never,
    deps: attemptDeps(credits402) as never,
    targetForAttempt: target as never,
    profile: {},
    protectedPriorityTarget: false,
  });

  assert.equal(
    quotaCache.isAccountQuotaExhausted(connectionId),
    true,
    "the 402 must invalidate the snapshot from inside the attempt path"
  );
});

test("a non-credit failure through the attempt path leaves the snapshot alone", async () => {
  const { executeTargetAttempt } =
    await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
  const connectionId = `attempt-500-${randomUUID()}`;
  quotaCache.setQuotaCache(connectionId, "grok-cli", {
    session: { remainingPercentage: 60, resetAt: iso() },
  });

  const target = {
    kind: "model" as const,
    stepId: "s1",
    executionKey: `grok-cli/grok@${connectionId}`,
    modelStr: "grok-cli/grok",
    provider: "grok-cli",
    providerId: null,
    connectionId,
    weight: 1,
    label: null,
  };

  await executeTargetAttempt({
    index: 0,
    state: attemptState(target) as never,
    deps: attemptDeps(() => new Response("boom", { status: 500 })) as never,
    targetForAttempt: target as never,
    profile: {},
    protectedPriorityTarget: false,
  });

  assert.equal(
    quotaCache.isAccountQuotaExhausted(connectionId),
    false,
    "a 500 is not a credit signal — headroom must survive it"
  );
});
