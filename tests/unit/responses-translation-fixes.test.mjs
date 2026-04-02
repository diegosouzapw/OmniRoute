import test from "node:test";
import assert from "node:assert/strict";

const { convertResponsesApiFormat } =
  await import("../../open-sse/translator/helpers/responsesApiHelper.ts");
const { openaiResponsesToOpenAIRequest, openaiToOpenAIResponsesRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");
const { sanitizeClaudeContextForNonClaudeTarget } =
  await import("../../open-sse/services/claudeContextSanitizer.ts");
const { supportsPreviousResponseId } =
  await import("../../open-sse/services/responsesConversationState.ts");
const { CodexExecutor } = await import("../../open-sse/executors/codex.ts");

test("convertResponsesApiFormat filters orphaned function_call_output items", () => {
  const body = {
    model: "gpt-4",
    input: [
      {
        type: "function_call_output",
        call_id: "orphaned_call",
        output: "result",
      },
    ],
  };
  const result = convertResponsesApiFormat(body);
  const toolMsgs = result.messages.filter((m) => m.role === "tool");
  assert.equal(toolMsgs.length, 0);
});

test("convertResponsesApiFormat skips function_call items with empty names", () => {
  const body = {
    model: "gpt-4",
    input: [
      { type: "function_call", call_id: "c1", name: "", arguments: "{}" },
      { type: "function_call", call_id: "c2", name: "  ", arguments: "{}" },
    ],
  };
  const result = convertResponsesApiFormat(body);
  const assistantMsgs = result.messages.filter((m) => m.role === "assistant");
  assert.equal(assistantMsgs.length, 0);
});

test("Responses→Chat: input_image converted to image_url with detail", () => {
  const body = {
    model: "gpt-4",
    input: [
      {
        type: "message",
        role: "user",
        content: [
          { type: "input_text", text: "What is this?" },
          { type: "input_image", image_url: "https://example.com/img.png", detail: "high" },
        ],
      },
    ],
  };
  const result = openaiResponsesToOpenAIRequest(null, body, null, null);
  const userMsg = result.messages.find((m) => m.role === "user");
  const imgPart = userMsg.content.find((c) => c.type === "image_url");
  assert.ok(imgPart, "should have image_url content part");
  assert.equal(imgPart.image_url.url, "https://example.com/img.png");
  assert.equal(imgPart.image_url.detail, "high");
});

test("Responses→Chat: input_image without detail omits detail field", () => {
  const body = {
    model: "gpt-4",
    input: [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_image", image_url: "https://example.com/img.png" }],
      },
    ],
  };
  const result = openaiResponsesToOpenAIRequest(null, body, null, null);
  const userMsg = result.messages.find((m) => m.role === "user");
  const imgPart = userMsg.content.find((c) => c.type === "image_url");
  assert.ok(imgPart);
  assert.equal(imgPart.image_url.url, "https://example.com/img.png");
  assert.equal(imgPart.image_url.detail, undefined);
});

test("Chat→Responses: image_url detail preserved as input_image", () => {
  const body = {
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Describe" },
          { type: "image_url", image_url: { url: "https://example.com/img.png", detail: "low" } },
        ],
      },
    ],
  };
  const result = openaiToOpenAIResponsesRequest("gpt-4", body, true, null);
  const userItem = result.input.find((i) => i.type === "message" && i.role === "user");
  const imgPart = userItem.content.find((c) => c.type === "input_image");
  assert.ok(imgPart, "should have input_image content part");
  assert.equal(imgPart.image_url, "https://example.com/img.png");
  assert.equal(imgPart.detail, "low");
});

test("Chat→Responses: image_url without detail omits detail", () => {
  const body = {
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: [{ type: "image_url", image_url: { url: "https://example.com/img.png" } }],
      },
    ],
  };
  const result = openaiToOpenAIResponsesRequest("gpt-4", body, true, null);
  const userItem = result.input.find((i) => i.type === "message" && i.role === "user");
  const imgPart = userItem.content.find((c) => c.type === "input_image");
  assert.ok(imgPart);
  assert.equal(imgPart.detail, undefined);
});

test("Responses→Chat: input_file converted to file content part", () => {
  const body = {
    model: "gpt-4",
    input: [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_file", file_id: "file-abc", filename: "data.csv" }],
      },
    ],
  };
  const result = openaiResponsesToOpenAIRequest(null, body, null, null);
  const userMsg = result.messages.find((m) => m.role === "user");
  const filePart = userMsg.content.find((c) => c.type === "file");
  assert.ok(filePart, "should have file content part");
  assert.equal(filePart.file.file_id, "file-abc");
  assert.equal(filePart.file.filename, "data.csv");
});

test("Chat→Responses: file content part converted to input_file", () => {
  const body = {
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: [{ type: "file", file: { file_id: "file-abc", filename: "data.csv" } }],
      },
    ],
  };
  const result = openaiToOpenAIResponsesRequest("gpt-4", body, true, null);
  const userItem = result.input.find((i) => i.type === "message" && i.role === "user");
  const filePart = userItem.content.find((c) => c.type === "input_file");
  assert.ok(filePart, "should have input_file content part");
  assert.equal(filePart.file_id, "file-abc");
  assert.equal(filePart.filename, "data.csv");
});

test("Responses→Chat: tool_choice {type:'function', name} wrapped to {type:'function', function:{name}}", () => {
  const body = {
    model: "gpt-4",
    input: "hello",
    tool_choice: { type: "function", name: "get_weather" },
    tools: [{ type: "function", name: "get_weather", parameters: {} }],
  };
  const result = openaiResponsesToOpenAIRequest(null, body, null, null);
  assert.deepEqual(result.tool_choice, {
    type: "function",
    function: { name: "get_weather" },
  });
});

test("Chat→Responses: tool_choice {type:'function', function:{name}} unwrapped to {type:'function', name}", () => {
  const body = {
    model: "gpt-4",
    messages: [{ role: "user", content: "hello" }],
    tool_choice: { type: "function", function: { name: "get_weather" } },
    tools: [{ type: "function", function: { name: "get_weather", parameters: {} } }],
  };
  const result = openaiToOpenAIResponsesRequest("gpt-4", body, true, null);
  assert.deepEqual(result.tool_choice, {
    type: "function",
    name: "get_weather",
  });
});

test("Responses→Chat: string tool_choice passes through unchanged", () => {
  const body = { model: "gpt-4", input: "hello", tool_choice: "auto" };
  const result = openaiResponsesToOpenAIRequest(null, body, null, null);
  assert.equal(result.tool_choice, "auto");
});

test("Chat→Responses: string tool_choice passes through unchanged", () => {
  const body = {
    model: "gpt-4",
    messages: [{ role: "user", content: "hello" }],
    tool_choice: "required",
  };
  const result = openaiToOpenAIResponsesRequest("gpt-4", body, true, null);
  assert.equal(result.tool_choice, "required");
});

test("Responses→Chat: built-in tool_choice type throws unsupported error", () => {
  const body = {
    model: "gpt-4",
    input: "hello",
    tool_choice: { type: "web_search_preview" },
  };
  assert.throws(
    () => openaiResponsesToOpenAIRequest(null, body, null, null),
    (err) => err.message.includes("web_search_preview")
  );
});

test("Responses→Chat: web_search tool type throws unsupported error", () => {
  const body = {
    model: "gpt-4",
    input: "search for cats",
    tools: [{ type: "web_search", search_context_size: "medium" }],
  };
  assert.throws(
    () => openaiResponsesToOpenAIRequest(null, body, null, null),
    (err) => err.message.includes("web_search")
  );
});

test("Responses→Chat: computer tool type throws unsupported error", () => {
  const body = {
    model: "gpt-4",
    input: "click button",
    tools: [{ type: "computer" }],
  };
  assert.throws(
    () => openaiResponsesToOpenAIRequest(null, body, null, null),
    (err) => err.message.includes("computer")
  );
});

test("Responses→Chat: mcp tool type throws unsupported error", () => {
  const body = {
    model: "gpt-4",
    input: "hello",
    tools: [{ type: "mcp", server_label: "test", server_url: "https://example.com" }],
  };
  assert.throws(
    () => openaiResponsesToOpenAIRequest(null, body, null, null),
    (err) => err.message.includes("mcp")
  );
});

test("Responses→Chat: non-string arguments are JSON-stringified", () => {
  const body = {
    model: "gpt-4",
    input: [
      { type: "function_call", call_id: "c1", name: "fn", arguments: { key: "val" } },
      { type: "function_call_output", call_id: "c1", output: "ok" },
    ],
  };
  const result = openaiResponsesToOpenAIRequest(null, body, null, null);
  const assistantMsg = result.messages.find((m) => m.role === "assistant");
  assert.equal(typeof assistantMsg.tool_calls[0].function.arguments, "string");
  assert.equal(assistantMsg.tool_calls[0].function.arguments, '{"key":"val"}');
});

test("Chat→Responses: array tool content converts text→input_text types", () => {
  const body = {
    model: "gpt-4",
    messages: [
      { role: "user", content: "hello" },
      {
        role: "assistant",
        content: null,
        tool_calls: [{ id: "c1", type: "function", function: { name: "fn", arguments: "{}" } }],
      },
      {
        role: "tool",
        tool_call_id: "c1",
        content: [{ type: "text", text: "result data" }],
      },
    ],
  };
  const result = openaiToOpenAIResponsesRequest("gpt-4", body, true, null);
  const outputItem = result.input.find((i) => i.type === "function_call_output");
  assert.ok(Array.isArray(outputItem.output), "output should be array");
  assert.equal(outputItem.output[0].type, "input_text");
  assert.equal(outputItem.output[0].text, "result data");
});

test("Responses→Chat: function tool type passes through", () => {
  const body = {
    model: "gpt-4",
    input: "hello",
    tools: [{ type: "function", name: "greet", parameters: {} }],
  };
  const result = openaiResponsesToOpenAIRequest(null, body, null, null);
  assert.equal(result.tools.length, 1);
  assert.equal(result.tools[0].type, "function");
});

test("Chat→Responses: deprecated function_call field on assistant converted to function_call item", () => {
  const body = {
    model: "gpt-4",
    messages: [
      { role: "user", content: "weather?" },
      {
        role: "assistant",
        content: null,
        function_call: { name: "get_weather", arguments: '{"city":"NYC"}' },
      },
    ],
  };
  const result = openaiToOpenAIResponsesRequest("gpt-4", body, true, null);
  const fcItem = result.input.find((i) => i.type === "function_call");
  assert.ok(fcItem, "should have function_call input item");
  assert.equal(fcItem.name, "get_weather");
  assert.equal(fcItem.arguments, '{"city":"NYC"}');
  assert.ok(fcItem.call_id, "should have a call_id");
});

test("Chat→Responses: deprecated function role message converted to function_call_output", () => {
  const body = {
    model: "gpt-4",
    messages: [
      { role: "user", content: "weather?" },
      {
        role: "assistant",
        content: null,
        function_call: { name: "get_weather", arguments: '{"city":"NYC"}' },
      },
      { role: "function", name: "get_weather", content: '{"temp":72}' },
    ],
  };
  const result = openaiToOpenAIResponsesRequest("gpt-4", body, true, null);
  const fcOutput = result.input.find((i) => i.type === "function_call_output");
  assert.ok(fcOutput, "should have function_call_output item");
  assert.equal(fcOutput.output, '{"temp":72}');
  // The call_ids should match between function_call and function_call_output
  const fcItem = result.input.find((i) => i.type === "function_call");
  assert.equal(fcOutput.call_id, fcItem.call_id);
});

test("Chat→Responses: preserves store and previous_response_id for stateful conversations", () => {
  const body = {
    model: "gpt-4",
    messages: [{ role: "user", content: "follow-up" }],
    store: true,
    previous_response_id: "resp_prev_123",
  };

  const result = openaiToOpenAIResponsesRequest("gpt-4", body, true, null);
  assert.equal(result.store, true);
  assert.equal(result.previous_response_id, "resp_prev_123");
});

test("Claude sanitizer strips system-reminder blocks for non-Claude targets while keeping user text", () => {
  const body = {
    system: [
      {
        type: "text",
        text: "Base instructions\n<system-reminder>huge memory dump</system-reminder>\nKeep this",
      },
    ],
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "<system-reminder>The following deferred tools are now available via ToolSearch...</system-reminder>\nhello",
          },
        ],
      },
    ],
  };

  const result = sanitizeClaudeContextForNonClaudeTarget(body);

  assert.equal(result.strippedBlocks, 2);
  assert.equal(result.body.system[0].text, "Base instructions\n\nKeep this");
  assert.equal(result.body.messages[0].content[0].text, "hello");
});

test("Responses state support disables previous_response_id for codex", () => {
  assert.equal(supportsPreviousResponseId("codex"), false);
  assert.equal(supportsPreviousResponseId("github"), true);
});

test("Codex executor strips previous_response_id and forces store=false", () => {
  const executor = new CodexExecutor();
  const body = {
    model: "gpt-5.4",
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
    store: true,
    previous_response_id: "resp_prev_123",
  };

  const result = executor.transformRequest("gpt-5.4", body, true, {
    requestEndpointPath: "/responses",
  });

  assert.equal(result.store, false);
  assert.equal("previous_response_id" in result, false);
});

const { openaiToOpenAIResponsesResponse, openaiResponsesToOpenAIResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { initState, translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { createSSETransformStreamWithLogger } = await import("../../open-sse/utils/stream.ts");

test("Chat→Responses streaming: usage-only chunk is captured (not dropped)", () => {
  const state = initState(FORMATS.OPENAI_RESPONSES);

  // First chunk with content
  const chunk1 = {
    choices: [{ index: 0, delta: { content: "hello" }, finish_reason: null }],
    id: "c1",
  };
  openaiToOpenAIResponsesResponse(chunk1, state);

  // Usage-only chunk (empty choices, has usage)
  const usageChunk = {
    choices: [],
    usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
  };
  const usageEvents = openaiToOpenAIResponsesResponse(usageChunk, state);
  assert.ok(Array.isArray(usageEvents));

  // Finish chunk
  const finishChunk = { choices: [{ index: 0, delta: {}, finish_reason: "stop" }] };
  const finishEvents = openaiToOpenAIResponsesResponse(finishChunk, state);
  const completedEvent = finishEvents.find((e) => e.event === "response.completed");
  assert.ok(completedEvent, "should have completed event");
  assert.ok(completedEvent.data.response.usage, "completed event should include usage");
  assert.equal(completedEvent.data.response.usage.prompt_tokens, 10);
});

test("Chat→Responses streaming: completed event includes accumulated output", () => {
  const state = initState(FORMATS.OPENAI_RESPONSES);

  // Text content
  const chunk = {
    choices: [{ index: 0, delta: { content: "hello world" }, finish_reason: null }],
    id: "c1",
  };
  openaiToOpenAIResponsesResponse(chunk, state);

  // Finish
  const finishChunk = { choices: [{ index: 0, delta: {}, finish_reason: "stop" }] };
  const events = openaiToOpenAIResponsesResponse(finishChunk, state);
  const completedEvent = events.find((e) => e.event === "response.completed");
  assert.ok(completedEvent.data.response.output, "completed should have output");
  assert.ok(completedEvent.data.response.output.length > 0, "output should not be empty");
  const msgOutput = completedEvent.data.response.output.find((o) => o.type === "message");
  assert.ok(msgOutput, "should have message output item");
});

test("Responses→Chat streaming: reasoning delta emits reasoning_content in Chat chunk", () => {
  const state = {
    started: false,
    chatId: null,
    created: null,
    toolCallIndex: 0,
    finishReasonSent: false,
  };

  const chunk = {
    type: "response.reasoning_summary_text.delta",
    delta: "thinking step...",
    item_id: "rs_1",
    output_index: 0,
    summary_index: 0,
  };
  const result = openaiResponsesToOpenAIResponse(chunk, state);
  assert.ok(result, "should return a chunk");
  assert.equal(result.choices[0].delta.reasoning_content, "thinking step...");
});

test("Chat→Responses streaming: multiple <think> tags in one chunk handled", () => {
  const state = initState(FORMATS.OPENAI_RESPONSES);

  // Chunk with multiple think tags
  const chunk = {
    choices: [
      {
        index: 0,
        delta: { content: "<think>first</think>middle<think>second</think>end" },
        finish_reason: null,
      },
    ],
    id: "c1",
  };
  const events = openaiToOpenAIResponsesResponse(chunk, state);
  // Should not have literal <think> in any text delta
  const textDeltas = events
    .filter((e) => e.event === "response.output_text.delta")
    .map((e) => e.data.delta);
  const combined = textDeltas.join("");
  assert.ok(!combined.includes("<think>"), `text should not contain <think> tag, got: ${combined}`);
});

test("Responses→Chat streaming: output_item.done with function_call emits args chunk when no deltas received", () => {
  // Regression: Codex Responses API sometimes delivers arguments only in output_item.done,
  // not via preceding function_call_arguments.delta events. Without this fix the chunk
  // was discarded (returned null) and Claude Code would drop the tool-call response.
  const state = {
    started: true,
    chatId: "chatcmpl-test",
    created: 1234567890,
    toolCallIndex: 0,
    finishReasonSent: false,
    currentToolCallId: "call_abc",
    currentToolCallArgsBuffer: "", // no deltas received yet
  };

  const chunk = {
    type: "response.output_item.done",
    item: {
      type: "function_call",
      call_id: "call_abc",
      name: "search_tasks",
      status: "completed",
      arguments: '{"query":"select:TaskCreate,TaskUpdate","max_results":10}',
    },
  };
  const result = openaiResponsesToOpenAIResponse(chunk, state);
  assert.ok(
    result,
    "should not return null when item.arguments has content and no deltas were sent"
  );
  const tc = result.choices[0].delta.tool_calls[0];
  assert.equal(tc.function.arguments, '{"query":"select:TaskCreate,TaskUpdate","max_results":10}');
  assert.equal(tc.index, 0, "index should be the captured pre-increment value");
  assert.equal(state.toolCallIndex, 1, "toolCallIndex should be incremented after done");
});

test("Responses→Chat streaming: output_item.done with function_call returns null when args already sent via deltas", () => {
  // Regression guard: when arguments were already streamed incrementally, the done event
  // must NOT re-emit them (would cause double-emit and break Claude Code ACP rendering).
  const state = {
    started: true,
    chatId: "chatcmpl-test",
    created: 1234567890,
    toolCallIndex: 0,
    finishReasonSent: false,
    currentToolCallId: "call_abc",
    currentToolCallArgsBuffer: '{"query":"search"}', // deltas already received
  };

  const chunk = {
    type: "response.output_item.done",
    item: {
      type: "function_call",
      call_id: "call_abc",
      name: "search",
      status: "completed",
      arguments: '{"query":"search"}',
    },
  };
  const result = openaiResponsesToOpenAIResponse(chunk, state);
  assert.equal(result, null, "should return null when args already sent via deltas");
  assert.equal(state.toolCallIndex, 1, "toolCallIndex should still be incremented");
});

test("Responses→Chat streaming: output_item.done with function_call stringifies object arguments", () => {
  // Regression: item.arguments may arrive as a plain object instead of a JSON string;
  // the translator must JSON.stringify it before emitting.
  const state = {
    started: true,
    chatId: "chatcmpl-test",
    created: 1234567890,
    toolCallIndex: 0,
    finishReasonSent: false,
    currentToolCallId: "call_def",
    currentToolCallArgsBuffer: "",
  };

  const chunk = {
    type: "response.output_item.done",
    item: {
      type: "function_call",
      call_id: "call_def",
      name: "fn",
      status: "completed",
      arguments: { query: "test", max_results: 5 },
    },
  };
  const result = openaiResponsesToOpenAIResponse(chunk, state);
  assert.ok(result, "should not return null for object arguments");
  const tc = result.choices[0].delta.tool_calls[0];
  assert.equal(typeof tc.function.arguments, "string", "arguments must be a string");
  assert.equal(tc.function.arguments, '{"query":"test","max_results":5}');
});

test("Responses→Chat streaming: delta handler accumulates buffer so done event skips re-emit", () => {
  // Full sequence: added → delta → done. Verifies buffer accumulation and correct skip.
  const state = {
    started: true,
    chatId: "chatcmpl-test",
    created: 1234567890,
    toolCallIndex: 0,
    finishReasonSent: false,
    currentToolCallArgsBuffer: "",
  };

  // Simulate output_item.added
  openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_seq", name: "fn" },
    },
    state
  );
  assert.equal(state.currentToolCallArgsBuffer, "", "buffer should be empty after added");

  // Simulate two delta events
  openaiResponsesToOpenAIResponse(
    {
      type: "response.function_call_arguments.delta",
      delta: '{"a":',
    },
    state
  );
  openaiResponsesToOpenAIResponse(
    {
      type: "response.function_call_arguments.delta",
      delta: '"b"}',
    },
    state
  );
  assert.equal(state.currentToolCallArgsBuffer, '{"a":"b"}', "buffer should accumulate deltas");

  // done event — buffer is non-empty → must return null, not re-emit
  const doneResult = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: { type: "function_call", call_id: "call_seq", name: "fn", arguments: '{"a":"b"}' },
    },
    state
  );
  assert.equal(doneResult, null, "done should return null when args were already streamed");
  assert.equal(state.toolCallIndex, 1, "index incremented after done");
  assert.equal(state.currentToolCallArgsBuffer, "", "buffer reset after done");
});

test("Responses→Chat streaming: empty-name function_call is deferred until done provides a valid name", () => {
  const state = {
    started: true,
    chatId: "chatcmpl-test",
    created: 1234567890,
    toolCallIndex: 0,
    finishReasonSent: false,
    currentToolCallArgsBuffer: "",
    currentToolCallDeferred: false,
  };

  const added = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_deferred", name: "   " },
    },
    state
  );
  assert.equal(added, null, "placeholder tool name should not be emitted immediately");

  const delta = openaiResponsesToOpenAIResponse(
    {
      type: "response.function_call_arguments.delta",
      delta: '{"query":"deferred"}',
    },
    state
  );
  assert.equal(delta, null, "argument deltas stay buffered until a valid name exists");

  const done = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: {
        type: "function_call",
        call_id: "call_deferred",
        name: "search_tasks",
        arguments: '{"query":"deferred"}',
      },
    },
    state
  );

  assert.ok(done, "done event should recover deferred tool call once the name is valid");
  const tc = done.choices[0].delta.tool_calls[0];
  assert.equal(tc.id, "call_deferred");
  assert.equal(tc.function.name, "search_tasks");
  assert.equal(tc.function.arguments, '{"query":"deferred"}');
  assert.equal(state.toolCallIndex, 1, "valid deferred tool call should advance the index");
});

test("Responses→Chat streaming: empty-name function_call is dropped when done never provides a name", () => {
  const state = {
    started: true,
    chatId: "chatcmpl-test",
    created: 1234567890,
    toolCallIndex: 0,
    finishReasonSent: false,
    currentToolCallArgsBuffer: "",
    currentToolCallDeferred: false,
  };

  openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_empty", name: "" },
    },
    state
  );

  const done = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: {
        type: "function_call",
        call_id: "call_empty",
        name: " ",
        arguments: '{"ignored":true}',
      },
    },
    state
  );

  assert.equal(done, null, "tool call should stay suppressed when the name is still empty");
  assert.equal(state.toolCallIndex, 0, "suppressed tool call must not affect finish_reason");
});

test("Responses→Claude streaming: translated Claude SSE is not sanitized into empty OpenAI chunks", async () => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const stream = createSSETransformStreamWithLogger(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.CLAUDE,
    "codex",
    null,
    null,
    "gpt-5.4",
    "conn-test",
    { messages: [{ role: "user", content: "hi" }] },
    null,
    null
  );

  const writer = stream.writable.getWriter();
  await writer.write(
    encoder.encode('data: {"type":"response.output_text.delta","delta":"hello"}\n\n')
  );
  await writer.write(
    encoder.encode(
      'data: {"type":"response.completed","response":{"usage":{"input_tokens":12,"output_tokens":3}}}\n\n'
    )
  );
  await writer.close();

  const reader = stream.readable.getReader();
  let output = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    output += decoder.decode(value, { stream: true });
  }
  output += decoder.decode();

  assert.match(output, /event: message_start/, "should emit Claude message_start");
  assert.match(output, /event: content_block_start/, "should emit Claude content block start");
  assert.match(output, /event: content_block_delta/, "should emit Claude text delta");
  assert.match(output, /event: message_delta/, "should emit Claude message_delta");
  assert.match(output, /event: message_stop/, "should emit Claude message_stop");
  assert.doesNotMatch(
    output,
    /data: \{"object":"chat\.completion\.chunk"\}\n\n/,
    "must not leak sanitized empty OpenAI chunks to Claude clients"
  );
});

test("Claude→Responses: preserves store and previous_response_id across the full translation chain", () => {
  const body = {
    model: "gpt-5.4",
    system: "system reminder",
    store: true,
    previous_response_id: "resp_stateful_456",
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: "follow-up" }],
      },
    ],
  };

  const result = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI_RESPONSES,
    "gpt-5.4",
    body,
    true,
    null,
    "codex"
  );

  assert.equal(result.store, true);
  assert.equal(result.previous_response_id, "resp_stateful_456");
});
