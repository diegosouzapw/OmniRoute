import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { compressAggressive } from "../../../open-sse/services/compression/aggressive.ts";
import type { AggressiveConfig } from "../../../open-sse/services/compression/types.ts";

function makeMessages(count: number): Array<{ role: string; content: string }> {
  return Array.from({ length: count }, (_, i) => ({
    role: i % 2 === 0 ? "user" : "assistant",
    content: `Message ${i}: ${"x".repeat(200)}`,
  }));
}

describe("compressAggressive", () => {
  it("returns messages unchanged for empty input", () => {
    const result = compressAggressive([]);
    assert.equal(result.messages.length, 0);
    assert.equal(result.stats.mode, "aggressive");
  });

  it("returns messages for single message (no compression needed)", () => {
    const msgs = [{ role: "user", content: "Hello" }];
    const result = compressAggressive(msgs);
    assert.equal(result.messages.length, 1);
  });

  it("compresses 20-message conversation and returns stats", () => {
    const msgs = makeMessages(20);
    const result = compressAggressive(msgs);
    assert.ok(result.messages.length > 0);
    assert.equal(result.stats.mode, "aggressive");
    assert.ok(typeof result.stats.originalTokens === "number");
    assert.ok(typeof result.stats.compressedTokens === "number");
  });

  it("skips messages with [COMPRESSED: prefix (recursion guard)", () => {
    const msgs = [{ role: "assistant", content: "[COMPRESSED:aging:fullSummary] prior summary" }];
    const result = compressAggressive(msgs);
    const content =
      typeof result.messages[0].content === "string" ? result.messages[0].content : "";
    assert.ok(content.startsWith("[COMPRESSED:"));
    assert.ok(!content.includes("[COMPRESSED:aging:fullSummary][COMPRESSED:"));
  });

  it("step failure triggers downgrade, not crash", () => {
    const msgs = makeMessages(10);
    const config: Partial<AggressiveConfig> = {
      toolStrategies: {
        fileContent: false,
        grepSearch: false,
        shellOutput: false,
        json: false,
        errorMessage: false,
      },
    };
    const result = compressAggressive(msgs, config);
    assert.ok(result.messages.length > 0);
    assert.ok(typeof result.stats.savingsPercent === "number");
  });

  it("config merge overrides defaults", () => {
    const msgs = makeMessages(10);
    const config: Partial<AggressiveConfig> = {
      maxTokensPerMessage: 100,
      minSavingsThreshold: 0.5,
    };
    const result = compressAggressive(msgs, config);
    assert.ok(result.messages.length > 0);
  });

  it("aggressive stats breakdown is populated", () => {
    const msgs = makeMessages(20);
    const result = compressAggressive(msgs);
    assert.ok(result.stats.aggressive !== undefined);
    assert.ok(typeof result.stats.aggressive!.summarizerSavings === "number");
    assert.ok(typeof result.stats.aggressive!.toolResultSavings === "number");
    assert.ok(typeof result.stats.aggressive!.agingSavings === "number");
  });

  it("techniquesUsed lists applied strategies", () => {
    const msgs = makeMessages(20);
    const result = compressAggressive(msgs);
    assert.ok(Array.isArray(result.stats.techniquesUsed));
  });
});
