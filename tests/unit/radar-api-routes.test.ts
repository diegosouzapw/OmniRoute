/**
 * tests/unit/radar-api-routes.test.ts
 *
 * TDD regression guard for the Radar API routes:
 * - GET /api/radar/catalog: flag off => 404, flag on + no auth => 401, flag on + auth => shape validated
 * - POST /api/radar/sync: flag off => 404, flag on + no auth => 401, flag on + auth => delegates to syncRadar
 * - POST /api/radar/settings: flag off => 404, flag on + no auth => 401, never echoes clear key
 * - GET /api/radar/settings: flag off => 404, flag on + no auth => 401, flag on + auth => masked snapshot
 *
 * Auth wiring (FIX 1 / FIX 3): the flag-off 404 gate must run BEFORE the auth
 * check (byte-identical inertia with the flag off, no auth required to learn
 * the surface doesn't exist), auth runs AFTER it and before any DB read/write.
 *
 * Error responses must NOT leak stack traces (Hard Rule #12).
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

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-radar-api-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = "test-encryption-key-for-radar-api-tests-32b!";
process.env.JWT_SECRET = "test-jwt-secret-for-radar-api-tests";
// Force isAuthRequired() to always require auth (mirrors tests/unit/api-auth.test.ts):
// without a configured password/OIDC, a loopback bootstrap request would otherwise
// be treated as pre-authenticated. Setting INITIAL_PASSWORD closes that bootstrap
// path so the "no auth => 401" assertions are meaningful.
process.env.INITIAL_PASSWORD = "test-bootstrap-password-for-radar-api-tests";

const core = await import("../../src/lib/db/core.ts");
const radarDb = await import("../../src/lib/db/radar.ts");
const featureFlags = await import("../../src/shared/utils/featureFlags.ts");

// We need to test the route handlers. Since Next.js route handlers are just
// exported functions, we can import and call them directly with mock Request
// objects. However, the routes import from @/lib/radar which reads the DB,
// so we need the DB to be set up.

/** Mint a valid dashboard-session JWT cookie header value (see apiAuth.ts::isDashboardSessionAuthenticated). */
async function authCookieHeader(): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
  return `auth_token=${token}`;
}

/** Headers carrying a valid auth cookie, for the "authenticated" branch of each test. */
async function authHeaders(): Promise<Record<string, string>> {
  return { Cookie: await authCookieHeader() };
}

// Helper to create a mock NextRequest-like object
function mockGetRequest(
  url = "http://localhost:20128/api/radar/catalog",
  headers: Record<string, string> = {}
): Request {
  return new Request(url, { method: "GET", headers });
}

function mockPostRequest(
  url: string,
  body?: unknown,
  headers: Record<string, string> = {}
): Request {
  return new Request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

// Helper to reset DB state
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

// ---------------------------------------------------------------------------
// Tests: flag-off behavior (all routes => 404, no auth required to learn this)
// ---------------------------------------------------------------------------

test("GET /api/radar/catalog: flag off => 404", async () => {
  resetStorage();
  // Ensure flag is off (default)
  delete process.env.RADAR_ENABLED;

  // Dynamic import to get fresh module state
  const { GET } = await import("../../src/app/api/radar/catalog/route.ts");
  const response = await GET(mockGetRequest());
  const body = await response.json();

  assert.equal(response.status, 404);
  assert.equal(
    response.headers.get("cache-control"),
    "no-store",
    "flag-off catalog must not be cached or remain stale after RADAR_ENABLED is enabled"
  );
  assert.ok(body.error, "Response should have error field");
  assert.ok(!JSON.stringify(body).includes("at /"), "Response must not leak stack traces");
});

test("POST /api/radar/sync: flag off => 404", async () => {
  resetStorage();
  delete process.env.RADAR_ENABLED;

  const { POST } = await import("../../src/app/api/radar/sync/route.ts");
  const response = await POST(mockPostRequest("http://localhost:20128/api/radar/sync"));
  const body = await response.json();

  assert.equal(response.status, 404);
  assert.ok(body.error);
  assert.ok(!JSON.stringify(body).includes("at /"), "Response must not leak stack traces");
});

test("POST /api/radar/settings: flag off => 404", async () => {
  resetStorage();
  delete process.env.RADAR_ENABLED;

  const { POST } = await import("../../src/app/api/radar/settings/route.ts");
  const response = await POST(
    mockPostRequest("http://localhost:20128/api/radar/settings", { optIn: true })
  );
  const body = await response.json();

  assert.equal(response.status, 404);
  assert.ok(body.error);
  assert.ok(!JSON.stringify(body).includes("at /"), "Response must not leak stack traces");
});

test("GET /api/radar/settings: flag off => 404", async () => {
  resetStorage();
  delete process.env.RADAR_ENABLED;

  const { GET } = await import("../../src/app/api/radar/settings/route.ts");
  const response = await GET(mockGetRequest("http://localhost:20128/api/radar/settings"));
  const body = await response.json();

  assert.equal(response.status, 404);
  assert.equal(
    response.headers.get("cache-control"),
    "no-store",
    "flag-off settings must not be cached or the page can stay 404 after RADAR_ENABLED is enabled"
  );
  assert.ok(body.error);
  assert.ok(!JSON.stringify(body).includes("at /"), "Response must not leak stack traces");
});

// ---------------------------------------------------------------------------
// FIX 1 — auth required on all 3 (now 4, with GET settings) routes once the
// flag is on. Order: flag-off 404 stays first (byte-identical inertia,
// verified above); auth (401) comes AFTER it, BEFORE any DB access.
// ---------------------------------------------------------------------------

test("GET /api/radar/catalog: flag on, no auth => 401", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  const { GET } = await import("../../src/app/api/radar/catalog/route.ts");
  const response = await GET(mockGetRequest());
  const body = await response.json();

  assert.equal(response.status, 401);
  assert.ok(body.error, "Response should have error field");
  assert.ok(!JSON.stringify(body).includes("at /"), "Response must not leak stack traces");
});

test("POST /api/radar/sync: flag on, no auth => 401", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  const { POST } = await import("../../src/app/api/radar/sync/route.ts");
  const response = await POST(mockPostRequest("http://localhost:20128/api/radar/sync"));
  const body = await response.json();

  assert.equal(response.status, 401);
  assert.ok(body.error);
});

test("POST /api/radar/settings: flag on, no auth => 401", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  const { POST } = await import("../../src/app/api/radar/settings/route.ts");
  const response = await POST(
    mockPostRequest("http://localhost:20128/api/radar/settings", { optIn: true })
  );
  const body = await response.json();

  assert.equal(response.status, 401);
  assert.ok(body.error);
});

test("GET /api/radar/settings: flag on, no auth => 401", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  const { GET } = await import("../../src/app/api/radar/settings/route.ts");
  const response = await GET(mockGetRequest("http://localhost:20128/api/radar/settings"));
  const body = await response.json();

  assert.equal(response.status, 401);
  assert.ok(body.error);
});

// ---------------------------------------------------------------------------
// Tests: flag-on + authenticated behavior (previous "flag on" tests, now
// wired with a valid session cookie so they exercise the post-auth branch)
// ---------------------------------------------------------------------------

test("GET /api/radar/catalog: flag on, authenticated, empty cache => baseline entries, meta null", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  // Fresh import to pick up the flag
  const catalogRoute = await import("../../src/app/api/radar/catalog/route.ts");
  const response = await catalogRoute.GET(mockGetRequest(undefined, await authHeaders()));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.entries), "entries should be an array");
  assert.ok(body.entries.length > 0, "should have baseline entries");
  assert.equal(body.meta, null, "meta should be null when no cache");
});

test("POST /api/radar/settings: flag on, authenticated, set opt-in => success, no key in response", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  const settingsRoute = await import("../../src/app/api/radar/settings/route.ts");
  const response = await settingsRoute.POST(
    mockPostRequest(
      "http://localhost:20128/api/radar/settings",
      {
        optIn: true,
        supporterKey: "omr_abcdef01234567890abcdef01234567890abcdef",
      },
      await authHeaders()
    )
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  assert.equal(body.optIn, true);
  // Key must be masked, never the clear value
  assert.ok(body.supporterKey, "should return masked key");
  assert.ok(
    !body.supporterKey.includes("abcdef01234567890abcdef01234567890abcdef"),
    "Must NOT echo the clear key"
  );
  assert.ok(body.supporterKey.startsWith("omr_****"), "Key should be masked with omr_**** prefix");
  assert.ok(body.supporterKey.length <= 12, "Masked key should be short");
});

test("POST /api/radar/settings: authenticated, invalid body => 400", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  const settingsRoute = await import("../../src/app/api/radar/settings/route.ts");
  const response = await settingsRoute.POST(
    mockPostRequest(
      "http://localhost:20128/api/radar/settings",
      { supporterKey: "invalid-key-format" },
      await authHeaders()
    )
  );

  assert.equal(response.status, 400);
  const body = await response.json();
  assert.ok(body.error);
});

test("POST /api/radar/settings: authenticated, empty body => 400", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  const settingsRoute = await import("../../src/app/api/radar/settings/route.ts");
  const response = await settingsRoute.POST(
    mockPostRequest("http://localhost:20128/api/radar/settings", {}, await authHeaders())
  );

  assert.equal(response.status, 400);
  const body = await response.json();
  assert.ok(body.error);
});

test("POST /api/radar/settings: authenticated, null key clears it", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  const settingsRoute = await import("../../src/app/api/radar/settings/route.ts");
  const headers = await authHeaders();

  // First set a key
  await settingsRoute.POST(
    mockPostRequest(
      "http://localhost:20128/api/radar/settings",
      { supporterKey: "omr_abcdef01234567890abcdef01234567890abcdef" },
      headers
    )
  );

  // Then clear it
  const response = await settingsRoute.POST(
    mockPostRequest("http://localhost:20128/api/radar/settings", { supporterKey: null }, headers)
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.supporterKey, null, "Cleared key should return null");
});

test("POST /api/radar/sync: flag on, authenticated, not opted in => status opt_out", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";
  // Don't set opt-in

  const syncRoute = await import("../../src/app/api/radar/sync/route.ts");
  const response = await syncRoute.POST(
    mockPostRequest("http://localhost:20128/api/radar/sync", undefined, await authHeaders())
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.status, "opt_out");
});

test("POST /api/radar/sync: authenticated, invalid body => 400", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  const syncRoute = await import("../../src/app/api/radar/sync/route.ts");
  const response = await syncRoute.POST(
    mockPostRequest(
      "http://localhost:20128/api/radar/sync",
      { unexpected: true },
      await authHeaders()
    )
  );

  assert.equal(response.status, 400);
});

// ---------------------------------------------------------------------------
// FIX 3 — GET /api/radar/settings: { optIn, hasSupporterKey, supporterKeyMasked }
// F4/T7 — same response also relays contributorClaimUrl/supporterPlansUrl.
// ---------------------------------------------------------------------------

test("GET /api/radar/settings: flag on, authenticated, default state => optIn false, no key", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  const { GET } = await import("../../src/app/api/radar/settings/route.ts");
  const response = await GET(
    mockGetRequest("http://localhost:20128/api/radar/settings", await authHeaders())
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.optIn, false);
  assert.equal(body.hasSupporterKey, false);
  assert.equal(body.supporterKeyMasked, null);
  // F4/T7: default claim/plans links are always present, opt-in or not.
  assert.equal(body.contributorClaimUrl, "https://radar.omniroute.online/auth/github");
  assert.equal(body.supporterPlansUrl, "https://radar.omniroute.online/planos");
});

test("GET /api/radar/settings: flag on, authenticated, after opt-in + key => reflects persisted state, never raw key", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  const settingsRoute = await import("../../src/app/api/radar/settings/route.ts");
  const headers = await authHeaders();
  const RAW_KEY = "omr_abcdef01234567890abcdef01234567890abcdef";

  await settingsRoute.POST(
    mockPostRequest(
      "http://localhost:20128/api/radar/settings",
      { optIn: true, supporterKey: RAW_KEY },
      headers
    )
  );

  const response = await settingsRoute.GET(
    mockGetRequest("http://localhost:20128/api/radar/settings", headers)
  );
  const text = await response.text();
  const body = JSON.parse(text);

  assert.equal(response.status, 200);
  assert.equal(body.optIn, true);
  assert.equal(body.hasSupporterKey, true);
  assert.equal(body.supporterKeyMasked, "omr_****cdef", "must mask to last 4 hex chars");
  assert.ok(!text.includes(RAW_KEY), "raw key must NEVER appear in the serialized response body");
});

// ---------------------------------------------------------------------------
// Paste-key activation UI (Radar activation screen) — opt-in + supporterKey
// submitted TOGETHER in a single POST, the shape the new page.tsx paste-key
// form sends (pasting a key both sets it AND activates opt-in in one call).
// ---------------------------------------------------------------------------

test("POST /api/radar/settings: opt-in+key submitted together => both persist, POST response masked, GET reflects both, raw key never in either body", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  const settingsRoute = await import("../../src/app/api/radar/settings/route.ts");
  const headers = await authHeaders();
  const RAW_KEY = "omr_1234567890abcdef1234567890abcdef12345678";

  const postResponse = await settingsRoute.POST(
    mockPostRequest(
      "http://localhost:20128/api/radar/settings",
      { optIn: true, supporterKey: RAW_KEY },
      headers
    )
  );
  const postText = await postResponse.text();
  const postBody = JSON.parse(postText);

  assert.equal(postResponse.status, 200);
  assert.equal(postBody.ok, true);
  assert.equal(postBody.optIn, true, "opt-in must be persisted in the same call");
  assert.equal(
    postBody.supporterKey,
    "omr_****5678",
    "POST response must mask the key, never echo it raw"
  );
  assert.ok(!postText.includes(RAW_KEY), "raw key must NEVER appear in the POST response body");

  // Persistence check — a fresh GET must reflect BOTH fields set by the single POST.
  const getResponse = await settingsRoute.GET(
    mockGetRequest("http://localhost:20128/api/radar/settings", headers)
  );
  const getText = await getResponse.text();
  const getBody = JSON.parse(getText);

  assert.equal(getResponse.status, 200);
  assert.equal(getBody.optIn, true, "opt-in must persist across requests");
  assert.equal(getBody.hasSupporterKey, true, "supporter key must persist across requests");
  assert.equal(getBody.supporterKeyMasked, "omr_****5678");
  assert.ok(!getText.includes(RAW_KEY), "raw key must NEVER appear in the GET response body");
});

test("GET /api/radar/settings: F4/T7 claim/plans links honor env overrides (fork-friendly)", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";
  process.env.RADAR_CONTRIBUTOR_CLAIM_URL = "https://fork.example.com/auth/github";
  process.env.RADAR_SUPPORTER_PLANS_URL = "https://fork.example.com/plans";

  try {
    const { GET } = await import("../../src/app/api/radar/settings/route.ts");
    const response = await GET(
      mockGetRequest("http://localhost:20128/api/radar/settings", await authHeaders())
    );
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.contributorClaimUrl, "https://fork.example.com/auth/github");
    assert.equal(body.supporterPlansUrl, "https://fork.example.com/plans");
  } finally {
    delete process.env.RADAR_CONTRIBUTOR_CLAIM_URL;
    delete process.env.RADAR_SUPPORTER_PLANS_URL;
  }
});

// ---------------------------------------------------------------------------
// Tests: error sanitization (Hard Rule #12)
// ---------------------------------------------------------------------------

test("all radar routes: 404 error responses (flag off) do NOT leak stack traces", async () => {
  resetStorage();
  delete process.env.RADAR_ENABLED;

  const routes = [
    { name: "catalog", GET: (await import("../../src/app/api/radar/catalog/route.ts")).GET },
    { name: "sync", POST: (await import("../../src/app/api/radar/sync/route.ts")).POST },
    { name: "settings", POST: (await import("../../src/app/api/radar/settings/route.ts")).POST },
  ];

  for (const route of routes) {
    let response: Response;
    if ("GET" in route && route.GET) {
      response = await (route as { GET: (r: Request) => Promise<Response> }).GET(mockGetRequest());
    } else {
      response = await (route as { POST: (r: Request) => Promise<Response> }).POST(
        mockPostRequest(`http://localhost:20128/api/radar/${route.name}`, {})
      );
    }
    const text = await response.text();
    assert.ok(
      !text.includes("at /"),
      `${route.name}: response must not contain stack-like paths. Got: ${text.slice(0, 200)}`
    );
    assert.ok(
      !text.includes(".ts:") && !text.includes(".js:"),
      `${route.name}: response must not contain file:line references. Got: ${text.slice(0, 200)}`
    );
  }
});

test("all radar routes: 401 error responses (flag on, no auth) do NOT leak stack traces", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  const routes = [
    { name: "catalog", GET: (await import("../../src/app/api/radar/catalog/route.ts")).GET },
    { name: "sync", POST: (await import("../../src/app/api/radar/sync/route.ts")).POST },
    {
      name: "settings-post",
      POST: (await import("../../src/app/api/radar/settings/route.ts")).POST,
    },
    { name: "settings-get", GET: (await import("../../src/app/api/radar/settings/route.ts")).GET },
  ];

  for (const route of routes) {
    let response: Response;
    if ("GET" in route && route.GET) {
      response = await (route as { GET: (r: Request) => Promise<Response> }).GET(mockGetRequest());
    } else {
      response = await (route as { POST: (r: Request) => Promise<Response> }).POST(
        mockPostRequest(`http://localhost:20128/api/radar/${route.name.replace("-post", "")}`, {})
      );
    }
    assert.equal(response.status, 401, `${route.name}: expected 401 without auth`);
    const text = await response.text();
    assert.ok(
      !text.includes("at /"),
      `${route.name}: response must not contain stack-like paths. Got: ${text.slice(0, 200)}`
    );
    assert.ok(
      !text.includes(".ts:") && !text.includes(".js:"),
      `${route.name}: response must not contain file:line references. Got: ${text.slice(0, 200)}`
    );
  }
});

// ---------------------------------------------------------------------------
// Cleanup
// ---------------------------------------------------------------------------

test.after(() => {
  core.resetDbInstance();
  delete process.env.RADAR_ENABLED;
  delete process.env.JWT_SECRET;
  delete process.env.INITIAL_PASSWORD;
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // ignore
  }
});
