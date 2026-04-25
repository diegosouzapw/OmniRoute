/**
 * Tests for Vision Bridge default constants.
 */

import test from "node:test";
import assert from "node:assert/strict";
import {
  VISION_BRIDGE_DEFAULTS,
  VISION_BRIDGE_SETTINGS_KEYS,
  getVisionBridgeConfig,
  type VisionBridgeSettings,
} from "@/shared/constants/visionBridgeDefaults";

test("VISION_BRIDGE_DEFAULTS exports correct values", () => {
  assert.strictEqual(VISION_BRIDGE_DEFAULTS.enabled, true);
  assert.strictEqual(VISION_BRIDGE_DEFAULTS.model, "openai/gpt-4o-mini");
  assert.strictEqual(
    VISION_BRIDGE_DEFAULTS.prompt,
    "Describe this image concisely in 2-3 sentences. Focus on the most relevant visual details."
  );
  assert.strictEqual(VISION_BRIDGE_DEFAULTS.timeoutMs, 30000);
  assert.strictEqual(VISION_BRIDGE_DEFAULTS.maxImagesPerRequest, 10);
});

test("VISION_BRIDGE_SETTINGS_KEYS exports all expected keys", () => {
  assert.deepStrictEqual(VISION_BRIDGE_SETTINGS_KEYS, [
    "visionBridgeEnabled",
    "visionBridgeModel",
    "visionBridgePrompt",
    "visionBridgeTimeout",
    "visionBridgeMaxImages",
  ]);
});

test("getVisionBridgeConfig returns defaults when no settings provided", () => {
  const config = getVisionBridgeConfig({});

  assert.strictEqual(config.enabled, true);
  assert.strictEqual(config.model, "openai/gpt-4o-mini");
  assert.strictEqual(config.prompt, VISION_BRIDGE_DEFAULTS.prompt);
  assert.strictEqual(config.timeoutMs, 30000);
  assert.strictEqual(config.maxImages, 10);
});

test("getVisionBridgeConfig applies custom settings", () => {
  const customSettings: VisionBridgeSettings = {
    visionBridgeEnabled: false,
    visionBridgeModel: "anthropic/claude-3-haiku",
    visionBridgePrompt: "What is in this image?",
    visionBridgeTimeout: 60000,
    visionBridgeMaxImages: 5,
  };

  const config = getVisionBridgeConfig(customSettings);

  assert.strictEqual(config.enabled, false);
  assert.strictEqual(config.model, "anthropic/claude-3-haiku");
  assert.strictEqual(config.prompt, "What is in this image?");
  assert.strictEqual(config.timeoutMs, 60000);
  assert.strictEqual(config.maxImages, 5);
});

test("getVisionBridgeConfig merges partial settings with defaults", () => {
  const partialSettings: VisionBridgeSettings = {
    visionBridgeModel: "openai/gpt-4o",
  };

  const config = getVisionBridgeConfig(partialSettings);

  // Custom value
  assert.strictEqual(config.model, "openai/gpt-4o");
  // Default values for the rest
  assert.strictEqual(config.enabled, true);
  assert.strictEqual(config.prompt, VISION_BRIDGE_DEFAULTS.prompt);
  assert.strictEqual(config.timeoutMs, 30000);
  assert.strictEqual(config.maxImages, 10);
});

test("getVisionBridgeConfig handles undefined settings", () => {
  const config = getVisionBridgeConfig(undefined);

  assert.strictEqual(config.enabled, true);
  assert.strictEqual(config.model, "openai/gpt-4o-mini");
});

test("getVisionBridgeConfig handles null settings", () => {
  const config = getVisionBridgeConfig(null as unknown as VisionBridgeSettings);

  assert.strictEqual(config.enabled, true);
  assert.strictEqual(config.model, "openai/gpt-4o-mini");
});
