import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  extractPreservedBlocks,
  restorePreservedBlocks,
  shouldPreserve,
} from "../../../open-sse/services/compression/preservation.ts";

describe("preservation", () => {
  it("should extract and restore code blocks", () => {
    const code = "const x = 42;\nconsole.log(x);";
    const text = `Please fix this:\n\`\`\`js\n${code}\n\`\`\`\nThanks!`;
    const { text: extracted, blocks } = extractPreservedBlocks(text);
    assert.ok(!extracted.includes(code), "Code should be replaced with placeholder");
    assert.ok(blocks.length > 0, "Should have preserved blocks");
    const restored = restorePreservedBlocks(extracted, blocks);
    assert.equal(restored, text, "Should restore to original");
  });

  it("should preserve URLs", () => {
    const url = "https://example.com/api/v1/users";
    const text = `Check ${url} please`;
    const { text: extracted, blocks } = extractPreservedBlocks(text);
    const restored = restorePreservedBlocks(extracted, blocks);
    assert.equal(restored, text, "URL should be preserved");
  });

  it("should preserve file paths", () => {
    const path = "/src/utils/helper.ts";
    const text = `Fix the file ${path} please`;
    const { text: extracted, blocks } = extractPreservedBlocks(text);
    const restored = restorePreservedBlocks(extracted, blocks);
    assert.ok(restored.includes(path), "Path should be preserved");
  });

  it("should preserve error messages", () => {
    const text = "I got TypeError: Cannot read property of undefined";
    const { blocks } = extractPreservedBlocks(text);
    assert.ok(
      blocks.some((b) => b.content.includes("TypeError")),
      "Error should be preserved"
    );
  });

  it("shouldPreserve matches user patterns", () => {
    assert.ok(shouldPreserve("my-secret-key", [/secret/i]));
    assert.ok(!shouldPreserve("hello world", [/secret/i]));
  });

  it("should handle nested code blocks and URLs", () => {
    const text = "See https://docs.example.com for:\n```\nfetch('https://api.example.com')\n```";
    const { text: extracted, blocks } = extractPreservedBlocks(text);
    const restored = restorePreservedBlocks(extracted, blocks);
    assert.equal(restored, text);
  });

  it("should handle empty text", () => {
    const { text, blocks } = extractPreservedBlocks("");
    assert.equal(text, "");
    assert.equal(blocks.length, 0);
  });

  it("should handle text with nothing to preserve", () => {
    const text = "Just regular text here";
    const { text: extracted, blocks } = extractPreservedBlocks(text);
    assert.equal(blocks.length, 0);
    assert.equal(extracted, text);
  });
});
