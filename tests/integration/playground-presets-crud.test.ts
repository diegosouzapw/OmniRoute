/**
 * Integration tests for GET/POST /api/playground/presets
 * and GET/PUT/DELETE /api/playground/presets/[id]
 *
 * Tests exercise the full CRUD lifecycle using a temporary SQLite DB.
 *
 * Coverage areas:
 * - POST preset → 201 with UUID id
 * - GET list → includes the created item
 * - GET [id] → returns the item
 * - PUT partial patch (name only)
 * - DELETE → 204
 * - GET [id] after delete → 404
 * - DELETE non-existent id → 404
 * - UUID validation: non-UUID id → 400
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolated DB per test file
const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-presets-crud-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";

const core = await import("../../src/lib/db/core.ts");

// Import route handlers
const { GET: listGet, POST: createPost, OPTIONS: listOptions } = await import(
  "../../src/app/api/playground/presets/route.ts"
);
const { GET: idGet, PUT: idPut, DELETE: idDelete, OPTIONS: idOptions } = await import(
  "../../src/app/api/playground/presets/[id]/route.ts"
);

const BASE_URL = "http://localhost:20128";

const UUID_V4_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function postReq(body: unknown): Request {
  return new Request(`${BASE_URL}/api/playground/presets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function getReq(): Request {
  return new Request(`${BASE_URL}/api/playground/presets`, { method: "GET" });
}

function idGetReq(id: string): Request {
  return new Request(`${BASE_URL}/api/playground/presets/${id}`, { method: "GET" });
}

function putReq(id: string, body: unknown): Request {
  return new Request(`${BASE_URL}/api/playground/presets/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function deleteReq(id: string): Request {
  return new Request(`${BASE_URL}/api/playground/presets/${id}`, { method: "DELETE" });
}

async function resolveParams(id: string): Promise<{ params: Promise<{ id: string }> }> {
  return { params: Promise.resolve({ id }) };
}

// ─── Cleanup ─────────────────────────────────────────────────────────────────

test.beforeEach(async () => {
  // Reset DB between tests for isolation
  core.resetDbInstance();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ─── OPTIONS ─────────────────────────────────────────────────────────────────

test("OPTIONS /presets returns CORS with GET, POST, OPTIONS", async () => {
  const res = await listOptions();
  assert.equal(res.status, 200);
  const methods = res.headers.get("Access-Control-Allow-Methods") ?? "";
  assert.ok(methods.includes("GET"));
  assert.ok(methods.includes("POST"));
  assert.ok(methods.includes("OPTIONS"));
});

test("OPTIONS /presets/[id] returns CORS with GET, PUT, DELETE, OPTIONS", async () => {
  const res = await idOptions();
  assert.equal(res.status, 200);
  const methods = res.headers.get("Access-Control-Allow-Methods") ?? "";
  assert.ok(methods.includes("GET"));
  assert.ok(methods.includes("PUT"));
  assert.ok(methods.includes("DELETE"));
});

// ─── Full CRUD lifecycle ──────────────────────────────────────────────────────

test("POST /presets → 201 with valid UUID id and correct shape", async () => {
  const res = await createPost(
    postReq({
      name: "My Test Preset",
      endpoint: "chat.completions",
      model: "gpt-4o",
      system: "You are a helpful assistant.",
      params: { temperature: 0.7, max_tokens: 1024 },
    })
  );
  assert.equal(res.status, 201);
  assert.ok(res.headers.get("Access-Control-Allow-Methods")?.includes("POST"));

  const body = (await res.json()) as {
    id: string;
    name: string;
    endpoint: string;
    model: string;
    system: string | null;
    params: Record<string, unknown>;
    created_at: string;
  };
  assert.ok(UUID_V4_REGEX.test(body.id), "id should be a valid UUID v4");
  assert.equal(body.name, "My Test Preset");
  assert.equal(body.endpoint, "chat.completions");
  assert.equal(body.model, "gpt-4o");
  assert.equal(body.system, "You are a helpful assistant.");
  assert.deepEqual(body.params, { temperature: 0.7, max_tokens: 1024 });
  assert.equal(typeof body.created_at, "string");
});

test("GET /presets list returns the created item", async () => {
  // Create one preset
  const createRes = await createPost(
    postReq({ name: "Preset A", endpoint: "chat.completions", model: "gpt-4o" })
  );
  assert.equal(createRes.status, 201);
  const created = (await createRes.json()) as { id: string };

  // List
  const listRes = await listGet(getReq());
  assert.equal(listRes.status, 200);
  const listBody = (await listRes.json()) as { presets: Array<{ id: string; name: string }> };
  assert.ok(Array.isArray(listBody.presets));
  const found = listBody.presets.find((p) => p.id === created.id);
  assert.ok(found, "created preset should appear in list");
  assert.equal(found.name, "Preset A");
});

test("GET /presets/[id] returns the correct preset", async () => {
  const createRes = await createPost(
    postReq({ name: "Fetch Me", endpoint: "embeddings", model: "text-embedding-3-small" })
  );
  const created = (await createRes.json()) as { id: string; name: string };

  const getRes = await idGet(idGetReq(created.id), await resolveParams(created.id));
  assert.equal(getRes.status, 200);

  const body = (await getRes.json()) as { id: string; name: string };
  assert.equal(body.id, created.id);
  assert.equal(body.name, "Fetch Me");
});

test("PUT /presets/[id] partial patch (name only) updates correctly", async () => {
  const createRes = await createPost(
    postReq({ name: "Original Name", endpoint: "chat.completions", model: "gpt-4o" })
  );
  const created = (await createRes.json()) as { id: string; endpoint: string; model: string };

  const putRes = await idPut(
    putReq(created.id, { name: "Updated Name" }),
    await resolveParams(created.id)
  );
  assert.equal(putRes.status, 200);

  const updated = (await putRes.json()) as { id: string; name: string; endpoint: string; model: string };
  assert.equal(updated.id, created.id);
  assert.equal(updated.name, "Updated Name");
  // Other fields should be preserved
  assert.equal(updated.endpoint, created.endpoint);
  assert.equal(updated.model, created.model);
});

test("PUT /presets/[id] can update params", async () => {
  const createRes = await createPost(
    postReq({
      name: "Params Test",
      endpoint: "chat.completions",
      model: "gpt-4o",
      params: { temperature: 0.5 },
    })
  );
  const created = (await createRes.json()) as { id: string };

  const putRes = await idPut(
    putReq(created.id, { params: { temperature: 0.9, max_tokens: 2048 } }),
    await resolveParams(created.id)
  );
  assert.equal(putRes.status, 200);

  const updated = (await putRes.json()) as { params: Record<string, unknown> };
  assert.deepEqual(updated.params, { temperature: 0.9, max_tokens: 2048 });
});

test("DELETE /presets/[id] returns 204", async () => {
  const createRes = await createPost(
    postReq({ name: "Delete Me", endpoint: "chat.completions", model: "gpt-4o" })
  );
  const created = (await createRes.json()) as { id: string };

  const delRes = await idDelete(deleteReq(created.id), await resolveParams(created.id));
  assert.equal(delRes.status, 204);
});

test("GET /presets/[id] after DELETE returns 404", async () => {
  const createRes = await createPost(
    postReq({ name: "Gone Soon", endpoint: "chat.completions", model: "gpt-4o" })
  );
  const created = (await createRes.json()) as { id: string };

  await idDelete(deleteReq(created.id), await resolveParams(created.id));

  const getRes = await idGet(idGetReq(created.id), await resolveParams(created.id));
  assert.equal(getRes.status, 404);

  const body = (await getRes.json()) as { error: { message: string } };
  assert.ok(body.error);
  assert.ok(!body.error.message.match(/\sat\s\//));
});

test("DELETE /presets/[id] with non-existent id returns 404", async () => {
  const fakeId = "00000000-0000-4000-8000-000000000000";
  const delRes = await idDelete(deleteReq(fakeId), await resolveParams(fakeId));
  assert.equal(delRes.status, 404);

  const body = (await delRes.json()) as { error: { message: string } };
  assert.ok(body.error);
  assert.ok(!body.error.message.match(/\sat\s\//));
});

// ─── params JSON round-trip ───────────────────────────────────────────────────

test("params object is serialized and deserialized correctly", async () => {
  const complexParams = {
    temperature: 0.7,
    max_tokens: 2048,
    top_p: 0.9,
    presence_penalty: 0.1,
    frequency_penalty: 0.2,
    stop: ["<|end|>", "\n\n"],
  };

  const createRes = await createPost(
    postReq({
      name: "Complex Params",
      endpoint: "chat.completions",
      model: "gpt-4o",
      params: complexParams,
    })
  );
  assert.equal(createRes.status, 201);
  const created = (await createRes.json()) as { id: string; params: Record<string, unknown> };
  assert.deepEqual(created.params, complexParams);

  // GET again and verify
  const getRes = await idGet(idGetReq(created.id), await resolveParams(created.id));
  const fetched = (await getRes.json()) as { params: Record<string, unknown> };
  assert.deepEqual(fetched.params, complexParams);
});

// ─── UUID validation ─────────────────────────────────────────────────────────

test("GET /presets/[id] with non-UUID id → 400", async () => {
  const badId = "not-a-uuid";
  const res = await idGet(idGetReq(badId), await resolveParams(badId));
  assert.equal(res.status, 400);

  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  assert.ok(!body.error.message.match(/\sat\s\//));
});

test("PUT /presets/[id] with non-UUID id → 400", async () => {
  const badId = "also-not-a-uuid";
  const res = await idPut(
    putReq(badId, { name: "Whatever" }),
    await resolveParams(badId)
  );
  assert.equal(res.status, 400);

  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  assert.ok(!body.error.message.match(/\sat\s\//));
});

test("DELETE /presets/[id] with non-UUID id → 400", async () => {
  const badId = "bad-id-not-uuid";
  const res = await idDelete(deleteReq(badId), await resolveParams(badId));
  assert.equal(res.status, 400);

  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  assert.ok(!body.error.message.match(/\sat\s\//));
});

// ─── Null system ─────────────────────────────────────────────────────────────

test("POST with null system stores null correctly", async () => {
  const res = await createPost(
    postReq({ name: "No System", endpoint: "chat.completions", model: "gpt-4o", system: null })
  );
  assert.equal(res.status, 201);
  const body = (await res.json()) as { system: string | null };
  assert.strictEqual(body.system, null);
});

test("POST without system defaults to null", async () => {
  const res = await createPost(
    postReq({ name: "No System Either", endpoint: "chat.completions", model: "gpt-4o" })
  );
  assert.equal(res.status, 201);
  const body = (await res.json()) as { system: string | null };
  assert.strictEqual(body.system, null);
});
