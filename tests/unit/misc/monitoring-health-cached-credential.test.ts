/**
 * #12532 — GET /api/monitoring/health must serve cached credentialHealth
 * immediately and must not run live credential probes on the request path.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-health-cred-cache-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";
process.env.JWT_SECRET = "test-health-cred-cache-secret";

await import("../../../src/lib/db/core.ts");

const {
  getCachedCredentialHealthSummary,
  getCredentialHealthSummary,
  __test_resetCredentialHealthCache,
  __test_putCredentialHealth,
} = await import("../../../src/lib/credentialHealth/cache.ts");

const { GET, __test_resetMonitoringHealthPayloadCache } =
  await import("../../../src/app/api/monitoring/health/route.ts");

const { SignJWT } = await import("jose");
const AUTH_TOKEN = await new SignJWT({ authenticated: true })
  .setProtectedHeader({ alg: "HS256" })
  .setExpirationTime("30d")
  .sign(new TextEncoder().encode(process.env.JWT_SECRET as string));

function authedRequest(): Request {
  return new Request("http://localhost/api/monitoring/health", {
    method: "GET",
    headers: { cookie: `auth_token=${AUTH_TOKEN}` },
  });
}

const STALE_MS = 11 * 60 * 1000;

test("getCachedCredentialHealthSummary includes expired and stale rows without deleting them", () => {
  __test_resetCredentialHealthCache();
  const lastTested = new Date(Date.now() - STALE_MS);
  __test_putCredentialHealth({
    connectionId: "conn-stale",
    provider: "openai",
    status: "active",
    lastTested,
    expiresAt: Date.now() - 1000,
  });

  const summary = getCachedCredentialHealthSummary();
  assert.deepEqual(summary, {
    total: 1,
    healthy: 1,
    failed: 0,
    unknown: 0,
    stale: 1,
  });
  assert.deepEqual(getCredentialHealthSummary(), summary);
  assert.deepEqual(getCachedCredentialHealthSummary(), summary);
});

test("GET /api/monitoring/health returns the stale cached summary immediately", async () => {
  __test_resetCredentialHealthCache();
  __test_resetMonitoringHealthPayloadCache();
  const lastTested = new Date(Date.now() - STALE_MS);
  __test_putCredentialHealth({
    connectionId: "conn-stale-get",
    provider: "anthropic",
    status: "error",
    lastTested,
    expiresAt: Date.now() - 5000,
  });

  const started = Date.now();
  const res = await GET(authedRequest());
  const elapsedMs = Date.now() - started;
  const body = (await res.json()) as {
    credentialHealth?: {
      total: number;
      healthy: number;
      failed: number;
      unknown: number;
      stale: number;
    };
  };

  assert.equal(res.status, 200);
  assert.deepEqual(body.credentialHealth, {
    total: 1,
    healthy: 0,
    failed: 1,
    unknown: 0,
    stale: 1,
  });
  assert.ok(elapsedMs < 2000, `stale summary must return immediately, took ${elapsedMs}ms`);
});

test("monitoring health route never imports live credential probes", () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), "src/app/api/monitoring/health/route.ts"),
    "utf8"
  );
  assert.doesNotMatch(source, /testSingleConnection/);
  assert.doesNotMatch(source, /credentialHealth\/scheduler/);
  assert.doesNotMatch(source, /forceSweep/);
  assert.match(source, /getCachedCredentialHealthSummary/);
});
