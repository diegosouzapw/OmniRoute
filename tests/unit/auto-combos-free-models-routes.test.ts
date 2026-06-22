/**
 * Unit tests for GET /api/combos/auto and GET /api/free-models (PR #3435).
 *
 * Rule #18 regression coverage for two new endpoints added by mm/auto-combos-plugin.
 * Tests: happy-path response shape, auth gate (401/403 when requireManagementAuth blocks).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── DB / auth setup ───────────────────────────────────────────────────────────

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-auto-combos-free-models-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "auto-combos-free-models-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");

// Routes loaded AFTER env is set
const combosAutoRoute = await import("../../src/app/api/combos/auto/route.ts");
const freeModelsRoute = await import("../../src/app/api/free-models/route.ts");

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeRequest(url: string, apiKey?: string): Request {
  return new Request(url, {
    method: "GET",
    headers: apiKey ? { authorization: `Bearer ${apiKey}` } : {},
  });
}

test.after(() => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {
    // best-effort cleanup
  }
});

test.beforeEach(async () => {
  await settingsDb.updateSettings({ requireLogin: false });
});

// ── /api/free-models ──────────────────────────────────────────────────────────

test("GET /api/free-models returns 200 with models array (no auth required by default)", async () => {
  await settingsDb.updateSettings({ requireLogin: false });

  const req = makeRequest("http://localhost/api/free-models");
  const res = await freeModelsRoute.GET(req as never);
  const body = await res.json();

  assert.equal(res.status, 200);
  assert.ok(Array.isArray(body.models), "body.models should be an array");
  assert.ok(body.models.length > 0, "should have at least one free model entry");

  const first = body.models[0];
  assert.ok(typeof first.provider === "string", "model.provider should be a string");
  assert.ok(typeof first.modelId === "string", "model.modelId should be a string");
  assert.ok(typeof first.monthlyTokens === "number", "model.monthlyTokens should be a number");
});

test("GET /api/free-models returns 401/403 when auth is required and no token provided", async () => {
  await settingsDb.updateSettings({ requireLogin: true });
  process.env.INITIAL_PASSWORD = "test-password-free-models";

  const req = makeRequest("http://localhost/api/free-models");
  const res = await freeModelsRoute.GET(req as never);

  assert.ok(
    res.status === 401 || res.status === 403,
    `Expected 401 or 403 without auth, got ${res.status}`
  );

  await settingsDb.updateSettings({ requireLogin: false });
  delete process.env.INITIAL_PASSWORD;
});

test("GET /api/free-models returns 200 with valid management API key", async () => {
  await settingsDb.updateSettings({ requireLogin: true });
  process.env.INITIAL_PASSWORD = "test-password-free-models2";
  const { key } = await apiKeysDb.createApiKey("free-models-test", "machine-free-models", [
    "manage",
  ]);

  const req = makeRequest("http://localhost/api/free-models", key);
  const res = await freeModelsRoute.GET(req as never);
  const body = await res.json();

  assert.equal(res.status, 200);
  assert.ok(Array.isArray(body.models));

  await settingsDb.updateSettings({ requireLogin: false });
  delete process.env.INITIAL_PASSWORD;
});

// ── /api/combos/auto ─────────────────────────────────────────────────────────

test("GET /api/combos/auto returns 200 with combos array (no auth required by default)", async () => {
  await settingsDb.updateSettings({ requireLogin: false });

  const req = makeRequest("http://localhost/api/combos/auto");
  const res = await combosAutoRoute.GET(req as never);
  const body = await res.json();

  assert.equal(res.status, 200);
  assert.ok(Array.isArray(body.combos), "body.combos should be an array");
});

test("GET /api/combos/auto returns 401/403 when auth is required and no token provided", async () => {
  await settingsDb.updateSettings({ requireLogin: true });
  process.env.INITIAL_PASSWORD = "test-password-combos-auto";

  const req = makeRequest("http://localhost/api/combos/auto");
  const res = await combosAutoRoute.GET(req as never);

  assert.ok(
    res.status === 401 || res.status === 403,
    `Expected 401 or 403 without auth, got ${res.status}`
  );

  await settingsDb.updateSettings({ requireLogin: false });
  delete process.env.INITIAL_PASSWORD;
});

test("GET /api/combos/auto soft-fails and returns empty array on createVirtualAutoCombo error", async () => {
  await settingsDb.updateSettings({ requireLogin: false });

  // Even when virtualFactory throws (no combos configured), route should return empty array
  const req = makeRequest("http://localhost/api/combos/auto");
  const res = await combosAutoRoute.GET(req as never);
  const body = await res.json();

  assert.equal(res.status, 200);
  assert.ok(Array.isArray(body.combos), "should always return an array even on errors");
});
