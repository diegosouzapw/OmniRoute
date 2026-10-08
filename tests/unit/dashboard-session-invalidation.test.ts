// A dashboard session is a 30-day JWT. These tests pin what ends one early: a password change
// (every session issued before it) and a sign-out (that session only).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-session-invalidation-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-session-invalidation";
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const settingsRoute = await import("../../src/app/api/settings/route.ts");
const logoutRoute = await import("../../src/app/api/auth/logout/route.ts");
const sessionToken = await import("../../src/shared/utils/dashboardSessionToken.ts");

const {
  DASHBOARD_SESSION_COOKIE,
  REVOKED_SESSIONS_SETTING,
  SESSIONS_VALID_AFTER_SETTING,
  addRevokedSession,
  getDashboardJwtSecret,
  mintDashboardSessionToken,
  verifyDashboardSessionToken,
} = sessionToken;

const secret = getDashboardJwtSecret()!;
const nowSeconds = () => Math.floor(Date.now() / 1000);

/** A session token as an older release minted it (no id) or issued `ageSeconds` ago. */
async function sessionIssuedAgo(ageSeconds: number, withJti = false): Promise<string> {
  const jwt = new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(nowSeconds() - ageSeconds)
    .setExpirationTime("30d");
  if (withJti) jwt.setJti(crypto.randomUUID());
  return jwt.sign(secret);
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.INITIAL_PASSWORD;
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
});

test("a minted session carries an issue time and an id and verifies", async () => {
  const token = await mintDashboardSessionToken(secret);
  const payload = await verifyDashboardSessionToken(token);

  assert.ok(payload);
  assert.equal(typeof payload.iat, "number");
  assert.equal(typeof payload.jti, "string");
  assert.notEqual(
    payload.jti,
    (await verifyDashboardSessionToken(await mintDashboardSessionToken(secret)))?.jti
  );
});

test("sessions issued before the cutoff stop verifying, later ones and older-release tokens follow the cutoff", async () => {
  const oldSession = await sessionIssuedAgo(120, true);
  const legacySession = await sessionIssuedAgo(120, false);
  assert.ok(await verifyDashboardSessionToken(oldSession));
  assert.ok(await verifyDashboardSessionToken(legacySession));

  await settingsDb.updateSettings({ [SESSIONS_VALID_AFTER_SETTING]: nowSeconds() - 60 });

  assert.equal(await verifyDashboardSessionToken(oldSession), null);
  assert.equal(await verifyDashboardSessionToken(legacySession), null);
  assert.ok(await verifyDashboardSessionToken(await sessionIssuedAgo(10, true)));
  assert.ok(await verifyDashboardSessionToken(await mintDashboardSessionToken(secret)));
});

test("a password change ends the sessions issued before it and re-issues the caller's cookie", async () => {
  process.env.INITIAL_PASSWORD = "bootstrap-secret";
  const oldSession = await sessionIssuedAgo(300, true);
  const otherDeviceSession = await sessionIssuedAgo(600, true);

  const response = await settingsRoute.PATCH(
    new Request("http://localhost/api/settings", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        cookie: `${DASHBOARD_SESSION_COOKIE}=${oldSession}`,
      },
      body: JSON.stringify({ currentPassword: "bootstrap-secret", newPassword: "rotated-secret" }),
    })
  );
  const body = (await response.json()) as Record<string, unknown>;

  assert.equal(response.status, 200);
  assert.equal(await verifyDashboardSessionToken(oldSession), null);
  assert.equal(await verifyDashboardSessionToken(otherDeviceSession), null);

  const setCookie = response.headers.get("set-cookie") || "";
  const reissued = new RegExp(`${DASHBOARD_SESSION_COOKIE}=([^;]+)`).exec(setCookie)?.[1];
  assert.ok(reissued, "the browser that changed the password gets a fresh session");
  assert.ok(await verifyDashboardSessionToken(reissued));
  assert.match(setCookie, /HttpOnly/i);

  assert.equal(SESSIONS_VALID_AFTER_SETTING in body, false, "the cutoff is not sent to the client");
  assert.equal(REVOKED_SESSIONS_SETTING in body, false);
});

test("a settings update that leaves the password alone keeps every session", async () => {
  const session = await sessionIssuedAgo(300, true);

  const response = await settingsRoute.PATCH(
    new Request("http://localhost/api/settings", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        cookie: `${DASHBOARD_SESSION_COOKIE}=${session}`,
      },
      body: JSON.stringify({ debugMode: true }),
    })
  );

  assert.equal(response.status, 200);
  assert.ok(await verifyDashboardSessionToken(session));
  assert.equal(response.headers.get("set-cookie"), null);
});

test("signing out revokes that session only", async () => {
  const signedOut = await mintDashboardSessionToken(secret);
  const otherDevice = await mintDashboardSessionToken(secret);
  const deleted: string[] = [];
  const original = logoutRoute.logoutRouteInternals.getCookieStore;
  logoutRoute.logoutRouteInternals.getCookieStore = (async () => ({
    get: (name: string) => (name === DASHBOARD_SESSION_COOKIE ? { value: signedOut } : undefined),
    delete: (name: string) => {
      deleted.push(name);
    },
  })) as typeof original;
  try {
    const response = await logoutRoute.POST(
      new Request("http://localhost/api/auth/logout", { method: "POST" })
    );
    assert.equal(response.status, 200);
  } finally {
    logoutRoute.logoutRouteInternals.getCookieStore = original;
  }

  assert.deepEqual(deleted, [DASHBOARD_SESSION_COOKIE]);
  assert.equal(await verifyDashboardSessionToken(signedOut), null, "a copy of the token is dead");
  assert.ok(await verifyDashboardSessionToken(otherDevice));
});

test("signing out with an invalid or missing cookie still clears it and revokes nothing", async () => {
  const deleted: string[] = [];
  const original = logoutRoute.logoutRouteInternals.getCookieStore;
  logoutRoute.logoutRouteInternals.getCookieStore = (async () => ({
    get: () => ({ value: "not-a-token" }),
    delete: (name: string) => {
      deleted.push(name);
    },
  })) as typeof original;
  try {
    const response = await logoutRoute.POST(
      new Request("http://localhost/api/auth/logout", { method: "POST" })
    );
    assert.equal(response.status, 200);
  } finally {
    logoutRoute.logoutRouteInternals.getCookieStore = original;
  }
  assert.deepEqual(deleted, [DASHBOARD_SESSION_COOKIE]);
  const settings = (await settingsDb.getSettings()) as Record<string, unknown>;
  assert.equal(settings[REVOKED_SESSIONS_SETTING], undefined);
});

test("the revoked-session list drops expired entries, deduplicates and stays bounded", () => {
  const now = 1_000;
  const list = addRevokedSession(
    [
      { jti: "expired", exp: 900 },
      { jti: "kept", exp: 2_000 },
      { jti: "again", exp: 2_000 },
      "junk",
    ],
    { jti: "again", exp: 3_000 },
    now
  );
  assert.deepEqual(list, [
    { jti: "kept", exp: 2_000 },
    { jti: "again", exp: 3_000 },
  ]);

  let big: unknown = [];
  for (let i = 0; i < 600; i += 1) big = addRevokedSession(big, { jti: `s${i}`, exp: 5_000 }, now);
  assert.equal((big as unknown[]).length, 500);
  assert.equal((big as Array<{ jti: string }>).at(-1)?.jti, "s599");
});
