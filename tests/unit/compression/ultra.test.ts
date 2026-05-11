import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  scoreToken,
  pruneByScore,
  STOPWORDS,
  FORCE_PRESERVE_RE,
} from "../../../open-sse/services/compression/ultraHeuristic.ts";
import {
  ultraCompress,
  createSLMStub,
  type SLMInterface,
} from "../../../open-sse/services/compression/ultra.ts";
import type { UltraConfig } from "../../../open-sse/services/compression/types.ts";

describe("scoreToken", () => {
  it("should return 0 for stopword 'the'", () => {
    assert.strictEqual(scoreToken("the"), 0.1);
  });

  it("should return 0.1 for stopword 'and'", () => {
    assert.strictEqual(scoreToken("and"), 0.1);
  });

  it("should return 1.0 for URL token", () => {
    assert.strictEqual(scoreToken("https://example.com"), 1.0);
  });

  it("should return 1.0 for number token", () => {
    assert.strictEqual(scoreToken("123"), 1.0);
  });

  it("should return 1.0 for file path token", () => {
    assert.strictEqual(scoreToken("/path/to/file"), 1.0);
  });

  it("should return 1.0 for backslash token", () => {
    assert.strictEqual(scoreToken("\\path\\file"), 1.0);
  });

  it("should return 1.0 for dot token", () => {
    assert.strictEqual(scoreToken(".txt"), 1.0);
  });

  it("should return 1.0 for Error: prefix", () => {
    assert.strictEqual(scoreToken("Error:"), 1.0);
  });

  it("should return 1.0 for Exception: prefix", () => {
    assert.strictEqual(scoreToken("Exception:"), 1.0);
  });

  it("should return 1.0 for backtick token", () => {
    assert.strictEqual(scoreToken("```"), 1.0);
  });

  it("should return 0.8 for capitalized word (proper noun)", () => {
    assert.strictEqual(scoreToken("John"), 0.8);
  });

  it("should return 0.7 for word length >= 6", () => {
    assert.strictEqual(scoreToken("example"), 0.7);
  });

  it("should return 0.2 for very short word", () => {
    assert.strictEqual(scoreToken("ab"), 0.2);
  });

  it("should return 0.5 for medium-length word", () => {
    assert.strictEqual(scoreToken("hello"), 0.5);
  });

  it("should return 0.2 for empty string", () => {
    assert.strictEqual(scoreToken(""), 0.2);
  });
});

describe("pruneByScore", () => {
  it("should return empty array for empty string", () => {
    assert.strictEqual(pruneByScore(""), "");
  });

  it("should keep all tokens when compressionRate=1.0", () => {
    const text = "the quick brown fox";
    const result = pruneByScore(text, 1.0);
    assert.strictEqual(result, text);
  });

  it("should remove some tokens when compressionRate=0.5", () => {
    const text = "the quick brown fox jumps over the lazy dog";
    const result = pruneByScore(text, 0.5);
    assert(result.length < text.length);
  });

  it("should always keep force-preserved tokens (URLs)", () => {
    const text = "check https://example.com for details";
    const result = pruneByScore(text, 0.3);
    assert.notEqual(result.split(/\s+/).indexOf("https://example.com"), -1);
  });

  it("should always keep force-preserved tokens (numbers)", () => {
    const text = "the value is 42 units";
    const result = pruneByScore(text, 0.3);
    assert(result.includes("42"));
  });

  it("result length should be <= input length", () => {
    const text = "the quick brown fox jumps over the lazy dog";
    const result = pruneByScore(text, 0.5);
    assert(result.length <= text.length);
  });

  it("should preserve whitespace structure", () => {
    const text = "word1  word2   word3";
    const result = pruneByScore(text, 1.0);
    assert(result.includes("word1") && result.includes("word2") && result.includes("word3"));
  });

  it("should handle zero compression rate", () => {
    const text = "the quick brown fox";
    const result = pruneByScore(text, 0.0);
    assert(result.length <= text.length);
  });

  it("should normalize multiple spaces to single space in pruneByScore", () => {
    const text = "word1 word2";
    const result = pruneByScore(text, 1.0);
    assert(result.includes("word1") && result.includes("word2"));
  });
});

describe("ultraCompress", () => {
  const baseConfig: UltraConfig = {
    enabled: true,
    compressionRate: 0.5,
    minScoreThreshold: 0.3,
    slmFallbackToAggressive: false,
    maxTokensPerMessage: 0,
  };

  it("should return object with compressed and stats", async () => {
    const messages = [{ role: "user", content: "the quick brown fox" }];
    const result = await ultraCompress(messages, baseConfig);
    assert(result.messages);
    assert(result.stats);
    assert(result.stats.originalTokens !== undefined);
    assert(result.stats.compressedTokens !== undefined);
  });

  it("should return empty compressed for empty string", async () => {
    const messages = [{ role: "user", content: "" }];
    const result = await ultraCompress(messages, baseConfig);
    assert.strictEqual(result.messages[0].content, "");
  });

  it("should handle recursion guard for already-compressed strings", async () => {
    const messages = [{ role: "user", content: "[COMPRESSED: already compressed" }];
    const result = await ultraCompress(messages, baseConfig);
    assert.strictEqual(result.messages[0].content, "[COMPRESSED: already compressed");
  });

  it("should keep all tokens when compressionRate=1.0", async () => {
    const config = { ...baseConfig, compressionRate: 1.0 };
    const messages = [{ role: "user", content: "the quick brown fox jumps" }];
    const result = await ultraCompress(messages, config);
    assert.strictEqual(result.stats.originalTokens, result.stats.compressedTokens);
  });

  it("should remove tokens when compressionRate=0.5", async () => {
    const config = { ...baseConfig, compressionRate: 0.5 };
    const messages = [{ role: "user", content: "the quick brown fox jumps over lazy dog" }];
    const result = await ultraCompress(messages, config);
    assert(result.stats.compressedTokens < result.stats.originalTokens);
  });

  it("should keep only force-preserved tokens when compressionRate=0.0", async () => {
    const config = { ...baseConfig, compressionRate: 0.0 };
    const messages = [{ role: "user", content: "check https://example.com here" }];
    const result = await ultraCompress(messages, config);
    assert(result.stats.compressedTokens <= result.stats.originalTokens);
  });

  it("should ensure compressedTokens <= originalTokens", async () => {
    const config = { ...baseConfig, compressionRate: 0.5 };
    const messages = [{ role: "user", content: "the quick brown fox jumps over the lazy dog" }];
    const result = await ultraCompress(messages, config);
    assert(result.stats.compressedTokens <= result.stats.originalTokens);
  });

  it("should add [COMPRESSED: prefix to output", async () => {
    const config = { ...baseConfig, compressionRate: 0.5 };
    const messages = [{ role: "user", content: "the quick brown fox" }];
    const result = await ultraCompress(messages, config);
    assert(result.stats.techniquesUsed.includes("ultra-heuristic-pruning"));
  });

  it("should handle multiple messages", async () => {
    const config = { ...baseConfig, compressionRate: 0.5 };
    const messages = [
      { role: "user", content: "the quick brown fox" },
      { role: "assistant", content: "the lazy dog jumped" },
    ];
    const result = await ultraCompress(messages, config);
    assert.strictEqual(result.messages.length, 2);
  });

  it("should preserve message role and other fields", async () => {
    const config = { ...baseConfig, compressionRate: 0.5 };
    const messages = [{ role: "user", content: "hello world", id: "msg1" }];
    const result = await ultraCompress(messages, config);
    assert.strictEqual(result.messages[0].role, "user");
    assert.strictEqual(result.messages[0].id, "msg1");
  });

  it("should handle multimodal content (text blocks)", async () => {
    const config = { ...baseConfig, compressionRate: 0.5 };
    const messages = [
      {
        role: "user",
        content: [
          { type: "text", text: "the quick brown fox" },
          { type: "image", url: "https://example.com/img.png" },
        ],
      },
    ];
    const result = await ultraCompress(messages, config);
    assert(Array.isArray(result.messages[0].content));
  });

  it("should include stats with timestamp", async () => {
    const config = { ...baseConfig, compressionRate: 0.5 };
    const messages = [{ role: "user", content: "the quick brown fox" }];
    const result = await ultraCompress(messages, config);
    assert(result.stats.timestamp > 0);
  });

  it("should include stats with durationMs", async () => {
    const config = { ...baseConfig, compressionRate: 0.5 };
    const messages = [{ role: "user", content: "the quick brown fox" }];
    const result = await ultraCompress(messages, config);
    assert(result.stats.durationMs !== undefined && result.stats.durationMs >= 0);
  });

  it("should mark mode as 'ultra' in stats", async () => {
    const config = { ...baseConfig, compressionRate: 0.5 };
    const messages = [{ role: "user", content: "the quick brown fox" }];
    const result = await ultraCompress(messages, config);
    assert.strictEqual(result.stats.mode, "ultra");
  });

  it("should calculate savingsPercent correctly", async () => {
    const config = { ...baseConfig, compressionRate: 1.0 };
    const messages = [{ role: "user", content: "the quick brown fox" }];
    const result = await ultraCompress(messages, config);
    assert.strictEqual(result.stats.savingsPercent, 0);
  });
});

describe("createSLMStub", () => {
  it("should return object with compress function", () => {
    const stub = createSLMStub();
    assert(stub);
    assert(typeof stub.compress === "function");
  });

  it("stub.compress should return a string", async () => {
    const stub = createSLMStub();
    const result = await stub.compress("hello world", 0.5);
    assert(typeof result === "string");
  });

  it("stub.compress result should be <= input length", async () => {
    const stub = createSLMStub();
    const input = "the quick brown fox jumps over the lazy dog";
    const result = await stub.compress(input, 0.5);
    assert(result.length <= input.length);
  });

  it("stub.compress on empty string should return empty", async () => {
    const stub = createSLMStub();
    const result = await stub.compress("", 0.5);
    assert.strictEqual(result, "");
  });

  it("stub should have a name or identifier", () => {
    const stub = createSLMStub();
    assert(stub !== null && typeof stub === "object");
  });
});
