/**
 * Selector suffix parsing for local proxy-core endpoints.
 *
 * A `localCoreEndpoint` line may carry a trailing `selector=<tag>` suffix that
 * names the Clash/Mihomo selector group the entry belongs to:
 * `"socks5://127.0.0.1:1080 selector=group-a"`. The suffix is stripped before
 * any URL use (gate/probe/upsert/dedup) and the tag is resolved on the fly —
 * it is never persisted as part of a URL or in a column.
 *
 * Pure and dependency-free: no DB, no fetch, never throws.
 */

/** Tag shape: bounded ASCII word, anti-ReDoS by construction (no nesting). */
export const SELECTOR_TAG_RE = /^[A-Za-z0-9_-]{1,64}$/;

const SELECTOR_SUFFIX_RE = /[ \t]+selector=([^\s]+)[ \t]*$/;

/**
 * Extract the selector tag from a raw endpoint line, or null when the line
 * is pinned (no suffix) or the tag is invalid. Never throws.
 */
export function parseSelectorTag(line: string): string | null {
  try {
    if (typeof line !== "string") return null;
    const m = SELECTOR_SUFFIX_RE.exec(line.trimEnd());
    if (!m) return null;
    const tag = m[1];
    return SELECTOR_TAG_RE.test(tag) ? tag : null;
  } catch {
    return null;
  }
}

/**
 * Remove a VALID trailing `selector=<tag>` suffix, returning the bare URL.
 * Lines without a suffix, or with an invalid tag, come back unchanged (an
 * invalid tag makes the line pinned, never stripped). Never throws.
 */
export function stripSelectorSuffix(line: string): string {
  try {
    if (typeof line !== "string") return line;
    const trimmed = line.trim();
    const m = SELECTOR_SUFFIX_RE.exec(trimmed);
    if (!m) return trimmed === line ? line : trimmed;
    if (!SELECTOR_TAG_RE.test(m[1])) return line;
    return trimmed.slice(0, m.index);
  } catch {
    return line;
  }
}
