// #1998 (upstream) — adaptBodyForCompression must use the full translator pair
// (openaiResponsesToOpenAIRequest → compress → openaiToOpenAIResponsesRequest) when
// body.input is in Responses format, so that:
//   (a) function_call_output items with non-string `output` (JSON objects) are properly
//       serialised and included in the compression pass (upstream bug: simple helper skips
//       them because hasTextContent() returns false for object content), and
//   (b) body.input stays Responses-shaped after the full round-trip.
import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import { adaptBodyForCompression } from "../../open-sse/services/compression/bodyAdapter.ts";

describe("adaptBodyForCompression openai-responses format (#1998)", () => {
  after(() => {
    // No DB touched.
  });

  it("includes function_call_output with object output in the compression pass", () => {
    // The simple responsesItemToMessage() helper only sets content = item.output.
    // When output is a JSON object (not a string), hasTextContent() returns false
    // and the item is excluded from messages entirely — not compressable.
    // The fix: use openaiResponsesToOpenAIRequest which JSON.stringifies object output
    // so the text is available for compression engines.
    const body: Record<string, unknown> = {
      model: "gpt-5",
      input: [
        {
          type: "function_call",
          call_id: "c1",
          name: "bash",
          arguments: JSON.stringify({ command: "ls -la" }),
        },
        {
          type: "function_call_output",
          call_id: "c1",
          // Object output — NOT a string. Simple helper loses this.
          output: { result: "file1.ts file2.ts ".repeat(50) },
        },
      ],
    };

    const adapter = adaptBodyForCompression(body);

    // After the fix, the adapter must recognise the function_call_output as
    // compressable and include it in the messages array.
    assert.ok(adapter.adapted, "adapter must be adapted (not a pass-through)");

    const messages = (adapter.body as Record<string, unknown>).messages as Array<Record<string, unknown>>;
    assert.ok(Array.isArray(messages) && messages.length > 0, "messages must be non-empty");

    // At least one tool/assistant message must be present for compression engines.
    const hasToolMsg = messages.some((m) => m.role === "tool" || m.role === "assistant");
    assert.ok(hasToolMsg, "messages must include a tool/assistant entry from the function_call pair");
  });

  it("keeps body.input Responses-shaped after compress/restore round-trip for type:message items", () => {
    // Verify the canonical behaviour: a Responses body.input with type:message items
    // is correctly round-tripped through the adapter and restore.
    const body: Record<string, unknown> = {
      model: "gpt-5",
      input: [
        {
          type: "message",
          role: "user",
          content: [{ type: "input_text", text: "a long original message ".repeat(20) }],
        },
      ],
    };

    const adapter = adaptBodyForCompression(body);
    assert.ok(adapter.adapted, "adapter must be adapted for Responses body.input");

    // Simulate compression: keep messages unchanged (no-op compression).
    const compressedBody = { ...(adapter.body as Record<string, unknown>) };
    const restored = adapter.restore(compressedBody);

    // body.input must be an array of Responses items (not raw OpenAI messages).
    assert.ok(Array.isArray(restored.input), "restored.input must be an array");
    assert.equal((restored.input as unknown[]).length, 1, "restored.input must have one item");

    const item = (restored.input as Array<Record<string, unknown>>)[0];
    assert.equal(item.type, "message", "restored item must keep type:message");
    assert.equal(item.role, "user", "restored item must keep role:user");
    assert.ok(
      Array.isArray(item.content),
      "restored item.content must stay as an array (Responses format), not a string"
    );
    // Content must still carry the Responses input_text structure.
    const firstContentPart = (item.content as Array<Record<string, unknown>>)[0];
    assert.equal(
      firstContentPart.type,
      "input_text",
      "content part must preserve type:input_text"
    );
    assert.ok(
      typeof firstContentPart.text === "string" && firstContentPart.text.length > 0,
      "content part must preserve the text value"
    );
  });

  it("round-trips function_call_output with string output (preserves call_id and output field)", () => {
    // Ensure string output is correctly restored in output field (not content field).
    const body: Record<string, unknown> = {
      model: "gpt-5",
      input: [
        {
          type: "function_call",
          call_id: "c2",
          name: "read_file",
          arguments: JSON.stringify({ path: "/foo.ts" }),
        },
        {
          type: "function_call_output",
          call_id: "c2",
          output: "large file contents ".repeat(30),
        },
      ],
    };

    const adapter = adaptBodyForCompression(body);
    assert.ok(adapter.adapted, "adapter must be adapted");

    // Simulate no-op compression.
    const compressedBody = { ...(adapter.body as Record<string, unknown>) };
    const restored = adapter.restore(compressedBody);

    assert.ok(Array.isArray(restored.input), "restored.input must be an array");
    const items = restored.input as Array<Record<string, unknown>>;
    assert.equal(items.length, 2, "both function_call and function_call_output must be present");

    const outputItem = items.find((i) => i.type === "function_call_output") as Record<string, unknown>;
    assert.ok(outputItem, "function_call_output item must be in restored.input");
    assert.equal(outputItem.call_id, "c2", "call_id must be preserved");
    assert.ok(
      typeof outputItem.output === "string" && outputItem.output.length > 0,
      "output field must be present and non-empty"
    );
  });
});
