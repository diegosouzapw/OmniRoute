import { fetch as undiciFetch } from "undici";
import { withPayloadTraffic } from "./proxyTrafficTransport.ts";
import {
  createProxyDispatcher,
  getDefaultDispatcher,
  getRetryDispatcher,
  isLocalEgressHostname,
} from "./proxyDispatcher.ts";
import { maybeReapDispatcherPool } from "./proxyDispatcherReap.ts";
import { describeFallbackFailure } from "./proxyFetchRedaction.ts";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import {
  directFetchWithBoundedResponseStart,
  isDirectResponseStartTimeout,
  directHeadersTimeoutResolver,
} from "./directResponseStartTimeout.ts";
import {
  getEffectiveSignal,
  isAmbiguousFailureReplaySafe,
  requestHasNonReplayableBody,
  tagProxyUnreachable,
  isProxyUnreachableError,
  describeFetchCause,
  RETRY_BACKOFF_MS,
  type FetchWithDispatcher,
} from "./proxyFetchTransportSupport.ts";
import { isTlsSendEligible, tryTlsSend } from "./proxyFetchTlsTransport.ts";
import type { ProxyFetchDeps, ProxyTransportRuntime } from "./proxyFetchTransport.ts";

function targetPart(target: string, key: "hostname" | "host"): string {
  try {
    return new URL(target)[key];
  } catch {
    return "";
  }
}
function isLoopbackHost(hostname: string): boolean {
  const host = hostname
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .replace(/^::ffff:/i, "")
    .toLowerCase();
  return host === "localhost" || host === "::1" || host === "127.0.0.1" || host.startsWith("127.");
}
function isDirectTransportFailure(error: unknown): boolean {
  const msg = error instanceof Error ? error.message : String(error);
  const code = (error as { code?: unknown })?.code;
  const codes = ["ECONNREFUSED", "EAI_AGAIN", "ENOTFOUND", "ETIMEDOUT"];
  return (
    msg.includes("fetch failed") ||
    codes.includes(String(code)) ||
    codes.some((c) => msg.includes(c)) ||
    (typeof code === "string" && code.startsWith("UND_ERR")) ||
    msg.includes("UND_ERR")
  );
}

export async function dispatchDirectFetch(
  input: RequestInfo | URL,
  options: RequestInit,
  deps: ProxyFetchDeps,
  runtime: ProxyTransportRuntime,
  target: string,
  source: string
): Promise<Response> {
  const store = runtime.tlsFingerprintContext.getStore();
  let tlsFallback = false;
  if (isTlsSendEligible(input, options, target, store, null)) {
    const response = await tryTlsSend(input, options, target, store, null, null, deps);
    if (response) return response;
    tlsFallback = true;
  }
  const native =
    (deps.nativeFetch as FetchWithDispatcher | undefined) ?? runtime.originalFetchWithDispatcher;
  if (process.versions.bun || isLoopbackHost(targetPart(target, "hostname"))) {
    return withPayloadTraffic(native, null, deps.recordTraffic)(input, options);
  }
  return sendDirectWithRetry(input, options, deps, native, target, source, tlsFallback);
}

function validateDirectFailure(error: unknown, signal: AbortSignal | null | undefined): void {
  if (signal?.aborted) throw error;
  if (isDirectResponseStartTimeout(error)) return;
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("onRequestStart")) {
    console.error(
      `[ProxyFetch] Fatal version mismatch: Dispatcher (v8) vs Fetch (v6/native). Hardware upgrade or SOCKS5 config isolation required. Error: ${message}`
    );
    throw error;
  }
  tagProxyUnreachable(error);
  if (!isDirectTransportFailure(error)) throw error;
}

function refuseNonReplayable(error: unknown): never {
  const detail = describeFallbackFailure(
    describeFetchCause(error),
    "skipped: non-replayable request body"
  );
  console.warn(`[ProxyFetch] skipping native fetch fallback for non-replayable body: ${detail}`);
  if (error instanceof Error)
    (error as Error & { proxyFetchDetail?: string }).proxyFetchDetail = detail;
  throw tagProxyUnreachable(error);
}

async function sendDirectWithRetry(
  input: RequestInfo | URL,
  options: RequestInit,
  deps: ProxyFetchDeps,
  native: FetchWithDispatcher,
  target: string,
  source: string,
  tlsFallback: boolean
): Promise<Response> {
  const directOptions = { ...options, signal: getEffectiveSignal(input, options) };
  const nonReplayable = requestHasNonReplayableBody(input, options);
  const replayTimeout = isAmbiguousFailureReplaySafe(input, options);
  const max = nonReplayable ? 1 : 2;
  const raw = deps.undiciFetch ?? (undiciFetch as unknown as FetchWithDispatcher);
  const timeoutFor = directHeadersTimeoutResolver(directOptions, target);
  const hostname = targetPart(target, "hostname") || undefined;
  let lastError: unknown;
  for (let attempt = 0; attempt < max; attempt++) {
    try {
      return await directFetchWithBoundedResponseStart(
        input,
        {
          ...directOptions,
          dispatcher: attempt === 0 ? getDefaultDispatcher(hostname) : getRetryDispatcher(hostname),
        },
        withPayloadTraffic(raw, null, deps.recordTraffic),
        timeoutFor(attempt === 0 && replayTimeout ? 0 : 1)
      );
    } catch (error) {
      validateDirectFailure(error, directOptions.signal);
      if (retryDirectFailure(error, attempt, max, replayTimeout, timeoutFor, target)) {
        await directRetryBackoff(error);
        lastError = error;
        continue;
      }
      if (nonReplayable) refuseNonReplayable(error);
      return exhaustedDirect(input, options, deps, native, raw, target, source, tlsFallback, error);
    }
  }
  throw lastError;
}

async function directRetryBackoff(error: unknown): Promise<void> {
  if (!isDirectResponseStartTimeout(error))
    await new Promise((resolve) => setTimeout(resolve, RETRY_BACKOFF_MS));
}

function retryDirectFailure(
  error: unknown,
  attempt: number,
  max: number,
  replayTimeout: boolean,
  timeoutFor: (attempt: number) => number,
  target: string
): boolean {
  if (!isDirectResponseStartTimeout(error)) return attempt === 0 && max > 1;
  if (attempt !== 0 || max <= 1 || !replayTimeout) throw error;
  console.warn(
    `[ProxyFetch] Direct response-start timeout (${timeoutFor(0)}ms) on pooled dispatcher — retrying on fresh no-keep-alive dispatcher: ${targetPart(target, "host")}`
  );
  return true;
}

async function tryAutomaticProxy(
  input: RequestInfo | URL,
  options: RequestInit,
  deps: ProxyFetchDeps,
  raw: FetchWithDispatcher,
  target: string,
  source: string,
  tlsFallback: boolean
): Promise<Response | null> {
  if (tlsFallback || source !== "direct" || !isFeatureFlagEnabled("PROXY_AUTO_SELECT_ENABLED"))
    return null;
  const hostname = targetPart(target, "hostname");
  if (!hostname) return null;
  const find = deps.findWorkingProxy ?? (await import("./proxyFallback.ts")).findWorkingProxy;
  const proxy = await find(hostname, target);
  if (!proxy) return null;
  try {
    return await withPayloadTraffic(
      raw,
      proxy,
      deps.recordTraffic
    )(input, { ...options, dispatcher: createProxyDispatcher(proxy) });
  } catch {
    return null;
  }
}

async function exhaustedDirect(
  input: RequestInfo | URL,
  options: RequestInit,
  deps: ProxyFetchDeps,
  native: FetchWithDispatcher,
  raw: FetchWithDispatcher,
  target: string,
  source: string,
  tlsFallback: boolean,
  error: unknown
): Promise<Response> {
  const proxied = await tryAutomaticProxy(input, options, deps, raw, target, source, tlsFallback);
  if (proxied) return proxied;
  console.warn(
    `[ProxyFetch] Undici dispatcher failed, falling back to native fetch (after retry): ${describeFetchCause(error)}`
  );
  const host = targetPart(target, "host");
  if (isProxyUnreachableError(error)) maybeReapDispatcherPool(host, isLocalEgressHostname(host));
  try {
    return await withPayloadTraffic(native, null, deps.recordTraffic)(input, options);
  } catch (nativeError) {
    const detail = describeFallbackFailure(
      describeFetchCause(error),
      describeFetchCause(nativeError)
    );
    console.warn(`[ProxyFetch] native fetch fallback ALSO failed: ${detail}`);
    if (nativeError instanceof Error)
      (nativeError as Error & { proxyFetchDetail?: string }).proxyFetchDetail = detail;
    tagProxyUnreachable(nativeError);
    throw nativeError;
  }
}
