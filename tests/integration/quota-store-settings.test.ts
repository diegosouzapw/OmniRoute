/**
 * Integration tests: GET/PUT /api/settings/quota-store
 *
 * Verifies:
 *   - GET returns driver + redisUrlConfigured flag (NEVER the URL itself)
 *   - PUT sqlite → 200; PUT redis without URL → 400; PUT redis with URL → 200
 *   - PUT emits quota.store.driver_changed audit event
 *   - GET never returns actual Redis URL (Hard Rule #12 / #1)
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

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-store-settings-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-quota-store-settings-secret";
// Ensure no QUOTA_STORE_REDIS_URL leaks in from environment
delete process.env.QUOTA_STORE_REDIS_URL;
process.env.QUOTA_STORE_DRIVER = "sqlite";

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const { resetQuotaStoreSingleton } = await import("../../src/lib/quota/QuotaStore.ts");
const settingsRoute = await import("../../src/app/api/settings/quota-store/route.ts");

async function enableManagementAuth() {
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  await localDb.updateSettings({ requireLogin: true, password: "" });
}

function resetDb() {
  core.resetDbInstance();
  resetQuotaStoreSingleton();
  delete process.env.QUOTA_STORE_REDIS_URL;
  delete process.env.INITIAL_PASSWORD;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetDb();
  compliance.initAuditLog();
});

test.after(() => {
  core.resetDbInstance();
  resetQuotaStoreSingleton();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ---------------------------------------------------------------------------
// GET /api/settings/quota-store
// ---------------------------------------------------------------------------

test("GET /api/settings/quota-store without auth → 401", async () => {
  await enableManagementAuth();
  const req = new Request("http://localhost/api/settings/quota-store");
  const res = await settingsRoute.GET(req);
  assert.equal(res.status, 401);
});

test("GET /api/settings/quota-store returns driver + redisUrlConfigured (not URL)", async () => {
  const req = await makeManagementSessionRequest(
    "http://localhost/api/settings/quota-store"
  );
  const res = await settingsRoute.GET(req);
  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    driver: string;
    redisUrlConfigured: boolean;
    redisUrl: null | string;
  };

  assert.ok(["sqlite", "redis"].includes(body.driver), "driver must be sqlite or redis");
  assert.ok(typeof body.redisUrlConfigured === "boolean", "redisUrlConfigured must be boolean");

  // Hard Rule #12 / #1 — URL must NEVER be returned
  assert.equal(body.redisUrl, null, "Redis URL must be null (never returned)");

  // Verify the raw Redis URL string is not anywhere in the response text
  const responseText = JSON.stringify(body);
  assert.doesNotMatch(responseText, /redis:\/\//, "Redis URL must not appear in response");
  assert.doesNotMatch(responseText, /\s+at\s+\//, "No stack trace in response");
});

test("GET /api/settings/quota-store redisUrlConfigured=false when no URL configured", async () => {
  delete process.env.QUOTA_STORE_REDIS_URL;
  const req = await makeManagementSessionRequest(
    "http://localhost/api/settings/quota-store"
  );
  const res = await settingsRoute.GET(req);
  const body = (await res.json()) as { redisUrlConfigured: boolean };
  assert.equal(body.redisUrlConfigured, false);
});

// ---------------------------------------------------------------------------
// PUT /api/settings/quota-store
// ---------------------------------------------------------------------------

test("PUT /api/settings/quota-store without auth → 401", async () => {
  await enableManagementAuth();
  const req = new Request("http://localhost/api/settings/quota-store", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ driver: "sqlite" }),
  });
  const res = await settingsRoute.PUT(req);
  assert.equal(res.status, 401);
});

test("PUT /api/settings/quota-store driver=sqlite → 200", async () => {
  const req = await makeManagementSessionRequest(
    "http://localhost/api/settings/quota-store",
    {
      method: "PUT",
      body: { driver: "sqlite" },
    }
  );
  const res = await settingsRoute.PUT(req);
  assert.equal(res.status, 200);
  const body = (await res.json()) as { driver: string; redisUrl: null };
  assert.equal(body.driver, "sqlite");
  assert.equal(body.redisUrl, null);
});

test("PUT /api/settings/quota-store driver=redis without URL → 400", async () => {
  const req = await makeManagementSessionRequest(
    "http://localhost/api/settings/quota-store",
    {
      method: "PUT",
      body: { driver: "redis" }, // No redisUrl
    }
  );
  const res = await settingsRoute.PUT(req);
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.ok(body.error?.message, "Should have error message");
  assert.doesNotMatch(JSON.stringify(body), /\s+at\s+\//, "No stack trace in 400 response");
});

test("PUT /api/settings/quota-store driver=redis with valid URL → 200 + audit event", async () => {
  const req = await makeManagementSessionRequest(
    "http://localhost/api/settings/quota-store",
    {
      method: "PUT",
      body: { driver: "redis", redisUrl: "redis://localhost:6379" },
    }
  );
  const res = await settingsRoute.PUT(req);
  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    driver: string;
    redisUrlConfigured: boolean;
    redisUrl: null;
  };
  assert.equal(body.driver, "redis");
  assert.equal(body.redisUrlConfigured, true);
  // Hard Rule #12 / #1 — URL NEVER in response
  assert.equal(body.redisUrl, null);

  // Audit event
  const logs = compliance.getAuditLog({ action: "quota.store.driver_changed", limit: 10 });
  const events = Array.isArray(logs) ? logs : [];
  const evt = events.find(
    (e) =>
      typeof e === "object" &&
      e !== null &&
      (e as Record<string, unknown>).action === "quota.store.driver_changed"
  );
  assert.ok(evt, "quota.store.driver_changed audit event must be present");

  // Verify the actual Redis URL was NOT logged in audit metadata
  const evtStr = JSON.stringify(evt);
  assert.doesNotMatch(
    evtStr,
    /redis:\/\/localhost:6379/,
    "Actual Redis URL must not appear in audit log metadata"
  );
});

test("PUT /api/settings/quota-store with invalid driver → 400 (Zod)", async () => {
  const req = await makeManagementSessionRequest(
    "http://localhost/api/settings/quota-store",
    {
      method: "PUT",
      body: { driver: "memcached" }, // Not in enum
    }
  );
  const res = await settingsRoute.PUT(req);
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.ok(body.error?.message, "Should have error message");
  assert.doesNotMatch(JSON.stringify(body), /\s+at\s+\//, "No stack trace in 400 response");
});
