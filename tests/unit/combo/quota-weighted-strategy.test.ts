/**
 * quota-weighted: skip empty accounts, weighted-draw the rest.
 * Spec: _tasks/superpowers/specs/2026-09-04-quota-weighted-routing-design.md
 */
import { resolveProviderId } from "../../../src/shared/constants/providers.ts";
import test, { after, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-weighted-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const dbCore = await import("../../../src/lib/db/core.ts");
const { invalidateDbCache } = await import("../../../src/lib/db/readCache.ts");
const quotaCache = await import("../../../src/domain/quotaCache.ts");
const { getResetAwareRemainingPercent, resolveResetAwareConfig, scoreResetAwareQuota } =
  await import("../../../open-sse/services/combo/quotaScoring.ts");
const { registerQuotaFetcher } = await import("../../../open-sse/services/quotaPreflight.ts");
const { convertUsageToQuotaInfo } =
  await import("../../../open-sse/services/genericQuotaFetcher.ts");
const { expandTargetsByQuotaAwareConnections, orderTargetsByQuotaWeighted, pickWeightedIndex } =
  await import("../../../open-sse/services/combo/quotaStrategies.ts");
const { getCircuitBreaker, resetAllCircuitBreakers } =
  await import("../../../src/shared/utils/circuitBreaker.ts");
const { applyStrategyOrdering } =
  await import("../../../open-sse/services/combo/applyStrategyOrdering.ts");
const { resolveComboTargetPipeline } =
  await import("../../../open-sse/services/combo/targetResolution.ts");
const { incrementInflight, getInflight, _clearInflightForTest } =
  await import("../../../open-sse/services/combo/quotaShareInflight.ts");
const {
  applySessionStickiness,
  recordStickyBinding,
  clearAllStickyBindings,
  __setStickinessHeadroomFetcherForTests,
  __setStickinessConnectionFetcherForTests,
  __setStickinessQuotaCheckerForTests,
} = await import("../../../open-sse/services/combo/sessionStickiness.ts");
const { HANDLED_COMBO_STRATEGIES } =
  await import("../../../open-sse/services/combo/strategyDispatch.ts");
const { comboStrategySchema } = await import("../../../src/shared/validation/schemas.ts");
const { _setSecureRandomFloatSource } = await import("../../../src/shared/utils/secureRandom.ts");
const { getQuotaFetchScope } = await import("../../../open-sse/services/antigravityQuotaFamily.ts");

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
  clearAllStickyBindings();
  __setStickinessHeadroomFetcherForTests(null);
  __setStickinessConnectionFetcherForTests(null);
  __setStickinessQuotaCheckerForTests(null);
});

// scoreQuotaWindow computes reset pressure as `resetAt - Date.now()`
// (open-sse/services/combo/quotaScoring.ts:298), so a score is a function of the
// wall clock at the instant it is taken. Two accounts with identical quota scored a
// millisecond apart therefore do NOT tie, and sortByScoreThenIndex never reaches its
// index fallback — the peers swap places. Freezing only the fixture's resetAt does not
// help; the live half of the subtraction is the one that moves.
//
// withFrozenClock pins Date.now for the duration of one ordering call, which makes the
// score a pure function of the quota again. Restores in a finally so the surrounding
// tests keep the real clock.
const CLOCK_BASE = Date.now();
const iso = (ms = 86_400_000) => new Date(CLOCK_BASE + ms).toISOString();

async function withFrozenClock<T>(fn: () => Promise<T>): Promise<T> {
  const realNow = Date.now;
  const frozen = realNow();
  Date.now = () => frozen;
  try {
    return await fn();
  } finally {
    Date.now = realNow;
  }
}

function quotaAt(percentUsed: number, extra: Record<string, unknown> = {}) {
  // Far-future resets keep reset-pressure near 0 so score tracks remaining.
  // A 1-day weekly reset inverts that (more-used accounts score higher).
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

function seedConnection(provider: string, connectionId: string) {
  dbCore
    .getDbInstance()
    .prepare(
      "INSERT OR IGNORE INTO provider_connections (id, provider, is_active, test_status, created_at, updated_at) VALUES (?, ?, 1, 'active', '2026-09-09T00:00:00Z', '2026-09-09T00:00:00Z')"
    )
    .run(connectionId, resolveProviderId(provider));
  invalidateDbCache("connections");
}

function makeTarget(provider: string, connectionId: string, model = "gemini-3.8-flash-high") {
  seedConnection(provider, connectionId);
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

function seedQuotaCache(connectionId: string, remainingPercentage: number) {
  quotaCache.setQuotaCache(connectionId, "antigravity", {
    "gemini-3.8-flash-high": { remainingPercentage, resetAt: iso() },
    gemini_weekly: { remainingPercentage, resetAt: iso() },
  });
}

test("getResetAwareRemainingPercent: null / non-object → 100", () => {
  assert.equal(getResetAwareRemainingPercent(null), 100);
  assert.equal(getResetAwareRemainingPercent(undefined), 100);
  assert.equal(getResetAwareRemainingPercent("nope"), 100);
  assert.equal(getResetAwareRemainingPercent(12), 100);
});

test("getResetAwareRemainingPercent: limitReached → 0", () => {
  assert.equal(getResetAwareRemainingPercent({ limitReached: true, percentUsed: 0.1 }), 0);
});

test("getResetAwareRemainingPercent: min(session, weekly) * 100", () => {
  const quota = {
    percentUsed: 0.5,
    window5h: { percentUsed: 0.6, resetAt: new Date(Date.now() + 3600_000).toISOString() },
    window7d: { percentUsed: 0.2, resetAt: new Date(Date.now() + 86400_000).toISOString() },
  };
  assert.equal(getResetAwareRemainingPercent(quota), 40);
});

test("getResetAwareRemainingPercent: missing windows fall back to overall percentUsed", () => {
  assert.equal(getResetAwareRemainingPercent({ percentUsed: 0.7 }), 30);
});

test("dual: default expansion and skipExhaustionFilter preserve positive quota", async () => {
  const provider = "antigravity";
  const low = `low-${randomUUID()}`;
  const healthy = `ok-${randomUUID()}`;
  registerQuotaFetcher(provider, async (connectionId) =>
    connectionId === low ? quotaAt(0.995) : quotaAt(0.6)
  );
  seedQuotaCache(low, 0.5);
  seedQuotaCache(healthy, 40);

  const targets = [makeTarget(provider, low), makeTarget(provider, healthy)];
  const dropped = await expandTargetsByQuotaAwareConnections(
    targets,
    "dual-default",
    { warn() {} },
    null
  );
  assert.equal(
    dropped.expandedTargets.some((t) => t.connectionId === low),
    true,
    "positive remaining quota must not trigger automatic exhaustion"
  );
  assert.equal(
    dropped.expandedTargets.some((t) => t.connectionId === healthy),
    true
  );

  const kept = await expandTargetsByQuotaAwareConnections(
    targets,
    "dual-skip",
    { warn() {} },
    null,
    { skipExhaustionFilter: true }
  );
  assert.equal(
    kept.expandedTargets.some((t) => t.connectionId === low),
    true
  );
  assert.equal(
    kept.expandedTargets.some((t) => t.connectionId === healthy),
    true
  );
});

test("empty targets → []", async () => {
  const out = await orderTargetsByQuotaWeighted([], "empty", {}, { warn() {} }, null);
  assert.deepEqual(out, []);
});

test("A/B isolation: 7 hard-empty + 2 at 0.5% + 1 at 40%, floor=1", async () => {
  const provider = "antigravity";
  registerQuotaFetcher(provider, async (connectionId) => {
    if (connectionId.startsWith("dead-")) return quotaAt(1, { limitReached: true });
    if (connectionId.startsWith("low-")) return quotaAt(0.995);
    return quotaAt(0.6);
  });
  const dead = Array.from({ length: 7 }, () => `dead-${randomUUID()}`);
  const low = [`low-${randomUUID()}`, `low-${randomUUID()}`];
  const healthy = `ok-${randomUUID()}`;
  const ids = [...dead, ...low, healthy];
  const targets = ids.map((id) => makeTarget(provider, id));

  _setSecureRandomFloatSource(() => 0);
  const ordered = await withFrozenClock(() =>
    orderTargetsByQuotaWeighted(
      targets,
      "ab-iso",
      { quotaWeightedFloorPercent: 1 },
      { warn() {} },
      null
    )
  );

  assert.equal(ordered[0]?.connectionId, healthy);
  assert.equal(ordered.length, 3);
  assert.deepEqual(
    ordered.slice(1).map((t) => t.connectionId),
    low
  );
  for (const id of dead) {
    assert.equal(
      ordered.some((t) => t.connectionId === id),
      false
    );
  }
});

test("7 empty + 3 healthy → length 3, no hard-empty", async () => {
  const provider = "antigravity";
  registerQuotaFetcher(provider, async (connectionId) =>
    connectionId.startsWith("dead-") ? quotaAt(1, { limitReached: true }) : quotaAt(0.2)
  );
  const dead = Array.from({ length: 7 }, () => `dead-${randomUUID()}`);
  const ok = Array.from({ length: 3 }, () => `ok-${randomUUID()}`);
  _setSecureRandomFloatSource(() => 0);
  const ordered = await orderTargetsByQuotaWeighted(
    [...dead, ...ok].map((id) => makeTarget(provider, id)),
    "seven-three",
    {},
    { warn() {} },
    null
  );
  assert.equal(ordered.length, 3);
  for (const id of dead)
    assert.equal(
      ordered.some((t) => t.connectionId === id),
      false
    );
  for (const id of ok)
    assert.equal(
      ordered.some((t) => t.connectionId === id),
      true
    );
});

test("pickWeightedIndex skips non-positive weights", () => {
  assert.equal(pickWeightedIndex([0, 10], 0), 1);
  assert.equal(pickWeightedIndex([0, 10], 9.9), 1);
  assert.equal(pickWeightedIndex([0, 0, 0], 0), null);
});

test("pickWeightedIndex half-open boundary acc > r", () => {
  assert.equal(pickWeightedIndex([40, 20], 0), 0);
  assert.equal(pickWeightedIndex([40, 20], 39.999), 0);
  assert.equal(pickWeightedIndex([40, 20], 40), 1);
  assert.equal(pickWeightedIndex([40, 20], 59.999), 1);
});

test("weighted draw float 0 hits first pool member, ~1 hits last", async () => {
  const provider = "antigravity";
  const a1 = `a1-${randomUUID()}`;
  const a2 = `a2-${randomUUID()}`;
  registerQuotaFetcher(provider, async (connectionId) =>
    connectionId === a1 ? quotaAt(0.2) : quotaAt(0.6)
  );
  const targets = [makeTarget(provider, a1), makeTarget(provider, a2)];

  _setSecureRandomFloatSource(() => 0);
  const first = await orderTargetsByQuotaWeighted(targets, "bound0", {}, { warn() {} }, null);
  assert.equal(first[0]?.connectionId, a1);

  _clearInflightForTest();
  _setSecureRandomFloatSource(() => 0.999);
  const last = await orderTargetsByQuotaWeighted(targets, "bound1", {}, { warn() {} }, null);
  assert.equal(last[0]?.connectionId, a2);
});

test("tail is unused selected-pool by score desc then B", async () => {
  const provider = "antigravity";
  const a30 = `a30-${randomUUID()}`;
  const a20 = `a20-${randomUUID()}`;
  const a10 = `a10-${randomUUID()}`;
  const b08 = `b08-${randomUUID()}`;
  const b04 = `b04-${randomUUID()}`;
  const table: Record<string, number> = {
    [a30]: 0.7,
    [a20]: 0.8,
    [a10]: 0.9,
    [b08]: 0.992,
    [b04]: 0.996,
  };
  registerQuotaFetcher(provider, async (id) => quotaAt(table[id]));
  const targets = [a30, a20, a10, b08, b04].map((id) => makeTarget(provider, id));
  // Same frozen clock for the boundary and for the draw it steers.
  const ordered = await withFrozenClock(async () => {
    const cfg = resolveResetAwareConfig({});
    const s20 = scoreResetAwareQuota(quotaAt(0.8), cfg).score;
    const s30 = scoreResetAwareQuota(quotaAt(0.7), cfg).score;
    const s10 = scoreResetAwareQuota(quotaAt(0.9), cfg).score;
    assert.ok(s30 > s20 && s20 > s10);
    const sumA = s30 + s20 + s10;
    const float = (s30 + s20 / 2) / sumA;
    _setSecureRandomFloatSource(() => float);
    return orderTargetsByQuotaWeighted(
      targets,
      "tail",
      { quotaWeightedFloorPercent: 1 },
      { warn() {} },
      null
    );
  });
  assert.deepEqual(
    ordered.map((t) => t.connectionId),
    [a20, a30, a10, b08, b04]
  );
});

test("floor=0 puts 0.5% in the main pool", async () => {
  const provider = "antigravity";
  const low = `low-${randomUUID()}`;
  const ok = `ok-${randomUUID()}`;
  registerQuotaFetcher(provider, async (id) => (id === low ? quotaAt(0.995) : quotaAt(0.6)));
  _setSecureRandomFloatSource(() => 0);
  const ordered = await orderTargetsByQuotaWeighted(
    [makeTarget(provider, low), makeTarget(provider, ok)],
    "f0",
    { quotaWeightedFloorPercent: 0 },
    { warn() {} },
    null
  );
  assert.equal(ordered.length, 2);
  assert.equal(
    ordered.some((t) => t.connectionId === low),
    true
  );
  _clearInflightForTest();
  // The boundary is derived from scores taken here and then handed to an ordering call
  // that scores again. Both halves must see the same clock or the half-open boundary
  // lands on the wrong side of the draw.
  const lowFirst = await withFrozenClock(async () => {
    const cfg = resolveResetAwareConfig({});
    const sOk = scoreResetAwareQuota(quotaAt(0.6), cfg).score;
    const sLow = scoreResetAwareQuota(quotaAt(0.995), cfg).score;
    // Pool keeps expand order, not score order. r = sOk is the half-open
    // boundary after the healthy slot, so the leftover 0.5% account leads.
    _setSecureRandomFloatSource(() => sOk / (sOk + sLow));
    return orderTargetsByQuotaWeighted(
      [makeTarget(provider, ok), makeTarget(provider, low)],
      "f0-first",
      { quotaWeightedFloorPercent: 0 },
      { warn() {} },
      null
    );
  });
  assert.equal(lowFirst[0]?.connectionId, low);
});

test("only two 0.5% accounts still serve, never 404", async () => {
  const provider = "antigravity";
  const low = [`low-${randomUUID()}`, `low-${randomUUID()}`];
  registerQuotaFetcher(provider, async () => quotaAt(0.995));
  const targets = low.map((id) => makeTarget(provider, id));
  _setSecureRandomFloatSource(() => 0);
  const first = await orderTargetsByQuotaWeighted(targets, "only-low-0", {}, { warn() {} }, null);
  _setSecureRandomFloatSource(() => 0.999);
  const second = await orderTargetsByQuotaWeighted(targets, "only-low-1", {}, { warn() {} }, null);
  assert.equal(first.length, 2);
  assert.equal(second.length, 2);
  assert.ok(low.includes(first[0]?.connectionId ?? ""));
  assert.ok(low.includes(second[0]?.connectionId ?? ""));
});

test("pinned hard-empty connection stays dropped", async () => {
  const provider = "antigravity";
  const dead = `dead-${randomUUID()}`;
  registerQuotaFetcher(provider, async () => quotaAt(1, { limitReached: true }));
  const ordered = await orderTargetsByQuotaWeighted(
    [makeTarget(provider, dead)],
    "pin-dead",
    {},
    { warn() {} },
    null
  );
  assert.deepEqual(ordered, []);
});

test("family filter: gemini request ignores Claude-empty windows", async () => {
  const provider = "antigravity";
  const conn = `fam-${randomUUID()}`;
  assert.equal(getQuotaFetchScope(provider, "agy/gemini-3.8-flash-high"), "family:gemini");
  registerQuotaFetcher(provider, async (_id, connection) => {
    const model = String(connection?.requestedModel || "");
    assert.equal(model.includes("claude"), false, "gemini request must not fetch Claude snapshot");
    return quotaAt(0.2);
  });
  _setSecureRandomFloatSource(() => 0);
  const ordered = await orderTargetsByQuotaWeighted(
    [makeTarget(provider, conn, "gemini-3.8-flash-high")],
    "family",
    {},
    { warn() {} },
    null
  );
  assert.equal(ordered[0]?.connectionId, conn);

  registerQuotaFetcher(provider, async () => quotaAt(1, { limitReached: true }));
  const dropped = await orderTargetsByQuotaWeighted(
    [makeTarget(provider, conn, "gemini-3.8-flash-high")],
    "family-dead",
    {},
    { warn() {} },
    null
  );
  assert.equal(dropped.length, 0);
});

test("missing snapshot stays in A at score 0.5", async () => {
  const provider = "antigravity";
  const conn = `miss-${randomUUID()}`;
  registerQuotaFetcher(provider, async () => null);
  _setSecureRandomFloatSource(() => 0);
  const ordered = await orderTargetsByQuotaWeighted(
    [makeTarget(provider, conn)],
    "missing",
    {},
    { warn() {} },
    null
  );
  assert.equal(ordered.length, 1);
  assert.equal(ordered[0]?.connectionId, conn);
});

test("OPEN breaker targets are dropped; all OPEN → []", async () => {
  const openProv = `open-${randomUUID()}`;
  const closedProv = `closed-${randomUUID()}`;
  registerQuotaFetcher(openProv, async () => quotaAt(0.2));
  registerQuotaFetcher(closedProv, async () => quotaAt(0.2));
  const cb = getCircuitBreaker(openProv, { failureThreshold: 1, resetTimeout: 60_000 });
  cb._onFailure();
  assert.equal(cb.getStatus().state, "OPEN");
  _setSecureRandomFloatSource(() => 0);
  const mixed = await orderTargetsByQuotaWeighted(
    [makeTarget(openProv, `c-${randomUUID()}`), makeTarget(closedProv, `c-${randomUUID()}`)],
    "brk",
    {},
    { warn() {} },
    null
  );
  assert.equal(mixed.length, 1);
  assert.equal(mixed[0]?.provider, closedProv);

  const empty = await orderTargetsByQuotaWeighted(
    [makeTarget(openProv, `c2-${randomUUID()}`)],
    "brk-all",
    {},
    { warn() {} },
    null
  );
  assert.deepEqual(empty, []);
});

test("floor NaN/undefined → 1; -1 → 0; 101 → 100", async () => {
  const provider = "antigravity";
  const low = `low-${randomUUID()}`;
  const ok = `ok-${randomUUID()}`;
  registerQuotaFetcher(provider, async (id) => (id === low ? quotaAt(0.995) : quotaAt(0.6)));
  const targets = [makeTarget(provider, low), makeTarget(provider, ok)];
  _setSecureRandomFloatSource(() => 0);

  const def = await orderTargetsByQuotaWeighted(targets, "f1", {}, { warn() {} }, null);
  assert.equal(def[0]?.connectionId, ok);
  assert.equal(def.length, 2);

  const nan = await orderTargetsByQuotaWeighted(
    targets,
    "fnan",
    { quotaWeightedFloorPercent: Number.NaN },
    { warn() {} },
    null
  );
  assert.equal(nan[0]?.connectionId, ok);

  const abc = await orderTargetsByQuotaWeighted(
    targets,
    "fabc",
    { quotaWeightedFloorPercent: "abc" },
    { warn() {} },
    null
  );
  assert.equal(abc[0]?.connectionId, ok);

  const zero = await orderTargetsByQuotaWeighted(
    targets,
    "f0clamp",
    { quotaWeightedFloorPercent: -1 },
    { warn() {} },
    null
  );
  assert.equal(zero.length, 2);
  assert.equal(
    zero.some((t) => t.connectionId === low),
    true
  );

  const hundred = await orderTargetsByQuotaWeighted(
    targets,
    "f100",
    { quotaWeightedFloorPercent: 101 },
    { warn() {} },
    null
  );
  assert.equal(hundred.length, 2);

  // Number(null) and Number("") both coerce to 0, so an unset or blank key
  // would silently switch the floor off and let the 0.5% account lead.
  for (const blank of [null, ""]) {
    const res = await orderTargetsByQuotaWeighted(
      targets,
      `fblank-${String(blank)}`,
      { quotaWeightedFloorPercent: blank },
      { warn() {} },
      null
    );
    assert.equal(res[0]?.connectionId, ok, `floor=${JSON.stringify(blank)} must fall back to 1`);
  }
});

test("pinned connectionId outside apiKeyAllowedConnectionIds is dropped", async () => {
  const provider = "antigravity";
  const pinned = `pin-${randomUUID()}`;
  const other = `oth-${randomUUID()}`;
  registerQuotaFetcher(provider, async () => quotaAt(0.2));
  const ordered = await orderTargetsByQuotaWeighted(
    [makeTarget(provider, pinned)],
    "allow",
    {},
    { warn() {} },
    [other]
  );
  assert.deepEqual(ordered, []);
});

test("floor=100 puts remaining in (0,100] into B", async () => {
  const provider = "antigravity";
  const low = `low-${randomUUID()}`;
  const ok = `ok-${randomUUID()}`;
  registerQuotaFetcher(provider, async (id) => (id === low ? quotaAt(0.995) : quotaAt(0.6)));
  _setSecureRandomFloatSource(() => 0);
  const ordered = await orderTargetsByQuotaWeighted(
    [makeTarget(provider, low), makeTarget(provider, ok)],
    "f100-pool",
    { quotaWeightedFloorPercent: 100 },
    { warn() {} },
    null
  );
  assert.equal(ordered.length, 2);
  assert.equal(
    ordered.some((t) => t.connectionId === low),
    true
  );
  assert.equal(
    ordered.some((t) => t.connectionId === ok),
    true
  );
});

test("comboStrategySchema and HANDLED accept quota-weighted", () => {
  assert.equal(comboStrategySchema.safeParse("quota-weighted").success, true);
  assert.equal(HANDLED_COMBO_STRATEGIES.includes("quota-weighted"), true);
});

test("applyStrategyOrdering(quota-weighted) uses the orderer", async () => {
  const provider = "antigravity";
  const ok = `ok-${randomUUID()}`;
  const dead = `dead-${randomUUID()}`;
  registerQuotaFetcher(provider, async (id) =>
    id === dead ? quotaAt(1, { limitReached: true }) : quotaAt(0.2)
  );
  _setSecureRandomFloatSource(() => 0);
  const out = await applyStrategyOrdering(
    "quota-weighted",
    [makeTarget(provider, dead), makeTarget(provider, ok)],
    {
      combo: { id: "c", name: "c", models: [], config: {} },
      config: {},
      body: { messages: [] },
      log: { info() {}, warn() {}, error() {}, debug() {} },
      apiKeyAllowedConnections: null,
    }
  );
  assert.equal(out.orderedTargets[0]?.connectionId, ok);
  assert.ok(out.quotaShareRelease);
  out.quotaShareRelease?.();
});

const pipelineLog = { info() {}, warn() {}, error() {}, debug() {} };

function pinComboModels(provider, model, connectionIds) {
  connectionIds.forEach((id) => seedConnection(provider, id));
  return connectionIds.map((connectionId, index) => ({
    kind: "model",
    provider,
    providerId: provider,
    model,
    connectionId,
    id: `step-${index}`,
  }));
}

function healthyStickiness() {
  __setStickinessHeadroomFetcherForTests(async () => ({ util5h: 0.1, util7d: 0.1 }));
  __setStickinessConnectionFetcherForTests(async () => undefined);
  __setStickinessQuotaCheckerForTests(() => false);
}

test("in-flight load on the higher-score account flips the 0.4 draw to the idle twin", async () => {
  const provider = "antigravity";
  const busy = `busy-${randomUUID()}`;
  const idle = `idle-${randomUUID()}`;
  registerQuotaFetcher(provider, async () => quotaAt(0.2));
  incrementInflight(busy);
  _setSecureRandomFloatSource(() => 0.4);
  const ordered = await orderTargetsByQuotaWeighted(
    [makeTarget(provider, busy), makeTarget(provider, idle)],
    "inflight-flip",
    {},
    { warn() {} },
    null
  );
  assert.equal(ordered[0]?.connectionId, idle);
});

test("applyStrategyOrdering(quota-weighted) reserves the draw; pipeline keeps it when stickiness does not move", async () => {
  const provider = "antigravity";
  const model = "gemini-3.8-flash-high";
  const busy = `busy-${randomUUID()}`;
  const idle = `idle-${randomUUID()}`;
  registerQuotaFetcher(provider, async () => quotaAt(0.2));
  incrementInflight(busy);
  _setSecureRandomFloatSource(() => 0.4);
  const ordered = await applyStrategyOrdering(
    "quota-weighted",
    [makeTarget(provider, busy), makeTarget(provider, idle)],
    {
      combo: { id: "c-ord", name: "c-ord", models: [], config: {} },
      config: {},
      body: { messages: [] },
      log: pipelineLog,
      apiKeyAllowedConnections: null,
    }
  );
  assert.ok(ordered.quotaShareRelease);
  assert.equal(ordered.orderedTargets[0]?.connectionId, idle);
  assert.equal(getInflight(idle), 1);
  assert.equal(getInflight(busy), 1);
  ordered.quotaShareRelease?.();
  assert.equal(getInflight(idle), 0);
  assert.equal(getInflight(busy), 1);

  healthyStickiness();
  const combo = {
    id: "c-pipe",
    name: "c-pipe",
    models: pinComboModels(provider, model, [busy, idle]),
    config: {},
  };
  const result = await resolveComboTargetPipeline({
    body: { messages: [{ role: "user", content: `new-${randomUUID()}` }] },
    combo,
    strategy: "quota-weighted",
    config: {},
    settings: null,
    allCombos: null,
    relayOptions: null,
    signal: null,
    apiKeyAllowedConnections: null,
    log: pipelineLog,
    resilienceSettings: { providerCooldown: { enabled: false } },
    isModelAvailable: undefined,
    handleSingleModelWithTimeout: async () => new Response("{}"),
    buildAutoCandidates: async () => [],
  });
  assert.equal("earlyResponse" in result, false);
  if ("earlyResponse" in result) return;
  assert.equal(result.orderedTargets[0]?.connectionId, idle);
  assert.ok(result.quotaShareRelease);
  assert.equal(getInflight(idle), 1);
  result.quotaShareRelease();
  assert.equal(getInflight(idle), 0);
  result.quotaShareRelease();
  assert.equal(getInflight(idle), 0);
});

test("sticky pin keeps the old account as [0] even when in-flight would flip the draw", async () => {
  const provider = "antigravity";
  const model = "gemini-3.8-flash-high";
  const busy = `busy-${randomUUID()}`;
  const idle = `idle-${randomUUID()}`;
  registerQuotaFetcher(provider, async () => quotaAt(0.2));
  incrementInflight(busy);
  _setSecureRandomFloatSource(() => 0.4);
  healthyStickiness();
  const messages = [{ role: "user", content: `sticky-${randomUUID()}` }];
  const comboName = `qw-sticky-${randomUUID()}`;
  const probe = await applySessionStickiness(
    [makeTarget(provider, busy), makeTarget(provider, idle)],
    messages,
    comboName
  );
  assert.ok(probe.messageHash);
  recordStickyBinding(probe.messageHash, busy, comboName);
  const combo = {
    id: comboName,
    name: comboName,
    models: pinComboModels(provider, model, [busy, idle]),
    config: {},
  };
  const result = await resolveComboTargetPipeline({
    body: { messages },
    combo,
    strategy: "quota-weighted",
    config: {},
    settings: null,
    allCombos: null,
    relayOptions: null,
    signal: null,
    apiKeyAllowedConnections: null,
    log: pipelineLog,
    resilienceSettings: { providerCooldown: { enabled: false } },
    isModelAvailable: undefined,
    handleSingleModelWithTimeout: async () => new Response("{}"),
    buildAutoCandidates: async () => [],
  });
  assert.equal("earlyResponse" in result, false);
  if ("earlyResponse" in result) return;
  assert.equal(result.sticky.stuck, true);
  assert.equal(result.orderedTargets[0]?.connectionId, busy);
  assert.equal(getInflight(busy), 2);
  assert.equal(getInflight(idle), 0);
  result.quotaShareRelease?.();
  assert.equal(getInflight(busy), 1);
});

test("hard-empty sticky account is dropped; pipeline reserves the live draw", async () => {
  const provider = "antigravity";
  const model = "gemini-3.8-flash-high";
  const dead = `dead-${randomUUID()}`;
  const ok = `ok-${randomUUID()}`;
  registerQuotaFetcher(provider, async (id) =>
    id === dead ? quotaAt(1, { limitReached: true }) : quotaAt(0.2)
  );
  _setSecureRandomFloatSource(() => 0);
  healthyStickiness();
  const messages = [{ role: "user", content: `empty-${randomUUID()}` }];
  const comboName = `qw-empty-${randomUUID()}`;
  const probe = await applySessionStickiness(
    [makeTarget(provider, dead), makeTarget(provider, ok)],
    messages,
    comboName
  );
  assert.ok(probe.messageHash);
  recordStickyBinding(probe.messageHash, dead, comboName);
  const combo = {
    id: comboName,
    name: comboName,
    models: pinComboModels(provider, model, [dead, ok]),
    config: {},
  };
  const result = await resolveComboTargetPipeline({
    body: { messages },
    combo,
    strategy: "quota-weighted",
    config: {},
    settings: null,
    allCombos: null,
    relayOptions: null,
    signal: null,
    apiKeyAllowedConnections: null,
    log: pipelineLog,
    resilienceSettings: { providerCooldown: { enabled: false } },
    isModelAvailable: undefined,
    handleSingleModelWithTimeout: async () => new Response("{}"),
    buildAutoCandidates: async () => [],
  });
  assert.equal("earlyResponse" in result, false);
  if ("earlyResponse" in result) return;
  assert.equal(result.sticky.stuck, false);
  assert.equal(result.orderedTargets[0]?.connectionId, ok);
  assert.equal(getInflight(dead), 0);
  assert.equal(getInflight(ok), 1);
  result.quotaShareRelease?.();
});

test("disableSessionStickiness on the live pipeline re-draws past a leftover sticky pin", async () => {
  const provider = "antigravity";
  const model = "gemini-3.8-flash-high";
  const busy = `busy-${randomUUID()}`;
  const idle = `idle-${randomUUID()}`;
  registerQuotaFetcher(provider, async () => quotaAt(0.2));
  incrementInflight(busy);
  _setSecureRandomFloatSource(() => 0.4);
  healthyStickiness();
  const messages = [{ role: "user", content: `live-sticky-${randomUUID()}` }];
  const comboName = `qw-live-${randomUUID()}`;
  const probe = await applySessionStickiness(
    [makeTarget(provider, busy), makeTarget(provider, idle)],
    messages,
    comboName
  );
  assert.ok(probe.messageHash);
  recordStickyBinding(probe.messageHash, busy, comboName);
  const result = await resolveComboTargetPipeline({
    body: { messages },
    combo: {
      id: comboName,
      name: comboName,
      models: pinComboModels(provider, model, [busy, idle]),
      config: { disableSessionStickiness: true },
    },
    strategy: "quota-weighted",
    config: { disableSessionStickiness: true },
    settings: null,
    allCombos: null,
    relayOptions: null,
    signal: null,
    apiKeyAllowedConnections: null,
    log: pipelineLog,
    resilienceSettings: { providerCooldown: { enabled: false } },
    isModelAvailable: undefined,
    handleSingleModelWithTimeout: async () => new Response("{}"),
    buildAutoCandidates: async () => [],
  });
  assert.equal("earlyResponse" in result, false);
  if ("earlyResponse" in result) return;
  assert.equal(result.sticky.stuck, false);
  assert.equal(result.orderedTargets[0]?.connectionId, idle);
  assert.equal(getInflight(idle), 1);
  assert.equal(getInflight(busy), 1);
  result.quotaShareRelease?.();
});

test("ten equal-score pinned Gemini accounts: in-flight on the first flips a mid-band draw", async () => {
  const provider = "antigravity";
  const ids = Array.from({ length: 10 }, () => `g-${randomUUID()}`);
  const targets = ids.map((id) => makeTarget(provider, id));
  registerQuotaFetcher(provider, async () => quotaAt(0.25));
  // 10 equal weights → slot 0 is [0, 0.10). 1 inflight on [0] shrinks it to
  // [0, 0.5/9.5) ≈ [0, 0.0526). 0.07 sits in that gap: hits [0] idle, misses [0] busy.
  _setSecureRandomFloatSource(() => 0.07);
  const idle = await orderTargetsByQuotaWeighted(targets, "ten-agy-idle", {}, { warn() {} }, null);
  assert.equal(idle[0]?.connectionId, ids[0]);

  incrementInflight(ids[0]);
  const busy = await orderTargetsByQuotaWeighted(targets, "ten-agy-busy", {}, { warn() {} }, null);
  assert.equal(busy.length, 10);
  assert.notEqual(busy[0]?.connectionId, ids[0]);
  assert.equal(ids.includes(busy[0]?.connectionId ?? ""), true);
});

test("three hard-empty of ten never win the first draw", async () => {
  const provider = "antigravity";
  const dead = Array.from({ length: 3 }, () => `dead-${randomUUID()}`);
  const ok = Array.from({ length: 7 }, () => `ok-${randomUUID()}`);
  registerQuotaFetcher(provider, async (id) =>
    dead.includes(id) ? quotaAt(1, { limitReached: true }) : quotaAt(0.25)
  );
  _setSecureRandomFloatSource(() => 0);
  const ordered = await orderTargetsByQuotaWeighted(
    [...dead, ...ok].map((id) => makeTarget(provider, id)),
    "three-of-ten-empty",
    {},
    { warn() {} },
    null
  );
  assert.equal(ordered.length, 7);
  assert.equal(dead.includes(ordered[0]?.connectionId ?? ""), false);
  for (const id of dead)
    assert.equal(
      ordered.some((t) => t.connectionId === id),
      false
    );
  for (const id of ok)
    assert.equal(
      ordered.some((t) => t.connectionId === id),
      true
    );
});

test("quota-weighted Gemini keeps the account when only Claude weekly is empty", async () => {
  const provider = "antigravity";
  const conn = `mix-${randomUUID()}`;
  const resetAt5h = iso(5 * 3600_000);
  const resetAt7d = iso(7 * 86_400_000);
  const usage = {
    quotas: {
      "gemini-3.8-flash-high": {
        remainingPercentage: 80,
        resetAt: resetAt5h,
      },
      "claude-sonnet-4-5": {
        remainingPercentage: 0,
        resetAt: resetAt7d,
      },
      gemini_weekly: {
        remainingPercentage: 70,
        resetAt: resetAt7d,
      },
      claude_gpt_weekly: {
        remainingPercentage: 0,
        resetAt: resetAt7d,
      },
    },
  };
  const scoped = convertUsageToQuotaInfo(usage, {
    provider,
    requestedModel: "agy/gemini-3.8-flash-high",
  });
  assert.ok(scoped);
  assert.equal(scoped.limitReached, false);
  assert.ok(getResetAwareRemainingPercent(scoped) > 1);
  registerQuotaFetcher(provider, async () => scoped);
  _setSecureRandomFloatSource(() => 0);
  const ordered = await orderTargetsByQuotaWeighted(
    [makeTarget(provider, conn, "gemini-3.8-flash-high")],
    "claude-empty-gemini-live",
    {},
    { warn() {} },
    null
  );
  assert.equal(ordered.length, 1);
  assert.equal(ordered[0]?.connectionId, conn);

  const unscoped = convertUsageToQuotaInfo(usage);
  assert.equal(unscoped?.limitReached, true);
});

test("orderer half-open boundary: 0.66 stays on A1, 0.67 flips to A2", async () => {
  const provider = "antigravity";
  const a1 = `a1-${randomUUID()}`;
  const a2 = `a2-${randomUUID()}`;
  registerQuotaFetcher(provider, async (id) => (id === a1 ? quotaAt(0.2) : quotaAt(0.6)));
  const targets = [makeTarget(provider, a1), makeTarget(provider, a2)];
  // A half-open boundary compared against scores taken at a different instant is a
  // coin flip; both sides need the same frozen clock.
  const { stay, flip } = await withFrozenClock(async () => {
    const cfg = resolveResetAwareConfig({});
    const s1 = scoreResetAwareQuota(quotaAt(0.2), cfg).score;
    const s2 = scoreResetAwareQuota(quotaAt(0.6), cfg).score;
    assert.ok(s1 > s2);
    const sum = s1 + s2;

    _setSecureRandomFloatSource(() => (s1 - 0.01) / sum);
    const stayResult = await orderTargetsByQuotaWeighted(
      targets,
      "bound-stay",
      {},
      { warn() {} },
      null
    );

    _clearInflightForTest();
    _setSecureRandomFloatSource(() => s1 / sum);
    const flipResult = await orderTargetsByQuotaWeighted(
      targets,
      "bound-flip",
      {},
      { warn() {} },
      null
    );
    return { stay: stayResult, flip: flipResult };
  });
  assert.equal(stay[0]?.connectionId, a1);
  assert.equal(flip[0]?.connectionId, a2);
});

test("p2c ordering does not drop hard-empty the way quota-weighted does", async () => {
  const provider = "antigravity";
  const dead = `dead-${randomUUID()}`;
  const ok = `ok-${randomUUID()}`;
  registerQuotaFetcher(provider, async (id) =>
    id === dead ? quotaAt(1, { limitReached: true }) : quotaAt(0.2)
  );
  _setSecureRandomFloatSource(() => 0);
  const weighted = await applyStrategyOrdering(
    "quota-weighted",
    [makeTarget(provider, dead), makeTarget(provider, ok)],
    {
      combo: { id: "c-qw", name: "c-qw", models: [], config: {} },
      config: {},
      body: { messages: [] },
      log: pipelineLog,
      apiKeyAllowedConnections: null,
    }
  );
  assert.equal(weighted.orderedTargets.length, 1);
  assert.equal(weighted.orderedTargets[0]?.connectionId, ok);

  const p2c = await applyStrategyOrdering(
    "p2c",
    [makeTarget(provider, dead), makeTarget(provider, ok)],
    {
      combo: { id: "c-p2c", name: "c-p2c", models: [], config: {} },
      config: {},
      body: { messages: [] },
      log: pipelineLog,
      apiKeyAllowedConnections: null,
    }
  );
  assert.equal(p2c.orderedTargets.length, 2);
  assert.equal(
    p2c.orderedTargets.some((t) => t.connectionId === dead),
    true
  );
});

test("two pipelines starting together do not both land on the same idle account", async () => {
  const provider = "antigravity";
  const model = "gemini-3.8-flash-high";
  const first = `first-${randomUUID()}`;
  const second = `second-${randomUUID()}`;
  registerQuotaFetcher(provider, async () => {
    await Promise.resolve();
    return quotaAt(0.2);
  });
  // 0.4 sits past the diluted first slot once the first pipeline has reserved.
  _setSecureRandomFloatSource(() => 0.4);
  healthyStickiness();
  const comboName = `qw-race-${randomUUID()}`;
  const run = (content: string) =>
    resolveComboTargetPipeline({
      body: { messages: [{ role: "user", content }] },
      combo: {
        id: comboName,
        name: comboName,
        models: pinComboModels(provider, model, [first, second]),
        config: { disableSessionStickiness: true },
      },
      strategy: "quota-weighted",
      config: { disableSessionStickiness: true },
      settings: null,
      allCombos: null,
      relayOptions: null,
      signal: null,
      apiKeyAllowedConnections: null,
      log: pipelineLog,
      resilienceSettings: { providerCooldown: { enabled: false } },
      isModelAvailable: undefined,
      handleSingleModelWithTimeout: async () => new Response("{}"),
      buildAutoCandidates: async () => [],
    });

  const [left, right] = await Promise.all([run(`a-${randomUUID()}`), run(`b-${randomUUID()}`)]);
  assert.equal("earlyResponse" in left, false);
  assert.equal("earlyResponse" in right, false);
  if ("earlyResponse" in left || "earlyResponse" in right) return;
  const winners = [left.orderedTargets[0]?.connectionId, right.orderedTargets[0]?.connectionId];
  assert.notEqual(winners[0], winners[1]);
  assert.equal(new Set(winners).size, 2);
  assert.equal(getInflight(first) + getInflight(second), 2);
  left.quotaShareRelease?.();
  right.quotaShareRelease?.();
});

test("quota-share sticky pin transfers the inflight slot to the pinned account", async () => {
  const provider = "anthropic";
  const model = "claude-sonnet-4-5";
  const drawn = `drawn-${randomUUID()}`;
  const pinned = `pinned-${randomUUID()}`;
  healthyStickiness();
  const messages = [{ role: "user", content: `qs-sticky-${randomUUID()}` }];
  const comboName = `qtSd/qs-sticky-${randomUUID()}`;
  const probe = await applySessionStickiness(
    [makeTarget(provider, drawn, model), makeTarget(provider, pinned, model)],
    messages,
    comboName
  );
  assert.ok(probe.messageHash);
  recordStickyBinding(probe.messageHash, pinned, comboName);
  const result = await resolveComboTargetPipeline({
    body: { messages, model: `${provider}/${model}` },
    combo: {
      id: comboName,
      name: comboName,
      models: pinComboModels(provider, model, [drawn, pinned]),
      config: {},
    },
    strategy: "quota-share",
    config: {},
    settings: null,
    allCombos: null,
    relayOptions: null,
    signal: null,
    apiKeyAllowedConnections: null,
    log: pipelineLog,
    resilienceSettings: { providerCooldown: { enabled: false } },
    isModelAvailable: undefined,
    handleSingleModelWithTimeout: async () => new Response("{}"),
    buildAutoCandidates: async () => [],
  });
  assert.equal("earlyResponse" in result, false);
  if ("earlyResponse" in result) return;
  assert.equal(result.sticky.stuck, true);
  assert.equal(result.orderedTargets[0]?.connectionId, pinned);
  assert.equal(
    getInflight(drawn),
    0,
    "drawn account must drop the slot after stickiness moves [0]"
  );
  assert.equal(getInflight(pinned), 1, "pinned account must hold the transferred slot");
  result.quotaShareRelease?.();
  assert.equal(getInflight(pinned), 0);
  assert.equal(getInflight(drawn), 0);
});
