/**
 * searchTools — pure lexical scoring over tool names + descriptions.
 *
 * Anti-ReDoS: never compiles `new RegExp(query)`.
 * Uses only `String.prototype.indexOf` loops (same pattern as
 * `src/lib/memory/retrieval.ts::getRelevanceScore`).
 */

export interface ToolCatalogEntry {
  name: string;
  description: string;
  scopes: readonly string[];
  inputSchema?: unknown;
}

export interface ScoredTool {
  name: string;
  description: string;
  scopes: readonly string[];
  inputSchema?: unknown;
  score: number;
}

const NAME_PHRASE_BONUS = 25;
const NAME_TOKEN_BONUS = 6;
const DESC_PHRASE_BONUS = 20;
const DESC_TOKEN_BONUS = 3;
const MIN_LIMIT = 1;
const MAX_LIMIT = 25;

function countOccurrences(haystack: string, needle: string): number {
  if (!needle) return 0;
  let count = 0;
  let pos = 0;
  while ((pos = haystack.indexOf(needle, pos)) !== -1) {
    count++;
    pos += needle.length;
  }
  return count;
}

function scoreEntry(entry: ToolCatalogEntry, normalizedQuery: string, tokens: string[]): number {
  const nameLower = entry.name.toLowerCase();
  const descLower = entry.description.toLowerCase();

  let score = 0;

  // Name scoring (higher weight)
  if (nameLower.includes(normalizedQuery)) {
    score += NAME_PHRASE_BONUS;
  }
  for (const token of tokens) {
    score += countOccurrences(nameLower, token) * NAME_TOKEN_BONUS;
  }

  // Description scoring
  if (descLower.includes(normalizedQuery)) {
    score += DESC_PHRASE_BONUS;
  }
  for (const token of tokens) {
    score += countOccurrences(descLower, token) * DESC_TOKEN_BONUS;
  }

  return score;
}

/**
 * Search tool catalog entries lexically (no RegExp on user input).
 * Returns top-K results ordered by score desc, name asc for ties.
 */
export function searchTools(
  entries: ToolCatalogEntry[],
  query: string,
  limit = 8
): ScoredTool[] {
  const clampedLimit = Math.max(MIN_LIMIT, Math.min(MAX_LIMIT, limit));
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];

  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);

  const scored: ScoredTool[] = [];
  for (const entry of entries) {
    const score = scoreEntry(entry, normalizedQuery, tokens);
    if (score > 0) {
      scored.push({ ...entry, score });
    }
  }

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });

  return scored.slice(0, clampedLimit);
}
