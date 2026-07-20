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
