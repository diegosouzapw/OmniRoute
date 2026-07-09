/**
 * Unit tests for the 3 Chaos Mode API routes:
 *   - GET/PUT/DELETE /api/chaos/config       (management-session auth)
 *   - POST           /api/chaos/run          (management-session auth)
 *   - POST           /api/skills/collect/chaos (external Bearer-token auth)
 *
 * Covers auth, Zod validation, and the "Chaos Mode disabled" 400 short-circuit
 * per Hard Rule #18 / the #6679 review checklist. Upstream model dispatch is
 * stubbed via chaosExecutor's `chatDispatch` mock point (see chaos-executor.test.ts)
 * so these tests never hit a real provider.
 */
import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chaos-routes-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "chaos-routes-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const chaosConfig = await import("../../src/lib/chaos/chaosConfig.ts");
const chaosExecutor = await import("../../src/lib/chaos/chaosExecutor.ts");

const configRoute = await import("../../src/app/api/chaos/config/route.ts");
const runRoute = await import("../../src/app/api/chaos/run/route.ts");
const skillsChaosRoute = await import("../../src/app/api/skills/collect/chaos/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  // The DB is about to be wiped out from under it — drop the in-memory chaos
  // config cache too, or getChaosConfig() keeps serving a stale value (e.g. a
  // prior test's `enabled: true`) after resetDbInstance() below.
  chaosConfig.invalidateChaosConfigCache();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.INITIAL_PASSWORD;
}

function makeRequest(method: string, url: string, body?: unknown, headers: Record<string, string> = {}) {
  return new Request(url, {
    method,
    headers: {
      ...(body !== undefined ? { "content-type": "application/json" } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.afterEach(() => {
  mock.restoreAll();
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  if (ORIGINAL_API_KEY_SECRET === undefined) {
    delete process.env.API_KEY_SECRET;
  } else {
    process.env.API_KEY_SECRET = ORIGINAL_API_KEY_SECRET;
  }
  if (ORIGINAL_INITIAL_PASSWORD === undefined) {
    delete process.env.INITIAL_PASSWORD;
  } else {
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  }
});

// ═════════════════════════════════════════════════════════════════════════════
// GET/PUT/DELETE /api/chaos/config
// ═════════════════════════════════════════════════════════════════════════════

test("GET /api/chaos/config — requires management auth when a password is configured", async () => {
  process.env.INITIAL_PASSWORD = "chaos-config-requires-login";

  const res = await configRoute.GET(makeRequest("GET", "http://localhost/api/chaos/config"));
  assert.ok(res.status === 401 || res.status === 403, `expected 401/403, got ${res.status}`);

  const body = (await res.json()) as { error: { message: string } | string };
  const errorMsg = typeof body.error === "string" ? body.error : body.error.message;
  assert.ok(!errorMsg.includes("at /"), "Hard Rule #12: no stack trace exposure");
});

test("GET /api/chaos/config — returns defaults, PUT updates, DELETE resets", async () => {
  const getRes = await configRoute.GET(makeRequest("GET", "http://localhost/api/chaos/config"));
  assert.equal(getRes.status, 200);
  const getBody = (await getRes.json()) as { config: typeof chaosConfig.DEFAULT_CHAOS_CONFIG };
  // JSON.stringify drops keys whose value is `undefined` (systemPrompt), so compare
  // against the JSON round-tripped shape rather than the raw in-memory default.
  assert.deepEqual(
    getBody.config,
    JSON.parse(JSON.stringify(chaosConfig.DEFAULT_CHAOS_CONFIG))
  );

  const putRes = await configRoute.PUT(
    makeRequest("PUT", "http://localhost/api/chaos/config", {
      enabled: true,
      defaultMode: "collaborative",
      providerOverrides: [],
      timeoutMs: 60_000,
      maxTokens: 8192,
    })
  );
  assert.equal(putRes.status, 200);
  const putBody = (await putRes.json()) as { config: { enabled: boolean; defaultMode: string } };
  assert.equal(putBody.config.enabled, true);
  assert.equal(putBody.config.defaultMode, "collaborative");

  const deleteRes = await configRoute.DELETE(
    makeRequest("DELETE", "http://localhost/api/chaos/config")
  );
  assert.equal(deleteRes.status, 200);
  const deleteBody = (await deleteRes.json()) as { config: typeof chaosConfig.DEFAULT_CHAOS_CONFIG };
  // Same JSON.stringify undefined-key drop as the GET assertion above.
  assert.deepEqual(
    deleteBody.config,
    JSON.parse(JSON.stringify(chaosConfig.DEFAULT_CHAOS_CONFIG))
  );
});

test("PUT /api/chaos/config — 400 on schema validation failure", async () => {
  const res = await configRoute.PUT(
    makeRequest("PUT", "http://localhost/api/chaos/config", {
      enabled: true,
      defaultMode: "not-a-real-mode",
    })
  );
  assert.equal(res.status, 400);
});

// ═════════════════════════════════════════════════════════════════════════════
// POST /api/chaos/run
// ═════════════════════════════════════════════════════════════════════════════

test("POST /api/chaos/run — requires management auth when a password is configured", async () => {
  process.env.INITIAL_PASSWORD = "chaos-run-requires-login";

  const res = await runRoute.POST(
    makeRequest("POST", "http://localhost/api/chaos/run", { task: "hello" })
  );
  assert.ok(res.status === 401 || res.status === 403, `expected 401/403, got ${res.status}`);
});

test("POST /api/chaos/run — 400 when Chaos Mode is not enabled globally", async () => {
  const res = await runRoute.POST(
    makeRequest("POST", "http://localhost/api/chaos/run", { task: "hello" })
  );
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.match(body.error.message, /not enabled/i);
});

test("POST /api/chaos/run — 400 on invalid body (missing task)", async () => {
  await chaosConfig.setChaosConfig({
    enabled: true,
    defaultMode: "parallel",
    providerOverrides: [],
    timeoutMs: 120_000,
    maxTokens: 4096,
  });

  const res = await runRoute.POST(makeRequest("POST", "http://localhost/api/chaos/run", {}));
  assert.equal(res.status, 400);
});

test("POST /api/chaos/run — 200 happy path dispatches without an Authorization header (dashboard/local mode)", async () => {
  await chaosConfig.setChaosConfig({
    enabled: true,
    defaultMode: "parallel",
    providerOverrides: [],
    timeoutMs: 120_000,
    maxTokens: 4096,
  });
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Run Route Provider",
    apiKey: "sk-run-route",
    defaultModel: "gpt-4o-mini",
  });

  let capturedAuth: string | null | undefined;
  mock.method(chaosExecutor.chatDispatch, "postChatCompletion", async (req: Request) => {
    capturedAuth = req.headers.get("Authorization");
    return jsonResponse({ choices: [{ message: { content: "dashboard result" } }] });
  });

  const res = await runRoute.POST(
    makeRequest("POST", "http://localhost/api/chaos/run", { task: "Summarize" })
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as { models: { status: string; content: string }[] };
  assert.equal(body.models[0].status, "success");
  assert.equal(body.models[0].content, "dashboard result");
  assert.equal(capturedAuth, null);
});

// ═════════════════════════════════════════════════════════════════════════════
// POST /api/skills/collect/chaos
// ═════════════════════════════════════════════════════════════════════════════

test("POST /api/skills/collect/chaos — 401 without an Authorization header", async () => {
  const res = await skillsChaosRoute.POST(
    makeRequest("POST", "http://localhost/api/skills/collect/chaos", { task: "hello" })
  );
  assert.equal(res.status, 401);
});

test("POST /api/skills/collect/chaos — 403 with an invalid API key", async () => {
  const res = await skillsChaosRoute.POST(
    makeRequest(
      "POST",
      "http://localhost/api/skills/collect/chaos",
      { task: "hello" },
      { Authorization: "Bearer sk-does-not-exist" }
    )
  );
  assert.equal(res.status, 403);
});

test("POST /api/skills/collect/chaos — 403 when the API key does not have chaosModeEnabled", async () => {
  const created = await apiKeysDb.createApiKey("No Chaos Key", "machine-chaos-01");

  const res = await skillsChaosRoute.POST(
    makeRequest(
      "POST",
      "http://localhost/api/skills/collect/chaos",
      { task: "hello" },
      { Authorization: `Bearer ${created.key}` }
    )
  );
  assert.equal(res.status, 403);
  const body = (await res.json()) as { error: { message: string } };
  assert.match(body.error.message, /Chaos Mode is not enabled for this API key/);
});

test("POST /api/skills/collect/chaos — 400 when Chaos Mode is disabled globally even with a valid key", async () => {
  const created = await apiKeysDb.createApiKey("Chaos Key", "machine-chaos-02");
  await apiKeysDb.updateApiKeyPermissions(created.id, { chaosModeEnabled: true });
  apiKeysDb.clearApiKeyCaches();

  const res = await skillsChaosRoute.POST(
    makeRequest(
      "POST",
      "http://localhost/api/skills/collect/chaos",
      { task: "hello" },
      { Authorization: `Bearer ${created.key}` }
    )
  );
  assert.equal(res.status, 400);
});

test("POST /api/skills/collect/chaos — 200 happy path forwards the caller's key to the in-process dispatch", async () => {
  await chaosConfig.setChaosConfig({
    enabled: true,
    defaultMode: "parallel",
    providerOverrides: [],
    timeoutMs: 120_000,
    maxTokens: 4096,
  });
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Skills Route Provider",
    apiKey: "sk-skills-route",
    defaultModel: "gpt-4o-mini",
  });

  const created = await apiKeysDb.createApiKey("Chaos Key External", "machine-chaos-03");
  await apiKeysDb.updateApiKeyPermissions(created.id, { chaosModeEnabled: true });
  apiKeysDb.clearApiKeyCaches();

  let capturedAuth: string | null | undefined;
  mock.method(chaosExecutor.chatDispatch, "postChatCompletion", async (req: Request) => {
    capturedAuth = req.headers.get("Authorization");
    return jsonResponse({ choices: [{ message: { content: "external result" } }] });
  });

  const res = await skillsChaosRoute.POST(
    makeRequest(
      "POST",
      "http://localhost/api/skills/collect/chaos",
      { task: "Summarize" },
      { Authorization: `Bearer ${created.key}` }
    )
  );

  assert.equal(res.status, 200);
  const body = (await res.json()) as { models: { status: string; content: string }[] };
  assert.equal(body.models[0].status, "success");
  assert.equal(body.models[0].content, "external result");
  assert.equal(capturedAuth, `Bearer ${created.key}`);
});
