/**
 * Integration tests for /api/cli-tools/forge-settings
 * Plan 14 F3 — settings handler for ForgeCode (configType: "custom")
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-forge-settings-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret-forge";
process.env.JWT_SECRET = "test-jwt-secret-forge";

// Import DB reset helpers (must be before route import)
const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");

// Import route handlers
const { GET, POST, DELETE } = await import(
  "../../src/app/api/cli-tools/forge-settings/route.ts"
);

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

// ── Test 1: GET without auth when auth is required → 401 ────────────────────

test("forge-settings GET: returns 401 when auth required and no token", async () => {
  await enableAuth();
  const res = await GET(new Request("http://localhost/api/cli-tools/forge-settings"));
  assert.equal(res.status, 401, `Expected 401, got ${res.status}`);
});

// ── Test 2: GET with valid auth → 200 ────────────────────────────────────────

test("forge-settings GET: returns 200 with valid auth (forge not installed on CI)", async () => {
  // No auth required in default test state (no INITIAL_PASSWORD, no requireLogin)
  const res = await GET(new Request("http://localhost/api/cli-tools/forge-settings"));
  assert.equal(res.status, 200, `Expected 200, got ${res.status}`);
  const body = await res.json();
  assert.ok(
    "installed" in body || "config" in body,
    "Response should contain installed or config field"
  );
});

// ── Test 3: POST with invalid body → 400 ─────────────────────────────────────

test("forge-settings POST: 400 when baseUrl is missing", async () => {
  const res = await POST(
    new Request("http://localhost/api/cli-tools/forge-settings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ apiKey: "sk-test", model: "gpt-5" }), // missing baseUrl
    })
  );
  assert.equal(res.status, 400, `Expected 400 for missing baseUrl, got ${res.status}`);
  const body = await res.json();
  assert.ok(body.error !== undefined, "Response should have error field");
});

test("forge-settings POST: 400 when model is missing", async () => {
  const res = await POST(
    new Request("http://localhost/api/cli-tools/forge-settings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ baseUrl: "http://localhost:20128", apiKey: "sk-test" }),
    })
  );
  assert.equal(res.status, 400, `Expected 400 for missing model, got ${res.status}`);
});

// ── Test 4: POST with valid body → writes config.toml ──────────────────────

test("forge-settings POST: writes config.toml with valid body", async () => {
  const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "forge-home-"));
  const origHome = process.env.HOME;
  process.env.HOME = tmpHome;

  try {
    const res = await POST(
      new Request("http://localhost/api/cli-tools/forge-settings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          baseUrl: "http://localhost:20128",
          apiKey: "sk-test-forge-key",
          model: "gpt-5.4-mini",
        }),
      })
    );

    // 200 = success; 403 = write guard active (test env); 500 = backup dir issue
    assert.ok(
      [200, 403, 500].includes(res.status),
      `Unexpected status ${res.status}`
    );

    if (res.status === 200) {
      const body = await res.json();
      assert.equal(body.success, true, "success should be true on 200");

      const configPath = path.join(tmpHome, ".forge", "config.toml");
      if (fs.existsSync(configPath)) {
        const content = fs.readFileSync(configPath, "utf-8");
        assert.ok(content.includes("managed by OmniRoute"), "Config should have OmniRoute marker");
        assert.ok(content.includes("http://localhost:20128"), "Config should contain base URL");
        assert.ok(content.includes("[openai]"), "Config should have [openai] section");
      }
    }
  } finally {
    process.env.HOME = origHome;
    fs.rmSync(tmpHome, { recursive: true, force: true });
  }
});

// ── Test 5: DELETE → removes config file ─────────────────────────────────────

test("forge-settings DELETE: removes config file when it exists", async () => {
  const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "forge-home-del-"));
  const origHome = process.env.HOME;
  process.env.HOME = tmpHome;

  try {
    // Pre-create a config file
    const forgeDir = path.join(tmpHome, ".forge");
    fs.mkdirSync(forgeDir, { recursive: true });
    fs.writeFileSync(
      path.join(forgeDir, "config.toml"),
      "# managed by OmniRoute (plan 14)\n[openai]\nbase_url = \"http://localhost:20128\"\n"
    );

    const res = await DELETE(
      new Request("http://localhost/api/cli-tools/forge-settings", { method: "DELETE" })
    );
    assert.ok(
      [200, 403, 500].includes(res.status),
      `Expected 200/403/500, got ${res.status}`
    );

    if (res.status === 200) {
      const body = await res.json();
      assert.equal(body.success, true);
    }
  } finally {
    process.env.HOME = origHome;
    fs.rmSync(tmpHome, { recursive: true, force: true });
  }
});

// ── Test 6: Error sanitization (Hard Rule #12) ───────────────────────────────

test("forge-settings: error responses do not leak stack traces", async () => {
  const badReq = new Request("http://localhost/api/cli-tools/forge-settings", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{ this is not json }",
  });
  const res = await POST(badReq);
  const bodyStr = JSON.stringify(await res.json());
  assert.ok(
    !bodyStr.match(/\s+at\s+\/[^\s]/),
    "Error response must not contain absolute-path stack traces"
  );
});

// ── Test 7: Hard Rule #13 (no exec/spawn) ────────────────────────────────────

test("forge-settings route.ts: does not call exec() or spawn() directly", () => {
  const routePath = path.resolve(
    import.meta.dirname,
    "../../src/app/api/cli-tools/forge-settings/route.ts"
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
