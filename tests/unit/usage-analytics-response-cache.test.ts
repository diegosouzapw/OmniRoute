import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-analytics-cache-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-analytics-cache-secret";

const cache = await import("../../src/lib/usage/analyticsResponseCache.ts");
const core = await import("../../src/lib/db/core.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const analyticsRoute = await import("../../src/app/api/usage/analytics/route.ts");

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function setEnv(ttlMs: string | undefined, minComputeMs: string | undefined) {
  if (ttlMs === undefined) delete process.env.OMNIROUTE_ANALYTICS_CACHE_TTL_MS;
  else process.env.OMNIROUTE_ANALYTICS_CACHE_TTL_MS = ttlMs;
  if (minComputeMs === undefined) delete process.env.OMNIROUTE_ANALYTICS_CACHE_MIN_COMPUTE_MS;
  else process.env.OMNIROUTE_ANALYTICS_CACHE_MIN_COMPUTE_MS = minComputeMs;
}

test.beforeEach(() => {
  cache.clearAnalyticsResponseCache();
  setEnv(undefined, undefined);
});

test.after(() => {
  setEnv(undefined, undefined);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("defaults: 60 s TTL, only responses slower than 1 s are kept", () => {
  assert.equal(cache.getAnalyticsCacheTtlMs(), 60_000);
  assert.equal(cache.getAnalyticsCacheMinComputeMs(), 1_000);
  setEnv("abc", "-5");
  assert.equal(cache.getAnalyticsCacheTtlMs(), 60_000);
  assert.equal(cache.getAnalyticsCacheMinComputeMs(), 1_000);
});

test("a slow response is computed once and then served from the cache", async () => {
  setEnv("60000", "0");
  let calls = 0;
  const compute = async () => jsonResponse({ n: ++calls });

  const first = await cache.serveAnalyticsCached("?range=30d", compute);
  assert.equal(first.headers.get("x-analytics-cache"), "miss");
  assert.deepEqual(await first.json(), { n: 1 });

  const second = await cache.serveAnalyticsCached("?range=30d", compute);
  assert.equal(second.headers.get("x-analytics-cache"), "hit");
  assert.equal(second.status, 200);
  assert.deepEqual(await second.json(), { n: 1 });
  assert.equal(calls, 1);
});

test("each query string has its own entry", async () => {
  setEnv("60000", "0");
  let calls = 0;
  const compute = async () => jsonResponse({ n: ++calls });

  await cache.serveAnalyticsCached("?range=30d", compute);
  const other = await cache.serveAnalyticsCached("?range=7d", compute);
  assert.equal(other.headers.get("x-analytics-cache"), "miss");
  assert.equal(calls, 2);
});

test("fast responses are not cached", async () => {
  setEnv("60000", "60000");
  let calls = 0;
  const compute = async () => jsonResponse({ n: ++calls });

  await cache.serveAnalyticsCached("?range=30d", compute);
  const second = await cache.serveAnalyticsCached("?range=30d", compute);
  assert.equal(second.headers.get("x-analytics-cache"), "miss");
  assert.deepEqual(await second.json(), { n: 2 });
});

test("TTL 0 disables the cache and returns the computed response as is", async () => {
  setEnv("0", "0");
  let calls = 0;
  const compute = async () => jsonResponse({ n: ++calls });

  const first = await cache.serveAnalyticsCached("?range=30d", compute);
  assert.equal(first.headers.get("x-analytics-cache"), null);
  await cache.serveAnalyticsCached("?range=30d", compute);
  assert.equal(calls, 2);
});

test("error responses are passed through and never cached", async () => {
  setEnv("60000", "0");
  let calls = 0;
  const compute = async () => {
    calls += 1;
    return jsonResponse({ error: { message: "boom" } }, 500);
  };

  const first = await cache.serveAnalyticsCached("?range=30d", compute);
  assert.equal(first.status, 500);
  const second = await cache.serveAnalyticsCached("?range=30d", compute);
  assert.equal(second.status, 500);
  assert.equal(calls, 2);
});

test("concurrent identical requests share one computation", async () => {
  setEnv("60000", "0");
  let calls = 0;
  let release: () => void = () => {};
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const compute = async () => {
    calls += 1;
    await gate;
    return jsonResponse({ n: calls });
  };

  const pending = [1, 2, 3].map(() => cache.serveAnalyticsCached("?range=all", compute));
  release();
  const responses = await Promise.all(pending);
  assert.equal(calls, 1);
  for (const response of responses) {
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { n: 1 });
  }
});

test("a rejected computation is not cached and the next request retries", async () => {
  setEnv("60000", "0");
  let calls = 0;
  const compute = async () => {
    calls += 1;
    if (calls === 1) throw new Error("transient");
    return jsonResponse({ n: calls });
  };

  await assert.rejects(cache.serveAnalyticsCached("?range=30d", compute), /transient/);
  const retry = await cache.serveAnalyticsCached("?range=30d", compute);
  assert.deepEqual(await retry.json(), { n: 2 });
});

test("analytics route serves the cached payload for repeated identical requests", async () => {
  setEnv("60000", "0");
  core.resetDbInstance();
  usageHistory.clearPendingRequests();
  const url = "http://localhost/api/usage/analytics?startDate=2026-01-01T00:00:00.000Z";

  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o-mini",
    tokens: { input: 100, output: 50 },
    timestamp: "2026-01-02T00:00:00.000Z",
  });
  const first = await analyticsRoute.GET(new Request(url));
  assert.equal(first.status, 200);
  assert.equal(first.headers.get("x-analytics-cache"), "miss");
  const firstBody = (await first.json()) as { summary: { totalRequests: number } };

  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o-mini",
    tokens: { input: 100, output: 50 },
    timestamp: "2026-01-03T00:00:00.000Z",
  });
  const second = await analyticsRoute.GET(new Request(url));
  assert.equal(second.headers.get("x-analytics-cache"), "hit");
  const secondBody = (await second.json()) as { summary: { totalRequests: number } };
  assert.equal(secondBody.summary.totalRequests, firstBody.summary.totalRequests);

  cache.clearAnalyticsResponseCache();
  const fresh = await analyticsRoute.GET(new Request(url));
  const freshBody = (await fresh.json()) as { summary: { totalRequests: number } };
  assert.equal(freshBody.summary.totalRequests, firstBody.summary.totalRequests + 1);
});
