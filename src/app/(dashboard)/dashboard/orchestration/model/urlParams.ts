/**
 * CSV query-param helpers shared by the Orchestration page client (which parses `?state=` /
 * `?source=` / `?provider=` / `?collapsed=` out of the URL) and the toolbar (which toggles them
 * back in). Both used to carry their own private copy of `toggleCsv`; a single definition keeps
 * the round-trip (parse → toggle → parse) consistent. Pure — never mutates its inputs.
 */

/**
 * CSV → Set. Each token is trimmed and empty tokens are dropped, so a hand-edited or
 * shared URL like `?state=running, failed` parses the same as `?state=running,failed`.
 * With `valid`, tokens outside that set are discarded (an unknown state chip in the URL
 * must not survive into the filter).
 */
export function parseCsvSet<T extends string>(raw: string | null, valid?: ReadonlySet<T>): Set<T> {
  const out = new Set<T>();
  if (!raw) return out;
  for (const token of raw.split(",")) {
    const v = token.trim();
    if (!v) continue;
    if (!valid || valid.has(v as T)) out.add(v as T);
  }
  return out;
}

/**
 * Toggle `value` in `current`, returning the next CSV — or `null` when the list becomes
 * empty, so the caller's `setParams` drops the param from the URL instead of leaving `?state=`.
 */
export function toggleCsv<T extends string>(current: ReadonlySet<T>, value: T): string | null {
  const next = new Set(current);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next.size > 0 ? [...next].sort().join(",") : null;
}
