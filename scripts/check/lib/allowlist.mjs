#!/usr/bin/env node
// scripts/check/lib/allowlist.mjs
// Shared helper for stale-allowlist enforcement (6A.3).
//
// Purpose: detect allowlist entries that no longer correspond to any live
// violation. When a developer fixes a violation, the entry in KNOWN_* must
// also be removed — otherwise the gate silently allows the violation to
// regress. This pattern is validated practice (ESLint --report-unused-disable-
// directives; Notion suppression hygiene).

/**
 * Returns the subset of `allowlist` entries that do NOT appear in
 * `liveViolations`. These are "stale" entries — the violation they once
 * suppressed has been corrected, so the entry should be removed to prevent
 * silent regression.
 *
 * @param {string[] | Set<string>} allowlist  - The known-violations list/set.
 * @param {string[] | Set<string>} liveViolations - Violations detected in the
 *   current run (strings as they appear in the allowlist).
 * @param {string} gateName - Gate name used only in future error messages; not
 *   used internally by this function but kept for API consistency with
 *   assertNoStale.
 * @returns {string[]} Stale entries (present in allowlist, absent in live).
 */
export function reportStaleEntries(allowlist, liveViolations, gateName) {
  const liveSet = liveViolations instanceof Set ? liveViolations : new Set(liveViolations);
  const stale = [];
  for (const entry of allowlist) {
    if (!liveSet.has(entry)) {
      stale.push(entry);
    }
  }
  return stale;
}

/**
 * Calls reportStaleEntries; if any stale entries are found, logs them to
 * stderr and sets process.exitCode = 1 so the gate fails without throwing
 * (allowing multiple gates to report before the process exits).
 *
 * @param {string[] | Set<string>} allowlist
 * @param {string[] | Set<string>} liveViolations
 * @param {string} gateName - Shown in the error message to identify the gate.
 * @returns {string[]} The same stale array returned by reportStaleEntries.
 */
export function assertNoStale(allowlist, liveViolations, gateName) {
  const stale = reportStaleEntries(allowlist, liveViolations, gateName);
  if (stale.length > 0) {
    console.error(
      `[${gateName}] ${stale.length} entrada(s) obsoleta(s) na allowlist ` +
        `— a violação foi corrigida; REMOVA a entrada para travar a correção:\n` +
        stale.map((e) => `  ✗ ${e}`).join("\n")
    );
    process.exitCode = 1;
  }
  return stale;
}
