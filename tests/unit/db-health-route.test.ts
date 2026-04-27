import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-health-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "task-303-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const routeModule = await import("../../src/app/api/v1/db/health/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function makeRequest(method, token) {
  return new Request("http://localhost/api/v1/db/health", {
    method,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
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
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("GET /api/v1/db/health requires authentication", async () => {
  const previousInitialPassword = process.env.INITIAL_PASSWORD;
  process.env.INITIAL_PASSWORD = "route-health-auth";

  try {
    const response = await routeModule.GET(makeRequest("GET"));
    const body = (await response.json()) as any;

    assert.equal(response.status, 401);
    assert.equal(body.error.message, "Authentication required");
  } finally {
    if (previousInitialPassword === undefined) {
      delete process.env.INITIAL_PASSWORD;
    } else {
      process.env.INITIAL_PASSWORD = previousInitialPassword;
    }
  }
});

test("GET /api/v1/db/health diagnoses without mutating database rows", async () => {
  const authKey = await apiKeysDb.createApiKey("Health Route", "machine-route-health");
  const db = core.getDbInstance();
  insertBrokenRows(db);

  const response = await routeModule.GET(makeRequest("GET", authKey.key));
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.isHealthy, false);
  assert.equal(body.repairedCount, 0);
  assert.equal((db.prepare("SELECT COUNT(*) AS count FROM quota_snapshots").get() as any).count, 1);
  assert.equal((db.prepare("SELECT COUNT(*) AS count FROM domain_budgets").get() as any).count, 1);
});

test("POST /api/v1/db/health repairs broken rows for authenticated callers", async () => {
  const authKey = await apiKeysDb.createApiKey("Health Route", "machine-route-health");
  const db = core.getDbInstance();
  insertBrokenRows(db);

  const response = await routeModule.POST(makeRequest("POST", authKey.key));
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.isHealthy, false);
  assert.equal(body.repairedCount, 2);
  assert.equal((db.prepare("SELECT COUNT(*) AS count FROM quota_snapshots").get() as any).count, 0);
  assert.equal((db.prepare("SELECT COUNT(*) AS count FROM domain_budgets").get() as any).count, 0);
});
