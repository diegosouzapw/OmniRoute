/**
 * Reasoning Replay feature flag — write/lookup short-circuit when disabled.
 */

import { after, describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-reasoning-replay-flag-"));
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "reasoning-replay-flag-test-secret";

const { cacheReasoning, lookupReasoning, clearReasoningCacheAll } =
  await import("../../open-sse/services/reasoningCache.ts");
const { getReasoningCache, setReasoningCache } = await import("../../src/lib/db/reasoningCache.ts");
const { removeFeatureFlagOverride, setFeatureFlagOverride } =
  await import("../../src/lib/db/featureFlags.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

after(() => {
  removeFeatureFlagOverride("REASONING_REPLAY_ENABLED");
  clearReasoningCacheAll();
  resetDbInstance();
});

describe("REASONING_REPLAY_ENABLED flag", () => {
  it("should stop storing and replaying reasoning when disabled", () => {
    clearReasoningCacheAll();
    setFeatureFlagOverride("REASONING_REPLAY_ENABLED", "false");
    try {
      cacheReasoning("call_disabled_write", "deepseek", "deepseek-chat", "Do not store");
      assert.equal(getReasoningCache("call_disabled_write"), null);

      setReasoningCache("call_disabled_read", "deepseek", "deepseek-chat", "Do not replay");
      assert.equal(lookupReasoning("call_disabled_read"), null);
    } finally {
      removeFeatureFlagOverride("REASONING_REPLAY_ENABLED");
      clearReasoningCacheAll();
    }
  });

  it("should store and replay reasoning when the flag is left at its on-by-default value", () => {
    clearReasoningCacheAll();
    cacheReasoning("call_enabled_write", "deepseek", "deepseek-chat", "Store me");
    assert.equal(getReasoningCache("call_enabled_write")?.reasoning, "Store me");
    assert.equal(lookupReasoning("call_enabled_write"), "Store me");
  });
});
