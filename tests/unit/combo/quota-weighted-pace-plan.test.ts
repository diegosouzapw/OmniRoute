import test, { after, afterEach, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { QuotaInfo } from "../../../open-sse/services/quotaPreflight.ts";
import type { ResolvedComboTarget } from "../../../open-sse/services/combo/types.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pace-plan-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const dbCore = await import("../../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../../src/lib/db/providers.ts");
const quotaCache = await import("../../../src/domain/quotaCache.ts");
const { registerQuotaFetcher } = await import("../../../open-sse/services/quotaPreflight.ts");
const { fetchCodexQuota, unregisterCodexConnection } =
  await import("../../../open-sse/services/codexQuotaFetcher.ts");
const { convertUsageToQuotaInfo } =
  await import("../../../open-sse/services/genericQuotaFetcher.ts");
const { orderTargetsByQuotaWeighted } =
  await import("../../../open-sse/services/combo/quotaStrategies.ts");
const { scoreQuotaPace } = await import("../../../open-sse/services/combo/quotaPaceScoring.ts");
const { resolveResetAwareConfig, scoreResetAwareQuota, getResetAwareRemainingPercent } =
  await import("../../../open-sse/services/combo/quotaScoring.ts");
const { resetAllCircuitBreakers } = await import("../../../src/shared/utils/circuitBreaker.ts");
const { _setSecureRandomFloatSource } = await import("../../../src/shared/utils/secureRandom.ts");
const { _clearInflightForTest, incrementInflight, getInflight } =
  await import("../../../open-sse/services/combo/quotaShareInflight.ts");
const { MinIntervalThrottle, setQuotaFetchThrottleForTests } =
  await import("../../../open-sse/services/quotaFetchThrottle.ts");

const NOW = Date.parse("2026-10-13T00:00:00Z");
const HOUR = 3_600_000;
const realNow = Date.now;
const realFetch = globalThis.fetch;
const liveIds = new Set<string>();
const resetAt = (hours: number) => new Date(NOW + hours * HOUR).toISOString();
const log = { warn() {} };
const pace = { quotaWeightedScoring: "pace" };
// Keep test fixtures compilable on the original QuotaInfo contract for the RED run.
type PlanQuota = QuotaInfo & { plan?: string };

beforeEach(() => {
  Date.now = () => NOW;
  setQuotaFetchThrottleForTests(new MinIntervalThrottle({ minIntervalMs: 0 }));
});
afterEach(() => {
  Date.now = realNow;
  globalThis.fetch = realFetch;
  setQuotaFetchThrottleForTests(null);
  for (const id of liveIds) unregisterCodexConnection(id);
  liveIds.clear();
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

function quotaAt(plan?: string, percentUsed = 0.4): PlanQuota {
  return {
    used: percentUsed * 100,
    total: 100,
    percentUsed,
    window5h: { percentUsed, resetAt: resetAt(10) },
    window7d: { percentUsed, resetAt: resetAt(100) },
    ...(plan === undefined ? {} : { plan }),
  };
}

async function seedTargets(quotas: PlanQuota[], provider = "codex", targetProvider = provider) {
  const snapshots = new Map<string, PlanQuota>();
  const targets: ResolvedComboTarget[] = [];
  for (const quota of quotas) {
    const row = await createProviderConnection({
      provider,
      name: `pace-plan-${targets.length}`,
      isActive: true,
      testStatus: "active",
      authType: "apikey",
    });
    const connectionId = String(row.id);
    snapshots.set(connectionId, quota);
    targets.push({
      kind: "model",
      stepId: `step-${connectionId}`,
      executionKey: `${targetProvider}/model@${connectionId}`,
      modelStr: `${targetProvider}/model`,
      provider: targetProvider,
      providerId: targetProvider,
      connectionId,
      weight: 1,
      label: null,
    });
  }
  registerQuotaFetcher(provider, async (id) => snapshots.get(id) ?? null);
  return targets;
}

async function draw(
  targets: ResolvedComboTarget[],
  random: number,
  config: Record<string, unknown> = pace,
  loads: number[] = []
) {
  _clearInflightForTest();
  targets.forEach((target, i) => {
    for (let n = 0; n < (loads[i] ?? 0); n++) incrementInflight(target.connectionId!);
  });
  let draws = 0;
  _setSecureRandomFloatSource(() => {
    draws++;
    return random;
  });
  const ordered = await orderTargetsByQuotaWeighted(targets, "pace-plan", config, log, null);
  assert.equal(draws, 1);
  const indices = ordered.map((target) =>
    targets.findIndex((entry) => entry.executionKey === target.executionKey)
  );
  assert.equal(getInflight(ordered[0].connectionId!), (loads[indices[0]] ?? 0) + 1);
  return indices;
}

function closeTo(actual: number, expected: number) {
  assert.ok(Math.abs(actual - expected) < 1e-12, `${actual} != ${expected}`);
}

async function capacityScore(quota: PlanQuota, provider = "codex") {
  // Only these pure checks may fail for a missing leaf; integration RED remains observable.
  const { resolvePlanCapacity } =
    await import("../../../open-sse/services/combo/quotaPlanCapacity.ts");
  return (
    scoreQuotaPace(quota, resolveResetAwareConfig({}), NOW).score *
    resolvePlanCapacity(provider, quota.plan)
  );
}

function usagePayload(plan: Record<string, unknown> = {}) {
  return {
    ...plan,
    rate_limit: {
      limit_reached: false,
      primary_window: {
        used_percent: 40,
        reset_at: (NOW + 100 * HOUR) / 1000,
        limit_window_seconds: 604800,
      },
    },
  };
}

async function liveQuota(payload: unknown): Promise<PlanQuota> {
  const id = `live-plan-${liveIds.size}`;
  liveIds.add(id);
  // All dynamic imports above have completed before replacing fetch.
  globalThis.fetch = async (input) => {
    assert.equal(String(input), "https://chatgpt.com/backend-api/wham/usage");
    return Response.json(payload);
  };
  const quota = await fetchCodexQuota(id, { accessToken: "test-only-access" });
  assert.ok(quota);
  return quota;
}

const claudeUsage = {
  plan: "Claude Code",
  bootstrap: { organization_rate_limit_tier: " default_claude_max_20x " },
  quotas: {
    "session (5h)": { remainingPercentage: 60, resetAt: resetAt(10) },
    "weekly (7d)": { remainingPercentage: 60, resetAt: resetAt(100) },
  },
};

test("plan capacity table: every priced Codex and Claude tier, normalization and disambiguation", async () => {
  const { resolvePlanCapacity } =
    await import("../../../open-sse/services/combo/quotaPlanCapacity.ts");
  const tables = {
    codex: { plus: 1, prolite: 5, pro: 10, promax: 25, team: 1, self_serve_business_prolite: 5 },
    claude: { claude_ai: 1, claude_pro: 1, claude_max_5x: 5, claude_max_20x: 10 },
  };
  for (const [provider, plans] of Object.entries(tables)) {
    for (const [plan, expected] of Object.entries(plans)) {
      for (const value of [plan, `  ${plan.toUpperCase()}  `]) {
        assert.equal(resolvePlanCapacity(provider, value), expected, `${provider}:${value}`);
        if (provider === "claude") {
          assert.equal(resolvePlanCapacity(provider, ` DEFAULT_${plan.toUpperCase()} `), expected);
        }
      }
    }
  }
  assert.equal(resolvePlanCapacity("codex", "pro"), 10);
  assert.equal(resolvePlanCapacity("claude", "pro"), 1);
});

test("plan capacity table: unlisted, malformed and foreign plans always fall back to finite one", async () => {
  const { resolvePlanCapacity } =
    await import("../../../open-sse/services/combo/quotaPlanCapacity.ts");
  for (const provider of ["codex", "claude", "other", "", null, undefined]) {
    for (const plan of [
      undefined,
      null,
      20,
      NaN,
      Infinity,
      true,
      {},
      [],
      "",
      "  ",
      "unknown",
      "free",
      "go",
      "business",
      "enterprise",
      "edu",
      "claude_max",
      "claude_team",
      "claude_max_100x",
      "pro500",
      "default_default_claude_max_20x",
      "toString",
      "__proto__",
    ]) {
      const capacity = resolvePlanCapacity(provider, plan);
      assert.equal(capacity, 1, `${provider}:${String(plan)}`);
      assert.ok(Number.isFinite(capacity) && capacity >= 1);
    }
  }
  for (const provider of ["other", null, undefined]) {
    assert.equal(resolvePlanCapacity(provider, "promax"), 1);
    assert.equal(resolvePlanCapacity(provider, "default_claude_max_20x"), 1);
  }
  assert.equal(resolvePlanCapacity("codex", "default_claude_max_20x"), 1);
  assert.equal(resolvePlanCapacity("claude", "promax"), 1);
});

test("live Codex plan: fetch preserves trimmed plan_type and planType, omits invalid metadata", async () => {
  for (const fields of [
    { plan_type: " prolite " },
    { planType: " prolite " },
    { plan_type: null, planType: "prolite" },
  ]) {
    assert.equal((await liveQuota(usagePayload(fields))).plan, "prolite");
  }
  for (const fields of [
    {},
    { plan_type: " " },
    { plan_type: 5 },
    { plan_type: "", planType: "pro" },
  ]) {
    assert.equal(Object.hasOwn(await liveQuota(usagePayload(fields)), "plan"), false);
  }
});

test("live Codex single-window Pro: real fetch and pace draw use 0.6/100 times ten", async () => {
  const pro = await liveQuota(usagePayload({ plan_type: "pro" }));
  assert.deepEqual(pro.window5h, { percentUsed: 0.4, resetAt: resetAt(100) });
  assert.deepEqual(pro.window7d, { percentUsed: 0, resetAt: null });
  const targets = await seedTargets([quotaAt("plus"), pro]);
  // Plus owns 1/11, not 1/2; straddling that threshold proves the real projection's weight.
  assert.deepEqual(await draw(targets, 1 / 11 - 1e-8), [0, 1]);
  assert.deepEqual(await draw(targets, 1 / 11 + 1e-8), [1, 0]);
  closeTo(await capacityScore(pro), (0.6 / 100) * 10);
});

test("live Claude plan: bootstrap tier takes precedence, then trimmed plan, otherwise absent", () => {
  const convert = (usage: unknown) =>
    convertUsageToQuotaInfo(usage, { provider: "claude" }) as PlanQuota;
  const tier = convert(claudeUsage);
  assert.equal(tier.plan, "default_claude_max_20x");
  assert.equal(tier.window5h?.percentUsed, 0.4);
  assert.equal(tier.window7d?.resetAt, resetAt(100));
  for (const bootstrap of [
    undefined,
    null,
    {},
    { organization_rate_limit_tier: " " },
    { organization_rate_limit_tier: 20 },
  ]) {
    assert.equal(
      convert({ ...claudeUsage, bootstrap, plan: " claude_max_5x " }).plan,
      "claude_max_5x"
    );
  }
  for (const plan of [undefined, null, "", "  ", 20]) {
    assert.equal(
      Object.hasOwn(convert({ ...claudeUsage, bootstrap: undefined, plan }), "plan"),
      false
    );
  }
  assert.equal(convert({ ...claudeUsage, plan: undefined }).plan, "default_claude_max_20x");
  assert.equal(convertUsageToQuotaInfo({ plan: "claude_pro" }), null);
  assert.deepEqual(
    convertUsageToQuotaInfo({ plan: "claude_pro", quotas: { session: { unlimited: true } } }),
    { used: 0, total: 0, percentUsed: 0, unlimited: true }
  );
});

test("pace plan draw: prolite versus pro has 1:2 weights and price-scaled scorer values", async () => {
  const quotas = [quotaAt("prolite"), quotaAt("pro")];
  const targets = await seedTargets(quotas);
  assert.deepEqual(await draw(targets, 1 / 3 - 1e-8), [0, 1]);
  assert.deepEqual(await draw(targets, 1 / 3 + 1e-8), [1, 0]);
  closeTo(await capacityScore(quotas[0]), 0.03);
  closeTo(await capacityScore(quotas[1]), 0.06);
});

test("pace plan alias: cx targets use canonical Codex capacity and reserve the boundary winner", async () => {
  const targets = await seedTargets([quotaAt("prolite"), quotaAt("pro")], "codex", "cx");
  for (const [random, expected] of [
    [1 / 3 - 1e-8, [0, 1]],
    [1 / 3 + 1e-8, [1, 0]],
  ] as const) {
    assert.deepEqual(await draw(targets, random), expected);
    assert.deepEqual(
      targets.map((target) => getInflight(target.connectionId!)),
      targets.map((_, i) => (i === expected[0] ? 1 : 0))
    );
  }
});

test("pace plan zero scores: integer fallback ignores capacity and keeps index-ordered remainder", async () => {
  // limitReached would exclude the account. A named outer window can instead zero pace
  // while the canonical session/weekly windows retain positive eligibility headroom.
  const quotas = [quotaAt("pro", 0.8), quotaAt("prolite", 0.2), quotaAt("promax", 0.5)].map(
    (quota) => ({
      ...quota,
      windows: { "model-outer": { percentUsed: 100, resetAt: resetAt(200) } },
    })
  );
  for (const quota of quotas) {
    assert.equal(scoreQuotaPace(quota, resolveResetAwareConfig({}), NOW).score, 0);
    assert.ok(getResetAwareRemainingPercent(quota) > 1);
  }
  const targets = await seedTargets(quotas);
  let draws = 0;
  let random = 0;
  _setSecureRandomFloatSource(() => {
    draws++;
    return random;
  });
  // A singleton integer draw needs no entropy; a positive weight would consult the float.
  assert.deepEqual(
    await orderTargetsByQuotaWeighted([targets[0]], "pace-plan-zero", pace, log, null),
    [targets[0]]
  );
  assert.equal(draws, 0);
  assert.equal(getInflight(targets[0].connectionId!), 1);

  // secureRandomInt shares this source, consuming exactly one value for multiple accounts.
  // Straddle uniform thirds, not the unequal plan-capacity boundaries (10:5:25).
  for (const [value, winner] of [
    [0, 0],
    [1 / 3 - 1e-8, 0],
    [1 / 3 + 1e-8, 1],
    [2 / 3 - 1e-8, 1],
    [2 / 3 + 1e-8, 2],
    [1 - 1e-8, 2],
  ]) {
    _clearInflightForTest();
    draws = 0;
    random = value;
    const ordered = await orderTargetsByQuotaWeighted(targets, "pace-plan-zero", pace, log, null);
    assert.equal(draws, 1);
    assert.deepEqual(ordered, [targets[winner], ...targets.filter((_, i) => i !== winner)]);
    assert.deepEqual(
      targets.map((target) => getInflight(target.connectionId!)),
      targets.map((_, i) => (i === winner ? 1 : 0))
    );
  }
});

test("pace plan draw: plus versus promax has 1:25 weights and price-scaled scorer values", async () => {
  const quotas = [quotaAt("plus"), quotaAt("promax")];
  const targets = await seedTargets(quotas);
  assert.deepEqual(await draw(targets, 1 / 26 - 1e-8), [0, 1]);
  assert.deepEqual(await draw(targets, 1 / 26 + 1e-8), [1, 0]);
  closeTo(await capacityScore(quotas[0]), 0.006);
  closeTo(await capacityScore(quotas[1]), 0.15);
});

test("pace plan draw: Claude uses the live bootstrap tier rather than its display label", async () => {
  const max = convertUsageToQuotaInfo(claudeUsage, { provider: "claude" });
  assert.ok(max);
  const targets = await seedTargets([quotaAt("default_claude_ai"), max], "claude");
  assert.deepEqual(await draw(targets, 1 / 11 - 1e-8), [0, 1]);
  assert.deepEqual(await draw(targets, 1 / 11 + 1e-8), [1, 0]);
});

test("pace inflight normalization: Pro ten versus Plus one retains 10:1 draw weights", async () => {
  const targets = await seedTargets([quotaAt("pro"), quotaAt("plus")]);
  assert.deepEqual(await draw(targets, 10 / 11 - 1e-8, pace, [10, 1]), [0, 1]);
  assert.deepEqual(await draw(targets, 10 / 11 + 1e-8, pace, [10, 1]), [1, 0]);
});

test("pace inflight normalization: Pro zero versus ten inflight halves its weight, not elevenths it", async () => {
  const targets = await seedTargets([quotaAt("pro"), quotaAt("plus")]);
  assert.deepEqual(await draw(targets, 0.87, pace, [0, 0]), [0, 1]);
  assert.deepEqual(await draw(targets, 0.87, pace, [10, 0]), [1, 0]);
  assert.deepEqual(await draw(targets, 5 / 6 - 1e-8, pace, [10, 0]), [0, 1]);
  assert.deepEqual(await draw(targets, 5 / 6 + 1e-8, pace, [10, 0]), [1, 0]);
});

test("leftover plan characterization: identical scores, draws, load penalty and score-sorted remainder", async () => {
  const quotas = [quotaAt(undefined, 0.8), quotaAt(undefined, 0.2), quotaAt(undefined, 0.5)];
  for (const quota of quotas) quota.window7d!.resetAt = resetAt(336);
  const targets = await seedTargets(quotas);
  const scores = quotas.map((q) => scoreResetAwareQuota(q, resolveResetAwareConfig({})).score);
  scores.forEach((score, i) => closeTo(score, [0.064, 0.256, 0.16][i]));
  for (const config of [{}, { quotaWeightedScoring: "leftover" }]) {
    for (const loads of [[], [0, 1, 0]]) {
      for (const random of [0, 0.2, 0.5, 0.6, 0.9]) {
        const without = await draw(targets, random, config, loads);
        quotas.forEach((quota, i) => {
          quota.plan = ["promax", "plus", "pro"][i];
        });
        assert.deepEqual(
          quotas.map((q) => scoreResetAwareQuota(q, resolveResetAwareConfig({})).score),
          scores
        );
        assert.deepEqual(await draw(targets, random, config, loads), without);
        assert.deepEqual(
          without.slice(1),
          [1, 2, 0].filter((i) => i !== without[0])
        );
        quotas.forEach((quota) => {
          delete quota.plan;
        });
      }
    }
  }
});

test("leftover plan characterization: absent and explicit leftover never read plan", async () => {
  const quota = quotaAt();
  Object.defineProperty(quota, "plan", {
    get() {
      throw new Error("leftover must not read plan");
    },
  });
  const targets = await seedTargets([quota, quotaAt()]);
  for (const config of [{}, { quotaWeightedScoring: "leftover" }]) {
    assert.deepEqual(await draw(targets, 0.49, config), [0, 1]);
  }
});

test("pace unknown plan: identical scores and draw boundary to absent plan", async () => {
  const quotas = [quotaAt("unlisted-pro-500"), quotaAt()];
  const targets = await seedTargets(quotas);
  assert.deepEqual(await draw(targets, 0.5 - 1e-8), [0, 1]);
  assert.deepEqual(await draw(targets, 0.5 + 1e-8), [1, 0]);
  assert.equal(
    scoreQuotaPace(quotas[0], resolveResetAwareConfig({}), NOW).score,
    scoreQuotaPace(quotas[1], resolveResetAwareConfig({}), NOW).score
  );
});
