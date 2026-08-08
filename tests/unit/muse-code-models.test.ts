/**
 * Tests for Muse Code CLI model catalog endpoint.
 *
 * Verifies GET /v1/muse-code/models returns the proprietary Muse format.
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

test("muse-code models include llama-4-maverick", () => {
  const ids = muse_codeProvider.models.map((m) => m.id);
  assert.ok(ids.includes("llama-4-maverick"), "must include llama-4-maverick");
});

test("muse-code models include llama-4-scout", () => {
  const ids = muse_codeProvider.models.map((m) => m.id);
  assert.ok(ids.includes("llama-4-scout"), "must include llama-4-scout");
});

test("muse-code models include llama-3.3-70b", () => {
  const ids = muse_codeProvider.models.map((m) => m.id);
  assert.ok(ids.includes("llama-3.3-70b"), "must include llama-3.3-70b");
});

test("llama-4 models have supportsXHighEffort", () => {
  const maverick = muse_codeProvider.models.find((m) => m.id === "llama-4-maverick");
  assert.ok(maverick, "llama-4-maverick must exist");
  assert.equal(maverick.supportsXHighEffort, true);

  const scout = muse_codeProvider.models.find((m) => m.id === "llama-4-scout");
  assert.ok(scout, "llama-4-scout must exist");
  assert.equal(scout.supportsXHighEffort, true);
});

test("llama-3.3-70b does not support reasoning", () => {
  const model = muse_codeProvider.models.find((m) => m.id === "llama-3.3-70b");
  assert.ok(model, "llama-3.3-70b must exist");
  assert.equal(model.supportsReasoning, false);
});

test("non-reasoning models do not declare supportsXHighEffort", () => {
  for (const model of muse_codeProvider.models) {
    if (!model.supportsReasoning) {
      assert.equal(
        model.supportsXHighEffort,
        undefined,
        `${model.id} is not a reasoning model but has supportsXHighEffort`
      );
    }
  }
});

// ── Vision models ───────────────────────────────────────────────────────────

test("vision models have supportsVision: true", () => {
  const expectedVision = [
    "llama-4-maverick",
    "llama-4-scout",
    "llama-3.2-90b-vision",
    "llama-3.2-11b-vision",
  ];
  for (const model of muse_codeProvider.models) {
    if (expectedVision.includes(model.id)) {
      assert.equal(model.supportsVision, true, `${model.id} should have supportsVision`);
    }
  }
});
