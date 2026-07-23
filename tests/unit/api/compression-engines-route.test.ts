/**
 * GET /api/compression/engines
 *
 * Auth + isolation pattern mirrors tests/unit/api/context-combos-default-route.test.ts:
 * - makeManagementSessionRequest() for JWT cookie auth.
 * - Temp DATA_DIR, resetDbInstance() before each test, cleanup in test.after().
 */
import test, { describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

// ─── isolated temp DB ─────────────────────────────────────────────────────────

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-compression-engines-route-")
);
const originalDataDir = process.env.DATA_DIR;
const originalJwtSecret = process.env.JWT_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const enginesRoute = await import("../../../src/app/api/compression/engines/route.ts");

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

describe("GET /api/compression/engines", () => {
  test("returns 401 without auth", async () => {
    const req = new Request("http://localhost/api/compression/engines");
    const res = await enginesRoute.GET(req);
    assert.equal(res.status, 401, `Expected 401 without auth, got ${res.status}`);
  });

  test("returns an engines array", async () => {
    const req = await makeManagementSessionRequest("http://localhost/api/compression/engines");
    const res = await enginesRoute.GET(req);
    assert.strictEqual(res.status, 200);
    const body = (await res.json()) as { engines: unknown[] };
    assert.ok(Array.isArray(body.engines), "response should have an engines array");
    assert.ok(body.engines.length > 0, "engines array should be non-empty");
  });

  test("includes headroom and caveman engines", async () => {
    const req = await makeManagementSessionRequest("http://localhost/api/compression/engines");
    const res = await enginesRoute.GET(req);
    const body = (await res.json()) as { engines: Array<{ id: string }> };
    const ids = body.engines.map((e) => e.id);
    assert.ok(ids.includes("headroom"), `engines should include headroom, got: ${ids.join(", ")}`);
    assert.ok(ids.includes("caveman"), `engines should include caveman, got: ${ids.join(", ")}`);
  });

  test("headroom entry has non-empty configSchema and numeric stackPriority", async () => {
    const req = await makeManagementSessionRequest("http://localhost/api/compression/engines");
    const res = await enginesRoute.GET(req);
    const body = (await res.json()) as {
      engines: Array<{
        id: string;
        configSchema: Array<{ key: string }>;
        stackPriority: unknown;
      }>;
    };
    const headroom = body.engines.find((e) => e.id === "headroom");
    assert.ok(headroom, "headroom engine should be present");
    assert.ok(
      Array.isArray(headroom.configSchema) && headroom.configSchema.length > 0,
      "headroom configSchema should be a non-empty array"
    );
    assert.strictEqual(
      typeof headroom.stackPriority,
      "number",
      "headroom stackPriority should be a number"
    );
  });

  test("headroom configSchema includes the 'minRows' field key", async () => {
    const req = await makeManagementSessionRequest("http://localhost/api/compression/engines");
    const res = await enginesRoute.GET(req);
    const body = (await res.json()) as {
      engines: Array<{
        id: string;
        configSchema: Array<{ key: string }>;
      }>;
    };
    const headroom = body.engines.find((e) => e.id === "headroom");
    assert.ok(headroom, "headroom engine should be present");
    const hasMinRows = headroom.configSchema.some((f) => f.key === "minRows");
    assert.ok(
      hasMinRows,
      `headroom configSchema should contain a field with key 'minRows', got keys: ${headroom.configSchema.map((f) => f.key).join(", ")}`
    );
  });
});
