import test from "node:test";
import assert from "node:assert";
import {
  coerceSchemaNumericFields,
  coerceToolSchemas,
  injectEmptyReasoningContentForToolCalls,
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

test("injectEmptyReasoningContentForToolCalls skips non-DeepSeek V4 models", () => {
  const messages = [{ role: "assistant", tool_calls: [{ id: "call_1" }] }];

  const result = injectEmptyReasoningContentForToolCalls(
    messages,
    "deepseek",
    "deepseek-reasoner"
  ) as Array<{ reasoning_content?: string }>;

  assert.equal(result[0].reasoning_content, undefined);
});
