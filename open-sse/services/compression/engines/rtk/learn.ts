/**
 * RTK learn — R6 / N7
 *
 * Pure function, no I/O.  DB wiring (reading from call_logs) is a follow-up task.
 * Takes an in-memory array of CommandSample values → returns a suggested RTK
 * filter draft in the canonical RtkFilterPack shape (same JSON structure as
 * filters/pip.json, filters/make.json, etc.) so it can be reviewed and saved
 * as a real filter without conversion.
 *
 * Key design decisions
 * ───────────────────
 * 1. Drop threshold: a normalised line template is included in dropPatterns only if
 *    it recurs in ≥ DROP_THRESHOLD_RATIO of samples (default 50 %).  Single-sample
 *    noise is too specific to be useful as a filter rule.
 *
 * 2. Preserve-vs-drop conflict guard: a candidate drop pattern is silently omitted
 *    if it matches ANY line that also matches an error or summary preserve pattern.
 *    This is conservative by design — it's safer to miss a drop than to drop an
 *    important error/summary.
 *
 * 3. Error / summary heuristics (ACON-style):
 *    - errorPatterns: lines whose normalised form contains "error", "err!", "fail",
 *      "warning", "warn", "critical", "exception", "fatal", or "panic".
 *    - summaryPatterns: lines whose normalised form contains "success", "done",
 *      "complete", "built", "added", "installed", "finished", or "passed".
 *
 * 4. The output id/label is derived mechanically from the command string so the
 *    caller can save it directly without rename.
 */

import { discoverRepeatedNoise, discoverNormalizeLine, type CommandSample } from "./discover.ts";

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

/**
 * Suggested filter shape — mirrors the canonical RtkFilterPack JSON structure
 * (id / label / description / category / priority / match / rules / preserve).
 * Re-exported so callers don't need to import from filterSchema.ts.
 */
export interface SuggestedFilter {
  id: string;
  label: string;
  description: string;
  category: "generic";
  priority: number;
  match: {
    outputTypes: string[];
    commands: string[];
    patterns: string[];
  };
  rules: {
    stripAnsi: boolean;
    dropPatterns: string[];
    collapsePatterns: string[];
    includePatterns: string[];
    deduplicate: boolean;
    maxLines: number;
    headLines: number;
    tailLines: number;
    onEmpty: string;
  };
  preserve: {
    errorPatterns: string[];
    summaryPatterns: string[];
  };
  /** Metadata about the learning run — not part of the filter schema but useful for UI review. */
  _meta: {
    learnedFromSamples: number;
    dropThreshold: number;
  };
}

// ---------------------------------------------------------------------------
// Internal constants and helpers
// ---------------------------------------------------------------------------

/**
 * A normalised line template must appear in at least this fraction of samples
 * to be included as a drop pattern.  50 % is conservative — it avoids flagging
 * lines that happen to appear in only a handful of runs.
 */
const DROP_THRESHOLD_RATIO = 0.5;

/**
 * Matched against the RAW (untrimmed) output line, case-insensitive.
 *
 * Error heuristic: lines that strongly signal a failure or warning worth
 * preserving.  "WARN deprecated" (npm deprecation noise) is deliberately
 * excluded — it is structural noise, not an actionable error signal.
 * We match "ERR!" (npm error prefix), "error:" / "error " patterns, etc.
 */
const ERROR_PATTERN =
  /(?:\bERR!|\berror\s*[:/]|\bfailed?\b|\bfailure\b|\bcritical\b|\bexception\b|\bfatal\b|\bpanic\b)/i;

/**
 * Matched against the RAW output line, case-insensitive.
 * Summary heuristic: lines that indicate a successful outcome or final tally.
 */
const SUMMARY_PATTERN =
  /(?:\bsuccess(?:ful(?:ly)?)?\b|\bdone\b|\bcomplete(?:d)?\b|\bbuilt\b|\badded\b|\binstalled\b|\bfinished?\b|\bpassed?\b)/i;

/**
 * Derive a slug-friendly id from a command string, e.g.
 *   "npm install"  → "npm-install"
 *   "pip install"  → "pip-install"
 */
export function commandToId(command: string): string {
  return command
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Build a regex anchor pattern for the command so the filter's match.commands
 * array targets this specific invocation, e.g. "^npm\\s+install\\b".
 */
function commandToMatchPattern(command: string): string {
  const parts = command.trim().split(/\s+/);
  const escaped = parts.map((p) => p.replace(/[$()*+.?[\\\]^{|}]/g, "\\$&"));
  return `^${escaped.join("\\s+")}\\b`;
}

/**
 * Test whether a raw output line (from any sample) is matched by any of the
 * given regex patterns.  Invalid patterns are silently skipped.
 */
function matchesAny(line: string, patterns: string[]): boolean {
  for (const p of patterns) {
    try {
      if (new RegExp(p, "i").test(line)) return true;
    } catch {
      // ignore invalid regex
    }
  }
  return false;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Suggest an RTK filter for `command` based on `samples`.
 *
 * The returned object is a valid RtkFilterPack-shaped draft that can be
 * saved to `open-sse/services/compression/engines/rtk/filters/<id>.json`
 * and loaded by the existing filter loader without modification.
 *
 * No I/O — DB reads are a follow-up concern handled by the caller.
 */
export function suggestFilter(command: string, samples: CommandSample[]): SuggestedFilter {
  const id = commandToId(command) || "unknown";
  const commandPattern = commandToMatchPattern(command);
  const totalSamples = samples.length;

  if (totalSamples === 0) {
    return {
      id: `suggested-${id}`,
      label: command,
      description: `Auto-suggested filter for '${command}' (0 samples — no rules derived).`,
      category: "generic",
      priority: 50,
      match: { outputTypes: [], commands: [commandPattern], patterns: [] },
      rules: {
        stripAnsi: true,
        dropPatterns: [],
        collapsePatterns: [],
        includePatterns: [],
        deduplicate: true,
        maxLines: 200,
        headLines: 30,
        tailLines: 40,
        onEmpty: `${id}: ok`,
      },
      preserve: { errorPatterns: [], summaryPatterns: [] },
      _meta: { learnedFromSamples: 0, dropThreshold: DROP_THRESHOLD_RATIO },
    };
  }

  // ── Step 1: discover recurring noise candidates ──────────────────────────
  const noiseCandidates = discoverRepeatedNoise(samples);
  const dropThresholdHits = Math.max(2, Math.ceil(totalSamples * DROP_THRESHOLD_RATIO));

  // ── Step 2: build error/summary preserve patterns from ALL lines ─────────
  // We scan every line in every sample and collect normalised forms that look
  // like errors or summaries.  Each unique normalised form becomes one pattern.
  const errorNorms = new Set<string>();
  const summaryNorms = new Set<string>();

  for (const sample of samples) {
    for (const raw of sample.output.split(/\r?\n/)) {
      const trimmed = raw.trim();
      if (!trimmed) continue;
      const norm = discoverNormalizeLine(trimmed);
      if (!norm) continue;

      // Classify using the RAW line (before normalisation) so that textual
      // signals like "ERR!" and "added N packages" are not obscured by
      // placeholder substitutions like <CODE>.
      if (ERROR_PATTERN.test(trimmed)) {
        errorNorms.add(norm);
      } else if (SUMMARY_PATTERN.test(trimmed)) {
        summaryNorms.add(norm);
      }
    }
  }

  /**
   * Convert a set of normalised lines into regex patterns (same escaping as
   * normalizedToPattern in discover.ts, but re-implemented here to avoid
   * coupling to the internal helper).
   */
  function normsToPatterns(norms: Set<string>): string[] {
    return Array.from(norms).map((norm) => {
      // Escape regex special chars (< and > are not special, so placeholders survive)
      const escaped = norm.replace(/[$()*+.?[\\\]^{|}]/g, "\\$&");
      const withWildcards = escaped
        .replace(/<N>/g, "[\\S]+")
        .replace(/<PKG>/g, "[\\S]+")
        .replace(/<CODE>/g, "[A-Z][A-Z0-9]+");
      return withWildcards; // no ^ anchor: preserve patterns are substring-matched
    });
  }

  const errorPatterns = normsToPatterns(errorNorms);
  const summaryPatterns = normsToPatterns(summaryNorms);
  const allPreservePatterns = [...errorPatterns, ...summaryPatterns];

  // ── Step 3: filter noise candidates into safe drop patterns ─────────────
  // A candidate is safe to drop only if:
  //   (a) it recurs in >= dropThresholdHits samples, AND
  //   (b) its pattern does NOT match any preserve (error/summary) line from
  //       any sample (conflict guard).
  //
  // To apply the conflict guard we also collect all raw lines matched by
  // preserve patterns, then check each drop candidate against them.

  // Collect every raw line that any preserve pattern would protect.
  const preservedRawLines: string[] = [];
  for (const sample of samples) {
    for (const raw of sample.output.split(/\r?\n/)) {
      const trimmed = raw.trim();
      if (!trimmed) continue;
      if (matchesAny(trimmed, allPreservePatterns)) {
        preservedRawLines.push(trimmed);
      }
    }
  }

  const dropPatterns: string[] = [];
  for (const candidate of noiseCandidates) {
    if (candidate.hits < dropThresholdHits) continue; // below threshold
    // Conflict guard: skip if the drop pattern matches a preserved line
    const conflictsWithPreserve = preservedRawLines.some((line) => {
      try {
        return new RegExp(candidate.pattern, "i").test(line);
      } catch {
        return false;
      }
    });
    if (conflictsWithPreserve) continue;
    dropPatterns.push(candidate.pattern);
  }

  return {
    id: `suggested-${id}`,
    label: command,
    description: `Auto-suggested filter for '${command}' learned from ${totalSamples} sample(s).`,
    category: "generic",
    priority: 50,
    match: { outputTypes: [], commands: [commandPattern], patterns: [] },
    rules: {
      stripAnsi: true,
      dropPatterns,
      collapsePatterns: [],
      includePatterns: [...errorPatterns, ...summaryPatterns],
      deduplicate: true,
      maxLines: 200,
      headLines: 30,
      tailLines: 40,
      onEmpty: `${id}: ok`,
    },
    preserve: { errorPatterns, summaryPatterns },
    _meta: { learnedFromSamples: totalSamples, dropThreshold: DROP_THRESHOLD_RATIO },
  };
}
