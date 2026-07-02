import test from "node:test";
import assert from "node:assert/strict";

const { convertKiroToOpenAI } =
  await import("../../open-sse/translator/response/kiro-to-openai.ts");

test("Kiro -> OpenAI: first assistantResponseEvent emits role and content", () => {
  const state = {};
  const chunk = 'event:assistantResponseEvent\ndata:{"content":"Hello"}\n\n';
  const result = convertKiroToOpenAI(chunk, state);

  assert.equal(result.object, "chat.completion.chunk");
  assert.equal(result.choices[0].delta.role, "assistant");
  assert.equal(result.choices[0].delta.content, "Hello");
});

test("Kiro -> OpenAI: subsequent assistantResponseEvent omits role", () => {
  const state = {};
  convertKiroToOpenAI('event:assistantResponseEvent\ndata:{"content":"Hel"}\n\n', state);
  const result = convertKiroToOpenAI(
    'event:assistantResponseEvent\ndata:{"content":"lo"}\n\n',
    state
  );

  assert.equal(result.choices[0].delta.role, undefined);
  assert.equal(result.choices[0].delta.content, "lo");
});

test("Kiro -> OpenAI: reasoningContentEvent is wrapped as thinking tags", () => {
  const result = convertKiroToOpenAI(
    'event:reasoningContentEvent\ndata:{"content":"Need to inspect first"}\n\n',
    {}
  );

  assert.equal(result.choices[0].delta.content, "<thinking>Need to inspect first</thinking>");
});

test("Kiro -> OpenAI: toolUseEvent becomes OpenAI tool_calls", () => {
  const result = convertKiroToOpenAI(
    {
      _eventType: "toolUseEvent",
      toolUseId: "call_1",
      name: "read_file",
      input: { path: "/tmp/a" },
    },
    {}
  );

  assert.equal(result.choices[0].delta.tool_calls[0].id, "call_1");
  assert.equal(result.choices[0].delta.tool_calls[0].function.name, "read_file");
  assert.equal(
    result.choices[0].delta.tool_calls[0].function.arguments,
    JSON.stringify({ path: "/tmp/a" })
  );
});

test("Kiro -> OpenAI: usageEvent is stored and final done event includes usage", () => {
  const state = {};
  const usage = convertKiroToOpenAI(
    'event:usageEvent\ndata:{"inputTokens":4,"outputTokens":6}\n\n',
    state
  );
  const done = convertKiroToOpenAI("event:done\ndata:{}\n\n", state);

  assert.equal(usage, null);
  assert.equal(done.choices[0].finish_reason, "stop");
  assert.deepEqual(done.usage, {
    prompt_tokens: 4,
    completion_tokens: 6,
    total_tokens: 10,
  });
});

test("Kiro -> OpenAI: already-normalized OpenAI chunks pass through unchanged", () => {
  const chunk = {
    object: "chat.completion.chunk",
    choices: [{ index: 0, delta: { content: "Hello" }, finish_reason: null }],
  };

  assert.equal(convertKiroToOpenAI(chunk, {}), chunk);
});

test("Kiro -> OpenAI: unknown or empty events are ignored", () => {
  assert.equal(convertKiroToOpenAI("event:unknown\ndata:{}\n\n", {}), null);
  assert.equal(convertKiroToOpenAI("event:assistantResponseEvent\n\n", {}), null);
});
