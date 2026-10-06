import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { SignJWT } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-radar-intel-routes-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = "test-encryption-key-for-radar-intel-routes-32b!";
process.env.JWT_SECRET = "test-jwt-secret-for-radar-intel-routes";
process.env.INITIAL_PASSWORD = "test-bootstrap-password-for-radar-intel-routes";

const core = await import("../../src/lib/db/core.ts");
const radarDb = await import("../../src/lib/db/radar.ts");

async function authHeaders(): Promise<Record<string, string>> {
  const token = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return { Cookie: `auth_token=${token}` };
}

function request(pathname: string, method: "GET" | "POST", headers: Record<string, string> = {}) {
  return new Request(`http://localhost:20128${pathname}`, { method, headers });
}

function resetStorage(): void {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.RADAR_ENABLED;
});

test("Intel, status, and aggregate sync routes are 404 before auth when flag is off", async () => {
  resetStorage();
  delete process.env.RADAR_ENABLED;
  const intel = await import("../../src/app/api/radar/intel/route.ts");
  const intelSync = await import("../../src/app/api/radar/intel/sync/route.ts");
  const status = await import("../../src/app/api/radar/status/route.ts");
  const syncAll = await import("../../src/app/api/radar/sync-all/route.ts");

  assert.equal((await intel.GET(request("/api/radar/intel", "GET"))).status, 404);
  assert.equal((await intelSync.POST(request("/api/radar/intel/sync", "POST"))).status, 404);
  assert.equal((await status.GET(request("/api/radar/status", "GET"))).status, 404);
  assert.equal((await syncAll.POST(request("/api/radar/sync-all", "POST"))).status, 404);
});

test("verified local Intel is returned without supporter identity or key material", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";
  const payload = fs.readFileSync(
    path.resolve(process.cwd(), "tests/fixtures/radar-intel-canonical.json"),
    "utf8"
  );
  radarDb.setRadarIntelCache({
    version: "2026.08.09.1",
    tier: "live",
    payload,
    signature: "fixture-signature",
    supporterIdentity: `radar:${"a".repeat(64)}`,
    fetchedAt: "2026-08-09T12:05:00.000Z",
  });

  const { GET } = await import("../../src/app/api/radar/intel/route.ts");
  const response = await GET(request("/api/radar/intel", "GET", await authHeaders()));
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.intel.rankings.length, 2);
  assert.equal(body.meta.supporterVerified, true);
  assert.ok(!JSON.stringify(body).includes("radar:"));
  assert.ok(!JSON.stringify(body).includes("omr_"));
});

test("Radar status is read-only and aggregate sync reports each feed separately", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";
  const headers = await authHeaders();
  const statusRoute = await import("../../src/app/api/radar/status/route.ts");
  const status = await statusRoute.GET(request("/api/radar/status", "GET", headers));
  const statusBody = await status.json();
  assert.deepEqual(statusBody.settings, { optIn: false, hasSupporterKey: false });
  assert.deepEqual(Object.keys(statusBody.feeds).sort(), [
    "catalog",
    "intel",
    "offers",
    "referrals",
  ]);

  const syncAllRoute = await import("../../src/app/api/radar/sync-all/route.ts");
  const synced = await syncAllRoute.POST(request("/api/radar/sync-all", "POST", headers));
  const syncBody = await synced.json();
  assert.deepEqual(syncBody, {
    catalog: { status: "opt_out" },
    referrals: { status: "opt_out" },
    offers: { status: "opt_out" },
    intel: { status: "opt_out" },
  });
});

test("aggregate sync rejects an arbitrary JSON body before invoking any feed", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";
  const syncAllRoute = await import("../../src/app/api/radar/sync-all/route.ts");
  const response = await syncAllRoute.POST(
    new Request("http://localhost:20128/api/radar/sync-all", {
      method: "POST",
      headers: { ...(await authHeaders()), "content-type": "application/json" },
      body: JSON.stringify({ unexpected: true }),
    })
  );

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    error: { message: "Invalid request body", type: "invalid_request_error", code: "bad_request" },
  });
});

test("aggregate sync returns sanitized errors for oversized and failed body streams", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";
  const syncAllRoute = await import("../../src/app/api/radar/sync-all/route.ts");
  const headers = await authHeaders();
  const oversized = await syncAllRoute.POST(
    new Request("http://localhost:20128/api/radar/sync-all", {
      method: "POST",
      headers,
      body: " ".repeat(1025),
    })
  );
  const failedStream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.error(new Error("transport-secret"));
    },
  });
  const failed = await syncAllRoute.POST(
    new Request("http://localhost:20128/api/radar/sync-all", {
      method: "POST",
      headers,
      body: failedStream,
      duplex: "half",
    } as RequestInit & { duplex: "half" })
  );

  assert.equal(oversized.status, 413);
  assert.equal(failed.status, 400);
  assert.doesNotMatch(JSON.stringify(await failed.json()), /transport-secret|stack/i);
});
