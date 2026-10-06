import test from "node:test";
import assert from "node:assert/strict";

const { geminiToOpenAIRequest } =
  await import("../../open-sse/translator/request/gemini-to-openai.ts");

test("Gemini -> OpenAI maps generation config, system instructions and tools", () => {
  const result = geminiToOpenAIRequest(
    "gpt-4o",
    {
      systemInstruction: { parts: [{ text: "Rules" }] },
      generationConfig: { maxOutputTokens: 200, temperature: 0.4, topP: 0.8 },
      tools: [
        {
          functionDeclarations: [
            {
              name: "weather",
              description: "Get weather",
              parameters: { type: "object", properties: { city: { type: "string" } } },
            },
          ],
        },
      ],
    },
    false
  );

  assert.equal(result.stream, false);
  assert.equal(result.max_tokens, 32000);
  assert.equal(result.temperature, 0.4);
  assert.equal(result.top_p, 0.8);
  assert.deepEqual(result.messages, [{ role: "system", content: "Rules" }]);
  assert.deepEqual(result.tools, [
    {
      type: "function",
      function: {
        name: "weather",
        description: "Get weather",
        parameters: { type: "object", properties: { city: { type: "string" } } },
      },
    },
  ]);
});

test("Gemini -> OpenAI converts user text and inlineData to OpenAI content blocks", () => {
  const result = geminiToOpenAIRequest(
    "gpt-4o",
    {
      contents: [
        {
          role: "user",
          parts: [{ text: "Hello" }, { inlineData: { mimeType: "image/png", data: "abc" } }],
        },
      ],
    },
    true
  );

  assert.equal(result.stream, true);
  assert.deepEqual(result.messages, [
    {
      role: "user",
      content: [
        { type: "text", text: "Hello" },
        { type: "image_url", image_url: { url: "data:image/png;base64,abc" } },
      ],
    },
  ]);
});

test("Gemini -> OpenAI converts model parts into assistant text and tool calls", () => {
  const result = geminiToOpenAIRequest(
    "gpt-4o",
    {
      contents: [
        {
          role: "model",
          parts: [
            { text: "Need tool" },
            { functionCall: { name: "weather", args: { city: "Tokyo" } } },
          ],
        },
      ],
    },
    false
  );

  assert.equal(result.messages.length, 1);
  assert.equal(result.messages[0].role, "assistant");
  assert.equal(result.messages[0].content, "Need tool");
  assert.equal(result.messages[0].tool_calls[0].function.name, "weather");
  assert.equal(result.messages[0].tool_calls[0].function.arguments, '{"city":"Tokyo"}');
  assert.match(result.messages[0].tool_calls[0].id, /^call_/);
});

test("Gemini -> OpenAI maps a thought:true part to reasoning_content instead of leaking it into visible text", () => {
  const result = geminiToOpenAIRequest(
    "gpt-4o",
    {
      contents: [
        {
          role: "model",
          parts: [{ thought: true, text: "internal reasoning" }, { text: "final answer" }],
        },
      ],
    },
    false
  );

  assert.equal(result.messages.length, 1);
  const assistant = result.messages[0];
  assert.equal(assistant.role, "assistant");
  assert.equal(assistant.reasoning_content, "internal reasoning");
  // The visible content must not contain the thought text.
  const visibleText =
    typeof assistant.content === "string" ? assistant.content : JSON.stringify(assistant.content);
  assert.doesNotMatch(visibleText, /internal reasoning/);
  assert.match(visibleText, /final answer/);
});

test("Gemini -> OpenAI: a thought-only content still produces a message carrying reasoning_content", () => {
  const result = geminiToOpenAIRequest(
    "gpt-4o",
    {
      contents: [
        {
          role: "model",
          parts: [{ thought: true, text: "only reasoning, no visible answer yet" }],
        },
      ],
    },
    false
  );

  assert.equal(result.messages.length, 1);
  assert.equal(result.messages[0].role, "assistant");
  assert.equal(result.messages[0].reasoning_content, "only reasoning, no visible answer yet");
});

test("Gemini -> OpenAI converts function responses into tool messages", () => {
  const result = geminiToOpenAIRequest(
    "gpt-4o",
    {
      contents: [
        {
          role: "user",
          parts: [
            {
              functionResponse: {
                id: "call_1",
                name: "weather",
                response: { result: { temp: 20 } },
              },
            },
          ],
        },
      ],
    },
    false
  );

  assert.deepEqual(result.messages, [
    {
      role: "tool",
      tool_call_id: "call_1",
      content: '{"temp":20}',
    },
  ]);
});

test("Gemini -> OpenAI preserves functionCall id when present", () => {
  const result = geminiToOpenAIRequest(
    "gpt-4o",
    {
      contents: [
        {
          role: "model",
          parts: [
            {
              functionCall: {
                id: "call_custom_id_999",
                name: "get_weather",
                args: { city: "Tokyo" },
              },
            },
          ],
        },
      ],
    },
    false
  );

  assert.equal(result.messages.length, 1);
  assert.equal(result.messages[0].role, "assistant");
  assert.equal(result.messages[0].tool_calls[0].id, "call_custom_id_999");
  assert.equal(result.messages[0].tool_calls[0].function.name, "get_weather");
});

test("Gemini -> OpenAI maintains matching IDs across multi-turn tool call and response", () => {
  const result = geminiToOpenAIRequest(
    "gpt-4o",
    {
      contents: [
        {
          role: "model",
          parts: [
            {
              functionCall: {
                id: "call_calc_456",
                name: "calculator",
                args: { expr: "2 + 2" },
              },
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              functionResponse: {
                id: "call_calc_456",
                name: "calculator",
                response: { result: 4 },
              },
            },
          ],
        },
      ],
    },
    false
  );

  assert.equal(result.messages.length, 2);
  const assistantCallId = result.messages[0].tool_calls[0].id;
  const toolResponseCallId = result.messages[1].tool_call_id;
  assert.equal(assistantCallId, "call_calc_456");
  assert.equal(toolResponseCallId, "call_calc_456");
  assert.equal(assistantCallId, toolResponseCallId);
});

test("Gemini -> OpenAI preserves falsy primitive results in function responses (false, 0, empty string, null)", () => {
  const cases: Array<[unknown, string]> = [
    [false, "false"],
    [0, "0"],
    ["", '""'],
    [null, "null"],
    [true, "true"],
    [42, "42"],
    ["done", '"done"'],
  ];

  for (const [inputVal, expected] of cases) {
    const result = geminiToOpenAIRequest(
      "gpt-4o",
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                functionResponse: {
                  id: "call_test",
                  name: "check_condition",
                  response: { result: inputVal },
                },
              },
            ],
          },
        ],
      },
      false
    );

    assert.equal(result.messages.length, 1);
    assert.equal(result.messages[0].role, "tool");
    assert.equal(result.messages[0].tool_call_id, "call_test");
    assert.equal(result.messages[0].content, expected);
  }
});

test("Gemini -> OpenAI preserves custom response objects without result key", () => {
  const result = geminiToOpenAIRequest(
    "gpt-4o",
    {
      contents: [
        {
          role: "user",
          parts: [
            {
              functionResponse: {
                id: "call_custom",
                name: "custom_op",
                response: { output: "value", success: false },
              },
            },
          ],
        },
      ],
    },
    false
  );

  assert.equal(result.messages.length, 1);
  assert.equal(result.messages[0].role, "tool");
  assert.equal(result.messages[0].content, '{"output":"value","success":false}');
});
