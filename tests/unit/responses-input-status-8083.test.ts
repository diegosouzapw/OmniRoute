import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { sanitizeResponsesInputItems } from "../../open-sse/services/responsesInputSanitizer.ts";

describe("#8083 — sanitizeResponsesInputItems injects status on message items", () => {
  it("injects status='completed' on assistant message without status", () => {
    const items = [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "Hello" }],
      },
      {
        type: "message",
        role: "assistant",
        content: [{ type: "output_text", text: "Hi there" }],
      },
    ];

    const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;

    assert.equal(result[0]!.status, "completed", "user message should get status=completed");
    assert.equal(result[1]!.status, "completed", "assistant message should get status=completed");
  });

  it("preserves existing status if already present", () => {
    const items = [
      {
        type: "message",
        role: "user",
        status: "in_progress",
        content: [{ type: "input_text", text: "Hello" }],
      },
    ];

    const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;

    assert.equal(result[0]!.status, "in_progress", "should NOT overwrite existing status");
  });

  it("does not inject status on non-message items (function_call, reasoning, etc.)", () => {
    const items = [
      {
        type: "function_call",
        name: "get_weather",
        arguments: '{"city":"SF"}',
        call_id: "call_abc123",
      },
      {
        type: "function_call_output",
        call_id: "call_abc123",
        output: '{"temp":72}',
      },
      {
        type: "reasoning",
        summary: [{ type: "summary_text", text: "Thinking..." }],
      },
    ];

    const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;

    assert.equal(result[0]!.status, undefined, "function_call should NOT get status");
    assert.equal(result[1]!.status, undefined, "function_call_output should NOT get status");
    assert.equal(result[2]!.status, undefined, "reasoning should NOT get status");
  });

  it("injects status on message items with implicit type (role-only)", () => {
    const items = [
      {
        role: "user",
        content: [{ type: "input_text", text: "Hello" }],
      },
    ];

    const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;

    assert.equal(result[0]!.status, "completed", "role-only message should get status=completed");
  });

  it("injects status on all items in a long multi-turn conversation", () => {
    // Simulate a long session where previous_response_id was stripped
    const items = Array.from({ length: 20 }, (_, i) => ({
      type: "message",
      role: i % 2 === 0 ? "user" : "assistant",
      content: [
        {
          type: i % 2 === 0 ? "input_text" : "output_text",
          text: `Message ${i}`,
        },
      ],
    }));

    const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;

    for (let i = 0; i < result.length; i++) {
      assert.equal(
        result[i]!.status,
        "completed",
        `item ${i} (${i % 2 === 0 ? "user" : "assistant"}) should have status=completed`
      );
    }
  });
});
