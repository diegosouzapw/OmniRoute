import test from "node:test";
import assert from "node:assert/strict";

const { buildCursorRequest } =
  await import("../../open-sse/translator/request/openai-to-cursor.ts");

test("OpenAI -> Cursor rewrites system prompts and preserves assistant tool calls", () => {
  const result = buildCursorRequest(
    "gpt-4o",
    {
      messages: [
        { role: "system", content: "Rules" },
        { role: "user", content: "Hello" },
        {
          role: "assistant",
          content: "Working",
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "read_file", arguments: '{"path":"/tmp/a"}' },
              index: 0,
            },
          ],
        },
      ],
    },
    false,
    null
  );

  assert.deepEqual(result.messages[0], {
    role: "user",
    content: "[System Instructions]\nRules",
  });
  assert.deepEqual(result.messages[1], {
    role: "user",
    content: "Hello",
  });
  assert.deepEqual(result.messages[2], {
    role: "assistant",
    content: "Working",
    tool_calls: [
      {
        id: "call_1",
        type: "function",
        function: { name: "read_file", arguments: '{"path":"/tmp/a"}' },
      },
    ],
  });
});

test("OpenAI -> Cursor converts tool_result blocks into sanitized XML user content", () => {
  const result = buildCursorRequest(
    "gpt-4o",
    {
      messages: [
        {
          role: "assistant",
          content: [{ type: "tool_use", id: "call_1\nnoise", name: "read_file", input: {} }],
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Hello" },
            {
              type: "tool_result",
              tool_use_id: "call_1",
              content: [{ type: "text", text: "done\u0000" }],
            },
          ],
        },
      ],
    },
    false,
    null
  );

  assert.equal(result.messages.length, 2);
  assert.equal(result.messages[1].role, "user");
  assert.match(result.messages[1].content, /Hello/);
  assert.match(result.messages[1].content, /<tool_name>read_file<\/tool_name>/);
  assert.match(result.messages[1].content, /<tool_call_id>call_1<\/tool_call_id>/);
  assert.match(result.messages[1].content, /<result>done<\/result>/);
  assert.equal(result.messages[1].content.includes("\u0000"), false);
});

test("OpenAI -> Cursor converts assistant tool_use blocks into assistant tool_calls", () => {
  const result = buildCursorRequest(
    "gpt-4o",
    {
      messages: [
        {
          role: "assistant",
          content: [
            { type: "text", text: "Calling a tool" },
            { type: "tool_use", id: "call_2", name: "weather", input: { city: "Tokyo" } },
          ],
        },
      ],
    },
    false,
    null
  );

  assert.deepEqual(result.messages, [
    {
      role: "assistant",
      content: "Calling a tool",
      tool_calls: [
        {
          id: "call_2",
          type: "function",
          function: { name: "weather", arguments: '{"city":"Tokyo"}' },
        },
      ],
    },
  ]);
});

test("OpenAI -> Cursor converts tool role messages using remembered tool metadata", () => {
  const result = buildCursorRequest(
    "gpt-4o",
    {
      messages: [
        {
          role: "assistant",
          tool_calls: [
            {
              id: "call_3",
              type: "function",
              function: { name: "search_docs", arguments: "{}" },
            },
          ],
        },
        { role: "tool", tool_call_id: "call_3", content: "found it" },
      ],
    },
    false,
    null
  );

  assert.equal(result.messages[1].role, "user");
  assert.match(result.messages[1].content, /<tool_name>search_docs<\/tool_name>/);
  assert.match(result.messages[1].content, /<result>found it<\/result>/);
});
