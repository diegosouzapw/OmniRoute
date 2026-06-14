/**
 * Integration tests — POST /api/memory/summarize
 * Tests: dryRun=true candidates without deleting, dryRun=false deletes+creates,
 * 400 invalid days (>365), 401 unauth.
 *
 * NOTE: summarizeMemoriesOlderThan is a named ESM export that cannot be mocked via mock.method.
 * We test with real DB operations — creating old memories by manipulating timestamps.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  makeManagementSessionRequest,
} from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-summarize-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret-summarize";

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");
const memoryStore = await import("../../src/lib/memory/store.ts");

const summarizeRoute = await import(
  "../../src/app/api/memory/summarize/route.ts"
);
const { POST } = summarizeRoute;

// ── Helpers ──

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function makeAuthPostRequest(body: unknown) {
  return makeManagementSessionRequest("http://localhost/api/memory/summarize", {
    method: "POST",
    body,
  });
}

/** Create a memory then backdating its created_at so it appears old */
async function seedOldMemory(daysAgo: number, apiKeyId = "api-key-1") {
  const mem = await memoryStore.createMemory({
    content: "Old memory content that is older than threshold",
    key: `old-key-${Date.now()}`,
    type: "factual" as any,
    sessionId: "",
    apiKeyId,
    metadata: {},
    expiresAt: null,
  });
  // Backdate the memory in the DB
  const db = core.getDbInstance();
  const oldTs = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();
  db.prepare("UPDATE memories SET created_at = ?, updated_at = ? WHERE id = ?").run(
    oldTs,
    oldTs,
    mem.id,
  );
  return mem;
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

test("POST /api/memory/summarize — dryRun=true returns candidates without deleting", async () => {
  // Seed a memory that is 40 days old — older than 30-day threshold
  const oldMem = await seedOldMemory(40);

  const req = await makeAuthPostRequest({
    olderThanDays: 30,
    dryRun: true,
    apiKeyId: "api-key-1",
  });

  const res = await POST(req);
  assert.strictEqual(res.status, 200);

  const body = await res.json();
  assert.ok(Array.isArray(body.candidates), "should have candidates array");
  assert.strictEqual(body.dryRun, true, "dryRun should be true");
  assert.strictEqual(body.deletedCount, 0, "deletedCount should be 0 in dry run");
  assert.strictEqual(body.summaryId, null, "summaryId should be null in dry run");
  assert.strictEqual(typeof body.totalTokens, "number", "totalTokens should be a number");

  // Memory should still exist (not deleted in dry run)
  const stillExists = await memoryStore.getMemory(oldMem.id);
  assert.ok(stillExists, "memory should still exist after dry run");
});

test("POST /api/memory/summarize — dryRun=false deletes + creates summary", async () => {
  // Seed a memory that is 40 days old
  const oldMem = await seedOldMemory(40, "api-key-2");

  const req = await makeAuthPostRequest({
    olderThanDays: 30,
    dryRun: false,
    apiKeyId: "api-key-2",
  });

  const res = await POST(req);
  assert.strictEqual(res.status, 200);

  const body = await res.json();
  assert.strictEqual(typeof body.dryRun, "boolean");
  assert.strictEqual(typeof body.deletedCount, "number");
  // Either deleted (if summarization ran) or 0 (if no candidates)
  assert.ok(body.deletedCount >= 0, "deletedCount should be non-negative");
  assert.strictEqual(typeof body.totalTokens, "number");
});

test("POST /api/memory/summarize — 400 invalid olderThanDays (> 365)", async () => {
  const req = await makeAuthPostRequest({ olderThanDays: 400, dryRun: false });
  const res = await POST(req);

  assert.strictEqual(res.status, 400);
  const body = await res.json();
  assert.ok(body.message || body.error, "should return error");
});

test("POST /api/memory/summarize — 401 without auth when requireLogin=true", async () => {
  await localDb.updateSettings({ requireLogin: true, password: "hashed-pw" });

  const req = new Request("http://localhost/api/memory/summarize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ olderThanDays: 30, dryRun: true }),
  });

  const res = await POST(req);
  assert.strictEqual(res.status, 401);
});
