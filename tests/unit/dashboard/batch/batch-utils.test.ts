/**
 * Unit tests for src/app/(dashboard)/dashboard/batch/batch-utils.ts
 *
 * The two mappers in batch-utils.ts are pure functions (no DB calls, no IO).
 * They are the canonical conversion between the upstream OpenAI-compatible
 * API snake_case shape and the camelCase BatchRecord / FileRecord shapes
 * used inside OmniRoute. This test pins that mapping so any accidental
 * field rename surfaces in CI rather than as a silent dashboard regression.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { mapBatchApiToRecord, mapFileApiToRecord } from "../../../../src/app/(dashboard)/dashboard/batch/batch-utils.ts";

test("mapBatchApiToRecord copies every camelCase field from the API response", () => {
  const apiResponse = {
    id: "batch_abc123",
    object: "batch",
    endpoint: "/v1/chat/completions",
    completion_window: "24h",
    status: "in_progress",
    input_file_id: "file-input-1",
    output_file_id: "file-output-1",
    error_file_id: null,
    created_at: 1_700_000_000,
    in_progress_at: 1_700_000_010,
    expires_at: 1_700_086_400,
    finalizing_at: null,
    completed_at: null,
    failed_at: null,
    expired_at: null,
    cancelling_at: null,
    cancelled_at: null,
    request_counts: { total: 100, completed: 60, failed: 0 },
    metadata: { tag: "nightly-regression" },
    errors: null,
    model: "gpt-4o-mini",
    usage: { total_tokens: 12345 },
  };

  const record = mapBatchApiToRecord(apiResponse);

  // Identity / passthrough fields
  assert.equal(record.id, "batch_abc123");
  assert.equal(record.endpoint, "/v1/chat/completions");
  assert.equal(record.completionWindow, "24h");
  assert.equal(record.status, "in_progress");
  assert.equal(record.inputFileId, "file-input-1");
  assert.equal(record.outputFileId, "file-output-1");
  assert.equal(record.errorFileId, null);

  // Date stamps
  assert.equal(record.createdAt, 1_700_000_000);
  assert.equal(record.inProgressAt, 1_700_000_010);
  assert.equal(record.expiresAt, 1_700_086_400);
  assert.equal(record.finalizingAt, null);
  assert.equal(record.completedAt, null);
  assert.equal(record.failedAt, null);
  assert.equal(record.expiredAt, null);
  assert.equal(record.cancellingAt, null);
  assert.equal(record.cancelledAt, null);

  // Request counts — flatten nested object
  assert.equal(record.requestCountsTotal, 100);
  assert.equal(record.requestCountsCompleted, 60);
  assert.equal(record.requestCountsFailed, 0);

  // Optional structured fields
  assert.deepEqual(record.metadata, { tag: "nightly-regression" });
  assert.equal(record.errors, null);
  assert.equal(record.model, "gpt-4o-mini");
  assert.deepEqual(record.usage, { total_tokens: 12345 });
});

test("mapBatchApiToRecord defaults missing request_counts sub-fields to zero", () => {
  // The OpenAI-compatible API omits `request_counts` entirely while the batch
  // is still in the validating phase. The mapper must not produce NaN/undefined.
  const apiResponse = {
    id: "batch_zero",
    object: "batch",
    endpoint: "/v1/chat/completions",
    completion_window: "24h",
    status: "validating",
    input_file_id: "file-input-1",
    output_file_id: null,
    error_file_id: null,
    created_at: 1_700_000_000,
    in_progress_at: null,
    expires_at: null,
    finalizing_at: null,
    completed_at: null,
    failed_at: null,
    expired_at: null,
    cancelling_at: null,
    cancelled_at: null,
    // request_counts intentionally absent
    metadata: null,
    errors: null,
    model: null,
    usage: null,
  };

  const record = mapBatchApiToRecord(apiResponse);

  assert.equal(record.requestCountsTotal, 0);
  assert.equal(record.requestCountsCompleted, 0);
  assert.equal(record.requestCountsFailed, 0);
  assert.equal(record.status, "validating");
  assert.equal(record.metadata, null);
  assert.equal(record.model, null);
  assert.equal(record.usage, null);
});

test("mapBatchApiToRecord partially-fills request_counts when some sub-fields are missing", () => {
  // Defensive: a buggy upstream might send { total: 5 } without completed/failed.
  // The `?? 0` fallback should still kick in for the absent sub-fields.
  const apiResponse = {
    id: "batch_partial",
    object: "batch",
    endpoint: "/v1/chat/completions",
    completion_window: "24h",
    status: "in_progress",
    input_file_id: "file-input-1",
    output_file_id: null,
    error_file_id: null,
    created_at: 1_700_000_000,
    in_progress_at: null,
    expires_at: null,
    finalizing_at: null,
    completed_at: null,
    failed_at: null,
    expired_at: null,
    cancelling_at: null,
    cancelled_at: null,
    request_counts: { total: 5 },
    metadata: null,
    errors: null,
    model: null,
    usage: null,
  };

  const record = mapBatchApiToRecord(apiResponse);
  assert.equal(record.requestCountsTotal, 5);
  assert.equal(record.requestCountsCompleted, 0);
  assert.equal(record.requestCountsFailed, 0);
});

test("mapFileApiToRecord translates the snake_case file API payload", () => {
  const apiResponse = {
    id: "file-abc",
    object: "file",
    bytes: 4096,
    created_at: 1_700_000_000,
    filename: "nightly.jsonl",
    purpose: "batch",
    expires_at: 1_700_086_400,
  };

  const record = mapFileApiToRecord(apiResponse);

  assert.equal(record.id, "file-abc");
  assert.equal(record.bytes, 4096);
  assert.equal(record.createdAt, 1_700_000_000);
  assert.equal(record.filename, "nightly.jsonl");
  assert.equal(record.purpose, "batch");
  assert.equal(record.expiresAt, 1_700_086_400);
});

test("mapFileApiToRecord preserves null/undefined expires_at and zero bytes", () => {
  const apiResponse = {
    id: "file-empty",
    object: "file",
    bytes: 0,
    created_at: 1_700_000_000,
    filename: "empty.jsonl",
    purpose: "batch",
    expires_at: null,
  };

  const record = mapFileApiToRecord(apiResponse);

  assert.equal(record.bytes, 0);
  assert.equal(record.expiresAt, null);
});

test("mapBatchApiToRecord and mapFileApiToRecord return independent objects", () => {
  // Regression guard: returning the same object reference would let one
  // caller's mutations leak into another's view of the data.
  const batchApi = {
    id: "batch_1",
    object: "batch",
    endpoint: "/v1/chat/completions",
    completion_window: "24h",
    status: "validating",
    input_file_id: "f",
    output_file_id: null,
    error_file_id: null,
    created_at: 1,
    in_progress_at: null,
    expires_at: null,
    finalizing_at: null,
    completed_at: null,
    failed_at: null,
    expired_at: null,
    cancelling_at: null,
    cancelled_at: null,
    request_counts: { total: 0, completed: 0, failed: 0 },
    metadata: null,
    errors: null,
    model: null,
    usage: null,
  };
  const a = mapBatchApiToRecord(batchApi);
  const b = mapBatchApiToRecord(batchApi);
  assert.notStrictEqual(a, b);
  a.metadata = { mutated: true };
  assert.equal(b.metadata, null, "second record must not see mutation of the first");
});
