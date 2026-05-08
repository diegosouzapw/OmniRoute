import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_AGGRESSIVE_CONFIG,
  DEFAULT_COMPRESSION_CONFIG,
  DEFAULT_ULTRA_CONFIG,
} from "../../../open-sse/services/compression/types.ts";
import type {
  AggressiveConfig,
  AgingThresholds,
  ToolStrategiesConfig,
  SummarizerOpts,
  Summarizer,
  CompressionMode,
  CompressionStats,
  CompressionConfig,
  UltraConfig,
} from "../../../open-sse/services/compression/types.ts";

describe("Phase 3 — AggressiveConfig types", () => {
  it("CompressionMode includes 'aggressive'", () => {
    const mode: CompressionMode = "aggressive";
    assert.equal(mode, "aggressive");
  });

  it("CompressionMode includes all expected values", () => {
    const modes: CompressionMode[] = [
      "off",
      "lite",
      "standard",
      "aggressive",
      "ultra",
      "rtk",
      "stacked",
    ];
    assert.deepEqual(modes, ["off", "lite", "standard", "aggressive", "ultra", "rtk", "stacked"]);
  });

  it("DEFAULT_AGGRESSIVE_CONFIG has correct threshold defaults", () => {
    assert.equal(DEFAULT_AGGRESSIVE_CONFIG.thresholds.fullSummary, 5);
    assert.equal(DEFAULT_AGGRESSIVE_CONFIG.thresholds.moderate, 3);
    assert.equal(DEFAULT_AGGRESSIVE_CONFIG.thresholds.light, 2);
    assert.equal(DEFAULT_AGGRESSIVE_CONFIG.thresholds.verbatim, 2);
  });

  it("DEFAULT_AGGRESSIVE_CONFIG has all toolStrategies enabled", () => {
    const ts = DEFAULT_AGGRESSIVE_CONFIG.toolStrategies;
    assert.equal(ts.fileContent, true);
    assert.equal(ts.grepSearch, true);
    assert.equal(ts.shellOutput, true);
    assert.equal(ts.json, true);
    assert.equal(ts.errorMessage, true);
  });

  it("DEFAULT_AGGRESSIVE_CONFIG has correct scalar defaults", () => {
    assert.equal(DEFAULT_AGGRESSIVE_CONFIG.summarizerEnabled, true);
    assert.equal(DEFAULT_AGGRESSIVE_CONFIG.maxTokensPerMessage, 2048);
    assert.equal(DEFAULT_AGGRESSIVE_CONFIG.minSavingsThreshold, 0.05);
  });

  it("CompressionConfig accepts aggressive field", () => {
    const config: CompressionConfig = {
      ...DEFAULT_COMPRESSION_CONFIG,
      aggressive: DEFAULT_AGGRESSIVE_CONFIG,
    };
    assert.deepEqual(config.aggressive, DEFAULT_AGGRESSIVE_CONFIG);
  });

  it("CompressionConfig.aggressive is optional", () => {
    const config: CompressionConfig = { ...DEFAULT_COMPRESSION_CONFIG };
    assert.equal(config.aggressive, undefined);
  });

  it("DEFAULT_ULTRA_CONFIG has correct defaults", () => {
    assert.equal(DEFAULT_ULTRA_CONFIG.enabled, false);
    assert.equal(DEFAULT_ULTRA_CONFIG.compressionRate, 0.5);
    assert.equal(DEFAULT_ULTRA_CONFIG.minScoreThreshold, 0.3);
    assert.equal(DEFAULT_ULTRA_CONFIG.slmFallbackToAggressive, true);
    assert.equal(DEFAULT_ULTRA_CONFIG.maxTokensPerMessage, 0);
  });

  it("CompressionConfig accepts ultra field", () => {
    const ultra: UltraConfig = {
      ...DEFAULT_ULTRA_CONFIG,
      enabled: true,
    };
    const config: CompressionConfig = {
      ...DEFAULT_COMPRESSION_CONFIG,
      ultra,
    };
    assert.deepEqual(config.ultra, ultra);
  });

  it("CompressionStats accepts aggressive breakdown", () => {
    const stats: CompressionStats = {
      originalTokens: 10000,
      compressedTokens: 5000,
      savingsPercent: 50,
      techniquesUsed: ["summarizer", "toolResult", "aging"],
      mode: "aggressive",
      timestamp: Date.now(),
      aggressive: {
        summarizerSavings: 2000,
        toolResultSavings: 1500,
        agingSavings: 1500,
      },
    };
    assert.equal(stats.aggressive?.summarizerSavings, 2000);
    assert.equal(stats.aggressive?.toolResultSavings, 1500);
    assert.equal(stats.aggressive?.agingSavings, 1500);
  });

  it("CompressionStats.aggressive is optional", () => {
    const stats: CompressionStats = {
      originalTokens: 10000,
      compressedTokens: 8000,
      savingsPercent: 20,
      techniquesUsed: ["caveman"],
      mode: "standard",
      timestamp: Date.now(),
    };
    assert.equal(stats.aggressive, undefined);
  });

  it("Summarizer interface compiles with sync return", () => {
    const summarizer: Summarizer = {
      summarize: (messages: unknown[], opts?: SummarizerOpts) => {
        return "summary";
      },
    };
    assert.equal(summarizer.summarize([]), "summary");
  });

  it("SummarizerOpts has expected optional fields", () => {
    const opts: SummarizerOpts = { maxLen: 500, preserveCode: true };
    assert.equal(opts.maxLen, 500);
    assert.equal(opts.preserveCode, true);
    const empty: SummarizerOpts = {};
    assert.equal(empty.maxLen, undefined);
    assert.equal(empty.preserveCode, undefined);
  });

  it("AgingThresholds type compiles with all fields", () => {
    const t: AgingThresholds = { fullSummary: 7, moderate: 5, light: 3, verbatim: 2 };
    assert.equal(t.fullSummary, 7);
  });

  it("ToolStrategiesConfig type compiles with all fields", () => {
    const ts: ToolStrategiesConfig = {
      fileContent: false,
      grepSearch: true,
      shellOutput: true,
      json: false,
      errorMessage: true,
    };
    assert.equal(ts.fileContent, false);
    assert.equal(ts.json, false);
  });
});
