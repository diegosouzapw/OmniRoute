import { AsyncLocalStorage } from "node:async_hooks";

/**
 * #5217 (Gap-secondary): a mutable sink that records the proxy actually applied
 * by `runWithProxyContext` for the in-flight request. Executors that pin their
 * own per-account proxy *internally* (e.g. OpencodeExecutor wraps its dispatch
 * in `runWithProxyContext(account.proxy, …)`) never propagate that choice back
 * to the caller's `proxyInfo`, so the post-execution `[ProxyEgress]` line logged
 * `proxy=direct` even though `[ProxyFetch] Applied request proxy context: …`
 * fired. Wrapping the execution in `runWithAppliedProxyCapture(sink, fn)` lets
 * the egress logger read the innermost applied proxy (the last writer wins, which
 * is the executor's per-account proxy).
 */
export type AppliedProxySink = {
  proxy: unknown;
  upstreamStatus?: number;
  /** Masked serving-account id (N112) — set by the rotation executor at dispatch. */
  rotationAccount?: string | null;
  /** Added wait before dispatch, ms — null means none was imposed. */
  addedWaitMs?: number | null;
  /** Added-wait cause: throttle, park, or throttle+park. */
  addedWaitCause?: string | null;
  /**
   * Pool-member resolver published by the chat layer when the resolved egress
   * came from a connection pool that may offer another member on a per-address
   * refusal. Absent otherwise. Resolves to a proxy config, or null when the
   * pool has nothing else to offer — the executor keeps its behavior then.
   */
  reselectPoolMember?: () => Promise<unknown>;
};
const APPLIED_PROXY_CONTEXT_KEY = Symbol.for("omniroute.proxyFetch.applied-context");
type AppliedProxyStore = typeof globalThis & {
  [APPLIED_PROXY_CONTEXT_KEY]?: AsyncLocalStorage<AppliedProxySink>;
};
export function getAppliedProxyContext(): AsyncLocalStorage<AppliedProxySink> {
  return ((globalThis as AppliedProxyStore)[APPLIED_PROXY_CONTEXT_KEY] ??=
    new AsyncLocalStorage<AppliedProxySink>());
}

/**
 * Run `fn` with an applied-proxy capture sink in context. Any
 * `runWithProxyContext` call inside `fn` that ends up applying a proxy records
 * that proxy config into `sink.proxy` (innermost wins). The sink is a plain
 * mutable object the caller retains, so it can read `sink.proxy` after `fn`
 * resolves. Pure plumbing — no behavioral change to the request itself.
 */
export function runWithAppliedProxyCapture<T>(sink: AppliedProxySink, fn: () => T): T {
  return getAppliedProxyContext().run(sink, fn);
}

/**
 * Read the current applied-proxy capture sink, if the request runs inside one
 * (see runWithAppliedProxyCapture). Read-only: never creates a sink. Lets an
 * executor read a resolver the chat layer published on the sink before
 * dispatch without importing the database layer.
 */
export function currentAppliedProxySink(): AppliedProxySink | undefined {
  return getAppliedProxyContext().getStore();
}

/**
 * Record the masked id of the rotation account serving this request on the
 * current capture sink (no-op outside a capture — the sink stays null and the
 * call-site forwards null). Only an already-masked id may be passed in.
 */
export function noteRotationAccount(masked: string): void {
  try {
    const sink = getAppliedProxyContext().getStore();
    if (sink) sink.rotationAccount = masked;
  } catch {
    /* attribution is best-effort; never break the request path */
  }
}

/** Added-wait causes. Plain data — numbers plus this enum, nothing to mask. */
export type AddedWaitCause = "throttle" | "park" | "throttle+park";

/**
 * Cumulative wait before dispatch (pacing, park) on the capture sink.
 * Snapshot: callers publish cumulative totals, so last-write-wins loses
 * nothing. Best-effort like noteRotationAccount: no-op outside a capture.
 */
export function noteAddedWait(totalMs: number, causes: Set<AddedWaitCause>): void {
  try {
    const sink = getAppliedProxyContext().getStore();
    if (!sink) return;
    if (!Number.isFinite(totalMs) || totalMs <= 0 || causes.size === 0) {
      sink.addedWaitMs = null;
      sink.addedWaitCause = null;
      return;
    }
    sink.addedWaitMs = Math.round(totalMs);
    sink.addedWaitCause = causes.size > 1 ? "throttle+park" : ([...causes][0] ?? null);
  } catch {
    /* added-wait is best-effort; never break the request path */
  }
}

/**
 * Late read of the added wait on the capture sink. Fail-soft: null
 * outside a capture or when nothing was published — callers persist NULL.
 */
export function readAddedWait(): { ms: number | null; cause: string | null } | null {
  try {
    const sink = getAppliedProxyContext().getStore();
    if (!sink) return null;
    const ms = typeof sink.addedWaitMs === "number" ? sink.addedWaitMs : null;
    if (ms === null) return null;
    const cause = typeof sink.addedWaitCause === "string" ? sink.addedWaitCause : null;
    return { ms, cause };
  } catch {
    return null;
  }
}
