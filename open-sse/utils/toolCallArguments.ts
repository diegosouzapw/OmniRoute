/**
 * Accumulate streamed tool-call `arguments` fragments without corrupting them.
 *
 * Providers stream tool-call arguments in one of two shapes:
 *   - Incremental deltas: each chunk carries only the NEW fragment. These must
 *     be concatenated verbatim — even when a fragment's leading bytes repeat the
 *     tail of what we already have (e.g. the doubled `l` in `ls -ll`).
 *   - Full snapshots: each chunk re-sends the ENTIRE accumulated arguments so
 *     far. Concatenating those would duplicate the payload (issue #3701).
 *
 * We only dedup the snapshot case when it is UNAMBIGUOUS: an identical repeat,
 * or a growing superset that still starts with everything seen so far. Every
 * other fragment is treated as an incremental delta and appended as-is.
 *
 * A fuzzy suffix/prefix-overlap heuristic must NOT be used here: it silently
 * drops bytes from legitimate incremental deltas (turning `ll` into `l`, `xx`
 * into `x`), which trades a visible duplication bug for a silent truncation bug.
 */
export function appendToolCallArgumentDelta(current: unknown, incoming: unknown): string {
  const existing = typeof current === "string" ? current : "";
  const next = typeof incoming === "string" ? incoming : "";

  if (!existing) return next;
  if (!next) return existing;

  // Unambiguous snapshot repeat / growth — replace instead of concatenating.
  if (next === existing) return existing;
  if (next.startsWith(existing)) return next;

  // Incremental delta fragment — append verbatim (preserves repeated chars).
  return existing + next;
}
