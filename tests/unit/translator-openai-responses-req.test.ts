import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest, openaiToOpenAIResponsesRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");

test("Responses -> Chat converts instructions, inputs, function calls, outputs, tools and tool_choice", () => {
  const result = openaiResponsesToOpenAIRequest(
    "gpt-4o",
    {
      instructions: "Rules",
      input: [
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
          type: "function_call",
          call_id: "call_1",
          name: "read_file",
          arguments: { path: "/tmp/a" },
        },
        {
          type: "function_call_output",
          call_id: "call_1",
          output: { ok: true },
        },
      ],
      tools: [
        {
          type: "function",
          name: "read_file",
          description: "Read",
          parameters: { type: "object" },
        },
      ],
      tool_choice: { type: "function", name: "read_file" },
    },
    false,
    null
  );

  assert.deepEqual((result as any).messages, [
    { role: "system", content: "Rules" },
    {
      role: "user",
      content: [
        { type: "text", text: "Hello" },
        { type: "image_url", image_url: { url: "https://example.com/cat.png", detail: "high" } },
        { type: "file", file: { file_data: "abc", filename: "doc.txt" } },
      ],
    },
    {
      role: "assistant",
      content: null,
      tool_calls: [
        {
          id: "call_1",
          type: "function",
          function: { name: "read_file", arguments: '{"path":"/tmp/a"}' },
        },
      ],
    },
    { role: "tool", tool_call_id: "call_1", content: '{"ok":true}' },
  ]);
  (assert as any).deepEqual((result as any).tools, [
    {
      type: "function",
      function: {
        name: "read_file",
        description: "Read",
        parameters: { type: "object" },
        strict: undefined,
      },
    },
  ]);
  (assert as any).deepEqual((result as any).tool_choice, {
    type: "function",
    function: { name: "read_file" },
  });
});

test("Responses -> Chat filters orphan tool outputs and supports role-based message items", () => {
  const result = openaiResponsesToOpenAIRequest(
    "gpt-4o",
    {
      input: [
        { role: "user", content: [{ type: "input_text", text: "Hello" }] },
        { type: "function_call_output", call_id: "orphan", output: "skip" },
        { type: "function_call", call_id: "call_2", name: "search", arguments: "{}" },
        { type: "function_call_output", call_id: "call_2", output: "found" },
      ],
    },
    false,
    null
  );

  assert.equal((result as any).messages.length, 3);
  assert.equal((result as any).messages[0].role, "user");
  assert.equal((result as any).messages[1].tool_calls[0].id, "call_2");
  (assert as any).deepEqual((result as any).messages[2], {
    role: "tool",
    tool_call_id: "call_2",
    content: "found",
  });
});

test("Responses -> Chat rejects unsupported built-in tools", () => {
  assert.throws(
    () =>
      openaiResponsesToOpenAIRequest(
        "gpt-4o",
        {
          input: [],
          tools: [{ type: "web_search_preview", name: "search" }],
        },
        false,
        null
      ),
    (error: any) => error.statusCode === 400 && error.errorType === "unsupported_feature"
  );
});

test("Responses -> Chat strips background flag and degrades to synchronous execution", () => {
  // Previously this threw 400 unsupported_feature. OmniRoute is a forward proxy
  // and cannot host the deferred run + poll contract, so background=true is
  // silently dropped and the request runs synchronously. Clients that set the
  // flag opportunistically (Capy Captain Pro, Codex agents) work unchanged.
  const warnLog: string[] = [];
  const originalWarn = console.warn;
  console.warn = (msg: unknown) => warnLog.push(String(msg));
  try {
    const result = openaiResponsesToOpenAIRequest(
      "gpt-5.5",
      {
        input: [{ role: "user", content: [{ type: "input_text", text: "hi" }] }],
        background: true,
      },
      true,
      { provider: "codex" }
    );
    const r = result as Record<string, unknown>;
    assert.equal(r.background, undefined, "background flag must be stripped from output");
    assert.ok(Array.isArray(r.messages), "translation must complete and produce messages");
    assert.equal((r.messages as unknown[]).length, 1, "user message must be preserved");
    assert.ok(
      warnLog.some((m) => m.startsWith("BACKGROUND_DEGRADE provider=codex model=gpt-5.5")),
      "BACKGROUND_DEGRADE warning log must be emitted when background=true"
    );
  } finally {
    console.warn = originalWarn;
  }
});

test("Responses -> Chat passes through when background flag is unset or false (no degrade log)", () => {
  // Verifies the inverse of the degradation case: when background is absent or
  // explicitly false, no warning should be emitted and the request body should
  // not carry a residual background field. Guards against accidental log spam
  // and confirms the degradation logic is conditional on background === true.
  const warnLog: string[] = [];
  const originalWarn = console.warn;
  console.warn = (msg: unknown) => warnLog.push(String(msg));
  try {
    // Case 1: background unset
    const r1 = openaiResponsesToOpenAIRequest(
      "gpt-5.5",
      { input: [{ role: "user", content: [{ type: "input_text", text: "hi" }] }] },
      true,
      { provider: "codex" }
    ) as Record<string, unknown>;
    assert.equal(r1.background, undefined, "background must be absent on output (unset case)");

    // Case 2: background explicitly false
    const r2 = openaiResponsesToOpenAIRequest(
      "gpt-5.5",
      {
        input: [{ role: "user", content: [{ type: "input_text", text: "hi" }] }],
        background: false,
      },
      true,
      { provider: "codex" }
    ) as Record<string, unknown>;
    assert.equal(r2.background, undefined, "background must be stripped on output (false case)");

    assert.equal(
      warnLog.filter((m) => m.startsWith("BACKGROUND_DEGRADE")).length,
      0,
      "BACKGROUND_DEGRADE must NOT be emitted for unset or false values"
    );
  } finally {
    console.warn = originalWarn;
  }
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
