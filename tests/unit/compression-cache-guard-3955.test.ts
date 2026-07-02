/**
 * #3955 — Compression must not wreck automatic prefix caching.
 *
 * OpenAI / Codex (and other OpenAI-format providers with automatic prompt caching)
 * cache the longest matching prefix of a request WITHOUT any explicit `cache_control`
 * markers in the body. The old cache-aware guard only protected the cacheable prefix
 * when BOTH `isCachingProvider` AND `hasCacheControl` were true, so for automatic-cache
 * providers (no `cache_control` markers) the guard was skipped. With compression active
 * and `preserveSystemPrompt: false` (or a prefix-compressing mode) this rewrote the
 * system prompt / earliest messages and guaranteed a cache miss — higher token spend
 * through OmniRoute than going direct.
 *
 * Fix: `isCachingProvider` ALONE is sufficient to protect the prefix (skipSystemPrompt),
 * independent of explicit `cache_control`. A non-caching provider is unaffected.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "../../open-sse/services/compression/cachingAware.ts";
import { resolveCacheAwareConfig } from "../../open-sse/services/compression/strategySelector.ts";
import type { CompressionConfig } from "../../open-sse/services/compression/types.ts";

const LONG_SYSTEM_PROMPT =
  "You are a meticulous coding assistant. ".repeat(64) +
  "Follow every instruction precisely and never omit details.";

function autoCacheBody(model: string) {
  // NOTE: deliberately NO cache_control markers anywhere — this mirrors how
  // OpenAI / Codex automatic prefix caching works (the prefix is cached implicitly).
  return {
    model,
    messages: [
      { role: "system", content: LONG_SYSTEM_PROMPT },
      { role: "user", content: "Refactor this function for clarity." },
    ],
  };
}

function cfg(overrides: Partial<CompressionConfig> = {}): CompressionConfig {
  return {
    enabled: true,
    defaultMode: "aggressive",
    autoTriggerTokens: 0,
    cacheMinutes: 5,
    preserveSystemPrompt: true,
    comboOverrides: {},
    ...overrides,
  } as CompressionConfig;
}

describe("#3955 automatic-cache prefix protection (no explicit cache_control)", () => {
  it("treats openai as a caching provider for automatic prefix caching", () => {
    const ctx = detectCachingContext(autoCacheBody("openai/gpt-4o"), { provider: "openai" });
    assert.equal(ctx.hasCacheControl, false, "no explicit cache_control markers present");
    assert.equal(ctx.isCachingProvider, true, "openai has automatic prefix caching");
  });

  it("treats codex as a caching provider for automatic prefix caching", () => {
    const ctx = detectCachingContext(autoCacheBody("codex/gpt-5-codex"), { provider: "codex" });
    assert.equal(ctx.hasCacheControl, false);
    assert.equal(ctx.isCachingProvider, true, "codex has automatic prefix caching");
  });

  it("skips/protects the system prompt for an auto-cache provider WITHOUT cache_control", () => {
    const ctx = detectCachingContext(autoCacheBody("openai/gpt-4o"), { provider: "openai" });
    const result = getCacheAwareStrategy("aggressive", ctx);
    // The cacheable prefix must be preserved even though no cache_control markers exist.
    assert.equal(result.skipSystemPrompt, true);
    // Prefix-compressing modes are downgraded so the cacheable prefix is not rewritten.
    assert.equal(result.strategy, "standard");
    assert.equal(result.deterministicOnly, true);
  });

  it("protects codex the same way (ultra downgraded, system prompt skipped)", () => {
    const ctx = detectCachingContext(autoCacheBody("codex/gpt-5-codex"), { provider: "codex" });
    const result = getCacheAwareStrategy("ultra", ctx);
    assert.equal(result.skipSystemPrompt, true);
    assert.equal(result.strategy, "standard");
  });

  it("forces preserveSystemPrompt on for an auto-cache request that disabled it", () => {
    // This is the end-to-end cache-miss scenario from #3955: compression active,
    // preserveSystemPrompt explicitly off, automatic-cache provider, no cache_control.
    const out = resolveCacheAwareConfig(
      cfg({ preserveSystemPrompt: false }),
      autoCacheBody("openai/gpt-4o"),
      { provider: "openai" }
    );
    assert.equal(out.preserveSystemPrompt, true, "cacheable prefix must stay uncompressed");
  });

  it("leaves a NON-caching provider unaffected (no prefix protection without cache_control)", () => {
    const ctx = detectCachingContext(autoCacheBody("google/gemini-2.5-pro"), { provider: "google" });
    assert.equal(ctx.isCachingProvider, false);
    const result = getCacheAwareStrategy("aggressive", ctx);
    assert.equal(result.skipSystemPrompt, false);
    assert.equal(result.strategy, "aggressive");
    assert.equal(result.deterministicOnly, false);

    // And the config is left untouched (preserveSystemPrompt stays false).
    const out = resolveCacheAwareConfig(
      cfg({ preserveSystemPrompt: false }),
      autoCacheBody("google/gemini-2.5-pro"),
      { provider: "google" }
    );
    assert.equal(out.preserveSystemPrompt, false);
  });

  it("still protects explicit cache_control providers (existing #3890 behavior intact)", () => {
    const ctx = detectCachingContext(
      {
        messages: [
          { role: "system", content: "x", cache_control: { type: "ephemeral" } },
          { role: "user", content: "hi" },
        ],
      },
      { provider: "anthropic", targetFormat: "claude" }
    );
    assert.equal(ctx.hasCacheControl, true);
    const result = getCacheAwareStrategy("aggressive", ctx);
    assert.equal(result.skipSystemPrompt, true);
    assert.equal(result.strategy, "standard");
  });
});
