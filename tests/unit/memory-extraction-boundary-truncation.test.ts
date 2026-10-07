import test from "node:test";
import assert from "node:assert/strict";

const { extractFactsFromText } = await import("../../src/lib/memory/extraction.ts");

// ─── sanitizeMatch (via extractFactsFromText): word/sentence boundary cuts ──

test("sanitizeMatch: long match is cut at a word boundary, not mid-word", () => {
  const words = "lorem ".repeat(120); // well over 500 chars, plenty of spaces
  const facts = extractFactsFromText(`I prefer ${words}.`);
  const pref = facts.find((f) => f.category === "preference");
  assert.ok(pref, "Should extract a preference fact");
  assert.ok(pref.content.length <= 500, "Content should be capped at 500 chars");
  // Source is "lorem " repeated, so a clean word-boundary cut must always end
  // exactly on a full "lorem" token, never a truncated fragment like "lore".
  assert.ok(
    pref.content.endsWith("lorem"),
    `Cut should land on a word boundary, got: "${pref.content.slice(-10)}"`
  );
});

test("sanitizeMatch: prefers cutting at sentence-ending punctuation near the limit", () => {
  // The capture group patterns exclude "." and "," (they stop the match), so
  // the only sentence-ending punctuation that can appear mid-match is "!"/"?".
  // Place one just before the 500-char cap, with more content past the cap.
  const before = "a".repeat(490);
  const after = "b".repeat(50);
  const raw = `${before}! ${after}`;
  const facts = extractFactsFromText(`I prefer ${raw}`);
  const pref = facts.find((f) => f.category === "preference");
  assert.ok(pref);
  assert.ok(
    pref.content.endsWith("!"),
    `Expected a sentence-boundary cut, got: "${pref.content.slice(-30)}"`
  );
});

test("sanitizeMatch: short content is left untouched", () => {
  const facts = extractFactsFromText("I prefer dark mode in my editor.");
  const pref = facts.find((f) => f.category === "preference");
  assert.ok(pref);
  assert.equal(pref.content, "dark mode in my editor");
});

test("sanitizeMatch: falls back to a hard cut when no boundary exists in the lookback window", () => {
  const noBoundary = "a".repeat(600); // no whitespace/punctuation anywhere
  const facts = extractFactsFromText(`I prefer ${noBoundary}.`);
  const pref = facts.find((f) => f.category === "preference");
  assert.ok(pref);
  assert.ok(pref.content.length <= 500);
  assert.ok(/^a+$/.test(pref.content), "Should still cap even with no boundary available");
});

// ─── capExtractionText (via extractFactsFromText tail-scan behavior) ───────

test("extractFactsFromText: capExtractionText does not truncate the kept tail mid-word", () => {
  // Push the "I prefer" match itself to straddle the 64KB tail-cut boundary.
  const padding = "x ".repeat(40000); // > 64KB of padding before the real fact
  const text = `${padding}I prefer boundary-safe-editor for daily work.`;
  const facts = extractFactsFromText(text);
  const pref = facts.find((f) => f.category === "preference");
  assert.ok(pref, "Fact near the tail boundary should still be extracted intact");
  assert.ok(pref.content.includes("boundary-safe-editor"));
});

test("extractFactsFromText: capExtractionText leaves text under the limit untouched", () => {
  const facts = extractFactsFromText("I prefer short text under the cap.");
  const pref = facts.find((f) => f.category === "preference");
  assert.ok(pref);
  assert.ok(pref.content.includes("short text under the cap"));
});
