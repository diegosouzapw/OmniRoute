import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");

function translate(body: Record<string, unknown>): Record<string, unknown> {
  return openaiResponsesToOpenAIRequest("gpt-5", body, false, null) as Record<string, unknown>;
}

test("Responses -> Chat preserves json_schema structured output", () => {
  const result = translate({
    input: "Return JSON",
    text: {
      format: {
        type: "json_schema",
        name: "answer",
        description: "Structured answer",
        schema: { type: "object", properties: { answer: { type: "string" } } },
        strict: true,
      },
    },
  });

  assert.deepEqual(result.response_format, {
    type: "json_schema",
    json_schema: {
      name: "answer",
      description: "Structured answer",
      schema: { type: "object", properties: { answer: { type: "string" } } },
      strict: true,
    },
  });
  assert.equal(result.text, undefined);
});

test("Responses -> Chat preserves json_object structured output", () => {
  const result = translate({ input: "Return JSON", text: { format: { type: "json_object" } } });

  assert.deepEqual(result.response_format, { type: "json_object" });
  assert.equal(result.text, undefined);
});

test("Responses -> Chat restricts tools selected by allowed_tools", () => {
  const result = translate({
    input: "Use one tool",
    tools: [
      { type: "function", name: "keep", parameters: { type: "object" } },
      { type: "function", name: "remove", parameters: { type: "object" } },
    ],
    tool_choice: {
      type: "allowed_tools",
      mode: "required",
      tools: [{ type: "function", name: "keep" }],
    },
  });

  assert.equal(result.tool_choice, "required");
  assert.deepEqual(
    (result.tools as Array<{ function: { name: string } }>).map((tool) => tool.function.name),
    ["keep"]
  );
});

test("Responses -> Chat resolves allowed_tools against flattened namespace tools", () => {
  const result = translate({
    input: "Use a namespaced tool",
    tools: [
      {
        type: "namespace",
        name: "server",
        tools: [{ name: "mcp__server__read", parameters: { type: "object" } }],
      },
    ],
    tool_choice: {
      type: "allowed_tools",
      mode: "auto",
      tools: [{ type: "function", name: "mcp__server__read" }],
    },
  });

  assert.equal(result.tool_choice, "auto");
  assert.equal(
    (result.tools as Array<{ function: { name: string } }>)[0].function.name,
    "mcp__server__read"
  );
});

test("Responses -> Chat rejects malformed or unavailable allowed_tools", () => {
  assert.throws(
    () =>
      translate({
        input: "Use a tool",
        tools: [{ type: "function", name: "available", parameters: { type: "object" } }],
        tool_choice: {
          type: "allowed_tools",
          mode: "required",
          tools: [{ type: "function", name: "missing" }],
        },
      }),
    (error: unknown) =>
      error instanceof Error &&
      (error as Error & { errorType?: string }).errorType === "unsupported_feature"
  );

  assert.throws(
    () =>
      translate({
        input: "Use a tool",
        tools: [{ type: "function", name: "available", parameters: { type: "object" } }],
        tool_choice: {
          type: "allowed_tools",
          mode: "required",
          tools: [{ type: "web_search", name: "available" }],
        },
      }),
    (error: unknown) =>
      error instanceof Error &&
      (error as Error & { errorType?: string }).errorType === "unsupported_feature"
  );
});

test("Responses -> Chat rejects input item types without a lossless Chat equivalent", () => {
  for (const item of [
    { type: "item_reference", id: "item_123" },
    { type: "computer_call_output", call_id: "call_1", output: {} },
    { type: "mcp_call", name: "remote", arguments: "{}" },
    { type: "web_search_call", id: "search_1" },
    { unexpected: true },
  ]) {
    assert.throws(
      () => translate({ input: [item] }),
      (error: unknown) =>
        error instanceof Error &&
        (error as Error & { errorType?: string }).errorType === "unsupported_feature" &&
        error.message.includes("input item type")
    );
  }
});

test("Responses -> Chat consumes additional_tools input items without emitting messages", () => {
  const result = translate({
    input: [
      { type: "message", role: "user", content: [{ type: "input_text", text: "Use it" }] },
      {
        type: "additional_tools",
        tools: [{ type: "function", name: "extra", parameters: { type: "object" } }],
      },
    ],
  });

  assert.equal((result.messages as unknown[]).length, 1);
  assert.equal((result.tools as Array<{ function: { name: string } }>)[0].function.name, "extra");
});

test("Responses -> Chat converts refusal history to valid Chat text content", () => {
  const result = translate({
    input: [
      {
        type: "message",
        role: "assistant",
        content: [{ type: "refusal", refusal: "I cannot help with that." }],
      },
    ],
  });

  assert.deepEqual(result.messages, [
    {
      role: "assistant",
      content: [{ type: "text", text: "I cannot help with that." }],
    },
  ]);
});

test("Responses -> Chat strips Responses-only execution and cache fields", () => {
  const result = translate({
    input: "Hello",
    max_tool_calls: 3,
    conversation: "conv_123",
    prompt_cache_options: { retention: "24h" },
    prompt_cache_retention: "24h",
    metadata: { keep: true },
    parallel_tool_calls: true,
  });

  assert.equal(result.max_tool_calls, undefined);
  assert.equal(result.conversation, undefined);
  assert.equal(result.prompt_cache_options, undefined);
  assert.equal(result.prompt_cache_retention, undefined);
  assert.deepEqual(result.metadata, { keep: true });
  assert.equal(result.parallel_tool_calls, true);
});
