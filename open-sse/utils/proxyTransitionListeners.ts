/**
 * Proxy transition listeners.
 *
 * Zero-dependency subscriber registry for proxy set-aside transitions. Imported by
 * the refusal store (open-sse/utils/proxyRefusalMemory.ts); the bridge
 * (src/lib/proxyEvents/proxyTransitionBridge.ts) subscribes from here. No imports
 * in this file so the store stays pure and cycle-free.
 */

export type ProxyTransitionKind = "ip_quota_429" | "proxy_unreachable" | "transport";

export interface ProxyTransition {
  key: string;
  kind: ProxyTransitionKind;
  periodMs: number;
  until: number;
}

export type ProxyTransitionListener = (transition: ProxyTransition) => void;

const listeners = new Set<ProxyTransitionListener>();

export function onProxyTransition(listener: ProxyTransitionListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function notifyProxyTransition(transition: ProxyTransition): void {
  for (const listener of listeners) {
    try {
      listener(transition);
    } catch (err) {
      console.error("[ProxyTransition] Error in listener:", err);
    }
  }
}

/** Test-only: number of registered listeners. */
export function __listenerCountForTesting(): number {
  return listeners.size;
}

/** Test-only: forget all listeners. */
export function __resetProxyTransitionListenersForTesting(): void {
  listeners.clear();
}
