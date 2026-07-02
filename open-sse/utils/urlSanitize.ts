/**
 * Strip trailing slash characters from a string without using a regex
 * quantifier on uncontrolled input (avoids CodeQL `js/polynomial-redos`).
 *
 * Equivalent to `value.replace(/\/+$/, "")` but runs in O(n) guaranteed
 * time with no backtracking risk.
 */
export function stripTrailingSlashes(value: string): string {
  let end = value.length;
  while (end > 0 && value.charCodeAt(end - 1) === 0x2f /* '/' */) {
    end--;
  }
  return end === value.length ? value : value.slice(0, end);
}

/**
 * Normalize a base URL by trimming whitespace and stripping trailing slashes.
 * Handles non-string inputs gracefully (returns empty string).
 * Single source of truth — replaces per-file inline copies in config/*.ts.
 */
export function normalizeBaseUrl(value: string | null | undefined): string {
  const str = typeof value === "string" ? value : "";
  return stripTrailingSlashes(str.trim());
}
