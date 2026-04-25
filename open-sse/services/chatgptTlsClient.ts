/**
 * Browser-TLS-impersonating HTTP client for chatgpt.com.
 *
 * Why this exists: ChatGPT's Cloudflare config pins `cf_clearance` to the
 * client's TLS fingerprint (JA3/JA4) + HTTP/2 SETTINGS frame ordering.
 * Node's Undici fetch presents an obvious "not a browser" handshake and
 * gets challenged with `cf-mitigated: challenge` — even with all the right
 * cookies. This module wraps `tls-client-node` (native shared library
 * built from bogdanfinn/tls-client) to send a Firefox handshake instead.
 *
 * The first call lazily starts the managed sidecar; subsequent calls reuse
 * a singleton TLSClient. Process exit hooks stop the sidecar cleanly.
 */

import { tmpdir } from "node:os";
import { join } from "node:path";
import { mkdtemp, open, unlink, rmdir, stat } from "node:fs/promises";
import { randomUUID } from "node:crypto";

let clientPromise: Promise<unknown> | null = null;
let exitHookInstalled = false;

const CHATGPT_PROFILE = "firefox_148"; // matches the Firefox 150 UA we send
const DEFAULT_TIMEOUT_MS = 60_000;

function installExitHook(): void {
  if (exitHookInstalled) return;
  exitHookInstalled = true;
  const stop = async () => {
    if (!clientPromise) return;
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
   * ReadableStream<Uint8Array>. Use for SSE responses (the conversation
   * endpoint). Otherwise, the full body is read into memory.
   */
  stream?: boolean;
  /** EOF marker the upstream sends to signal end of stream (default: "[DONE]"). */
  streamEofSymbol?: string;
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

/**
 * Make a single HTTP request to chatgpt.com with a Firefox-like TLS fingerprint.
 *
 * Throws TlsClientUnavailableError if the native binary failed to load.
 */
export async function tlsFetchChatGpt(
  url: string,
  options: TlsFetchOptions = {}
): Promise<TlsFetchResult> {
  if (testOverride) return testOverride(url, options);
  // Honor abort signals up-front. tls-client-node's koffi binding doesn't
  // accept an AbortSignal mid-flight (the binary call is opaque), so the best
  // we can do is bail before issuing the call. We also re-check after — if
  // the caller aborted while the upstream was running, throw rather than
  // returning a stale response so the caller doesn't try to use it.
  if (options.signal?.aborted) {
    throw makeAbortError(options.signal);
  }
  const client = await getClient();
  if (options.signal?.aborted) {
    throw makeAbortError(options.signal);
  }

  const requestOptions: Record<string, unknown> = {
    method: options.method || "GET",
    headers: options.headers || {},
    body: options.body,
    tlsClientIdentifier: CHATGPT_PROFILE,
    timeoutMilliseconds: options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    followRedirects: true,
    withRandomTLSExtensionOrder: true,
  };

  if (options.stream) {
    return await tlsFetchStreaming(
      client,
      url,
      requestOptions,
      options.streamEofSymbol,
      options.signal ?? null
    );
  }

  const tlsResponse = await client.request(url, requestOptions);
  if (options.signal?.aborted) {
    throw makeAbortError(options.signal);
  }
  return {
    status: tlsResponse.status,
    headers: toHeaders(tlsResponse.headers),
    text: tlsResponse.body,
    body: null,
  };
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

// ─── Streaming via temp file ────────────────────────────────────────────────
// tls-client-node's streaming primitive writes the response body chunk-by-chunk
// to a file path, terminating when the upstream sends `streamOutputEOFSymbol`.
// We tail the file from a worker and surface the bytes as a ReadableStream.

async function tlsFetchStreaming(
  client: { request: (url: string, opts: Record<string, unknown>) => Promise<TlsResponseLike> },
  url: string,
  requestOptions: Record<string, unknown>,
  eofSymbol = "[DONE]",
  signal: AbortSignal | null = null
): Promise<TlsFetchResult> {
  const dir = await mkdtemp(join(tmpdir(), "cgpt-stream-"));
  const path = join(dir, `${randomUUID()}.sse`);

  const streamOpts = {
    ...requestOptions,
    streamOutputPath: path,
    streamOutputBlockSize: 1024,
    streamOutputEOFSymbol: eofSymbol,
  };

  // Kick off the request without awaiting — tls-client writes the body to
  // `path` chunk-by-chunk while the call runs. The Promise resolves when the
  // request fully completes (full body written).
  const requestPromise = client.request(url, streamOpts);

  // Wait briefly for the file to appear so we can detect early errors.
  const ready = await waitForFile(path, 5_000);
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

  // Peek the first bytes to decide whether this looks like SSE. Anything
  // that doesn't positively look like SSE (JSON `{...}`, HTML `<...>`, plain
  // text rate-limit messages, Cloudflare challenge pages, etc.) gets surfaced
  // as a non-streaming response so the executor sees the real upstream status
  // and body — otherwise non-2xx error pages get silently treated as 200 OK
  // and the SSE parser produces an empty completion.
  const peek = await readFirstBytes(path, 256);
  if (!looksLikeSse(peek)) {
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

  // Looks like SSE — start tailing. SSE bodies in practice are always 2xx;
  // tls-client-node doesn't expose response status separately from full-body
  // completion, so we report 200 and let the SSE parser consume the stream.
  const stream = tailFile(path, eofSymbol, requestPromise, signal);
  const headers = new Headers({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  return { status: 200, headers, text: null, body: stream };
}

/**
 * Returns true if the peeked response body looks like an SSE stream — i.e.,
 * begins (after any leading whitespace) with one of the SSE field markers
 * (`data:`, `event:`, `id:`, `retry:`) or a comment line (`:`).
 *
 * Exported for tests.
 */
export function looksLikeSse(text: string): boolean {
  const trimmed = text.replace(/^[\s\r\n]+/, "");
  if (!trimmed) return false;
  if (trimmed.startsWith(":")) return true;
  return /^(data|event|id|retry):/i.test(trimmed);
}

async function cleanupTempPath(path: string): Promise<void> {
  await unlink(path).catch(() => {});
  const dir = path.substring(0, path.lastIndexOf("/"));
  await rmdir(dir).catch(() => {});
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

async function waitForFile(path: string, timeoutMs: number): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await stat(path);
      return true;
    } catch {
      await sleep(25);
    }
  }
  return false;
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
      let offset = 0;
      let finished = false;
      let aborted = false;
      let upstreamError: Error | null = null;

      // Track request settlement, capturing both fulfillment and rejection.
      // Without the rejection branch, a mid-stream tls-client-node error
      // becomes an unhandledRejection — the stream cleans up silently and
      // the consumer sees what looks like a successful truncated response.
      done.then(
        () => {
          finished = true;
        },
        (err) => {
          upstreamError = err instanceof Error ? err : new Error(String(err));
          finished = true;
        }
      );

      // If the caller aborts, stop tailing immediately.
      const onAbort = () => {
        aborted = true;
      };
      if (signal) {
        if (signal.aborted) aborted = true;
        else signal.addEventListener("abort", onAbort, { once: true });
      }

      let errored = false;
      try {
        while (!aborted) {
          const { bytesRead } = await fd.read(buf, 0, buf.length, offset);
          if (bytesRead > 0) {
            const chunk = buf.subarray(0, bytesRead);
            offset += bytesRead;
            const text = chunk.toString("utf8");
            if (text.includes(eofSymbol)) {
              const cutAt = text.indexOf(eofSymbol) + eofSymbol.length;
              controller.enqueue(new Uint8Array(chunk.subarray(0, cutAt)));
              break;
            }
            controller.enqueue(new Uint8Array(chunk));
          } else if (finished) {
            // No more data and request completed. If the request rejected,
            // surface the error so the consumer doesn't think the stream
            // ended cleanly.
            if (upstreamError) {
              controller.error(upstreamError);
              errored = true;
            }
            break;
          } else {
            await sleep(25);
          }
        }
      } catch (err) {
        controller.error(err);
        errored = true;
      } finally {
        if (signal) signal.removeEventListener("abort", onAbort);
        await fd.close().catch(() => {});
        await unlink(path).catch(() => {});
        const dir = path.substring(0, path.lastIndexOf("/"));
        await rmdir(dir).catch(() => {});
        if (!errored) controller.close();
      }
    },
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
