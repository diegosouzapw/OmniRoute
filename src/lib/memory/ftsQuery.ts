/**
 * Sanitize a free-text query into an FTS5 MATCH expression.
 * Strips FTS5 syntax characters (?, !, ", *, :, parentheses, brackets, etc.)
 * and quotes each whitespace-separated term so natural-language queries with
 * punctuation don't raise "fts5: syntax error" from SQLite.
 */
export function toFts5MatchQuery(query: string): string {
  const terms = query
    .split(/\s+/)
    .map((term) => term.replace(/["*():\[\]{}!?\^~+.-]/g, ""))
    .filter((term) => term.length > 0);
  if (terms.length === 0) return '""';
  return terms.map((term) => `"${term}"`).join(" AND ");
}
