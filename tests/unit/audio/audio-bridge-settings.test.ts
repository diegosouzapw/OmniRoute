import assert from "node:assert/strict";
import test from "node:test";

import {
  MODALITY_BRIDGE_DEFAULTS,
  resolveAudioBridgeRuntimeSettings,
} from "../../../src/shared/constants/modalityBridgeDefaults.ts";

test("Audio Bridge runtime settings use the PR-1 defaults", () => {
  assert.deepEqual(resolveAudioBridgeRuntimeSettings({}), {
    enabled: MODALITY_BRIDGE_DEFAULTS.audioEnabled,
    model: MODALITY_BRIDGE_DEFAULTS.audioModel,
    timeoutMs: MODALITY_BRIDGE_DEFAULTS.audioTimeoutMs,
    maxClips: MODALITY_BRIDGE_DEFAULTS.audioMaxClips,
    cacheEnabled: MODALITY_BRIDGE_DEFAULTS.cacheEnabled,
    cacheTtlMinutes: MODALITY_BRIDGE_DEFAULTS.cacheTtlMinutes,
    cacheMaxEntries: MODALITY_BRIDGE_DEFAULTS.cacheMaxEntries,
  });
});

test("Audio Bridge runtime settings accept typed persisted values", () => {
  assert.deepEqual(
    resolveAudioBridgeRuntimeSettings({
      modalityBridgeAudioEnabled: false,
      modalityBridgeAudioModel: "deepgram/nova-3",
      modalityBridgeAudioTimeout: 12_000,
      modalityBridgeAudioMaxClips: 2,
      modalityBridgeCacheEnabled: false,
      modalityBridgeCacheTtlMinutes: 5,
      modalityBridgeCacheMaxEntries: 20,
    }),
    {
      enabled: false,
      model: "deepgram/nova-3",
      timeoutMs: 12_000,
      maxClips: 2,
      cacheEnabled: false,
      cacheTtlMinutes: 5,
      cacheMaxEntries: 20,
    }
  );
});

test("Audio Bridge runtime settings ignore wrong-typed persisted values", () => {
  const settings = resolveAudioBridgeRuntimeSettings({
    modalityBridgeAudioEnabled: "false",
    modalityBridgeAudioModel: 42,
    modalityBridgeAudioTimeout: "12000",
    modalityBridgeAudioMaxClips: null,
  });

  assert.equal(settings.enabled, MODALITY_BRIDGE_DEFAULTS.audioEnabled);
  assert.equal(settings.model, MODALITY_BRIDGE_DEFAULTS.audioModel);
  assert.equal(settings.timeoutMs, MODALITY_BRIDGE_DEFAULTS.audioTimeoutMs);
  assert.equal(settings.maxClips, MODALITY_BRIDGE_DEFAULTS.audioMaxClips);
});
