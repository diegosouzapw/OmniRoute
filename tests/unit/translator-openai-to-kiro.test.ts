import test from "node:test";
import assert from "node:assert/strict";

const { buildKiroPayload } = await import("../../open-sse/translator/request/openai-to-kiro.ts");

function buildSamplePayload() {
  return buildKiroPayload(
    "claude-sonnet-4",
    {
      messages: [
        { role: "system", content: "Rules" },
        { role: "user", content: "Hello" },
        { role: "assistant", content: "I can help" },
        {
          role: "assistant",
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "read_file", arguments: '{"path":"/tmp/a"}' },
            },
          ],
        },
        { role: "tool", tool_call_id: "call_1", content: "file contents" },
        {
          role: "user",
          content: [
            { type: "text", text: "Thanks" },
            {
              type: "tool_result",
              tool_use_id: "call_1",
              content: [{ type: "text", text: "done" }],
            },
          ],
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "read_file",
            description: "Read",
            parameters: {
              type: "object",
              properties: { path: { type: "string" } },
            },
          },
        },
      ],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 2048,
    },
    false,
    { providerSpecificData: { profileArn: "arn:aws:demo" } }
  );
}

test("OpenAI -> Kiro builds a conversation payload with deterministic structure", () => {
  const result = buildSamplePayload();

  assert.equal(result.profileArn, "arn:aws:demo");
  assert.deepEqual(result.inferenceConfig, {
    maxTokens: 2048,
    temperature: 0.2,
    topP: 0.7,
  });
  assert.equal(result.conversationState.chatTriggerType, "MANUAL");
  assert.match(result.conversationState.conversationId, /^[0-9a-f-]{36}$/);
  assert.equal(result.conversationState.currentMessage.userInputMessage.modelId, "claude-sonnet-4");
  assert.equal(result.conversationState.currentMessage.userInputMessage.origin, "AI_EDITOR");
  assert.match(
    result.conversationState.currentMessage.userInputMessage.content,
    /^\[Context: Current time is .*Z\]\n\nThanks$/
  );
});

test("OpenAI -> Kiro preserves prior history, tool uses and accumulated tool results", () => {
  const result = buildSamplePayload();

  assert.equal(result.conversationState.history.length, 2);
  assert.deepEqual(result.conversationState.history[0], {
    userInputMessage: {
      content: "Rules\n\nHello",
      modelId: "claude-sonnet-4",
      origin: "AI_EDITOR",
    },
  });
  assert.deepEqual(result.conversationState.history[1], {
    assistantResponseMessage: {
      content: "I can help",
      toolUses: [
        {
          toolUseId: "call_1",
          name: "read_file",
          input: { path: "/tmp/a" },
        },
      ],
    },
  });

  const context = result.conversationState.currentMessage.userInputMessage.userInputMessageContext;
  assert.equal((context.toolResults as any).length, 2);
  assert.deepEqual(context.toolResults[0], {
    toolUseId: "call_1",
    status: "success",
    content: [{ text: "file contents" }],
  });
  assert.deepEqual(context.toolResults[1], {
    toolUseId: "call_1",
    status: "success",
    content: [{ text: "done" }],
  });
  assert.equal(context.tools[0].toolSpecification.name, "read_file");
  assert.deepEqual(context.tools[0].toolSpecification.inputSchema.json, {
    type: "object",
    properties: { path: { type: "string" } },
  });
});

test("OpenAI -> Kiro maps invalid or empty assistant tool call arguments to empty input", () => {
  const invalidResult = buildKiroPayload(
    "claude-sonnet-4",
    {
      messages: [
        { role: "user", content: "Call a tool" },
        {
          role: "assistant",
          tool_calls: [
            {
              id: "call_invalid",
              type: "function",
              function: { name: "read_file", arguments: "{not-json" },
            },
          ],
        },
        { role: "user", content: "continue" },
      ],
    },
    false,
    null
  );

  assert.deepEqual(
    (invalidResult.conversationState.history[1] as any).assistantResponseMessage.toolUses[0].input,
    {}
  );

  const emptyResult = buildKiroPayload(
    "claude-sonnet-4",
    {
      messages: [
        { role: "user", content: "Call a tool" },
        {
          role: "assistant",
          tool_calls: [
            {
              id: "call_empty",
              type: "function",
              function: { name: "read_file", arguments: "" },
            },
          ],
        },
        { role: "user", content: "continue" },
      ],
    },
    false,
    null
  );

  assert.deepEqual(
    (emptyResult.conversationState.history[1] as any).assistantResponseMessage.toolUses[0].input,
    {}
  );

  const toolUseResult = buildKiroPayload(
    "claude-sonnet-4",
    {
      messages: [
        { role: "user", content: "Call a tool" },
        {
          role: "assistant",
          content: [
            {
              type: "tool_use",
              id: "call_tool_use",
              name: "read_file",
              input: "{not-json",
            },
          ],
        },
        { role: "user", content: "continue" },
      ],
    },
    false,
    null
  );

  assert.deepEqual(
    (toolUseResult.conversationState.history[1] as any).assistantResponseMessage.toolUses[0].input,
    {}
  );
});

test("OpenAI -> Kiro uses Continue currentMessage when the request ends with assistant history", () => {
  const result = buildKiroPayload(
    "claude-sonnet-4",
    {
      messages: [
        { role: "user", content: "First user" },
        { role: "assistant", content: "Assistant answer" },
      ],
    },
    false,
    null
  );

  assert.match(
    result.conversationState.currentMessage.userInputMessage.content,
    /^\[Context: Current time is .*Z\]\n\nContinue$/
  );
  assert.deepEqual(result.conversationState.history, [
    {
      userInputMessage: { content: "First user", modelId: "claude-sonnet-4", origin: "AI_EDITOR" },
    },
    { assistantResponseMessage: { content: "Assistant answer" } },
  ]);
});

test("OpenAI -> Kiro derives a stable conversationId for the same first history turn", () => {
  const first = buildSamplePayload();
  const second = buildSamplePayload();

  assert.equal(
    (first.conversationState as any).history[0].userInputMessage.content,
    "Rules\n\nHello"
  );
  assert.equal(
    (second as any).conversationState.history[0].userInputMessage.content,
    "Rules\n\nHello"
  );
  assert.equal(first.conversationState.conversationId, second.conversationState.conversationId);
});

test("OpenAI -> Kiro still returns a valid payload for minimal requests", () => {
  const result = buildKiroPayload(
    "claude-sonnet-4",
    {
      messages: [{ role: "user", content: "Hi" }],
    },
    false,
    null
  );

  assert.equal(result.conversationState.history.length, 0);
  assert.match(
    result.conversationState.currentMessage.userInputMessage.content,
    /^\[Context: Current time is .*Z\]\n\nHi$/
  );
  assert.equal(result.conversationState.currentMessage.userInputMessage.modelId, "claude-sonnet-4");
});

test("OpenAI -> Kiro merges adjacent user history turns after role normalization", () => {
  const result = buildKiroPayload(
    "claude-sonnet-4",
    {
      messages: [
        { role: "system", content: "System rules" },
        { role: "user", content: "First question" },
        { role: "assistant", content: "Answer 1" },
        { role: "tool", tool_call_id: "call_orphan", content: "tool log" },
        { role: "user", content: "Follow-up" },
      ],
    },
    false,
    null
  );

  const history = result.conversationState.history as Array<{
    userInputMessage?: { content: string };
    assistantResponseMessage?: { content: string };
  }>;

  for (let i = 1; i < history.length; i++) {
    assert.equal(
      Boolean(history[i - 1].userInputMessage) && Boolean(history[i].userInputMessage),
      false,
      "history should not contain adjacent userInputMessage turns"
    );
  }

  const firstUser = history[0].userInputMessage;
  assert.ok(firstUser, "first history turn should be a user turn");
  assert.equal(firstUser.content, "System rules\n\nFirst question");
  assert.equal(history[1].assistantResponseMessage?.content, "Answer 1");
});

test("OpenAI -> Kiro synthesizes tools schema when body.tools is omitted but history has tool_calls", () => {
  const result = buildKiroPayload(
    "claude-opus-4.7",
    {
      messages: [
        { role: "user", content: "Start" },
        {
          role: "assistant",
          tool_calls: [
            {
              id: "tooluse_1",
              type: "function",
              function: { name: "edit", arguments: '{"path":"x"}' },
            },
          ],
        },
        { role: "tool", tool_call_id: "tooluse_1", content: "ok" },
        {
          role: "assistant",
          tool_calls: [
            {
              id: "tooluse_2",
              type: "function",
              function: { name: "bash", arguments: '{"cmd":"ls"}' },
            },
          ],
        },
        { role: "tool", tool_call_id: "tooluse_2", content: "listing" },
        { role: "user", content: "Continue" },
      ],
    },
    false,
    null
  );

  const ctx = result.conversationState.currentMessage.userInputMessage.userInputMessageContext as {
    tools?: Array<{ toolSpecification: { name: string } }>;
  };
  const tools = ctx?.tools;
  assert.ok(tools, "synthesized tools schema should be attached to currentMessage");
  const names = tools.map((t) => t.toolSpecification.name).sort();
  assert.deepEqual(names, ["bash", "edit"]);
});

test("OpenAI -> Kiro does not override body.tools when caller already provides a schema", () => {
  const result = buildKiroPayload(
    "claude-opus-4.7",
    {
      messages: [
        { role: "user", content: "Start" },
        {
          role: "assistant",
          tool_calls: [
            {
              id: "tooluse_1",
              type: "function",
              function: { name: "read_file", arguments: "{}" },
            },
          ],
        },
        { role: "tool", tool_call_id: "tooluse_1", content: "ok" },
        { role: "user", content: "Continue" },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "read_file",
            description: "Real description",
            parameters: { type: "object", properties: { path: { type: "string" } } },
          },
        },
      ],
    },
    false,
    null
  );

  const ctx = result.conversationState.currentMessage.userInputMessage.userInputMessageContext as {
    tools?: Array<{ toolSpecification: { name: string; description: string } }>;
  };
  const tools = ctx.tools;
  assert.ok(tools);
  assert.equal(tools.length, 1);
  assert.equal(tools[0].toolSpecification.description, "Real description");
});

test("OpenAI -> Kiro synthesizes tools from Anthropic-style tool_use content blocks", () => {
  const result = buildKiroPayload(
    "claude-opus-4.7",
    {
      messages: [
        { role: "user", content: "Start" },
        {
          role: "assistant",
          content: [
            { type: "text", text: "Calling tools" },
            { type: "tool_use", id: "tu_1", name: "search", input: { q: "x" } },
            { type: "tool_use", id: "tu_2", name: "open_file", input: { path: "a" } },
          ],
        },
        {
          role: "user",
          content: [
            { type: "tool_result", tool_use_id: "tu_1", content: [{ type: "text", text: "hit" }] },
            { type: "tool_result", tool_use_id: "tu_2", content: [{ type: "text", text: "ok" }] },
          ],
        },
        { role: "user", content: "continue" },
      ],
    },
    false,
    null
  );

  const ctx = result.conversationState.currentMessage.userInputMessage.userInputMessageContext as {
    tools?: Array<{ toolSpecification: { name: string } }>;
  };
  const tools = ctx?.tools;
  assert.ok(tools, "tools should be synthesized from tool_use content blocks");
  const names = tools.map((t) => t.toolSpecification.name).sort();
  assert.deepEqual(names, ["open_file", "search"]);
});

test("OpenAI -> Kiro attaches tools to currentMessage when history has no user turn to carry them", () => {
  const result = buildKiroPayload(
    "claude-opus-4.7",
    {
      messages: [
        {
          role: "assistant",
          tool_calls: [
            { id: "tc_1", type: "function", function: { name: "edit", arguments: "{}" } },
          ],
        },
      ],
    },
    false,
    null
  );

  const cm = result.conversationState.currentMessage.userInputMessage;
  const ctx = cm.userInputMessageContext as {
    tools?: Array<{ toolSpecification: { name: string } }>;
  };
  assert.ok(ctx?.tools, "tools should be attached to currentMessage fallback");
  assert.equal(ctx.tools!.length, 1);
  assert.equal(ctx.tools![0].toolSpecification.name, "edit");
});

test("OpenAI -> Kiro strips additionalProperties and empty required from tool schemas", () => {
  const result = buildKiroPayload(
    "claude-sonnet-4",
    {
      messages: [{ role: "user", content: "Hi" }],
      tools: [
        {
          type: "function",
          function: {
            name: "test_tool",
            description: "Test",
            parameters: {
              type: "object",
              properties: {
                path: { type: "string", additionalProperties: false },
                nested: {
                  type: "object",
                  properties: { id: { type: "string" } },
                  additionalProperties: true,
                },
              },
              required: [],
              additionalProperties: false,
            },
          },
        },
      ],
    },
    false,
    null
  );

  const schema = result.conversationState.currentMessage.userInputMessage.userInputMessageContext
    ?.tools?.[0]?.toolSpecification?.inputSchema?.json as any;

  assert.ok(schema, "schema should exist");
  assert.equal(
    schema.additionalProperties,
    undefined,
    "top-level additionalProperties should be stripped"
  );
  assert.equal(schema.required, undefined, "empty required should be omitted");
  assert.equal(
    schema.properties.path.additionalProperties,
    undefined,
    "nested additionalProperties should be stripped"
  );
  assert.equal(
    schema.properties.nested.additionalProperties,
    undefined,
    "deep nested additionalProperties should be stripped"
  );
});

test("OpenAI -> Kiro merges consecutive assistant messages", () => {
  const result = buildKiroPayload(
    "claude-sonnet-4",
    {
      messages: [
        { role: "user", content: "Hello" },
        { role: "assistant", content: "Part 1" },
        { role: "assistant", content: "Part 2" },
        { role: "user", content: "Continue" },
      ],
    },
    false,
    null
  );

  const history = result.conversationState.history as any[];
  assert.equal(history.length, 2, "consecutive assistants should be merged into one");
  assert.equal(history[0].userInputMessage.content, "Hello");
  assert.equal(history[1].assistantResponseMessage.content, "Part 1\n\nPart 2");
});

test("OpenAI -> Kiro prepends synthetic user when conversation starts with assistant", () => {
  const result = buildKiroPayload(
    "claude-sonnet-4",
    {
      messages: [
        { role: "assistant", content: "Greeting" },
        { role: "user", content: "Hello" },
      ],
    },
    false,
    null
  );

  const history = result.conversationState.history as any[];
  assert.equal(history.length, 2);
  assert.equal(history[0].userInputMessage.content, "(empty)");
  assert.equal(history[0].userInputMessage.origin, "AI_EDITOR");
  assert.equal(history[1].assistantResponseMessage.content, "Greeting");
});

test("OpenAI -> Kiro converts orphaned tool results to text", () => {
  const result = buildKiroPayload(
    "claude-sonnet-4",
    {
      messages: [
        { role: "user", content: "First" },
        { role: "assistant", content: "Answer" },
        { role: "tool", tool_call_id: "orphan_1", content: "result data" },
        { role: "user", content: "Follow-up" },
      ],
    },
    false,
    null
  );

  const currentMsg = result.conversationState.currentMessage.userInputMessage;
  assert.match(currentMsg.content, /Follow-up\n\n\[Tool Result \(orphan_1\)\]\nresult data$/);
  assert.equal(
    currentMsg.userInputMessageContext,
    undefined,
    "orphaned toolResults should be removed from context"
  );
});

test("OpenAI -> Kiro includes origin on all history user messages", () => {
  const result = buildKiroPayload(
    "claude-sonnet-4",
    {
      messages: [
        { role: "user", content: "A" },
        { role: "assistant", content: "B" },
        { role: "user", content: "C" },
      ],
    },
    false,
    null
  );

  const history = result.conversationState.history as any[];
  assert.equal(history[0].userInputMessage.origin, "AI_EDITOR");
  assert.equal(history[1].assistantResponseMessage.content, "B");
  // Note: last user message becomes currentMessage, not history
  assert.equal(history.length, 2);
});

// ── Defeito 1: status hardcoded como "success" ──────────────────────────────

test("OpenAI -> Kiro maps tool_result is_error:true to status:'error'", () => {
  const result = buildKiroPayload(
    "claude-sonnet-4",
    {
      messages: [
        { role: "user", content: "Run a tool" },
        {
          role: "assistant",
          content: [{ type: "tool_use", id: "call_err", name: "bash", input: { cmd: "fail" } }],
        },
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "call_err",
              is_error: true,
              content: [{ type: "text", text: "Command not found" }],
            },
          ],
        },
        { role: "user", content: "What happened?" },
      ],
    },
    false,
    null
  );

  const ctx = result.conversationState.currentMessage.userInputMessage.userInputMessageContext as {
    toolResults?: Array<{ toolUseId: string; status: string; content: Array<{ text: string }> }>;
  };
  assert.ok(ctx?.toolResults, "toolResults should be present");
  const errorResult = ctx.toolResults!.find((tr) => tr.toolUseId === "call_err");
  assert.ok(errorResult, "tool result for call_err should exist");
  assert.equal(errorResult!.status, "error", "is_error:true must map to status:'error'");
  assert.equal(errorResult!.content[0].text, "Command not found");
});

test("OpenAI -> Kiro maps tool_result is_error:false to status:'success'", () => {
  const result = buildKiroPayload(
    "claude-sonnet-4",
    {
      messages: [
        { role: "user", content: "Run a tool" },
        {
          role: "assistant",
          content: [{ type: "tool_use", id: "call_ok", name: "bash", input: { cmd: "echo hi" } }],
        },
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "call_ok",
              is_error: false,
              content: [{ type: "text", text: "hi" }],
            },
          ],
        },
        { role: "user", content: "Done" },
      ],
    },
    false,
    null
  );

  const ctx = result.conversationState.currentMessage.userInputMessage.userInputMessageContext as {
    toolResults?: Array<{ toolUseId: string; status: string }>;
  };
  const okResult = ctx?.toolResults?.find((tr) => tr.toolUseId === "call_ok");
  assert.ok(okResult, "tool result for call_ok should exist");
  assert.equal(okResult!.status, "success");
});

// ── Defeito 2: conteúdo não-texto colapsa para string vazia ─────────────────

test("OpenAI -> Kiro serializes image tool_result content to non-empty text", () => {
  const result = buildKiroPayload(
    "claude-sonnet-4",
    {
      messages: [
        { role: "user", content: "Analyze image" },
        {
          role: "assistant",
          content: [{ type: "tool_use", id: "call_img", name: "capture_screen", input: {} }],
        },
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "call_img",
              content: [
                {
                  type: "image",
                  source: { type: "base64", media_type: "image/png", data: "abc123" },
                },
              ],
            },
          ],
        },
        { role: "user", content: "What do you see?" },
      ],
    },
    false,
    null
  );

  const ctx = result.conversationState.currentMessage.userInputMessage.userInputMessageContext as {
    toolResults?: Array<{ toolUseId: string; content: Array<{ text: string }> }>;
  };
  const imgResult = ctx?.toolResults?.find((tr) => tr.toolUseId === "call_img");
  assert.ok(imgResult, "tool result should exist");
  const text = imgResult!.content[0].text;
  assert.ok(text && text.length > 0, `text must not be empty for image content, got: '${text}'`);
});

test("OpenAI -> Kiro serializes JSON-object tool_result content to non-empty text", () => {
  const result = buildKiroPayload(
    "claude-sonnet-4",
    {
      messages: [
        { role: "user", content: "Search files" },
        {
          role: "assistant",
          content: [
            { type: "tool_use", id: "call_json", name: "list_files", input: { path: "/tmp" } },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "call_json",
              content: [{ type: "json", data: { files: ["a.txt", "b.ts"] } }],
            },
          ],
        },
        { role: "user", content: "Thanks" },
      ],
    },
    false,
    null
  );

  const ctx = result.conversationState.currentMessage.userInputMessage.userInputMessageContext as {
    toolResults?: Array<{ toolUseId: string; content: Array<{ text: string }> }>;
  };
  const jsonResult = ctx?.toolResults?.find((tr) => tr.toolUseId === "call_json");
  assert.ok(jsonResult, "tool result should exist");
  const text = jsonResult!.content[0].text;
  assert.ok(text && text.length > 0, `text must be non-empty, got: '${text}'`);
});

test("OpenAI -> Kiro uses placeholder text when tool_result content is empty array", () => {
  const result = buildKiroPayload(
    "claude-sonnet-4",
    {
      messages: [
        { role: "user", content: "Do something" },
        {
          role: "assistant",
          content: [{ type: "tool_use", id: "call_empty", name: "no_output_tool", input: {} }],
        },
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "call_empty",
              content: [],
            },
          ],
        },
        { role: "user", content: "Continue" },
      ],
    },
    false,
    null
  );

  const ctx = result.conversationState.currentMessage.userInputMessage.userInputMessageContext as {
    toolResults?: Array<{ toolUseId: string; content: Array<{ text: string }> }>;
  };
  const emptyResult = ctx?.toolResults?.find((tr) => tr.toolUseId === "call_empty");
  assert.ok(emptyResult, "tool result should exist");
  const text = emptyResult!.content[0].text;
  assert.ok(text && text.length > 0, `placeholder text must be non-empty, got: '${text}'`);
});

// ── Defeito 3: instabilidade do toolUseId ───────────────────────────────────

test("OpenAI -> Kiro toolUseId round-trips between tool_use and tool_result in 2-turn conversation", () => {
  // Regressão para issue #2446: conversa 2 turnos (tool_use → tool_result → follow-up)
  const result = buildKiroPayload(
    "claude-sonnet-4",
    {
      messages: [
        { role: "user", content: "Create a folder on the desktop" },
        {
          role: "assistant",
          content: [
            {
              type: "tool_use",
              id: "toolu_01abc",
              name: "bash",
              input: { cmd: "mkdir ~/Desktop/new_folder" },
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "toolu_01abc",
              is_error: false,
              content: [{ type: "text", text: "" }],
            },
          ],
        },
        { role: "user", content: "Done! What next?" },
      ],
    },
    false,
    null
  );

  const historyAssistant = (result.conversationState.history as any[]).find(
    (h) => h.assistantResponseMessage?.toolUses
  );
  assert.ok(historyAssistant, "assistant turn with toolUses must be in history");
  const toolUse = historyAssistant.assistantResponseMessage.toolUses[0];
  assert.equal(toolUse.toolUseId, "toolu_01abc", "toolUseId must be preserved from tool_use.id");

  const ctx = result.conversationState.currentMessage.userInputMessage.userInputMessageContext as {
    toolResults?: Array<{ toolUseId: string; status: string }>;
  };
  assert.ok(ctx?.toolResults, "toolResults must be present in currentMessage context");
  const tr = ctx.toolResults!.find((r) => r.toolUseId === "toolu_01abc");
  assert.ok(tr, "toolResult must reference the same toolUseId 'toolu_01abc'");
  assert.equal(tr!.status, "success");
});

test("OpenAI -> Kiro generates stable non-random toolUseId when tool_call has no id", () => {
  const makePayload = () =>
    buildKiroPayload(
      "claude-sonnet-4",
      {
        messages: [
          { role: "user", content: "Start" },
          {
            role: "assistant",
            tool_calls: [
              {
                type: "function",
                function: { name: "read_file", arguments: '{"path":"/tmp/x"}' },
              },
            ],
          },
          { role: "user", content: "Continue" },
        ],
      },
      false,
      null
    );

  const id1 = (makePayload().conversationState.history as any[]).find(
    (h) => h.assistantResponseMessage?.toolUses
  )?.assistantResponseMessage?.toolUses?.[0]?.toolUseId;

  const id2 = (makePayload().conversationState.history as any[]).find(
    (h) => h.assistantResponseMessage?.toolUses
  )?.assistantResponseMessage?.toolUses?.[0]?.toolUseId;

  assert.ok(id1, "toolUseId must be set even when id is absent");
  assert.equal(id1, id2, "toolUseId must be deterministic (same input → same id)");
});

// Regression for #2446: an OpenAI-style `role:"tool"` message carrying NON-string
// (structured / array) content must not collapse to `content:[{ text: "" }]` —
// CodeWhisperer rejects an empty toolResult with 400 "Improperly formed request".
test("OpenAI -> Kiro serializes non-string role:tool content to non-empty text (#2446)", () => {
  const result = buildKiroPayload(
    "claude-sonnet-4",
    {
      messages: [
        { role: "user", content: "list the files" },
        {
          role: "assistant",
          tool_calls: [
            {
              id: "call_mem",
              type: "function",
              function: { name: "read_memory", arguments: "{}" },
            },
          ],
        },
        {
          role: "tool",
          tool_call_id: "call_mem",
          content: [
            { type: "text", text: "entry A" },
            { type: "text", text: "entry B" },
          ],
        },
        { role: "user", content: "thanks" },
      ],
    },
    true,
    null
  );

  const cs = result.conversationState as any;
  const contexts = [
    cs.currentMessage?.userInputMessage?.userInputMessageContext,
    ...(cs.history as any[]).map((h) => h.userInputMessage?.userInputMessageContext),
  ];
  const toolResults = contexts
    .map((c) => c?.toolResults)
    .find((tr) => Array.isArray(tr) && tr.some((r: any) => r.toolUseId === "call_mem"));
  assert.ok(toolResults, "tool role must produce a toolResult");
  const result0 = toolResults.find((r: any) => r.toolUseId === "call_mem");
  const text = result0.content[0].text as string;
  assert.notEqual(text, "", "non-string tool content must not collapse to empty string");
  assert.match(text, /entry A/, "serialized content preserves the structured text blocks");
});
