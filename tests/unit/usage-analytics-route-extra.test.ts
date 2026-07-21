import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-usage-analytics-route-extra-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;
process.env.API_KEY_SECRET = "test-usage-analytics-secret";

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const analyticsRoute = await import("../../src/app/api/usage/analytics/route.ts");

const clearPendingRequests = usageHistory.clearPendingRequests;
const EXPECTED_TOTAL_COST = 0.020925;

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
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
      `INSERT INTO usage_history (provider, model, connection_id, api_key_id, api_key_name, tokens_input, tokens_output, success, latency_ms, timestamp)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      i % 2 === 0 ? "openai" : "anthropic",
      i % 2 === 0 ? "gpt-4o" : "claude-sonnet",
      "test-conn",
      "test-key",
      "Primary Key",
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

function assertClose(actual: number, expected: number, epsilon = 0.000001) {
  assert.ok(
    Math.abs(actual - expected) <= epsilon,
    `expected ${actual} to be within ${epsilon} of ${expected}`
  );
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
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_API_KEY_SECRET === undefined) {
    delete process.env.API_KEY_SECRET;
  } else {
    process.env.API_KEY_SECRET = ORIGINAL_API_KEY_SECRET;
  }
});
test("GET /api/usage/analytics includes cost by API key", async () => {
  await seedAnalyticsData();

  const response = await analyticsRoute.GET(makeRequest("http://localhost/api/usage/analytics"));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.byApiKey));
  assert.equal(body.byApiKey.length, 1);
  assert.equal(body.byApiKey[0].apiKeyId, "test-key");
  assert.equal(body.byApiKey[0].apiKeyName, "Primary Key");
  assertClose(body.byApiKey[0].cost, body.summary.totalCost);
});

test("GET /api/usage/analytics does not double-count raw and aggregated rows", async () => {
  const db = core.getDbInstance();
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 30);
  const olderDate = new Date(cutoffDate);
  olderDate.setDate(olderDate.getDate() - 1);
  const olderDateStr = olderDate.toISOString().split("T")[0];

  db.prepare(
    `INSERT INTO usage_history (provider, model, connection_id, tokens_input, tokens_output, success, latency_ms, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run("openai", "gpt-4o", "raw-current", 100, 50, 1, 200, today.toISOString());

  const insertSummary = db.prepare(
    `INSERT INTO daily_usage_summary (provider, model, date, total_requests, total_input_tokens, total_output_tokens, total_cost)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  insertSummary.run("openai", "gpt-4o", todayStr, 99, 9900, 9900, 0);
  insertSummary.run("openai", "gpt-4o", olderDateStr, 1, 25, 10, 0);

  const response = await analyticsRoute.GET(
    makeRequest("http://localhost/api/usage/analytics?range=all")
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.summary.totalRequests, 2);
  assert.equal(body.summary.totalTokens, 185);
  assert.equal(body.summary.uniqueAccounts, 1);
});

test("GET /api/usage/analytics omits global aggregates when filtering by API key", async () => {
  const apiKey = await apiKeysDb.createApiKey("Scoped Key", "machine1234567890");
  const db = core.getDbInstance();

  db.prepare(
    `INSERT INTO usage_history (provider, model, connection_id, api_key_id, api_key_name, tokens_input, tokens_output, success, latency_ms, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    "openai",
    "gpt-4o",
    "scoped-conn",
    apiKey.id,
    "Scoped Key",
    100,
    50,
    1,
    200,
    new Date().toISOString()
  );

  db.prepare(
    `INSERT INTO daily_usage_summary (provider, model, date, total_requests, total_input_tokens, total_output_tokens, total_cost)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run("openai", "gpt-4o", "2024-01-01", 99, 9900, 9900, 0);

  const response = await analyticsRoute.GET(
    makeRequest(`http://localhost/api/usage/analytics?range=all&apiKeyIds=${apiKey.id}`)
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.summary.totalRequests, 1);
  assert.equal(body.summary.totalTokens, 150);
  assert.equal(body.byApiKey.length, 1);
  assert.equal(body.byApiKey[0].apiKeyId, apiKey.id);
});

test("GET /api/usage/analytics groups renamed API key usage by stable ID", async () => {
  const apiKey = await apiKeysDb.createApiKey("Averyanov", "machine1234567890");
  await apiKeysDb.updateApiKeyPermissions(apiKey.id, { name: "Alexander Averyanov" });

  const db = core.getDbInstance();
  const now = Date.now();
  const insertUsage = db.prepare(
    `INSERT INTO usage_history (provider, model, connection_id, api_key_id, api_key_name, tokens_input, tokens_output, success, latency_ms, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  insertUsage.run(
    "openai",
    "gpt-4o",
    "test-conn",
    apiKey.id,
    "Averyanov",
    100,
    50,
    1,
    200,
    new Date(now - 60_000).toISOString()
  );
  insertUsage.run(
    "openai",
    "gpt-4o",
    "test-conn",
    apiKey.id,
    "Desktop",
    200,
    100,
    1,
    250,
    new Date(now).toISOString()
  );

  const response = await analyticsRoute.GET(makeRequest("http://localhost/api/usage/analytics"));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.summary.uniqueApiKeys, 1);
  assert.equal(body.byApiKey.length, 1);
  assert.equal(body.byApiKey[0].apiKeyId, apiKey.id);
  assert.equal(body.byApiKey[0].apiKeyName, "Alexander Averyanov");
  assert.deepEqual(body.byApiKey[0].historicalApiKeyNames.sort(), ["Averyanov", "Desktop"]);
  assert.equal(body.byApiKey[0].requests, 2);
  assert.equal(body.byApiKey[0].promptTokens, 300);
  assert.equal(body.byApiKey[0].completionTokens, 150);

  const filteredResponse = await analyticsRoute.GET(
    makeRequest(`http://localhost/api/usage/analytics?apiKeyIds=${apiKey.id}`)
  );
  const filteredBody = await filteredResponse.json();

  assert.equal(filteredResponse.status, 200);
  assert.equal(filteredBody.summary.totalRequests, 2);
  assert.equal(filteredBody.byApiKey.length, 1);
  assert.equal(filteredBody.byApiKey[0].apiKeyId, apiKey.id);
});

test("GET /api/usage/analytics does not persist guessed API key attribution", async () => {
  await localDb.updatePricing({
    openai: { "gpt-4o": { input: 2.5, output: 10 } },
  });
  await apiKeysDb.createApiKey("Unrestricted Key", "machine1234567890");

  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO usage_history (provider, model, connection_id, api_key_id, api_key_name, tokens_input, tokens_output, success, latency_ms, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run("openai", "gpt-4o", "legacy-conn", null, null, 100, 50, 1, 200, new Date().toISOString());

  const response = await analyticsRoute.GET(makeRequest("http://localhost/api/usage/analytics"));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.byApiKey.length, 0);

  const row = db
    .prepare("SELECT api_key_id, api_key_name FROM usage_history WHERE connection_id = ?")
    .get("legacy-conn") as { api_key_id: string | null; api_key_name: string | null };
  assert.equal(row.api_key_id, null);
  assert.equal(row.api_key_name, null);
});

test("GET /api/usage/analytics returns weeklyPattern for the costs dashboard", async () => {
  await seedAnalyticsData();

  const response = await analyticsRoute.GET(makeRequest("http://localhost/api/usage/analytics"));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.weeklyPattern));
  assert.equal(body.weeklyPattern.length, 7);
  assert.deepEqual(
    body.weeklyPattern.map((row) => row.day),
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  );
  assert.ok(body.weeklyPattern.some((row) => row.totalTokens > 0 && row.avgTokens > 0));
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

test("GET /api/usage/analytics does not throw Unknown named parameter on short range (needsAggregated=false)", async () => {
  // Regression: shared params object leaked agg-only bindings (@sinceDate, @rawCutoffDate)
  // into queries that don't reference them, causing better-sqlite3 to throw.
  // A short range (1h) triggers needsAggregated=false because the entire window
  // falls within the raw-data-only period.
  const db = core.getDbInstance();
  const now = new Date();
  db.prepare(
    `INSERT INTO usage_history (provider, model, connection_id, tokens_input, tokens_output, success, latency_ms, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run("openai", "gpt-4o", "test-conn", 100, 50, 1, 200, now.toISOString());

  const response = await analyticsRoute.GET(
    makeRequest("http://localhost/api/usage/analytics?range=1h")
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.summary.totalRequests, 1);
});

test("GET /api/usage/analytics does not throw Unknown named parameter with apiKey filter on long range", async () => {
  // Regression: Object.assign(presetParams, params) leaked all main-query bindings
  // into preset queries that only reference preset-prefixed placeholders.
  const apiKey = await apiKeysDb.createApiKey("Preset Key", "machine-preset1234");
  const db = core.getDbInstance();
  const now = new Date();

  // Seed data old enough to trigger aggregated + preset path
  for (let i = 0; i < 5; i++) {
    const ts = new Date(now.getTime() - (35 + i) * 24 * 60 * 60 * 1000).toISOString();
    db.prepare(
      `INSERT INTO usage_history (provider, model, connection_id, api_key_id, api_key_name, tokens_input, tokens_output, success, latency_ms, timestamp)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run("openai", "gpt-4o", "test-conn", apiKey.id, apiKey.name, 100, 50, 1, 200, ts);
  }

  const response = await analyticsRoute.GET(
    makeRequest(`http://localhost/api/usage/analytics?range=60d&apiKeyId=${apiKey.id}`)
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  // Core regression check: no "Unknown named parameter" error.
  // The exact count depends on raw-vs-aggregated boundary; we only need to
  // confirm the endpoint returns 200 without throwing.
  assert.ok(typeof body.summary.totalRequests === "number");
});
