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
const { getCallLogById } = await import("../../src/lib/usage/callLogs.ts");
const { persistAttemptLogs } = await import("../../open-sse/handlers/chatCore/attemptLogging.ts");

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

async function pollForCallLogStatus(id: string, status: number, tries = 120) {
  for (let i = 0; i < tries; i++) {
    const row = (await getCallLogById(id)) as Record<string, unknown> | null;
    if (row?.status === status) return row;
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
  fs.rmSync(testDataDir, { recursive: true, force: true });
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
  assert.equal(row.contractVersion, 1);
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
  persistAttemptLogs(
    {
      status: 200,
      cacheSource: "semantic",
      cacheResult: {
        source: "semantic",
        status: "hit",
        scope: "api_key",
        scopeId: "key-1",
        avoidedInputTokens: 21,
        avoidedOutputTokens: 8,
      },
    },
    baseCtx({
      pendingRequestId: id,
      apiKeyInfo: {
        id: "key-1",
        name: "Key One",
        scopes: ["cache:isolated"],
      },
    })
  );
  const row = await pollForCallLog(id);
  assert.ok(row);
  assert.equal(row.cacheSource, "semantic");
  assert.equal(row.contractVersion, 2);
  assert.equal(row.routedModelId, "gpt-x-requested");
  assert.equal(row.billingModelId, null);
  assert.deepEqual(row.billingComponents, []);
  assert.deepEqual(row.cacheResult, {
    source: "semantic",
    status: "hit",
    scope: "api_key",
    scopeId: "key-1",
    avoidedInputTokens: 21,
    avoidedOutputTokens: 8,
  });
});

test("persists the provider model observed in the upstream response", async () => {
  const id = "attempt-provider-model-1";
  persistAttemptLogs(
    {
      status: 200,
      providerResponse: { model: "anthropic/claude-sonnet-4.6" },
      responseBody: { model: "client-echo-must-not-win" },
      routedModelId: "or/anthropic/claude-sonnet-4.6",
      billingModelId: "claude-sonnet-4.6",
    },
    baseCtx({
      pendingRequestId: id,
      apiKeyInfo: {
        id: "key-1",
        name: "Key One",
        scopes: ["cache:isolated"],
      },
    })
  );
  const row = await pollForCallLog(id);
  assert.ok(row);
  assert.equal(row.routedModelId, "or/anthropic/claude-sonnet-4.6");
  assert.equal(row.providerModelId, "anthropic/claude-sonnet-4.6");
  assert.equal(row.billingModelId, "claude-sonnet-4.6");
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

test("one request id keeps one row and the final attempt replaces the failed attempt", async () => {
  const id = "attempt-final-wins-1";
  persistAttemptLogs(
    { status: 502, error: "first attempt failed", tokens: { input: 3, output: 0 } },
    baseCtx({
      pendingRequestId: id,
      connectionId: "failed-conn",
      startTime: Date.now() - 10,
    })
  );
  const failed = await pollForCallLogStatus(id, 502);
  assert.ok(failed);

  persistAttemptLogs(
    {
      status: 200,
      tokens: { input: 11, output: 7 },
      responseBody: { id: "final-response" },
    },
    baseCtx({
      pendingRequestId: id,
      connectionId: "final-conn",
      credentials: { connectionId: "final-conn" },
      startTime: Date.now() - 100,
    })
  );

  const final = await pollForCallLogStatus(id, 200);
  assert.ok(final);
  assert.equal(final.connectionId, "final-conn");
  assert.deepEqual(final.tokens, {
    in: 11,
    out: 7,
    cacheRead: null,
    cacheWrite: null,
    reasoning: null,
    compressed: 0,
  });
  assert.equal(final.error, null);

  const count = coreDb
    .getDbInstance()
    .prepare("SELECT COUNT(*) AS count FROM call_logs WHERE id = ?")
    .get(id) as { count: number };
  assert.equal(count.count, 1);
});
