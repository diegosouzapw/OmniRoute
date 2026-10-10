import test from "node:test";
import assert from "node:assert/strict";

const { getQuotaFetchScope, remainingPercentFromQuotaWindows, selectFactoryQuotaWindowNames } =
  await import("../../open-sse/services/antigravityQuotaFamily.ts");
const { parseFactoryUsagePayload } = await import("../../open-sse/services/usage/factory.ts");
const { convertUsageToQuotaInfo } = await import("../../open-sse/services/genericQuotaFetcher.ts");
const { evaluateQuotaCutoff } = await import("../../open-sse/services/quotaPreflight.ts");
const { factoryQuotaTierFor } = await import("../../open-sse/config/factory.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");

const MIXED_WINDOWS = {
  standard_5h: { percentUsed: 1, resetAt: "2026-01-01T18:00:00.000Z" },
  standard_weekly: { percentUsed: 0.9, resetAt: "2026-01-07T00:00:00.000Z" },
  core_5h: { percentUsed: 0.1, resetAt: "2026-01-01T19:00:00.000Z" },
  core_weekly: { percentUsed: 0.05, resetAt: "2026-01-07T00:00:00.000Z" },
};

test("Factory Standard and Core models resolve to isolated fetch scopes", () => {
  assert.equal(factoryQuotaTierFor("claude-haiku-4-5-20251001"), "standard");
  assert.equal(factoryQuotaTierFor("minimax-m2.7"), "core");
  assert.equal(getQuotaFetchScope("factory", "claude-haiku-4-5-20251001"), "tier:standard");
  assert.equal(getQuotaFetchScope("factory", "minimax-m2.7"), "tier:core");
  assert.equal(getQuotaFetchScope("codex", "gpt-5"), "*");
});

test("Factory window names stay inside the requested tier", () => {
  const names = Object.keys(MIXED_WINDOWS);
  assert.deepEqual(selectFactoryQuotaWindowNames(names, "claude-haiku-4-5-20251001").sort(), [
    "standard_5h",
    "standard_weekly",
  ]);
  assert.deepEqual(selectFactoryQuotaWindowNames(names, "minimax-m2.7").sort(), [
    "core_5h",
    "core_weekly",
  ]);
});

test("exhausted Standard remaining percent does not consume Core headroom", () => {
  assert.equal(
    remainingPercentFromQuotaWindows(MIXED_WINDOWS, {
      provider: "factory",
      requestedModel: "claude-haiku-4-5-20251001",
    }),
    0
  );
  assert.equal(
    remainingPercentFromQuotaWindows(MIXED_WINDOWS, {
      provider: "factory",
      requestedModel: "minimax-m2.7",
    }),
    90
  );
});

test("parseFactoryUsagePayload emits six Standard/Core windows", () => {
  const parsed = parseFactoryUsagePayload({
    planType: "pro",
    limits: {
      standard: {
        fiveHour: { usedPercent: 100, windowEnd: "2026-01-01T18:00:00.000Z" },
        weekly: { usedPercent: 40, windowEnd: "2026-01-07T00:00:00.000Z" },
        monthly: { usedPercent: 10, windowEnd: "2026-02-01T00:00:00.000Z" },
      },
      core: {
        fiveHour: { usedPercent: 5, windowEnd: "2026-01-01T19:00:00.000Z" },
        weekly: { usedPercent: 8, windowEnd: "2026-01-07T00:00:00.000Z" },
        monthly: { usedPercent: 2, windowEnd: "2026-02-01T00:00:00.000Z" },
      },
    },
  });
  assert.ok(parsed);
  assert.equal(parsed.plan, "pro");
  assert.equal(parsed.quotas.standard_5h?.used, 100);
  assert.equal(parsed.quotas.standard_5h?.remaining, 0);
  assert.equal(parsed.quotas.core_5h?.used, 5);
  assert.equal(parsed.quotas.core_5h?.remaining, 95);
});

test("convertUsageToQuotaInfo scopes Factory Standard away from Core", () => {
  const usage = {
    quotas: {
      standard_5h: {
        used: 100,
        total: 100,
        remaining: 0,
        remainingPercentage: 0,
        resetAt: null,
        unlimited: false,
      },
      core_5h: {
        used: 10,
        total: 100,
        remaining: 90,
        remainingPercentage: 90,
        resetAt: null,
        unlimited: false,
      },
    },
  };
  const standard = convertUsageToQuotaInfo(usage, {
    provider: "factory",
    requestedModel: "claude-haiku-4-5-20251001",
  });
  const core = convertUsageToQuotaInfo(usage, {
    provider: "factory",
    requestedModel: "minimax-m2.7",
  });
  assert.equal(standard?.limitReached, true);
  assert.ok(standard?.windows?.standard_5h);
  assert.equal(standard?.windows?.core_5h, undefined);
  assert.equal(core?.limitReached, false);
  assert.ok(core?.windows?.core_5h);
  assert.equal(core?.windows?.standard_5h, undefined);
});

test("evaluateQuotaCutoff does not let Core availability unlock exhausted Standard", () => {
  const quota = convertUsageToQuotaInfo(
    {
      quotas: {
        standard_5h: {
          used: 100,
          total: 100,
          remaining: 0,
          remainingPercentage: 0,
          resetAt: null,
          unlimited: false,
        },
        core_5h: {
          used: 10,
          total: 100,
          remaining: 90,
          remainingPercentage: 90,
          resetAt: null,
          unlimited: false,
        },
      },
    },
    { provider: "factory", requestedModel: "claude-haiku-4-5-20251001" }
  );
  const decision = evaluateQuotaCutoff(quota, undefined, {
    provider: "factory",
    requestedModel: "claude-haiku-4-5-20251001",
  });
  assert.equal(decision.proceed, false);
  assert.equal(decision.reason, "quota_exhausted");
});

test("Factory request exhaustion is tier-scoped and account exhaustion needs both tiers", () => {
  quotaCache.__clearForTests?.();
  quotaCache.setQuotaCache("factory-1", "factory", {
    standard_5h: { remainingPercentage: 0, resetAt: null },
    core_5h: { remainingPercentage: 90, resetAt: null },
  });
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest("factory-1", "factory", "claude-haiku-4-5-20251001"),
    true
  );
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest("factory-1", "factory", "minimax-m2.7"),
    false
  );
  assert.equal(quotaCache.isAccountQuotaExhausted("factory-1"), false);

  quotaCache.markQuotaHealthy("factory-1", "core");
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest("factory-1", "factory", "claude-haiku-4-5-20251001"),
    true
  );
});

test("any exhausted Factory Standard window blocks that tier", () => {
  quotaCache.__clearForTests?.();
  quotaCache.setQuotaCache("factory-2", "factory", {
    standard_5h: { remainingPercentage: 0, resetAt: null },
    standard_weekly: { remainingPercentage: 40, resetAt: null },
    core_5h: { remainingPercentage: 90, resetAt: null },
  });
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest("factory-2", "factory", "claude-haiku-4-5-20251001"),
    true
  );
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest("factory-2", "factory", "minimax-m2.7"),
    false
  );
  assert.equal(
    quotaCache.getQuotaWeightedRemainingPercent("factory-2", "minimax-m2.7", "factory"),
    90
  );
  assert.equal(
    quotaCache.getQuotaWeightedRemainingPercent(
      "factory-2",
      "claude-haiku-4-5-20251001",
      "factory"
    ),
    0
  );
});
