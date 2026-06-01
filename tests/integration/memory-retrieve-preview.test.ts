/**
 * Integration tests — POST /api/memory/retrieve-preview
 * Tests: 200 happy path, 400 invalid query, 401 unauth, error sanitized.
 *
 * NOTE: retrievePreview is a named ESM export that cannot be mocked via mock.method.
 * We test with the real function, which returns an empty memories array when the DB is empty.
 * This validates the route's I/O contract without requiring real embeddings.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  makeManagementSessionRequest,
} from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-retrieve-preview-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret-retrieve-preview";

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");

// Import route AFTER setting DATA_DIR
const retrieveRoute = await import(
  "../../src/app/api/memory/retrieve-preview/route.ts"
);
const { POST } = retrieveRoute;

// ── Helpers ──

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function makeAuthPostRequest(body: unknown) {
  return makeManagementSessionRequest("http://localhost/api/memory/retrieve-preview", {
    method: "POST",
    body,
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

test("POST /api/memory/retrieve-preview — 200 + valid shape (empty DB)", async () => {
  const req = await makeAuthPostRequest({
    query: "test query",
    strategy: "exact",
    maxTokens: 2000,
    limit: 10,
  });

  const res = await POST(req);
  assert.strictEqual(res.status, 200);

  const body = await res.json();
  assert.ok(Array.isArray(body.memories), "should have memories array");
  assert.ok(body.resolution, "should have resolution object");
  assert.strictEqual(typeof body.totalTokensUsed, "number", "totalTokensUsed should be a number");
  assert.strictEqual(typeof body.budgetMaxTokens, "number", "budgetMaxTokens should be a number");
  assert.ok(body.budgetMaxTokens >= 0, "budgetMaxTokens should be non-negative");

  // resolution should have strategyUsed field
  assert.ok(body.resolution.strategyUsed, "resolution should have strategyUsed");
  assert.strictEqual(typeof body.resolution.rerankApplied, "boolean");
  assert.ok(["sqlite-vec", "qdrant", "none"].includes(body.resolution.vectorStore));
});

test("POST /api/memory/retrieve-preview — 400 invalid query (empty string)", async () => {
  const req = await makeAuthPostRequest({ query: "", strategy: "exact" });
  const res = await POST(req);

  assert.strictEqual(res.status, 400);
  const body = await res.json();
  assert.ok(body.message || body.error || body.details, "should return error");
});

test("POST /api/memory/retrieve-preview — 401 without auth when requireLogin=true", async () => {
  await localDb.updateSettings({ requireLogin: true, password: "hashed-pw" });

  const req = new Request("http://localhost/api/memory/retrieve-preview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: "test", strategy: "exact" }),
  });

  const res = await POST(req);
  assert.strictEqual(res.status, 401);
});

test("POST /api/memory/retrieve-preview — error path: no stack trace (invalid JSON)", async () => {
  // Test via invalid JSON body — the parse step should return 400 without a stack trace
  const { createManagementSessionHeaders } = await import(
    "../helpers/managementSession.ts"
  );
  const headers = await createManagementSessionHeaders();

  const req = new Request("http://localhost/api/memory/retrieve-preview", {
    method: "POST",
    headers: Object.fromEntries(headers.entries()),
    body: "not-valid-json{{{",
  });

  const res = await POST(req);
  assert.ok(res.status >= 400, "should return error status for malformed JSON");

  const body = await res.json();
  const bodyStr = JSON.stringify(body);
  // Hard Rule #12: no stack trace in response body
  assert.ok(!bodyStr.match(/\sat\s\//), "response must not contain stack trace");
});
