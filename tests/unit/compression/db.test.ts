import { describe, it, beforeEach, afterEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-compression-db-"));
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

describe("getCompressionSettings", () => {
  it("returns default settings structure", async () => {
    const settings = await getCompressionSettings();
    assert.equal(typeof settings.enabled, "boolean");
    assert.equal(typeof settings.defaultMode, "string");
    assert.equal(typeof settings.autoTriggerTokens, "number");
    assert.equal(typeof settings.cacheMinutes, "number");
    assert.equal(typeof settings.preserveSystemPrompt, "boolean");
    assert.equal(typeof settings.comboOverrides, "object");
    assert.equal(typeof settings.ultra, "object");
  });

  it("has correct default values", async () => {
    const settings = await getCompressionSettings();
    assert.equal(settings.enabled, false);
    assert.equal(settings.defaultMode, "off");
    assert.equal(settings.autoTriggerTokens, 0);
    assert.equal(settings.cacheMinutes, 5);
    assert.equal(settings.preserveSystemPrompt, true);
    assert.deepEqual(settings.comboOverrides, {});
    assert.equal(settings.ultra?.enabled, false);
    assert.equal(settings.ultra?.compressionRate, 0.5);
    assert.equal(settings.ultra?.minScoreThreshold, 0.3);
    assert.equal(settings.ultra?.slmFallbackToAggressive, true);
    assert.equal(settings.ultra?.maxTokensPerMessage, 0);
  });
});

describe("updateCompressionSettings", () => {
  it("updates enabled flag", async () => {
    await updateCompressionSettings({ enabled: true } as any);
    const settings = await getCompressionSettings();
    assert.equal(settings.enabled, true);
    // Reset
    await updateCompressionSettings({ enabled: false } as any);
  });

  it("updates defaultMode", async () => {
    await updateCompressionSettings({ defaultMode: "lite" } as any);
    const settings = await getCompressionSettings();
    assert.equal(settings.defaultMode, "lite");
    // Reset
    await updateCompressionSettings({ defaultMode: "off" } as any);
  });

  it("updates autoTriggerTokens", async () => {
    await updateCompressionSettings({ autoTriggerTokens: 5000 } as any);
    const settings = await getCompressionSettings();
    assert.equal(settings.autoTriggerTokens, 5000);
    // Reset
    await updateCompressionSettings({ autoTriggerTokens: 0 } as any);
  });

  it("updates multiple settings at once", async () => {
    await updateCompressionSettings({
      enabled: true,
      defaultMode: "lite",
      autoTriggerTokens: 1000,
      cacheMinutes: 10,
    } as any);
    const settings = await getCompressionSettings();
    assert.equal(settings.enabled, true);
    assert.equal(settings.defaultMode, "lite");
    assert.equal(settings.autoTriggerTokens, 1000);
    assert.equal(settings.cacheMinutes, 10);
    // Reset all
    await updateCompressionSettings({
      enabled: false,
      defaultMode: "off",
      autoTriggerTokens: 0,
      cacheMinutes: 5,
    } as any);
  });

  it("preserves unmodified settings", async () => {
    const before = await getCompressionSettings();
    await updateCompressionSettings({ enabled: true } as any);
    const after = await getCompressionSettings();
    assert.equal(after.enabled, true);
    assert.equal(after.defaultMode, before.defaultMode);
    assert.equal(after.cacheMinutes, before.cacheMinutes);
    // Reset
    await updateCompressionSettings({ enabled: false } as any);
  });

  it("updates and normalizes ultra config", async () => {
    await updateCompressionSettings({
      defaultMode: "ultra",
      ultra: {
        enabled: true,
        compressionRate: 0.25,
        minScoreThreshold: 0.4,
        slmFallbackToAggressive: false,
        modelPath: "  /tmp/model.onnx  ",
        maxTokensPerMessage: 512,
      },
    } as any);

    const settings = await getCompressionSettings();
    assert.equal(settings.defaultMode, "ultra");
    assert.equal(settings.ultra?.enabled, true);
    assert.equal(settings.ultra?.compressionRate, 0.25);
    assert.equal(settings.ultra?.minScoreThreshold, 0.4);
    assert.equal(settings.ultra?.slmFallbackToAggressive, false);
    assert.equal(settings.ultra?.modelPath, "/tmp/model.onnx");
    assert.equal(settings.ultra?.maxTokensPerMessage, 512);
  });
});
