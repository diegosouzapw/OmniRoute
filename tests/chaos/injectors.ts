/**
 * Chaos Injector — primitives for fault injection in a hermetic test process.
 *
 * Design constraints (per PR-013):
 *   • Zero new npm deps. All injectors are process-level: monkey-patches of
 *     `globalThis.fetch`, `fs.writeFileSync`, `ws` socket close, etc.
 *   • Scoped to the calling scenario. Every injector returns a `restore()`
 *     function so the runner can guarantee cleanup between scenarios and
 *     ensure invariants are observed in the recovered state.
 *   • Hermetic. No injector reaches out to the network, filesystem, or DB
 *     beyond what the scenario explicitly requests.
 *
 * The injector taxonomy:
 *
 *   delay(ms)              — defer a single async op by N milliseconds
 *   fail(reason, status?)  — throw or reject the op with a tagged error
 *   drop()                  — silently swallow the op (return undefined/empty)
 *   throttle(rps)          — cap throughput on a hot path (token bucket)
 *
 * Helpers attach each injector to a host (fetch / sqlite / ws) and emit
 * a structured ChaosEvent so the scenario can assert on injected faults.
 *
 * @module tests/chaos/injectors
 */
import fs from "node:fs";

export type ChaosEventKind = "delay" | "fail" | "drop" | "throttle";

export interface ChaosEvent {
  kind: ChaosEventKind;
  host: "fetch" | "sqlite" | "ws" | "fs" | "otel" | "rate-limiter" | "quota";
  at: number;
  detail?: Record<string, unknown>;
}

export type ChaosInjector = {
  /** unique id, useful for logs and reporting */
  id: string;
  host: ChaosEvent["host"];
  /** events emitted by this injector, in order */
  events: ChaosEvent[];
  /** restore the host to its pre-injection behavior; idempotent */
  restore(): void;
};

/* ────────────────────────────────────────────────────────────────────────────
 * Delay
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * Wrap an async function so that it waits `ms` milliseconds before resolving.
 * Use this to simulate slow upstreams, slow DB, slow OTLP collectors, etc.
 */
export function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/* ────────────────────────────────────────────────────────────────────────────
 * Fail
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * Build a tagged Error suitable for chaos injection. The `kind` field lets
 * the scenario match specific failure classes in its assertions.
 */
export function chaosError(kind: string, message: string, extra: Record<string, unknown> = {}): Error & {
  chaosKind: string;
  traceId: string;
  [k: string]: unknown;
} {
  const err = new Error(message) as Error & { chaosKind: string; traceId: string; [k: string]: unknown };
  err.name = `ChaosError[${kind}]`;
  err.chaosKind = kind;
  err.traceId = generateTraceId();
  Object.assign(err, extra);
  return err;
}

/** Tiny unique trace id (no UUID dep needed for chaos-only). */
export function generateTraceId(): string {
  const t = Date.now().toString(36);
  const r = Math.random().toString(36).slice(2, 10);
  return `chaos-${t}-${r}`;
}

/* ────────────────────────────────────────────────────────────────────────────
 * Throttle — token bucket
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * A token-bucket throttle. Caller asks for a token before each op; if none
 * is available, op is delayed until the next refill tick.
 *
 * Used by scenario 03 (rate-limit / thundering herd) to cap the rate at
 * which the test driver lets requests through, simulating a real upstream
 * rate limiter without hitting any external service.
 */
export function makeThrottle(rps: number, burst = rps) {
  // Mutable bucket state lives in a single object so the closures below
  // and the public `reset` share the same cells.
  const state = { tokens: burst, last: Date.now() };
  const refillInterval = Math.max(1, Math.floor(1000 / rps));
  return {
    /** wait until a token is available, then consume one */
    async acquire(): Promise<void> {
      while (true) {
        const now = Date.now();
        const elapsed = now - state.last;
        const gained = Math.floor(elapsed / refillInterval);
        if (gained > 0) {
          state.tokens = Math.min(burst, state.tokens + gained);
          state.last = now;
        }
        if (state.tokens > 0) {
          state.tokens -= 1;
          return;
        }
        await new Promise((r) => setTimeout(r, refillInterval));
      }
    },
    /** reset internal state (test isolation) */
    reset() {
      state.tokens = burst;
      state.last = Date.now();
    },
    /** current available tokens (for assertions) */
    get available(): number {
      return state.tokens;
    },
  };
}

/* ────────────────────────────────────────────────────────────────────────────
 * Fetch injector — monkey-patches globalThis.fetch
 * ──────────────────────────────────────────────────────────────────────────── */

export type FetchPredicate = (url: string, init: RequestInit) => boolean;

export interface FetchInjectOptions {
  /** only intercept calls matching this predicate (default: all) */
  match?: FetchPredicate;
  /** status code to return when kind is "fail" (default 500) */
  status?: number;
  /** body to return when kind is "fail" (default "") */
  body?: string;
  /** headers to return with the synthetic response (default {}) */
  headers?: Record<string, string>;
  /** millis to delay before responding (default 0) */
  latencyMs?: number;
}

let _fetchInjectorId = 0;

/**
 * Install a fetch interceptor that returns a synthetic failure response
 * (optionally delayed) for any URL matching `match`. Records each
 * interception on the returned `ChaosInjector`.
 */
export function injectFetchFail(opts: FetchInjectOptions = {}): ChaosInjector {
  const id = `fetch-fail-${++_fetchInjectorId}`;
  const events: ChaosEvent[] = [];
  const original = globalThis.fetch;
  const match = opts.match ?? (() => true);
  const status = opts.status ?? 500;
  const body = opts.body ?? "";
  const headers = opts.headers ?? {};
  const latency = opts.latencyMs ?? 0;

  globalThis.fetch = (async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const url = typeof input === "string" ? input : input.toString();
    if (!match(url, init)) {
      return original.call(globalThis, input as any, init);
    }
    if (latency > 0) await delay(latency, undefined);
    events.push({ kind: "fail", host: "fetch", at: Date.now(), detail: { url, status } });
    return new Response(body, { status, headers });
  }) as typeof fetch;

  return {
    id,
    host: "fetch",
    events,
    restore() {
      globalThis.fetch = original;
    },
  };
}

/**
 * Install a fetch interceptor that delays every matching request by `ms`.
 */
export function injectFetchDelay(ms: number, opts: FetchInjectOptions = {}): ChaosInjector {
  const id = `fetch-delay-${++_fetchInjectorId}`;
  const events: ChaosEvent[] = [];
  const original = globalThis.fetch;
  const match = opts.match ?? (() => true);

  globalThis.fetch = (async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const url = typeof input === "string" ? input : input.toString();
    if (!match(url, init)) {
      return original.call(globalThis, input as any, init);
    }
    events.push({ kind: "delay", host: "fetch", at: Date.now(), detail: { url, ms } });
    // Honor caller-provided AbortSignal: if the SUT aborts the fetch,
    // we must reject immediately rather than waiting the full delay.
    await new Promise<void>((resolve, reject) => {
      const signal = (init as RequestInit)?.signal;
      if (signal?.aborted) {
        reject(new DOMException("The operation was aborted.", "AbortError"));
        return;
      }
      const onAbort = () => {
        clearTimeout(timer);
        reject(new DOMException("The operation was aborted.", "AbortError"));
      };
      const timer = setTimeout(() => {
        signal?.removeEventListener("abort", onAbort);
        resolve();
      }, ms);
      signal?.addEventListener("abort", onAbort, { once: true });
    });
    return original.call(globalThis, input as any, init);
  }) as typeof fetch;

  return {
    id,
    host: "fetch",
    events,
    restore() {
      globalThis.fetch = original;
    },
  };
}

/* ────────────────────────────────────────────────────────────────────────────
 * FS injector — simulates ENOSPC on a directory
 * ──────────────────────────────────────────────────────────────────────────── */

let _fsInjectorId = 0;

/**
 * Make `fs.writeFileSync` (and friends) fail with ENOSPC for any path under
 * `dir`. Other paths pass through untouched. Used by scenario 06.
 */
export function injectFsEnospc(dir: string): ChaosInjector {
  const id = `fs-enospc-${++_fsInjectorId}`;
  const events: ChaosEvent[] = [];
  const original = fs.writeFileSync;
  const originalAppend = fs.appendFileSync;

  const fail = (target: string, op: string) => {
    const err: NodeJS.ErrnoException = new Error(`ENOSPC: chaos-injected disk full on ${target}`);
    err.code = "ENOSPC";
    err.errno = -28;
    err.path = target;
    err.syscall = op;
    events.push({ kind: "fail", host: "fs", at: Date.now(), detail: { target, code: "ENOSPC" } });
    throw err;
  };

  fs.writeFileSync = ((target: any, data: any, options?: any) => {
    const p = typeof target === "string" ? target : target?.toString?.() ?? "";
    if (p.startsWith(dir)) fail(p, "write");
    return original.call(fs, target, data, options);
  }) as typeof fs.writeFileSync;

  fs.appendFileSync = ((target: any, data: any, options?: any) => {
    const p = typeof target === "string" ? target : target?.toString?.() ?? "";
    if (p.startsWith(dir)) fail(p, "append");
    return originalAppend.call(fs, target, data, options);
  }) as typeof fs.appendFileSync;

  return {
    id,
    host: "fs",
    events,
    restore() {
      fs.writeFileSync = original;
      fs.appendFileSync = originalAppend;
    },
  };
}

/* ────────────────────────────────────────────────────────────────────────────
 * Sqlite injector — closes the handle mid-request
 * ──────────────────────────────────────────────────────────────────────────── */

let _sqliteInjectorId = 0;

/**
 * Install a watchdog that calls `db.close()` after `delayMs` and then on
 * the next query call emits an `error` event on the db. The scenario can
 * pass the db handle and observe retry behavior. The injector records
 * each interception.
 *
 * The actual close is performed by the scenario's own retry path — we
 * just provide the `forceClose` callback. This keeps the injector pure.
 */
export function injectSqliteClose(forceClose: () => void, delayMs = 0): ChaosInjector {
  const id = `sqlite-close-${++_sqliteInjectorId}`;
  const events: ChaosEvent[] = [];
  const t = setTimeout(() => {
    events.push({ kind: "fail", host: "sqlite", at: Date.now(), detail: { mode: "close" } });
    try {
      forceClose();
    } catch {
      // already closed — that's fine, the scenario's retry path will trip too
    }
  }, delayMs);
  return {
    id,
    host: "sqlite",
    events,
    restore() {
      clearTimeout(t);
    },
  };
}

/* ────────────────────────────────────────────────────────────────────────────
 * WS injector — drops a connection mid-stream
 * ──────────────────────────────────────────────────────────────────────────── */

let _wsInjectorId = 0;

export interface WsHandle {
  /** forcibly close the underlying socket (simulates network drop) */
  drop(): void;
  /** label for logs */
  label: string;
}

/**
 * Wrap a real WebSocket (or any object with a `.close()` and an
 * underlying socket) so that `dropAfter(ms)` will forcibly close it
 * after `ms` milliseconds. The wrapper records the drop on the
 * returned injector.
 */
export function injectWsDropAfter(ws: WsHandle, ms: number): ChaosInjector {
  const id = `ws-drop-${++_wsInjectorId}`;
  const events: ChaosEvent[] = [];
  const t = setTimeout(() => {
    events.push({ kind: "drop", host: "ws", at: Date.now(), detail: { label: ws.label } });
    try {
      ws.drop();
    } catch {
      // already gone
    }
  }, ms);
  return {
    id,
    host: "ws",
    events,
    restore() {
      clearTimeout(t);
    },
  };
}

/* ────────────────────────────────────────────────────────────────────────────
 * OTEL injector — fails the export path for N ms
 * ──────────────────────────────────────────────────────────────────────────── */

let _otelInjectorId = 0;

export interface OtelExporterHandle {
  /** simulate the collector being unreachable; calling this signals start */
  startOutage(durationMs: number): void;
  /** true while the injected outage is active */
  isOutaged(): boolean;
  /** number of spans dropped during outage (the scenario tracks this) */
  dropped: number;
}

/**
 * Inject an OTLP collector outage. While the outage is active the
 * scenario is responsible for not attempting to export (or for
 * buffering). The injector just records events.
 */
export function injectOtelOutage(handle: OtelExporterHandle, durationMs: number): ChaosInjector {
  const id = `otel-out-${++_otelInjectorId}`;
  const events: ChaosEvent[] = [];
  events.push({ kind: "fail", host: "otel", at: Date.now(), detail: { durationMs } });
  handle.startOutage(durationMs);
  return {
    id,
    host: "otel",
    events,
    restore() {
      // Outage self-recovers when durationMs elapses; nothing to undo.
    },
  };
}

/* ────────────────────────────────────────────────────────────────────────────
 * Aggregate injector — wrap multiple injectors so a single `restore()`
 * releases all of them in LIFO order (matches the runner's cleanup).
 * ──────────────────────────────────────────────────────────────────────────── */

export function bundleInjectors(...injectors: ChaosInjector[]): ChaosInjector {
  return {
    id: `bundle-${injectors.map((i) => i.id).join("+")}`,
    host: "fetch",
    events: injectors.flatMap((i) => i.events),
    restore() {
      // LIFO order so later injectors (which may rely on earlier ones
      // still being installed) tear down first.
      for (let i = injectors.length - 1; i >= 0; i--) {
        try {
          injectors[i].restore();
        } catch {
          // best-effort
        }
      }
    },
  };
}