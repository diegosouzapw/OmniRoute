import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";
import { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-authz-pipeline-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../../src/lib/db/core.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const pipeline = await import("../../../src/server/authz/pipeline.ts");

const ORIGINAL_JWT = process.env.JWT_SECRET;
const ORIGINAL_INITIAL = process.env.INITIAL_PASSWORD;
const ORIGINAL_AUTH_COOKIE_SECURE = process.env.AUTH_COOKIE_SECURE;

function resetEnvironment() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  process.env.JWT_SECRET = "pipeline-jwt-secret";
  process.env.INITIAL_PASSWORD = "pipeline-initial-password";
  delete process.env.AUTH_COOKIE_SECURE;
  globalThis.__omnirouteShutdown = { init: false, shuttingDown: false, activeRequests: 0 };
}

async function forceAuthRequired() {
  await settingsDb.updateSettings({ requireLogin: true });
}

async function dashboardCookie(expiresIn = "1h"): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .sign(secret);
  return `auth_token=${token}`;
}

function request(url: string, init?: RequestInit): NextRequest {
  return new NextRequest(url, init);
}

test.beforeEach(() => {
  resetEnvironment();
});

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_JWT === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = ORIGINAL_JWT;
  if (ORIGINAL_INITIAL === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL;
  if (ORIGINAL_AUTH_COOKIE_SECURE === undefined) delete process.env.AUTH_COOKIE_SECURE;
  else process.env.AUTH_COOKIE_SECURE = ORIGINAL_AUTH_COOKIE_SECURE;
  globalThis.__omnirouteShutdown = { init: false, shuttingDown: false, activeRequests: 0 };
});

test("runAuthzPipeline redirects root to dashboard before management auth", async () => {
  await forceAuthRequired();

  const response = await pipeline.runAuthzPipeline(request("http://localhost/"), { enforce: true });

  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "http://localhost/dashboard");
});

test("runAuthzPipeline redirects unauthenticated dashboard pages to login", async () => {
  await forceAuthRequired();

  const response = await pipeline.runAuthzPipeline(request("http://localhost/dashboard"), {
    enforce: true,
  });

  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "http://localhost/login");
  assert.equal(response.headers.get("x-omniroute-route-class"), "MANAGEMENT");
  assert.ok(response.headers.get("x-request-id"));
});

test("runAuthzPipeline keeps management API rejections as JSON", async () => {
  await forceAuthRequired();

  const response = await pipeline.runAuthzPipeline(request("http://localhost/api/keys"), {
    enforce: true,
  });
  const body = await response.json();

  assert.equal(response.status, 401);
  assert.equal(response.headers.get("content-type")?.includes("application/json"), true);
  assert.equal(body.error.code, "AUTH_001");
});

test("runAuthzPipeline rejects oversized API bodies before auth", async () => {
  const response = await pipeline.runAuthzPipeline(
    request("http://localhost/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-length": String(99 * 1024 * 1024),
        origin: "https://app.example.com",
      },
    }),
    { enforce: true }
  );

  assert.equal(response.status, 413);
  assert.equal(response.headers.get("x-omniroute-route-class"), "CLIENT_API");
  assert.ok(response.headers.get("x-request-id"));
  assert.equal(
    response.headers.get("Access-Control-Allow-Methods"),
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
});

test("runAuthzPipeline rejects oversized rewritten alias API bodies before auth", async () => {
  const response = await pipeline.runAuthzPipeline(
    request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-length": String(99 * 1024 * 1024),
        origin: "https://app.example.com",
      },
    }),
    { enforce: true }
  );

  assert.equal(response.status, 413);
  assert.equal(response.headers.get("x-omniroute-route-class"), "CLIENT_API");
  assert.ok(response.headers.get("x-request-id"));
});

test("runAuthzPipeline rejects new API requests during shutdown drain", async () => {
  globalThis.__omnirouteShutdown = { init: true, shuttingDown: true, activeRequests: 0 };

  const response = await pipeline.runAuthzPipeline(request("http://localhost/api/v1/models"), {
    enforce: true,
  });
  const body = await response.json();

  assert.equal(response.status, 503);
  assert.equal(body.error.code, "SERVICE_UNAVAILABLE");
});

test("runAuthzPipeline rejects rewritten API aliases during shutdown drain", async () => {
  globalThis.__omnirouteShutdown = { init: true, shuttingDown: true, activeRequests: 0 };

  const response = await pipeline.runAuthzPipeline(request("http://localhost/responses"), {
    enforce: true,
  });
  const body = await response.json();

  assert.equal(response.status, 503);
  assert.equal(response.headers.get("x-omniroute-route-class"), "CLIENT_API");
  assert.equal(body.error.code, "SERVICE_UNAVAILABLE");
});

test("runAuthzPipeline allows dashboard sessions to read model catalog aliases", async () => {
  await forceAuthRequired();

  const response = await pipeline.runAuthzPipeline(
    request("http://localhost/v1/models", {
      headers: { cookie: await dashboardCookie() },
    }),
    { enforce: true }
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-omniroute-route-class"), "CLIENT_API");
});

test("runAuthzPipeline refreshes dashboard JWTs near expiry", async () => {
  await forceAuthRequired();
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const expiringToken = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);

  const response = await pipeline.runAuthzPipeline(
    request("http://localhost/dashboard", {
      headers: { cookie: `auth_token=${expiringToken}` },
    }),
    { enforce: true }
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("set-cookie") || "", /auth_token=/);
});
