/**
 * Regression #6425 — /api/compression/preview rejects mode:"caveman" and stacked yields 0%.
 *
 * Two independent defects, one test file (both surface via the same endpoint):
 *
 *  1. `mode: "caveman"` was rejected by the Zod enum (only "off"/"lite"/"standard"/
 *     "aggressive"/"ultra"/"rtk"/"stacked" allowed). The `caveman` engine exists in the
 *     registry (see cavemanAdapter.ts) so the mode alias should be accepted and mapped
 *     to a single-engine stacked run.
 *
 *  2. `mode: "stacked"` on prose containing well-known caveman-rule triggers ("Basically",
 *     "I think", "probably", "just", "comprehensive") returned savingsPct: 0. Root cause:
 *     the caveman engine's stacked-adapter did not default `enabled: true` when invoked
 *     with no explicit stepConfig — DEFAULT_CAVEMAN_CONFIG.enabled=false made
 *     cavemanCompress() a no-op. Mirrors the rtkAdapter fix pattern (rtk defaults enabled).
 *
 * Auth pattern mirrors compression-preview-engine.test.ts (JWT session, temp DATA_DIR).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

// ─── temp DB isolation ────────────────────────────────────────────────────────

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-compression-preview-6425-")
);
const originalDataDir = process.env.DATA_DIR;
const originalJwtSecret = process.env.JWT_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const previewRoute = await import("../../../src/app/api/compression/preview/route.ts");

// ─── helpers ──────────────────────────────────────────────────────────────────

const CAVEMAN_TRIGGER =
  "Basically, I think we should probably just use a comprehensive analysis approach to " +
  "actually really understand the very important issue at hand.";

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

test("#6425 (a): POST /api/compression/preview accepts mode:'caveman' and produces >0% savings", async () => {
  const request = await makeManagementSessionRequest(
    "http://localhost/api/compression/preview",
    {
      method: "POST",
      body: {
        messages: [{ role: "user", content: CAVEMAN_TRIGGER }],
        mode: "caveman",
      },
    }
  );

  const response = await previewRoute.POST(request);
  assert.equal(
    response.status,
    200,
    `mode:"caveman" should be accepted (was rejected before #6425 fix), got ${response.status}`
  );

  const body = (await response.json()) as {
    originalTokens: number;
    compressedTokens: number;
    savingsPct: number;
    techniquesUsed: string[];
    mode: string;
  };

  assert.ok(body.originalTokens > 0, "originalTokens should be > 0");
  assert.ok(
    body.compressedTokens < body.originalTokens,
    `caveman rules should shrink well-known filler prose (got ${body.compressedTokens} vs ${body.originalTokens})`
  );
  assert.ok(body.savingsPct > 0, `savingsPct should be > 0, got ${body.savingsPct}`);
});

test("#6425 (b): POST /api/compression/preview mode:'stacked' returns >0% on caveman-trigger prose", async () => {
  const request = await makeManagementSessionRequest(
    "http://localhost/api/compression/preview",
    {
      method: "POST",
      body: {
        messages: [{ role: "user", content: CAVEMAN_TRIGGER }],
        mode: "stacked",
      },
    }
  );

  const response = await previewRoute.POST(request);
  assert.equal(response.status, 200, `Expected 200, got ${response.status}`);

  const body = (await response.json()) as {
    originalTokens: number;
    compressedTokens: number;
    savingsPct: number;
    engineBreakdown: Array<{ engine: string; savingsPercent: number }>;
  };

  assert.ok(body.originalTokens > 0, "originalTokens should be > 0");
  assert.ok(
    body.savingsPct > 0,
    `stacked pipeline (default [rtk, caveman]) should produce >0% savings on filler-heavy prose, got ${body.savingsPct}% (regression: caveman step was silently disabled by DEFAULT_CAVEMAN_CONFIG.enabled=false)`
  );

  // Assert the caveman step in the breakdown actually did work — this is the tightest guard
  // against the specific fix in cavemanAdapter.ts (default enabled when no explicit config).
  const cavemanStep = body.engineBreakdown.find((s) => s.engine === "caveman");
  assert.ok(cavemanStep, "engineBreakdown should include a caveman step");
  assert.ok(
    cavemanStep.savingsPercent > 0,
    `caveman step should report >0% savings on trigger prose, got ${cavemanStep.savingsPercent}%`
  );
});
