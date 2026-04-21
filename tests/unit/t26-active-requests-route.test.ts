import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-t26-active-requests-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const route = await import("../../src/app/api/logs/active/route.ts");

function clearPendingRequests() {
  const pending = usageHistory.getPendingRequests();
  for (const key of Object.keys(pending.byModel)) delete pending.byModel[key];
  for (const key of Object.keys(pending.byAccount)) delete pending.byAccount[key];
  for (const key of Object.keys(pending.details || {})) delete pending.details[key];
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

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("active requests route returns running request details with sanitized payloads", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Primary Account",
    apiKey: "sk-account-primary",
  });

  usageHistory.trackPendingRequest("gpt-4o-mini", "openai", connection.id, true, {
    startedAt: Date.now() - 5_000,
    requestBody: {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "hello from active route test" }],
      apiKey: "sk-very-secret",
      authorization: "Bearer top-secret",
    },
    apiKeyId: "key-active-1",
    apiKeyName: "Primary Key",
  });

  const response = await route.GET(
    await makeManagementSessionRequest("http://localhost/api/logs/active")
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.activeRequests.length, 1);
  assert.equal(body.activeRequests[0].model, "gpt-4o-mini");
  assert.equal(body.activeRequests[0].provider, "openai");
  assert.equal(body.activeRequests[0].account, "Primary Account");
  assert.equal(body.activeRequests[0].count, 1);
  assert.equal(body.activeRequests[0].apiKeyId, "key-active-1");
  assert.equal(body.activeRequests[0].apiKeyName, "Primary Key");
  assert.ok(body.activeRequests[0].runningTimeMs >= 4_000);

  const requestBodyText = JSON.stringify(body.activeRequests[0].requestBody);
  assert.equal(requestBodyText.includes("sk-very-secret"), false);
  assert.equal(requestBodyText.includes("top-secret"), false);
  assert.equal(requestBodyText.includes("[REDACTED]"), true);

  usageHistory.trackPendingRequest("gpt-4o-mini", "openai", connection.id, false);

  const clearedResponse = await route.GET(
    await makeManagementSessionRequest("http://localhost/api/logs/active")
  );
  const clearedBody = await clearedResponse.json();

  assert.equal(clearedResponse.status, 200);
  assert.deepEqual(clearedBody, { activeRequests: [] });
});
