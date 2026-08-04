import { describe, it, beforeEach, afterEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { rtkConfigSchema } from "../../../src/shared/validation/compressionConfigSchemas.ts";
import { DEFAULT_RTK_CONFIG } from "../../../open-sse/services/compression/types.ts";

// The RTK R5 grouping feature is read by the engine (config.enableGrouping / groupingThreshold)
// but was unreachable in production: the Zod schema (.strict()) rejected the two fields on write
// and normalizeRtkConfig dropped them on read. This proves both gates now let them through.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-grouping-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { getCompressionSettings, updateCompressionSettings } = await import(
  "../../../src/lib/db/compression.ts"
);

describe("RTK grouping config persistence (R5)", () => {
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
    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  });

  it("accepts enableGrouping / groupingThreshold on the write schema", () => {
    assert.equal(
      rtkConfigSchema.safeParse({ enableGrouping: true, groupingThreshold: 5 }).success,
      true
    );
    // groupingThreshold below the minimum run length (2) is rejected.
    assert.equal(rtkConfigSchema.safeParse({ groupingThreshold: 1 }).success, false);
  });

  it("preserves enableGrouping / groupingThreshold through a DB round-trip", async () => {
    const settings = await updateCompressionSettings({
      rtkConfig: { ...DEFAULT_RTK_CONFIG, enableGrouping: true, groupingThreshold: 7 },
    });
    assert.equal(settings.rtkConfig.enableGrouping, true);
    assert.equal(settings.rtkConfig.groupingThreshold, 7);

    // Survives a fresh read (not just the write-path return value).
    core.resetDbInstance();
    const reread = await getCompressionSettings();
    assert.equal(reread.rtkConfig.enableGrouping, true);
    assert.equal(reread.rtkConfig.groupingThreshold, 7);
  });
});
