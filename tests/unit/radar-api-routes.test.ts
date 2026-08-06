/**
 * tests/unit/radar-api-routes.test.ts
 *
 * TDD regression guard for the Radar API routes:
 * - GET /api/radar/catalog: flag off => 404, flag on => shape validated
 * - POST /api/radar/sync: flag off => 404, flag on => delegates to syncRadar
 * - POST /api/radar/settings: flag off => 404, never echoes clear key
 *
 * Error responses must NOT leak stack traces (Hard Rule #12).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ---------------------------------------------------------------------------
// Isolate DB + feature flag state
// ---------------------------------------------------------------------------

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-radar-api-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = "test-encryption-key-for-radar-api-tests-32b!";

const core = await import("../../src/lib/db/core.ts");
const radarDb = await import("../../src/lib/db/radar.ts");
const featureFlags = await import("../../src/shared/utils/featureFlags.ts");

// We need to test the route handlers. Since Next.js route handlers are just
// exported functions, we can import and call them directly with mock Request
// objects. However, the routes import from @/lib/radar which reads the DB,
// so we need the DB to be set up.

// Helper to create a mock NextRequest-like object
function mockGetRequest(url = "http://localhost:20128/api/radar/catalog"): Request {
  return new Request(url, { method: "GET" });
}

function mockPostRequest(url: string, body?: unknown): Request {
  return new Request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

// Helper to reset DB state
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

// ---------------------------------------------------------------------------
// Tests: flag-off behavior (all routes => 404)
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
    mockPostRequest("http://localhost:20128/api/radar/settings", { optIn: true }),
  );
  const body = await response.json();

  assert.equal(response.status, 404);
  assert.ok(body.error);
  assert.ok(!JSON.stringify(body).includes("at /"), "Response must not leak stack traces");
});

// ---------------------------------------------------------------------------
// Tests: flag-on behavior
// ---------------------------------------------------------------------------

test("GET /api/radar/catalog: flag on, empty cache => baseline entries, meta null", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  // Fresh import to pick up the flag
  const catalogRoute = await import("../../src/app/api/radar/catalog/route.ts");
  const response = await catalogRoute.GET(mockGetRequest());
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.entries), "entries should be an array");
  assert.ok(body.entries.length > 0, "should have baseline entries");
  assert.equal(body.meta, null, "meta should be null when no cache");
});

test("POST /api/radar/settings: flag on, set opt-in => success, no key in response", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  const settingsRoute = await import("../../src/app/api/radar/settings/route.ts");
  const response = await settingsRoute.POST(
    mockPostRequest("http://localhost:20128/api/radar/settings", {
      optIn: true,
      supporterKey: "omr_abcdef01234567890abcdef01234567890abcdef",
    }),
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  assert.equal(body.optIn, true);
  // Key must be masked, never the clear value
  assert.ok(body.supporterKey, "should return masked key");
  assert.ok(
    !body.supporterKey.includes("abcdef01234567890abcdef01234567890abcdef"),
    "Must NOT echo the clear key",
  );
  assert.ok(body.supporterKey.startsWith("omr_****"), "Key should be masked with omr_**** prefix");
  assert.ok(body.supporterKey.length <= 12, "Masked key should be short");
});

test("POST /api/radar/settings: invalid body => 400", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  const settingsRoute = await import("../../src/app/api/radar/settings/route.ts");
  const response = await settingsRoute.POST(
    mockPostRequest("http://localhost:20128/api/radar/settings", {
      supporterKey: "invalid-key-format",
    }),
  );

  assert.equal(response.status, 400);
  const body = await response.json();
  assert.ok(body.error);
});

test("POST /api/radar/settings: empty body => 400", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  const settingsRoute = await import("../../src/app/api/radar/settings/route.ts");
  const response = await settingsRoute.POST(
    mockPostRequest("http://localhost:20128/api/radar/settings", {}),
  );

  assert.equal(response.status, 400);
  const body = await response.json();
  assert.ok(body.error);
});

test("POST /api/radar/settings: null key clears it", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  const settingsRoute = await import("../../src/app/api/radar/settings/route.ts");

  // First set a key
  await settingsRoute.POST(
    mockPostRequest("http://localhost:20128/api/radar/settings", {
      supporterKey: "omr_abcdef01234567890abcdef01234567890abcdef",
    }),
  );

  // Then clear it
  const response = await settingsRoute.POST(
    mockPostRequest("http://localhost:20128/api/radar/settings", {
      supporterKey: null,
    }),
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.supporterKey, null, "Cleared key should return null");
});

test("POST /api/radar/sync: flag on, not opted in => status opt_out", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";
  // Don't set opt-in

  const syncRoute = await import("../../src/app/api/radar/sync/route.ts");
  const response = await syncRoute.POST(
    mockPostRequest("http://localhost:20128/api/radar/sync"),
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.status, "opt_out");
});

test("POST /api/radar/sync: invalid body => 400", async () => {
  resetStorage();
  process.env.RADAR_ENABLED = "true";

  const syncRoute = await import("../../src/app/api/radar/sync/route.ts");
  const response = await syncRoute.POST(
    mockPostRequest("http://localhost:20128/api/radar/sync", { unexpected: true }),
  );

  assert.equal(response.status, 400);
});

// ---------------------------------------------------------------------------
// Tests: error sanitization (Hard Rule #12)
// ---------------------------------------------------------------------------

test("all radar routes: error responses do NOT leak stack traces", async () => {
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
        mockPostRequest(`http://localhost:20128/api/radar/${route.name}`, {}),
      );
    }
    const text = await response.text();
    assert.ok(
      !text.includes("at /"),
      `${route.name}: response must not contain stack-like paths. Got: ${text.slice(0, 200)}`,
    );
    assert.ok(
      !text.includes(".ts:") && !text.includes(".js:"),
      `${route.name}: response must not contain file:line references. Got: ${text.slice(0, 200)}`,
    );
  }
});

// ---------------------------------------------------------------------------
// Cleanup
// ---------------------------------------------------------------------------

test.after(() => {
  core.resetDbInstance();
  delete process.env.RADAR_ENABLED;
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {
    // ignore
  }
});
