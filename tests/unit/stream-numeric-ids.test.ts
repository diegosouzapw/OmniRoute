import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-numeric-ids-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const textEncoder = new TextEncoder();

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

test.after(() => {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
});

test("createSSEStream passthrough coerces numeric tool_call id to string", async () => {
  let onCompletePayload = null;
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        id: "chatcmpl_num",
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [{ index: 0, delta: { role: "assistant", content: "Hello " } }],
      })}\n\n`,
      `data: ${JSON.stringify({
        id: "chatcmpl_num",
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
                  id: 12345,
                  type: "function",
                  function: { name: "read_file", arguments: '{"path":"/tmp/a"}' },
                },
              ],
            },
          },
        ],
      })}\n\n`,
      `data: ${JSON.stringify({
        id: "chatcmpl_num",
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
      body: { messages: [{ role: "user", content: "hello" }] },
      onComplete(payload) {
        onCompletePayload = payload;
      },
    }
  );

  const lines = text
    .trim()
    .split("\n")
    .filter((line) => line.startsWith("data: ") && !line.includes("[DONE]"));
  let sawStreamedToolCall = false;
  for (const line of lines) {
    const payload = JSON.parse(line.slice(6));
    const tc = payload?.choices?.[0]?.delta?.tool_calls?.[0];
    if (tc?.id) {
      assert.equal(typeof tc.id, "string", "tool_call.id should be a string");
      assert.equal(tc.id, "12345");
      sawStreamedToolCall = true;
    }
  }
  assert.equal(sawStreamedToolCall, true, "expected streamed tool_call.id to be present");

  const finalId = onCompletePayload?.responseBody?.choices?.[0]?.message?.tool_calls?.[0]?.id;
  assert.equal(typeof finalId, "string", "tool_call.id in final message should be a string");
  assert.equal(finalId, "12345");
});

test("createSSEStream passthrough preserves numeric top-level id as string", async () => {
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        id: 123,
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [{ index: 0, delta: { content: "Hello" } }],
      })}\n\n`,
      `data: ${JSON.stringify({
        id: 123,
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
      body: { messages: [{ role: "user", content: "hello" }] },
    }
  );

  const lines = text
    .trim()
    .split("\n")
    .filter((line) => line.startsWith("data: ") && !line.includes("[DONE]"));

  assert.ok(lines.length > 0, "expected streamed chunks");
  for (const line of lines) {
    const payload = JSON.parse(line.slice(6));
    assert.equal(typeof payload.id, "string", "top-level chunk id should be a string");
    assert.equal(payload.id, "123");
    assert.notEqual(payload.id.startsWith("chatcmpl-"), true);
  }
});

test("createSSEStream responses passthrough coerces numeric ids to strings", async () => {
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        type: "response.created",
        response: {
          id: 987,
          model: "gpt-4.1-mini",
          status: "in_progress",
          output: [],
        },
      })}\n\n`,
      `data: ${JSON.stringify({
        type: "response.output_item.added",
        response_id: 987,
        output_index: 0,
        item: {
          id: 456,
          call_id: 654,
          type: "function_call",
          status: "in_progress",
          name: "lookup",
          arguments: "",
        },
      })}\n\n`,
      `data: ${JSON.stringify({
        type: "response.function_call_arguments.delta",
        response_id: 987,
        item_id: 456,
        output_index: 0,
        delta: '{"q":',
      })}\n\n`,
      `data: ${JSON.stringify({
        type: "response.function_call_arguments.done",
        response_id: 987,
        item_id: 456,
        output_index: 0,
        arguments: '{"q":1}',
      })}\n\n`,
      `data: ${JSON.stringify({
        type: "response.completed",
        response: {
          id: 987,
          model: "gpt-4.1-mini",
          status: "completed",
          output: [
            {
              id: 456,
              call_id: 654,
              type: "function_call",
              status: "completed",
              name: "lookup",
              arguments: '{"q":1}',
            },
          ],
        },
      })}\n\n`,
    ],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.OPENAI,
      provider: "openai",
      model: "gpt-4.1-mini",
      body: { input: "hello" },
    }
  );

  const payloads = text
    .trim()
    .split("\n")
    .filter((line) => line.startsWith("data: ") && !line.includes("[DONE]"))
    .map((line) => JSON.parse(line.slice(6)));

  const created = payloads.find((payload) => payload.type === "response.created");
  assert.equal(typeof created.response.id, "string");
  assert.equal(created.response.id, "987");

  const added = payloads.find((payload) => payload.type === "response.output_item.added");
  assert.equal(typeof added.response_id, "string");
  assert.equal(added.response_id, "987");
  assert.equal(typeof added.item.id, "string");
  assert.equal(added.item.id, "456");
  assert.equal(typeof added.item.call_id, "string");
  assert.equal(added.item.call_id, "654");

  const delta = payloads.find((payload) => payload.type === "response.function_call_arguments.delta");
  assert.equal(typeof delta.response_id, "string");
  assert.equal(delta.response_id, "987");
  assert.equal(typeof delta.item_id, "string");
  assert.equal(delta.item_id, "456");

  const completed = payloads.find((payload) => payload.type === "response.completed");
  assert.equal(typeof completed.response.id, "string");
  assert.equal(completed.response.id, "987");
  assert.equal(typeof completed.response.output[0].id, "string");
  assert.equal(completed.response.output[0].id, "456");
  assert.equal(typeof completed.response.output[0].call_id, "string");
  assert.equal(completed.response.output[0].call_id, "654");
});

test("createSSEStream responses passthrough does not normalize unrelated top-level id", async () => {
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        type: "response.output_text.delta",
        id: 1,
        response_id: 987,
        item_id: 456,
        delta: "x",
      })}\n\n`,
    ],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.OPENAI,
      provider: "openai",
      model: "gpt-4.1-mini",
      body: { input: "hello" },
    }
  );

  const payloads = text
    .trim()
    .split("\n")
    .filter((line) => line.startsWith("data: ") && !line.includes("[DONE]"))
    .map((line) => JSON.parse(line.slice(6)));

  const delta = payloads.find((p) => p.type === "response.output_text.delta");
  assert.equal(typeof delta.id, "number", "unrelated top-level id should stay numeric");
  assert.equal(delta.id, 1);
  assert.equal(typeof delta.response_id, "string");
  assert.equal(delta.response_id, "987");
  assert.equal(typeof delta.item_id, "string");
  assert.equal(delta.item_id, "456");
});

test("createSSEStream passthrough normalizes numeric id in final chunk without trailing newline", async () => {
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        id: 123,
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [{ index: 0, delta: { content: "Hello" } }],
      })}\n\n`,
      `data: ${JSON.stringify({
        id: 123,
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      })}`,
    ],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.OPENAI,
      provider: "openai",
      model: "gpt-4.1-mini",
      body: { messages: [{ role: "user", content: "hello" }] },
    }
  );

  const lines = text
    .trim()
    .split("\n")
    .filter((line) => line.startsWith("data: ") && !line.includes("[DONE]"));

  for (const line of lines) {
    const payload = JSON.parse(line.slice(6));
    if (payload.id) {
      assert.equal(typeof payload.id, "string", "top-level chunk id should be a string");
      assert.equal(payload.id, "123");
    }
  }
});

test("createSSEStream responses passthrough normalizes numeric ids in final chunk without trailing newline", async () => {
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        type: "response.created",
        response: { id: 987, model: "gpt-4.1-mini", status: "in_progress", output: [] },
      })}\n\n`,
      `data: ${JSON.stringify({
        type: "response.completed",
        response: {
          id: 987,
          model: "gpt-4.1-mini",
          status: "completed",
          output: [
            {
              id: 456,
              call_id: 654,
              type: "function_call",
              status: "completed",
              name: "lookup",
              arguments: "{}",
            },
          ],
        },
      })}`,
    ],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.OPENAI,
      provider: "openai",
      model: "gpt-4.1-mini",
      body: { input: "hello" },
    }
  );

  const payloads = text
    .trim()
    .split("\n")
    .filter((line) => line.startsWith("data: ") && !line.includes("[DONE]"))
    .map((line) => JSON.parse(line.slice(6)));

  const completed = payloads.find((p) => p.type === "response.completed");
  assert.equal(typeof completed.response.id, "string");
  assert.equal(completed.response.id, "987");
  assert.equal(typeof completed.response.output[0].id, "string");
  assert.equal(completed.response.output[0].id, "456");
  assert.equal(typeof completed.response.output[0].call_id, "string");
  assert.equal(completed.response.output[0].call_id, "654");
});

test("createSSEStream passthrough coerces tool_call id 0 without index", async () => {
  let onCompletePayload = null;
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        id: "cmpl_0",
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [{ index: 0, delta: { role: "assistant", content: "" } }],
      })}\n\n`,
      `data: ${JSON.stringify({
        id: "cmpl_0",
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [
          {
            index: 0,
            delta: {
              tool_calls: [
                {
                  id: 0,
                  type: "function",
                  function: { name: "zero", arguments: '{"path":"/tmp"}' },
                },
              ],
            },
          },
        ],
      })}\n\n`,
      `data: ${JSON.stringify({
        id: "cmpl_0",
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
      body: { messages: [{ role: "user", content: "hello" }] },
      onComplete(payload) {
        onCompletePayload = payload;
      },
    }
  );

  const lines = text
    .trim()
    .split("\n")
    .filter((line) => line.startsWith("data: ") && !line.includes("[DONE]"));
  let sawStreamedToolCall = false;
  for (const line of lines) {
    const payload = JSON.parse(line.slice(6));
    const tc = payload?.choices?.[0]?.delta?.tool_calls?.[0];
    if (tc?.id != null) {
      assert.equal(typeof tc.id, "string", "tool_call.id should be a string");
      assert.equal(tc.id, "0");
      sawStreamedToolCall = true;
    }
  }
  assert.equal(sawStreamedToolCall, true, "expected streamed tool_call.id to be present");

  const finalId = onCompletePayload?.responseBody?.choices?.[0]?.message?.tool_calls?.[0]?.id;
  assert.equal(typeof finalId, "string", "tool_call.id in final message should be a string");
  assert.equal(finalId, "0");
});

test("createSSEStream Claude passthrough does not normalize numeric ids", async () => {
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        type: "message_start",
        message: {
          id: 987,
          type: "message",
          role: "assistant",
          content: [],
          model: "claude-3-5-sonnet",
        },
      })}\n\n`,
      `data: ${JSON.stringify({
        type: "content_block_start",
        index: 0,
        content_block: {
          id: 456,
          type: "text",
          text: "",
        },
      })}\n\n`,
      `data: ${JSON.stringify({
        type: "content_block_delta",
        index: 0,
        delta: {
          type: "text_delta",
          text: "Hello",
        },
      })}\n\n`,
      `data: ${JSON.stringify({
        type: "message_stop",
      })}\n`,
    ],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.ANTHROPIC,
      provider: "anthropic",
      model: "claude-3-5-sonnet-20241022",
      body: { messages: [{ role: "user", content: "hello" }] },
    }
  );

  const payloads = text
    .trim()
    .split("\n")
    .filter((line) => line.startsWith("data: ") && !line.includes("[DONE]"))
    .map((line) => JSON.parse(line.slice(6)));

  const start = payloads.find((p) => p.type === "message_start");
  assert.equal(start.message.id, 987, "Claude message id should remain numeric");
  assert.equal(typeof start.message.id, "number");

  const contentStart = payloads.find((p) => p.type === "content_block_start");
  assert.equal(contentStart.content_block.id, 456, "Claude content block id should remain numeric");
  assert.equal(typeof contentStart.content_block.id, "number");
});
