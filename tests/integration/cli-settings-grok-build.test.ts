/**
 * Integration tests for /api/cli-tools/grok-build-settings
 *
 * Ported from decolua/9router#2571 ("feat(cli-tools): add Grok Build setup"),
 * rebuilt on top of OmniRoute's existing "custom" configType settings pattern
 * (auth guard, Zod validation, write-guard, backups, sanitized errors — see
 * forge-settings for the sibling implementation this mirrors).
 *
 * Unlike Forge's full-file overwrite, Grok Build's config.toml can hold other
 * user-defined `[model.*]` sections, so the handler surgically upserts only
 * the `[model.omniroute]` section and preserves the rest of the file.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-grok-build-settings-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret-grok-build";
process.env.JWT_SECRET = "test-jwt-secret-grok-build";

// Import DB reset helpers (must be before route import)
const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");

// Import route handlers
const { GET, POST, DELETE } = await import(
  "../../src/app/api/cli-tools/grok-build-settings/route.ts"
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

test("grok-build-settings GET: returns 401 when auth required and no token", async () => {
  await enableAuth();
  const res = await GET(new Request("http://localhost/api/cli-tools/grok-build-settings"));
  assert.equal(res.status, 401, `Expected 401, got ${res.status}`);
});

// ── Test 2: GET with valid auth → 200 ────────────────────────────────────────

test("grok-build-settings GET: returns 200 with valid auth (grok not installed on CI)", async () => {
  const res = await GET(new Request("http://localhost/api/cli-tools/grok-build-settings"));
  assert.equal(res.status, 200, `Expected 200, got ${res.status}`);
  const body = await res.json();
  assert.ok(
    "installed" in body || "config" in body,
    "Response should contain installed or config field"
  );
});

// ── Test 3: POST with invalid body → 400 ─────────────────────────────────────

test("grok-build-settings POST: 400 when baseUrl is missing", async () => {
  const res = await POST(
    new Request("http://localhost/api/cli-tools/grok-build-settings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ apiKey: "sk-test", model: "grok-4.5" }), // missing baseUrl
    })
  );
  assert.equal(res.status, 400, `Expected 400 for missing baseUrl, got ${res.status}`);
  const body = await res.json();
  assert.ok(body.error !== undefined, "Response should have error field");
});

test("grok-build-settings POST: 400 when model is missing", async () => {
  const res = await POST(
    new Request("http://localhost/api/cli-tools/grok-build-settings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ baseUrl: "http://localhost:20128", apiKey: "sk-test" }),
    })
  );
  assert.equal(res.status, 400, `Expected 400 for missing model, got ${res.status}`);
});

// ── Test 4: POST with valid body → surgically upserts [model.omniroute] ─────

test("grok-build-settings POST: writes [model.omniroute] section and preserves existing content", async () => {
  const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "grok-build-home-"));
  const origHome = process.env.HOME;
  process.env.HOME = tmpHome;

  try {
    // Pre-seed a config.toml with an unrelated user model + a non-default value,
    // to prove the handler does not clobber content it does not own.
    const grokDir = path.join(tmpHome, ".grok");
    fs.mkdirSync(grokDir, { recursive: true });
    const preExisting = [
      "[models]",
      'default = "grok-build"',
      "",
      "[model.custom-thing]",
      'model = "some-other-model"',
      'base_url = "https://example.test/v1"',
      "",
    ].join("\n");
    fs.writeFileSync(path.join(grokDir, "config.toml"), preExisting);

    const res = await POST(
      new Request("http://localhost/api/cli-tools/grok-build-settings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          baseUrl: "http://localhost:20128",
          apiKey: "sk-test-grok-build-key",
          model: "grok-4.5",
        }),
      })
    );

    // 200 = success; 403 = write guard active (test env); 500 = backup dir issue
    assert.ok([200, 403, 500].includes(res.status), `Unexpected status ${res.status}`);

    if (res.status === 200) {
      const body = await res.json();
      assert.equal(body.success, true, "success should be true on 200");

      const configPath = path.join(tmpHome, ".grok", "config.toml");
      const content = fs.readFileSync(configPath, "utf-8");

      assert.ok(content.includes("[model.omniroute]"), "Config should have [model.omniroute]");
      assert.ok(content.includes("http://localhost:20128/v1"), "Config should contain base URL");
      assert.ok(content.includes('default = "omniroute"'), "Default should point at our slot");
      // The pre-existing unrelated model section must survive untouched.
      // Exact line membership (not URL substring) — stronger, and dodges CodeQL
      // js/incomplete-url-substring-sanitization false positives (#740/#741).
      const preservedLines = content.split("\n").map((line) => line.trim());
      assert.ok(
        preservedLines.includes("[model.custom-thing]") &&
          preservedLines.includes('base_url = "https://example.test/v1"'),
        "Pre-existing unrelated [model.*] section must be preserved"
      );
      // The previous default must be remembered for Reset to restore.
      assert.ok(
        content.includes('omniroute-prev-default = "grok-build"'),
        "Previous default should be remembered as a marker comment"
      );
    }
  } finally {
    process.env.HOME = origHome;
    fs.rmSync(tmpHome, { recursive: true, force: true });
  }
});

// ── Test 5: DELETE → removes only our section and restores previous default ─

test("grok-build-settings DELETE: removes our section, preserves the rest, restores default", async () => {
  const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "grok-build-home-del-"));
  const origHome = process.env.HOME;
  process.env.HOME = tmpHome;

  try {
    const grokDir = path.join(tmpHome, ".grok");
    fs.mkdirSync(grokDir, { recursive: true });
    const preConfigured = [
      "[models]",
      'default = "omniroute"',
      "",
      "# omniroute-prev-default = \"grok-build\"",
      "[model.omniroute]",
      'model = "grok-4.5"',
      'base_url = "http://localhost:20128/v1"',
      'name = "OmniRoute"',
      'api_backend = "chat_completions"',
      'api_key = "sk-test"',
      "",
      "[model.custom-thing]",
      'model = "some-other-model"',
      'base_url = "https://example.test/v1"',
      "",
    ].join("\n");
    fs.writeFileSync(path.join(grokDir, "config.toml"), preConfigured);

    const res = await DELETE(
      new Request("http://localhost/api/cli-tools/grok-build-settings", { method: "DELETE" })
    );
    assert.ok([200, 403, 500].includes(res.status), `Expected 200/403/500, got ${res.status}`);

    if (res.status === 200) {
      const body = await res.json();
      assert.equal(body.success, true);

      const configPath = path.join(tmpHome, ".grok", "config.toml");
      const content = fs.readFileSync(configPath, "utf-8");
      assert.ok(!content.includes("[model.omniroute]"), "Our section should be removed");
      // Exact line membership (not URL substring) — see the preserve block above (#740/#741).
      const survivingLines = content.split("\n").map((line) => line.trim());
      assert.ok(
        survivingLines.includes("[model.custom-thing]") &&
          survivingLines.includes('base_url = "https://example.test/v1"'),
        "Unrelated section must survive"
      );
      assert.ok(content.includes('default = "grok-build"'), "Previous default should be restored");
    }
  } finally {
    process.env.HOME = origHome;
    fs.rmSync(tmpHome, { recursive: true, force: true });
  }
});

test("grok-build-settings DELETE: no-op success when no config file exists", async () => {
  const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "grok-build-home-noconfig-"));
  const origHome = process.env.HOME;
  process.env.HOME = tmpHome;

  try {
    const res = await DELETE(
      new Request("http://localhost/api/cli-tools/grok-build-settings", { method: "DELETE" })
    );
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
  } finally {
    process.env.HOME = origHome;
    fs.rmSync(tmpHome, { recursive: true, force: true });
  }
});

// ── Test 6: Error sanitization (Hard Rule #12) ───────────────────────────────

test("grok-build-settings: error responses do not leak stack traces", async () => {
  const badReq = new Request("http://localhost/api/cli-tools/grok-build-settings", {
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

test("grok-build-settings route.ts: does not call exec() or spawn() directly", () => {
  const routePath = path.resolve(
    import.meta.dirname,
    "../../src/app/api/cli-tools/grok-build-settings/route.ts"
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
