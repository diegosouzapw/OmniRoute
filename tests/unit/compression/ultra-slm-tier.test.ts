/**
 * Ultra SLM tier — wiring the ultra mode's modelPath / slmFallbackToAggressive config
 * to the real model path (the llmlingua engine).
 *
 * Until now ultra was a pure heuristic (pruneByScore) and modelPath /
 * slmFallbackToAggressive were inert config. The async entry point now routes ultra
 * through the llmlingua engine when modelPath is set, falling back per
 * slmFallbackToAggressive when the model is unavailable / yields no gain.
 *
 * The llmlingua backend is injectable (setLlmlinguaBackend), so the tier is testable
 * without the real ONNX model.
 */
import { describe, it, after, afterEach, test } from "node:test";
import assert from "node:assert/strict";

import { applyCompressionAsync } from "../../../open-sse/services/compression/index.ts";
import { setLlmlinguaBackend } from "../../../open-sse/services/compression/engines/llmlingua/index.ts";
import { DEFAULT_ULTRA_CONFIG } from "../../../open-sse/services/compression/types.ts";

// Comfortably above the llmlingua default 2000-token floor (estimate ≈ chars / 4).
const LARGE_PROSE = "The quick brown fox jumps over the lazy dog every morning. ".repeat(260);

function body() {
  return { model: "gpt-4o", messages: [{ role: "user", content: LARGE_PROSE }] };
}

function ultraOpts(ultra: Record<string, unknown>) {
  // Only config.ultra is read by the ultra SLM tier; the rest of CompressionConfig is unused here.
  return { config: { ultra: { ...DEFAULT_ULTRA_CONFIG, ...ultra } } } as unknown as Parameters<
    typeof applyCompressionAsync
  >[2];
}

let backendCalls = 0;
function trackingCompressingBackend(text: string): Promise<string> {
  backendCalls++;
  return Promise.resolve(text.slice(0, Math.max(1, Math.floor(text.length / 3))));
}
function identityBackend(text: string): Promise<string> {
  backendCalls++;
  return Promise.resolve(text); // no gain → llmlingua reports compressed:false
}
function throwingBackend(_text: string): Promise<string> {
  backendCalls++;
  return Promise.reject(new Error("model unavailable"));
}

afterEach(() => {
  backendCalls = 0;
});
after(() => setLlmlinguaBackend(null));

function techniques(stats: unknown): string[] {
  return ((stats as { techniquesUsed?: string[] } | null)?.techniquesUsed ?? []) as string[];
}

describe("ultra SLM tier — modelPath routes through llmlingua", () => {
  it("runs the SLM tier when modelPath is set and the model compresses", async () => {
    setLlmlinguaBackend(trackingCompressingBackend);
    const result = await applyCompressionAsync(
      body(),
      "ultra",
      ultraOpts({ modelPath: "/models/fake.onnx", compressionRate: 0.5 })
    );
    assert.equal(backendCalls > 0, true, "backend was consulted");
    assert.equal(result.compressed, true);
    assert.equal((result.stats as { mode?: string } | null)?.mode, "ultra");
    assert.ok(techniques(result.stats).includes("ultra-slm"), "tagged as the ultra SLM tier");
  });

  it("falls back to aggressive when the model yields no gain and slmFallbackToAggressive is on", async () => {
    setLlmlinguaBackend(identityBackend);
    const result = await applyCompressionAsync(
      body(),
      "ultra",
      ultraOpts({ modelPath: "/models/fake.onnx", slmFallbackToAggressive: true })
    );
    assert.ok(techniques(result.stats).includes("aggressive"), "fell back to aggressive");
    assert.ok(!techniques(result.stats).includes("ultra-slm"));
  });

  it("falls back to the heuristic when the model fails and slmFallbackToAggressive is off", async () => {
    setLlmlinguaBackend(throwingBackend);
    const result = await applyCompressionAsync(
      body(),
      "ultra",
      ultraOpts({ modelPath: "/models/fake.onnx", slmFallbackToAggressive: false })
    );
    const techs = techniques(result.stats);
    assert.equal((result.stats as { mode?: string } | null)?.mode, "ultra");
    assert.ok(techs.includes("ultra"), "heuristic ultra ran");
    assert.ok(!techs.includes("ultra-slm"), "not the SLM tier");
    assert.ok(!techs.includes("aggressive"), "not the aggressive fallback");
  });

  it("uses the heuristic and never touches the model when modelPath is unset", async () => {
    setLlmlinguaBackend(throwingBackend); // would blow up if (wrongly) consulted
    const result = await applyCompressionAsync(body(), "ultra", ultraOpts({ modelPath: "" }));
    assert.equal(backendCalls, 0, "model not consulted without modelPath");
    assert.equal((result.stats as { mode?: string } | null)?.mode, "ultra");
    assert.ok(!techniques(result.stats).includes("ultra-slm"));
  });
});

// ─── Phase 4 (B): SLM-tier resolver, probe, telemetry, pre-warm ──────────────
// (Appended to the pre-existing legacy `modelPath` suite above, which must stay green.)

import { DEFAULT_COMPRESSION_CONFIG } from "../../../open-sse/services/compression/types.ts";

test("DEFAULT_COMPRESSION_CONFIG defaults ultraEngine to 'heuristic'", () => {
  assert.equal(DEFAULT_COMPRESSION_CONFIG.ultraEngine, "heuristic");
});

test("DEFAULT_COMPRESSION_CONFIG defaults ultraSlmPrewarm to false", () => {
  assert.equal(DEFAULT_COMPRESSION_CONFIG.ultraSlmPrewarm, false);
});

import type { CompressionStats } from "../../../open-sse/services/compression/types.ts";

test("CompressionStats accepts an optional ultraTier signal", () => {
  const s = {
    originalTokens: 10,
    compressedTokens: 5,
    savingsPercent: 50,
    techniquesUsed: ["ultra-heuristic-pruning"],
    mode: "ultra" as const,
    timestamp: 1,
    ultraTier: "heuristic" as const,
  } satisfies CompressionStats;
  assert.equal(s.ultraTier, "heuristic");
});

import {
  ultraCompress,
  ultraCompressHeuristic,
} from "../../../open-sse/services/compression/ultra.ts";

test("ultraCompressHeuristic is a synchronous pure heuristic (no SLM)", () => {
  const cfg = {
    enabled: true,
    compressionRate: 0.5,
    minScoreThreshold: 0.3,
    slmFallbackToAggressive: false,
    maxTokensPerMessage: 0,
  };
  const r = ultraCompressHeuristic(
    [{ role: "user", content: "the quick brown fox jumps over the lazy dog" }],
    cfg
  );
  assert.equal(r.stats.mode, "ultra");
  assert.equal(r.stats.ultraTier, "heuristic");
  assert.ok(r.stats.techniquesUsed.includes("ultra-heuristic-pruning"));
});

test("ultraCompress with default config (no ultraEngine) uses heuristic tier", async () => {
  const r = await ultraCompress([{ role: "user", content: "the quick brown fox jumps" }], {
    enabled: true,
    compressionRate: 0.5,
    minScoreThreshold: 0.3,
    slmFallbackToAggressive: false,
    maxTokensPerMessage: 0,
  });
  assert.equal(r.stats.ultraTier, "heuristic");
});

import {
  __setUltraSlmTestHooks,
  __resetUltraEntryForTests,
} from "../../../open-sse/services/compression/engines/llmlingua/ultraEntry.ts";

test("ultraEngine:'slm' with available stub backend records ultraTier:'slm'", async () => {
  __setUltraSlmTestHooks({
    available: true,
    run: async (text) => text.slice(0, Math.ceil(text.length / 2)),
  });
  try {
    const r = await ultraCompress(
      [{ role: "user", content: "the quick brown fox jumps over the lazy dog repeatedly today" }],
      {
        enabled: true,
        compressionRate: 0.5,
        minScoreThreshold: 0.3,
        slmFallbackToAggressive: false,
        maxTokensPerMessage: 0,
        ultraEngine: "slm",
      }
    );
    assert.equal(r.stats.ultraTier, "slm");
    assert.ok(r.stats.techniquesUsed.includes("ultra-slm"));
    assert.ok(r.stats.compressedTokens <= r.stats.originalTokens);
  } finally {
    __resetUltraEntryForTests();
  }
});

test("ultraEngine:'slm' but backend throws → ultraTier:'heuristic-fallback'", async () => {
  __setUltraSlmTestHooks({
    available: true,
    run: async () => {
      throw new Error("worker timeout");
    },
  });
  try {
    const r = await ultraCompress(
      [{ role: "user", content: "the quick brown fox jumps over the lazy dog repeatedly today" }],
      {
        enabled: true,
        compressionRate: 0.5,
        minScoreThreshold: 0.3,
        slmFallbackToAggressive: false,
        maxTokensPerMessage: 0,
        ultraEngine: "slm",
      }
    );
    assert.equal(r.stats.ultraTier, "heuristic-fallback");
  } finally {
    __resetUltraEntryForTests();
  }
});

test("ultraEngine:'slm' but slmAvailable() false → heuristic tier (no SLM attempt)", async () => {
  __setUltraSlmTestHooks({
    available: false,
    run: async () => {
      throw new Error("should not be called");
    },
  });
  try {
    const r = await ultraCompress([{ role: "user", content: "the quick brown fox jumps" }], {
      enabled: true,
      compressionRate: 0.5,
      minScoreThreshold: 0.3,
      slmFallbackToAggressive: false,
      maxTokensPerMessage: 0,
      ultraEngine: "slm",
    });
    assert.equal(r.stats.ultraTier, "heuristic");
  } finally {
    __resetUltraEntryForTests();
  }
});

test("SLM tier preserves fenced code + URLs verbatim (structure wrapper)", async () => {
  // Stub the SLM to lowercase prose — any leakage of code/URL into it would show.
  __setUltraSlmTestHooks({
    available: true,
    run: async (text) => (text.trim() ? text.toLowerCase() + " x" : text),
  });
  try {
    const code = "```js\nconst A = 1; // KEEP\n```";
    const url = "https://Example.com/Path";
    // The fenced block must open at line-start for `extractPreservedBlocks` to tombstone
    // it (the same rule the heuristic Tier-A already relies on); both tiers share that
    // wrapper, so this proves the SLM tier preserves structure identically.
    const content = `Some PROSE here and ${url} trailing PROSE\n${code}\nmore PROSE after`;
    const r = await ultraCompress([{ role: "user", content }], {
      enabled: true,
      compressionRate: 0.5,
      minScoreThreshold: 0.3,
      slmFallbackToAggressive: false,
      maxTokensPerMessage: 0,
      ultraEngine: "slm",
    });
    const out = r.messages[0].content as string;
    assert.ok(out.includes(code), "fenced code block must survive verbatim");
    assert.ok(out.includes(url), "URL must survive verbatim");
  } finally {
    __resetUltraEntryForTests();
  }
});
