/**
 * The single severity vocabulary RTK uses to decide which lines it must not drop.
 *
 * Before this module the same idea was spelled out in three places, each with a different
 * word list, so a line's survival depended on which layer happened to run:
 *
 *   1. `index.ts::defaultPriorityPatterns` — the engine-level hard-cap priority regex
 *      (`error|failed|exception|traceback|TS\d{4}|FAIL|✖`)
 *   2. `filterSchema.ts::validateRtkFilter` — the filter-level priority set, built from each
 *      filter's `preserve.errorPatterns` / `preserve.summaryPatterns`
 *   3. `rawOutput.ts::isLikelyFailureOutput` — the retention predicate, which already knew
 *      `panic|fatal|critical` and therefore *disagreed with both of the above*: a
 *      `FATAL … rollback required` line was classified a failure worth retaining while RTK
 *      happily truncated it out of the compressed body.
 *
 * The three lists are now derived from this one file, so the vocabulary cannot drift again.
 * Nothing here is new policy — the union is the widest list any layer already carried.
 */

/**
 * Words whose presence marks a line as a diagnostic that must survive truncation.
 *
 * Kept as plain lowercase strings (not one regex) because the three consumers need
 * different shapes: the engine builds a `RegExp`, the filter layer stores pattern strings
 * for per-filter `priorityPatterns`/`keepPatterns` arrays, and the retention predicate
 * tests a whole blob. Matching is case-insensitive everywhere — the callers compile with
 * the `i` flag, and `severityAlternation` documents that contract.
 *
 * Order matters only for readability.
 */
export const SEVERITY_WORDS = [
  // Failure markers present in the original engine regex.
  "error",
  "failed",
  "failure",
  "exception",
  "traceback",
  "fail",
  // Toolchain diagnostics.
  "ts\\d{4}",
  "✖",
  // Terminal states the engine regex was missing entirely: a run that dies outright says
  // FATAL/CRITICAL/SEVERE/PANIC far more often than it says "error".
  "panic",
  "fatal",
  "critical",
  "severe",
  // Resource exhaustion.
  "oomkilled",
  "out of memory",
  // Permission and network failures.
  "denied",
  "timeout",
  "timed out",
  "unreachable",
  "refused",
  // Aborted work and corrupted state.
  "aborted",
  "rollback",
  "corrupt",
  "deadlock",
] as const;

/**
 * The vocabulary as a regex alternation, for callers that compile their own `RegExp`
 * (always with the `i` flag — the words are lowercase on purpose).
 *
 * `\b` is intentionally NOT included: Japanese/Chinese log lines and paths like
 * `…/error.log` have no ASCII word boundary on both sides, and the original engine regex
 * matched them without one. Consumers that want boundaries add them.
 */
export const SEVERITY_ALTERNATION = SEVERITY_WORDS.join("|");

/**
 * Compile the vocabulary into the case-insensitive test regex RTK uses for priority lines
 * and failure classification.
 */
export function severityPattern(): RegExp {
  return new RegExp(SEVERITY_ALTERNATION, "i");
}

/**
 * The same vocabulary wrapped in ASCII word boundaries, for the retention predicate
 * (`rawOutput.ts::isLikelyFailureOutput`), which classifies a whole blob rather than
 * individual lines and therefore wants `\b` on both sides.
 *
 * Kept separate from `severityPattern()` on purpose: the engine's line matcher deliberately
 * has no boundaries (paths and CJK log lines), while this one deliberately has them.
 */
export function severityWordPattern(): RegExp {
  return new RegExp(`\\b(${SEVERITY_ALTERNATION})\\b`, "i");
}

/**
 * The vocabulary as the pattern STRINGS the filter layer stores. Filters keep patterns as
 * strings (they are persisted to `filters.json` and recompiled per request by
 * `lineFilter.ts::compilePatterns`), so they cannot hold a `RegExp` object.
 *
 * `ts\d{4}` is returned with its escape intact; `compilePatterns` applies
 * `cachedRegExp(pattern, "i")`, so a literal backslash-d reaches the compiler as intended.
 */
export function severityPatternStrings(): string[] {
  return [...SEVERITY_WORDS];
}
