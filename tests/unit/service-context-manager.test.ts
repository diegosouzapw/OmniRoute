import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/services/contextManager.ts");

describe("contextManager helpers", () => {
  describe("estimateTokens", () => {
    it("estimates tokens from string", () => {
      const tokens = mod.estimateTokens("hello world");
      assert.ok(tokens > 0);
      assert.ok(tokens < 10);
    });

    it("returns 0 for null/undefined", () => {
      assert.equal(mod.estimateTokens(null), 0);
      assert.equal(mod.estimateTokens(undefined), 0);
    });

    it("estimates tokens from object", () => {
      const tokens = mod.estimateTokens({ key: "value" });
      assert.ok(tokens > 0);
    });

    it("handles empty string", () => {
      assert.equal(mod.estimateTokens(""), 0);
    });
  });

  describe("getTokenLimit", () => {
    it("returns a number for known providers", () => {
      const limit = mod.getTokenLimit("openai", "gpt-4");
      assert.ok(limit > 0);
      assert.equal(typeof limit, "number");
    });

    it("returns default limit for unknown provider", () => {
      const limit = mod.getTokenLimit("unknown-provider");
      assert.ok(limit > 0);
    });

    it("uses model hints for known model families", () => {
      const claudeLimit = mod.getTokenLimit("unknown", "claude-3-opus");
      assert.ok(claudeLimit > 0);

      const geminiLimit = mod.getTokenLimit("unknown", "gemini-pro");
      assert.ok(geminiLimit > 0);

      const gptLimit = mod.getTokenLimit("unknown", "gpt-4-turbo");
      assert.ok(gptLimit > 0);
    });
  });

  describe("fixToolPairs", () => {
    it("returns array for valid input", () => {
      const messages = [
        { role: "user", content: "test" },
        { role: "assistant", content: "reply" },
      ];
      const result = mod.fixToolPairs(messages);
      assert.ok(Array.isArray(result));
    });

    it("handles empty array", () => {
      const result = mod.fixToolPairs([]);
      assert.ok(Array.isArray(result));
      assert.equal(result.length, 0);
    });
  });

  describe("fixToolAdjacency", () => {
    it("returns array for valid input", () => {
      const messages = [
        { role: "user", content: "test" },
        { role: "assistant", content: "reply" },
      ];
      const result = mod.fixToolAdjacency(messages);
      assert.ok(Array.isArray(result));
    });

    it("preserves message order for non-tool messages", () => {
      const messages = [
        { role: "system", content: "sys" },
        { role: "user", content: "hello" },
        { role: "assistant", content: "hi" },
      ];
      const result = mod.fixToolAdjacency(messages);
      assert.equal(result.length, 3);
      assert.equal(result[0].role, "system");
      assert.equal(result[1].role, "user");
      assert.equal(result[2].role, "assistant");
    });
  });

  describe("compressContext", () => {
    it("returns unchanged body for null/missing messages", () => {
      const result = mod.compressContext({});
      assert.equal(result.compressed, false);
    });

    it("returns unchanged body for null body", () => {
      const result = mod.compressContext(null as any);
      assert.equal(result.compressed, false);
    });

    it("processes valid messages array", () => {
      const body = { messages: [{ role: "user", content: "hello" }] };
      const result = mod.compressContext(body);
      assert.ok(result.body);
      assert.ok(Array.isArray(result.body.messages));
    });
  });
});
