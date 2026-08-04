/**
 * tests/unit/firecrawl-usage.test.ts
 *
 * Firecrawl usage.ts dispatch + Provider Limits allowlists for team credits.
 */

import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";

const { __testing, USAGE_FETCHER_PROVIDERS, getUsageForProvider } =
  await import("../../open-sse/services/usage.ts");
const { invalidateFirecrawlQuotaCache } =
  await import("../../open-sse/services/firecrawlQuotaFetcher.ts");
const { USAGE_SUPPORTED_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { isSupportedUsageConnection } = await import("../../src/lib/usage/providerLimits.ts");
const { getFirecrawlUsage } = __testing;

const originalFetch = globalThis.fetch;

function creditUsageResponse(remaining: number, plan: number, endIso?: string) {
  return new Response(
    JSON.stringify({
      success: true,
      data: {
        remainingCredits: remaining,
        planCredits: plan,
        billingPeriodEnd: endIso || "2026-07-31T23:59:59Z",
      },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

describe("Firecrawl usage dispatch", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
    invalidateFirecrawlQuotaCache("conn-fc");
    invalidateFirecrawlQuotaCache("conn-live");
  });

  it("registers firecrawl in USAGE_FETCHER_PROVIDERS and USAGE_SUPPORTED_PROVIDERS", () => {
    assert.ok((USAGE_FETCHER_PROVIDERS as readonly string[]).includes("firecrawl"));
    assert.ok((USAGE_SUPPORTED_PROVIDERS as readonly string[]).includes("firecrawl"));
  });

  it("isSupportedUsageConnection accepts firecrawl apikey connections", () => {
    assert.equal(
      isSupportedUsageConnection({
        id: "c1",
        provider: "firecrawl",
        authType: "apikey",
      }),
      true
    );
  });

  it("getFirecrawlUsage maps live credit-usage into monthly quota", async () => {
    globalThis.fetch = async () => creditUsageResponse(250, 1000);

    const r = (await getFirecrawlUsage("conn-live", "fc-key")) as {
      plan?: string;
      message?: string;
      quotas?: {
        monthly?: {
          used: number;
          total: number;
          remaining?: number;
          resetAt: string | null;
        };
      };
      remainingCredits?: number;
    };

    assert.ok(r.quotas?.monthly, `expected quotas, got: ${JSON.stringify(r)}`);
    assert.match(r.plan || "", /Firecrawl/i);
    assert.equal(r.quotas!.monthly!.used, 750);
    assert.equal(r.quotas!.monthly!.total, 1000);
    assert.equal(r.quotas!.monthly!.remaining, 250);
    assert.equal(r.remainingCredits, 250);
    assert.ok(r.quotas!.monthly!.resetAt?.includes("2026-07-31"));
  });

  it("getFirecrawlUsage reports over-plan remaining credits as more than 100% left", async () => {
    globalThis.fetch = async () => creditUsageResponse(1500, 1000);

    const r = (await getFirecrawlUsage("conn-live", "fc-key")) as {
      quotas?: {
        monthly?: {
          used: number;
          total: number;
          remaining?: number;
          remainingPercentage?: number;
          extraCreditsInferred?: number;
          overPlan?: boolean;
        };
      };
      remainingCredits?: number;
      planCredits?: number;
      extraCreditsInferred?: number;
    };

    assert.equal(r.quotas?.monthly?.used, 0);
    assert.equal(r.quotas?.monthly?.total, 1000);
    assert.equal(r.quotas?.monthly?.remaining, 1500);
    assert.equal(r.quotas?.monthly?.remainingPercentage, 150);
    assert.equal(r.quotas?.monthly?.overPlan, true);
    assert.equal(r.quotas?.monthly?.extraCreditsInferred, 500);
    assert.equal(r.extraCreditsInferred, 500);
  });

  it("getFirecrawlUsage keeps the plan baseline stable as over-plan credits are spent", async () => {
    globalThis.fetch = async () => creditUsageResponse(1450, 1000);

    const r = (await getFirecrawlUsage("conn-live", "fc-key")) as {
      quotas?: {
        monthly?: {
          used: number;
          total: number;
          remaining?: number;
          remainingPercentage?: number;
          extraCreditsInferred?: number;
        };
      };
    };

    assert.equal(r.quotas?.monthly?.used, 0);
    assert.equal(r.quotas?.monthly?.total, 1000);
    assert.equal(r.quotas?.monthly?.remaining, 1450);
    assert.equal(r.quotas?.monthly?.remainingPercentage, 145);
    assert.equal(r.quotas?.monthly?.extraCreditsInferred, 450);
  });

  it("getFirecrawlUsage returns message when live quota unavailable", async () => {
    globalThis.fetch = async () => new Response("Unauthorized", { status: 401 });
    const r = (await getFirecrawlUsage("conn-fc", "dead")) as {
      message?: string;
      quotas?: unknown;
    };
    assert.ok(r.message && !r.quotas);
  });

  it("getFirecrawlUsage returns message when connection id missing", async () => {
    const r = (await getFirecrawlUsage("", "key")) as { message?: string; quotas?: unknown };
    assert.ok(r.message && !r.quotas);
  });

  it("getUsageForProvider('firecrawl', ...) delegates to getFirecrawlUsage", async () => {
    globalThis.fetch = async () => creditUsageResponse(100, 500);

    const r = (await getUsageForProvider({
      id: "conn-live",
      provider: "firecrawl",
      apiKey: "dispatch-key",
    } as Parameters<typeof getUsageForProvider>[0])) as {
      quotas?: { monthly?: { used: number; total: number; remaining?: number } };
    };

    assert.equal(r.quotas?.monthly?.used, 400);
    assert.equal(r.quotas?.monthly?.total, 500);
    assert.equal(r.quotas?.monthly?.remaining, 100);
  });
});
