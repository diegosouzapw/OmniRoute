import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-usage-analytics-provider-name-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;
process.env.API_KEY_SECRET = "test-usage-analytics-provider-name-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const analyticsRoute = await import("../../src/app/api/usage/analytics/route.ts");
const providers = await import("../../src/shared/constants/providers.ts");

function makeRequest(url: string) {
  return new Request(url, { method: "GET" });
}

test.beforeEach(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  usageHistory.clearPendingRequests();
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

test("#7534: byProvider exposes the configured display name, not the raw internal provider id", async () => {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO usage_history (provider, model, connection_id, api_key_id, api_key_name, tokens_input, tokens_output, success, latency_ms, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run("codex", "gpt-5.5", "test-conn", "test-key", "Primary Key", 100, 50, 1, 200, now);

  const response = await analyticsRoute.GET(makeRequest("http://localhost/api/usage/analytics"));
  const body = await response.json();

  const expectedDisplayName = providers.getProviderById("codex")?.name;
  assert.equal(response.status, 200);
  assert.equal(
    body.byProvider[0].provider,
    expectedDisplayName,
    `expected byProvider[0].provider to be the display name "${expectedDisplayName}", ` +
      `but got "${body.byProvider[0].provider}" (#7534)`
  );
});

test("#7534: byProvider falls back to the raw id for providers not in the static registry", async () => {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO usage_history (provider, model, connection_id, api_key_id, api_key_name, tokens_input, tokens_output, success, latency_ms, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    "openai-compatible-custom",
    "some-model",
    "test-conn",
    "test-key",
    "Primary Key",
    100,
    50,
    1,
    200,
    now
  );

  const response = await analyticsRoute.GET(makeRequest("http://localhost/api/usage/analytics"));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.byProvider[0].provider, "openai-compatible-custom");
});
