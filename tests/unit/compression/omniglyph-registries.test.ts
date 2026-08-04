import { describe, it, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// P2 consistency: "omniglyph" is a registered CompressionMode/engine but several
// parallel mode/engine lists (DB validation, stacked-pipeline allowlist,
// deriveDefaultPlan single-mode map, combo schema, MCP tool enums) had not been
// updated to include it — causing e.g. defaultMode:"omniglyph" to validate on
// write but get silently dropped on DB read-back. This file proves the round trip
// and the parallel-schema acceptance.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-omniglyph-registries-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { getCompressionSettings, updateCompressionSettings, normalizeStackedPipeline } =
  await import("../../../src/lib/db/compression.ts");
const { deriveDefaultPlan } =
  await import("@omniroute/open-sse/services/compression/deriveDefaultPlan.ts");
const { compressionModeSchema } = await import("../../../src/shared/validation/schemas/combo.ts");
const { compressionConfigureInput } = await import("../../../open-sse/mcp-server/schemas/tools.ts");

beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
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

describe("db round-trip: defaultMode omniglyph", () => {
  it("survives write then read (COMPRESSION_MODES must not drop it)", async () => {
    await updateCompressionSettings({ defaultMode: "omniglyph" } as Parameters<
      typeof updateCompressionSettings
    >[0]);
    const settings = await getCompressionSettings();
    assert.equal(settings.defaultMode, "omniglyph");
  });
});

describe("normalizeStackedPipeline: omniglyph step", () => {
  it("survives normalization (STACKED_PIPELINE_ENGINE_IDS must include omniglyph)", () => {
    const pipeline = normalizeStackedPipeline([{ engine: "omniglyph" }]);
    assert.deepEqual(pipeline, [{ engine: "omniglyph" }]);
  });
});

describe("deriveDefaultPlan: single omniglyph engine toggle", () => {
  it("derives mode:omniglyph (SINGLE_MODE_OF must include omniglyph)", () => {
    const plan = deriveDefaultPlan({ omniglyph: { enabled: true } }, true);
    assert.deepEqual(plan, { mode: "omniglyph", stackedPipeline: [] });
  });
});

describe("combo schema: compressionModeSchema", () => {
  it("accepts codex-responses routing overrides", () => {
    assert.equal(compressionModeSchema.parse("codex-responses"), "codex-responses");
  });

  it("accepts omniglyph", () => {
    assert.equal(compressionModeSchema.parse("omniglyph"), "omniglyph");
  });
});

describe("MCP compressionConfigureInput: mode enums", () => {
  it("accepts strategy:omniglyph", () => {
    assert.doesNotThrow(() => compressionConfigureInput.parse({ strategy: "omniglyph" }));
  });

  it("accepts autoTriggerMode:omniglyph", () => {
    assert.doesNotThrow(() => compressionConfigureInput.parse({ autoTriggerMode: "omniglyph" }));
  });
});
