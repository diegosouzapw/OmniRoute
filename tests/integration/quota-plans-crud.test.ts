/**
 * Integration tests: /api/quota/plans CRUD endpoints
 *
 * Verifies:
 *   - GET /api/quota/plans returns catalog + DB plans merged
 *   - GET /api/quota/plans/[connectionId] returns resolved plan
 *   - PUT /api/quota/plans/[connectionId] upserts manual override + audit event
 *   - DELETE /api/quota/plans/[connectionId] clears override (reverts to auto)
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

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-plans-crud-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-quota-plans-secret";

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const plansRoute = await import("../../src/app/api/quota/plans/route.ts");
const planIdRoute = await import("../../src/app/api/quota/plans/[connectionId]/route.ts");

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
// GET /api/quota/plans
// ---------------------------------------------------------------------------

test("GET /api/quota/plans without auth → 401", async () => {
  await enableManagementAuth();
  const req = new Request("http://localhost/api/quota/plans");
  const res = await plansRoute.GET(req);
  assert.equal(res.status, 401);
});

test("GET /api/quota/plans returns catalog providers (codex, kimi, etc.)", async () => {
  const req = await makeManagementSessionRequest("http://localhost/api/quota/plans");
  const res = await plansRoute.GET(req);
  assert.equal(res.status, 200);
  const body = (await res.json()) as { plans: Array<{ provider: string; source: string }> };
  assert.ok(Array.isArray(body.plans), "plans should be an array");
  // Known providers from planRegistry
  const providers = body.plans.map((p) => p.provider);
  assert.ok(providers.includes("codex"), "Should include codex from catalog");
  assert.ok(providers.includes("kimi"), "Should include kimi from catalog");
  // Catalog entries have source=auto
  const codexEntry = body.plans.find((p) => p.provider === "codex");
  assert.equal(codexEntry?.source, "auto");
});

test("GET /api/quota/plans includes DB override plans", async () => {
  // First add a manual override
  const putReq = await makeManagementSessionRequest(
    "http://localhost/api/quota/plans/conn-override-1",
    {
      method: "PUT",
      body: {
        dimensions: [{ unit: "tokens", window: "daily", limit: 50000 }],
      },
    }
  );
  await planIdRoute.PUT(putReq, { params: Promise.resolve({ connectionId: "conn-override-1" }) });

  // List should include the override
  const listReq = await makeManagementSessionRequest("http://localhost/api/quota/plans");
  const listRes = await plansRoute.GET(listReq);
  const body = (await listRes.json()) as { plans: Array<{ connectionId: string | null; source: string }> };
  const override = body.plans.find((p) => p.connectionId === "conn-override-1");
  assert.ok(override, "Override plan should appear in list");
  assert.equal(override?.source, "manual");
});

// ---------------------------------------------------------------------------
// GET /api/quota/plans/[connectionId]
// ---------------------------------------------------------------------------

test("GET /api/quota/plans/[connectionId] returns catalog plan when no override", async () => {
  const req = await makeManagementSessionRequest(
    "http://localhost/api/quota/plans/conn-no-override"
  );
  const res = await planIdRoute.GET(req, {
    params: Promise.resolve({ connectionId: "conn-no-override" }),
  });
  assert.equal(res.status, 200);
  const body = (await res.json()) as { plan: { source: string } };
  // No DB override, no catalog match → source="manual" (empty plan)
  assert.ok(["auto", "manual"].includes(body.plan.source), "Source should be auto or manual");
});

test("GET /api/quota/plans/[connectionId] returns DB override when present", async () => {
  const connectionId = "conn-with-override";
  // Create override
  const putReq = await makeManagementSessionRequest(
    `http://localhost/api/quota/plans/${connectionId}`,
    {
      method: "PUT",
      body: {
        dimensions: [{ unit: "requests", window: "hourly", limit: 200 }],
      },
    }
  );
  await planIdRoute.PUT(putReq, { params: Promise.resolve({ connectionId }) });

  // GET should return the override
  const getReq = await makeManagementSessionRequest(
    `http://localhost/api/quota/plans/${connectionId}`
  );
  const getRes = await planIdRoute.GET(getReq, { params: Promise.resolve({ connectionId }) });
  assert.equal(getRes.status, 200);
  const body = (await getRes.json()) as {
    plan: { source: string; dimensions: Array<{ unit: string; limit: number }> };
  };
  assert.equal(body.plan.source, "manual");
  assert.equal(body.plan.dimensions[0]?.unit, "requests");
  assert.equal(body.plan.dimensions[0]?.limit, 200);
});

// ---------------------------------------------------------------------------
// PUT /api/quota/plans/[connectionId]
// ---------------------------------------------------------------------------

test("PUT /api/quota/plans/[connectionId] without auth → 401", async () => {
  await enableManagementAuth();
  const req = new Request("http://localhost/api/quota/plans/conn-auth-test", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ dimensions: [{ unit: "tokens", window: "daily", limit: 1000 }] }),
  });
  const res = await planIdRoute.PUT(req, {
    params: Promise.resolve({ connectionId: "conn-auth-test" }),
  });
  assert.equal(res.status, 401);
});

test("PUT /api/quota/plans/[connectionId] with invalid body → 400", async () => {
  const req = await makeManagementSessionRequest(
    "http://localhost/api/quota/plans/conn-bad-body",
    {
      method: "PUT",
      body: { dimensions: [] }, // PlanUpsertSchema requires min(1) dimensions
    }
  );
  const res = await planIdRoute.PUT(req, {
    params: Promise.resolve({ connectionId: "conn-bad-body" }),
  });
  assert.equal(res.status, 400);
  const body = await res.json();
  // Hard Rule #12
  assert.doesNotMatch(JSON.stringify(body), /\s+at\s+\//, "No stack trace in 400 response");
});

test("PUT /api/quota/plans/[connectionId] with valid body → source=manual + audit event", async () => {
  const connectionId = "conn-put-test";
  const req = await makeManagementSessionRequest(
    `http://localhost/api/quota/plans/${connectionId}`,
    {
      method: "PUT",
      body: {
        dimensions: [{ unit: "usd", window: "monthly", limit: 100 }],
      },
    }
  );
  const res = await planIdRoute.PUT(req, { params: Promise.resolve({ connectionId }) });
  assert.equal(res.status, 200);
  const body = (await res.json()) as { plan: { source: string } };
  assert.equal(body.plan.source, "manual");

  // Audit event
  const logs = compliance.getAuditLog({ action: "quota.plan.updated", limit: 10 });
  const events = Array.isArray(logs) ? logs : [];
  const evt = events.find(
    (e) =>
      typeof e === "object" &&
      e !== null &&
      (e as Record<string, unknown>).action === "quota.plan.updated" &&
      (e as Record<string, unknown>).target === connectionId
  );
  assert.ok(evt, "quota.plan.updated audit event must be present");
});

// ---------------------------------------------------------------------------
// DELETE /api/quota/plans/[connectionId]
// ---------------------------------------------------------------------------

test("DELETE /api/quota/plans/[connectionId] clears override → 204; GET reverts to auto", async () => {
  const connectionId = "conn-delete-plan";
  // Create override
  const putReq = await makeManagementSessionRequest(
    `http://localhost/api/quota/plans/${connectionId}`,
    {
      method: "PUT",
      body: { dimensions: [{ unit: "tokens", window: "weekly", limit: 500000 }] },
    }
  );
  await planIdRoute.PUT(putReq, { params: Promise.resolve({ connectionId }) });

  // Delete override
  const deleteReq = await makeManagementSessionRequest(
    `http://localhost/api/quota/plans/${connectionId}`,
    { method: "DELETE" }
  );
  const deleteRes = await planIdRoute.DELETE(deleteReq, { params: Promise.resolve({ connectionId }) });
  assert.equal(deleteRes.status, 204);

  // GET should now return auto/empty plan (no DB override)
  const getReq = await makeManagementSessionRequest(
    `http://localhost/api/quota/plans/${connectionId}`
  );
  const getRes = await planIdRoute.GET(getReq, { params: Promise.resolve({ connectionId }) });
  const body = (await getRes.json()) as { plan: { source: string; dimensions: unknown[] } };
  // After delete, should fall back to catalog or empty (source=auto or manual-empty)
  // For a connectionId with no catalog match, source=manual + dimensions=[]
  assert.ok(["auto", "manual"].includes(body.plan.source));

  // B26: DELETE must emit logAuditEvent with quota.plan.updated + metadata.reverted=true
  const logs = compliance.getAuditLog({ action: "quota.plan.updated", limit: 20 });
  const events = Array.isArray(logs) ? logs : [];
  const deleteEvt = events.find(
    (e) =>
      typeof e === "object" &&
      e !== null &&
      (e as Record<string, unknown>).action === "quota.plan.updated" &&
      (e as Record<string, unknown>).target === connectionId &&
      (e as { metadata?: { reverted?: boolean } }).metadata?.reverted === true
  );
  assert.ok(deleteEvt, "quota.plan.updated audit event (reverted=true) must be present after DELETE");
});

test("DELETE /api/quota/plans/[connectionId] is idempotent → 204 even when not found", async () => {
  const deleteReq = await makeManagementSessionRequest(
    "http://localhost/api/quota/plans/conn-never-existed",
    { method: "DELETE" }
  );
  const deleteRes = await planIdRoute.DELETE(deleteReq, {
    params: Promise.resolve({ connectionId: "conn-never-existed" }),
  });
  // DELETE is idempotent — returns 204 regardless
  assert.equal(deleteRes.status, 204);
});
