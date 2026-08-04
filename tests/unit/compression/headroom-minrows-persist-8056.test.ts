/**
 * #8056 — Headroom engine detail settings (minRows) must persist end-to-end.
 *
 * Covers:
 * 1. compressionSettingsUpdateSchema accepts headroom:{minRows:5}
 * 2. updateCompressionSettings / getCompressionSettings round-trip minRows=5
 * 3. headroom engine apply honors stepConfig.minRows=5 (array of 5 rows compact)
 * 4. stacked apply merges settings.headroom into stepConfig
 */
import { describe, it, beforeEach, afterEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { compressionSettingsUpdateSchema } from "../../../src/shared/validation/compressionConfigSchemas.ts";
import {
  DEFAULT_COMPRESSION_CONFIG,
  DEFAULT_HEADROOM_CONFIG,
  type CompressionConfig,
} from "../../../open-sse/services/compression/types.ts";
import { applyStackedCompression } from "../../../open-sse/services/compression/strategySelector.ts";
import { headroomEngine } from "../../../open-sse/services/compression/engines/headroom/index.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-headroom-minrows-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { getCompressionSettings, updateCompressionSettings } =
  await import("../../../src/lib/db/compression.ts");

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

function makeRows(n: number): Array<Record<string, unknown>> {
  return Array.from({ length: n }, (_, i) => ({ id: i, name: `row-${i}`, value: i * 10 }));
}

function baseConfig(overrides: Partial<CompressionConfig> = {}): CompressionConfig {
  return {
    ...DEFAULT_COMPRESSION_CONFIG,
    enabled: true,
    defaultMode: "stacked",
    engines: { headroom: { enabled: true } },
    enginesExplicit: true,
    stackedPipeline: [{ engine: "headroom" }],
    ...overrides,
  };
}

describe("#8056 headroom minRows persistence", () => {
  it("schema accepts headroom.minRows=5", () => {
    const result = compressionSettingsUpdateSchema.safeParse({
      headroom: { minRows: 5 },
    });
    assert.equal(result.success, true, JSON.stringify(result.error?.issues));
  });

  it("schema rejects minRows below 2", () => {
    const result = compressionSettingsUpdateSchema.safeParse({
      headroom: { minRows: 1 },
    });
    assert.equal(result.success, false);
  });

  it("getCompressionSettings defaults headroom.minRows to 8", async () => {
    const settings = await getCompressionSettings();
    assert.equal(settings.headroom?.minRows, DEFAULT_HEADROOM_CONFIG.minRows);
    assert.equal(settings.headroom?.minRows, 8);
  });

  it("updateCompressionSettings persists minRows=5 across reload", async () => {
    await updateCompressionSettings({ headroom: { minRows: 5 } });
    const reread = await getCompressionSettings();
    assert.equal(reread.headroom?.minRows, 5);
  });

  it("headroom engine applies with stepConfig.minRows=5 on a 5-row array", () => {
    const json = JSON.stringify(makeRows(5));
    const body = {
      messages: [{ role: "user", content: json }],
    };
    // Default minRows=8 must NOT compact a 5-row array.
    const withDefault = headroomEngine.apply(body);
    assert.equal(withDefault.compressed, false, "default minRows=8 should skip 5-row array");

    // With minRows=5 it MUST compact.
    const withFive = headroomEngine.apply(body, { stepConfig: { minRows: 5 } });
    assert.equal(withFive.compressed, true, "minRows=5 should compact a 5-row array");
  });

  it("stacked pipeline merges settings.headroom.minRows into headroom stepConfig", () => {
    const json = JSON.stringify(makeRows(5));
    const body = {
      messages: [{ role: "user", content: json }],
    };

    const defaulted = applyStackedCompression(body, [{ engine: "headroom" }], {
      config: baseConfig(),
    });
    assert.equal(
      defaulted.compressed,
      false,
      "without headroom settings, 5-row array should not compact"
    );

    const withSettings = applyStackedCompression(body, [{ engine: "headroom" }], {
      config: baseConfig({ headroom: { minRows: 5 } }),
    });
    assert.equal(
      withSettings.compressed,
      true,
      "settings.headroom.minRows=5 must merge into stepConfig and compact 5-row array"
    );
  });
});
