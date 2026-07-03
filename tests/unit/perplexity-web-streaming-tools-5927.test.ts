// Tool-call emulation for the Perplexity Web executor in STREAMING mode (#5927).
//
// perplexity-web.ts converts <tool>{...}</tool> text into real OpenAI tool_calls
// only for non-streaming requests (the `hasTools && !stream` gate). Streaming
// requests — the default for agentic coding clients — got the raw <tool> text
// as plain delta.content and never emitted a tool_calls SSE delta, so clients
// could not execute tools. These tests live in a dedicated file mirroring
// tests/unit/chatgpt-web-tools-5240.test.ts (the reference fix for chatgpt-web).

import test from "node:test";
import assert from "node:assert/strict";

const { PerplexityWebExecutor } = await import("../../open-sse/executors/perplexity-web.ts");
const { __setTlsFetchOverrideForTesting } = await import(
  "../../open-sse/services/perplexityTlsClient.ts"
);

// ─── Helper: Build a mock SSE stream from Perplexity events ─────────────────

function mockPplxStream(events: unknown[]) {
  const encoder = new TextEncoder();
  const chunks: string[] = [];
  for (const evt of events) {
    chunks.push(`event: message\r\ndata: ${JSON.stringify(evt)}\r\n\r\n`);
  }
  chunks.push("event: end_of_stream\r\n\r\n");
  const body = chunks.join("");
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(body));
      controller.close();
    },
  });
}

function installMockFetch(streamEvents: unknown[]) {
  __setTlsFetchOverrideForTesting(async () => {
    return {
      status: 200,
      headers: new Headers({ "Content-Type": "text/event-stream" }),
      text: null,
      body: mockPplxStream(streamEvents),
    };
  });
  return () => __setTlsFetchOverrideForTesting(null);
}

const WEATHER_TOOL = {
  type: "function",
  function: {
    name: "write_file",
    description: "Write a file to disk",
    parameters: {
      type: "object",
      properties: { path: { type: "string" }, content: { type: "string" } },
      required: ["path", "content"],
    },
  },
};

const TOOL_CALL_TEXT =
  '<tool>{"name":"write_file","arguments":{"path":"a.ts","content":"x"}}</tool>';

function toolEvents(text: string) {
  return [
    {
      backend_uuid: "tool-uuid-1",
      blocks: [
        {
          intended_usage: "markdown",
          markdown_block: { chunks: [text], progress: "DONE" },
        },
      ],
      status: "COMPLETED",
    },
  ];
}

test("Tools stream: <tool> text becomes delta.tool_calls + finish_reason tool_calls, NOT raw <tool> content (#5927)", async () => {
  const restore = installMockFetch(toolEvents(TOOL_CALL_TEXT));
  try {
    const executor = new PerplexityWebExecutor();
    const result = await executor.execute({
      model: "pplx-auto",
      body: {
        messages: [{ role: "user", content: "write a file" }],
        tools: [WEATHER_TOOL],
        stream: true,
      },
      stream: true,
      credentials: { apiKey: "test-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    } as any);

    assert.equal(result.response.status, 200);
    assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");

    const text = await result.response.text();
    const chunks = text
      .split("\n")
      .filter((l) => l.startsWith("data: ") && !l.includes("[DONE]"))
      .map((l) => JSON.parse(l.slice(6)));

    // Must NOT leak raw <tool> text as plain content.
    assert.ok(
      chunks.every((c) => {
        const content = c.choices?.[0]?.delta?.content;
        return typeof content !== "string" || !content.includes("<tool>");
      }),
      "no chunk contains raw <tool> text in delta.content"
    );

    const toolChunk = chunks.find((c) => c.choices[0].delta && c.choices[0].delta.tool_calls);
    assert.ok(toolChunk, "a chunk carries delta.tool_calls");
    assert.equal(toolChunk.choices[0].finish_reason, "tool_calls");
    const tc = toolChunk.choices[0].delta.tool_calls;
    assert.ok(Array.isArray(tc) && tc.length === 1);
    assert.equal(tc[0].type, "function");
    assert.equal(tc[0].function.name, "write_file");
    assert.equal(typeof tc[0].function.arguments, "string", "arguments is a JSON string");
    assert.deepEqual(JSON.parse(tc[0].function.arguments), { path: "a.ts", content: "x" });

    const lastLine = text.trim().split("\n").filter(Boolean).pop();
    assert.equal(lastLine, "data: [DONE]");
  } finally {
    restore();
  }
});

test("Tools regression: streaming request with NO tools still streams plain content unchanged (#5927)", async () => {
  const restore = installMockFetch(toolEvents("Just plain text, no tools."));
  try {
    const executor = new PerplexityWebExecutor();
    const result = await executor.execute({
      model: "pplx-auto",
      body: { messages: [{ role: "user", content: "hi" }], stream: true },
      stream: true,
      credentials: { apiKey: "test-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    } as any);

    assert.equal(result.response.status, 200);
    const text = await result.response.text();
    const chunks = text
      .split("\n")
      .filter((l) => l.startsWith("data: ") && !l.includes("[DONE]"))
      .map((l) => JSON.parse(l.slice(6)));

    let assembled = "";
    for (const c of chunks) {
      const content = c.choices?.[0]?.delta?.content;
      if (content) assembled += content;
    }
    assert.equal(assembled, "Just plain text, no tools.");

    assert.ok(
      chunks.every((c) => !(c.choices[0].delta && c.choices[0].delta.tool_calls)),
      "no tool_calls emitted without a tools array"
    );
    const finishChunk = chunks.find((c) => c.choices[0].finish_reason);
    assert.equal(finishChunk.choices[0].finish_reason, "stop");
  } finally {
    restore();
  }
});
