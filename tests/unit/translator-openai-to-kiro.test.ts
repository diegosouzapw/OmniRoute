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
