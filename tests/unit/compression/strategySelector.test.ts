import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  selectCompressionStrategy,
  getEffectiveMode,
  applyCompression,
  checkComboOverride,
  shouldAutoTrigger,
} from "../../../open-sse/services/compression/strategySelector.ts";
import type { CompressionConfig } from "../../../open-sse/services/compression/types.ts";

const baseConfig: CompressionConfig = {
  enabled: true,
  defaultMode: "lite",
  autoTriggerTokens: 0,
  cacheMinutes: 5,
  preserveSystemPrompt: true,
  comboOverrides: {},
};

describe("checkComboOverride", () => {
  it("returns null when comboId is null", () => {
    assert.equal(checkComboOverride(baseConfig, null), null);
  });

  it("returns null when comboOverrides is empty", () => {
    assert.equal(checkComboOverride(baseConfig, "my-combo"), null);
  });

  it("returns mode when combo override exists", () => {
    const config = { ...baseConfig, comboOverrides: { "my-combo": "off" as const } };
    assert.equal(checkComboOverride(config, "my-combo"), "off");
  });

  it("returns null for non-existent combo", () => {
    const config = { ...baseConfig, comboOverrides: { "other-combo": "lite" as const } };
    assert.equal(checkComboOverride(config, "my-combo"), null);
  });
});

describe("shouldAutoTrigger", () => {
  it("returns false when autoTriggerTokens is 0", () => {
    assert.equal(shouldAutoTrigger(baseConfig, 5000), false);
  });

  it("returns false when tokens below threshold", () => {
    const config = { ...baseConfig, autoTriggerTokens: 1000 };
    assert.equal(shouldAutoTrigger(config, 500), false);
  });

  it("returns true when tokens at threshold", () => {
    const config = { ...baseConfig, autoTriggerTokens: 1000 };
    assert.equal(shouldAutoTrigger(config, 1000), true);
  });

  it("returns true when tokens above threshold", () => {
    const config = { ...baseConfig, autoTriggerTokens: 1000 };
    assert.equal(shouldAutoTrigger(config, 1500), true);
  });
});

describe("getEffectiveMode", () => {
  it("returns off when not enabled", () => {
    const config = { ...baseConfig, enabled: false };
    assert.equal(getEffectiveMode(config, null, 100), "off");
  });

  it("keeps disabled config off despite combo override and auto-trigger", () => {
    const config = {
      ...baseConfig,
      enabled: false,
      autoTriggerTokens: 100,
      comboOverrides: { "my-combo": "lite" as const },
    };

    assert.equal(getEffectiveMode(config, "my-combo", 500), "off");
  });

  it("returns default mode when no overrides", () => {
    assert.equal(getEffectiveMode(baseConfig, null, 100), "lite");
  });

  it("returns combo override mode when present", () => {
    const config = {
      ...baseConfig,
      defaultMode: "off" as const,
      comboOverrides: { "my-combo": "lite" as const },
    };
    assert.equal(getEffectiveMode(config, "my-combo", 100), "lite");
  });

  it("returns lite when auto-trigger threshold reached", () => {
    const config = { ...baseConfig, defaultMode: "off" as const, autoTriggerTokens: 1000 };
    assert.equal(getEffectiveMode(config, null, 1500), "lite");
  });

  it("combo override takes precedence over auto-trigger", () => {
    const config = {
      ...baseConfig,
      defaultMode: "off" as const,
      autoTriggerTokens: 100,
      comboOverrides: { "my-combo": "off" as const },
    };
    assert.equal(getEffectiveMode(config, "my-combo", 500), "off");
  });
});

describe("selectCompressionStrategy", () => {
  it("returns effective mode", () => {
    assert.equal(selectCompressionStrategy(baseConfig, null, 100), "lite");
  });

  it("downgrades aggressive cache-control requests for caching-aware providers", () => {
    const config = { ...baseConfig, defaultMode: "aggressive" as const };
    const body = {
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: "cached", cache_control: { type: "ephemeral" } }],
        },
      ],
    };

    assert.equal(
      selectCompressionStrategy(config, null, 100, body, {
        provider: "anthropic",
        targetFormat: "claude",
        model: "claude-3-5-sonnet",
      }),
      "standard"
    );
  });
});

describe("applyCompression", () => {
  it("returns unchanged body for off mode", () => {
    const body = { messages: [{ role: "user", content: "test" }] };
    const result = applyCompression(body, "off");
    assert.equal(result.compressed, false);
    assert.equal(result.stats, null);
    assert.deepEqual(result.body, body);
  });

  it("applies lite compression for lite mode", () => {
    const body = { messages: [{ role: "user", content: "test\n\n\n\nmessage" }] };
    const result = applyCompression(body, "lite");
    assert.equal(result.compressed, true);
    assert.ok(result.stats);
    assert.equal(result.stats.mode, "lite");
  });

  it("returns unchanged body for standard mode (Phase 2)", () => {
    const body = { messages: [{ role: "user", content: "test" }] };
    const result = applyCompression(body, "standard");
    assert.equal(result.compressed, false);
  });

  it("applies rtk compression to tool output", () => {
    const body = {
      messages: [
        {
          role: "tool",
          content: Array.from({ length: 20 }, () => "same noisy line").join("\n"),
        },
      ],
    };
    const result = applyCompression(body, "rtk");
    assert.equal(result.stats?.mode, "rtk");
    assert.equal(result.stats?.engine, "rtk");
    assert.equal(result.compressed, true);
  });

  it("applies stacked compression with RTK followed by Caveman", () => {
    const body = {
      messages: [
        {
          role: "tool",
          content: Array.from({ length: 20 }, () => "same noisy line").join("\n"),
        },
        {
          role: "user",
          content: "Could you please explain in detail what I need to do?",
        },
      ],
    };
    const result = applyCompression(body, "stacked");
    assert.equal(result.stats?.mode, "stacked");
    assert.equal(result.stats?.engine, "stacked");
    assert.ok(result.stats?.engineBreakdown?.some((entry) => entry.engine === "rtk"));
    assert.ok(result.stats?.engineBreakdown?.some((entry) => entry.engine === "caveman"));
  });
});
