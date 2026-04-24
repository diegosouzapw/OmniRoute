import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-settings-route-password-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const settingsRoute = await import("../../src/app/api/settings/route.ts");
const managementPassword = await import("../../src/lib/auth/managementPassword.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.INITIAL_PASSWORD;
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_INITIAL_PASSWORD === undefined) {
    delete process.env.INITIAL_PASSWORD;
  } else {
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  }
});

test("settings route password update requires the current INITIAL_PASSWORD after lazy hash migration", async () => {
  process.env.INITIAL_PASSWORD = "bootstrap-secret";

  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: {
        currentPassword: "bootstrap-secret",
        newPassword: "rotated-secret",
      },
    })
  );
  const settings = await settingsDb.getSettings();

  assert.equal(response.status, 200);
  assert.equal(managementPassword.isBcryptHash(settings.password), true);
  assert.equal(
    await managementPassword.verifyManagementPassword("rotated-secret", (settings as any).password),
    true
  );
  assert.equal(
    await managementPassword.verifyManagementPassword(
      "bootstrap-secret" as any,
      (settings as any).password
    ),
    false
  );
});

test("settings route password update rejects the wrong current password after migrating INITIAL_PASSWORD", async () => {
  process.env.INITIAL_PASSWORD = "bootstrap-secret";

  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: {
        currentPassword: "wrong-secret",
        newPassword: "rotated-secret",
      },
    })
  );

  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), { error: "Invalid current password" });
});
