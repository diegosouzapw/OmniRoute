import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

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

test.after(() => {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

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
