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
    userInputMessage: { content: "Rules\n\nHello", modelId: "claude-sonnet-4" },
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
    required: [],
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
    { userInputMessage: { content: "First user", modelId: "claude-sonnet-4" } },
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
