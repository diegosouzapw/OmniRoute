import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import bcrypt from "bcryptjs";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-login-bootstrap-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const route = await import("../../src/app/api/settings/require-login/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  delete process.env.INITIAL_PASSWORD;
  await resetStorage();
});

test.afterEach(() => {
  bcrypt.hash = originalHash;
});

test.after(() => {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

const originalHash = bcrypt.hash;

test("public login bootstrap route exposes the metadata the login page consumes", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    setupComplete: true,
  });

  const response = await route.GET();
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body, {
    requireLogin: true,
    hasPassword: false,
    setupComplete: true,
  });
});

test("public login bootstrap route reports env-provided bootstrap password metadata", async () => {
  process.env.INITIAL_PASSWORD = "bootstrap-secret";

  await settingsDb.updateSettings({
    requireLogin: true,
    setupComplete: true,
  });

  const response = await route.GET();
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body, {
    requireLogin: true,
    hasPassword: true,
    setupComplete: true,
  });
});

test("public login bootstrap route reports stored password metadata and disabled auth state", async () => {
  await settingsDb.updateSettings({
    requireLogin: false,
    password: "hashed-password",
    setupComplete: true,
  });

  const response = await route.GET();
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body, {
    requireLogin: false,
    hasPassword: true,
    setupComplete: true,
  });
});

test("public login bootstrap route POST rejects invalid JSON bodies", async () => {
  const request = new Request("http://localhost/api/settings/require-login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{ invalid json",
  });

  const response = await route.POST(request);
  const body = await response.json();

  assert.equal(response.status, 400);
  assert.equal(body.error.message, "Invalid request");
  assert.deepEqual(body.error.details, [{ field: "body", message: "Invalid JSON body" }]);
});

test("public login bootstrap route POST rejects empty updates", async () => {
  const request = new Request("http://localhost/api/settings/require-login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  });

  const response = await route.POST(request);
  const body = await response.json();

  assert.equal(response.status, 400);
  assert.equal(body.error.message, "Invalid request");
  assert.match(body.error.details[0].message, /No valid fields to update/);
});

test("public login bootstrap route POST updates requireLogin without forcing password", async () => {
  const request = new Request("http://localhost/api/settings/require-login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ requireLogin: false }),
  });

  const response = await route.POST(request);
  const body = await response.json();
  const settings = await settingsDb.getSettings();

  assert.equal(response.status, 200);
  assert.deepEqual(body, { success: true });
  assert.equal(settings.requireLogin, false);
  assert.equal(settings.password, undefined);
});

test("public login bootstrap route POST hashes and stores passwords", async () => {
  const password = "super-secret";
  const request = new Request("http://localhost/api/settings/require-login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ requireLogin: true, password }),
  });

  const response = await route.POST(request);
  const body = await response.json();
  const settings = await settingsDb.getSettings();

  assert.equal(response.status, 200);
  assert.deepEqual(body, { success: true });
  assert.equal(settings.requireLogin, true);
  assert.ok(settings.password);
  assert.notEqual(settings.password, password);
  assert.equal(await bcrypt.compare(password, settings.password), true);
});

test("public login bootstrap route POST returns 500 when hashing fails", async () => {
  bcrypt.hash = async () => {
    throw new Error("hash failed");
  };

  const request = new Request("http://localhost/api/settings/require-login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ password: "super-secret" }),
  });

  const response = await route.POST(request);
  const body = await response.json();

  assert.equal(response.status, 500);
  assert.deepEqual(body, { error: "hash failed" });
});
