/**
 * Tests for video combo strategy execution
 *
 * Mirrors tests/unit/combo/image-combo.test.ts. Seeds a temp DATA_DIR with a
 * combo in the DB so executeVideoCombo resolves targets through the real DB
 * path, and covers combo resolution, target filtering, and error paths.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-video-combo-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-for-video-combo-tests";

fs.mkdirSync(TEST_DATA_DIR, { recursive: true });

const core = await import("@/lib/db/core.ts");
const { createCombo } = await import("@/lib/db/combos");
const { executeVideoCombo } = await import("@omniroute/open-sse/services/videoCombo");

type LogEntry = { level: string; tag: unknown; msg: unknown };

function createLog() {
  const entries: LogEntry[] = [];
  const record =
    (level: string) =>
    (tag: unknown, msg: unknown): number =>
      entries.push({ level, tag, msg });
  return {
    info: record("info"),
    warn: record("warn"),
    error: record("error"),
    debug: record("debug"),
    entries,
  };
}

function createRequest(model: string): Request {
  return new Request("http://localhost:20128/v1/videos/generations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, prompt: "a red cube" }),
  });
}

function createMockAuth() {
  return {
    request: createRequest("test-combo"),
    policy: { apiKeyInfo: { id: "test-key", name: "test-key" } },
  };
}

async function cleanupTestDataDir() {
  let lastError: unknown;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      core.resetDbInstance();
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      return;
    } catch (error: unknown) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  }
  if (lastError) throw lastError;
}

test.beforeEach(async () => {
  await cleanupTestDataDir();
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(async () => {
  process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  await cleanupTestDataDir();
});

test("returns 400 when combo is not found", async () => {
  const log = createLog();
  const response = await executeVideoCombo(
    "nonexistent-combo",
    { model: "nonexistent-combo", prompt: "a red cube" },
    createMockAuth(),
    Date.now(),
    log
  );
  assert.equal(response.status, 400);
  const bodyStr = JSON.stringify(await response.json());
  assert.ok(!bodyStr.includes("at "), "Error response does not leak stack traces");
});

test("returns 400 when combo has no video-capable targets", async () => {
  await createCombo({
    name: "chat-only-combo",
    strategy: "priority",
    models: ["openai/gpt-4o"],
  });

  const log = createLog();
  const response = await executeVideoCombo(
    "chat-only-combo",
    { model: "chat-only-combo", prompt: "a red cube" },
    createMockAuth(),
    Date.now(),
    log
  );
  assert.equal(response.status, 400);
  const bodyStr = JSON.stringify(await response.json());
  assert.ok(bodyStr.includes("No video-capable targets"), "Tells user no video targets");
  assert.ok(!bodyStr.includes("at "), "Error response does not leak stack traces");
});

test("returns 400 when combo has no usable targets", async () => {
  await createCombo({ name: "empty-combo", strategy: "priority", models: [] });

  const log = createLog();
  const response = await executeVideoCombo(
    "empty-combo",
    { model: "empty-combo", prompt: "a red cube" },
    createMockAuth(),
    Date.now(),
    log
  );
  assert.equal(response.status, 400);
});

test("fails cleanly when video targets exist but no provider connection does", async () => {
  await createCombo({
    name: "vid-no-conn",
    strategy: "fill-first",
    models: ["runwayml/gen4_turbo"],
  });

  const log = createLog();
  const response = await executeVideoCombo(
    "vid-no-conn",
    { model: "vid-no-conn", prompt: "a red cube" },
    createMockAuth(),
    Date.now(),
    log
  );
  assert.ok(response.status >= 400, "Surfaces a failure rather than a fake success");
  const bodyStr = JSON.stringify(await response.json());
  assert.ok(!bodyStr.includes("at "), "Error response does not leak stack traces");
});
