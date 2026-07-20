import { getEnabledProviders } from "@/lib/freeProxyProviders";
import {
  recordFreeProxySync,
  clearFreeProxySyncErrors,
  recordFreeProxySyncErrors,
} from "@/lib/localDb";
import type { FreeProxyProvider } from "@/lib/freeProxyProviders/types";

export interface FreeProxySyncCycleResult {
  results: Record<string, unknown>;
  lastSyncAt: string;
}

/**
 * Run one free-proxy sync cycle: call `sync()` on each provider, isolate
 * per-provider failures, and persist the cycle timestamp.
 *
 * Shared by both trigger paths — the manual `POST /api/settings/free-proxies/sync`
 * route and the automatic scheduler (`freeProxyProviders/scheduler.ts`, #7079) —
 * so both go through the exact same code path.
 *
 * `providers` defaults to `getEnabledProviders()` when omitted, which is what the
 * scheduler always uses (it has no notion of a per-request `sources` filter).
 */
export async function runFreeProxySyncCycle(
  providers?: FreeProxyProvider[]
): Promise<FreeProxySyncCycleResult> {
  const resolvedProviders = providers ?? getEnabledProviders();
  const results: Record<string, unknown> = {};

  for (const provider of resolvedProviders) {
    try {
      results[provider.id] = await provider.sync();
      await clearFreeProxySyncErrors(provider.id);
    } catch (error) {
      // #5595: isolate per-source failures so one provider throwing doesn't
      // abort the whole sync — the other sources still populate the pool and
      // the failure is surfaced in `results` instead of a blanket 500.
      const errorMessage = error instanceof Error ? error.message : String(error);
      results[provider.id] = {
        fetched: 0,
        added: 0,
        updated: 0,
        errors: [errorMessage],
      };
      await recordFreeProxySyncErrors(provider.id, [errorMessage]);
    }
  }

  // #4878: persist the sync timestamp so the UI's "last sync" advances even
  // when a sync returns zero new/updated proxies (otherwise it stayed frozen
  // at MAX(last_validated)).
  const lastSyncAt = await recordFreeProxySync();

  return { results, lastSyncAt };
}
