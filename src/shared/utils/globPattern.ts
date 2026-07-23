/**
 * Shared glob → RegExp conversion.
 *
 * Extracted from `src/lib/db/modelComboMappings.ts` (#6540) so client-side
 * code (which cannot import that module — it pulls in `getDbInstance` /
 * server-only DB wiring) can reuse the exact same pattern-matching semantics
 * instead of duplicating the regex-building logic (the repo's ReDoS
 * convention warns against duplicated ad-hoc regex construction).
 */

/**
 * Convert a simple glob pattern to a RegExp.
 * Supports `*` (any characters) and `?` (single character).
 * Case-insensitive matching. Bounded, non-catastrophic-backtracking: all
 * regex specials are escaped before the glob wildcards are substituted, so
 * there is no nested-quantifier construction.
 */
export function globToRegex(pattern: string): RegExp {
  const escaped = pattern
    .replace(/[.+^${}()|[\]\\]/g, "\\$&") // escape regex specials
    .replace(/\*/g, ".*") // * → .*
    .replace(/\?/g, "."); // ? → .
  return new RegExp(`^${escaped}$`, "i");
}
