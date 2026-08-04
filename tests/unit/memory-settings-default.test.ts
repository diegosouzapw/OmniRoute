import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { DEFAULT_MEMORY_SETTINGS } from "../../src/lib/memory/settings.ts";

describe("memory settings — DEFAULT_MEMORY_SETTINGS.skillsEnabled", () => {
  test("skillsEnabled defaults to true", () => {
    assert.equal(DEFAULT_MEMORY_SETTINGS.skillsEnabled, true);
  });

  // PRD-2026-06-19: memory is OFF by default — enabling injects up to maxTokens
  // (~2k) billed context per chat request, so new installs must opt in explicitly.
  test("enabled defaults to false", () => {
    assert.equal(DEFAULT_MEMORY_SETTINGS.enabled, false);
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
