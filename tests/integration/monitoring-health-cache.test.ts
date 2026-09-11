/**
 * Integration test for the short-TTL cache on GET /api/monitoring/health.
 *
 * Health is a frequently-polled endpoint; rebuilding it on the request path
 * (DB reads + status aggregation) starves GET /healthz (#12532). The route
 * caches the payload for HEALTH_PAYLOAD_TTL_MS (1s). After the first fill,
 * expired entries are served immediately (stale-while-revalidate) and
 * refreshed off the request path. DELETE (circuit-breaker reset) invalidates
 * the cache so the next GET rebuilds. We assert via `timestamp`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-health-cache-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";
process.env.JWT_SECRET = "test-health-cache-secret";

await import("../../src/lib/db/core.ts");
const { GET, DELETE, __test_resetMonitoringHealthPayloadCache } =
  await import("../../src/app/api/monitoring/health/route.ts");

// GHSA-mvf8-qc78-5mxm: the detailed health payload (the one carrying `timestamp`)
// is reserved for a management principal — GET now takes the Request and an
// anonymous caller only gets the liveness verdict. Every probe below therefore
// authenticates with a dashboard-session cookie, exactly like the DELETE probe.
const { SignJWT } = await import("jose");
const AUTH_TOKEN = await new SignJWT({ authenticated: true })
  .setProtectedHeader({ alg: "HS256" })
  .setExpirationTime("30d")
  .sign(new TextEncoder().encode(process.env.JWT_SECRET as string));

function authedRequest(method = "GET"): Request {
  return new Request("http://localhost/api/monitoring/health", {
    method,
    headers: { cookie: `auth_token=${AUTH_TOKEN}` },
  });
}

async function healthTimestamp(): Promise<string> {
  const res = await GET(authedRequest());
  const body = (await res.json()) as {
    timestamp?: string;
    adaptiveAdmission?: unknown;
  };
  assert.ok(body.timestamp, "health payload should carry a timestamp");
  // Adaptive admission is always projected (summary object or null) — never omitted.
  assert.ok("adaptiveAdmission" in body, "health payload must include adaptiveAdmission");
  return body.timestamp as string;
}

test("GET within the TTL serves the cached payload (identical timestamp)", async () => {
  __test_resetMonitoringHealthPayloadCache();
  const t1 = await healthTimestamp();
  const t2 = await healthTimestamp();
  assert.equal(t2, t1, "a second GET within the TTL must return the cached payload");
});

test("expired cache is served immediately (stale-while-revalidate)", async () => {
  __test_resetMonitoringHealthPayloadCache();
  const t1 = await healthTimestamp();
  await new Promise((r) => setTimeout(r, 1100)); // TTL is 1000ms
  const t2 = await healthTimestamp();
  assert.equal(t2, t1, "after the 1s TTL the stale cached payload must be returned immediately");
});

test("DELETE (circuit-breaker reset) invalidates the cache immediately", async () => {
  __test_resetMonitoringHealthPayloadCache();
  const t1 = await healthTimestamp(); // populate cache
  const delRes = await DELETE(authedRequest("DELETE"));
  assert.ok(delRes.status < 400, `DELETE should succeed, got ${delRes.status}`);
  await new Promise((r) => setTimeout(r, 5)); // ensure the clock advances past ms precision
  const t2 = await healthTimestamp();
  assert.notEqual(t2, t1, "a GET right after DELETE must rebuild (cache invalidated)");
});
