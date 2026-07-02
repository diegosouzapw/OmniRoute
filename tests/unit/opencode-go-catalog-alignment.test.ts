/**
 * OpenCode Go model catalog alignment with the official Go docs.
 *
 * Port of decolua/9router 8efacc114 (thanks @nguyenha935): the official Go API
 * advertises `glm-5.2` and routes Kimi chat traffic through `kimi-k2.7-code`
 * (the live API rejects the plain `kimi-k2.7` alias for `/chat/completions`
 * even though the public docs example uses it). OmniRoute previously shipped
 * the older registry without these IDs.
 */

import test from "node:test";
import assert from "node:assert/strict";

const { opencode_goProvider } = await import(
  "../../open-sse/config/providers/registry/opencode/go/index.ts"
);

function modelIds(): string[] {
  return (opencode_goProvider.models ?? []).map((m) => m.id);
}

test("opencode-go advertises glm-5.2 (official Go endpoint addition)", () => {
  assert.ok(
    modelIds().includes("glm-5.2"),
    `expected glm-5.2 in opencode-go catalog, got: ${modelIds().join(", ")}`
  );
});

test("opencode-go advertises kimi-k2.7-code (live API rejects plain kimi-k2.7 for chat)", () => {
  assert.ok(
    modelIds().includes("kimi-k2.7-code"),
    `expected kimi-k2.7-code in opencode-go catalog, got: ${modelIds().join(", ")}`
  );
});

test("opencode-go preserves the pre-existing minimax-m3 and qwen routing via targetFormat=claude", () => {
  // Routing through the /messages endpoint is OmniRoute's declarative
  // equivalent of upstream's MESSAGES_FORMAT_MODELS set; the alignment
  // change must not regress this.
  const byId = new Map(
    (opencode_goProvider.models ?? []).map((m) => [m.id, m as Record<string, unknown>])
  );
  assert.equal(byId.get("minimax-m3")?.targetFormat, "claude");
  assert.equal(byId.get("qwen3.7-max")?.targetFormat, "claude");
});
