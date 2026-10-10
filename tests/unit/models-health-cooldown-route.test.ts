/**
 * GET /v1/models/health: per-model pause state per API key.
 *
 * One test per gate case. Lockout entries are built with the production
 * writers (`lockModel` / `lockExactModel`) against the ids of the real seeded
 * connections, and removed in `finally`, so the inputs reach the code through
 * the same store the dispatcher reads.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-models-health-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "models-health-cooldown-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { lockModel, lockExactModel, clearModelLock, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");

const GLM_ALIAS = "glm";
const GLM_MODEL_A = "glm-5.3";
const GLM_MODEL_B = "glm-5.3-flash";

async function resetStorage() {
  clearAllModelLockouts();
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedGlmConnections(count: number): Promise<string[]> {
  const ids: string[] = [];
  for (let i = 0; i < count; i++) {
    const conn = (await providersDb.createProviderConnection({
      provider: "glm",
      authType: "apikey",
      name: `health-glm-${i}-${Date.now()}`,
      apiKey: `sk-health-${i}`,
    })) as Record<string, unknown>;
    ids.push(conn.id as string);
  }
  return ids;
}

function freezeNow(now: number) {
  const realNow = Date.now;
  (Date as unknown as { now: () => number }).now = () => now;
  return () => {
    (Date as unknown as { now: () => number }).now = realNow;
  };
}

function readStates(body: unknown): Map<string, Record<string, unknown>> {
  const data = (body as { data: Array<Record<string, unknown>> }).data;
  assert.ok(Array.isArray(data), "response must carry a data array");
  return new Map(data.map((item) => [String(item.id), item]));
}

function assertNoConnectionId(value: unknown, trail: string) {
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) assertNoConnectionId(value[i], `${trail}[${i}]`);
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
      assert.notEqual(key, "connectionId", `no connectionId at ${trail}.${key}`);
      assertNoConnectionId(entry, `${trail}.${key}`);
    }
  }
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  clearAllModelLockouts();
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("models/health: all active connections paused renders cooling with the shortest delay first", async () => {
  const [connA, connB] = await seedGlmConnections(2);
  const { GET } = await import("../../src/app/api/v1/models/health/route.ts");
  const now = 1_760_000_000_000;
  const unfreeze = freezeNow(now);
  try {
    lockModel("glm", connA, GLM_MODEL_A, "quota_exhausted", 6_001, {});
    lockModel("glm", connB, GLM_MODEL_A, "quota_exhausted", 61_000, {});
    const res = await GET(new Request("http://localhost/api/v1/models/health"));
    assert.equal(res.status, 200);
    const body = (await res.json()) as { object: string; data: Array<Record<string, unknown>> };
    assert.equal(body.object, "list");
    const entry = readStates(body).get(`${GLM_ALIAS}/${GLM_MODEL_A}`);
    assert.ok(entry, "expected the glm test model in the health list");
    assert.equal(entry.state, "cooling");
    assert.equal(entry.retry_after, 7);
    assert.equal(typeof entry.observed_at, "string");
  } finally {
    clearModelLock("glm", connA, GLM_MODEL_A);
    clearModelLock("glm", connB, GLM_MODEL_A);
    unfreeze();
  }
});

test("models/health: one paused connection out of three stays ok", async () => {
  const [connA] = await seedGlmConnections(3);
  const { GET } = await import("../../src/app/api/v1/models/health/route.ts");
  try {
    lockModel("glm", connA, GLM_MODEL_A, "quota_exhausted", 60_000, {});
    const res = await GET(new Request("http://localhost/api/v1/models/health"));
    assert.equal(res.status, 200);
    const entry = readStates(await res.json()).get(`${GLM_ALIAS}/${GLM_MODEL_A}`);
    assert.ok(entry, "expected the glm test model in the health list");
    assert.equal(entry.state, "ok");
    assert.equal(entry.retry_after, undefined);
  } finally {
    clearModelLock("glm", connA, GLM_MODEL_A);
  }
});

test("models/health: no observation renders ok with observed_at", async () => {
  await seedGlmConnections(1);
  const { GET } = await import("../../src/app/api/v1/models/health/route.ts");
  const res = await GET(new Request("http://localhost/api/v1/models/health"));
  assert.equal(res.status, 200);
  const entry = readStates(await res.json()).get(`${GLM_ALIAS}/${GLM_MODEL_A}`);
  assert.ok(entry, "expected the glm test model in the health list");
  assert.equal(entry.state, "ok");
  assert.equal(typeof entry.observed_at, "string");
});

test("models/health: codex scope lockout cools every scope member", async () => {
  const conns = await seedGlmConnections(1);
  void conns;
  const codexConn = (await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "health-codex-seed",
    accessToken: "codex-token",
  })) as Record<string, unknown>;
  const codexId = codexConn.id as string;
  const { getModelLockoutInfo } = await import("../../open-sse/services/accountFallback.ts");
  const { GET } = await import("../../src/app/api/v1/models/health/route.ts");
  try {
    lockModel("codex", codexId, "gpt-6-astra", "quota_exhausted", 60_000, {});
    assert.ok(
      getModelLockoutInfo("codex", codexId, "gpt-6-astra"),
      "precondition: codex lockout must be readable"
    );
    const res = await GET(new Request("http://localhost/api/v1/models/health"));
    assert.equal(res.status, 200);
    const states = readStates(await res.json());
    const astra =
      states.get("codex/gpt-6-astra") ??
      states.get("cx/gpt-6-astra") ??
      [...states.values()].find((item) => String(item.id).endsWith("/gpt-6-astra"));
    assert.ok(astra, "expected a gpt-6-astra row in the health list");
    assert.equal(astra.state, "cooling");
    const sibling = states.get("codex/gpt-6-sol") ?? states.get("cx/gpt-6-sol");
    if (sibling) assert.equal(sibling.state, "cooling");
  } finally {
    clearModelLock("codex", codexId, "gpt-6-astra");
  }
});

test("models/health: not_found locks alone never cool a model", async () => {
  const conns = await seedGlmConnections(2);
  const { GET } = await import("../../src/app/api/v1/models/health/route.ts");
  try {
    for (const conn of conns) {
      lockModel("glm", conn, GLM_MODEL_A, "not_found", 60_000, {});
    }
    const res = await GET(new Request("http://localhost/api/v1/models/health"));
    assert.equal(res.status, 200);
    const entry = readStates(await res.json()).get(`${GLM_ALIAS}/${GLM_MODEL_A}`);
    assert.ok(entry, "expected the glm test model in the health list");
    assert.equal(entry.state, "ok");
  } finally {
    for (const conn of conns) clearModelLock("glm", conn, GLM_MODEL_A);
  }
});

test("models/health: exact 5xx lockout cools only the locked model", async () => {
  const conns = await seedGlmConnections(2);
  const { GET } = await import("../../src/app/api/v1/models/health/route.ts");
  try {
    for (const conn of conns) {
      lockExactModel("glm", conn, GLM_MODEL_A, "internal_error", 60_000, {});
    }
    const res = await GET(new Request("http://localhost/api/v1/models/health"));
    assert.equal(res.status, 200);
    const states = readStates(await res.json());
    const locked = states.get(`${GLM_ALIAS}/${GLM_MODEL_A}`);
    const sibling = states.get(`${GLM_ALIAS}/${GLM_MODEL_B}`);
    assert.ok(locked, "expected the locked glm model in the health list");
    assert.equal(locked.state, "cooling");
    assert.ok(sibling, "expected the sibling glm model in the health list");
    assert.equal(sibling.state, "ok");
  } finally {
    for (const conn of conns) clearModelLock("glm", conn, GLM_MODEL_A);
  }
});

test("models/health: combos stay out and every item carries a state", async () => {
  await seedGlmConnections(1);
  const { GET } = await import("../../src/app/api/v1/models/health/route.ts");
  const res = await GET(
    new Request("http://localhost/api/v1/models/health?ids=does-not-resolve%2Fnope")
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as { data: Array<Record<string, unknown>> };
  assert.ok(body.data.length > 0, "health list should not be empty");
  const requested = body.data.find((item) => item.id === "does-not-resolve/nope");
  assert.ok(requested, "requested unresolvable id must be present");
  assert.equal(requested.state, "unknown");
  assert.equal(requested.retry_after, undefined);
  assert.equal(typeof requested.observed_at, "string");
  for (const item of body.data) {
    assert.ok(!String(item.id).startsWith("auto/"), `combo leaked: ${String(item.id)}`);
    assert.ok(
      ["ok", "cooling", "unknown"].includes(String(item.state)),
      `unexpected state for ${String(item.id)}: ${String(item.state)}`
    );
  }
});

test("models/health: disabled connections stay out of the cooling denominator", async () => {
  const [activeConn, idleConn] = await seedGlmConnections(2);
  const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
  await providersDb.updateProviderConnection(idleConn, { isActive: false } as never);
  invalidateDbCache("connections");
  const { GET } = await import("../../src/app/api/v1/models/health/route.ts");
  try {
    lockModel("glm", activeConn, GLM_MODEL_A, "quota_exhausted", 60_000, {});
    const res = await GET(new Request("http://localhost/api/v1/models/health"));
    assert.equal(res.status, 200);
    const entry = readStates(await res.json()).get(`${GLM_ALIAS}/${GLM_MODEL_A}`);
    assert.ok(entry, "expected the glm test model in the health list");
    assert.equal(entry.state, "cooling");
  } finally {
    clearModelLock("glm", activeConn, GLM_MODEL_A);
  }
});

test("models/health: restricted keys see only their models", async () => {
  await seedGlmConnections(1);
  const { GET } = await import("../../src/app/api/v1/models/health/route.ts");
  const created = await apiKeysDb.createApiKey("health-restricted", "machine-health");
  await apiKeysDb.updateApiKeyPermissions(created.id, { allowedModels: [`${GLM_ALIAS}/*`] });
  const res = await GET(
    new Request("http://localhost/api/v1/models/health", {
      headers: { Authorization: `Bearer ${created.key}` },
    })
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as { data: Array<Record<string, unknown>> };
  assert.ok(body.data.length > 0, "restricted key should see its glm models");
  for (const item of body.data) {
    assert.ok(
      String(item.id).startsWith(`${GLM_ALIAS}/`) || String(item.id).startsWith("qtSd/"),
      `restricted key leaked: ${String(item.id)}`
    );
  }
});

test("models/health: no connectionId anywhere in the payload", async () => {
  const [connA] = await seedGlmConnections(1);
  const { GET } = await import("../../src/app/api/v1/models/health/route.ts");
  try {
    lockModel("glm", connA, GLM_MODEL_A, "quota_exhausted", 60_000, {});
    const res = await GET(new Request("http://localhost/api/v1/models/health"));
    assert.equal(res.status, 200);
    const body = await res.json();
    assertNoConnectionId(body, "body");
  } finally {
    clearModelLock("glm", connA, GLM_MODEL_A);
  }
});

test("models/health: GET /v1/models is identical before and after", async () => {
  await seedGlmConnections(1);
  const health = await import("../../src/app/api/v1/models/health/route.ts");
  const catalog = await import("../../src/app/api/v1/models/catalog.ts");
  try {
    catalog.__resetCatalogBuilderRunsForTest();
  } catch {}
  const before = await (
    await catalog.getUnifiedModelsResponse(new Request("http://localhost/api/v1/models"))
  ).text();
  const healthRes = await health.GET(new Request("http://localhost/api/v1/models/health"));
  assert.equal(healthRes.status, 200);
  await healthRes.json();
  const after = await (
    await catalog.getUnifiedModelsResponse(new Request("http://localhost/api/v1/models"))
  ).text();
  assert.equal(after, before);
});

test("models/health: the static health route answers, not the model catch-all", async () => {
  await seedGlmConnections(1);
  const { handleGetModelById } = await import("../../src/app/api/v1/models/modelById.ts");
  const res = await handleGetModelById(
    new Request("http://localhost/api/v1/models/health"),
    "health",
    async () =>
      Response.json(
        {
          error: { message: "The model 'health' does not exist", code: "model_not_found" },
        },
        { status: 404 }
      )
  );
  assert.equal(res.status, 404);
  const { GET } = await import("../../src/app/api/v1/models/health/route.ts");
  const direct = await GET(new Request("http://localhost/api/v1/models/health"));
  assert.equal(direct.status, 200);
  const body = (await direct.json()) as { object: string };
  assert.equal(body.object, "list");
});

test("models/health: anonymous callers get 401 when auth is required", async () => {
  await settingsDb.updateSettings({ requireLogin: true, password: "health-pw-cooldown" });
  const { GET } = await import("../../src/app/api/v1/models/health/route.ts");
  const res = await GET(new Request("http://localhost/api/v1/models/health"));
  assert.equal(res.status, 401);
});

test("models/health: model lockout plus connection cooldown still reads cooling", async () => {
  const conn = (await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "health-cooldown-conn",
    apiKey: "sk-health",
    providerSpecificData: {},
  })) as Record<string, unknown>;
  const connId = conn.id as string;
  const future = new Date(Date.now() + 60_000).toISOString();
  await providersDb.updateProviderConnection(connId, { rateLimitedUntil: future } as never);
  const { GET } = await import("../../src/app/api/v1/models/health/route.ts");
  try {
    lockModel("glm", connId, GLM_MODEL_A, "quota_exhausted", 60_000, {});
    const res = await GET(new Request("http://localhost/api/v1/models/health"));
    assert.equal(res.status, 200);
    const entry = readStates(await res.json()).get(`${GLM_ALIAS}/${GLM_MODEL_A}`);
    assert.ok(entry, "expected the glm test model in the health list");
    assert.equal(entry.state, "cooling");
  } finally {
    clearModelLock("glm", connId, GLM_MODEL_A);
  }
});
