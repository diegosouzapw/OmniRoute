import test from "node:test";
import assert from "node:assert/strict";

// Covers getNextFamilyFallback's dot-vs-hyphen notation resolution (the hunk
// added alongside Claude Fable 5 in #3524 that affects ALL families): the
// lookup normalizes dots→hyphens, and each candidate is resolved to the
// notation the provider's registry actually exposes (anthropic uses dot notation
// `claude-opus-4.8`, cc uses hyphen `claude-opus-4-8`). Kiro is NOT used as the
// dot-notation example any more — its upstream never served Opus/Fable and #6170
// removed the fabricated ids; `anthropic` genuinely serves them in dot notation.
const { getNextFamilyFallback } = await import("../../open-sse/services/modelFamilyFallback.ts");

test("Fable 5 falls back to the next-best Opus tier first (not Sonnet) — cc→claude", () => {
  // `cc` is an alias parseModel normalizes to the `claude` provider.
  const next = getNextFamilyFallback("cc/claude-fable-5", new Set(["cc/claude-fable-5"]));
  assert.equal(next, "claude/claude-opus-4-8");
});

test("Fable 5 fallback resolves to anthropic's dot-notation model id", () => {
  // anthropic registry exposes `claude-opus-4.8` (dot), not `claude-opus-4-8`.
  const next = getNextFamilyFallback("anthropic/claude-fable-5", new Set(["anthropic/claude-fable-5"]));
  assert.equal(next, "anthropic/claude-opus-4.8");
});

test("dot-notation current model is normalized for the family lookup", () => {
  // anthropic/claude-opus-4.8 must find the claude-opus-4-8 family entry.
  const next = getNextFamilyFallback("anthropic/claude-opus-4.8", new Set(["anthropic/claude-opus-4.8"]));
  assert.equal(next, "anthropic/claude-opus-4.7");
});

test("skips already-tried candidates and advances down the Fable chain", () => {
  const next = getNextFamilyFallback(
    "cc/claude-fable-5",
    new Set(["cc/claude-fable-5", "claude/claude-opus-4-8"])
  );
  assert.equal(next, "claude/claude-opus-4-7");
});

test("returns null for an unknown family", () => {
  assert.equal(getNextFamilyFallback("cc/not-a-real-model", new Set()), null);
});
