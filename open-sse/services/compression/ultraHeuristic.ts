/**
 * Ultra Compression — Tier A Heuristic Token Pruner (Phase 4)
 *
 * Scores tokens by information density and prunes low-value tokens
 * to achieve a target compression rate.
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
  "will",
  "would",
  "could",
  "may",
  "might",
  "shall",
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
  "often",
  "usually",
  "sometimes",
  "here",
  "there",
]);

// #13454: Polarity / modality words that carry the constraint of an instruction.
// Dropping them inverts meaning ("never delete" → "delete"), which is worse
// than not compressing at all.  Scored 1.0 like FORCE_PRESERVE_RE tokens.
export const POLARITY_WORDS = new Set([
  "never", "always", "no", "not", "nor",
  "do", "does", "did", "don't", "doesn't", "didn't",
  "should", "shouldn't",
  "can", "cannot", "can't",
  "must", "mustn't",
  "need", "needs", "needed",
  "shall", "shallnot",
  "won't", "wouldn't", "couldn't", "maynot", "mightnot",
]);

/** Regex for tokens that must never be pruned */
export const FORCE_PRESERVE_RE = /\d|https?:\/\/|[._\/\\]|Error:|Exception:|```/i;

// #13454: Combined polarity + force-preserve check.  Called before the STOPWORDS
// lookup so polarity words always score 1.0 regardless of length.
const POLARITY_RE = /^(?:never|always|no|not|nor|do(?:es(?:n't)?|n't)?|did(?:n't)?|should(?:n't)?|can(?:not|'t)?|must(?:n't)?|ne(?:ed(?:s|ed)?|n't)|shall(?:not)?|won't|wouldn't|couldn't|shouldn't|didn't|doesn't|don't|can't|mustn't|needn't|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't)$/i;

/**
 * Score a single token (word/symbol) for information value.
 * Returns 0.0 (prune candidate) to 1.0 (must keep).
 */
export function scoreToken(token: string): number {
  if (FORCE_PRESERVE_RE.test(token)) return 1.0;
  // #13454: polarity / modality words must never be pruned — dropping them
  // inverts the instruction ("never delete" → "delete").
  if (POLARITY_RE.test(token)) return 1.0;
  const lower = token.toLowerCase();
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
    .replace(/[ \t]{2,}/g, " ")
    .replace(/ \n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
