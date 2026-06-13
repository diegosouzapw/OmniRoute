import test from "node:test";
import assert from "node:assert/strict";

import {
  ensureStreamReadiness,
  hasStreamReadinessSignal,
  hasUsefulStreamContent,
} from "../../open-sse/utils/streamReadiness.ts";

const encoder = new TextEncoder();

function streamFromChunks(chunks: string[], delayMs = 0): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      for (const chunk of chunks) {
        if (delayMs > 0) await new Promise((resolve) => setTimeout(resolve, delayMs));
        controller.enqueue(encoder.encode(chunk));
      }
      controller.close();
    },
  });
}

function delayedClaudeStartStream(): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(
        encoder.encode(
          [
            "event: message_start",
            `data: ${JSON.stringify({
              message: {
                id: "msg_1",
                type: "message",
                role: "assistant",
                model: "claude-sonnet-4-6",
                usage: { input_tokens: 10, output_tokens: 0 },
              },
            })}`,
            "",
            "",
          ].join("\n")
        )
      );

      await new Promise((resolve) => setTimeout(resolve, 30));
      controller.enqueue(
        encoder.encode(
          [
            "event: content_block_delta",
            `data: ${JSON.stringify({
              type: "content_block_delta",
              index: 0,
              delta: { type: "text_delta", text: "slow hello" },
            })}`,
            "",
            "",
          ].join("\n")
        )
      );
      controller.close();
    },
  });
}

function delayedOpenAIResponsesStartStream(): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(
        encoder.encode(
          [
            "event: response.created",
            `data: ${JSON.stringify({
              type: "response.created",
              response: {
                id: "resp_1",
                object: "response",
                created_at: 1_735_000_000,
                status: "in_progress",
              },
            })}`,
            "",
            "",
          ].join("\n")
        )
      );

      await new Promise((resolve) => setTimeout(resolve, 30));
      controller.enqueue(
        encoder.encode(
          [
            "event: response.output_text.delta",
            `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "slow hello" })}`,
            "",
            "",
          ].join("\n")
        )
      );
      controller.close();
    },
  });
}

function delayedChatCompletionStartStream(): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            id: "chatcmpl-glm",
            object: "chat.completion.chunk",
            choices: [{ index: 0, delta: { role: "assistant" } }],
          })}\n\n`
        )
      );

      await new Promise((resolve) => setTimeout(resolve, 30));
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            id: "chatcmpl-glm",
            object: "chat.completion.chunk",
            choices: [{ index: 0, delta: { content: "slow chat hello" } }],
          })}\n\n`
        )
      );
      controller.close();
    },
  });
}

function delayedGeminiStartStream(): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            candidates: [{ content: { parts: [] } }],
          })}\n\n`
        )
      );

      await new Promise((resolve) => setTimeout(resolve, 30));
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            candidates: [{ content: { parts: [{ text: "slow gemini hello" }] } }],
          })}\n\n`
        )
      );
      controller.close();
    },
  });
}

function delayedUnknownStructuredStartStream(): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(
        encoder.encode('event: provider.lifecycle\ndata: {"phase":"started"}\n\n')
      );

      await new Promise((resolve) => setTimeout(resolve, 30));
      controller.enqueue(
        encoder.encode('event: provider.delta\ndata: {"text":"slow unknown hello"}\n\n')
      );
      controller.close();
    },
  });
}

function zombieReadinessStream(): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(encoder.encode(": keepalive\n\n"));
      controller.enqueue(encoder.encode("event: ping\ndata: {}\n\n"));
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({})}\n\n`));
      await new Promise((resolve) => setTimeout(resolve, 30));
      controller.enqueue(encoder.encode(": still-alive\n\n"));
    },
    cancel() {},
  });
}

test("hasUsefulStreamContent ignores keepalives and lifecycle-only chunks", () => {
  assert.equal(hasUsefulStreamContent(": keepalive\n\n"), false);
  assert.equal(hasUsefulStreamContent("event: ping\ndata: {}\n\n"), false);
  assert.equal(
    hasUsefulStreamContent(`data: ${JSON.stringify({ type: "response.created" })}\n\n`),
    false
  );
  assert.equal(
    hasUsefulStreamContent(
      `data: ${JSON.stringify({ choices: [{ delta: { role: "assistant" }, index: 0 }] })}\n\n`
    ),
    false
  );
});

test("hasUsefulStreamContent detects text, reasoning, and tool deltas", () => {
  assert.equal(
    hasUsefulStreamContent(
      `data: ${JSON.stringify({ choices: [{ delta: { content: "hello" }, index: 0 }] })}\n\n`
    ),
    true
  );
  assert.equal(
    hasUsefulStreamContent(
      `data: ${JSON.stringify({ choices: [{ delta: { content: " " }, index: 0 }] })}\n\n`
    ),
    true
  );
  assert.equal(
    hasUsefulStreamContent(
      `data: ${JSON.stringify({ choices: [{ delta: { reasoning_content: "thinking" }, index: 0 }] })}\n\n`
    ),
    true
  );
  assert.equal(
    hasUsefulStreamContent(
      `data: ${JSON.stringify({ choices: [{ delta: { tool_calls: [{ function: { name: "read" } }] }, index: 0 }] })}\n\n`
    ),
    true
  );
  assert.equal(
    hasUsefulStreamContent(
      `data: ${JSON.stringify({ type: "content_block_delta", delta: { text: "hello" } })}\n\n`
    ),
    true
  );
  assert.equal(
    hasUsefulStreamContent(
      `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "hello" })}\n\n`
    ),
    true
  );
  assert.equal(
    hasUsefulStreamContent(
      `data: ${JSON.stringify({ response: { candidates: [{ content: { parts: [{ text: "hello" }] } }] } })}\n\n`
    ),
    true
  );
});

test("hasStreamReadinessSignal accepts any non-ping structured SSE event", () => {
  assert.equal(hasStreamReadinessSignal(": keepalive\n\n"), false);
  assert.equal(hasStreamReadinessSignal("event: ping\ndata: {}\n\n"), false);
  assert.equal(
    hasStreamReadinessSignal(`data: ${JSON.stringify({ type: "response.created" })}\n\n`),
    true
  );
  assert.equal(
    hasStreamReadinessSignal(
      `event: message_start\ndata: ${JSON.stringify({
        type: "message_start",
        message: {
          id: "msg_1",
          type: "message",
          role: "assistant",
          model: "claude-sonnet-4-6",
        },
      })}\n\n`
    ),
    true
  );
  assert.equal(
    hasStreamReadinessSignal(
      `event: message_start\ndata: ${JSON.stringify({
        message: {
          id: "msg_2",
          type: "message",
          role: "assistant",
          model: "claude-sonnet-4-6",
        },
      })}\n\n`
    ),
    true
  );
  assert.equal(
    hasStreamReadinessSignal(
      `event: content_block_start\ndata: ${JSON.stringify({
        index: 0,
        content_block: { type: "text", text: "" },
      })}\n\n`
    ),
    true
  );
  assert.equal(
    hasStreamReadinessSignal('event: provider.lifecycle\ndata: {"phase":"started"}\n\n'),
    true
  );
  assert.equal(hasStreamReadinessSignal('event: ping\ndata: {"phase":"started"}\n\n'), false);
  assert.equal(
    hasStreamReadinessSignal('event: ping\ndata: {"type":"response.created"}\n\n'),
    false
  );
});

test("hasStreamReadinessSignal accepts Responses lifecycle events without schema gating", () => {
  assert.equal(hasStreamReadinessSignal(`data: ${JSON.stringify({})}\n\n`), false);
  assert.equal(
    hasStreamReadinessSignal(`data: ${JSON.stringify({ type: "response.created" })}\n\n`),
    true
  );
  assert.equal(
    hasStreamReadinessSignal(
      `data: ${JSON.stringify({
        type: "response.created",
        response: {
          id: "resp_1",
          object: "response",
          created_at: 1_735_000_000,
          status: "in_progress",
        },
      })}\n\n`
    ),
    true
  );
  assert.equal(
    hasStreamReadinessSignal(
      `event: response.in_progress\ndata: ${JSON.stringify({
        response: { id: "resp_1", status: "in_progress" },
      })}\n\n`
    ),
    true
  );
  assert.equal(
    hasStreamReadinessSignal(
      `event: response.output_item.added\ndata: ${JSON.stringify({
        item: { id: "msg_1", type: "message", content: [{ type: "output_text", text: "" }] },
      })}\n\n`
    ),
    true
  );
});

test("hasStreamReadinessSignal accepts chat completion structural chunks without content gating", () => {
  assert.equal(
    hasStreamReadinessSignal(
      `data: ${JSON.stringify({
        id: "chatcmpl-glm",
        object: "chat.completion.chunk",
        choices: [{ index: 0, delta: { role: "assistant" } }],
      })}\n\n`
    ),
    true
  );
  assert.equal(
    hasStreamReadinessSignal(
      `data: ${JSON.stringify({
        id: "chatcmpl-glm",
        object: "chat.completion.chunk",
        choices: [{ index: 0, delta: { tool_calls: [{ index: 0, id: "call_1" }] } }],
      })}\n\n`
    ),
    true
  );
  assert.equal(
    hasStreamReadinessSignal(
      `data: ${JSON.stringify({
        id: "chatcmpl-glm",
        object: "chat.completion.chunk",
        choices: [{ index: 0, delta: { function_call: { name: "read_file" } } }],
      })}\n\n`
    ),
    true
  );
  assert.equal(
    hasStreamReadinessSignal(
      `data: ${JSON.stringify({ object: "chat.completion.chunk", choices: [] })}\n\n`
    ),
    true
  );
  assert.equal(
    hasStreamReadinessSignal(
      `data: ${JSON.stringify({
        object: "chat.completion.chunk",
        choices: [{ index: 0, delta: {} }],
      })}\n\n`
    ),
    true
  );
  // #3612: index-only tool_call chunk (first chunk in OpenAI streaming — no id yet)
  // MUST be treated as a readiness signal (tool-call has started)
  assert.equal(
    hasStreamReadinessSignal(
      `data: ${JSON.stringify({
        object: "chat.completion.chunk",
        choices: [{ index: 0, delta: { tool_calls: [{ index: 0 }] } }],
      })}\n\n`
    ),
    true
  );
  assert.equal(
    hasStreamReadinessSignal(
      `data: ${JSON.stringify({
        object: "chat.completion.chunk",
        choices: [{ index: 0, delta: { function_call: {} } }],
      })}\n\n`
    ),
    true
  );
  // #3612: chunk with valid choices but NO object/type field (some OA-compatible backends
  // omit object) — must be accepted as a readiness signal when delta.role is present
  assert.equal(
    hasStreamReadinessSignal(
      `data: ${JSON.stringify({
        id: "chatcmpl-xyz",
        choices: [{ index: 0, delta: { role: "assistant" } }],
      })}\n\n`
    ),
    true
  );
  // Stream readiness is a zombie filter now, not a provider-specific schema gate.
  assert.equal(
    hasStreamReadinessSignal(
      `data: ${JSON.stringify({
        object: "chat.completion",
        choices: [{ index: 0, delta: { role: "assistant" } }],
      })}\n\n`
    ),
    true
  );
});

test("ensureStreamReadiness preserves buffered chunks when stream starts", async () => {
  const response = new Response(
    streamFromChunks([
      `data: ${JSON.stringify({
        type: "response.created",
        response: {
          id: "resp_1",
          object: "response",
          created_at: 1_735_000_000,
          status: "in_progress",
        },
      })}\n\n`,
      `data: ${JSON.stringify({ choices: [{ delta: { content: "hello" }, index: 0 }] })}\n\n`,
      `data: ${JSON.stringify({ choices: [{ delta: { content: " world" }, index: 0 }] })}\n\n`,
    ]),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );

  const result = await ensureStreamReadiness(response, { timeoutMs: 100 });
  assert.equal(result.ok, true);
  const text = await result.response.text();
  assert.match(text, /response\.created/);
  assert.match(text, /hello/);
  assert.match(text, / world/);
});

test("ensureStreamReadiness honors configured timeouts above 2000ms", async () => {
  const response = new Response(
    streamFromChunks(
      [
        `data: ${JSON.stringify({
          type: "provider.started",
          text: "slow first byte",
        })}\n\n`,
      ],
      2_100
    ),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );

  const result = await ensureStreamReadiness(response, { timeoutMs: 3_000 });
  assert.equal(result.ok, true);
  const text = await result.response.text();
  assert.match(text, /slow first byte/);
});

test("ensureStreamReadiness hands off long Claude streams after message_start", async () => {
  const response = new Response(delayedClaudeStartStream(), {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });

  const result = await ensureStreamReadiness(response, {
    timeoutMs: 10,
    provider: "anthropic-compatible-cc-test",
    model: "claude-sonnet-4-6",
  });
  assert.equal(result.ok, true);
  const text = await result.response.text();
  assert.match(text, /message_start/);
  assert.match(text, /slow hello/);
});

test("ensureStreamReadiness hands off long OpenAI Responses streams after response.created", async () => {
  const response = new Response(delayedOpenAIResponsesStartStream(), {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });

  const result = await ensureStreamReadiness(response, {
    timeoutMs: 10,
    provider: "openai-compatible-test",
    model: "gpt-responses-test",
  });
  assert.equal(result.ok, true);
  const text = await result.response.text();
  assert.match(text, /response\.created/);
  assert.match(text, /slow hello/);
});

test("ensureStreamReadiness hands off chat completion streams after role-only start", async () => {
  const response = new Response(delayedChatCompletionStartStream(), {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });

  const result = await ensureStreamReadiness(response, {
    timeoutMs: 10,
    provider: "glm",
    model: "glm-5.1",
  });
  assert.equal(result.ok, true);
  const text = await result.response.text();
  assert.match(text, /role/);
  assert.match(text, /slow chat hello/);
});

test("ensureStreamReadiness hands off Gemini streams after structural candidate start", async () => {
  const response = new Response(delayedGeminiStartStream(), {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });

  const result = await ensureStreamReadiness(response, {
    timeoutMs: 10,
    provider: "gemini",
    model: "gemini-3.0-pro",
  });
  assert.equal(result.ok, true);
  const text = await result.response.text();
  assert.match(text, /candidates/);
  assert.match(text, /slow gemini hello/);
});

test("ensureStreamReadiness hands off unknown structured provider events promptly", async () => {
  const response = new Response(delayedUnknownStructuredStartStream(), {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });

  const result = await ensureStreamReadiness(response, {
    timeoutMs: 10,
    provider: "provider-specific",
    model: "custom-stream-model",
  });
  assert.equal(result.ok, true);
  const text = await result.response.text();
  assert.match(text, /provider\.lifecycle/);
  assert.match(text, /slow unknown hello/);
});

test("ensureStreamReadiness returns 504 when no non-ping SSE event arrives before timeout", async () => {
  const response = new Response(zombieReadinessStream(), {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });

  const result = await ensureStreamReadiness(response, { timeoutMs: 10 });
  assert.equal(result.ok, false);
  assert.equal(result.response.status, 504);
  const body = await result.response.json();
  assert.equal(body.error.code, "STREAM_READINESS_TIMEOUT");
  assert.match(body.error.message, /non-ping SSE event/);
});

test("ensureStreamReadiness returns 502 when stream ends without a non-ping SSE event", async () => {
  const response = new Response(streamFromChunks([": keepalive\n\n"]), {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });

  const result = await ensureStreamReadiness(response, { timeoutMs: 100 });
  assert.equal(result.ok, false);
  assert.equal(result.response.status, 502);
});

test("ensureStreamReadiness accepts a final event without a trailing blank line", async () => {
  const response = new Response(
    streamFromChunks(['event: provider.lifecycle\ndata: {"ok":true}']),
    {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    }
  );

  const result = await ensureStreamReadiness(response, { timeoutMs: 100 });
  assert.equal(result.ok, true);
  assert.match(await result.response.text(), /provider\.lifecycle/);
});

// Regression for #2520: a reasoning-only stream (Mistral `thinking` array / StepFun
// `reasoning_details`) is real output and must NOT be classified as "no useful content"
// (which produced a spurious 502).
test("hasUsefulStreamContent detects thinking[] and reasoning_details (#2520)", () => {
  assert.equal(
    hasUsefulStreamContent(
      `data: ${JSON.stringify({ choices: [{ delta: { content: [{ type: "thinking", thinking: [{ text: "reasoning..." }] }] }, index: 0 }] })}\n\n`
    ),
    true
  );
  assert.equal(
    hasUsefulStreamContent(
      `data: ${JSON.stringify({ choices: [{ delta: { reasoning_details: [{ type: "reasoning.text", text: "deliberating" }] }, index: 0 }] })}\n\n`
    ),
    true
  );
});
