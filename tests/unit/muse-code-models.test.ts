/**
 * Tests for Muse Code CLI model catalog.
 *
 * Verifies the API-key muse-code registry advertises the real Meta Muse Spark
 * catalog over the Responses endpoint, not the obsolete llama-* ids.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { muse_codeProvider } from "../../open-sse/config/providers/registry/muse-code/index.ts";

const EXPECTED_IDS = [
  "muse-spark-1.1",
  "muse-spark-1.2",
  "muse-spark-1.2-contributor",
  "muse-spark-1.3",
  "muse-spark-1.3-contributor",
];

// ── Model catalog shape ─────────────────────────────────────────────────────

test("muse-code provider has at least one model", () => {
  assert.ok(muse_codeProvider.models.length >= 1);
});

test("muse-code models have unique ids", () => {
  const ids = muse_codeProvider.models.map((m) => m.id);
  const unique = new Set(ids);
  assert.equal(unique.size, ids.length, "model IDs must be unique");
});

test("muse-code advertises the muse-spark catalog", () => {
  const ids = muse_codeProvider.models.map((m) => m.id).sort();
  assert.deepEqual(ids, EXPECTED_IDS);
});

test("muse-code advertises no obsolete llama-* ids", () => {
  for (const model of muse_codeProvider.models) {
    assert.ok(!model.id.startsWith("llama-"), `${model.id} must not be a llama id`);
  }
});

// ── Upstream wiring ─────────────────────────────────────────────────────────

test("muse-code baseUrl points at the Responses endpoint", () => {
  assert.equal(muse_codeProvider.baseUrl, "https://api.meta.ai/v1/responses");
});

test("every muse-spark model uses the Responses wire format at 1M context", () => {
  for (const model of muse_codeProvider.models) {
    assert.equal(model.targetFormat, "openai-responses", `${model.id} targetFormat`);
    assert.equal(model.contextLength, 1048576, `${model.id} contextLength`);
  }
});

test("defaultContextLength matches the real 1M window", () => {
  assert.equal(muse_codeProvider.defaultContextLength, 1048576);
});
