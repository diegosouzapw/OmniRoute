import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cache-metrics-cache-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-cache-metrics-cache-secret";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const core = await import("../../src/lib/db/core.ts");
const cache = await import("../../src/lib/usage/analyticsResponseCache.ts");
const route = await import("../../src/app/api/cache/route.ts");

function localRequest(url: string, method = "GET"): Request {
  return new Request(url, { method });
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function insertUsageRow(db: {
  prepare: (sql: string) => { run: (...args: unknown[]) => void };
}): void {
  db.prepare(
    `INSERT INTO usage_history
       (provider, model, connection_id, api_key_id, api_key_name,
        tokens_input, tokens_output, tokens_cache_read, tokens_cache_creation,
        tokens_reasoning, status, success, latency_ms, ttft_ms, error_code, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    "test-provider",
    "test-model",
    "conn-1",
    "key-1",
    "k",
    1000,
    100,
    900,
    0,
    0,
    "ok",
    1,
    123,
    45,
    null,
    new Date(Date.now() - 3_600_000).toISOString()
  );
}

test.before(async () => {
  core.resetDbInstance();
});

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  cache.clearAnalyticsResponseCache();
  process.env.OMNIROUTE_ANALYTICS_CACHE_TTL_MS = "60000";
  process.env.OMNIROUTE_CACHE_METRICS_MIN_COMPUTE_MS = "0";
});

test.after(() => {
  delete process.env.OMNIROUTE_ANALYTICS_CACHE_TTL_MS;
  delete process.env.OMNIROUTE_CACHE_METRICS_MIN_COMPUTE_MS;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.DATA_DIR;
  delete process.env.API_KEY_SECRET;
});

test("per-call options win over the shared threshold", async () => {
  process.env.OMNIROUTE_CACHE_METRICS_MIN_COMPUTE_MS = "60000";
  assert.equal(cache.getCacheMetricsMinComputeMs(), 60_000);
  let calls = 0;
  const compute = async () => jsonResponse({ n: ++calls });

  await cache.serveAnalyticsCached("cache-metrics?trendHours=24", compute, { minComputeMs: 0 });
  const second = await cache.serveAnalyticsCached("cache-metrics?trendHours=24", compute, {
    minComputeMs: 0,
  });
  assert.equal(second.headers.get("x-analytics-cache"), "hit");
  assert.equal(calls, 1);
});

test("prefix invalidation drops entries and in-flight work of the prefix only", async () => {
  process.env.OMNIROUTE_ANALYTICS_CACHE_TTL_MS = "60000";
  let calls = 0;
  const compute = async () => jsonResponse({ n: ++calls });
  await cache.serveAnalyticsCached("cache-metrics?trendHours=24", compute, { minComputeMs: 0 });
  await cache.serveAnalyticsCached("?range=30d", compute, { minComputeMs: 0 });
  assert.equal(calls, 2);

  cache.invalidateAnalyticsCachePrefix("cache-metrics?");

  const again = await cache.serveAnalyticsCached("?range=30d", compute, { minComputeMs: 0 });
  assert.equal(again.headers.get("x-analytics-cache"), "hit");
  const recalculated = await cache.serveAnalyticsCached("cache-metrics?trendHours=24", compute, {
    minComputeMs: 0,
  });
  assert.equal(recalculated.headers.get("x-analytics-cache"), "miss");
  assert.equal(calls, 3);
});

test("prefix invalidation cancels in-flight work of the prefix only", async () => {
  let calls = 0;
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const compute = async () => {
    calls += 1;
    await gate;
    return jsonResponse({ n: calls });
  };

  const pending = cache.serveAnalyticsCached("cache-metrics?trendHours=48", compute, {
    minComputeMs: 0,
  });
  await Promise.resolve();
  await Promise.resolve();
  cache.invalidateAnalyticsCachePrefix("cache-metrics?");
  release();
  const cancelled = await pending;
  assert.equal(cancelled.headers.get("x-analytics-cache"), "miss");
  assert.equal(calls, 1);

  const after = await cache.serveAnalyticsCached("cache-metrics?trendHours=48", compute, {
    minComputeMs: 0,
  });
  assert.equal(after.headers.get("x-analytics-cache"), "miss");
  assert.equal(calls, 2);
});

test("stored entries stay bounded and prefix invalidation frees them", async () => {
  process.env.OMNIROUTE_ANALYTICS_CACHE_TTL_MS = "60000";
  let calls = 0;
  const compute = async () => jsonResponse({ n: ++calls });

  for (let trendHours = 1; trendHours <= 40; trendHours += 1) {
    await cache.serveAnalyticsCached(`cache-metrics?trendHours=${trendHours}`, compute, {
      minComputeMs: 0,
    });
  }
  const repeat = await cache.serveAnalyticsCached("cache-metrics?trendHours=7", compute, {
    minComputeMs: 0,
  });
  if (repeat.headers.get("x-analytics-cache") === "hit") {
    assert.equal(calls, 40);
  } else {
    assert.equal(calls, 41);
  }

  cache.invalidateAnalyticsCachePrefix("cache-metrics?");
  const recalculated = await cache.serveAnalyticsCached("cache-metrics?trendHours=7", compute, {
    minComputeMs: 0,
  });
  assert.equal(recalculated.headers.get("x-analytics-cache"), "miss");
});

test("two close calls share one history computation", async () => {
  insertUsageRow(core.getDbInstance());

  const first = await route.GET(localRequest("http://localhost/api/cache"));
  assert.equal(first.status, 200);
  assert.equal(first.headers.get("x-analytics-cache"), "miss");
  const firstBody = (await first.json()) as { promptCache: { totalRequests: number } };

  insertUsageRow(core.getDbInstance());
  const second = await route.GET(localRequest("http://localhost/api/cache"));
  assert.equal(second.status, 200);
  assert.equal(second.headers.get("x-analytics-cache"), "hit");
  const secondBody = (await second.json()) as { promptCache: { totalRequests: number } };
  assert.equal(secondBody.promptCache.totalRequests, firstBody.promptCache.totalRequests);
});

test("fresh counters stay live while history is served from the cache", async () => {
  insertUsageRow(core.getDbInstance());
  const semantic = await import("../../src/lib/semanticCache.ts");
  semantic.setCachedResponse("fresh-counters-signature", "test-model", { ok: true }, 0);

  const first = await route.GET(localRequest("http://localhost/api/cache"));
  assert.equal(first.status, 200);
  const firstBody = (await first.json()) as {
    promptCache: { totalRequests: number };
    semanticCache: { memoryEntries: number };
  };
  assert.equal(firstBody.semanticCache.memoryEntries, 1);

  semantic.clearMemoryCache();
  insertUsageRow(core.getDbInstance());

  const second = await route.GET(localRequest("http://localhost/api/cache"));
  assert.equal(second.status, 200);
  assert.equal(second.headers.get("x-analytics-cache"), "hit");
  const secondBody = (await second.json()) as {
    promptCache: { totalRequests: number };
    semanticCache: { memoryEntries: number };
  };
  assert.equal(secondBody.promptCache.totalRequests, firstBody.promptCache.totalRequests);
  assert.equal(secondBody.semanticCache.memoryEntries, 0);
});

test("a different trend window computes separately", async () => {
  insertUsageRow(core.getDbInstance());

  const first = await route.GET(localRequest("http://localhost/api/cache?trendHours=24"));
  assert.equal(first.headers.get("x-analytics-cache"), "miss");

  const other = await route.GET(localRequest("http://localhost/api/cache?trendHours=48"));
  assert.equal(other.headers.get("x-analytics-cache"), "miss");

  const repeat = await route.GET(localRequest("http://localhost/api/cache?trendHours=24"));
  assert.equal(repeat.headers.get("x-analytics-cache"), "hit");
});

test("equivalent windows after clamping share one entry", async () => {
  insertUsageRow(core.getDbInstance());

  const cases = [
    "http://localhost/api/cache",
    "http://localhost/api/cache?trendHours=24",
    "http://localhost/api/cache?trendHours=abc",
  ];
  const first = await route.GET(localRequest(cases[0]));
  assert.equal(first.headers.get("x-analytics-cache"), "miss");
  for (const url of cases.slice(1)) {
    const repeat = await route.GET(localRequest(url));
    assert.equal(repeat.headers.get("x-analytics-cache"), "hit");
  }

  const clamped = await route.GET(localRequest("http://localhost/api/cache?trendHours=720"));
  assert.equal(clamped.headers.get("x-analytics-cache"), "miss");
  const clampedRepeat = await route.GET(
    localRequest("http://localhost/api/cache?trendHours=99999")
  );
  assert.equal(clampedRepeat.headers.get("x-analytics-cache"), "hit");

  const parasite = await route.GET(localRequest("http://localhost/api/cache?trendHours=24&x=1"));
  assert.equal(parasite.headers.get("x-analytics-cache"), "hit");
});

test("a DELETE invalidates the history entry", async () => {
  insertUsageRow(core.getDbInstance());

  const first = await route.GET(localRequest("http://localhost/api/cache"));
  assert.equal(first.headers.get("x-analytics-cache"), "miss");
  const firstBody = (await first.json()) as { promptCache: { totalRequests: number } };

  const deleted = await route.DELETE(localRequest("http://localhost/api/cache", "DELETE"));
  assert.equal(deleted.status, 200);

  insertUsageRow(core.getDbInstance());
  const second = await route.GET(localRequest("http://localhost/api/cache"));
  assert.equal(second.headers.get("x-analytics-cache"), "miss");
  const secondBody = (await second.json()) as { promptCache: { totalRequests: number } };
  assert.equal(secondBody.promptCache.totalRequests, firstBody.promptCache.totalRequests + 1);
});

test("a request without rights is refused before any cache read", async () => {
  insertUsageRow(core.getDbInstance());
  const settingsDb = await import("../../src/lib/db/settings.ts");
  const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
  process.env.JWT_SECRET = "test-jwt-secret-cache-metrics";
  process.env.INITIAL_PASSWORD = "initial-pass";
  await settingsDb.updateSettings({ requireLogin: true });

  try {
    const outsider = await apiKeysDb.createApiKey("chat-only", "machine-chat", ["chat"]);
    const refused = await route.GET(
      new Request("http://localhost/api/cache", {
        headers: { authorization: `Bearer ${outsider.key}` },
      })
    );
    assert.equal(refused.status, 401);
    assert.equal(refused.headers.get("x-analytics-cache"), null);

    const reader = await apiKeysDb.createApiKey("cache-reader", "machine-reader", ["read:cache"]);
    const next = await route.GET(
      new Request("http://localhost/api/cache", {
        headers: { authorization: `Bearer ${reader.key}` },
      })
    );
    assert.equal(next.status, 200);
    assert.equal(next.headers.get("x-analytics-cache"), "miss");
  } finally {
    await settingsDb.updateSettings({ requireLogin: false });
    delete process.env.JWT_SECRET;
    delete process.env.INITIAL_PASSWORD;
  }
});
