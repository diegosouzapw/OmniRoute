import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { makeManagementSessionRequest } from "../helpers/managementSession.ts";
import { AUTHZ_HEADER_PEER_LOCALITY } from "../../src/server/authz/headers.ts";

const dataDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-video-runtime-route-"));
const originalDataDirectory = process.env.DATA_DIR;
const originalInitialPassword = process.env.INITIAL_PASSWORD;
const originalJwtSecret = process.env.JWT_SECRET;
process.env.DATA_DIR = dataDirectory;

const core = await import("../../src/lib/db/core.ts");
const settings = await import("../../src/lib/db/settings.ts");
const route = await import("../../src/app/api/modality-bridge/video/runtime/route.ts");

async function withLocality(request: Request, locality: "loopback" | "lan"): Promise<Request> {
  const headers = new Headers(request.headers);
  headers.set(AUTHZ_HEADER_PEER_LOCALITY, locality);
  return new Request(request, { headers });
}

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(dataDirectory, { force: true, recursive: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDirectory, { recursive: true });
  process.env.INITIAL_PASSWORD = "video-runtime-test-password";
  await settings.updateSettings({ requireLogin: true, password: "" });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDirectory, { force: true, recursive: true, maxRetries: 5, retryDelay: 100 });
  if (originalDataDirectory === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDirectory;
  if (originalInitialPassword === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = originalInitialPassword;
  if (originalJwtSecret === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = originalJwtSecret;
});

test("Video Bridge runtime status requires management auth and returns only sanitized fields", async () => {
  const url = "http://localhost/api/modality-bridge/video/runtime";
  const unauthenticated = await route.GET(await withLocality(new Request(url), "loopback"));
  assert.equal(unauthenticated.status, 401);

  const authenticated = await route.GET(
    await withLocality(await makeManagementSessionRequest(url), "loopback")
  );
  assert.equal(authenticated.status, 200);
  assert.equal(authenticated.headers.get("cache-control"), "no-store");
  const body = (await authenticated.json()) as Record<string, unknown>;
  assert.equal(typeof body.available, "boolean");
  assert.deepEqual(
    Object.keys(body).sort(),
    body.available
      ? ["available", "ffmpegVersion", "ffprobeVersion"]
      : ["available", "ffmpegVersion", "ffprobeVersion", "reason"]
  );
  assert.equal(JSON.stringify(body).includes("/private/"), false);
  assert.equal(JSON.stringify(body).includes("stderr"), false);
});

test("Video Bridge runtime rejects private-LAN callers before auth or subprocess probing", async () => {
  const url = "http://localhost/api/modality-bridge/video/runtime";
  let probes = 0;
  const probe = async () => {
    probes += 1;
    return { available: true, ffmpegVersion: "test", ffprobeVersion: "test" };
  };

  const unauthenticated = await route.handleVideoRuntimeStatus(
    await withLocality(new Request(url), "lan"),
    { probe }
  );
  const authenticated = await route.handleVideoRuntimeStatus(
    await withLocality(await makeManagementSessionRequest(url), "lan"),
    { probe }
  );

  assert.equal(unauthenticated.status, 403);
  assert.equal(authenticated.status, 403);
  assert.equal(probes, 0);
});
