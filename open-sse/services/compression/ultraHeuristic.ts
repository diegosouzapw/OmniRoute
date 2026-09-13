/**
 * Ultra Compression — Tier A Heuristic Token Pruner (Phase 4)
 *
 * Scores tokens by information density and prunes low-value tokens
 * to achieve a target compression rate.
 *
 * #13454: Polarity/modality words (never, always, no, not, must, etc.) must
 * NOT be prunable — dropping them flips the meaning of the sentence.
 * "must never be deleted" → "must deleted" is worse than no compression.
 */

export const STOPWORDS = new Set([
  "a",
  "an",
  "the",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  // #13454: "do/does/did" removed — carry polarity in imperatives
  // ("do not push") and negations ("don't"). Dropping them flips
  // instruction meaning.
  "will",
  "would",
  "could",
  // #13454: "should" removed — modality word in instructions.
  "may",
  "might",
  "shall",
  // #13454: "can/need" removed — modal auxiliaries in instructions.
  "dare",
  "ought",
  "used",
  "i",
  "we",
  "you",
  "he",
  "she",
  "it",
  "they",
  "me",
  "us",
  "him",
  "her",
  "them",
  "my",
  "our",
  "your",
  "his",
  "its",
  "their",
  "this",
  "that",
  "these",
  "those",
  "and",
  "but",
  "or",
  // #13454: "nor" removed — negation word.
  "for",
  "yet",
  "so",
  "as",
  "at",
  "by",
  "in",
  "of",
  "on",
  "to",
  "up",
  "via",
  "with",
  "from",
  "into",
  "onto",
  "upon",
  "about",
  "just",
  "very",
  "really",
  "quite",
  "rather",
  "also",
  "too",
  "even",
  "still",
  "already",
  // #13454: "always/never" removed — polarity words, highest-value tokens
  // in instructions. "never" → score 0.1 was the root cause of #13454.
  "often",
  "usually",
  "sometimes",
  "here",
  "there",
]);

/** Regex for tokens that must never be pruned */
export const FORCE_PRESERVE_RE = /\d|https?:\/\/|[._\/\\]|Error:|Exception:|```/i;

// #13454: Polarity, modality, and negation words that must never be pruned.
// Dropping these flips the meaning of the sentence they appear in.
const POLARITY_WORDS = new Set([
  "never", "always", "no", "not", "nor",
  "must", "shall", "shall not",
  "do", "does", "did",
  "don't", "doesn't", "didn't",
  "can", "cannot", "can't",
  "should", "shouldn't",
  "need", "needs", "mustn't",
  "won't", "wouldn't",
  "could", "couldn't",
]);

/**
 * Score a single token (word/symbol) for information value.
 * Returns 0.0 (prune candidate) to 1.0 (must keep).
 */
export function scoreToken(token: string): number {
  if (FORCE_PRESERVE_RE.test(token)) return 1.0;
  const lower = token.toLowerCase();
  // #13454: polarity words always score 1.0 — never prunable
  if (POLARITY_WORDS.has(lower)) return 1.0;
  if (STOPWORDS.has(lower)) return 0.1;
  if (token.length <= 2) return 0.2;
  if (/^[A-Z]/.test(token)) return 0.8; // proper nouns / identifiers
  if (token.length >= 6) return 0.7;
  return 0.5;
}

/**
 * Prune tokens from text to achieve target keep rate.
 * @param text - input text
 * @param keepRate - fraction of tokens to keep (0–1), default 0.5
 * @param minScore - tokens below this score are pruning candidates
 */
export function pruneByScore(text: string, keepRate = 0.5, minScore = 0.3): string {
  if (!text || keepRate >= 1) return text;

  const tokens = text.split(/(\s+)/); // preserve whitespace tokens
  const wordTokens = tokens.filter((t) => !/^\s+$/.test(t));
  const targetKeep = Math.ceil(wordTokens.length * keepRate);

  // Score each word token
  const scored = wordTokens.map((t, i) => ({ t, i, score: scoreToken(t) }));

  // Sort by score ascending — lowest scores pruned first
  const sorted = [...scored].sort((a, b) => a.score - b.score);
  const toPrune = new Set<number>();
  let pruned = 0;
  for (const { i, score } of sorted) {
    if (pruned >= wordTokens.length - targetKeep) break;
    if (score < minScore) {
      toPrune.add(i);
      pruned++;
    }
  }

  // Rebuild preserving whitespace
  let wordIdx = 0;
  return tokens
    .map((t) => {
      if (/^\s+$/.test(t)) return t;
      const keep = !toPrune.has(wordIdx);
      wordIdx++;
      return keep ? t : "";
    })
    .join("")
    // #13454: Only collapse spaces/tabs, NOT newlines.
    // Collapsing newlines destroys bullet lists, headings, and code fences.
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}
