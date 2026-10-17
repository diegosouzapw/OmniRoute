import test, { after, afterEach, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { QuotaInfo } from "../../../open-sse/services/quotaPreflight.ts";
import type { ResolvedComboTarget } from "../../../open-sse/services/combo/types.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-qw-pace-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const dbCore = await import("../../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../../src/lib/db/providers.ts");
const quotaCache = await import("../../../src/domain/quotaCache.ts");
const { registerQuotaFetcher } = await import("../../../open-sse/services/quotaPreflight.ts");
const { convertUsageToQuotaInfo } =
  await import("../../../open-sse/services/genericQuotaFetcher.ts");
const { orderTargetsByQuotaWeighted } =
  await import("../../../open-sse/services/combo/quotaStrategies.ts");
const { resolveResetAwareConfig, scoreResetAwareQuota, getResetAwareRemainingPercent } =
  await import("../../../open-sse/services/combo/quotaScoring.ts");
const { applyStrategyOrdering } =
  await import("../../../open-sse/services/combo/applyStrategyOrdering.ts");
const { resolveComboConfig, resolveComboSetupConfig } =
  await import("../../../open-sse/services/comboConfig.ts");
const { stripDeadComboConfigKeys } = await import("../../../src/lib/combos/deadConfigKeys.ts");
const {
  comboRuntimeConfigSchema,
  createComboSchema,
  updateComboSchema,
  updateComboDefaultsSchema,
} = await import("../../../src/shared/validation/schemas/combo.ts");
const { resetAllCircuitBreakers } = await import("../../../src/shared/utils/circuitBreaker.ts");
const { _setSecureRandomFloatSource } = await import("../../../src/shared/utils/secureRandom.ts");
const { _clearInflightForTest, incrementInflight, getInflight } =
  await import("../../../open-sse/services/combo/quotaShareInflight.ts");

const NOW = Date.parse("2026-10-13T00:00:00Z");
const HOUR = 3_600_000;
const realNow = Date.now;
let clock = NOW;
const resetAt = (hours: number) => new Date(NOW + hours * HOUR).toISOString();
const log = { info() {}, warn() {}, debug() {} };

beforeEach(() => {
  clock = NOW;
  Date.now = () => clock;
});
afterEach(() => {
  Date.now = realNow;
  _setSecureRandomFloatSource(null);
  quotaCache.__clearForTests();
  resetAllCircuitBreakers();
  _clearInflightForTest();
});
after(() => {
  dbCore.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

function quotaAt(weeklyHours: number, percentUsed = 0.5, sessionUsed = percentUsed): QuotaInfo {
  return {
    used: percentUsed * 100,
    total: 100,
    percentUsed,
    limitReached: false,
    window5h: { percentUsed: sessionUsed, resetAt: resetAt(2) },
    window7d: { percentUsed, resetAt: resetAt(weeklyHours) },
  };
}

async function seedTargets(
  quotas: Array<QuotaInfo | null>,
  provider = "codex",
  model = "gpt-5-codex",
  names: string[] = []
): Promise<ResolvedComboTarget[]> {
  const snapshots = new Map<string, QuotaInfo | null>();
  const targets: ResolvedComboTarget[] = [];
  for (const quota of quotas) {
    const row = await createProviderConnection({
      provider,
      name: names[targets.length] ?? `pace-${targets.length}`,
      isActive: true,
      testStatus: "active",
      authType: "apikey",
    });
    const connectionId = String(row.id);
    snapshots.set(connectionId, quota);
    targets.push({
      kind: "model",
      stepId: `step-${connectionId}`,
      executionKey: `${provider}/${model}@${connectionId}`,
      modelStr: `${provider}/${model}`,
      provider,
      providerId: provider,
      connectionId,
      weight: 1,
      label: null,
    });
  }
  registerQuotaFetcher(provider, async (id) => snapshots.get(id) ?? null);
  return targets;
}

function assertOrder(actual: ResolvedComboTarget[], expected: ResolvedComboTarget[]) {
  assert.deepEqual(
    actual.map((target) => target.executionKey),
    expected.map((target) => target.executionKey)
  );
}

async function draw(
  targets: ResolvedComboTarget[],
  config: Record<string, unknown>,
  random: number
) {
  _clearInflightForTest();
  _setSecureRandomFloatSource(() => random);
  return orderTargetsByQuotaWeighted(targets, "quota-pace", config, log, null);
}

// Import inside pure cases so a missing leaf does not mask the orderer/schema RED assertions.
async function paceScore(quota: unknown, configSource: Record<string, unknown> = {}) {
  const { scoreQuotaPace } = await import("../../../open-sse/services/combo/quotaPaceScoring.ts");
  return scoreQuotaPace(quota, resolveResetAwareConfig(configSource), NOW).score;
}

function closeTo(actual: number, expected: number) {
  assert.ok(Math.abs(actual - expected) < 1e-12, `${actual} != ${expected}`);
}

test("leftover characterization: absent and explicit leftover keep scores, draws and remainder", async () => {
  const quotas = [quotaAt(336, 0.8), quotaAt(336, 0.2), quotaAt(336, 0.5)];
  for (const quota of quotas) quota.window5h!.resetAt = resetAt(10);
  const scores = quotas.map(
    (quota) => scoreResetAwareQuota(quota, resolveResetAwareConfig({})).score
  );
  scores.forEach((score, i) => closeTo(score, [0.064, 0.256, 0.16][i]));
  const targets = await seedTargets(quotas);
  for (const config of [{}, { quotaWeightedScoring: "leftover" }]) {
    for (const [random, winner] of [
      [0, 0],
      [0.2, 1],
      [0.5, 1],
      [0.6, 1],
      [0.9, 2],
    ]) {
      let draws = 0;
      _clearInflightForTest();
      _setSecureRandomFloatSource(() => {
        draws++;
        return random;
      });
      const ordered = await orderTargetsByQuotaWeighted(targets, "leftover", config, log, null);
      assertOrder(ordered, [
        targets[winner],
        ...[1, 2, 0].filter((i) => i !== winner).map((i) => targets[i]),
      ]);
      assert.equal(draws, 1);
      assert.equal(getInflight(targets[winner].connectionId!), 1);
    }
    _clearInflightForTest();
    incrementInflight(targets[1].connectionId!);
    _setSecureRandomFloatSource(() => 0.6);
    assertOrder(await orderTargetsByQuotaWeighted(targets, "loaded", config, log, null), [
      targets[2],
      targets[1],
      targets[0],
    ]);
  }
});

test("pace draw: weekly reset at 11.6h gets at least ten times the 162h weight", async () => {
  const targets = await seedTargets([quotaAt(11.6), quotaAt(162)]);
  // At >=10:1 the first account owns at least 10/11 of the draw. Leftover loses at 0.9.
  assertOrder(await draw(targets, { quotaWeightedScoring: "pace" }, 0.9), targets);
  assertOrder(await draw(targets, {}, 0.9), [targets[1], targets[0]]);
});

test("pace score: latest weekly reset, not the shared nearer session, sets the 14x ratio", async () => {
  const near = await paceScore(quotaAt(11.6));
  const far = await paceScore(quotaAt(162));
  closeTo(near, 0.5 / 11.6);
  closeTo(far, 0.5 / 162);
  assert.ok(near >= 10 * far);
  closeTo(near / far, 162 / 11.6);
});

test("pace score: inner exhaustion guard damps without replacing outer remaining", async () => {
  const quota = quotaAt(24, 0.2, 0.95);
  closeTo(await paceScore(quota), (0.8 / 24) * 0.5);
  closeTo(await paceScore(quota, { resetAwareExhaustionGuardPercent: 0 }), 0.8 / 24);
  closeTo(await paceScore(quotaAt(24, 0.2, 0.999)), (0.8 / 24) * 0.05);
  closeTo(await paceScore(quotaAt(24, 0.2, 0.9)), 0.8 / 24);
});

test("pace review regression: invalid canonical reset cannot shadow a finite weekly alias", async () => {
  closeTo(
    await paceScore({
      percentUsed: 0.5,
      window5h: { percentUsed: 0.5, resetAt: resetAt(2) },
      window7d: { percentUsed: 0.5, resetAt: "invalid" },
      windowWeekly: { percentUsed: 0.5, resetAt: resetAt(120) },
    }),
    0.5 / 120
  );
});

test("pace review regression: normalized same-family model windows select the right account", async () => {
  const context = { provider: "antigravity", requestedModel: "gemini-3-flash" };
  const quota = convertUsageToQuotaInfo(
    {
      quotas: {
        "gemini-3-flash": { remainingPercentage: 50, resetAt: resetAt(12) },
        "gemini-3-pro": { remainingPercentage: 80, resetAt: resetAt(120) },
        "claude-sonnet-5": { remainingPercentage: 1, resetAt: resetAt(1000) },
      },
    },
    context
  );
  const peer = convertUsageToQuotaInfo(
    { quotas: { "gemini-3-flash": { remainingPercentage: 50, resetAt: resetAt(24) } } },
    context
  );
  assert.ok(quota && peer);
  assert.equal(quota.window5h?.resetAt, resetAt(12));
  assert.deepEqual(Object.keys(quota.windows!), ["gemini-3-flash", "gemini-3-pro"]);
  const targets = await seedTargets([quota, peer], "antigravity", "gemini-3-flash");
  // The collapsed collector gives the first account 2/3 of the draw; its actual
  // outer-window pace is lower than the peer's, so RNG 0.5 must pick the peer.
  assertOrder(await draw(targets, { quotaWeightedScoring: "pace" }, 0.5), [targets[1], targets[0]]);
  closeTo(await paceScore(quota), 0.8 / 120);
  closeTo(await paceScore(peer), 0.5 / 24);
});

test("pace review regression: every named weekly entry competes for the outer reset", async () => {
  const entries = [
    ["weekly (a)", { percentUsed: 50, resetAt: resetAt(12) }],
    ["weekly (z)", { percentUsed: 20, resetAt: resetAt(120) }],
  ] as const;
  for (const windows of [Object.fromEntries(entries), Object.fromEntries([...entries].reverse())]) {
    closeTo(
      await paceScore({
        percentUsed: 0.5,
        window5h: { percentUsed: 0.5, resetAt: resetAt(2) },
        windows,
      }),
      0.8 / 120
    );
  }
});

test("pace window union: exact outer mirrors do not become inner exhaustion guards", async () => {
  const quota = {
    window7d: { percentUsed: 0.95, resetAt: resetAt(120) },
    windows: {
      "weekly (mirror)": { percentUsed: 95, resetAt: String((NOW + 120 * HOUR) / 1000) },
    },
  };
  closeTo(await paceScore(quota), 0.05 / 120);
});

test("pace window union: decimal cross-scale mirrors use the exact expected score", async () => {
  closeTo(
    await paceScore({
      window7d: { percentUsed: 0.949, resetAt: "2026-10-14T00:00:00Z" },
      windows: {
        weekly: { percentUsed: 94.9, resetAt: "2026-10-14T00:00:00Z" },
      },
    }),
    0.002125000000000002
  );
});

test("pace window union: additional decimal cross-scale mirrors stay undamped", async () => {
  for (const [fraction, percent] of [
    [0.07, 7],
    [0.123, 12.3],
    [0.29, 29],
    [0.57, 57],
  ]) {
    closeTo(
      await paceScore(
        {
          window7d: { percentUsed: fraction, resetAt: resetAt(24) },
          windows: { weekly: { percentUsed: percent, resetAt: resetAt(24) } },
        },
        { resetAwareExhaustionGuardPercent: 100 }
      ),
      (1 - fraction) / 24
    );
  }
});

test("pace draw: decimal mirror keeps the 5.1%-remaining account ahead of a 4% peer", async () => {
  const mirrored = {
    window7d: { percentUsed: 0.949, resetAt: "2026-10-14T00:00:00Z" },
    windows: { weekly: { percentUsed: 94.9, resetAt: "2026-10-14T00:00:00Z" } },
  } as unknown as QuotaInfo;
  const peer = {
    window7d: { percentUsed: 0.96, resetAt: "2026-10-14T00:00:00Z" },
  } as QuotaInfo;
  const targets = await seedTargets([mirrored, peer], "codex", "gpt-5-codex", [
    "pace-decimal-mirror",
    "pace-unmirrored-peer",
  ]);
  assertOrder(await draw(targets, { quotaWeightedScoring: "pace" }, 0.5), targets);
});

test("pace window union: decimal mirror representative is stable across map order", async () => {
  const entries = [
    ["weekly (fraction)", { percentUsed: 0.949, resetAt: resetAt(24) }],
    ["weekly (percent)", { percentUsed: 94.9, resetAt: resetAt(24) }],
  ] as const;
  const forward = await paceScore({ windows: Object.fromEntries(entries) });
  const reversed = await paceScore({ windows: Object.fromEntries([...entries].reverse()) });
  closeTo(forward, 0.002125000000000002);
  assert.equal(reversed, forward);
});

test("pace window union: a non-transitive mirror chain groups by tolerance closure", async () => {
  const entries = [
    ["model-a", { percentUsed: 0.95, resetAt: resetAt(24) }],
    ["model-b", { percentUsed: 0.94999999925, resetAt: resetAt(24) }],
    ["model-c", { percentUsed: 0.9499999985, resetAt: resetAt(24) }],
  ] as const;
  const forward = await paceScore({ windows: Object.fromEntries(entries) });
  const reversed = await paceScore({ windows: Object.fromEntries([...entries].reverse()) });
  assert.equal(forward, reversed);
  closeTo(forward, 0.05 / 24);
});

test("pace window union: unknown-reset entries do not disturb mirror closure", async () => {
  const entries = [
    ["model-a", { percentUsed: 0.95, resetAt: resetAt(24) }],
    ["unknown", { percentUsed: 0.2, resetAt: null }],
    ["model-b", { percentUsed: 0.94999999925, resetAt: resetAt(24) }],
    ["model-c", { percentUsed: 0.9499999985, resetAt: resetAt(24) }],
  ] as const;
  for (const ordered of [entries, [...entries].reverse()]) {
    // The unknown window (80% remaining) is kept but sits above the guard, so the
    // only possible damping is a falsely split a-b-c chain.
    closeTo(await paceScore({ windows: Object.fromEntries(ordered) }), 0.05 / 24);
  }
});

test("pace window union: all permutations of a three-window chain score identically", async () => {
  const entries = [
    ["model-a", { percentUsed: 0.95, resetAt: resetAt(24) }],
    ["model-b", { percentUsed: 0.94999999925, resetAt: resetAt(24) }],
    ["model-c", { percentUsed: 0.9499999985, resetAt: resetAt(24) }],
  ] as const;
  const permutations = [
    [0, 1, 2],
    [0, 2, 1],
    [1, 0, 2],
    [1, 2, 0],
    [2, 0, 1],
    [2, 1, 0],
  ];
  const scores = [] as number[];
  for (const permutation of permutations) {
    scores.push(
      await paceScore({ windows: Object.fromEntries(permutation.map((i) => entries[i])) })
    );
  }
  for (const score of scores) assert.equal(score, scores[0]);
  closeTo(scores[0], 0.05 / 24);
});

test("pace draw: mirror-chain grouping keeps the chain account ahead in either map order", async () => {
  const chainEntries = [
    ["model-a", { percentUsed: 0.95, resetAt: resetAt(24) }],
    ["model-b", { percentUsed: 0.94999999925, resetAt: resetAt(24) }],
    ["model-c", { percentUsed: 0.9499999985, resetAt: resetAt(24) }],
  ] as const;
  const chainQuota = (orderedEntries: ReadonlyArray<(typeof chainEntries)[number]>) =>
    ({
      percentUsed: 0.94999999925,
      window7d: { percentUsed: 0.94999999925, resetAt: resetAt(24) },
      windows: Object.fromEntries(orderedEntries),
    }) as unknown as QuotaInfo;
  const peer = { window7d: { percentUsed: 0.96, resetAt: resetAt(24) } } as QuotaInfo;
  // seedTargets replaces the provider fetcher, so draw each pair before seeding the next.
  for (const [orderedEntries, names] of [
    [chainEntries, ["pace-chain-forward", "pace-peer-forward"]],
    [[...chainEntries].reverse(), ["pace-chain-reversed", "pace-peer-reversed"]],
  ] as const) {
    const targets = await seedTargets([chainQuota(orderedEntries), peer], "codex", "gpt-5-codex", [
      ...names,
    ]);
    // Closure keeps the chain undamped (0.05/24 vs 0.04/24), so RNG 0.5 lands on it.
    assertOrder(await draw(targets, { quotaWeightedScoring: "pace" }, 0.5), targets);
  }
});

test("pace window union: a 0.001 remaining difference stays distinct and damps", async () => {
  closeTo(
    await paceScore({
      window7d: { percentUsed: 0.95, resetAt: resetAt(24) },
      windows: { weekly: { percentUsed: 95.1, resetAt: resetAt(24) } },
    }),
    (0.05 / 24) * 0.49
  );
});

test("pace window union: a gap beyond epsilon stays in two deterministic groups", async () => {
  const entries = [
    ["model-a", { percentUsed: 0.95, resetAt: resetAt(24) }],
    ["model-b", { percentUsed: 0.94999999925, resetAt: resetAt(24) }],
    ["model-c", { percentUsed: 0.949999997, resetAt: resetAt(24) }],
  ] as const;
  const permutations = [
    [0, 1, 2],
    [0, 2, 1],
    [1, 0, 2],
    [1, 2, 0],
    [2, 0, 1],
    [2, 1, 0],
  ];
  const scores = [] as number[];
  for (const permutation of permutations) {
    scores.push(
      await paceScore({ windows: Object.fromEntries(permutation.map((i) => entries[i])) })
    );
  }
  for (const score of scores) {
    assert.ok(score < 0.05 / 24);
    closeTo(score, (0.05 / 24) * 0.50000003);
  }
});

test("pace window union: equal reset or remaining alone cannot hide distinct inner telemetry", async () => {
  for (const [percentUsed, hours, damping] of [
    [0.95, 120, 0.5],
    [0.5, 12, 1],
  ]) {
    closeTo(
      await paceScore({
        window7d: { percentUsed: 0.5, resetAt: resetAt(120) },
        windows: { "model-inner": { percentUsed, resetAt: resetAt(hours) } },
      }),
      (0.5 / 120) * damping
    );
  }
  closeTo(
    await paceScore({
      window7d: { percentUsed: 0.95, resetAt: resetAt(120) },
      windows: { "model-inner": { percentUsed: 95, resetAt: resetAt(12) } },
    }),
    (0.05 / 120) * 0.5
  );
});

test("pace window union: unknown resets still use all scoped windows for minimum leftover", async () => {
  closeTo(
    await paceScore({
      window5h: { percentUsed: 0.5, resetAt: "invalid" },
      window7d: { resetAt: null },
      windows: { "model-outer": { percentUsed: 80, resetAt: null } },
    }),
    0.2 / 168
  );
});

test("pace window union: Codex allWindows sibling scopes are never read", async () => {
  closeTo(
    await paceScore({
      window5h: { percentUsed: 0.5, resetAt: resetAt(2) },
      windows: { "weekly (spark)": { percentUsed: 50, resetAt: resetAt(120) } },
      allWindows: {
        weekly: { percentUsed: 1, resetAt: resetAt(1000) },
        session: { percentUsed: 1, resetAt: resetAt(1) },
      },
    }),
    0.5 / 120
  );
});

test("pace draw: guard damping changes the draw but an exhausted session stays ineligible", async () => {
  const quotas = [quotaAt(24, 0.2, 0.95), quotaAt(24, 0.2), quotaAt(24, 0.2, 1)];
  const targets = await seedTargets(quotas);
  assert.equal(getResetAwareRemainingPercent(quotas[2]), 0);
  assertOrder(await draw(targets, { quotaWeightedScoring: "pace" }, 0.4), [targets[1], targets[0]]);
  assertOrder(
    await draw(targets, { quotaWeightedScoring: "pace", resetAwareExhaustionGuardPercent: 0 }, 0.4),
    [targets[0], targets[1]]
  );
  assert.equal(getInflight(targets[2].connectionId!), 0);
});

test("pace draw: low-leftover pool B cannot jump ahead using a large pace score", async () => {
  const targets = await seedTargets([quotaAt(1, 0.2, 0.995), quotaAt(162, 0.2)]);
  assertOrder(await draw(targets, { quotaWeightedScoring: "pace" }, 0), [targets[1], targets[0]]);
});

test("pace score: absent/invalid resets use minimum leftover at the 168h horizon", async () => {
  closeTo(await paceScore({ percentUsed: 0.4 }), 0.6 / 168);
  closeTo(await paceScore({}), 0.5 / 168);
  closeTo(
    await paceScore({
      percentUsed: 0.2,
      windows: {
        session: { percentUsed: 0.3, resetAt: "invalid" },
        weekly: { percentUsed: 0.8, resetAt: null },
      },
    }),
    0.2 / 168
  );
  // Top-level resetAt is not a window and must not invent an outer deadline.
  closeTo(await paceScore({ percentUsed: 0.5, resetAt: resetAt(1) }), 0.5 / 168);
});

test("pace draw: missing reset telemetry does not outrank equal leftover with a nearer reset", async () => {
  const noReset: QuotaInfo = { used: 50, total: 100, percentUsed: 0.5 };
  const targets = await seedTargets([noReset, quotaAt(12)]);
  assertOrder(await draw(targets, { quotaWeightedScoring: "pace" }, 0.1), [targets[1], targets[0]]);
});

test("pace score: past/minutes-away outer resets floor to one hour, finite and bounded", async () => {
  for (const hours of [-24, 0, 0.05, 1]) {
    const quota = { percentUsed: 0.25, window7d: { percentUsed: 0.25, resetAt: resetAt(hours) } };
    const score = await paceScore(quota);
    assert.ok(Number.isFinite(score));
    assert.ok(score <= 1);
    closeTo(score, 0.75);
  }
});

test("pace score: null/non-object quota is full leftover at seven days; limitReached is zero", async () => {
  for (const quota of [null, undefined, "missing", 12, []]) {
    closeTo(await paceScore(quota), 1 / 168);
  }
  assert.equal(await paceScore({ ...quotaAt(11.6), limitReached: true }), 0);
});

test("pace score: canonical monthly/weekly aliases and generic model windows share normalization", async () => {
  closeTo(
    await paceScore({
      percentUsed: 0.5,
      windowWeekly: { percentUsed: 0.5, resetAt: resetAt(12) },
      windowMonthly: { percentUsed: 0.2, resetAt: resetAt(240) },
    }),
    0.8 / 240
  );
  closeTo(
    await paceScore({
      percentUsed: 0.25,
      windows: {
        "model-a": { percentUsed: 40, resetAt: String((NOW + 12 * HOUR) / 1000) },
        "model-b": { resetAt: String(NOW + 48 * HOUR) },
      },
    }),
    0.75 / 48
  );
  closeTo(
    await paceScore({
      percentUsed: 0.25,
      windows: {
        weekly: { resetAt: resetAt(12) },
        // A named weekly window must not hide a later model-keyed outer window.
        "model-outer": { percentUsed: 1, resetAt: resetAt(1000) },
      },
    }),
    0
  );
  closeTo(await paceScore({ window7d: { percentUsed: 2, resetAt: resetAt(12) } }), 0);
  closeTo(await paceScore({ window7d: { percentUsed: -1, resetAt: resetAt(12) } }), 1 / 12);
});

test("pace draw: one clock snapshot is shared even when the second quota fetch finishes later", async () => {
  const quota = quotaAt(2);
  const targets = await seedTargets([quota, quota]);
  registerQuotaFetcher("codex", async (id) => {
    if (id === targets[1].connectionId) {
      await new Promise<void>((resolve) => setImmediate(resolve));
      clock = NOW + HOUR;
    }
    return quota;
  });
  assertOrder(await draw(targets, { quotaWeightedScoring: "pace" }, 0.49), targets);
});

test("quotaWeightedScoring schema accepts pace/leftover on all config surfaces", () => {
  for (const quotaWeightedScoring of ["pace", "leftover"]) {
    const config = { quotaWeightedScoring };
    assert.equal(comboRuntimeConfigSchema.parse(config).quotaWeightedScoring, quotaWeightedScoring);
    assert.equal(
      createComboSchema.parse({ name: "pace", models: ["codex/gpt-5-codex"], config }).config
        ?.quotaWeightedScoring,
      quotaWeightedScoring
    );
    assert.equal(
      updateComboSchema.parse({ config }).config?.quotaWeightedScoring,
      quotaWeightedScoring
    );
    assert.equal(
      updateComboDefaultsSchema.parse({ comboDefaults: config }).comboDefaults
        ?.quotaWeightedScoring,
      quotaWeightedScoring
    );
  }
});

test("quotaWeightedScoring schema rejects bogus instead of passing unknown keys through", () => {
  for (const quotaWeightedScoring of ["bogus", "PACE", "", null, 1, true]) {
    const config = { quotaWeightedScoring };
    assert.equal(comboRuntimeConfigSchema.safeParse(config).success, false);
    assert.equal(
      createComboSchema.safeParse({ name: "pace", models: ["codex/gpt-5-codex"], config }).success,
      false
    );
    assert.equal(updateComboSchema.safeParse({ config }).success, false);
    assert.equal(
      updateComboDefaultsSchema.safeParse({ providerOverrides: { codex: config } }).success,
      false
    );
  }
});

test("pace config survives API validation, dead-key stripping, setup cascade and strategy dispatch", async () => {
  const parsed = createComboSchema.parse({
    name: "pace-config-path",
    strategy: "quota-weighted",
    models: ["codex/gpt-5-codex"],
    config: { quotaWeightedScoring: "pace" },
  });
  const combo = { ...parsed, config: stripDeadComboConfigKeys(parsed.config) };
  const targets = await seedTargets([quotaAt(11.6), quotaAt(162)]);
  for (const settings of [null, { comboDefaults: { quotaWeightedScoring: "leftover" } }]) {
    const config = resolveComboSetupConfig(combo, settings);
    assert.equal((config as Record<string, unknown>).quotaWeightedScoring, "pace");
    _clearInflightForTest();
    _setSecureRandomFloatSource(() => 0.9);
    const result = await applyStrategyOrdering(parsed.strategy, targets, {
      combo,
      config,
      body: {},
      log,
      apiKeyAllowedConnections: null,
    });
    assertOrder(result.orderedTargets, targets);
    assert.equal(getInflight(targets[0].connectionId!), 1);
    result.quotaShareRelease?.();
    result.quotaShareRelease?.();
    assert.equal(getInflight(targets[0].connectionId!), 0);
  }
  for (const config of [
    resolveComboSetupConfig({}, { comboDefaults: { quotaWeightedScoring: "pace" } }),
    resolveComboConfig(
      {},
      { providerOverrides: { codex: { quotaWeightedScoring: "pace" } } },
      "codex"
    ),
  ]) {
    assertOrder(await draw(targets, config, 0.9), targets);
  }
});
