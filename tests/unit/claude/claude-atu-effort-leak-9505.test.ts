// Regression guard for #9505 — forced advanced-tool-use beta must not survive
// the effort-2025-11-24 gate; client-negotiated effort must survive the merge.
import test from "node:test";
import assert from "node:assert/strict";

const { selectBetaFlags } = await import("../../../open-sse/executors/claudeIdentity.ts");
const { mergeClientAnthropicBeta } = await import("../../../open-sse/config/anthropicHeaders.ts");

function fullAgentBody(model: string) {
  return {
    model,
    system: "You are a coding agent.",
    tools: [{ name: "read_file", description: "x", input_schema: { type: "object" } }],
  };
}

function pipeline(model: string, clientBeta: string | null) {
  return mergeClientAnthropicBeta(
    selectBetaFlags(fullAgentBody(model), null, clientBeta),
    clientBeta
  );
}

test("#9505 client sends effort but NOT advanced-tool-use -> ATU must NOT be forced", () => {
  const out = pipeline("claude-opus-5", "claude-code-20250219,effort-2025-11-24");
  assert.ok(
    !out.split(",").includes("advanced-tool-use-2025-11-20"),
    "must NOT force ATU when client only sent effort"
  );
});

test("#9505 client sends effort only -> effort still survives the merge", () => {
  const out = pipeline("claude-opus-5", "claude-code-20250219,effort-2025-11-24");
  assert.ok(
    out.split(",").includes("effort-2025-11-24"),
    "client-sent effort must survive the allowlist merge"
  );
});

test("#9505 client sends advanced-tool-use explicitly -> ATU preserved", () => {
  const out = pipeline("claude-opus-5", "claude-code-20250219,advanced-tool-use-2025-11-20");
  assert.ok(
    out.split(",").includes("advanced-tool-use-2025-11-20"),
    "must keep ATU when client requested it"
  );
  assert.ok(
    out.split(",").includes("effort-2025-11-24"),
    "ATU+effort pair stays together when ATU requested"
  );
});

test("#9505 client sends BOTH effort and ATU -> both preserved", () => {
  const out = pipeline(
    "claude-sonnet-5",
    "claude-code-20250219,advanced-tool-use-2025-11-20,effort-2025-11-24"
  );
  assert.ok(out.split(",").includes("advanced-tool-use-2025-11-20"));
  assert.ok(out.split(",").includes("effort-2025-11-24"));
});

test("#9505 opaque client (no clientBeta) still gets full heavy-agent set", () => {
  const flags = selectBetaFlags(fullAgentBody("claude-opus-5"));
  assert.ok(flags.includes("advanced-tool-use-2025-11-20"));
  assert.ok(flags.includes("effort-2025-11-24"));
});
