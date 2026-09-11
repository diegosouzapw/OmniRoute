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

test("OpenAI -> Responses: accepts the reasoning alias without duplicating the canonical field", () => {
  const events = collectEvents([
    {
      id: "chatcmpl-1",
      model: "gpt-oss:20b",
      choices: [
        {
          index: 0,
          delta: { reasoning: "alias ", reasoning_content: "canonical " },
          finish_reason: null,
        },
      ],
    },
    {
      id: "chatcmpl-1",
      model: "gpt-oss:20b",
      choices: [{ index: 0, delta: { reasoning: "continued" }, finish_reason: null }],
    },
    {
      id: "chatcmpl-1",
      model: "gpt-oss:20b",
      choices: [{ index: 0, delta: { content: "answer" }, finish_reason: "stop" }],
      usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 },
    },
  ]);

  assert.deepEqual(
    events
      .filter((event) => event.event === "response.reasoning_summary_text.delta")
      .map((event) => event.data.delta),
    ["canonical ", "continued"]
  );
  const completed = events.find((event) => event.event === "response.completed").data.response;
  assert.equal(completed.output[0].summary[0].text, "canonical continued");
  assert.equal(completed.output[1].content[0].text, "answer");
});

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

// Regression guard for the OpenRouter/nemotron "reasoning_content + tool_calls in the
// final chunk" case reported via the /dashboard/logs/timeline UI: the SSE events sent to
// the client were always correct, but stream.ts's completion-log summary builder
// (open-sse/utils/stream.ts) reads the shared `state.toolCalls` Map — populated by the
// openai-to-claude / claude-to-openai / gemini-to-openai translators — to report
// finish_reason and message.tool_calls in the persisted call-log. This translator alone
// tracked tool calls in its own funcCallIds/funcNames/funcArgsBuf bookkeeping without
// ever writing to the shared Map, so every openai->openai-responses translated stream
// with a tool call was logged as finish_reason "stop" with no tool_calls, even though the
// client received the tool call correctly.
test("OpenAI -> Responses: closing a tool call also records it in the shared state.toolCalls map", () => {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  const chunks = [
    {
      id: "chatcmpl-4",
      model: "nvidia/nemotron",
      choices: [{ index: 0, delta: { reasoning_content: "thinking" }, finish_reason: null }],
    },
    {
      id: "chatcmpl-4",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call-abc123",
                type: "function",
                function: { name: "openclaw", arguments: '{"message":"hi"}' },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
      usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    },
  ];

  for (const chunk of chunks) {
    openaiToOpenAIResponsesResponse(chunk, state);
  }

  assert.equal(state.toolCalls.size, 1, "state.toolCalls should carry the completed tool call");
  const recorded = [...state.toolCalls.values()][0];
  assert.equal(recorded.id, "call-abc123");
  assert.equal(recorded.function.name, "openclaw");
  assert.equal(recorded.function.arguments, '{"message":"hi"}');
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

test("Responses -> OpenAI: mixed plaintext + encrypted_content reasoning replays its plaintext (#10949)", () => {
  const state = {};
  const done = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: {
        type: "reasoning",
        id: "rs_mixed",
        content: [
          {
            type: "reasoning_text",
            text: "Let me start by reading the directory to understand the structure of the corpus.",
          },
        ],
        encrypted_content: "<opaque state>",
        summary: [],
      },
    },
    state
  );

  assert.ok(done, "mixed reasoning item must surface a delta");
  assert.equal(
    done.choices[0].delta.reasoning_content,
    "Let me start by reading the directory to understand the structure of the corpus."
  );
});

test("Responses -> OpenAI: opaque-only reasoning still emits no fabricated plaintext", () => {
  const state = {};
  const done = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: {
        type: "reasoning",
        id: "rs_opaque_only",
        encrypted_content: "<opaque state>",
        summary: [],
      },
    },
    state
  );

  assert.equal(done, null);
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
  const done = openaiResponsesToOpenAIResponse(
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
  // #9168: function_call_arguments.delta is buffered and returns null;
  // arguments are emitted by output_item.done instead.
  assert.equal(args, null);
  assert.equal(done.choices[0].delta.tool_calls[0].function.arguments, '{"city":"SP"}');
  assert.equal(reasoning.choices[0].delta.reasoning_content, "Need weather info.");
  assert.equal(completed.choices[0].finish_reason, "tool_calls");
  const comp = completed as {
    choices: Array<{ finish_reason: string }>;
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      prompt_tokens_details: { cached_tokens: number; cache_creation_tokens: number };
    };
  };
  assert.equal(comp.usage.prompt_tokens, 8);
  assert.equal(comp.usage.completion_tokens, 2);
  assert.equal(comp.usage.prompt_tokens_details.cached_tokens, 1);
  assert.equal(comp.usage.prompt_tokens_details.cache_creation_tokens, 2);
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

test("OpenAI -> Responses: tool call arguments with newlines are preserved in function_call events", () => {
  const events = collectEvents([
    {
      id: "chatcmpl-nl",
      model: "gemma-4-26b-a4b-it",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_nl_1",
                type: "function",
                function: {
                  name: "write",
                  arguments: '{"path":"/tmp/test.txt","content":"line1\\nline2\\n',
                },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    },
    {
      id: "chatcmpl-nl",
      model: "gemma-4-26b-a4b-it",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [{ index: 0, function: { arguments: 'line3\\nmore\\nlines\\n"}' } }],
          },
          finish_reason: "tool_calls",
        },
      ],
      usage: { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 },
    },
  ]);

  const done = events.find(
    (e) => e.event === "response.output_item.done" && e.data.item?.type === "function_call"
  );
  assert.ok(done, "should emit output_item.done for function_call");

  const argsStr = done.data.item.arguments;
  const parsed = JSON.parse(argsStr);
  assert.equal(typeof parsed.content, "string", "content should be a string");
  assert.ok(parsed.content.includes("\n"), "content should contain actual newlines (0x0A)");
  assert.equal(parsed.content, "line1\nline2\nline3\nmore\nlines\n");
  assert.equal(parsed.path, "/tmp/test.txt");

  // Verify the function_call is also present in response.completed output
  const completed = events.find((e) => e.event === "response.completed");
  assert.ok(completed, "should emit response.completed");
  const outputFc = completed.data.response.output.find((item) => item.type === "function_call");
  assert.ok(outputFc, "response.completed output should contain function_call");
  assert.equal(outputFc.name, "write");
  const parsedOutputArgs = JSON.parse(outputFc.arguments);
  assert.equal(parsedOutputArgs.content, "line1\nline2\nline3\nmore\nlines\n");
});

test("OpenAI -> Responses: Python multi-line content with indentation survives translation", () => {
  const pythonCode =
    'import json\nimport random\nfrom datetime import datetime\n\ndata = {\n    "timestamp": datetime.now().isoformat(),\n    "numbers": [random.randint(1, 100) for _ in range(5)],\n    "greeting": "Hello from the agent test script!"\n}\n\nwith open(\'/tmp/data.json\', \'w\') as f:\n    json.dump(data, f, indent=2)\n\nprint("Done")\n';

  const events = collectEvents([
    {
      id: "chatcmpl-py",
      model: "gemma-4-26b-a4b-it",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_py_1",
                type: "function",
                function: {
                  name: "write",
                  arguments: JSON.stringify({
                    path: "/tmp/script.py",
                    content: pythonCode,
                  }),
                },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
      usage: { prompt_tokens: 15, completion_tokens: 50, total_tokens: 65 },
    },
  ]);

  const done = events.find(
    (e) => e.event === "response.output_item.done" && e.data.item?.type === "function_call"
  );
  assert.ok(done, "should emit output_item.done for function_call");

  const argsStr = done.data.item.arguments;
  const parsed = JSON.parse(argsStr);

  // Verify content has proper newlines (0x0A, not literal backslash-n)
  assert.ok(parsed.content.includes("\n"), "content should contain actual newlines");
  assert.equal(parsed.content, pythonCode, "Python code should survive translation byte-identical");
  assert.equal(parsed.path, "/tmp/script.py");

  // Verify no literal backslash-n sneaks in
  const backslashNCount = (parsed.content.match(/\\n/g) || []).length;
  const newlineCount = (parsed.content.match(/\n/g) || []).length;
  assert.equal(backslashNCount, 0, "should have ZERO literal backslash-n in content");
  assert.ok(newlineCount > 5, "should have many actual newlines in Python code");
});

test("OpenAI -> Responses: a raw newline byte split across two tool-call argument deltas (fragment boundary lands mid-string, not on a quote/escape) is still escaped correctly", () => {
  // Real reported bug: escapeJsonStringValues used to track "are we inside a
  // JSON string" as a LOCAL variable reset on every call instead of state
  // persisted across chunks for the same tool call. A provider that sends a
  // raw newline byte (0x0A, not a proper \n escape — Gemini/Gemma-style) mid
  // fragment worked fine when the whole arguments string arrived in one
  // chunk, but broke the moment the SSE stream happened to split the
  // fragment somewhere that wasn't a quote or a complete escape sequence:
  // the second fragment's call started fresh with inString=false even
  // though the true position was still inside the "content" string value,
  // so the raw newline in fragment 2 was never escaped — producing invalid
  // JSON that JSON.parse rejects outright ("Bad control character in
  // string literal").
  const events = collectEvents([
    {
      id: "chatcmpl-split-nl",
      model: "gemma-4-26b-a4b-it",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_split_nl",
                type: "function",
                function: {
                  name: "write",
                  // Fragment 1 ends mid-string (no closing quote, no
                  // trailing backslash) — this is the boundary that
                  // exposed the bug.
                  arguments: '{"path":"/tmp/x.txt","content":"line1',
                },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    },
    {
      id: "chatcmpl-split-nl",
      model: "gemma-4-26b-a4b-it",
      choices: [
        {
          index: 0,
          delta: {
            // Fragment 2 starts with a RAW newline byte (real \n, not the
            // two-char escape) while still inside the "content" string.
            tool_calls: [{ index: 0, function: { arguments: '\nline2\nline3"}' } }],
          },
          finish_reason: "tool_calls",
        },
      ],
      usage: { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 },
    },
  ]);

  const done = events.find(
    (e) => e.event === "response.output_item.done" && e.data.item?.type === "function_call"
  );
  assert.ok(done, "should emit output_item.done for function_call");

  const argsStr = done.data.item.arguments;
  // The bug produced invalid JSON here (raw control character in a JSON
  // string) — JSON.parse must succeed and round-trip the real newlines.
  const parsed = JSON.parse(argsStr);
  assert.equal(parsed.path, "/tmp/x.txt");
  assert.equal(parsed.content, "line1\nline2\nline3");
});

test("OpenAI -> Responses: a properly-escaped \\n split exactly between its backslash and the 'n' across two deltas is not corrupted", () => {
  // Second half of the same bug class as the test above, exercising the
  // OTHER new state field (pendingEscape, not just inString): a model that
  // correctly escaped a newline as the two characters `\` + `n` can still
  // have that pair split across an SSE chunk boundary — fragment 1 ends
  // with the lone backslash, fragment 2 starts with the "n". The old code's
  // per-call reset meant fragment 2 saw a bare "n" with no idea it was the
  // second half of an escape sequence; a naive re-implementation could
  // easily re-escape or mis-handle it. This must reassemble to exactly one
  // real newline, not a literal backslash-n or a doubled escape.
  const events = collectEvents([
    {
      id: "chatcmpl-split-esc",
      model: "gemma-4-26b-a4b-it",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_split_esc",
                type: "function",
                function: {
                  name: "write",
                  // Ends right after the backslash of a "\n" escape — the "n"
                  // itself is not yet in this fragment.
                  arguments: '{"path":"/tmp/y.txt","content":"before\\',
                },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    },
    {
      id: "chatcmpl-split-esc",
      model: "gemma-4-26b-a4b-it",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [{ index: 0, function: { arguments: 'nafter"}' } }],
          },
          finish_reason: "tool_calls",
        },
      ],
      usage: { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 },
    },
  ]);

  const done = events.find(
    (e) => e.event === "response.output_item.done" && e.data.item?.type === "function_call"
  );
  assert.ok(done, "should emit output_item.done for function_call");

  const parsed = JSON.parse(done.data.item.arguments);
  assert.equal(parsed.path, "/tmp/y.txt");
  assert.equal(parsed.content, "before\nafter");
});

test("OpenAI -> Responses: parallel tool calls with mixed content survive translation", () => {
  const events = collectEvents([
    {
      id: "chatcmpl-par",
      model: "gemma-4-26b-a4b-it",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_a",
                type: "function",
                function: {
                  name: "write",
                  arguments: '{"path":"/tmp/a.txt","content":"hello\\nworld\\n"}',
                },
              },
              {
                index: 1,
                id: "call_b",
                type: "function",
                function: {
                  name: "exec",
                  arguments: '{"command":"echo test"}',
                },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    },
    // #6906: real providers may send no separate usage chunk at all — the stream-end
    // flush is what finalizes response.completed in that case.
    null,
  ]);

  const doneEvents = events.filter(
    (e) => e.event === "response.output_item.done" && e.data.item?.type === "function_call"
  );
  assert.equal(doneEvents.length, 2, "should emit output_item.done for both tool calls");

  const writeCall = doneEvents.find((e) => e.data.item.name === "write");
  const execCall = doneEvents.find((e) => e.data.item.name === "exec");
  assert.ok(writeCall, "write function_call should be present");
  assert.ok(execCall, "exec function_call should be present");

  const writeArgs = JSON.parse(writeCall.data.item.arguments);
  assert.equal(writeArgs.content, "hello\nworld\n");

  // Verify completed output has both
  const completed = events.find((e) => e.event === "response.completed");
  assert.ok(completed, "should emit response.completed");
  const outputFcs = completed.data.response.output.filter((item) => item.type === "function_call");
  assert.equal(outputFcs.length, 2, "completed output should have both function_calls");
});

// Live incident (2026-08-08): an OpenClaw agent ("Ping") sent a preamble line
// ("Kör nu, på riktigt — apply_patch på vibe-scriptet:") followed by an
// apply_patch tool call in the same turn, with reasoning ahead of both. The
// text message and the tool call both computed to output_index=1 — the tool
// call's own index math (`reasoningIndex + 1 + tcIdx`) never accounted for
// the message item also claiming `reasoningIndex + 1`, so a completed
// message and a freshly-added tool call collided on the same output_index.
// A client that tracks response items by output_index (as Responses-API
// clients are expected to) sees the tool call's added/delta/done events land
// on an index it already marked complete, and can silently drop or ignore
// them — exactly the observed symptom: the agent spoke the preamble and
// never executed the patch.
test("OpenAI -> Responses: a text message and a following tool call in the same turn get distinct output_index values", () => {
  const events = collectEvents([
    {
      id: "chatcmpl-1",
      model: "big-pickle",
      choices: [
        { index: 0, delta: { reasoning_content: "thinking about the patch" }, finish_reason: null },
      ],
    },
    {
      id: "chatcmpl-1",
      model: "big-pickle",
      choices: [
        {
          index: 0,
          delta: { content: "Kör nu, på riktigt — apply_patch på vibe-scriptet:" },
          finish_reason: null,
        },
      ],
    },
    {
      id: "chatcmpl-1",
      model: "big-pickle",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_apply_patch",
                type: "function",
                function: { name: "apply_patch", arguments: '{"input":"*** Begin Patch ***"}' },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    },
    null,
  ]);

  const itemDoneEvents = events.filter((e) => e.event === "response.output_item.done");
  const messageDone = itemDoneEvents.find((e) => e.data.item?.type === "message");
  const toolCallDone = itemDoneEvents.find(
    (e) => e.data.item?.type === "function_call" || e.data.item?.type === "custom_tool_call"
  );
  assert.ok(messageDone, "message output_item.done should be present");
  assert.ok(toolCallDone, "tool call output_item.done should be present");
  assert.notEqual(
    messageDone.data.output_index,
    toolCallDone.data.output_index,
    "message and tool call must not collide on the same output_index"
  );

  // The tool call's own added/delta events (what a streaming client actually
  // keys its per-item state on) must also use the tool call's real index,
  // not the message's.
  const toolCallAdded = events.find(
    (e) =>
      e.event === "response.output_item.added" &&
      (e.data.item?.type === "function_call" || e.data.item?.type === "custom_tool_call")
  );
  assert.ok(toolCallAdded, "tool call output_item.added should be present");
  assert.equal(toolCallAdded.data.output_index, toolCallDone.data.output_index);
  assert.notEqual(toolCallAdded.data.output_index, messageDone.data.output_index);

  const completed = events.find((e) => e.event === "response.completed");
  const outputTypes = completed.data.response.output.map((item) => item.type);
  assert.ok(outputTypes.includes("message"), "completed output must include the message");
  assert.ok(
    outputTypes.includes("function_call") || outputTypes.includes("custom_tool_call"),
    "completed output must include the tool call"
  );
});

// Live incident (2026-09-02): a free-tier streaming model, after a short text
// preamble, opened two tool calls whose upstream `tool_calls[].index` was 1
// and 2 -- never 0. toolCallOutputIndexBase()+index therefore emitted
// output_index 0 (message), 2, 3 -- skipping 1 entirely. A spec-following
// Responses-API client reads response.completed's final `output[]` array by
// ARRAY POSITION and expects position === output_index (the API's own
// contract): output[1] (this turn's first call, real output_index 2) gets
// looked up under output_index 1 and missed, then output[2] (the second
// call, real output_index 3) gets looked up under output_index 2 and
// collides with the FIRST call's tracked slot -- two different call_ids on
// what the client thinks is one identity, which it correctly refuses to
// treat as anything but a broken stream. Reproduced verbatim (anonymized
// content, same index/id shape) against OpenClaw's own
// createResponsesOutputTracker before this fix; content and tool/model names
// below are placeholders, not the real incident's.
test("OpenAI -> Responses: tool-call output_index stays gap-free when the upstream's own index doesn't start at 0", () => {
  const events = collectEvents([
    {
      id: "chatcmpl-gap1",
      model: "stub-model",
      choices: [
        { index: 0, delta: { content: "Status:", role: "assistant" }, finish_reason: null },
      ],
    },
    {
      id: "chatcmpl-gap1",
      model: "stub-model",
      choices: [
        { index: 0, delta: { content: " all clear.", role: "assistant" }, finish_reason: null },
      ],
    },
    {
      id: "chatcmpl-gap1",
      model: "stub-model",
      choices: [
        {
          index: 0,
          delta: {
            content: null,
            role: "assistant",
            tool_calls: [
              {
                index: 1,
                id: "call_stub_1",
                type: "function",
                function: { name: "notify", arguments: "" },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    },
    {
      id: "chatcmpl-gap1",
      model: "stub-model",
      choices: [
        {
          index: 0,
          delta: {
            content: null,
            role: "assistant",
            tool_calls: [{ index: 1, function: { arguments: '{"a":1}' } }],
          },
          finish_reason: null,
        },
      ],
    },
    {
      id: "chatcmpl-gap1",
      model: "stub-model",
      choices: [
        {
          index: 0,
          delta: {
            content: null,
            role: "assistant",
            tool_calls: [
              {
                index: 2,
                id: "call_stub_2",
                type: "function",
                function: { name: "notify", arguments: "" },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    },
    {
      id: "chatcmpl-gap1",
      model: "stub-model",
      choices: [
        {
          index: 0,
          delta: {
            content: null,
            role: "assistant",
            tool_calls: [{ index: 2, function: { arguments: '{"a":2}' } }],
          },
          finish_reason: null,
        },
      ],
    },
    {
      id: "chatcmpl-gap1",
      model: "stub-model",
      choices: [
        { index: 0, delta: { content: "", role: "assistant" }, finish_reason: "tool_calls" },
      ],
      usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    },
    null,
  ]);

  const addedEvents = events.filter((e) => e.event === "response.output_item.added");
  const indexes = addedEvents.map((e) => e.data.output_index).sort((a, b) => a - b);
  const sequential = indexes.map((_, i) => i);
  assert.deepEqual(
    indexes,
    sequential,
    `output_index values must be a gap-free 0..n-1 sequence (position === output_index is the Responses API's own contract); got ${JSON.stringify(indexes)}`
  );

  // The exact client-observable symptom: response.completed's output[]
  // array, read by array position, must match each item's own tracked
  // output_index -- otherwise a client keying by array position resolves
  // the wrong item.
  const completedGap = events.find((e) => e.event === "response.completed");
  completedGap.data.response.output.forEach((item, position) => {
    const addedEvent = addedEvents.find((e) => e.data.item?.id === item.id);
    assert.equal(
      addedEvent?.data.output_index,
      position,
      `item ${item.id} (type ${item.type}) streamed at output_index ${addedEvent?.data.output_index} but sits at array position ${position} in the completed output`
    );
  });
});
