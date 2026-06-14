/**
 * Integration tests: /api/quota/pools CRUD endpoints
 *
 * Verifies:
 *   - Auth: no auth → 401, invalid body → 400, valid → 201/200/204
 *   - POST creates pool + emits audit event
 *   - GET list includes created pool
 *   - GET [id] returns 200 or 404
 *   - PATCH updates pool + emits audit event
 *   - DELETE removes pool + emits audit event; subsequent GET → 404
 *   - Error responses never leak stack traces (Hard Rule #12 / B25)
 *
 * Part of: Group B — REST routes for Quota Sharing (plan 22, frente F8).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-pools-crud-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-quota-pools-secret";

// Import in dependency order to ensure migrations run before routes
const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const poolsRoute = await import("../../src/app/api/quota/pools/route.ts");
const poolIdRoute = await import("../../src/app/api/quota/pools/[id]/route.ts");

async function enableManagementAuth() {
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  await localDb.updateSettings({ requireLogin: true, password: "" });
}

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  resetDb();
  compliance.initAuditLog();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ---------------------------------------------------------------------------
// POST /api/quota/pools
// ---------------------------------------------------------------------------

test("POST /api/quota/pools without auth → 401", async () => {
  await enableManagementAuth();
  const req = new Request("http://localhost/api/quota/pools", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ connectionId: "conn-1", name: "Pool A" }),
  });
  const res = await poolsRoute.POST(req);
  assert.equal(res.status, 401);
});

test("POST /api/quota/pools with auth + invalid body → 400", async () => {
  const req = await makeManagementSessionRequest("http://localhost/api/quota/pools", {
    method: "POST",
    body: { connectionId: "", name: "" }, // Empty strings fail Zod min(1)
  });
  const res = await poolsRoute.POST(req);
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.ok(body.error?.message, "Should have error message");
  // Hard Rule #12: no stack trace in error response
  assert.doesNotMatch(JSON.stringify(body), /\s+at\s+\//, "No stack trace in 400 response");
});

test("POST /api/quota/pools with auth + valid body → 201 + pool returned", async () => {
  const req = await makeManagementSessionRequest("http://localhost/api/quota/pools", {
    method: "POST",
    body: {
      connectionId: "conn-test-1",
      name: "Test Pool Alpha",
      allocations: [],
    },
  });
  const res = await poolsRoute.POST(req);
  assert.equal(res.status, 201);
  const body = await res.json() as { pool: { id: string; name: string; connectionId: string } };
  assert.ok(body.pool.id, "Pool should have an id");
  assert.equal(body.pool.name, "Test Pool Alpha");
  assert.equal(body.pool.connectionId, "conn-test-1");
});

test("POST /api/quota/pools → audit event logged", async () => {
  const req = await makeManagementSessionRequest("http://localhost/api/quota/pools", {
    method: "POST",
    body: { connectionId: "conn-audit-check", name: "Audited Pool" },
  });
  await poolsRoute.POST(req);

  // Verify audit event was recorded
  const logs = compliance.getAuditLog({ action: "quota.pool.created", limit: 10 });
  const events = Array.isArray(logs) ? logs : [];
  assert.ok(events.length >= 1, "Should have at least one quota.pool.created audit event");
  const evt = events.find(
    (e) => typeof e === "object" && e !== null && (e as Record<string, unknown>).action === "quota.pool.created"
  );
  assert.ok(evt, "quota.pool.created audit event must be present");
});

// ---------------------------------------------------------------------------
// GET /api/quota/pools
// ---------------------------------------------------------------------------

test("GET /api/quota/pools returns list including created pool", async () => {
  // Create a pool first
  const createReq = await makeManagementSessionRequest("http://localhost/api/quota/pools", {
    method: "POST",
    body: { connectionId: "conn-list-test", name: "List Test Pool" },
  });
  const createRes = await poolsRoute.POST(createReq);
  assert.equal(createRes.status, 201);
  const created = (await createRes.json()) as { pool: { id: string } };
  const poolId = created.pool.id;

  // Now list all pools
  const listReq = await makeManagementSessionRequest("http://localhost/api/quota/pools");
  const listRes = await poolsRoute.GET(listReq);
  assert.equal(listRes.status, 200);
  const body = (await listRes.json()) as { pools: Array<{ id: string; name: string }> };
  assert.ok(Array.isArray(body.pools), "pools should be an array");
  const found = body.pools.find((p) => p.id === poolId);
  assert.ok(found, `Pool ${poolId} should be in the list`);
  assert.equal(found?.name, "List Test Pool");
});

// ---------------------------------------------------------------------------
// GET /api/quota/pools/[id]
// ---------------------------------------------------------------------------

test("GET /api/quota/pools/[id] → 200 with pool detail", async () => {
  // Create pool
  const createReq = await makeManagementSessionRequest("http://localhost/api/quota/pools", {
    method: "POST",
    body: { connectionId: "conn-detail", name: "Detail Pool" },
  });
  const createRes = await poolsRoute.POST(createReq);
  const created = (await createRes.json()) as { pool: { id: string } };
  const poolId = created.pool.id;

  // Fetch by ID
  const getReq = await makeManagementSessionRequest(`http://localhost/api/quota/pools/${poolId}`);
  const getRes = await poolIdRoute.GET(getReq, { params: Promise.resolve({ id: poolId }) });
  assert.equal(getRes.status, 200);
  const body = (await getRes.json()) as { pool: { id: string; name: string } };
  assert.equal(body.pool.id, poolId);
  assert.equal(body.pool.name, "Detail Pool");
});

test("GET /api/quota/pools/[id] with nonexistent id → 404", async () => {
  const getReq = await makeManagementSessionRequest(
    "http://localhost/api/quota/pools/does-not-exist"
  );
  const getRes = await poolIdRoute.GET(getReq, {
    params: Promise.resolve({ id: "does-not-exist" }),
  });
  assert.equal(getRes.status, 404);
  const body = await getRes.json();
  assert.ok(body.error?.message, "Should have error message");
  // Hard Rule #12
  assert.doesNotMatch(JSON.stringify(body), /\s+at\s+\//, "No stack trace in 404 response");
});

// ---------------------------------------------------------------------------
// PATCH /api/quota/pools/[id]
// ---------------------------------------------------------------------------

test("PATCH /api/quota/pools/[id] → 200 updated + audit event", async () => {
  // Create
  const createReq = await makeManagementSessionRequest("http://localhost/api/quota/pools", {
    method: "POST",
    body: { connectionId: "conn-patch", name: "Original Name" },
  });
  const createRes = await poolsRoute.POST(createReq);
  const created = (await createRes.json()) as { pool: { id: string } };
  const poolId = created.pool.id;

  // Patch
  const patchReq = await makeManagementSessionRequest(
    `http://localhost/api/quota/pools/${poolId}`,
    {
      method: "PATCH",
      body: { name: "Updated Name" },
    }
  );
  const patchRes = await poolIdRoute.PATCH(patchReq, {
    params: Promise.resolve({ id: poolId }),
  });
  assert.equal(patchRes.status, 200);
  const body = (await patchRes.json()) as { pool: { name: string } };
  assert.equal(body.pool.name, "Updated Name");

  // Audit event
  const logs = compliance.getAuditLog({ action: "quota.pool.updated", limit: 10 });
  const events = Array.isArray(logs) ? logs : [];
  const evt = events.find(
    (e) =>
      typeof e === "object" &&
      e !== null &&
      (e as Record<string, unknown>).action === "quota.pool.updated" &&
      (e as Record<string, unknown>).target === poolId
  );
  assert.ok(evt, "quota.pool.updated audit event must be present with correct target");
});

test("PATCH /api/quota/pools/[id] with nonexistent id → 404", async () => {
  const patchReq = await makeManagementSessionRequest(
    "http://localhost/api/quota/pools/does-not-exist",
    { method: "PATCH", body: { name: "New Name" } }
  );
  const patchRes = await poolIdRoute.PATCH(patchReq, {
    params: Promise.resolve({ id: "does-not-exist" }),
  });
  assert.equal(patchRes.status, 404);
});

// ---------------------------------------------------------------------------
// DELETE /api/quota/pools/[id]
// ---------------------------------------------------------------------------

test("DELETE /api/quota/pools/[id] → 204 + audit event; subsequent GET → 404", async () => {
  // Create
  const createReq = await makeManagementSessionRequest("http://localhost/api/quota/pools", {
    method: "POST",
    body: { connectionId: "conn-delete", name: "Delete Me" },
  });
  const createRes = await poolsRoute.POST(createReq);
  const created = (await createRes.json()) as { pool: { id: string } };
  const poolId = created.pool.id;

  // Delete
  const deleteReq = await makeManagementSessionRequest(
    `http://localhost/api/quota/pools/${poolId}`,
    { method: "DELETE" }
  );
  const deleteRes = await poolIdRoute.DELETE(deleteReq, {
    params: Promise.resolve({ id: poolId }),
  });
  assert.equal(deleteRes.status, 204);

  // Audit event
  const logs = compliance.getAuditLog({ action: "quota.pool.deleted", limit: 10 });
  const events = Array.isArray(logs) ? logs : [];
  const evt = events.find(
    (e) =>
      typeof e === "object" &&
      e !== null &&
      (e as Record<string, unknown>).action === "quota.pool.deleted" &&
      (e as Record<string, unknown>).target === poolId
  );
  assert.ok(evt, "quota.pool.deleted audit event must be present");

  // Subsequent GET → 404
  const getReq = await makeManagementSessionRequest(
    `http://localhost/api/quota/pools/${poolId}`
  );
  const getRes = await poolIdRoute.GET(getReq, { params: Promise.resolve({ id: poolId }) });
  assert.equal(getRes.status, 404);
});

test("DELETE /api/quota/pools/[id] with nonexistent id → 404", async () => {
  const deleteReq = await makeManagementSessionRequest(
    "http://localhost/api/quota/pools/never-existed",
    { method: "DELETE" }
  );
  const deleteRes = await poolIdRoute.DELETE(deleteReq, {
    params: Promise.resolve({ id: "never-existed" }),
  });
  assert.equal(deleteRes.status, 404);
});
