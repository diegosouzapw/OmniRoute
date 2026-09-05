import test from "node:test";
import assert from "node:assert/strict";

// Naver CLOVA Studio "Chat Completions v3" translator pair.
//
// The guard that matters most here is the stream-duplication case: `event: token`
// carries an INCREMENTAL delta while the terminal `event: result` repeats the
// COMPLETE text. Concatenating both doubles the whole answer at the end of the
// stream, so the result event must contribute finish_reason + usage only.
//
// Wire docs: https://api.ncloud-docs.com/docs/clovastudio-chatcompletionsv3

const request = await import("../../../open-sse/translator/request/openai-to-clova.ts");
const response = await import("../../../open-sse/translator/response/clova-to-openai.ts");
const registry = await import("../../../open-sse/translator/registry.ts");
const { FORMATS } = await import("../../../open-sse/translator/formats.ts");
const { getExecutor } = await import("../../../open-sse/executors/index.ts");

// ---------------------------------------------------------------------------
// Request: OpenAI → CLOVA v3
// ---------------------------------------------------------------------------

test("clova v3: registers the request and response translator pair", () => {
  assert.ok(registry.getRequestTranslator(FORMATS.OPENAI, FORMATS.CLOVA));
  assert.ok(registry.getResponseTranslator(FORMATS.CLOVA, FORMATS.OPENAI));
});

test("clova v3: its executor appends and URL-encodes the selected model", async () => {
  const executor = await getExecutor("clova-studio");
  assert.equal(
    executor.buildUrl("HCX 005", true),
    "https://clovastudio.stream.ntruss.com/v3/chat-completions/HCX%20005"
  );
});

test("clova v3: string content becomes a typed text part", () => {
  const body = { messages: [{ role: "user", content: "hello" }] };
  const payload = request.buildClovaPayload("HCX-005", body, true, null);
  assert.deepEqual(payload.messages[0], {
    role: "user",
    content: [{ type: "text", text: "hello" }],
  });
});

test("clova v3: sampling params are camelCased", () => {
  const payload = request.buildClovaPayload(
    "HCX-005",
    {
      messages: [{ role: "user", content: "hi" }],
      max_tokens: 512,
      top_p: 0.8,
      top_k: 4,
      temperature: 0.5,
      repetition_penalty: 1.15,
      seed: 42,
      stop: ["END"],
    },
    true,
    null
  );
  assert.equal(payload.maxTokens, 512);
  assert.equal(payload.topP, 0.8);
  assert.equal(payload.topK, 4);
  assert.equal(payload.temperature, 0.5);
  assert.equal(payload.repetitionPenalty, 1.15);
  assert.equal(payload.seed, 42);
  assert.deepEqual(payload.stop, ["END"]);
  // snake_case must not leak upstream.
  assert.equal(payload.max_tokens, undefined);
  assert.equal(payload.top_p, undefined);
});

test("clova v3: output tokens are clamped to the documented 4096 cap", () => {
  const payload = request.buildClovaPayload(
    "HCX-005",
    { messages: [{ role: "user", content: "hi" }], max_tokens: 100000 },
    true,
    null
  );
  assert.equal(payload.maxTokens, request.CLOVA_V3_MAX_OUTPUT_TOKENS);
});

test("clova v3: max_completion_tokens on a text model still maps to maxTokens", () => {
  // Only reasoning models speak `maxCompletionTokens`; for text models the cap is
  // `maxTokens` regardless of which OpenAI alias the client used.
  const payload = request.buildClovaPayload(
    "HCX-005",
    { messages: [{ role: "user", content: "hi" }], max_completion_tokens: 1024 },
    true,
    null
  );
  assert.equal(payload.maxTokens, 1024);
  assert.equal(payload.maxCompletionTokens, undefined);
});

test("clova v3: model and stream are not sent in the body", () => {
  const payload = request.buildClovaPayload(
    "HCX-005",
    { model: "HCX-005", stream: true, messages: [{ role: "user", content: "hi" }] },
    true,
    null
  );
  // The model travels in the URL path and streaming is driven by Accept.
  assert.equal(payload.model, undefined);
  assert.equal(payload.stream, undefined);
});

// ---------------------------------------------------------------------------
// Function calling (v3-fc) — same endpoint, different body fields
// ---------------------------------------------------------------------------

test("clova v3: tools are translated and toolChoice auto is forwarded", () => {
  const payload = request.buildClovaPayload(
    "HCX-005",
    {
      messages: [{ role: "user", content: "Weather in Seoul?" }],
      tools: [
        {
          type: "function",
          function: {
            name: "get_weather",
            description: "Get the weather for a city",
            parameters: {
              type: "object",
              properties: { location: { type: "string" } },
              required: ["location"],
            },
          },
        },
      ],
      tool_choice: "auto",
    },
    true,
    null
  );
  assert.deepEqual(payload.tools, [
    {
      type: "function",
      function: {
        name: "get_weather",
        description: "Get the weather for a city",
        parameters: {
          type: "object",
          properties: { location: { type: "string" } },
          required: ["location"],
        },
      },
    },
  ]);
  assert.equal(payload.toolChoice, "auto");
});

test("clova v3: toolChoice none is forwarded; a forced choice is dropped", () => {
  // Live-verified: `toolChoice: {type:"function", function:{name}}` returns
  // `40009 Unsupported function` — CLOVA only accepts "auto" and "none".
  const none = request.buildClovaPayload(
    "HCX-005",
    {
      messages: [{ role: "user", content: "hi" }],
      tools: [{ type: "function", function: { name: "f" } }],
      tool_choice: "none",
    },
    true,
    null
  );
  assert.equal(none.toolChoice, "none");

  const forced = request.buildClovaPayload(
    "HCX-005",
    {
      messages: [{ role: "user", content: "hi" }],
      tools: [{ type: "function", function: { name: "f" } }],
      tool_choice: { type: "function", function: { name: "f" } },
    },
    true,
    null
  );
  assert.equal(forced.toolChoice, undefined);
});

test("clova v3: function calling raises the cap to the documented 1024 minimum", () => {
  // Live-verified: any cap below 1024 fails with
  // `40001 Invalid parameter: tools, maxTokens`.
  const below = request.buildClovaPayload(
    "HCX-005",
    {
      messages: [{ role: "user", content: "hi" }],
      tools: [{ type: "function", function: { name: "f" } }],
      max_tokens: 128,
    },
    true,
    null
  );
  assert.equal(below.maxTokens, request.CLOVA_V3_MIN_TOOL_TOKENS);

  const absent = request.buildClovaPayload(
    "HCX-005",
    {
      messages: [{ role: "user", content: "hi" }],
      tools: [{ type: "function", function: { name: "f" } }],
    },
    true,
    null
  );
  assert.equal(absent.maxTokens, request.CLOVA_V3_MIN_TOOL_TOKENS);

  const above = request.buildClovaPayload(
    "HCX-005",
    {
      messages: [{ role: "user", content: "hi" }],
      tools: [{ type: "function", function: { name: "f" } }],
      max_tokens: 2048,
    },
    true,
    null
  );
  assert.equal(above.maxTokens, 2048);
});

test("clova v3: function calling forces thinking.effort none on the reasoning model", () => {
  // Live-verified: HCX-007 without it returns
  // `40001 Invalid parameter: tools, thinking`.
  const payload = request.buildClovaPayload(
    "HCX-007",
    {
      messages: [{ role: "user", content: "hi" }],
      tools: [{ type: "function", function: { name: "f" } }],
      max_tokens: 2048,
    },
    true,
    null
  );
  assert.deepEqual(payload.thinking, { effort: "none" });
  assert.equal(payload.maxCompletionTokens, 2048);
  assert.equal(payload.maxTokens, undefined);
});

test("clova v3: non-reasoning models never receive a thinking field", () => {
  // Regression guard: HCX-005 and HCX-DASH-002 reject `thinking` outright
  // (live-verified: `40001 Invalid parameter: thinking`), even with tools.
  for (const model of ["HCX-005", "HCX-DASH-002"]) {
    const withTools = request.buildClovaPayload(
      model,
      {
        messages: [{ role: "user", content: "hi" }],
        tools: [{ type: "function", function: { name: "f" } }],
      },
      true,
      null
    );
    assert.equal(withTools.thinking, undefined, `${model} must not receive thinking`);
    assert.ok(Array.isArray(withTools.tools));

    const askingForReasoning = request.buildClovaPayload(
      model,
      { messages: [{ role: "user", content: "hi" }], reasoning_effort: "high" },
      true,
      null
    );
    assert.equal(askingForReasoning.thinking, undefined, `${model} ignores reasoning_effort`);
  }
});

test("clova v3: images are dropped in function-calling mode", () => {
  const payload = request.buildClovaPayload(
    "HCX-005",
    {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "describe" },
            { type: "image_url", image_url: { url: "https://example.com/a.png" } },
          ],
        },
      ],
      tools: [{ type: "function", function: { name: "f" } }],
    },
    true,
    null
  );
  assert.deepEqual(payload.messages[0], { role: "user", content: "describe" });
  assert.ok(!JSON.stringify(payload).includes("imageUrl"));
});

test("clova v3: a tool result round-trips as role tool with toolCallId", () => {
  const payload = request.buildClovaPayload(
    "HCX-005",
    {
      messages: [
        { role: "user", content: "Weather in Seoul?" },
        {
          role: "assistant",
          content: "",
          tool_calls: [
            {
              id: "call_abc",
              type: "function",
              function: { name: "get_weather", arguments: '{"location":"Seoul"}' },
            },
          ],
        },
        { role: "tool", tool_call_id: "call_abc", content: '{"temp":17}' },
      ],
      tools: [{ type: "function", function: { name: "get_weather" } }],
    },
    true,
    null
  );

  assert.deepEqual(payload.messages[1], {
    role: "assistant",
    content: "",
    toolCalls: [
      {
        id: "call_abc",
        type: "function",
        function: { name: "get_weather", arguments: { location: "Seoul" } },
      },
    ],
  });
  // CLOVA wants `arguments` as an object; OpenAI sends a JSON string.
  assert.equal(typeof payload.messages[1].toolCalls[0].function.arguments, "object");

  assert.deepEqual(payload.messages[2], {
    role: "tool",
    content: '{"temp":17}',
    toolCallId: "call_abc",
  });
});

// ---------------------------------------------------------------------------
// Structured Outputs (v3-so) — HCX-007 only
// ---------------------------------------------------------------------------

test("clova v3: json_schema maps onto responseFormat", () => {
  const schema = {
    type: "object",
    properties: { temp_high_c: { type: "number" } },
    required: ["temp_high_c"],
  };
  const payload = request.buildClovaPayload(
    "HCX-007",
    {
      messages: [{ role: "user", content: "..." }],
      response_format: { type: "json_schema", json_schema: { name: "weather", schema } },
    },
    true,
    null
  );
  assert.deepEqual(payload.responseFormat, { type: "json", schema });
  // Structured Outputs cannot be combined with reasoning (live-verified).
  assert.deepEqual(payload.thinking, { effort: "none" });
});

test("clova v3: structured outputs are dropped off the HCX-007-only path", () => {
  // HCX-005 rejects `thinking` outright, so SO is unavailable there
  // (live-verified: `40001 Invalid parameter: thinking`).
  const payload = request.buildClovaPayload(
    "HCX-005",
    {
      messages: [{ role: "user", content: "..." }],
      response_format: {
        type: "json_schema",
        json_schema: { name: "x", schema: { type: "object" } },
      },
    },
    true,
    null
  );
  assert.equal(payload.responseFormat, undefined);
  assert.equal(payload.thinking, undefined);
});

test("clova v3: function calling wins over structured outputs", () => {
  const payload = request.buildClovaPayload(
    "HCX-007",
    {
      messages: [{ role: "user", content: "..." }],
      tools: [{ type: "function", function: { name: "f" } }],
      response_format: {
        type: "json_schema",
        json_schema: { name: "x", schema: { type: "object" } },
      },
    },
    true,
    null
  );
  assert.ok(Array.isArray(payload.tools));
  assert.equal(payload.responseFormat, undefined);
});

test("clova v3: a public image URL maps to imageUrl.url", () => {
  const payload = request.buildClovaPayload(
    "HCX-005",
    {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "describe" },
            { type: "image_url", image_url: { url: "https://example.com/a.png" } },
          ],
        },
      ],
    },
    true,
    null
  );
  const parts = payload.messages[0].content;
  assert.deepEqual(parts[1], {
    type: "image_url",
    imageUrl: { url: "https://example.com/a.png" },
  });
});

test("clova v3: base64 images keep their full data-URI prefix in dataUri.data", () => {
  // Regression guard: the prefix MUST survive. Sending only the base64 payload
  // (prefix stripped) makes CLOVA reject the whole request with
  // `40001 Invalid parameter`, while the complete data-URI string is accepted.
  // Live-verified 2026-09-01 with PNG and JPEG at 16x16, 64x64 and full size.
  const payload = request.buildClovaPayload(
    "HCX-005",
    {
      messages: [
        {
          role: "user",
          content: [
            { type: "image_url", image_url: { url: "data:image/png;base64,AAAABBBB" } },
            { type: "text", text: "what is this" },
          ],
        },
      ],
    },
    true,
    null
  );
  assert.deepEqual(payload.messages[0].content[0], {
    type: "image_url",
    dataUri: { data: "data:image/png;base64,AAAABBBB" },
  });
  assert.deepEqual(payload.messages[0].content[1], { type: "text", text: "what is this" });
});

test("clova v3: a data: image never leaks into imageUrl.url", () => {
  const payload = request.buildClovaPayload(
    "HCX-005",
    {
      messages: [
        {
          role: "user",
          content: [{ type: "image_url", image_url: { url: "data:image/jpeg;base64,ZZZZ" } }],
        },
      ],
    },
    true,
    null
  );
  const part = payload.messages[0].content[0];
  assert.equal(part.imageUrl, undefined);
  assert.deepEqual(part.dataUri, { data: "data:image/jpeg;base64,ZZZZ" });
});

test("clova v3: images are stripped for a text-only model", () => {
  const payload = request.buildClovaPayload(
    "HCX-DASH-002",
    {
      messages: [
        {
          role: "user",
          content: [
            { type: "image_url", image_url: { url: "https://example.com/a.png" } },
            { type: "text", text: "describe" },
          ],
        },
      ],
    },
    true,
    null
  );
  assert.deepEqual(payload.messages[0].content, [{ type: "text", text: "describe" }]);
});

// ---------------------------------------------------------------------------
// Reasoning model (HCX-007) contract
// ---------------------------------------------------------------------------

test("clova v3: reasoning models use maxCompletionTokens, never maxTokens", () => {
  // Live-verified: HCX-007 answers 40001 "Invalid parameter: maxTokens" when the
  // cap is sent as `maxTokens`, and succeeds with `maxCompletionTokens`.
  const withMaxTokens = request.buildClovaPayload(
    "HCX-007",
    { messages: [{ role: "user", content: "hi" }], max_tokens: 1024 },
    true,
    null
  );
  assert.equal(withMaxTokens.maxCompletionTokens, 1024);
  assert.equal(withMaxTokens.maxTokens, undefined);

  const withMaxCompletion = request.buildClovaPayload(
    "HCX-007",
    { messages: [{ role: "user", content: "hi" }], max_completion_tokens: 2048 },
    true,
    null
  );
  assert.equal(withMaxCompletion.maxCompletionTokens, 2048);
});

test("clova v3: reasoning output cap is 32768, not the 4096 text-model cap", () => {
  const payload = request.buildClovaPayload(
    "HCX-007",
    { messages: [{ role: "user", content: "hi" }], max_tokens: 999999 },
    true,
    null
  );
  assert.equal(payload.maxCompletionTokens, request.CLOVA_V3_REASONING_MAX_OUTPUT_TOKENS);

  const textModel = request.buildClovaPayload(
    "HCX-005",
    { messages: [{ role: "user", content: "hi" }], max_tokens: 999999 },
    true,
    null
  );
  assert.equal(textModel.maxTokens, request.CLOVA_V3_MAX_OUTPUT_TOKENS);
});

test("clova v3: stop is dropped for reasoning models", () => {
  // The vendor docs state `stop` cannot be used while thinking.
  const reasoning = request.buildClovaPayload(
    "HCX-007",
    { messages: [{ role: "user", content: "hi" }], stop: ["END"] },
    true,
    null
  );
  assert.equal(reasoning.stop, undefined);

  const text = request.buildClovaPayload(
    "HCX-005",
    { messages: [{ role: "user", content: "hi" }], stop: ["END"] },
    true,
    null
  );
  assert.deepEqual(text.stop, ["END"]);
});

test("clova v3: images are stripped for the reasoning model (HCX-007 has no vision)", () => {
  const payload = request.buildClovaPayload(
    "HCX-007",
    {
      messages: [
        {
          role: "user",
          content: [
            { type: "image_url", image_url: { url: "https://example.com/a.png" } },
            { type: "text", text: "describe" },
          ],
        },
      ],
    },
    true,
    null
  );
  assert.deepEqual(payload.messages[0].content, [{ type: "text", text: "describe" }]);
});

test("clova v3: reasoning_effort maps onto thinking.effort", () => {
  assert.equal(request.toClovaThinkingEffort("low"), "low");
  assert.equal(request.toClovaThinkingEffort("high"), "high");
  // OpenAI's `minimal` has no CLOVA equivalent; `low` is the closest.
  assert.equal(request.toClovaThinkingEffort("minimal"), "low");
  // Unknown values are omitted so CLOVA applies its own default.
  assert.equal(request.toClovaThinkingEffort("bogus"), "");

  const payload = request.buildClovaPayload(
    "HCX-007",
    { messages: [{ role: "user", content: "hi" }], reasoning_effort: "high" },
    true,
    null
  );
  assert.deepEqual(payload.thinking, { effort: "high" });

  const noEffort = request.buildClovaPayload(
    "HCX-007",
    { messages: [{ role: "user", content: "hi" }] },
    true,
    null
  );
  assert.equal(noEffort.thinking, undefined);

  // Non-reasoning models must never receive the thinking envelope.
  const textModel = request.buildClovaPayload(
    "HCX-005",
    { messages: [{ role: "user", content: "hi" }], reasoning_effort: "high" },
    true,
    null
  );
  assert.equal(textModel.thinking, undefined);
});

// ---------------------------------------------------------------------------
// Response: CLOVA v3 → OpenAI
// ---------------------------------------------------------------------------

function tokenFrame(text: string): string {
  return (
    `id: aabb\n` +
    `event: token\n` +
    `data: ${JSON.stringify({ message: { role: "assistant", content: text }, finishReason: null, created: 1 })}\n\n`
  );
}

function resultFrame(fullText: string): string {
  return (
    `id: aabb\n` +
    `event: result\n` +
    `data: ${JSON.stringify({
      message: { role: "assistant", content: fullText },
      finishReason: "stop",
      created: 1,
      usage: { promptTokens: 20, completionTokens: 5, totalTokens: 25 },
    })}\n\n`
  );
}

test("clova v3: a token frame emits an incremental delta", () => {
  const state = {};
  const chunk = response.convertClovaToOpenAI(tokenFrame("안"), state);
  assert.equal(chunk.choices[0].delta.content, "안");
  // First chunk carries the assistant role, per OpenAI semantics.
  assert.equal(chunk.choices[0].delta.role, "assistant");
  assert.equal(chunk.choices[0].finish_reason, null);
});

test("clova v3: the result frame does NOT repeat the already-streamed text", () => {
  const state = {};
  response.convertClovaToOpenAI(tokenFrame("안"), state);
  response.convertClovaToOpenAI(tokenFrame("녕"), state);
  const terminal = response.convertClovaToOpenAI(resultFrame("안녕"), state);

  // The snapshot text must not be re-emitted — this is the duplication guard.
  assert.equal(terminal.choices[0].delta.content, undefined);
  assert.deepEqual(terminal.choices[0].delta, {});
  assert.equal(terminal.choices[0].finish_reason, "stop");
});

test("clova v3: a full token→result stream yields the answer exactly once", () => {
  const state = {};
  const frames = [tokenFrame("안"), tokenFrame("녕"), resultFrame("안녕")];
  const text = frames
    .map((frame) => response.convertClovaToOpenAI(frame, state))
    .filter(Boolean)
    .map((chunk) => chunk.choices?.[0]?.delta?.content ?? "")
    .join("");

  assert.equal(text, "안녕");
  assert.notEqual(text, "안녕안녕");
  assert.deepEqual(state.usage, {
    prompt_tokens: 20,
    completion_tokens: 5,
    total_tokens: 25,
  });
});

test("clova v3: an upstream status failure surfaces as state.upstreamError", () => {
  const state = {};
  const frame =
    `id: aabb\n` +
    `event: error\n` +
    `data: ${JSON.stringify({ status: { code: "40100", message: "Invalid API key" } })}\n\n`;

  assert.equal(response.convertClovaToOpenAI(frame, state), null);
  assert.equal(state.upstreamError.status, 400);
  assert.match(state.upstreamError.message, /Invalid API key/);
});

test("clova v3: a 5xxxx status maps to a 502 upstream error", () => {
  const state = {};
  const payload = {
    status: { code: "50000", message: "Internal Server Error" },
    result: null,
  };
  assert.equal(response.convertClovaToOpenAI(payload, state), null);
  assert.equal(state.upstreamError.status, 502);
});

test("clova v3: a non-stream envelope replays its text once, then terminates", () => {
  const state = {};
  const out = response.convertClovaToOpenAI(
    {
      status: { code: "20000", message: "OK" },
      result: {
        message: { role: "assistant", content: "hello" },
        usage: { promptTokens: 1, completionTokens: 2, totalTokens: 3 },
        finishReason: "stop",
      },
    },
    state
  );

  assert.ok(Array.isArray(out));
  assert.equal(out[0].choices[0].delta.content, "hello");
  assert.equal(out[1].choices[0].finish_reason, "stop");
  assert.equal(state.usage.total_tokens, 3);
});

test("clova v3: thinkingContent is emitted as reasoning_content", () => {
  const state = {};
  const frame =
    `id: aabb\n` +
    `event: token\n` +
    `data: ${JSON.stringify({ message: { role: "assistant", thinkingContent: "생각" }, finishReason: null })}\n\n`;

  const chunk = response.convertClovaToOpenAI(frame, state);
  assert.equal(chunk.choices[0].delta.reasoning_content, "생각");
  assert.equal(chunk.choices[0].delta.content, undefined);
});

test("clova v3: reasoning and answer deltas stay on separate delta keys", () => {
  const state = {};
  const thinking = response.convertClovaToOpenAI(
    `event: token\ndata: ${JSON.stringify({ message: { thinkingContent: "because" } })}\n\n`,
    state
  );
  const answer = response.convertClovaToOpenAI(
    `event: token\ndata: ${JSON.stringify({ message: { content: "391" } })}\n\n`,
    state
  );

  assert.equal(thinking.choices[0].delta.reasoning_content, "because");
  assert.equal(answer.choices[0].delta.content, "391");
  assert.equal(answer.choices[0].delta.reasoning_content, undefined);
});

test("clova v3: a tool-call stream assembles partialJson fragments", () => {
  const state = {};
  const frame = (data: unknown, event = "token") =>
    `id: x\nevent: ${event}\ndata: ${JSON.stringify(data)}\n\n`;

  // First frame carries id + name; the rest carry only JSON fragments.
  const start = response.convertClovaToOpenAI(
    frame({
      message: {
        role: "assistant",
        content: "",
        toolCalls: [{ id: "call_abc", type: "function", function: { name: "get_weather" } }],
      },
      finishReason: null,
    }),
    state
  );
  assert.deepEqual(start.choices[0].delta.tool_calls, [
    {
      index: 0,
      id: "call_abc",
      type: "function",
      function: { name: "get_weather", arguments: "" },
    },
  ]);

  // Fragment order is taken verbatim from a live HCX-005 function-calling
  // stream — note the space after the colon, which CLOVA emits as its own chunk.
  let args = "";
  for (const fragment of ['{"', "location", '":', ' "', "Se", "oul", '"}']) {
    const chunk = response.convertClovaToOpenAI(
      frame({
        message: {
          role: "assistant",
          content: "",
          toolCalls: [{ type: "function", function: { partialJson: fragment } }],
        },
        finishReason: null,
      }),
      state
    );
    args += chunk.choices[0].delta.tool_calls[0].function.arguments;
  }
  assert.equal(args, '{"location": "Seoul"}');
  assert.deepEqual(JSON.parse(args), { location: "Seoul" });
});

test("clova v3: the terminal frame reports tool_calls without repeating the call", () => {
  const state = {};
  response.convertClovaToOpenAI(
    `id: x\nevent: token\ndata: ${JSON.stringify({ message: { content: "", toolCalls: [{ id: "call_abc", type: "function", function: { name: "get_weather" } }] }, finishReason: null })}\n\n`,
    state
  );

  const terminal = response.convertClovaToOpenAI(
    `id: x\nevent: result\ndata: ${JSON.stringify({
      message: {
        role: "assistant",
        content: "",
        toolCalls: [
          {
            id: "call_abc",
            type: "function",
            function: { name: "get_weather", arguments: { location: "Seoul" } },
          },
        ],
      },
      finishReason: "tool_calls",
      usage: { promptTokens: 9, completionTokens: 47, totalTokens: 56 },
    })}\n\n`,
    state
  );

  // The finished call is a snapshot — it must not be emitted a second time.
  assert.equal(terminal.choices[0].delta.tool_calls, undefined);
  assert.deepEqual(terminal.choices[0].delta, {});
  assert.equal(terminal.choices[0].finish_reason, "tool_calls");
  assert.equal(terminal.usage.total_tokens, 56);
});

test("clova v3: the flush signal and unparseable frames return null", () => {
  const state = {};
  assert.equal(response.convertClovaToOpenAI(null, state), null);
  assert.equal(response.convertClovaToOpenAI("id: aabb\nevent: ping\ndata: \n\n", state), null);
  assert.equal(response.convertClovaToOpenAI("not json at all", state), null);
});

test("clova v3: an unknown event type is ignored", () => {
  const state = {};
  const frame = `event: signal\ndata: ${JSON.stringify({ data: "keepalive" })}\n\n`;
  assert.equal(response.convertClovaToOpenAI(frame, state), null);
});
