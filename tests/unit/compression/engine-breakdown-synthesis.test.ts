import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ensureEngineBreakdown } from "../../../open-sse/services/compression/engineBreakdown.ts";
import type { CompressionStats } from "../../../open-sse/services/compression/types.ts";

function stats(over: Partial<CompressionStats>): CompressionStats {
  return {
    originalTokens: 1000,
    compressedTokens: 700,
    savingsPercent: 30,
    techniquesUsed: [],
    mode: "rtk",
    timestamp: 0,
    ...over,
  };
}

// Single-engine compression modes (rtk/lite/standard/aggressive/ultra) produce stats with an
// empty engineBreakdown — only the stacked pipeline fills it. The dashboard studio then renders
// an empty Input→Output pipeline (no engine node, inert replay) for the most common case.
// ensureEngineBreakdown synthesizes a 1-entry breakdown from the overall stats so the studio
// always shows at least one real engine node.
describe("ensureEngineBreakdown", () => {
  it("returns the existing breakdown unchanged when present (stacked)", () => {
    const bd = [
      {
        engine: "rtk",
        originalTokens: 1000,
        compressedTokens: 700,
        savingsPercent: 30,
        techniquesUsed: ["a"],
      },
    ];
    assert.deepEqual(ensureEngineBreakdown(stats({ engineBreakdown: bd })), bd);
  });

  it("synthesizes a 1-entry breakdown for single-engine modes (empty/undefined breakdown)", () => {
    const out = ensureEngineBreakdown(
      stats({
        mode: "lite",
        engine: "lite",
        originalTokens: 2000,
        compressedTokens: 1500,
        savingsPercent: 25,
        techniquesUsed: ["lite-strip"],
        rulesApplied: ["r1"],
        durationMs: 3,
      })
    );
    assert.equal(out.length, 1);
    assert.equal(out[0].engine, "lite");
    assert.equal(out[0].originalTokens, 2000);
    assert.equal(out[0].compressedTokens, 1500);
    assert.equal(out[0].savingsPercent, 25);
    assert.deepEqual(out[0].techniquesUsed, ["lite-strip"]);
    assert.deepEqual(out[0].rulesApplied, ["r1"]);
    assert.equal(out[0].durationMs, 3);
  });

  it("falls back to mode for the engine label when stats.engine is absent", () => {
    const out = ensureEngineBreakdown(stats({ mode: "standard", engineBreakdown: [] }));
    assert.equal(out.length, 1);
    assert.equal(out[0].engine, "standard");
    assert.deepEqual(out[0].techniquesUsed, []);
  });
});
