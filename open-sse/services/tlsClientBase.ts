/**
 * Shared browser-impersonating HTTP transport for five web-cookie provider wrappers.
 *
 * Provider wrappers keep their existing `tlsFetch*` APIs while this module owns
 * wreq-js loading, transport pooling, proxy selection, deadlines, byte responses,
 * SSE/NDJSON validation, EOF handling, and cancellation.
 *
 * Every wreq request uses an ephemeral cookie scope. Transports are reused process-wide,
 * bounded by an LRU pool, and keyed by browser profile, emulated OS, and resolved proxy;
 * no cookie jar or session identifier is shared between calls.
 */

import { resolveProxyForRequest } from "../utils/proxyFetch.ts";
import {
  createWreqTransportClient,
  WreqRuntimeUnavailableError,
  type WreqTransportRuntime,
  type WreqTransportRuntimeLoader,
} from "../utils/tlsClient.ts";
import { resolveTlsClientProxyUrl } from "./tlsClientProxy.ts";

type EmulationOs = "windows" | "macos" | "linux" | "android" | "ios";

export type IterableHeaders = Iterable<[string, string]> & {
  getSetCookie?: () => string[];
};

export interface ReadableBodyLike {
  getReader: () => ReadableStreamDefaultReader<Uint8Array>;
  cancel?: (reason?: unknown) => Promise<void>;
}

export interface TlsResponseLike {
  status: number;
  headers: Record<string, string[]> | IterableHeaders;
  body: string | ReadableBodyLike | null;
  text?: () => Promise<string>;
  bytes?: () => Promise<Uint8Array>;
}

export type WreqRuntimeLike = WreqTransportRuntime;
export type WreqRuntimeLoader = WreqTransportRuntimeLoader;

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

export interface TlsClientConfig {
  /** Human-readable provider name for logs and error messages. */
  providerName: string;
  /** Browser profile identifier, for example `chrome_146` or `firefox_148`. */
  tlsProfile: string;
  /** Operating system paired with the browser profile. */
  emulationOs?: EmulationOs;
  /** Default upstream domain used by proxy resolution. */
  domain: string;
  /** @deprecated wreq-js streams directly and ignores this compatibility field. */
  tempDirPrefix?: string;
  /** Default EOF marker. An empty string disables marker filtering. */
  streamEofSymbol?: string;
  /** Native request timeout in milliseconds. */
  defaultTimeoutMs?: number;
  /** Additional JavaScript-side hard-timeout grace period. */
  hardTimeoutGraceMs?: number;
  /** Delay after which a late first byte is returned as a buffered response. */
  firstByteTimeoutMs?: number;
  /** How a detected EOF marker is exposed; `none` disables marker filtering. */
  streamEofPolicy?: "include" | "exclude" | "none";
  /** @deprecated Compatibility alias: `A` includes EOF; `B1`/`B2` exclude it. */
  tailFileVariant?: "A" | "B1" | "B2";
  /** `sse` validates SSE prefixes; `cf` rejects Cloudflare/HTML responses. */
  responseValidation: "sse" | "cf";
  /** Optional proxy-resolution domain override (LMArena uses arena.ai). */
  proxyDomainOverride?: string;
  /** Whether the provider module exposes the Cloudflare detection helper. */
  exportCloudflareCheck: boolean;
  /** Whether to expose the direct-stream dependency-injection seam. */
  exposeStreamingForTesting?: boolean;
  /** External-runtime seam used by focused tests; production loads wreq-js lazily. */
  wreqRuntimeLoader?: WreqRuntimeLoader;
}

export class TlsClientUnavailableError extends Error {
  override name = "TlsClientUnavailableError";
}

export class TlsClientHangError extends Error {
  override name = "TlsClientHangError";
}

export function makeAbortError(signal: AbortSignal): Error {
  const reason = signal.reason;
  if (reason instanceof Error) return reason;
  const error = new Error(typeof reason === "string" ? reason : "The operation was aborted");
  error.name = "AbortError";
  return error;
}

export function toHeaders(
  raw: Record<string, string[]> | IterableHeaders | null | undefined
): Headers {
  const headers = new Headers();
  if (!raw) return headers;

  const iterator = (raw as Partial<IterableHeaders>)[Symbol.iterator];
  if (typeof iterator === "function") {
    const iterable = raw as IterableHeaders;
    const setCookies = typeof iterable.getSetCookie === "function" ? iterable.getSetCookie() : [];
    for (const [name, value] of iterable) {
      if (name.toLowerCase() !== "set-cookie" || setCookies.length === 0) {
        headers.append(name, value);
      }
    }
    for (const value of setCookies) headers.append("set-cookie", value);
    return headers;
  }

  for (const [name, values] of Object.entries(raw)) {
    for (const value of values) headers.append(name, value);
  }
  return headers;
}

function isReadableBody(body: TlsResponseLike["body"]): body is ReadableBodyLike {
  return body !== null && typeof body !== "string" && typeof body.getReader === "function";
}

function concatChunks(chunks: Uint8Array[]): Uint8Array {
  const length = chunks.reduce((total, chunk) => total + chunk.byteLength, 0);
  const combined = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return combined;
}

async function readAllChunks(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  initialChunks: Uint8Array[] = [],
  readNext: () => Promise<ReadableStreamReadResult<Uint8Array>> = () => reader.read()
): Promise<Uint8Array> {
  const chunks = [...initialChunks];
  while (true) {
    const next = await readNext();
    if (next.done) return concatChunks(chunks);
    chunks.push(next.value);
  }
}

async function readTlsResponseText(
  response: TlsResponseLike,
  onReader?: (reader: ReadableStreamDefaultReader<Uint8Array>) => void
): Promise<string> {
  if (typeof response.body === "string") return response.body;
  if (isReadableBody(response.body)) {
    const reader = response.body.getReader();
    onReader?.(reader);
    return new TextDecoder().decode(await readAllChunks(reader));
  }
  if (typeof response.text === "function") return response.text();
  return "";
}

async function readTlsResponseBytes(
  response: TlsResponseLike,
  onReader?: (reader: ReadableStreamDefaultReader<Uint8Array>) => void
): Promise<Uint8Array> {
  if (isReadableBody(response.body)) {
    const reader = response.body.getReader();
    onReader?.(reader);
    return readAllChunks(reader);
  }
  if (typeof response.bytes === "function") return response.bytes();
  if (typeof response.body === "string") return Buffer.from(response.body, "binary");
  return new Uint8Array();
}

export async function raceWithTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  signal: AbortSignal | null | undefined
): Promise<T> {
  return await new Promise<T>((resolve, reject) => {
    let settled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const onAbort = (): void => {
      settle(() => reject(makeAbortError(signal!)));
    };
    const cleanup = (): void => {
      if (timer) clearTimeout(timer);
      signal?.removeEventListener("abort", onAbort);
    };
    const settle = (complete: () => void): void => {
      if (settled) return;
      settled = true;
      cleanup();
      complete();
    };

    timer = setTimeout(
      () => settle(() => reject(new TlsClientHangError())),
      Math.max(0, timeoutMs)
    );
    if (signal?.aborted) {
      onAbort();
    } else {
      signal?.addEventListener("abort", onAbort, { once: true });
    }

    promise.then(
      (value) => settle(() => resolve(value)),
      (error) => settle(() => reject(error))
    );
  });
}

/** Return true when a prefix begins with an SSE field or comment marker. */
export function looksLikeSse(text: string): boolean {
  const trimmed = text.replace(/^[\s\r\n]+/, "");
  if (!trimmed) return false;
  if (trimmed.startsWith(":")) return true;
  return /^(data|event|id|retry):/i.test(trimmed);
}

/** Return true when a response prefix is a Cloudflare challenge/interstitial. */
export function isCloudflareChallenge(text: string | null | undefined): boolean {
  if (!text) return false;
  return /just a moment|window\._cf_chl_opt|challenges\.cloudflare\.com|attention required|cf-chl/i.test(
    text
  );
}

function couldBecomeSsePrefix(text: string): boolean {
  const trimmed = text.replace(/^[\s\r\n]+/, "").toLowerCase();
  return ["data:", "event:", "id:", "retry:", ":"].some((marker) => marker.startsWith(trimmed));
}

function couldBecomeCloudflareChallenge(text: string): boolean {
  const trimmed = text.trimStart().toLowerCase();
  return [
    "just a moment",
    "window._cf_chl_opt",
    "challenges.cloudflare.com",
    "attention required",
    "cf-chl",
  ].some((marker) => marker.startsWith(trimmed));
}

type EofControlCandidate = "possible" | "matched" | "not-control";

function classifyEofControlCandidate(bytes: number[], eofSymbol: string): EofControlCandidate {
  const decoded = new TextDecoder().decode(Uint8Array.from(bytes), { stream: true });
  const candidate = decoded.replace(/^[\t\r ]+/, "");
  if (candidate.startsWith(eofSymbol)) return "matched";
  if (eofSymbol.startsWith(candidate)) return "possible";

  const dataPrefix = "data:";
  const lowerCandidate = candidate.toLowerCase();
  if (dataPrefix.startsWith(lowerCandidate)) return "possible";
  if (!lowerCandidate.startsWith(dataPrefix)) return "not-control";

  const dataValue = candidate.slice(dataPrefix.length).replace(/^[\t ]+/, "");
  if (dataValue.startsWith(eofSymbol)) return "matched";
  return eofSymbol.startsWith(dataValue) ? "possible" : "not-control";
}

function createEofFilteredStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  initialChunks: Uint8Array[],
  eofSymbol: string,
  includeEof: boolean,
  readNext: () => Promise<ReadableStreamReadResult<Uint8Array>>,
  onReadError: (error: unknown) => void,
  onFinalize: () => void,
  signal: AbortSignal | null,
  hardDeadlineAt: number
): ReadableStream<Uint8Array> {
  const queued = [...initialChunks];
  const eofBytes = new TextEncoder().encode(eofSymbol);
  let controlCandidate: number[] = [];
  let atLineStart = true;
  let closed = false;
  let deadlineTimer: ReturnType<typeof setTimeout> | undefined;
  let removeAbortListener = (): void => {};
  let lifecycleCleaned = false;

  const cleanupLifecycle = (): void => {
    if (lifecycleCleaned) return;
    lifecycleCleaned = true;
    if (deadlineTimer) clearTimeout(deadlineTimer);
    deadlineTimer = undefined;
    removeAbortListener();
    removeAbortListener = (): void => {};
    onFinalize();
  };

  const cancelNativeReader = async (reason: unknown): Promise<void> => {
    try {
      await reader.cancel(reason);
    } catch {
      // Native cancellation is best-effort cleanup; preserve the authoritative stream error.
    }
  };

  const errorStream = (
    controller: ReadableStreamDefaultController<Uint8Array>,
    error: Error,
    notifyReadError: boolean
  ): void => {
    if (closed) return;
    closed = true;
    controlCandidate = [];
    cleanupLifecycle();
    if (notifyReadError) onReadError(error);
    void cancelNativeReader(error);
    try {
      controller.error(error);
    } catch {
      // The consumer may have closed the stream concurrently.
    }
  };

  return new ReadableStream<Uint8Array>({
    start(controller) {
      if (signal) {
        const onAbort = (): void => errorStream(controller, makeAbortError(signal), false);
        if (signal.aborted) {
          onAbort();
          return;
        }
        signal.addEventListener("abort", onAbort, { once: true });
        removeAbortListener = (): void => signal.removeEventListener("abort", onAbort);
      }

      if (Number.isFinite(hardDeadlineAt)) {
        deadlineTimer = setTimeout(
          () => {
            errorStream(controller, new TlsClientHangError(), true);
          },
          Math.max(0, hardDeadlineAt - Date.now())
        );
        deadlineTimer.unref?.();
      }
    },
    async pull(controller) {
      while (!closed) {
        let chunk = queued.shift();
        if (!chunk) {
          let next: ReadableStreamReadResult<Uint8Array>;
          try {
            next = await readNext();
          } catch (error) {
            if (closed) return;
            closed = true;
            cleanupLifecycle();
            onReadError(error);
            await cancelNativeReader(error);
            controller.error(error);
            return;
          }
          if (closed) return;
          if (next.done) {
            if (controlCandidate.length > 0) {
              controller.enqueue(Uint8Array.from(controlCandidate));
            }
            controlCandidate = [];
            closed = true;
            cleanupLifecycle();
            controller.close();
            return;
          }
          chunk = next.value;
        }

        if (eofBytes.byteLength === 0) {
          controller.enqueue(chunk);
          return;
        }

        const output: number[] = [];
        let eofReached = false;
        for (const byte of chunk) {
          if (!atLineStart) {
            output.push(byte);
            if (byte === 0x0a || byte === 0x0d) atLineStart = true;
            continue;
          }

          if (byte === 0x0a || byte === 0x0d) {
            for (const candidateByte of controlCandidate) output.push(candidateByte);
            controlCandidate = [];
            output.push(byte);
            continue;
          }

          controlCandidate.push(byte);
          const classification = classifyEofControlCandidate(controlCandidate, eofSymbol);
          if (classification === "matched") {
            if (includeEof) {
              for (const candidateByte of controlCandidate) output.push(candidateByte);
            }
            controlCandidate = [];
            eofReached = true;
            break;
          }
          if (classification === "not-control") {
            for (const candidateByte of controlCandidate) output.push(candidateByte);
            controlCandidate = [];
            atLineStart = false;
          }
        }

        if (eofReached) {
          if (output.length > 0) controller.enqueue(Uint8Array.from(output));
          closed = true;
          cleanupLifecycle();
          await cancelNativeReader("TLS stream EOF reached");
          controller.close();
          return;
        }

        if (output.length > 0) {
          controller.enqueue(Uint8Array.from(output));
          return;
        }
      }
    },
    async cancel(reason) {
      closed = true;
      controlCandidate = [];
      cleanupLifecycle();
      await cancelNativeReader(reason);
    },
  });
}

export type TlsRequestPromise = Promise<TlsResponseLike> & {
  invalidateTransport?: () => void;
  releaseTransport?: () => void;
};

export interface TlsRequestClient {
  request: (url: string, options: Record<string, unknown>) => TlsRequestPromise;
  invalidateTransport?: (options: Record<string, unknown>) => void;
}

/** Create a provider facade over the shared ephemeral-cookie wreq transport pool. */
export function createGetClient(config: {
  providerName: string;
  tlsProfile?: string;
  emulationOs?: EmulationOs;
  wreqRuntimeLoader?: WreqRuntimeLoader;
}): () => Promise<TlsRequestClient> {
  const browser = config.tlsProfile ?? "chrome_146";
  const os = config.emulationOs ?? "macos";
  const wreqClient = createWreqTransportClient({
    browser,
    os,
    runtimeLoader: config.wreqRuntimeLoader,
  });

  const client: TlsRequestClient = {
    request(url, options) {
      const wreqRequest = wreqClient.request(url, options);
      const adapted = wreqRequest.catch((error: unknown) => {
        if (!(error instanceof WreqRuntimeUnavailableError)) throw error;
        throw new TlsClientUnavailableError(
          `wreq-js 3.2.x is not installed or unsupported on this platform — ` +
            `cannot start browser transport for ${config.providerName}`
        );
      }) as TlsRequestPromise;
      Object.defineProperties(adapted, {
        invalidateTransport: {
          value: () => wreqRequest.invalidateTransport(),
        },
        releaseTransport: {
          value: () => wreqRequest.releaseTransport(),
        },
      });
      return adapted;
    },
  };

  return async () => client;
}

/** Resolve a per-call/provider/dashboard proxy for a browser-transport request. */
export function resolveProxyUrl(domain: string, perCall: string | undefined): string | undefined {
  return resolveTlsClientProxyUrl(domain, perCall, resolveProxyForRequest);
}

export interface TlsClientModule {
  tlsFetch: (url: string, options?: TlsFetchOptions) => Promise<TlsFetchResult>;
  __setTlsFetchOverrideForTesting: (
    fn: ((url: string, options: TlsFetchOptions) => Promise<TlsFetchResult>) | null
  ) => void;
  isCloudflareChallenge?: (text: string | null | undefined) => boolean;
  __tlsFetchStreamingForTesting?: (
    client: TlsRequestClient,
    url: string,
    requestOptions: Record<string, unknown>,
    eofSymbol?: string,
    signal?: AbortSignal | null,
    hardTimeoutMs?: number,
    firstByteTimeoutMs?: number
  ) => Promise<TlsFetchResult>;
}

/** Build one provider-specific facade over the shared wreq-js transport. */
export function createTlsClientModule(config: TlsClientConfig): TlsClientModule {
  const {
    providerName,
    tlsProfile,
    emulationOs = "macos",
    domain,
    streamEofSymbol = "[DONE]",
    defaultTimeoutMs = 60_000,
    hardTimeoutGraceMs = 10_000,
    firstByteTimeoutMs = 5_000,
    responseValidation,
    proxyDomainOverride,
    exportCloudflareCheck,
    wreqRuntimeLoader,
  } = config;
  const streamEofPolicy =
    config.streamEofPolicy ?? (config.tailFileVariant === "A" ? "include" : "exclude");

  const getClient = createGetClient({
    providerName,
    tlsProfile,
    emulationOs,
    wreqRuntimeLoader,
  });
  let testOverride: ((url: string, options: TlsFetchOptions) => Promise<TlsFetchResult>) | null =
    null;

  const invalidateOnHang = (
    client: TlsRequestClient,
    requestOptions: Record<string, unknown>,
    error: unknown,
    request?: TlsRequestPromise | null
  ): void => {
    if (!(error instanceof TlsClientHangError)) return;
    if (request?.invalidateTransport) request.invalidateTransport();
    else client.invalidateTransport?.(requestOptions);
  };

  const releaseRequest = (request?: TlsRequestPromise | null): void => {
    request?.releaseTransport?.();
  };

  const cancelResponseBody = async (
    body: { cancel: (reason?: unknown) => Promise<void> },
    reason: unknown
  ): Promise<void> => {
    try {
      await body.cancel(reason);
    } catch {
      // Cleanup must not replace the authoritative timeout, abort, or response classification.
    }
  };

  async function tlsFetchStreaming(
    client: TlsRequestClient,
    url: string,
    requestOptions: Record<string, unknown>,
    eofSymbol: string,
    signal: AbortSignal | null,
    hardTimeoutMs: number,
    firstByteMs: number = firstByteTimeoutMs
  ): Promise<TlsFetchResult> {
    const startedAt = Date.now();
    const hardDeadlineAt = startedAt + hardTimeoutMs;
    const firstByteDeadlineAt = Number.isFinite(firstByteMs)
      ? startedAt + Math.max(0, firstByteMs)
      : Number.POSITIVE_INFINITY;
    const remainingHardTimeoutMs = (): number => Math.max(0, hardDeadlineAt - Date.now());
    let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
    let request: TlsRequestPromise | null = null;
    let leaseTransferredToStream = false;

    try {
      request = client.request(url, requestOptions);
      const response = await raceWithTimeout(request, remainingHardTimeoutMs(), signal);
      if (!isReadableBody(response.body)) {
        const text = await raceWithTimeout(
          readTlsResponseText(response),
          remainingHardTimeoutMs(),
          signal
        );
        return { status: response.status, headers: toHeaders(response.headers), text, body: null };
      }

      reader = response.body.getReader();
      const activeReader = reader;
      const readBeforeHardDeadline = (): Promise<ReadableStreamReadResult<Uint8Array>> =>
        raceWithTimeout(activeReader.read(), remainingHardTimeoutMs(), signal);
      const initialChunks: Uint8Array[] = [];
      const readFirstNonEmptyChunk = async (): Promise<ReadableStreamReadResult<Uint8Array>> => {
        while (true) {
          const result = await readBeforeHardDeadline();
          if (result.done || result.value.byteLength > 0) return result;
        }
      };
      const firstRead = readFirstNonEmptyChunk();
      let firstResult: ReadableStreamReadResult<Uint8Array>;
      let firstByteTimedOut = Date.now() >= firstByteDeadlineAt;

      if (Number.isFinite(firstByteMs) && !firstByteTimedOut) {
        let timer: ReturnType<typeof setTimeout> | undefined;
        try {
          const timed = await Promise.race([
            firstRead.then((result) => ({ kind: "read" as const, result })),
            new Promise<{ kind: "timeout" }>((resolve) => {
              timer = setTimeout(
                () => resolve({ kind: "timeout" }),
                Math.max(0, firstByteDeadlineAt - Date.now())
              );
            }),
          ]);
          if (timed.kind === "timeout") {
            firstByteTimedOut = true;
            firstResult = await firstRead;
          } else {
            firstResult = timed.result;
          }
        } finally {
          if (timer) clearTimeout(timer);
        }
      } else {
        firstResult = await firstRead;
      }

      if (!firstResult.done) initialChunks.push(firstResult.value);
      if (firstByteTimedOut) {
        const bytes = await readAllChunks(activeReader, initialChunks, readBeforeHardDeadline);
        return {
          status: response.status,
          headers: toHeaders(response.headers),
          text: new TextDecoder().decode(bytes),
          body: null,
        };
      }

      let previewBytes = concatChunks(initialChunks).subarray(0, 256);
      let preview = new TextDecoder().decode(previewBytes, { stream: true });
      let previewReachedEof = firstResult.done;
      while (
        !previewReachedEof &&
        previewBytes.byteLength < 256 &&
        ((responseValidation === "sse" &&
          !looksLikeSse(preview) &&
          couldBecomeSsePrefix(preview)) ||
          (responseValidation === "cf" &&
            !isCloudflareChallenge(preview) &&
            (preview.trimStart().startsWith("<") || couldBecomeCloudflareChallenge(preview))))
      ) {
        const next = await readBeforeHardDeadline();
        if (next.done) {
          previewReachedEof = true;
          break;
        }
        initialChunks.push(next.value);
        previewBytes = concatChunks(initialChunks).subarray(0, 256);
        preview = new TextDecoder().decode(previewBytes, { stream: true });
      }

      if (previewReachedEof && previewBytes.byteLength === 0) {
        return {
          status: response.status,
          headers: toHeaders(response.headers),
          text: "",
          body: null,
        };
      }

      if (responseValidation === "cf" && isCloudflareChallenge(preview)) {
        await cancelResponseBody(activeReader, "Cloudflare challenge");
        return {
          status: 403,
          headers: new Headers({ "Content-Type": "text/html" }),
          text: preview,
          body: null,
        };
      }

      if (responseValidation === "cf" && preview.trimStart().startsWith("<")) {
        await cancelResponseBody(activeReader, "HTML response");
        return {
          status: 502,
          headers: new Headers({ "Content-Type": "text/html" }),
          text: preview,
          body: null,
        };
      }

      if (response.status < 200 || response.status >= 300) {
        const bytes = await readAllChunks(activeReader, initialChunks, readBeforeHardDeadline);
        return {
          status: response.status,
          headers: toHeaders(response.headers),
          text: new TextDecoder().decode(bytes),
          body: null,
        };
      }

      if (responseValidation === "sse" && !looksLikeSse(preview)) {
        const bytes = await readAllChunks(activeReader, initialChunks, readBeforeHardDeadline);
        return {
          status: response.status,
          headers: toHeaders(response.headers),
          text: new TextDecoder().decode(bytes),
          body: null,
        };
      }

      const headers = toHeaders(response.headers);
      headers.set(
        "Content-Type",
        responseValidation === "cf" ? "application/x-ndjson" : "text/event-stream"
      );
      headers.set("Cache-Control", "no-cache");
      const stream = createEofFilteredStream(
        activeReader,
        initialChunks,
        streamEofPolicy === "none" ? "" : eofSymbol,
        streamEofPolicy === "include",
        readBeforeHardDeadline,
        (error) => invalidateOnHang(client, requestOptions, error, request),
        () => releaseRequest(request),
        signal,
        hardDeadlineAt
      );
      leaseTransferredToStream = true;
      reader = null;
      return { status: 200, headers, text: null, body: stream };
    } catch (error) {
      invalidateOnHang(client, requestOptions, error, request);
      if (reader) await cancelResponseBody(reader, error);
      throw error;
    } finally {
      if (!leaseTransferredToStream) releaseRequest(request);
    }
  }

  async function tlsFetch(url: string, options: TlsFetchOptions = {}): Promise<TlsFetchResult> {
    const resolvedProxyUrl = resolveProxyUrl(proxyDomainOverride ?? domain, options.proxyUrl);
    if (testOverride) return testOverride(url, { ...options, proxyUrl: resolvedProxyUrl });
    if (options.signal?.aborted) throw makeAbortError(options.signal);

    const client = await getClient();
    if (options.signal?.aborted) throw makeAbortError(options.signal);

    const requestOptions: Record<string, unknown> = {
      method: options.method || "GET",
      headers: options.headers || {},
      body: options.body,
      timeoutMilliseconds: options.timeoutMs ?? defaultTimeoutMs,
      proxyUrl: resolvedProxyUrl,
      signal: options.signal,
    };
    const hardTimeoutMs = (options.timeoutMs ?? defaultTimeoutMs) + hardTimeoutGraceMs;

    if (options.stream) {
      return tlsFetchStreaming(
        client,
        url,
        requestOptions,
        options.streamEofSymbol ?? streamEofSymbol,
        options.signal ?? null,
        hardTimeoutMs,
        firstByteTimeoutMs
      );
    }

    const hardDeadlineAt = Date.now() + hardTimeoutMs;
    const remainingHardTimeoutMs = (): number => Math.max(0, hardDeadlineAt - Date.now());
    let response: TlsResponseLike | null = null;
    let bodyReader: ReadableStreamDefaultReader<Uint8Array> | null = null;
    let request: TlsRequestPromise | null = null;
    try {
      request = client.request(url, requestOptions);
      response = await raceWithTimeout(request, remainingHardTimeoutMs(), options.signal ?? null);
      if (options.signal?.aborted) throw makeAbortError(options.signal);
      const headers = toHeaders(response.headers);
      if (options.byteResponse) {
        const bytes = await raceWithTimeout(
          readTlsResponseBytes(response, (reader) => {
            bodyReader = reader;
          }),
          remainingHardTimeoutMs(),
          options.signal ?? null
        );
        bodyReader = null;
        const mime =
          headers.get("content-type")?.split(";", 1)[0]?.trim() || "application/octet-stream";
        return {
          status: response.status,
          headers,
          text: `data:${mime};base64,${Buffer.from(bytes).toString("base64")}`,
          body: null,
        };
      }
      const text = await raceWithTimeout(
        readTlsResponseText(response, (reader) => {
          bodyReader = reader;
        }),
        remainingHardTimeoutMs(),
        options.signal ?? null
      );
      bodyReader = null;
      return { status: response.status, headers, text, body: null };
    } catch (error) {
      invalidateOnHang(client, requestOptions, error, request);
      if (bodyReader) {
        await cancelResponseBody(bodyReader, error);
      } else if (
        response &&
        isReadableBody(response.body) &&
        typeof response.body.cancel === "function"
      ) {
        await cancelResponseBody(
          response.body as ReadableBodyLike & {
            cancel: (reason?: unknown) => Promise<void>;
          },
          error
        );
      }
      throw error;
    } finally {
      releaseRequest(request);
    }
  }

  const module: TlsClientModule = {
    tlsFetch,
    __setTlsFetchOverrideForTesting(fn) {
      testOverride = fn;
    },
  };
  if (exportCloudflareCheck) module.isCloudflareChallenge = isCloudflareChallenge;
  if (config.exposeStreamingForTesting) {
    module.__tlsFetchStreamingForTesting = (
      client,
      url,
      requestOptions,
      eofSymbol = "[DONE]",
      signal = null,
      hardTimeoutMs = defaultTimeoutMs + hardTimeoutGraceMs,
      firstByteMs = firstByteTimeoutMs
    ) =>
      tlsFetchStreaming(client, url, requestOptions, eofSymbol, signal, hardTimeoutMs, firstByteMs);
  }
  return module;
}
