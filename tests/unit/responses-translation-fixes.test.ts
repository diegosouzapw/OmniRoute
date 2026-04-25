import test from "node:test";
import assert from "node:assert/strict";

const { convertResponsesApiFormat } =
  await import("../../open-sse/translator/helpers/responsesApiHelper.ts");
const { openaiResponsesToOpenAIRequest, openaiToOpenAIResponsesRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");

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
  const toolMsgs = (result as any).messages.filter((m) => m.role === "tool");
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
  const assistantMsgs = (result as any).messages.filter((m) => m.role === "assistant");
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
  const userMsg = (result as any).messages.find((m) => m.role === "user");
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
  const userMsg = (result as any).messages.find((m) => m.role === "user");
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
  const userItem = (result as any).input.find((i) => i.type === "message" && i.role === "user");
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
  const userItem = (result as any).input.find((i) => i.type === "message" && i.role === "user");
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
  const userMsg = (result as any).messages.find((m) => m.role === "user");
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
  const userItem = (result as any).input.find((i) => i.type === "message" && i.role === "user");
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
  (assert as any).deepEqual((result as any).tool_choice, {
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
  (assert as any).deepEqual((result as any).tool_choice, {
    type: "function",
    name: "get_weather",
  });
});

test("Responses→Chat: string tool_choice passes through unchanged", () => {
  const body = { model: "gpt-4", input: "hello", tool_choice: "auto" };
  const result = openaiResponsesToOpenAIRequest(null, body, null, null);
  assert.equal((result as any).tool_choice, "auto");
});

test("Chat→Responses: string tool_choice passes through unchanged", () => {
  const body = {
    model: "gpt-4",
    messages: [{ role: "user", content: "hello" }],
    tool_choice: "required",
  };
  const result = openaiToOpenAIResponsesRequest("gpt-4", body, true, null);
  assert.equal((result as any).tool_choice, "required");
});

test("Responses→Chat: built-in tool_choice type throws unsupported error", () => {
  const body = {
    model: "gpt-4",
    input: "hello",
    tool_choice: { type: "web_search_preview" },
  };
  assert.throws(
    () => openaiResponsesToOpenAIRequest(null, body, null, null),
    (err) => (err as any).message.includes("web_search_preview")
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
    (err) => (err as any).message.includes("web_search")
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
    (err) => (err as any).message.includes("computer")
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
    (err) => (err as any).message.includes("mcp")
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
  const assistantMsg = (result as any).messages.find((m) => m.role === "assistant");
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
  const outputItem = (result as any).input.find((i) => i.type === "function_call_output");
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
  assert.equal((result as any).tools.length, 1);
  assert.equal((result as any).tools[0].type, "function");
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
  const fcItem = (result as any).input.find((i) => i.type === "function_call");
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
  const fcOutput = (result as any).input.find((i) => i.type === "function_call_output");
  assert.ok(fcOutput, "should have function_call_output item");
  assert.equal(fcOutput.output, '{"temp":72}');
  // The call_ids should match between function_call and function_call_output
  const fcItem = (result as any).input.find((i) => i.type === "function_call");
  assert.equal(fcOutput.call_id, fcItem.call_id);
});

const { openaiToOpenAIResponsesResponse, openaiResponsesToOpenAIResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

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
  assert.equal(completedEvent.data.response.usage.input_tokens, 10);
  assert.equal(completedEvent.data.response.usage.output_tokens, 5);
  assert.equal(completedEvent.data.response.usage.total_tokens, 15);
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
  assert.equal(result.choices[0].delta.reasoning.summary, "thinking step...");
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
