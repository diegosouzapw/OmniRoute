import { describe, it, beforeEach, afterEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { CavemanConfig } from "../../../open-sse/services/compression/types.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-caveman-db-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { getCompressionSettings, updateCompressionSettings } =
  await import("../../../src/lib/db/compression.ts");

describe("compression DB module", () => {
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

  it("should return default config", async () => {
    const config = await getCompressionSettings();
    assert.equal(config.defaultMode, "off");
    assert.equal(config.enabled, false);
    assert.equal(config.autoTriggerTokens, 0);
    assert.equal(config.cacheMinutes, 5);
    assert.equal(config.preserveSystemPrompt, true);
    assert.ok(config.cavemanConfig);
    assert.equal(config.cavemanConfig.enabled, true);
    assert.deepEqual(config.cavemanConfig.compressRoles, ["user"]);
    assert.equal(config.cavemanConfig.minMessageLength, 50);
  });

  it("should update and retrieve settings", async () => {
    await updateCompressionSettings({ enabled: true, defaultMode: "standard" });
    const config = await getCompressionSettings();
    assert.equal(config.enabled, true);
    assert.equal(config.defaultMode, "standard");

    await updateCompressionSettings({ enabled: false, defaultMode: "off" });
    const reset = await getCompressionSettings();
    assert.equal(reset.enabled, false);
    assert.equal(reset.defaultMode, "off");
  });

  it("should update cavemanConfig", async () => {
    const customConfig: Partial<CavemanConfig> = {
      enabled: true,
      compressRoles: ["user", "system"],
      minMessageLength: 100,
    };
    await updateCompressionSettings({ cavemanConfig: customConfig as CavemanConfig });
    const config = await getCompressionSettings();
    assert.deepEqual(config.cavemanConfig?.compressRoles, ["user", "system"]);
    assert.equal(config.cavemanConfig?.minMessageLength, 100);
  });
});
