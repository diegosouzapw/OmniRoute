import { test } from "node:test";
import assert from "node:assert/strict";

import {
  CLAUDE_EFFORT_VARIANT_LEVELS,
  CLAUDE_XHIGH_EFFORT_LEVEL,
  formatClaudeEffortLabel,
  shouldExposeClaudeEffortVariants,
  claudeEffortLevelsFor,
  appendClaudeEffortVariants,
} from "../../open-sse/utils/claudeEffortVariants.ts";

const mk = (id: string, extra: Record<string, unknown> = {}) => ({
  id,
  owned_by: id.split("/")[0],
  name: id.split("/").pop(),
  ...extra,
});

// ── constants / labels ───────────────────────────────────────────────────────

test("advertises Low/Medium/High as the base effort levels", () => {
  assert.deepEqual([...CLAUDE_EFFORT_VARIANT_LEVELS], ["low", "medium", "high"]);
  assert.equal(CLAUDE_XHIGH_EFFORT_LEVEL, "xhigh");
});

test("formatClaudeEffortLabel matches the VS Code catalog casing", () => {
  assert.equal(formatClaudeEffortLabel("low"), "Low");
  assert.equal(formatClaudeEffortLabel("medium"), "Medium");
  assert.equal(formatClaudeEffortLabel("high"), "High");
  assert.equal(formatClaudeEffortLabel("xhigh"), "XHigh");
});

// ── shouldExposeClaudeEffortVariants ─────────────────────────────────────────

test("exposes variants for thinking-capable Claude base models", () => {
  assert.equal(shouldExposeClaudeEffortVariants(mk("claude/claude-fable-5")), true);
  assert.equal(shouldExposeClaudeEffortVariants(mk("claude/claude-opus-4-8")), true);
  assert.equal(shouldExposeClaudeEffortVariants(mk("cc/claude-fable-5")), true);
});

test("adaptive-only models (Fable 5) still get effort variants despite rejecting disabled", () => {
  // Regression guard: the no-thinking gate excludes rejectsThinkingDisabled models,
  // but effort variants must NOT — Fable 5 is adaptive-only yet takes an effort.
  assert.equal(shouldExposeClaudeEffortVariants(mk("claude/claude-fable-5")), true);
});

test("does not expose variants for non-Claude, combos, or non-thinking models", () => {
  assert.equal(shouldExposeClaudeEffortVariants(mk("codex/gpt-5.5")), false);
  assert.equal(shouldExposeClaudeEffortVariants({ id: "x", owned_by: "combo" }), false);
  assert.equal(shouldExposeClaudeEffortVariants(mk("gemini-cli/gemini-3.1-pro-preview")), false);
});

test("never double-synthesizes: already-suffixed or no-think ids are skipped", () => {
  assert.equal(shouldExposeClaudeEffortVariants(mk("claude/claude-fable-5-high")), false);
  assert.equal(shouldExposeClaudeEffortVariants(mk("claude/claude-fable-5-xhigh")), false);
  assert.equal(shouldExposeClaudeEffortVariants(mk("no-think/claude/claude-fable-5")), false);
});

test("non-string / empty / non-object ids never match", () => {
  assert.equal(shouldExposeClaudeEffortVariants(undefined as never), false);
  assert.equal(shouldExposeClaudeEffortVariants({ id: "" }), false);
  assert.equal(shouldExposeClaudeEffortVariants({ id: 42 as never }), false);
});

// ── claudeEffortLevelsFor ────────────────────────────────────────────────────

test("xHigh is added only for models that support it", () => {
  assert.deepEqual(claudeEffortLevelsFor("claude", "claude-fable-5"), [
    "low",
    "medium",
    "high",
    "xhigh",
  ]);
  assert.deepEqual(claudeEffortLevelsFor("claude", "claude-opus-4-8"), [
    "low",
    "medium",
    "high",
    "xhigh",
  ]);
  // Opus 4.6 and Haiku 4.5 are flagged supportsXHighEffort:false in the registry.
  assert.deepEqual(claudeEffortLevelsFor("claude", "claude-opus-4-6"), ["low", "medium", "high"]);
  assert.deepEqual(claudeEffortLevelsFor("claude", "claude-haiku-4-5-20251001"), [
    "low",
    "medium",
    "high",
  ]);
});

// ── appendClaudeEffortVariants ───────────────────────────────────────────────

test("appends effort variant ids + names for eligible models only", () => {
  const out = appendClaudeEffortVariants([mk("claude/claude-fable-5"), mk("codex/gpt-5.5")]);
  const ids = out.map((m) => m.id);
  assert.deepEqual(ids, [
    "claude/claude-fable-5",
    "codex/gpt-5.5",
    "claude/claude-fable-5-low",
    "claude/claude-fable-5-medium",
    "claude/claude-fable-5-high",
    "claude/claude-fable-5-xhigh",
  ]);
  const high = out.find((m) => m.id === "claude/claude-fable-5-high");
  assert.equal(high?.name, "claude-fable-5 (High)");
  // root stays unprefixed — the provider-scoped models route serves it verbatim.
  assert.equal(high?.root, "claude-fable-5-high");
});

test("normalizes the provider prefix (cc → claude) when a canonical map is given", () => {
  const out = appendClaudeEffortVariants([mk("cc/claude-fable-5")], { cc: "claude" });
  const variantIds = out.map((m) => m.id).filter((id) => /-(low|medium|high|xhigh)$/.test(id));
  assert.deepEqual(variantIds, [
    "claude/claude-fable-5-low",
    "claude/claude-fable-5-medium",
    "claude/claude-fable-5-high",
    "claude/claude-fable-5-xhigh",
  ]);
});

test("returns the original array reference when nothing is eligible", () => {
  const input = [mk("codex/gpt-5.5"), mk("gemini-cli/gemini-3.1-pro-preview")];
  const out = appendClaudeEffortVariants(input);
  assert.equal(out, input);
});

test("never generates variants-of-variants when the list already contains effort ids", () => {
  // The catalog calls this once, but even if suffixed ids are already present they
  // must be skipped — no `claude/claude-fable-5-high-high` etc.
  const withVariants = appendClaudeEffortVariants([mk("claude/claude-fable-5")]);
  const again = appendClaudeEffortVariants(withVariants);
  const doubleSuffixed = again
    .map((m) => m.id)
    .filter((id) => /-(low|medium|high|xhigh)-(low|medium|high|xhigh)$/.test(id));
  assert.deepEqual(doubleSuffixed, []);
});
