/**
 * Integration tests for Zod validation in playground presets routes.
 *
 * Tests focus on invalid bodies and edge cases that must return 400.
 *
 * Coverage areas:
 * - POST with empty name → 400
 * - POST with missing required fields (endpoint, model) → 400
 * - POST with system > 50000 chars → 400
 * - PUT with invalid body → 400
 * - GET/PUT/DELETE with valid UUID format but wrong format string → 400
 * - All error responses must NOT contain stack trace fragments (Hard Rule #12)
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolated DB per test file
const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-presets-zod-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";

const core = await import("../../src/lib/db/core.ts");

const { POST: createPost } = await import(
  "../../src/app/api/playground/presets/route.ts"
);
const { GET: idGet, PUT: idPut, DELETE: idDelete } = await import(
  "../../src/app/api/playground/presets/[id]/route.ts"
);

const BASE_URL = "http://localhost:20128";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function postReq(body: unknown): Request {
  return new Request(`${BASE_URL}/api/playground/presets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function putReq(id: string, body: unknown): Request {
  return new Request(`${BASE_URL}/api/playground/presets/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function getReq(id: string): Request {
  return new Request(`${BASE_URL}/api/playground/presets/${id}`, { method: "GET" });
}

function deleteReq(id: string): Request {
  return new Request(`${BASE_URL}/api/playground/presets/${id}`, { method: "DELETE" });
}

async function resolveParams(id: string): Promise<{ params: Promise<{ id: string }> }> {
  return { params: Promise.resolve({ id }) };
}

// Sanitization assertion helper
function assertNoStackTrace(body: { error?: { message?: string } }): void {
  const msg = body.error?.message ?? "";
  assert.ok(
    !msg.match(/\sat\s\//),
    `error message must not contain stack trace paths; got: ${msg}`
  );
}

// ─── Cleanup ─────────────────────────────────────────────────────────────────

test.beforeEach(() => {
  core.resetDbInstance();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ─── POST validation ─────────────────────────────────────────────────────────

test("POST with empty name → 400 with Zod error", async () => {
  const res = await createPost(
    postReq({ name: "", endpoint: "chat.completions", model: "gpt-4o" })
  );
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  assertNoStackTrace(body);
});

test("POST with name exceeding 100 chars → 400", async () => {
  const res = await createPost(
    postReq({ name: "x".repeat(101), endpoint: "chat.completions", model: "gpt-4o" })
  );
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  assertNoStackTrace(body);
});

test("POST with missing endpoint → 400", async () => {
  const res = await createPost(postReq({ name: "Test", model: "gpt-4o" }));
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  assertNoStackTrace(body);
});

test("POST with empty endpoint → 400", async () => {
  const res = await createPost(postReq({ name: "Test", endpoint: "", model: "gpt-4o" }));
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  assertNoStackTrace(body);
});

test("POST with missing model → 400", async () => {
  const res = await createPost(postReq({ name: "Test", endpoint: "chat.completions" }));
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  assertNoStackTrace(body);
});

test("POST with empty model → 400", async () => {
  const res = await createPost(
    postReq({ name: "Test", endpoint: "chat.completions", model: "" })
  );
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  assertNoStackTrace(body);
});

test("POST with system > 50000 chars → 400", async () => {
  const longSystem = "x".repeat(50001);
  const res = await createPost(
    postReq({ name: "Big System", endpoint: "chat.completions", model: "gpt-4o", system: longSystem })
  );
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  assertNoStackTrace(body);
});

test("POST with system exactly 50000 chars → 201 (boundary: valid)", async () => {
  const maxSystem = "x".repeat(50000);
  const res = await createPost(
    postReq({ name: "Max System", endpoint: "chat.completions", model: "gpt-4o", system: maxSystem })
  );
  assert.equal(res.status, 201);
});

test("POST with invalid JSON body → 400", async () => {
  const req = new Request(`${BASE_URL}/api/playground/presets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "GARBAGE",
  });
  const res = await createPost(req);
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  assertNoStackTrace(body);
});

test("POST with missing name entirely → 400", async () => {
  const res = await createPost(postReq({ endpoint: "chat.completions", model: "gpt-4o" }));
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  assertNoStackTrace(body);
});

// ─── PUT validation ───────────────────────────────────────────────────────────

test("PUT with invalid body (name is number) → 400", async () => {
  const validId = "00000000-0000-4000-8000-000000000001";
  const res = await idPut(putReq(validId, { name: 42 }), await resolveParams(validId));
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  assertNoStackTrace(body);
});

test("PUT with empty name → 400", async () => {
  const validId = "00000000-0000-4000-8000-000000000001";
  const res = await idPut(putReq(validId, { name: "" }), await resolveParams(validId));
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  assertNoStackTrace(body);
});

test("PUT with system > 50000 chars → 400", async () => {
  const validId = "00000000-0000-4000-8000-000000000001";
  const longSystem = "y".repeat(50001);
  const res = await idPut(
    putReq(validId, { system: longSystem }),
    await resolveParams(validId)
  );
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  assertNoStackTrace(body);
});

test("PUT with invalid JSON body → 400", async () => {
  const validId = "00000000-0000-4000-8000-000000000001";
  const req = new Request(`${BASE_URL}/api/playground/presets/${validId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: "GARBAGE",
  });
  const res = await idPut(req, await resolveParams(validId));
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  assertNoStackTrace(body);
});

// ─── UUID format validation ───────────────────────────────────────────────────

test("GET /presets/[id] with numeric string → 400", async () => {
  const badId = "12345";
  const res = await idGet(getReq(badId), await resolveParams(badId));
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  assertNoStackTrace(body);
});

test("GET /presets/[id] with plain word id → 400", async () => {
  const badId = "my-preset";
  const res = await idGet(getReq(badId), await resolveParams(badId));
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  assertNoStackTrace(body);
});

test("PUT /presets/[id] with numeric string id → 400", async () => {
  const badId = "12345";
  const res = await idPut(putReq(badId, { name: "x" }), await resolveParams(badId));
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  assertNoStackTrace(body);
});

test("DELETE /presets/[id] with numeric string id → 400", async () => {
  const badId = "99999";
  const res = await idDelete(deleteReq(badId), await resolveParams(badId));
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  assertNoStackTrace(body);
});

test("GET /presets/[id] with UUID v1 format → 404 (valid UUID format, not found in DB)", async () => {
  // z.string().uuid() accepts any RFC-4122 UUID (v1, v4, etc).
  // UUID v1 passes UUID validation → route proceeds to DB lookup → 404 (not found).
  const uuidV1 = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
  const res = await idGet(getReq(uuidV1), await resolveParams(uuidV1));
  assert.equal(res.status, 404);
  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  assertNoStackTrace(body);
});

// ─── Error response shape validation ─────────────────────────────────────────

test("all 400 responses have consistent error shape (message string)", async () => {
  const cases = [
    createPost(postReq({ name: "" })),
    createPost(postReq({ endpoint: "chat" })),
    createPost(postReq({})),
  ];

  for (const pending of cases) {
    const res = await pending;
    assert.equal(res.status, 400);
    const body = (await res.json()) as { error: { message: string; type?: string } };
    assert.ok(body.error, "should have error object");
    assert.equal(typeof body.error.message, "string", "error.message must be a string");
    assert.ok(body.error.message.length > 0, "error.message must not be empty");
    assertNoStackTrace(body);
  }
});
