import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { getDbInstance } from "../../src/lib/db/core.ts";
import { saveCallLog, getCallLogs } from "../../src/lib/usage/callLogs.ts";

test("saveCallLog persists to DB with correlationId", async () => {
  const db = getDbInstance();
  const testId = `test-corr-${Date.now()}`;

  await saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "test-model",
    provider: "test-provider",
    duration: 1234,
    tokens: { in: 10, out: 5 },
    correlationId: "test-correlation-id-123",
    sourceFormat: "openai",
    targetFormat: "openai",
  });

  const row = db
    .prepare("SELECT id, correlation_id, status, model FROM call_logs WHERE id = ?")
    .get(testId) as Record<string, unknown>;
  assert.ok(row, "row should exist in call_logs");
  assert.equal(row.id, testId);
  assert.equal(row.correlation_id, "test-correlation-id-123");
  assert.equal(row.status, 200);
  assert.equal(row.model, "test-model");

  db.prepare("DELETE FROM call_logs WHERE id = ?").run(testId);
});

test("saveCallLog persists null correlationId when not provided", async () => {
  const db = getDbInstance();
  const testId = `test-nocorr-${Date.now()}`;

  await saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 404,
    model: "test-model-2",
    provider: "test-provider",
    duration: 500,
    tokens: {},
  });

  const row = db
    .prepare("SELECT id, correlation_id FROM call_logs WHERE id = ?")
    .get(testId) as Record<string, unknown>;
  assert.ok(row, "row should exist");
  assert.equal(row.correlation_id, null, "correlation_id should be null when not provided");

  db.prepare("DELETE FROM call_logs WHERE id = ?").run(testId);
});

test("getCallLogs returns correlationId", async () => {
  const db = getDbInstance();
  const testId = `test-getcid-${Date.now()}`;

  await saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "test-model-3",
    provider: "test-provider",
    duration: 100,
    tokens: { in: 20, out: 10 },
    correlationId: "cid-roundtrip-test",
  });

  const logs = await getCallLogs({ limit: 100 });
  const found = logs.find((l: { id: string }) => l.id === testId);
  assert.ok(found, "log entry should be found via getCallLogs");
  assert.equal(found.correlationId, "cid-roundtrip-test");

  db.prepare("DELETE FROM call_logs WHERE id = ?").run(testId);
});

test("call_logs table has correlation_id column", () => {
  const db = getDbInstance();
  const columns = db.prepare("PRAGMA table_info(call_logs)").all() as { name: string }[];
  const colNames = columns.map((c) => c.name);
  assert.ok(colNames.includes("correlation_id"), "call_logs should have correlation_id column");

  const indexes = db.prepare("PRAGMA index_list(call_logs)").all() as { name: string }[];
  const idxNames = indexes.map((i) => i.name);
  assert.ok(
    idxNames.includes("idx_cl_correlation_id"),
    "call_logs should have idx_cl_correlation_id index"
  );
});

test("call_logs table has model_pinned column", () => {
  const db = getDbInstance();
  const columns = db.prepare("PRAGMA table_info(call_logs)").all() as { name: string }[];
  const colNames = columns.map((c) => c.name);
  assert.ok(colNames.includes("model_pinned"), "call_logs should have model_pinned column");
});

test("call_logs table has persisted cache result columns", () => {
  const db = getDbInstance();
  const columns = db.prepare("PRAGMA table_info(call_logs)").all() as { name: string }[];
  const colNames = columns.map((column) => column.name);
  for (const column of [
    "cache_status",
    "cache_scope",
    "cache_scope_id",
    "cache_avoided_input_tokens",
    "cache_avoided_output_tokens",
    "billing_contract_version",
    "routed_model_id",
    "provider_model_id",
    "billing_model_id",
  ]) {
    assert.ok(colNames.includes(column), `call_logs should have ${column} column`);
  }
});

test("saveCallLog returns a root cacheResult for semantic hits", async () => {
  const db = getDbInstance();
  const testId = `test-cache-result-${Date.now()}`;

  await saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "cached-model",
    provider: "test-provider",
    tokens: { in: 0, out: 0 },
    cacheSource: "semantic",
    billingContractVersion: 2,
    apiKeyId: "downstream-key-1",
    cacheResult: {
      source: "semantic",
      status: "hit",
      scope: "api_key",
      scopeId: "downstream-key-1",
      avoidedInputTokens: 100,
      avoidedOutputTokens: 25,
    },
  });

  const logs = await getCallLogs({ limit: 100 });
  const found = logs.find((log: { id: string }) => log.id === testId);
  assert.ok(found, "semantic cache result should be returned by getCallLogs");
  assert.equal(found.contractVersion, 2);
  assert.equal(found.routedModelId, "cached-model");
  assert.equal(found.billingModelId, null);
  assert.deepEqual(found.billingComponents, []);
  assert.deepEqual(found.cacheResult, {
    source: "semantic",
    status: "hit",
    scope: "api_key",
    scopeId: "downstream-key-1",
    avoidedInputTokens: 100,
    avoidedOutputTokens: 25,
  });

  db.prepare("DELETE FROM call_logs WHERE id = ?").run(testId);
});

test("migration 123 upgrades an existing call_logs table", () => {
  const db = new DatabaseSync(":memory:");
  try {
    db.exec("CREATE TABLE call_logs (id TEXT PRIMARY KEY)");
    db.exec(fs.readFileSync("src/lib/db/migrations/123_call_logs_cache_result.sql", "utf8"));
    const columns = db.prepare("PRAGMA table_info(call_logs)").all() as { name: string }[];
    const columnNames = columns.map((column) => column.name);
    for (const column of [
      "cache_status",
      "cache_scope",
      "cache_scope_id",
      "cache_avoided_input_tokens",
      "cache_avoided_output_tokens",
      "billing_contract_version",
      "routed_model_id",
      "provider_model_id",
      "billing_model_id",
    ]) {
      assert.ok(columnNames.includes(column), `migration should add ${column}`);
    }
  } finally {
    db.close();
  }
});

test("contract v2 exposes canonical model, per-key miss scope, and billing components", async () => {
  const db = getDbInstance();
  const testId = `test-contract-v2-${Date.now()}`;

  await saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "upstream-model",
    requestedModel: "main/gpt-5.5",
    provider: "provider-node-1",
    connectionId: "connection-1",
    tokens: {
      input: 120,
      output: 45,
      reasoning: 5,
    },
    apiKeyId: "downstream-key-1",
    billingContractVersion: 2,
    routedModelId: "main/gpt-5.5",
    providerModelId: "gpt-5.5",
    billingModelId: "gpt-5.5",
  });

  const logs = await getCallLogs({ apiKey: "downstream-key-1", limit: 100 });
  const found = logs.find((log: { id: string }) => log.id === testId);
  assert.ok(found);
  assert.equal(found.contractVersion, 2);
  assert.equal(found.routedModelId, "main/gpt-5.5");
  assert.equal(found.providerModelId, "gpt-5.5");
  assert.equal(found.billingModelId, "gpt-5.5");
  assert.deepEqual(found.cacheResult, {
    source: "none",
    status: "miss",
    scope: "api_key",
    scopeId: "downstream-key-1",
    avoidedInputTokens: 0,
    avoidedOutputTokens: 0,
  });
  assert.deepEqual(found.billingComponents, [
    { type: "input_uncached", quantity: 120, cacheTtlSeconds: null },
    { type: "output", quantity: 40, cacheTtlSeconds: null },
    { type: "reasoning", quantity: 5, cacheTtlSeconds: null },
  ]);

  db.prepare("DELETE FROM call_logs WHERE id = ?").run(testId);
});

test("contract v2 keeps routed and billing identities separate", async () => {
  const db = getDbInstance();
  const testId = `test-contract-v2-alias-${Date.now()}`;

  await saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/messages",
    status: 200,
    model: "upstream-model",
    requestedModel: "or/~anthropic/claude-sonnet-latest",
    provider: "provider-node-1",
    connectionId: "connection-1",
    tokens: { input: 10, output: 5 },
    apiKeyId: "downstream-key-1",
    billingContractVersion: 2,
    routedModelId: "or/~anthropic/claude-sonnet-latest",
    providerModelId: "anthropic/claude-sonnet-4.6",
    billingModelId: "claude-sonnet-latest",
  });

  const logs = await getCallLogs({ apiKey: "downstream-key-1", limit: 100 });
  const found = logs.find((log: { id: string }) => log.id === testId);
  assert.ok(found);
  assert.equal(found.routedModelId, "or/~anthropic/claude-sonnet-latest");
  assert.equal(found.providerModelId, "anthropic/claude-sonnet-4.6");
  assert.equal(found.billingModelId, "claude-sonnet-latest");

  db.prepare("DELETE FROM call_logs WHERE id = ?").run(testId);
});

test("saveCallLog persists modelPinned=true as 1", async () => {
  const db = getDbInstance();
  const testId = `test-pinned-${Date.now()}`;

  await saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "pinned-model",
    provider: "test-provider",
    duration: 500,
    tokens: { in: 10, out: 5 },
    modelPinned: true,
  });

  const row = db
    .prepare("SELECT id, model_pinned FROM call_logs WHERE id = ?")
    .get(testId) as Record<string, unknown>;
  assert.ok(row, "row should exist");
  assert.equal(row.model_pinned, 1, "model_pinned should be 1 when modelPinned=true");

  db.prepare("DELETE FROM call_logs WHERE id = ?").run(testId);
});

test("saveCallLog persists modelPinned=false as 0", async () => {
  const db = getDbInstance();
  const testId = `test-notpinned-${Date.now()}`;

  await saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "normal-model",
    provider: "test-provider",
    duration: 500,
    tokens: { in: 10, out: 5 },
    modelPinned: false,
  });

  const row = db
    .prepare("SELECT id, model_pinned FROM call_logs WHERE id = ?")
    .get(testId) as Record<string, unknown>;
  assert.ok(row, "row should exist");
  assert.equal(row.model_pinned, 0, "model_pinned should be 0 when modelPinned=false");

  db.prepare("DELETE FROM call_logs WHERE id = ?").run(testId);
});

test("getCallLogs returns modelPinned boolean", async () => {
  const db = getDbInstance();
  const testId = `test-pinned-roundtrip-${Date.now()}`;

  await saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "pinned-model-rt",
    provider: "test-provider",
    duration: 100,
    tokens: { in: 20, out: 10 },
    modelPinned: true,
  });

  const logs = await getCallLogs({ limit: 100 });
  const found = logs.find((l: { id: string }) => l.id === testId);
  assert.ok(found, "log entry should be found via getCallLogs");
  assert.equal(found.modelPinned, true, "getCallLogs should return modelPinned as boolean true");

  db.prepare("DELETE FROM call_logs WHERE id = ?").run(testId);
});
