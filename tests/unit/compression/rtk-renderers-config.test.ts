import { describe, it, afterEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { rtkConfigSchema } from "../../../src/shared/validation/compressionConfigSchemas.ts";
import { DEFAULT_RTK_CONFIG } from "../../../open-sse/services/compression/types.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-renderers-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { getCompressionSettings, updateCompressionSettings } =
  await import("../../../src/lib/db/compression.ts");

describe("RTK renderer config persistence", () => {
  afterEach(() => {
    core.resetDbInstance();
  });

  after(() => {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  });

  it("accepts enableRenderers on the strict write schema", () => {
    assert.equal(rtkConfigSchema.safeParse({ enableRenderers: true }).success, true);
  });

  it("preserves enableRenderers through a fresh DB read", async () => {
    const settings = await updateCompressionSettings({
      rtkConfig: { ...DEFAULT_RTK_CONFIG, enableRenderers: true },
    });
    assert.equal(settings.rtkConfig.enableRenderers, true);

    core.resetDbInstance();
    const reread = await getCompressionSettings();
    assert.equal(reread.rtkConfig.enableRenderers, true);
  });
});
