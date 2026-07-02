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

test("Responses -> Chat rejects unsupported built-in tools (non-web_search)", () => {
  // file_search and code_interpreter are Responses-API-only tools with no Chat Completions
  // equivalent and are not in the web_search family — they must still throw 400.
  assert.throws(
    () =>
      openaiResponsesToOpenAIRequest(
        "gpt-4o",
        {
          input: [],
          tools: [{ type: "file_search", name: "search" }],
        },
        false,
        null
      ),
    (error: any) => error.statusCode === 400 && error.errorType === "unsupported_feature"
  );
});

test("Responses -> Chat passes through web_search_preview tool (web_search family)", () => {
  // web_search_preview is OpenAI's Responses API server tool; it matches ^web_search and
  // is preserved as-is rather than rejected with 400.
  const result = openaiResponsesToOpenAIRequest(
    "gpt-4o",
    {
      input: [],
      tools: [{ type: "web_search_preview", name: "search" }],
    },
    false,
    null
  ) as Record<string, unknown>;

  assert.ok(Array.isArray(result.tools), "tools array must be present");
  assert.equal((result.tools as any[])[0].type, "web_search_preview");
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

test("Responses -> Chat strips safety_identifier (LobeHub #2770)", () => {
  // LobeHub sends safety_identifier in Responses API bodies. Chat Completions rejects it
  // with HTTP 400. The translator must strip it in the Responses-API cleanup block.
  const result = openaiResponsesToOpenAIRequest(
    "gpt-4o",
    {
      input: [{ role: "user", content: [{ type: "input_text", text: "hi" }] }],
      safety_identifier: "sid-xyz",
    },
    false,
    null
  ) as Record<string, unknown>;

  assert.equal(
    result.safety_identifier,
    undefined,
    "safety_identifier must be stripped before forwarding to Chat Completions"
  );
  assert.ok(Array.isArray(result.messages), "translation must still produce messages");
});

test("Responses -> Chat strips client_metadata (Mistral 422 fix)", () => {
  // Codex CLI always sends client_metadata in Responses API requests. Mistral (and other
  // strict upstreams) reject it with HTTP 422 extra_forbidden. The translator must strip
  // the field in the Responses-API cleanup block so it never reaches the upstream.
  const result = openaiResponsesToOpenAIRequest(
    "mistral-large-latest",
    {
      input: [{ role: "user", content: [{ type: "input_text", text: "oi" }] }],
      client_metadata: { session_id: "abc123", foo: "bar" },
    },
    false,
    null
  ) as Record<string, unknown>;

  assert.equal(
    result.client_metadata,
    undefined,
    "client_metadata must be stripped before forwarding to Chat Completions"
  );
  assert.ok(Array.isArray(result.messages), "translation must still produce messages");
  assert.equal((result.messages as unknown[]).length, 1, "user message must be preserved");
});

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

test("Responses -> Chat drops `reasoning` and promotes effort to reasoning_effort even without Copilot marker", () => {
  // Updated per upstream PR decolua/9router#1817 (ryanngit): the OpenAI-native
  // `reasoning_effort` hint is always preserved across the Responses -> Chat
  // hop; only the Copilot-specific `summary` -> Claude marker stays gated.
  const result = openaiResponsesToOpenAIRequest(
    "claude-opus-4-7",
    {
      input: [{ role: "user", content: [{ type: "input_text", text: "hi" }] }],
      reasoning: { effort: "high" },
    },
    true,
    null
  ) as Record<string, unknown>;

  assert.equal(result.reasoning, undefined);
  assert.equal(result.reasoning_effort, "high");
});

test("Responses -> Chat promotes reasoning.effort to reasoning_effort when _copilotClient is set", () => {
  const result = openaiResponsesToOpenAIRequest(
    "claude-opus-4-7",
    {
      input: [{ role: "user", content: [{ type: "input_text", text: "hi" }] }],
      reasoning: { effort: "high" },
    },
    true,
    { _copilotClient: true }
  ) as Record<string, unknown>;

  assert.equal(result.reasoning, undefined);
  assert.equal(result.reasoning_effort, "high");
});

test("Responses -> Chat normalizes Copilot reasoning.effort=max to xhigh", () => {
  const result = openaiResponsesToOpenAIRequest(
    "claude-opus-4-7",
    {
      input: [{ role: "user", content: [{ type: "input_text", text: "hi" }] }],
      reasoning: { effort: "max" },
    },
    true,
    { _copilotClient: true }
  ) as Record<string, unknown>;

  assert.equal(result.reasoning_effort, "xhigh");
});

test("Responses -> Chat keeps an explicit reasoning_effort over reasoning.effort when _copilotClient is set", () => {
  const result = openaiResponsesToOpenAIRequest(
    "claude-opus-4-7",
    {
      input: [{ role: "user", content: [{ type: "input_text", text: "hi" }] }],
      reasoning: { effort: "low" },
      reasoning_effort: "high",
    },
    true,
    { _copilotClient: true }
  ) as Record<string, unknown>;

  assert.equal(result.reasoning_effort, "high");
});

test("Responses -> Chat ignores Copilot marker when reasoning field is absent", () => {
  const result = openaiResponsesToOpenAIRequest(
    "claude-opus-4-7",
    { input: [{ role: "user", content: [{ type: "input_text", text: "hi" }] }] },
    true,
    { _copilotClient: true }
  ) as Record<string, unknown>;

  assert.equal(result.reasoning_effort, undefined);
});

// --- Issue #2695: web_search tool types (Anthropic versioned names) ---

test("Responses -> Chat: web_search_20250305 tool does not throw (issue #2695)", () => {
  // Claude Code sends the Anthropic versioned tool name; must NOT reject with 400.
  assert.doesNotThrow(() =>
    openaiResponsesToOpenAIRequest(
      "gpt-4o",
      {
        input: [{ role: "user", content: [{ type: "input_text", text: "search" }] }],
        tools: [{ type: "web_search_20250305" }],
      },
      false,
      null
    )
  );
});

test("Responses -> Chat: web_search_20250305 tool is preserved in output tools array", () => {
  const result = openaiResponsesToOpenAIRequest(
    "gpt-4o",
    {
      input: [{ role: "user", content: [{ type: "input_text", text: "search" }] }],
      tools: [{ type: "web_search_20250305" }],
    },
    false,
    null
  ) as Record<string, unknown>;

  const tools = result.tools as any[];
  assert.ok(Array.isArray(tools), "tools array must be present");
  assert.equal(tools.length, 1, "one tool must be present");
  // Original versioned name is preserved so Anthropic-compatible upstreams receive what they expect.
  assert.equal(tools[0].type, "web_search_20250305");
});

test("Responses -> Chat: plain web_search tool does not throw", () => {
  assert.doesNotThrow(() =>
    openaiResponsesToOpenAIRequest(
      "gpt-4o",
      {
        input: [{ role: "user", content: [{ type: "input_text", text: "search" }] }],
        tools: [{ type: "web_search" }],
      },
      false,
      null
    )
  );
});

test("Responses -> Chat: function tool still translates correctly (no regression)", () => {
  const result = openaiResponsesToOpenAIRequest(
    "gpt-4o",
    {
      input: [{ role: "user", content: [{ type: "input_text", text: "hello" }] }],
      tools: [
        {
          type: "function",
          name: "my_func",
          description: "does stuff",
          parameters: { type: "object" },
        },
      ],
    },
    false,
    null
  ) as Record<string, unknown>;

  const tools = result.tools as any[];
  assert.ok(Array.isArray(tools), "tools array must be present");
  assert.equal(tools[0].type, "function");
  assert.ok(tools[0].function, "function tool must have .function property");
  assert.equal(tools[0].function.name, "my_func");
});

test("Responses -> Chat: unknown tool type still throws unsupported_feature (no regression)", () => {
  assert.throws(
    () =>
      openaiResponsesToOpenAIRequest(
        "gpt-4o",
        {
          input: [],
          tools: [{ type: "unknown_tool_xyz" }],
        },
        false,
        null
      ),
    (error: any) => error.statusCode === 400 && error.errorType === "unsupported_feature"
  );
});

// --- Issue #2766: tool_search built-in should be silently dropped ---

test("Responses -> Chat: tool_search does not throw (issue #2766)", () => {
  // Codex newer clients send tool_search as a Responses API built-in.
  // OmniRoute must not return 400 — it should silently drop the tool_search entry.
  assert.doesNotThrow(() =>
    openaiResponsesToOpenAIRequest(
      "gpt-4o",
      {
        input: [{ role: "user", content: [{ type: "input_text", text: "search" }] }],
        tools: [{ type: "tool_search", name: "search" }],
      },
      false,
      null
    )
  );
});

test("Responses -> Chat: tool_search is stripped from output tools array (issue #2766)", () => {
  // Codex clients send tool_search alongside function tools. tool_search has no
  // Chat Completions equivalent and must be dropped; function tools must remain.
  const result = openaiResponsesToOpenAIRequest(
    "gpt-4o",
    {
      input: [{ role: "user", content: [{ type: "input_text", text: "hello" }] }],
      tools: [
        { type: "tool_search", name: "search" },
        {
          type: "function",
          name: "foo",
          description: "A function",
          parameters: { type: "object" },
        },
      ],
    },
    false,
    null
  ) as Record<string, unknown>;

  const tools = result.tools as any[];
  assert.ok(Array.isArray(tools), "tools array must be present");
  assert.equal(
    tools.some((t) => t.type === "tool_search"),
    false,
    "tool_search must be stripped from output"
  );
  assert.equal(tools.length, 1, "only the function tool must remain");
  assert.equal(tools[0].type, "function");
  assert.equal(tools[0].function.name, "foo");
});

// --- Issue #2950: image_generation built-in should be silently dropped ---

test("Responses -> Chat: image_generation does not throw (issue #2950)", () => {
  // Codex Desktop injects an image_generation hosted tool into every Responses
  // request, even text-only ones. It has no Chat Completions equivalent and must
  // be dropped silently, not rejected with 400.
  assert.doesNotThrow(() =>
    openaiResponsesToOpenAIRequest(
      "gpt-4o",
      {
        input: [{ role: "user", content: [{ type: "input_text", text: "hi" }] }],
        tools: [{ type: "image_generation", output_format: "png" }],
      },
      false,
      null
    )
  );
});

test("Responses -> Chat: image_generation is stripped from output tools array (issue #2950)", () => {
  const result = openaiResponsesToOpenAIRequest(
    "gpt-4o",
    {
      input: [{ role: "user", content: [{ type: "input_text", text: "hello" }] }],
      tools: [
        { type: "image_generation", output_format: "png" },
        {
          type: "function",
          name: "foo",
          description: "A function",
          parameters: { type: "object" },
        },
      ],
    },
    false,
    null
  ) as Record<string, unknown>;

  const tools = result.tools as any[];
  assert.ok(Array.isArray(tools), "tools array must be present");
  assert.equal(
    tools.some((t) => t.type === "image_generation"),
    false,
    "image_generation must be stripped from output"
  );
  assert.equal(tools.length, 1, "only the function tool must remain");
  assert.equal(tools[0].type, "function");
  assert.equal(tools[0].function.name, "foo");
});

// --- Codex CLI: local_shell built-in should be mapped to a function tool ---

test("Responses -> Chat: local_shell does not throw", () => {
  assert.doesNotThrow(() =>
    openaiResponsesToOpenAIRequest(
      "gpt-4o",
      {
        input: [{ role: "user", content: [{ type: "input_text", text: "pwd" }] }],
        tools: [{ type: "local_shell" }],
      },
      false,
      null
    )
  );
});

test("Responses -> Chat: local_shell maps to a shell function tool", () => {
  const result = openaiResponsesToOpenAIRequest(
    "gpt-4o",
    {
      input: [{ role: "user", content: [{ type: "input_text", text: "pwd" }] }],
      tools: [{ type: "local_shell" }],
    },
    false,
    null
  ) as Record<string, unknown>;

  const tools = result.tools as any[];
  assert.ok(Array.isArray(tools), "tools array must be present");
  assert.equal(tools.length, 1, "local_shell must be represented as one function tool");
  assert.equal(tools[0].type, "function");
  assert.equal(tools[0].function.name, "shell");
  assert.equal(tools[0].function.parameters.type, "object");
  assert.deepEqual(tools[0].function.parameters.required, ["command"]);
});

test("Responses -> Chat: local_shell tool_choice maps to shell function choice", () => {
  const result = openaiResponsesToOpenAIRequest(
    "gpt-4o",
    {
      input: [{ role: "user", content: [{ type: "input_text", text: "pwd" }] }],
      tools: [{ type: "local_shell" }],
      tool_choice: { type: "local_shell" },
    },
    false,
    null
  ) as Record<string, unknown>;

  assert.deepEqual(result.tool_choice, { type: "function", function: { name: "shell" } });
});

test("Chat -> Responses: shell function stays caller-side and does not leak local_shell", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-4o",
    {
      messages: [{ role: "user", content: "pwd" }],
      tools: [
        {
          type: "function",
          function: {
            name: "shell",
            description: "Run a shell command",
            parameters: { type: "object" },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "shell" } },
    },
    false,
    null
  ) as Record<string, unknown>;

  assert.equal((result.tools as any[])[0].type, "function");
  assert.equal((result.tools as any[])[0].name, "shell");
  assert.equal((result.tools as any[])[0].description, "Run a shell command");
  assert.deepEqual((result.tools as any[])[0].parameters, { type: "object" });
  assert.deepEqual(result.tool_choice, { type: "function", name: "shell" });
});

// --- Issue #2893: orphaned tool results from empty/missing call_id ---

test("Responses -> Chat: function_call with empty call_id is dropped together with its output (issue #2893)", () => {
  const result = openaiResponsesToOpenAIRequest(
    "gpt-4o",
    {
      input: [
        { type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] },
        { type: "function_call", name: "read", call_id: "", arguments: "{}" },
        { type: "function_call_output", call_id: "", output: "result" },
      ],
    },
    false,
    null
  ) as Record<string, unknown>;

  const messages = result.messages as any[];
  assert.equal(
    messages.some((m) => m.role === "tool"),
    false,
    "tool result with empty tool_call_id must be dropped"
  );
  const danglingEmptyId = messages.some(
    (m) =>
      m.role === "assistant" &&
      Array.isArray(m.tool_calls) &&
      m.tool_calls.some((tc: any) => !tc.id)
  );
  assert.equal(danglingEmptyId, false, "assistant tool_call with empty id must be dropped");
});

test("Responses -> Chat: function_call with empty name leaves no orphan tool output (issue #2893)", () => {
  const result = openaiResponsesToOpenAIRequest(
    "gpt-4o",
    {
      input: [
        { type: "function_call", name: "", call_id: "c-orphan", arguments: "{}" },
        { type: "function_call_output", call_id: "c-orphan", output: "result" },
      ],
    },
    false,
    null
  ) as Record<string, unknown>;

  const messages = result.messages as any[];
  assert.equal(
    messages.some((m) => m.role === "tool"),
    false,
    "an output whose function_call was skipped (empty name) must not survive as an orphan"
  );
});

test("Responses -> Chat: a valid function_call/output pair is preserved (issue #2893 regression)", () => {
  const result = openaiResponsesToOpenAIRequest(
    "gpt-4o",
    {
      input: [
        { type: "function_call", name: "read", call_id: "c1", arguments: "{}" },
        { type: "function_call_output", call_id: "c1", output: "result" },
      ],
    },
    false,
    null
  ) as Record<string, unknown>;

  const messages = result.messages as any[];
  const assistant = messages.find((m) => m.role === "assistant" && Array.isArray(m.tool_calls));
  assert.ok(assistant, "assistant message with tool_calls must be present");
  assert.equal(assistant.tool_calls[0].id, "c1");
  const toolMsg = messages.find((m) => m.role === "tool");
  assert.ok(toolMsg, "matching tool result must be preserved");
  assert.equal(toolMsg.tool_call_id, "c1");
});

// --- AI SDK image content part (#1330) ---
test("Chat -> Responses converts AI SDK image content part to input_image", () => {
  // AI SDK emits image parts as { type: "image", image: "data:...;base64,..." }
  // rather than the OpenAI { type: "image_url", image_url: { url } } shape. The
  // Responses translator must forward them as input_image (#1330).
  const imageUrl = "data:image/png;base64,iVBORw0KGgo=";
  const result = openaiToOpenAIResponsesRequest(
    "gpt-5.2",
    {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Describe this image" },
            { type: "image", image: imageUrl, detail: "high" },
          ],
        },
      ],
    },
    true,
    {}
  ) as Record<string, unknown>;

  const input = result.input as any[];
  assert.deepEqual(input[0].content, [
    { type: "input_text", text: "Describe this image" },
    { type: "input_image", image_url: imageUrl, detail: "high" },
  ]);
});

test("Chat -> Responses defaults AI SDK image detail to auto", () => {
  const imageUrl = "data:image/jpeg;base64,/9j/4AAQ=";
  const result = openaiToOpenAIResponsesRequest(
    "gpt-5.2",
    { messages: [{ role: "user", content: [{ type: "image", image: imageUrl }] }] },
    true,
    {}
  ) as Record<string, unknown>;

  const input = result.input as any[];
  assert.deepEqual(input[0].content[0], {
    type: "input_image",
    image_url: imageUrl,
    detail: "auto",
  });
});
