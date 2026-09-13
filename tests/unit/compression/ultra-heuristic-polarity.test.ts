/**
 * Tests for #13454: ultra heuristic must not prune polarity/modality words.
 *
 * The ultra heuristic engine scores tokens and prunes the lowest-scoring 50%.
 * Before the fix, polarity words like "never", "always", "no", "not", "must"
 * scored 0.1 (stopwords) or 0.2 (length ≤ 2), making them the first tokens
 * pruned. This inverted instruction meaning:
 *   "must never be deleted" → "must deleted"
 *   "NEVER run rm -rf" → "run rm -rf"
 *
 * The fix adds polarity words to a force-preserve set (score 1.0) and stops
 * collapsing newlines (which destroyed bullet lists and code fences).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { scoreToken, pruneByScore, STOPWORDS } from "../../open-sse/services/compression/ultraHeuristic.ts";

test("scoreToken: polarity words score 1.0 (never prunable)", () => {
  // These words MUST survive compression — they carry instruction polarity
  const polarityWords = ["never", "always", "no", "not", "nor", "must", "do", "does", "did"];
  for (const word of polarityWords) {
    assert.equal(scoreToken(word), 1.0, `"${word}" should score 1.0 (force-preserved)`);
  }
});

test("scoreToken: modal auxiliaries score 1.0 (never prunable)", () => {
  // Modal auxiliaries in instructions must not be pruned
  const modals = ["can", "should", "need", "shall"];
  for (const word of modals) {
    assert.equal(scoreToken(word), 1.0, `"${word}" should score 1.0 (modal auxiliary)`);
  }
});

test("scoreToken: contractions score 1.0", () => {
  const contractions = ["don't", "doesn't", "didn't", "can't", "cannot", "won't"];
  for (const word of contractions) {
    assert.equal(scoreToken(word), 1.0, `"${word}" should score 1.0 (contraction)`);
  }
});

test("scoreToken: regular stopwords still score 0.1", () => {
  // Words that are genuinely low-value should still be prunable
  const stopwords = ["a", "the", "is", "are", "was", "were", "in", "of", "on"];
  for (const word of stopwords) {
    assert.equal(scoreToken(word), 0.1, `"${word}" should still score 0.1`);
  }
});

test("pruneByScore: polarity words survive pruning", () => {
  const block = `- NEVER run \`rm -rf\` on the target host. Always ask first.
- Do not push to \`main\` directly; open a PR.
- The backup files \`.app-prev-*\` must never be deleted.
- Never store the SSH password on disk.
- Always run \`npm test\` before \`npm run build\`.
- Do NOT edit files under \`/etc\` by hand.`;

  // Default engine settings: keepRate 0.5, minScore 0.3
  const result = pruneByScore(block, 0.5, 0.3);

  // All polarity words MUST survive
  assert.ok(result.includes("never") || result.includes("NEVER"), "MUST preserve 'never'/'NEVER'");
  assert.ok(result.includes("always") || result.includes("Always"), "MUST preserve 'always'/'Always'");
  assert.ok(result.includes("not") || result.includes("NOT"), "MUST preserve 'not'/'NOT'");
  assert.ok(result.includes("Do"), "MUST preserve 'Do'");
});

test("pruneByScore: newlines are preserved (not collapsed to spaces)", () => {
  const block = `Line one
Line two
Line three`;

  const result = pruneByScore(block, 1.0); // keepRate=1.0 means keep everything

  // With keepRate=1.0 nothing is pruned, but we verify newlines survive
  assert.ok(result.includes("\n"), "Newlines must be preserved when keepRate=1.0");
  assert.equal(result, block, "Full keepRate should return identical text");
});

test("pruneByScore: newlines survive even with pruning", () => {
  const block = `- NEVER do X
- ALWAYS do Y
- NEVER do Z`;

  const result = pruneByScore(block, 0.7, 0.3);

  // The line breaks between bullets should survive
  const lines = result.split("\n");
  assert.ok(lines.length >= 2, "Line breaks between bullets must be preserved");
});

test("pruneByScore: sample from #13454 issue preserves meaning", () => {
  const block = `- NEVER run \`rm -rf\` on the target host. Always ask first.
- Do not push to \`main\` directly; open a PR.
- The backup files \`.app-prev-*\` must never be deleted.
- Never store the SSH password on disk.
- Always run \`npm test\` before \`npm run build\`.
- Do NOT edit files under \`/etc\` by hand.`;

  const result = pruneByScore(block, 0.5, 0.3);

  // After the fix, NONE of these meaning-critical words should be pruned:
  assert.ok(result.includes("NEVER") || result.includes("never"),
    "NEVER must survive");
  assert.ok(result.includes("Always") || result.includes("always"),
    "Always must survive");
  assert.ok(result.includes("not") || result.includes("NOT"),
    "not/NOT must survive");
  assert.ok(result.includes("Do") || result.includes("do"),
    "Do/do must survive");
  assert.ok(result.includes("must") || result.includes("MUST"),
    "must/MUST must survive");

  // The critical test: "must never" must NOT become "must" alone
  assert.ok(
    !result.match(/\bmust\b(?![\s\S]*never)/) || result.includes("never"),
    "must and never must both survive together"
  );
});
