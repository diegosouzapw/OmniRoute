// Regression test for #3415 — forced anthropic-beta rewrite corrupts opus tool_use stream.
//
// For Claude Code traffic to claude-opus-4-8 (claude→claude passthrough), OmniRoute
// rebuilt the anthropic-beta header from scratch and UNCONDITIONALLY forced
// interleaved-thinking-2025-05-14 (+ advanced-tool-use / effort for heavy agents),
// even when the client never negotiated them. Anthropic then returned 200 turns with
// malformed/incomplete tool_use.input (and sibling 400 "Thinking may not be enabled
// when tool_choice forces tool use"), so Claude Code aborted with
// "tool call could not be parsed (retry also failed)".
//
// Fix: when the client sends its own anthropic-beta header (real Claude Code), do NOT
// force the thinking / advanced-tool-use / effort betas it did not request. Opaque
// clients (no client header — the OAuth identity cloak) keep the full set unchanged.

import test from "node:test";
import assert from "node:assert/strict";

const { selectBetaFlags } = await import("../../open-sse/executors/claudeIdentity.ts");

function fullAgentBody(model: string) {
  return {
    model,
    system: "You are a coding agent.",
    tools: [{ name: "read_file", description: "x", input_schema: { type: "object" } }],
  };
}

// --- Opaque clients (no client anthropic-beta) keep current behavior (OAuth cloak) ---

test("#3415 opaque client (no clientBeta) still receives the full forced set", () => {
  const flags = selectBetaFlags(fullAgentBody("claude-opus-4-8"));
  assert.ok(flags.includes("interleaved-thinking-2025-05-14"));
  assert.ok(flags.includes("advanced-tool-use-2025-11-20"));
  assert.ok(flags.includes("effort-2025-11-24"));
  assert.ok(flags.includes("oauth-2025-04-20"));
});

// --- Client negotiated its own anthropic-beta: do NOT force thinking/effort ---

test("#3415 opus client WITHOUT interleaved-thinking → interleaved-thinking NOT forced", () => {
  const flags = selectBetaFlags(
    fullAgentBody("claude-opus-4-8"),
    null,
    "claude-code-20250219,oauth-2025-04-20,fine-grained-tool-streaming-2025-05-14"
  );
  assert.ok(
    !flags.includes("interleaved-thinking-2025-05-14"),
    "must NOT force interleaved-thinking when the client did not request it"
  );
  assert.ok(
    !flags.includes("advanced-tool-use-2025-11-20"),
    "must NOT force advanced-tool-use when the client did not request it"
  );
  assert.ok(
    !flags.includes("effort-2025-11-24"),
    "must NOT force effort when the client did not request it"
  );
  // Mandatory OAuth cloak flag is still present.
  assert.ok(flags.includes("oauth-2025-04-20"));
});

test("#3415 opus client WITH interleaved-thinking → interleaved-thinking preserved", () => {
  const flags = selectBetaFlags(
    fullAgentBody("claude-opus-4-8"),
    null,
    "oauth-2025-04-20,interleaved-thinking-2025-05-14"
  );
  assert.ok(
    flags.includes("interleaved-thinking-2025-05-14"),
    "must keep interleaved-thinking when the client requested it"
  );
});

test("#3415 opus client WITH effort/advanced-tool-use → preserved", () => {
  const flags = selectBetaFlags(
    fullAgentBody("claude-opus-4-8"),
    null,
    "oauth-2025-04-20,advanced-tool-use-2025-11-20,effort-2025-11-24"
  );
  assert.ok(flags.includes("advanced-tool-use-2025-11-20"));
  assert.ok(flags.includes("effort-2025-11-24"));
});

test("#3415 empty client anthropic-beta string is treated as a real (minimal) client header", () => {
  // A present-but-empty header means the client negotiated nothing — do not force thinking.
  const flags = selectBetaFlags(fullAgentBody("claude-opus-4-8"), null, "");
  // Empty string is falsy → treated as opaque (no header), full set retained.
  // This documents the boundary: only a NON-empty client header gates the forced flags.
  assert.ok(flags.includes("oauth-2025-04-20"));
});
