/**
 * tests/unit/tavily-usage.test.ts
 *
 * Tavily usage.ts dispatch + Provider Limits allowlists.
 */

import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";

const { __testing, USAGE_FETCHER_PROVIDERS, getUsageForProvider } =
  await import("../../open-sse/services/usage.ts");
const { invalidateTavilyQuotaCache } =
  await import("../../open-sse/services/tavilyQuotaFetcher.ts");
const { USAGE_SUPPORTED_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { isSupportedUsageConnection } = await import("../../src/lib/usage/providerLimits.ts");
const { getTavilyUsage } = __testing as typeof __testing & {
  getTavilyUsage: (
    connectionId: string,
    apiKey?: string,
    connection?: Record<string, unknown>
  ) => Promise<unknown>;
};

const originalFetch = globalThis.fetch;

function tavilyUsageResponse(planUsage: number, planLimit: number, currentPlan = "Researcher") {
  return new Response(
    JSON.stringify({
      key: {
        usage: planUsage,
        limit: null,
        search_usage: planUsage,
        crawl_usage: 0,
        extract_usage: 0,
        map_usage: 0,
        research_usage: 0,
      },
      account: {
        current_plan: currentPlan,
        plan_usage: planUsage,
        plan_limit: planLimit,
        search_usage: planUsage,
        crawl_usage: 0,
        extract_usage: 0,
        map_usage: 0,
        research_usage: 0,
        paygo_usage: 0,
        paygo_limit: null,
      },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

describe("Tavily usage dispatch", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
    invalidateTavilyQuotaCache("conn-tvly");
    invalidateTavilyQuotaCache("conn-live");
  });

  it("registers tavily and tavily-search in USAGE_FETCHER_PROVIDERS and USAGE_SUPPORTED_PROVIDERS", () => {
    assert.ok((USAGE_FETCHER_PROVIDERS as readonly string[]).includes("tavily-search"));
    assert.ok((USAGE_FETCHER_PROVIDERS as readonly string[]).includes("tavily"));
    assert.ok((USAGE_SUPPORTED_PROVIDERS as readonly string[]).includes("tavily-search"));
    assert.ok((USAGE_SUPPORTED_PROVIDERS as readonly string[]).includes("tavily"));
  });

  it("isSupportedUsageConnection accepts tavily-search and tavily apikey connections", () => {
    assert.equal(
      isSupportedUsageConnection({
        id: "c1",
        provider: "tavily-search",
        authType: "apikey",
      }),
      true
    );
    assert.equal(
      isSupportedUsageConnection({
        id: "c2",
        provider: "tavily",
        authType: "apikey",
      }),
      true
    );
  });

  it("getTavilyUsage maps live credit-usage into monthly quota", async () => {
    globalThis.fetch = async () => tavilyUsageResponse(20, 1000, "Researcher");

    const r = (await getTavilyUsage("conn-live", "mock-token")) as {
      plan?: string;
      message?: string;
      quotas?: {
        monthly?: {
          used: number;
          total: number;
          remaining?: number;
          remainingPercentage?: number;
          resetAt: string | null;
        };
      };
      remainingCredits?: number;
      planCredits?: number;
      limitReached?: boolean;
    };

    assert.ok(r.quotas?.monthly, `expected quotas, got: ${JSON.stringify(r)}`);
    assert.match(r.plan || "", /Tavily.*Researcher/i);
    assert.equal(r.quotas!.monthly!.used, 20);
    assert.equal(r.quotas!.monthly!.total, 1000);
    assert.equal(r.quotas!.monthly!.remaining, 980);
    assert.equal(r.remainingCredits, 980);
    assert.equal(r.planCredits, 1000);
    assert.equal(r.limitReached, false);
  });

  it("getTavilyUsage reports limitReached when remaining credits is 0", async () => {
    globalThis.fetch = async () => tavilyUsageResponse(1000, 1000, "Free");

    const r = (await getTavilyUsage("conn-live", "mock-token")) as {
      plan?: string;
      quotas?: {
        monthly?: {
          used: number;
          total: number;
          remaining?: number;
          remainingPercentage?: number;
        };
      };
      remainingCredits?: number;
      limitReached?: boolean;
    };

    assert.equal(r.quotas?.monthly?.used, 1000);
    assert.equal(r.quotas?.monthly?.total, 1000);
    assert.equal(r.quotas?.monthly?.remaining, 0);
    assert.equal(r.remainingCredits, 0);
    assert.equal(r.limitReached, true);
  });

  it("getTavilyUsage returns message when live quota unavailable", async () => {
    globalThis.fetch = async () => new Response("Unauthorized", { status: 401 });
    const r = (await getTavilyUsage("conn-tvly", "dead")) as {
      message?: string;
      quotas?: unknown;
    };
    assert.ok(r.message && !r.quotas);
  });

  it("getTavilyUsage returns message when connection id missing", async () => {
    const r = (await getTavilyUsage("", "key")) as { message?: string; quotas?: unknown };
    assert.ok(r.message && !r.quotas);
  });

  it("getUsageForProvider('tavily-search', ...) delegates to getTavilyUsage", async () => {
    globalThis.fetch = async () => tavilyUsageResponse(100, 500);

    const r = (await getUsageForProvider({
      id: "conn-live",
      provider: "tavily-search",
      apiKey: "tvly-key",
    } as Parameters<typeof getUsageForProvider>[0])) as {
      quotas?: { monthly?: { used: number; total: number; remaining?: number } };
    };

    assert.equal(r.quotas?.monthly?.used, 100);
    assert.equal(r.quotas?.monthly?.total, 500);
    assert.equal(r.quotas?.monthly?.remaining, 400);
  });
});
