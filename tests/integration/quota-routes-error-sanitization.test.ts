/**
 * Integration tests: error sanitization across all quota REST routes
 *
 * Verifies Hard Rule #12 (B25): No route returns raw stack traces, absolute
 * paths, or credential strings in error response bodies.
 *
 * Tests the error paths of each quota endpoint — 400s (bad input) and 404s
 * (not found) — to confirm buildErrorBody sanitization is active.
 *
 * Part of: Group B — REST routes for Quota Sharing (plan 22, frente F8).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-quota-err-sanitization-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-quota-sanitization-secret";
process.env.QUOTA_STORE_DRIVER = "sqlite";
// Ensure a known fake URL that we can check is NOT leaked
process.env.QUOTA_STORE_REDIS_URL = "redis://secret-host:9999/0";

const core = await import("../../src/lib/db/core.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const { resetQuotaStoreSingleton } = await import("../../src/lib/quota/QuotaStore.ts");

// Import all routes
const poolsRoute = await import("../../src/app/api/quota/pools/route.ts");
const poolIdRoute = await import("../../src/app/api/quota/pools/[id]/route.ts");
const usageRoute = await import("../../src/app/api/quota/pools/[id]/usage/route.ts");
const plansRoute = await import("../../src/app/api/quota/plans/route.ts");
const planIdRoute = await import("../../src/app/api/quota/plans/[connectionId]/route.ts");
const previewRoute = await import("../../src/app/api/quota/preview/route.ts");
const settingsRoute = await import("../../src/app/api/settings/quota-store/route.ts");

function resetDb() {
  core.resetDbInstance();
  resetQuotaStoreSingleton();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

// Helper to assert no stack trace / path leak in a response body text
function assertNoStackTraceText(text: string, label: string) {
  assert.doesNotMatch(
    text,
    /\s+at\s+\//,
    `${label}: Response must not contain stack trace (Hard Rule #12)`
  );
  assert.doesNotMatch(
    text,
    /\/home\/[a-z]/,
    `${label}: Response must not contain absolute home path`
  );
}

// Reads the response body once and runs stack trace assertion
async function assertNoStackTrace(res: Response, label: string) {
  const text = await res.text();
  assertNoStackTraceText(text, label);
}

// Helper to assert secret URL not in response body text
function assertNoSecretUrlText(text: string, label: string) {
  assert.doesNotMatch(
    text,
    /secret-host/,
    `${label}: Response must not contain secret Redis host`
  );
  assert.doesNotMatch(
    text,
    /redis:\/\/secret/,
    `${label}: Response must not contain Redis URL`
  );
}

// Reads the response body once and runs both assertions (body cannot be read twice)
async function assertNoStackTraceAndNoSecretUrl(res: Response, label: string) {
  const text = await res.text();
  assertNoStackTraceText(text, label);
  assertNoSecretUrlText(text, label);
}

test.beforeEach(() => {
  resetDb();
  compliance.initAuditLog();
});

test.after(() => {
  core.resetDbInstance();
  resetQuotaStoreSingleton();
  delete process.env.QUOTA_STORE_REDIS_URL;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ---------------------------------------------------------------------------
// POST /api/quota/pools — bad body → 400
// ---------------------------------------------------------------------------

test("POST /api/quota/pools 400 error response has no stack trace", async () => {
  const req = await makeManagementSessionRequest("http://localhost/api/quota/pools", {
    method: "POST",
    body: { connectionId: "", name: "" }, // Empty strings fail Zod validation
  });
  const res = await poolsRoute.POST(req);
  assert.equal(res.status, 400);
  await assertNoStackTrace(res, "POST /api/quota/pools 400");
});

// ---------------------------------------------------------------------------
// GET /api/quota/pools/[id] — 404
// ---------------------------------------------------------------------------

test("GET /api/quota/pools/[id] 404 response has no stack trace", async () => {
  const req = await makeManagementSessionRequest(
    "http://localhost/api/quota/pools/does-not-exist"
  );
  const res = await poolIdRoute.GET(req, {
    params: Promise.resolve({ id: "does-not-exist" }),
  });
  assert.equal(res.status, 404);
  await assertNoStackTrace(res, "GET /api/quota/pools/[id] 404");
});

// ---------------------------------------------------------------------------
// PATCH /api/quota/pools/[id] — bad body → 400
// ---------------------------------------------------------------------------

test("PATCH /api/quota/pools/[id] 400 error response has no stack trace", async () => {
  const req = await makeManagementSessionRequest(
    "http://localhost/api/quota/pools/does-not-exist",
    {
      method: "PATCH",
      body: { allocations: "not-an-array" }, // Zod expects array
    }
  );
  const res = await poolIdRoute.PATCH(req, {
    params: Promise.resolve({ id: "does-not-exist" }),
  });
  // May be 400 (Zod) or 404 (not found after Zod passes) — either is fine,
  // key requirement is no stack trace
  await assertNoStackTrace(res, "PATCH /api/quota/pools/[id]");
});

// ---------------------------------------------------------------------------
// GET /api/quota/pools/[id]/usage — 404
// ---------------------------------------------------------------------------

test("GET /api/quota/pools/[id]/usage 404 response has no stack trace", async () => {
  const req = await makeManagementSessionRequest(
    "http://localhost/api/quota/pools/ghost-pool/usage"
  );
  const res = await usageRoute.GET(req, {
    params: Promise.resolve({ id: "ghost-pool" }),
  });
  assert.equal(res.status, 404);
  await assertNoStackTrace(res, "GET /api/quota/pools/[id]/usage 404");
});

// ---------------------------------------------------------------------------
// GET /api/quota/plans — valid but checked for sanitization
// ---------------------------------------------------------------------------

test("GET /api/quota/plans 200 response has no stack trace or path leak", async () => {
  const req = await makeManagementSessionRequest("http://localhost/api/quota/plans");
  const res = await plansRoute.GET(req);
  assert.equal(res.status, 200);
  await assertNoStackTrace(res, "GET /api/quota/plans 200");
});

// ---------------------------------------------------------------------------
// PUT /api/quota/plans/[connectionId] — bad body → 400
// ---------------------------------------------------------------------------

test("PUT /api/quota/plans/[connectionId] 400 error response has no stack trace", async () => {
  const req = await makeManagementSessionRequest(
    "http://localhost/api/quota/plans/conn-bad",
    {
      method: "PUT",
      body: { dimensions: [] }, // PlanUpsertSchema requires min(1)
    }
  );
  const res = await planIdRoute.PUT(req, {
    params: Promise.resolve({ connectionId: "conn-bad" }),
  });
  assert.equal(res.status, 400);
  await assertNoStackTrace(res, "PUT /api/quota/plans/[connectionId] 400");
});

// ---------------------------------------------------------------------------
// GET /api/quota/preview — missing params → 400
// ---------------------------------------------------------------------------

test("GET /api/quota/preview 400 error response has no stack trace", async () => {
  const req = await makeManagementSessionRequest(
    "http://localhost/api/quota/preview"
    // Missing apiKeyId and poolId
  );
  const res = await previewRoute.GET(req);
  assert.equal(res.status, 400);
  await assertNoStackTrace(res, "GET /api/quota/preview 400");
});

// ---------------------------------------------------------------------------
// GET /api/settings/quota-store — NEVER returns Redis URL
// ---------------------------------------------------------------------------

test("GET /api/settings/quota-store response does not contain Redis URL (Hard Rule #12/#1)", async () => {
  const req = await makeManagementSessionRequest(
    "http://localhost/api/settings/quota-store"
  );
  const res = await settingsRoute.GET(req);
  assert.equal(res.status, 200);
  await assertNoStackTraceAndNoSecretUrl(res, "GET /api/settings/quota-store 200");
});

// ---------------------------------------------------------------------------
// PUT /api/settings/quota-store — bad driver → 400 (Zod)
// ---------------------------------------------------------------------------

test("PUT /api/settings/quota-store 400 error response has no stack trace", async () => {
  const req = await makeManagementSessionRequest(
    "http://localhost/api/settings/quota-store",
    {
      method: "PUT",
      body: { driver: "baddriver" },
    }
  );
  const res = await settingsRoute.PUT(req);
  assert.equal(res.status, 400);
  await assertNoStackTrace(res, "PUT /api/settings/quota-store 400");
});

// ---------------------------------------------------------------------------
// PUT /api/settings/quota-store — redis without URL → 400 (custom check)
// ---------------------------------------------------------------------------

test("PUT /api/settings/quota-store redis+no-URL error response does not leak Redis URL", async () => {
  const req = await makeManagementSessionRequest(
    "http://localhost/api/settings/quota-store",
    {
      method: "PUT",
      body: { driver: "redis" }, // No URL provided
    }
  );
  const res = await settingsRoute.PUT(req);
  assert.equal(res.status, 400);
  await assertNoStackTraceAndNoSecretUrl(res, "PUT /api/settings/quota-store redis-no-url 400");
});
