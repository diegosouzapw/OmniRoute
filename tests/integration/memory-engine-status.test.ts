/**
 * Integration tests — GET /api/memory/engine-status
 * Tests: 200 + valid MemoryEngineStatusSchema shape, 401 unauth.
 *
 * NOTE: We use the real engineStatus() here (no mocking) because:
 * 1. engineStatus() is a named ESM export that cannot be redefined via mock.method
 * 2. engineStatus() returns a valid structure even with no providers/embeddings configured
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createManagementSessionHeaders } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-engine-status-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret-engine-status";

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");

// Import route AFTER setting DATA_DIR
const engineStatusRoute = await import(
  "../../src/app/api/memory/engine-status/route.ts"
);
const { GET } = engineStatusRoute;

// ── Helpers ──

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
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

test("GET /api/memory/engine-status — 200 + valid MemoryEngineStatusSchema shape", async () => {
  const headers = await createManagementSessionHeaders();
  const req = new Request("http://localhost/api/memory/engine-status", {
    method: "GET",
    headers: Object.fromEntries(headers.entries()),
  });

  const res = await GET(req);
  assert.strictEqual(res.status, 200);

  const body = await res.json();

  // Validate shape matches MemoryEngineStatusSchema
  assert.ok(body.keyword, "should have keyword section");
  assert.strictEqual(body.keyword.available, true, "keyword.available should be true");
  assert.strictEqual(body.keyword.backend, "FTS5", "keyword.backend should be FTS5");

  assert.ok(body.embedding, "should have embedding section");
  assert.strictEqual(typeof body.embedding.available, "boolean", "embedding.available should be boolean");
  assert.ok(typeof body.embedding.reason === "string", "embedding.reason should be a string");
  assert.ok(body.embedding.cacheStats, "should have cacheStats in embedding");
  assert.strictEqual(typeof body.embedding.cacheStats.hits, "number");
  assert.strictEqual(typeof body.embedding.cacheStats.misses, "number");
  assert.strictEqual(typeof body.embedding.cacheStats.size, "number");

  assert.ok(body.vectorStore, "should have vectorStore section");
  assert.ok(
    ["sqlite-vec", "qdrant", "none"].includes(body.vectorStore.backend),
    `vectorStore.backend should be valid: ${body.vectorStore.backend}`,
  );
  assert.strictEqual(typeof body.vectorStore.available, "boolean");
  assert.strictEqual(typeof body.vectorStore.rowCount, "number");
  assert.strictEqual(typeof body.vectorStore.needsReindex, "number");

  assert.ok(body.qdrant, "should have qdrant section");
  assert.strictEqual(typeof body.qdrant.enabled, "boolean");

  assert.ok(body.rerank, "should have rerank section");
  assert.strictEqual(typeof body.rerank.enabled, "boolean");
  assert.strictEqual(typeof body.rerank.available, "boolean");
});

test("GET /api/memory/engine-status — 401 without auth when requireLogin=true", async () => {
  await localDb.updateSettings({ requireLogin: true, password: "hashed-pw" });

  const req = new Request("http://localhost/api/memory/engine-status", {
    method: "GET",
  });

  const res = await GET(req);
  assert.strictEqual(res.status, 401);
});
