/**
 * tests/unit/command-code-usage.test.ts
 *
 * Command Code usage.ts dispatch + Provider Limits allowlists for
 * monthly credits + 5h/weekly rolling windows (Bearer /alpha APIs).
 */

import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";

const { __testing, USAGE_FETCHER_PROVIDERS, getUsageForProvider } =
  await import("../../../open-sse/services/usage.ts");
const { USAGE_SUPPORTED_PROVIDERS } = await import("../../../src/shared/constants/providers.ts");
const { isSupportedUsageConnection } = await import("../../../src/lib/usage/providerLimits.ts");
const { convertUsageToQuotaInfo } = await import("../../../open-sse/services/genericQuotaFetcher.ts");
const { getCommandCodeUsage } = __testing;

const originalFetch = globalThis.fetch;

type QuotaShape = {
  used: number;
  total: number;
  remaining?: number;
  remainingPercentage?: number;
  resetAt: string | null;
  currency?: string;
  displayName?: string;
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

const CREDITS_PAYLOAD = {
  credits: {
    belowThreshold: false,
    creditThreshold: 0,
    monthlyCredits: 34.9522404823,
    purchasedCredits: 0.0446690956,
    freeCredits: 0,
  },
  windowLimits: {
    limited: true,
    exceeded: "weekly",
    fiveHour: {
      used: 0,
      cap: 14,
      exceeded: false,
      resetAt: 0,
    },
    weekly: {
      used: 35.0477595177,
      cap: 35,
      exceeded: true,
      resetAt: 1786575240518,
    },
  },
};

const WHOAMI_PERSONAL = {
  success: true,
  user: { id: "u1", name: "dev", email: "dev@example.com", userName: "dev" },
  org: null,
};

const SUBSCRIPTION_GOAT = {
  success: true,
  data: {
    id: "sub_1",
    status: "active",
    orgId: null,
    currentPeriodStart: "2026-08-05T22:27:41.000Z",
    currentPeriodEnd: "2026-09-05T22:27:41.000Z",
    planId: "individual-goat",
  },
};

const USAGE_SUMMARY = {
  totalCount: 1260,
  totalCost: 55.0030904221,
  totalMonthlyCredits: 35.0477595177,
  totalPurchasedCredits: 19.9553309044,
  periodBasis: "billing-period",
};

function installMockFetch(handlers: Record<string, () => Response>) {
  globalThis.fetch = async (input: RequestInfo | URL) => {
    const url = String(input);
    for (const [needle, handler] of Object.entries(handlers)) {
      if (url.includes(needle)) return handler();
    }
    return jsonResponse({ error: `unhandled fetch: ${url}` }, 500);
  };
}

describe("Command Code usage dispatch", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("registers command-code in USAGE_FETCHER_PROVIDERS and USAGE_SUPPORTED_PROVIDERS", () => {
    assert.ok((USAGE_FETCHER_PROVIDERS as readonly string[]).includes("command-code"));
    assert.ok((USAGE_SUPPORTED_PROVIDERS as readonly string[]).includes("command-code"));
  });

  it("isSupportedUsageConnection accepts command-code apikey connections", () => {
    assert.equal(
      isSupportedUsageConnection({
        id: "c1",
        provider: "command-code",
        authType: "apikey",
      }),
      true
    );
  });

  it("getCommandCodeUsage maps credits + windows + period spend", async () => {
    installMockFetch({
      "/alpha/whoami": () => jsonResponse(WHOAMI_PERSONAL),
      "/alpha/billing/credits": () => jsonResponse(CREDITS_PAYLOAD),
      "/alpha/billing/subscriptions": () => jsonResponse(SUBSCRIPTION_GOAT),
      "/alpha/usage/summary": () => jsonResponse(USAGE_SUMMARY),
    });

    const r = (await getCommandCodeUsage("cc-key")) as {
      plan?: string;
      message?: string;
      quotas?: {
        five_hour?: QuotaShape;
        weekly?: QuotaShape;
        credits?: QuotaShape;
      };
    };

    assert.ok(r.quotas?.five_hour, `expected five_hour, got: ${JSON.stringify(r)}`);
    assert.ok(r.quotas?.weekly, `expected weekly, got: ${JSON.stringify(r)}`);
    assert.ok(r.quotas?.credits, `expected credits, got: ${JSON.stringify(r)}`);
    assert.match(r.plan || "", /GOAT/i);

    assert.equal(r.quotas!.five_hour!.used, 0);
    assert.equal(r.quotas!.five_hour!.total, 14);
    assert.equal(r.quotas!.five_hour!.resetAt, null);
    assert.equal(r.quotas!.five_hour!.currency, "USD");

    // used clamped to total when upstream reports slight overshoot
    assert.equal(r.quotas!.weekly!.used, 35);
    assert.equal(r.quotas!.weekly!.total, 35);
    assert.equal(r.quotas!.weekly!.remaining, 0);
    assert.equal(r.quotas!.weekly!.remainingPercentage, 0);
    assert.ok(r.quotas!.weekly!.resetAt?.startsWith("2026-"));

    const remainingCredits = 34.9522404823 + 0.0446690956;
    assert.ok(Math.abs((r.quotas!.credits!.remaining ?? 0) - remainingCredits) < 1e-9);
    assert.equal(r.quotas!.credits!.used, USAGE_SUMMARY.totalCost);
    assert.ok(
      Math.abs(r.quotas!.credits!.total - (USAGE_SUMMARY.totalCost + remainingCredits)) < 1e-9
    );
    assert.equal(r.quotas!.credits!.resetAt, "2026-09-05T22:27:41.000Z");
    assert.equal(r.quotas!.credits!.currency, "USD");
  });

  it("getCommandCodeUsage works for org:null without orgId query params", async () => {
    const seen: string[] = [];
    globalThis.fetch = async (input: RequestInfo | URL) => {
      const url = String(input);
      seen.push(url);
      if (url.includes("/alpha/whoami")) return jsonResponse(WHOAMI_PERSONAL);
      if (url.includes("/alpha/billing/credits")) return jsonResponse(CREDITS_PAYLOAD);
      if (url.includes("/alpha/billing/subscriptions")) return jsonResponse(SUBSCRIPTION_GOAT);
      if (url.includes("/alpha/usage/summary")) return jsonResponse(USAGE_SUMMARY);
      return jsonResponse({ error: "unhandled" }, 500);
    };

    await getCommandCodeUsage("cc-key");
    assert.ok(seen.some((u) => u.includes("/alpha/billing/credits")));
    assert.ok(!seen.some((u) => /[?&]orgId=/.test(u)));
  });

  it("getCommandCodeUsage returns message when apiKey missing", async () => {
    const r = (await getCommandCodeUsage("")) as { message?: string; quotas?: unknown };
    assert.ok(r.message && !r.quotas);
  });

  it("getCommandCodeUsage returns message-only on 401", async () => {
    installMockFetch({
      "/alpha/whoami": () => jsonResponse({ success: false }, 401),
      "/alpha/billing/credits": () =>
        jsonResponse(
          {
            success: false,
            error: { code: "UNAUTHORIZED", status: 401, message: "Invalid token" },
          },
          401
        ),
    });

    const r = (await getCommandCodeUsage("bad-key")) as { message?: string; quotas?: unknown };
    assert.ok(r.message && !r.quotas);
  });

  it("getCommandCodeUsage soft-fails when subscription/summary unavailable", async () => {
    installMockFetch({
      "/alpha/whoami": () => jsonResponse(WHOAMI_PERSONAL),
      "/alpha/billing/credits": () => jsonResponse(CREDITS_PAYLOAD),
      "/alpha/billing/subscriptions": () => jsonResponse({ success: false }, 500),
      "/alpha/usage/summary": () => jsonResponse({ error: "boom" }, 500),
    });

    const r = (await getCommandCodeUsage("cc-key")) as {
      plan?: string;
      quotas?: { five_hour?: QuotaShape; weekly?: QuotaShape; credits?: QuotaShape };
    };

    assert.ok(r.quotas?.five_hour);
    assert.ok(r.quotas?.weekly);
    assert.ok(r.quotas?.credits);
    // Without summary spend, used defaults to 0; remaining still from credit pools
    assert.equal(r.quotas!.credits!.used, 0);
    assert.ok((r.quotas!.credits!.remaining ?? 0) > 0);
  });

  it("getUsageForProvider('command-code', ...) delegates to getCommandCodeUsage", async () => {
    installMockFetch({
      "/alpha/whoami": () => jsonResponse(WHOAMI_PERSONAL),
      "/alpha/billing/credits": () => jsonResponse(CREDITS_PAYLOAD),
      "/alpha/billing/subscriptions": () => jsonResponse(SUBSCRIPTION_GOAT),
      "/alpha/usage/summary": () => jsonResponse(USAGE_SUMMARY),
    });

    const r = (await getUsageForProvider({
      id: "conn-cc",
      provider: "command-code",
      apiKey: "dispatch-key",
    } as Parameters<typeof getUsageForProvider>[0])) as {
      quotas?: { weekly?: QuotaShape };
      plan?: string;
    };

    assert.match(r.plan || "", /GOAT/i);
    assert.equal(r.quotas?.weekly?.total, 35);
  });

  it("convertUsageToQuotaInfo marks weekly-exhausted Command Code as limitReached", async () => {
    installMockFetch({
      "/alpha/whoami": () => jsonResponse(WHOAMI_PERSONAL),
      "/alpha/billing/credits": () => jsonResponse(CREDITS_PAYLOAD),
      "/alpha/billing/subscriptions": () => jsonResponse(SUBSCRIPTION_GOAT),
      "/alpha/usage/summary": () => jsonResponse(USAGE_SUMMARY),
    });

    const usage = await getCommandCodeUsage("cc-key");
    const info = convertUsageToQuotaInfo(usage);
    assert.ok(info);
    assert.equal(info!.limitReached, true);
    assert.ok((info!.windows.weekly?.percentUsed ?? 0) >= 1 - 1e-9);
  });
});
