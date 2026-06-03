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

    const first = JSON.parse(chunks[0]);
    assert.equal(first.object, "chat.completion.chunk");
    assert.equal(first.model, "mock-reasoner");
    assert.equal(first.choices[0].delta.role, "assistant");
    assert.equal(first.choices[0].delta.content, "HI there");
    assert.equal(first.choices[0].delta.reasoning_content, "thinking...");

    const finishChunk = JSON.parse(chunks[1]);
    assert.equal(finishChunk.choices[0].finish_reason, "stop");
    assert.deepEqual(finishChunk.usage, { prompt_tokens: 7, completion_tokens: 3, total_tokens: 10 });
  });

  test("content-only completion converts without a reasoning_content delta", () => {
    const sse = synthesizeOpenAiSseFromJson(
      JSON.stringify({ choices: [{ message: { role: "assistant", content: "ok" } }] })
    );
    const first = JSON.parse(parseDataChunks(sse)[0]);
    assert.equal(first.choices[0].delta.content, "ok");
    assert.equal("reasoning_content" in first.choices[0].delta, false);
  });

  test("forwards tool_calls in the delta", () => {
    const sse = synthesizeOpenAiSseFromJson(
      JSON.stringify({
        choices: [
          {
            message: {
              role: "assistant",
              tool_calls: [{ id: "t1", type: "function", function: { name: "f", arguments: "{}" } }],
            },
            finish_reason: "tool_calls",
          },
        ],
      })
    );
    const first = JSON.parse(parseDataChunks(sse)[0]);
    assert.equal(first.choices[0].delta.tool_calls[0].id, "t1");
  });

  test("returns empty string for non-completion JSON / invalid JSON", () => {
    assert.equal(synthesizeOpenAiSseFromJson('{"error":{"message":"x"}}'), "");
    assert.equal(synthesizeOpenAiSseFromJson("{not json"), "");
    assert.equal(synthesizeOpenAiSseFromJson('{"choices":[]}'), "");
    assert.equal(synthesizeOpenAiSseFromJson("[]"), "");
  });
});
