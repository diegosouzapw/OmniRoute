import { getProviderConnectionById } from "../providers";
import { sessionAffinityAccountIdentity } from "./accountIdentity";
import { getSessionAffinityStore } from "./storeFactory";

/** Synchronous callback boundary: Redis deletion is explicitly fire-and-forget. */
export function deleteSessionAccountAffinityBestEffort(sessionKey: string, provider: string): void {
  const store = getSessionAffinityStore();
  if (store.driver === "sqlite") {
    try {
      store.delete(sessionKey, provider);
    } catch {
      // Preserve both base callbacks' silent, synchronous best-effort cleanup.
    }
    return;
  }
  try {
    void Promise.resolve(store.delete(sessionKey, provider)).catch(() => {
      console.warn("[SESSION_AFFINITY] Local affinity deletion failed.");
    });
  } catch {
    console.warn("[SESSION_AFFINITY] Local affinity deletion failed.");
  }
}

/** SQLite returns synchronously; only Redis resolves the shared identity asynchronously. */
export function evictSessionAccountAffinityForConnectionAsync(
  sessionKey: string,
  provider: string,
  connectionId: string
): boolean | Promise<boolean> {
  if (!sessionKey || !provider || !connectionId) return false;
  const store = getSessionAffinityStore();
  if (store.driver === "sqlite") return store.evict(sessionKey, provider, connectionId);
  return getProviderConnectionById(connectionId).then((connection) => {
    const identity = connection ? sessionAffinityAccountIdentity(connection, provider) : undefined;
    return store.evict(sessionKey, provider, connectionId, identity);
  });
}
