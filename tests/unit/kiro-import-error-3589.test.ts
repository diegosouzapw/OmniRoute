/**
 * Regression test for #3589 — Kiro "Import Token" surfaced a bare
 * `Internal server error` 500 that hid the real cause. The failure happens while
 * validating/refreshing the imported refresh token against AWS (invalid_grant /
 * expired token / region mismatch), but the catch returned a generic string, so
 * the UI never told the user what was actually wrong. The import error body now
 * carries the sanitized upstream cause (Rule #12 — no stack, no secrets), falling
 * back to the generic message only when there is nothing to report.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Hermetic temp DATA_DIR so importing the route's dependency graph is safe.
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-kiro-3589-"));
process.env.DATA_DIR = tmpDir;
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-jwt-secret-3589";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-api-key-secret-3589";

const { buildKiroImportError } = await import("../../src/app/api/oauth/kiro/import/route.ts");

test.after(() => {
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch {
    // best effort
  }
});

test("surfaces the real AWS cause (invalid_grant) instead of a generic 500", () => {
  const msg = buildKiroImportError(new Error("invalid_grant"));
  assert.match(msg, /invalid_grant/);
  assert.notEqual(msg, "Internal server error");
});

test("surfaces a region-mismatch cause", () => {
  const msg = buildKiroImportError(new Error("Region mismatch: token issued for us-east-1"));
  assert.match(msg, /region mismatch/i);
});

test("accepts a non-Error throw value", () => {
  const msg = buildKiroImportError("expired token");
  assert.match(msg, /expired token/);
});

test("never leaks a stack trace in the surfaced message", () => {
  const err = new Error("boom");
  err.stack = "Error: boom\n    at /home/user/app/src/lib/oauth/services/kiro.ts:120:11";
  const msg = buildKiroImportError(err);
  assert.doesNotMatch(msg, /at \//);
});

test("falls back to the generic message when there is nothing to report", () => {
  assert.equal(buildKiroImportError(new Error("")), "Internal server error");
  assert.equal(buildKiroImportError(undefined), "Internal server error");
});
