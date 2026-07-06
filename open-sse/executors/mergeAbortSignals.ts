/**
 * Merge two AbortSignals into a single signal that fires when either source
 * aborts.
 *
 * Wire-level semantics:
 *
 *   - If `primary` is already aborted at call time, the merged signal fires
 *     immediately with `primary.reason` (synchronously).
 *   - If `secondary` is already aborted at call time, the merged signal fires
 *     immediately with `secondary.reason`.
 *   - Otherwise, both listeners are registered with `{ once: true }` so the
 *     first abort wins and the merged signal fires exactly once, with the
 *     winner's `reason`.
 *
 * The returned signal is always a NEW `AbortSignal` instance — the caller
 * can safely forward it through any pipeline without aliasing the sources.
 */
export function mergeAbortSignals(
  primary?: AbortSignal,
  secondary?: AbortSignal
): AbortSignal | undefined {
  if (!primary) return secondary;
  if (!secondary) return primary;
  if (primary.aborted) return primary;
  if (secondary.aborted) return secondary;

  const controller = new AbortController();

  const abortFrom = (source: AbortSignal) => {
    if (!controller.signal.aborted) {
      controller.abort(source.reason);
    }
  };

  primary.addEventListener("abort", () => abortFrom(primary), { once: true });
  secondary.addEventListener("abort", () => abortFrom(secondary), { once: true });
  return controller.signal;
}
