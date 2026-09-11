import { createHash } from "node:crypto";
import * as nodeModule from "node:module";
import { getTlsClientTimeoutConfig } from "@/shared/utils/runtimeTimeouts";

const runtimeRequire = nodeModule.createRequire(import.meta.url);

function loadRuntimeModule(moduleName: string): unknown {
  // Keep the specifier dynamic. Turbopack rewrites a literal createRequire call
  // to a hashed external name that is absent from the standalone Docker runtime.
  return Reflect.apply(runtimeRequire, undefined, [moduleName]);
}

export type WreqTransportLike = {
  close: () => Promise<void> | void;
};

export type WreqTransportResponseLike = {
  status: number;
  headers:
    | Record<string, string[]>
    | (Iterable<[string, string]> & {
        getSetCookie?: () => string[];
      });
  body:
    | string
    | (Pick<ReadableStream<Uint8Array>, "getReader"> & {
        cancel?: (reason?: unknown) => Promise<void>;
      })
    | null;
  text?: () => Promise<string>;
  bytes?: () => Promise<Uint8Array>;
};

export type WreqTransportRuntime = {
  createTransport: (options: Record<string, unknown>) => Promise<WreqTransportLike>;
  fetch: (url: string, options: Record<string, unknown>) => Promise<WreqTransportResponseLike>;
};

export type WreqTransportRuntimeLoader = () => Promise<WreqTransportRuntime>;

export type WreqTransportRequestPromise = Promise<WreqTransportResponseLike> & {
  /** Close this request's exact transport generation if it is still current. */
  invalidateTransport: () => void;
  /** Mark this request complete so its idle transport may be reused or evicted. */
  releaseTransport: () => void;
};

export type WreqTransportRequestClient = {
  request: (url: string, options: Record<string, unknown>) => WreqTransportRequestPromise;
};

export class WreqRuntimeUnavailableError extends Error {
  override name = "WreqRuntimeUnavailableError";
}

export class WreqTransportCapacityError extends Error {
  override name = "WreqTransportCapacityError";
  readonly code = "TLS_SESSION_CAPACITY";
}

type EmulationOs = "windows" | "macos" | "linux" | "android" | "ios";

let wreqRuntimeModule: Record<string, unknown> | null = null;
let wreqRuntimeModuleError: unknown;
let wreqRuntimeModuleResolved = false;

function getWreqRuntimeModule(): Record<string, unknown> {
  if (!wreqRuntimeModuleResolved) {
    wreqRuntimeModuleResolved = true;
    try {
      wreqRuntimeModule = loadRuntimeModule("wreq-js") as Record<string, unknown>;
    } catch (error) {
      wreqRuntimeModuleError = error;
    }
  }
  if (wreqRuntimeModule) return wreqRuntimeModule;
  throw wreqRuntimeModuleError ?? new Error("wreq-js runtime unavailable");
}

const TRANSPORT_POOL_KEY = Symbol.for("omniroute.wreqTransportPool.instance");
const TRANSPORT_POOL_LIFECYCLE_KEY = Symbol.for("omniroute.wreqTransportPool.lifecycle");
type WreqLifecycleResource = {
  closeAll: () => Promise<void> | void;
};
const transportPoolGlobal = globalThis as typeof globalThis & {
  [TRANSPORT_POOL_KEY]?: WreqTransportPool;
  [TRANSPORT_POOL_LIFECYCLE_KEY]?: {
    pools: Set<WreqLifecycleResource>;
    exitHookInstalled: boolean;
  };
};

function registerWreqLifecycleResource(resource: WreqLifecycleResource): void {
  const lifecycle = transportPoolGlobal[TRANSPORT_POOL_LIFECYCLE_KEY] ?? {
    pools: new Set<WreqLifecycleResource>(),
    exitHookInstalled: false,
  };
  transportPoolGlobal[TRANSPORT_POOL_LIFECYCLE_KEY] = lifecycle;
  lifecycle.pools.add(resource);
  if (lifecycle.exitHookInstalled) return;
  lifecycle.exitHookInstalled = true;
  process.once("exit", () => {
    for (const registered of lifecycle.pools) {
      try {
        void registered.closeAll();
      } catch {
        // Process shutdown is best effort; every close has already been initiated.
      }
    }
    lifecycle.pools.clear();
  });
}

async function closeWreqLifecycleResources(): Promise<void> {
  const resources = [...(transportPoolGlobal[TRANSPORT_POOL_LIFECYCLE_KEY]?.pools ?? [])];
  await Promise.allSettled(
    resources.map((resource) => Promise.resolve().then(() => resource.closeAll()))
  );
}

/** Focused-test seam for proving the shared process lifecycle without emitting `exit`. */
export async function __closeWreqLifecycleResourcesForTesting(): Promise<void> {
  await closeWreqLifecycleResources();
}

function loadWreqTransportRuntime(): Promise<WreqTransportRuntime> {
  try {
    const loaded = getWreqRuntimeModule() as Partial<WreqTransportRuntime>;
    if (typeof loaded.createTransport !== "function" || typeof loaded.fetch !== "function") {
      throw new Error("wreq-js runtime is missing createTransport/fetch");
    }
    return Promise.resolve(loaded as WreqTransportRuntime);
  } catch (error) {
    return Promise.reject(error);
  }
}

type WreqTransportEntry = {
  pending: Promise<WreqTransportLike>;
  transport: WreqTransportLike | null;
  activeRequests: number;
  lastUsed: number;
  closed: boolean;
  closing: Promise<void> | null;
};

type WreqTransportLease = {
  key: string | null;
  entry: WreqTransportEntry | null;
  released: boolean;
  invalidated: boolean;
};

class WreqTransportPool {
  private runtimePromise: Promise<WreqTransportRuntime> | null = null;
  private readonly transports = new Map<string, WreqTransportEntry>();
  private readonly pendingCloses = new Set<Promise<void>>();
  private readonly maxTransports: number;
  private capacityReservations = 0;
  private accessSequence = 0;

  constructor(
    private readonly runtimeLoader: WreqTransportRuntimeLoader,
    maxTransports = 128
  ) {
    this.maxTransports = Number.isInteger(maxTransports) && maxTransports > 0 ? maxTransports : 128;
  }

  private getRuntime(): Promise<WreqTransportRuntime> {
    if (!this.runtimePromise) {
      const pending = this.runtimeLoader().catch((error: unknown) => {
        if (this.runtimePromise === pending) this.runtimePromise = null;
        throw new WreqRuntimeUnavailableError(
          error instanceof Error && error.message
            ? `wreq-js runtime unavailable: ${error.message}`
            : "wreq-js runtime unavailable"
        );
      });
      this.runtimePromise = pending;
    }
    return this.runtimePromise;
  }

  private key(browser: string, os: EmulationOs, options: Record<string, unknown>): string {
    const proxy = typeof options.proxyUrl === "string" ? options.proxyUrl : "";
    return `${browser}\0${os}\0${proxy}`;
  }

  private closeEntry(key: string, entry: WreqTransportEntry): Promise<void> {
    if (this.transports.get(key) !== entry) return entry.closing ?? Promise.resolve();
    this.transports.delete(key);
    if (entry.closed) return entry.closing ?? Promise.resolve();
    entry.closed = true;
    let closing: Promise<void>;
    try {
      closing = entry.transport
        ? Promise.resolve(entry.transport.close()).then(() => undefined)
        : entry.pending.then((transport) => transport.close()).then(() => undefined);
    } catch {
      closing = Promise.resolve();
    }
    closing = closing
      .catch(() => {
        // Close is best-effort after eviction; capacity is released by the finalizer below.
      })
      .finally(() => {
        this.pendingCloses.delete(closing);
      });
    entry.closing = closing;
    this.pendingCloses.add(closing);
    return closing;
  }

  private findOldestIdleEntry(): [string, WreqTransportEntry] | undefined {
    let candidate: [string, WreqTransportEntry] | undefined;
    for (const pair of this.transports) {
      const [, entry] = pair;
      if (entry.activeRequests > 0) continue;
      if (!candidate || entry.lastUsed < candidate[1].lastUsed) candidate = pair;
    }
    return candidate;
  }

  private reserveCapacity(): Promise<void> | null {
    const occupied = this.transports.size + this.pendingCloses.size + this.capacityReservations;
    this.capacityReservations += 1;
    if (occupied < this.maxTransports) return null;

    const candidate = this.findOldestIdleEntry();
    if (!candidate) {
      this.capacityReservations -= 1;
      throw new WreqTransportCapacityError(
        `wreq-js transport capacity exhausted (${this.maxTransports} active proxy/profile keys)`
      );
    }
    return this.closeEntry(candidate[0], candidate[1]);
  }

  private releaseCapacityReservation(): void {
    this.capacityReservations = Math.max(0, this.capacityReservations - 1);
  }

  private releaseLease(lease: WreqTransportLease): void {
    if (lease.released) return;
    lease.released = true;
    const entry = lease.entry;
    if (!entry) return;
    entry.activeRequests = Math.max(0, entry.activeRequests - 1);
    entry.lastUsed = ++this.accessSequence;
  }

  private invalidateLease(lease: WreqTransportLease): void {
    if (lease.invalidated) return;
    lease.invalidated = true;
    if (lease.key && lease.entry) this.closeEntry(lease.key, lease.entry);
    this.releaseLease(lease);
  }

  async closeAll(): Promise<void> {
    const closes = [...this.transports].map(([key, entry]) => this.closeEntry(key, entry));
    await Promise.allSettled([...closes, ...this.pendingCloses]);
  }

  client(browser: string, os: EmulationOs): WreqTransportRequestClient {
    registerWreqLifecycleResource(this);
    return {
      request: (url, options) => {
        const lease: WreqTransportLease = {
          key: null,
          entry: null,
          released: false,
          invalidated: false,
        };
        const request = (async () => {
          const runtime = await this.getRuntime();
          if (lease.released) throw new Error("wreq-js request lease was released before dispatch");

          const key = this.key(browser, os, options);
          let entry = this.transports.get(key);
          if (!entry) {
            const capacityWait = this.reserveCapacity();
            try {
              if (capacityWait) await capacityWait;
              if (lease.released) {
                throw new Error("wreq-js request lease was released before dispatch");
              }
              entry = this.transports.get(key);
              if (!entry) {
                const proxy = typeof options.proxyUrl === "string" ? options.proxyUrl : undefined;
                const transportOptions: Record<string, unknown> = { browser, os };
                if (proxy) transportOptions.proxy = proxy;
                let createdEntry: WreqTransportEntry;
                const pending = runtime.createTransport(transportOptions).then((transport) => {
                  createdEntry.transport = transport;
                  return transport;
                });
                entry = {
                  pending,
                  transport: null,
                  activeRequests: 0,
                  lastUsed: ++this.accessSequence,
                  closed: false,
                  closing: null,
                };
                createdEntry = entry;
                this.transports.set(key, entry);
                void pending.catch(() => {
                  if (this.transports.get(key) === createdEntry) this.transports.delete(key);
                  createdEntry.closed = true;
                });
              }
            } finally {
              this.releaseCapacityReservation();
            }
          }

          lease.key = key;
          lease.entry = entry;
          entry.activeRequests += 1;
          entry.lastUsed = ++this.accessSequence;

          const transport = await entry.pending;
          if (lease.released) throw new Error("wreq-js request lease was released before dispatch");
          return runtime.fetch(url, {
            method: options.method,
            headers: options.headers,
            body: options.body,
            redirect: "follow",
            timeout: options.timeoutMilliseconds,
            signal: options.signal,
            transport,
            cookieMode: "ephemeral",
          });
        })() as WreqTransportRequestPromise;

        Object.defineProperties(request, {
          invalidateTransport: {
            value: () => this.invalidateLease(lease),
          },
          releaseTransport: {
            value: () => this.releaseLease(lease),
          },
        });
        void request.catch(() => this.releaseLease(lease));
        return request;
      },
    };
  }
}

/**
 * Build an ephemeral-cookie wreq client backed by the process-wide transport pool.
 * Tests that inject a runtime loader receive an isolated pool to avoid cross-test state.
 */
export function createWreqTransportClient(options: {
  browser: string;
  os: EmulationOs;
  runtimeLoader?: WreqTransportRuntimeLoader;
  maxTransports?: number;
}): WreqTransportRequestClient {
  if (options.runtimeLoader) {
    return new WreqTransportPool(options.runtimeLoader, options.maxTransports).client(
      options.browser,
      options.os
    );
  }
  const pool =
    transportPoolGlobal[TRANSPORT_POOL_KEY] ??
    new WreqTransportPool(loadWreqTransportRuntime, options.maxTransports);
  transportPoolGlobal[TRANSPORT_POOL_KEY] = pool;
  return pool.client(options.browser, options.os);
}

export type WreqResponse = {
  status: number;
  statusText: string;
  headers: Iterable<[string, string]>;
  body: ReadableStream<Uint8Array> | null;
  url?: string;
  redirected?: boolean;
};

export type WreqSession = {
  fetch: (url: string, options?: Record<string, unknown>) => Promise<WreqResponse>;
  close: () => Promise<void> | void;
  getCookies?: (url: string | URL) => Record<string, string>;
};

export type CreateSessionFn = (options: Record<string, unknown>) => Promise<WreqSession>;

let createSession: CreateSessionFn | null;
try {
  const loaded = getWreqRuntimeModule() as { createSession?: CreateSessionFn };
  createSession = typeof loaded.createSession === "function" ? loaded.createSession : null;
} catch {
  if (process.env.ENABLE_TLS_FINGERPRINT === "true") {
    console.warn("[TlsClient] wreq-js unavailable; TLS fingerprint transport disabled");
  }
  createSession = null;
}

/**
 * Get proxy URL from environment variables.
 * Priority: HTTPS_PROXY > HTTP_PROXY > ALL_PROXY
 */
function getProxyFromEnv(): string | undefined {
  return (
    process.env.HTTPS_PROXY ||
    process.env.https_proxy ||
    process.env.HTTP_PROXY ||
    process.env.http_proxy ||
    process.env.ALL_PROXY ||
    process.env.all_proxy ||
    undefined
  );
}

export type WreqBodyInit =
  string | ArrayBuffer | ArrayBufferView | URLSearchParams | Buffer | Blob | FormData | null;

export interface TlsFetchOptions {
  method?: string;
  headers?: HeadersInit;
  body?: WreqBodyInit;
  redirect?: RequestRedirect;
  signal?: AbortSignal | null;
  /** Exact resolved proxy. Undefined preserves legacy environment lookup; null means direct. */
  proxy?: string | null;
  /** Stable account/connection identity used to isolate cookies and circuit state. */
  sessionScope?: string;
}

function normalizeHeaders(headers: HeadersInit | undefined): Record<string, string> | undefined {
  if (!headers) return undefined;

  if (headers instanceof Headers) {
    return Object.fromEntries(headers.entries());
  }

  if (Array.isArray(headers)) {
    return Object.fromEntries(headers.map(([key, value]) => [key, String(value)]));
  }

  const normalized: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    if (typeof value === "string") {
      normalized[key] = value;
    }
  }
  return normalized;
}

type SafeWreqError = Error & {
  code?: string;
  errorCode?: string;
  statusCode?: number;
};

function sanitizeWreqError(error: unknown, message: string): SafeWreqError {
  const sanitized = new Error(message) as SafeWreqError;
  if (!error || typeof error !== "object") return sanitized;
  if ("code" in error && typeof error.code === "string" && /^[A-Z0-9_:-]{1,64}$/.test(error.code)) {
    sanitized.code = error.code;
  }
  if (
    "errorCode" in error &&
    typeof error.errorCode === "string" &&
    /^[a-zA-Z0-9_:-]{1,64}$/.test(error.errorCode)
  ) {
    sanitized.errorCode = error.errorCode;
  }
  if (
    "statusCode" in error &&
    typeof error.statusCode === "number" &&
    Number.isFinite(error.statusCode)
  ) {
    sanitized.statusCode = error.statusCode;
  }
  return sanitized;
}

function toNativeResponse(
  response: WreqResponse,
  onFinalize: () => void,
  onBodyError: () => void,
  signal?: AbortSignal | null
): Response {
  let finalized = false;
  let bodyFailureReported = false;
  let consumerCancelled = false;
  let consumerCancelReason: unknown;
  const finalize = () => {
    if (finalized) return;
    finalized = true;
    onFinalize();
  };
  const safeBodyError = (error: unknown): unknown => {
    if (signal?.aborted) {
      return signal.reason ?? new DOMException("The operation was aborted", "AbortError");
    }
    if (consumerCancelled) {
      return (
        consumerCancelReason ?? new DOMException("The response body was cancelled", "AbortError")
      );
    }
    if (!bodyFailureReported) {
      bodyFailureReported = true;
      onBodyError();
    }
    return sanitizeWreqError(error, "wreq-js response body failed");
  };
  if (response instanceof Response) {
    finalize();
    return response;
  }

  try {
    const headers = new Headers();
    for (const [name, value] of response.headers) headers.append(name, value);
    let body: ReadableStream<Uint8Array> | null = null;
    if (response.body) {
      const reader = response.body.getReader();
      body = new ReadableStream<Uint8Array>({
        async pull(controller) {
          try {
            const chunk = await reader.read();
            if (chunk.done) {
              finalize();
              controller.close();
            } else {
              controller.enqueue(chunk.value);
            }
          } catch (error) {
            controller.error(safeBodyError(error));
            finalize();
          }
        },
        async cancel(reason) {
          consumerCancelled = true;
          consumerCancelReason = reason;
          try {
            await reader.cancel(reason);
          } catch (error) {
            throw safeBodyError(error);
          } finally {
            finalize();
          }
        },
      });
    } else {
      finalize();
    }
    const adapted = new Response(body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
    if (response.url) {
      Object.defineProperty(adapted, "url", { value: response.url, configurable: true });
    }
    if (response.redirected !== undefined) {
      Object.defineProperty(adapted, "redirected", {
        value: response.redirected,
        configurable: true,
      });
    }
    return adapted;
  } catch (error) {
    finalize();
    throw error;
  }
}

/**
 * TLS Client — Chrome 124 TLS fingerprint spoofing via wreq-js.
 * Sessions, cookie jars, and circuit state are isolated by account scope and exact proxy.
 */
export class TlsClient {
  private readonly createSessionFn: CreateSessionFn | null;
  private readonly sessions = new Map<string, WreqSession>();
  private readonly pendingSessions = new Map<string, Promise<WreqSession>>();
  private readonly pendingCloses = new Set<Promise<void>>();
  private readonly sessionEpochs = new Map<string, number>();
  private readonly sessionUseCounts = new Map<string, number>();
  private readonly sessionLastUsed = new Map<string, number>();
  private readonly pendingEvictions = new Set<string>();
  private accessSequence = 0;
  private readonly circuits = new Map<
    string,
    {
      failureCount: number;
      cooldownMs: number;
      cooldownMultiplier: number;
      circuitOpenUntil: number;
      circuitTripped: boolean;
      halfOpenInFlight: boolean;
      sessionHadCookies: boolean;
    }
  >();
  private globalSessionEpoch = 0;
  private readonly maxFailures = 3;
  private readonly baseCooldownMs = 30_000;
  private readonly maxCooldownMs = 600_000;
  private readonly legacySessionScope = "legacy";
  private readonly _libraryAvailable: boolean;
  private readonly maxSessions: number;

  constructor(
    createSessionFn: CreateSessionFn | null = createSession,
    maxSessions = 128,
    registerLifecycle = false
  ) {
    this.createSessionFn = createSessionFn;
    this._libraryAvailable = !!createSessionFn;
    this.maxSessions = Number.isInteger(maxSessions) && maxSessions > 0 ? maxSessions : 128;
    if (registerLifecycle) registerWreqLifecycleResource(this);
  }

  /** Library availability only. Per-session circuit state is enforced inside fetch(). */
  get available(): boolean {
    return this._libraryAvailable;
  }

  private resolveProxy(proxy?: string | null): string | null {
    return proxy === undefined ? (getProxyFromEnv() ?? null) : proxy;
  }

  private getSessionKey(resolvedProxy: string | null, sessionScope?: string): string {
    const scope = sessionScope?.trim() || this.legacySessionScope;
    return createHash("sha256")
      .update(scope)
      .update("\0")
      .update(resolvedProxy ?? "")
      .digest("base64url");
  }

  private getDefaultSessionKey(): string {
    return this.getSessionKey(this.resolveProxy(undefined), this.legacySessionScope);
  }

  private getSessionEpoch(key: string): number {
    return this.sessionEpochs.get(key) ?? 0;
  }

  private hasSessionCookies(session: WreqSession | null, url: string): boolean {
    if (!session) return false;
    if (!session.getCookies) return true;
    try {
      return Object.keys(session.getCookies(url)).length > 0;
    } catch {
      // If cookie state cannot be inspected, fail closed and forbid replay.
      return true;
    }
  }

  private closeSession(session: WreqSession): Promise<void> {
    let closeResult: Promise<void>;
    try {
      closeResult = Promise.resolve(session.close()).then(() => undefined);
    } catch {
      closeResult = Promise.resolve();
    }
    let closing: Promise<void>;
    closing = closeResult
      .catch(() => {
        // A native close failure must not leak the session-capacity slot.
      })
      .finally(() => {
        this.pendingCloses.delete(closing);
      });
    this.pendingCloses.add(closing);
    return closing;
  }

  private findOldestIdleSession(protectedKey?: string): string | undefined {
    let candidate: string | undefined;
    let candidateSequence = Number.POSITIVE_INFINITY;
    for (const key of this.sessions.keys()) {
      if (key === protectedKey || (this.sessionUseCounts.get(key) ?? 0) > 0) continue;
      const sequence = this.sessionLastUsed.get(key) ?? 0;
      if (sequence < candidateSequence) {
        candidate = key;
        candidateSequence = sequence;
      }
    }
    return candidate;
  }

  private reserveSessionCapacity(protectedKey: string): void {
    if (
      this.pendingSessions.size >= this.maxSessions ||
      this.pendingCloses.size >= this.maxSessions
    ) {
      const error = new Error("wreq-js session capacity exhausted") as Error & {
        code?: string;
      };
      error.code = "TLS_SESSION_CAPACITY";
      throw error;
    }
    while (this.sessions.size >= this.maxSessions) {
      const candidate = this.findOldestIdleSession(protectedKey);
      if (!candidate) {
        const error = new Error("wreq-js session capacity exhausted") as Error & {
          code?: string;
        };
        error.code = "TLS_SESSION_CAPACITY";
        throw error;
      }
      void this.invalidateSession(candidate);
    }
  }

  private retainSession(key: string): void {
    this.pendingEvictions.delete(key);
    this.sessionUseCounts.set(key, (this.sessionUseCounts.get(key) ?? 0) + 1);
    this.sessionLastUsed.set(key, ++this.accessSequence);
  }

  private releaseSession(key: string): void {
    const remaining = (this.sessionUseCounts.get(key) ?? 1) - 1;
    if (remaining > 0) {
      this.sessionUseCounts.set(key, remaining);
      return;
    }
    this.sessionUseCounts.delete(key);
    if (this.pendingEvictions.delete(key)) {
      void this.invalidateSession(key);
      return;
    }
    this.evictSessionsIfNeeded();
  }

  private evictSessionsIfNeeded(protectedKey?: string): void {
    while (this.sessions.size > this.maxSessions) {
      const candidate = this.findOldestIdleSession(protectedKey);
      if (candidate) {
        void this.invalidateSession(candidate);
        continue;
      }

      let activeCandidate: string | undefined;
      let candidateSequence = Number.POSITIVE_INFINITY;
      for (const key of this.sessions.keys()) {
        if (key === protectedKey || this.pendingEvictions.has(key)) continue;
        const sequence = this.sessionLastUsed.get(key) ?? 0;
        if (sequence < candidateSequence) {
          activeCandidate = key;
          candidateSequence = sequence;
        }
      }
      if (activeCandidate) this.pendingEvictions.add(activeCandidate);
      return;
    }
  }

  private invalidateSession(key: string): Promise<void> {
    const pending = this.pendingSessions.get(key);
    const invalidatedEpoch = this.getSessionEpoch(key) + 1;
    this.sessionEpochs.set(key, invalidatedEpoch);
    this.pendingSessions.delete(key);
    this.sessionUseCounts.delete(key);
    this.sessionLastUsed.delete(key);
    this.pendingEvictions.delete(key);
    const session = this.sessions.get(key);
    this.sessions.delete(key);
    if (pending) {
      void pending
        .finally(() => {
          if (
            this.getSessionEpoch(key) === invalidatedEpoch &&
            !this.pendingSessions.has(key) &&
            !this.sessions.has(key)
          ) {
            this.sessionEpochs.delete(key);
          }
        })
        .catch(() => {});
    } else {
      this.sessionEpochs.delete(key);
    }
    return session ? this.closeSession(session) : Promise.resolve();
  }

  async closeAll(): Promise<void> {
    const pending = [...this.pendingSessions.values()];
    this.globalSessionEpoch++;
    this.pendingSessions.clear();
    this.sessionEpochs.clear();
    const sessions = [...this.sessions.values()];
    this.sessions.clear();
    this.sessionUseCounts.clear();
    this.sessionLastUsed.clear();
    this.pendingEvictions.clear();
    this.circuits.clear();
    const closes = sessions.map((session) => this.closeSession(session));
    await Promise.allSettled([...closes, ...pending]);
    await Promise.allSettled([...this.pendingCloses]);
  }

  private checkCircuit(key = this.getDefaultSessionKey()): boolean {
    const state = this.circuits.get(key);
    if (!state || !state.circuitTripped) return true;
    if (Date.now() < state.circuitOpenUntil) return false;
    if (state.halfOpenInFlight) return false;
    state.halfOpenInFlight = true;
    console.log("[TlsClient] Half-open: retrying after cooldown");
    return true;
  }

  private recordFailure(key = this.getDefaultSessionKey(), sessionHadCookies = false): void {
    const state = this.circuits.get(key) ?? {
      failureCount: 0,
      cooldownMs: this.baseCooldownMs,
      cooldownMultiplier: 1,
      circuitOpenUntil: 0,
      circuitTripped: false,
      halfOpenInFlight: false,
      sessionHadCookies: false,
    };
    state.sessionHadCookies ||= sessionHadCookies;
    state.failureCount++;
    state.halfOpenInFlight = false;
    if (state.failureCount >= this.maxFailures) {
      state.circuitOpenUntil = Date.now() + state.cooldownMs;
      state.circuitTripped = true;
      if ((this.sessionUseCounts.get(key) ?? 0) > 0) {
        this.pendingEvictions.add(key);
      } else {
        void this.invalidateSession(key);
      }
      console.warn(
        `[TlsClient] Circuit opened after ${state.failureCount} consecutive failures, cooling down for ${state.cooldownMs}ms`
      );
      state.cooldownMultiplier = Math.min(state.cooldownMultiplier * 2, 20);
      state.cooldownMs = Math.min(
        this.baseCooldownMs * state.cooldownMultiplier,
        this.maxCooldownMs
      );
    }
    this.circuits.delete(key);
    this.circuits.set(key, state);
    const maxCircuitEntries = this.maxSessions * 2;
    while (this.circuits.size > maxCircuitEntries) {
      const oldestKey = this.circuits.keys().next().value;
      if (typeof oldestKey !== "string") break;
      this.circuits.delete(oldestKey);
    }
  }

  private recordSuccess(key = this.getDefaultSessionKey()): void {
    const state = this.circuits.get(key);
    if (state?.circuitTripped) {
      console.log("[TlsClient] Circuit closed (success after cooldown)");
    }
    this.circuits.delete(key);
  }

  private releaseHalfOpen(key: string): void {
    const state = this.circuits.get(key);
    if (state) state.halfOpenInFlight = false;
  }

  private async getSession(resolvedProxy: string | null, key: string): Promise<WreqSession | null> {
    const cached = this.sessions.get(key);
    if (cached) {
      this.pendingEvictions.delete(key);
      this.sessionLastUsed.set(key, ++this.accessSequence);
      return cached;
    }
    const pending = this.pendingSessions.get(key);
    if (pending) return pending;
    if (!this.createSessionFn) return null;
    this.reserveSessionCapacity(key);

    const sessionOpts: Record<string, unknown> = {
      browser: "chrome_124",
      os: "macos",
    };
    if (resolvedProxy) sessionOpts.proxy = resolvedProxy;
    const globalEpoch = this.globalSessionEpoch;
    const sessionEpoch = this.getSessionEpoch(key);

    const creating = Reflect.apply(this.createSessionFn, undefined, [sessionOpts])
      .then(async (session) => {
        if (globalEpoch !== this.globalSessionEpoch || sessionEpoch !== this.getSessionEpoch(key)) {
          await this.closeSession(session);
          throw new Error("wreq-js session invalidated");
        }
        if (this.sessions.size >= this.maxSessions) {
          const candidate = this.findOldestIdleSession(key);
          if (!candidate) {
            await this.closeSession(session);
            const error = new Error("wreq-js session capacity exhausted") as Error & {
              code?: string;
            };
            error.code = "TLS_SESSION_CAPACITY";
            throw error;
          }
          void this.invalidateSession(candidate);
        }
        this.sessions.set(key, session);
        this.sessionLastUsed.set(key, ++this.accessSequence);
        this.evictSessionsIfNeeded(key);
        console.log("[TlsClient] Session created (Chrome 124 TLS fingerprint)");
        return session;
      })
      .finally(() => {
        if (this.pendingSessions.get(key) === creating) {
          this.pendingSessions.delete(key);
          this.sessionEpochs.delete(key);
        }
      });
    this.pendingSessions.set(key, creating);
    return creating;
  }

  /** Fetch with Chrome 124 TLS fingerprint and an account-scoped persistent cookie jar. */
  async fetch(url: string, options: TlsFetchOptions = {}): Promise<Response> {
    const resolvedProxy = this.resolveProxy(options.proxy);
    const key = this.getSessionKey(resolvedProxy, options.sessionScope);
    if (!this.checkCircuit(key)) {
      const state = this.circuits.get(key);
      const error = new Error("wreq-js circuit open — skipping TLS request") as Error & {
        code?: string;
      };
      error.code = "TLS_CIRCUIT_OPEN";
      if (state?.sessionHadCookies) {
        Object.defineProperty(error, "sessionHadCookies", {
          value: true,
          configurable: true,
        });
      }
      throw error;
    }

    let session: WreqSession | null = null;
    let sessionUseRetained = false;
    const releaseSession = () => {
      if (!sessionUseRetained) return;
      sessionUseRetained = false;
      this.releaseSession(key);
    };
    try {
      session = await this.getSession(resolvedProxy, key);
      if (!session) throw new Error("wreq-js not available");
      this.retainSession(key);
      sessionUseRetained = true;
      const { timeoutMs } = getTlsClientTimeoutConfig(process.env, (message) => {
        console.warn(`[TlsClient] ${message}`);
      });

      const wreqOptions: Record<string, unknown> = {
        method: (options.method || "GET").toUpperCase(),
        headers: normalizeHeaders(options.headers),
        body: options.body,
        redirect: options.redirect ?? "follow",
        timeout: timeoutMs,
      };
      if (options.signal) wreqOptions.signal = options.signal;

      const response = toNativeResponse(
        await session.fetch(url, wreqOptions),
        releaseSession,
        () => this.recordFailure(key, this.hasSessionCookies(session, url)),
        options.signal
      );
      this.recordSuccess(key);
      return response;
    } catch (err) {
      const isCallerAbort = options.signal?.aborted === true;
      const sessionHadCookies = !isCallerAbort && this.hasSessionCookies(session, url);
      releaseSession();
      if (isCallerAbort) {
        this.releaseHalfOpen(key);
      } else {
        this.recordFailure(key, sessionHadCookies);
      }
      if (isCallerAbort) throw err;
      const transportError = sanitizeWreqError(err, "wreq-js transport failed");
      if (sessionHadCookies) {
        Object.defineProperty(transportError, "sessionHadCookies", {
          value: true,
          configurable: true,
        });
      }
      throw transportError;
    }
  }

  async exit(): Promise<void> {
    await this.closeAll();
  }

  resetCircuit(proxy?: string | null, sessionScope?: string): void {
    if (arguments.length === 0) {
      this.circuits.clear();
      return;
    }
    const resolvedProxy = this.resolveProxy(proxy);
    this.circuits.delete(this.getSessionKey(resolvedProxy, sessionScope));
  }

  getCircuitState(
    proxy?: string | null,
    sessionScope?: string
  ): {
    available: boolean;
    circuitTripped: boolean;
    failureCount: number;
    circuitOpenUntil: number;
    coolDownRemainingMs: number;
  } {
    const resolvedProxy = this.resolveProxy(proxy);
    const key = this.getSessionKey(resolvedProxy, sessionScope);
    const state = this.circuits.get(key);
    const circuitOpenUntil = state?.circuitOpenUntil ?? 0;
    const circuitTripped = state?.circuitTripped ?? false;
    return {
      available: this._libraryAvailable && (!circuitTripped || Date.now() >= circuitOpenUntil),
      circuitTripped,
      failureCount: state?.failureCount ?? 0,
      circuitOpenUntil,
      coolDownRemainingMs: circuitOpenUntil > 0 ? Math.max(0, circuitOpenUntil - Date.now()) : 0,
    };
  }
}

const TLS_CLIENT_KEY = Symbol.for("omniroute.tlsClient.instance");
const scopedGlobal = globalThis as typeof globalThis & {
  [TLS_CLIENT_KEY]?: TlsClient;
};
const tlsClient = scopedGlobal[TLS_CLIENT_KEY] ?? new TlsClient();
scopedGlobal[TLS_CLIENT_KEY] = tlsClient;
registerWreqLifecycleResource(tlsClient);

export default tlsClient;
