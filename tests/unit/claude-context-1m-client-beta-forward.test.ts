/**
 * Client-negotiated `context-1m-2025-08-07` must be forwarded upstream.
 *
 * When Claude Code runs with a `[1m]` model (e.g. `/model sonnet[1m]` or
 * `ANTHROPIC_DEFAULT_SONNET_MODEL='<id>[1m]'`), the client sizes its context
 * window at 1M AND negotiates `anthropic-beta: context-1m-2025-08-07` itself.
 * Behind OmniRoute that beta was silently dropped for non-Opus models:
 * selectBetaFlags only emits context-1m for `claude-opus*` (deliberate — never
 * FORCE it, see the long-context credit-gate note there), and the
 * FORWARDABLE_CLIENT_BETAS allowlist did not include it, so the client's own
 * negotiation was stripped. Real Claude Code sends the beta in this setup, so
 * forwarding what the client asked for is the fingerprint-faithful behavior —
 * and it is required for >200K-context requests on models/accounts where the
 * beta is enforced.
 *
 * Guard preserved: the beta is only APPENDED when the client sent it — a
 * client without `[1m]` keeps the exact same beta set as before.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { selectBetaFlags } = await import("../../open-sse/executors/claudeIdentity.ts");
const { mergeClientAnthropicBeta, FORWARDABLE_CLIENT_BETAS } =
  await import("../../open-sse/config/anthropicHeaders.ts");

const CONTEXT_1M = "context-1m-2025-08-07";

function fullAgentBody(model: string) {
  return {
    model,
    system: "You are a coding agent.",
    tools: [{ name: "read_file", description: "x", input_schema: { type: "object" } }],
  };
}

test("mergeClientAnthropicBeta forwards a client-negotiated context-1m beta", () => {
  const out = mergeClientAnthropicBeta(
    "claude-code-20250219,oauth-2025-04-20",
    `oauth-2025-04-20,${CONTEXT_1M}`
  );
  assert.ok(
    out.split(",").includes(CONTEXT_1M),
    "client [1m] negotiation must survive the allowlist merge"
  );
  assert.ok(FORWARDABLE_CLIENT_BETAS.includes(CONTEXT_1M));
});

test("selectBetaFlags + merge keeps context-1m for a Sonnet [1m] client", () => {
  const clientBeta = `claude-code-20250219,oauth-2025-04-20,interleaved-thinking-2025-05-14,${CONTEXT_1M}`;
  const out = mergeClientAnthropicBeta(
    selectBetaFlags(fullAgentBody("claude-sonnet-5"), null, clientBeta),
    clientBeta
  );
  assert.ok(
    out.split(",").includes(CONTEXT_1M),
    "Sonnet client that negotiated [1m] must reach upstream with context-1m"
  );
});

test("context-1m is never forced when the client did not negotiate it", () => {
  const clientBeta = "claude-code-20250219,oauth-2025-04-20,interleaved-thinking-2025-05-14";
  const out = mergeClientAnthropicBeta(
    selectBetaFlags(fullAgentBody("claude-sonnet-5"), null, clientBeta),
    clientBeta
  );
  assert.ok(
    !out.split(",").includes(CONTEXT_1M),
    "a client without [1m] keeps the exact same beta set as before"
  );
});

test("tool-search forwarding keeps working (regression #3974)", () => {
  assert.ok(FORWARDABLE_CLIENT_BETAS.includes("tool-search-tool-2025-10-19"));
});
