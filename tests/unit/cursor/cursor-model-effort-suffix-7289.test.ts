import test from "node:test";
import assert from "node:assert/strict";
import { resolveRequestedModel } from "../../../open-sse/utils/cursorAgentProtobuf";

// Issue #7289: pinned Claude/GPT models carrying an effort/reasoning suffix
// (e.g. "claude-opus-4-8-high") return an empty turn from cursor's server.
//
// Ground truth captured from the real cursor-agent 2026.07.09 (Node) client
// via an http2/fetch preload hook: the wire request for a pinned model with
// an effort suffix carries the BASE model id (suffix stripped) plus a
// separate ModelParameter — "effort" for Claude models, "reasoning" for GPT
// models — not the full suffixed id crammed into model_id.
test("resolveRequestedModel splits the effort suffix off pinned Claude model ids (#7289)", () => {
  assert.deepEqual(resolveRequestedModel("claude-opus-4-8-high"), {
    modelId: "claude-opus-4-8",
    parameters: [{ id: "effort", value: "high" }],
  });
});

test("resolveRequestedModel splits the effort suffix off pinned Claude sonnet model ids (#7289)", () => {
  assert.deepEqual(resolveRequestedModel("claude-sonnet-5-high"), {
    modelId: "claude-sonnet-5",
    parameters: [{ id: "effort", value: "high" }],
  });
});

test("resolveRequestedModel splits the reasoning suffix off pinned GPT model ids (#7289)", () => {
  assert.deepEqual(resolveRequestedModel("gpt-5.5-high"), {
    modelId: "gpt-5.5",
    parameters: [{ id: "reasoning", value: "high" }],
  });
});

test("resolveRequestedModel does not touch the composer -fast toggle (#7289 regression guard)", () => {
  assert.deepEqual(resolveRequestedModel("composer-2-fast"), {
    modelId: "composer-2",
    parameters: [{ id: "fast", value: "true" }],
  });
});

test("resolveRequestedModel does not rewrite ids with no recognized effort suffix (#7289 regression guard)", () => {
  assert.deepEqual(resolveRequestedModel("claude-2.5"), {
    modelId: "claude-2.5",
    parameters: [],
  });
  assert.deepEqual(resolveRequestedModel("gpt-4o"), {
    modelId: "gpt-4o",
    parameters: [],
  });
});

test("resolveRequestedModel splits effort off cursor-grok ids (empty-turn fix)", () => {
  assert.deepEqual(resolveRequestedModel("cursor-grok-4.5-high"), {
    modelId: "cursor-grok-4.5",
    parameters: [{ id: "effort", value: "high" }],
  });
  assert.deepEqual(resolveRequestedModel("cursor-grok-4.5-medium"), {
    modelId: "cursor-grok-4.5",
    parameters: [{ id: "effort", value: "medium" }],
  });
});

test("resolveRequestedModel splits effort off legacy grok- ids", () => {
  // "grok-4.5-*" combos are pre-aliased to "cursor-grok-4.5-*" by
  // CURSOR_MODEL_ALIASES (already shipped on the release tip), so this uses
  // an unaliased grok version to actually exercise the bare "grok-" fallback
  // in resolveGrokRequestedModel rather than the alias table's rewrite.
  assert.deepEqual(resolveRequestedModel("grok-3-high"), {
    modelId: "grok-3",
    parameters: [{ id: "effort", value: "high" }],
  });
});

test("resolveRequestedModel splits cursor-grok effort + fast together", () => {
  assert.deepEqual(resolveRequestedModel("cursor-grok-4.5-high-fast"), {
    modelId: "cursor-grok-4.5",
    parameters: [
      { id: "effort", value: "high" },
      { id: "fast", value: "true" },
    ],
  });
});

test("resolveRequestedModel expands Claude 1M catalog ids into complete wire parameters", () => {
  assert.deepEqual(resolveRequestedModel("claude-opus-5-thinking-max-fast-1m"), {
    modelId: "claude-opus-5",
    parameters: [
      { id: "thinking", value: "true" },
      { id: "context", value: "1m" },
      { id: "effort", value: "max" },
      { id: "fast", value: "true" },
    ],
  });
  assert.deepEqual(resolveRequestedModel("claude-4.6-sonnet-high-thinking-1m"), {
    modelId: "claude-sonnet-4-6",
    parameters: [
      { id: "thinking", value: "true" },
      { id: "context", value: "1m" },
      { id: "effort", value: "high" },
    ],
  });
});

test("resolveRequestedModel expands GPT-5.6 1M ids and keeps fast disabled", () => {
  const id = "gpt-5.6-sol-xhigh-1m";
  assert.deepEqual(resolveRequestedModel(id, { liveCatalogIds: new Set([id]) }), {
    modelId: "gpt-5.6-sol",
    parameters: [
      { id: "context", value: "1m" },
      { id: "reasoning", value: "xhigh" },
      { id: "fast", value: "false" },
    ],
  });
});
