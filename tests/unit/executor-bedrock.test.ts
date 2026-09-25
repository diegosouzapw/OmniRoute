import test from "node:test";
import assert from "node:assert/strict";

import { BedrockExecutor, openAIToBedrockConverse } from "../../open-sse/executors/bedrock.ts";
import { runWithCapture } from "../../open-sse/utils/providerRequestLogging.ts";

function credentials(region = "eu-west-2") {
  return {
    apiKey: "bedrock-key",
    providerSpecificData: { region },
  };
}

test("BedrockExecutor builds regional native Converse URLs", () => {
  const executor = new BedrockExecutor();

  assert.equal(
    executor.buildUrl("anthropic.claude-sonnet-4-6", false, 0, credentials()),
    "https://bedrock-runtime.eu-west-2.amazonaws.com/model/anthropic.claude-sonnet-4-6/converse"
  );
  assert.equal(
    executor.buildUrl("anthropic.claude-sonnet-4-6", true, 0, credentials()),
    "https://bedrock-runtime.eu-west-2.amazonaws.com/model/anthropic.claude-sonnet-4-6/converse-stream"
  );
});

test("openAIToBedrockConverse maps OpenAI chat messages and tools to Bedrock Converse", () => {
  const payload = openAIToBedrockConverse("anthropic.claude-sonnet-4-6", {
    messages: [
      { role: "system", content: "You are concise." },
      { role: "user", content: "What is the weather?" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_weather",
            type: "function",
            function: { name: "get_weather", arguments: '{"city":"Berlin"}' },
          },
        ],
      },
      { role: "tool", tool_call_id: "call_weather", content: "12C" },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "get_weather",
          description: "Get weather",
          parameters: { type: "object", properties: { city: { type: "string" } } },
        },
      },
    ],
    tool_choice: "auto",
    max_tokens: 64,
    temperature: 0.2,
  });

  assert.equal(payload.modelId, "anthropic.claude-sonnet-4-6");
  assert.deepEqual(payload.system, [{ text: "You are concise." }]);
  assert.equal(payload.messages[0].role, "user");
  assert.deepEqual(payload.messages[0].content, [{ text: "What is the weather?" }]);
  assert.equal(payload.messages[1].content[0].toolUse.name, "get_weather");
  assert.deepEqual(payload.messages[1].content[0].toolUse.input, { city: "Berlin" });
  assert.equal(payload.messages[2].content[0].toolResult.toolUseId, "call_weather");
  assert.equal(payload.toolConfig.tools[0].toolSpec.name, "get_weather");
  assert.deepEqual(payload.toolConfig.toolChoice, { auto: {} });
  assert.deepEqual(payload.inferenceConfig, { maxTokens: 64, temperature: 0.2 });
});

test("openAIToBedrockConverse avoids duplicate Bedrock toolUse ids from mixed tool formats", () => {
  const payload = openAIToBedrockConverse("anthropic.claude-sonnet-4-6", {
    messages: [
      { role: "user", content: "use a tool" },
      {
        role: "assistant",
        content: [
          { type: "tool_use", id: "call_dup", name: "lookup", input: { source: "content" } },
        ],
        tool_calls: [
          {
            id: "call_dup",
            type: "function",
            function: { name: "lookup", arguments: '{"source":"tool_calls"}' },
          },
        ],
      },
      { role: "tool", tool_call_id: "call_dup", content: "done" },
    ],
  });

  const toolUseBlocks = payload.messages[1].content.filter((block) => block.toolUse);
  assert.equal(toolUseBlocks.length, 1);
  assert.equal(toolUseBlocks[0].toolUse.toolUseId, "call_dup");
  assert.deepEqual(toolUseBlocks[0].toolUse.input, { source: "tool_calls" });
  assert.equal(payload.messages[2].content[0].toolResult.toolUseId, "call_dup");
});

test("openAIToBedrockConverse preserves additionalModelRequestFields", () => {
  const payload = openAIToBedrockConverse("anthropic.claude-3-7-sonnet-20250219-v1:0", {
    messages: [{ role: "user", content: "Hello" }],
    additionalModelRequestFields: {
      thinking: { type: "enabled", budget_tokens: 2048 },
    },
  });

  assert.deepStrictEqual(payload.additionalModelRequestFields, {
    thinking: { type: "enabled", budget_tokens: 2048 },
  });
});

test("openAIToBedrockConverse drops duplicate pending tool call ids", () => {
  const payload = openAIToBedrockConverse("anthropic.claude-sonnet-4-6", {
    messages: [
      { role: "user", content: "use tools" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_dup",
            type: "function",
            function: { name: "first", arguments: "{}" },
          },
          {
            id: "call_dup",
            type: "function",
            function: { name: "second", arguments: "{}" },
          },
        ],
      },
      { role: "tool", tool_call_id: "call_dup", content: "first result" },
    ],
  });

  const toolUseIds = payload.messages[1].content.map((block) => block.toolUse?.toolUseId);
  assert.deepEqual(toolUseIds, ["call_dup"]);
  assert.equal(payload.messages[2].content[0].toolResult.toolUseId, "call_dup");
});

test("openAIToBedrockConverse allows a tool id to be reused after its result", () => {
  const payload = openAIToBedrockConverse("anthropic.claude-sonnet-4-6", {
    messages: [
      { role: "user", content: "first" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_reuse",
            type: "function",
            function: { name: "first", arguments: "{}" },
          },
        ],
      },
      { role: "tool", tool_call_id: "call_reuse", content: "first result" },
      { role: "user", content: "again" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_reuse",
            type: "function",
            function: { name: "second", arguments: "{}" },
          },
        ],
      },
      { role: "tool", tool_call_id: "call_reuse", content: "second result" },
    ],
  });

  assert.equal(payload.messages[1].content[0].toolUse.toolUseId, "call_reuse");
  assert.equal(payload.messages[2].content[0].toolResult.toolUseId, "call_reuse");
  assert.equal(payload.messages[4].content[0].toolUse.toolUseId, "call_reuse");
  assert.equal(payload.messages[5].content[0].toolResult.toolUseId, "call_reuse");
});

test("openAIToBedrockConverse skips assistant tool calls that have no result in history", () => {
  const payload = openAIToBedrockConverse("anthropic.claude-sonnet-4-6", {
    messages: [
      { role: "user", content: "spawn subagents" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_done",
            type: "function",
            function: { name: "done", arguments: "{}" },
          },
          {
            id: "call_missing",
            type: "function",
            function: { name: "missing", arguments: "{}" },
          },
        ],
      },
      { role: "tool", tool_call_id: "call_done", content: "ok" },
      { role: "user", content: "continue" },
    ],
  });

  const toolUseIds = payload.messages[1].content.map((block) => block.toolUse?.toolUseId);
  assert.deepEqual(toolUseIds, ["call_done"]);
  assert.equal(payload.messages[2].content[0].toolResult.toolUseId, "call_done");
  assert.equal(payload.messages[3].role, "user");
});

test("openAIToBedrockConverse skips content tool_use blocks without matching results", () => {
  const payload = openAIToBedrockConverse("anthropic.claude-sonnet-4-6", {
    messages: [
      { role: "user", content: "spawn subagents" },
      {
        role: "assistant",
        content: [
          { type: "tool_use", id: "call_done", name: "done", input: {} },
          { type: "tool_use", id: "call_missing", name: "missing", input: {} },
        ],
      },
      { role: "tool", tool_call_id: "call_done", content: "ok" },
    ],
  });

  const toolUseIds = payload.messages[1].content.map((block) => block.toolUse?.toolUseId);
  assert.deepEqual(toolUseIds, ["call_done"]);
});

test("openAIToBedrockConverse merges consecutive tool results after multi-tool calls", () => {
  const payload = openAIToBedrockConverse("anthropic.claude-sonnet-4-6", {
    messages: [
      { role: "user", content: "use tools" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_a",
            type: "function",
            function: { name: "a", arguments: "{}" },
          },
          {
            id: "call_b",
            type: "function",
            function: { name: "b", arguments: "{}" },
          },
        ],
      },
      { role: "tool", tool_call_id: "call_a", content: "a result" },
      { role: "tool", tool_call_id: "call_b", content: "b result" },
    ],
  });

  const toolUseIds = payload.messages[1].content.map((block) => block.toolUse?.toolUseId);
  const toolResultIds = payload.messages[2].content.map((block) => block.toolResult?.toolUseId);
  assert.deepEqual(toolUseIds, ["call_a", "call_b"]);
  assert.deepEqual(toolResultIds, ["call_a", "call_b"]);
  assert.equal(payload.messages.length, 3);
});

test("openAIToBedrockConverse removes tool uses whose results are not immediately next", () => {
  const payload = openAIToBedrockConverse("anthropic.claude-sonnet-4-6", {
    messages: [
      { role: "user", content: "use a tool" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_late",
            type: "function",
            function: { name: "late", arguments: "{}" },
          },
        ],
      },
      { role: "user", content: "interruption" },
      { role: "tool", tool_call_id: "call_late", content: "late result" },
    ],
  });

  assert.deepEqual(payload.messages[1].content, [{ text: " " }]);
  assert.deepEqual(payload.messages[3].content, [{ text: " " }]);
});

test("BedrockExecutor converts non-streaming Converse output to OpenAI chat completion JSON", async () => {
  const sent = [];
  let prepared = null;
  let preparedBeforeSend = false;
  const executor = new BedrockExecutor(() => ({
    send: async (command) => {
      sent.push(command);
      return {
        output: { message: { content: [{ text: "Hallo" }] } },
        stopReason: "end_turn",
        usage: { inputTokens: 3, outputTokens: 2, totalTokens: 5 },
      };
    },
  }));

  const requestCapture = {
    capture(request) {
      preparedBeforeSend = sent.length === 0;
      prepared = request;
    },
    body(fallback) {
      return prepared?.body ?? fallback;
    },
    latest() {
      return prepared;
    },
  };
  const result = await runWithCapture(requestCapture, () =>
    executor.execute({
      model: "anthropic.claude-sonnet-4-6",
      body: { messages: [{ role: "user", content: "Hi" }], max_tokens: 8 },
      stream: false,
      credentials: credentials(),
    })
  );

  assert.equal(sent[0].constructor.name, "ConverseCommand");
  assert.equal(sent[0].input.modelId, "anthropic.claude-sonnet-4-6");
  assert.equal(preparedBeforeSend, true);
  assert.deepEqual(prepared.body, sent[0].input);
  assert.equal(result.response.status, 200);
  const body = await result.response.json();
  assert.equal(body.model, "anthropic.claude-sonnet-4-6");
  assert.equal(body.choices[0].message.content, "Hallo");
  assert.equal(body.usage.total_tokens, 5);
});

test("BedrockExecutor configures the AWS SDK to use Bedrock bearer API keys", async () => {
  const created = new BedrockExecutor().createClient(credentials("eu-west-2"));

  assert.equal(typeof created.config.authSchemePreference, "function");
  assert.deepEqual(await created.config.authSchemePreference(), ["httpBearerAuth"]);
});

test("BedrockExecutor converts ConverseStream output to OpenAI SSE chunks", async () => {
  async function* bedrockStream() {
    yield { contentBlockDelta: { contentBlockIndex: 0, delta: { text: "Hal" } } };
    yield { contentBlockDelta: { contentBlockIndex: 0, delta: { text: "lo" } } };
    yield { messageStop: { stopReason: "end_turn" } };
    yield { metadata: { usage: { inputTokens: 1, outputTokens: 2, totalTokens: 3 } } };
  }

  const executor = new BedrockExecutor(() => ({
    send: async (command) => {
      assert.equal(command.constructor.name, "ConverseStreamCommand");
      return { stream: bedrockStream() };
    },
  }));

  const result = await executor.execute({
    model: "anthropic.claude-sonnet-4-6",
    body: { messages: [{ role: "user", content: "Hi" }], stream: true },
    stream: true,
    credentials: credentials(),
  });

  assert.equal(result.response.status, 200);
  assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");
  const text = await result.response.text();
  assert.match(text, /"role":"assistant"/);
  assert.match(text, /"content":"Hal"/);
  assert.match(text, /"content":"lo"/);
  assert.match(text, /"finish_reason":"stop"/);
  assert.match(text, /data: \[DONE\]/);
});

function parseBedrockOpenAIStream(text) {
  const events = [];
  for (const line of String(text).split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const payload = trimmed.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;
    events.push(JSON.parse(payload));
  }
  return events;
}

function toolArgumentsByIndex(events) {
  const byIndex = new Map();
  for (const event of events) {
    const calls = event.choices?.[0]?.delta?.tool_calls;
    if (!Array.isArray(calls)) continue;
    for (const call of calls) {
      const index = call.index ?? 0;
      const fragment = call.function?.arguments;
      byIndex.set(
        index,
        (byIndex.get(index) || "") + (typeof fragment === "string" ? fragment : "")
      );
    }
  }
  return byIndex;
}

function toolCallHeader(events, id) {
  for (const event of events) {
    const calls = event.choices?.[0]?.delta?.tool_calls;
    if (!Array.isArray(calls)) continue;
    const call = calls.find((item) => item.id === id);
    if (call) return call;
  }
  return undefined;
}

async function executeFakeBedrockStream(events) {
  const executor = new BedrockExecutor(() => ({
    send: async () => ({
      stream: (async function* bedrockStream() {
        for (const event of events) yield event;
      })(),
    }),
  }));
  const result = await executor.execute({
    model: "anthropic.claude-sonnet-4-6",
    body: { messages: [{ role: "user", content: "pwd" }], stream: true, tools: [] },
    stream: true,
    credentials: credentials(),
  });
  const text = await result.response.text();
  return { status: result.response.status, text, events: parseBedrockOpenAIStream(text) };
}

test("Bedrock ConverseStream concatenates string toolUse.input fragments", async () => {
  const { status, events } = await executeFakeBedrockStream([
    {
      contentBlockStart: {
        contentBlockIndex: 1,
        start: { toolUse: { toolUseId: "toolu_pwd", name: "Bash" } },
      },
    },
    {
      contentBlockDelta: {
        contentBlockIndex: 1,
        delta: { toolUse: { input: '{"command":' } },
      },
    },
    {
      contentBlockDelta: {
        contentBlockIndex: 1,
        delta: { toolUse: { input: '"pwd"}' } },
      },
    },
    { messageStop: { stopReason: "tool_use" } },
  ]);

  assert.equal(status, 200);
  const args = toolArgumentsByIndex(events);
  assert.equal(args.get(0), '{"command":"pwd"}');
  assert.equal(JSON.parse(args.get(0)).command, "pwd");
  assert.equal(events.at(-1).choices[0].finish_reason, "tool_calls");
  assert.equal(
    events.some((event) => event.error?.code === "bedrock_empty_tool_arguments"),
    false
  );
});

test("Bedrock ConverseStream JSON.stringifies object toolUse.input deltas (#14668)", async () => {
  const { events } = await executeFakeBedrockStream([
    {
      contentBlockStart: {
        contentBlockIndex: 0,
        start: { toolUse: { toolUseId: "toolu_ls", name: "Bash" } },
      },
    },
    {
      contentBlockDelta: {
        contentBlockIndex: 0,
        delta: { toolUse: { input: { command: "ls", description: "list files" } } },
      },
    },
    { messageStop: { stopReason: "tool_use" } },
  ]);

  const args = toolArgumentsByIndex(events);
  assert.deepEqual(JSON.parse(args.get(0)), { command: "ls", description: "list files" });
  assert.equal(
    events.some((event) => event.error?.code === "bedrock_empty_tool_arguments"),
    false
  );
  const start = events.find((event) => event.choices?.[0]?.delta?.tool_calls?.[0]?.id);
  assert.equal(start.choices[0].delta.tool_calls[0].id, "toolu_ls");
  assert.equal(start.choices[0].delta.tool_calls[0].function.name, "Bash");
});

test("Bedrock ConverseStream collapses repeated object toolUse.input snapshots", async () => {
  const { events } = await executeFakeBedrockStream([
    {
      contentBlockStart: {
        contentBlockIndex: 0,
        start: { toolUse: { toolUseId: "toolu_snap", name: "Bash" } },
      },
    },
    {
      contentBlockDelta: {
        contentBlockIndex: 0,
        delta: { toolUse: { input: { command: "ls" } } },
      },
    },
    {
      contentBlockDelta: {
        contentBlockIndex: 0,
        delta: { toolUse: { input: { command: "ls" } } },
      },
    },
    { messageStop: { stopReason: "tool_use" } },
  ]);

  assert.equal(toolArgumentsByIndex(events).get(0), '{"command":"ls"}');
});

test("Bedrock ConverseStream replaces a growing string toolUse.input snapshot", async () => {
  const { events } = await executeFakeBedrockStream([
    {
      contentBlockStart: {
        contentBlockIndex: 0,
        start: { toolUse: { toolUseId: "toolu_grow", name: "Bash" } },
      },
    },
    {
      contentBlockDelta: {
        contentBlockIndex: 0,
        delta: { toolUse: { input: '{"command":"l' } },
      },
    },
    {
      contentBlockDelta: {
        contentBlockIndex: 0,
        delta: { toolUse: { input: '{"command":"ls"}' } },
      },
    },
    { messageStop: { stopReason: "tool_use" } },
  ]);

  assert.equal(toolArgumentsByIndex(events).get(0), '{"command":"ls"}');
});

test("Bedrock ConverseStream keeps a legitimate empty-object tool call", async () => {
  const { text, events } = await executeFakeBedrockStream([
    {
      contentBlockStart: {
        contentBlockIndex: 0,
        start: { toolUse: { toolUseId: "toolu_empty", name: "pwd" } },
      },
    },
    {
      contentBlockDelta: {
        contentBlockIndex: 0,
        delta: { toolUse: { input: {} } },
      },
    },
    { messageStop: { stopReason: "tool_use" } },
  ]);

  assert.equal(toolArgumentsByIndex(events).get(0), "{}");
  assert.equal(text.includes("bedrock_empty_tool_arguments"), false);
  assert.equal(events.at(-1).choices[0].finish_reason, "tool_calls");
});

test("Bedrock ConverseStream keeps a zero-parameter tool when the input delta is empty", async () => {
  const { status, events } = await executeFakeBedrockStream([
    {
      contentBlockStart: {
        contentBlockIndex: 0,
        start: { toolUse: { toolUseId: "toolu_noparam", name: "noop" } },
      },
    },
    {
      contentBlockDelta: {
        contentBlockIndex: 0,
        delta: { toolUse: { input: "" } },
      },
    },
    { messageStop: { stopReason: "tool_use" } },
  ]);

  assert.equal(status, 200);
  assert.equal(
    events.some((event) => event.error?.code === "bedrock_empty_tool_arguments"),
    false
  );
  const header = toolCallHeader(events, "toolu_noparam");
  assert.equal(header?.index, 0);
  assert.equal(header?.type, "function");
  assert.equal(header?.function?.name, "noop");
  assert.equal(header?.function?.arguments, "");
  assert.equal(toolArgumentsByIndex(events).get(0), "");
  assert.equal(events.at(-1).choices[0].finish_reason, "tool_calls");
});

test("Bedrock ConverseStream emits a tool call that never receives an input delta", async () => {
  const { status, events } = await executeFakeBedrockStream([
    {
      contentBlockStart: {
        contentBlockIndex: 0,
        start: { toolUse: { toolUseId: "toolu_nodelta", name: "noop" } },
      },
    },
    { messageStop: { stopReason: "tool_use" } },
  ]);

  assert.equal(status, 200);
  assert.equal(
    events.some((event) => event.error?.code === "bedrock_empty_tool_arguments"),
    false
  );
  const header = toolCallHeader(events, "toolu_nodelta");
  assert.equal(header?.index, 0);
  assert.equal(header?.type, "function");
  assert.equal(header?.function?.name, "noop");
  assert.equal(header?.function?.arguments, "");
  assert.equal(toolArgumentsByIndex(events).get(0), "");
  assert.equal(events.at(-1).choices[0].finish_reason, "tool_calls");
});

test("Bedrock ConverseStream keeps a blank tool call in a parallel batch", async () => {
  const { status, events } = await executeFakeBedrockStream([
    {
      contentBlockStart: {
        contentBlockIndex: 0,
        start: { toolUse: { toolUseId: "toolu_bash", name: "Bash" } },
      },
    },
    {
      contentBlockDelta: {
        contentBlockIndex: 0,
        delta: { toolUse: { input: '{"command":"pwd"}' } },
      },
    },
    {
      contentBlockStart: {
        contentBlockIndex: 1,
        start: { toolUse: { toolUseId: "toolu_noop", name: "noop" } },
      },
    },
    {
      contentBlockDelta: {
        contentBlockIndex: 1,
        delta: { toolUse: { input: "" } },
      },
    },
    { messageStop: { stopReason: "tool_use" } },
  ]);

  assert.equal(status, 200);
  assert.equal(
    events.some((event) => event.error?.code === "bedrock_empty_tool_arguments"),
    false
  );
  const bash = toolCallHeader(events, "toolu_bash");
  const noop = toolCallHeader(events, "toolu_noop");
  assert.equal(bash?.index, 0);
  assert.equal(bash?.function?.name, "Bash");
  assert.equal(noop?.index, 1);
  assert.equal(noop?.type, "function");
  assert.equal(noop?.function?.name, "noop");
  assert.equal(noop?.function?.arguments, "");
  const args = toolArgumentsByIndex(events);
  assert.equal(args.get(0), '{"command":"pwd"}');
  assert.equal(args.get(1), "");
  assert.equal(events.at(-1).choices[0].finish_reason, "tool_calls");
});
