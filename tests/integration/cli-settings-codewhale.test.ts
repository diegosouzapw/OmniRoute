/**
 * Integration tests for /api/cli-tools/codewhale-settings
 *
 * CodeWhale (https://github.com/Hmbown/CodeWhale) is the actively-maintained
 * successor to DeepSeek TUI (same author, renamed project). This route mirrors
 * deepseek-tui-settings/route.ts but writes/reads a dual config path:
 *   - primary: ~/.codewhale/config.toml
 *   - legacy:  ~/.deepseek/config.toml (kept in sync when it already exists,
 *              so users upgrading their CLI binary keep working)
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codewhale-settings-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret-codewhale";
process.env.JWT_SECRET = "test-jwt-secret-codewhale";

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");

const { GET, POST, DELETE } = await import("../../src/app/api/cli-tools/codewhale-settings/route.ts");

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
});

// ── Test 1: GET without auth → 401 ──────────────────────────────────────────

test("codewhale-settings GET: returns 401 when auth required and no token", async () => {
  await enableAuth();
  const res = await GET(new Request("http://localhost/api/cli-tools/codewhale-settings"));
  assert.equal(res.status, 401, `Expected 401, got ${res.status}`);
});

// ── Test 2: GET without auth requirement → 200 ───────────────────────────────

test("codewhale-settings GET: returns 200 when auth not required", async () => {
  const res = await GET(new Request("http://localhost/api/cli-tools/codewhale-settings"));
  assert.equal(res.status, 200, `Expected 200, got ${res.status}`);
  const body = await res.json();
  assert.ok(
    "installed" in body || "config" in body,
    "Response should contain installed or config field"
  );
});

// ── Test 3: POST with invalid body → 400 ─────────────────────────────────────

test("codewhale-settings POST: 400 when baseUrl is missing", async () => {
  const res = await POST(
    new Request("http://localhost/api/cli-tools/codewhale-settings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ apiKey: "sk-test", model: "deepseek-v4-pro" }),
    })
  );
  assert.equal(res.status, 400, `Expected 400, got ${res.status}`);
  const body = await res.json();
  assert.ok(body.error !== undefined);
});

test("codewhale-settings POST: 400 when model is missing", async () => {
  const res = await POST(
    new Request("http://localhost/api/cli-tools/codewhale-settings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ baseUrl: "http://localhost:20128", apiKey: "sk-test" }),
    })
  );
  assert.equal(res.status, 400, `Expected 400, got ${res.status}`);
});

// ── Test 4: POST with valid body → writes PRIMARY config.toml only (no legacy dir) ──

test("codewhale-settings POST: writes primary ~/.codewhale/config.toml for a fresh install", async () => {
  const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "codewhale-home-"));
  const origHome = process.env.HOME;
  process.env.HOME = tmpHome;

  try {
    const res = await POST(
      new Request("http://localhost/api/cli-tools/codewhale-settings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          baseUrl: "http://localhost:20128",
          apiKey: "sk-test-codewhale-key",
          model: "deepseek-v4-pro",
        }),
      })
    );
    assert.ok([200, 403, 500].includes(res.status), `Unexpected status ${res.status}`);
    if (res.status === 200) {
      const body = await res.json();
      assert.equal(body.success, true);

      const primaryPath = path.join(tmpHome, ".codewhale", "config.toml");
      assert.ok(fs.existsSync(primaryPath), "Primary ~/.codewhale/config.toml must be written");
      const content = fs.readFileSync(primaryPath, "utf-8");
      assert.ok(content.includes("managed by OmniRoute"), "Config should have OmniRoute marker");
      assert.ok(content.includes("http://localhost:20128"), "Config should contain base URL");
      assert.ok(content.includes("[openai]"), "Config should have [openai] section");

      // No legacy ~/.deepseek dir existed before the write — must NOT be created.
      const legacyPath = path.join(tmpHome, ".deepseek", "config.toml");
      assert.ok(
        !fs.existsSync(legacyPath),
        "Legacy ~/.deepseek/config.toml must not be created for a fresh install"
      );
    }
  } finally {
    process.env.HOME = origHome;
    fs.rmSync(tmpHome, { recursive: true, force: true });
  }
});

// ── Test 5: POST keeps an EXISTING legacy ~/.deepseek config in sync ────────

test("codewhale-settings POST: syncs an existing legacy ~/.deepseek/config.toml", async () => {
  const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "codewhale-home-legacy-"));
  const origHome = process.env.HOME;
  process.env.HOME = tmpHome;

  try {
    // Simulate an existing DeepSeek TUI install (pre-CodeWhale upgrade).
    const legacyDir = path.join(tmpHome, ".deepseek");
    fs.mkdirSync(legacyDir, { recursive: true });
    fs.writeFileSync(path.join(legacyDir, "config.toml"), 'provider = "deepseek"\n');

    const res = await POST(
      new Request("http://localhost/api/cli-tools/codewhale-settings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          baseUrl: "http://localhost:20128",
          apiKey: "sk-test-codewhale-key",
          model: "deepseek-v4-flash",
        }),
      })
    );
    assert.ok([200, 403, 500].includes(res.status), `Unexpected status ${res.status}`);
    if (res.status === 200) {
      const primaryPath = path.join(tmpHome, ".codewhale", "config.toml");
      const legacyPath = path.join(tmpHome, ".deepseek", "config.toml");

      assert.ok(fs.existsSync(primaryPath), "Primary config must be written");
      assert.ok(fs.existsSync(legacyPath), "Legacy config must still exist");

      const primaryContent = fs.readFileSync(primaryPath, "utf-8");
      const legacyContent = fs.readFileSync(legacyPath, "utf-8");
      assert.ok(primaryContent.includes("http://localhost:20128"));
      assert.ok(
        legacyContent.includes("http://localhost:20128"),
        "Legacy config must be kept in sync with the new base URL"
      );
      assert.equal(primaryContent, legacyContent, "Primary and legacy configs should match");
    }
  } finally {
    process.env.HOME = origHome;
    fs.rmSync(tmpHome, { recursive: true, force: true });
  }
});

// ── Test 6: GET reads from legacy path when only legacy config exists ───────

test("codewhale-settings GET: falls back to legacy ~/.deepseek/config.toml when primary is absent", async () => {
  const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "codewhale-home-getlegacy-"));
  const origHome = process.env.HOME;
  process.env.HOME = tmpHome;

  try {
    const legacyDir = path.join(tmpHome, ".deepseek");
    fs.mkdirSync(legacyDir, { recursive: true });
    fs.writeFileSync(
      path.join(legacyDir, "config.toml"),
      '# managed by OmniRoute (plan 14)\n[openai]\nbase_url = "http://localhost:20128"\n'
    );

    const res = await GET(new Request("http://localhost/api/cli-tools/codewhale-settings"));
    assert.equal(res.status, 200);
    const body = await res.json();
    if (body.config) {
      assert.ok(body.config.includes("managed by OmniRoute"));
      assert.equal(body.hasOmniRoute, true);
    }
  } finally {
    process.env.HOME = origHome;
    fs.rmSync(tmpHome, { recursive: true, force: true });
  }
});

// ── Test 7: DELETE → removes both primary and legacy config files ───────────

test("codewhale-settings DELETE: removes primary and legacy config files", async () => {
  const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "codewhale-home-del-"));
  const origHome = process.env.HOME;
  process.env.HOME = tmpHome;

  try {
    const primaryDir = path.join(tmpHome, ".codewhale");
    const legacyDir = path.join(tmpHome, ".deepseek");
    fs.mkdirSync(primaryDir, { recursive: true });
    fs.mkdirSync(legacyDir, { recursive: true });
    fs.writeFileSync(
      path.join(primaryDir, "config.toml"),
      '# managed by OmniRoute (plan 14)\n[openai]\nbase_url = "http://localhost:20128"\n'
    );
    fs.writeFileSync(
      path.join(legacyDir, "config.toml"),
      '# managed by OmniRoute (plan 14)\n[openai]\nbase_url = "http://localhost:20128"\n'
    );

    const res = await DELETE(
      new Request("http://localhost/api/cli-tools/codewhale-settings", { method: "DELETE" })
    );
    assert.ok([200, 403, 500].includes(res.status), `Expected 200/403/500, got ${res.status}`);
    if (res.status === 200) {
      const body = await res.json();
      assert.equal(body.success, true);
      assert.ok(!fs.existsSync(path.join(primaryDir, "config.toml")), "Primary config removed");
      assert.ok(!fs.existsSync(path.join(legacyDir, "config.toml")), "Legacy config removed");
    }
  } finally {
    process.env.HOME = origHome;
    fs.rmSync(tmpHome, { recursive: true, force: true });
  }
});

// ── Test 8: Error sanitization (Hard Rule #12) ───────────────────────────────

test("codewhale-settings: error responses do not leak stack traces", async () => {
  const badReq = new Request("http://localhost/api/cli-tools/codewhale-settings", {
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

// ── Test 9: Hard Rule #13 (no exec/spawn) ────────────────────────────────────

test("codewhale-settings route.ts: does not call exec() or spawn() directly", () => {
  const routePath = path.resolve(
    import.meta.dirname,
    "../../src/app/api/cli-tools/codewhale-settings/route.ts"
  );
  const content = fs.readFileSync(routePath, "utf-8");
  assert.ok(!content.match(/\bexec\s*\(/), "Handler must not use exec()");
  assert.ok(!content.match(/\bspawn\s*\(/), "Handler must not use spawn()");
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  delete process.env.DATA_DIR;
  delete process.env.API_KEY_SECRET;
  delete process.env.JWT_SECRET;
});
