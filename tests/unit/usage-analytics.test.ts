import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-usage-analytics-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const usageStats = await import("../../src/lib/usage/usageStats.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const { calculateCost } = await import("../../src/lib/usage/costCalculator.ts");

function clearPendingRequests() {
  const pending = usageHistory.getPendingRequests();
  for (const key of Object.keys(pending.byModel)) delete pending.byModel[key];
  for (const key of Object.keys(pending.byAccount)) delete pending.byAccount[key];
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  clearPendingRequests();
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("usage history persists entries and supports filtering and usageDb compatibility", async () => {
  const recentTimestamp = new Date().toISOString();
  const olderTimestamp = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();

  await usageHistory.saveRequestUsage({
    provider: "provider-a",
    model: "model-a",
    connectionId: "conn-a",
    apiKeyId: "key-a",
    apiKeyName: "Key A",
    tokens: {
      input: 10,
      output: 5,
      cacheRead: 2,
      cacheCreation: 1,
      reasoning: 3,
    },
    status: "success",
    success: true,
    latencyMs: 120,
    timeToFirstTokenMs: 30,
    timestamp: recentTimestamp,
  });

  await usageHistory.saveRequestUsage({
    provider: "provider-b",
    model: "model-b",
    connectionId: "conn-b",
    tokens: {
      prompt_tokens: 20,
      completion_tokens: 7,
      cached_tokens: 4,
      cache_creation_input_tokens: 2,
      reasoning_tokens: 1,
    },
    status: "error",
    success: false,
    latencyMs: 400,
    errorCode: "rate_limited",
    timestamp: olderTimestamp,
  });

  const filtered = await usageHistory.getUsageHistory({
    provider: "provider-a",
    startDate: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  });
  const all = await usageHistory.getUsageDb();

  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].provider, "provider-a");
  assert.equal(filtered[0].tokens.input, 10);
  assert.equal(filtered[0].tokens.output, 5);
  assert.equal(filtered[0].tokens.cacheRead, 2);
  assert.equal(filtered[0].tokens.cacheCreation, 1);
  assert.equal(filtered[0].tokens.reasoning, 3);
  assert.equal(filtered[0].timeToFirstTokenMs, 30);

  assert.equal(all.data.history.length, 2);
  assert.equal(all.data.history[0].provider, "provider-b");
  assert.equal(all.data.history[1].provider, "provider-a");
  assert.equal(all.data.history[0].success, false);
  assert.equal(all.data.history[1].success, true);
});

test("getModelLatencyStats aggregates success rate and latency percentiles", async () => {
  const now = Date.now();
  const entries = [
    { latencyMs: 100, success: true },
    { latencyMs: 200, success: true },
    { latencyMs: 400, success: true },
    { latencyMs: 900, success: false },
  ];

  for (const [index, entry] of entries.entries()) {
    await usageHistory.saveRequestUsage({
      provider: "latency-provider",
      model: "latency-model",
      success: entry.success,
      latencyMs: entry.latencyMs,
      timestamp: new Date(now - index * 60 * 1000).toISOString(),
    });
  }

  const stats = await usageHistory.getModelLatencyStats({
    windowHours: 1,
    minSamples: 2,
    maxRows: 50,
  });

  const entry = stats["latency-provider/latency-model"];
  assert.ok(entry);
  assert.equal(entry.totalRequests, 4);
  assert.equal(entry.successfulRequests, 3);
  assert.equal(entry.successRate, 0.75);
  assert.equal(entry.avgLatencyMs, 233);
  assert.equal(entry.p50LatencyMs, 200);
  assert.equal(entry.p95LatencyMs, 400);
  assert.equal(entry.p99LatencyMs, 400);
  assert.ok(entry.latencyStdDev > 0);
});

test("getModelLatencyStats falls back to all latencies when successful sample count is too small", async () => {
  await usageHistory.saveRequestUsage({
    provider: "fallback-provider",
    model: "fallback-model",
    success: true,
    latencyMs: 100,
    timestamp: new Date().toISOString(),
  });
  await usageHistory.saveRequestUsage({
    provider: "fallback-provider",
    model: "fallback-model",
    success: false,
    latencyMs: 500,
    timestamp: new Date().toISOString(),
  });

  const stats = await usageHistory.getModelLatencyStats({
    windowHours: 1,
    minSamples: 2,
  });

  const entry = stats["fallback-provider/fallback-model"];
  assert.ok(entry);
  assert.equal(entry.successRate, 0.5);
  assert.equal(entry.avgLatencyMs, 300);
  assert.equal(entry.p50LatencyMs, 500);
});

test("getUsageStats aggregates totals, buckets, pending requests, and cost breakdowns", async () => {
  await localDb.updatePricing({
    "pricing-provider": {
      "pricing-model": {
        input: 1000,
        cached: 100,
        output: 2000,
        reasoning: 3000,
        cache_creation: 1500,
      },
    },
  });

  const connection = await providersDb.createProviderConnection({
    provider: "pricing-provider",
    authType: "apikey",
    name: "Primary Account",
    apiKey: "sk-test",
  });

  const recentTokens = {
    input: 100,
    output: 50,
    cacheRead: 20,
    cacheCreation: 10,
    reasoning: 5,
  };
  const oldTokens = {
    input: 40,
    output: 10,
    cacheRead: 0,
    cacheCreation: 0,
    reasoning: 0,
  };

  await usageHistory.saveRequestUsage({
    provider: "pricing-provider",
    model: "pricing-model",
    connectionId: connection.id,
    apiKeyId: "api-key-1",
    apiKeyName: "Service Key",
    tokens: recentTokens,
    success: true,
    latencyMs: 150,
    timestamp: new Date().toISOString(),
  });
  await usageHistory.saveRequestUsage({
    provider: "pricing-provider",
    model: "pricing-model",
    connectionId: connection.id,
    apiKeyId: "api-key-1",
    apiKeyName: "Service Key",
    tokens: oldTokens,
    success: true,
    latencyMs: 80,
    timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
  });

  usageHistory.trackPendingRequest("pricing-model", "pricing-provider", connection.id, true);
  usageHistory.trackPendingRequest("pricing-model", "pricing-provider", connection.id, true);
  usageHistory.trackPendingRequest("pricing-model", "pricing-provider", connection.id, false);

  const stats = await usageStats.getUsageStats();
  const expectedCost =
    (await calculateCost("pricing-provider", "pricing-model", recentTokens)) +
    (await calculateCost("pricing-provider", "pricing-model", oldTokens));

  assert.equal(stats.totalRequests, 2);
  assert.equal(stats.totalPromptTokens, 140);
  assert.equal(stats.totalCompletionTokens, 60);
  assert.ok(Math.abs(stats.totalCost - expectedCost) < 1e-9);

  assert.equal(stats.byProvider["pricing-provider"].requests, 2);
  assert.equal(stats.byProvider["pricing-provider"].promptTokens, 140);
  assert.equal(stats.byModel["pricing-model (pricing-provider)"].requests, 2);

  const accountKey = "pricing-model (pricing-provider - Primary Account)";
  assert.equal(stats.byAccount[accountKey].requests, 2);
  assert.equal(stats.byAccount[accountKey].accountName, "Primary Account");

  assert.equal(stats.byApiKey["Service Key (api-key-1)"].requests, 2);
  assert.equal(stats.pending.byModel["pricing-model (pricing-provider)"], 1);
  assert.equal(stats.pending.byAccount[connection.id]["pricing-model (pricing-provider)"], 1);
  assert.deepEqual(stats.activeRequests, [
    {
      model: "pricing-model",
      provider: "pricing-provider",
      account: "Primary Account",
      count: 1,
    },
  ]);

  assert.equal(stats.last10Minutes.length, 10);
  const recentBucketTotal = stats.last10Minutes.reduce((sum, bucket) => sum + bucket.requests, 0);
  assert.equal(recentBucketTotal, 1);
});

test("recent request summaries are generated from SQLite call logs", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "log-provider",
    authType: "apikey",
    name: "Named Account",
    apiKey: "sk-test",
  });

  for (let i = 0; i < 205; i++) {
    await callLogs.saveCallLog({
      id: `log-${i}`,
      timestamp: new Date(Date.now() + i).toISOString(),
      method: "POST",
      path: "/v1/chat/completions",
      status: 200,
      model: `model-${i}`,
      provider: "log-provider",
      connectionId: connection.id,
      tokens: { input: i + 1, output: i + 2 },
      requestBody: { index: i },
      responseBody: { ok: true, index: i },
    });
  }

  const recent = await usageHistory.getRecentLogs(3);

  assert.equal(recent.length, 3);
  assert.match(recent[0], /model-204/);
  assert.match(recent[0], /LOG-PROVIDER/);
  assert.match(recent[0], /Named Account/);
  assert.match(recent[0], /205 \| 206 \| 200$/);
});
