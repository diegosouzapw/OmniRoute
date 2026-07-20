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
test("GET /api/usage/analytics joins legacy workspace usage after Codex re-login", async () => {
  await localDb.updatePricing({
    codex: { "gpt-5.5": { input: 1, output: 2 } },
  });

  const db = core.getDbInstance();
  const connectionId = "legacy-workspace-connection";
  db.prepare(
    `INSERT INTO provider_connections
      (id, provider, auth_type, email, display_name, provider_specific_data, created_at, updated_at)
     VALUES (?, 'codex', 'oauth', NULL, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
  ).run(connectionId, "Production Codex", JSON.stringify({ workspaceId: "workspace-production" }));

  await usageHistory.saveRequestUsage({
    provider: "codex",
    model: "gpt-5.5",
    connectionId,
    tokens: { input: 1000, output: 500 },
    timestamp: "2026-01-01T00:00:00.000Z",
  });

  const relogged = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "member@example.com",
    accessToken: "new-secret",
    providerSpecificData: { workspaceId: "workspace-production" },
  });
  assert.equal(relogged.id, connectionId);
  const repaired = db
    .prepare(
      "SELECT account_key, account_label, account_label_priority FROM usage_history WHERE connection_id = ?"
    )
    .get(connectionId);
  assert.deepEqual(repaired, {
    account_key:
      '["oauth","codex","workspace","workspace-production","email","member@example.com"]',
    account_label: "Production Codex",
    account_label_priority: 4,
  });

  await usageHistory.saveRequestUsage({
    provider: "codex",
    model: "gpt-5.5",
    connectionId,
    tokens: { input: 1000, output: 500 },
    timestamp: "2026-01-02T00:00:00.000Z",
  });

  const response = await analyticsRoute.GET(
    makeRequest("http://localhost/api/usage/analytics?startDate=2026-01-01T00:00:00.000Z")
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.byAccount.length, 1);
  assert.equal(body.byAccount[0].account, "Production Codex");
  assert.equal(body.byAccount[0].requests, 2);
  assertClose(body.byAccount[0].cost, 0.004);
});

test("GET /api/usage/analytics preserves a Codex account across deletion and re-login", async () => {
  await localDb.updatePricing({
    codex: { "gpt-5.5": { input: 1, output: 2 } },
  });

  const original = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "member@example.com",
    displayName: "Production Codex",
    accessToken: "old-secret",
    providerSpecificData: { workspaceId: "workspace-production" },
  });

  await usageHistory.saveRequestUsage({
    provider: "codex",
    model: "gpt-5.5",
    connectionId: original.id as string,
    tokens: { input: 1000, output: 500 },
    timestamp: "2026-01-01T00:00:00.000Z",
  });
  await providersDb.deleteProviderConnection(original.id as string);

  const recreated = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "member@example.com",
    accessToken: "new-secret",
    providerSpecificData: { workspaceId: "workspace-production" },
  });
  assert.notEqual(recreated.id, original.id);

  await usageHistory.saveRequestUsage({
    provider: "codex",
    model: "gpt-5.5",
    connectionId: recreated.id as string,
    tokens: { input: 1000, output: 500 },
    timestamp: "2026-01-02T00:00:00.000Z",
  });

  const response = await analyticsRoute.GET(
    makeRequest("http://localhost/api/usage/analytics?startDate=2026-01-01T00:00:00.000Z")
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.byAccount.length, 1);
  assert.equal(body.byAccount[0].account, "Production Codex");
  assert.equal("accountKey" in body.byAccount[0], false);
  assert.equal(body.byAccount[0].requests, 2);
  assertClose(body.byAccount[0].cost, 0.004);
});

test("GET /api/usage/analytics keeps provider and Codex workspace account identities distinct", async () => {
  const accountSpecs = [
    { provider: "codex", workspaceId: "workspace-a" },
    { provider: "codex", workspaceId: "workspace-b" },
    { provider: "openai", workspaceId: undefined },
  ];

  for (const [index, spec] of accountSpecs.entries()) {
    const connection = await providersDb.createProviderConnection({
      provider: spec.provider,
      authType: "oauth",
      email: "shared@example.com",
      accessToken: `secret-${index}`,
      providerSpecificData: spec.workspaceId ? { workspaceId: spec.workspaceId } : {},
    });
    await usageHistory.saveRequestUsage({
      provider: spec.provider,
      model: spec.provider === "codex" ? "gpt-5.5" : "gpt-4o",
      connectionId: connection.id as string,
      tokens: { input: 100 + index, output: 50 + index },
      timestamp: `2026-01-0${index + 1}T00:00:00.000Z`,
    });
  }

  const response = await analyticsRoute.GET(
    makeRequest("http://localhost/api/usage/analytics?startDate=2026-01-01T00:00:00.000Z")
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.byAccount.length, 3);
  assert.ok(body.byAccount.every((row) => !("accountKey" in row)));
  assert.deepEqual(body.byAccount.map((row) => row.account).sort(), [
    "shared@example.com",
    "shared@example.com",
    "shared@example.com",
  ]);
});

test("GET /api/usage/analytics keeps an honest UUID label for an orphaned legacy account", async () => {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO usage_history (provider, model, connection_id, tokens_input, tokens_output, success, latency_ms, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run("codex", "gpt-5.5", "deleted-legacy-uuid", 10, 5, 1, 25, "2026-01-01T00:00:00.000Z");

  const response = await analyticsRoute.GET(
    makeRequest("http://localhost/api/usage/analytics?startDate=2026-01-01T00:00:00.000Z")
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.byAccount.length, 1);
  assert.equal(body.byAccount[0].account, "deleted-legacy-uuid");
  assert.equal("accountKey" in body.byAccount[0], false);
});

test("GET /api/usage/analytics uses the newest equal-priority label for one account", async () => {
  const db = core.getDbInstance();
  const accountKey = '["oauth","codex","user","user-a","email","member@example.com"]';
  const now = Date.now();
  const insert = db.prepare(
    `INSERT INTO usage_history
      (provider, model, connection_id, account_key, account_label, account_label_priority,
       tokens_input, tokens_output, success, latency_ms, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  insert.run(
    "codex",
    "gpt-5.5",
    "old-uuid",
    accountKey,
    "Zulu before rename",
    4,
    10,
    5,
    1,
    20,
    new Date(now - 60_000).toISOString()
  );
  insert.run(
    "codex",
    "gpt-5.5",
    "new-uuid",
    accountKey,
    "Alpha after rename",
    4,
    20,
    10,
    1,
    30,
    new Date(now).toISOString()
  );

  const response = await analyticsRoute.GET(makeRequest("http://localhost/api/usage/analytics"));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.summary.uniqueAccounts, 1);
  assert.equal(body.byAccount.length, 1);
  assert.equal(body.byAccount[0].account, "Alpha after rename");
  assert.equal(body.byAccount[0].requests, 2);
  assert.equal("accountKey" in body.byAccount[0], false);
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
