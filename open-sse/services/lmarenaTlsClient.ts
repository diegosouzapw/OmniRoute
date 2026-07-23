/**
 * Browser-TLS-impersonating HTTP client for arena.ai.
 *
 * Why this exists: LMArena sits behind Cloudflare Enterprise which pins
 * `cf_clearance` to the client's TLS fingerprint (JA3/JA4) + HTTP/2 SETTINGS
 * frame ordering. Node's Undici fetch presents an obvious "not a browser"
 * handshake and gets challenged with a 403 even with a valid arena session
 * cookie (and often a browser-minted `cf_clearance`). This module wraps
 * `tls-client-node` (bogdanfinn/tls-client) to send a Chrome handshake instead.
 *
 * Mirrors `grokTlsClient.ts` / `perplexityTlsClient.ts` as an independent
 * module so changes here cannot regress those production paths.
 *
 * Note: Arena may still require a browser-issued reCAPTCHA v3 token on
 * create-evaluation; TLS alone is necessary but not always sufficient.
 */

import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { mkdtemp, open, unlink, rmdir, stat } from "node:fs/promises";
import { randomUUID } from "node:crypto";

let clientPromise: Promise<unknown> | null = null;
let exitHookInstalled = false;

// Newest Chrome JA3 profile shipped by tls-client-node (no chrome_147+ yet).
// HTTP User-Agent / Sec-Ch-Ua track Chrome 150 separately in models.ts.
const LMARENA_PROFILE = "chrome_146";
// Fixed timeouts (same defaults as other TLS sidecars). No extra env knobs —
// env-doc-sync must not grow for provider-local constants.
const DEFAULT_TIMEOUT_MS = 60_000;
// Grace period added to the binding's wire-level timeout before our JS-level
// hard timeout fires. Under healthy operation `tls-client-node` honors
// `timeoutMilliseconds` and rejects on its own; the JS-level race only wins
// when the koffi-loaded native library is wedged (which the binding's own
// timer can't escape).
const HARD_TIMEOUT_GRACE_MS = 10_000;

function installExitHook(): void {
  if (exitHookInstalled) return;
  exitHookInstalled = true;
  const stop = async () => {
    if (clientPromise === null) return;
    try {
      const c = (await clientPromise) as { stop?: () => Promise<unknown> };
      await c.stop?.();
    } catch {
      // ignore
    }
  };
  process.once("beforeExit", stop);
  process.once("SIGINT", () => {
    void stop();
  });
  process.once("SIGTERM", () => {
    void stop();
  });
}

/**
 * Drop the cached client so the next `getClient()` call respawns it. Called
 * when a request observes the native binding has wedged — releasing the
 * reference lets a fresh TLSClient (and a fresh koffi load) take over without
 * a process restart.
 */
function resetClientCache(): void {
  clientPromise = null;
}

export class TlsClientHangError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TlsClientHangError";
  }
}

/**
 * Race a `client.request()` promise against (a) a JS-level hard timeout and
 * (b) the caller's abort signal. The native binding's `timeoutMilliseconds`
 * already covers the wire path; this guards the case where the koffi binding
 * itself deadlocks (observed after sustained load), where neither the
 * binding's own timer nor a post-call `signal.aborted` re-check can recover.
 */
async function raceWithTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  signal: AbortSignal | null | undefined
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let abortListener: (() => void) | null = null;
  try {
    const racers: Promise<T>[] = [
      promise,
      new Promise<T>((_, reject) => {
        timer = setTimeout(() => {
          reject(
            new TlsClientHangError(
              `tls-client-node call exceeded ${timeoutMs}ms — native binding likely deadlocked`
            )
          );
        }, timeoutMs);
      }),
    ];
    if (signal) {
      racers.push(
        new Promise<T>((_, reject) => {
          if (signal.aborted) {
            reject(makeAbortError(signal));
            return;
          }
          abortListener = () => reject(makeAbortError(signal));
          signal.addEventListener("abort", abortListener, { once: true });
        })
      );
    }
    return await Promise.race(racers);
  } finally {
    if (timer) clearTimeout(timer);
    if (signal && abortListener) signal.removeEventListener("abort", abortListener);
  }
}

async function getClient(): Promise<{
  request: (url: string, opts: Record<string, unknown>) => Promise<TlsResponseLike>;
}> {
  if (!clientPromise) {
    clientPromise = (async () => {
      try {
        const mod = await import("tls-client-node");
        const TLSClient = (mod as { TLSClient: new (opts?: Record<string, unknown>) => unknown })
          .TLSClient;
        // Native mode loads the shared library directly via koffi, avoiding the
        // managed sidecar's localhost HTTP calls that OmniRoute's global fetch
        // proxy patch interferes with.
        const client = new TLSClient({ runtimeMode: "native" }) as {
          start: () => Promise<void>;
          request: (url: string, opts: Record<string, unknown>) => Promise<TlsResponseLike>;
        };
        await client.start();

        installExitHook();
        return client;
      } catch (err) {
        clientPromise = null;
        const msg = err instanceof Error ? err.message : String(err);
        throw new TlsClientUnavailableError(
          `TLS impersonation client failed to start: ${msg}. ` +
            `Verify tls-client-node is installed and its native binary downloaded.`
        );
      }
    })();
  }
  return clientPromise as Promise<{
    request: (url: string, opts: Record<string, unknown>) => Promise<TlsResponseLike>;
  }>;
}

interface TlsResponseLike {
  status: number;
  headers: Record<string, string[]>;
  body: string; // for non-streaming requests, the full response body
  cookies?: Record<string, string>;
  text: () => Promise<string>;
  bytes: () => Promise<Uint8Array>;
  json: <T = unknown>() => Promise<T>;
}

export class TlsClientUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TlsClientUnavailableError";
  }
}

export interface TlsFetchOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: string;
  timeoutMs?: number;
  signal?: AbortSignal | null;
  /**
   * If true, the response body is streamed to a temp file and exposed as a
   * ReadableStream<Uint8Array>. Use for NDJSON streaming responses (the
   * LMArena conversation endpoint). Otherwise, the full body is read into memory.
   */
  stream?: boolean;
  /** EOF marker the upstream sends to signal end of stream (default: "[DONE]"). */
  streamEofSymbol?: string;
  /**
   * Optional upstream proxy URL (`http://user:pass@host:port` or
   * `socks5://...`). When set, the request is tunneled through this proxy
   * before reaching arena.ai.
   *
   * Resolution order:
   *   1. `options.proxyUrl` (per-call override from caller)
   *   2. `process.env.OMNIROUTE_TLS_PROXY_URL` (single-flag opt-in)
   *   3. `process.env.HTTPS_PROXY` / `HTTP_PROXY` / `ALL_PROXY` (POSIX-standard fallback)
   *
   * The native `tls-client-node` binding does **not** consult Go's
   * `http.ProxyFromEnvironment`, so the env vars need to be plumbed in here at
   * the JS layer.
   */
  proxyUrl?: string;
}

import { resolveProxyForRequest } from "../utils/proxyFetch.ts";
import { resolveTlsClientProxyUrl } from "./tlsClientProxy.ts";

/**
 * Resolve the proxy URL for a tls-client request. Per-call value wins;
 * otherwise we use the standard proxy fetch resolution which reads from
 * the dashboard AsyncLocalStorage context or falls back to env vars.
 *
 * Fail-closed: if resolution throws (e.g. a configured socks5 proxy with
 * ENABLE_SOCKS5_PROXY=false), this rethrows rather than returning undefined —
 * undefined would let the native binding connect directly and leak the real IP.
 */
function resolveProxyUrl(perCall: string | undefined): string | undefined {
  return resolveTlsClientProxyUrl("https://arena.ai", perCall, resolveProxyForRequest);
}

export interface TlsFetchResult {
  status: number;
  headers: Headers;
  /** Full response body as text — only populated for non-streaming requests. */
  text: string | null;
  /** Streaming body — only populated when options.stream === true. */
  body: ReadableStream<Uint8Array> | null;
}

// Test-only injection point. Tests call __setTlsFetchOverrideForTesting()
// to replace the real TLS client with a mock; production never touches this.
let testOverride: ((url: string, options: TlsFetchOptions) => Promise<TlsFetchResult>) | null =
  null;

export function __setTlsFetchOverrideForTesting(fn: typeof testOverride): void {
  testOverride = fn;
}

function throwIfAborted(signal: AbortSignal | null | undefined): void {
  if (signal?.aborted) throw makeAbortError(signal);
}

function buildTlsRequestOptions(options: TlsFetchOptions): Record<string, unknown> {
  return {
    method: options.method || "GET",
    headers: options.headers || {},
    body: options.body,
    tlsClientIdentifier: LMARENA_PROFILE,
    timeoutMilliseconds: options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    followRedirects: true,
    withRandomTLSExtensionOrder: true,
    // Plumb proxy via options — tls-client-node does not read HTTP_PROXY env.
    proxyUrl: resolveProxyUrl(options.proxyUrl),
  };
}

function hardTimeoutMs(options: TlsFetchOptions): number {
  return (options.timeoutMs ?? DEFAULT_TIMEOUT_MS) + HARD_TIMEOUT_GRACE_MS;
}

async function tlsFetchNonStreaming(
  client: { request: (url: string, opts: Record<string, unknown>) => Promise<TlsResponseLike> },
  url: string,
  requestOptions: Record<string, unknown>,
  options: TlsFetchOptions
): Promise<TlsFetchResult> {
  let tlsResponse: TlsResponseLike;
  try {
    tlsResponse = await raceWithTimeout(
      client.request(url, requestOptions),
      hardTimeoutMs(options),
      options.signal ?? null
    );
  } catch (err) {
    if (err instanceof TlsClientHangError) resetClientCache();
    throw err;
  }
  throwIfAborted(options.signal);
  return {
    status: tlsResponse.status,
    headers: toHeaders(tlsResponse.headers),
    text: tlsResponse.body,
    body: null,
  };
}

/**
 * Make a single HTTP request to arena.ai with a Chrome-like TLS fingerprint.
 * Throws TlsClientUnavailableError if the native binary failed to load.
 */
export async function tlsFetchLMArena(
  url: string,
  options: TlsFetchOptions = {}
): Promise<TlsFetchResult> {
  if (testOverride) return testOverride(url, options);
  throwIfAborted(options.signal);
  const client = await getClient();
  throwIfAborted(options.signal);

  const requestOptions = buildTlsRequestOptions(options);
  if (options.stream) {
    return tlsFetchStreaming(
      client,
      url,
      requestOptions,
      options.streamEofSymbol,
      options.signal ?? null,
      hardTimeoutMs(options)
    );
  }
  return tlsFetchNonStreaming(client, url, requestOptions, options);
}

function makeAbortError(signal: AbortSignal): Error {
  const reason = signal.reason;
  if (reason instanceof Error) return reason;
  const err = new Error(typeof reason === "string" ? reason : "The operation was aborted");
  err.name = "AbortError";
  return err;
}

function toHeaders(raw: Record<string, string[]>): Headers {
  const h = new Headers();
  for (const [k, vs] of Object.entries(raw || {})) {
    for (const v of vs) h.append(k, v);
  }
  return h;
}

/**
 * Returns true if the response body is a Cloudflare challenge/interstitial page
 * rather than a real LMArena response. From VPS/datacenter IPs a valid cookie
 * still gets a 403 "Request rejected by anti-bot rules." JSON; distinguishing
 * it from a genuine auth failure lets the caller surface an actionable error
 * (issue #3180).
 *
 * Exported so the executor and the connection validator share one detector.
 */
export function isCloudflareChallenge(text: string | null | undefined): boolean {
  if (!text) return false;
  return /just a moment|window\._cf_chl_opt|challenges\.cloudflare\.com|attention required|cf-chl/i.test(
    text
  );
}

// ─── Streaming via temp file ────────────────────────────────────────────────
// tls-client-node's streaming primitive writes the response body chunk-by-chunk
// to a file path, terminating when the upstream sends `streamOutputEOFSymbol`.
// We tail the file from a worker and surface the bytes as a ReadableStream.

async function tlsFetchStreaming(
  client: { request: (url: string, opts: Record<string, unknown>) => Promise<TlsResponseLike> },
  url: string,
  requestOptions: Record<string, unknown>,
  eofSymbol = "[DONE]",
  signal: AbortSignal | null = null,
  hardTimeoutMs: number = DEFAULT_TIMEOUT_MS + HARD_TIMEOUT_GRACE_MS
): Promise<TlsFetchResult> {
  const dir = await mkdtemp(join(tmpdir(), "LMArena-stream-"));
  const path = join(dir, `${randomUUID()}.ndjson`);

  const streamOpts = {
    ...requestOptions,
    streamOutputPath: path,
    streamOutputBlockSize: 1024,
    streamOutputEOFSymbol: eofSymbol,
  };

  // Kick off the request without awaiting — tls-client writes the body to
  // `path` chunk-by-chunk while the call runs. The Promise resolves when the
  // request fully completes (full body written). Wrapping in raceWithTimeout
  // guarantees this promise eventually settles even if the koffi binding
  // wedges; on hang we reset the singleton so the next request respawns.
  let resetOnHang = true;
  const requestPromise = raceWithTimeout(
    client.request(url, streamOpts),
    hardTimeoutMs,
    signal
  ).catch((err: unknown) => {
    if (resetOnHang && err instanceof TlsClientHangError) {
      resetClientCache();
      resetOnHang = false;
    }
    // Re-throw so downstream consumers (waitForContent, tailFile) observe
    // the rejection and surface it instead of treating the stream as having
    // ended cleanly.
    throw err;
  });

  // Wait for the file to exist AND have at least one byte.
  const ready = await waitForContent(path, 5_000, requestPromise);
  if (!ready) {
    const r = await requestPromise.catch(
      (e) => ({ status: 502, headers: {}, body: String(e) }) as TlsResponseLike
    );
    await cleanupTempPath(path);
    return {
      status: r.status,
      headers: toHeaders(r.headers),
      text: r.body,
      body: null,
    };
  }

  // Peek at the first bytes to distinguish a genuine NDJSON stream from a
  // Cloudflare challenge page or an HTML error response that tls-client-node
  // streamed to the temp file with a 200 status.
  const peek = await readFirstBytes(path, 256);
  if (isCloudflareChallenge(peek)) {
    await cleanupTempPath(path);
    return {
      status: 403,
      headers: new Headers({ "Content-Type": "text/html" }),
      text: peek,
      body: null,
    };
  }
  if (peek.trimStart().startsWith("<")) {
    // HTML error page (not a challenge) — surface as a non-2xx so the executor
    // can emit a proper SSE error chunk instead of feeding HTML to the NDJSON
    // parser.
    await cleanupTempPath(path);
    return {
      status: 502,
      headers: new Headers({ "Content-Type": "text/html" }),
      text: peek,
      body: null,
    };
  }

  // Looks like NDJSON — start tailing. The requestPromise will eventually
  // resolve with the real upstream status; tailFile propagates non-2xx errors
  // into the stream so the consumer sees them instead of a truncated success.
  const stream = tailFile(path, eofSymbol, requestPromise, signal);
  const headers = new Headers({
    "Content-Type": "application/x-ndjson",
    "Cache-Control": "no-cache",
  });
  return { status: 200, headers, text: null, body: stream };
}

async function cleanupTempPath(path: string): Promise<void> {
  await unlink(path).catch(() => {});
  await rmdir(dirname(path)).catch(() => {});
}

async function readFirstBytes(path: string, n: number): Promise<string> {
  const fd = await open(path, "r");
  try {
    const buf = Buffer.alloc(n);
    const { bytesRead } = await fd.read(buf, 0, n, 0);
    return buf.subarray(0, bytesRead).toString("utf8");
  } finally {
    await fd.close().catch(() => {});
  }
}

/**
 * Wait for the streaming output file to exist AND contain at least one byte.
 * Returns false if the request settles before any bytes arrive (so the caller
 * can drain `requestPromise` and surface the real upstream status). Returns
 * true as soon as the file has data — even one byte is enough for the NDJSON
 * heuristic to give a useful answer.
 */
async function waitForContent(
  path: string,
  timeoutMs: number,
  requestPromise: Promise<TlsResponseLike>
): Promise<boolean> {
  let requestSettled = false;
  requestPromise.then(
    () => {
      requestSettled = true;
    },
    () => {
      requestSettled = true;
    }
  );
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const s = await stat(path);
      if (s.size > 0) return true;
    } catch {
      // file doesn't exist yet
    }
    // If the request finished without producing any bytes, no point waiting
    // out the rest of the timeout — let the caller drain it.
    if (requestSettled) return false;
    await sleep(25);
  }
  return false;
}

/** Enqueue chunk bytes, splitting off an EOF symbol when present. Returns true if closed. */
function enqueueChunkMaybeEof(
  controller: ReadableStreamDefaultController<Uint8Array>,
  chunk: Buffer,
  eofSymbol: string
): boolean {
  const text = chunk.toString("utf8");
  if (!text.includes(eofSymbol)) {
    controller.enqueue(Buffer.from(chunk));
    return false;
  }
  const beforeEof = text.substring(0, text.indexOf(eofSymbol));
  if (beforeEof) controller.enqueue(Buffer.from(beforeEof, "utf8"));
  controller.close();
  return true;
}

type FileHandle = Awaited<ReturnType<typeof open>>;

async function drainRemaining(
  fd: FileHandle,
  buf: Buffer,
  offsetRef: { offset: number },
  controller: ReadableStreamDefaultController<Uint8Array>,
  eofSymbol: string
): Promise<"closed" | "drained"> {
  while (true) {
    const { bytesRead } = await fd.read(buf, 0, buf.length, offsetRef.offset);
    if (bytesRead === 0) return "drained";
    const chunk = buf.subarray(0, bytesRead);
    offsetRef.offset += bytesRead;
    if (enqueueChunkMaybeEof(controller, chunk, eofSymbol)) return "closed";
  }
}

function tailFile(
  path: string,
  eofSymbol: string,
  done: Promise<TlsResponseLike>,
  signal: AbortSignal | null = null
): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const fd = await open(path, "r");
      const buf = Buffer.alloc(64 * 1024);
      const offsetRef = { offset: 0 };
      let finished = false;
      let aborted = false;
      let upstreamError: Error | null = null;
      let errored = false;

      done.then(
        () => {
          finished = true;
        },
        (err) => {
          upstreamError = err instanceof Error ? err : new Error(String(err));
          finished = true;
        }
      );

      const onAbort = () => {
        aborted = true;
      };
      if (signal) {
        if (signal.aborted) aborted = true;
        else signal.addEventListener("abort", onAbort, { once: true });
      }

      try {
        while (!aborted) {
          const { bytesRead } = await fd.read(buf, 0, buf.length, offsetRef.offset);
          if (bytesRead > 0) {
            const chunk = buf.subarray(0, bytesRead);
            offsetRef.offset += bytesRead;
            if (enqueueChunkMaybeEof(controller, chunk, eofSymbol)) return;
          }

          if (!finished) {
            await sleep(25);
            continue;
          }

          const drained = await drainRemaining(fd, buf, offsetRef, controller, eofSymbol);
          if (drained === "closed") return;
          if (upstreamError && !errored) {
            errored = true;
            controller.error(upstreamError);
            return;
          }
          controller.close();
          return;
        }
      } catch (err) {
        if (!errored) {
          errored = true;
          controller.error(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        await fd.close().catch(() => {});
        await cleanupTempPath(path);
        if (signal) signal.removeEventListener("abort", onAbort);
      }
    },
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
