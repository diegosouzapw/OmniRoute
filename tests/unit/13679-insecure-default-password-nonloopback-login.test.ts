import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * Regression test for issue #13679 (PR D, item #5) — deploy manifests
 * (`contrib/podman/omniroute.container`, `.env.example`) ship the well-known
 * placeholder `INITIAL_PASSWORD=CHANGEME`. `ensurePersistentManagementPasswordHash()`
 * already warns loudly on boot when the bootstrap password is this literal, but it
 * does NOT stop a remote attacker who simply tries the well-known default from
 * logging in over the network — only a local console warning fires.
 *
 * Fix: `/api/auth/login` now refuses a successful password match against a
 * known-insecure default (e.g. "CHANGEME") when the request does not originate
 * from loopback, forcing the operator to log in from localhost and rotate the
 * password before the dashboard is reachable from the network with the
 * default credential.
 */

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13679d-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-13679d";

const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const loginRoute = await import("../../src/app/api/auth/login/route.ts");

const originalGetCookieStore = loginRoute.authRouteInternals.getCookieStore;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  process.env.INITIAL_PASSWORD = "CHANGEME";
}

test.beforeEach(async () => {
  await resetStorage();
  loginRoute.authRouteInternals.getCookieStore = async () => ({ set() {} });
});

test.afterEach(() => {
  loginRoute.authRouteInternals.getCookieStore = originalGetCookieStore;
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_INITIAL_PASSWORD === undefined) {
    delete process.env.INITIAL_PASSWORD;
  } else {
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  }
});

function postLogin(password: string, forwardedFor: string) {
  return loginRoute.POST(
    new Request("http://localhost/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": forwardedFor,
      },
      body: JSON.stringify({ password }),
    })
  );
}

test("a public-IP login with the well-known default password CHANGEME is rejected", async () => {
  const response = await postLogin("CHANGEME", "203.0.113.77");

  assert.equal(
    response.status,
    403,
    "a remote attacker guessing the well-known default INITIAL_PASSWORD must not be able to " +
      "authenticate — only a console warning fires today, which is not a real control"
  );
  assert.equal(response.headers.get("set-cookie"), null, "no session cookie must be issued");

  const [entry] = compliance.getAuditLog({
    action: "auth.login.insecure_default_blocked",
    limit: 1,
  });
  assert.ok(
    entry,
    "expected an auth.login.insecure_default_blocked audit entry for the blocked attempt"
  );
});

test("a loopback login with the well-known default password CHANGEME still succeeds", async () => {
  const response = await postLogin("CHANGEME", "127.0.0.1");

  assert.equal(
    response.status,
    200,
    "the operator must still be able to bootstrap/rotate the password from loopback"
  );
  const body = await response.json();
  assert.equal(body.success, true);
});

test("a public-IP login with a non-default (rotated) password still succeeds", async () => {
  process.env.INITIAL_PASSWORD = "a-real-rotated-password-13679d";
  const response = await postLogin("a-real-rotated-password-13679d", "203.0.113.77");

  assert.equal(
    response.status,
    200,
    "the insecure-default check must not block legitimate remote logins once the password " +
      "has actually been rotated away from the well-known default"
  );
});
