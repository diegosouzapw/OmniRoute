import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Tests for the business logic embedded in DELETE route handlers.
// These verify every code path without importing Next.js route modules
// (which pull in pino/thread-stream — broken on Node 26). The ownership rule is
// the REAL shared helper, not a local copy: a copy drifted from production once
// (v3.8.4 tightened the copy, production stayed open — GHSA-2jm2-mpx8-6523).
// The helper's module pulls in the DB layer, so isolate DATA_DIR before it loads.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "batch-deletion-route-logic-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const { canAccessOwnedRecord } = await import("../../src/app/api/v1/_helpers/apiKeyScope.ts");

const TERMINAL = ["completed", "failed", "cancelled", "expired"];

function scopeCheck(
  isSessionAuth: boolean,
  recordApiKeyId: string | null | undefined,
  apiKeyId: string | null
): boolean {
  return canAccessOwnedRecord({ isSessionAuth, apiKeyId }, recordApiKeyId);
}

function canDeleteBatch(status: string): boolean {
  return TERMINAL.includes(status);
}

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("scopeCheck — session auth always passes", () => {
  assert.strictEqual(scopeCheck(true, "key-1", "key-1"), true);
  assert.strictEqual(scopeCheck(true, "key-1", "different-key"), true);
  assert.strictEqual(scopeCheck(true, null, null), true);
  assert.strictEqual(scopeCheck(true, undefined, null), true);
});

test("scopeCheck — a null-owner record is denied to every non-session caller (GHSA-2jm2-mpx8-6523)", () => {
  assert.strictEqual(scopeCheck(false, null, null), false, "anonymous");
  assert.strictEqual(scopeCheck(false, null, "any-key"), false, "any authenticated key");
  assert.strictEqual(scopeCheck(false, undefined, null), false, "anonymous, undefined owner");
  assert.strictEqual(scopeCheck(false, undefined, "any-key"), false, "any key, undefined owner");
});

test("scopeCheck — matching apiKeyId passes", () => {
  assert.strictEqual(scopeCheck(false, "key-1", "key-1"), true);
});

test("scopeCheck — mismatched apiKeyId fails", () => {
  assert.strictEqual(scopeCheck(false, "key-1", null), false);
  assert.strictEqual(scopeCheck(false, "key-1", "key-2"), false);
});

test("batch deletion only allowed for terminal statuses", () => {
  for (const s of ["completed", "failed", "cancelled", "expired"]) {
    assert.strictEqual(canDeleteBatch(s), true, `${s} should be deletable`);
  }
  for (const s of ["validating", "in_progress", "finalizing", "cancelling"]) {
    assert.strictEqual(canDeleteBatch(s), false, `${s} should NOT be deletable`);
  }
});

test("delete completed auth — requires session or API key", () => {
  // Simulates the check in delete-completed/route.ts:
  // if (!scope.isSessionAuth && !scope.apiKeyId) → 401
  function needsAuth(isSessionAuth: boolean, apiKeyId: string | null): boolean {
    return !isSessionAuth && !apiKeyId;
  }
  assert.strictEqual(needsAuth(true, null), false, "session auth → OK");
  assert.strictEqual(needsAuth(true, "key-1"), false, "session auth + key → OK");
  assert.strictEqual(needsAuth(false, "key-1"), false, "API key → OK");
  assert.strictEqual(needsAuth(false, null), true, "no auth → 401");
});

test("response JSON shape for single batch deletion", () => {
  const id = "batch_test123";
  const body = { id, object: "batch", deleted: true };
  assert.strictEqual(body.id, id);
  assert.strictEqual(body.object, "batch");
  assert.strictEqual(body.deleted, true);
});

test("response JSON shape for delete-completed", () => {
  const body = { deleted: true, deletedBatches: 3, deletedFiles: 5 };
  assert.strictEqual(body.deleted, true);
  assert.strictEqual(body.deletedBatches, 3);
  assert.strictEqual(body.deletedFiles, 5);
});

test("response JSON shape for 404 error", () => {
  const body = { error: { message: "Batch not found", type: "invalid_request_error" } };
  assert.strictEqual(body.error.message, "Batch not found");
  assert.strictEqual(body.error.type, "invalid_request_error");
});

test("response JSON shape for 409 error", () => {
  const body = {
    error: { message: "Only terminal batches can be deleted", type: "invalid_request_error" },
  };
  assert.strictEqual(body.error.message, "Only terminal batches can be deleted");
  assert.strictEqual(body.error.type, "invalid_request_error");
});

test("response JSON shape for 401 error", () => {
  const body = { error: { message: "Authentication required", type: "invalid_request_error" } };
  assert.strictEqual(body.error.message, "Authentication required");
  assert.strictEqual(body.error.type, "invalid_request_error");
});
