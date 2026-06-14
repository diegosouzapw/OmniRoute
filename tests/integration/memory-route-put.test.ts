/**
 * Integration tests — PUT /api/memory/[id]
 * Tests: 200 happy path, 400 invalid body, 404 not found, 401 unauth, error sanitization.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { mock } from "node:test";
import {
  makeManagementSessionRequest,
  createManagementSessionHeaders,
} from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-memory-put-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret-for-memory-put";

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");

// ── Dynamic import of route module (after DATA_DIR set) ──
const memoryIdRoute = await import("../../src/app/api/memory/[id]/route.ts");
const { PUT, GET, DELETE } = memoryIdRoute;

// ── Memory store module ──
const memoryStore = await import("../../src/lib/memory/store.ts");
const { createMemory, getMemory } = memoryStore;

// ── Helpers ──

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function makeParams(id: string) {
  return { params: Promise.resolve({ id }) };
}

async function makeAuthRequest(method: "PUT" | "GET" | "DELETE", body?: unknown) {
  return makeManagementSessionRequest(`http://localhost/api/memory/test-id`, {
    method,
    body: body === undefined ? undefined : body,
  });
}

async function seedMemory() {
  return createMemory({
    content: "Test content",
    key: "test-key",
    type: "factual" as any,
    sessionId: "",
    apiKeyId: "api-key-test",
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

test("PUT /api/memory/[id] — happy path: 200 + {success:true}", async () => {
  const memory = await seedMemory();
  const req = await makeAuthRequest("PUT", { content: "Updated content" });
  const res = await PUT(req, makeParams(memory.id));

  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.strictEqual(body.success, true);
});

test("PUT /api/memory/[id] — 400 with invalid body (extra field not in strict schema)", async () => {
  const memory = await seedMemory();
  const req = await makeAuthRequest("PUT", { content: "Updated", unknownField: "bad" });
  const res = await PUT(req, makeParams(memory.id));

  assert.strictEqual(res.status, 400);
  const body = await res.json();
  assert.ok(body.message || body.error, "should return error");
});

test("PUT /api/memory/[id] — 404 if memory does not exist", async () => {
  const req = await makeAuthRequest("PUT", { content: "Updated" });
  const res = await PUT(req, makeParams("non-existent-id-12345"));

  assert.strictEqual(res.status, 404);
  const body = await res.json();
  assert.ok(body.error, "should have error field");
});

test("PUT /api/memory/[id] — 401 without auth when requireLogin=true", async () => {
  await localDb.updateSettings({ requireLogin: true, password: "hashed-pw" });

  const req = new Request("http://localhost/api/memory/test-id", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: "Updated" }),
  });
  const res = await PUT(req, makeParams("any-id"));

  assert.strictEqual(res.status, 401);
});

test("PUT /api/memory/[id] — error path: no stack trace in response", async () => {
  // Trigger an error by passing invalid JSON to the parse step
  const req = new Request("http://localhost/api/memory/test-id", {
    method: "PUT",
    headers: {},
    body: "not-json{{{",
  });

  // Even with a parse error, we need auth headers or requireLogin off (already off from beforeEach)
  const headers = await createManagementSessionHeaders();
  const authReq = new Request("http://localhost/api/memory/test-id", {
    method: "PUT",
    headers: Object.fromEntries(headers.entries()),
    body: "not-json{{{",
  });

  const res = await PUT(authReq, makeParams("any-id"));
  // Should be 400 (invalid JSON) not a crash
  assert.ok(res.status >= 400, "should return error status");

  const body = await res.json();
  const bodyStr = JSON.stringify(body);
  // Hard Rule #12: no stack trace in response body
  assert.ok(!bodyStr.match(/\sat\s\//), "response must not contain stack trace");
});
