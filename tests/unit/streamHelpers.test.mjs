import { describe, it } from "node:test";
import assert from "node:assert";
import { hasValuableContent, unwrapGeminiChunk } from "../../open-sse/utils/streamHelpers.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

describe("hasValuableContent", () => {
  describe("OpenAI format", () => {
    it("returns true for content with text", () => {
      const chunk = { choices: [{ delta: { content: "Hello" } }] };
      assert.strictEqual(hasValuableContent(chunk, FORMATS.OPENAI), true);
    });

    it("returns false for empty delta", () => {
      const chunk = { choices: [{ delta: {} }] };
      assert.strictEqual(hasValuableContent(chunk, FORMATS.OPENAI), false);
    });

    it("returns false for delta with empty string content", () => {
      const chunk = { choices: [{ delta: { content: "" } }] };
      assert.strictEqual(hasValuableContent(chunk, FORMATS.OPENAI), false);
    });

    it("returns true for reasoning_content", () => {
      const chunk = { choices: [{ delta: { reasoning_content: "thinking" } }] };
      assert.strictEqual(hasValuableContent(chunk, FORMATS.OPENAI), true);
    });

    it("returns true for finish_reason", () => {
      const chunk = { choices: [{ delta: {}, finish_reason: "stop" }] };
      assert.strictEqual(hasValuableContent(chunk, FORMATS.OPENAI), true);
    });

    it("returns true for role delta", () => {
      const chunk = { choices: [{ delta: { role: "assistant" } }] };
      assert.strictEqual(hasValuableContent(chunk, FORMATS.OPENAI), true);
    });
  });

  describe("Claude format", () => {
    it("returns true for content_block_delta with text", () => {
      const chunk = { type: "content_block_delta", delta: { text: "Hello" } };
      assert.strictEqual(hasValuableContent(chunk, FORMATS.CLAUDE), true);
    });

    it("returns false for empty content_block_delta", () => {
      const chunk = { type: "content_block_delta", delta: {} };
      assert.strictEqual(hasValuableContent(chunk, FORMATS.CLAUDE), false);
    });

    it("returns true for thinking blocks", () => {
      const chunk = { type: "content_block_delta", delta: { thinking: "reasoning" } };
      assert.strictEqual(hasValuableContent(chunk, FORMATS.CLAUDE), true);
    });
  });

  describe("Gemini format", () => {
    it("returns true for content with text", () => {
      const chunk = { candidates: [{ content: { parts: [{ text: "Hello" }] } }] };
      assert.strictEqual(hasValuableContent(chunk, FORMATS.GEMINI), true);
    });

    it("returns false for empty parts", () => {
      const chunk = { candidates: [{ content: { parts: [] } }] };
      assert.strictEqual(hasValuableContent(chunk, FORMATS.GEMINI), false);
    });

    it("returns true for finishReason", () => {
      const chunk = { candidates: [{ finishReason: "STOP" }] };
      assert.strictEqual(hasValuableContent(chunk, FORMATS.GEMINI), true);
    });
  });
});

describe("unwrapGeminiChunk", () => {
  it("returns chunk directly when candidates is at top level (standard Gemini)", () => {
    const chunk = { candidates: [{ content: { parts: [{ text: "Hi" }] } }], usageMetadata: {} };
    const result = unwrapGeminiChunk(chunk);
    assert.strictEqual(result, chunk);
  });

  it("unwraps Cloud Code envelope { response: { candidates: [...] } }", () => {
    const inner = { candidates: [{ content: { parts: [{ text: "Hello" }] } }] };
    const chunk = { response: inner, modelVersion: "gemini-2.5-flash" };
    const result = unwrapGeminiChunk(chunk);
    assert.strictEqual(result, inner);
    assert.deepEqual(result.candidates[0].content.parts[0].text, "Hello");
  });

  it("returns parsed directly when no candidates and no response", () => {
    const chunk = { someOther: "data" };
    const result = unwrapGeminiChunk(chunk);
    assert.strictEqual(result, chunk);
  });

  it("returns parsed when response is null (falsy) — no valid envelope to unwrap", () => {
    const chunk = { response: null, other: "data" };
    const result = unwrapGeminiChunk(chunk);
    assert.strictEqual(result, chunk);
  });

  it("prefers top-level candidates over response when both exist", () => {
    const inner = { candidates: [{ content: { parts: [{ text: "inner" }] } }] };
    const chunk = {
      candidates: [{ content: { parts: [{ text: "outer" }] } }],
      response: inner,
    };
    const result = unwrapGeminiChunk(chunk);
    assert.strictEqual(result, chunk);
    assert.equal(result.candidates[0].content.parts[0].text, "outer");
  });
});
