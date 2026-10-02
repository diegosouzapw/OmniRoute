/**
 * #15347 — a malformed quota reading must not score as a full one.
 *
 * `quotaRemainingPercentFromQuota` used to return 100 for any quota object it could not
 * parse, so a provider whose usage endpoint returned garbage outranked every provider that
 * honestly reported 60% consumed. A present-but-unreadable snapshot is evidence about the
 * telemetry, not the provider: it must rank strictly below any real reading (like the #4540
 * status penalty) without being blocked or evicted.
 *
 * A MISSING snapshot (null / undefined / a throwing fetcher) is a different case and is not
 * changed: every quota fetcher returns null to fail open for unlimited plans, message-only
 * usage payloads, missing credentials and upstream errors alike.
 *
 * Coverage:
 *   1. predicate: malformed -> null; missing -> 100 (fail open); real readings unchanged
 *   2. buildAutoCandidates flags a malformed snapshot, never blocks it (cutoff off AND on)
 *   3. scoreAutoTargets keeps it in the pool but strictly below real readings, including a
 *      real 100%-used one (end to end: buildAutoCandidates -> scoreAutoTargets)
 *   4. no-fetcher and fail-open candidates are untouched
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-unreadable-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { buildAutoCandidates } = await import("../../open-sse/services/combo.ts");
const { scoreAutoTargets } = await import("../../open-sse/services/combo/autoStrategy.ts");
const { quotaRemainingPercentFromQuota } =
  await import("../../open-sse/services/combo/comboPredicates.ts");
const { registerQuotaFetcher } = await import("../../open-sse/services/quotaPreflight.ts");
const { resolveResilienceSettings } = await import("../../src/lib/resilience/settings.ts");

// ── 1. The predicate ────────────────────────────────────────────────────────

test("a present-but-malformed quota is unreadable (null), not 100% remaining (#15347)", () => {
  const unreadable: Array<[string, unknown]> = [
    ["non-object string", "oops"],
    ["non-object number", 42],
    ["empty object", {}],
    ["percentUsed: null (Number(null) === 0)", { percentUsed: null }],
    ["percentUsed: NaN", { percentUsed: Number.NaN }],
    ['percentUsed: ""', { percentUsed: "" }],
    ['percentUsed: " " (Number(" ") === 0)', { percentUsed: " " }],
    ["percentUsed: true (Number(true) === 1)", { percentUsed: true }],
    ["windows with a null percentUsed", { windows: { session: { percentUsed: null } } }],
    ['windows with a "" percentUsed', { windows: { session: { percentUsed: "" } } }],
    ["empty windows map", { windows: {} }],
    ["array windows and no percentUsed", { windows: [] }],
  ];
  for (const [label, quota] of unreadable) {
    assert.equal(
      quotaRemainingPercentFromQuota(quota),
      null,
      `${label} must be unreadable, got ${quotaRemainingPercentFromQuota(quota)}`
    );
  }
});

test("a missing quota fails open at 100: every fetcher returns null for 'no signal' (#15347)", () => {
  assert.equal(quotaRemainingPercentFromQuota(null), 100);
  assert.equal(quotaRemainingPercentFromQuota(undefined), 100);
});

test("real quota readings keep their remaining percentage (#15347)", () => {
  assert.equal(quotaRemainingPercentFromQuota({ percentUsed: 0 }), 100);
  assert.equal(quotaRemainingPercentFromQuota({ percentUsed: 0.4 }), 60);
  assert.equal(quotaRemainingPercentFromQuota({ percentUsed: "0.25" }), 75);
  assert.equal(quotaRemainingPercentFromQuota({ percentUsed: 1 }), 0);
  assert.equal(quotaRemainingPercentFromQuota({ limitReached: true }), 0);
  assert.equal(quotaRemainingPercentFromQuota({ windows: [], percentUsed: 0.5 }), 50);
  assert.equal(
    quotaRemainingPercentFromQuota({
      windows: { session: { percentUsed: 0.1 }, weekly: { percentUsed: 0.75 } },
    }),
    25
  );
});

test("an unparseable window is skipped, not read as 0% used (#15347)", () => {
  // Before: Number(null) === 0 made the null window `a` look 0% used.
  assert.equal(
    quotaRemainingPercentFromQuota({
      windows: { a: { percentUsed: null }, b: { percentUsed: 1 } },
    }),
    0,
    "a null window must not mask a real exhausted one"
  );
  assert.equal(
    quotaRemainingPercentFromQuota({
      windows: { a: { percentUsed: null }, b: { percentUsed: 0.3 } },
    }),
    70
  );
  assert.equal(
    quotaRemainingPercentFromQuota({ windows: { a: { percentUsed: null } }, limitReached: true }),
    0,
    "limitReached still wins when no window is readable"
  );
});

test("an Antigravity-scoped request ignores unparseable windows too (#15347)", () => {
  const remaining = quotaRemainingPercentFromQuota(
    {
      windows: {
        gemini_weekly: { percentUsed: null },
        "gemini-3.1-flash-lite": { percentUsed: 0.1 },
      },
    },
    { provider: "agy", requestedModel: "gemini-3.1-flash-lite" }
  );
  assert.equal(remaining, 90);
});

// ── 2 + 3 + 4. buildAutoCandidates and scoring ──────────────────────────────

// A provider id nothing else in the repo registers, so the module-level fetcher registry
// cannot leak into (or out of) other test files when they share a process.
const PROVIDER = "unreadable-quota-test";
const READINGS = new Map<string, unknown>();
const THROWING = new Set<string>();

registerQuotaFetcher(PROVIDER, async (connectionId: string) => {
  if (THROWING.has(connectionId)) throw new Error("usage endpoint down");
  return (READINGS.get(connectionId) ?? null) as never;
});

async function seedConn(name: string, provider = PROVIDER) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name,
    apiKey: `sk-${name}`,
    isActive: true,
  });
}

function stepFor(provider: string, model: string) {
  return {
    kind: "model",
    stepId: `${provider}/${model}`,
    executionKey: `${provider}/${model}`,
    modelStr: `${provider}/${model}`,
    provider,
    providerId: provider,
    connectionId: null,
    weight: 1,
    label: null,
  } as never;
}

// Quota plus health: the rest of the score must be positive, or a multiplier cannot separate
// two zeros. Candidates are identical apart from their quota, so only that factor differs.
const QUOTA_AND_HEALTH_WEIGHTS = {
  quota: 0.5,
  health: 0.5,
  costInv: 0,
  latencyInv: 0,
  taskFit: 0,
  stability: 0,
  tierPriority: 0,
  tierAffinity: 0,
  specificityMatch: 0,
  contextAffinity: 0,
  resetWindowAffinity: 0,
  connectionDensity: 0,
};

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  READINGS.clear();
  THROWING.clear();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("buildAutoCandidates flags a malformed quota, keeps it, and never blocks it (#15347)", async () => {
  const real = await seedConn("real-60");
  const emptyObject = await seedConn("empty-object");
  const nullPercent = await seedConn("null-percent");
  READINGS.set(real.id, { used: 40, total: 100, percentUsed: 0.4 });
  READINGS.set(emptyObject.id, {});
  READINGS.set(nullPercent.id, { used: 0, total: 0, percentUsed: null });

  // The hard cutoff is opt-in; an unreadable reading must stay unblocked either way.
  const cutoffOn = resolveResilienceSettings({
    resilienceSettings: { quotaPreflight: { enabled: true } },
  });
  for (const resilience of [null, cutoffOn]) {
    const candidates = await buildAutoCandidates(
      [stepFor(PROVIDER, "m1")],
      `auto-unreadable-15347-${resilience ? "on" : "off"}`,
      null,
      undefined,
      resilience
    );
    const byConnection = new Map(candidates.map((c) => [c.connectionId, c]));

    assert.equal(byConnection.get(real.id)?.quotaRemaining, 60, "a real reading is untouched");
    assert.notEqual(byConnection.get(real.id)?.quotaUnreadable, true);
    for (const [label, id] of [
      ["empty object", emptyObject.id],
      ["percentUsed: null", nullPercent.id],
    ] as const) {
      const candidate = byConnection.get(id);
      assert.ok(candidate, `${label}: must stay in the candidate pool (never evicted)`);
      assert.equal(candidate!.quotaUnreadable, true, `${label}: must be flagged unreadable`);
      assert.equal(candidate!.quotaRemaining, 0, `${label}: worst on the quota axis`);
      assert.notEqual(candidate!.quotaCutoffBlocked, true, `${label}: must not be hard-blocked`);
    }
  }
});

test("a malformed quota ranks strictly below every real reading, even 100% used (#15347)", async () => {
  const healthy = await seedConn("healthy-60");
  const exhausted = await seedConn("exhausted-100-used");
  const malformed = await seedConn("malformed");
  READINGS.set(healthy.id, { used: 40, total: 100, percentUsed: 0.4 });
  READINGS.set(exhausted.id, { used: 100, total: 100, percentUsed: 1 });
  READINGS.set(malformed.id, {});

  const step = stepFor(PROVIDER, "m1");
  const candidates = await buildAutoCandidates([step], "auto-unreadable-15347-rank");
  const targets = candidates.map((candidate) => ({
    ...(step as object),
    stepId: candidate.stepId,
    executionKey: candidate.executionKey,
    modelStr: candidate.modelStr,
    provider: candidate.provider,
    connectionId: candidate.connectionId,
  })) as never[];

  const ranked = scoreAutoTargets(targets, candidates, "general", QUOTA_AND_HEALTH_WEIGHTS);
  const scoreOf = (id: string) =>
    ranked.find((entry) => entry.target.connectionId === id)?.score as number;

  assert.equal(ranked.length, 3, "the malformed candidate must not be filtered out");
  assert.ok(scoreOf(healthy.id) > scoreOf(exhausted.id), "60% beats 0%");
  assert.ok(
    scoreOf(malformed.id) < scoreOf(exhausted.id),
    `malformed (${scoreOf(malformed.id)}) must score strictly below a real 100%-used reading (${scoreOf(exhausted.id)})`
  );
  assert.equal(ranked[0]?.target.connectionId, healthy.id);
  assert.equal(ranked[2]?.target.connectionId, malformed.id);
});

test("a missing or throwing fetch fails open and is not flagged (#15347 scope)", async () => {
  const nullFetch = await seedConn("null-fetch");
  const throwing = await seedConn("throwing-fetch");
  THROWING.add(throwing.id);

  const candidates = await buildAutoCandidates(
    [stepFor(PROVIDER, "m1")],
    "auto-unreadable-15347-open"
  );
  for (const [label, id] of [
    ["null fetch (unlimited / message-only / no credentials)", nullFetch.id],
    ["throwing fetch", throwing.id],
  ] as const) {
    const candidate = candidates.find((c) => c.connectionId === id);
    assert.ok(candidate, `${label}: candidate must exist`);
    assert.equal(candidate!.quotaRemaining, 100, `${label}: fails open, as every fetcher intends`);
    assert.notEqual(candidate!.quotaUnreadable, true, `${label}: is not 'unreadable'`);
  }
});

test("a real 0%-used reading stays 100% remaining (#15347)", async () => {
  const full = await seedConn("full-0-used");
  READINGS.set(full.id, { used: 0, total: 100, percentUsed: 0 });

  const candidates = await buildAutoCandidates(
    [stepFor(PROVIDER, "m1")],
    "auto-unreadable-15347-full"
  );
  assert.equal(candidates.find((c) => c.connectionId === full.id)?.quotaRemaining, 100);
});

test("a provider with no registered quota fetcher keeps its default (#15347 scope)", async () => {
  const conn = await seedConn("no-fetcher", "unreadable-quota-no-fetcher");
  const candidates = await buildAutoCandidates(
    [stepFor("unreadable-quota-no-fetcher", "m1")],
    "auto-unreadable-15347-nofetcher"
  );
  const candidate = candidates.find((c) => c.connectionId === conn.id);
  assert.ok(candidate, "no-fetcher candidate must exist");
  assert.equal(candidate!.quotaRemaining, 100, "no telemetry source is not a telemetry failure");
  assert.notEqual(candidate!.quotaUnreadable, true);
});
