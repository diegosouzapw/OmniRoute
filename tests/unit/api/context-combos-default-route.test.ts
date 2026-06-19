/**
 * TDD: GET /api/context/combos/default and PUT /api/context/combos/default
 *
 * Auth + isolation pattern mirrors tests/unit/api/context-analytics-engine-route.test.ts:
 * - makeManagementSessionRequest() for JWT cookie auth.
 * - Temp DATA_DIR, resetDbInstance() before each test, cleanup in test.after().
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

// ─── isolated temp DB ─────────────────────────────────────────────────────────

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ctx-combos-default-route-"));
const originalDataDir = process.env.DATA_DIR;
const originalJwtSecret = process.env.JWT_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const defaultRoute = await import("../../../src/app/api/context/combos/default/route.ts");

// ─── helpers ──────────────────────────────────────────────────────────────────

async function setupAuth(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await settingsDb.updateSettings({
    requireLogin: true,
    setupComplete: true,
    password: "test-password-hash",
  });
}

// ─── lifecycle ────────────────────────────────────────────────────────────────

test.beforeEach(async () => {
  process.env.DATA_DIR = TEST_DATA_DIR;
  await setupAuth();
});

test.after(() => {
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  if (originalJwtSecret === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = originalJwtSecret;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ─── tests ────────────────────────────────────────────────────────────────────

test("GET /api/context/combos/default returns the default combo", async () => {
  const req = await makeManagementSessionRequest("http://localhost/api/context/combos/default");
  const res = await defaultRoute.GET(req);
  assert.equal(res.status, 200, `Expected 200, got ${res.status}`);

  const body = (await res.json()) as {
    id: string;
    isDefault: boolean;
    pipeline: Array<{ engine: string }>;
  };
  assert.equal(typeof body.id, "string", "response should have an id string");
  assert.equal(body.isDefault, true, "returned combo should be the default");
  assert.ok(Array.isArray(body.pipeline), "pipeline should be an array");
});

test("PUT /api/context/combos/default enabling headroom returns combo with headroom in pipeline", async () => {
  const req = await makeManagementSessionRequest("http://localhost/api/context/combos/default", {
    method: "PUT",
    body: JSON.stringify({ engineId: "headroom", enabled: true }),
  });
  const res = await defaultRoute.PUT(req);
  assert.equal(res.status, 200, `Expected 200, got ${res.status}`);

  const body = (await res.json()) as {
    pipeline: Array<{ engine: string }>;
  };
  assert.ok(Array.isArray(body.pipeline), "pipeline should be an array");
  const engineIds = body.pipeline.map((s) => s.engine);
  assert.ok(engineIds.includes("headroom"), `expected headroom in pipeline, got: ${engineIds}`);
});

test("PUT /api/context/combos/default with bad input returns 400", async () => {
  const req = await makeManagementSessionRequest("http://localhost/api/context/combos/default", {
    method: "PUT",
    // Missing required 'enabled' field
    body: JSON.stringify({ engineId: "headroom" }),
  });
  const res = await defaultRoute.PUT(req);
  assert.equal(res.status, 400, `Expected 400 for missing 'enabled', got ${res.status}`);
  const body = (await res.json()) as { error: unknown };
  assert.ok(body.error !== undefined, "response should have an error field");
});

test("PUT /api/context/combos/default with invalid JSON body returns 400", async () => {
  const req = await makeManagementSessionRequest("http://localhost/api/context/combos/default", {
    method: "PUT",
    body: "not-json",
  });
  const res = await defaultRoute.PUT(req);
  assert.equal(res.status, 400, `Expected 400 for invalid JSON, got ${res.status}`);
});
