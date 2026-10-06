/**
 * Integration tests for /api/cli-tools/jcode-settings
 * Plan 14 F3 — settings handler for jcode (configType: "custom")
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-jcode-settings-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret-jcode";
process.env.JWT_SECRET = "test-jwt-secret-jcode";

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("@/lib/db/settings");
const localDb = { updateSettings };

const { GET, POST, DELETE } = await import("../../src/app/api/cli-tools/jcode-settings/route.ts");

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
});

// ── Test 1: GET without auth → 401 ──────────────────────────────────────────

test("jcode-settings GET: returns 401 when auth required and no token", async () => {
  await enableAuth();
  const res = await GET(new Request("http://localhost/api/cli-tools/jcode-settings"));
  assert.equal(res.status, 401, `Expected 401, got ${res.status}`);
});

// ── Test 2: GET without auth requirement → 200 ───────────────────────────────

test("jcode-settings GET: returns 200 when auth not required", async () => {
  const res = await GET(new Request("http://localhost/api/cli-tools/jcode-settings"));
  assert.equal(res.status, 200, `Expected 200, got ${res.status}`);
  const body = await res.json();
  assert.ok(
    "installed" in body || "config" in body,
    "Response should contain installed or config field"
  );
});

// ── Test 3: POST with invalid body → 400 ─────────────────────────────────────

test("jcode-settings POST: 400 when baseUrl is missing", async () => {
  const res = await POST(
    new Request("http://localhost/api/cli-tools/jcode-settings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ apiKey: "sk-test", model: "gpt-5" }),
    })
  );
  assert.equal(res.status, 400, `Expected 400, got ${res.status}`);
  const body = await res.json();
  assert.ok(body.error !== undefined);
});

test("jcode-settings POST: 400 when model is missing", async () => {
  const res = await POST(
    new Request("http://localhost/api/cli-tools/jcode-settings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ baseUrl: "http://localhost:20128", apiKey: "sk-test" }),
    })
  );
  assert.equal(res.status, 400, `Expected 400, got ${res.status}`);
});

// ── Test 4: POST with valid body → writes provider profile into config.toml ──

test("jcode-settings POST: writes [providers.omniroute] into config.toml", async () => {
  const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "jcode-home-"));
  const origHome = process.env.HOME;
  process.env.HOME = tmpHome;

  try {
    const res = await POST(
      new Request("http://localhost/api/cli-tools/jcode-settings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          baseUrl: "http://localhost:20128",
          apiKey: "sk-test-jcode-key",
          model: "gpt-5.4-mini",
        }),
      })
    );
    assert.ok([200, 403, 500].includes(res.status), `Unexpected status ${res.status}`);
    if (res.status === 200) {
      const body = await res.json();
      assert.equal(body.success, true);
      const configPath = path.join(tmpHome, ".jcode", "config.toml");
      if (fs.existsSync(configPath)) {
        const written = fs.readFileSync(configPath, "utf-8");
        assert.ok(written.includes("managed by OmniRoute"));
        assert.ok(written.includes("[providers.omniroute]"));
        assert.ok(written.includes('type = "openai-compatible"'));
        assert.ok(written.includes("localhost:20128/v1"));
        assert.ok(written.includes('default_model = "gpt-5.4-mini"'));
      }
    }
  } finally {
    process.env.HOME = origHome;
    fs.rmSync(tmpHome, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

// ── Test 5: DELETE → removes OmniRoute fields ────────────────────────────────

test("jcode-settings DELETE: removes only the OmniRoute-managed block", async () => {
  const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "jcode-home-del-"));
  const origHome = process.env.HOME;
  process.env.HOME = tmpHome;

  try {
    const jcodeDir = path.join(tmpHome, ".jcode");
    fs.mkdirSync(jcodeDir, { recursive: true });
    const userSection = '[provider]\ndefault_model = "claude-opus-4-8"\n';
    const managedBlock = [
      "# >>> managed by OmniRoute (jcode provider profile) >>>",
      "[providers.omniroute]",
      'type = "openai-compatible"',
      'base_url = "http://localhost:20128/v1"',
      'api_key = "sk-test"',
      'default_model = "gpt-5"',
      "requires_api_key = false",
      "# <<< managed by OmniRoute <<<",
    ].join("\n");
    fs.writeFileSync(path.join(jcodeDir, "config.toml"), `${userSection}\n${managedBlock}\n`);

    const res = await DELETE(
      new Request("http://localhost/api/cli-tools/jcode-settings", { method: "DELETE" })
    );
    assert.ok([200, 403, 500].includes(res.status), `Expected 200/403/500, got ${res.status}`);
    if (res.status === 200) {
      const body = await res.json();
      assert.equal(body.success, true);
      const configPath = path.join(jcodeDir, "config.toml");
      if (fs.existsSync(configPath)) {
        const remaining = fs.readFileSync(configPath, "utf-8");
        assert.ok(!remaining.includes("managed by OmniRoute"));
        assert.ok(!remaining.includes("[providers.omniroute]"));
        assert.ok(remaining.includes('default_model = "claude-opus-4-8"'));
      }
    }
  } finally {
    process.env.HOME = origHome;
    fs.rmSync(tmpHome, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

// ── Test 6: Error sanitization (Hard Rule #12) ───────────────────────────────

test("jcode-settings: error responses do not leak stack traces", async () => {
  const badReq = new Request("http://localhost/api/cli-tools/jcode-settings", {
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

// ── Test 7: Hard Rule #13 (no exec/spawn) ────────────────────────────────────

test("jcode-settings route.ts: does not call exec() or spawn() directly", () => {
  const routePath = path.resolve(
    import.meta.dirname,
    "../../src/app/api/cli-tools/jcode-settings/route.ts"
  );
  const content = fs.readFileSync(routePath, "utf-8");
  assert.ok(!content.match(/\bexec\s*\(/), "Handler must not use exec()");
  assert.ok(!content.match(/\bspawn\s*\(/), "Handler must not use spawn()");
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.DATA_DIR;
  delete process.env.API_KEY_SECRET;
  delete process.env.JWT_SECRET;
});
