/**
 * Integration test for the short-TTL cache on GET /api/monitoring/health.
 *
 * Health is a frequently-polled endpoint; rebuilding it every request (DB reads
 * + status aggregation across subsystems) is wasteful under rapid polling. The
 * route caches the payload for HEALTH_PAYLOAD_TTL_MS (1s) and invalidates it on
 * DELETE (circuit-breaker reset). We assert the behavior via the payload's
 * `timestamp` field, which is stamped at build time: identical timestamp ⇒ the
 * cached payload was served; a fresh timestamp ⇒ it was rebuilt.
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
const { GET, DELETE } = await import("../../src/app/api/monitoring/health/route.ts");

async function healthTimestamp(): Promise<string> {
  const res = await GET();
  const body = (await res.json()) as { timestamp?: string };
  assert.ok(body.timestamp, "health payload should carry a timestamp");
  return body.timestamp as string;
}

test("GET within the TTL serves the cached payload (identical timestamp)", async () => {
  const t1 = await healthTimestamp();
  const t2 = await healthTimestamp();
  assert.equal(t2, t1, "a second GET within the TTL must return the cached payload");
});

test("cache expires after the TTL — a fresh payload is built", async () => {
  const t1 = await healthTimestamp();
  await new Promise((r) => setTimeout(r, 1100)); // TTL is 1000ms
  const t2 = await healthTimestamp();
  assert.notEqual(t2, t1, "after the 1s TTL the payload must be rebuilt");
});

test("DELETE (circuit-breaker reset) invalidates the cache immediately", async () => {
  const { SignJWT } = await import("jose");
  const authToken = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET as string));

  const t1 = await healthTimestamp(); // populate cache
  const delRes = await DELETE(
    new Request("http://localhost/api/monitoring/health", {
      method: "DELETE",
      headers: { cookie: `auth_token=${authToken}` },
    }),
  );
  assert.ok(delRes.status < 400, `DELETE should succeed, got ${delRes.status}`);
  await new Promise((r) => setTimeout(r, 5)); // ensure the clock advances past ms precision
  const t2 = await healthTimestamp();
  assert.notEqual(t2, t1, "a GET right after DELETE must rebuild (cache invalidated)");
});
