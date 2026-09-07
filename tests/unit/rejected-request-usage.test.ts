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
const { recordRejectedRequestUsage, summarizeComboAttemptedModels, resolveRejectedComboProvider } =
  await import("../../src/sse/handlers/rejectedRequestUsage.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  usageHistory.clearPendingRequests();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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

  // call_logs visibility is preserved (dashboard/logs). saveCallLog is
  // fire-and-forget inside recordRejectedRequestUsage, so poll briefly for the
  // row instead of asserting synchronously after the await.
  let rejected: Array<{ apiKeyName?: string | null }> = [];
  for (let i = 0; i < 50 && rejected.length === 0; i++) {
    const logs = await callLogs.getCallLogs({});
    const list = (logs.logs ?? logs) as Array<{ apiKeyName?: string | null }>;
    rejected = (list ?? []).filter((l) => l.apiKeyName === "opencode-mac");
    if (rejected.length === 0) await new Promise((r) => setTimeout(r, 10));
  }
  assert.ok(rejected.length >= 1, "expected a call_logs row for the rejected request");
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

  // saveCallLog is fire-and-forget — poll briefly for the row.
  let rejected: { id: string; hasRequestBody: boolean } | undefined;
  for (let i = 0; i < 50 && !rejected; i++) {
    const logs = await callLogs.getCallLogs({});
    const list = (logs.logs ?? logs) as Array<{ apiKeyName?: string | null }>;
    const found = (list ?? []).find((l) => l.apiKeyName === "request-body-test");
    if (found) rejected = found as unknown as { id: string; hasRequestBody: boolean };
    else await new Promise((r) => setTimeout(r, 10));
  }
  assert.ok(rejected, "expected a call_logs row for the rejected request");
  assert.equal(rejected.hasRequestBody, true, "expected hasRequestBody to be true");

  const detail = await callLogs.getCallLogById(rejected.id);
  assert.ok(detail, "expected to load the call log detail");
  assert.deepEqual(detail!.requestBody, {
    model: "default",
    messages: [{ role: "user", content: "hello" }],
  });
});

// #12150 P2 item 7: recordRejectedRequestUsage persists the raw client body for
// a request rejected BEFORE the guardrail chain runs (circuit-breaker-open /
// combo-exhausted), so the video-bridge guardrail never got a chance to redact
// the transcript. The body is persisted defensively through
// redactVideoTranscriptFieldsForLog, so a rejected video request's stored log
// never retains the raw transcript cues.
test("#12150 P2 item 7: a rejected request's persisted body has its video transcript redacted", async () => {
  const SECRET = "top secret cue text";
  await recordRejectedRequestUsage({
    status: 503,
    model: "default",
    requestedModel: "default",
    provider: "-",
    endpoint: "/v1/chat/completions",
    error: "[503] Pipeline gate rejected",
    apiKeyId: "key-video-reject",
    apiKeyName: "video-reject-test",
    correlationId: "corr-video-reject",
    startTime: Date.now() - 10,
    requestBody: {
      model: "default",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "look at this video" },
            {
              type: "input_video",
              video_url: "https://example.com/clip.mp4",
              transcript: { cues: [{ text: SECRET, startSeconds: 0, endSeconds: 2 }] },
            },
          ],
        },
      ],
    },
  });

  let rejected: { id: string } | undefined;
  for (let i = 0; i < 50 && !rejected; i++) {
    const logs = await callLogs.getCallLogs({});
    const list = (logs.logs ?? logs) as Array<{ apiKeyName?: string | null }>;
    const found = (list ?? []).find((l) => l.apiKeyName === "video-reject-test");
    if (found) rejected = found as unknown as { id: string };
    else await new Promise((r) => setTimeout(r, 10));
  }
  assert.ok(rejected, "expected a call_logs row for the rejected video request");

  const detail = await callLogs.getCallLogById(rejected.id);
  assert.ok(detail, "expected to load the call log detail");
  assert.equal(
    JSON.stringify(detail!.requestBody).includes(SECRET),
    false,
    "the rejected request's persisted body must not retain the raw video transcript"
  );
  const transcriptField = (
    detail!.requestBody as {
      messages: Array<{ content: Array<{ transcript?: unknown }> }>;
    }
  ).messages[0].content[1].transcript;
  assert.equal(transcriptField, "[redacted-video-transcript]");
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

  // saveCallLog is fire-and-forget — poll briefly for the row.
  let rejected: { id: string } | undefined;
  for (let i = 0; i < 50 && !rejected; i++) {
    const logs = await callLogs.getCallLogs({});
    const list = (logs.logs ?? logs) as Array<{ apiKeyName?: string | null }>;
    const found = (list ?? []).find((l) => l.apiKeyName === "no-body-test");
    if (found) rejected = found as unknown as { id: string };
    else await new Promise((r) => setTimeout(r, 10));
  }
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

test("#8867: resolveRejectedComboProvider keeps the provider label short for auto/* failures", () => {
  // The logs page builds quick-filter pills from call_logs.provider — a failed
  // auto/<family> used to write every attempted model there and flood the filter row.
  assert.equal(resolveRejectedComboProvider("auto/gemma", "my-combo"), "auto");
  assert.equal(resolveRejectedComboProvider("auto/gemini", null), "auto");
  assert.equal(resolveRejectedComboProvider("auto/anything-at-all", undefined), "auto");
});

test("#8867: a non-auto combo failure is labelled with the combo name", () => {
  assert.equal(resolveRejectedComboProvider("gpt-5.6-sol", "balanced-load"), "balanced-load");
  assert.equal(resolveRejectedComboProvider(null, "balanced-load"), "balanced-load");
});

test("#8867: falls back to 'combo' when there is no name, and 'auto' never leaks into it", () => {
  assert.equal(resolveRejectedComboProvider("gpt-5.6-sol", null), "combo");
  assert.equal(resolveRejectedComboProvider(undefined, undefined), "combo");
  assert.equal(resolveRejectedComboProvider("", ""), "combo");
  // bare "auto" (no slash) is NOT a family request — it must not be collapsed
  assert.equal(resolveRejectedComboProvider("auto", "named-combo"), "named-combo");
});
