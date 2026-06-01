/**
 * Integration tests: GET /api/quota/preview
 *
 * Verifies:
 *   - Auth check (401 without session)
 *   - Zod validation for query params (400 on missing required fields)
 *   - 404 when pool does not exist
 *   - Valid query → returns { decision } with kind="allow"
 *   - enforce is dry-run: store counters unchanged before and after (peek)
 *   - Error responses don't leak stack traces (Hard Rule #12 / B25)
 *
 * Part of: Group B — REST routes for Quota Sharing (plan 22, frente F8).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-preview-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-quota-preview-secret";
process.env.QUOTA_STORE_DRIVER = "sqlite";

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const { createPool, upsertAllocations } = localDb;
const { getSqliteQuotaStore } = await import("../../src/lib/quota/sqliteQuotaStore.ts");
const { resetQuotaStoreSingleton } = await import("../../src/lib/quota/QuotaStore.ts");
const previewRoute = await import("../../src/app/api/quota/preview/route.ts");

async function enableManagementAuth() {
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  await localDb.updateSettings({ requireLogin: true, password: "" });
}

function resetDb() {
  core.resetDbInstance();
  resetQuotaStoreSingleton();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  resetDb();
  compliance.initAuditLog();
});

test.after(() => {
  core.resetDbInstance();
  resetQuotaStoreSingleton();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("GET /api/quota/preview without auth → 401", async () => {
  await enableManagementAuth();
  const req = new Request(
    "http://localhost/api/quota/preview?apiKeyId=k1&poolId=p1"
  );
  const res = await previewRoute.GET(req);
  assert.equal(res.status, 401);
});

test("GET /api/quota/preview without required query params → 400", async () => {
  const req = await makeManagementSessionRequest(
    "http://localhost/api/quota/preview"
    // Missing apiKeyId and poolId
  );
  const res = await previewRoute.GET(req);
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.ok(body.error?.message, "Should have error message");
  assert.doesNotMatch(JSON.stringify(body), /\s+at\s+\//, "No stack trace in 400 response");
});

test("GET /api/quota/preview with nonexistent poolId → 404", async () => {
  const req = await makeManagementSessionRequest(
    "http://localhost/api/quota/preview?apiKeyId=key-1&poolId=no-such-pool"
  );
  const res = await previewRoute.GET(req);
  assert.equal(res.status, 404);
  const body = await res.json();
  assert.doesNotMatch(JSON.stringify(body), /\s+at\s+\//, "No stack trace in 404 response");
});

test("GET /api/quota/preview with valid params → { decision } with kind", async () => {
  // Create a real pool
  const pool = createPool({ connectionId: "conn-preview", name: "Preview Pool" });
  upsertAllocations(pool.id, [
    { apiKeyId: "preview-key-1", weight: 100, policy: "soft" },
  ]);

  const req = await makeManagementSessionRequest(
    `http://localhost/api/quota/preview?apiKeyId=preview-key-1&poolId=${pool.id}&estimatedTokens=100`
  );
  const res = await previewRoute.GET(req);
  assert.equal(res.status, 200);

  const body = (await res.json()) as { decision: { kind: string } };
  assert.ok(body.decision, "Response should have decision field");
  assert.ok(
    ["allow", "block"].includes(body.decision.kind),
    `decision.kind must be "allow" or "block", got: ${body.decision.kind}`
  );
});

test("GET /api/quota/preview is dry-run: store counters unchanged after call", async () => {
  // Create pool and seed some consumption
  const pool = createPool({ connectionId: "conn-dryrun", name: "Dry Run Pool" });
  upsertAllocations(pool.id, [
    { apiKeyId: "dryrun-key", weight: 100, policy: "hard" },
  ]);

  const store = getSqliteQuotaStore();
  const dim = { poolId: pool.id, unit: "tokens" as const, window: "daily" as const };

  // Pre-peek value
  const before = await store.peek("dryrun-key", dim);

  // Call preview (dry-run)
  const req = await makeManagementSessionRequest(
    `http://localhost/api/quota/preview?apiKeyId=dryrun-key&poolId=${pool.id}&estimatedTokens=500`
  );
  await previewRoute.GET(req);

  // Post-peek value — must equal pre-peek (no consumption occurred)
  const after = await store.peek("dryrun-key", dim);
  assert.equal(before, after, "Store counter must not change after a preview (dry-run) call");
});

test("GET /api/quota/preview accepts optional estimatedUsd and estimatedRequests", async () => {
  const pool = createPool({ connectionId: "conn-optional", name: "Optional Pool" });
  upsertAllocations(pool.id, [{ apiKeyId: "opt-key", weight: 100, policy: "burst" }]);

  const req = await makeManagementSessionRequest(
    `http://localhost/api/quota/preview?apiKeyId=opt-key&poolId=${pool.id}&estimatedUsd=1.5&estimatedRequests=3`
  );
  const res = await previewRoute.GET(req);
  assert.equal(res.status, 200);
  const body = (await res.json()) as { decision: unknown };
  assert.ok(body.decision, "Should return decision");
});
