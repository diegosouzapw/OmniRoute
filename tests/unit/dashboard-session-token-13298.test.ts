/**
 * #13298 — a dashboard session is a JWT that (a) verifies against JWT_SECRET AND
 * (b) carries `authenticated: true`, the claim every dashboard minter emits
 * (login, OIDC callback, pipeline refresh). Any other JWT signed with the same
 * secret — notably the Cursor CLI passthrough token (iss "omniroute", aud
 * "cursor-cli", no claim) — is NOT a session.
 */
import "../_setup/isolateDataDir.ts";
import { test } from "node:test";
import assert from "node:assert/strict";
import { SignJWT } from "jose";

process.env.JWT_SECRET = "dashboard-session-token-13298-secret";

const { verifyDashboardSessionToken, getDashboardJwtSecret, DASHBOARD_SESSION_COOKIE } =
  await import("../../src/shared/utils/dashboardSessionToken.ts");

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const sign = (
  claims: Record<string, unknown>,
  opts: { exp?: string; iss?: string; aud?: string } = {}
) => {
  let j = new SignJWT(claims)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(opts.exp ?? "1h");
  if (opts.iss) j = j.setIssuer(opts.iss);
  if (opts.aud) j = j.setAudience(opts.aud);
  return j.sign(secret);
};

test("cookie name constant", () => {
  assert.equal(DASHBOARD_SESSION_COOKIE, "auth_token");
});

test("getDashboardJwtSecret encodes the trimmed env secret, null when unset/blank", () => {
  assert.ok(getDashboardJwtSecret() instanceof Uint8Array);
  const saved = process.env.JWT_SECRET;
  process.env.JWT_SECRET = "   ";
  assert.equal(getDashboardJwtSecret(), null);
  delete process.env.JWT_SECRET;
  assert.equal(getDashboardJwtSecret(), null);
  process.env.JWT_SECRET = saved;
});

test("accepts the login-shaped token { authenticated: true } and returns its payload", async () => {
  const payload = await verifyDashboardSessionToken(await sign({ authenticated: true }));
  assert.ok(payload, "login-shaped token is a session");
  assert.equal(payload!.authenticated, true);
  assert.equal(typeof payload!.exp, "number");
});

test("REJECTS the Cursor CLI passthrough token (same secret, iss omniroute / aud cursor-cli, no claim)", async () => {
  const cursorToken = await sign({ name: "some-key" }, { iss: "omniroute", aud: "cursor-cli" });
  assert.equal(await verifyDashboardSessionToken(cursorToken), null);
});

test("rejects a verified token whose claim is missing or not strictly true", async () => {
  assert.equal(await verifyDashboardSessionToken(await sign({ sub: "admin" })), null);
  assert.equal(await verifyDashboardSessionToken(await sign({ authenticated: "true" })), null);
  assert.equal(await verifyDashboardSessionToken(await sign({ authenticated: 1 })), null);
});

test("rejects expired, wrong-secret, garbage, empty and missing tokens without throwing", async () => {
  assert.equal(
    await verifyDashboardSessionToken(await sign({ authenticated: true }, { exp: "-1s" })),
    null
  );
  const other = new TextEncoder().encode("another-secret");
  const foreign = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(other);
  assert.equal(await verifyDashboardSessionToken(foreign), null);
  assert.equal(await verifyDashboardSessionToken("not.a.jwt"), null);
  assert.equal(await verifyDashboardSessionToken(""), null);
  assert.equal(await verifyDashboardSessionToken(null), null);
  assert.equal(await verifyDashboardSessionToken(undefined), null);
});

test("an explicit secret argument wins over the env; a null secret means no session", async () => {
  const other = new TextEncoder().encode("explicit-secret");
  const tok = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(other);
  assert.ok(await verifyDashboardSessionToken(tok, other));
  assert.equal(await verifyDashboardSessionToken(tok), null);
  assert.equal(await verifyDashboardSessionToken(await sign({ authenticated: true }), null), null);
});

test("isDashboardSessionAuthenticated(): login token → true, Cursor CLI token → false (route-level)", async () => {
  const { isDashboardSessionAuthenticated } = await import("../../src/shared/utils/apiAuth.ts");
  const login = await sign({ authenticated: true });
  const cursor = await sign({ name: "k" }, { iss: "omniroute", aud: "cursor-cli" });
  const req = (cookie: string) =>
    new Request("http://localhost/api/settings", { headers: { cookie: `auth_token=${cookie}` } });
  assert.equal(await isDashboardSessionAuthenticated(req(login)), true);
  assert.equal(await isDashboardSessionAuthenticated(req(cursor)), false);
  assert.equal(await isDashboardSessionAuthenticated(req("garbage")), false);
});
