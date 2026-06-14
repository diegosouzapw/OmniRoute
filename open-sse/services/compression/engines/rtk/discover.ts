/**
 * RTK discover — R7 / N7
 *
 * Pure function, no I/O.  DB wiring (reading from call_logs) is a follow-up task.
 * The function takes an in-memory array of CommandSample values so it can be
 * fully unit-tested with synthetic data.
 *
 * Finds line-templates that recur across many samples and are therefore good
 * DROP candidates (high-frequency noise) or PRESERVE candidates (errors/summaries).
 */

import { normalizeLine } from "./grouper.ts";

// ---------------------------------------------------------------------------
// Extended normalization for cross-sample mining
// ---------------------------------------------------------------------------

/**
 * Extends grouper.ts's normalizeLine with additional substitutions relevant
 * for mining command output across many samples:
 *
 *   8. npm/pip package names + versions: `left-pad@1.2.3` → `<PKG>@<N>`
 *      (the grouper replaces the version number but not the package name, so
 *      different packages give different templates — this collapses them).
 *   9. Exit codes and error codes: `E404`, `ENOENT`, `E2BIG` → `<CODE>`
 *  10. Numeric suffixes (time/size): `5s`, `120ms`, `4.2kb` → `<N><SFX>`
 *      collapsed to a single placeholder so "in 5s" and "in 2s" normalise alike.
 *
 * Applies AFTER grouper normalizeLine so all its substitutions are already done.
 */
export function discoverNormalizeLine(line: string): string {
  let s = normalizeLine(line);
  // npm/pip package identifiers with version: word@version → <PKG>@<N>
  // Handles both original (left-pad@1.2.3) and already-normalised (left-pad@<N>)
  s = s.replace(/[\w][\w.-]*@(?:<N>|\d[\w.-]*)/g, "<PKG>@<N>");
  // Error/exit codes like E404, ENOENT, E2BIG, EACCES
  s = s.replace(/\bE[A-Z0-9]{2,}\b/g, "<CODE>");
  // Numeric values with attached units: 5s, 120ms, 4kb, 12MB, 0.5s, etc.
  s = s.replace(/\b\d+(?:\.\d+)?(?:ms|[smhd]|[kmg]b?)\b/gi, "<N>");
  // Also collapse the already-substituted <N> followed by a unit suffix leftover
  s = s.replace(/<N>(?:ms|[smhd]|[kmg]b?)\b/gi, "<N>");
  // Collapse repeated whitespace again after substitutions
  s = s.replace(/\s+/g, " ").trim();
  return s;
}

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

/** A captured command invocation with its combined stdout/stderr text. */
export interface CommandSample {
  /** The command string as typed by the user / agent, e.g. "npm install". */
  command: string;
  /** The full output (stdout + stderr) of that invocation. */
  output: string;
}

/**
 * A recurring line-template surfaced by discoverRepeatedNoise.
 * The `pattern` is a regex-compatible string derived from the normalised line.
 */
export interface NoiseCandidate {
  /** A regex-compatible string matching the recurring line template. */
  pattern: string;
  /** Number of samples in which this normalised pattern appeared at least once. */
  hits: number;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Convert a normalised line (with <N> placeholders) to a regex pattern that
 * is safe to use in `new RegExp(pattern, "i")`.
 *
 * Strategy:
 *   1. Escape all regex special chars in the normalised form.
 *   2. Replace the literal placeholder `<N>` (already normalised) with `[\S]+`
 *      so the pattern matches the volatile fragments in real lines.
 *   3. Anchor loosely with a leading `^` so it matches from the start of a line
 *      (RTK dropPatterns are matched line-by-line via a startsWith / ^-anchored regex).
 */
function normalizedToPattern(normalised: string): string {
  // Escape regex special chars (< and > are not special, so placeholders survive intact)
  const escaped = normalised.replace(/[$()*+.?[\\\]^{|}]/g, "\\$&");
  // Replace placeholder tokens with wildcard regex fragments
  const withWildcards = escaped
    .replace(/<N>/g, "[\\S]+")
    .replace(/<PKG>/g, "[\\S]+")
    .replace(/<CODE>/g, "[A-Z][A-Z0-9]+");
  return `^${withWildcards}`;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Scan a set of command output samples and return a ranked list of line-templates
 * that appear frequently enough to be useful DROP candidates.
 *
 * Only templates that appear in MORE THAN ONE sample are included (single-occurrence
 * lines are noise-specific, not structural noise).  Results are sorted descending
 * by hit count.
 *
 * No I/O — pass samples from any source (DB, fixtures, user input).
 */
export function discoverRepeatedNoise(samples: CommandSample[]): NoiseCandidate[] {
  if (samples.length === 0) return [];

  // Count how many samples contain each normalised line (at least once per sample).
  const hitsBySample = new Map<string, Set<number>>();

  for (let i = 0; i < samples.length; i++) {
    const lines = samples[i].output.split(/\r?\n/);
    const seenInThisSample = new Set<string>();

    for (const raw of lines) {
      const trimmed = raw.trim();
      if (trimmed.length === 0) continue;
      const norm = discoverNormalizeLine(trimmed);
      if (norm.length === 0) continue;
      if (seenInThisSample.has(norm)) continue; // count each normalised form once per sample
      seenInThisSample.add(norm);

      if (!hitsBySample.has(norm)) {
        hitsBySample.set(norm, new Set());
      }
      hitsBySample.get(norm)!.add(i);
    }
  }

  const candidates: NoiseCandidate[] = [];
  for (const [norm, sampleSet] of hitsBySample) {
    if (sampleSet.size <= 1) continue; // must appear in more than one sample
    candidates.push({
      pattern: normalizedToPattern(norm),
      hits: sampleSet.size,
    });
  }

  // Sort descending by hits, then alphabetically for deterministic output
  candidates.sort((a, b) => b.hits - a.hits || a.pattern.localeCompare(b.pattern));
  return candidates;
}
