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
