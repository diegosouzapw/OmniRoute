/**
 * #13454 — Ultra heuristic prunes negations/absolutes and collapses newlines,
 * inverting instructions. Before the fix, polarity words (never, always, no,
 * do, should, etc.) were in STOPWORDS (score 0.1) or short-token bucket (0.2),
 * both below the default 0.3 threshold. Also, pruneByScore collapsed all
 * whitespace including newlines via /\s{2,}/g.
 *
 * The fix removes polarity words from STOPWORDS, adds POLARITY_RE (score 1.0),
 * and changes the whitespace collapse to only compress spaces/tabs, not newlines.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { scoreToken, pruneByScore, STOPWORDS, POLARITY_WORDS } = await import(
  "../../open-sse/services/compression/ultraHeuristic.ts"
);

test("#13454 polarity words are not in STOPWORDS", () => {
  for (const word of ["never", "always", "no", "do", "does", "did", "should", "can", "need", "nor"]) {
    assert.ok(!STOPWORDS.has(word), `"${word}" must not be in STOPWORDS (polarity word)`);
  }
});

test("#13454 polarity words score 1.0 (must never be pruned)", () => {
  for (const word of ["never", "always", "no", "not", "nor", "do", "does", "did",
    "should", "can", "must", "need", "don't", "doesn't", "can't", "mustn't", "won't"]) {
    const score = scoreToken(word);
    assert.equal(score, 1.0, `"${word}" must score 1.0, got ${score}`);
  }
});

test("#13454 pruneByScore keeps all negation words in the sample", () => {
  const block = `- NEVER run \`rm -rf\` on the target host. Always ask first.
- Do not push to \`main\` directly; open a PR.
- The backup files \`.app-prev-*\` must never be deleted.
- Never store the SSH password on disk.
- Always run \`npm test\` before \`npm run build\`.
- Do NOT edit files under \`/etc\` by hand.`;

  const result = pruneByScore(block, 0.5, 0.3);

  // All polarity words must survive
  for (const word of ["NEVER", "Always", "never", "Never", "Always", "NOT"]) {
    assert.ok(
      result.includes(word),
      `polarity word "${word}" must survive pruning, got: ${result.slice(0, 200)}`
    );
  }
});

test("#13454 pruneByScore preserves newlines (bullet lists stay as lines)", () => {
  const block = `- NEVER run \`rm -rf\` on the target host.
- Do not push to \`main\` directly.
- Always run \`npm test\` before \`npm run build\`.`;

  const result = pruneByScore(block, 0.5, 0.3);

  // Must contain at least 2 newlines (3 lines → at least 2 separators)
  const newlineCount = (result.match(/\n/g) || []).length;
  assert.ok(
    newlineCount >= 2,
    `expected at least 2 newlines in result, got ${newlineCount}: ${result.slice(0, 200)}`
  );
});

test("#13454 basic stopwords still score low (pruning still works for filler)", () => {
  // Common filler words should still be prunable
  assert.equal(scoreToken("the"), 0.1);
  assert.equal(scoreToken("a"), 0.1);
  assert.equal(scoreToken("is"), 0.1);
  assert.equal(scoreToken("are"), 0.1);
});
