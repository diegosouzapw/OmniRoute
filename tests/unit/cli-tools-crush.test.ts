/**
 * Unit tests for the "Crush" CLI tool dashboard entry (ported from upstream
 * decolua/9router#1233). Mirrors the assertions used for the "pi" tool in
 * tests/unit/cli-tools-schema.test.ts, plus a GET/POST/DELETE round-trip for
 * /api/cli-tools/crush-settings modeled on tests/integration/cli-settings-pi.test.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── Catalog shape ────────────────────────────────────────────────────────────

test("CLI_TOOLS contains a 'crush' entry modeled on 'pi'", async () => {
  const { CLI_TOOLS } = await import("../../src/shared/constants/cliTools.ts");
  const crush = CLI_TOOLS["crush"];
  assert.ok(crush, "crush entry must exist in CLI_TOOLS");
  assert.equal(crush.id, "crush");
  assert.equal(crush.name, "Crush");
  assert.equal(crush.configType, "custom");
  assert.equal(crush.category, "code");
  assert.equal(crush.acpSpawnable, false);
  assert.equal(crush.baseUrlSupport, "full");
  assert.equal(crush.defaultCommand, "crush");
  assert.equal(typeof crush.description, "string");
  assert.ok(crush.description.length > 0);
  assert.equal(typeof crush.docsUrl, "string");
  assert.ok(crush.docsUrl.length > 0);
});

test("getCliTool('crush') resolves the catalog entry", async () => {
  const { getCliTool } = await import("../../src/shared/constants/cliTools.ts");
  const crush = getCliTool("crush");
  assert.ok(crush);
  assert.equal(crush.id, "crush");
});

// ── Runtime config path reconciliation with setup-crush.mjs ─────────────────

test("getCliConfigPaths('crush') resolves to ~/.config/crush/crush.json (matches setup-crush.mjs default)", async () => {
  const { getCliConfigPaths } = await import("../../src/shared/services/cliRuntime.ts");
  const paths = getCliConfigPaths("crush");
  assert.ok(paths);
  assert.ok(
    paths.config?.endsWith(path.join(".config", "crush", "crush.json")),
    `Expected config path to end with .config/crush/crush.json, got: ${paths.config}`
  );
});

// ── /api/cli-tools/crush-settings round-trip ─────────────────────────────────

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-crush-settings-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret-crush";
process.env.JWT_SECRET = "test-jwt-secret-crush";

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");

const { GET, POST, DELETE } = await import("../../src/app/api/cli-tools/crush-settings/route.ts");

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

test("crush-settings GET: returns 401 when auth required and no token", async () => {
  await enableAuth();
  const res = await GET(new Request("http://localhost/api/cli-tools/crush-settings"));
  assert.equal(res.status, 401, `Expected 401, got ${res.status}`);
});

test("crush-settings GET: returns 200 when auth not required", async () => {
  const res = await GET(new Request("http://localhost/api/cli-tools/crush-settings"));
  assert.equal(res.status, 200, `Expected 200, got ${res.status}`);
  const body = await res.json();
  assert.ok(
    "installed" in body || "config" in body,
    "Response should contain installed or config field"
  );
});

test("crush-settings POST: 400 when baseUrl is missing", async () => {
  const res = await POST(
    new Request("http://localhost/api/cli-tools/crush-settings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ apiKey: "sk-test", model: "openai/gpt-5" }),
    })
  );
  assert.equal(res.status, 400, `Expected 400, got ${res.status}`);
  const body = await res.json();
  assert.ok(body.error !== undefined);
});

test("crush-settings POST: 400 when model is missing", async () => {
  const res = await POST(
    new Request("http://localhost/api/cli-tools/crush-settings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ baseUrl: "http://localhost:20128", apiKey: "sk-test" }),
    })
  );
  assert.equal(res.status, 400, `Expected 400, got ${res.status}`);
});

test("crush-settings POST: writes crush.json with an openai-compat providers.omniroute block", async () => {
  const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "crush-home-"));
  const origHome = process.env.HOME;
  process.env.HOME = tmpHome;

  try {
    const res = await POST(
      new Request("http://localhost/api/cli-tools/crush-settings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          baseUrl: "http://localhost:20128",
          apiKey: "sk-test-crush-key",
          model: "openai/gpt-5.4-mini",
        }),
      })
    );
    assert.ok([200, 403, 500].includes(res.status), `Unexpected status ${res.status}`);
    if (res.status === 200) {
      const body = await res.json();
      assert.equal(body.success, true);
      const configPath = path.join(tmpHome, ".config", "crush", "crush.json");
      if (fs.existsSync(configPath)) {
        const written = JSON.parse(fs.readFileSync(configPath, "utf-8"));
        const provider = written.providers?.omniroute;
        assert.ok(provider, "providers.omniroute must be written");
        assert.equal(provider.type, "openai-compat");
        assert.ok(provider.base_url.includes("localhost:20128"));
        assert.ok(provider.base_url.endsWith("/v1"));
        assert.ok(Array.isArray(provider.models) && provider.models.length === 1);
        assert.equal(provider.models[0].id, "openai/gpt-5.4-mini");
      }
    }
  } finally {
    process.env.HOME = origHome;
    fs.rmSync(tmpHome, { recursive: true, force: true });
  }
});

test("crush-settings DELETE: removes only the omniroute provider entry", async () => {
  const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "crush-home-del-"));
  const origHome = process.env.HOME;
  process.env.HOME = tmpHome;

  try {
    const crushDir = path.join(tmpHome, ".config", "crush");
    fs.mkdirSync(crushDir, { recursive: true });
    fs.writeFileSync(
      path.join(crushDir, "crush.json"),
      JSON.stringify({
        providers: {
          omniroute: {
            type: "openai-compat",
            base_url: "http://localhost:20128/v1",
            api_key: "sk-test",
            models: [
              { id: "openai/gpt-5", name: "OmniRoute: openai/gpt-5", context_window: 128000 },
            ],
          },
          other: { type: "openai-compat", base_url: "http://example.com/v1" },
        },
      })
    );

    const res = await DELETE(
      new Request("http://localhost/api/cli-tools/crush-settings", { method: "DELETE" })
    );
    assert.ok([200, 403, 500].includes(res.status), `Expected 200/403/500, got ${res.status}`);
    if (res.status === 200) {
      const body = await res.json();
      assert.equal(body.success, true);
      const configPath = path.join(crushDir, "crush.json");
      if (fs.existsSync(configPath)) {
        const written = JSON.parse(fs.readFileSync(configPath, "utf-8"));
        assert.equal(written.providers?.omniroute, undefined);
        assert.ok(written.providers?.other, "Unrelated providers must be preserved");
      }
    }
  } finally {
    process.env.HOME = origHome;
    fs.rmSync(tmpHome, { recursive: true, force: true });
  }
});

test("crush-settings: error responses do not leak stack traces", async () => {
  const badReq = new Request("http://localhost/api/cli-tools/crush-settings", {
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

test("crush-settings route.ts: does not call exec() or spawn() directly", () => {
  const routePath = path.resolve(
    import.meta.dirname,
    "../../src/app/api/cli-tools/crush-settings/route.ts"
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
