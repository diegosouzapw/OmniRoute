/**
 * RTK Grouping strategy (R5).
 *
 * Collapses consecutive "near-equivalent" lines — lines that normalise to the
 * same canonical form after stripping volatile bits (digits, hex ids,
 * timestamps) — into a single representative line plus a count marker:
 *
 *   <representative line> [rtk:grouped ×N]
 *
 * Only consecutive runs of length ≥ threshold are collapsed (default: 3).
 * Non-similar lines are passed through unchanged.
 */

export interface GroupingOptions {
  /** Minimum run length to trigger grouping (default: 3). */
  threshold?: number;
}

export interface GroupingResult {
  text: string;
  /** Total number of lines that were removed by grouping. */
  grouped: number;
}

/**
 * Normalise a line so that volatile bits (numbers, hex ids, timestamps) are
 * replaced with a stable placeholder.  Two lines that normalise to the same
 * string are considered "similar" and can be grouped.
 *
 * Normalisation steps (order matters — broadest patterns first):
 * 1. Strip ISO-8601-style timestamps:  2024-01-15T10:30:00Z
 * 2. Strip date-time in brackets:       [2024-01-01 10:00:00]
 * 3. Replace hex strings (6-40 chars):  a1b2c3d4e5f6
 * 4. Replace standalone integers:       42
 * 5. Replace semantic-version tokens:   v1.2.3
 * 6. Collapse repeated whitespace.
 * 7. Trim.
 *
 * The placeholder token is the literal string `<N>` which is unlikely to
 * appear in real output.
 */
export function normalizeLine(line: string): string {
  let s = line;
  // ISO timestamps like 2024-01-15T10:30:00.123Z or 2024-01-15 10:30:00
  s = s.replace(/\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?/g, "<N>");
  // Bracketed date+time like [2024-01-01 10:00:00]
  s = s.replace(/\[\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\]/g, "[<N>]");
  // Hex ids: 6-40 hex chars (not preceded/followed by word char to avoid over-matching)
  s = s.replace(/\b[0-9a-fA-F]{6,40}\b/g, "<N>");
  // Semantic version tokens like v1.2.3 or 1.2.3
  s = s.replace(/\bv?\d+\.\d+\.\d+(?:\.\d+)*\b/g, "<N>");
  // Standalone integers (whole word)
  s = s.replace(/\b\d+\b/g, "<N>");
  // Collapse repeated whitespace
  s = s.replace(/\s+/g, " ");
  return s.trim();
}

/**
 * Group consecutive near-equivalent lines in `text`.
 *
 * Each group of ≥ threshold similar consecutive lines is replaced by:
 *   <first line of the group> [rtk:grouped ×N]
 *
 * where N is the total count of lines in that group.
 */
export function groupSimilarLines(text: string, options: GroupingOptions = {}): GroupingResult {
  const threshold = Math.max(2, Math.floor(options.threshold ?? 3));
  const lines = text.split(/\r?\n/);
  const output: string[] = [];
  let grouped = 0;

  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    const normalised = normalizeLine(line);

    // Count consecutive lines that normalise to the same form
    let runLength = 1;
    while (
      index + runLength < lines.length &&
      normalizeLine(lines[index + runLength]) === normalised
    ) {
      runLength++;
    }

    if (runLength >= threshold) {
      // Keep the first (representative) line + the count marker
      output.push(`${line} [rtk:grouped ×${runLength}]`);
      grouped += runLength - 1;
      index += runLength;
    } else {
      output.push(line);
      index++;
    }
  }

  return { text: output.join("\n"), grouped };
}
