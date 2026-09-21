import test from "node:test";
import assert from "node:assert/strict";

// Pure guard predicates of the native Codex auto-resume path (#13180). Split out of
// tests/unit/native-codex-auto-resume.test.ts (which exercises the full combo flow
// against a scratch DB) so each file stays under the 1200-line test cap; these three
// cases need no DB, no combo config and no fixtures.
const {
  hasUnresolvedToolCalls,
  hasProviderSpecificUnsafeContinuationState,
  MAX_AUTORESUMES_PER_TURN,
} = await import("../../open-sse/services/combo/nativeCodexTurnPin.ts");

test("MAX_AUTORESUMES_PER_TURN constant is 1", () => {
  assert.equal(MAX_AUTORESUMES_PER_TURN, 1);
});

test("hasUnresolvedToolCalls correctly validates 1:1 call-output pairs and rejects duplicates/orphans/nested", () => {
  // Empty input: no tool calls
  assert.equal(hasUnresolvedToolCalls({}), false);
  assert.equal(hasUnresolvedToolCalls({ input: [] }), false);

  // Nested output array with unresolved tool_use is unsafe (true)
  assert.equal(
    hasUnresolvedToolCalls({
      input: [
        {
          type: "function_call_output",
          call_id: "c1",
          output: [{ type: "tool_use", id: "tu-nested", name: "bash" }],
        },
      ],
    }),
    true
  );

  // Two calls with same call_id and two outputs with same call_id (count=2 != 1) is unsafe (true)
  assert.equal(
    hasUnresolvedToolCalls({
      input: [
        { type: "function_call", call_id: "c-dup2", name: "cat", arguments: "{}" },
        { type: "function_call", call_id: "c-dup2", name: "cat", arguments: "{}" },
        { type: "function_call_output", call_id: "c-dup2", output: "out1" },
        { type: "function_call_output", call_id: "c-dup2", output: "out2" },
      ],
    }),
    true
  );

  // Two distinct calls with two distinct matching outputs is safe (false)
  assert.equal(
    hasUnresolvedToolCalls({
      input: [
        { type: "function_call", call_id: "c-1", name: "cat", arguments: "{}" },
        { type: "function_call", call_id: "c-2", name: "ls", arguments: "{}" },
        { type: "function_call_output", call_id: "c-1", output: "out1" },
        { type: "function_call_output", call_id: "c-2", output: "out2" },
      ],
    }),
    false
  );

  // Resolved function call (1 call, 1 matching output)
  assert.equal(
    hasUnresolvedToolCalls({
      input: [
        { type: "message", role: "user", content: "read file" },
        { type: "function_call", call_id: "call-1", name: "cat", arguments: "{}" },
        { type: "function_call_output", call_id: "call-1", output: "hello world" },
      ],
    }),
    false
  );

  // Unresolved function call (call with no output)
  assert.equal(
    hasUnresolvedToolCalls({
      input: [
        { type: "message", role: "user", content: "read file" },
        { type: "function_call", call_id: "call-1", name: "cat", arguments: "{}" },
      ],
    }),
    true
  );

  // Resolved custom tool call
  assert.equal(
    hasUnresolvedToolCalls({
      input: [
        { type: "message", role: "user", content: "patch file" },
        { type: "custom_tool_call", call_id: "call-2", name: "apply_patch", input: "diff" },
        { type: "custom_tool_call_output", call_id: "call-2", output: "ok" },
      ],
    }),
    false
  );

  // Unresolved custom tool call
  assert.equal(
    hasUnresolvedToolCalls({
      input: [
        { type: "message", role: "user", content: "patch file" },
        { type: "custom_tool_call", call_id: "call-2", name: "apply_patch", input: "diff" },
      ],
    }),
    true
  );

  // Anthropic tool_use and tool_result in content array (resolved)
  assert.equal(
    hasUnresolvedToolCalls({
      messages: [
        {
          role: "assistant",
          content: [{ type: "tool_use", id: "tu-1", name: "bash", input: {} }],
        },
        {
          role: "user",
          content: [{ type: "tool_result", tool_use_id: "tu-1", content: "done" }],
        },
      ],
    }),
    false
  );

  // Anthropic tool_use in content array (unresolved)
  assert.equal(
    hasUnresolvedToolCalls({
      messages: [
        {
          role: "assistant",
          content: [{ type: "tool_use", id: "tu-1", name: "bash", input: {} }],
        },
      ],
    }),
    true
  );

  // Assistant message tool_calls format (resolved)
  assert.equal(
    hasUnresolvedToolCalls({
      input: [
        {
          type: "message",
          role: "assistant",
          tool_calls: [{ id: "call-3", type: "function", function: { name: "shell" } }],
        },
        { type: "message", role: "tool", tool_call_id: "call-3", content: "done" },
      ],
    }),
    false
  );

  // Assistant message tool_calls format (unresolved)
  assert.equal(
    hasUnresolvedToolCalls({
      input: [
        {
          type: "message",
          role: "assistant",
          tool_calls: [{ id: "call-3", type: "function", function: { name: "shell" } }],
        },
      ],
    }),
    true
  );

  // Duplicate tool call ID: two calls with same ID, one output -> unsafe (true)
  assert.equal(
    hasUnresolvedToolCalls({
      input: [
        { type: "function_call", call_id: "call-dup", name: "cat", arguments: "{}" },
        { type: "function_call", call_id: "call-dup", name: "cat", arguments: "{}" },
        { type: "function_call_output", call_id: "call-dup", output: "res" },
      ],
    }),
    true
  );

  // Duplicate tool output ID: one call, two outputs with same ID -> unsafe (true)
  assert.equal(
    hasUnresolvedToolCalls({
      input: [
        { type: "function_call", call_id: "call-dup-out", name: "cat", arguments: "{}" },
        { type: "function_call_output", call_id: "call-dup-out", output: "res1" },
        { type: "function_call_output", call_id: "call-dup-out", output: "res2" },
      ],
    }),
    true
  );

  // Orphaned tool output: output without matching call -> unsafe (true)
  assert.equal(
    hasUnresolvedToolCalls({
      input: [{ type: "function_call_output", call_id: "orphan-call", output: "res" }],
    }),
    true
  );

  // Malformed tool call with empty call_id -> unsafe (true)
  assert.equal(
    hasUnresolvedToolCalls({
      input: [{ type: "function_call", call_id: "", name: "cat", arguments: "{}" }],
    }),
    true
  );

  // Legacy unidentifiable function_call -> unsafe (true)
  assert.equal(
    hasUnresolvedToolCalls({
      input: [{ role: "assistant", function_call: { name: "test", arguments: "{}" } }],
    }),
    true
  );
});

test("hasProviderSpecificUnsafeContinuationState detects opaque provider state at all levels", () => {
  // Clean input: safe
  assert.equal(
    hasProviderSpecificUnsafeContinuationState({
      input: [{ type: "message", role: "user", content: "hello" }],
    }),
    false
  );

  // conversation_id at root: unsafe
  assert.equal(
    hasProviderSpecificUnsafeContinuationState({
      conversation_id: "conv_12345",
      input: [{ type: "message", role: "user", content: "hello" }],
    }),
    true
  );

  // conversation object at root: unsafe
  assert.equal(
    hasProviderSpecificUnsafeContinuationState({
      conversation: { id: "conv_67890" },
      input: [{ type: "message", role: "user", content: "hello" }],
    }),
    true
  );

  // Item with item-level previous_response_id: unsafe
  assert.equal(
    hasProviderSpecificUnsafeContinuationState({
      input: [
        {
          type: "message",
          role: "assistant",
          previous_response_id: "resp_nested_prev",
          content: "hello",
        },
      ],
    }),
    true
  );

  // Item with item-level continuation_token: unsafe
  assert.equal(
    hasProviderSpecificUnsafeContinuationState({
      input: [
        {
          type: "message",
          role: "assistant",
          continuation_token: "tok_nested_cont",
          content: "hello",
        },
      ],
    }),
    true
  );

  // previous_response_id: unsafe (binds to upstream response store)
  assert.equal(
    hasProviderSpecificUnsafeContinuationState({
      previous_response_id: "resp_12345_upstream",
      input: [{ type: "message", role: "user", content: "hello" }],
    }),
    true
  );

  // continuation_token: unsafe
  assert.equal(
    hasProviderSpecificUnsafeContinuationState({
      continuation_token: "tok_opaque_blob",
      input: [{ type: "message", role: "user", content: "hello" }],
    }),
    true
  );

  // response_id: unsafe
  assert.equal(
    hasProviderSpecificUnsafeContinuationState({
      response_id: "resp_999",
      input: [{ type: "message", role: "user", content: "hello" }],
    }),
    true
  );

  // provider_metadata at root: unsafe
  assert.equal(
    hasProviderSpecificUnsafeContinuationState({
      provider_metadata: { openai: { message_id: "m1" } },
      input: [{ type: "message", role: "user", content: "hello" }],
    }),
    true
  );

  // item_reference: unsafe (server-side item ID)
  assert.equal(
    hasProviderSpecificUnsafeContinuationState({
      input: [{ type: "item_reference", id: "item_abc123" }],
    }),
    true
  );

  // reasoning item with encrypted_content: unsafe
  assert.equal(
    hasProviderSpecificUnsafeContinuationState({
      input: [
        { type: "reasoning", encrypted_content: "enc_blob_xyz" },
        { type: "message", role: "user", content: "hello" },
      ],
    }),
    true
  );

  // thinking item with thought_signature: unsafe
  assert.equal(
    hasProviderSpecificUnsafeContinuationState({
      input: [
        { type: "thinking", thought_signature: "sig_gemini_blob" },
        { type: "message", role: "user", content: "hello" },
      ],
    }),
    true
  );

  // redacted_thinking item: unsafe
  assert.equal(
    hasProviderSpecificUnsafeContinuationState({
      input: [{ type: "redacted_thinking", data: "redacted" }],
    }),
    true
  );

  // Nested thinking part inside content array with signature: unsafe
  assert.equal(
    hasProviderSpecificUnsafeContinuationState({
      messages: [
        {
          role: "assistant",
          content: [
            { type: "thinking", thinking: "deep thought", signature: "sig-xyz" },
            { type: "text", text: "hello" },
          ],
        },
      ],
    }),
    true
  );

  // encrypted_content item: unsafe
  assert.equal(
    hasProviderSpecificUnsafeContinuationState({
      input: [{ type: "encrypted_content", encrypted_content: "enc_123" }],
    }),
    true
  );

  // Root body thoughtSignature (camelCase): unsafe
  assert.equal(
    hasProviderSpecificUnsafeContinuationState({
      thoughtSignature: "sig_camel_case",
      input: [{ type: "message", role: "user", content: "hello" }],
    }),
    true
  );

  // Root body provider_data: unsafe
  assert.equal(
    hasProviderSpecificUnsafeContinuationState({
      provider_data: { gemini: { candidate_token_count: 50 } },
      input: [{ type: "message", role: "user", content: "hello" }],
    }),
    true
  );

  // Nested output array with encrypted_content: unsafe
  assert.equal(
    hasProviderSpecificUnsafeContinuationState({
      input: [
        {
          type: "function_call_output",
          call_id: "c1",
          output: [{ type: "encrypted_content", encrypted_content: "enc_blob" }],
        },
      ],
    }),
    true
  );

  // Nested summary array with thought_signature: unsafe
  assert.equal(
    hasProviderSpecificUnsafeContinuationState({
      input: [
        {
          type: "reasoning",
          summary: [{ type: "summary_text", text: "...", thought_signature: "sig" }],
        },
      ],
    }),
    true
  );
});
