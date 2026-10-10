/**
 * What the OpenCode executor knows about the request it is serving.
 *
 * The executor is one shared instance per provider alias and its requests overlap: a field
 * written when one request starts is read by the other one after an `await`. The target format
 * and the client session therefore live in a context that belongs to one `execute()` call and
 * follows its async continuations. Outside `execute()` there is no context, and the executor
 * falls back to plain fields (direct calls to `buildHeaders`, `buildUrl`, `transformRequest`).
 */
import { AsyncLocalStorage } from "node:async_hooks";

export interface RequestContext {
  format: string | null;
  session: string | undefined;
  /**
   * Pool-member resolver published by the chat layer for one request (see the
   * applied-proxy capture sink). Absent unless a connection pool was resolved
   * for this request. Resolves to a proxy config, or null when the pool has
   * nothing else to offer (exhausted or held back) — the caller keeps its
   * current behavior then. Never throws: a throw is treated like null.
   */
  reselectPoolMember?: () => Promise<unknown>;
}

const store = new AsyncLocalStorage<RequestContext>();

/** Run one request in a context of its own. */
export function runInRequestContext<T>(fn: () => T): T {
  return store.run({ format: null, session: undefined, reselectPoolMember: undefined }, fn);
}

export function currentRequestContext(): RequestContext | undefined {
  return store.getStore();
}
