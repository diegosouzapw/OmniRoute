/**
 * Integration tests for /api/cli-tools/letta-settings
 *
 * Letta configures OmniRoute as its "lmstudio" provider (localModelDiscovery:
 * openai-compatible auto-discovers models from /v1/models). The route shells
 * out to `which letta` to detect the CLI install, so it is classified
 * local-only in routeGuard.ts (Hard Rules #15 + #17) AND guarded by
 * requireCliToolsAuth() like every other cli-tools route
 * (tests/unit/cli-tools-auth-hardening.test.ts).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-letta-settings-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret-letta";
process.env.JWT_SECRET = "test-jwt-secret-letta";

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");

const { GET, POST, DELETE } = await import(
  "../../src/app/api/cli-tools/letta-settings/route.ts"
);

let tmpHome: string;
let origHome: string | undefined;

function getAuthPath() {
  return path.join(tmpHome, ".letta", "lc-local-backend", "providers", "auth.json");
}

function req(init?: RequestInit) {
  return new Request("http://localhost/api/cli-tools/letta-settings", init);
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
  tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "letta-settings-home-"));
  origHome = process.env.HOME;
  process.env.HOME = tmpHome;
});

test.afterEach(() => {
  process.env.HOME = origHome;
  fs.rmSync(tmpHome, { recursive: true, force: true });
});

// ── Test 1: GET without auth → 401 ──────────────────────────────────────────

test("letta-settings GET: returns 401 when auth required and no token", async () => {
  await enableAuth();
  const res = await GET(req());
  assert.equal(res.status, 401, `Expected 401, got ${res.status}`);
});

// ── Test 2: GET → 200 installed:false when the letta CLI is absent ──────────

test("letta-settings GET: returns 200 installed:false when Letta CLI is absent", async () => {
  const res = await GET(req());
  assert.equal(res.status, 200, `Expected 200, got ${res.status}`);
  const body = await res.json();
  assert.equal(body.installed, false);
  assert.equal(body.config, null);
});

// ── Test 3: GET → detects "installed" via an existing ~/.letta dir ──────────

test("letta-settings GET: treats an existing ~/.letta directory as installed", async () => {
  fs.mkdirSync(path.join(tmpHome, ".letta"), { recursive: true });
  const res = await GET(req());
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.installed, true);
  assert.equal(body.hasOmniRoute, false);
});

// ── Test 4: POST with invalid body → 400 ─────────────────────────────────────

test("letta-settings POST: 400 when baseUrl is missing", async () => {
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

// ── Test 5: POST with valid body → writes the lmstudio provider to auth.json ─

test("letta-settings POST: writes the lmstudio provider entry for a fresh install", async () => {
  const res = await POST(
    req({
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ baseUrl: "http://localhost:20128", apiKey: "sk-test-letta" }),
    })
  );
  assert.equal(res.status, 200, `Expected 200, got ${res.status}`);
  const body = await res.json();
  assert.equal(body.success, true);

  const authPath = getAuthPath();
  assert.ok(fs.existsSync(authPath), "auth.json must be written");
  const authFile = JSON.parse(fs.readFileSync(authPath, "utf-8"));
  assert.equal(authFile.providers.lmstudio.base_url, "http://localhost:20128/v1");
  assert.equal(authFile.providers.lmstudio.auth.key, "sk-test-letta");
});

// ── Test 6: POST refuses to overwrite an existing non-OmniRoute lmstudio config ──

test("letta-settings POST: 409 when lmstudio is already configured for real LM Studio", async () => {
  const providersDir = path.join(tmpHome, ".letta", "lc-local-backend", "providers");
  fs.mkdirSync(providersDir, { recursive: true });
  fs.writeFileSync(
    path.join(providersDir, "auth.json"),
    JSON.stringify({
      version: 1,
      providers: { lmstudio: { base_url: "http://localhost:1234/v1" } },
    })
  );

  const res = await POST(
    req({
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ baseUrl: "http://localhost:20128", apiKey: "sk-test-letta" }),
    })
  );
  assert.equal(res.status, 409, `Expected 409, got ${res.status}`);
  const body = await res.json();
  assert.equal(body.conflict, true);
});

// ── Test 7: DELETE → removes the OmniRoute lmstudio config ──────────────────

test("letta-settings DELETE: removes the lmstudio provider written by POST", async () => {
  await POST(
    req({
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ baseUrl: "http://localhost:20128", apiKey: "sk-test-letta" }),
    })
  );

  const res = await DELETE(req({ method: "DELETE" }));
  assert.equal(res.status, 200, `Expected 200, got ${res.status}`);
  const body = await res.json();
  assert.equal(body.success, true);

  const authFile = JSON.parse(fs.readFileSync(getAuthPath(), "utf-8"));
  assert.ok(!authFile.providers.lmstudio, "lmstudio provider must be removed");
});

// ── Test 8: Error sanitization (Hard Rule #12) ───────────────────────────────

test("letta-settings: error responses do not leak stack traces", async () => {
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
