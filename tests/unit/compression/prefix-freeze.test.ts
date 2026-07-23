import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  resolvePrefixFreezeConfig,
  extractStablePrefixHash,
  observePrefix,
  isPrefixFrozen,
  getPrefixObservations,
  resetPrefixFreeze,
  DEFAULT_PREFIX_FREEZE,
} from "../../../open-sse/services/compression/prefixFreeze.ts";
import { resolveCacheAwareConfig } from "../../../open-sse/services/compression/cacheAwareConfig.ts";
import type { CompressionConfig } from "../../../open-sse/services/compression/types.ts";

// T08/H5 — usage-observed prefix freeze. Pure observer + integration via resolveCacheAwareConfig.

beforeEach(() => resetPrefixFreeze());

describe("prefixFreeze — config", () => {
  it("defaults to disabled / threshold 3", () => {
    const cfg = resolvePrefixFreezeConfig({} as NodeJS.ProcessEnv);
    assert.equal(cfg.enabled, false);
    assert.equal(cfg.threshold, DEFAULT_PREFIX_FREEZE.threshold);
  });
  it("reads env", () => {
    const cfg = resolvePrefixFreezeConfig({
      COMPRESSION_PREFIX_FREEZE_ENABLED: "true",
      COMPRESSION_PREFIX_FREEZE_THRESHOLD: "5",
    } as NodeJS.ProcessEnv);
    assert.equal(cfg.enabled, true);
    assert.equal(cfg.threshold, 5);
  });
});

describe("prefixFreeze — extractStablePrefixHash", () => {
  it("hashes an OpenAI system message", () => {
    const h = extractStablePrefixHash({
      messages: [
        { role: "system", content: "You are helpful" },
        { role: "user", content: "hi" },
      ],
    });
    assert.equal(typeof h, "string");
    assert.equal(h!.length, 24);
  });
  it("hashes a Claude `system` field and a Gemini `systemInstruction`", () => {
    const claude = extractStablePrefixHash({ system: "SP", messages: [] });
    const gemini = extractStablePrefixHash({ systemInstruction: { parts: [{ text: "SP" }] } });
    assert.ok(claude && gemini);
    // same underlying text → same hash regardless of shape
    assert.equal(claude, gemini);
  });
  it("returns null when there is no system prompt", () => {
    assert.equal(extractStablePrefixHash({ messages: [{ role: "user", content: "hi" }] }), null);
    assert.equal(extractStablePrefixHash("not an object"), null);
  });
  it("different system prompts hash differently", () => {
    const a = extractStablePrefixHash({ system: "A" });
    const b = extractStablePrefixHash({ system: "B" });
    assert.notEqual(a, b);
  });
});

describe("prefixFreeze — observe/isFrozen", () => {
  it("freezes only at/above the threshold, isolated per hash", () => {
    observePrefix("h");
    observePrefix("h");
    assert.equal(isPrefixFrozen("h", 3), false);
    assert.equal(getPrefixObservations("h"), 2);
    observePrefix("h");
    assert.equal(isPrefixFrozen("h", 3), true);
    // a different prefix is unaffected
    assert.equal(isPrefixFrozen("other", 3), false);
  });
});

describe("resolveCacheAwareConfig — H5 integration", () => {
  const baseConfig = {
    defaultMode: "standard",
    preserveSystemPromptMode: "whenNoCache",
    preserveSystemPrompt: false,
  } as unknown as CompressionConfig;
  const body = {
    messages: [
      { role: "system", content: "You are a careful assistant." },
      { role: "user", content: "hi" },
    ],
  };
  const ctx = { provider: "test-noncaching-provider" };

  afterEach(() => {
    delete process.env.COMPRESSION_PREFIX_FREEZE_ENABLED;
    delete process.env.COMPRESSION_PREFIX_FREEZE_THRESHOLD;
  });

  it("does nothing when disabled (default): non-caching provider never freezes the prefix", () => {
    for (let i = 0; i < 5; i++) {
      const out = resolveCacheAwareConfig(baseConfig, body, ctx);
      assert.equal(out.preserveSystemPrompt, false);
    }
  });

  it("when enabled, an observed-stable prefix flips preserveSystemPrompt at the threshold", () => {
    process.env.COMPRESSION_PREFIX_FREEZE_ENABLED = "true";
    process.env.COMPRESSION_PREFIX_FREEZE_THRESHOLD = "3";
    assert.equal(resolveCacheAwareConfig(baseConfig, body, ctx).preserveSystemPrompt, false); // 1
    assert.equal(resolveCacheAwareConfig(baseConfig, body, ctx).preserveSystemPrompt, false); // 2
    assert.equal(resolveCacheAwareConfig(baseConfig, body, ctx).preserveSystemPrompt, true); // 3 → frozen
  });

  it("respects mode `never`: a frozen prefix is still not preserved", () => {
    process.env.COMPRESSION_PREFIX_FREEZE_ENABLED = "true";
    process.env.COMPRESSION_PREFIX_FREEZE_THRESHOLD = "1";
    const neverConfig = {
      ...baseConfig,
      preserveSystemPromptMode: "never",
    } as unknown as CompressionConfig;
    const out = resolveCacheAwareConfig(neverConfig, body, ctx);
    assert.equal(out.preserveSystemPrompt, false);
  });
});
