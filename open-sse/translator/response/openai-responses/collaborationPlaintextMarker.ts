// #14154 — Codex MultiAgent V2 normally treats a collaboration function_call's
// arguments as backend ciphertext. An empty `encrypted_function_args` list is
// the protocol's explicit plaintext-delivery marker (codex-rs
// ToolCall::direct_source). The vendored ChatGPT-web bridge already emits it
// (open-sse/vendor/codex-chatgpt-web/bridge.ts) for its own three call sites;
// this shared helper gives the general Responses-API output emitters
// (streaming translator, non-streaming client translator, Responses
// transformer) the same contract so every non-OpenAI chat-format upstream
// gets the marker too.

const PLAINTEXT_COLLABORATION_CALLS = new Set(["spawn_agent", "send_message", "followup_task"]);

/**
 * Return `{ encrypted_function_args: [] }` when `namespace`/`name` identify a
 * collaboration call that Codex expects delivered as plaintext, otherwise an
 * empty object — safe to spread onto any function_call item unconditionally.
 */
export function plaintextCollaborationFields(
  namespace: string | undefined,
  name: string | undefined
): Record<string, unknown> {
  return namespace === "collaboration" && !!name && PLAINTEXT_COLLABORATION_CALLS.has(name)
    ? { encrypted_function_args: [] }
    : {};
}
