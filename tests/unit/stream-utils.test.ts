import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-utils-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { createSSEStream, createSSETransformStreamWithLogger, createPassthroughStreamWithLogger } =
  await import("../../open-sse/utils/stream.ts");
const {
  buildStreamSummaryFromEvents,
  compactStructuredStreamPayload,
  createStructuredSSECollector,
} = await import("../../open-sse/utils/streamPayloadCollector.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { createRequestLogger } = await import("../../open-sse/utils/requestLogger.ts");

const textEncoder = new TextEncoder();
const SYNTHETIC_CLAUDE_EMPTY_RESPONSE_TEXT =
  "[Proxy Error] The upstream API returned an empty response. Please retry the request.";

async function readTransformed(chunks, options) {
  const source = new ReadableStream({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(textEncoder.encode(chunk));
      }
      controller.close();
    },
  });

  return new Response(source.pipeThrough(createSSEStream(options))).text();
}

async function readWithTransform(chunks, transformStream) {
  const source = new ReadableStream({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(textEncoder.encode(chunk));
      }
      controller.close();
    },
  });

  return new Response(source.pipeThrough(transformStream)).text();
}

test.after(() => {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    for (const entry of fs.readdirSync(TEST_DATA_DIR)) {
      fs.rmSync(path.join(TEST_DATA_DIR, entry), { recursive: true, force: true });
    }
  }
});

test("createSSEStream passthrough normalizes tool-call finishes and reports the assembled response", async () => {
  let onCompletePayload = null;
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        id: "chatcmpl_1",
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [{ index: 0, delta: { role: "assistant", content: "Hello " } }],
      })}\n\n`,
      `data: ${JSON.stringify({
        id: "chatcmpl_1",
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [
          {
            index: 0,
            delta: {
              tool_calls: [
                {
                  index: 0,
                  id: "call_1",
                  type: "function",
                  function: {
                    name: "read_file",
                    arguments: '{"path":"/tmp/a"}',
                  },
                },
              ],
            },
          },
        ],
      })}\n\n`,
      `data: ${JSON.stringify({
        id: "chatcmpl_1",
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      })}\n\n`,
    ],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.OPENAI,
      provider: "openai",
      model: "gpt-4.1-mini",
      body: {
        messages: [{ role: "user", content: "hello" }],
      },
      onComplete(payload) {
        onCompletePayload = payload;
      },
    }
  );

  assert.match(text, /"content":"Hello "/);
  assert.match(text, /"name":"read_file"/);
  assert.match(text, /"finish_reason":"tool_calls"/);
  assert.equal(onCompletePayload.status, 200);
  assert.equal(onCompletePayload.responseBody.choices[0].finish_reason, "tool_calls");
  assert.equal(onCompletePayload.responseBody.choices[0].message.tool_calls[0].id, "call_1");
  assert.equal(onCompletePayload.responseBody.choices[0].message.content, "Hello");
  assert.equal(onCompletePayload.clientPayload._streamed, true);
});

test("createSSEStream passthrough flushes a buffered final line without a trailing newline", async () => {
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        id: "chatcmpl_2",
        object: "chat.completion.chunk",
        created: 2,
        model: "gpt-4.1-mini",
        choices: [{ index: 0, delta: { role: "assistant", content: "tail chunk" } }],
      })}`,
    ],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.OPENAI,
      provider: "openai",
      model: "gpt-4.1-mini",
      body: {
        messages: [{ role: "user", content: "hello" }],
      },
    }
  );

  assert.match(text, /tail chunk/);
  assert.equal(text.includes("data: "), true);
});

test("createSSEStream translate mode converts Claude SSE into OpenAI chunks and completion payload", async () => {
  let onCompletePayload = null;
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        type: "message_start",
        message: {
          id: "msg_1",
          model: "claude-sonnet-4",
          role: "assistant",
          usage: { input_tokens: 3 },
        },
      })}\n\n`,
      `data: ${JSON.stringify({
        type: "content_block_start",
        index: 0,
        content_block: { type: "text", text: "" },
      })}\n\n`,
      `data: ${JSON.stringify({
        type: "content_block_delta",
        index: 0,
        delta: { type: "text_delta", text: "Hello Claude" },
      })}\n\n`,
      `data: ${JSON.stringify({
        type: "message_delta",
        delta: { stop_reason: "end_turn" },
        usage: { output_tokens: 4 },
      })}\n\n`,
      `data: ${JSON.stringify({
        type: "message_stop",
      })}\n\n`,
    ],
    {
      mode: "translate",
      targetFormat: FORMATS.CLAUDE,
      sourceFormat: FORMATS.OPENAI,
      provider: "claude",
      model: "claude-sonnet-4",
      body: {
        messages: [{ role: "user", content: "hello" }],
      },
      onComplete(payload) {
        onCompletePayload = payload;
      },
    }
  );

  assert.match(text, /"content":"Hello Claude"/);
  assert.match(text, /\[DONE\]/);
  assert.equal(onCompletePayload.status, 200);
  assert.equal(onCompletePayload.responseBody.choices[0].message.content, "Hello Claude");
  assert.equal(onCompletePayload.responseBody.usage.completion_tokens, 4);
  assert.equal(onCompletePayload.responseBody.usage.total_tokens, 4);
});

test("createSSEStream passthrough preserves Responses API events and completion summaries", async () => {
  let onCompletePayload = null;
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        type: "response.output_text.delta",
        delta: "Hello ",
      })}\n\n`,
      `data: ${JSON.stringify({
        type: "response.output_text.delta",
        delta: "world",
      })}\n\n`,
      `data: ${JSON.stringify({
        type: "response.completed",
        response: {
          id: "resp_1",
          object: "response",
          model: "gpt-4.1-mini",
          status: "completed",
          usage: { input_tokens: 2, output_tokens: 3, total_tokens: 5 },
        },
      })}\n\n`,
    ],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.OPENAI_RESPONSES,
      provider: "openai",
      model: "gpt-4.1-mini",
      body: { input: "hello" },
      onComplete(payload) {
        onCompletePayload = payload;
      },
    }
  );

  assert.match(text, /response.output_text.delta/);
  assert.match(text, /response.completed/);
  assert.equal(onCompletePayload.responseBody.usage.total_tokens, 5);
  assert.equal(onCompletePayload.providerPayload.summary.object, "response");
});

test("buildStreamSummaryFromEvents falls back to response.output_text.delta when completed output is empty", () => {
  const summary = buildStreamSummaryFromEvents(
    [
      {
        index: 0,
        data: {
          type: "response.output_text.delta",
          delta: "Hello ",
        },
      },
      {
        index: 1,
        data: {
          type: "response.output_text.delta",
          delta: "world",
        },
      },
      {
        index: 2,
        data: {
          type: "response.completed",
          response: {
            id: "resp_fallback",
            object: "response",
            model: "gpt-5.4",
            status: "completed",
            output: [],
            usage: { output_tokens: 2 },
          },
        },
      },
    ],
    FORMATS.OPENAI_RESPONSES,
    "gpt-5.4"
  );

  assert.equal((summary as any).object, "response");
  assert.equal((summary as any).output[0].type, "message");
  assert.equal((summary as any).output[0].content[0].type, "output_text");
  assert.equal((summary as any).output[0].content[0].text, "Hello world");
  assert.equal((summary as any).usage.output_tokens, 2);
});

test("createSSEStream translate mode aborts on Responses failure with rate limit error", async () => {
  let onCompletePayload = null;

  await assert.rejects(
    readTransformed(
      [
        `data: ${JSON.stringify({
          type: "response.created",
          response: {
            id: "resp_fail",
            object: "response",
            model: "gpt-5.4",
            status: "in_progress",
            output: [],
          },
        })}\n\n`,
        `data: ${JSON.stringify({
          type: "response.failed",
          response: {
            id: "resp_fail",
            object: "response",
            model: "gpt-5.4",
            status: "failed",
            error: {
              message: "Rate limit reached for gpt-5.4",
              code: "rate_limit_exceeded",
            },
          },
        })}\n\n`,
        `data: [DONE]\n\n`,
      ],
      {
        mode: "translate",
        targetFormat: FORMATS.OPENAI_RESPONSES,
        sourceFormat: FORMATS.OPENAI,
        provider: "codex",
        model: "gpt-5.4",
        body: { messages: [{ role: "user", content: "hello" }] },
        onComplete(payload) {
          onCompletePayload = payload;
        },
      }
    ),
    /Rate limit reached for gpt-5\.4|Upstream failure/
  );

  assert.ok(onCompletePayload, "should capture completion payload before aborting");
  assert.equal(onCompletePayload.status, 429);
  assert.equal(onCompletePayload.responseBody.error.type, "rate_limit_error");
  assert.equal(onCompletePayload.responseBody.error.code, "rate_limit_exceeded");
  assert.match(onCompletePayload.responseBody.error.message, /Rate limit reached/);
});

test("createSSEStream passthrough restores Claude tool names from the mapping table", async () => {
  const toolNameMap = new Map([["tool_alias", "read_file"]]);
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        type: "content_block_start",
        index: 0,
        content_block: {
          type: "tool_use",
          id: "tool_1",
          name: "tool_alias",
          input: { path: "/tmp/a" },
        },
      })}\n\n`,
    ],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.CLAUDE,
      provider: "claude",
      model: "claude-sonnet-4",
      toolNameMap,
      body: { messages: [{ role: "user", content: "hello" }] },
    }
  );

  assert.match(text, /"name":"read_file"/);
  assert.equal(text.includes("tool_alias"), false);
});

test("createSSEStream passthrough fixes generic ids and normalizes reasoning aliases", async () => {
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        id: "chat",
        object: "chat.completion.chunk",
        created: 1,
        model: "kimi-k2.5",
        choices: [
          {
            index: 0,
            delta: {
              reasoning: "Let me think first",
            },
          },
        ],
      })}\n\n`,
    ],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.OPENAI,
      provider: "openai",
      model: "kimi-k2.5",
      body: { messages: [{ role: "user", content: "hello" }] },
    }
  );

  assert.match(text, /"id":"chatcmpl-/);
  assert.match(text, /"reasoning_content":"Let me think first"/);
  assert.equal(text.includes('"reasoning":"Let me think first"'), false);
});

test("createSSEStream passthrough splits mixed reasoning and content deltas and estimates usage", async () => {
  let onCompletePayload = null;
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        id: "chatcmpl_reasoning",
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [
          {
            index: 0,
            delta: {
              reasoning_content: "First think",
              content: "Then answer",
            },
          },
        ],
      })}\n\n`,
      `data: ${JSON.stringify({
        id: "chatcmpl_reasoning",
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      })}\n\n`,
    ],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.OPENAI,
      provider: "openai",
      model: "gpt-4.1-mini",
      body: {
        messages: [{ role: "user", content: "hello world" }],
      },
      onComplete(payload) {
        onCompletePayload = payload;
      },
    }
  );

  const reasoningIndex = text.indexOf('"reasoning_content":"First think"');
  const contentIndex = text.indexOf('"content":"Then answer"');

  assert.ok(reasoningIndex >= 0);
  assert.ok(contentIndex > reasoningIndex);
  assert.match(text, /"total_tokens":\d+/);
  assert.equal(onCompletePayload.responseBody.choices[0].message.reasoning_content, "First think");
  assert.equal(onCompletePayload.responseBody.choices[0].message.content, "Then answer");
  assert.ok(onCompletePayload.responseBody.usage.total_tokens > 0);
});

test("createSSEStream passthrough merges Claude usage chunks and restores mapped tool names", async () => {
  let onCompletePayload = null;
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        type: "message_start",
        message: {
          id: "msg_passthrough",
          model: "claude-sonnet-4",
          role: "assistant",
          usage: { input_tokens: 6 },
        },
      })}\n\n`,
      `data: ${JSON.stringify({
        type: "content_block_start",
        index: 0,
        content_block: {
          type: "tool_use",
          id: "tool_1",
          name: "tool_alias",
          input: { path: "/tmp/a" },
        },
      })}\n\n`,
      `data: ${JSON.stringify({
        type: "content_block_delta",
        index: 1,
        delta: { text: "Claude says hi" },
      })}\n\n`,
      `data: ${JSON.stringify({
        type: "message_delta",
        delta: { stop_reason: "end_turn" },
        usage: { output_tokens: 4 },
      })}\n\n`,
    ],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.CLAUDE,
      provider: "claude",
      model: "claude-sonnet-4",
      toolNameMap: new Map([["tool_alias", "read_file"]]),
      body: {
        messages: [{ role: "user", content: "hello" }],
      },
      onComplete(payload) {
        onCompletePayload = payload;
      },
    }
  );

  assert.match(text, /"name":"read_file"/);
  assert.equal(text.includes('"name":"tool_alias"'), false);
  assert.equal(onCompletePayload.responseBody.choices[0].message.content, "Claude says hi");
  assert.equal(onCompletePayload.responseBody.usage.prompt_tokens, 6);
  assert.equal(onCompletePayload.responseBody.usage.completion_tokens, 4);
  assert.equal(onCompletePayload.responseBody.usage.total_tokens, 10);
});

test("createSSEStream passthrough injects a synthetic Claude text block for empty assistant SSE", async () => {
  let onCompletePayload = null;
  const text = await readTransformed(
    [
      `event: message_start\ndata: ${JSON.stringify({
        type: "message_start",
        message: {
          id: "msg_empty_passthrough",
          type: "message",
          role: "assistant",
          model: "claude-sonnet-4",
          content: [],
          stop_reason: null,
          stop_sequence: null,
          usage: { input_tokens: 7, output_tokens: 0 },
        },
      })}\n\n`,
      `event: message_stop\ndata: ${JSON.stringify({
        type: "message_stop",
      })}\n\n`,
    ],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.CLAUDE,
      provider: "claude",
      model: "claude-sonnet-4",
      body: {
        messages: [{ role: "user", content: "hello" }],
      },
      onComplete(payload) {
        onCompletePayload = payload;
      },
    }
  );

  assert.equal((text.match(/event: message_start/g) || []).length, 1);
  assert.equal((text.match(/event: message_delta/g) || []).length, 1);
  assert.match(text, /event: content_block_start/);
  assert.match(text, /event: content_block_delta/);
  assert.match(text, /event: message_stop/);
  assert.match(text, /\[Proxy Error\] The upstream API returned an empty response/);
  assert.ok(text.indexOf("event: content_block_start") > text.indexOf("event: message_start"));
  assert.ok(text.indexOf("event: message_stop") > text.indexOf("event: content_block_stop"));
  assert.equal(
    onCompletePayload.responseBody.choices[0].message.content,
    SYNTHETIC_CLAUDE_EMPTY_RESPONSE_TEXT
  );
});

test("createSSEStream translate mode injects a synthetic Claude text block when OpenAI finishes empty", async () => {
  let onCompletePayload = null;
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        id: "chatcmpl_empty_1",
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [{ index: 0, delta: { role: "assistant" } }],
      })}\n\n`,
      `data: ${JSON.stringify({
        id: "chatcmpl_empty_1",
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
        usage: { prompt_tokens: 3, completion_tokens: 0, total_tokens: 3 },
      })}\n\n`,
    ],
    {
      mode: "translate",
      targetFormat: FORMATS.OPENAI,
      sourceFormat: FORMATS.CLAUDE,
      provider: "openai",
      model: "gpt-4.1-mini",
      body: {
        messages: [{ role: "user", content: "hello" }],
      },
      onComplete(payload) {
        onCompletePayload = payload;
      },
    }
  );

  assert.equal((text.match(/event: message_start/g) || []).length, 1);
  assert.match(text, /event: content_block_start/);
  assert.match(text, /event: content_block_delta/);
  assert.match(text, /event: message_delta/);
  assert.match(text, /event: message_stop/);
  assert.match(text, /\[Proxy Error\] The upstream API returned an empty response/);
  assert.ok(text.indexOf("event: content_block_start") > text.indexOf("event: message_start"));
  assert.ok(text.indexOf("event: message_delta") > text.indexOf("event: content_block_stop"));
  assert.equal(
    onCompletePayload.responseBody.choices[0].message.content,
    SYNTHETIC_CLAUDE_EMPTY_RESPONSE_TEXT
  );
  assert.equal(onCompletePayload.responseBody.usage.total_tokens, 3);
});

test("createSSETransformStreamWithLogger flushes a trailing Claude usage event without a newline", async () => {
  let onCompletePayload = null;
  const text = await readWithTransform(
    [
      `data: ${JSON.stringify({
        type: "message_start",
        message: {
          id: "msg_tail",
          model: "claude-sonnet-4",
          role: "assistant",
          usage: { input_tokens: 3 },
        },
      })}\n\n`,
      `data: ${JSON.stringify({
        type: "content_block_start",
        index: 0,
        content_block: { type: "text", text: "" },
      })}\n\n`,
      `data: ${JSON.stringify({
        type: "content_block_delta",
        index: 0,
        delta: { type: "text_delta", text: "Buffered tail" },
      })}\n\n`,
      `data: ${JSON.stringify({
        type: "message_delta",
        delta: { stop_reason: "end_turn" },
        usage: { output_tokens: 5 },
      })}`,
    ],
    createSSETransformStreamWithLogger(
      FORMATS.CLAUDE,
      FORMATS.OPENAI,
      "claude",
      null,
      null,
      "claude-sonnet-4",
      null,
      { messages: [{ role: "user", content: "hello" }] },
      (payload) => {
        onCompletePayload = payload;
      }
    )
  );

  assert.match(text, /Buffered tail/);
  assert.match(text, /\[DONE\]/);
  assert.equal(onCompletePayload.responseBody.choices[0].message.content, "Buffered tail");
  assert.equal(onCompletePayload.responseBody.usage.completion_tokens, 5);
  assert.equal(onCompletePayload.responseBody.usage.total_tokens, 5);
});

test("buildStreamSummaryFromEvents compacts Responses API deltas into a synthetic response", () => {
  const summary = buildStreamSummaryFromEvents(
    [
      { index: 0, data: { type: "response.output_text.delta", delta: "Hello " } },
      { index: 1, data: { type: "response.output_text.delta", delta: "world" } },
      {
        index: 2,
        data: {
          type: "response.output_text.done",
          usage: { input_tokens: 2, output_tokens: 3, total_tokens: 5 },
        },
      },
    ],
    FORMATS.OPENAI_RESPONSES,
    "gpt-4.1-mini"
  );

  assert.equal((summary as any).object, "response");
  assert.equal((summary as any).model, "gpt-4.1-mini");
  assert.equal((summary as any).output[0].content[0].text, "Hello world");
  assert.deepEqual((summary as any).usage, { input_tokens: 2, output_tokens: 3, total_tokens: 5 });
});

test("buildStreamSummaryFromEvents preserves Gemini thought parts and function calls", () => {
  const summary = buildStreamSummaryFromEvents(
    [
      {
        index: 0,
        data: {
          modelVersion: "gemini-2.5-pro",
          candidates: [
            {
              content: {
                role: "model",
                parts: [
                  { text: "Thinking", thought: true },
                  { text: " aloud", thought: true },
                ],
              },
            },
          ],
        },
      },
      {
        index: 1,
        data: {
          candidates: [
            {
              content: {
                role: "model",
                parts: [
                  { text: "Done." },
                  { functionCall: { name: "read_file", args: { path: "/tmp/a" } } },
                ],
              },
              finishReason: "STOP",
            },
          ],
          usageMetadata: {
            promptTokenCount: 4,
            candidatesTokenCount: 5,
            totalTokenCount: 9,
          },
        },
      },
    ],
    FORMATS.GEMINI,
    "gemini-2.5-pro"
  );

  assert.equal((summary as any).modelVersion, "gemini-2.5-pro");
  assert.equal((summary as any).candidates[0].content.parts[0].text, "Thinking aloud");
  assert.equal((summary as any).candidates[0].content.parts[0].thought, true);
  assert.deepEqual((summary as any).candidates[0].content.parts[2], {
    functionCall: { name: "read_file", args: { path: "/tmp/a" } },
  });
  assert.deepEqual((summary as any).usageMetadata, {
    promptTokenCount: 4,
    candidatesTokenCount: 5,
    totalTokenCount: 9,
  });
});

test("compactStructuredStreamPayload wraps primitive summaries with Omniroute stream metadata", () => {
  const compact = compactStructuredStreamPayload({
    _streamed: true,
    _format: "sse-json",
    _stage: "client_response",
    _eventCount: 2,
    summary: "done",
  });

  assert.deepEqual(compact, {
    summary: "done",
    _omniroute_stream: {
      format: "sse-json",
      stage: "client_response",
      eventCount: 2,
    },
  });
});

test("createSSETransformStreamWithLogger flushes Responses API terminal events on stream end", async () => {
  const text = await readWithTransform(
    [
      `data: ${JSON.stringify({
        id: "chatcmpl_flush",
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [{ index: 0, delta: { role: "assistant", content: "Hello" } }],
      })}\n\n`,
      `data: ${JSON.stringify({
        id: "chatcmpl_flush",
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
        usage: { prompt_tokens: 2, completion_tokens: 3, total_tokens: 5 },
      })}\n\n`,
    ],
    createSSETransformStreamWithLogger(
      FORMATS.OPENAI,
      FORMATS.OPENAI_RESPONSES,
      "openai",
      null,
      null,
      "gpt-4.1-mini",
      null,
      { messages: [{ role: "user", content: "hello" }] }
    )
  );

  assert.match(text, /response\.created/);
  assert.match(text, /response\.completed/);
  assert.match(text, /\[DONE\]/);
});

test("createPassthroughStreamWithLogger reuses passthrough mode helpers", async () => {
  const text = await readWithTransform(
    [
      `data: ${JSON.stringify({
        id: "chatcmpl_passthrough",
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [{ index: 0, delta: { role: "assistant", content: "Hello again" } }],
      })}\n\n`,
      "data: [DONE]\n\n",
    ],
    createPassthroughStreamWithLogger("openai", null, null, "gpt-4.1-mini", null, {
      messages: [{ role: "user", content: "hello" }],
    })
  );

  assert.match(text, /Hello again/);
  assert.match(text, /\[DONE\]/);
});

test("createStructuredSSECollector drops excess events and compactStructuredStreamPayload preserves metadata for object summaries", () => {
  const collector = createStructuredSSECollector({
    stage: "client_response",
    maxEvents: 1,
    maxBytes: 512,
  });

  collector.push({ type: "response.output_text.delta", delta: "one" });
  collector.push({ type: "response.output_text.delta", delta: "two" });

  const built = collector.build(
    {
      object: "response",
      status: "completed",
    },
    { includeEvents: false }
  );
  const compact = compactStructuredStreamPayload(built);

  assert.equal(built._truncated, true);
  assert.equal(built._droppedEvents, 1);
  assert.equal(built._eventCount, 2);
  assert.deepEqual(compact, {
    object: "response",
    status: "completed",
    _omniroute_stream: {
      format: "sse-json",
      stage: "client_response",
      eventCount: 2,
      truncated: true,
      droppedEvents: 1,
    },
  });
});

test("createSSEStream passthrough drops keepalive event blocks without losing Responses deltas", async () => {
  const text = await readTransformed(
    [
      "event: keepalive\ndata:\n\n",
      `data: ${JSON.stringify({
        type: "response.output_text.delta",
        delta: "Hello keepalive-safe",
      })}\n\n`,
      `data: ${JSON.stringify({
        type: "response.completed",
        response: {
          id: "resp_keepalive",
          object: "response",
          model: "gpt-4.1-mini",
          status: "completed",
          usage: { input_tokens: 2, output_tokens: 1, total_tokens: 3 },
        },
      })}\n\n`,
      "data: [DONE]\n\n",
    ],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.OPENAI_RESPONSES,
      provider: "openai",
      model: "gpt-4.1-mini",
      body: { input: "hello" },
    }
  );

  assert.equal(text.includes("event: keepalive"), false);
  assert.equal(text.includes("data:\n\n"), false);
  assert.match(text, /response\.output_text\.delta/);
  assert.match(text, /Hello keepalive-safe/);
  assert.match(text, /data: \[DONE\]/);
});

test("createSSEStream passthrough aborts on Responses usage-limit failures and reports 429", async () => {
  let failurePayload = null;

  await assert.rejects(
    readTransformed(
      [
        `data: ${JSON.stringify({
          type: "response.failed",
          response: {
            id: "resp_usage_limit",
            object: "response",
            model: "gpt-5.5",
            status: "failed",
            error: {
              code: "usage_limit_reached",
              message: "Your weekly usage limit has been reached",
            },
          },
        })}\n\n`,
      ],
      {
        mode: "passthrough",
        sourceFormat: FORMATS.OPENAI_RESPONSES,
        provider: "codex",
        model: "gpt-5.5",
        body: { input: "hello" },
        onFailure(payload) {
          failurePayload = payload;
        },
      }
    ),
    /weekly usage limit|Upstream failure/
  );

  assert.ok(failurePayload, "should report the stream failure before aborting");
  assert.equal(failurePayload.status, 429);
  assert.equal(failurePayload.code, "usage_limit_reached");
});

test("createRequestLogger skips disabled logs and caps retained stream chunk bytes", async () => {
  const disabled = await createRequestLogger("openai", "openai", "gpt-test", {
    enabled: false,
  });
  disabled.logClientRawRequest("/v1/chat/completions", { prompt: "hello" });
  disabled.appendProviderChunk("x".repeat(32));
  assert.equal(disabled.getPipelinePayloads(), null);

  const logger = await createRequestLogger("openai", "openai", "gpt-test", {
    enabled: true,
    captureStreamChunks: true,
    maxStreamChunkBytes: 5,
  });
  logger.appendProviderChunk("abcdef");
  logger.appendProviderChunk("ghijkl");
  const payloads = logger.getPipelinePayloads();

  assert.deepEqual(payloads.streamChunks.provider, [
    "abcde",
    "[stream chunk log truncated after 5 bytes]",
  ]);
});
