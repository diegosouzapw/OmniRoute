import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { synthesizeOpenAiSseFromJson } from "../../open-sse/utils/jsonToSse.ts";

function parseDataChunks(sse: string) {
  return sse
    .split(/\n\n/)
    .map((b) => b.trim())
    .filter((b) => b.startsWith("data:"))
    .map((b) => b.slice(5).trim());
}

describe("synthesizeOpenAiSseFromJson (#3089)", () => {
  test("converts a reasoning chat-completion JSON to SSE preserving content + reasoning_content", () => {
    const body = JSON.stringify({
      id: "mock-1",
      object: "chat.completion",
      created: 123,
      model: "mock-reasoner",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            reasoning_content: "thinking...",
            content: "HI there",
          },
          finish_reason: "stop",
        },
      ],
      usage: { prompt_tokens: 7, completion_tokens: 3, total_tokens: 10 },
    });

    const sse = synthesizeOpenAiSseFromJson(body);
    const chunks = parseDataChunks(sse);

    assert.ok(sse.startsWith("data: "), "must be SSE");
    assert.equal(chunks[chunks.length - 1], "[DONE]", "must terminate with [DONE]");

    const events = chunks.filter((c) => c !== "[DONE]").map((c) => JSON.parse(c));
    const deltas = events.map((e) => e.choices[0].delta);

    assert.equal(events[0].object, "chat.completion.chunk");
    assert.equal(events[0].model, "mock-reasoner");
    assert.equal(deltas[0].role, "assistant", "first delta announces the role");

    // #3089 follow-up: reasoning_content and content are emitted as SEPARATE
    // deltas, each EXACTLY ONCE (no duplication), with reasoning before content.
    const reasoningDeltas = deltas.filter((d) => d.reasoning_content !== undefined);
    const contentDeltas = deltas.filter((d) => d.content !== undefined);
    assert.equal(reasoningDeltas.length, 1, "reasoning_content must appear exactly once");
    assert.equal(contentDeltas.length, 1, "content must appear exactly once");
    assert.equal(reasoningDeltas[0].reasoning_content, "thinking...");
    assert.equal(contentDeltas[0].content, "HI there");
    const reasoningIdx = deltas.findIndex((d) => d.reasoning_content !== undefined);
    const contentIdx = deltas.findIndex((d) => d.content !== undefined);
    assert.ok(reasoningIdx < contentIdx, "reasoning_content delta precedes content delta");

    const finishChunk = events[events.length - 1];
    assert.equal(finishChunk.choices[0].finish_reason, "stop");
    assert.deepEqual(finishChunk.usage, {
      prompt_tokens: 7,
      completion_tokens: 3,
      total_tokens: 10,
    });
  });

  test("content-only completion converts without a reasoning_content delta", () => {
    const sse = synthesizeOpenAiSseFromJson(
      JSON.stringify({ choices: [{ message: { role: "assistant", content: "ok" } }] })
    );
    const deltas = parseDataChunks(sse)
      .filter((c) => c !== "[DONE]")
      .map((c) => JSON.parse(c).choices[0].delta);
    assert.equal(deltas.filter((d) => d.content === "ok").length, 1);
    assert.equal(
      deltas.some((d) => d.reasoning_content !== undefined),
      false
    );
  });

  test("preserves client-readable reasoning alias", () => {
    const sse = synthesizeOpenAiSseFromJson(
      JSON.stringify({
        choices: [
          {
            message: {
              role: "assistant",
              reasoning: "client-readable thinking",
              content: "final text",
            },
          },
        ],
      })
    );
    const deltas = parseDataChunks(sse)
      .filter((c) => c !== "[DONE]")
      .map((c) => JSON.parse(c).choices[0].delta);

    assert.equal(
      deltas.find((d) => d.reasoning !== undefined)?.reasoning,
      "client-readable thinking"
    );
    assert.equal(
      deltas.some((d) => d.reasoning_content !== undefined),
      false
    );
  });

  test("mirrors unsupported reasoning aliases to reasoning_content", () => {
    const sse = synthesizeOpenAiSseFromJson(
      JSON.stringify({
        choices: [
          {
            message: {
              role: "assistant",
              reasoning_text: "alias thinking",
              content: "final text",
            },
          },
        ],
      })
    );
    const deltas = parseDataChunks(sse)
      .filter((c) => c !== "[DONE]")
      .map((c) => JSON.parse(c).choices[0].delta);

    assert.equal(
      deltas.find((d) => d.reasoning_content !== undefined)?.reasoning_content,
      "alias thinking"
    );
  });

  test("forwards tool_calls in the delta", () => {
    const sse = synthesizeOpenAiSseFromJson(
      JSON.stringify({
        choices: [
          {
            message: {
              role: "assistant",
              tool_calls: [
                { id: "t1", type: "function", function: { name: "f", arguments: "{}" } },
              ],
            },
            finish_reason: "tool_calls",
          },
        ],
      })
    );
    const deltas = parseDataChunks(sse)
      .filter((c) => c !== "[DONE]")
      .map((c) => JSON.parse(c).choices[0].delta);
    const toolDelta = deltas.find((d) => Array.isArray(d.tool_calls));
    assert.ok(toolDelta, "a delta must carry tool_calls");
    assert.equal(toolDelta.tool_calls[0].id, "t1");
  });

  test("returns empty string for non-completion JSON / invalid JSON", () => {
    assert.equal(synthesizeOpenAiSseFromJson('{"error":{"message":"x"}}'), "");
    assert.equal(synthesizeOpenAiSseFromJson("{not json"), "");
    assert.equal(synthesizeOpenAiSseFromJson('{"choices":[]}'), "");
    assert.equal(synthesizeOpenAiSseFromJson("[]"), "");
  });
});
