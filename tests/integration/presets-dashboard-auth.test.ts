/**
 * Integration test for dashboard-session auth on GET /api/playground/presets.
 *
 * The Playground page (dashboard) calls this route with a cookie/session and NO
 * API key. Under REQUIRE_API_KEY=true that previously 401'd the authenticated
 * dashboard, because checkAuth only accepted an API key. The fix also accepts a
 * valid management/dashboard session (requireManagementAuth) as an alternative.
 *
 * We forge a real `auth_token` JWT (same shape the login route signs) so the
 * dashboard-session path is exercised end-to-end against the real route handler.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-presets-auth-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "true"; // the scenario where the dashboard used to 401
process.env.INITIAL_PASSWORD = "test-dashboard-password"; // makes login/auth required
process.env.JWT_SECRET = "test-presets-auth-secret";

await import("../../src/lib/db/core.ts");
const { GET } = await import("../../src/app/api/playground/presets/route.ts");

const BASE = "http://localhost/api/playground/presets";

async function dashboardCookie(): Promise<string> {
  const { SignJWT } = await import("jose");
  const token = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET as string));
  return `auth_token=${token}`;
}

test("REQUIRE_API_KEY=true: a valid dashboard session (no API key) is accepted — regression, was 401", async () => {
  const res = await GET(new Request(BASE, { headers: { cookie: await dashboardCookie() } }));
  assert.notEqual(res.status, 401, "an authenticated dashboard session must not be rejected");
  assert.equal(res.status, 200);
});

test("REQUIRE_API_KEY=true: no session and no API key -> 401 (guard still enforces)", async () => {
  const res = await GET(new Request(BASE));
  assert.equal(res.status, 401);
});

test("REQUIRE_API_KEY=true: a tampered/invalid session token -> 401", async () => {
  const res = await GET(new Request(BASE, { headers: { cookie: "auth_token=not.a.valid.jwt" } }));
  assert.equal(res.status, 401);
});
