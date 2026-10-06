import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { SignJWT } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-radar-offers-routes-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = "test-encryption-key-for-radar-offers-routes-32b!";
process.env.JWT_SECRET = "test-jwt-secret-for-radar-offers-routes";
process.env.INITIAL_PASSWORD = "test-bootstrap-password-for-radar-offers-routes";

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

function resetStorage(): void {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function request(
  pathname: string,
  method: "GET" | "POST",
  headers: Record<string, string> = {},
  body?: unknown
) {
  return new Request(`http://localhost:20128${pathname}`, {
    method,
    headers: { ...headers, ...(body === undefined ? {} : { "content-type": "application/json" }) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.RADAR_ENABLED;
  delete process.env.STORAGE_ENCRYPTION_KEY;
});

test("offers routes are inert before auth when the feature flag is off", async () => {
  resetStorage();
  delete process.env.RADAR_ENABLED;
  const { GET } = await import("../../src/app/api/radar/offers/route.ts");
  const { POST } = await import("../../src/app/api/radar/offers/sync/route.ts");

  assert.equal((await GET(request("/api/radar/offers", "GET"))).status, 404);
  assert.equal((await POST(request("/api/radar/offers/sync", "POST"))).status, 404);
});

test("offers routes require dashboard or management authentication", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";
  const { GET } = await import("../../src/app/api/radar/offers/route.ts");
  const { POST } = await import("../../src/app/api/radar/offers/sync/route.ts");

  assert.equal((await GET(request("/api/radar/offers", "GET"))).status, 401);
  assert.equal((await POST(request("/api/radar/offers/sync", "POST"))).status, 401);
});

test("GET offers returns only the local cache and never exposes supporter key material", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";
  const payload = fs.readFileSync(
    path.resolve(process.cwd(), "tests/fixtures/radar-offers-canonical.json"),
    "utf8"
  );
  radarDb.setRadarOffersCache({
    version: "2026.08.09.1",
    tier: "live",
    payload,
    signature: "fixture-signature",
    fetchedAt: "2026-08-09T12:05:00.000Z",
  });
  const { GET } = await import("../../src/app/api/radar/offers/route.ts");
  const response = await GET(request("/api/radar/offers", "GET", await authHeaders()));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.offers.length, 2);
  assert.equal(body.meta.tier, "live");
  assert.ok(!JSON.stringify(body).includes("omr_"));
});

test("POST offers sync validates an empty body and gates a missing key without network", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";
  radarDb.setRadarOptIn(true);
  const { POST } = await import("../../src/app/api/radar/offers/sync/route.ts");

  const invalid = await POST(
    request("/api/radar/offers/sync", "POST", await authHeaders(), { provider: "groq" })
  );
  assert.equal(invalid.status, 400);

  const response = await POST(request("/api/radar/offers/sync", "POST", await authHeaders()));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "no_key" });
});

test("local offer routes never call the private server directly", () => {
  for (const file of [
    "src/app/api/radar/offers/route.ts",
    "src/app/api/radar/offers/sync/route.ts",
  ]) {
    const source = fs.readFileSync(path.resolve(process.cwd(), file), "utf8");
    assert.ok(!/fetch\(/.test(source), `${file} must stay local-only`);
  }
});
