import test from "node:test";
import assert from "node:assert/strict";

import {
  extractFirecrawlApiKey,
  fetchFirecrawlQuota,
  invalidateFirecrawlQuotaCache,
  parseFirecrawlCreditUsage,
  registerFirecrawlQuotaFetcher,
} from "../../open-sse/services/firecrawlQuotaFetcher.ts";
import { preflightQuota } from "../../open-sse/services/quotaPreflight.ts";
import { clearQuotaMonitors } from "../../open-sse/services/quotaMonitor.ts";
import { clearSessions } from "../../open-sse/services/sessionManager.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  clearQuotaMonitors();
  clearSessions();
});

function creditUsageResponse(remaining: number, plan: number, endIso?: string) {
  return new Response(
    JSON.stringify({
      success: true,
      data: {
        remainingCredits: remaining,
        planCredits: plan,
        billingPeriodStart: "2026-07-01T00:00:00Z",
        billingPeriodEnd: endIso || "2026-07-31T23:59:59Z",
      },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

test("extractFirecrawlApiKey reads root and credentials shapes", () => {
  assert.equal(extractFirecrawlApiKey(undefined), null);
  assert.equal(extractFirecrawlApiKey({}), null);
  assert.equal(extractFirecrawlApiKey({ apiKey: "  fc-key  " }), "fc-key");
  assert.equal(extractFirecrawlApiKey({ credentials: { apiKey: "nested-key" } }), "nested-key");
});

test("parseFirecrawlCreditUsage maps remaining/plan to percent used", () => {
  const q = parseFirecrawlCreditUsage({
    success: true,
    data: {
      remainingCredits: 250,
      planCredits: 1000,
      billingPeriodEnd: "2026-08-01T00:00:00Z",
    },
  });
  assert.ok(q);
  assert.equal(q!.used, 750);
  assert.equal(q!.total, 1000);
  assert.equal(q!.percentUsed, 0.75);
  assert.equal(q!.remainingCredits, 250);
  assert.equal(q!.limitReached, false);
  assert.equal(q!.resetAt, "2026-08-01T00:00:00Z");
});

test("parseFirecrawlCreditUsage preserves the plan baseline when credits are over plan", () => {
  const q = parseFirecrawlCreditUsage({
    data: { remainingCredits: 1500, planCredits: 1000 },
  });
  assert.ok(q);
  assert.equal(q!.used, 0);
  assert.equal(q!.total, 1000);
  assert.equal(q!.percentUsed, 0);
  assert.equal(q!.remainingCredits, 1500);
  assert.equal(q!.extraCreditsInferred, 500);
  assert.equal(q!.overPlan, true);
  assert.equal(q!.limitReached, false);
});

test("parseFirecrawlCreditUsage marks exhausted when remaining is 0", () => {
  const q = parseFirecrawlCreditUsage({
    data: { remainingCredits: 0, planCredits: 1000 },
  });
  assert.ok(q);
  assert.equal(q!.percentUsed, 1);
  assert.equal(q!.limitReached, true);
});

test("fetchFirecrawlQuota returns null when no API key", async () => {
  const connectionId = `fc-missing-${Date.now()}`;
  const quota = await fetchFirecrawlQuota(connectionId, {});
  assert.equal(quota, null);
  invalidateFirecrawlQuotaCache(connectionId);
});

test("fetchFirecrawlQuota calls credit-usage with Bearer and maps credits", async () => {
  const connectionId = `fc-live-${Date.now()}`;
  const calls: Array<{ url: string; init?: RequestInit }> = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return creditUsageResponse(700, 1000);
  };

  const quota = await fetchFirecrawlQuota(connectionId, { apiKey: "fc-test-key" });
  assert.ok(quota);
  assert.equal(quota!.used, 300);
  assert.equal(quota!.total, 1000);
  assert.equal(quota!.percentUsed, 0.3);
  assert.ok(quota!.resetAt?.includes("2026-07-31"));

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.firecrawl.dev/v2/team/credit-usage");
  const headers = calls[0].init?.headers as Record<string, string>;
  assert.equal(headers.Authorization, "Bearer fc-test-key");

  invalidateFirecrawlQuotaCache(connectionId);
});

test("fetchFirecrawlQuota fail-opens on 401", async () => {
  const connectionId = `fc-401-${Date.now()}`;
  globalThis.fetch = async () => new Response("Unauthorized", { status: 401 });
  const quota = await fetchFirecrawlQuota(connectionId, { apiKey: "dead" });
  assert.equal(quota, null);
  invalidateFirecrawlQuotaCache(connectionId);
});

test("fetchFirecrawlQuota caches results for 60s", async () => {
  const connectionId = `fc-cache-${Date.now()}`;
  let fetchCount = 0;
  globalThis.fetch = async () => {
    fetchCount += 1;
    return creditUsageResponse(500, 1000);
  };

  const q1 = await fetchFirecrawlQuota(connectionId, { apiKey: "tok" });
  const q2 = await fetchFirecrawlQuota(connectionId, { apiKey: "tok" });
  assert.equal(fetchCount, 1);
  assert.equal(q1!.percentUsed, q2!.percentUsed);
  assert.equal(q1!.percentUsed, 0.5);

  invalidateFirecrawlQuotaCache(connectionId);
});

test("registerFirecrawlQuotaFetcher registers firecrawl for preflight", async () => {
  registerFirecrawlQuotaFetcher();
  globalThis.fetch = async () => creditUsageResponse(900, 1000);

  const connectionId = `fc-reg-${Date.now()}`;
  const result = await preflightQuota("firecrawl", connectionId, {
    provider: "firecrawl",
    id: connectionId,
    apiKey: "tok",
  });
  assert.equal(result.proceed, true);

  invalidateFirecrawlQuotaCache(connectionId);
});

test("fetchFirecrawlQuota bypasses cloud fetch when FIRECRAWL_BASE_URL is set", async () => {
  const originalEnv = process.env.FIRECRAWL_BASE_URL;
  try {
    process.env.FIRECRAWL_BASE_URL = "http://localhost:3002/";
    const connectionId = `fc-selfhosted-${Date.now()}`;
    let fetchCalled = false;
    globalThis.fetch = async () => {
      fetchCalled = true;
      return creditUsageResponse(100, 1000);
    };

    const quota = await fetchFirecrawlQuota(connectionId, { apiKey: "local-key" });
    assert.ok(quota);
    assert.equal(quota!.used, 0);
    assert.equal(quota!.total, 0);
    assert.equal(fetchCalled, false);
    invalidateFirecrawlQuotaCache(connectionId);
  } finally {
    process.env.FIRECRAWL_BASE_URL = originalEnv;
  }
});
