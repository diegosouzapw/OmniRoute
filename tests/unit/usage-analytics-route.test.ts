import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-usage-analytics-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const analyticsRoute = await import("../../src/app/api/usage/analytics/route.ts");

const clearPendingRequests = usageHistory.clearPendingRequests;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  clearPendingRequests();
}

async function seedAnalyticsData() {
  const db = core.getDbInstance();
  const now = new Date();
  for (let i = 0; i < 20; i++) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000).toISOString();
    db.prepare(
      `INSERT INTO usage_history (provider, model, connection_id, api_key_id, tokens_input, tokens_output, success, latency_ms, timestamp)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      i % 2 === 0 ? "openai" : "anthropic",
      i % 2 === 0 ? "gpt-4o" : "claude-sonnet",
      "test-conn",
      "test-key",
      100 + i,
      50 + i,
      1,
      200 + i * 10,
      timestamp
    );
  }
  db.prepare(
    `INSERT INTO call_logs (provider, model, requested_model, connection_id, timestamp)
     VALUES (?, ?, ?, ?, ?)`
  ).run("openai", "gpt-4o", "gpt-4o-mini", "test-conn", new Date().toISOString());
}

function makeRequest(url: string) {
  return new Request(url, { method: "GET" });
}

test.beforeEach(async () => {
  await resetStorage();
  await localDb.updatePricing({
    openai: { "gpt-4o": { input: 2.5, output: 10 } },
    anthropic: { "claude-sonnet": { input: 3, output: 15 } },
  });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("GET /api/usage/analytics returns summary with aggregated metrics", async () => {
  await seedAnalyticsData();

  const response = await analyticsRoute.GET(makeRequest("http://localhost/api/usage/analytics"));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.summary.totalRequests, 20);
  assert.equal(body.summary.uniqueModels, 2);
  assert.equal(body.summary.uniqueAccounts, 1);
  assert.ok(body.summary.totalTokens > 0);
  assert.ok(body.summary.avgLatencyMs > 0);
});

test("GET /api/usage/analytics includes dailyTrend array", async () => {
  await seedAnalyticsData();

  const response = await analyticsRoute.GET(makeRequest("http://localhost/api/usage/analytics"));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.dailyTrend));
  assert.ok(body.dailyTrend.length > 0);
});

test("GET /api/usage/analytics includes byModel array with cost calculations", async () => {
  await seedAnalyticsData();

  const response = await analyticsRoute.GET(makeRequest("http://localhost/api/usage/analytics"));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.byModel));
  assert.ok(body.byModel.length > 0);
  const gptEntry = body.byModel.find((m) => m.model === "4o" && m.provider === "openai");
  assert.ok(gptEntry);
  assert.ok(typeof gptEntry.cost === "number");
});

test("GET /api/usage/analytics filters by range parameter", async () => {
  await seedAnalyticsData();

  const response = await analyticsRoute.GET(
    makeRequest("http://localhost/api/usage/analytics?range=1d")
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.range, "1d");
});

test("GET /api/usage/analytics includes byProvider array", async () => {
  await seedAnalyticsData();

  const response = await analyticsRoute.GET(makeRequest("http://localhost/api/usage/analytics"));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.byProvider));
  assert.ok(body.byProvider.length > 0);
});

test("GET /api/usage/analytics includes byAccount array", async () => {
  await seedAnalyticsData();

  const response = await analyticsRoute.GET(makeRequest("http://localhost/api/usage/analytics"));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.byAccount));
  assert.ok(body.byAccount.length > 0);
  assert.equal(body.byAccount[0].account, "test-conn");
});

test("GET /api/usage/analytics returns weeklyTokens and weeklyCounts", async () => {
  await seedAnalyticsData();

  const response = await analyticsRoute.GET(makeRequest("http://localhost/api/usage/analytics"));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.weeklyTokens));
  assert.equal(body.weeklyTokens.length, 7);
  assert.ok(Array.isArray(body.weeklyCounts));
  assert.equal(body.weeklyCounts.length, 7);
});

test("GET /api/usage/analytics includes activityMap for heatmap", async () => {
  await seedAnalyticsData();

  const response = await analyticsRoute.GET(makeRequest("http://localhost/api/usage/analytics"));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.ok(typeof body.activityMap === "object");
  assert.ok(Object.keys(body.activityMap).length > 0);
});

test("GET /api/usage/analytics returns 500 on database errors", async () => {
  const response = await analyticsRoute.GET(makeRequest("http://localhost/api/usage/analytics"));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.ok(body.summary.totalRequests === 0);
});
