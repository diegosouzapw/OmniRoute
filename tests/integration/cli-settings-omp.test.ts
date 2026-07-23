/**
 * Integration tests for /api/cli-tools/omp-settings
 *
 * Oh My Pi (omp) reads its own local sqlite DB (~/.omp/agent/agent.db,
 * created by the omp CLI itself) via src/lib/db/omp.ts, plus a
 * ~/.omp/agent/models.yml file for provider/model discovery config. The route
 * shells out to `which omp` to detect the CLI install, so it is classified
 * local-only in routeGuard.ts (Hard Rules #15 + #17) AND guarded by
 * requireCliToolsAuth() like every other cli-tools route
 * (tests/unit/cli-tools-auth-hardening.test.ts).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-omp-settings-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret-omp";
process.env.JWT_SECRET = "test-jwt-secret-omp";

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");

const { GET, POST, DELETE } = await import("../../src/app/api/cli-tools/omp-settings/route.ts");

let tmpHome: string;
let origHome: string | undefined;

function getOmpDir() {
  return path.join(tmpHome, ".omp", "agent");
}

function req(init?: RequestInit) {
  return new Request("http://localhost/api/cli-tools/omp-settings", init);
}

/** Simulate the omp CLI having already created its sqlite DB + schema. */
function seedOmpDb() {
  const dbPath = path.join(getOmpDir(), "agent.db");
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const db = new Database(dbPath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS auth_credentials (
      provider TEXT NOT NULL,
      credential_type TEXT NOT NULL,
      data TEXT,
      disabled_cause TEXT,
      identity_key TEXT,
      created_at INTEGER,
      updated_at INTEGER
    )
  `);
  db.close();
}

async function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function enableAuth() {
  process.env.INITIAL_PASSWORD = "test-bootstrap";
  await localDb.updateSettings({ requireLogin: true, password: "" });
}

test.beforeEach(async () => {
  await resetStorage();
  tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "omp-settings-home-"));
  origHome = process.env.HOME;
  process.env.HOME = tmpHome;
});

test.afterEach(() => {
  process.env.HOME = origHome;
  fs.rmSync(tmpHome, { recursive: true, force: true });
});

// ── Test 1: GET without auth → 401 ──────────────────────────────────────────

test("omp-settings GET: returns 401 when auth required and no token", async () => {
  await enableAuth();
  const res = await GET(req());
  assert.equal(res.status, 401, `Expected 401, got ${res.status}`);
});

// ── Test 2: GET → 200 with installed:false when omp is not present ──────────

test("omp-settings GET: returns 200 installed:false when omp CLI and DB are both absent", async () => {
  const res = await GET(req());
  assert.equal(res.status, 200, `Expected 200, got ${res.status}`);
  const body = await res.json();
  assert.equal(body.installed, false);
  assert.equal(body.config, null);
});

// ── Test 3: GET → detects "installed" via the DB file even without the binary on PATH ──

test("omp-settings GET: treats an existing agent.db as installed", async () => {
  seedOmpDb();
  const res = await GET(req());
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.installed, true);
  assert.equal(body.hasOmniRoute, false);
});

// ── Test 4: POST with invalid body → 400 ─────────────────────────────────────

test("omp-settings POST: 400 when baseUrl is missing", async () => {
  const res = await POST(
    req({
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ apiKey: "sk-test" }),
    })
  );
  assert.equal(res.status, 400, `Expected 400, got ${res.status}`);
  const body = await res.json();
  assert.ok(body.error !== undefined);
});

// ── Test 5: POST with valid body → writes models.yml + persists credentials ──

test("omp-settings POST: writes models.yml and persists credentials for a seeded DB", async () => {
  seedOmpDb();

  const res = await POST(
    req({
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ baseUrl: "http://localhost:20128", apiKey: "sk-test-omp" }),
    })
  );
  assert.equal(res.status, 200, `Expected 200, got ${res.status}`);
  const body = await res.json();
  assert.equal(body.success, true);

  const modelsYmlPath = path.join(getOmpDir(), "models.yml");
  assert.ok(fs.existsSync(modelsYmlPath), "models.yml must be written");
  const content = fs.readFileSync(modelsYmlPath, "utf-8");
  assert.ok(content.includes("http://localhost:20128/v1"), "models.yml must contain the base URL");

  const getRes = await GET(req());
  const getBody = await getRes.json();
  assert.equal(getBody.hasOmniRoute, true);
});

// ── Test 6: DELETE → removes OmniRoute provider entry ────────────────────────

test("omp-settings DELETE: removes the OmniRoute provider from models.yml and credentials", async () => {
  seedOmpDb();
  await POST(
    req({
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ baseUrl: "http://localhost:20128", apiKey: "sk-test-omp" }),
    })
  );

  const res = await DELETE(req({ method: "DELETE" }));
  assert.equal(res.status, 200, `Expected 200, got ${res.status}`);
  const body = await res.json();
  assert.equal(body.success, true);

  const getRes = await GET(req());
  const getBody = await getRes.json();
  assert.equal(getBody.hasOmniRoute, false);
});

// ── Test 7: Error sanitization (Hard Rule #12) ───────────────────────────────

test("omp-settings: error responses do not leak stack traces", async () => {
  const badReq = req({
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{ bad json }",
  });
  const res = await POST(badReq);
  const bodyStr = JSON.stringify(await res.json());
  assert.ok(
    !bodyStr.match(/\s+at\s+\/[^\s]/),
    "Error response must not contain absolute-path stack traces"
  );
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  delete process.env.DATA_DIR;
  delete process.env.API_KEY_SECRET;
  delete process.env.JWT_SECRET;
});
