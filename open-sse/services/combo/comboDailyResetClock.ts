/**
 * Operator daily-reset clock lookup for combo dispatch paths.
 *
 * Resolves the per-provider `{ timezone, hour }` clock from the cached
 * provider nodes, keyed by node id and prefix. Null when unconfigured —
 * the `checkFallbackError`/`recordModelLockoutFailure` dailyReset params
 * already fall back to legacy host-midnight then, so null is behavior-neutral.
 *
 * Single-flight + process-lifetime cache: the node table changes only via
 * operator action, and every combo failure path shares one in-flight lookup
 * instead of stampeding the DB. Dynamic import keeps the combo leaf free of
 * a static edge into the DB read-cache layer.
 *
 * @internal — not part of the public combo.ts barrel.
 */

type DailyResetClock = { timezone?: unknown; hour?: unknown };

let clockCache: Record<string, DailyResetClock> | null = null;
let clockInflight: Promise<Record<string, DailyResetClock>> | null = null;

export async function resolveComboDailyResetClock(): Promise<
  Record<string, DailyResetClock>
> {
  if (clockCache) return clockCache;
  if (!clockInflight) {
    clockInflight = (async () => {
      try {
        const { getCachedProviderNodes } = await import(
          "../../../src/lib/db/readCache.ts"
        );
        const nodes = await getCachedProviderNodes();
        const clock: Record<string, DailyResetClock> = {};
        for (const node of nodes) {
          if (!node || typeof node !== "object") continue;
          const rec = node as Record<string, unknown>;
          const entry = {
            timezone: rec.dailyQuotaResetTimezone,
            hour: rec.dailyQuotaResetHour,
          };
          if (typeof rec.id === "string" && rec.id) clock[rec.id] = entry;
          if (typeof rec.prefix === "string" && rec.prefix) clock[rec.prefix] = entry;
        }
        clockCache = clock;
        return clock;
      } catch {
        clockCache = {};
        return clockCache;
      } finally {
        clockInflight = null;
      }
    })();
  }
  return clockInflight;
}

export function dailyResetForProvider(
  clock: Record<string, DailyResetClock> | null | undefined,
  provider: string | null | undefined,
): DailyResetClock | null {
  if (!clock || !provider || provider === "unknown") return null;
  return clock[provider] ?? null;
}
