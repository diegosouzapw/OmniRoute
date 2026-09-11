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
import * as yaml from "js-yaml";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-omp-settings-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret-omp";
process.env.JWT_SECRET = "test-jwt-secret-omp";

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("@/lib/db/settings");
const localDb = { updateSettings };

const { GET, POST, DELETE } = await import("../../src/app/api/cli-tools/omp-settings/route.ts");

let tmpHome: string;
let origHome: string | undefined;
const originalHomedir = os.homedir;

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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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
  // Belt and braces: the route resolves paths via os.homedir() at call time.
  os.homedir = () => tmpHome;
});

test.afterEach(() => {
  process.env.HOME = origHome;
  os.homedir = originalHomedir;
  fs.rmSync(tmpHome, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ── Test 1: GET without auth → 401 ──────────────────────────────────────────

test("omp-settings GET: returns 401 when auth required and no token", async () => {
  await enableAuth();
  const res = await GET(req());
  assert.equal(res.status, 401, `Expected 401, got ${res.status}`);
});

// ── Test 2: GET → 200 with installed:false when omp is not present ──────────

test("omp-settings GET: returns 200 installed:false when omp CLI and DB are both absent", async () => {
  // The dev machine may have omp installed; force the "binary absent" branch
  // by blanking PATH for this request only.
  const origPath = process.env.PATH;
  process.env.PATH = "";
  try {
    const res = await GET(req());
    assert.equal(res.status, 200, `Expected 200, got ${res.status}`);
    const body = await res.json();
    assert.equal(body.installed, false);
    assert.equal(body.config, null);
  } finally {
    process.env.PATH = origPath;
  }
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

// ── Test 5: POST with valid body → writes models.yml with the env-var NAME contract ──

test("omp-settings POST: writes models.yml with the env-var NAME, never a literal key", async () => {
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
  assert.ok(content.includes("apiKey: OMNIROUTE_API_KEY"), "key referenced by env-var NAME");
  assert.ok(content.includes("type: openai-models-list"), "openai-models-list discovery");
  assert.ok(!content.includes("sk-test-omp"), "submitted key is never persisted");
  assert.ok(!/sk-[A-Za-z0-9_-]{8,}/.test(content), "no key-shaped literal on disk");

  const agentDb = new Database(path.join(getOmpDir(), "agent.db"), { readonly: true });
  try {
    const persisted = agentDb
      .prepare("SELECT COUNT(*) AS n FROM auth_credentials WHERE provider = ?")
      .get("omniroute") as { n: number };
    assert.equal(persisted.n, 0, "POST must not persist omniroute credentials in agent.db");
  } finally {
    agentDb.close();
  }

  const getRes = await GET(req());
  const getBody = await getRes.json();
  assert.equal(getBody.hasOmniRoute, true);
  assert.equal(getBody.config.providers.omniroute.apiKey, "OMNIROUTE_API_KEY");
  assert.ok(
    !JSON.stringify(getBody).match(/sk-[A-Za-z0-9_-]{8,}/),
    "GET never returns a stored credential"
  );
});

// ── Test 5b: POST preserves unrelated providers and normalizes baseUrl ──

test("omp-settings POST: preserves unrelated providers and normalizes trailing slashes", async () => {
  const modelsYmlPath = path.join(getOmpDir(), "models.yml");
  fs.mkdirSync(path.dirname(modelsYmlPath), { recursive: true });
  fs.writeFileSync(
    modelsYmlPath,
    "providers:\n  other:\n    baseUrl: http://localhost:9999/v1\n    api: openai-completions\n"
  );

  const res = await POST(
    req({
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ baseUrl: "http://localhost:20128/" }),
    })
  );
  assert.equal(res.status, 200, `Expected 200, got ${res.status}`);

  const content = fs.readFileSync(modelsYmlPath, "utf-8");
  assert.ok(content.includes("other:"), "unrelated provider preserved");
  const parsed = yaml.load(content) as {
    providers?: { omniroute?: { baseUrl?: string }; other?: unknown };
  };
  assert.equal(
    parsed.providers?.omniroute?.baseUrl,
    "http://localhost:20128/v1",
    "trailing slash must normalize to a single /v1"
  );
  assert.ok(!content.includes("baseUrl: http://localhost:20128//v1"), "no double-slash artifact");
});

// ── Test 5c: POST refuses to overwrite an unparseable models.yml ──

test("omp-settings POST: refuses to overwrite an unparseable models.yml", async () => {
  const modelsYmlPath = path.join(getOmpDir(), "models.yml");
  fs.mkdirSync(path.dirname(modelsYmlPath), { recursive: true });
  fs.writeFileSync(modelsYmlPath, "providers:\n  omniroute: [unclosed");

  const res = await POST(
    req({
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ baseUrl: "http://localhost:20128" }),
    })
  );
  assert.equal(res.status, 500, `Expected 500, got ${res.status}`);
  assert.match(
    JSON.stringify(await res.json()),
    /Cannot parse existing/,
    "readable parse error reported"
  );
  assert.equal(
    fs.readFileSync(modelsYmlPath, "utf-8"),
    "providers:\n  omniroute: [unclosed",
    "corrupt file left untouched"
  );
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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.DATA_DIR;
  delete process.env.API_KEY_SECRET;
  delete process.env.JWT_SECRET;
});
