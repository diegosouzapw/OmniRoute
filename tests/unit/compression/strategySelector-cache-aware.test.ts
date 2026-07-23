/**
 * Tests for #3890: the cache-aware `skipSystemPrompt` flag was computed by
 * getCacheAwareStrategy() but dropped by selectCompressionStrategy() (which can only
 * return a mode string). resolveCacheAwareConfig() applies it: in a caching context the
 * system prompt must stay uncompressed (it is part of the cacheable prefix) even when the
 * operator disabled preserveSystemPrompt.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { resolveCacheAwareConfig } from "../../../open-sse/services/compression/strategySelector.ts";
import type { CompressionConfig } from "../../../open-sse/services/compression/types.ts";

function cfg(overrides: Partial<CompressionConfig> = {}): CompressionConfig {
  return {
    enabled: true,
    defaultMode: "standard",
    autoTriggerTokens: 0,
    cacheMinutes: 5,
    preserveSystemPrompt: true,
    comboOverrides: {},
    ...overrides,
  } as CompressionConfig;
}

describe("resolveCacheAwareConfig (#3890)", () => {
  it("forces preserveSystemPrompt on for a caching request that disabled it", () => {
    const out = resolveCacheAwareConfig(
      cfg({ preserveSystemPrompt: false }),
      { messages: [{ role: "system", content: "x", cache_control: { type: "ephemeral" } }] },
      { provider: "anthropic", targetFormat: "claude" }
    );
    assert.equal(out.preserveSystemPrompt, true);
  });

  it("leaves a non-caching request untouched (preserveSystemPrompt stays false)", () => {
    // google has no prompt caching, so the prefix-protection guard does not apply.
    // (openai/codex now count as automatic-cache providers per #3955.)
    const out = resolveCacheAwareConfig(
      cfg({ preserveSystemPrompt: false }),
      { messages: [{ role: "system", content: "x" }] },
      { provider: "google" }
    );
    assert.equal(out.preserveSystemPrompt, false);
  });

  it("returns the same config object when there is no body", () => {
    const base = cfg({ preserveSystemPrompt: false });
    assert.equal(resolveCacheAwareConfig(base), base);
  });

  it("does not change a config that already preserves the system prompt", () => {
    const out = resolveCacheAwareConfig(
      cfg({ preserveSystemPrompt: true }),
      { messages: [{ role: "system", content: "x", cache_control: { type: "ephemeral" } }] },
      { provider: "anthropic", targetFormat: "claude" }
    );
    assert.equal(out.preserveSystemPrompt, true);
  });
});
