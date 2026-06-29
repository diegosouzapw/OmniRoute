import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  memoLookup,
  memoStore,
  makeMemoKey,
  isDeterministicMode,
  clearMemoStore,
  MEMO_CAP,
} from "../../../open-sse/services/compression/resultMemo.ts";
import type { CompressionResult } from "../../../open-sse/services/compression/types.ts";
import { DEFAULT_COMPRESSION_CONFIG } from "../../../open-sse/services/compression/types.ts";
import { applyCompression } from "../../../open-sse/services/compression/strategySelector.ts";

const baseBody = {
  messages: [{ role: "user", content: "hello world compress me please" }],
  model: "gpt-4",
};

const memoConfig = {
  ...DEFAULT_COMPRESSION_CONFIG,
  enabled: true,
  defaultMode: "lite" as const,
  memoizeCompressionResults: true,
};

const noMemoConfig = {
  ...DEFAULT_COMPRESSION_CONFIG,
  enabled: true,
  defaultMode: "lite" as const,
  memoizeCompressionResults: false,
};

describe("resultMemo unit", () => {
  beforeEach(() => {
    clearMemoStore();
  });

  it("memoLookup returns null on miss", () => {
    const key = makeMemoKey(baseBody, "lite", noMemoConfig, "p1");
    assert.equal(memoLookup(key), null);
  });

  it("memoStore then memoLookup returns the stored result", () => {
    const key = makeMemoKey(baseBody, "lite", memoConfig, "p1");
    const result: CompressionResult = {
      body: { ...baseBody, _compressed: true },
      compressed: true,
      stats: {
        originalTokens: 10,
        compressedTokens: 8,
        savingsPercent: 20,
        techniquesUsed: ["lite"],
        mode: "lite",
        timestamp: Date.now(),
      },
    };
    memoStore(key, result);
    const hit = memoLookup(key);
    assert.notEqual(hit, null);
    assert.equal(hit!.compressed, true);
  });

  it("different principalId produces a different key (MISS)", () => {
    const key1 = makeMemoKey(baseBody, "lite", memoConfig, "principal-A");
    const key2 = makeMemoKey(baseBody, "lite", memoConfig, "principal-B");
    assert.notEqual(key1, key2);

    const result: CompressionResult = {
      body: { ...baseBody },
      compressed: false,
      stats: null,
    };
    memoStore(key1, result);
    assert.equal(memoLookup(key2), null);
  });

  it("cached body is a COPY — mutating returned body does not corrupt next hit", () => {
    const key = makeMemoKey(baseBody, "lite", memoConfig, "p1");
    const result: CompressionResult = {
      body: { messages: [{ role: "user", content: "original" }] },
      compressed: true,
      stats: null,
    };
    memoStore(key, result);

    const hit1 = memoLookup(key);
    assert.notEqual(hit1, null);
    // Mutate the returned body
    (hit1!.body as Record<string, unknown>)["injected"] = "evil";

    // Second lookup should not see the mutation
    const hit2 = memoLookup(key);
    assert.notEqual(hit2, null);
    assert.equal((hit2!.body as Record<string, unknown>)["injected"], undefined);
  });

  it("FIFO eviction: after MEMO_CAP entries, oldest is evicted", () => {
    const firstKey = makeMemoKey({ x: 0 }, "lite", memoConfig, "evict-test");
    const stub: CompressionResult = { body: {}, compressed: false, stats: null };
    memoStore(firstKey, stub);

    // Fill up to and beyond cap
    for (let i = 1; i <= MEMO_CAP; i++) {
      const k = makeMemoKey({ x: i }, "lite", memoConfig, "evict-test");
      memoStore(k, stub);
    }

    // The first entry should have been evicted
    assert.equal(memoLookup(firstKey), null);
  });
});

describe("isDeterministicMode", () => {
  it("lite is deterministic", () => {
    assert.equal(isDeterministicMode("lite", DEFAULT_COMPRESSION_CONFIG), true);
  });

  it("standard is deterministic", () => {
    assert.equal(isDeterministicMode("standard", DEFAULT_COMPRESSION_CONFIG), true);
  });

  it("rtk is deterministic", () => {
    assert.equal(isDeterministicMode("rtk", DEFAULT_COMPRESSION_CONFIG), true);
  });

  it("off is NOT deterministic (nothing to cache)", () => {
    assert.equal(isDeterministicMode("off", DEFAULT_COMPRESSION_CONFIG), false);
  });

  it("aggressive is NOT deterministic (pluggable summarizer)", () => {
    assert.equal(isDeterministicMode("aggressive", DEFAULT_COMPRESSION_CONFIG), false);
  });

  it("ultra is NOT deterministic (SLM tier)", () => {
    assert.equal(isDeterministicMode("ultra", DEFAULT_COMPRESSION_CONFIG), false);
  });

  it("stacked with only deterministic engines IS deterministic", () => {
    const cfg = {
      ...DEFAULT_COMPRESSION_CONFIG,
      stackedPipeline: [
        { engine: "rtk" as const, intensity: "standard" as const },
        { engine: "caveman" as const, intensity: "full" as const },
      ],
    };
    assert.equal(isDeterministicMode("stacked", cfg), true);
  });

  it("stacked with ultra engine is NOT deterministic", () => {
    const cfg = {
      ...DEFAULT_COMPRESSION_CONFIG,
      stackedPipeline: [{ engine: "ultra" as const }, { engine: "caveman" as const }],
    };
    assert.equal(isDeterministicMode("stacked", cfg), false);
  });

  it("stacked with aggressive engine is NOT deterministic", () => {
    const cfg = {
      ...DEFAULT_COMPRESSION_CONFIG,
      stackedPipeline: [{ engine: "aggressive" as const }, { engine: "rtk" as const }],
    };
    assert.equal(isDeterministicMode("stacked", cfg), false);
  });

  it("stacked with llmlingua engine is NOT deterministic", () => {
    const cfg = {
      ...DEFAULT_COMPRESSION_CONFIG,
      stackedPipeline: [{ engine: "llmlingua" as const }],
    };
    assert.equal(isDeterministicMode("stacked", cfg), false);
  });

  it("stacked with empty/undefined pipeline is NOT deterministic (safe default)", () => {
    const cfg = { ...DEFAULT_COMPRESSION_CONFIG, stackedPipeline: undefined };
    assert.equal(isDeterministicMode("stacked", cfg), false);
  });
});

describe("applyCompression with memoization", () => {
  beforeEach(() => {
    clearMemoStore();
  });

  it("flag OFF: two identical calls both compute (no caching path)", () => {
    let callCount = 0;
    // We can't easily spy on internal engine, so we verify via deterministic output
    // equality between independent calls (proving cache isn't interfering).
    // Use a body that will be lightly compressed.
    const body = {
      messages: [
        { role: "user", content: "The quick brown fox jumps over the lazy dog. ".repeat(20) },
      ],
      model: "gpt-4",
    };

    const r1 = applyCompression(body, "lite", { config: noMemoConfig, principalId: "u1" });
    const r2 = applyCompression(body, "lite", { config: noMemoConfig, principalId: "u1" });

    // Both compute — results should be equal (deterministic) but not the same object reference
    assert.deepEqual(r1.stats?.mode, r2.stats?.mode);
    // The memo store should be empty (flag was OFF)
    const key = makeMemoKey(body, "lite", noMemoConfig, "u1");
    assert.equal(memoLookup(key), null);
  });

  it("flag ON + deterministic mode: 2nd call hits memo (stats identical)", () => {
    const body = {
      messages: [{ role: "user", content: "Memoization test content. ".repeat(15) }],
      model: "gpt-4",
    };

    const r1 = applyCompression(body, "lite", { config: memoConfig, principalId: "u1" });
    const r2 = applyCompression(body, "lite", { config: memoConfig, principalId: "u1" });

    // Both should have same stats (2nd hit from cache)
    assert.deepEqual(r1.stats?.savingsPercent, r2.stats?.savingsPercent);
    assert.deepEqual(r1.stats?.originalTokens, r2.stats?.originalTokens);

    // Verify cache was populated
    const key = makeMemoKey(body, "lite", memoConfig, "u1");
    assert.notEqual(memoLookup(key), null);
  });

  it("flag ON + deterministic mode: different principalId = MISS", () => {
    const body = {
      messages: [{ role: "user", content: "Cross-principal test content. ".repeat(10) }],
      model: "gpt-4",
    };

    applyCompression(body, "lite", { config: memoConfig, principalId: "principal-A" });
    // principal-B should NOT hit the cache for principal-A's result
    const keyB = makeMemoKey(body, "lite", memoConfig, "principal-B");
    assert.equal(memoLookup(keyB), null);
  });

  it("flag ON + ultra mode: NOT cached", () => {
    const body = {
      messages: [{ role: "user", content: "Ultra mode should not be cached. ".repeat(10) }],
      model: "gpt-4",
    };

    applyCompression(body, "ultra", { config: memoConfig, principalId: "u1" });
    const key = makeMemoKey(body, "ultra", memoConfig, "u1");
    assert.equal(memoLookup(key), null);
  });
});

// ── Core-review hardening regressions ──────────────────────────────────────
describe("resultMemo — core review hardening", () => {
  beforeEach(() => clearMemoStore());

  it("stacked pipeline with a stateful engine (ccr/session-dedup) is NOT deterministic", () => {
    // ccr + session-dedup write to the cross-request CCR store → output depends on prior
    // state → must never be cached, even though they are not model-backed.
    const cfgCcr = { ...memoConfig, stackedPipeline: [{ engine: "rtk" as const }, { engine: "ccr" as const }] };
    const cfgDedup = { ...memoConfig, stackedPipeline: [{ engine: "session-dedup" as const }] };
    assert.equal(isDeterministicMode("stacked", cfgCcr), false);
    assert.equal(isDeterministicMode("stacked", cfgDedup), false);
    // the pure default pipeline [rtk, caveman] stays cacheable
    const cfgPure = { ...memoConfig, stackedPipeline: [{ engine: "rtk" as const }, { engine: "caveman" as const }] };
    assert.equal(isDeterministicMode("stacked", cfgPure), true);
    // an unknown/new mode is NOT cached by default (opt-in whitelist)
    assert.equal(isDeterministicMode("totally-new-mode" as never, memoConfig), false);
  });

  it("a missing principalId is never memoized (no anonymous↔authenticated key collision)", () => {
    const body = { messages: [{ role: "user", content: "no principal here please" }], model: "gpt-4" };
    applyCompression(body, "lite", { config: memoConfig }); // no principalId
    const key = makeMemoKey(body, "lite", memoConfig, undefined);
    assert.equal(memoLookup(key), null);
  });

  it("mutating the result after store does not corrupt the cache (clone-on-store)", () => {
    const key = "mutate-after-store";
    const result: CompressionResult = {
      body: { messages: [{ role: "user", content: "original" }] },
      compressed: true,
      stats: null,
    };
    memoStore(key, result);
    // mutate the caller's object AFTER storing
    (result.body.messages as Array<{ content: string }>)[0].content = "TAMPERED";
    const got = memoLookup(key);
    assert.equal((got!.body.messages as Array<{ content: string }>)[0].content, "original");
  });
});
