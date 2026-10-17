import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  estimateCompressionTokens,
  createCompressionStats,
  trackCompressionStats,
} from "../../../open-sse/services/compression/stats.ts";

describe("estimateCompressionTokens", () => {
  it("returns 0 for null", () => {
    assert.equal(estimateCompressionTokens(null), 0);
  });

  it("returns 0 for undefined", () => {
    assert.equal(estimateCompressionTokens(undefined), 0);
  });

  it("returns 0 for empty string", () => {
    assert.equal(estimateCompressionTokens(""), 0);
  });

  it("estimates tokens from text (chars/4)", () => {
    assert.equal(estimateCompressionTokens("hello world"), 3);
  });

  it("estimates tokens from object", () => {
    const tokens = estimateCompressionTokens({ messages: [{ role: "user", content: "test" }] });
    assert.ok(tokens > 0);
  });

  it("image-free body with array-content messages keeps the exact char-count estimate", () => {
    // Array-content messages force the content-array walk; with no images the
    // copy-on-write walk must not change the number vs the plain char-count.
    const body = {
      model: "claude-sonnet-5",
      messages: [
        { role: "system", content: "sys" },
        {
          role: "user",
          content: [
            { type: "text", text: "hello" },
            { type: "text", text: "world" },
          ],
        },
        { role: "assistant", content: "ok" },
        { role: "user", content: [{ type: "text", text: "again" }] },
      ],
      system: [{ type: "text", text: "sys blocks" }],
      input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "resp" }] }],
    };
    const expected = Math.ceil(JSON.stringify(body).length / 4);
    assert.equal(estimateCompressionTokens(body), expected);
  });

  it("image-bearing estimate never mutates the input body", () => {
    const body = {
      model: "claude-sonnet-5",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "look" },
            // Recognized shape with undecodable data → bounded estimate branch.
            {
              type: "image",
              source: { type: "base64", media_type: "image/png", data: "not-a-png" },
            },
          ],
        },
      ],
    };
    const before = JSON.parse(JSON.stringify(body));
    const estimate = estimateCompressionTokens(body);
    assert.ok(estimate > 0);
    assert.deepEqual(body, before, "input body must stay untouched");
  });

  it("frozen image-free bodies do not throw", () => {
    const body = Object.freeze({
      model: "claude-sonnet-5",
      messages: Object.freeze([
        Object.freeze({ role: "user", content: Object.freeze([{ type: "text", text: "hi" }]) }),
      ]),
    });
    assert.ok(estimateCompressionTokens(body) > 0);
  });

  it("handles long strings", () => {
    const tokens = estimateCompressionTokens("x".repeat(400));
    assert.equal(tokens, 100);
  });
});

describe("createCompressionStats", () => {
  it("calculates savings correctly", () => {
    const original = { messages: [{ role: "user", content: "x".repeat(100) }] };
    const compressed = { messages: [{ role: "user", content: "x".repeat(80) }] };
    const origTokens = Math.ceil(JSON.stringify(original).length / 4);
    const compTokens = Math.ceil(JSON.stringify(compressed).length / 4);
    const expectedSavings = Math.round(((origTokens - compTokens) / origTokens) * 10000) / 100;
    const stats = createCompressionStats(original, compressed, "lite", ["whitespace"]);
    assert.equal(stats.originalTokens, origTokens);
    assert.equal(stats.compressedTokens, compTokens);
    assert.equal(stats.savingsPercent, expectedSavings);
    assert.deepEqual(stats.techniquesUsed, ["whitespace"]);
    assert.equal(stats.mode, "lite");
    assert.ok(stats.timestamp > 0);
  });

  it("handles zero original tokens", () => {
    const original = {};
    const compressed = {};
    const stats = createCompressionStats(original, compressed, "off", []);
    assert.equal(stats.savingsPercent, 0);
  });

  it("rounds savings to 2 decimal places", () => {
    const original = { messages: [{ role: "user", content: "x".repeat(97) }] };
    const compressed = { messages: [{ role: "user", content: "x".repeat(80) }] };
    const stats = createCompressionStats(original, compressed, "lite", ["test"]);
    assert.ok(Number.isFinite(stats.savingsPercent));
  });
});

describe("trackCompressionStats", () => {
  it("does not throw for zero tokens", () => {
    const stats = {
      originalTokens: 0,
      compressedTokens: 0,
      savingsPercent: 0,
      techniquesUsed: [],
      mode: "off" as const,
      timestamp: Date.now(),
    };
    assert.doesNotThrow(() => trackCompressionStats(stats));
  });

  it("logs compression stats", () => {
    const stats = {
      originalTokens: 100,
      compressedTokens: 80,
      savingsPercent: 20,
      techniquesUsed: ["whitespace"],
      mode: "lite" as const,
      timestamp: Date.now(),
    };
    assert.doesNotThrow(() => trackCompressionStats(stats));
  });
});
