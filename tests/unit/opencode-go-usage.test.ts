import assert from "node:assert/strict";
import test from "node:test";

import { getUsageForProvider } from "../../open-sse/services/usage.ts";
import { invalidateOpencodeQuotaCache } from "../../open-sse/services/opencodeQuotaFetcher.ts";
import { USAGE_SUPPORTED_PROVIDERS } from "../../src/shared/constants/providers.ts";

type ProviderQuota = {
  used: number;
  total: number;
  remaining: number;
  remainingPercentage: number;
  resetAt: string | null;
  unlimited: boolean;
  displayName?: string;
  currency?: string;
};
type ProviderUsage = {
  plan?: string | null;
  quotas?: Record<string, ProviderQuota>;
  limitReached?: boolean;
  message?: string;
};

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("USAGE_SUPPORTED_PROVIDERS includes opencode-go", () => {
  assert.ok((USAGE_SUPPORTED_PROVIDERS as readonly string[]).includes("opencode-go"));
});

test("getUsageForProvider does not fetch OpenCode Go quota without an API key", async () => {
  let called = false;
  globalThis.fetch = async () => {
    called = true;
    return new Response("unexpected", { status: 500 });
  };

  const result = (await getUsageForProvider({
    id: `opencode-go-no-key-${Date.now()}`,
    provider: "opencode-go",
    apiKey: "",
  })) as ProviderUsage;

  assert.equal(called, false);
  assert.match(result.message ?? "", /OpenCode.*API key/i);
});

test("getUsageForProvider shapes official OpenCode Go usage into Provider Limits quotas", async () => {
  const connectionId = `opencode-go-usage-${Date.now()}`;
  const rollingReset = "2026-09-01T01:02:03.000Z";
  const weeklyReset = "2026-09-05T04:05:06.000Z";
  const monthlyReset = "2026-09-30T07:08:09.000Z";
  let requestUrl = "";
  let authorization: string | null = null;

  globalThis.fetch = async (input, init) => {
    const request = new Request(input, init);
    requestUrl = request.url;
    authorization = request.headers.get("Authorization");
    return new Response(
      JSON.stringify({
        usage: {
          rolling: { status: "ok", percent: 25, resetsAt: rollingReset },
          weekly: { status: "ok", percent: 50, resetsAt: weeklyReset },
          monthly: { status: "ok", percent: 10, resetsAt: monthlyReset },
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = (await getUsageForProvider({
      id: connectionId,
      provider: "opencode-go",
      apiKey: "opencode-go-key",
    })) as ProviderUsage;

    assert.equal(requestUrl, "https://opencode.ai/zen/go/v1/usage");
    assert.equal(authorization, "Bearer opencode-go-key");
    assert.equal(result.plan, "OpenCode Go");
    assert.equal(result.limitReached, false);
    assert.deepEqual(Object.keys(result.quotas ?? {}), ["session", "weekly", "mcp_monthly"]);

    assert.deepEqual(result.quotas?.session, {
      used: 3,
      total: 12,
      remaining: 9,
      remainingPercentage: 75,
      resetAt: rollingReset,
      unlimited: false,
      displayName: "$12 / 5-hour",
      currency: "USD",
    });
    assert.deepEqual(result.quotas?.weekly, {
      used: 15,
      total: 30,
      remaining: 15,
      remainingPercentage: 50,
      resetAt: weeklyReset,
      unlimited: false,
      displayName: "$30 / week",
      currency: "USD",
    });
    assert.deepEqual(result.quotas?.mcp_monthly, {
      used: 6,
      total: 60,
      remaining: 54,
      remainingPercentage: 90,
      resetAt: monthlyReset,
      unlimited: false,
      displayName: "$60 / month",
      currency: "USD",
    });
  } finally {
    invalidateOpencodeQuotaCache(connectionId);
  }
});

test("getUsageForProvider shows zero remaining for a rate-limited OpenCode Go window", async () => {
  const connectionId = `opencode-go-rate-limited-${Date.now()}`;
  const rollingReset = "2026-09-01T01:02:03.000Z";
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        usage: {
          rolling: { status: "rate-limited", percent: 5, resetsAt: rollingReset },
          weekly: {
            status: "ok",
            percent: 90,
            resetsAt: "2026-09-05T04:05:06.000Z",
          },
          monthly: {
            status: "ok",
            percent: 20,
            resetsAt: "2026-09-30T07:08:09.000Z",
          },
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  try {
    const result = (await getUsageForProvider({
      id: connectionId,
      provider: "opencode-go",
      apiKey: "opencode-go-key",
    })) as ProviderUsage;

    assert.equal(result.limitReached, true);
    assert.equal(result.quotas?.session.used, 12);
    assert.equal(result.quotas?.session.remaining, 0);
    assert.equal(result.quotas?.session.remainingPercentage, 0);
    assert.equal(result.quotas?.session.resetAt, rollingReset);
    assert.ok(Math.abs((result.quotas?.weekly.remainingPercentage ?? Number.NaN) - 10) < 1e-9);
  } finally {
    invalidateOpencodeQuotaCache(connectionId);
  }
});

test("getUsageForProvider reports unavailable quota when the official request fails open", async () => {
  const connectionId = `opencode-go-fail-open-${Date.now()}`;
  globalThis.fetch = async () => new Response("unavailable", { status: 503 });

  try {
    const result = (await getUsageForProvider({
      id: connectionId,
      provider: "opencode-go",
      apiKey: "opencode-go-key",
    })) as ProviderUsage;

    assert.equal(result.plan, undefined);
    assert.match(result.message ?? "", /Unable to fetch quota data/i);
  } finally {
    invalidateOpencodeQuotaCache(connectionId);
  }
});
