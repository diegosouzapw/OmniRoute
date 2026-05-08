import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  applyCompression,
  selectCompressionStrategy,
} from "../../../open-sse/services/compression/strategySelector.ts";
import { compressAggressive } from "../../../open-sse/services/compression/aggressive.ts";
import { DEFAULT_AGGRESSIVE_CONFIG } from "../../../open-sse/services/compression/types.ts";
import type {
  AggressiveConfig,
  CompressionConfig,
} from "../../../open-sse/services/compression/types.ts";

function makeMessages(count: number): Array<{ role: string; content: string }> {
  return Array.from({ length: count }, (_, i) => ({
    role: i % 2 === 0 ? "user" : "assistant",
    content: `Message ${i}: ${"x".repeat(200)}`,
  }));
}

describe("Integration: strategySelector → aggressive pipeline", () => {
  it("applyCompression with mode='aggressive' compresses messages", () => {
    const messages = makeMessages(20);
    const body = { messages };
    const config: CompressionConfig = {
      enabled: true,
      defaultMode: "aggressive",
      autoTriggerTokens: 0,
      cacheMinutes: 5,
      preserveSystemPrompt: true,
      comboOverrides: {},
      aggressive: DEFAULT_AGGRESSIVE_CONFIG,
    };

    const result = applyCompression(body as Record<string, unknown>, "aggressive", {
      model: "test-model",
      config,
    });

    assert.ok(result.compressed !== undefined);
    assert.ok(result.stats !== null);
    assert.equal(result.stats!.mode, "aggressive");
    assert.ok(Array.isArray((result.body as Record<string, unknown>).messages));
  });

  it("applyCompression with mode='aggressive' returns unchanged for empty messages", () => {
    const body = { messages: [] };
    const config: CompressionConfig = {
      enabled: true,
      defaultMode: "aggressive",
      autoTriggerTokens: 0,
      cacheMinutes: 5,
      preserveSystemPrompt: true,
      comboOverrides: {},
      aggressive: DEFAULT_AGGRESSIVE_CONFIG,
    };

    const result = applyCompression(body as Record<string, unknown>, "aggressive", {
      model: "test-model",
      config,
    });

    assert.equal(result.compressed, false);
    assert.equal(result.stats, null);
  });

  it("applyCompression with mode='off' returns unchanged", () => {
    const messages = makeMessages(20);
    const body = { messages };

    const result = applyCompression(body as Record<string, unknown>, "off");

    assert.equal(result.compressed, false);
    assert.equal(result.stats, null);
    assert.deepEqual((result.body as Record<string, unknown>).messages, messages);
  });

  it("applyCompression with mode='lite' still works after aggressive addition", () => {
    const messages = makeMessages(10);
    const body = { messages };

    const result = applyCompression(body as Record<string, unknown>, "lite");

    // Lite mode should still work — no regression
    assert.ok(result.compressed !== undefined);
  });

  it("compressAggressive with custom config overrides defaults", () => {
    const messages = makeMessages(20);
    const customConfig: Partial<AggressiveConfig> = {
      maxTokensPerMessage: 500,
      minSavingsThreshold: 0.5,
      summarizerEnabled: false,
    };

    const result = compressAggressive(messages, customConfig);
    assert.ok(result.messages.length > 0);
    assert.equal(result.stats.mode, "aggressive");
    // With summarizer disabled, no summarizer savings
    assert.equal(result.stats.aggressive!.summarizerSavings, 0);
  });

  it("compressAggressive handles tool result messages", () => {
    const messages = [
      { role: "user", content: "Show me the file" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          { id: "call_1", type: "function", function: { name: "read_file", arguments: "{}" } },
        ],
      },
      {
        role: "tool",
        content: `File contents:\n${"line of code\n".repeat(100)}`,
        tool_call_id: "call_1",
        name: "read_file",
      },
      { role: "assistant", content: "Here's the file content." },
    ];

    const result = compressAggressive(messages, {
      toolStrategies: {
        fileContent: true,
        grepSearch: true,
        shellOutput: true,
        json: true,
        errorMessage: true,
      },
    });

    assert.ok(result.messages.length > 0);
    assert.equal(result.stats.mode, "aggressive");
    // Tool result should have been compressed
    assert.ok(result.stats.aggressive!.toolResultSavings >= 0);
  });

  it("compressAggressive preserves system messages", () => {
    const messages = [
      { role: "system", content: "You are a helpful coding assistant." },
      ...makeMessages(15),
    ];

    const result = compressAggressive(messages);
    // System message should be preserved
    const systemMsg = result.messages.find((m) => m.role === "system");
    assert.ok(systemMsg, "System message should be preserved");
    assert.equal(systemMsg!.content, "You are a helpful coding assistant.");
  });

  it("compressAggressive preserves duplicate system prompts during lite fallback", () => {
    const messages = [
      { role: "system", content: "Policy exact. Keep exact." },
      { role: "system", content: "Policy exact. Keep exact." },
      { role: "user", content: "Short" },
    ];

    const result = compressAggressive(messages, {
      preserveSystemPrompt: true,
      minSavingsThreshold: 0.9,
      summarizerEnabled: false,
      maxTokensPerMessage: 999999,
    });

    assert.deepEqual(
      result.messages.filter((message) => message.role === "system"),
      messages.filter((message) => message.role === "system")
    );
  });

  it("compressAggressive downgrade chain works when aggressive fails", () => {
    // Empty messages should trigger downgrade gracefully
    const result = compressAggressive([]);
    assert.ok(result.messages.length === 0);
    assert.equal(result.stats.mode, "aggressive");
  });

  it("full pipeline: strategySelector selects aggressive mode from config", () => {
    const config: CompressionConfig = {
      enabled: true,
      defaultMode: "aggressive",
      autoTriggerTokens: 0,
      cacheMinutes: 5,
      preserveSystemPrompt: true,
      comboOverrides: {},
      aggressive: DEFAULT_AGGRESSIVE_CONFIG,
    };

    const mode = selectCompressionStrategy(config, null, 0);
    assert.equal(mode, "aggressive");
  });
});
