// Regression test for #7005 — adaptive context-budget dial not configurable.
//
// The compute engine for the adaptive context-budget ("dial") shipped in PR #4716
// (Phase 4C), but it was never wired to persistence or the API: the PUT schema
// rejected any `contextBudget` payload (strict schema, no such key) and the DB-backed
// GET path never surfaced a `contextBudget` field. This test proves both halves of
// the wiring: the Zod schema accepts a `contextBudget` write, and the DB read/write
// path round-trips it.
import { describe, it, beforeEach, afterEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-adaptive-context-budget-db-")
);
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { getCompressionSettings, updateCompressionSettings } = await import(
  "../../../src/lib/db/compression.ts"
);
const { compressionSettingsUpdateSchema } = await import(
  "../../../src/shared/validation/compressionConfigSchemas.ts"
);
const { DEFAULT_CONTEXT_BUDGET } = await import(
  "../../../open-sse/services/compression/adaptiveCompression/types.ts"
);

beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

afterEach(() => {
  core.resetDbInstance();
});

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

describe("bug #7005: adaptive context-budget dial is configurable", () => {
  it("compressionSettingsUpdateSchema accepts a contextBudget write", () => {
    const result = compressionSettingsUpdateSchema.safeParse({
      contextBudget: {
        mode: "floor",
        policy: "percentage",
        outputReserve: 2048,
        safetyMargin: 512,
        pct: 0.75,
        absoluteBudget: 0,
      },
    });
    assert.equal(result.success, true, JSON.stringify("error" in result ? result.error : null));
  });

  it("getCompressionSettings() defaults contextBudget to DEFAULT_CONTEXT_BUDGET when absent", async () => {
    const settings = await getCompressionSettings();
    assert.deepEqual(settings.contextBudget, DEFAULT_CONTEXT_BUDGET);
  });

  it("updateCompressionSettings() persists a partial contextBudget merge", async () => {
    await updateCompressionSettings({
      contextBudget: { ...DEFAULT_CONTEXT_BUDGET, mode: "floor", policy: "absolute", absoluteBudget: 8000 },
    });
    const settings = await getCompressionSettings();
    assert.equal(settings.contextBudget?.mode, "floor");
    assert.equal(settings.contextBudget?.policy, "absolute");
    assert.equal(settings.contextBudget?.absoluteBudget, 8000);
    // Untouched fields keep their defaults (this is a JSON-column replace like ultra/aggressive,
    // not a deep merge — the caller sends the full object, mirroring the existing pattern).
    assert.equal(settings.contextBudget?.outputReserve, DEFAULT_CONTEXT_BUDGET.outputReserve);
  });
});
