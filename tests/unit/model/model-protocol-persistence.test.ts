import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-protocol-test-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "model-protocol-test-secret";

const { mergeModelCompatOverride, getModelCompatOverrides } =
  await import("../../../src/lib/db/models/compat.ts");
const { getModelInfo } = await import("../../../src/sse/services/model.ts");

test("mergeModelCompatOverride persists apiFormat, targetFormat, and supportsVision overrides for built-in models", () => {
  mergeModelCompatOverride("opencode", "claude-opus-5", {
    apiFormat: "responses",
    targetFormat: "claude",
    supportsVision: true,
  });

  const overrides = getModelCompatOverrides("opencode");
  const modelOverride = overrides.find((m) => m.id === "claude-opus-5");

  assert.ok(modelOverride, "Model override row should exist");
  assert.equal(modelOverride.apiFormat, "responses");
  assert.equal(modelOverride.targetFormat, "claude");
  assert.equal(modelOverride.supportsVision, true);
});

test("getModelInfo resolves apiFormat, targetFormat, and supportsVision from modelCompatOverrides", async () => {
  mergeModelCompatOverride("opencode", "claude-opus-5", {
    apiFormat: "responses",
    targetFormat: "claude",
    supportsVision: true,
  });

  const info = await getModelInfo("opencode/claude-opus-5");

  assert.equal(info.provider, "opencode-zen");
  assert.equal(info.apiFormat, "responses");
  assert.equal(info.targetFormat, "claude");
  assert.equal(info.supportsVision, true);
});
