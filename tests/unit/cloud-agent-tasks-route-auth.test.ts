import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cloud-agent-auth-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const route = await import("../../src/app/api/v1/agents/tasks/route.ts");

type TasksGetRequest = Parameters<typeof route.GET>[0];
type ErrorBody = { error: { message: string } };

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function enableManagementAuth() {
  process.env.INITIAL_PASSWORD = "cloud-agent-password";
  await settingsDb.updateSettings({ requireLogin: true, password: "" });
}

test.beforeEach(async () => {
  await resetStorage();
  await enableManagementAuth();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;

  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;

  if (ORIGINAL_JWT_SECRET === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
});

test("cloud agent task list requires management auth when auth is enabled", async () => {
  const unauthenticated = await route.GET(
    new Request("http://localhost/api/v1/agents/tasks") as TasksGetRequest
  );
  const invalidToken = await route.GET(
    new Request("http://localhost/api/v1/agents/tasks", {
      headers: { authorization: "Bearer anything" },
    }) as TasksGetRequest
  );
  const authenticated = await route.GET(
    (await makeManagementSessionRequest("http://localhost/api/v1/agents/tasks")) as TasksGetRequest
  );

  assert.equal(unauthenticated.status, 401);
  assert.equal(
    ((await unauthenticated.json()) as ErrorBody).error.message,
    "Authentication required"
  );
  assert.equal(invalidToken.status, 403);
  assert.equal(
    ((await invalidToken.json()) as ErrorBody).error.message,
    "Invalid management token"
  );
  assert.equal(authenticated.status, 200);
  assert.deepEqual(await authenticated.json(), { data: [] });
});
