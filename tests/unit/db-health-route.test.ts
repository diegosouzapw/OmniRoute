import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-health-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "task-303-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const routeModule = await import("../../src/app/api/db/health/route.ts");

const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const TEST_JWT_SECRET = "db-health-route-jwt-secret";
const TEST_INITIAL_PASSWORD = "db-health-route-password";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  process.env.JWT_SECRET = TEST_JWT_SECRET;
  process.env.INITIAL_PASSWORD = TEST_INITIAL_PASSWORD;
}

function makeRequest(method, cookie) {
  return new Request("http://localhost/api/db/health", {
    method,
    headers: cookie ? { cookie } : {},
  });
}

async function dashboardCookie() {
  const secret = new TextEncoder().encode(TEST_JWT_SECRET);
  const token = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
  return `auth_token=${token}`;
}

function insertBrokenRows(db) {
  db.prepare(
    `INSERT INTO quota_snapshots
      (provider, connection_id, window_key, remaining_percentage, is_exhausted, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run("openai", "missing-conn", "monthly", 75, 0, new Date().toISOString());
  db.prepare(
    "INSERT INTO domain_budgets (api_key_id, daily_limit_usd, monthly_limit_usd, warning_threshold) VALUES (?, ?, ?, ?)"
  ).run("missing-key", 10, 100, 0.8);
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_JWT_SECRET === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
});

test("GET /api/db/health requires authentication", async () => {
  const response = await routeModule.GET(makeRequest("GET"));
  const body = (await response.json()) as any;

  assert.equal(response.status, 401);
  assert.equal(body.error.message, "Authentication required");
});

test("GET /api/db/health diagnoses without mutating database rows", async () => {
  const cookie = await dashboardCookie();
  const db = core.getDbInstance();
  insertBrokenRows(db);

  const response = await routeModule.GET(makeRequest("GET", cookie));
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.isHealthy, false);
  assert.equal(body.repairedCount, 0);
  assert.equal((db.prepare("SELECT COUNT(*) AS count FROM quota_snapshots").get() as any).count, 1);
  assert.equal((db.prepare("SELECT COUNT(*) AS count FROM domain_budgets").get() as any).count, 1);
});

test("POST /api/db/health repairs broken rows for authenticated callers", async () => {
  const cookie = await dashboardCookie();
  const db = core.getDbInstance();
  insertBrokenRows(db);

  const response = await routeModule.POST(makeRequest("POST", cookie));
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.isHealthy, false);
  assert.equal(body.repairedCount, 2);
  assert.equal((db.prepare("SELECT COUNT(*) AS count FROM quota_snapshots").get() as any).count, 0);
  assert.equal((db.prepare("SELECT COUNT(*) AS count FROM domain_budgets").get() as any).count, 0);
});
