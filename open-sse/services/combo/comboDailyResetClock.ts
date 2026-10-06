/**
 * Operator daily-reset clock lookup for the combo failure paths.
 *
 * Combo targets classify upstream failures with `checkFallbackError` directly,
 * so they need the same per-provider `{ timezone, hour }` clock that the
 * single-model path resolves in `src/sse/services/auth.ts`
 * (`resolveDailyResetForProvider`): the provider node matched by id or prefix.
 *
 * Resolved on every failure through `getCachedProviderNodes`, which already
 * owns caching (short TTL, invalidated on every provider_nodes write). There is
 * deliberately no second cache here: a timezone/hour edit reaches combos
 * without a restart, and a failed lookup returns null (host-midnight fallback in
 * `checkFallbackError`) without being remembered.
 *
 * Dynamic import keeps the combo leaf free of a static edge into the DB layer.
 */

export type ComboDailyResetClock = { timezone?: unknown; hour?: unknown };

export async function resolveComboDailyReset(
  provider: string | null | undefined
): Promise<ComboDailyResetClock | null> {
  if (!provider || provider === "unknown") return null;
  try {
    const { getCachedProviderNodes } = await import("@/lib/db/readCache");
    const nodes = await getCachedProviderNodes();
    const node = nodes.find((n) => n && (n.id === provider || n.prefix === provider));
    if (!node) return null;
    return { timezone: node.dailyQuotaResetTimezone, hour: node.dailyQuotaResetHour };
  } catch {
    // no-effect: an unreadable node table falls back to host midnight in checkFallbackError
    return null;
  }
}
