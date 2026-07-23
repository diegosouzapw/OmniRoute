/**
 * Integration tests — POST /api/memory/reindex
 * Tests: no force → {started:true, pending:N}, force=true marks all needs_reindex, 401 unauth.
 *
 * NOTE: runReindexBatch and getReindexPending are named ESM exports that cannot be mocked via
 * mock.method. We test with the real DB — the route returns immediately with pending count
 * and dispatches the batch in background (setImmediate). Since the batch runs asynchronously
 * and may fail silently (no embedding configured), we just verify the immediate response shape.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  makeManagementSessionRequest,
} from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-reindex-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret-reindex";

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");
const memoryStore = await import("../../src/lib/memory/store.ts");

const reindexRoute = await import(
  "../../src/app/api/memory/reindex/route.ts"
);
const { POST } = reindexRoute;

// ── Helpers ──

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function makeAuthPostRequest(body: unknown) {
  return makeManagementSessionRequest("http://localhost/api/memory/reindex", {
    method: "POST",
    body,
  });
}

async function seedMemory(apiKeyId = "api-key-1") {
  return memoryStore.createMemory({
    content: "Memory needing reindex",
    key: `key-${Date.now()}`,
    type: "factual" as any,
    sessionId: "",
    apiKeyId,
    metadata: {},
    expiresAt: null,
  });
}

// ── Test lifecycle ──

test.beforeEach(async () => {
  await resetStorage();
  await localDb.updateSettings({ requireLogin: false });
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ── Tests ──

test("POST /api/memory/reindex — without force: returns {started:true, pending:N}", async () => {
  const req = await makeAuthPostRequest({ force: false });
  const res = await POST(req);

  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.strictEqual(body.started, true, "should report started: true");
  assert.strictEqual(typeof body.pending, "number", "pending should be a number");
  assert.ok(body.pending >= 0, "pending should be non-negative");
});

test("POST /api/memory/reindex — force=true marks all memories needs_reindex=1", async () => {
  // Seed some memories first
  await seedMemory("api-key-1");
  await seedMemory("api-key-1");

  const req = await makeAuthPostRequest({ force: true });
  const res = await POST(req);

  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.strictEqual(body.started, true, "should report started: true");
  assert.strictEqual(typeof body.pending, "number", "pending should be a number");
  // After force=true, pending should be >= 2 (the seeded memories)
  assert.ok(body.pending >= 2, `pending should be >= 2 after force: got ${body.pending}`);
});

test("POST /api/memory/reindex — 401 without auth when requireLogin=true", async () => {
  await localDb.updateSettings({ requireLogin: true, password: "hashed-pw" });

  const req = new Request("http://localhost/api/memory/reindex", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ force: false }),
  });

  const res = await POST(req);
  assert.strictEqual(res.status, 401);
});
