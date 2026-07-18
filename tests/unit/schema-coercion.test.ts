import test from "node:test";
import assert from "node:assert";
import {
  coerceSchemaNumericFields,
  coerceToolSchemas,
  injectEmptyReasoningContentForToolCalls,
  injectOptionalEnumOmissionForTools,
  injectOptionalEnumOmissionSentinel,
  sanitizeToolDescription,
  sanitizeToolDescriptions,
} from "../../open-sse/translator/helpers/schemaCoercion.ts";

test("coerceSchemaNumericFields converts string numbers to actual numbers", () => {
  const schema = {
    type: "object",
    properties: {
      items: {
        type: "array",
        minItems: "1",
        maxItems: "2",
      },
    },
    minimum: "5",
  };

  const result = coerceSchemaNumericFields(schema);

  assert.strictEqual((result as any).minimum, 5);
  (assert as any).strictEqual((result as any).properties.items.minItems, 1);
  (assert as any).strictEqual((result as any).properties.items.maxItems, 2);
});

test("coerceSchemaNumericFields ignores non-numeric strings", () => {
  const schema = {
    minimum: "abc",
    maximum: "10.5",
  };

  const result = coerceSchemaNumericFields(schema);

  (assert as any).strictEqual((result as any).minimum, "abc");
  assert.strictEqual((result as any).maximum, 10.5);
});

test("coerceToolSchemas applies coercion to OpenAI tools", () => {
  const tools = [
    {
      type: "function",
      function: {
        name: "test",
        parameters: {
          properties: { val: { minLength: "2" } },
        },
      },
    },
  ];

  const result = coerceToolSchemas(tools);
  assert.strictEqual(result[0].function.parameters.properties.val.minLength, 2);
});

test("coerceToolSchemas applies coercion to Claude tools", () => {
  const tools = [
    {
      name: "test",
      input_schema: {
        properties: { val: { maxLength: "10" } },
      },
    },
  ];

  const result = coerceToolSchemas(tools);
  assert.strictEqual(result[0].input_schema.properties.val.maxLength, 10);
});

test("sanitizeToolDescription converts null to empty string (OpenAI format)", () => {
  const tool = {
    type: "function",
    function: { name: "test", description: null, parameters: {} },
  };
  const result = sanitizeToolDescription(tool);
  assert.equal((result as any).function.description, "");
});

test("sanitizeToolDescription converts number to string (OpenAI format)", () => {
  const tool = {
    type: "function",
    function: { name: "test", description: 42, parameters: {} },
  };
  const result = sanitizeToolDescription(tool);
  assert.equal((result as any).function.description, "42");
});

test("sanitizeToolDescription handles Claude format", () => {
  const tool = { name: "test", description: null, input_schema: {} };
  const result = sanitizeToolDescription(tool);
  assert.equal((result as any).description, "");
});

test("sanitizeToolDescription preserves valid string descriptions", () => {
  const tool = {
    type: "function",
    function: { name: "test", description: "A useful tool", parameters: {} },
  };
  const result = sanitizeToolDescription(tool);
  assert.equal((result as any).function.description, "A useful tool");
});

test("sanitizeToolDescriptions works on arrays", () => {
  const tools = [
    { name: "test1", description: null, input_schema: {} },
    { type: "function", function: { name: "test2", description: 42, parameters: {} } },
  ];
  const result = sanitizeToolDescriptions(tools);
  assert.strictEqual(result[0].description, "");
  assert.strictEqual(result[1].function.description, "42");
});

test("injectEmptyReasoningContentForToolCalls supports DeepSeek V4 models across providers", () => {
  const messages = [
    { role: "user", content: "hello" },
    { role: "assistant", tool_calls: [{ id: "call_1" }] },
  ];

  for (const provider of ["openrouter", "fireworks", "deepinfra"]) {
    const result = injectEmptyReasoningContentForToolCalls(
      messages,
      provider,
      "accounts/fireworks/models/deepseek-v4-pro"
    ) as Array<{ reasoning_content?: string }>;

    assert.equal(result[1].reasoning_content, "");
  }
});

test("injectEmptyReasoningContentForToolCalls supports Kimi K2 models", () => {
  const messages = [
    { role: "user", content: "hello" },
    { role: "assistant", tool_calls: [{ id: "call_1" }] },
  ];

  for (const model of ["kimi-k2", "kimi-k2.5", "kimi-k2.6", "kimi-k2-thinking"]) {
    const result = injectEmptyReasoningContentForToolCalls(messages, "moonshot", model) as Array<{
      reasoning_content?: string;
    }>;

    assert.equal(result[1].reasoning_content, "", `should inject reasoning_content for ${model}`);
  }
});

test("injectEmptyReasoningContentForToolCalls supports Kimi K2 via Qoder provider", () => {
  const messages = [
    { role: "user", content: "hello" },
    { role: "assistant", tool_calls: [{ id: "call_1" }] },
  ];

  const result = injectEmptyReasoningContentForToolCalls(
    messages,
    "qoder",
    "kimi-k2-thinking"
  ) as Array<{ reasoning_content?: string }>;

  assert.equal(result[1].reasoning_content, "");
});

test("injectEmptyReasoningContentForToolCalls supports all reasoning replay providers", () => {
  const messages = [
    { role: "user", content: "hello" },
    { role: "assistant", tool_calls: [{ id: "call_1" }] },
  ];

  const reasoningProviders = [
    { provider: "deepseek", model: "deepseek-chat" },
    { provider: "opencode-go", model: "some-model" },
    { provider: "nebius", model: "qwq-32b" },
    { provider: "sambanova", model: "qwen3-thinking" },
    { provider: "fireworks", model: "glm-5-thinking" },
    { provider: "together", model: "mimo-v2.5" },
    { provider: "xiaomi-mimo", model: "mimo-v2.5-pro" },
  ];

  for (const { provider, model } of reasoningProviders) {
    const result = injectEmptyReasoningContentForToolCalls(messages, provider, model) as Array<{
      reasoning_content?: string;
    }>;

    assert.equal(
      result[1].reasoning_content,
      "",
      `should inject reasoning_content for ${provider}/${model}`
    );
  }
});

test("injectEmptyReasoningContentForToolCalls skips non-reasoning models", () => {
  const messages = [{ role: "assistant", tool_calls: [{ id: "call_1" }] }];

  const nonReasoningModels = [
    { provider: "openai", model: "gpt-4" },
    { provider: "anthropic", model: "claude-sonnet-4" },
    { provider: "google", model: "gemini-pro" },
    { provider: "groq", model: "llama-3" },
    { provider: "siliconflow", model: "deepseek-r1" },
    { provider: "deepinfra", model: "deepseek-reasoner" },
  ];

  for (const { provider, model } of nonReasoningModels) {
    const result = injectEmptyReasoningContentForToolCalls(messages, provider, model) as Array<{
      reasoning_content?: string;
    }>;

    assert.equal(
      result[0].reasoning_content,
      undefined,
      `should NOT inject reasoning_content for ${provider}/${model}`
    );
  }
});

// #7023 — optional-enum null-omission sentinel
test("injectOptionalEnumOmissionSentinel: no-op on non-object schema", () => {
  assert.strictEqual(injectOptionalEnumOmissionSentinel(null), null);
  assert.strictEqual(injectOptionalEnumOmissionSentinel("not-a-schema"), "not-a-schema");
});

test("injectOptionalEnumOmissionSentinel: no-op when schema has no properties", () => {
  const schema = { type: "object" };
  assert.deepStrictEqual(injectOptionalEnumOmissionSentinel(schema), schema);
});

test("injectOptionalEnumOmissionSentinel: preserves an already-present null in enum without duplicating", () => {
  const schema = {
    type: "object",
    properties: { mode: { type: ["string", "null"], enum: ["a", "b", null] } },
    required: [],
  };
  const result = injectOptionalEnumOmissionSentinel(schema) as {
    properties: { mode: { enum: unknown[] } };
  };
  assert.deepStrictEqual(result.properties.mode.enum, ["a", "b", null]);
});

test("injectOptionalEnumOmissionForTools: non-array input passed through unchanged", () => {
  assert.strictEqual(injectOptionalEnumOmissionForTools(null), null);
  assert.strictEqual(injectOptionalEnumOmissionForTools(undefined), undefined);
});

test("injectOptionalEnumOmissionForTools: Chat Completions {function:{parameters}} shape is left untouched", () => {
  const tools = [
    {
      type: "function",
      function: {
        name: "Agent",
        parameters: {
          type: "object",
          properties: { isolation: { type: "string", enum: ["worktree", "remote"] } },
          required: [],
        },
      },
    },
  ];
  const result = injectOptionalEnumOmissionForTools(tools) as Array<{
    function: { parameters: { properties: { isolation: { enum: unknown[] } } } };
  }>;
  // Chat Completions shape (nested under `.function`) is out of scope for this
  // Responses-API-only injector — assert it is not mutated.
  assert.deepStrictEqual(
    result[0].function.parameters.properties.isolation.enum,
    ["worktree", "remote"]
  );
});
