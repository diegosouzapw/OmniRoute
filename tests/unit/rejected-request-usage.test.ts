// Regression guard — support-mesh escalation (2026-07-08, whatsbrasil):
// an OmniRoute API key ("opencode-mac") showed "zero requisições" even though
// it received traffic. Root cause: requests rejected *before* handleChatCore
// (pipeline-gate / provider circuit breaker OPEN, or a combo with every target
// exhausted) short-circuit in src/sse/handlers/chat.ts and only wrote a
// call_logs row via saveCallLog — they never reached persistFailureUsage, so
// no usage_history row was created and the per-api-key usage counter
// (getApiKeyUsageRows, which reads usage_history) never incremented.
//
// The fix routes those rejections through recordRejectedRequestUsage(), which
// writes BOTH the call_logs row (dashboard/logs visibility, preserved) AND a
// usage_history row attributed to the api key with success:false — so the
// rejected traffic is counted per key.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rejected-usage-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const { recordRejectedRequestUsage } = await import("../../src/sse/handlers/rejectedRequestUsage.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  usageHistory.clearPendingRequests();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("gate-rejected request is attributed to the api key in usage_history", async () => {
  await recordRejectedRequestUsage({
    status: 503,
    model: "claude-sonnet-5",
    requestedModel: "claude-sonnet-5",
    provider: "anthropic",
    endpoint: "/v1/chat/completions",
    error: "[503] Pipeline gate rejected",
    apiKeyId: "key-opencode-mac",
    apiKeyName: "opencode-mac",
    startTime: Date.now() - 5,
  });

  // usage_history row exists, attributed to the key, marked as a failure.
  const rows = (await usageHistory.getUsageDb()).data.history;
  const keyRows = rows.filter((r: { apiKeyId?: string | null }) => r.apiKeyId === "key-opencode-mac");
  assert.equal(keyRows.length, 1, "expected one usage_history row for the rejected request");
  assert.equal(keyRows[0].success, false, "rejected request must be recorded as success:false");

  // call_logs visibility is preserved (dashboard/logs).
  const logs = await callLogs.getCallLogs({});
  const rejected = (logs.logs ?? logs).filter?.((l: { apiKeyName?: string | null }) => l.apiKeyName === "opencode-mac");
  assert.ok(rejected && rejected.length >= 1, "expected a call_logs row for the rejected request");
});

test("combo-exhausted rejection is also counted per api key", async () => {
  await recordRejectedRequestUsage({
    status: 502,
    model: "gpt-5",
    requestedModel: "gpt-5",
    provider: "-",
    endpoint: "/v1/chat/completions",
    error: '[502] Combo "prod" failed — all targets exhausted',
    comboName: "prod",
    apiKeyId: "key-opencode-mac",
    apiKeyName: "opencode-mac",
    startTime: Date.now() - 3,
  });

  const rows = (await usageHistory.getUsageDb()).data.history;
  const keyRows = rows.filter((r: { apiKeyId?: string | null }) => r.apiKeyId === "key-opencode-mac");
  assert.equal(keyRows.length, 1);
  assert.equal(keyRows[0].success, false);
});
