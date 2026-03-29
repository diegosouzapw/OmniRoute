import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-api-key-visibility-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const listRoute = await import("../../src/app/api/keys/route.ts");
const detailRoute = await import("../../src/app/api/keys/[id]/route.ts");

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

test("GET /api/keys masks stored keys when reveal is disabled", async () => {
  const created = await apiKeysDb.createApiKey("Primary Key", MACHINE_ID);

  const response = await listRoute.GET();
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.allowKeyReveal, false);
  assert.equal(Array.isArray(body.keys), true);
  assert.equal(body.keys.length, 1);
  assert.equal(body.keys[0].id, created.id);
  assert.equal(body.keys[0].key, maskKey(created.key));
  assert.notEqual(body.keys[0].key, created.key);
});

test("GET /api/keys returns full keys when reveal is enabled", async () => {
  process.env.ALLOW_API_KEY_REVEAL = "true";
  const created = await apiKeysDb.createApiKey("Primary Key", MACHINE_ID);

  const response = await listRoute.GET();
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.allowKeyReveal, true);
  assert.equal(Array.isArray(body.keys), true);
  assert.equal(body.keys.length, 1);
  assert.equal(body.keys[0].id, created.id);
  assert.equal(body.keys[0].key, created.key);
});

test("GET /api/keys/[id] mirrors the reveal toggle", async () => {
  const created = await apiKeysDb.createApiKey("Primary Key", MACHINE_ID);
  const request = new Request(`http://localhost/api/keys/${created.id}`);

  const maskedResponse = await detailRoute.GET(request, {
    params: Promise.resolve({ id: created.id }),
  });
  const maskedBody = await maskedResponse.json();

  assert.equal(maskedResponse.status, 200);
  assert.equal(maskedBody.allowKeyReveal, false);
  assert.equal(maskedBody.key, maskKey(created.key));

  process.env.ALLOW_API_KEY_REVEAL = "true";

  const revealedResponse = await detailRoute.GET(request, {
    params: Promise.resolve({ id: created.id }),
  });
  const revealedBody = await revealedResponse.json();

  assert.equal(revealedResponse.status, 200);
  assert.equal(revealedBody.allowKeyReveal, true);
  assert.equal(revealedBody.key, created.key);
});
