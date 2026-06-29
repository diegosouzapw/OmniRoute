import test from "node:test";
import assert from "node:assert/strict";
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
    .get(testId) as any;
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
    .get(testId) as any;
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
  const found = logs.find((l: any) => l.id === testId);
  assert.ok(found, "log entry should be found via getCallLogs");
  assert.equal(found.correlationId, "cid-roundtrip-test");

  db.prepare("DELETE FROM call_logs WHERE id = ?").run(testId);
});

test("call_logs table has correlation_id column", () => {
  const db = getDbInstance();
  const columns = db.prepare("PRAGMA table_info(call_logs)").all() as any[];
  const colNames = columns.map((c: any) => c.name);
  assert.ok(colNames.includes("correlation_id"), "call_logs should have correlation_id column");

  const indexes = db.prepare("PRAGMA index_list(call_logs)").all() as any[];
  const idxNames = indexes.map((i: any) => i.name);
  assert.ok(
    idxNames.includes("idx_cl_correlation_id"),
    "call_logs should have idx_cl_correlation_id index"
  );
});
