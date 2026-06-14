import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolated data dir so the test does not touch the user's real DB.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-health-ping-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "task-303-ping-secret";

// Reset before importing so the singleton binds to the temp DATA_DIR.
const core = await import("../../src/lib/db/core.ts");
core.resetDbInstance();

const routeModule = await import("../../src/app/api/health/ping/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("GET /api/health/ping returns 200 with status ok and ISO timestamp", async () => {
  const res = await routeModule.GET();
  assert.equal(res.status, 200, "expected HTTP 200");

  const body = await res.json();
  assert.equal(body.status, "ok");
  assert.ok(typeof body.timestamp === "string", "timestamp must be a string");
  assert.ok(!Number.isNaN(Date.parse(body.timestamp)), "timestamp must be ISO parseable");
  assert.ok(typeof body.latencyMs === "number", "latencyMs must be a number");
  assert.ok(body.latencyMs >= 0, "latencyMs must be non-negative");
});

test("GET /api/health/ping sets no-store cache headers", async () => {
  const res = await routeModule.GET();
  const cacheControl = res.headers.get("Cache-Control");
  assert.ok(cacheControl, "Cache-Control header must be set");
  assert.match(cacheControl, /no-store/i);
});

test("GET /api/health/ping is fast (under 500ms for trivial SELECT 1)", async () => {
  // Warmup so the first-call cost (better-sqlite3 native binding init) is amortized.
  await routeModule.GET();
  const res = await routeModule.GET();
  const body = await res.json();
  assert.ok(
    body.latencyMs < 500,
    `expected latencyMs < 500, got ${body.latencyMs}ms — endpoint is no longer lightweight`
  );
});
