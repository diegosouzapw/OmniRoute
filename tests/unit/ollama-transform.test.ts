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
      choices: [{
        index: 0,
        delta: {
          tool_calls: [{
            index: 0,
            id: 12345,
            type: "function",
            function: { name: "test", arguments: "{}" }
          }]
        },
        finish_reason: "tool_calls"
      }]
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
  const lines = text.trim().split("\n").map((line) => JSON.parse(line));

  const toolCallLine = lines.find((line) => line.message?.tool_calls);
  assert.ok(toolCallLine, "Should produce a tool call line");
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
  const lines = text.trim().split("\n").map((line) => JSON.parse(line));
  const toolCallLines = lines.filter((line) => line.message?.tool_calls);

  assert.equal(toolCallLines.length, 1);
  assert.equal(toolCallLines[0].message.tool_calls.length, 1);
  assert.equal(toolCallLines[0].message.tool_calls[0].function.name, "test");
  assert.deepEqual(toolCallLines[0].message.tool_calls[0].function.arguments, { a: 1 });
});
