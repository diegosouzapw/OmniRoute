import type { RelevanceConfig } from "../../types.ts";

const BOILERPLATE_TOKENS = new Set([
  "please",
  "note",
  "important",
  "indeed",
  "certainly",
  "basically",
  "essentially",
  "obviously",
  "clearly",
  "simply",
  "just",
  "really",
  "actually",
  "honestly",
  "conclusion",
  "summary",
  "hope",
  "understand",
  "thing",
  "things",
  "something",
]);

function tokenize(text: string): string[] {
  const lower = text.toLowerCase();
  const tokens: string[] = [];
  let start = -1;
  for (let i = 0; i <= lower.length; i++) {
    const ch = i < lower.length ? lower.charCodeAt(i) : -1;
    const isAlnum =
      ch !== -1 &&
      ((ch >= 97 && ch <= 122) || (ch >= 48 && ch <= 57));
    if (isAlnum) {
      if (start === -1) start = i;
    } else {
      if (start !== -1) {
        tokens.push(lower.slice(start, i));
        start = -1;
      }
    }
  }
  return tokens;
}

function jaccard(setA: Set<string>, setB: Set<string>): number {
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const t of setA) {
    if (setB.has(t)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function boilerplateScore(tokens: string[]): number {
  if (tokens.length === 0) return 0;
  let count = 0;
  for (const t of tokens) {
    if (BOILERPLATE_TOKENS.has(t)) count++;
  }
  return count / tokens.length;
}

export function scoreSentences(
  sentences: string[],
  query: string,
  cfg: RelevanceConfig
): number[] {
  if (sentences.length === 0) return [];
  if (!query || query.trim().length === 0) return sentences.map(() => 0);

  const queryTokens = new Set(tokenize(query));

  return sentences.map((sentence) => {
    const sentTokens = tokenize(sentence);
    if (sentTokens.length === 0) return 0;
    const sentSet = new Set(sentTokens);
    const overlap = jaccard(sentSet, queryTokens);
    const boilerplate = boilerplateScore(sentTokens) * cfg.boilerplateWeight;
    return Math.max(0, overlap - boilerplate);
  });
}
