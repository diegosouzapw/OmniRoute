// Regression tests: POST /api/keys (and createApiKey) must accept expiresAt
// at creation time with identical semantics to the update path.
//
// Today createKeySchema strips expiresAt, so a key can only become expiring
// via a second updateApiKeyPermissions call — leaving a window where the key
// exists without expiry. Automation must be able to create an expiring key in
// one operation.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-api-key-create-expiry-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret-create-expiry";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { createKeySchema } = await import("../../src/shared/validation/schemas/keys.ts");
const listRoute = await import("../../src/app/api/keys/route.ts");

const FUTURE = new Date(Date.now() + 60 * 60_000).toISOString();
const PAST = new Date(Date.now() - 60_000).toISOString();

async function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function enableManagementAuth() {
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  const { updateSettings } = await import("@/lib/db/settings");
  await updateSettings({ requireLogin: true, password: "" });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  core.resetDbInstance();
});

test("createKeySchema accepts expiresAt with update-path semantics", () => {
  for (const expiresAt of [FUTURE, PAST, null, undefined]) {
    const parsed = createKeySchema.safeParse({
      name: "x",
      ...(expiresAt !== undefined && { expiresAt }),
    });
    assert.equal(parsed.success, true, `expected expiresAt=${expiresAt} to parse`);
  }
  for (const expiresAt of ["not-a-date", 123, "", "2026-13-45"]) {
    const parsed = createKeySchema.safeParse({ name: "x", expiresAt });
    assert.equal(parsed.success, false, `expected expiresAt=${JSON.stringify(expiresAt)} to fail`);
  }
});

test("createApiKey persists future expiresAt; key validates", async () => {
  const created = await apiKeysDb.createApiKey("expiry-create", "machine-1", [], {
    expiresAt: FUTURE,
  });
  const readback = await apiKeysDb.getApiKeyById(created.id);
  assert.equal(readback?.expiresAt, FUTURE);
  assert.equal(await apiKeysDb.validateApiKey(created.key), true);
});

test("createApiKey with past expiresAt is rejected like the update path", async () => {
  const created = await apiKeysDb.createApiKey("expiry-past", "machine-1", [], { expiresAt: PAST });
  assert.equal(await apiKeysDb.validateApiKey(created.key), false);
});

test("createApiKey without expiresAt stays non-expiring", async () => {
  for (const opts of [{}, { expiresAt: null }, { expiresAt: undefined }]) {
    const created = await apiKeysDb.createApiKey(
      `expiry-absent-${JSON.stringify(opts.expiresAt)}`,
      "machine-1",
      [],
      opts
    );
    const readback = await apiKeysDb.getApiKeyById(created.id);
    assert.equal(readback?.expiresAt ?? null, null);
    assert.equal(await apiKeysDb.validateApiKey(created.key), true);
  }
});

test("update path still enforces expiry on a key created with future expiry", async () => {
  const created = await apiKeysDb.createApiKey("expiry-interop", "machine-1", [], {
    expiresAt: FUTURE,
  });
  assert.equal(await apiKeysDb.validateApiKey(created.key), true);
  assert.equal(await apiKeysDb.updateApiKeyPermissions(created.id, { expiresAt: PAST }), true);
  assert.equal(await apiKeysDb.validateApiKey(created.key), false);
});

test("POST /api/keys creates an expiring key in one operation", async () => {
  await enableManagementAuth();
  const response = await listRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/keys", {
      method: "POST",
      body: { name: "Route Expiry Key", expiresAt: FUTURE },
    })
  );
  assert.equal(response.status, 201);
  const body = (await response.json()) as { id: string; key: string; expiresAt: string | null };
  assert.equal(body.expiresAt, FUTURE);
  const readback = await apiKeysDb.getApiKeyById(body.id);
  assert.equal(readback?.expiresAt, FUTURE);
  assert.equal(await apiKeysDb.validateApiKey(body.key), true);
});

test("POST /api/keys rejects malformed expiresAt without creating a key", async () => {
  await enableManagementAuth();
  const before = (await apiKeysDb.getApiKeys()).length;
  const response = await listRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/keys", {
      method: "POST",
      body: { name: "Bad Expiry Key", expiresAt: "not-a-date" },
    })
  );
  assert.equal(response.status, 400);
  assert.equal((await apiKeysDb.getApiKeys()).length, before);
});
