import test from "node:test";
import assert from "node:assert/strict";

const usageService = await import("../../open-sse/services/usage.ts");
const providerLimitUtils =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.tsx");

test("github copilot business seats infer business plan and hide unlimited buckets", async () => {
  const originalFetch = globalThis.fetch;
  const futureResetDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        access_type_sku: "copilot_business_seat",
        quota_reset_date: futureResetDate,
        quota_snapshots: {
          chat: { unlimited: true },
          completions: { unlimited: true },
          premium_interactions: {
            entitlement: 300,
            remaining: 180,
            unlimited: false,
          },
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );

  try {
    const usage = await usageService.getUsageForProvider({
      provider: "github",
      accessToken: "gho_test",
      providerSpecificData: {},
    });

    assert.equal(usage.plan, "Copilot Business");
    assert.deepEqual(Object.keys(usage.quotas), ["premium_interactions"]);
    assert.equal(usage.quotas.premium_interactions.total, 300);
    assert.equal(usage.quotas.premium_interactions.used, 120);
    assert.equal(usage.quotas.premium_interactions.remaining, 180);
    assert.equal(usage.quotas.premium_interactions.remainingPercentage, 60);

    const parsed = providerLimitUtils.parseQuotaData("github", usage);
    assert.equal(parsed.length, 1);
    assert.equal(parsed[0].name, "premium_interactions");
    assert.equal(parsed[0].remainingPercentage, 60);
    assert.equal(providerLimitUtils.normalizePlanTier(usage.plan).key, "business");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("github copilot individual paid plans no longer normalize as free", async () => {
  const originalFetch = globalThis.fetch;
  const futureResetDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        copilot_plan: "individual",
        quota_reset_date: futureResetDate,
        quota_snapshots: {
          premium_interactions: {
            entitlement: 300,
            remaining: 120,
            unlimited: false,
          },
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );

  try {
    const usage = await usageService.getUsageForProvider({
      provider: "github",
      accessToken: "gho_test",
      providerSpecificData: {},
    });

    assert.equal(usage.plan, "Copilot Pro");
    assert.equal(providerLimitUtils.normalizePlanTier(usage.plan).key, "pro");
    assert.equal(providerLimitUtils.normalizePlanTier("individual").key, "unknown");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
