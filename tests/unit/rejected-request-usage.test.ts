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
const { recordRejectedRequestUsage, summarizeComboAttemptedModels } =
  await import("../../src/sse/handlers/rejectedRequestUsage.ts");

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
  const keyRows = rows.filter(
    (r: { apiKeyId?: string | null }) => r.apiKeyId === "key-opencode-mac"
  );
  assert.equal(keyRows.length, 1, "expected one usage_history row for the rejected request");
  assert.equal(keyRows[0].success, false, "rejected request must be recorded as success:false");

  // call_logs visibility is preserved (dashboard/logs).
  const logs = await callLogs.getCallLogs({});
  const rejected = (logs.logs ?? logs).filter?.(
    (l: { apiKeyName?: string | null }) => l.apiKeyName === "opencode-mac"
  );
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
  const keyRows = rows.filter(
    (r: { apiKeyId?: string | null }) => r.apiKeyId === "key-opencode-mac"
  );
  assert.equal(keyRows.length, 1);
  assert.equal(keyRows[0].success, false);
});

// #7360 follow-up: rejected/combo-exhausted requests wrote a call_logs row with
// no client request body and a hardcoded provider "-", even when the combo's
// attempted models were known — the dashboard log detail was useless for
// debugging which models were tried. recordRejectedRequestUsage now accepts
// requestBody and persists it like the normal handleChatCore logging path.
test("combo-exhausted rejection persists the client request body for dashboard inspection", async () => {
  await recordRejectedRequestUsage({
    status: 503,
    model: "default",
    requestedModel: "default",
    provider: "gemini/gemma-4-31b-it, gemini/gemma-4-26b-a4b-it",
    endpoint: "/v1/responses",
    error: '[503] Combo "default" failed — all targets exhausted',
    comboName: "default",
    apiKeyId: "key-request-body-test",
    apiKeyName: "request-body-test",
    correlationId: "corr-request-body-test",
    startTime: Date.now() - 6000,
    requestBody: { model: "default", messages: [{ role: "user", content: "hello" }] },
  });

  const logs = await callLogs.getCallLogs({});
  const rejected = (logs.logs ?? logs).find?.(
    (l: { apiKeyName?: string | null }) => l.apiKeyName === "request-body-test"
  );
  assert.ok(rejected, "expected a call_logs row for the rejected request");
  assert.equal(rejected.hasRequestBody, true, "expected hasRequestBody to be true");

  const detail = await callLogs.getCallLogById(rejected.id);
  assert.ok(detail, "expected to load the call log detail");
  assert.deepEqual(detail!.requestBody, {
    model: "default",
    messages: [{ role: "user", content: "hello" }],
  });
});

test("combo-exhausted rejection without a request body still logs cleanly (no request body available)", async () => {
  await recordRejectedRequestUsage({
    status: 503,
    model: "default",
    requestedModel: "default",
    provider: "-",
    endpoint: "/v1/responses",
    error: '[503] Combo "default" failed — all targets exhausted',
    comboName: "default",
    apiKeyId: "key-no-body-test",
    apiKeyName: "no-body-test",
    startTime: Date.now() - 100,
  });

  const logs = await callLogs.getCallLogs({});
  const rejected = (logs.logs ?? logs).find?.(
    (l: { apiKeyName?: string | null }) => l.apiKeyName === "no-body-test"
  );
  assert.ok(rejected, "expected a call_logs row even without a request body");
  assert.equal(rejected.hasRequestBody, false);
});

test("summarizeComboAttemptedModels lists the models a combo was configured with", () => {
  assert.equal(
    summarizeComboAttemptedModels([
      { model: "gemini/gemma-4-31b-it", providerId: "gemini" },
      { model: "gemini/gemma-4-26b-a4b-it", providerId: "gemini" },
    ]),
    "gemini/gemma-4-31b-it, gemini/gemma-4-26b-a4b-it"
  );
});

test("summarizeComboAttemptedModels skips non-model entries (e.g. nested combo-refs)", () => {
  assert.equal(
    summarizeComboAttemptedModels([
      { model: "openai/gpt-5", providerId: "openai" },
      { kind: "combo-ref", comboName: "backup-combo" },
    ]),
    "openai/gpt-5"
  );
});

test("summarizeComboAttemptedModels falls back to '-' for empty, missing, or invalid input", () => {
  assert.equal(summarizeComboAttemptedModels([]), "-");
  assert.equal(summarizeComboAttemptedModels(undefined), "-");
  assert.equal(summarizeComboAttemptedModels(null), "-");
  assert.equal(summarizeComboAttemptedModels("not-an-array"), "-");
  assert.equal(summarizeComboAttemptedModels([{ kind: "combo-ref" }, { foo: "bar" }]), "-");
});
