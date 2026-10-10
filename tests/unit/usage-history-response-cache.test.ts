import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-history-cache-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-history-cache-secret";

const cache = await import("../../src/lib/usage/analyticsResponseCache.ts");
const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const historyRoute = await import("../../src/app/api/usage/history/route.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

const HISTORY_URL = "http://localhost/api/usage/history";

async function requireAuth() {
  process.env.INITIAL_PASSWORD = "test-pass";
  await settingsDb.updateSettings({ requireLogin: true, password: "" });
}

function authedRequest(bearerKey: string): Request {
  return new Request(HISTORY_URL, { headers: { authorization: `Bearer ${bearerKey}` } });
}

function setEnv(ttlMs: string | undefined, minComputeMs: string | undefined) {
  if (ttlMs === undefined) delete process.env.OMNIROUTE_ANALYTICS_CACHE_TTL_MS;
  else process.env.OMNIROUTE_ANALYTICS_CACHE_TTL_MS = ttlMs;
  if (minComputeMs === undefined) delete process.env.OMNIROUTE_ANALYTICS_CACHE_MIN_COMPUTE_MS;
  else process.env.OMNIROUTE_ANALYTICS_CACHE_MIN_COMPUTE_MS = minComputeMs;
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function seedRow(model: string, timestamp: string) {
  await usageHistory.saveRequestUsage({
    provider: "openai",
    model,
    tokens: { input: 100, output: 50 },
    timestamp,
  });
}

test.beforeEach(async () => {
  cache.clearAnalyticsResponseCache();
  usageHistory.clearPendingRequests();
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  setEnv(undefined, undefined);
  await settingsDb.updateSettings({ requireLogin: false });
  delete process.env.INITIAL_PASSWORD;
});

test.after(() => {
  setEnv(undefined, undefined);
  delete process.env.INITIAL_PASSWORD;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("two close calls share one computation", async () => {
  setEnv("60000", "0");
  await seedRow("gpt-4o-mini", "2026-01-02T00:00:00.000Z");

  const first = await historyRoute.GET(new Request(HISTORY_URL));
  assert.equal(first.status, 200);
  assert.equal(first.headers.get("x-analytics-cache"), "miss");
  assert.match(first.headers.get("content-type") || "", /application\/json/);
  assert.equal(first.headers.get("cache-control"), "private, no-store");
  const firstBody = (await first.json()) as { totalRequests: number };

  await seedRow("gpt-4o-mini", "2026-01-03T00:00:00.000Z");

  const second = await historyRoute.GET(new Request(HISTORY_URL));
  assert.equal(second.headers.get("x-analytics-cache"), "hit");
  assert.match(second.headers.get("content-type") || "", /application\/json/);
  assert.equal(second.headers.get("cache-control"), "private, no-store");
  const secondBody = (await second.json()) as { totalRequests: number };
  assert.equal(secondBody.totalRequests, firstBody.totalRequests);
});

test("concurrent calls share one computation and both answer", async () => {
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
  cache.clearAnalyticsResponseCache();
  const pending = [1, 2].map(() => cache.serveAnalyticsCached("history", compute));
  release();
  const [first, second] = await Promise.all(pending);
  assert.equal(calls, 1);
  assert.equal(first.status, 200);
  assert.equal(second.status, 200);
  assert.deepEqual(await first.json(), { n: 1 });
  assert.deepEqual(await second.json(), { n: 1 });

  await seedRow("gpt-4o-mini", "2026-02-02T00:00:00.000Z");
  cache.clearAnalyticsResponseCache();
  const [routeFirst, routeSecond] = await Promise.all([
    historyRoute.GET(new Request(HISTORY_URL)),
    historyRoute.GET(new Request(HISTORY_URL)),
  ]);
  assert.equal(routeFirst.status, 200);
  assert.equal(routeSecond.status, 200);
  const firstBody = (await routeFirst.json()) as { totalRequests: number };
  const secondBody = (await routeSecond.json()) as { totalRequests: number };
  assert.equal(secondBody.totalRequests, firstBody.totalRequests);
});

test("disabled cache computes on every call like today", async () => {
  setEnv("0", "0");
  await seedRow("gpt-4o-mini", "2026-03-02T00:00:00.000Z");

  const first = await historyRoute.GET(new Request(HISTORY_URL));
  assert.equal(first.headers.get("x-analytics-cache"), null);
  const firstBody = (await first.json()) as { totalRequests: number };

  await seedRow("gpt-4o-mini", "2026-03-03T00:00:00.000Z");

  const second = await historyRoute.GET(new Request(HISTORY_URL));
  assert.equal(second.headers.get("x-analytics-cache"), null);
  const secondBody = (await second.json()) as { totalRequests: number };
  assert.equal(secondBody.totalRequests, firstBody.totalRequests + 1);
});

test("unauthenticated call is refused before any cache read", async () => {
  await requireAuth();
  setEnv("60000", "0");
  const adminKey = await apiKeysDb.createApiKey("history-admin", "machine-history", ["manage"]);
  await seedRow("gpt-4o-mini", "2026-04-02T00:00:00.000Z");

  const filled = await historyRoute.GET(authedRequest(adminKey.key));
  assert.equal(filled.status, 200);
  assert.equal(filled.headers.get("x-analytics-cache"), "miss");
  const filledText = await filled.text();
  const filledBody = JSON.parse(filledText) as { totalRequests: number };

  await seedRow("gpt-4o-mini", "2026-04-03T00:00:00.000Z");

  const refused = await historyRoute.GET(new Request(HISTORY_URL));
  assert.equal(refused.status, 401);
  assert.equal(refused.headers.get("x-analytics-cache"), null);
  const refusedText = await refused.text();
  assert.notEqual(refusedText, filledText);

  const served = await historyRoute.GET(authedRequest(adminKey.key));
  assert.equal(served.headers.get("x-analytics-cache"), "hit");
  const servedBody = (await served.json()) as { totalRequests: number };
  assert.equal(servedBody.totalRequests, filledBody.totalRequests);

  delete process.env.INITIAL_PASSWORD;
});

test("in-flight requests stay fresh on a cache hit", async () => {
  setEnv("60000", "0");
  await seedRow("gpt-4o-mini", "2026-05-02T00:00:00.000Z");

  const first = await historyRoute.GET(new Request(HISTORY_URL));
  assert.equal(first.headers.get("x-analytics-cache"), "miss");
  const firstBody = (await first.json()) as { totalRequests: number };

  const pendingId = usageHistory.trackPendingRequest(
    "fresh-model",
    "fresh-provider",
    "conn-fresh",
    true
  );
  try {
    const second = await historyRoute.GET(new Request(HISTORY_URL));
    assert.equal(second.headers.get("x-analytics-cache"), "hit");
    const secondBody = (await second.json()) as {
      totalRequests: number;
      pending: { byModel: Record<string, number> };
      activeRequests: Array<{ model: string; provider: string; count: number }>;
    };
    assert.equal(secondBody.totalRequests, firstBody.totalRequests);
    assert.equal(secondBody.pending.byModel["fresh-model (fresh-provider)"], 1);
    assert.ok(
      secondBody.activeRequests.some(
        (entry) => entry.model === "fresh-model" && entry.provider === "fresh-provider"
      )
    );
  } finally {
    if (typeof pendingId === "string") {
      const { finalizePendingRequestById } = usageHistory;
      finalizePendingRequestById(pendingId, {});
    }
    usageHistory.clearPendingRequests();
  }
});

test("named connection keeps its name on a cache miss", async () => {
  setEnv("60000", "0");
  const connection = await providersDb.createProviderConnection({
    provider: "named-provider",
    authType: "apikey",
    name: "Miss Display Name",
    apiKey: "sk-test-miss",
  });
  const connectionId = (connection as { id: string }).id;

  const pendingId = usageHistory.trackPendingRequest(
    "miss-model",
    "named-provider",
    connectionId,
    true
  );
  try {
    const missed = await historyRoute.GET(new Request(HISTORY_URL));
    assert.equal(missed.headers.get("x-analytics-cache"), "miss");
    const missedBody = (await missed.json()) as {
      pending: { byModel: Record<string, number> };
      activeRequests: Array<{ model: string; provider: string; account: string; count: number }>;
    };
    assert.equal(missedBody.pending.byModel["miss-model (named-provider)"], 1);
    const served = missedBody.activeRequests.find(
      (entry) => entry.model === "miss-model" && entry.provider === "named-provider"
    );
    assert.ok(served);
    assert.equal(served.account, "Miss Display Name");
  } finally {
    if (typeof pendingId === "string") {
      usageHistory.finalizePendingRequestById(pendingId, {});
    }
    usageHistory.clearPendingRequests();
  }
});

test("oldest entry is evicted when the shared cache is full", async () => {
  setEnv("60000", "0");
  const callsByKey = new Map<string, number>();
  const computeFor = (key: string) => async () => {
    callsByKey.set(key, (callsByKey.get(key) ?? 0) + 1);
    return jsonResponse({ key, n: callsByKey.get(key) });
  };

  for (let i = 0; i < 32; i += 1) {
    await cache.serveAnalyticsCached(`?range=evict-${i}`, computeFor(`?range=evict-${i}`));
  }
  await cache.serveAnalyticsCached("history", computeFor("history"));

  const evicted = await cache.serveAnalyticsCached("?range=evict-0", computeFor("?range=evict-0"));
  assert.equal(evicted.headers.get("x-analytics-cache"), "miss");
  assert.equal(callsByKey.get("?range=evict-0"), 2);

  const kept = await cache.serveAnalyticsCached("?range=evict-31", computeFor("?range=evict-31"));
  assert.equal(kept.headers.get("x-analytics-cache"), "hit");
  assert.equal(callsByKey.get("?range=evict-31"), 1);
  assert.equal(callsByKey.get("history"), 1);
});
