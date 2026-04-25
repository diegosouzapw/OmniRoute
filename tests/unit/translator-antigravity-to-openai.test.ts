import test from "node:test";
import assert from "node:assert/strict";

const { antigravityToOpenAIRequest } =
  await import("../../open-sse/translator/request/antigravity-to-openai.ts");

test("Antigravity -> OpenAI maps generation config, system instructions, contents and tools", () => {
  const result = antigravityToOpenAIRequest(
    "gpt-4o",
    {
      request: {
        systemInstruction: { parts: [{ text: "Rules" }] },
        generationConfig: {
          maxOutputTokens: 128,
          temperature: 0.3,
          topP: 0.8,
          topK: 50,
          thinkingConfig: { thinkingBudget: 3000 },
        },
        tools: [
          {
            functionDeclarations: [
              {
                name: "weather",
                description: "Get weather",
                parameters: {
                  type: "OBJECT",
                  properties: { city: { type: "STRING" } },
                },
              },
            ],
          },
        ],
        contents: [
          {
            role: "user",
            parts: [{ text: "Hello" }, { inlineData: { mimeType: "image/png", data: "abc" } }],
          },
          {
            role: "model",
            parts: [
              { thought: true, text: "Need tool" },
              { thoughtSignature: "sig", text: "I will call a tool" },
              { functionCall: { id: "call_1", name: "weather", args: { city: "Tokyo" } } },
            ],
          },
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
    },
    false
  );

  assert.equal(result.max_tokens, 32000);
  assert.equal(result.temperature, 0.3);
  assert.equal(result.top_p, 0.8);
  assert.equal(result.top_k, 50);
  assert.equal(result.reasoning_effort, "medium");
  assert.deepEqual(result.messages[0], { role: "system", content: "Rules" });
  assert.deepEqual(result.messages[1], {
    role: "user",
    content: [
      { type: "text", text: "Hello" },
      { type: "image_url", image_url: { url: "data:image/png;base64,abc" } },
    ],
  });
  assert.equal(result.messages[2].role, "assistant");
  assert.equal(result.messages[2].content, "I will call a tool");
  assert.equal(result.messages[2].reasoning_content, "Need tool");
  assert.deepEqual(result.messages[2].tool_calls, [
    {
      id: "call_1",
      type: "function",
      function: { name: "weather", arguments: '{"city":"Tokyo"}' },
    },
  ]);
  assert.deepEqual(result.messages[3], {
    role: "tool",
    tool_call_id: "call_1",
    content: '{"temp":20}',
  });
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

test("Antigravity -> OpenAI extracts string system instructions and text-only messages", () => {
  const result = antigravityToOpenAIRequest(
    "gpt-4o",
    {
      request: {
        systemInstruction: "Rules",
        contents: [{ role: "user", parts: [{ text: "Hello" }] }],
      },
    },
    true
  );

  assert.equal(result.stream, true);
  assert.deepEqual(result.messages, [
    { role: "system", content: "Rules" },
    { role: "user", content: "Hello" },
  ]);
});

test("Antigravity -> OpenAI returns tool messages when content contains only function responses", () => {
  const result = antigravityToOpenAIRequest(
    "gpt-4o",
    {
      request: {
        contents: [
          {
            role: "user",
            parts: [
              {
                functionResponse: {
                  id: "call_2",
                  name: "search_docs",
                  response: { result: { ok: true } },
                },
              },
            ],
          },
        ],
      },
    },
    false
  );

  assert.deepEqual(result.messages, [
    {
      role: "tool",
      tool_call_id: "call_2",
      content: '{"ok":true}',
    },
  ]);
});

test("Antigravity -> OpenAI lowers schema types recursively", () => {
  const result = antigravityToOpenAIRequest(
    "gpt-4o",
    {
      request: {
        tools: [
          {
            functionDeclarations: [
              {
                name: "compose",
                parameters: {
                  type: "OBJECT",
                  properties: {
                    items: {
                      type: "ARRAY",
                      items: { type: "STRING" },
                    },
                  },
                },
              },
            ],
          },
        ],
      },
    },
    false
  );

  assert.deepEqual((result.tools[0].function as any).parameters, {
    type: "object",
    properties: {
      items: {
        type: "array",
        items: { type: "string" },
      },
    },
  });
});
