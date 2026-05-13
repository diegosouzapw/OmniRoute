import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cooldown-auth-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const route = await import("../../src/app/api/resilience/model-cooldowns/route.ts");
const modelAvailability = await import("../../src/domain/modelAvailability.ts");
const accountFallback = await import("@omniroute/open-sse/services/accountFallback");

const { getAvailabilityReport } = modelAvailability;
const { clearModelLock, lockModel } = accountFallback;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function enableManagementAuth() {
  process.env.INITIAL_PASSWORD = "cooldown-password";
  await settingsDb.updateSettings({ requireLogin: true, password: "" });
}

test.beforeEach(async () => {
  clearModelLock("cooldown-auth-provider", "cooldown-auth-conn", "cooldown-auth-model");
  await resetStorage();
  await enableManagementAuth();
});

test.after(async () => {
  clearModelLock("cooldown-auth-provider", "cooldown-auth-conn", "cooldown-auth-model");
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;

  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;

  if (ORIGINAL_JWT_SECRET === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
});

test("model cooldown reset requires management auth", async () => {
  lockModel(
    "cooldown-auth-provider",
    "cooldown-auth-conn",
    "cooldown-auth-model",
    "quota_exhausted",
    60_000,
    {}
  );

  const unauthenticated = await route.DELETE(
    new Request("http://localhost/api/resilience/model-cooldowns", {
      method: "DELETE",
      body: JSON.stringify({ all: true }),
    })
  );

  assert.equal(unauthenticated.status, 401);
  assert.ok(
    getAvailabilityReport().some(
      (entry) =>
        entry.provider === "cooldown-auth-provider" && entry.model === "cooldown-auth-model"
    )
  );

  const authenticated = await route.DELETE(
    await makeManagementSessionRequest("http://localhost/api/resilience/model-cooldowns", {
      method: "DELETE",
      body: { all: true },
    })
  );

  assert.equal(authenticated.status, 200);
  assert.deepEqual(await authenticated.json(), { ok: true, clearedAll: true });
  assert.equal(
    getAvailabilityReport().some((entry) => entry.provider === "cooldown-auth-provider"),
    false
  );
});
