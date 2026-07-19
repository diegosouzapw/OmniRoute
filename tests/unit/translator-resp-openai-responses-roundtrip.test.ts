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
