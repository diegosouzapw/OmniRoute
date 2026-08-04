import test from "node:test";
import assert from "node:assert/strict";
import { resolveRequestedModel } from "../../open-sse/utils/cursorAgentProtobuf";

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
