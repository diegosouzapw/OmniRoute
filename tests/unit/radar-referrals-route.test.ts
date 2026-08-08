/**
 * tests/unit/radar-referrals-route.test.ts
 *
 * TDD regression guard for GET /api/radar/referrals (D28 — referral links /
 * free credits, client side). Mirrors tests/unit/radar-api-routes.test.ts:
 *
 *  - Flag off => 404, checked BEFORE auth (byte-identical inertia).
 *  - Flag on, no auth => 401.
 *  - Flag on, authenticated, no cache => 200 with { fixed: [], campaigns:
 *    [], tier: null }.
 *  - Flag on, authenticated, cached feed with referrals => 200 with the
 *    cached fixed/campaigns + tier.
 *  - Error responses never leak stack traces (Hard Rule #12).
 *
 * NEVER proxies the private feed server — this route only reads the local
 * cache written by POST /api/radar/sync.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

// ---------------------------------------------------------------------------
// Isolate DB + feature flag state
// ---------------------------------------------------------------------------

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-radar-referrals-api-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = "test-encryption-key-for-radar-referrals-tests-32b!";
process.env.JWT_SECRET = "test-jwt-secret-for-radar-referrals-tests";
process.env.INITIAL_PASSWORD = "test-bootstrap-password-for-radar-referrals-tests";

const core = await import("../../src/lib/db/core.ts");
const radarDb = await import("../../src/lib/db/radar.ts");

async function authCookieHeader(): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
  return `auth_token=${token}`;
}

async function authHeaders(): Promise<Record<string, string>> {
  return { Cookie: await authCookieHeader() };
}

function mockGetRequest(
  url = "http://localhost:20128/api/radar/referrals",
  headers: Record<string, string> = {},
): Request {
  return new Request(url, { method: "GET", headers });
}

function resetStorage() {
  core.resetDbInstance();
  try {
    if (fs.existsSync(TEST_DATA_DIR)) {
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
    }
  } catch {
    // ignore
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function baseFeed(): Record<string, unknown> {
  return {
    feed: "omniroute-radar",
    schemaVersion: 1,
    version: "2026-08-07.1",
    generatedAt: new Date().toISOString(),
    tier: "live",
    counts: { providers: 0, models: 0 },
    providers: [],
    models: [],
    quirks: [],
    totals: { dedupedTokensPerMonth: 0, modelCount: 0, poolCount: 0 },
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test("GET /api/radar/referrals: flag off => 404", async () => {
  resetStorage();
  delete process.env.RADAR_ENABLED;

  const { GET } = await import("../../src/app/api/radar/referrals/route.ts");
  const response = await GET(mockGetRequest());
  const body = await response.json();

  assert.equal(response.status, 404);
  assert.ok(body.error, "Response should have error field");
  assert.ok(!JSON.stringify(body).includes("at /"), "Response must not leak stack traces");
});

test("GET /api/radar/referrals: flag on, no auth => 401", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  const { GET } = await import("../../src/app/api/radar/referrals/route.ts");
  const response = await GET(mockGetRequest());
  const body = await response.json();

  assert.equal(response.status, 401);
  assert.ok(body.error);
  assert.ok(!JSON.stringify(body).includes("at /"), "Response must not leak stack traces");
});

test("GET /api/radar/referrals: flag on, authenticated, no cache => 200 empty shape", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  const { GET } = await import("../../src/app/api/radar/referrals/route.ts");
  const response = await GET(mockGetRequest(undefined, await authHeaders()));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body.fixed, []);
  assert.deepEqual(body.campaigns, []);
  assert.equal(body.tier, null);
});

test("GET /api/radar/referrals: flag on, authenticated, cached feed => returns fixed/campaigns/tier", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  const feed = {
    ...baseFeed(),
    referrals: {
      fixed: [
        {
          provider: "groq",
          url: "https://groq.com/?ref=omniroute",
          kind: "fixo",
          validUntil: null,
          requiredAction: null,
          isDefault: true,
        },
      ],
      campaigns: [],
    },
  };
  radarDb.setRadarCache({
    version: "2026-08-07.1",
    tier: "live",
    payload: JSON.stringify(feed),
    signature: "test-signature",
  });

  const { GET } = await import("../../src/app/api/radar/referrals/route.ts");
  const response = await GET(mockGetRequest(undefined, await authHeaders()));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.fixed.length, 1);
  assert.equal(body.fixed[0].provider, "groq");
  assert.deepEqual(body.campaigns, []);
  assert.equal(body.tier, "live");
});

test("GET /api/radar/referrals: never proxies the private feed server (route source has no upstream fetch)", async () => {
  const routeSrc = fs.readFileSync(
    path.resolve(process.cwd(), "src/app/api/radar/referrals/route.ts"),
    "utf-8",
  );
  assert.ok(!/fetch\(/.test(routeSrc), "referrals route must never call fetch() upstream");
});
