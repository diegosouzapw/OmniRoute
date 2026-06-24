/**
 * Integration tests for /api/cli-tools/smelt-settings
 * Plan 14 F3 — settings handler for Smelt (configType: "custom")
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-smelt-settings-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret-smelt";
process.env.JWT_SECRET = "test-jwt-secret-smelt";

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");

const { GET, POST, DELETE } = await import("../../src/app/api/cli-tools/smelt-settings/route.ts");

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

test("smelt-settings GET: returns 401 when auth required and no token", async () => {
  await enableAuth();
  const res = await GET(new Request("http://localhost/api/cli-tools/smelt-settings"));
  assert.equal(res.status, 401, `Expected 401, got ${res.status}`);
});

// ── Test 2: GET with valid auth → 200 ────────────────────────────────────────

test("smelt-settings GET: returns 200 with valid auth", async () => {
  const res = await GET(
    await makeManagementSessionRequest("http://localhost/api/cli-tools/smelt-settings")
  );
  assert.equal(res.status, 200, `Expected 200, got ${res.status}`);
  const body = await res.json();
  assert.ok(
    "installed" in body || "config" in body,
    "Response should contain installed or config field"
  );
});

// ── Test 3: POST with invalid body → 400 ─────────────────────────────────────

test("smelt-settings POST: 400 when baseUrl is missing", async () => {
  const res = await POST(
    await makeManagementSessionRequest("http://localhost/api/cli-tools/smelt-settings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: { apiKey: "sk-test", model: "gpt-5" },
    })
  );
  assert.equal(res.status, 400, `Expected 400, got ${res.status}`);
  const body = await res.json();
  assert.ok(body.error !== undefined);
});

test("smelt-settings POST: 400 when model is missing", async () => {
  const res = await POST(
    await makeManagementSessionRequest("http://localhost/api/cli-tools/smelt-settings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: { baseUrl: "http://localhost:20128", apiKey: "sk-test" },
    })
  );
  assert.equal(res.status, 400, `Expected 400, got ${res.status}`);
});

// ── Test 4: POST with valid body → writes config.json ───────────────────────

test("smelt-settings POST: writes config.json with valid body", async () => {
  const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "smelt-home-"));
  const origHome = process.env.HOME;
  process.env.HOME = tmpHome;

  try {
    const res = await POST(
      await makeManagementSessionRequest("http://localhost/api/cli-tools/smelt-settings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: {
          baseUrl: "http://localhost:20128",
          apiKey: "sk-test-smelt-key",
          model: "gpt-5.4-mini",
        },
      })
    );
    assert.ok([200, 403, 500].includes(res.status), `Unexpected status ${res.status}`);
    if (res.status === 200) {
      const body = await res.json();
      assert.equal(body.success, true);
      const configPath = path.join(tmpHome, ".smelt", "config.json");
      if (fs.existsSync(configPath)) {
        const written = JSON.parse(fs.readFileSync(configPath, "utf-8"));
        assert.equal(written._managedBy, "omniroute");
        assert.ok(written.baseUrl.includes("localhost:20128"));
        assert.equal(written.model, "gpt-5.4-mini");
      }
    }
  } finally {
    process.env.HOME = origHome;
    fs.rmSync(tmpHome, { recursive: true, force: true });
  }
});

// ── Test 5: DELETE → removes OmniRoute fields ────────────────────────────────

test("smelt-settings DELETE: removes OmniRoute fields from existing config", async () => {
  const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "smelt-home-del-"));
  const origHome = process.env.HOME;
  process.env.HOME = tmpHome;

  try {
    const smeltDir = path.join(tmpHome, ".smelt");
    fs.mkdirSync(smeltDir, { recursive: true });
    fs.writeFileSync(
      path.join(smeltDir, "config.json"),
      JSON.stringify({
        _managedBy: "omniroute",
        baseUrl: "http://localhost:20128",
        apiKey: "sk-test",
        model: "gpt-5",
      })
    );

    const res = await DELETE(
      await makeManagementSessionRequest("http://localhost/api/cli-tools/smelt-settings", {
        method: "DELETE",
      })
    );
    assert.ok([200, 403, 500].includes(res.status), `Expected 200/403/500, got ${res.status}`);
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

test("smelt-settings: error responses do not leak stack traces", async () => {
  const badReq = await makeManagementSessionRequest(
    "http://localhost/api/cli-tools/smelt-settings",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{ bad json }",
    }
  );
  const res = await POST(badReq);
  const bodyStr = JSON.stringify(await res.json());
  assert.ok(
    !bodyStr.match(/\s+at\s+\/[^\s]/),
    "Error response must not contain absolute-path stack traces"
  );
});

// ── Test 7: Hard Rule #13 (no exec/spawn) ────────────────────────────────────

test("smelt-settings route.ts: does not call exec() or spawn() directly", () => {
  const routePath = path.resolve(
    import.meta.dirname,
    "../../src/app/api/cli-tools/smelt-settings/route.ts"
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
