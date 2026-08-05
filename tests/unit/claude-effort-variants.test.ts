import { test } from "node:test";
import assert from "node:assert/strict";

import {
  CLAUDE_EFFORT_VARIANT_LEVELS,
  CLAUDE_XHIGH_EFFORT_LEVEL,
  formatClaudeEffortLabel,
  shouldExposeClaudeEffortVariants,
  isKnownClaudeEffortBaseModel,
  claudeEffortLevelsFor,
  appendClaudeEffortVariants,
} from "../../open-sse/utils/claudeEffortVariants.ts";
import { shouldExposeNoThinkingAlias } from "../../open-sse/utils/noThinkingAlias.ts";
import { appendCcDiscoveryAliases } from "../../open-sse/utils/ccDiscoveryAliases.ts";

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

// ── isKnownClaudeEffortBaseModel ─────────────────────────────────────────────

test("isKnownClaudeEffortBaseModel returns true for a real effort-capable Claude model", () => {
  assert.equal(isKnownClaudeEffortBaseModel("claude-fable-5"), true);
});

test("isKnownClaudeEffortBaseModel returns false for a non-Claude model", () => {
  assert.equal(isKnownClaudeEffortBaseModel("gpt-4o"), false);
});

test("isKnownClaudeEffortBaseModel returns false for an unregistered model id", () => {
  assert.equal(isKnownClaudeEffortBaseModel("totally-unregistered-model-xyz"), false);
});

test("isKnownClaudeEffortBaseModel returns false for a non-Claude model that also supports thinking (SC-1)", () => {
  // gpt-5.5 has supportsThinking:true in MODEL_SPECS (like 36+ other non-Claude models) —
  // the /claude/i name check is the only thing excluding it, not the thinking flag alone.
  assert.equal(isKnownClaudeEffortBaseModel("gpt-5.5"), false);
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

// ── cross-module drift guard: CLAUDE_EFFORT_SUFFIX_RE parity ────────────────
//
// `CLAUDE_EFFORT_SUFFIX_RE` (`/-(?:xhigh|high|medium|low)$/i`) is intentionally
// duplicated as a local, non-exported constant in THREE sibling modules: this
// file's module (claudeEffortVariants.ts), noThinkingAlias.ts, and
// ccDiscoveryAliases.ts. A cross-import consolidation of that constant was
// already proposed and explicitly reverted earlier in this project's review
// cycle — the plan deliberately kept local duplication for these three
// sibling modules (accepted by the Reduction Analyst). This test does NOT
// argue for reversing that decision and must NOT be read as one. Its only
// purpose is a behavioral drift guard: if a future edit changes the effort
// levels recognized by one copy (e.g. adds a new level, or narrows/widens the
// suffix pattern) without updating the other two, this test fails instead of
// the three modules silently disagreeing about which ids carry an
// effort-level suffix.
test("CLAUDE_EFFORT_SUFFIX_RE stays in sync across claudeEffortVariants/noThinkingAlias/ccDiscoveryAliases (drift guard — do not consolidate, see comment above)", () => {
  // Real, registered, thinking-capable Claude model that does NOT reject
  // `thinking:{type:"disabled"}` — satisfies every module's registry-lookup
  // gate identically, so any behavioral difference below is attributable only
  // to the effort-suffix regex, not to some other per-module gating rule.
  const BASE = "claude-opus-4-5";
  const EFFORT_SUFFIXES = ["-low", "-medium", "-high", "-xhigh", "-XHIGH"];
  // Trailing tokens that look suffix-like but must NOT match the regex
  // (anchored to exactly low/medium/high/xhigh at end-of-string).
  const NON_MATCHING_SUFFIXES = ["-max", "-highest"];

  for (const suffix of EFFORT_SUFFIXES) {
    const qualifiedId = `claude/${BASE}${suffix}`;
    assert.equal(
      shouldExposeClaudeEffortVariants(mk(qualifiedId)),
      false,
      `claudeEffortVariants must exclude ${qualifiedId}`
    );
    assert.equal(
      shouldExposeNoThinkingAlias(mk(qualifiedId)),
      false,
      `noThinkingAlias must exclude ${qualifiedId}`
    );
    const mirrored = appendCcDiscoveryAliases(
      [{ id: `cc/${BASE}${suffix}`, owned_by: "cc" }],
      () => true
    );
    assert.equal(
      mirrored.length,
      1,
      `ccDiscoveryAliases must never mirror an effort-suffixed id (${suffix})`
    );
  }

  // Control: the identical base model WITHOUT a suffix must pass all three
  // gates — proves the suffix itself (not something else about the id) is
  // what excluded the cases above.
  assert.equal(shouldExposeClaudeEffortVariants(mk(`claude/${BASE}`)), true);
  assert.equal(shouldExposeNoThinkingAlias(mk(`claude/${BASE}`)), true);
  const baseMirror = appendCcDiscoveryAliases([{ id: `cc/${BASE}`, owned_by: "cc" }], () => true);
  assert.equal(baseMirror.length, 2, "unsuffixed id must still be mirrored");

  // Suffix-like-but-non-matching trailing tokens must NOT be excluded by the
  // regex. This isolates the regex's specificity (exactly xhigh/high/medium/low)
  // from the models-registry prefix-matching gate: `getCanonicalModelSpecId`
  // resolves "claude-opus-4-5-max" back to the "claude-opus-4-5" spec via its
  // prefix-match fallback, so `shouldExposeClaudeEffortVariants` /
  // `shouldExposeNoThinkingAlias` still pass their registry-lookup gate here —
  // any exclusion left could only come from the suffix regex, and there is none.
  for (const suffix of NON_MATCHING_SUFFIXES) {
    const qualifiedId = `claude/${BASE}${suffix}`;
    assert.equal(
      shouldExposeClaudeEffortVariants(mk(qualifiedId)),
      true,
      `claudeEffortVariants must not treat "${suffix}" as an effort suffix`
    );
    assert.equal(
      shouldExposeNoThinkingAlias(mk(qualifiedId)),
      true,
      `noThinkingAlias must not treat "${suffix}" as an effort suffix`
    );
    const mirrored = appendCcDiscoveryAliases(
      [{ id: `cc/${BASE}${suffix}`, owned_by: "cc" }],
      () => true
    );
    assert.equal(
      mirrored.length,
      2,
      `ccDiscoveryAliases must still mirror a non-effort-suffix-looking id ("${suffix}")`
    );
  }
});
