/**
 * Ported feature regression — decolua/9router#152 (thanks @toanalien).
 *
 * Covers the new `endpoint` column on usage_history + getEndpointUsageRows()
 * aggregation. Asserts: persistence round-trip, NULL → 'unknown' folding,
 * per-endpoint grouping, sinceIso filter.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-usage-endpoint-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const usageAnalytics = await import("../../src/lib/db/usageAnalytics.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  usageHistory.clearPendingRequests();
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("saveRequestUsage persists endpoint and getEndpointUsageRows groups by endpoint", async () => {
  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o-mini",
    tokens: { input: 10, output: 5 },
    success: true,
    latencyMs: 100,
    timestamp: new Date().toISOString(),
    endpoint: "/v1/chat/completions",
  });
  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o-mini",
    tokens: { input: 20, output: 8 },
    success: true,
    latencyMs: 200,
    timestamp: new Date().toISOString(),
    endpoint: "/v1/chat/completions",
  });
  await usageHistory.saveRequestUsage({
    provider: "anthropic",
    model: "claude-sonnet-4",
    tokens: { input: 30, output: 12 },
    success: true,
    latencyMs: 300,
    timestamp: new Date().toISOString(),
    endpoint: "/v1/messages",
  });

  const rows = usageAnalytics.getEndpointUsageRows();
  const byKey = new Map(rows.map((r) => [`${r.endpoint}|${r.provider}|${r.model}`, r]));

  const chat = byKey.get("/v1/chat/completions|openai|gpt-4o-mini");
  assert.ok(chat, "expected /v1/chat/completions row");
  assert.equal(chat.requests, 2);
  assert.equal(chat.promptTokens, 30);
  assert.equal(chat.completionTokens, 13);

  const messages = byKey.get("/v1/messages|anthropic|claude-sonnet-4");
  assert.ok(messages, "expected /v1/messages row");
  assert.equal(messages.requests, 1);
  assert.equal(messages.promptTokens, 30);
});

test("getEndpointUsageRows folds NULL endpoint into 'unknown' bucket (backward compat)", async () => {
  // Legacy entry: no endpoint field set → stored as NULL.
  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o-mini",
    tokens: { input: 5, output: 5 },
    success: true,
    latencyMs: 50,
    timestamp: new Date().toISOString(),
  });

  const rows = usageAnalytics.getEndpointUsageRows();
  const unknown = rows.find((r) => r.endpoint === "unknown");
  assert.ok(unknown, "NULL endpoint should fold into 'unknown'");
  assert.equal(unknown.requests, 1);
});

test("getEndpointUsageRows honors sinceIso filter", async () => {
  const old = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const recent = new Date().toISOString();
  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o-mini",
    tokens: { input: 5, output: 5 },
    success: true,
    latencyMs: 50,
    timestamp: old,
    endpoint: "/v1/chat/completions",
  });
  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o-mini",
    tokens: { input: 5, output: 5 },
    success: true,
    latencyMs: 50,
    timestamp: recent,
    endpoint: "/v1/chat/completions",
  });

  const sinceIso = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const rows = usageAnalytics.getEndpointUsageRows({ sinceIso });
  const chat = rows.find((r) => r.endpoint === "/v1/chat/completions");
  assert.ok(chat);
  assert.equal(chat.requests, 1, "only the recent row should be counted");
});
