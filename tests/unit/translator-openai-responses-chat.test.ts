import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest, openaiToOpenAIResponsesRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");

test("Chat -> Responses clamps call_id to 64 chars and keeps the pair matched (port from 9router#396)", () => {
  // The Responses API rejects call_id values longer than 64 characters. A long
  // upstream tool-call id must be clamped on BOTH the function_call and its matching
  // function_call_output, identically, so the orphan filter still pairs them.
  const longId = "call_" + "a".repeat(80); // 85 chars, > 64
  const result = openaiToOpenAIResponsesRequest(
    "gpt-4o",
    {
      messages: [
        {
          role: "assistant",
          content: null,
          tool_calls: [
            { id: longId, type: "function", function: { name: "read_file", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: longId, content: "ok" },
      ],
    },
    false,
    null
  ) as any;

  const input = result.input as Array<Record<string, any>>;
  const fnCall = input.find((i) => i.type === "function_call");
  const fnOut = input.find((i) => i.type === "function_call_output");
  assert.ok(fnCall, "function_call item must exist");
  assert.equal(fnCall.call_id.length, 64, "function_call call_id must be clamped to 64 chars");
  assert.ok(fnOut, "function_call_output must survive the orphan filter after clamping");
  assert.equal(
    fnOut.call_id,
    fnCall.call_id,
    "output call_id must match the clamped function_call id"
  );
});

test("Chat -> Responses converts messages, tool calls, tool outputs, tools and pass-through params", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-4o",
    {
      messages: [
        { role: "system", content: "Rules" },
        {
          role: "user",
          content: [
            { type: "text", text: "Hello" },
            {
              type: "image_url",
              image_url: { url: "https://example.com/cat.png", detail: "high" },
            },
            { type: "file", file: { file_data: "abc", filename: "doc.txt" } },
          ],
        },
        {
          role: "assistant",
          content: "Done",
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "read_file", arguments: '{"path":"/tmp/a"}' },
            },
          ],
        },
        { role: "tool", tool_call_id: "call_1", content: [{ type: "text", text: "ok" }] },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "read_file",
            description: "Read",
            parameters: { type: "object" },
            strict: true,
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "read_file" } },
      previous_response_id: "resp_prev_123",
      temperature: 0.2,
      max_tokens: 100,
      top_p: 0.9,
    },
    false,
    null
  );

  assert.equal((result as any).instructions, "Rules");
  assert.equal((result as any).stream, true);
  assert.equal((result as any).store, false);
  assert.equal((result as any).previous_response_id, "resp_prev_123");
  assert.deepEqual((result as any).input, [
    {
      type: "message",
      role: "user",
      content: [
        { type: "input_text", text: "Hello" },
        { type: "input_image", image_url: "https://example.com/cat.png", detail: "high" },
        { type: "input_file", file_data: "abc", filename: "doc.txt" },
      ],
    },
    {
      type: "message",
      role: "assistant",
      content: [{ type: "output_text", text: "Done" }],
    },
    {
      type: "function_call",
      call_id: "call_1",
      name: "read_file",
      arguments: '{"path":"/tmp/a"}',
    },
    {
      type: "function_call_output",
      call_id: "call_1",
      output: [{ type: "input_text", text: "ok" }],
    },
  ]);
  assert.deepEqual((result as any).tools, [
    {
      type: "function",
      name: "read_file",
      description: "Read",
      parameters: { type: "object" },
      strict: true,
    },
  ]);
  assert.deepEqual((result as any).tool_choice, { type: "function", name: "read_file" });
  assert.equal((result as any).temperature, 0.2);
  assert.equal((result as any).max_output_tokens, 100);
  assert.equal((result as any).top_p, 0.9);
});

test("Chat -> Responses converts json_schema response_format to text.format", () => {
  const schema = {
    type: "object",
    additionalProperties: false,
    properties: { answer: { type: "string" } },
    required: ["answer"],
  };

  const result = openaiToOpenAIResponsesRequest(
    "gpt-5.2-codex",
    {
      messages: [{ role: "user", content: "Return the answer as JSON" }],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "answer_schema",
          description: "A structured answer",
          strict: true,
          schema,
        },
      },
    },
    false,
    null
  ) as any;

  assert.deepEqual(result.text, {
    format: {
      type: "json_schema",
      name: "answer_schema",
      description: "A structured answer",
      strict: true,
      schema,
    },
  });
  assert.equal(result.response_format, undefined);
});

test("Chat -> Responses uses response_format over nonstandard chat text.format", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-5.2-codex",
    {
      messages: [{ role: "user", content: "Return JSON" }],
      text: {
        format: { type: "json_schema", name: "nonstandard", schema: { type: "object" } },
        verbosity: "low",
      },
      response_format: {
        type: "json_schema",
        json_schema: { name: "chat", schema: { type: "object", properties: {} } },
      },
    },
    false,
    null
  ) as any;

  assert.deepEqual(result.text, {
    format: { type: "json_schema", name: "chat", schema: { type: "object", properties: {} } },
  });
});

test("Chat -> Responses ignores nonstandard chat text.format without response_format", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-5.2-codex",
    {
      messages: [{ role: "user", content: "Return JSON" }],
      text: { format: { type: "json_schema", name: "nonstandard", schema: { type: "object" } } },
    },
    false,
    null
  ) as any;

  assert.equal(result.text, undefined);
});

test("Responses round-trip preserves store and previous_response_id when opt-in is enabled", () => {
  const credentials = {
    providerSpecificData: {
      openaiStoreEnabled: true,
    },
  };

  const chatBody = openaiResponsesToOpenAIRequest(
    "gpt-4o",
    {
      instructions: "Rules",
      input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "Hello" }] }],
      previous_response_id: "resp_prev_store",
      store: true,
    },
    false,
    credentials
  );

  const result = openaiToOpenAIResponsesRequest("gpt-4o", chatBody, false, credentials);

  assert.equal((result as any).previous_response_id, "resp_prev_store");
  assert.equal((result as any).store, true);
  assert.equal((result as any).instructions, "Rules");
});

test("Chat -> Responses converts assistant image_url history parts to output_text", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-4o",
    {
      messages: [
        {
          role: "assistant",
          content: [
            { type: "text", text: "I inspected the screenshot." },
            { type: "image_url", image_url: { url: "https://example.com/scope.png" } },
          ],
        },
      ],
    },
    true,
    null
  );

  assert.deepEqual((result as any).input, [
    {
      type: "message",
      role: "assistant",
      content: [
        { type: "output_text", text: "I inspected the screenshot." },
        { type: "output_text", text: "[Image: https://example.com/scope.png]" },
      ],
    },
  ]);
  assert.equal(JSON.stringify(result).includes('"image_url"'), false);
});

test("Chat -> Responses preserves prompt_cache_key and session affinity fields", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-5.3-codex",
    {
      messages: [{ role: "user", content: "Hello" }],
      prompt_cache_key: "cache-key-1",
      session_id: "omniroute-session-abc",
      conversation_id: "conv-123",
    },
    false,
    { providerSpecificData: { openaiStoreEnabled: true } }
  );

  (assert as any).equal((result as any).prompt_cache_key, "cache-key-1");
  (assert as any).equal((result as any).session_id, "omniroute-session-abc");
  assert.equal((result as any).conversation_id, "conv-123");
  assert.equal((result as any).store, undefined);
});

test("Chat -> Responses preserves explicit reasoning objects", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-5.3-codex-spark",
    {
      messages: [{ role: "user", content: "Hello" }],
      reasoning: { effort: "low" },
    },
    false,
    null
  );

  assert.deepEqual((result as any).reasoning, { effort: "low" });
  assert.equal((result as any).store, false);
});

test("Chat -> Responses propagates include so upstream streams the reasoning summary", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-5.3-codex-spark",
    {
      messages: [{ role: "user", content: "Hello" }],
      reasoning: { effort: "high", summary: "auto" },
      include: ["reasoning.encrypted_content"],
    },
    false,
    null
  );

  assert.deepEqual((result as any).include, ["reasoning.encrypted_content"]);
});

test("Chat -> Responses does not inject include when caller did not set one", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-5.3-codex-spark",
    {
      messages: [{ role: "user", content: "Hello" }],
      reasoning: { effort: "high" },
    },
    false,
    null
  );

  assert.equal((result as any).include, undefined);
});

test("Chat -> Responses maps reasoning_effort into Responses reasoning", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-5.3-codex-spark",
    {
      messages: [{ role: "user", content: "Hello" }],
      reasoning_effort: "low",
    },
    false,
    null
  );

  assert.deepEqual((result as any).reasoning, { effort: "low" });
  assert.equal((result as any).reasoning_effort, undefined);
  assert.equal((result as any).store, false);
});

test("Chat -> Responses normalizes reasoning_effort max to xhigh", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-5.5",
    {
      messages: [{ role: "user", content: "Hello" }],
      reasoning_effort: "max",
    },
    false,
    null
  );

  assert.deepEqual((result as any).reasoning, { effort: "xhigh" });
  assert.equal((result as any).reasoning_effort, undefined);
});

test("Chat -> Responses filters orphan function_call_output items and leaves empty instructions when absent", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-4o",
    {
      messages: [
        { role: "user", content: "Hello" },
        { role: "tool", tool_call_id: "orphan", content: "skip" },
        {
          role: "assistant",
          tool_calls: [
            {
              id: "call_2",
              type: "function",
              function: { name: "search", arguments: "{}" },
            },
          ],
        },
        { role: "tool", tool_call_id: "call_2", content: "found" },
      ],
    },
    false,
    null
  );

  assert.equal((result as any).instructions, "");
  assert.equal(
    (result as any).input.some((item) => item.call_id === "orphan"),
    false
  );
  assert.equal(
    (result as any).input.filter((item) => item.type === "function_call_output").length,
    1
  );
  assert.equal(
    (result as any).input.find((item) => item.type === "function_call_output").call_id,
    "call_2"
  );
});

test("Chat -> Responses maps max_completion_tokens to max_output_tokens", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-4o",
    {
      messages: [{ role: "user", content: "Hello" }],
      max_completion_tokens: 2048,
    },
    false,
    null
  );

  (assert as any).equal((result as any).max_output_tokens, 2048);
  assert.equal((result as any).max_tokens, undefined);
  assert.equal((result as any).max_completion_tokens, undefined);
});
test("Chat -> Responses maps legacy max_tokens to max_output_tokens when max_completion_tokens is absent", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-4o",
    {
      messages: [{ role: "user", content: "Hello" }],
      max_tokens: 512,
    },
    false,
    null
  );

  assert.equal((result as any).max_output_tokens, 512);
  assert.equal((result as any).max_tokens, undefined);
});

test("Chat -> Responses prefers max_completion_tokens over max_tokens when both are present", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-4o",
    {
      messages: [{ role: "user", content: "Hello" }],
      max_tokens: 100,
      max_completion_tokens: 4096,
    },
    false,
    null
  );

  (assert as any).equal((result as any).max_output_tokens, 4096);
  assert.equal((result as any).max_tokens, undefined);
  assert.equal((result as any).max_completion_tokens, undefined);
});
