import test from "node:test";
import assert from "node:assert/strict";

const { openaiToOpenAIResponsesResponse, openaiResponsesToOpenAIResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

function collectEvents(chunks) {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  const events = [];

  for (const chunk of chunks) {
    const result = openaiToOpenAIResponsesResponse(chunk, state);
    if (result) events.push(...result);
  }

  return events;
}

test("OpenAI -> Responses: emits lifecycle, reasoning, text, tool calls and completed usage", () => {
  const events = collectEvents([
    {
      id: "chatcmpl-1",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { reasoning_content: "think " }, finish_reason: null }],
    },
    {
      id: "chatcmpl-1",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { content: "hello" }, finish_reason: null }],
    },
    {
      id: "chatcmpl-1",
      model: "gpt-4.1",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_1",
                type: "function",
                function: { name: "read_file", arguments: '{"path":' },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    },
    {
      id: "chatcmpl-1",
      model: "gpt-4.1",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [{ index: 0, function: { arguments: '"/tmp/a"}' } }],
          },
          finish_reason: "tool_calls",
        },
      ],
      usage: {
        prompt_tokens: 5,
        completion_tokens: 7,
        total_tokens: 12,
        prompt_tokens_details: { cached_tokens: 2 },
      },
    },
  ]);

  assert.equal(events[0].event, "response.created");
  assert.equal(events[1].event, "response.in_progress");
  assert.ok(events.some((event) => event.event === "response.reasoning_summary_text.delta"));
  assert.ok(
    events.some(
      (event) => event.event === "response.output_text.delta" && event.data.delta === "hello"
    )
  );
  assert.ok(
    events.some(
      (event) =>
        event.event === "response.function_call_arguments.done" &&
        event.data.arguments === '{"path":"/tmp/a"}'
    )
  );

  const completed = events.find((event) => event.event === "response.completed");
  assert.ok(completed);
  assert.equal(completed.data.response.status, "completed");
  assert.equal(completed.data.response.output.length, 3);
  assert.equal(completed.data.response.usage.input_tokens, 5);
  assert.equal(completed.data.response.usage.output_tokens, 7);
  assert.equal(completed.data.response.usage.total_tokens, 12);
  assert.equal(completed.data.response.usage.input_tokens_details.cached_tokens, 2);
});

test("OpenAI -> Responses: flush on null closes text content and emits response.completed", () => {
  const events = collectEvents([
    {
      id: "chatcmpl-2",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { content: "partial" }, finish_reason: null }],
    },
    null,
  ]);

  assert.ok(events.some((event) => event.event === "response.output_text.done"));
  assert.ok(events.some((event) => event.event === "response.content_part.done"));
  assert.ok(events.some((event) => event.event === "response.completed"));
});

test("OpenAI -> Responses: prompt-format <think> tags remain text by default", () => {
  const events = collectEvents([
    {
      id: "chatcmpl-3",
      model: "gpt-4.1",
      choices: [
        {
          index: 0,
          delta: { content: "<think>Plan it</think>Done." },
          finish_reason: "stop",
        },
      ],
    },
  ]);

  assert.equal(
    events.some((event) => event.event === "response.reasoning_summary_text.delta"),
    false
  );
  assert.ok(
    events.some(
      (event) =>
        event.event === "response.output_text.delta" &&
        event.data.delta === "<think>Plan it</think>Done."
    )
  );
});

test("OpenAI -> Responses: tag-native models still emit <think> text as reasoning", () => {
  const events = collectEvents([
    {
      id: "chatcmpl-3b",
      model: "Qwen/QwQ-32B",
      choices: [
        {
          index: 0,
          delta: { content: "<think>Plan it</think>Done." },
          finish_reason: "stop",
        },
      ],
    },
  ]);

  assert.ok(
    events.some(
      (event) =>
        event.event === "response.reasoning_summary_text.delta" && event.data.delta === "Plan it"
    )
  );
  assert.ok(
    events.some(
      (event) => event.event === "response.output_text.delta" && event.data.delta === "Done."
    )
  );
});

test("OpenAI -> Responses: changing tool id at same index closes previous call before starting another", () => {
  const events = collectEvents([
    {
      id: "chatcmpl-4",
      model: "gpt-4.1",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_1",
                type: "function",
                function: { name: "read_file", arguments: '{"a":1}' },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    },
    {
      id: "chatcmpl-4",
      model: "gpt-4.1",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_2",
                type: "function",
                function: { name: "read_file", arguments: '{"b":2}' },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    },
  ]);

  assert.ok(
    events.some(
      (event) =>
        event.event === "response.function_call_arguments.done" &&
        event.data.item_id === "fc_call_1"
    )
  );
  assert.ok(
    events.some(
      (event) =>
        event.event === "response.output_item.added" && event.data.item.call_id === "call_2"
    )
  );
});

test("Responses -> OpenAI: text delta streams as content and flush sends stop finish", () => {
  const state = {};
  const first = openaiResponsesToOpenAIResponse(
    { type: "response.output_text.delta", delta: "hi" },
    state
  );
  const final = openaiResponsesToOpenAIResponse(null, state);

  assert.equal(first.choices[0].delta.content, "hi");
  assert.equal(final.choices[0].finish_reason, "stop");
});

test("Responses -> OpenAI: empty-name tool call is deferred until output_item.done", () => {
  const state = {};
  const started = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_1", name: "" },
    },
    state
  );
  const done = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: {
        type: "function_call",
        call_id: "call_1",
        name: "read_file",
        arguments: { path: "/tmp/a" },
      },
    },
    state
  );

  assert.equal(started, null);
  assert.equal(done.choices[0].delta.tool_calls[0].id, "call_1");
  assert.equal(done.choices[0].delta.tool_calls[0].function.name, "read_file");
  assert.equal(
    done.choices[0].delta.tool_calls[0].function.arguments,
    JSON.stringify({ path: "/tmp/a" })
  );
});

test("Responses -> OpenAI: preserves non-Read JSON-string tool arguments", () => {
  const state = {};
  openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_note", name: "save_note" },
    },
    state
  );
  const done = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: {
        type: "function_call",
        call_id: "call_note",
        name: "save_note",
        arguments: '{"text":"","tags":[]}',
      },
    },
    state
  );

  assert.equal(done.choices[0].delta.tool_calls[0].function.arguments, '{"text":"","tags":[]}');
});

test("Responses -> OpenAI: preserves falsy JSON-string tool arguments while cleaning", () => {
  const state = {};
  openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_flag", name: "set_flag" },
    },
    state
  );
  const done = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: { type: "function_call", call_id: "call_flag", name: "set_flag", arguments: "false" },
    },
    state
  );

  assert.equal(done.choices[0].delta.tool_calls[0].function.arguments, "false");
});

test("Responses -> OpenAI: preserves non-object Read JSON-string arguments", () => {
  const state = {};
  openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_read", name: "Read" },
    },
    state
  );
  const done = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: { type: "function_call", call_id: "call_read", name: "Read", arguments: "null" },
    },
    state
  );

  assert.equal(done.choices[0].delta.tool_calls[0].function.arguments, "null");
});

test("Responses -> OpenAI: strips empty optional args from JSON-string output_item.done arguments", () => {
  const state = {};
  openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_read", name: "Read" },
    },
    state
  );
  const done = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: {
        type: "function_call",
        call_id: "call_read",
        name: "Read",
        arguments: '{"file_path":"/etc/hosts","offset":1,"limit":5,"pages":"","empty":[]}',
      },
    },
    state
  );

  assert.equal(
    done.choices[0].delta.tool_calls[0].function.arguments,
    JSON.stringify({ file_path: "/etc/hosts", offset: 1, limit: 5 })
  );
});

test("Responses -> OpenAI: tool-call delta, reasoning delta and completed usage are normalized", () => {
  const state = {};
  const added = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_2", name: "weather" },
    },
    state
  );
  const args = openaiResponsesToOpenAIResponse(
    {
      type: "response.function_call_arguments.delta",
      delta: '{"city":"SP"}',
    },
    state
  );
  const reasoning = openaiResponsesToOpenAIResponse(
    {
      type: "response.reasoning_summary_text.delta",
      delta: "Need weather info.",
    },
    state
  );
  openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: { type: "function_call", call_id: "call_2", name: "weather" },
    },
    state
  );
  const completed = openaiResponsesToOpenAIResponse(
    {
      type: "response.completed",
      response: {
        usage: {
          input_tokens: 5,
          output_tokens: 2,
          cache_read_input_tokens: 1,
          cache_creation_input_tokens: 2,
        },
      },
    },
    state
  );

  assert.equal(added.choices[0].delta.tool_calls[0].function.name, "weather");
  assert.equal(args.choices[0].delta.tool_calls[0].function.arguments, '{"city":"SP"}');
  assert.equal(reasoning.choices[0].delta.reasoning_content, "Need weather info.");
  assert.equal(completed.choices[0].finish_reason, "tool_calls");
  assert.equal((completed as any).usage.prompt_tokens, 8);
  assert.equal((completed as any).usage.completion_tokens, 2);
  (assert as any).equal((completed as any).usage.prompt_tokens_details.cached_tokens, 1);
  assert.equal((completed as any).usage.prompt_tokens_details.cache_creation_tokens, 2);
});

test("Responses -> OpenAI: preserves upstream model instead of defaulting to gpt-4", () => {
  const state = {};
  const created = openaiResponsesToOpenAIResponse(
    {
      type: "response.created",
      response: {
        id: "resp_1",
        object: "response",
        model: "gpt-5.4",
        status: "in_progress",
        output: [],
      },
    },
    state
  );
  const text = openaiResponsesToOpenAIResponse(
    { type: "response.output_text.delta", delta: "hello" },
    state
  );
  const final = openaiResponsesToOpenAIResponse(
    {
      type: "response.completed",
      response: {
        model: "gpt-5.4",
      },
    },
    state
  );

  assert.equal(text.model, "gpt-5.4");
  assert.equal(final.model, "gpt-5.4");
  assert.equal(created, null);
});

test("Responses -> OpenAI: response.failed records upstream error", () => {
  const state = {};
  const result = openaiResponsesToOpenAIResponse(
    {
      type: "response.failed",
      response: {
        error: {
          message: "Rate limit reached for gpt-5.4",
          code: "rate_limit_exceeded",
        },
      },
    },
    state
  );

  assert.equal(result, null);
  assert.ok(state.upstreamError);
  assert.equal(state.upstreamError.status, 429);
  assert.equal(state.upstreamError.type, "rate_limit_error");
  assert.equal(state.upstreamError.code, "rate_limit_exceeded");
  assert.match(state.upstreamError.message, /Rate limit reached/);
});

test("OpenAI -> Responses: deduplicates repeated tool argument snapshots", () => {
  const args = JSON.stringify({ command: "grep -r pattern /var" });
  const events = collectEvents([
    {
      id: "chatcmpl-tool-snapshot",
      model: "gpt-4.1",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_1",
                type: "function",
                function: { name: "shell", arguments: args },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    },
    {
      id: "chatcmpl-tool-snapshot",
      model: "gpt-4.1",
      choices: [
        {
          index: 0,
          delta: { tool_calls: [{ index: 0, function: { arguments: args } }] },
          finish_reason: "tool_calls",
        },
      ],
    },
  ]);

  const done = events.find((event) => event.event === "response.function_call_arguments.done");

  assert.equal(done.data.arguments, args);
  assert.equal(JSON.parse(done.data.arguments).command, "grep -r pattern /var");
});
