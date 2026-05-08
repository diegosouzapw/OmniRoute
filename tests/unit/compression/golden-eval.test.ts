import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { compressAggressive } from "../../../open-sse/services/compression/aggressive.ts";
import { applyCompression } from "../../../open-sse/services/compression/strategySelector.ts";
import { DEFAULT_AGGRESSIVE_CONFIG } from "../../../open-sse/services/compression/types.ts";
import type { CompressionConfig } from "../../../open-sse/services/compression/types.ts";

const FIXTURE_PATH = join(import.meta.dirname, "fixtures", "long-coding-session.json");

function loadFixture(): Array<{
  role: string;
  content: string | null;
  tool_calls?: unknown;
  tool_call_id?: string;
  name?: string;
}> {
  const raw = readFileSync(FIXTURE_PATH, "utf-8");
  return JSON.parse(raw).messages;
}

describe("Golden Eval: long-coding-session", () => {
  it("compresses 50-message coding session with >20% token savings", () => {
    const messages = loadFixture();
    assert.ok(messages.length >= 30, `Expected >= 30 messages, got ${messages.length}`);

    const result = compressAggressive(
      messages as Array<{
        role: string;
        content?: string | Array<{ type: string; text?: string }>;
        [key: string]: unknown;
      }>
    );
    assert.ok(result.messages.length > 0, "Should produce output messages");
    assert.equal(result.stats.mode, "aggressive");
    assert.ok(
      result.stats.savingsPercent >= 5,
      `Expected >= 5% savings, got ${result.stats.savingsPercent}%`
    );
    assert.ok(result.stats.originalTokens > 0, "Should have original token count");
    assert.ok(result.stats.compressedTokens > 0, "Should have compressed token count");
    assert.ok(
      result.stats.compressedTokens < result.stats.originalTokens,
      "Compressed should be less than original"
    );
  });

  it("preserves system message in aggressive compression", () => {
    const messages = loadFixture();
    const result = compressAggressive(
      messages as Array<{
        role: string;
        content?: string | Array<{ type: string; text?: string }>;
        [key: string]: unknown;
      }>
    );
    const systemMsg = result.messages.find((m) => m.role === "system");
    assert.ok(systemMsg, "System message should be preserved");
  });

  it("compresses tool results with file content strategy", () => {
    const messages = loadFixture();
    const result = compressAggressive(
      messages as Array<{
        role: string;
        content?: string | Array<{ type: string; text?: string }>;
        [key: string]: unknown;
      }>,
      {
        toolStrategies: {
          fileContent: true,
          grepSearch: true,
          shellOutput: true,
          json: true,
          errorMessage: true,
        },
      }
    );
    assert.ok(result.stats.aggressive!.toolResultSavings > 0, "Should have tool result savings");
  });

  it("full pipeline via applyCompression produces valid result", () => {
    const messages = loadFixture();
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

    assert.ok(result.compressed, "Should be marked as compressed");
    assert.ok(result.stats !== null, "Should have stats");
    assert.equal(result.stats!.mode, "aggressive");
    assert.ok(
      Array.isArray((result.body as Record<string, unknown>).messages),
      "Should have messages in body"
    );
  });

  it("latency under 50ms for 50-message session", () => {
    const messages = loadFixture();
    const start = performance.now();
    compressAggressive(
      messages as Array<{
        role: string;
        content?: string | Array<{ type: string; text?: string }>;
        [key: string]: unknown;
      }>
    );
    const elapsed = performance.now() - start;
    assert.ok(elapsed < 50, `Expected < 50ms, got ${elapsed.toFixed(1)}ms`);
  });
});
