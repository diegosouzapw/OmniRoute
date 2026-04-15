import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  DEFAULT_MEMORY_SETTINGS,
  normalizeMemorySettings,
  toMemoryRetrievalConfig,
  toMemorySettingsUpdates,
} from "../../src/lib/memory/settings.ts";

describe("memory settings helpers", () => {
  test("normalizeMemorySettings applies defaults and clamps persisted values", () => {
    const settings = normalizeMemorySettings({
      memoryEnabled: "yes",
      memoryMaxTokens: 20001,
      memoryRetentionDays: 0,
      memoryStrategy: "unsupported",
      skillsEnabled: true,
    });

    assert.deepEqual(settings, {
      enabled: DEFAULT_MEMORY_SETTINGS.enabled,
      maxTokens: 16000,
      retentionDays: 1,
      strategy: DEFAULT_MEMORY_SETTINGS.strategy,
      skillsEnabled: true,
    });
  });

  test("toMemorySettingsUpdates maps UI fields to persisted keys", () => {
    assert.deepEqual(
      toMemorySettingsUpdates({
        enabled: false,
        maxTokens: 4096,
        retentionDays: 21,
        strategy: "hybrid",
        skillsEnabled: true,
      }),
      {
        memoryEnabled: false,
        memoryMaxTokens: 4096,
        memoryRetentionDays: 21,
        memoryStrategy: "hybrid",
        skillsEnabled: true,
      }
    );
  });

  test("toMemoryRetrievalConfig disables injection when memory is off and remaps recent strategy", () => {
    assert.deepEqual(
      toMemoryRetrievalConfig({
        enabled: true,
        maxTokens: 0,
        retentionDays: 10,
        strategy: "recent",
        skillsEnabled: false,
      }),
      {
        enabled: false,
        maxTokens: 0,
        retrievalStrategy: "exact",
        autoSummarize: false,
        persistAcrossModels: false,
        retentionDays: 10,
        scope: "apiKey",
      }
    );
  });
});
