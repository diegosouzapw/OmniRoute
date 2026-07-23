import test from "node:test";
import assert from "node:assert/strict";

const usageModule = await import("../../open-sse/services/usage.ts");
const providerLimitUtils =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.tsx");

test("agy is registered for the background usage fetcher", () => {
  assert.ok(
    usageModule.USAGE_FETCHER_PROVIDERS.includes("agy"),
    "agy should be fetched by the generic quota refresher"
  );
});

test("getUsageForProvider routes agy through the Antigravity usage implementation", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        models: {
          "gemini-3-flash-agent": {
            quotaInfo: {
              remainingFraction: 0.75,
              resetTime: "2026-06-06T00:00:00Z",
            },
          },
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  try {
    const result = await usageModule.getUsageForProvider(
      {
        id: "agy-test-conn",
        provider: "agy",
        accessToken: "fake-token",
        providerSpecificData: {},
      },
      { forceRefresh: true }
    );

    assert.ok(result && typeof result === "object");
    assert.notEqual(
      (result as { message?: string }).message,
      "Usage API not implemented for agy",
      "agy must not fall through to the unsupported-provider branch"
    );
    assert.ok("quotas" in result, "agy should return quota data when upstream responds");

    const quota = (result as { quotas: Record<string, any> }).quotas["gemini-3-flash-agent"];
    assert.ok(quota, "should expose the upstream agy per-model quota");
    assert.equal(quota.remainingPercentage, 75);
    assert.equal(
      (result as { quotas: Record<string, any> }).quotas["gemini-3.5-flash-high"],
      undefined,
      "agy quota should not expose retired friendly IDs"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("parseQuotaData treats agy quota payloads like Antigravity", () => {
  const parsed = providerLimitUtils.parseQuotaData("agy", {
    quotas: {
      credits: { remaining: 42 },
      "gemini-3-flash-agent": {
        used: 250,
        total: 1000,
        remainingPercentage: 75,
      },
      models: { used: 0, total: 0 },
    },
  });

  assert.equal(
    parsed.length,
    2,
    "credits and model quota should be rendered, models summary skipped"
  );
  const credits = parsed.find((quota: any) => quota.name === "credits");
  assert.ok(credits, "credits quota should be rendered");
  assert.equal(credits.isCredits, true);

  const modelQuota = parsed.find((quota: any) => quota.name === "gemini-3-flash-agent");
  assert.ok(modelQuota, "model quota should be rendered");
  assert.equal(modelQuota.remainingPercentage, 75);
});
