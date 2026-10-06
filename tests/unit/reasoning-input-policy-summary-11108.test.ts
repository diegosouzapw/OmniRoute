import { test } from "node:test";
import assert from "node:assert/strict";

const { applyReasoningInputPolicy } =
  await import("../../open-sse/services/reasoningInputPolicy.ts");

test("#11108 applyReasoningInputPolicy defaults summary on a kept opaque reasoning item", () => {
  const body: Record<string, unknown> = {
    input: [
      {
        type: "reasoning",
        id: "rs_example",
        encrypted_content: "opaque-blob",
      },
    ],
  };

  applyReasoningInputPolicy(body, "responses", {
    provider: "opencode",
    preserveEncryptedReasoning: true,
  });

  const input = body.input as Record<string, unknown>[];
  assert.equal(input.length, 1);
  assert.deepEqual(input[0].summary, []);
});

test("#11108 applyReasoningInputPolicy preserves an existing summary on a kept reasoning item", () => {
  const body: Record<string, unknown> = {
    input: [
      {
        type: "reasoning",
        id: "rs_example",
        encrypted_content: "opaque-blob",
        summary: [{ type: "summary_text", text: "Planning." }],
      },
    ],
  };

  applyReasoningInputPolicy(body, "responses", {
    provider: "opencode",
    preserveEncryptedReasoning: true,
  });

  const input = body.input as Record<string, unknown>[];
  assert.deepEqual(input[0].summary, [{ type: "summary_text", text: "Planning." }]);
});

test("#11108 applyReasoningInputPolicy defaults summary on an opaque item surviving incompatible-drop", () => {
  // Mixed item (plaintext + opaque) on an opaque-only transport is incompatible;
  // dropIncompatibleResponsesReasoning() strips the plaintext content but keeps
  // the opaque item alive — it must still get a default `summary`.
  const body: Record<string, unknown> = {
    input: [
      {
        type: "reasoning",
        id: "rs_mixed",
        content: [{ type: "reasoning_text", text: "inspect first" }],
        encrypted_content: "opaque-blob",
      },
    ],
  };

  const result = applyReasoningInputPolicy(body, "responses", {
    provider: "codex",
    onIncompatibleReasoning: "drop",
  });

  assert.equal(result.incompatibleReasoning, false);
  const input = body.input as Record<string, unknown>[];
  assert.equal(input.length, 1);
  assert.equal(input[0].content, undefined);
  assert.equal(input[0].encrypted_content, "opaque-blob");
  assert.deepEqual(input[0].summary, []);
});

test("#11108 applyReasoningInputPolicy strips a non-string id on a kept opaque reasoning item", () => {
  // Same gap class as the summary fix above: opencode/zen also omits `id`
  // entirely (surfaced by the client as `id: null`) on opaque-only reasoning
  // items instead of a `rs_...` string. Replaying that shape verbatim trips
  // strict Responses-API validators with "Expected 'id' to be a string."
  const body: Record<string, unknown> = {
    input: [
      {
        type: "reasoning",
        id: null,
        encrypted_content: "opaque-blob",
      },
    ],
  };

  applyReasoningInputPolicy(body, "responses", {
    provider: "opencode",
    preserveEncryptedReasoning: true,
  });

  const input = body.input as Record<string, unknown>[];
  assert.equal(input.length, 1);
  assert.equal("id" in input[0], false);
});

test("#11108 applyReasoningInputPolicy strips a non-string id on a non-reasoning item (function_call)", () => {
  // Same gap class, generic branch: any non-"reasoning" input item (function_call,
  // message, ...) only stripped `id` when it was already a valid string, so a
  // malformed `id` (e.g. `null`, mirroring the opencode/zen omission pattern)
  // on a function_call item survived replay untouched.
  const body: Record<string, unknown> = {
    input: [
      {
        type: "function_call",
        id: null,
        call_id: "call_abc",
        name: "bash",
        arguments: "{}",
      },
    ],
  };

  applyReasoningInputPolicy(body, "responses", { provider: "opencode" });

  const input = body.input as Record<string, unknown>[];
  assert.equal(input.length, 1);
  assert.equal("id" in input[0], false);
  assert.equal(input[0].call_id, "call_abc");
});

test("#11108 applyReasoningInputPolicy preserves a valid string id on a kept opaque reasoning item", () => {
  const body: Record<string, unknown> = {
    input: [
      {
        type: "reasoning",
        id: "rs_example",
        encrypted_content: "opaque-blob",
      },
    ],
  };

  applyReasoningInputPolicy(body, "responses", {
    provider: "opencode",
    preserveEncryptedReasoning: true,
  });

  const input = body.input as Record<string, unknown>[];
  assert.equal(input[0].id, "rs_example");
});
