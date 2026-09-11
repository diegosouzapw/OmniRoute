// #12724 — AGY_PUBLIC_MODELS and ANTIGRAVITY_PUBLIC_MODELS were two
// hand-maintained copies of the same list; they had been byte-equal for months
// and could silently drift whenever a new Antigravity-backed model shipped.
// agyModels.ts now re-exports the canonical antigravity catalog, so the two
// can never diverge. These tests pin that invariant.
import test from "node:test";
import assert from "node:assert/strict";

import { AGY_PUBLIC_MODELS } from "../../open-sse/config/agyModels.ts";
import { ANTIGRAVITY_PUBLIC_MODELS } from "../../open-sse/config/antigravityModelAliases.ts";

test("AGY_PUBLIC_MODELS is the same array as ANTIGRAVITY_PUBLIC_MODELS (single source of truth)", () => {
  assert.strictEqual(
    AGY_PUBLIC_MODELS,
    ANTIGRAVITY_PUBLIC_MODELS,
    "agy must reuse the canonical antigravity catalog — two hand-synced copies silently drift (#12724)"
  );
});

test("agy and antigravity expose the same model id set (defensive)", () => {
  const agyIds = AGY_PUBLIC_MODELS.map((model) => model.id).sort();
  const antigravityIds = ANTIGRAVITY_PUBLIC_MODELS.map((model) => model.id).sort();
  assert.deepEqual(agyIds, antigravityIds);
});

test("agy catalog matches the documented 10-model callable set", () => {
  assert.equal(AGY_PUBLIC_MODELS.length, 10);
  const ids = new Set(AGY_PUBLIC_MODELS.map((model) => model.id));
  for (const id of [
    "claude-opus-4-6-thinking",
    "claude-sonnet-4-6",
    "gemini-pro-agent",
    "gemini-3.1-flash-lite",
    "gemini-3.1-pro-low",
    "gemini-3.7-flash-low",
    "gemini-3.7-flash-medium",
    "gemini-3.7-flash-high",
    "gemini-3.7-flash-tiered",
    "gpt-oss-120b-medium",
  ]) {
    assert.ok(ids.has(id), `expected ${id} in the agy public catalog`);
  }
});
