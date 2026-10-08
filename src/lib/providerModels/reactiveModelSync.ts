/**
 * Reactive model sync — the self-healing half of pinned-catalog staleness.
 *
 * Curated model catalogs are frozen snapshots; when the upstream backend
 * ships (or renames) a model, requests for it 404 upstream until somebody
 * re-freezes the catalog by hand (Gemini 3.7 Flash on Antigravity, zai-web
 * #7678, Claude Opus 4.8 #2979). The Antigravity executor calls
 * maybeTriggerReactiveModelSync() or awaitReactiveModelSync() on a model-not-found 404:
 * this runs the existing discovery sync for that connection (loopback sync-models), so the
 * fresh model list lands in the synced catalog and requests can resolve.
 *
 * Guardrails: provider allow-list, per-connection cooldown, in-flight dedup —
 * a burst of 404s triggers at most one sync per connection per window.
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
const inFlightPromises = new Map<string, Promise<boolean>>();

type SyncFn = (connectionId: string, provider: string, baseUrl: string) => Promise<boolean>;
const defaultSyncFn: SyncFn = (connectionId, provider, baseUrl) =>
  syncConnectionModels(connectionId, provider, baseUrl);
let syncFn: SyncFn = defaultSyncFn;

/**
 * Await a discovery sync for the connection (bounded by `timeoutMs`), returning
 * true when the sync actually succeeded in time.
 *
 * Used by the Antigravity executor on a 404: when an upstream model was added
 * between OmniRoute releases, awaiting the sync lets the current request retry
 * once immediately instead of failing the first caller.
 */
export async function awaitReactiveModelSync(
  provider: string,
  connectionId: string,
  timeoutMs = 5000
): Promise<boolean> {
  const providerId = provider.trim().toLowerCase();
  const connection = connectionId.trim();
  if (!REACTIVE_SYNC_PROVIDERS.has(providerId) || !connection) return false;

  const key = `${providerId}:${connection}`;
  const now = Date.now();
  const last = lastTriggerAt.get(key) ?? 0;
  const existing = inFlightPromises.get(key);

  if (existing) {
    try {
      return await Promise.race([
        existing,
        new Promise<boolean>((resolve) => setTimeout(() => resolve(false), timeoutMs)),
      ]);
    } catch {
      return false;
    }
  }

  if (now - last < cooldownMs) {
    return false;
  }

  lastTriggerAt.set(key, now);
  const baseUrl = getModelSyncInternalBaseUrl();
  const promise = (async () => {
    try {
      return await syncFn(connection, providerId, baseUrl);
    } catch (err) {
      console.warn(`[ReactiveModelSync] Sync threw for ${key}:`, err);
      return false;
    } finally {
      inFlightPromises.delete(key);
    }
  })();

  inFlightPromises.set(key, promise);

  try {
    return await Promise.race([
      promise,
      new Promise<boolean>((resolve) => setTimeout(() => resolve(false), timeoutMs)),
    ]);
  } catch {
    return false;
  }
}

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
  const last = lastTriggerAt.get(key) ?? 0;
  if (inFlightPromises.has(key) || now - last < cooldownMs) return false;

  void awaitReactiveModelSync(provider, connectionId);
  return true;
}

/** Test helper: override the cooldown window. */
export function __setReactiveSyncCooldownForTests(ms: number): void {
  cooldownMs = ms;
}

/** Test helper: intercept the underlying sync call. */
export function __setReactiveSyncFnForTests(fn: SyncFn | null): void {
  syncFn = fn ?? defaultSyncFn;
}

/** Test helper: reset triggers and in-flight tracking. */
export function __resetReactiveModelSyncForTests(ms?: number): void {
  cooldownMs = typeof ms === "number" ? ms : REACTIVE_SYNC_COOLDOWN_MS;
  lastTriggerAt.clear();
  inFlightPromises.clear();
  syncFn = defaultSyncFn;
}
