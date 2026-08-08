/**
 * Shared TLS client infrastructure — a factory-style base that consolidates
 * 6 nearly-identical per-provider TLS client files into one source of truth.
 *
 * Each provider file calls `createTlsClientModule(config)` to obtain its
 * provider-specific `tlsFetch` and `__setTlsFetchOverrideForTesting` exports.
 *
 * TailFile variants:
 *   A  — Uint8Array enqueue, includes EOF symbol, substring-based cleanup
 *        ChatGPT, Claude, Perplexity, Notion
 *   B1 — Buffer.from enqueue, excludes EOF symbol, inline drainRemaining loop
 *        Grok
 *   B2 — Buffer.from enqueue, excludes EOF symbol, extracted helpers
 *        LMArena
 *
 * Response validation:
 *   sse — checks `looksLikeSse(peek)`, falls back to buffered
 *         ChatGPT, Claude, Perplexity, Notion
 *   cf  — checks `isCloudflareChallenge(peek)` → 403, HTML → 502
 *         Grok, LMArena
 */

// ---------------------------------------------------------------------------
// Node imports
// ---------------------------------------------------------------------------
import { tmpdir } from "node:os";
import { randomUUID } from "node:crypto";
import { join, dirname } from "node:path";
import { open, unlink, rmdir, readFile, mkdtemp, stat } from "node:fs/promises";

// ---------------------------------------------------------------------------
// Proxy resolution — every provider file imports both of these
// ---------------------------------------------------------------------------
import { resolveProxyForRequest } from "../utils/proxyFetch.ts";
import { resolveTlsClientProxyUrl } from "./tlsClientProxy.ts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TlsResponseLike {
  status: number;
  headers: Record<string, string[]>;
  body: string;
}

export interface TlsFetchResult {
  status: number;
  headers: Headers;
  text: string | null;
  body: ReadableStream<Uint8Array> | null;
}

export interface TlsFetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  signal?: AbortSignal;
  timeoutMs?: number;
  stream?: boolean;
  streamEofSymbol?: string;
  byteResponse?: boolean;
  proxyUrl?: string;
}

// ---------------------------------------------------------------------------
// Factory config (one instance per provider stub)
// ---------------------------------------------------------------------------

export interface TlsClientConfig {
  /** Human-readable provider name for logs and error messages. */
  providerName: string;
  /** TLS profile identifier (e.g. "chrome_146") */
  tlsProfile: string;
  /** Default upstream domain for proxy resolution (e.g. "https://chatgpt.com") */
  domain: string;
  /** Temp directory prefix (e.g. "cgpt-stream-") */
  tempDirPrefix: string;
  /** EOF symbol for streaming (default "[DONE]") */
  streamEofSymbol?: string;
  /** Default timeout in ms (default 60_000) */
  defaultTimeoutMs?: number;
  /** Hard timeout grace period in ms (default 10_000) */
  hardTimeoutGraceMs?: number;
  /** First-byte timeout for waitForContent (default 5_000; ChatGPT uses 30_000) */
  firstByteTimeoutMs?: number;
  /**
   * TailFile variant:
   *   "A"  — Uint8Array enqueue, includes EOF, substring cleanup
   *   "B1" — Buffer.from enqueue, excludes EOF, inline drainRemaining
   *   "B2" — Buffer.from enqueue, excludes EOF, extracted helpers
   */
  tailFileVariant: "A" | "B1" | "B2";
  /**
   * Response validation mode:
   *   "sse" — check looksLikeSse → fall back to buffered
   *   "cf"  — check isCloudflareChallenge → 403, HTML → 502, else stream
   */
  responseValidation: "sse" | "cf";
  /**
   * Optional override for proxy resolution domain (e.g., LMArena uses
   * "https://arena.ai" hardcoded instead of the config domain).
   */
  proxyDomainOverride?: string;
  /**
   * Whether to export `isCloudflareChallenge` from the provider stub.
   * Grok, LMArena, Perplexity, Notion all export it.
   */
  exportCloudflareCheck: boolean;
  /**
   * Whether to expose `__tlsFetchStreamingForTesting` (ChatGPT only).
   */
  exposeStreamingForTesting?: boolean;
}

// ---------------------------------------------------------------------------
// Error classes
// ---------------------------------------------------------------------------

export class TlsClientUnavailableError extends Error {
  override name = "TlsClientUnavailableError";
}

export class TlsClientHangError extends Error {
  override name = "TlsClientHangError";
}

// ---------------------------------------------------------------------------
// Shared helpers (identical across all 6 providers)
// ---------------------------------------------------------------------------

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function makeAbortError(signal: AbortSignal): Error {
  const reason = signal.reason;
  if (reason instanceof Error) return reason;
  const err = new Error(typeof reason === "string" ? reason : "The operation was aborted");
  err.name = "AbortError";
  return err;
}

export function toHeaders(raw: Record<string, string[]> | null | undefined): Headers {
  const h = new Headers();
  for (const [k, vs] of Object.entries(raw || {})) {
    for (const v of vs) h.append(k, v);
  }
  return h;
}

export async function raceWithTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  signal: AbortSignal | null | undefined
): Promise<T> {
  // If no signal, just race with a simple timeout.
  if (!signal) {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new TlsClientHangError()), timeoutMs);
      }),
    ]);
  }

  // With signal, race against both timeout and abort.
  return await new Promise<T>((resolve, reject) => {
    let settled = false;

    const done = (fn: () => void) => {
      if (!settled) {
        settled = true;
        fn();
      }
    };

    const timer = setTimeout(() => {
      done(() => reject(new TlsClientHangError()));
    }, timeoutMs);

    const onAbort = () => {
      done(() => reject(makeAbortError(signal)));
    };

    if (signal.aborted) {
      onAbort();
    } else {
      signal.addEventListener("abort", onAbort, { once: true });
    }

    promise.then(
      (v) => {
        done(() => {
          clearTimeout(timer);
          signal.removeEventListener("abort", onAbort);
          resolve(v);
        });
      },
      (e) => {
        done(() => {
          clearTimeout(timer);
          signal.removeEventListener("abort", onAbort);
          reject(e);
        });
      }
    );
  });
}

/** Read up to N bytes from a file, returning the utf-8 decoded text. */
export async function readFirstBytes(path: string, n: number): Promise<string> {
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
 * true as soon as the file has data.
 */
export async function waitForContent(
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
    if (requestSettled) return false;
    await sleep(25);
  }
  return false;
}

/**
 * Returns true if the peeked response body looks like an SSE stream — i.e.,
 * begins (after any leading whitespace) with one of the SSE field markers
 * (`data:`, `event:`, `id:`, `retry:`) or a comment line (`:`).
 */
export function looksLikeSse(text: string): boolean {
  const trimmed = text.replace(/^[\s\r\n]+/, "");
  if (!trimmed) return false;
  if (trimmed.startsWith(":")) return true;
  return /^(data|event|id|retry):/i.test(trimmed);
}

/**
 * Returns true if the response body is a Cloudflare challenge/interstitial page.
 */
export function isCloudflareChallenge(text: string | null | undefined): boolean {
  if (!text) return false;
  return /just a moment|window\._cf_chl_opt|challenges\.cloudflare\.com|attention required|cf-chl/i.test(
    text
  );
}

// ---------------------------------------------------------------------------
// Temp-path cleanup — two variants
// ---------------------------------------------------------------------------

/** Variant A: substring-based parent dir extraction (ChatGPT, Claude, Perplexity, Notion) */
async function cleanupTempPathSubstring(path: string): Promise<void> {
  await unlink(path).catch(() => {});
  const dir = path.substring(0, path.lastIndexOf("/"));
  await rmdir(dir).catch(() => {});
}

/** Variant B: dirname-based parent dir extraction (Grok, LMArena) */
async function cleanupTempPathDirname(path: string): Promise<void> {
  await unlink(path).catch(() => {});
  await rmdir(dirname(path)).catch(() => {});
}

async function readTextFileIfExists(path: string): Promise<string> {
  try {
    return await readFile(path, "utf8");
  } catch {
    return "";
  }
}

// ---------------------------------------------------------------------------
// TailFile — Variant A
//   Uint8Array enqueue, includes EOF symbol, substring cleanup
//   Used by: ChatGPT, Claude, Perplexity, Notion
// ---------------------------------------------------------------------------

function tailFileVariantA(
  path: string,
  eofSymbol: string,
  done: Promise<TlsResponseLike>,
  signal: AbortSignal | null = null,
  cleanupPath: string
): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const fd = await open(path, "r");
      const buf = Buffer.alloc(64 * 1024);
      let offset = 0;
      let finished = false;
      let aborted = false;
      let upstreamError: Error | null = null;

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
        await cleanupTempPathSubstring(cleanupPath);
        if (!errored) controller.close();
      }
    },
  });
}

// ---------------------------------------------------------------------------
// TailFile — Variant B1
//   Buffer.from enqueue, excludes EOF symbol, inline drainRemaining loop
//   Used by: Grok
// ---------------------------------------------------------------------------

function tailFileVariantB1(
  path: string,
  eofSymbol: string,
  done: Promise<TlsResponseLike>,
  signal: AbortSignal | null = null,
  cleanupPath: string
): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const fd = await open(path, "r");
      const buf = Buffer.alloc(64 * 1024);
      let offset = 0;
      let finished = false;
      let aborted = false;
      let upstreamError: Error | null = null;

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

      let errored = false;
      try {
        while (!aborted) {
          const { bytesRead } = await fd.read(buf, 0, buf.length, offset);
          if (bytesRead > 0) {
            const chunk = buf.subarray(0, bytesRead);
            offset += bytesRead;
            const text = chunk.toString("utf8");

            if (text.includes(eofSymbol)) {
              const beforeEof = text.substring(0, text.indexOf(eofSymbol));
              if (beforeEof) {
                controller.enqueue(Buffer.from(beforeEof, "utf8"));
              }
              controller.close();
              return;
            }

            controller.enqueue(Buffer.from(chunk));
          }

          if (finished) {
            // Request finished — drain any remaining bytes then close.
            while (true) {
              const { bytesRead } = await fd.read(buf, 0, buf.length, offset);
              if (bytesRead === 0) break;
              const chunk = buf.subarray(0, bytesRead);
              offset += bytesRead;
              const text = chunk.toString("utf8");

              if (text.includes(eofSymbol)) {
                const beforeEof = text.substring(0, text.indexOf(eofSymbol));
                if (beforeEof) {
                  controller.enqueue(Buffer.from(beforeEof, "utf8"));
                }
                controller.close();
                return;
              }

              controller.enqueue(Buffer.from(chunk));
            }

            if (upstreamError && !errored) {
              errored = true;
              controller.error(upstreamError);
              return;
            }

            controller.close();
            return;
          }

          await sleep(25);
        }
      } catch (err) {
        if (!errored) {
          errored = true;
          controller.error(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        await fd.close().catch(() => {});
        await cleanupTempPathDirname(cleanupPath);
        if (signal) signal.removeEventListener("abort", onAbort);
      }
    },
  });
}

// ---------------------------------------------------------------------------
// TailFile — Variant B2
//   Buffer.from enqueue, excludes EOF symbol, extracted helpers
//   Used by: LMArena
// ---------------------------------------------------------------------------

type FileHandle = Awaited<ReturnType<typeof open>>;

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

function tailFileVariantB2(
  path: string,
  eofSymbol: string,
  done: Promise<TlsResponseLike>,
  signal: AbortSignal | null = null,
  cleanupPath: string
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
        await cleanupTempPathDirname(cleanupPath);
        if (signal) signal.removeEventListener("abort", onAbort);
      }
    },
  });
}

// ---------------------------------------------------------------------------
// Client lifecycle — TLS client singleton per provider
// ---------------------------------------------------------------------------

/**
 * Create a getClient function for a provider stub.
 * Uses dynamic `import("tls-client-node")` with `{ runtimeMode: "native" }`
 * and `client.start()`, matching the original per-provider lifecycle.
 */
export function createGetClient(config: {
  providerName: string;
  tlsProfile?: string;
}): () => Promise<{
  request: (url: string, opts: Record<string, unknown>) => Promise<TlsResponseLike>;
}> {
  let clientPromise: Promise<{
    request: (url: string, opts: Record<string, unknown>) => Promise<TlsResponseLike>;
  }> | null = null;
  let exitHookInstalled = false;

  const installExitHook = (client: { close: () => Promise<void> }): void => {
    if (!exitHookInstalled) {
      exitHookInstalled = true;
      process.on("exit", () => {
        void client.close();
      });
    }
  };

  return async function getClient(): Promise<{
    request: (url: string, opts: Record<string, unknown>) => Promise<TlsResponseLike>;
  }> {
    if (!clientPromise) {
      clientPromise = (async () => {
        let TLSClientCtor: {
          new (config: Record<string, unknown>): {
            start: () => Promise<void>;
            request: (url: string, opts: Record<string, unknown>) => Promise<TlsResponseLike>;
            close: () => Promise<void>;
          };
        };
        try {
          // tls-client-node uses a native binary loaded at runtime.
          // The dynamic import delays the binary load until first use — no
          // point crashing startup on machines where it's not installed.
          const mod = await import("tls-client-node");
          TLSClientCtor = mod.TLSClient;
        } catch {
          throw new TlsClientUnavailableError(
            `tls-client-node is not installed — cannot start TLS client for ${config.providerName}`
          );
        }
        const tlsOptions: Record<string, unknown> = {
          runtimeMode: "native",
        };
        if (config.tlsProfile) {
          tlsOptions.clientIdentifier = config.tlsProfile;
        }
        const client = new TLSClientCtor(tlsOptions);
        // Start the native TLS client binding
        await client.start();
        installExitHook(client);

        return client;
      })();
    }
    return clientPromise;
  };
}

/**
 * Resolve the proxy URL for a tls-client request. Per-call value wins;
 * falls back to the provider-specific env var and the dashboard proxy config.
 */
export function resolveProxyUrl(domain: string, perCall: string | undefined): string | undefined {
  return resolveTlsClientProxyUrl(domain, perCall, resolveProxyForRequest);
}

// ---------------------------------------------------------------------------
// Factory — creates provider-specific tlsFetch + helpers
// ---------------------------------------------------------------------------

const CLEANUP_VARIANTS = {
  A: cleanupTempPathSubstring,
  B: cleanupTempPathDirname,
} as const;

const TAIL_FILE_VARIANTS = {
  A: tailFileVariantA,
  B1: tailFileVariantB1,
  B2: tailFileVariantB2,
} as const;

export interface TlsClientModule {
  tlsFetch: (url: string, options: TlsFetchOptions) => Promise<TlsFetchResult>;
  __setTlsFetchOverrideForTesting: (
    fn: ((url: string, options: TlsFetchOptions) => Promise<TlsFetchResult>) | null
  ) => void;
  isCloudflareChallenge?: (text: string | null | undefined) => boolean;
  __tlsFetchStreamingForTesting?: (
    client: { request: (url: string, opts: Record<string, unknown>) => Promise<TlsResponseLike> },
    url: string,
    requestOptions: Record<string, unknown>,
    eofSymbol?: string,
    signal?: AbortSignal | null,
    hardTimeoutMs?: number,
    firstByteTimeoutMs?: number
  ) => Promise<TlsFetchResult>;
}

/**
 * Create a provider-specific TLS client module.
 *
 * Each provider file calls this once at module level and re-exports
 * the returned `tlsFetch` (as e.g. `tlsFetchChatGpt`) and
 * `__setTlsFetchOverrideForTesting`.
 */
export function createTlsClientModule(config: TlsClientConfig): TlsClientModule {
  const {
    providerName,
    tlsProfile,
    domain,
    tempDirPrefix,
    streamEofSymbol = "[DONE]",
    defaultTimeoutMs = 60_000,
    hardTimeoutGraceMs = 10_000,
    firstByteTimeoutMs = 5_000,
    tailFileVariant,
    responseValidation,
    proxyDomainOverride,
    exportCloudflareCheck,
  } = config;

  const getClient = createGetClient({ providerName, tlsProfile });

  function resetClientCache(): void {
    // The getClient closure holds clientPromise — by design the only
    // reference is inside getClient's closure. After a hang we need
    // the next call to spawn a fresh binding. We achieve this by
    // clearing the local reference; the module-level tlsFetch will
    // re-read via getClient which recreates it.
    // Since getClient's clientPromise is a closure variable, we
    // re-create getClient itself:
    Object.assign(localState, {
      getClient: createGetClient({ providerName, tlsProfile }),
    });
    // Note: this is safe because only tlsFetch calls getClient.
    // A concurrent in-flight call holds its own reference.
  }

  const localState: { getClient: typeof getClient } = { getClient };

  let testOverride: ((url: string, options: TlsFetchOptions) => Promise<TlsFetchResult>) | null =
    null;

  const tailFileFn = TAIL_FILE_VARIANTS[tailFileVariant];

  const cleanupFn = tailFileVariant === "A" ? cleanupTempPathSubstring : cleanupTempPathDirname;

  async function tlsFetchStreaming(
    client: { request: (url: string, opts: Record<string, unknown>) => Promise<TlsResponseLike> },
    url: string,
    requestOptions: Record<string, unknown>,
    eofSymbol: string,
    signal: AbortSignal | null,
    hardTimeoutMs: number,
    firstByteMs: number
  ): Promise<TlsFetchResult> {
    const dir = await mkdtemp(join(tmpdir(), tempDirPrefix));
    const path = join(dir, `${randomUUID()}.sse`);

    const streamOpts: Record<string, unknown> = {
      ...requestOptions,
      streamOutputPath: path,
      streamOutputBlockSize: 1024,
      streamOutputEOFSymbol: eofSymbol,
    };

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
      throw err;
    });

    // Wait for the file to exist AND have at least one byte.
    const ready = await waitForContent(path, firstByteMs, requestPromise);
    if (!ready) {
      const r = await requestPromise.catch(
        (e) => ({ status: 502, headers: {}, body: String(e) }) as TlsResponseLike
      );
      await cleanupFn(path);
      return {
        status: r.status,
        headers: toHeaders(r.headers),
        text: r.body,
        body: null,
      };
    }

    const peek = await readFirstBytes(path, 256);

    if (responseValidation === "cf") {
      // Cloudflare challenge check
      if (isCloudflareChallenge(peek)) {
        await cleanupFn(path);
        return {
          status: 403,
          headers: new Headers({ "Content-Type": "text/html" }),
          text: peek,
          body: null,
        };
      }
      // HTML error page check
      if (peek.trimStart().startsWith("<")) {
        await cleanupFn(path);
        return {
          status: 502,
          headers: new Headers({ "Content-Type": "text/html" }),
          text: peek,
          body: null,
        };
      }
    } else {
      // SSE validation — if it doesn't look like SSE, return buffered
      if (!looksLikeSse(peek)) {
        const r = await requestPromise.catch(
          (e) => ({ status: 502, headers: {}, body: String(e) }) as TlsResponseLike
        );
        const fileText = await readTextFileIfExists(path);
        await cleanupFn(path);
        return {
          status: r.status,
          headers: toHeaders(r.headers),
          text: r.body || fileText,
          body: null,
        };
      }
    }

    // Looks valid — create streaming response.
    const stream = tailFileFn(path, eofSymbol, requestPromise, signal, path);

    const contentType = responseValidation === "cf" ? "application/x-ndjson" : "text/event-stream";

    const headers = new Headers({
      "Content-Type": contentType,
      "Cache-Control": "no-cache",
    });
    return { status: 200, headers, text: null, body: stream };
  }

  async function tlsFetch(url: string, options: TlsFetchOptions = {}): Promise<TlsFetchResult> {
    // Resolve proxyUrl early so test overrides and the real path both see it.
    const resolvedProxyUrl = resolveProxyUrl(proxyDomainOverride ?? domain, options.proxyUrl);
    if (testOverride) return testOverride(url, { ...options, proxyUrl: resolvedProxyUrl });

    if (options.signal?.aborted) {
      throw makeAbortError(options.signal);
    }
    const client = await localState.getClient();
    if (options.signal?.aborted) {
      throw makeAbortError(options.signal);
    }

    const requestOptions: Record<string, unknown> = {
      method: options.method || "GET",
      headers: options.headers || {},
      body: options.body,
      tlsClientIdentifier: tlsProfile,
      timeoutMilliseconds: options.timeoutMs ?? defaultTimeoutMs,
      followRedirects: true,
      withRandomTLSExtensionOrder: true,
      proxyUrl: resolvedProxyUrl,
    };

    requestOptions.isByteResponse = options.byteResponse === true;

    if (options.stream) {
      return await tlsFetchStreaming(
        client,
        url,
        requestOptions,
        options.streamEofSymbol || streamEofSymbol,
        options.signal ?? null,
        (options.timeoutMs ?? defaultTimeoutMs) + hardTimeoutGraceMs,
        firstByteTimeoutMs
      );
    }

    let tlsResponse: TlsResponseLike;
    try {
      tlsResponse = await raceWithTimeout(
        client.request(url, requestOptions),
        (options.timeoutMs ?? defaultTimeoutMs) + hardTimeoutGraceMs,
        options.signal ?? null
      );
    } catch (err) {
      if (err instanceof TlsClientHangError) {
        resetClientCache();
      }
      throw err;
    }
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

  const module: TlsClientModule = {
    tlsFetch,
    __setTlsFetchOverrideForTesting(fn) {
      testOverride = fn;
    },
  };

  if (exportCloudflareCheck) {
    module.isCloudflareChallenge = isCloudflareChallenge;
  }

  if (config.exposeStreamingForTesting) {
    module.__tlsFetchStreamingForTesting = (
      client,
      url,
      requestOptions,
      eofSymbol = "[DONE]",
      signal = null,
      hardTimeoutMs = defaultTimeoutMs + hardTimeoutGraceMs,
      firstByteMs = firstByteTimeoutMs
    ): Promise<TlsFetchResult> => {
      return tlsFetchStreaming(
        client,
        url,
        requestOptions,
        eofSymbol,
        signal,
        hardTimeoutMs,
        firstByteMs
      );
    };
  }

  return module;
}
