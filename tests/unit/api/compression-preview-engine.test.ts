/**
 * TDD: per-engine compression preview via engineId param.
 *
 * Auth pattern mirrors tests/unit/compression/compression-preview-auth.test.ts:
 * - Use makeManagementSessionRequest to create a JWT-auth'd Request.
 * - Set DATA_DIR to a temp dir and run the DB setup before importing the route.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

// ─── temp DB isolation ────────────────────────────────────────────────────────

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-compression-preview-engine-")
);
const originalDataDir = process.env.DATA_DIR;
const originalJwtSecret = process.env.JWT_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const previewRoute = await import("../../../src/app/api/compression/preview/route.ts");

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

/**
 * Build a message array whose content is a pretty-printed JSON string of a homogeneous
 * array of ≥8 rows. headroom's crushText() tries the whole string as a JSON array when
 * it starts with "[", so passing JSON.stringify(rows, null, 2) as content triggers
 * compaction. Pretty-printed JSON has whitespace so countTokens() also gives a
 * meaningful baseline to compare against the compact tabular output.
 */
function buildHeadroomMessages(): Array<{ role: string; content: string }> {
  const rows = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `item-${i + 1}`,
    value: (i + 1) * 100,
    active: true,
  }));
  // Pretty-print so word-split countTokens() produces a non-trivial baseline count
  return [{ role: "user", content: JSON.stringify(rows, null, 2) }];
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

test("POST /api/compression/preview with engineId=headroom returns 200 with token savings", async () => {
  const messages = buildHeadroomMessages();

  const request = await makeManagementSessionRequest("http://localhost/api/compression/preview", {
    method: "POST",
    body: {
      engineId: "headroom",
      messages,
      mode: "stacked",
    },
  });

  const response = await previewRoute.POST(request);
  assert.equal(response.status, 200, `Expected 200, got ${response.status}`);

  const body = (await response.json()) as {
    originalTokens: number;
    compressedTokens: number;
    tokensSaved: number;
    savingsPct: number;
    techniquesUsed: string[];
    original: string;
    compressed: string;
    mode: string;
  };

  assert.ok(
    typeof body.originalTokens === "number" && body.originalTokens > 0,
    `originalTokens should be > 0, got: ${body.originalTokens}`
  );
  assert.ok(
    typeof body.compressedTokens === "number",
    `compressedTokens should be a number, got: ${body.compressedTokens}`
  );
  assert.ok(
    body.compressedTokens < body.originalTokens,
    `compressedTokens (${body.compressedTokens}) should be < originalTokens (${body.originalTokens}) — headroom should compact a 10-row homogeneous JSON array`
  );
  assert.ok(body.tokensSaved > 0, `tokensSaved should be > 0, got: ${body.tokensSaved}`);
  assert.ok(body.savingsPct > 0, `savingsPct should be > 0, got: ${body.savingsPct}`);

  // Response shape completeness checks
  assert.ok(typeof body.original === "string", "should have original field");
  assert.ok(typeof body.compressed === "string", "should have compressed field");
  assert.ok(Array.isArray(body.techniquesUsed), "techniquesUsed should be an array");
});

test("POST /api/compression/preview with engineId but no mode still works (mode defaults to stacked)", async () => {
  const messages = buildHeadroomMessages();

  const request = await makeManagementSessionRequest("http://localhost/api/compression/preview", {
    method: "POST",
    body: {
      engineId: "headroom",
      messages,
      // mode intentionally omitted — should default to "stacked" when engineId present
    },
  });

  const response = await previewRoute.POST(request);
  assert.equal(
    response.status,
    200,
    `Expected 200 when mode omitted with engineId, got ${response.status}`
  );

  const body = (await response.json()) as { tokensSaved: number };
  assert.ok(body.tokensSaved > 0, `tokensSaved should be > 0 even without explicit mode`);
});

test("POST /api/compression/preview without engineId still works (existing path untouched)", async () => {
  const request = await makeManagementSessionRequest("http://localhost/api/compression/preview", {
    method: "POST",
    body: {
      messages: [{ role: "user", content: "Hello world" }],
      mode: "standard",
    },
  });

  const response = await previewRoute.POST(request);
  assert.equal(
    response.status,
    200,
    `Existing path should still return 200, got ${response.status}`
  );

  const body = (await response.json()) as { original: string; mode: string };
  assert.ok(typeof body.original === "string", "should have original field");
  assert.equal(body.mode, "standard", "mode field should reflect the requested mode");
});
