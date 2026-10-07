/**
 * Vertex AI Anthropic partner-model discovery (#11279).
 *
 * Covers the two pure units the PR adds (the discovery route itself is a
 * best-effort network path exercised manually per the PR's test plan):
 *   - parseVertexAnthropicModels: Model Garden publisher response → discovery
 *     models, handling global AND project-scoped resource names;
 *   - getModelTargetFormat: a claude-* id on vertex/vertex-partner resolves to
 *     the "claude" translator even when the model is NOT in the static
 *     registry (the future-model heuristic).
 */
import test from "node:test";
import assert from "node:assert/strict";

import { parseVertexAnthropicModels } from "../../src/lib/providerModels/vertexAnthropicModelsParser.ts";
import { getModelTargetFormat } from "../../open-sse/config/providerModels.ts";

test("parseVertexAnthropicModels: global publisher resource names", () => {
  const out = parseVertexAnthropicModels({
    models: [
      {
        name: "publishers/anthropic/models/claude-sonnet-4-6",
        displayName: "Claude Sonnet 4.6",
        description: "Latest Sonnet",
      },
      { name: "publishers/anthropic/models/claude-opus-4-6", displayName: "Claude Opus 4.6" },
    ],
  });
  assert.equal(out.length, 2);
  assert.deepEqual(out[0], {
    id: "claude-sonnet-4-6",
    name: "Claude Sonnet 4.6",
    supportedEndpoints: ["chat"],
    targetFormat: "claude",
    description: "Latest Sonnet",
    owned_by: "anthropic",
  });
  // displayName fallback: missing → id; description omitted when absent
  assert.equal(out[1].name, "Claude Opus 4.6");
  assert.equal("description" in out[1], false);
});

test("parseVertexAnthropicModels: project-scoped resource names strip the prefix", () => {
  const out = parseVertexAnthropicModels({
    models: [
      {
        name: "projects/my-gcp-project/locations/us-east5/publishers/anthropic/models/claude-haiku-4-5",
      },
    ],
  });
  assert.equal(out.length, 1);
  assert.equal(out[0].id, "claude-haiku-4-5");
  assert.equal(out[0].name, "claude-haiku-4-5");
});

test("parseVertexAnthropicModels: malformed input yields an empty list", () => {
  assert.deepEqual(parseVertexAnthropicModels(null), []);
  assert.deepEqual(parseVertexAnthropicModels({}), []);
  assert.deepEqual(parseVertexAnthropicModels({ models: "not-an-array" }), []);
  assert.deepEqual(parseVertexAnthropicModels({ models: [{ name: "" }, {}] }), []);
});

test("parseVertexAnthropicModels: v1beta1 publisherModels envelope (Model Garden list)", () => {
  // The Model Garden publisher-model list is served by the v1beta1 API and
  // returns `{ publisherModels: [...] }` (v1 does not support list). Regression
  // for #11991: discovery previously read only `data.models`, so the Claude
  // catalog never populated the active synced catalog and every model id was
  // rejected as "not available in the active live catalog".
  const out = parseVertexAnthropicModels({
    publisherModels: [
      { name: "publishers/anthropic/models/claude-sonnet-4-6", launchStage: "GA" },
      { name: "publishers/anthropic/models/claude-opus-4-8", launchStage: "GA" },
      { name: "publishers/anthropic/models/claude-opus-5", launchStage: "GA" },
    ],
  });
  assert.equal(out.length, 3);
  assert.deepEqual(out[0], {
    id: "claude-sonnet-4-6",
    name: "claude-sonnet-4-6",
    supportedEndpoints: ["chat"],
    targetFormat: "claude",
    owned_by: "anthropic",
  });
  assert.equal(out[1].id, "claude-opus-4-8");
  assert.equal(out[2].id, "claude-opus-5");
});

test("parseVertexAnthropicModels: real Model Garden response reference (2026-08)", () => {
  // Snapshot of the actual v1beta1 publishers/anthropic/models response used to
  // reproduce #11991. Ids must map to routable claude-* ids.
  const real = {
    publisherModels: [
      { name: "publishers/anthropic/models/claude-opus-4-1", launchStage: "GA" },
      { name: "publishers/anthropic/models/claude-sonnet-4-5", launchStage: "GA" },
      { name: "publishers/anthropic/models/claude-haiku-4-5", launchStage: "GA" },
      { name: "publishers/anthropic/models/claude-opus-4-6", launchStage: "GA" },
      { name: "publishers/anthropic/models/claude-sonnet-4-6", launchStage: "GA" },
      { name: "publishers/anthropic/models/claude-sonnet-5", launchStage: "GA" },
      { name: "publishers/anthropic/models/claude-opus-4-8", launchStage: "GA" },
      { name: "publishers/anthropic/models/claude-opus-5", launchStage: "GA" },
    ],
  };
  const out = parseVertexAnthropicModels(real);
  const ids = out.map((m) => m.id);
  assert.ok(ids.includes("claude-sonnet-4-6"));
  assert.ok(ids.includes("claude-opus-4-8"));
  assert.ok(ids.includes("claude-opus-5"));
  // Every parsed model carries the claude target format for the translator.
  for (const m of out) {
    assert.equal(m.targetFormat, "claude");
    assert.equal(m.owned_by, "anthropic");
  }
});

test("getModelTargetFormat: claude-* on vertex resolves to the claude translator (heuristic)", () => {
  // A future Claude model with no static registry entry must still route
  // through the Anthropic Messages translator on both vertex ids.
  assert.equal(getModelTargetFormat("vertex", "claude-future-9-9"), "claude");
  assert.equal(getModelTargetFormat("vertex-partner", "claude-future-9-9"), "claude");
  // Non-Claude ids are untouched by the heuristic.
  assert.notEqual(getModelTargetFormat("vertex", "gemini-3.1-pro"), "claude");
});
