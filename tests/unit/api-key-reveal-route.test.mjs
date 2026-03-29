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

  const response = await listRoute.GET();
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.allowKeyReveal, true);
  assert.equal(Array.isArray(body.keys), true);
  assert.equal(body.keys[0].key, maskKey(created.key));
});

test("GET /api/keys/[id]/reveal rejects requests when reveal is disabled", async () => {
  const created = await apiKeysDb.createApiKey("Primary Key", MACHINE_ID);
  const request = new Request(`http://localhost/api/keys/${created.id}/reveal`);

  const response = await revealRoute.GET(request, {
    params: Promise.resolve({ id: created.id }),
  });
  const body = await response.json();

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
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.key, created.key);
});
