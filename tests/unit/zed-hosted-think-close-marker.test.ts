import test from "node:test";
import assert from "node:assert/strict";

const { __test__ } = await import("../../open-sse/executors/zed-hosted.ts");
const { wrapZedCompletionStream } = __test__;

// zed-hosted's Anthropic backend converts Claude events to OpenAI chunks
// inside the executor (wrapZedCompletionStream → claudeToOpenAIResponse),
// bypassing chatCore's suppressThinkClose wiring. Responses API clients
// receive reasoning as structured items, so the textual `</think>` close
// marker must be suppressed on that path (same policy as chatCore / GLM).

function buildZedAnthropicNdjson(): string {
  const lines = [
    { event: { type: "message_start", message: { id: "msg_zed", model: "claude-test" } } },
    { event: { type: "content_block_start", index: 0, content_block: { type: "thinking" } } },
    {
      event: {
        type: "content_block_delta",
        index: 0,
        delta: { type: "thinking_delta", thinking: "plan" },
      },
    },
    { event: { type: "content_block_stop", index: 0 } },
    { event: { type: "content_block_start", index: 1, content_block: { type: "text", text: "" } } },
    {
      event: { type: "content_block_delta", index: 1, delta: { type: "text_delta", text: "Hi" } },
    },
    { event: { type: "content_block_stop", index: 1 } },
    {
      event: {
        type: "message_delta",
        delta: { stop_reason: "end_turn" },
        usage: { output_tokens: 3 },
      },
    },
    { event: { type: "message_stop" } },
  ];
  return lines.map((l) => JSON.stringify(l)).join("\n") + "\n";
}

async function readAll(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let out = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    out += decoder.decode(value, { stream: true });
  }
  return out;
}

function wrapAnthropic(options?: Record<string, unknown>): Promise<string> {
  const response = new Response(buildZedAnthropicNdjson(), { status: 200 });
  const wrapped = wrapZedCompletionStream(response, "Anthropic", "claude-test", options);
  return readAll(wrapped.body as ReadableStream<Uint8Array>);
}

test("zed anthropic stream keeps the close marker by default (#4633)", async () => {
  const out = await wrapAnthropic();
  assert.ok(out.includes('"content":"</think>"'), "expected default marker emission");
});

test("zed anthropic stream suppresses the close marker when asked", async () => {
  const out = await wrapAnthropic({ suppressThinkClose: true });
  assert.ok(!out.includes("</think>"), "marker must not leak into output");
  assert.ok(out.includes('"content":"Hi"'), "text content still flows");
  assert.ok(out.includes('"reasoning_content":"plan"'), "reasoning still flows");
});
