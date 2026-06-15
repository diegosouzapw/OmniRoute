/**
 * TDD: GET /api/context/analytics/engine?engineId=&days=
 *
 * Auth + isolation pattern mirrors tests/unit/api/compression-preview-engine.test.ts:
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

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ctx-analytics-engine-"));
const originalDataDir = process.env.DATA_DIR;
const originalJwtSecret = process.env.JWT_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const { insertCompressionAnalyticsRow } =
  await import("../../../src/lib/db/compressionAnalytics.ts");
const engineRoute = await import("../../../src/app/api/context/analytics/engine/route.ts");

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

test("GET /api/context/analytics/engine returns 400 when engineId is missing", async () => {
  const req = await makeManagementSessionRequest("http://localhost/api/context/analytics/engine");
  const res = await engineRoute.GET(req);
  assert.equal(res.status, 400, `Expected 400, got ${res.status}`);
  const body = (await res.json()) as { error: string };
  assert.ok(typeof body.error === "string", "response should have an error string");
});

test("GET /api/context/analytics/engine returns 200 with correct aggregation for headroom", async () => {
  const now = new Date().toISOString();

  insertCompressionAnalyticsRow({
    timestamp: now,
    mode: "stacked",
    engine: "headroom",
    original_tokens: 1000,
    compressed_tokens: 800,
    tokens_saved: 200,
  });
  insertCompressionAnalyticsRow({
    timestamp: now,
    mode: "stacked",
    engine: "headroom",
    original_tokens: 500,
    compressed_tokens: 350,
    tokens_saved: 150,
  });
  // caveman row — must NOT appear in headroom result
  insertCompressionAnalyticsRow({
    timestamp: now,
    mode: "stacked",
    engine: "caveman",
    original_tokens: 800,
    compressed_tokens: 600,
    tokens_saved: 200,
  });

  const req = await makeManagementSessionRequest(
    "http://localhost/api/context/analytics/engine?engineId=headroom"
  );
  const res = await engineRoute.GET(req);
  assert.equal(res.status, 200, `Expected 200, got ${res.status}`);

  const body = (await res.json()) as {
    engineId: string;
    runs: number;
    tokensSaved: number;
    avgSavingsPercent: number;
    days: number;
  };

  assert.equal(body.engineId, "headroom");
  assert.equal(body.runs, 2, "should count only the 2 headroom rows");
  assert.equal(body.tokensSaved, 350, "should sum tokens_saved for headroom rows");
  assert.equal(typeof body.avgSavingsPercent, "number", "avgSavingsPercent should be a number");
  assert.equal(body.days, 7, "default days should be 7");
});

test("GET /api/context/analytics/engine respects ?days= parameter", async () => {
  const req = await makeManagementSessionRequest(
    "http://localhost/api/context/analytics/engine?engineId=headroom&days=30"
  );
  const res = await engineRoute.GET(req);
  assert.equal(res.status, 200, `Expected 200, got ${res.status}`);
  const body = (await res.json()) as { days: number };
  assert.equal(body.days, 30, "should pass days=30 through to the result");
});

test("GET /api/context/analytics/engine returns 200 with zero metrics for unknown engine", async () => {
  const req = await makeManagementSessionRequest(
    "http://localhost/api/context/analytics/engine?engineId=nonexistent"
  );
  const res = await engineRoute.GET(req);
  assert.equal(res.status, 200, `Expected 200, got ${res.status}`);
  const body = (await res.json()) as { runs: number; tokensSaved: number };
  assert.equal(body.runs, 0);
  assert.equal(body.tokensSaved, 0);
});
