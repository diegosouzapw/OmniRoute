import test from "node:test";
import assert from "node:assert/strict";

process.env.OMNIROUTE_API_KEY = "test-configured-key-12888";
process.env.JWT_SECRET = "test-jwt-secret-for-probe-12888";

const { authenticateA2ARequest, resolveA2AOwner } = await import("../../src/lib/a2a/authenticate.ts");
const { isDashboardSessionAuthenticated } = await import("../../src/shared/utils/apiAuth.ts");
const { SignJWT } = await import("jose");

async function buildSessionRequest(): Promise<unknown> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const sessionToken = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(secret);

  return {
    headers: new Headers({ cookie: `auth_token=${sessionToken}` }),
    cookies: { get: () => undefined },
    nextUrl: { searchParams: new URLSearchParams() },
    url: "http://localhost:20128/a2a",
  };
}

test("A2A route accepts a dashboard-session-authenticated request with no Authorization header (bug #12888)", async () => {
  const fakeRequest = await buildSessionRequest();

  const dashboardSessionOk = await isDashboardSessionAuthenticated(fakeRequest as never);
  assert.equal(dashboardSessionOk, true, "expected the dashboard session cookie itself to be valid");

  const a2aAuthOk = await authenticateA2ARequest(fakeRequest as never);
  assert.equal(
    a2aAuthOk,
    true,
    "/a2a should accept the dashboard's own session-authenticated requests " +
      "(matching /api/v1/* behavior) but currently requires an explicit Authorization header"
  );
});

test("A2A route still rejects a request with neither a valid API key nor a valid session cookie", async () => {
  const fakeRequest = {
    headers: new Headers(),
    cookies: { get: () => undefined },
    nextUrl: { searchParams: new URLSearchParams() },
    url: "http://localhost:20128/a2a",
  };

  const a2aAuthOk = await authenticateA2ARequest(fakeRequest as never);
  assert.equal(a2aAuthOk, false, "unauthenticated, keyless requests must still be rejected");
});

test("resolveA2AOwner() returns a stable 'dashboard' owner id for a session-authenticated caller with no API key", async () => {
  const fakeRequest = await buildSessionRequest();
  const owner = await resolveA2AOwner(fakeRequest as never);
  assert.equal(owner, "dashboard");
});
