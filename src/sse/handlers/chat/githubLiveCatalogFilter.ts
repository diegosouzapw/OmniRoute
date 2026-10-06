/**
 * GitHub live-catalog combo gate (#12137).
 *
 * Extracted from chat.ts so the frozen handler does not grow. Explicit combo
 * members missing from an authoritative GitHub catalog are skipped; a catalog
 * that is not synced yet fails open (same pattern as providerWildcard).
 *
 * The catalog promise is memoized per request-scope object so combo candidates
 * share one getActiveSyncedCatalog fetch instead of re-hitting the DB.
 */
import {
  catalogContainsModel,
  getActiveSyncedCatalog,
  type ActiveSyncedCatalog,
} from "@/lib/db/models/activeSyncedCatalog";

const catalogByScope = new WeakMap<object, Map<string, Promise<ActiveSyncedCatalog>>>();

/** Prefix-override guard used by combo pre-check (same as handleSingleModelChat). */
export function comboCheckProvider(
  modelString: string,
  modelInfo: { provider?: string },
  providerId?: string | null
): string | undefined {
  if (!providerId) return modelInfo.provider;
  if (providerId === modelInfo.provider) return modelInfo.provider;
  if (modelString.startsWith(providerId + "/")) return modelInfo.provider;
  return providerId;
}

function loadGithubLiveCatalog(
  scope: object,
  providerId: string,
  loadCatalog: (id: string) => Promise<ActiveSyncedCatalog> = getActiveSyncedCatalog
): Promise<ActiveSyncedCatalog> {
  let byProvider = catalogByScope.get(scope);
  if (!byProvider) {
    byProvider = new Map();
    catalogByScope.set(scope, byProvider);
  }
  let pending = byProvider.get(providerId);
  if (!pending) {
    pending = loadCatalog(providerId);
    byProvider.set(providerId, pending);
  }
  return pending;
}

/**
 * Combo pre-check for GitHub live-catalog membership.
 *
 * Returns:
 * - `true` — allow immediately (provider could not be determined)
 * - `false` — skip this combo member
 * - `null` — not a GitHub skip; continue the remaining credential checks
 */
export async function ghComboGate(
  scope: object,
  provider: string | null | undefined,
  resolvedModel: string,
  loadCatalog?: (id: string) => Promise<ActiveSyncedCatalog>
): Promise<boolean | null> {
  if (!provider) return true;
  if (provider !== "github" && provider !== "gh") return null;
  const inLiveCatalog = catalogContainsModel(
    await loadGithubLiveCatalog(scope, provider, loadCatalog),
    resolvedModel
  );
  if (inLiveCatalog === false) return false;
  return null;
}
