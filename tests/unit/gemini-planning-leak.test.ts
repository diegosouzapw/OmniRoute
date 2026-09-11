import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  isPlanningLeakPrefix,
  splitLeadingJsonObject,
  consumePlanningLeak,
  GeminiPlanningLeakFilter,
} from "../../open-sse/utils/geminiPlanningLeak.ts";
import { geminiToOpenAIResponse } from "../../open-sse/translator/response/gemini-to-openai.ts";

describe("Part C - Antigravity Gemini planning-JSON leak stripping", () => {
  it("detects planning leak prefix accurately", () => {
    assert.equal(isPlanningLeakPrefix('{"thought": "planning..."}'), true);
    assert.equal(isPlanningLeakPrefix('  {  "thought": "abc"'), true);
    assert.equal(isPlanningLeakPrefix('{ "thoug'), true);
    assert.equal(isPlanningLeakPrefix('{"answer": "value"}'), false);
    assert.equal(isPlanningLeakPrefix("Just normal text"), false);
    assert.equal(isPlanningLeakPrefix("{"), true);
  });

  it("splits leading json object cleanly", () => {
    const split = splitLeadingJsonObject('{"thought":"test"}\nActual response');
    assert.ok(split);
    assert.equal(split.jsonText, '{"thought":"test"}');
    assert.equal(split.rest, "\nActual response");
  });

  it("consumePlanningLeak handles complete leak, incomplete buffer, and plain text", () => {
    const leak = consumePlanningLeak('{"thought":"planning..."}\nVisible text', false);
    assert.deepEqual(leak, { kind: "leak", visibleText: "\nVisible text" });

    const incomplete = consumePlanningLeak('{"thought":"incomplete', false);
    assert.deepEqual(incomplete, { kind: "incomplete" });

    const finalIncomplete = consumePlanningLeak('{"thought":"never-closed', true);
    assert.deepEqual(finalIncomplete, { kind: "leak", visibleText: "" });

    const plain = consumePlanningLeak('{"answer":"hello"}', false);
    assert.deepEqual(plain, { kind: "plain", visibleText: '{"answer":"hello"}' });

    // Numeric thought is not a leak
    const numericThought = consumePlanningLeak('{"thought":123}', false);
    assert.deepEqual(numericThought, { kind: "plain", visibleText: '{"thought":123}' });

    // Malformed JSON is not a leak
    const malformed = consumePlanningLeak('{"thought": unbalanced "quote"}\nReal text', false);
    assert.deepEqual(malformed, {
      kind: "plain",
      visibleText: '{"thought": unbalanced "quote"}\nReal text',
    });
  });

  it("GeminiPlanningLeakFilter buffers and strips leading leak across chunks", () => {
    const filter = new GeminiPlanningLeakFilter();
    assert.equal(filter.feed('{"thought":'), "");
    assert.equal(filter.feed('"doing some thinking"}\n'), "\n");
    assert.equal(filter.feed("Hello world"), "Hello world");
    assert.equal(filter.feed(" more text"), " more text");
    assert.equal(filter.flush(), "");
  });

  it("geminiToOpenAIResponse strips leading planning leak on gemini flash models", () => {
    const state: Record<string, unknown> = {
      messageId: "test-msg-1",
      model: "gemini-2.5-flash",
      toolCalls: new Map(),
      functionIndex: 0,
    };

    const chunk1 = {
      candidates: [
        {
          content: {
            parts: [{ text: '{"thought":"planning something"}\nHello world' }],
          },
        },
      ],
    };

    const result1 = geminiToOpenAIResponse(
      chunk1,
      state as unknown as Parameters<typeof geminiToOpenAIResponse>[1]
    );
    assert.ok(result1);
    // Should contain assistant role and Hello world without {"thought":...}
    const textDeltas = result1
      .map(
        (r: { choices?: Array<{ delta?: { content?: string } }> }) => r.choices?.[0]?.delta?.content
      )
      .filter(Boolean);
    assert.equal(textDeltas.join(""), "\nHello world");
  });

  it("geminiToOpenAIResponse preserves JSON and plain text on non-flash models or when no thought key", () => {
    // Non-flash model
    const nonFlashState: Record<string, unknown> = {
      messageId: "test-msg-2",
      model: "gemini-2.5-pro",
      toolCalls: new Map(),
      functionIndex: 0,
    };
    const chunkNonFlash = {
      candidates: [
        {
          content: {
            parts: [{ text: '{"thought":"planning something"}\nHello world' }],
          },
        },
      ],
    };
    const resultNonFlash = geminiToOpenAIResponse(
      chunkNonFlash,
      nonFlashState as unknown as Parameters<typeof geminiToOpenAIResponse>[1]
    );
    assert.ok(resultNonFlash);
    const nonFlashTexts = resultNonFlash
      .map(
        (r: { choices?: Array<{ delta?: { content?: string } }> }) => r.choices?.[0]?.delta?.content
      )
      .filter(Boolean);
    assert.equal(nonFlashTexts.join(""), '{"thought":"planning something"}\nHello world');

    // Flash model but normal JSON without thought key
    const flashJsonState: Record<string, unknown> = {
      messageId: "test-msg-3",
      model: "gemini-2.5-flash",
      toolCalls: new Map(),
      functionIndex: 0,
    };
    const chunkJson = {
      candidates: [
        {
          content: {
            parts: [{ text: '{"response":"hello"}' }],
          },
        },
      ],
    };
    const resultJson = geminiToOpenAIResponse(
      chunkJson,
      flashJsonState as unknown as Parameters<typeof geminiToOpenAIResponse>[1]
    );
    assert.ok(resultJson);
    const jsonTexts = resultJson
      .map(
        (r: { choices?: Array<{ delta?: { content?: string } }> }) => r.choices?.[0]?.delta?.content
      )
      .filter(Boolean);
    assert.equal(jsonTexts.join(""), '{"response":"hello"}');
  });
});
