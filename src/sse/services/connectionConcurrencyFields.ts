/**
 * Concurrency fields copied from a stored connection onto the selected
 * credentials (#13700). Shared by `auth.ts` materializeConnection and the
 * optional no-auth key path so both propagate the same caps. The per-model
 * map is normalized fail-open: a missing or malformed map yields null, which
 * the chat core treats as "no model gate".
 */
import type { ProviderConnectionView } from "@/lib/db/providers/lazyConnectionView";
import { normalizeModelConcurrencyMap } from "@/lib/db/providers/columns";

export function buildConnectionConcurrencyFields(connection: ProviderConnectionView): {
  maxConcurrent: number | null;
  rateLimitMaxConcurrent: number | null;
  modelConcurrency: Record<string, number> | null;
} {
  return {
    maxConcurrent: connection.maxConcurrent,
    rateLimitMaxConcurrent: connection.rateLimitMaxConcurrent,
    modelConcurrency: normalizeModelConcurrencyMap(connection.rateLimitOverrides?.modelConcurrency),
  };
}
