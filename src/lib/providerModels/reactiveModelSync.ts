/**
 * Reactive model sync — the self-healing half of pinned-catalog staleness.
 *
 * Curated model catalogs are frozen snapshots; when the upstream backend
 * ships (or renames) a model, requests for it 404 upstream until somebody
 * re-freezes the catalog by hand (Gemini 3.7 Flash on Antigravity, zai-web
 * #7678, Claude Opus 4.8 #2979). The Antigravity executor calls
 * maybeTriggerReactiveModelSync() on a model-not-found 404: this runs the
 * existing discovery sync for that connection (loopback sync-models), so the
 * fresh model list lands in the synced catalog and the next request resolves.
 *
 * Guardrails: provider allow-list, per-connection cooldown, in-flight dedup —
 * a burst of 404s triggers at most one sync per connection per window. The
 * sync is fire-and-forget; failures only log (the scheduled auto-sync cycle
 * stays the backstop).
 */

import {
  getModelSyncInternalBaseUrl,
  syncConnectionModels,
} from "@/shared/services/modelSyncScheduler";

/** Providers whose connections support live model discovery. Extend as other
 * discovery-capable providers get wired to the reactive trigger. */
const REACTIVE_SYNC_PROVIDERS = new Set<string>(["antigravity", "agy"]);

/** Minimum interval between two reactive syncs for the same connection. */
const REACTIVE_SYNC_COOLDOWN_MS = 10 * 60 * 1000;
let cooldownMs = REACTIVE_SYNC_COOLDOWN_MS;

const lastTriggerAt = new Map<string, number>();
const inFlight = new Set<string>();

type SyncFn = (connectionId: string, provider: string, baseUrl: string) => Promise<boolean>;
const defaultSyncFn: SyncFn = (connectionId, provider, baseUrl) =>
  syncConnectionModels(connectionId, provider, baseUrl);
let syncFn: SyncFn = defaultSyncFn;

/**
 * Kick a discovery sync for the connection if the provider supports discovery
 * and the connection is not cooling down / already syncing. Returns true when
 * a sync was scheduled (fire-and-forget), false when the call was a no-op.
 */
export function maybeTriggerReactiveModelSync(provider: string, connectionId: string): boolean {
  const providerId = provider.trim().toLowerCase();
  const connection = connectionId.trim();
  if (!REACTIVE_SYNC_PROVIDERS.has(providerId) || !connection) return false;

  const key = `${providerId}:${connection}`;
  const now = Date.now();
  const last = lastTriggerAt.get(key);
  if (last !== undefined && now - last < cooldownMs) return false;
  if (inFlight.has(key)) return false;

  lastTriggerAt.set(key, now);
  inFlight.add(key);
  void (async () => {
    try {
      const ok = await syncFn(connection, providerId, getModelSyncInternalBaseUrl());
      console.log(
        `[ReactiveModelSync] ${providerId} (${connection.slice(0, 8)}): discovery sync ${
          ok ? "succeeded" : "failed"
        } after upstream model-not-found`
      );
    } catch (err) {
      console.warn(
        `[ReactiveModelSync] ${providerId} (${connection.slice(0, 8)}): sync error —`,
        (err as Error).message
      );
    } finally {
      inFlight.delete(key);
    }
  })();
  return true;
}

/** Test helper: swap the sync implementation (null restores the loopback sync). */
export function __setReactiveSyncFnForTests(fn: SyncFn | null): void {
  syncFn = fn ?? defaultSyncFn;
}

/** Test helper: clear cooldown/in-flight state and optionally shrink the cooldown. */
export function __resetReactiveModelSyncForTests(testCooldownMs?: number): void {
  lastTriggerAt.clear();
  inFlight.clear();
  cooldownMs = typeof testCooldownMs === "number" ? testCooldownMs : REACTIVE_SYNC_COOLDOWN_MS;
}
