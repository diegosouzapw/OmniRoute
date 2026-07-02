/**
 * TDD: GET /api/context/combos/default is a read-only shim.
 *
 * The default compression pipeline is now DERIVED from the engines map
 * (open-sse deriveDefaultPlan) rather than editable here:
 *   - GET  → returns the derived default plan for the live config.
 *   - PUT  → rejected with a deprecation error (not 200); body carries no stack trace.
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
import { deriveDefaultPlan } from "@omniroute/open-sse/services/compression/deriveDefaultPlan.ts";

// ─── isolated temp DB ─────────────────────────────────────────────────────────

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ctx-combos-default-route-"));
const originalDataDir = process.env.DATA_DIR;
const originalJwtSecret = process.env.JWT_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const compressionDb = await import("../../../src/lib/db/compression.ts");
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

test("GET /api/context/combos/default returns the derived default plan (single-mode caveman)", async () => {
  await compressionDb.updateCompressionSettings({
    enabled: true,
    engines: { caveman: { enabled: true, level: "full" } },
  });

  const req = await makeManagementSessionRequest("http://localhost/api/context/combos/default");
  const res = await defaultRoute.GET(req);
  assert.equal(res.status, 200, `Expected 200, got ${res.status}`);

  const body = (await res.json()) as {
    mode: string;
    pipeline: Array<{ engine: string; intensity?: string }>;
  };

  // caveman alone is single-mode → effective mode "standard", empty stacked pipeline.
  const expected = deriveDefaultPlan({ caveman: { enabled: true, level: "full" } }, true);
  assert.equal(body.mode, expected.mode, `expected mode ${expected.mode}`);
  assert.equal(body.mode, "standard");
  assert.deepEqual(body.pipeline, expected.stackedPipeline);
});

test("GET /api/context/combos/default returns the derived stacked pipeline (reflects enabled engines)", async () => {
  await compressionDb.updateCompressionSettings({
    enabled: true,
    engines: {
      caveman: { enabled: true, level: "full" },
      headroom: { enabled: true },
    },
  });

  const req = await makeManagementSessionRequest("http://localhost/api/context/combos/default");
  const res = await defaultRoute.GET(req);
  assert.equal(res.status, 200, `Expected 200, got ${res.status}`);

  const body = (await res.json()) as {
    mode: string;
    pipeline: Array<{ engine: string; intensity?: string }>;
  };

  const expected = deriveDefaultPlan(
    { caveman: { enabled: true, level: "full" }, headroom: { enabled: true } },
    true
  );
  assert.equal(body.mode, "stacked");
  assert.deepEqual(body.pipeline, expected.stackedPipeline);
  const engineIds = body.pipeline.map((s) => s.engine);
  assert.ok(engineIds.includes("caveman"), `expected caveman in derived pipeline, got: ${engineIds}`);
});

test("GET /api/context/combos/default returns off when master switch is disabled", async () => {
  await compressionDb.updateCompressionSettings({
    enabled: false,
    engines: { caveman: { enabled: true, level: "full" } },
  });

  const req = await makeManagementSessionRequest("http://localhost/api/context/combos/default");
  const res = await defaultRoute.GET(req);
  assert.equal(res.status, 200, `Expected 200, got ${res.status}`);

  const body = (await res.json()) as { mode: string; pipeline: unknown[] };
  assert.equal(body.mode, "off");
  assert.deepEqual(body.pipeline, []);
});

test("PUT /api/context/combos/default is deprecated and rejects writes (not 200)", async () => {
  const req = await makeManagementSessionRequest("http://localhost/api/context/combos/default", {
    method: "PUT",
    body: JSON.stringify({ engineId: "headroom", enabled: true }),
  });
  const res = await defaultRoute.PUT(req);
  assert.notEqual(res.status, 200, "PUT must no longer succeed — the route is read-only");
  assert.ok(res.status >= 400, `expected a 4xx deprecation status, got ${res.status}`);

  const body = (await res.json()) as { error?: { message?: string } | string };
  // The deprecation message points editors at the engines settings.
  const message =
    typeof body.error === "string" ? body.error : (body.error?.message ?? JSON.stringify(body));
  assert.match(message, /derived|engines|deprecat/i, `unexpected deprecation message: ${message}`);

  // Hard Rule #12: no raw stack trace leaks into the response body. Match the V8
  // stack-frame shape ("    at fn (file:line:col)") rather than the bare "at " token,
  // which legitimately appears in the URL inside the deprecation message.
  assert.ok(
    !/\bat\s+\S+\s+\(?\/?\S+:\d+:\d+/.test(JSON.stringify(body)),
    "error body must not contain a stack trace"
  );
  assert.ok(!/\n\s+at\s/.test(JSON.stringify(body)), "error body must not contain a stack trace");
});

test("POST /api/context/combos/default is deprecated and rejects writes (not 200)", async () => {
  const req = await makeManagementSessionRequest("http://localhost/api/context/combos/default", {
    method: "POST",
    body: JSON.stringify({ engineId: "headroom", enabled: true }),
  });
  const res = await defaultRoute.POST(req);
  assert.notEqual(res.status, 200, "POST must no longer succeed — the route is read-only");
  assert.ok(res.status >= 400, `expected a 4xx deprecation status, got ${res.status}`);
});
