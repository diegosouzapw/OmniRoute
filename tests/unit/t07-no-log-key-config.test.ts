import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-t07-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const originalPiiEnabled = process.env.PII_RESPONSE_SANITIZATION;
const originalPiiMode = process.env.PII_RESPONSE_SANITIZATION_MODE;
const originalApiKeySecret = process.env.API_KEY_SECRET;
process.env.PII_RESPONSE_SANITIZATION = "true";
process.env.PII_RESPONSE_SANITIZATION_MODE = "redact";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "t07-test-secret-key";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const schemas = await import("../../src/shared/validation/schemas.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (originalPiiEnabled === undefined) {
    delete process.env.PII_RESPONSE_SANITIZATION;
  } else {
    process.env.PII_RESPONSE_SANITIZATION = originalPiiEnabled;
  }

  if (originalPiiMode === undefined) {
    delete process.env.PII_RESPONSE_SANITIZATION_MODE;
  } else {
    process.env.PII_RESPONSE_SANITIZATION_MODE = originalPiiMode;
  }

  if (originalApiKeySecret === undefined) {
    delete process.env.API_KEY_SECRET;
  } else {
    process.env.API_KEY_SECRET = originalApiKeySecret;
  }
});

test("updateKeyPermissionsSchema accepts noLog-only updates and rejects empty payload", () => {
  const noLogOnly = schemas.validateBody(schemas.updateKeyPermissionsSchema, { noLog: true });
  assert.equal(noLogOnly.success, true);

  const maxSessionsOnly = schemas.validateBody(schemas.updateKeyPermissionsSchema, {
    maxSessions: 3,
  });
  assert.equal(maxSessionsOnly.success, true);

  const emptyPayload = schemas.validateBody(schemas.updateKeyPermissionsSchema, {});
  assert.equal(emptyPayload.success, false);
});

test("API key no_log persists and updates compliance state", async () => {
  const created = await apiKeysDb.createApiKey("privacy-key", "machine-test");

  const initial = await apiKeysDb.getApiKeyById(created.id);
  assert.equal(initial?.noLog, false);
  assert.equal(compliance.isNoLog(created.id), false);

  const updated = await apiKeysDb.updateApiKeyPermissions(created.id, { noLog: true });
  assert.equal(updated, true);

  const afterEnable = await apiKeysDb.getApiKeyById(created.id);
  assert.equal(afterEnable?.noLog, true);

  const metadata = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.equal(metadata?.noLog, true);
  assert.equal(compliance.isNoLog(created.id), true);

  const reverted = await apiKeysDb.updateApiKeyPermissions(created.id, { noLog: false });
  assert.equal(reverted, true);
  assert.equal(compliance.isNoLog(created.id), false);
});

test("call logs omit payloads when key no_log is enabled and redact PII otherwise", async () => {
  const created = await apiKeysDb.createApiKey("privacy-log-key", "machine-test");

  const baseEntry = {
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4.1",
    provider: "openai",
    duration: 42,
    apiKeyId: created.id,
    apiKeyName: created.name,
    requestBody: {
      email: "john@example.com",
      token: "super-secret-token",
      nested: {
        contact: "john@example.com",
      },
    },
    responseBody: {
      summary: "Contact john@example.com for details",
    },
  };

  await apiKeysDb.updateApiKeyPermissions(created.id, { noLog: true });
  await callLogs.saveCallLog(baseEntry);

  const firstBatch = await callLogs.getCallLogs({ limit: 5 });
  assert.equal(firstBatch.length, 1);
  assert.equal(firstBatch[0].hasRequestBody, false);
  assert.equal(firstBatch[0].hasResponseBody, false);

  const noLogDetails = await callLogs.getCallLogById(firstBatch[0].id);
  assert.equal(noLogDetails?.requestBody, null);
  assert.equal(noLogDetails?.responseBody, null);

  await apiKeysDb.updateApiKeyPermissions(created.id, { noLog: false });
  await callLogs.saveCallLog(baseEntry);

  const secondBatch = await callLogs.getCallLogs({ limit: 10 });
  assert.equal(secondBatch.length, 2);

  const withPayloadEntry = secondBatch.find((item) => item.id !== firstBatch[0].id);
  assert.ok(withPayloadEntry, "Expected a log entry with payload persisted");

  const payloadDetails = await callLogs.getCallLogById(withPayloadEntry.id);
  assert.equal(payloadDetails?.requestBody?.email, "[EMAIL_REDACTED]");
  assert.equal(payloadDetails?.requestBody?.token, "[REDACTED]");
  assert.equal(payloadDetails?.requestBody?.nested?.contact, "[EMAIL_REDACTED]");
  assert.equal(payloadDetails?.responseBody?.summary, "Contact [EMAIL_REDACTED] for details");
});
