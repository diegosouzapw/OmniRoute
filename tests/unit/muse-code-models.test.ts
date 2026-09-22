/**
 * Tests for Muse Code CLI model catalog endpoint.
 *
 * Verifies the static fallback matches the current Muse Spark family used by
 * Meta's live Muse Code API. The live /v1/models catalog remains authoritative
 * when available.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { muse_codeProvider } from "../../open-sse/config/providers/registry/muse-code/index.ts";

// ── Model catalog shape ─────────────────────────────────────────────────────

test("muse-code provider has at least one model", () => {
  assert.ok(muse_codeProvider.models.length >= 1);
});

test("muse-code models have unique ids", () => {
  const ids = muse_codeProvider.models.map((m) => m.id);
  const unique = new Set(ids);
  assert.equal(unique.size, ids.length, "model IDs must be unique");
});

test("muse-code fallback includes Muse Spark 1.3", () => {
  const ids = muse_codeProvider.models.map((m) => m.id);
  assert.ok(ids.includes("muse-spark-1.3"));
});

test("muse-code fallback includes Muse Spark contributor variant", () => {
  const ids = muse_codeProvider.models.map((m) => m.id);
  assert.ok(ids.includes("muse-spark-1.3-contributor"));
});

test("muse-code fallback retains Muse Spark 1.2 for compatibility", () => {
  const ids = muse_codeProvider.models.map((m) => m.id);
  assert.ok(ids.includes("muse-spark-1.2"));
});

test("Muse Spark fallback models support reasoning and xhigh effort", () => {
  for (const model of muse_codeProvider.models) {
    assert.equal(model.supportsReasoning, true, `${model.id} should support reasoning`);
    assert.equal(model.supportsXHighEffort, true, `${model.id} should support xhigh effort`);
  }
});

test("Muse Spark fallback models support image input", () => {
  for (const model of muse_codeProvider.models) {
    assert.equal(model.supportsVision, true, `${model.id} should support image input`);
  }
});

test("Muse Spark fallback models use Responses format", () => {
  for (const model of muse_codeProvider.models) {
    assert.equal(model.targetFormat, "openai-responses", `${model.id} should use Responses`);
  }
});
