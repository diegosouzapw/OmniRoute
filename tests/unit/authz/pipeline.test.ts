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
const ORIGINAL_REQUIRE_API_KEY = process.env.REQUIRE_API_KEY;
const ORIGINAL_OMNIROUTE_PUBLIC_BASE_URL = process.env.OMNIROUTE_PUBLIC_BASE_URL;
const ORIGINAL_NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const ORIGINAL_NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const ORIGINAL_OMNIROUTE_TRUST_PROXY = process.env.OMNIROUTE_TRUST_PROXY;
const ORIGINAL_OMNIROUTE_PEER_STAMP_TOKEN = process.env.OMNIROUTE_PEER_STAMP_TOKEN;

function resetEnvironment() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  process.env.JWT_SECRET = "pipeline-jwt-secret";
  process.env.INITIAL_PASSWORD = "pipeline-initial-password";
  process.env.REQUIRE_API_KEY = "true";
  delete process.env.AUTH_COOKIE_SECURE;
  delete process.env.OMNIROUTE_PUBLIC_BASE_URL;
  delete process.env.NEXT_PUBLIC_BASE_URL;
  delete process.env.NEXT_PUBLIC_APP_URL;
  delete process.env.OMNIROUTE_TRUST_PROXY;
  delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
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
  if (ORIGINAL_REQUIRE_API_KEY === undefined) delete process.env.REQUIRE_API_KEY;
  else process.env.REQUIRE_API_KEY = ORIGINAL_REQUIRE_API_KEY;
  if (ORIGINAL_OMNIROUTE_PUBLIC_BASE_URL === undefined)
    delete process.env.OMNIROUTE_PUBLIC_BASE_URL;
  else process.env.OMNIROUTE_PUBLIC_BASE_URL = ORIGINAL_OMNIROUTE_PUBLIC_BASE_URL;
  if (ORIGINAL_NEXT_PUBLIC_BASE_URL === undefined) delete process.env.NEXT_PUBLIC_BASE_URL;
  else process.env.NEXT_PUBLIC_BASE_URL = ORIGINAL_NEXT_PUBLIC_BASE_URL;
  if (ORIGINAL_NEXT_PUBLIC_APP_URL === undefined) delete process.env.NEXT_PUBLIC_APP_URL;
  else process.env.NEXT_PUBLIC_APP_URL = ORIGINAL_NEXT_PUBLIC_APP_URL;
  if (ORIGINAL_OMNIROUTE_TRUST_PROXY === undefined) delete process.env.OMNIROUTE_TRUST_PROXY;
  else process.env.OMNIROUTE_TRUST_PROXY = ORIGINAL_OMNIROUTE_TRUST_PROXY;
  if (ORIGINAL_OMNIROUTE_PEER_STAMP_TOKEN === undefined) {
    delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
  } else {
    process.env.OMNIROUTE_PEER_STAMP_TOKEN = ORIGINAL_OMNIROUTE_PEER_STAMP_TOKEN;
  }
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

test("runAuthzPipeline redirects unauthenticated /home to login (#2712)", async () => {
  await forceAuthRequired();

  const response = await pipeline.runAuthzPipeline(request("http://localhost/home"), {
    enforce: true,
  });

  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "http://localhost/login");
  assert.equal(response.headers.get("x-omniroute-route-class"), "MANAGEMENT");
});

test("runAuthzPipeline redirects unauthenticated /home/* nested paths to login (#2712)", async () => {
  await forceAuthRequired();

  const response = await pipeline.runAuthzPipeline(request("http://localhost/home/settings"), {
    enforce: true,
  });

  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "http://localhost/login");
  assert.equal(response.headers.get("x-omniroute-route-class"), "MANAGEMENT");
});

test("runAuthzPipeline allows onboarding when login is required but no password exists", async () => {
  delete process.env.INITIAL_PASSWORD;
  await settingsDb.updateSettings({
    requireLogin: true,
    setupComplete: true,
    password: "",
  });

  const response = await pipeline.runAuthzPipeline(
    request("https://example.com/dashboard/onboarding"),
    { enforce: true }
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-omniroute-route-class"), "PUBLIC");
});

test("runAuthzPipeline allows first password writes when login is required but no password exists", async () => {
  delete process.env.INITIAL_PASSWORD;
  await settingsDb.updateSettings({
    requireLogin: true,
    setupComplete: true,
    password: "",
  });

  const response = await pipeline.runAuthzPipeline(
    request("https://example.com/api/settings/require-login", { method: "POST" }),
    { enforce: true }
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-omniroute-route-class"), "MANAGEMENT");
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

test("runAuthzPipeline rejects unauthenticated v1beta Gemini aliases as client API", async () => {
  const response = await pipeline.runAuthzPipeline(
    request("http://localhost/v1beta/models/gemini-pro:generateContent", {
      method: "POST",
    }),
    { enforce: true }
  );
  const body = await response.json();

  assert.equal(response.status, 401);
  assert.equal(response.headers.get("x-omniroute-route-class"), "CLIENT_API");
  assert.equal(body.error.code, "AUTH_002");
});

test("runAuthzPipeline rejects unauthenticated internal api v1beta routes as client API", async () => {
  const response = await pipeline.runAuthzPipeline(
    request("http://localhost/api/v1beta/models/gemini-pro:generateContent", {
      method: "POST",
    }),
    { enforce: true }
  );
  const body = await response.json();

  assert.equal(response.status, 401);
  assert.equal(response.headers.get("x-omniroute-route-class"), "CLIENT_API");
  assert.equal(body.error.code, "AUTH_002");
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

test("runAuthzPipeline allows dashboard sessions to reach DB health management API", async () => {
  await forceAuthRequired();

  const response = await pipeline.runAuthzPipeline(
    request("http://localhost/api/db/health", {
      headers: { cookie: await dashboardCookie() },
    }),
    { enforce: true }
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-omniroute-route-class"), "MANAGEMENT");
});

test("runAuthzPipeline accepts dashboard mutations from configured public origin", async () => {
  await forceAuthRequired();
  process.env.NEXT_PUBLIC_BASE_URL = "https://gateway.example.test";

  const response = await pipeline.runAuthzPipeline(
    request("http://omniroute:20128/api/providers/health-autopilot/actions", {
      method: "POST",
      headers: {
        cookie: await dashboardCookie(),
        origin: "https://gateway.example.test",
        "content-type": "application/json",
      },
      body: "{}",
    }),
    { enforce: true }
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-omniroute-route-class"), "MANAGEMENT");
});

test("runAuthzPipeline rejects dashboard mutations from invalid browser origin", async () => {
  await forceAuthRequired();
  process.env.NEXT_PUBLIC_BASE_URL = "https://gateway.example.test";

  const response = await pipeline.runAuthzPipeline(
    request("http://omniroute:20128/api/providers/health-autopilot/actions", {
      method: "POST",
      headers: {
        cookie: await dashboardCookie(),
        origin: "https://evil.example",
        "content-type": "application/json",
      },
      body: "{}",
    }),
    { enforce: true }
  );
  const body = await response.json();

  assert.equal(response.status, 403);
  assert.equal(body.error.code, "INVALID_ORIGIN");
  assert.match(body.error.message, /^Invalid request origin\./);
  assert.match(body.error.message, /OMNIROUTE_PUBLIC_BASE_URL/);
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
