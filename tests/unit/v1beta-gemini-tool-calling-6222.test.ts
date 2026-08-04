import test from "node:test";
import assert from "node:assert/strict";

// Feature #6222 — Gemini tool/function calling end-to-end on /v1beta.
// Covers the three converters that previously dropped tool calls:
//   1. Request:  convertGeminiToInternal (sibling of route.ts)
//   2. Non-stream response: convertOpenAIResponseToGemini
//   3. Stream response: openAIChunkToGeminiChunk / transformOpenAISSEToGeminiSSE
//
// The request converter lives in its own module (not route.ts) so it can be
// unit-tested without importing the chat-handler graph, which keeps timers
// alive and hangs the node:test runner.

const { convertGeminiToInternal } = await import(
  "../../src/app/api/v1beta/models/[...path]/convertGeminiToInternal.ts"
);
const {
  openAIChunkToGeminiChunk,
  transformOpenAISSEToGeminiSSE,
  convertOpenAIResponseToGemini,
} = await import("../../open-sse/translator/response/openai-to-gemini-sse.ts");

// ---------------------------------------------------------------------------
// 1. Request converter
// ---------------------------------------------------------------------------

test("request: tools[].functionDeclarations → OpenAI tools", () => {
  const geminiBody = {
    contents: [{ role: "user", parts: [{ text: "What is the weather in Paris?" }] }],
    tools: [
      {
        functionDeclarations: [
          {
            name: "get_weather",
            description: "Get the current weather for a city",
            parameters: {
              type: "object",
              properties: { city: { type: "string" } },
              required: ["city"],
            },
          },
        ],
      },
    ],
  };

  const out = convertGeminiToInternal(geminiBody, "gemini/gemini-pro", false);

  assert.ok(Array.isArray(out.tools), "tools should be an array");
  assert.equal(out.tools.length, 1);
  assert.deepEqual(out.tools[0], {
    type: "function",
    function: {
      name: "get_weather",
      description: "Get the current weather for a city",
      parameters: {
        type: "object",
        properties: { city: { type: "string" } },
        required: ["city"],
      },
    },
  });
  // Existing text mapping preserved.
  const userMsg = out.messages.find((m) => m.role === "user");
  assert.ok(userMsg);
  assert.equal(userMsg.content, "What is the weather in Paris?");
});

test("request: prior functionCall part → assistant tool_calls", () => {
  const geminiBody = {
    contents: [
      { role: "user", parts: [{ text: "Weather in Paris?" }] },
      {
        role: "model",
        parts: [{ functionCall: { name: "get_weather", args: { city: "Paris" } } }],
      },
    ],
  };

  const out = convertGeminiToInternal(geminiBody, "gemini/gemini-pro", false);

  const assistantMsg = out.messages.find((m) => m.role === "assistant");
  assert.ok(assistantMsg, "assistant message should exist");
  assert.ok(Array.isArray(assistantMsg.tool_calls), "assistant should carry tool_calls");
  assert.equal(assistantMsg.tool_calls.length, 1);
  assert.equal(assistantMsg.tool_calls[0].type, "function");
  assert.equal(assistantMsg.tool_calls[0].function.name, "get_weather");
  assert.deepEqual(
    JSON.parse(assistantMsg.tool_calls[0].function.arguments),
    { city: "Paris" }
  );
});

test("request: functionResponse part → tool role message", () => {
  const geminiBody = {
    contents: [
      { role: "user", parts: [{ text: "Weather in Paris?" }] },
      {
        role: "model",
        parts: [{ functionCall: { name: "get_weather", args: { city: "Paris" } } }],
      },
      {
        role: "user",
        parts: [
          {
            functionResponse: {
              name: "get_weather",
              response: { result: { tempC: 18 } },
            },
          },
        ],
      },
    ],
  };

  const out = convertGeminiToInternal(geminiBody, "gemini/gemini-pro", false);

  const toolMsg = out.messages.find((m) => m.role === "tool");
  assert.ok(toolMsg, "tool message should exist");
  assert.equal(toolMsg.tool_call_id, "get_weather");
  assert.deepEqual(JSON.parse(toolMsg.content), { tempC: 18 });
});

// ---------------------------------------------------------------------------
// 2. Non-stream response converter
// ---------------------------------------------------------------------------

function makeJsonResponse(obj: unknown): Response {
  return new Response(JSON.stringify(obj), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

test("non-stream: message.tool_calls → parts[].functionCall {name,args}", async () => {
  const openaiResponse = {
    model: "gemini-pro",
    choices: [
      {
        message: {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: {
                name: "get_weather",
                arguments: '{"city":"Paris"}',
              },
            },
          ],
        },
        finish_reason: "tool_calls",
      },
    ],
    usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
  };

  const geminiResp = await convertOpenAIResponseToGemini(
    makeJsonResponse(openaiResponse),
    "gemini/gemini-pro"
  );
  const body = (await geminiResp.json()) as {
    candidates: Array<{
      content: { parts: Array<Record<string, unknown>> };
      finishReason: string;
    }>;
  };

  const parts = body.candidates[0].content.parts;
  const fcPart = parts.find((p) => "functionCall" in p) as
    | { functionCall: { name: string; args: Record<string, unknown> } }
    | undefined;
  assert.ok(fcPart, "should emit a functionCall part");
  assert.equal(fcPart.functionCall.name, "get_weather");
  // args must be parsed to an object, NOT left as a JSON string.
  assert.deepEqual(fcPart.functionCall.args, { city: "Paris" });
  assert.equal(body.candidates[0].finishReason, "STOP");
});

// ---------------------------------------------------------------------------
// 3. Stream converter — fragmented tool_calls accumulate
// ---------------------------------------------------------------------------

test("stream (unit): fragmented tool_calls accumulate into one functionCall", () => {
  const state = {} as Record<string, unknown>;

  // Chunk 1: opens the tool call with name + partial args.
  const c1 = openAIChunkToGeminiChunk(
    {
      choices: [
        {
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_1",
                function: { name: "get_weather", arguments: '{"ci' },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    },
    "gemini/gemini-pro",
    state
  );
  assert.equal(c1, null, "intermediate tool-call chunk emits nothing");

  // Chunk 2: continuation of args.
  const c2 = openAIChunkToGeminiChunk(
    {
      choices: [
        { delta: { tool_calls: [{ index: 0, function: { arguments: 'ty":"Paris"}' } }] }, finish_reason: null },
      ],
    },
    "gemini/gemini-pro",
    state
  );
  assert.equal(c2, null, "second fragment still emits nothing");

  // Final chunk with finish_reason — emit the accumulated functionCall.
  const c3 = openAIChunkToGeminiChunk(
    { choices: [{ delta: {}, finish_reason: "tool_calls" }] },
    "gemini/gemini-pro",
    state
  );
  assert.ok(c3, "final chunk should emit");
  const parts = c3!.candidates[0].content.parts as Array<Record<string, unknown>>;
  const fcPart = parts.find((p) => "functionCall" in p) as
    | { functionCall: { name: string; args: Record<string, unknown> } }
    | undefined;
  assert.ok(fcPart, "final chunk carries the functionCall part");
  assert.equal(fcPart.functionCall.name, "get_weather");
  assert.deepEqual(fcPart.functionCall.args, { city: "Paris" });
  assert.equal(c3!.candidates[0].finishReason, "STOP");
});

test("stream (e2e): SSE with fragmented tool_calls → Gemini functionCall", async () => {
  const events = [
    'data: {"choices":[{"delta":{"role":"assistant","tool_calls":[{"index":0,"id":"call_1","function":{"name":"get_weather","arguments":"{\\"ci"}}]},"finish_reason":null}]}',
    'data: {"choices":[{"delta":{"tool_calls":[{"index":0,"function":{"arguments":"ty\\":\\"Paris\\"}"}}]},"finish_reason":null}]}',
    'data: {"choices":[{"delta":{},"finish_reason":"tool_calls"}],"usage":{"prompt_tokens":10,"completion_tokens":5,"total_tokens":15},"model":"gemini-pro"}',
    "data: [DONE]",
  ];
  const body = events.map((e) => e + "\n\n").join("");
  const upstream = new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(body));
        controller.close();
      },
    }),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );

  const geminiResp = transformOpenAISSEToGeminiSSE(upstream, "gemini/gemini-pro");
  const reader = geminiResp.body!.getReader();
  const decoder = new TextDecoder();
  let raw = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    raw += decoder.decode(value, { stream: true });
  }
  raw += decoder.decode();

  const chunks: Array<Record<string, unknown>> = [];
  for (const line of raw.split("\n")) {
    const trimmed = line.endsWith("\r") ? line.slice(0, -1) : line;
    if (!trimmed.startsWith("data:")) continue;
    const data = trimmed.slice(5).trim();
    if (!data) continue;
    chunks.push(JSON.parse(data));
  }

  // Find the functionCall part anywhere in the emitted stream.
  let fc: { name: string; args: Record<string, unknown> } | undefined;
  for (const ch of chunks) {
    const parts =
      (ch.candidates as Array<{ content: { parts: Array<Record<string, unknown>> } }>)?.[0]?.content
        ?.parts ?? [];
    for (const p of parts) {
      if ("functionCall" in p) fc = (p as { functionCall: typeof fc }).functionCall;
    }
  }
  assert.ok(fc, "stream should emit a functionCall part");
  assert.equal(fc!.name, "get_weather");
  assert.deepEqual(fc!.args, { city: "Paris" });
});
