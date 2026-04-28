import test from "node:test";
import assert from "node:assert/strict";

const { claudeToOpenAIRequest } =
  await import("../../open-sse/translator/request/claude-to-openai.ts");

test("Claude -> OpenAI maps system blocks, parameters, tool declarations and tool choice", () => {
  const result = claudeToOpenAIRequest(
    "gpt-4o",
    {
      system: [{ text: "Rule A" }, { text: "Rule B" }],
      messages: [{ role: "user", content: [{ type: "text", text: "Hello" }] }],
      tools: [
        { name: "weather", description: null, input_schema: { type: "object" } },
        { name: "   ", description: "skip", input_schema: { type: "object" } },
      ],
      tool_choice: { type: "tool", name: "weather" },
      max_tokens: 40000,
      temperature: 0.4,
      top_p: 0.7,
      stop_sequences: ["DONE"],
    },
    true
  );

  assert.equal(result.model, "gpt-4o");
  assert.equal(result.stream, true);
  assert.equal(result.max_tokens, 40000);
  assert.equal(result.temperature, 0.4);
  assert.equal(result.top_p, 0.7);
  assert.deepEqual(result.stop, ["DONE"]);
  assert.deepEqual(result.messages[0], {
    role: "system",
    content: "Rule A\nRule B",
  });
  assert.deepEqual(result.messages[1], {
    role: "user",
    content: "Hello",
  });
  assert.equal((result.tools as any).length, 1);
  assert.deepEqual(result.tools[0], {
    type: "function",
    function: {
      name: "weather",
      description: "",
      parameters: { type: "object" },
    },
  });
  assert.deepEqual(result.tool_choice, {
    type: "function",
    function: { name: "weather" },
  });
});

test("Claude -> OpenAI converts assistant text and both base64 and URL images", () => {
  const result = claudeToOpenAIRequest(
    "gpt-4o",
    {
      messages: [
        {
          role: "assistant",
          content: [
            { type: "text", text: "Look at this" },
            {
              type: "image",
              source: { type: "base64", media_type: "image/png", data: "abc" },
            },
            {
              type: "image",
              source: { type: "url", url: "https://example.com/cat.png" },
            },
          ],
        },
      ],
    },
    false
  );

  assert.equal(result.messages.length, 1);
  assert.equal(result.messages[0].role, "assistant");
  assert.deepEqual(result.messages[0].content, [
    { type: "text", text: "Look at this" },
    { type: "image_url", image_url: { url: "data:image/png;base64,abc" } },
    { type: "image_url", image_url: { url: "https://example.com/cat.png" } },
  ]);
});

test("Claude -> OpenAI turns thinking and tool_use blocks into assistant tool_calls and auto-fills tool responses", () => {
  const result = claudeToOpenAIRequest(
    "gpt-4o",
    {
      messages: [
        {
          role: "assistant",
          content: [
            { type: "thinking", thinking: "I should inspect the file" },
            {
              type: "tool_use",
              id: "tu_1",
              name: "read_file",
              input: { path: "/tmp/demo" },
            },
          ],
        },
      ],
    },
    false
  );

  assert.equal(result.messages[0].role, "assistant");
  assert.equal(result.messages[0].content, undefined);
  assert.equal(result.messages[0].reasoning_content, "I should inspect the file");
  assert.deepEqual(result.messages[0].tool_calls, [
    {
      id: "tu_1",
      type: "function",
      function: {
        name: "read_file",
        arguments: '{"path":"/tmp/demo"}',
      },
    },
  ]);
  assert.deepEqual(result.messages[1], {
    role: "tool",
    tool_call_id: "tu_1",
    content: "[No response received]",
  });
});

test("Claude -> OpenAI converts tool_result blocks into tool messages and preserves trailing user text", () => {
  const result = claudeToOpenAIRequest(
    "gpt-4o",
    {
      messages: [
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "tu_1",
              content: [
                { type: "text", text: "20C" },
                {
                  type: "image",
                  source: { type: "url", url: "https://example.com/ignored.png" },
                },
              ],
            },
            { type: "text", text: "Thanks" },
          ],
        },
      ],
    },
    false
  );

  assert.deepEqual(result.messages[0], {
    role: "tool",
    tool_call_id: "tu_1",
    content: "20C",
  });
  assert.deepEqual(result.messages[1], {
    role: "user",
    content: "Thanks",
  });
});

test("Claude -> OpenAI maps output_config.effort to reasoning_effort", () => {
  const result = claudeToOpenAIRequest(
    "gpt-5",
    {
      messages: [{ role: "user", content: "hi" }],
      output_config: { effort: "high" },
    },
    false
  );

  assert.equal(result.reasoning_effort, "high");
});

test("Claude -> OpenAI normalizes output_config.effort casing", () => {
  const result = claudeToOpenAIRequest(
    "gpt-5",
    {
      messages: [{ role: "user", content: "hi" }],
      output_config: { effort: "MEDIUM" },
    },
    false
  );

  assert.equal(result.reasoning_effort, "medium");
});

test("Claude -> OpenAI prefers output_config.effort over thinking.budget_tokens", () => {
  const result = claudeToOpenAIRequest(
    "gpt-5",
    {
      messages: [{ role: "user", content: "hi" }],
      output_config: { effort: "low" },
      thinking: { type: "enabled", budget_tokens: 131072 },
    },
    false
  );

  assert.equal(result.reasoning_effort, "low");
});

test("Claude -> OpenAI maps thinking.budget_tokens to reasoning_effort buckets", () => {
  const buckets: Array<{ budget: number; expected: string }> = [
    { budget: 512, expected: "low" },
    { budget: 1024, expected: "low" },
    { budget: 8192, expected: "medium" },
    { budget: 10240, expected: "medium" },
    { budget: 65536, expected: "high" },
    { budget: 131072, expected: "xhigh" },
  ];

  for (const { budget, expected } of buckets) {
    const result = claudeToOpenAIRequest(
      "gpt-5",
      {
        messages: [{ role: "user", content: "hi" }],
        thinking: { type: "enabled", budget_tokens: budget },
      },
      false
    );
    assert.equal(result.reasoning_effort, expected, `budget ${budget} should map to ${expected}`);
  }
});

test("Claude -> OpenAI normalizes output_config.effort=max to xhigh", () => {
  const result = claudeToOpenAIRequest(
    "gpt-5",
    {
      messages: [{ role: "user", content: "hi" }],
      output_config: { effort: "max" },
    },
    false
  );

  assert.equal(result.reasoning_effort, "xhigh");
});

test("Claude -> OpenAI ignores disabled thinking and leaves reasoning_effort unset", () => {
  const result = claudeToOpenAIRequest(
    "gpt-5",
    {
      messages: [{ role: "user", content: "hi" }],
      thinking: { type: "enabled", budget_tokens: 0 },
    },
    false
  );

  assert.equal(result.reasoning_effort, undefined);
});

test("Claude -> OpenAI leaves reasoning_effort unset when no thinking/output_config present", () => {
  const result = claudeToOpenAIRequest(
    "gpt-5",
    { messages: [{ role: "user", content: "hi" }] },
    false
  );

  assert.equal(result.reasoning_effort, undefined);
});

test("Claude -> OpenAI handles redacted thinking, empty arrays and unknown blocks defensively", () => {
  const result = claudeToOpenAIRequest(
    "gpt-4o",
    {
      messages: [
        {
          role: "assistant",
          content: [{ type: "redacted_thinking", signature: "sig" }],
        },
        {
          role: "assistant",
          content: [],
        },
        {
          role: "assistant",
          content: [{ type: "unknown", value: 1 }],
        },
      ],
    },
    false
  );

  assert.deepEqual(result.messages[0], {
    role: "assistant",
    content: "",
    reasoning_content: "",
  });
  assert.deepEqual(result.messages[1], {
    role: "assistant",
    content: "",
  });
  assert.equal(result.messages.length, 2);
});
