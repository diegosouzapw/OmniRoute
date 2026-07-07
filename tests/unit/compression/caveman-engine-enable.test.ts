import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { cavemanEngine } from "../../../open-sse/services/compression/engines/cavemanAdapter.ts";

describe("caveman engine — stacked-step enable (regression #6464)", () => {
  it("compresses when invoked as a stacked step without explicit enabled flag", () => {
    // Reproduces the failure from #6464: /api/compression/preview with
    // mode=stacked routes through cavemanEngine.apply with
    // stepConfig={intensity:'full'} and no cavemanConfig — the engine used to
    // fall through to DEFAULT_CAVEMAN_CONFIG.enabled=false and short-circuit,
    // returning bytes-identical output. Selection as a stacked step is the
    // enable signal (B-MODE-ENGINE-DECOUPLE), same pattern as the RTK adapter
    // and the mode='standard' strategy path.
    const body = {
      messages: [
        {
          role: "user",
          content: "really important context please carefully. ".repeat(20),
        },
      ],
    };
    const result = cavemanEngine.apply(body as any, {
      stepConfig: { intensity: "full" } as any,
    });
    assert.equal(result.compressed, true);
    assert.ok(
      result.stats.compressedTokens < result.stats.originalTokens,
      `Expected compressedTokens (${result.stats.compressedTokens}) < originalTokens (${result.stats.originalTokens})`
    );
    assert.ok(
      result.stats.rulesApplied && result.stats.rulesApplied.length > 0,
      "Expected at least one rule applied"
    );
  });

  it("still honors explicit stepConfig.enabled === false opt-out", () => {
    const body = {
      messages: [
        {
          role: "user",
          content: "really important context please carefully. ".repeat(20),
        },
      ],
    };
    const result = cavemanEngine.apply(body as any, {
      stepConfig: { intensity: "full", enabled: false } as any,
    });
    assert.equal(result.compressed, false);
  });
});
