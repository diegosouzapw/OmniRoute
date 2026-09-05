// tests/unit/attempt-logging-early-keepalive-merge.test.ts
// End-to-end proof that bytes withEarlyStreamKeepalive writes directly to
// the client (outside the handler's own reqLogger) actually reach the
// persisted call-log row's pipeline.streamChunks.client, prepended in the
// order they were sent — the gap flagged against the real 2026-08-13
// incident: OmniRoute's own call-log artifact never showed the keepalive
// frames that were actually on the wire, only what the inner handler
// produced. Uses a real temp DB + persisted-row polling, same pattern as
// tests/unit/chatcore-attempt-logging.test.ts.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-keepalive-merge-test-"));
process.env.DATA_DIR = testDataDir;

const coreDb = await import("../../../src/lib/db/core.ts");
const { getCallLogById } = await import("../../../src/lib/usage/callLogs.ts");
const { persistAttemptLogs } = await import("../../../open-sse/handlers/chatCore/attemptLogging.ts");
const { recordEarlyKeepaliveBytes, takeEarlyKeepaliveBytes } =
  await import("../../../open-sse/utils/earlyKeepaliveByteBuffer.ts");

function baseCtx(overrides: Record<string, unknown> = {}) {
  return {
    provider: "openai",
    connectionId: "conn-1",
    model: "gpt-x",
    skillRequestId: "skill-1",
    detailedLoggingEnabled: true,
    reqLogger: null,
    pendingRequestId: "REPLACE",
    clientRawRequest: { endpoint: "/v1/responses" },
    requestedModel: "gpt-x-requested",
    credentials: { connectionId: "conn-1" },
    startTime: Date.now(),
    body: { input: [{ role: "user", content: "hi" }] },
    sourceFormat: "openai-responses",
    targetFormat: "openai-responses",
    comboName: null,
    comboStepId: null,
    comboExecutionKey: null,
    tokensCompressed: 0,
    apiKeyInfo: { id: "key-1", name: "Key One" },
    noLogEnabled: false,
    ...overrides,
  } as Parameters<typeof persistAttemptLogs>[1];
}

async function pollForCallLog(id: string, tries = 120) {
  for (let i = 0; i < tries; i++) {
    const row = await getCallLogById(id);
    if (row) return row as Record<string, unknown>;
    await new Promise((r) => setTimeout(r, 20));
  }
  return null;
}

before(async () => {
  await coreDb.ensureDbInitialized();
});

after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("bytes recorded before persistAttemptLogs are prepended into pipeline.streamChunks.client", async () => {
  const id = "attempt-keepalive-merge-1";
  const correlationId = "corr-keepalive-merge-1";
  recordEarlyKeepaliveBytes(correlationId, "[00:00:00.100] : keepalive\n\n");
  recordEarlyKeepaliveBytes(
    correlationId,
    '[00:00:00.200] event: response.output_item.added\ndata: {"item":{"id":"rs_keepalive"}}\n\n'
  );

  persistAttemptLogs(
    { status: 200 },
    baseCtx({
      pendingRequestId: id,
      correlationId,
      reqLogger: {
        getPipelinePayloads: () => ({
          streamChunks: { client: ["[00:00:05.000] real body chunk"] },
        }),
      },
    })
  );

  const row = await pollForCallLog(id);
  assert.ok(row, "call log row should be persisted");
  const pipeline = row.pipelinePayloads as { streamChunks?: { client?: string[] } };
  assert.deepEqual(pipeline.streamChunks?.client, [
    "[00:00:00.100] : keepalive\n\n",
    '[00:00:00.200] event: response.output_item.added\ndata: {"item":{"id":"rs_keepalive"}}\n\n',
    "[00:00:05.000] real body chunk",
  ]);
});

test("bytes are consumed exactly once — a repeat lookup for the same correlationId finds nothing left to merge", async () => {
  const correlationId = "corr-keepalive-merge-2";
  recordEarlyKeepaliveBytes(correlationId, "[00:00:00.100] : keepalive\n\n");

  const first = takeEarlyKeepaliveBytes(correlationId);
  assert.equal(first.length, 1);

  const second = takeEarlyKeepaliveBytes(correlationId);
  assert.deepEqual(second, []);
});

test("no correlationId on the attempt means no merge is attempted (existing streamChunks untouched)", async () => {
  const id = "attempt-keepalive-merge-3";
  // No recordEarlyKeepaliveBytes call at all for this id/correlationId — proves
  // the merge path is a strict no-op, not a silent create-empty-array side effect.
  persistAttemptLogs(
    { status: 200 },
    baseCtx({
      pendingRequestId: id,
      correlationId: null,
      reqLogger: {
        getPipelinePayloads: () => ({
          streamChunks: { client: ["[00:00:05.000] real body chunk"] },
        }),
      },
    })
  );

  const row = await pollForCallLog(id);
  assert.ok(row);
  const pipeline = row.pipelinePayloads as { streamChunks?: { client?: string[] } };
  assert.deepEqual(pipeline.streamChunks?.client, ["[00:00:05.000] real body chunk"]);
});

test("detailedLoggingEnabled=false skips the merge even when early bytes are buffered (matches the existing streamChunks capture gate)", async () => {
  const id = "attempt-keepalive-merge-4";
  const correlationId = "corr-keepalive-merge-4";
  recordEarlyKeepaliveBytes(correlationId, "[00:00:00.100] : keepalive\n\n");

  persistAttemptLogs(
    { status: 200 },
    baseCtx({
      pendingRequestId: id,
      correlationId,
      detailedLoggingEnabled: false,
      reqLogger: null,
    })
  );

  const row = await pollForCallLog(id);
  assert.ok(row);
  // Buffer must still hold the entry — a disabled-detailed-logging attempt
  // must not silently drain another (later, detailed-logging-enabled) attempt's
  // buffered bytes out from under it.
  assert.equal(takeEarlyKeepaliveBytes(correlationId).length, 1);
});
