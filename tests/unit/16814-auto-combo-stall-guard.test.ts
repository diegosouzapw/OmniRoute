import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-16814-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { resolveModelOrError } = await import("../../src/sse/handlers/chatHelpers.ts");

test.beforeEach(() => core.resetDbInstance());
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#16814 candidate iteration timeout bounding and stall guard", async () => {
  const start = Date.now();
  const result = await resolveModelOrError("auto/coding:pro", {
    messages: [{ role: "user", content: "test latency stall" }],
  });
  const duration = Date.now() - start;
  
  assert.ok(duration < 2000, "candidate resolution took too long");
  assert.ok(result.error, "expected error response for empty/unconnected pool");
  assert.equal(result.error.status, 503);
});

test("#16814 unknown auto combo returns 400 bad request fast", async () => {
  const start = Date.now();
  const result = await resolveModelOrError("auto/nonexistent:fast", {
    messages: [{ role: "user", content: "hello" }],
  });
  const duration = Date.now() - start;
  
  assert.ok(duration < 1000, "unknown auto combo check took too long");
  assert.ok(result.error);
  assert.equal(result.error.status, 400);
});
