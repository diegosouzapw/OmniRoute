import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * Regression test for issue #8336 — failed dashboard logins originating from
 * internal/loopback IPs read as external intrusion attempts in the Audit Log.
 *
 * The events themselves are real (a submitted, non-empty password that failed
 * verification) and the recorded IP is accurate. What was missing was a way to
 * DISTINGUISH a loopback/private-origin failure (someone browsing
 * http://localhost and mistyping, a browser autofill replay) from a genuinely
 * external one. This test pins the two-part fix:
 *
 *   1. `classifyIpScope()` in `@/lib/ipUtils` classifies an address by network
 *      scope (loopback / private / public / unknown).
 *   2. The `auth.login.failed` audit event carries `sourceScope` +
 *      `internalOrigin` metadata so the audit view can label internal-origin
 *      failures distinctly.
 */

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-8336-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-8336";

const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

const ipUtils = await import("../../src/lib/ipUtils.ts");
const core = await import("../../src/lib/db/core.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const loginRoute = await import("../../src/app/api/auth/login/route.ts");

const originalGetCookieStore = loginRoute.authRouteInternals.getCookieStore;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  process.env.INITIAL_PASSWORD = "correct-secret-8336";
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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_INITIAL_PASSWORD === undefined) {
    delete process.env.INITIAL_PASSWORD;
  } else {
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  }
});

test("classifyIpScope distinguishes loopback / private / public / unknown", () => {
  assert.equal(ipUtils.classifyIpScope("127.0.0.1"), "loopback");
  assert.equal(ipUtils.classifyIpScope("::1"), "loopback");
  assert.equal(ipUtils.classifyIpScope("::ffff:127.0.0.1"), "loopback");
  assert.equal(ipUtils.classifyIpScope("10.1.2.3"), "private");
  assert.equal(ipUtils.classifyIpScope("192.168.0.5"), "private");
  assert.equal(ipUtils.classifyIpScope("172.16.4.4"), "private");
  assert.equal(ipUtils.classifyIpScope("172.31.255.1"), "private");
  assert.equal(ipUtils.classifyIpScope("fd00::1"), "private");
  assert.equal(ipUtils.classifyIpScope("203.0.113.50"), "public");
  assert.equal(ipUtils.classifyIpScope("8.8.8.8"), "public");
  // 172.32 is outside the private /12 block
  assert.equal(ipUtils.classifyIpScope("172.32.0.1"), "public");
  assert.equal(ipUtils.classifyIpScope("unknown"), "unknown");
  assert.equal(ipUtils.classifyIpScope(""), "unknown");
  assert.equal(ipUtils.classifyIpScope(null), "unknown");
});

async function postWrongPassword(forwardedFor: string) {
  return loginRoute.POST(
    new Request("http://localhost/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        // No socket peer in this fetch-style path → forwarding headers are
        // trusted, so this stands in for the recorded client IP.
        "x-forwarded-for": forwardedFor,
      },
      body: JSON.stringify({ password: "wrong-password" }),
    })
  );
}

test("auth.login.failed from a loopback IP is flagged internalOrigin", async () => {
  const response = await postWrongPassword("127.0.0.1");
  assert.equal(response.status, 401);

  const [entry] = compliance.getAuditLog({ action: "auth.login.failed", limit: 1 });
  assert.ok(entry, "expected an auth.login.failed audit entry");
  assert.equal(entry.ip_address, "127.0.0.1");
  const metadata = entry.metadata as Record<string, unknown>;
  assert.equal(metadata.reason, "invalid_password");
  assert.equal(metadata.sourceScope, "loopback");
  assert.equal(metadata.internalOrigin, true);
});

test("auth.login.failed from a public IP is NOT flagged internalOrigin", async () => {
  const response = await postWrongPassword("203.0.113.77");
  assert.equal(response.status, 401);

  const [entry] = compliance.getAuditLog({ action: "auth.login.failed", limit: 1 });
  assert.ok(entry, "expected an auth.login.failed audit entry");
  assert.equal(entry.ip_address, "203.0.113.77");
  const metadata = entry.metadata as Record<string, unknown>;
  assert.equal(metadata.sourceScope, "public");
  assert.equal(metadata.internalOrigin, false);
});
