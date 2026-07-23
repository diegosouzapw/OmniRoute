/**
 * T05/C5 — resolveCacheAwareConfig materializes the `preserveSystemPromptMode` enum
 * into the engine-facing `preserveSystemPrompt` boolean using the cache signal.
 * The legacy boolean behaviour is covered by strategySelector-cache-aware.test.ts /
 * compression-cache-guard-3955.test.ts (unchanged); this file covers the new enum.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { resolveCacheAwareConfig } from "../../../open-sse/services/compression/cacheAwareConfig.ts";
import type {
  CompressionConfig,
  PreserveSystemPromptMode,
} from "../../../open-sse/services/compression/types.ts";

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

// A request whose prefix the upstream caches (anthropic + explicit cache_control).
const CACHING_BODY = {
  messages: [{ role: "system", content: "x", cache_control: { type: "ephemeral" } }],
};
const CACHING_CTX = { provider: "anthropic", targetFormat: "claude" } as const;
// google has no prompt caching → no cacheable prefix to protect.
const NON_CACHING_BODY = { messages: [{ role: "system", content: "x" }] };
const NON_CACHING_CTX = { provider: "google" } as const;

function resolved(mode: PreserveSystemPromptMode, caching: boolean): boolean {
  const out = resolveCacheAwareConfig(
    cfg({ preserveSystemPromptMode: mode, preserveSystemPrompt: true }),
    caching ? CACHING_BODY : NON_CACHING_BODY,
    caching ? CACHING_CTX : NON_CACHING_CTX
  );
  return out.preserveSystemPrompt;
}

describe("T05/C5 preserveSystemPromptMode -> effective boolean", () => {
  it("always: preserves regardless of cache", () => {
    assert.equal(resolved("always", true), true);
    assert.equal(resolved("always", false), true);
  });

  it("whenNoCache: preserves only when a cache is present", () => {
    assert.equal(resolved("whenNoCache", true), true);
    assert.equal(resolved("whenNoCache", false), false);
  });

  it("never: compresses the system prompt even when it would break the prompt cache", () => {
    assert.equal(resolved("never", true), false);
    assert.equal(resolved("never", false), false);
  });

  it("the explicit mode overrides a contradicting legacy boolean", () => {
    // mode=never wins even though the legacy boolean asks to preserve.
    const out = resolveCacheAwareConfig(
      cfg({ preserveSystemPromptMode: "never", preserveSystemPrompt: true }),
      CACHING_BODY,
      CACHING_CTX
    );
    assert.equal(out.preserveSystemPrompt, false);
  });

  it("no body: honors the mode at its no-cache baseline", () => {
    assert.equal(
      resolveCacheAwareConfig(cfg({ preserveSystemPromptMode: "whenNoCache" })).preserveSystemPrompt,
      false
    );
    assert.equal(
      resolveCacheAwareConfig(cfg({ preserveSystemPromptMode: "always" })).preserveSystemPrompt,
      true
    );
  });
});
