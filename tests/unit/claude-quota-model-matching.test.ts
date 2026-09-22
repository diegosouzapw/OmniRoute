import test from "node:test";
import assert from "node:assert/strict";
import {
  claudeQuotaMatchesModel,
  type ClaudeQuotaKind,
} from "../../open-sse/services/usage/claudeQuota.ts";
import type { ClaudeQuotaMetadata } from "../../open-sse/services/usage/quota.ts";

function scopedQuota(
  modelDisplayName: string | null,
  modelId: string | null = null
): ClaudeQuotaMetadata {
  const kind: ClaudeQuotaKind = "weekly_scoped";
  return {
    kind,
    active: true,
    severity: "critical",
    scopeKey: "model:test",
    modelId,
    modelDisplayName,
  };
}

for (const [label, displayName, requestedModel] of [
  ["major", "Claude Opus 4", "claude/claude-opus-5"],
  ["minor", "Claude Opus 4.5", "claude/claude-opus-4-6"],
  ["extra minor", "Claude Opus 4", "claude/claude-opus-4-5"],
  ["reordered", "Claude Opus 4.5", "claude/claude-opus-5-4"],
  ["repeated", "Claude Opus 4", "claude/claude-opus-4-4"],
] as const) {
  test(`rejects numeric version mismatch: ${label}`, () => {
    assert.equal(claudeQuotaMatchesModel(scopedQuota(displayName), requestedModel), false);
  });
}

test("matches family-only Fable and Opus display scopes", () => {
  assert.equal(claudeQuotaMatchesModel(scopedQuota("Fable"), "claude/claude-fable-5-1"), true);
  assert.equal(claudeQuotaMatchesModel(scopedQuota("Opus"), "claude/claude-opus-4-5"), true);
});

test("matches versioned display scopes through native model decorations", () => {
  const quota = scopedQuota("Claude Fable 5.1");
  for (const requestedModel of [
    "claude/claude-fable-5-1",
    "claude/claude-fable-5-1-20251101",
    "claude/claude-fable-5-1-high",
    "claude/claude-fable-5-1-thinking-high",
    "claude/claude-fable-5-1[500k]",
  ]) {
    assert.equal(claudeQuotaMatchesModel(quota, requestedModel), true, requestedModel);
  }
});

test("does not ignore an embedded snapshot date followed by a model suffix", () => {
  assert.equal(
    claudeQuotaMatchesModel(scopedQuota("Claude Opus 4"), "claude/claude-opus-4-20250514-preview"),
    false
  );
});

test("prefers an exact upstream model ID over its display label", () => {
  const quota = scopedQuota("Claude Opus 4", "claude-opus-4-5");
  assert.equal(claudeQuotaMatchesModel(quota, "claude/claude-opus-4-5"), true);
  assert.equal(claudeQuotaMatchesModel(quota, "claude/claude-opus-4"), false);
});
