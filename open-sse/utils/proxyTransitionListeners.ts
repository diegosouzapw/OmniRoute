/**
 * Proxy transition listeners.
 *
 * Zero-dependency subscriber registry for proxy set-aside transitions. Imported by
 * the refusal store (open-sse/utils/proxyRefusalMemory.ts); the bridge
 * (src/lib/proxyEvents/proxyTransitionBridge.ts) subscribes from here. No imports
 * in this file so the store stays pure and cycle-free.
 */

export type ProxyTransitionKind =
  "ip_quota_429" | "proxy_unreachable" | "transport" | "slow" | "geo_blocked";

export interface ProxyTransition {
  key: string;
  kind: ProxyTransitionKind;
  periodMs: number;
  until: number;
}

export type ProxyTransitionListener = (transition: ProxyTransition) => void;

export interface SharedRefusalStore {
  memory: Map<string, RefusalState>;
  seq: { value: number };
  transportFailures: TransportFailure[];
  transportSuccesses: TransportSuccess[];
  slowOverruns: SlowOverrun[];
  listeners: Set<ProxyTransitionListener>;
  listenerKeys: Map<string, ProxyTransitionListener>;
}

export type RefusalState = { streak: number; until: number; seq: number };
export type TransportFailure = { key: string; destination: string; at: number };
export type TransportSuccess = { destination: string; key: string; at: number };
export type SlowOverrun = { key: string; at: number };

const SHARED_STORE_KEY = Symbol.for("omniroute.proxyRefusalMemory");

/**
 * Process-wide refusal store, shared across duplicated server module copies.
 * Lazy `??=` init mirrors getPatchState in proxyFetch.ts: data only, no
 * closures, so re-evaluation (HMR) rebinds the same object.
 */
export function getSharedRefusalStore(): SharedRefusalStore {
  const holder = globalThis as unknown as Record<symbol, SharedRefusalStore | undefined>;
  let store = holder[SHARED_STORE_KEY];
  if (!store) {
    store = {
      memory: new Map<string, RefusalState>(),
      seq: { value: 0 },
      transportFailures: [],
      transportSuccesses: [],
      slowOverruns: [],
      listeners: new Set<ProxyTransitionListener>(),
      listenerKeys: new Map<string, ProxyTransitionListener>(),
    };
    holder[SHARED_STORE_KEY] = store;
  }
  return store;
}

export function onProxyTransition(listener: ProxyTransitionListener, key?: string): () => void {
  const store = getSharedRefusalStore();
  if (key !== undefined) {
    const existing = store.listenerKeys.get(key);
    if (existing !== undefined) {
      const current = existing;
      return () => {
        store.listeners.delete(current);
        if (store.listenerKeys.get(key) === current) store.listenerKeys.delete(key);
      };
    }
    store.listeners.add(listener);
    store.listenerKeys.set(key, listener);
    return () => {
      store.listeners.delete(listener);
      if (store.listenerKeys.get(key) === listener) store.listenerKeys.delete(key);
    };
  }
  store.listeners.add(listener);
  return () => {
    store.listeners.delete(listener);
  };
}

export function notifyProxyTransition(transition: ProxyTransition): void {
  for (const listener of getSharedRefusalStore().listeners) {
    try {
      listener(transition);
    } catch (err) {
      console.error("[ProxyTransition] Error in listener:", err);
    }
  }
}

/** Test-only: number of registered listeners. */
export function __listenerCountForTesting(): number {
  return getSharedRefusalStore().listeners.size;
}

/** Test-only: forget all listeners. */
export function __resetProxyTransitionListenersForTesting(): void {
  const store = getSharedRefusalStore();
  store.listeners.clear();
  store.listenerKeys.clear();
}
