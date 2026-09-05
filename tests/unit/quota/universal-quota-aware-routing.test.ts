import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";

const genericModule = await import("../../../open-sse/services/genericQuotaFetcher.ts");
const preflightModule = await import("../../../open-sse/services/quotaPreflight.ts");
const scoringModule = await import("../../../open-sse/services/combo/quotaScoring.ts");
const strategiesModule = await import("../../../open-sse/services/combo/quotaStrategies.ts");

const { convertUsageToQuotaInfo, registerGenericQuotaFetchers } = genericModule;
const { getQuotaFetcher, registerQuotaFetcher } = preflightModule;
const { scoreResetAwareQuota, resolveResetAwareConfig } = scoringModule;
const { orderTargetsByResetAwareQuota } = strategiesModule;

test("registerGenericQuotaFetchers wires antigravity and claude fetchers", () => {
  registerGenericQuotaFetchers();
  assert.ok(getQuotaFetcher("antigravity"), "antigravity fetcher should be registered");
  assert.ok(getQuotaFetcher("claude"), "claude fetcher should be registered");
  assert.ok(getQuotaFetcher("agy"), "agy alias fetcher should be registered");
});

test("convertUsageToQuotaInfo normalizes Claude session/weekly into window5h/window7d", () => {
  const result = convertUsageToQuotaInfo({
    quotas: {
      "session (5h)": {
        used: 20,
        total: 100,
        remainingPercentage: 80,
        resetAt: "2026-05-14T20:00:00Z",
      },
      "weekly (7d)": {
        used: 50,
        total: 100,
        remainingPercentage: 50,
        resetAt: "2026-05-21T00:00:00Z",
      },
    },
  });
  assert.ok(result, "should produce a QuotaInfo");
  assert.equal(result!.percentUsed, 0.5, "worst-case percentUsed");
  assert.equal(result!.resetAt, "2026-05-21T00:00:00Z", "resetAt tracks worst window");
  assert.deepEqual(result!.windows["session (5h)"], {
    percentUsed: 0.2,
    resetAt: "2026-05-14T20:00:00Z",
  });
  assert.deepEqual(result!.windows["weekly (7d)"], {
    percentUsed: 0.5,
    resetAt: "2026-05-21T00:00:00Z",
  });
  // Synthetic window keys are NOT leaked into the provider-native windows map
  assert.equal(result!.windows["window5h"], undefined);
  assert.equal(result!.windows["window7d"], undefined);
  assert.equal(result!.window5h?.percentUsed, 0.2);
  assert.equal(result!.window7d?.percentUsed, 0.5);
});

test("convertUsageToQuotaInfo normalizes Antigravity model quotas into window5h/window7d", () => {
  const result = convertUsageToQuotaInfo({
    quotas: {
      "gemini-2-flash": {
        used: 200,
        total: 1000,
        remainingPercentage: 80,
        resetAt: "2026-05-14T20:00:00Z",
      },
      "gemini-2-pro": {
        used: 100,
        total: 1000,
        remainingPercentage: 90,
        resetAt: "2026-05-14T22:00:00Z",
      },
      gemini_weekly: {
        used: 500,
        total: 1000,
        remainingPercentage: 50,
        resetAt: "2026-05-21T00:00:00Z",
      },
      claude_and_gpt_weekly: {
        used: 100,
        total: 1000,
        remainingPercentage: 90,
        resetAt: "2026-05-21T12:00:00Z",
      },
    },
  });
  assert.ok(result, "should produce a QuotaInfo");
  assert.equal(result!.percentUsed, 0.5, "worst-case percentUsed across all windows");
  // Synthetic window keys are NOT leaked into the provider-native windows map
  assert.equal(result!.windows["window5h"], undefined);
  assert.equal(result!.windows["window7d"], undefined);
  // 5h window picks the worst (most used) per-model quota.
  assert.equal(result!.window5h?.percentUsed, 0.2, "window5h is worst 5h model");
  assert.equal(result!.window5h?.resetAt, "2026-05-14T20:00:00Z");
  // 7d window picks the worst weekly quota.
  assert.equal(result!.window7d?.percentUsed, 0.5, "window7d is worst weekly");
  assert.equal(result!.window7d?.resetAt, "2026-05-21T00:00:00Z");
  // Native model keys are preserved.
  assert.equal(result!.windows["gemini-2-flash"].percentUsed, 0.2);
  assert.equal(result!.windows["gemini_weekly"].percentUsed, 0.5);
});

test("scoreResetAwareQuota ranks lower-used Antigravity quota higher and avoids 0.5 dead score", () => {
  const resetAt5h = new Date(Date.now() + 24 * 3600 * 1000).toISOString();
  const resetAt7d = new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString();
  const lowUsage = convertUsageToQuotaInfo({
    quotas: {
      "gemini-2-flash": {
        used: 800,
        total: 1000,
        remainingPercentage: 20,
        resetAt: resetAt5h,
      },
      gemini_weekly: {
        used: 800,
        total: 1000,
        remainingPercentage: 20,
        resetAt: resetAt7d,
      },
    },
  });
  const highUsage = convertUsageToQuotaInfo({
    quotas: {
      "gemini-2-flash": {
        used: 200,
        total: 1000,
        remainingPercentage: 80,
        resetAt: resetAt5h,
      },
      gemini_weekly: {
        used: 200,
        total: 1000,
        remainingPercentage: 80,
        resetAt: resetAt7d,
      },
    },
  });
  const config = resolveResetAwareConfig({});
  const lowScore = scoreResetAwareQuota(lowUsage, config).score;
  const highScore = scoreResetAwareQuota(highUsage, config).score;
  assert.ok(highScore > lowScore, "more-remaining quota must score higher");
  assert.ok(lowScore !== 0.5, "low-usage score must not be the dead 0.5 fallback");
  assert.ok(highScore !== 0.5, "high-usage score must not be the dead 0.5 fallback");
});

test("orderTargetsByResetAwareQuota prefers Antigravity connection with more remaining quota", async () => {
  registerGenericQuotaFetchers();
  const low = `low-${randomUUID()}`;
  const high = `high-${randomUUID()}`;
  const resetAt5h = new Date(Date.now() + 24 * 3600 * 1000).toISOString();
  const resetAt7d = new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString();

  registerQuotaFetcher("antigravity", async (connectionId) => {
    if (connectionId === low) {
      return convertUsageToQuotaInfo({
        quotas: {
          "gemini-2-flash": {
            used: 800,
            total: 1000,
            remainingPercentage: 20,
            resetAt: resetAt5h,
          },
          gemini_weekly: {
            used: 800,
            total: 1000,
            remainingPercentage: 20,
            resetAt: resetAt7d,
          },
        },
      });
    }
    if (connectionId === high) {
      return convertUsageToQuotaInfo({
        quotas: {
          "gemini-2-flash": {
            used: 200,
            total: 1000,
            remainingPercentage: 80,
            resetAt: resetAt5h,
          },
          gemini_weekly: {
            used: 200,
            total: 1000,
            remainingPercentage: 80,
            resetAt: resetAt7d,
          },
        },
      });
    }
    return null;
  });

  const targets = [low, high].map((connectionId, index) => ({
    providerId: "antigravity",
    provider: "antigravity",
    model: "gemini-2-flash",
    modelStr: "antigravity/gemini-2-flash",
    connectionId,
    executionKey: `test-${index}`,
    index,
  }));

  const ordered = await orderTargetsByResetAwareQuota(targets, "test", {}, { warn: () => {} });
  assert.equal(ordered[0].connectionId, high, "connection with more remaining quota must be first");
});

test("getSaturation reads saturation from nested quotas map for generic providers", async () => {
  const saturationModule = await import("../../../src/lib/quota/saturationSignals.ts");
  saturationModule._clearSaturationCache();
  saturationModule.__setGenericUsageFetcherForTests(async () => ({
    quotas: {
      "gemini-2-flash": {
        used: 800,
        total: 1000,
        remainingPercentage: 20,
        resetAt: null,
      },
    },
  }));

  const saturation = await saturationModule.getSaturation("conn-ag", "antigravity", {
    unit: "percent",
    window: "5h",
  });
  assert.equal(saturation, 0.8, "saturation must reflect the worst nested quota");

  saturationModule.__setGenericUsageFetcherForTests(null);
});
