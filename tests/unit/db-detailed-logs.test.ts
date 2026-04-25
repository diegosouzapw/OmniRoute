import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-detailed-logs-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const ORIGINAL_PII_ENABLED = process.env.PII_RESPONSE_SANITIZATION;
const ORIGINAL_PII_MODE = process.env.PII_RESPONSE_SANITIZATION_MODE;
process.env.PII_RESPONSE_SANITIZATION = "true";
process.env.PII_RESPONSE_SANITIZATION_MODE = "redact";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "task-303-detailed-secret";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const detailedLogsDb = await import("../../src/lib/db/detailedLogs.ts");
const { createStructuredSSECollector } =
  await import("../../open-sse/utils/streamPayloadCollector.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_PII_ENABLED === undefined) {
    delete process.env.PII_RESPONSE_SANITIZATION;
  } else {
    process.env.PII_RESPONSE_SANITIZATION = ORIGINAL_PII_ENABLED;
  }

  if (ORIGINAL_PII_MODE === undefined) {
    delete process.env.PII_RESPONSE_SANITIZATION_MODE;
  } else {
    process.env.PII_RESPONSE_SANITIZATION_MODE = ORIGINAL_PII_MODE;
  }
});

test("isDetailedLoggingEnabled follows the stored setting", async () => {
  assert.equal(await detailedLogsDb.isDetailedLoggingEnabled(), false);

  await settingsDb.updateSettings({ call_log_pipeline_enabled: "true" });

  assert.equal(await detailedLogsDb.isDetailedLoggingEnabled(), true);
});

test("saveRequestDetailLog persists protected payloads and compacted stream summaries", () => {
  const collector = createStructuredSSECollector({ stage: "provider-response" });
  collector.push({
    type: "response.output_text.delta",
    delta: "Hello",
  });
  const providerStream = collector.build({
    id: "resp_123",
    object: "response",
    output_text: "Hello world",
  });

  detailedLogsDb.saveRequestDetailLog({
    id: "detail-1",
    call_log_id: "call-1",
    timestamp: "2026-04-05T18:00:00.000Z",
    client_request: { email: "john@example.com", token: "super-secret" },
    translated_request: '{"message":"hello"}',
    provider_response: providerStream,
    client_response: "plain text response",
    provider: "openai",
    model: "gpt-4.1",
    source_format: "openai",
    target_format: "gemini",
    duration_ms: 321,
  });

  const row = detailedLogsDb.getRequestDetailLogById("detail-1");

  assert.equal(row.call_log_id, "call-1");
  assert.deepEqual(row.client_request, {
    email: "[EMAIL_REDACTED]",
    token: "[REDACTED]",
  });
  assert.deepEqual(row.translated_request, { message: "hello" });
  assert.equal((row.provider_response as any).id, "resp_123");
  assert.equal((row as any).provider_response.output_text, "Hello world");
  assert.deepEqual((row as any).provider_response._omniroute_stream, {
    format: "sse-json",
    stage: "provider-response",
    eventCount: 1,
  });
  assert.deepEqual(row.client_response, { _rawText: "plain text response" });
  assert.equal(row.duration_ms, 321);
});

test("latest log lookup by call_log_id and paginated listing use newest-first ordering", () => {
  detailedLogsDb.saveRequestDetailLog({
    id: "older",
    call_log_id: "call-2",
    timestamp: "2026-04-05T18:00:00.000Z",
    provider: "openai",
    model: "gpt-4.1",
  });
  detailedLogsDb.saveRequestDetailLog({
    id: "newer",
    call_log_id: "call-2",
    timestamp: "2026-04-05T18:00:02.000Z",
    provider: "anthropic",
    model: "claude-3-7-sonnet",
  });
  detailedLogsDb.saveRequestDetailLog({
    id: "latest",
    call_log_id: "call-3",
    timestamp: "2026-04-05T18:00:03.000Z",
    provider: "gemini",
    model: "gemini-2.5-pro",
  });

  const firstPage = detailedLogsDb.getRequestDetailLogs(2, 0);
  const secondPage = detailedLogsDb.getRequestDetailLogs(1, 1);

  assert.equal(detailedLogsDb.getRequestDetailLogByCallLogId("call-2").id, "newer");
  assert.deepEqual(
    firstPage.map((row) => row.id),
    ["latest", "newer"]
  );
  assert.deepEqual(
    secondPage.map((row) => row.id),
    ["newer"]
  );
  assert.equal(detailedLogsDb.getRequestDetailLogCount(), 3);
});

test("logs are skipped when the associated API key is marked as no_log", async () => {
  const apiKey = await apiKeysDb.createApiKey("No Log Key", "machine-303");
  await apiKeysDb.updateApiKeyPermissions(apiKey.id, { noLog: true });

  detailedLogsDb.saveRequestDetailLog({
    id: "should-not-persist",
    api_key_id: apiKey.id,
    provider: "openai",
    model: "gpt-4.1",
    no_log: false,
  });

  assert.equal(detailedLogsDb.getRequestDetailLogCount(), 0);
  assert.equal(detailedLogsDb.getRequestDetailLogById("should-not-persist"), null);
});

test("request_detail_logs trigger keeps only the latest 500 rows", () => {
  for (let i = 0; i < 505; i += 1) {
    detailedLogsDb.saveRequestDetailLog({
      id: `ring-${i}`,
      timestamp: new Date(Date.UTC(2026, 3, 5, 18, 0, 0, i)).toISOString(),
      provider: "openai",
      model: "gpt-4.1",
    });
  }

  const rows = detailedLogsDb.getRequestDetailLogs(600, 0);

  assert.equal(detailedLogsDb.getRequestDetailLogCount(), 500);
  assert.equal(detailedLogsDb.getRequestDetailLogById("ring-0"), null);
  assert.equal(detailedLogsDb.getRequestDetailLogById("ring-4"), null);
  assert.equal(detailedLogsDb.getRequestDetailLogById("ring-5")?.id, "ring-5");
  assert.equal(rows[0].id, "ring-504");
  assert.equal(rows.at(-1)?.id, "ring-5");
});
