/**
 * FTS5 query sanitization.
 *
 * Binding a search term as a parameter (`... MATCH ?`) protects against SQL
 * injection, but NOT against FTS5's own query grammar: the bound value is still
 * parsed as a match expression. So a user typing `foo"`, `*`, `NEAR/`, `^x`,
 * `a OR b` or `col:` gets a syntax error thrown out of SQLite (surfaced as a
 * failed search) or an unintended query shape — no escaping helper existed for
 * this before, while `copilot/codegraphKnowledge.ts:140` solved it locally by
 * stripping every non-alphanumeric character.
 *
 * This module generalises that fix so every `MATCH ?` call site can share it.
 * See docs/security — treat any user-supplied search text as untrusted input
 * that must be bounded and escaped before it reaches a query.
 */

/** Longest search string we will hand to FTS5. Longer input is truncated. */
export const MAX_FTS_QUERY_LENGTH = 512;

/** Most terms we will keep from one query, to bound match cost. */
export const MAX_FTS_TERMS = 32;

/**
 * Escape one token as an FTS5 *string* literal.
 *
 * FTS5 treats a double-quoted run as a literal string, and an embedded `"` is
 * escaped by doubling it — the same convention as SQL string literals. Quoting
 * each token neutralises every operator character (`*`, `:`, `^`, `(`, `)`,
 * `-`, `NEAR`, `AND`, `OR`, `NOT`) without discarding the user's actual text,
 * which is what a strip-based approach loses.
 */
function quoteFtsToken(token: string): string {
  return `"${token.replace(/"/g, '""')}"`;
}

/**
 * Convert arbitrary user input into a safe FTS5 MATCH expression.
 *
 * Returns `null` when nothing searchable survives — callers MUST treat that as
 * "no query" (skip the FTS branch / return no rows) rather than passing an
 * empty string to MATCH, which is itself a syntax error.
 *
 * @param raw       user-supplied search text
 * @param options.prefix  append `*` to the final token for prefix search
 */
export function sanitizeFtsQuery(raw: unknown, options: { prefix?: boolean } = {}): string | null {
  if (typeof raw !== "string") return null;

  // Bound the input before any per-character work.
  const bounded = raw.slice(0, MAX_FTS_QUERY_LENGTH);

  // Split on whitespace and on characters FTS5 treats structurally. Keeping
  // word characters (including unicode letters/digits) preserves real search
  // terms; everything else is a separator.
  const tokens = bounded
    .split(/[^\p{L}\p{N}_]+/u)
    .filter((t) => t.length > 0)
    .slice(0, MAX_FTS_TERMS);

  if (tokens.length === 0) return null;

  const quoted = tokens.map(quoteFtsToken);

  if (options.prefix && quoted.length > 0) {
    // A prefix `*` must sit OUTSIDE the closing quote to apply to the token.
    quoted[quoted.length - 1] = `${quoted[quoted.length - 1]}*`;
  }

  return quoted.join(" ");
}

/**
 * True when the input yields nothing searchable, so callers can branch before
 * building SQL at all.
 */
export function isEmptyFtsQuery(raw: unknown): boolean {
  return sanitizeFtsQuery(raw) === null;
}
