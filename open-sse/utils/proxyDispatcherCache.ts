import type { Dispatcher } from "undici";

const DISPATCHER_CACHE_KEY = Symbol.for("omniroute.proxyDispatcher.cache");
const DEFAULT_DISPATCHER_KEY = Symbol.for("omniroute.proxyDispatcher.default");
const RETRY_DISPATCHER_KEY = Symbol.for("omniroute.proxyDispatcher.retry");

type DispatcherCache = Map<string, Dispatcher>;
type GlobalWithDispatcherCache = typeof globalThis & {
  [DISPATCHER_CACHE_KEY]?: DispatcherCache;
  [DEFAULT_DISPATCHER_KEY]?: Dispatcher;
  [RETRY_DISPATCHER_KEY]?: Dispatcher;
};

/**
 * Direct upstream fan-out dispatcher.
 *
 * A single Undici Agent configured with `connections > 1` should be enough in
 * theory, but real Codex `/backend-api/codex/responses` streams on Node 24 have
 * still been observed queuing every subsequent same-origin request until the
 * previous stream emits trailers. Using several one-connection Agents gives
 * each long SSE stream an independent pool/client and prevents one stream from
 * monopolizing the effective queue while keeping pipelining disabled.
 */
class RoundRobinDispatcher {
  private readonly dispatchers: Dispatcher[];
  private nextIndex = 0;

  constructor(dispatchers: Dispatcher[]) {
    this.dispatchers = dispatchers;
  }

  dispatch(options: Dispatcher.DispatchOptions, handler: Dispatcher.DispatchHandler): boolean {
    const dispatcher = this.dispatchers[this.nextIndex % this.dispatchers.length];
    this.nextIndex = (this.nextIndex + 1) % this.dispatchers.length;
    return dispatcher.dispatch(options, handler);
  }

  close(callback?: () => void): Promise<void> | void {
    const done = Promise.all(this.dispatchers.map((dispatcher) => dispatcher.close())).then(
      () => undefined
    );
    if (callback) {
      done.then(callback);
      return;
    }
    return done;
  }

  destroy(
    errorOrCallback?: Error | null | (() => void),
    callback?: () => void
  ): Promise<void> | void {
    const callbackFn = typeof errorOrCallback === "function" ? errorOrCallback : callback;
    const error = typeof errorOrCallback === "function" ? null : (errorOrCallback ?? null);
    const done = Promise.all(this.dispatchers.map((dispatcher) => dispatcher.destroy(error))).then(
      () => undefined
    );
    if (callbackFn) {
      done.then(callbackFn);
      return;
    }
    return done;
  }
}

export function createRoundRobinDispatcher(dispatchers: Dispatcher[]): Dispatcher {
  return new RoundRobinDispatcher(dispatchers) as unknown as Dispatcher;
}

export function getDispatcherCache(): DispatcherCache {
  const globalWithCache = globalThis as GlobalWithDispatcherCache;
  if (!globalWithCache[DISPATCHER_CACHE_KEY]) {
    globalWithCache[DISPATCHER_CACHE_KEY] = new Map();
  }
  return globalWithCache[DISPATCHER_CACHE_KEY];
}

export function getDefaultCachedDispatcher(): Dispatcher | undefined {
  return (globalThis as GlobalWithDispatcherCache)[DEFAULT_DISPATCHER_KEY];
}

export function setDefaultCachedDispatcher(dispatcher: Dispatcher): void {
  (globalThis as GlobalWithDispatcherCache)[DEFAULT_DISPATCHER_KEY] = dispatcher;
}

export function getRetryCachedDispatcher(): Dispatcher | undefined {
  return (globalThis as GlobalWithDispatcherCache)[RETRY_DISPATCHER_KEY];
}

export function setRetryCachedDispatcher(dispatcher: Dispatcher): void {
  (globalThis as GlobalWithDispatcherCache)[RETRY_DISPATCHER_KEY] = dispatcher;
}

function closeDispatcher(dispatcher: Dispatcher | undefined): void {
  if (!dispatcher) return;
  try {
    const result = dispatcher.close();
    if (result && typeof (result as Promise<void>).catch === "function") {
      void (result as Promise<void>).catch(() => {});
    }
  } catch {}
}

/**
 * Clear all cached proxy dispatchers.
 * Call this when proxy configuration changes to avoid stale connections.
 */
export function clearDispatcherCache(): void {
  const cache = getDispatcherCache();
  for (const dispatcher of cache.values()) {
    closeDispatcher(dispatcher);
  }
  cache.clear();

  const globalWithCache = globalThis as GlobalWithDispatcherCache;
  closeDispatcher(globalWithCache[DEFAULT_DISPATCHER_KEY]);
  closeDispatcher(globalWithCache[RETRY_DISPATCHER_KEY]);
  delete globalWithCache[DEFAULT_DISPATCHER_KEY];
  delete globalWithCache[RETRY_DISPATCHER_KEY];
}

export function __cacheProxyDispatcherForTest(key: string, dispatcher: Dispatcher): void {
  getDispatcherCache().set(key, dispatcher);
}
