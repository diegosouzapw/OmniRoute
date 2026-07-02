/**
 * TDD regression for #3974: the client-negotiated `anthropic-beta:
 * tool-search-tool-2025-10-19` is dropped on BOTH Claude code paths, so the
 * claude.ai backend rejects deferred-tool requests with
 * `400 Tool reference '<name>' not found in available tools`.
 *
 * - default executor (`claude` uses executor:"default"): buildHeaders set the
 *   beta from the static registry header (ANTHROPIC_BETA_CLAUDE_OAUTH, which
 *   lacks tool-search) and the client-header forward block is allowlist-only.
 * - selectBetaFlags path (base.ts): rebuilds the beta from a fixed vocabulary
 *   and only reads the client beta to GATE thinking/effort, never to ADD.
 *
 * Fix: allowlist-merge the client beta on both paths (preserving #3415 — never
 * force thinking/effort the client did not send).
 */
import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";
const { selectBetaFlags } = await import("../../open-sse/executors/claudeIdentity.ts");
const { mergeClientAnthropicBeta, FORWARDABLE_CLIENT_BETAS } = await import(
  "../../open-sse/config/anthropicHeaders.ts"
);

const TOOL_SEARCH = "tool-search-tool-2025-10-19";

function fullAgentBody(model: string) {
  return {
    model,
    system: "You are a coding agent.",
    tools: [{ name: "read_file", description: "x", input_schema: { type: "object" } }],
  };
}

function betaTokens(headers: Record<string, string>): string[] {
  const key = Object.keys(headers).find((k) => k.toLowerCase() === "anthropic-beta");
  return key ? headers[key].split(",").map((s) => s.trim()) : [];
}

// ── helper unit (allowlist-merge) ────────────────────────────────────────────

test("#3974 mergeClientAnthropicBeta appends an allowlisted client beta once, preserving base order", () => {
  const out = mergeClientAnthropicBeta(
    "claude-code-20250219,oauth-2025-04-20",
    `oauth-2025-04-20,${TOOL_SEARCH}`
  );
  const tokens = out.split(",");
  assert.deepEqual(tokens.slice(0, 2), ["claude-code-20250219", "oauth-2025-04-20"]);
  assert.equal(tokens.filter((t) => t === TOOL_SEARCH).length, 1, "appended once, no dup");
});

test("#3974 mergeClientAnthropicBeta ignores non-allowlisted client betas", () => {
  const out = mergeClientAnthropicBeta("oauth-2025-04-20", "some-random-future-beta-2099-01-01");
  assert.equal(out, "oauth-2025-04-20", "only allowlisted betas are forwarded");
  assert.ok(FORWARDABLE_CLIENT_BETAS.includes(TOOL_SEARCH));
});

// ── selectBetaFlags path (base.ts) ───────────────────────────────────────────

test("#3974 selectBetaFlags + merge preserves the client tool-search beta", () => {
  const clientBeta = `claude-code-20250219,oauth-2025-04-20,${TOOL_SEARCH}`;
  const out = mergeClientAnthropicBeta(
    selectBetaFlags(fullAgentBody("claude-opus-4-8"), null, clientBeta),
    clientBeta
  );
  assert.ok(out.split(",").includes(TOOL_SEARCH));
});

test("#3974 merge does not force interleaved-thinking the client omitted (guards #3415)", () => {
  const clientBeta = `oauth-2025-04-20,${TOOL_SEARCH}`;
  const out = mergeClientAnthropicBeta(
    selectBetaFlags(fullAgentBody("claude-opus-4-8"), null, clientBeta),
    clientBeta
  );
  assert.ok(out.split(",").includes(TOOL_SEARCH));
  assert.ok(
    !out.split(",").includes("interleaved-thinking-2025-05-14"),
    "must NOT force interleaved-thinking when the client did not request it"
  );
});

// ── default executor path (default.ts buildHeaders) ──────────────────────────

test("#3974 DefaultExecutor('claude') merges the client tool-search beta into outbound headers", () => {
  const executor = new DefaultExecutor("claude");
  const headers = executor.buildHeaders({ accessToken: "sk-ant-oat-x" }, true, {
    "anthropic-beta": `oauth-2025-04-20,${TOOL_SEARCH}`,
  }) as Record<string, string>;
  const tokens = betaTokens(headers);
  assert.ok(tokens.includes(TOOL_SEARCH), `outbound beta missing tool-search: ${tokens.join(",")}`);
  assert.equal(tokens.filter((t) => t === TOOL_SEARCH).length, 1, "no duplicate");
  // The provider's own base betas are still present.
  assert.ok(tokens.includes("claude-code-20250219"));
});

test("#3974 DefaultExecutor('claude') without a client beta leaves the static set unchanged", () => {
  const executor = new DefaultExecutor("claude");
  const headers = executor.buildHeaders({ accessToken: "sk-ant-oat-x" }, true, {}) as Record<
    string,
    string
  >;
  assert.ok(!betaTokens(headers).includes(TOOL_SEARCH), "must not invent tool-search unprompted");
});
