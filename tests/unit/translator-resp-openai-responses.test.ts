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

test("Responses -> OpenAI -> Responses: round-trip preserves newlines in tool call content", () => {
  // Step 1: Responses API format → Chat Completions format
  const state1 = {};
  const originalContent = "line1\nline2\nline3\n";

  openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: {
        type: "function_call",
        call_id: "call_rt_1",
        name: "write",
        arguments: JSON.stringify({ path: "/tmp/f.txt", content: originalContent }),
      },
    },
    state1
  );
  openaiResponsesToOpenAIResponse(
    {
      type: "response.function_call_arguments.delta",
      delta: "",
    },
    state1
  );

  const doneChunk = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: {
        type: "function_call",
        call_id: "call_rt_1",
        name: "write",
        arguments: JSON.stringify({ path: "/tmp/f.txt", content: originalContent }),
      },
    },
    state1
  );
  assert.ok(doneChunk, "should produce Chat Completions chunk");
  const toolCall = doneChunk.choices[0].delta.tool_calls[0];
  assert.ok(toolCall, "should have tool_calls");

  // Step 2: That Chat Completions chunk → Responses API events
  const state2 = {};
  const roundtripChunks = [];

  // The arguments in Chat Completions format should be a JSON string
  const ccArgs = toolCall.function.arguments;
  const parsedArgs = JSON.parse(ccArgs);
  assert.equal(parsedArgs.content, originalContent, "Chat Completions preserves newlines");

  // Now feed back through chat → responses translator
  const respEvents = collectEvents([
    {
      id: "chatcmpl-rt",
      model: "gemma-4-26b-a4b-it",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_rt_1",
                type: "function",
                function: {
                  name: "write",
                  arguments: ccArgs,
                },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    },
  ]);

  const doneRt = respEvents.find(
    (e) => e.event === "response.output_item.done" && e.data.item?.type === "function_call"
  );
  assert.ok(doneRt, "round-trip should produce output_item.done");
  const finalArgs = JSON.parse(doneRt.data.item.arguments);
  assert.equal(finalArgs.content, originalContent, "round-trip preserves newlines");
  assert.equal(finalArgs.path, "/tmp/f.txt");
});

test("Responses -> OpenAI -> Responses: Python code with colon-newline-indent pattern survives round-trip", () => {
  // This specifically tests the pattern that Gemma4 gets wrong:
  // `f:\n    json.dump(...)` - the colon-newline-indent pattern
  const pythonCode = `with open('/tmp/data.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Done")
`;

  // Step 1: Responses → OpenAI (Chat Completions)
  const state1 = {};
  const chunk1 = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: {
        type: "function_call",
        call_id: "call_py_2",
        name: "write",
        arguments: JSON.stringify({
          path: "/tmp/script.py",
          content: pythonCode,
        }),
      },
    },
    state1
  );

  const done1 = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: {
        type: "function_call",
        call_id: "call_py_2",
        name: "write",
        arguments: JSON.stringify({
          path: "/tmp/script.py",
          content: pythonCode,
        }),
      },
    },
    state1
  );

  // The Chat Completions format tool call arguments must be valid parseable JSON
  const ccArgsStr = done1.choices[0].delta.tool_calls[0].function.arguments;
  const ccParsed = JSON.parse(ccArgsStr);
  assert.equal(ccParsed.content, pythonCode, "Python code preserves newlines in Chat Completions");

  // Step 2: OpenAI → Responses
  const state2 = {};
  const respEvents2 = collectEvents([
    {
      id: "chatcmpl-py2",
      model: "gemma-4-26b-a4b-it",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_py_2",
                type: "function",
                function: {
                  name: "write",
                  arguments: ccArgsStr,
                },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    },
  ]);

  const done2 = respEvents2.find(
    (e) => e.event === "response.output_item.done" && e.data.item?.type === "function_call"
  );
  assert.ok(done2, "round-trip should produce output_item.done");

  const finalContent = JSON.parse(done2.data.item.arguments).content;
  assert.equal(finalContent, pythonCode, "Python code survives full round-trip");

  // Critical check: no literal backslash-n contamination
  const literalBSN = finalContent.match(/\\n/g);
  assert.equal(literalBSN, null, "no literal backslash-n after round-trip");
});

test("OpenAI -> Responses: escapeJsonStringValues fixes literal newlines in tool call args", () => {
  // Simulate upstream provider (e.g. Gemini/Gemma) sending tool call arguments
  // with ACTUAL 0x0A newlines instead of JSON \\n escapes - a known model bug.
  // Build arguments string with real bytes to avoid JavaScript string escaping.
  const LF = String.fromCharCode(0x0a);
  const malformedArgs = '{"content":"def foo():' + LF + "  return 42" + LF + '"}';

  // Verify the malformed input is NOT valid JSON (sanity check)
  assert.throws(() => JSON.parse(malformedArgs), /Bad control character/);

  const events = collectEvents([
    {
      id: "chatcmpl-1",
      model: "gemini/gemma-4-26b-a4b-it",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_abc",
                type: "function",
                function: {
                  name: "write",
                  arguments: malformedArgs,
                },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    },
    {
      id: "chatcmpl-1",
      model: "gemini/gemma-4-26b-a4b-it",
      choices: [
        {
          index: 0,
          delta: {},
          finish_reason: "tool_calls",
        },
      ],
    },
  ]);

  // 1. Delta events must carry valid JSON (control chars escaped)
  const deltaEvent = events.find((e) => e.event === "response.function_call_arguments.delta");
  assert.ok(deltaEvent, "should have delta event");
  assert.ok(typeof deltaEvent.data.delta === "string");
  const deltaParsed = JSON.parse(deltaEvent.data.delta);
  assert.equal(deltaParsed.content, "def foo():\n  return 42\n");
  // Content must have real newlines after JSON.parse
  assert.equal(deltaParsed.content.charCodeAt(10), 0x0a);

  // 2. output_item.done must carry valid JSON
  const doneEvent = events.find(
    (e) =>
      e.event === "response.output_item.done" &&
      e.data?.item?.type === "function_call" &&
      e.data.item.name === "write"
  );
  assert.ok(doneEvent);
  const doneArgs = doneEvent.data.item.arguments;
  assert.doesNotThrow(() => JSON.parse(doneArgs));

  // 3. Completed event carries valid JSON
  const completedEvent = events.find((e) => e.event === "response.completed");
  if (completedEvent) {
    const completedFc = (completedEvent.data.response?.output || []).find(
      (item: { type?: string }) => item.type === "function_call"
    );
    if (completedFc) {
      assert.doesNotThrow(() => JSON.parse(completedFc.arguments));
    }
  }

  // 4. function_call_arguments.done carries valid JSON
  const doneArgsEvent = events.find((e) => e.event === "response.function_call_arguments.done");
  if (doneArgsEvent) {
    assert.doesNotThrow(() => JSON.parse(doneArgsEvent.data.arguments));
  }
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

test("OpenAI -> Responses: no double-escaping of already-escaped JSON arguments", () => {
  // This test verifies that properly-escaped arguments (as produced by JSON.stringify)
  // are NOT double-escaped by escapeJsonStringValues. The content contains characters
  // that could trigger false-positive escaping: real newlines (0x0A) embedded in the
  // content value, which JSON.stringify converts to \n, and double-quotes inside the
  // content, which JSON.stringify converts to \".
  const content = 'def foo():\n    print("hello")\n    print("world")\n';
  const expected = JSON.stringify({ path: "/tmp/test.py", content });
  // expected is: {"path":"/tmp/test.py","content":"def foo():\n    print(\"hello\")\n    print(\"world\")\n"}

  const events = collectEvents([
    {
      id: "chatcmpl-no-double",
      model: "gemini/gemma-4-26b-a4b-it",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_no_double",
                type: "function",
                function: { name: "write", arguments: expected },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    },
    {
      id: "chatcmpl-no-double",
      model: "gemini/gemma-4-26b-a4b-it",
      choices: [
        {
          index: 0,
          delta: {},
          finish_reason: "tool_calls",
        },
      ],
      usage: { prompt_tokens: 5, completion_tokens: 10, total_tokens: 15 },
    },
  ]);

  // 1. function_call_arguments.delta must NOT have double-escaped sequences
  const deltaEvent = events.find((e) => e.event === "response.function_call_arguments.delta");
  assert.ok(deltaEvent, "should emit function_call_arguments.delta");
  const deltaParsed = JSON.parse(deltaEvent.data.delta);
  // content should have real newlines, not literal backslash-n
  assert.equal(deltaParsed.content, content, "delta parsed content should match original");
  // Verify no literal \\n (double backslash + n) in the delta string
  assert.ok(
    !deltaEvent.data.delta.includes("\\\\n"),
    "delta should NOT contain literal \\\\n (double backslash + n)"
  );

  // 2. function_call_arguments.done must carry valid JSON with correct content
  const doneArgsEvent = events.find((e) => e.event === "response.function_call_arguments.done");
  assert.ok(doneArgsEvent, "should emit function_call_arguments.done");
  assert.doesNotThrow(() => JSON.parse(doneArgsEvent.data.arguments));
  assert.equal(JSON.parse(doneArgsEvent.data.arguments).path, "/tmp/test.py");

  // 3. output_item.done must carry valid JSON
  const doneItem = events.find(
    (e) => e.event === "response.output_item.done" && e.data.item?.type === "function_call"
  );
  assert.ok(doneItem, "should emit output_item.done for function_call");
  const doneItemParsed = JSON.parse(doneItem.data.item.arguments);
  assert.equal(doneItemParsed.path, "/tmp/test.py");
  assert.equal(doneItemParsed.content, content);

  // 4. response.completed output must carry valid JSON
  const completed = events.find((e) => e.event === "response.completed");
  assert.ok(completed, "should emit response.completed");
  const completedFc = completed.data.response.output.find((i) => i.type === "function_call");
  assert.ok(completedFc, "response.completed output should contain function_call");
  const completedParsed = JSON.parse(completedFc.arguments);
  assert.equal(completedParsed.path, "/tmp/test.py");
  assert.equal(completedParsed.content, content);

  // 5. Verify ALL three argument sources are byte-identical
  assert.equal(
    doneItem.data.item.arguments,
    doneArgsEvent.data.arguments,
    "output_item.done arguments must match function_call_arguments.done arguments"
  );
  assert.equal(
    doneItem.data.item.arguments,
    completedFc.arguments,
    "output_item.done arguments must match response.completed output arguments"
  );

  // 6. Verify no evidence of double-escaping in any argument payload
  for (const source of ["delta", "done", "completed"]) {
    const argsStr =
      source === "delta"
        ? deltaEvent.data.delta
        : source === "done"
          ? doneArgsEvent.data.arguments
          : completedFc.arguments;
    assert.ok(
      !argsStr.includes("\\\\n"),
      `${source} arguments should NOT contain \\\\n (double backslash + n)`
    );
    // All three must be parseable JSON
    const parsed = JSON.parse(argsStr);
    assert.equal(typeof parsed.content, "string");
    assert.ok(parsed.content.includes("\n"), `${source} content should have real newlines`);
    // The backslash-n count after JSON.parse should be 0 (all are real newlines)
    const literalBackslashN = (parsed.content.match(/\\n/g) || []).length;
    assert.equal(
      literalBackslashN,
      0,
      `${source} parsed content should have ZERO literal backslash-n sequences`
    );
  }
});
