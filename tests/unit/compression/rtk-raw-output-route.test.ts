import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-raw-route-"));
const originalDataDir = process.env.DATA_DIR;
const originalJwtSecret = process.env.JWT_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const route = await import("../../../src/app/api/context/rtk/raw-output/[id]/route.ts");
const rawOutput = await import("../../../open-sse/services/compression/engines/rtk/rawOutput.ts");

type ErrorResponseBody = {
  error: string | { message?: string };
};

async function resetAuthRequiredStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await settingsDb.updateSettings({
    requireLogin: true,
    setupComplete: true,
    password: "test-password-hash",
  });
}

test.beforeEach(async () => {
  process.env.DATA_DIR = TEST_DATA_DIR;
  await resetAuthRequiredStorage();
});

test.after(() => {
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  if (originalJwtSecret === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = originalJwtSecret;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("RTK raw-output route requires management auth before reading retained output", async () => {
  const pointer = rawOutput.maybePersistRtkRawOutput("error: full output", {
    retention: "always",
    command: "pytest",
  });
  assert.ok(pointer);

  const response = await route.GET(
    new Request(`http://localhost/api/context/rtk/raw-output/${pointer.id}`),
    { params: Promise.resolve({ id: pointer.id }) }
  );
  const body = (await response.json()) as ErrorResponseBody;

  assert.equal(response.status, 401);
  assert.equal(
    typeof body.error === "object" ? body.error.message : null,
    "Authentication required"
  );
});

test("RTK raw-output route rejects bearer tokens without a dashboard session", async () => {
  const response = await route.GET(
    new Request("http://localhost/api/context/rtk/raw-output/0123456789abcdef01234567", {
      headers: { authorization: "Bearer invalid-management-token" },
    }),
    { params: Promise.resolve({ id: "0123456789abcdef01234567" }) }
  );
  const body = (await response.json()) as ErrorResponseBody;

  assert.equal(response.status, 403);
  assert.equal(
    typeof body.error === "object" ? body.error.message : null,
    "Invalid management token"
  );
});

test("RTK raw-output route validates pointer ids for authenticated callers", async () => {
  const request = await makeManagementSessionRequest(
    "http://localhost/api/context/rtk/raw-output/not-a-pointer"
  );

  const response = await route.GET(request, {
    params: Promise.resolve({ id: "not-a-pointer" }),
  });
  const body = (await response.json()) as ErrorResponseBody;

  assert.equal(response.status, 400);
  assert.equal(body.error, "Invalid raw output id");
});

test("RTK raw-output route returns 404 for missing authenticated pointers", async () => {
  const request = await makeManagementSessionRequest(
    "http://localhost/api/context/rtk/raw-output/0123456789abcdef01234567"
  );

  const response = await route.GET(request, {
    params: Promise.resolve({ id: "0123456789abcdef01234567" }),
  });
  const body = (await response.json()) as ErrorResponseBody;

  assert.equal(response.status, 404);
  assert.equal(body.error, "Raw output not found");
});

test("RTK raw-output route returns retained redacted output for authenticated callers", async () => {
  const pointer = rawOutput.maybePersistRtkRawOutput(
    "token=secret-value\nAuthorization: Bearer abcdef123456\nerror: full output",
    {
      retention: "always",
      command: "pytest",
    }
  );
  assert.ok(pointer);

  const request = await makeManagementSessionRequest(
    `http://localhost/api/context/rtk/raw-output/${pointer.id}`
  );
  const response = await route.GET(request, {
    params: Promise.resolve({ id: pointer.id }),
  });
  const content = await response.text();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.match(response.headers.get("content-type") ?? "", /text\/plain/);
  assert.match(content, /token=\[REDACTED\]/);
  assert.match(content, /Authorization: Bearer \[REDACTED\]/);
  assert.ok(!content.includes("secret-value"));
  assert.ok(!content.includes("abcdef123456"));
});
