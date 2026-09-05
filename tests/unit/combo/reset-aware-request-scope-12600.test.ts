import test, { afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const genericModule = await import("../../../open-sse/services/genericQuotaFetcher.ts");
const scoringModule = await import("../../../open-sse/services/combo/quotaScoring.ts");
const familyModule = await import("../../../open-sse/services/antigravityQuotaFamily.ts");
const preflightModule = await import("../../../open-sse/services/quotaPreflight.ts");

const { convertUsageToQuotaInfo, fetchGenericQuota, invalidateGenericQuotaCache } = genericModule;
const { scoreResetAwareQuota, resolveResetAwareConfig } = scoringModule;
const { getQuotaFetchScope } = familyModule;
const { getQuotaWindows } = preflightModule;

const resetAt5h = new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString();
const resetAt7d = new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString();

const usage = {
  quotas: {
    "gemini-3.7-flash-high": {
      used: 30,
      total: 1000,
      remainingPercentage: 97,
      resetAt: resetAt5h,
    },
    "claude-opus-4-6-thinking": {
      used: 1000,
      total: 1000,
      remainingPercentage: 0,
      resetAt: resetAt7d,
    },
    "gpt-oss-120b-medium": {
      used: 900,
      total: 1000,
      remainingPercentage: 10,
      resetAt: resetAt5h,
    },
    gemini_weekly: {
      used: 10,
      total: 1000,
      remainingPercentage: 99,
      resetAt: resetAt7d,
    },
    claude_gpt_weekly: {
      used: 1000,
      total: 1000,
      remainingPercentage: 0,
      resetAt: resetAt7d,
    },
    unrelated_weekly: {
      used: 1000,
      total: 1000,
      remainingPercentage: 0,
      resetAt: resetAt7d,
    },
  },
};

test("reset-aware Gemini scoring ignores depleted Claude family quota", () => {
  const quota = convertUsageToQuotaInfo(usage, {
    provider: "agy",
    requestedModel: "agy/gemini-3.7-flash-high",
  });

  assert.ok(quota);
  assert.equal(quota.window5h?.percentUsed, 0.03);
  assert.equal(quota.window7d?.percentUsed, 0.01);
  assert.equal(quota.percentUsed, 0.03);
  assert.equal(quota.limitReached, false);
  assert.equal(quota.windows?.["claude-opus-4-6-thinking"], undefined);
  assert.equal(quota.windows?.["gpt-oss-120b-medium"], undefined);
  assert.equal(quota.windows?.claude_gpt_weekly, undefined);
  assert.equal(quota.windows?.unrelated_weekly, undefined);
  assert.ok(scoreResetAwareQuota(quota, resolveResetAwareConfig({})).score > 0.3);
});

test("opposite-family-only telemetry fails open as unknown", () => {
  const gemini = convertUsageToQuotaInfo(
    { quotas: { claude_gpt_weekly: usage.quotas.claude_gpt_weekly } },
    { provider: "agy", requestedModel: "gemini-3.7-flash-high" }
  );
  const claude = convertUsageToQuotaInfo(
    { quotas: { gemini_weekly: usage.quotas.gemini_weekly } },
    { provider: "antigravity", requestedModel: "claude-opus-4-6-thinking" }
  );

  assert.equal(gemini, null);
  assert.equal(claude, null);
  assert.equal(scoreResetAwareQuota(gemini, resolveResetAwareConfig({})).score, 0.5);
  assert.equal(scoreResetAwareQuota(claude, resolveResetAwareConfig({})).score, 0.5);
});

test("Claude family excludes unknown weekly buckets", () => {
  const quota = convertUsageToQuotaInfo(
    {
      quotas: {
        "claude-opus-4-6-thinking": {
          used: 100,
          total: 1000,
          remainingPercentage: 90,
          resetAt: resetAt5h,
        },
        claude_gpt_weekly: {
          used: 100,
          total: 1000,
          remainingPercentage: 90,
          resetAt: resetAt7d,
        },
        unrelated_weekly: usage.quotas.unrelated_weekly,
      },
    },
    { provider: "agy", requestedModel: "claude-opus-4-6-thinking" }
  );

  assert.ok(quota);
  assert.equal(quota.limitReached, false);
  assert.equal(quota.windows?.unrelated_weekly, undefined);
  assert.equal(quota.window7d?.percentUsed, 0.1);
});

test("unscoped provider-limits conversion retains conservative global windows", () => {
  const quota = convertUsageToQuotaInfo(usage);

  assert.ok(quota);
  assert.equal(quota.window5h?.percentUsed, 1);
  assert.equal(quota.window7d?.percentUsed, 1);
  assert.equal(quota.limitReached, true);
});

test("reset-aware fetch scope is family-wide for Antigravity and * otherwise", () => {
  assert.equal(getQuotaFetchScope("agy", "gemini-3.7-flash-high"), "family:gemini");
  assert.equal(getQuotaFetchScope("antigravity", "claude-opus-4-6-thinking"), "family:claude");
  assert.equal(getQuotaFetchScope("codex", "gpt-5"), "*");
});

test("buildAutoCandidates uses the shared Antigravity fetch-scope helper", () => {
  const combo = fs.readFileSync(new URL("../../../open-sse/services/combo.ts", import.meta.url), "utf8");
  const strategies = fs.readFileSync(
    new URL("../../../open-sse/services/combo/quotaStrategies.ts", import.meta.url),
    "utf8"
  );

  assert.match(combo, /getQuotaFetchScope\(/);
  assert.doesNotMatch(
    combo,
    /provider === "antigravity" \|\| provider === "agy"\s*\n\s*\? getQuotaScopedModelForProvider/
  );
  assert.match(strategies, /getQuotaFetchScope\(/);
  assert.doesNotMatch(strategies, /function getQuotaFetchScope/);
});

afterEach(() => {
  genericModule.__testing?.resetUsageFetcher?.();
  genericModule.__testing?.clearCache?.();
});

test("fetchGenericQuota scopes Gemini windows and still catalogs sibling families", async () => {
  let fetches = 0;
  genericModule.__testing.setUsageFetcher(async () => {
    fetches += 1;
    return usage;
  });

  const quota = await fetchGenericQuota("conn-gemini", {
    provider: "agy",
    requestedModel: "agy/gemini-3.7-flash-high",
  });

  assert.ok(quota);
  assert.equal(quota.window5h?.percentUsed, 0.03);
  assert.equal(quota.limitReached, false);
  assert.equal(quota.windows?.claude_gpt_weekly, undefined);
  assert.equal(quota.windows?.["claude-opus-4-6-thinking"], undefined);
  const windows = getQuotaWindows("agy");
  assert.equal(windows.includes("claude_gpt_weekly"), true);
  assert.equal(windows.includes("gemini_weekly"), true);
  assert.equal(fetches, 1);
});

test("invalidateGenericQuotaCache clears every family-scoped entry for a connection", async () => {
  let fetches = 0;
  genericModule.__testing.setUsageFetcher(async () => {
    fetches += 1;
    return usage;
  });

  const connectionId = "conn-both-families";
  await fetchGenericQuota(connectionId, {
    provider: "agy",
    requestedModel: "gemini-3.7-flash-high",
  });
  await fetchGenericQuota(connectionId, {
    provider: "agy",
    requestedModel: "claude-opus-4-6-thinking",
  });
  assert.equal(fetches, 2);

  await fetchGenericQuota(connectionId, {
    provider: "agy",
    requestedModel: "gemini-3.7-flash-high",
  });
  assert.equal(fetches, 2);

  invalidateGenericQuotaCache("agy", connectionId);

  await fetchGenericQuota(connectionId, {
    provider: "agy",
    requestedModel: "gemini-3.7-flash-high",
  });
  await fetchGenericQuota(connectionId, {
    provider: "agy",
    requestedModel: "claude-opus-4-6-thinking",
  });
  assert.equal(fetches, 4);
});

test("non-Antigravity generic quota cache stays per connection, not per model", async () => {
  let fetches = 0;
  genericModule.__testing.setUsageFetcher(async () => {
    fetches += 1;
    return usage;
  });

  const connectionId = "conn-kimi";
  await fetchGenericQuota(connectionId, {
    provider: "kimi",
    requestedModel: "kimi-k2.5",
  });
  await fetchGenericQuota(connectionId, {
    provider: "kimi",
    requestedModel: "kimi-k2.7",
  });
  assert.equal(fetches, 1);
});
