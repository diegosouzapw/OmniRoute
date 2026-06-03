import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

let tempDir: string;
let originalDataDir: string | undefined;

function setup() {
  tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-compression-"));
  originalDataDir = process.env.DATA_DIR;
  process.env.DATA_DIR = tempDir;
}

function cleanup() {
  try {
    const { resetDbInstance } = require("../../src/lib/db/core.ts");
    resetDbInstance();
  } catch {}
  if (originalDataDir !== undefined) {
    process.env.DATA_DIR = originalDataDir;
  } else {
    delete process.env.DATA_DIR;
  }
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch {}
}

test("getCompressionSettings returns consistent results from TTL cache", async () => {
  setup();
  try {
    const { getCompressionSettings } = await import("../../src/lib/db/compression.ts");
    const first = await getCompressionSettings();
    assert.ok(first, "first call should return a config");
    assert.ok(typeof first.enabled === "boolean", "config should have enabled field");

    const second = await getCompressionSettings();
    assert.deepEqual(first, second, "second call should return same object from cache");
  } finally {
    cleanup();
  }
});

test("getCompressionSettings cache hit returns same object reference within TTL", async () => {
  setup();
  try {
    const { getCompressionSettings } = await import("../../src/lib/db/compression.ts");
    const first = await getCompressionSettings();
    const second = await getCompressionSettings();
    assert.deepEqual(first, second, "cache hit should return equivalent object");
  } finally {
    cleanup();
  }
});

test("getCompressionSettings cache survives across multiple rapid calls (WeakRef holds)", async () => {
  setup();
  try {
    const { getCompressionSettings } = await import("../../src/lib/db/compression.ts");

    const first = await getCompressionSettings();
    const second = await getCompressionSettings();
    const third = await getCompressionSettings();

    assert.deepEqual(first, second, "second call should return equivalent config");
    assert.deepEqual(second, third, "third call should return equivalent config");
  } finally {
    cleanup();
  }
});

test("getCompressionSettings returned config has expected shape", async () => {
  setup();
  try {
    const { getCompressionSettings } = await import("../../src/lib/db/compression.ts");
    const config = await getCompressionSettings();

    assert.ok(typeof config.enabled === "boolean", "enabled should be boolean");
    assert.ok(typeof config.defaultMode === "string", "defaultMode should be string");
    assert.ok(typeof config.autoTriggerTokens === "number", "autoTriggerTokens should be number");
    assert.ok(typeof config.cacheMinutes === "number", "cacheMinutes should be number");
    assert.ok(typeof config.preserveSystemPrompt === "boolean", "preserveSystemPrompt should be boolean");
    assert.ok(config.cavemanConfig && typeof config.cavemanConfig === "object", "cavemanConfig should be object");
    assert.ok(config.rtkConfig && typeof config.rtkConfig === "object", "rtkConfig should be object");
    assert.ok(config.languageConfig && typeof config.languageConfig === "object", "languageConfig should be object");
    assert.ok(config.aggressive && typeof config.aggressive === "object", "aggressive should be object");
    assert.ok(config.ultra && typeof config.ultra === "object", "ultra should be object");
  } finally {
    cleanup();
  }
});

test("getCompressionSettings TTL expires after 5 seconds", async () => {
  setup();
  try {
    const { getCompressionSettings } = await import("../../src/lib/db/compression.ts");

    const first = await getCompressionSettings();
    const cached = await getCompressionSettings();
    assert.equal(first, cached, "should be cached within TTL");

    await new Promise((r) => setTimeout(r, 5100));

    const afterExpiry = await getCompressionSettings();
    assert.deepEqual(first, afterExpiry, "config content should be equivalent after TTL expiry");
    assert.notEqual(first, afterExpiry, "should be a new object reference after TTL expiry");
  } finally {
    cleanup();
  }
});
