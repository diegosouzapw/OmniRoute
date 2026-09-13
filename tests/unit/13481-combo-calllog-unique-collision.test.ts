/**
 * #13481 — Combo failover: successful attempt's call log dropped because all
 * attempts shared `pendingRequestId` as the log id, triggering UNIQUE constraint
 * collisions. The fix uses the per-attempt `traceId` as the id (unique per attempt)
 * while keeping `pendingRequestId` in `correlationId` for grouping.
 *
 * Verifies: two `saveCallLog` calls under the same correlationId but different
 * trace ids must both be persisted and readable.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13481-calllog-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { saveCallLog, getCallLogById } = await import("../../src/lib/usageDb.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#13481 two attempts with different trace ids under same correlation both persist", async () => {
  const pendingRequestId = "req-test-13481-shared";
  const traceId1 = "trace-attempt-1-failed";
  const traceId2 = "trace-attempt-2-success";

  // Attempt 1: failed member (400)
  await saveCallLog({
    id: traceId1,
    method: "POST",
    path: "/v1/chat/completions",
    status: 400,
    model: "test-model",
    requestedModel: "test-model",
    provider: "test-provider",
    duration: 2000,
    tokens: {},
    error: "Model unavailable",
    correlationId: pendingRequestId,
  });

  // Attempt 2: successful member (200) — this was silently dropped before the fix
  // because it shared the same id as attempt 1.
  await saveCallLog({
    id: traceId2,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "test-model",
    requestedModel: "test-model",
    provider: "test-provider",
    duration: 5000,
    tokens: { prompt_tokens: 100, completion_tokens: 50 },
    correlationId: pendingRequestId,
  });

  // Both logs must be readable
  const log1 = await getCallLogById(traceId1);
  const log2 = await getCallLogById(traceId2);

  assert.ok(log1, "attempt 1 (400) must be persisted");
  assert.equal(log1!.status, 400, "attempt 1 status must be 400");
  assert.equal(log1!.correlationId, pendingRequestId, "attempt 1 correlationId must match");

  assert.ok(log2, "attempt 2 (200) must be persisted — not silently dropped");
  assert.equal(log2!.status, 200, "attempt 2 status must be 200");
  assert.equal(log2!.correlationId, pendingRequestId, "attempt 2 correlationId must match");
});
