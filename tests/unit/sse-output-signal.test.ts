import test from "node:test";
import assert from "node:assert/strict";

import { sseChunkCarriesOutput } from "../../open-sse/utils/sseOutputSignal.ts";

// TTFT is measured to the first SSE chunk that carries output the user can see
// (text, reasoning or a tool call), in whatever format the client receives.

const data = (event: unknown) => `data: ${JSON.stringify(event)}\n\n`;
const sse = (type: string, payload: Record<string, unknown>) =>
  `event: ${type}\ndata: ${JSON.stringify({ type, ...payload })}\n\n`;
const chat = (delta: Record<string, unknown>) =>
  data({ object: "chat.completion.chunk", choices: [{ index: 0, delta, finish_reason: null }] });

test("OpenAI chat chunks: content, reasoning and tool calls count; role-only and keepalive do not", () => {
  assert.equal(sseChunkCarriesOutput(chat({ role: "assistant", content: "" })), false);
  assert.equal(sseChunkCarriesOutput(chat({})), false);
  assert.equal(
    sseChunkCarriesOutput(
      data({ id: "chatcmpl-keepalive", model: "keepalive", choices: [{ index: 0, delta: {} }] })
    ),
    false
  );
  assert.equal(sseChunkCarriesOutput(chat({ content: "Hi" })), true);
  assert.equal(sseChunkCarriesOutput(chat({ reasoning_content: "thinking" })), true);
  assert.equal(sseChunkCarriesOutput(chat({ reasoning: "thinking" })), true);
  assert.equal(
    sseChunkCarriesOutput(chat({ tool_calls: [{ index: 0, id: "c", function: { name: "f" } }] })),
    true
  );
  assert.equal(sseChunkCarriesOutput("data: [DONE]\n\n"), false);
});

test("Claude events: deltas and tool_use starts count; lifecycle events and pings do not", () => {
  assert.equal(sseChunkCarriesOutput(sse("ping", {})), false);
  assert.equal(sseChunkCarriesOutput(sse("message_start", { message: { id: "m" } })), false);
  assert.equal(
    sseChunkCarriesOutput(
      sse("content_block_start", { index: 0, content_block: { type: "text", text: "" } })
    ),
    false
  );
  assert.equal(
    sseChunkCarriesOutput(
      sse("content_block_delta", { index: 0, delta: { type: "text_delta", text: "Hi" } })
    ),
    true
  );
  assert.equal(
    sseChunkCarriesOutput(
      sse("content_block_delta", { index: 0, delta: { type: "thinking_delta", thinking: "hm" } })
    ),
    true
  );
  assert.equal(
    sseChunkCarriesOutput(
      sse("content_block_start", {
        index: 1,
        content_block: { type: "tool_use", id: "t", name: "f", input: {} },
      })
    ),
    true
  );
  assert.equal(
    sseChunkCarriesOutput(
      sse("content_block_delta", { index: 0, delta: { type: "signature_delta", signature: "s" } })
    ),
    false
  );
});

test("Responses events: output deltas and tool call items count; lifecycle events do not", () => {
  assert.equal(sseChunkCarriesOutput(sse("response.created", { response: { id: "r" } })), false);
  assert.equal(
    sseChunkCarriesOutput(sse("response.in_progress", { response: { id: "r" } })),
    false
  );
  assert.equal(
    sseChunkCarriesOutput(
      sse("response.output_item.added", { item: { type: "message", role: "assistant" } })
    ),
    false
  );
  assert.equal(sseChunkCarriesOutput(sse("response.output_text.delta", { delta: "Hi" })), true);
  assert.equal(
    sseChunkCarriesOutput(sse("response.reasoning_summary_text.delta", { delta: "thinking" })),
    true
  );
  assert.equal(sseChunkCarriesOutput(sse("response.output_text.delta", { delta: "" })), false);
  assert.equal(
    sseChunkCarriesOutput(
      sse("response.output_item.added", { item: { type: "function_call", name: "f" } })
    ),
    true
  );
});

test("Gemini chunks: text and function calls count", () => {
  assert.equal(
    sseChunkCarriesOutput(data({ candidates: [{ content: { parts: [{ text: "Hi" }] } }] })),
    true
  );
  assert.equal(
    sseChunkCarriesOutput(
      data({ candidates: [{ content: { parts: [{ functionCall: { name: "f" } }] } }] })
    ),
    true
  );
  assert.equal(sseChunkCarriesOutput(data({ candidates: [{ content: { parts: [] } }] })), false);
});

test("Antigravity chunks wrap Gemini candidates in `response`", () => {
  assert.equal(
    sseChunkCarriesOutput(
      data({ response: { candidates: [{ content: { parts: [{ text: "Hi" }] } }] } })
    ),
    true
  );
  assert.equal(
    sseChunkCarriesOutput(data({ response: { candidates: [{ content: { parts: [] } }] } })),
    false
  );
});

test("comments, malformed and multi-event chunks", () => {
  assert.equal(sseChunkCarriesOutput(": keepalive\n\n"), false);
  assert.equal(sseChunkCarriesOutput('data: {"choices":[{"delta":{"content":"H'), false);
  assert.equal(
    sseChunkCarriesOutput(chat({ role: "assistant", content: "" }) + chat({ content: "Hi" })),
    true
  );
});
