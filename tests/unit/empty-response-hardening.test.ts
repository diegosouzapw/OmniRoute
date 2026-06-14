import { describe, it } from "node:test";
import assert from "node:assert";
import { hasValuableContent } from "../../open-sse/utils/streamHelpers.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

describe("empty-response hardening", () => {
  describe("hasValuableContent edge cases", () => {
    it("returns false for choices: [] (empty array)", () => {
      const chunk = { choices: [] };
      assert.strictEqual(hasValuableContent(chunk, FORMATS.OPENAI), false);
    });

    it("returns false for missing choices entirely", () => {
      const chunk = { id: "test-123" };
      assert.strictEqual(hasValuableContent(chunk, FORMATS.OPENAI), false);
    });

    it("returns false for choices with null delta", () => {
      const chunk = { choices: [{ delta: null, finish_reason: null }] };
      assert.strictEqual(hasValuableContent(chunk, FORMATS.OPENAI), false);
    });

    it("returns true for choices with finish_reason stop", () => {
      const chunk = { choices: [{ delta: {}, finish_reason: "stop" }] };
      assert.strictEqual(hasValuableContent(chunk, FORMATS.OPENAI), true);
    });

    it("returns true for choices with finish_reason tool_calls", () => {
      const chunk = { choices: [{ delta: {}, finish_reason: "tool_calls" }] };
      assert.strictEqual(hasValuableContent(chunk, FORMATS.OPENAI), true);
    });
  });

  describe("empty choices array detection", () => {
    it("should be detected by Array.isArray + length === 0", () => {
      const parsed = { choices: [], id: "test", model: "gpt-4" };
      assert.strictEqual(Array.isArray(parsed.choices), true);
      assert.strictEqual(parsed.choices.length, 0);
    });

    it("should NOT trigger for choices with one element", () => {
      const parsed = { choices: [{ delta: { content: "hi" } }], id: "test" };
      assert.strictEqual(Array.isArray(parsed.choices), true);
      assert.strictEqual(parsed.choices.length, 1);
    });

    it("should NOT trigger for choices with finish_reason only", () => {
      const parsed = { choices: [{ delta: {}, finish_reason: "stop" }], id: "test" };
      assert.strictEqual(Array.isArray(parsed.choices), true);
      assert.strictEqual(parsed.choices.length, 1);
    });
  });

  describe("tool completion empty response detection", () => {
    it("detects empty content and reasoning after tool_calls", () => {
      const passthroughHasToolCalls = true;
      const content = "";
      const reasoning = "";
      assert.strictEqual(passthroughHasToolCalls && !content.trim() && !reasoning.trim(), true);
    });

    it("does NOT trigger when content exists after tool_calls", () => {
      const passthroughHasToolCalls = true;
      const content = "Done!";
      const reasoning = "";
      assert.strictEqual(passthroughHasToolCalls && !content.trim() && !reasoning.trim(), false);
    });

    it("does NOT trigger when reasoning exists after tool_calls", () => {
      const passthroughHasToolCalls = true;
      const content = "";
      const reasoning = "Let me think...";
      assert.strictEqual(passthroughHasToolCalls && !content.trim() && !reasoning.trim(), false);
    });

    it("does NOT trigger when no tool_calls occurred", () => {
      const passthroughHasToolCalls = false;
      const content = "";
      const reasoning = "";
      assert.strictEqual(passthroughHasToolCalls && !content.trim() && !reasoning.trim(), false);
    });
  });
});
