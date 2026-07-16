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
 *
 * A third, non-conformant shape some upstreams emit (#6459): the FULL
 * `arguments` value delivered as an already-parsed JSON object/array instead
 * of a JSON-encoded string (violates the OpenAI streaming contract, but seen
 * from some Anthropic-shape-passthrough backends). Treating that as "not a
 * string" and silently discarding it left `tool_use.input` empty upstream —
 * or, when a caller re-serialized the buffer with plain string coercion
 * instead of JSON, rendered literally as `[object Object]` in the client
 * transcript. JSON.stringify it into a proper fragment instead of dropping it.
 */
function normalizeIncomingFragment(incoming: unknown): string {
  if (typeof incoming === "string") return incoming;
  if (incoming == null) return "";
  if (typeof incoming === "object") {
    try {
      return JSON.stringify(incoming);
    } catch {
      return "";
    }
  }
  return "";
}

export function appendToolCallArgumentDelta(current: unknown, incoming: unknown): string {
  const existing = typeof current === "string" ? current : "";
  const next = normalizeIncomingFragment(incoming);

  if (!existing) return next;
  if (!next) return existing;

  // Unambiguous snapshot repeat / growth — replace instead of concatenating.
  if (next === existing) return existing;
  if (next.startsWith(existing)) return next;

  // Incremental delta fragment — append verbatim (preserves repeated chars).
  return existing + next;
}
