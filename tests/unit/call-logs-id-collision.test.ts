// #14451: call_logs.id must not be a 6-char UUID prefix. Two attempts that share
// that prefix (birthday collision, or fail-then-fallback in one handleChatCore)
// must both land as rows. UNIQUE on an explicit durable id must retry with a
// generated id, not swallow the row. Dashboard request.* events still pair on
// the short live-topology token.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-call-log-id-collision-"));
process.env.DATA_DIR = testDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const { persistAttemptLogs } = await import("../../open-sse/handlers/chatCore/attemptLogging.ts");
const { on } = await import("../../src/lib/events/eventBus.ts");

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function baseCtx(overrides: Record<string, unknown> = {}) {
  const pendingRequestId = (overrides.pendingRequestId as string) ?? "pending-shared";
  return {
    traceId: overrides.traceId ?? pendingRequestId,
    provider: "openai",
    connectionId: "conn-1",
    model: "gpt-x",
    skillRequestId: "skill-1",
    detailedLoggingEnabled: false,
    reqLogger: null,
    pendingRequestId,
    clientRawRequest: { endpoint: "/v1/chat/completions" },
    requestedModel: "gpt-x-requested",
    credentials: { connectionId: "cred-conn" },
    startTime: Date.now(),
    body: { messages: [{ role: "user", content: "hi" }] },
    sourceFormat: "openai",
    targetFormat: "openai",
    comboName: null,
    comboStepId: null,
    comboExecutionKey: null,
    tokensCompressed: 0,
    apiKeyInfo: { id: "key-1", name: "Key One" },
    noLogEnabled: false,
    ...overrides,
  } as Parameters<typeof persistAttemptLogs>[1];
}

function clearCallLogs() {
  coreDb.getDbInstance().prepare("DELETE FROM call_logs").run();
}

function allCallLogRows(): Array<{ id: string; status: number }> {
  return coreDb
    .getDbInstance()
    .prepare("SELECT id, status FROM call_logs ORDER BY status, id")
    .all() as Array<{ id: string; status: number }>;
}

before(async () => {
  await coreDb.ensureDbInitialized();
});

after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("saveCallLog without an id persists a UUID primary key, not Date.now()-counter", async () => {
  clearCallLogs();
  await callLogs.saveCallLog({
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "test-model",
    provider: "test-provider",
    duration: 1,
    tokens: { in: 1, out: 1 },
  });
  assert.equal(await callLogs.waitForCallLogSaves(10_000), true);
  const rows = allCallLogRows();
  assert.equal(rows.length, 1);
  assert.match(rows[0].id, UUID_RE);
  assert.doesNotMatch(rows[0].id, /^\d+-\d+$/);
});

test("two persistAttemptLogs sharing a 6-char dashboard traceId both land as rows", async () => {
  clearCallLogs();
  const traceId = "9cfcc2";
  const lifecycleIds: string[] = [];
  const offCompleted = on("request.completed", (payload) => {
    lifecycleIds.push(payload.id);
  });
  const offFailed = on("request.failed", (payload) => {
    lifecycleIds.push(payload.id);
  });
  try {
    persistAttemptLogs({ status: 502, error: "first attempt" }, baseCtx({ traceId }));
    persistAttemptLogs({ status: 200, tokens: { input: 1, output: 2 } }, baseCtx({ traceId }));
    assert.equal(await callLogs.waitForCallLogSaves(10_000), true);
    await new Promise((resolve) => setImmediate(resolve));
    await new Promise((resolve) => setImmediate(resolve));

    const rows = allCallLogRows();
    assert.equal(
      rows.length,
      2,
      "fail-then-success with the same 6-char traceId must not drop a row"
    );
    assert.equal(new Set(rows.map((row) => row.id)).size, 2);
    assert.deepEqual(
      rows.map((row) => row.status),
      [200, 502]
    );
    assert.ok(
      rows.every((row) => row.id !== traceId),
      "SQLite primary key must not be the dashboard traceId"
    );
    assert.ok(rows.every((row) => UUID_RE.test(row.id)));

    const details = await Promise.all(rows.map((row) => callLogs.getCallLogById(row.id)));
    assert.deepEqual(
      details.map((row) => row?.status).sort((a, b) => Number(a) - Number(b)),
      [200, 502]
    );
    assert.ok(
      details.every((row) => row?.detailState === "ready" && row.error !== undefined),
      "each row must still open its own artifact after both attempts persist"
    );

    assert.ok(
      lifecycleIds.includes(traceId),
      "dashboard request.completed/failed must still pair on the short traceId"
    );
  } finally {
    offCompleted();
    offFailed();
  }
});

test("saveCallLog retries UNIQUE on an explicit id instead of dropping the second row", async () => {
  clearCallLogs();
  const collidingId = "durable-call-log-id-collision";
  await callLogs.saveCallLog({
    id: collidingId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 500,
    model: "test-model",
    provider: "test-provider",
    duration: 2,
    tokens: { in: 0, out: 0 },
    error: "first",
  });
  await callLogs.saveCallLog({
    id: collidingId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "test-model",
    provider: "test-provider",
    duration: 3,
    tokens: { in: 2, out: 3 },
  });
  assert.equal(await callLogs.waitForCallLogSaves(10_000), true);

  const rows = allCallLogRows();
  assert.equal(rows.length, 2, "UNIQUE must not swallow the second insert");
  assert.deepEqual(
    rows.map((row) => row.status),
    [200, 500]
  );
  assert.equal(new Set(rows.map((row) => row.id)).size, 2);
  assert.ok(rows.some((row) => row.id === collidingId));
  const regenerated = rows.find((row) => row.id !== collidingId);
  assert.ok(regenerated);
  assert.match(regenerated.id, UUID_RE);
});

test("chatCore does not truncate randomUUID to six hex chars for the request trace", () => {
  const src = readFileSync(
    fileURLToPath(new URL("../../open-sse/handlers/chatCore.ts", import.meta.url)),
    "utf8"
  );
  assert.doesNotMatch(
    src,
    /crypto\.randomUUID\(\)\.slice\(0,\s*6\)/,
    "6-char UUID prefixes collide in production call_logs (#14451)"
  );
});
