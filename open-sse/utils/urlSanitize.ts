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
