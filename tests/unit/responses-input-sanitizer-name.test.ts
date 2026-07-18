import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeResponsesInputItems } from "../../open-sse/services/responsesInputSanitizer.ts";

test("truncates function_call name longer than 128 chars", () => {
  const longName = "a".repeat(156);
  const items = [{ type: "function_call", call_id: "c1", name: longName, arguments: "{}" }];
  const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;
  assert.ok((result[0].name as string).length <= 128);
});

test("strips illegal characters from function_call name leaving only [a-zA-Z0-9_-]", () => {
  const items = [
    { type: "function_call", call_id: "c2", name: "mcp__ns__get.issue item", arguments: "{}" },
  ];
  const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;
  assert.match(result[0].name as string, /^[a-zA-Z0-9_-]+$/);
});

test("strips illegal characters from function_call_output name", () => {
  const items = [
    { type: "function_call_output", call_id: "c3", name: "tool.with.dots", output: "ok" },
  ];
  const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;
  assert.match(result[0].name as string, /^[a-zA-Z0-9_-]+$/);
});

test("leaves a valid name unchanged", () => {
  const items = [
    { type: "function_call", call_id: "c4", name: "valid_tool-name", arguments: "{}" },
  ];
  const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;
  assert.equal(result[0].name, "valid_tool-name");
});

test("does not modify message items", () => {
  const items = [{ type: "message", role: "user", content: "hello" }];
  const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;
  assert.deepEqual(result[0], { type: "message", role: "user", content: "hello" });
});

test("handles name that is both too long and has illegal chars", () => {
  const badName = "mcp__ns__get.issue.".repeat(10); // 190 chars with dots
  const items = [{ type: "function_call", call_id: "c5", name: badName, arguments: "{}" }];
  const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;
  const name = result[0].name as string;
  assert.ok(name.length <= 128);
  assert.match(name, /^[a-zA-Z0-9_-]+$/);
});

test("strips invalid synthetic reasoning item ids", () => {
  const items = [
    {
      id: "thinking_0",
      type: "reasoning",
      summary: [{ type: "summary_text", text: "cached reasoning" }],
    },
  ];
  const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;
  assert.equal(result[0].id, undefined);
  assert.equal(result[0].type, "reasoning");
});

test("keeps valid server reasoning item ids", () => {
  const items = [
    {
      id: "rs_123",
      type: "reasoning",
      summary: [{ type: "summary_text", text: "stored reasoning" }],
    },
  ];
  const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;
  assert.equal(result[0].id, "rs_123");
});

test("normalizes user image_url content parts to input_image", () => {
  const items = [
    {
      type: "message",
      role: "user",
      content: [
        { type: "image_url", image_url: { url: "https://example.com/u.png", detail: "high" } },
      ],
    },
  ];
  const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;
  assert.deepEqual((result[0].content as unknown[])[0], {
    type: "input_image",
    image_url: "https://example.com/u.png",
    detail: "high",
  });
});

test("normalizes assistant image content parts to output_text", () => {
  const items = [
    {
      type: "message",
      role: "assistant",
      content: [
        { type: "image_url", image_url: { url: "https://example.com/a.png" } },
        { type: "input_image", image_url: "https://example.com/b.png" },
      ],
    },
  ];
  const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;
  assert.deepEqual(result[0], {
    type: "message",
    role: "assistant",
    content: [
      { type: "output_text", text: "[Image: https://example.com/a.png]" },
      { type: "output_text", text: "[Image: https://example.com/b.png]" },
    ],
  });
});

test("normalizes replayed Responses output image parts to input_image", () => {
  const items = [
    {
      type: "message",
      role: "assistant",
      output: [{ type: "image_url", image_url: { url: "https://example.com/output.png" } }],
    },
  ];
  const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;
  assert.deepEqual(result[0], {
    type: "message",
    role: "assistant",
    output: [{ type: "input_image", image_url: "https://example.com/output.png" }],
  });
  assert.equal(JSON.stringify(result).includes('"type":"image_url"'), false);
});

test("normalizes nested output_text parts to input_text", () => {
  const items = [
    {
      type: "function_call_output",
      call_id: "call_2",
      output: [
        {
          type: "output_text",
          text: "tool result",
          annotations: [],
          logprobs: [],
          obfuscation: "opaque",
        },
      ],
    },
  ];
  const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;
  assert.deepEqual(result[0], {
    type: "function_call_output",
    call_id: "call_2",
    output: [{ type: "input_text", text: "tool result" }],
  });
});

test("normalizes nested refusal parts to input_text", () => {
  const items = [
    {
      type: "function_call_output",
      call_id: "call_3",
      output: [
        {
          type: "refusal",
          refusal: "I can't help with that.",
          annotations: [],
          logprobs: [],
          obfuscation: "opaque",
        },
      ],
    },
  ];
  const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;
  assert.deepEqual(result[0], {
    type: "function_call_output",
    call_id: "call_3",
    output: [{ type: "input_text", text: "I can't help with that." }],
  });
});

test("normalizes function_call_output image output parts to input_image", () => {
  const items = [
    {
      type: "function_call_output",
      call_id: "call_1",
      output: [{ type: "image_url", image_url: { url: "https://example.com/tool.png" } }],
    },
  ];
  const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;
  assert.deepEqual(result[0], {
    type: "function_call_output",
    call_id: "call_1",
    output: [{ type: "input_image", image_url: "https://example.com/tool.png" }],
  });
  assert.equal(JSON.stringify(result).includes('"type":"image_url"'), false);
});

test("preserves custom_tool_call_output input content parts", () => {
  const items = [
    {
      type: "custom_tool_call_output",
      call_id: "call_2",
      output: [
        { type: "input_text", text: "image tool output" },
        { type: "input_image", image_url: "data:image/png;base64,AAAA" },
      ],
    },
  ];
  const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;
  assert.deepEqual(result[0], items[0]);
  assert.equal(JSON.stringify(result).includes('"type":"output_text"'), false);
});
