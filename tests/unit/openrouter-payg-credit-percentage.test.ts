import test from "node:test";
import assert from "node:assert/strict";

import { invalidateOpenrouterQuotaCache } from "../../open-sse/services/openrouterQuotaFetcher.ts";
import { getOpenrouterUsage } from "../../open-sse/services/usage/openrouter.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

type CreditsQuota = {
  used: number;
  total: number;
  remaining?: number;
  remainingPercentage?: number;
  unlimited: boolean;
};

async function creditsQuota(
  connectionId: string,
  key: { limit: number | null; limitRemaining: number | null },
  credits: { totalCredits: number | null; totalUsage: number | null }
): Promise<CreditsQuota> {
  globalThis.fetch = (async (url: unknown) => {
    if (String(url).endsWith("/key")) {
      return new Response(
        JSON.stringify({
          data: {
            limit: key.limit,
            limit_remaining: key.limitRemaining,
            limit_reset: null,
            is_free_tier: false,
          },
        }),
        { status: 200 }
      );
    }
    return new Response(
      JSON.stringify({
        data: {
          total_credits: credits.totalCredits,
          total_usage: credits.totalUsage,
        },
      }),
      { status: 200 }
    );
  }) as typeof fetch;

  const result = await getOpenrouterUsage(connectionId, "synthetic-openrouter-key");
  invalidateOpenrouterQuotaCache(connectionId);
  const quota = result.quotas?.credits as CreditsQuota | undefined;
  assert.ok(quota);
  return quota;
}

test("OpenRouter explicit key limit reports remaining percentage", async () => {
  const quota = await creditsQuota(
    "openrouter-payg-key-limit",
    { limit: 10, limitRemaining: 9.3 },
    { totalCredits: 10, totalUsage: 0.7 }
  );

  assert.equal(quota.total, 10);
  assert.ok(Math.abs(quota.used - 0.7) < 0.000_001);
  assert.equal(quota.remaining, 9.3);
  assert.equal(quota.remainingPercentage, 93);
  assert.equal(quota.unlimited, false);
});

test("OpenRouter PAYG account credits provide denominator without key limit", async () => {
  const quota = await creditsQuota(
    "openrouter-payg-account",
    { limit: null, limitRemaining: null },
    { totalCredits: 10, totalUsage: 0.7 }
  );

  assert.equal(quota.total, 10);
  assert.ok(Math.abs(quota.used - 0.7) < 0.000_001);
  assert.ok(Math.abs((quota.remaining ?? 0) - 9.3) < 0.000_001);
  assert.equal(quota.remainingPercentage, 93);
  assert.equal(quota.unlimited, false);
});

test("OpenRouter key limit takes priority over account credits", async () => {
  const quota = await creditsQuota(
    "openrouter-payg-key-priority",
    { limit: 5, limitRemaining: 2 },
    { totalCredits: 10, totalUsage: 0.7 }
  );

  assert.equal(quota.total, 5);
  assert.equal(quota.used, 3);
  assert.equal(quota.remaining, 2);
  assert.equal(quota.remainingPercentage, 40);
  assert.equal(quota.unlimited, false);
});

test("OpenRouter balance without positive denominator does not invent 100 percent", async () => {
  const quota = await creditsQuota(
    "openrouter-payg-no-denominator",
    { limit: null, limitRemaining: null },
    { totalCredits: 0, totalUsage: -5 }
  );

  // No positive pool denominator: balance is still surfaced as a credit
  // row but no fabricated 100% percentage is reported.
  assert.equal(quota.total, 5);
  assert.equal(quota.used, 0);
  assert.equal(quota.remaining, 5);
  assert.equal(quota.remainingPercentage, undefined);
  assert.equal(quota.unlimited, false);
});
