import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { DEFAULT_MEMORY_SETTINGS } from "../../src/lib/memory/settings.ts";

describe("memory settings — DEFAULT_MEMORY_SETTINGS.skillsEnabled", () => {
  test("skillsEnabled defaults to true", () => {
    assert.equal(DEFAULT_MEMORY_SETTINGS.skillsEnabled, true);
  });

  test("enabled defaults to true", () => {
    assert.equal(DEFAULT_MEMORY_SETTINGS.enabled, true);
  });

  test("maxTokens defaults to 2000", () => {
    assert.equal(DEFAULT_MEMORY_SETTINGS.maxTokens, 2000);
  });

  test("retentionDays defaults to 30", () => {
    assert.equal(DEFAULT_MEMORY_SETTINGS.retentionDays, 30);
  });

  test('strategy defaults to "hybrid"', () => {
    assert.equal(DEFAULT_MEMORY_SETTINGS.strategy, "hybrid");
  });
});
