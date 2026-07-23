import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auth-login-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-for-login-route";

const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const loginRoute = await import("../../src/app/api/auth/login/route.ts");
const managementPassword = await import("../../src/lib/auth/managementPassword.ts");

const originalGetCookieStore = loginRoute.authRouteInternals.getCookieStore;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.INITIAL_PASSWORD;
}

test.beforeEach(async () => {
  await resetStorage();
  loginRoute.authRouteInternals.getCookieStore = async () => ({
    set() {},
  });
});

test.afterEach(() => {
  loginRoute.authRouteInternals.getCookieStore = originalGetCookieStore;
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

test("auth login route returns 400 for malformed JSON bodies", async () => {
  const response = await loginRoute.POST(
    new Request("http://localhost/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "a��",
    })
  );

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    error: {
      message: "Invalid request",
      details: [{ field: "body", message: "Invalid JSON body" }],
    },
  });
});

test("auth login route returns needsSetup when no management password is configured", async () => {
  const response = await loginRoute.POST(
    new Request("http://localhost/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password: "missing-password" }),
    })
  );

  assert.equal(response.status, 403);
  assert.deepEqual(await response.json(), {
    error: "No password configured. Complete onboarding first.",
    needsSetup: true,
  });
});

test("auth login route lazily migrates INITIAL_PASSWORD to a persisted hash before validating", async () => {
  process.env.INITIAL_PASSWORD = "bootstrap-secret";
  const setCalls: unknown[][] = [];
  loginRoute.authRouteInternals.getCookieStore = async () => ({
    set: (...args: unknown[]) => setCalls.push(args),
  });

  const response = await loginRoute.POST(
    new Request("http://localhost/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-proto": "https" },
      body: JSON.stringify({ password: "bootstrap-secret" }),
    })
  );
  const settings = await settingsDb.getSettings();

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(setCalls.length, 1);
  assert.equal(managementPassword.isBcryptHash(settings.password), true);
  assert.equal(
    await managementPassword.verifyManagementPassword(
      "bootstrap-secret",
      (settings as any).password
    ),
    true
  );
});

test("auth login route sets a bounded maxAge on the auth_token cookie (Seg3)", async () => {
  process.env.INITIAL_PASSWORD = "bootstrap-secret";
  const setCalls: unknown[][] = [];
  loginRoute.authRouteInternals.getCookieStore = async () => ({
    set: (...args: unknown[]) => setCalls.push(args),
  });

  const response = await loginRoute.POST(
    new Request("http://localhost/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password: "bootstrap-secret" }),
    })
  );

  assert.equal(response.status, 200);
  assert.equal(setCalls.length, 1);
  const [cookieName, , options] = setCalls[0] as [string, string, Record<string, unknown>];
  assert.equal(cookieName, "auth_token");
  // 30 days in seconds — must match the JWT 30d expiry so the cookie is not an open-ended
  // session cookie outliving its token.
  assert.equal(options.maxAge, 60 * 60 * 24 * 30);
  assert.equal(options.httpOnly, true);
  assert.equal(options.path, "/");
});
