import test from "node:test";
import assert from "node:assert/strict";

import { applyReasoningInputPolicy } from "../../open-sse/services/reasoningInputPolicy.ts";
import { filterToOpenAIFormat } from "../../open-sse/translator/helpers/openaiHelper.ts";
import { omitEncryptedReasoningForLog } from "../../src/lib/logPayloads.ts";

// Responses reasoning replay is target-scoped. Plaintext DeepSeek state and
// provider-generated opaque state are never interchangeable.

test("unknown Responses targets drop opaque reasoning and preserve display summaries (#10959)", () => {
  const body: Record<string, unknown> = {
    input: [
      { type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] },
      { id: "rs_abc123", type: "reasoning", summary: [{ text: "display only" }] },
      { type: "reasoning", encrypted_content: "blob" },
      {
        type: "function_call",
        id: "fc_xyz789",
        name: "search",
        arguments: "{}",
        call_id: "call_1",
      },
    ],
  };

  const result = applyReasoningInputPolicy(body, "responses");

  assert.equal(result.incompatibleReasoning, false);
  assert.deepEqual(body.input, [
    { type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] },
    { type: "reasoning", summary: [{ text: "display only" }] },
    { type: "function_call", name: "search", arguments: "{}", call_id: "call_1" },
  ]);
});

test("unannotated targets preserve plaintext Responses reasoning without synthetic IDs", () => {
  const body: Record<string, unknown> = {
    input: [
      {
        id: "rs_plaintext123",
        type: "reasoning",
        content: [{ type: "reasoning_text", text: "inspect first" }],
      },
      { type: "message", role: "user", content: [{ type: "input_text", text: "continue" }] },
    ],
  };

  const result = applyReasoningInputPolicy(body, "responses", { provider: "opencode-go" });

  assert.equal(result.incompatibleReasoning, false);
  assert.deepEqual(body.input, [
    {
      type: "reasoning",
      content: [{ type: "reasoning_text", text: "inspect first" }],
    },
    { type: "message", role: "user", content: [{ type: "input_text", text: "continue" }] },
  ]);
});

test("display summaries coexist with plaintext continuation without affecting compatibility", () => {
  const body: Record<string, unknown> = {
    input: [
      {
        id: "rs_plaintext_summary",
        type: "reasoning",
        content: [{ type: "reasoning_text", text: "inspect first" }],
        summary: [{ type: "summary_text", text: "display only" }],
      },
    ],
  };

  const result = applyReasoningInputPolicy(body, "responses", { provider: "opencode-go" });

  assert.equal(result.incompatibleReasoning, false);
  assert.deepEqual(body.input, [
    {
      type: "reasoning",
      content: [{ type: "reasoning_text", text: "inspect first" }],
      summary: [{ type: "summary_text", text: "display only" }],
    },
  ]);
});

test("unannotated targets preserve Chat plaintext and ignore display summaries", () => {
  const body: Record<string, unknown> = {
    messages: [
      {
        role: "assistant",
        content: null,
        reasoning_content: "inspect first",
        summary_text: "display only",
      },
      { role: "user", content: "continue" },
    ],
  };
  const originalMessages = body.messages;

  const result = applyReasoningInputPolicy(body, "chat", { provider: "opencode-go" });

  assert.equal(result.incompatibleReasoning, false);
  assert.equal(body.messages, originalMessages, "compatible Chat history should not be cloned");
});

test("Chat drop removes opaque state while preserving plaintext and summary details", () => {
  const body: Record<string, unknown> = {
    messages: [
      {
        role: "assistant",
        content: null,
        reasoning_content: "inspect first",
        reasoning_details: [
          { type: "reasoning.encrypted", data: "provider-state" },
          { type: "reasoning.summary", text: "display only" },
        ],
      },
      { role: "user", content: "continue" },
    ],
  };

  const result = applyReasoningInputPolicy(body, "chat", {
    provider: "opencode-go",
    onIncompatibleReasoning: "drop",
  });

  assert.equal(result.incompatibleReasoning, false);
  assert.deepEqual(body.messages, [
    {
      role: "assistant",
      content: null,
      reasoning_content: "inspect first",
      reasoning_details: [{ type: "reasoning.summary", text: "display only" }],
    },
    { role: "user", content: "continue" },
  ]);
});

test("DeepSeek projects plaintext reasoning carrying opaque provider state onto the plaintext transport (#10949)", () => {
  for (const opaqueField of ["signature", "format"] as const) {
    const body: Record<string, unknown> = {
      input: [
        {
          id: "rs_mixed123",
          type: "reasoning",
          content: [{ type: "reasoning_text", text: "untrusted companion" }],
          [opaqueField]: "provider-state",
        },
        { type: "message", role: "user", content: [{ type: "input_text", text: "continue" }] },
      ],
    };

    const result = applyReasoningInputPolicy(body, "responses", { provider: "deepseek" });

    assert.equal(result.incompatibleReasoning, false, opaqueField);
    assert.deepEqual(body.input, [
      {
        type: "reasoning",
        content: [{ type: "reasoning_text", text: "untrusted companion" }],
      },
      { type: "message", role: "user", content: [{ type: "input_text", text: "continue" }] },
    ]);
  }
});

test("drop fallback removes only the incompatible active transport and preserves summaries", () => {
  const plaintextReasoning = {
    id: "rs_plaintext",
    type: "reasoning",
    content: [{ type: "reasoning_text", text: "inspect first" }],
  };
  const opaqueReasoning = {
    id: "rs_opaque",
    type: "reasoning",
    encrypted_content: "provider-state",
    summary: [{ type: "summary_text", text: "display only" }],
  };
  const body: Record<string, unknown> = {
    input: [
      plaintextReasoning,
      opaqueReasoning,
      { id: "fc_call", type: "function_call", call_id: "call_1", name: "search" },
    ],
  };

  const result = applyReasoningInputPolicy(body, "responses", {
    provider: "deepseek",
    onIncompatibleReasoning: "drop",
  });

  assert.equal(result.incompatibleReasoning, false);
  assert.deepEqual(body.input, [
    {
      type: "reasoning",
      content: [{ type: "reasoning_text", text: "inspect first" }],
    },
    { type: "reasoning", summary: [{ type: "summary_text", text: "display only" }] },
    { type: "function_call", call_id: "call_1", name: "search" },
  ]);
  assert.equal(plaintextReasoning.id, "rs_plaintext");
  assert.equal(opaqueReasoning.encrypted_content, "provider-state");
});

test("mixed plaintext + opaque reasoning follows the target transport instead of rejecting (#10949)", () => {
  const mixedReasoning = {
    id: "rs_mixed",
    type: "reasoning",
    content: [{ type: "reasoning_text", text: "inspect first" }],
    encrypted_content: "provider-state",
    summary: [{ type: "summary_text", text: "display only" }],
  };

  // Plaintext target (deepseek): keep the portable plaintext, strip opaque state.
  const toPlaintext: Record<string, unknown> = {
    input: [structuredClone(mixedReasoning)],
  };
  const plaintextResult = applyReasoningInputPolicy(toPlaintext, "responses", {
    provider: "deepseek",
  });
  assert.equal(plaintextResult.incompatibleReasoning, false);
  assert.deepEqual(toPlaintext.input, [
    {
      type: "reasoning",
      content: [{ type: "reasoning_text", text: "inspect first" }],
      summary: [{ type: "summary_text", text: "display only" }],
    },
  ]);

  // Opaque target (openai): keep the provider state, strip the plaintext.
  const toOpaque: Record<string, unknown> = {
    input: [structuredClone(mixedReasoning)],
  };
  const opaqueResult = applyReasoningInputPolicy(toOpaque, "responses", {
    provider: "openai",
  });
  assert.equal(opaqueResult.incompatibleReasoning, false);
  assert.deepEqual(toOpaque.input, [
    {
      id: "rs_mixed",
      type: "reasoning",
      encrypted_content: "provider-state",
      summary: [{ type: "summary_text", text: "display only" }],
    },
  ]);
});

test("drop fallback preserves reasoning when its transport is compatible", () => {
  const body: Record<string, unknown> = {
    input: [
      {
        id: "rs_plaintext",
        type: "reasoning",
        content: [{ type: "reasoning_text", text: "inspect first" }],
      },
    ],
  };

  const result = applyReasoningInputPolicy(body, "responses", {
    provider: "deepseek",
    onIncompatibleReasoning: "drop",
  });

  assert.equal(result.incompatibleReasoning, false);
  assert.deepEqual(body.input, [
    {
      type: "reasoning",
      content: [{ type: "reasoning_text", text: "inspect first" }],
    },
  ]);
});

test("known opaque targets preserve a cloned complete provider-generated reasoning item", () => {
  const opaqueReasoning = {
    id: "rs_encrypted123",
    type: "reasoning",
    encrypted_content: "encrypted-blob",
    summary: [{ type: "summary_text", text: "safe summary" }],
    status: "completed",
  };
  const body: Record<string, unknown> = {
    input: [
      opaqueReasoning,
      "rs_stored123",
      { type: "item_reference", id: "resp_stored123" },
      "ws_stored123",
      { type: "web_search_call", id: "ws_stored123", status: "completed" },
      { type: "image_generation_call", id: "ig_stored123", status: "completed" },
      { type: "function_call", id: "fc_stored123", call_id: "call_1" },
    ],
  };

  const result = applyReasoningInputPolicy(body, "responses", { provider: "openai" });
  assert.notEqual(
    (body.input as Array<Record<string, unknown>>)[0],
    opaqueReasoning,
    "policy output must not expose the caller's nested item object"
  );

  assert.equal(result.incompatibleReasoning, false);
  assert.deepEqual(body.input, [
    {
      id: "rs_encrypted123",
      type: "reasoning",
      encrypted_content: "encrypted-blob",
      summary: [{ type: "summary_text", text: "safe summary" }],
      status: "completed",
    },
    { type: "web_search_call", status: "completed" },
    { type: "image_generation_call", status: "completed" },
    { type: "function_call", call_id: "call_1" },
  ]);
});

test("explicit custom target opt-in remains an opaque transport override", () => {
  const body: Record<string, unknown> = {
    input: [{ type: "reasoning", encrypted_content: "encrypted-blob" }],
  };

  const result = applyReasoningInputPolicy(body, "responses", { preserveEncryptedReasoning: true });

  assert.equal(result.incompatibleReasoning, false);
  // #11108: a kept opaque item defaults `summary` when the source omitted it —
  // some upstreams reject `input[]` reasoning items missing the field entirely.
  assert.deepEqual(body.input, [
    { type: "reasoning", encrypted_content: "encrypted-blob", summary: [] },
  ]);
});

test("preserved opaque reasoning remains redacted from log copies", () => {
  const body = {
    input: [{ type: "reasoning", encrypted_content: "provider-secret-blob" }],
  };

  applyReasoningInputPolicy(body, "responses", { provider: "xai" });
  const logged = omitEncryptedReasoningForLog(body) as typeof body;

  assert.equal(body.input[0].encrypted_content, "provider-secret-blob");
  assert.equal(logged.input[0].encrypted_content, "[omitted: encrypted reasoning, 20 chars]");
});

test("summary-only reasoning is preserved independently of active transport", () => {
  const body: Record<string, unknown> = {
    input: [
      { id: "rs_summary123", type: "reasoning", summary: [{ text: "thinking..." }] },
      { type: "reasoning", encrypted_content: "" },
      { type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] },
    ],
  };

  const result = applyReasoningInputPolicy(body, "responses", { provider: "openai" });

  assert.equal(result.incompatibleReasoning, false);
  assert.deepEqual(body.input, [
    { type: "reasoning", summary: [{ text: "thinking..." }] },
    { type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] },
  ]);
});

test("stateless Responses input drops orphan summaries but preserves active state", () => {
  const activeReasoning = {
    type: "reasoning",
    encrypted_content: "provider-state",
    summary: [{ type: "summary_text", text: "Display summary" }],
  };
  const message = {
    type: "message",
    role: "user",
    content: [{ type: "input_text", text: "continue" }],
  };
  const body: Record<string, unknown> = {
    store: false,
    input: [
      { type: "reasoning", summary: [{ type: "summary_text", text: "Orphan summary" }] },
      activeReasoning,
      message,
    ],
  };

  const result = applyReasoningInputPolicy(body, "responses", { provider: "codex" });

  assert.equal(result.incompatibleReasoning, false);
  assert.deepEqual(body.input, [activeReasoning, message]);
});

test("filterToOpenAIFormat strips reasoning_content from assistant+tool_calls messages", () => {
  const body = {
    messages: [
      {
        role: "assistant",
        reasoning_content: "long chain of thought that inflates context",
        tool_calls: [{ id: "call_1", type: "function", function: { name: "f", arguments: "{}" } }],
      },
    ],
  };

  const result = filterToOpenAIFormat(body) as { messages: Array<Record<string, unknown>> };
  const msg = result.messages[0];

  assert.equal(msg.reasoning_content, undefined, "reasoning_content must be dropped");
  assert.ok(Array.isArray(msg.tool_calls), "tool_calls preserved");
  assert.equal((msg.tool_calls as unknown[]).length, 1);
  assert.equal(msg.role, "assistant");
});

test("filterToOpenAIFormat keeps assistant+tool_calls untouched when no reasoning_content", () => {
  const body = {
    messages: [
      {
        role: "assistant",
        content: null,
        tool_calls: [{ id: "call_1", type: "function", function: { name: "f", arguments: "{}" } }],
      },
    ],
  };

  const result = filterToOpenAIFormat(body) as { messages: Array<Record<string, unknown>> };
  assert.deepEqual(result.messages[0], body.messages[0]);
});
