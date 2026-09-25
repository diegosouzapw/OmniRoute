import test from "node:test";
import assert from "node:assert/strict";

import {
  extractTavilyToken,
  fetchTavilyQuota,
  invalidateTavilyQuotaCache,
  parseTavilyCreditUsage,
  registerTavilyQuotaFetcher,
} from "../../open-sse/services/tavilyQuotaFetcher.ts";
import { preflightQuota } from "../../open-sse/services/quotaPreflight.ts";
import { clearQuotaMonitors } from "../../open-sse/services/quotaMonitor.ts";
import { clearSessions } from "../../open-sse/services/sessionManager.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  clearQuotaMonitors();
  clearSessions();
});

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

const KEY_FIELD = "apiKey";

test("extractTavilyToken reads root and credentials shapes", () => {
  assert.equal(extractTavilyToken(undefined), null);
  assert.equal(extractTavilyToken({}), null);
  assert.equal(extractTavilyToken({ [KEY_FIELD]: "sample-val" }), "sample-val");
  assert.equal(extractTavilyToken({ credentials: { [KEY_FIELD]: "nested-val" } }), "nested-val");
});

test("parseTavilyCreditUsage maps usage and limit to percent used", () => {
  const q = parseTavilyCreditUsage({
    key: { usage: 10, limit: null },
    account: {
      current_plan: "Researcher",
      plan_usage: 10,
      plan_limit: 1000,
      paygo_usage: 0,
      paygo_limit: null,
    },
  });
  assert.ok(q);
  assert.equal(q!.used, 10);
  assert.equal(q!.total, 1000);
  assert.equal(q!.remainingCredits, 990);
  assert.equal(q!.percentUsed, 0.01);
  assert.equal(q!.limitReached, false);
  assert.equal(q!.planName, "Researcher");
});

test("parseTavilyCreditUsage respects key-level limit when set", () => {
  const q = parseTavilyCreditUsage({
    key: { usage: 50, limit: 100 },
    account: {
      current_plan: "Researcher",
      plan_usage: 200,
      plan_limit: 1000,
    },
  });
  assert.ok(q);
  assert.equal(q!.used, 50);
  assert.equal(q!.total, 100);
  assert.equal(q!.remainingCredits, 50);
  assert.equal(q!.percentUsed, 0.5);
  assert.equal(q!.limitReached, false);
});

test("parseTavilyCreditUsage marks limitReached when remaining is 0", () => {
  const q = parseTavilyCreditUsage({
    key: { usage: 1000, limit: null },
    account: {
      current_plan: "Free",
      plan_usage: 1000,
      plan_limit: 1000,
    },
  });
  assert.ok(q);
  assert.equal(q!.remainingCredits, 0);
  assert.equal(q!.percentUsed, 1);
  assert.equal(q!.limitReached, true);
});

test("parseTavilyCreditUsage calculates paygo credits and detects overPlan", () => {
  const q = parseTavilyCreditUsage({
    key: { usage: 0, limit: null },
    account: {
      current_plan: "Researcher",
      plan_usage: 100,
      plan_limit: 1000,
      paygo_usage: 0,
      paygo_limit: 500,
    },
  });
  assert.ok(q);
  assert.equal(q!.used, 100);
  assert.equal(q!.total, 1500);
  assert.equal(q!.planCredits, 1000);
  assert.equal(q!.remainingCredits, 1400);
  assert.equal(q!.extraCreditsInferred, 400);
  assert.equal(q!.overPlan, true);
  assert.equal(q!.limitReached, false);
});

test("parseTavilyCreditUsage handles paygoUsage when paygoLimit is null", () => {
  const q = parseTavilyCreditUsage({
    key: { usage: 0, limit: null },
    account: {
      current_plan: "Researcher",
      plan_usage: 1000,
      plan_limit: 1000,
      paygo_usage: 200,
      paygo_limit: null,
    },
  });
  assert.ok(q);
  assert.equal(q!.used, 1200);
  assert.equal(q!.total, 1200);
  assert.equal(q!.planCredits, 1000);
  assert.equal(q!.remainingCredits, 0);
  assert.equal(q!.limitReached, true);
});

test("parseTavilyCreditUsage percentUsed is 0 when totalCredits is 0", () => {
  const q = parseTavilyCreditUsage({
    key: { usage: 0, limit: null },
    account: {
      current_plan: "Free",
      plan_usage: 0,
      plan_limit: 0,
    },
  });
  assert.ok(q);
  assert.equal(q!.percentUsed, 0);
  assert.equal(q!.remainingCredits, 0);
  assert.equal(q!.limitReached, true);
});

test("fetchTavilyQuota returns null when no API key", async () => {
  const connectionId = `tvly-missing-${Date.now()}`;
  const quota = await fetchTavilyQuota(connectionId, {});
  assert.equal(quota, null);
  invalidateTavilyQuotaCache(connectionId);
});

test("fetchTavilyQuota calls /usage with Bearer and maps credits", async () => {
  const connectionId = `tvly-live-${Date.now()}`;
  const calls: Array<{ url: string; init?: RequestInit }> = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return tavilyUsageResponse(250, 1000);
  };

  const quota = await fetchTavilyQuota(connectionId, { [KEY_FIELD]: "mock-token" });
  assert.ok(quota);
  assert.equal(quota!.used, 250);
  assert.equal(quota!.total, 1000);
  assert.equal(quota!.remainingCredits, 750);
  assert.equal(quota!.percentUsed, 0.25);
  assert.equal(quota!.limitReached, false);

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.tavily.com/usage");
  const headers = calls[0].init?.headers as Record<string, string>;
  assert.equal(headers.Authorization, "Bearer mock-token");

  invalidateTavilyQuotaCache(connectionId);
});

test("fetchTavilyQuota fail-opens on 401", async () => {
  const connectionId = `tvly-401-${Date.now()}`;
  globalThis.fetch = async () => new Response("Unauthorized", { status: 401 });
  const quota = await fetchTavilyQuota(connectionId, { [KEY_FIELD]: "mock-token" });
  assert.equal(quota, null);
  invalidateTavilyQuotaCache(connectionId);
});

test("fetchTavilyQuota caches null on 500 responses to prevent storming", async () => {
  const connectionId = `tvly-500-${Date.now()}`;
  let fetchCount = 0;
  globalThis.fetch = async () => {
    fetchCount++;
    return new Response("Internal Server Error", { status: 500 });
  };
  const q1 = await fetchTavilyQuota(connectionId, { [KEY_FIELD]: "mock-token" });
  const q2 = await fetchTavilyQuota(connectionId, { [KEY_FIELD]: "mock-token" });
  assert.equal(fetchCount, 1);
  assert.equal(q1, null);
  assert.equal(q2, null);
  invalidateTavilyQuotaCache(connectionId);
});

test("fetchTavilyQuota caches results for 60s", async () => {
  const connectionId = `tvly-cached-${Date.now()}`;
  let fetchCount = 0;
  globalThis.fetch = async () => {
    fetchCount++;
    return tavilyUsageResponse(10, 1000);
  };

  const q1 = await fetchTavilyQuota(connectionId, { [KEY_FIELD]: "mock-token" });
  const q2 = await fetchTavilyQuota(connectionId, { [KEY_FIELD]: "mock-token" });
  assert.equal(fetchCount, 1);
  assert.deepEqual(q1, q2);

  invalidateTavilyQuotaCache(connectionId);
});

test("registerTavilyQuotaFetcher registers tavily and tavily-search for preflight", async () => {
  registerTavilyQuotaFetcher();

  globalThis.fetch = async () => tavilyUsageResponse(1000, 1000);

  const conn1 = `tvly-search-${Date.now()}`;
  const resSearch = await preflightQuota("tavily-search", conn1, {
    id: conn1,
    provider: "tavily-search",
    [KEY_FIELD]: "mock-token",
  });
  assert.equal(resSearch.proceed, false);

  const conn2 = `tvly-alias-${Date.now()}`;
  const resAlias = await preflightQuota("tavily", conn2, {
    id: conn2,
    provider: "tavily",
    [KEY_FIELD]: "mock-token",
  });
  assert.equal(resAlias.proceed, false);

  invalidateTavilyQuotaCache(conn1);
  invalidateTavilyQuotaCache(conn2);
});
