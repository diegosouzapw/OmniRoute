/**
 * Per-provider snapshot of the model ids reported by live discovery.
 *
 * The static catalogs in `open-sse/config` (ANTIGRAVITY_PUBLIC_MODELS / AGY_PUBLIC_MODELS)
 * are a cold-start fallback, not an allowlist: a tier Google ships between two OmniRoute
 * releases is legitimate the moment a connection's discovery sync reports it. Quota
 * normalization has sync entry points, so async callers refresh the snapshot first and the
 * sync ones read it afterwards. An empty snapshot degrades to the static lists — never to
 * "everything allowed".
 */
import { getActiveSyncedCatalog } from "@/lib/db/models/activeSyncedCatalog";

const SNAPSHOT_TTL_MS = 60_000;
const EMPTY_IDS: ReadonlySet<string> = new Set<string>();
// Only these providers filter quota buckets against a model catalog; every other provider
// short-circuits so the sync paths never pay a discovery lookup they cannot use.
const CATALOG_FILTERED_PROVIDERS = new Set(["antigravity", "agy"]);

type Snapshot = { ids: ReadonlySet<string>; at: number };

const snapshots = new Map<string, Snapshot>();

/** Last known live model ids for `provider` (empty when nothing was ever synced). */
export function getCachedLiveModelIds(provider: string): ReadonlySet<string> {
  return snapshots.get(provider)?.ids ?? EMPTY_IDS;
}

/** Refresh the snapshot from the synced catalog, at most once per TTL window. */
export async function refreshLiveModelIds(provider: string): Promise<ReadonlySet<string>> {
  if (!CATALOG_FILTERED_PROVIDERS.has(provider)) return EMPTY_IDS;

  const cached = snapshots.get(provider);
  if (cached && Date.now() - cached.at < SNAPSHOT_TTL_MS) return cached.ids;

  try {
    const catalog = await getActiveSyncedCatalog(provider);
    const ids = new Set(
      catalog.models
        .map((model) => (typeof model?.id === "string" ? model.id : ""))
        .filter((id): id is string => id.length > 0)
    );
    snapshots.set(provider, { ids, at: Date.now() });
    return ids;
  } catch {
    // Discovery state unavailable: keep the previous snapshot rather than widening or
    // narrowing the quota filter on a transient DB error.
    return cached?.ids ?? EMPTY_IDS;
  }
}

/** Test helper: drop every cached snapshot, or seed one for a provider. */
export function __setLiveModelIdsForTests(provider?: string, ids?: Iterable<string>): void {
  if (!provider) {
    snapshots.clear();
    return;
  }
  snapshots.set(provider, { ids: new Set(ids ?? []), at: Date.now() });
}
