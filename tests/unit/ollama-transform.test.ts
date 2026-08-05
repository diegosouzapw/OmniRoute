import test from "node:test";
import assert from "node:assert/strict";

const { transformToOllama } = await import("../../open-sse/utils/ollamaTransform.ts");

test("transformToOllama coerces numeric tool_call id to string without crashing", async () => {
  const inputSSE = [
    `data: ${JSON.stringify({
      id: "chatcmpl_1",
      object: "chat.completion.chunk",
      created: 1,
      model: "gpt-4",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: 12345,
                type: "function",
                function: { name: "test", arguments: "{}" },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    })}\n`,
  ].join("");

  const inputStream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(inputSSE));
      controller.close();
    },
  });

  const mockResponse = new Response(inputStream, {
    headers: { "Content-Type": "text/event-stream" },
  });

  const result = transformToOllama(mockResponse, "test-model");
  const text = await result.text();

  // Should produce valid JSON lines without crashing
  const lines = text.trim().split("\n");
  assert.ok(lines.length > 0, "Should produce at least one line of output");
  for (const line of lines) {
    const parsed = JSON.parse(line);
    assert.ok(parsed, "Each line should be valid JSON");
  }
});

test("transformToOllama handles string tool_call id normally", async () => {
  const inputSSE = [
    `data: ${JSON.stringify({
      id: "chatcmpl_1",
      object: "chat.completion.chunk",
      created: 1,
      model: "gpt-4",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_abc",
                type: "function",
                function: { name: "test", arguments: "{}" },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    })}\n`,
  ].join("");

  const inputStream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(inputSSE));
      controller.close();
    },
  });

  const mockResponse = new Response(inputStream, {
    headers: { "Content-Type": "text/event-stream" },
  });

  const result = transformToOllama(mockResponse, "test-model");
  const text = await result.text();
  const lines = text
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));

  const toolCallLine = lines.find((line) => line.message?.tool_calls);
  assert.ok(toolCallLine, "Should produce a tool call line");
});

test("transformToOllama emits reasoning aliases as native thinking", async () => {
  const inputSSE = [
    `data: ${JSON.stringify({
      choices: [{ index: 0, delta: { reasoning: "plan ", content: "" } }],
    })}\n`,
    `data: ${JSON.stringify({
      choices: [{ index: 0, delta: { reasoning: "carefully", content: "answer" } }],
    })}\n`,
    `data: ${JSON.stringify({
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    })}\n`,
  ].join("");

  const mockResponse = new Response(
    new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(inputSSE));
        controller.close();
      },
    }),
    { headers: { "Content-Type": "text/event-stream" } }
  );

  const lines = (await transformToOllama(mockResponse, "gpt-oss:20b").text())
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));
  const thinking = lines.filter((line) => typeof line.message?.thinking === "string");
  const content = lines.filter((line) => line.message?.content === "answer");

  assert.deepEqual(
    thinking.map((line) => line.message.thinking),
    ["plan ", "carefully"]
  );
  assert.equal(
    thinking.every((line) => line.message.content === ""),
    true
  );
  assert.equal(content.length, 1);
  assert.equal(content[0].message.thinking, undefined);
});

test("transformToOllama prefers reasoning_content without duplicating aliases", async () => {
  const inputSSE = `data: ${JSON.stringify({
    choices: [
      {
        index: 0,
        delta: { reasoning_content: "canonical", reasoning: "alias" },
        finish_reason: "stop",
      },
    ],
  })}\n`;
  const mockResponse = new Response(
    new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(inputSSE));
        controller.close();
      },
    }),
    { headers: { "Content-Type": "text/event-stream" } }
  );

  const lines = (await transformToOllama(mockResponse, "test-model").text())
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));

  assert.deepEqual(
    lines.filter((line) => line.message?.thinking).map((line) => line.message.thinking),
    ["canonical"]
  );
});

test("transformToOllama passes through non-ok shared responses without rewriting status or body", async () => {
  const errorBody = {
    error: {
      message: "Request too large for current capacity",
      type: "server_error",
      code: "admission_oversized",
    },
  };
  const upstream = new Response(JSON.stringify(errorBody), {
    status: 503,
    headers: {
      "Content-Type": "application/json",
      "Retry-After": "1",
    },
  });

  const result = transformToOllama(upstream, "llama3.2");
  assert.equal(result.status, 503);
  assert.equal(result.headers.get("Retry-After"), "1");
  assert.match(String(result.headers.get("Content-Type") || ""), /application\/json/i);

  const payload = await result.json();
  assert.equal(payload.error?.code, "admission_oversized");
  assert.equal(payload.error?.type, "server_error");
  assert.equal(payload.error?.message, "Request too large for current capacity");
});

test("transformToOllama leaves successful non-SSE responses untouched", async () => {
  const body = { choices: [{ message: { role: "assistant", content: "hello" } }] };
  const upstream = new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "X-Sentinel": "preserved",
    },
  });

  const result = transformToOllama(upstream, "llama3.2");
  assert.equal(result, upstream);
  assert.equal(result.status, 200);
  assert.equal(result.headers.get("X-Sentinel"), "preserved");
  assert.deepEqual(await result.json(), body);
});

test("transformToOllama merges multi-chunk numeric tool_call id", async () => {
  const inputSSE = [
    `data: ${JSON.stringify({
      id: "chatcmpl_1",
      object: "chat.completion.chunk",
      created: 1,
      model: "gpt-4",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: 12345,
                type: "function",
                function: { name: "test", arguments: '{"a":' },
              },
            ],
          },
        },
      ],
    })}\n`,
    `data: ${JSON.stringify({
      id: "chatcmpl_1",
      object: "chat.completion.chunk",
      created: 1,
      model: "gpt-4",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: 12345,
                type: "function",
                function: { arguments: "1}" },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    })}\n`,
  ].join("");

  const inputStream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(inputSSE));
      controller.close();
    },
  });

  const mockResponse = new Response(inputStream, {
    headers: { "Content-Type": "text/event-stream" },
  });

  const result = transformToOllama(mockResponse, "test-model");
  const text = await result.text();
  const lines = text
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));
  const toolCallLines = lines.filter((line) => line.message?.tool_calls);

  assert.equal(toolCallLines.length, 1);
  assert.equal(toolCallLines[0].message.tool_calls.length, 1);
  assert.equal(toolCallLines[0].message.tool_calls[0].function.name, "test");
  assert.deepEqual(toolCallLines[0].message.tool_calls[0].function.arguments, { a: 1 });
});
