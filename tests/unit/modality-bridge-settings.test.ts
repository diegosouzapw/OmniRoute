import { test } from "node:test";
import assert from "node:assert";

import {
  resolveVisionBridgeRuntimeSettings,
  MODALITY_BRIDGE_DEFAULTS,
} from "../../src/shared/constants/modalityBridgeDefaults.ts";
import { updateSettingsSchema } from "../../src/shared/validation/settingsSchemas.ts";

test("new keys win over legacy keys", () => {
  const s = resolveVisionBridgeRuntimeSettings({
    modalityBridgeVisionEnabled: false,
    visionBridgeEnabled: true,
    modalityBridgeVisionModel: "gemini/gemini-2.5-flash",
    visionBridgeModel: "openai/gpt-4o-mini",
  });
  assert.equal(s.enabled, false);
  assert.equal(s.model, "gemini/gemini-2.5-flash");
});

test("legacy keys used as fallback when new keys absent (rollback 1 ciclo)", () => {
  const s = resolveVisionBridgeRuntimeSettings({
    visionBridgeEnabled: false,
    visionBridgePrompt: "legacy prompt",
  });
  assert.equal(s.enabled, false);
  assert.equal(s.prompt, "legacy prompt");
});

test("defaults: mode auto, taskAware true, cache on", () => {
  const s = resolveVisionBridgeRuntimeSettings({});
  assert.equal(s.mode, "auto");
  assert.equal(s.taskAware, true);
  assert.equal(s.cacheEnabled, true);
  assert.equal(s.cacheTtlMinutes, MODALITY_BRIDGE_DEFAULTS.cacheTtlMinutes);
});

test("wrong-typed stored values are skipped in favor of the next candidate/default", () => {
  const s = resolveVisionBridgeRuntimeSettings({
    modalityBridgeVisionEnabled: "off", // string in a boolean field
    modalityBridgeVisionTimeout: "9000", // string in a number field
    modalityBridgeVisionModel: 42, // number in a string field
  });
  assert.equal(s.enabled, true); // falls through to VISION_BRIDGE_DEFAULTS.enabled
  assert.equal(s.timeoutMs, 30000);
  assert.equal(s.model, "openai/gpt-4o-mini");

  // A wrong-typed NEW key must still fall through to a well-typed LEGACY key.
  const fallback = resolveVisionBridgeRuntimeSettings({
    modalityBridgeVisionEnabled: "off",
    visionBridgeEnabled: false,
  });
  assert.equal(fallback.enabled, false);
});

test("Modality Bridge settings are accepted by the settings PATCH schema", () => {
  const validation = updateSettingsSchema.safeParse({
    modalityBridgeVisionEnabled: true,
    modalityBridgeVisionMode: "describe",
    modalityBridgeVisionModel: "gemini/gemini-2.5-flash",
    modalityBridgeVisionTaskAware: false,
    modalityBridgeVisionPrompt: "Describe the image contents briefly.",
    modalityBridgeVisionTimeout: 45000,
    modalityBridgeVisionMaxImages: 6,
    modalityBridgeAudioEnabled: true,
    modalityBridgeAudioModel: "openai/gpt-4o-mini-transcribe",
    modalityBridgeAudioTimeout: 60000,
    modalityBridgeAudioMaxClips: 3,
    modalityBridgeCacheEnabled: true,
    modalityBridgeCacheTtlMinutes: 60,
    modalityBridgeCacheMaxEntries: 200,
  });

  assert.equal(validation.success, true);
});

test("Modality Bridge settings keep numeric bounds enforced (each field individually)", () => {
  const invalidByField: Record<string, number> = {
    modalityBridgeVisionTimeout: 999999,
    modalityBridgeVisionMaxImages: 0,
    modalityBridgeAudioMaxClips: 11,
    modalityBridgeCacheTtlMinutes: 0,
    modalityBridgeCacheMaxEntries: 9,
  };
  for (const [field, value] of Object.entries(invalidByField)) {
    const validation = updateSettingsSchema.safeParse({ [field]: value });
    assert.equal(validation.success, false, `${field}=${value} should be rejected`);
  }
});

test("Modality Bridge vision mode rejects values outside the enum", () => {
  const validation = updateSettingsSchema.safeParse({
    modalityBridgeVisionMode: "invalid-mode",
  });
  assert.equal(validation.success, false);
});
