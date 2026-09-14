// tests/unit/chatcore-attempt-logging.test.ts
// Characterization of persistAttemptLogs — the per-attempt call-log persistence extracted from
// handleChatCore (chatCore god-file decomposition, #3501). Uses a real temp DB and polls the
// persisted row (saveCallLog is async + fire-and-forget). Locks: the field mapping, the
// cacheSource semantic/upstream normalization, final credentials.connectionId attribution,
// credentials fallback, and error persistence.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-attempt-logging-test-"));
process.env.DATA_DIR = testDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const { getCallLogById, waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { persistAttemptLogs } = await import("../../open-sse/handlers/chatCore/attemptLogging.ts");
const { getAuditLog } = await import("../../src/lib/compliance/index.ts");

type CodexRotationEnvelope = {
  _omniroute?: {
    codexAccountRotation?: {
      initialConnectionId: unknown;
      finalConnectionId: unknown;
    };
  };
};

function baseCtx(overrides: Record<string, unknown> = {}) {
  return {
    provider: "openai",
    connectionId: "conn-1",
    model: "gpt-x",
    skillRequestId: "skill-1",
    detailedLoggingEnabled: false,
    reqLogger: null,
    pendingRequestId: "REPLACE",
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

async function pollForCallLog(id: string, tries = 120) {
  for (let i = 0; i < tries; i++) {
    const row = await getCallLogById(id);
    if (row) return row as Record<string, unknown>;
    await new Promise((r) => setTimeout(r, 20));
  }
  return null;
}

function getCodexAccountRotation(value: unknown) {
  if (!value || typeof value !== "object") return undefined;
  return (value as CodexRotationEnvelope)._omniroute?.codexAccountRotation;
}

before(async () => {
  await coreDb.ensureDbInitialized();
});

after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("persists a call log row with the mapped fields (default cacheSource=upstream)", async () => {
  const id = "attempt-basic-1";
  persistAttemptLogs(
    { status: 200, tokens: { input: 1, output: 2 } },
    baseCtx({ pendingRequestId: id, credentials: { connectionId: "conn-1" } })
  );
  const row = await pollForCallLog(id);
  assert.ok(row, "call log row should be persisted");
  assert.equal(row.status, 200);
  assert.equal(row.model, "gpt-x");
  assert.equal(row.provider, "openai");
  assert.equal(row.requestedModel, "gpt-x-requested");
  assert.equal(row.connectionId, "conn-1");
  assert.equal(row.cacheSource, "upstream");
});

test("uses final credentials connectionId when Codex failover rotates the account", async () => {
  const id = "attempt-codex-rotation-1";
  persistAttemptLogs(
    { status: 200, tokens: { input: 1, output: 2 }, responseBody: { id: "response-1" } },
    baseCtx({
      pendingRequestId: id,
      provider: "codex",
      connectionId: "initial-conn",
      credentials: { connectionId: "final-conn" },
    })
  );

  const row = await pollForCallLog(id);
  assert.ok(row);
  assert.equal(row.connectionId, "final-conn");
  assert.deepEqual(getCodexAccountRotation(row.requestBody), {
    initialConnectionId: "initial-conn",
    finalConnectionId: "final-conn",
  });
  assert.deepEqual(getCodexAccountRotation(row.responseBody), {
    initialConnectionId: "initial-conn",
    finalConnectionId: "final-conn",
  });
});

test("cacheSource 'semantic' is preserved", async () => {
  const id = "attempt-semantic-1";
  persistAttemptLogs({ status: 200, cacheSource: "semantic" }, baseCtx({ pendingRequestId: id }));
  const row = await pollForCallLog(id);
  assert.ok(row);
  assert.equal(row.cacheSource, "semantic");
});

test("connectionId falls back to credentials.connectionId when null, and error is persisted", async () => {
  const id = "attempt-fallback-1";
  persistAttemptLogs(
    { status: 502, error: "upstream boom" },
    baseCtx({ pendingRequestId: id, connectionId: null })
  );
  const row = await pollForCallLog(id);
  assert.ok(row);
  assert.equal(row.connectionId, "cred-conn");
  assert.equal(row.status, 502);
  assert.match(String(row.error ?? ""), /upstream boom/);
});

function duplicateHeartbeatBody() {
  return {
    choices: [
      {
        message: {
          tool_calls: [
            { function: { name: "heartbeat_respond", arguments: "{}" } },
            { function: { name: "heartbeat_respond", arguments: "{}" } },
          ],
        },
      },
    ],
  };
}

test("duplicate tool_calls in the assembled body writes provider.spec_violation audit", () => {
  persistAttemptLogs(
    { status: 200, responseBody: duplicateHeartbeatBody() },
    baseCtx({ pendingRequestId: "attempt-spec-violation-1", skillRequestId: "skill-spec-1" })
  );
  // logAuditEvent is synchronous; do not wait on the fire-and-forget saveCallLog.
  const rows = getAuditLog({ action: "provider.spec_violation", requestId: "skill-spec-1" });
  assert.equal(rows.length, 1);
  assert.equal(rows[0]?.resourceType, "provider_spec_violation");
  const details = rows[0]?.details;
  assert.ok(details && typeof details === "object");
  assert.equal(
    (details as { violation?: string }).violation,
    'duplicate tool_calls entry for "heartbeat_respond"'
  );
});

test("unique tool_calls do not write provider.spec_violation audit", () => {
  persistAttemptLogs(
    {
      status: 200,
      responseBody: {
        choices: [
          {
            message: {
              tool_calls: [
                { function: { name: "heartbeat_respond", arguments: "{}" } },
                { function: { name: "other_tool", arguments: "{}" } },
              ],
            },
          },
        ],
      },
    },
    baseCtx({ pendingRequestId: "attempt-spec-clean-1", skillRequestId: "skill-spec-clean-1" })
  );
  const rows = getAuditLog({
    action: "provider.spec_violation",
    requestId: "skill-spec-clean-1",
  });
  assert.equal(rows.length, 0);
});

test("two persistAttemptLogs with the same pendingRequestId both land in call_logs", async () => {
  const pendingId = "attempt-reuse-pending-1";
  const correlationId = "corr-reuse-pending-1";
  persistAttemptLogs(
    { status: 502, error: "first target boom" },
    baseCtx({ pendingRequestId: pendingId, correlationId, comboStepId: "step-1" }),
  );
  persistAttemptLogs(
    { status: 200, tokens: { input: 3, output: 4 } },
    baseCtx({ pendingRequestId: pendingId, correlationId, comboStepId: "step-2" }),
  );
  assert.equal(await waitForCallLogSaves(5_000), true);
  const db = coreDb.getDbInstance();
  const rows = db
    .prepare(
      "SELECT id, status, combo_step_id FROM call_logs WHERE correlation_id = ? ORDER BY rowid",
    )
    .all(correlationId) as Array<{ id: string; status: number; combo_step_id: string | null }>;
  assert.equal(rows.length, 2, "second combo attempt must not be swallowed by UNIQUE(id)");
  assert.equal(rows[0]?.status, 502);
  assert.equal(rows[1]?.status, 200);
  assert.equal(rows[0]?.id, pendingId);
  assert.notEqual(rows[1]?.id, pendingId);
  assert.equal(rows[0]?.combo_step_id, "step-1");
  assert.equal(rows[1]?.combo_step_id, "step-2");
});
