/**
 * #6458 — an `auto/*` category/tier combo that matches ZERO connected
 * candidates must fail fast with a clear 503, instead of building an empty
 * virtual combo whose downstream routing stalls on a silent ~15s upstream
 * timeout. Regression guard (Rule #18).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auto-empty-pool-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { resolveModelOrError } = await import("../../src/sse/handlers/chatHelpers.ts");

test.beforeEach(() => core.resetDbInstance());
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#6458 empty auto-combo pool returns a 503 instead of an empty combo", async () => {
  // No provider connections seeded → any auto category resolves to an empty pool.
  const result = await resolveModelOrError("auto/coding:pro", { messages: [{ role: "user", content: "hi" }] });
  assert.ok(result.error, "expected an error result, not a combo");
  assert.equal(result.error.status, 503, "empty auto pool must fail fast with 503");
  assert.equal(result.combo, undefined, "must not return a combo for an empty pool");
});
