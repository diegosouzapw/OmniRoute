// Rejected handler requests leave a queryable call_logs row; admitted ones do not.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ISOLATED_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-handler-reject-"));
process.env.DATA_DIR = ISOLATED_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "handler-reject-test-secret";

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const chatHandler = await import("../../src/sse/handlers/chat.ts");

type RejectionRow = {
  status?: number;
  model?: string;
  error?: string | null;
  duration?: number;
  correlationId?: string;
  apiKeyId?: string | null;
  path?: string;
};

function uniqueCorrelationId(label: string): string {
  return `handler-reject-${label}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

function chatRequest(
  url: string,
  payload: unknown,
  correlationId: string,
  extra?: HeadersInit
): Request {
  return new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-correlation-id": correlationId,
      ...(extra ?? {}),
    },
    body: JSON.stringify(payload),
  });
}

async function rowsByCorrelation(correlationId: string): Promise<Array<RejectionRow>> {
  // The rejection log is fire-and-forget (never holds the rejection path),
  // so poll briefly instead of asserting synchronously after the await.
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    await callLogs.waitForCallLogSaves(1_000);
    const found = await callLogs.getCallLogs({ correlationId, limit: 50 });
    const rows = (Array.isArray(found) ? found : []).filter(
      (row: RejectionRow) => row.correlationId === correlationId
    );
    if (rows.length > 0) return rows;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  return [];
}

async function noRowsFor(correlationId: string): Promise<Array<RejectionRow>> {
  await callLogs.waitForCallLogSaves(500);
  const found = await callLogs.getCallLogs({ correlationId, limit: 50 });
  return (Array.isArray(found) ? found : []).filter(
    (row: RejectionRow) => row.correlationId === correlationId
  );
}

test.after(() => {
  try {
    usageHistory.clearPendingRequests();
  } catch {}
  try {
    apiKeysDb.resetApiKeyState();
  } catch {}
  core.resetDbInstance();
  fs.rmSync(ISOLATED_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("rejects invalid body with one 400 log line", async () => {
  const correlationId = uniqueCorrelationId("invalid-body");
  const response = await chatHandler.handleChat(
    chatRequest(
      "http://localhost/v1/chat/completions",
      { model: "openai/gpt-4.1", messages: "not-an-array" },
      correlationId
    ),
    null,
    null,
    correlationId
  );
  assert.equal(response.status, 400);
  const payload = (await response.clone().json()) as { error?: { code?: string } };
  assert.equal(payload.error?.code, "bad_request");

  const rows = await rowsByCorrelation(correlationId);
  assert.equal(rows.length, 1, "an invalid body must leave exactly one call_logs row");
  assert.equal(rows[0].status, 400);
  assert.match(rows[0].error ?? "", /invalid_request|bad_request|messages|unknown/);
  assert.equal(rows[0].duration, 0);
});

test("rejects missing model with one 400 log line", async () => {
  const correlationId = uniqueCorrelationId("missing-model");
  const response = await chatHandler.handleChat(
    chatRequest(
      "http://localhost/v1/chat/completions",
      { messages: [{ role: "user", content: "hi" }] },
      correlationId
    ),
    null,
    null,
    correlationId
  );
  assert.equal(response.status, 400);

  const rows = await rowsByCorrelation(correlationId);
  assert.equal(rows.length, 1, "a missing model must leave exactly one call_logs row");
  assert.equal(rows[0].status, 400);
  assert.equal(rows[0].duration, 0);
});

test("rejects disabled key with an attributed 403 line", async () => {
  const created = await apiKeysDb.createApiKey("Reject Key", "machine-reject");
  await apiKeysDb.updateApiKeyPermissions(created.id, { isActive: false });
  const correlationId = uniqueCorrelationId("disabled-key");
  const response = await chatHandler.handleChat(
    chatRequest(
      "http://localhost/v1/chat/completions",
      { model: "openai/gpt-4.1", messages: [{ role: "user", content: "hi" }] },
      correlationId,
      { Authorization: `Bearer ${created.key}` }
    ),
    null,
    null,
    correlationId
  );
  assert.equal(response.status, 403);

  const rows = await rowsByCorrelation(correlationId);
  assert.equal(rows.length, 1, "a disabled key must leave exactly one call_logs row");
  assert.equal(rows[0].status, 403);
  assert.equal(rows[0].apiKeyId, created.id);
});

test("keeps response status and error code", async () => {
  const correlationId = uniqueCorrelationId("untouched");
  const response = await chatHandler.handleChat(
    chatRequest(
      "http://localhost/v1/chat/completions",
      { model: "openai/gpt-4.1", messages: "not-an-array" },
      correlationId
    ),
    null,
    null,
    correlationId
  );
  assert.equal(response.status, 400);
  const payload = (await response.clone().json()) as { error?: { code?: string } };
  assert.equal(payload.error?.code, "bad_request");
  await rowsByCorrelation(correlationId);
});

test("admitted then dispatched writes no rejection line", async () => {
  const correlationId = uniqueCorrelationId("admitted");
  const response = await chatHandler.handleChat(
    chatRequest(
      "http://localhost/v1/chat/completions",
      { model: "openai/gpt-4.1", messages: [{ role: "user", content: "hi" }] },
      correlationId
    ),
    null,
    null,
    correlationId
  );
  void response;
  const rows = await noRowsFor(correlationId);
  assert.ok(
    rows.every((row) => !(row.duration === 0 && row.error)),
    "no rejection row may appear for an admitted request"
  );
});
