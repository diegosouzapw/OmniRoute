import test from "node:test";
import assert from "node:assert/strict";

const { sanitizeResponsesApiResponse } =
  await import("../../open-sse/handlers/responseSanitizer.ts");

function asRecord(value: unknown): Record<string, unknown> {
  assert.ok(value !== null && typeof value === "object" && !Array.isArray(value));
  return value as Record<string, unknown>;
}

test("sanitizeResponsesApiResponse preserves a Responses message phase", () => {
  const sanitized = asRecord(
    sanitizeResponsesApiResponse({
      object: "response",
      status: "completed",
      output: [
        {
          id: "msg_1",
          type: "message",
          role: "assistant",
          phase: "commentary",
          content: [{ type: "output_text", text: "Hello", annotations: [] }],
        },
      ],
    })
  );
  const output = sanitized.output;
  assert.ok(Array.isArray(output));
  assert.equal(asRecord(output[0]).phase, "commentary");
});
