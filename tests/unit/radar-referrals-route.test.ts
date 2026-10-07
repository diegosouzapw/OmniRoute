/**
 * tests/unit/radar-referrals-route.test.ts
 *
 * TDD regression guard for GET /api/radar/referrals (D28 -- referral links /
 * free credits, client side). Mirrors tests/unit/radar-api-routes.test.ts:
 *
 *  - Flag off => 404, checked BEFORE auth (byte-identical inertia).
 *  - Flag on, no auth => 401.
 *  - Flag on, authenticated, no cache => 200 with { fixed: [], campaigns:
 *    [], tier: null }.
 *  - Flag on, authenticated, cached referrals feed => 200 with the cached
 *    fixed/campaigns + tier.
 *  - Sync-on-read: the route triggers `syncRadarReferrals()` inline when the
 *    cache is stale/missing (opt-in false in every test here, so the
 *    triggered sync always self-gates to a safe `opt_out` no-op -- this
 *    proves the trigger never touches the network in these tests while
 *    still exercising the code path).
 *  - Error responses never leak stack traces (Hard Rule #12).
 *
 * NEVER proxies the private feed server directly -- this route's own source
 * contains no `fetch(` call; the network only happens inside
 * `syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`), which this
 * route calls but never inlines.
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
  headers: Record<string, string> = {}
): Request {
  return new Request(url, { method: "GET", headers });
}

function resetStorage() {
  core.resetDbInstance();
  try {
    if (fs.existsSync(TEST_DATA_DIR)) {
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  } catch {
    // ignore
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function baseReferralsFeed(): Record<string, unknown> {
  return {
    feed: "omniroute-radar-referrals",
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    referrals: { fixed: [], campaigns: [] },
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

test("GET /api/radar/referrals: flag on, authenticated, no cache => 200 empty shape (sync-on-read no-ops: opt-in false)", async () => {
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

test("GET /api/radar/referrals: flag on, authenticated, cached referrals feed => returns fixed/campaigns/tier", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  const feed = {
    ...baseReferralsFeed(),
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
  radarDb.setRadarReferralsCache({
    generatedAt: feed.generatedAt as string,
    tier: "live",
    payload: JSON.stringify(feed),
    signature: "test-signature",
    // Fresh timestamp -- inside the 1h staleness window, so sync-on-read
    // does NOT overwrite this row (opt-in is false anyway, but this also
    // proves the "not stale" branch is exercised, not just "opt_out").
    fetchedAt: new Date().toISOString(),
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

test("GET /api/radar/referrals: stale cached referrals feed still served (sync-on-read triggers but opt-in false => no-op, cache untouched)", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  const feed = {
    ...baseReferralsFeed(),
    referrals: {
      fixed: [
        {
          provider: "cerebras",
          url: "https://cerebras.ai/?ref=omniroute",
          kind: "fixo",
          validUntil: null,
          requiredAction: null,
          isDefault: true,
        },
      ],
      campaigns: [],
    },
  };
  const staleFetchedAt = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(); // 2h ago
  radarDb.setRadarReferralsCache({
    generatedAt: feed.generatedAt as string,
    tier: "community",
    payload: JSON.stringify(feed),
    signature: "test-signature",
    fetchedAt: staleFetchedAt,
  });

  const { GET } = await import("../../src/app/api/radar/referrals/route.ts");
  const response = await GET(mockGetRequest(undefined, await authHeaders()));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.fixed.length, 1, "stale cache is still served while the sync-on-read no-ops");
  assert.equal(body.fixed[0].provider, "cerebras");
  assert.equal(body.tier, "community");

  // The no-op sync must never have overwritten fetchedAt/cache contents.
  const cacheAfter = radarDb.getRadarReferralsCache();
  assert.equal(cacheAfter?.fetchedAt, staleFetchedAt);
});

test("GET /api/radar/referrals: never proxies the private feed server (route source has no upstream fetch)", async () => {
  const routeSrc = fs.readFileSync(
    path.resolve(process.cwd(), "src/app/api/radar/referrals/route.ts"),
    "utf-8"
  );
  assert.ok(!/fetch\(/.test(routeSrc), "referrals route must never call fetch() upstream");
});
