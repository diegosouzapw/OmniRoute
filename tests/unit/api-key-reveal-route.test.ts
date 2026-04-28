import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-api-key-reveal-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const listRoute = await import("../../src/app/api/keys/route.ts");
const revealRoute = await import("../../src/app/api/keys/[id]/reveal/route.ts");

const MACHINE_ID = "1234567890abcdef";

async function resetStorage() {
  delete process.env.ALLOW_API_KEY_REVEAL;
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function maskKey(key) {
  return key.slice(0, 8) + "****" + key.slice(-4);
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  delete process.env.ALLOW_API_KEY_REVEAL;
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("GET /api/keys stays masked even when reveal is enabled", async () => {
  process.env.ALLOW_API_KEY_REVEAL = "true";
  const created = await apiKeysDb.createApiKey("Primary Key", MACHINE_ID);

  const response = await listRoute.GET(new Request("http://localhost/api/keys"));
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.allowKeyReveal, true);
  assert.equal(Array.isArray(body.keys), true);
  assert.equal(body.keys[0].key, maskKey(created.key));
});

test("GET /api/keys falls back to default pagination for invalid query params", async () => {
  await apiKeysDb.createApiKey("Alpha", MACHINE_ID);
  await apiKeysDb.createApiKey("Beta", MACHINE_ID);

  const response = await listRoute.GET(
    new Request("http://localhost/api/keys?limit=abc&offset=xyz")
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.allowKeyReveal, false);
  assert.equal(body.total, 2);
  assert.equal(body.keys.length, 2);
  assert.equal(
    body.keys.every((entry) => entry.key.includes("****")),
    true
  );
});

test("GET /api/keys returns 500 when key loading fails unexpectedly", async () => {
  await apiKeysDb.createApiKey("Primary Key", MACHINE_ID);

  const db = core.getDbInstance();
  const originalPrepare = db.prepare.bind(db);

  db.prepare = (sql, ...args) => {
    if (typeof sql === "string" && sql.includes("SELECT * FROM api_keys")) {
      throw new Error("db exploded");
    }
    return originalPrepare(sql, ...args);
  };
  apiKeysDb.resetApiKeyState();

  try {
    const response = await listRoute.GET(new Request("http://localhost/api/keys"));
    const body = (await response.json()) as any;

    assert.equal(response.status, 500);
    assert.equal(body.error, "Failed to fetch keys");
  } finally {
    db.prepare = originalPrepare;
    apiKeysDb.resetApiKeyState();
  }
});

test("GET /api/keys/[id]/reveal rejects requests when reveal is disabled", async () => {
  const created = await apiKeysDb.createApiKey("Primary Key", MACHINE_ID);
  const request = new Request(`http://localhost/api/keys/${created.id}/reveal`);

  const response = await revealRoute.GET(request, {
    params: Promise.resolve({ id: created.id }),
  });
  const body = (await response.json()) as any;

  assert.equal(response.status, 403);
  assert.equal(body.error, "API key reveal is disabled");
});

test("GET /api/keys/[id]/reveal returns the full key when reveal is enabled", async () => {
  process.env.ALLOW_API_KEY_REVEAL = "true";
  const created = await apiKeysDb.createApiKey("Primary Key", MACHINE_ID);
  const request = new Request(`http://localhost/api/keys/${created.id}/reveal`);

  const response = await revealRoute.GET(request, {
    params: Promise.resolve({ id: created.id }),
  });
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.key, created.key);
});

test("GET /api/keys/[id]/reveal returns 404 for unknown keys even when reveal is enabled", async () => {
  process.env.ALLOW_API_KEY_REVEAL = "true";
  const request = new Request("http://localhost/api/keys/missing/reveal");

  const response = await revealRoute.GET(request, {
    params: Promise.resolve({ id: "missing" }),
  });
  const body = (await response.json()) as any;

  assert.equal(response.status, 404);
  assert.equal(body.error, "Key not found");
});

test("GET /api/keys/[id]/reveal returns 500 when params resolution fails", async () => {
  process.env.ALLOW_API_KEY_REVEAL = "true";
  const request = new Request("http://localhost/api/keys/broken/reveal");

  const response = await revealRoute.GET(request, {
    params: Promise.reject(new Error("params exploded")),
  });
  const body = (await response.json()) as any;

  assert.equal(response.status, 500);
  assert.equal(body.error, "Failed to reveal key");
});
