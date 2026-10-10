// #12849: a connection synced once and never refreshed must not pin routing to
// that point-in-time snapshot forever — a live model the provider has since
// added would be rejected as "unavailable" indefinitely. Once the synced
// catalog exceeds this age (or was never timestamped — pre-migration rows),
// getActiveSyncedCatalog stops treating it as authoritative and fails open,
// matching the existing no-sync-yet behavior. Overridable for ops/testing.
const DEFAULT_SYNCED_CATALOG_STALE_AFTER_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function getSyncedCatalogStaleAfterMs(): number {
  const raw = process.env.OMNIROUTE_SYNCED_CATALOG_STALE_AFTER_MS;
  const parsed = raw !== undefined ? Number(raw) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_SYNCED_CATALOG_STALE_AFTER_MS;
}

export function isSyncedAtFresh(syncedModelsAt: string | null): boolean {
  if (!syncedModelsAt) return false;
  const syncedAtMs = Date.parse(syncedModelsAt);
  if (Number.isNaN(syncedAtMs)) return false;
  return Date.now() - syncedAtMs <= getSyncedCatalogStaleAfterMs();
}
