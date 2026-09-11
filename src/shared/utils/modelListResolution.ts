/**
 * Resolve the effective model list after a free-only import filter.
 * freeFilterEmpty (caller asked free-only, fetched >0, matched 0) wins over
 * everything: surface [] so the UI shows "no free models found" instead of
 * silently falling back to the stale synced snapshot. Pure — no imports.
 */
export function resolveEffectiveAvailableModels<T>(
  freeFilterEmpty: boolean,
  discovered: T[],
  synced: T[]
): T[] {
  return freeFilterEmpty ? [] : discovered.length > 0 ? discovered : synced;
}
