import test from "node:test";
import assert from "node:assert/strict";

const usageModule = await import("../../open-sse/services/usage.ts");
const providerLimitUtils =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.tsx");

test("antigravity is registered for the background usage fetcher", () => {
  assert.ok(
    usageModule.USAGE_FETCHER_PROVIDERS.includes("antigravity"),
    "antigravity should be fetched by the generic quota refresher"
  );
  assert.equal(
    usageModule.USAGE_FETCHER_PROVIDERS.includes("agy"),
    false,
    "the consolidated agy provider must not remain a separate fetcher entry"
  );
});

test("getUsageForProvider routes antigravity through the Antigravity usage implementation", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        models: {
          "gemini-3.8-flash-high": {
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
        id: "antigravity-test-conn",
        provider: "antigravity",
        accessToken: "fake-token",
        providerSpecificData: {},
      },
      { forceRefresh: true }
    );

    assert.ok(result && typeof result === "object");
    assert.notEqual(
      (result as { message?: string }).message,
      "Usage API not implemented for antigravity",
      "antigravity must not fall through to the unsupported-provider branch"
    );
    assert.ok("quotas" in result, "antigravity should return quota data when upstream responds");

    const quota = (result as { quotas: Record<string, any> }).quotas["gemini-3.8-flash-high"];
    assert.ok(quota, "should expose the upstream antigravity per-model quota");
    assert.equal(quota.remainingPercentage, 75);
    assert.equal(
      (result as { quotas: Record<string, any> }).quotas["gemini-3.5-flash-high"],
      undefined,
      "antigravity quota should not expose retired friendly IDs"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("parseQuotaData treats antigravity quota payloads like Antigravity", () => {
  const parsed = providerLimitUtils.parseQuotaData("antigravity", {
    quotas: {
      credits: { remaining: 42 },
      "gemini-3.8-flash-high": {
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

  const modelQuota = parsed.find((quota: any) => quota.name === "gemini-3.8-flash-high");
  assert.ok(modelQuota, "model quota should be rendered");
  assert.equal(modelQuota.remainingPercentage, 75);
});
