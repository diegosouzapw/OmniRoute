import { fetch as undiciFetch } from "undici";
import type { AsyncLocalStorage } from "node:async_hooks";
import { withPayloadTraffic, type TrafficRecorderOverride } from "./proxyTrafficTransport.ts";
import {
  createProxyDispatcher,
  getProxyRetryDispatcher,
  buildVercelRelayHeaders,
  isRelayType,
  proxyUrlForLogs,
} from "./proxyDispatcher.ts";
import { stampOwnListenerSelfHop } from "./selfHop.ts";
import { recordFinalTransportOutcome, recordProxiedSuccess } from "./proxyTransportOutcome.ts";
import { sanitizeTransportError } from "./proxyTransportError.ts";
import { redactProxyDetailsInMessage } from "./proxyFetchRedaction.ts";
import { dispatchDirectFetch } from "./proxyFetchDirectTransport.ts";
import { tryTlsSend, isTlsSendEligible } from "./proxyFetchTlsTransport.ts";
import {
  getEffectiveSignal,
  requestHasNonReplayableBody,
  tagProxyUnreachable,
  RELAY_POOL_AGENT,
  RELAY_RETRY_AGENT,
  RELAY_FETCH_TIMEOUT_MS,
  RETRY_BACKOFF_MS,
  type FetchWithDispatcher,
  type FetchWithDispatcherOptions,
} from "./proxyFetchTransportSupport.ts";

export type ProxyFetchDeps = {
  undiciFetch?: FetchWithDispatcher;
  nativeFetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  recordTraffic?: TrafficRecorderOverride;
  findWorkingProxy?: (hostname: string, targetUrl: string) => Promise<string | null>;
};
export type TlsFingerprintStore = {
  used: boolean;
  provider?: string | null;
  sessionScope?: string;
};
export type ProxyTransportRuntime = {
  originalFetch: typeof globalThis.fetch;
  originalFetchWithDispatcher: FetchWithDispatcher;
  proxyContext: AsyncLocalStorage<unknown>;
  tlsFingerprintContext: AsyncLocalStorage<TlsFingerprintStore>;
  resolveProxyForRequest: (url: string) => { source: string; proxyUrl: string | null };
};
export const DIRECT_PROXY_CONTEXT = Symbol.for("omniroute.proxyFetch.direct-context");
const rawUndici = (deps: ProxyFetchDeps) =>
  deps.undiciFetch ?? (undiciFetch as unknown as FetchWithDispatcher);

function isProxyTransportFailure(error: unknown): boolean {
  const msg = error instanceof Error ? error.message : String(error);
  const code = (error as { code?: unknown })?.code;
  return (
    msg.includes("fetch failed") ||
    code === "ECONNREFUSED" ||
    msg.includes("ECONNREFUSED") ||
    (typeof code === "string" && code.startsWith("UND_ERR")) ||
    msg.includes("UND_ERR")
  );
}

function resolveRoute(runtime: ProxyTransportRuntime, target: string) {
  try {
    return runtime.resolveProxyForRequest(target);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[ProxyFetch] Proxy configuration error: ${message}`);
    throw error;
  }
}

export async function dispatchProxyFetch(
  input: RequestInfo | URL,
  options: FetchWithDispatcherOptions = {},
  deps: ProxyFetchDeps,
  runtime: ProxyTransportRuntime
): Promise<Response> {
  stampOwnListenerSelfHop(input, options);
  const context = runtime.proxyContext.getStore();
  if (context === DIRECT_PROXY_CONTEXT)
    return withPayloadTraffic(runtime.originalFetch, null, deps.recordTraffic)(input, options);
  // Explicit dispatchers may not match the ambient context, so never guess their proxy identity.
  if (options.dispatcher)
    return withPayloadTraffic(rawUndici(deps), undefined, deps.recordTraffic)(input, options);
  const target = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  const { source, proxyUrl } = resolveRoute(runtime, target);
  if (!proxyUrl) return dispatchDirectFetch(input, options, deps, runtime, target, source);
  const trafficProxy = source === "context" ? context : proxyUrl;
  if (context && typeof context === "object" && isRelayType((context as { type?: string }).type)) {
    return sendRelay(input, options, deps, context as RelayConfig, trafficProxy, target);
  }
  const store = runtime.tlsFingerprintContext.getStore();
  if (isTlsSendEligible(input, options, target, store, proxyUrl)) {
    const response = await tryTlsSend(input, options, target, store, proxyUrl, trafficProxy, deps);
    if (response) return response;
  }
  return sendProxy(input, options, deps, proxyUrl, trafficProxy, target, source);
}

type RelayConfig = { type?: string; host?: string; relayAuth?: string };
function relayRequest(config: RelayConfig, target: string, options: RequestInit) {
  if (!config.relayAuth) {
    const label = config.type === "vercel" ? "Vercel relay" : `${config.type || "Edge"} relay`;
    throw new Error(`${label} configuration error: missing relayAuth`);
  }
  const headers = new Headers(options.headers);
  for (const [key, value] of Object.entries(buildVercelRelayHeaders(target, config.relayAuth)))
    headers.set(key, value);
  if (process.env.OMNIROUTE_PROXY_FETCH_DEBUG === "true") {
    console.debug(
      `[ProxyFetch] Routing via ${config.type || "edge"} relay: ${proxyUrlForLogs(config.host ? `https://${config.host}` : "")}`
    );
  }
  return { url: `https://${config.host}`, headers };
}

function relayTimeout(url: string): Error {
  const error = new Error(
    `[ProxyFetch] Relay timed out after ${RELAY_FETCH_TIMEOUT_MS}ms (${proxyUrlForLogs(url)})`
  ) as Error & { code: string; errorCode: string; statusCode: number };
  error.code = "RELAY_TIMEOUT";
  error.errorCode = "relay_timeout";
  error.statusCode = 504;
  return error;
}

async function sendRelay(
  input: RequestInfo | URL,
  options: FetchWithDispatcherOptions,
  deps: ProxyFetchDeps,
  config: RelayConfig,
  trafficProxy: unknown,
  target: string
): Promise<Response> {
  const request = relayRequest(config, target, options);
  const max = requestHasNonReplayableBody(input, options) ? 1 : 2;
  let lastError: unknown;
  for (let attempt = 0; attempt < max; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), RELAY_FETCH_TIMEOUT_MS);
    const onAbort = () => controller.abort();
    options.signal?.addEventListener("abort", onAbort, { once: true });
    try {
      return await withPayloadTraffic(
        rawUndici(deps),
        trafficProxy,
        deps.recordTraffic
      )(request.url, {
        ...options,
        headers: request.headers,
        duplex: "half",
        dispatcher: attempt === 0 ? RELAY_POOL_AGENT : RELAY_RETRY_AGENT,
        signal: controller.signal,
      });
    } catch (error) {
      validateRelayRetry(error, controller.signal, options.signal, request.url, attempt, max);
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, RETRY_BACKOFF_MS));
    } finally {
      clearTimeout(timer);
      options.signal?.removeEventListener("abort", onAbort);
    }
  }
  throw lastError;
}

function validateRelayRetry(
  error: unknown,
  signal: AbortSignal,
  caller: AbortSignal | null | undefined,
  url: string,
  attempt: number,
  max: number
): void {
  if (signal.aborted && caller?.aborted !== true) throw relayTimeout(url);
  if (caller?.aborted) throw error;
  if (attempt !== 0 || max <= 1 || !isProxyTransportFailure(error)) throw error;
}

function finalProxyError(error: unknown, proxyUrl: string, target: string, source: string): Error {
  tagProxyUnreachable(error);
  const message = redactProxyDetailsInMessage(
    error instanceof Error ? error.message : String(error)
  );
  const sanitized = sanitizeTransportError(
    error,
    message ? `Proxy request failed: ${message}` : "Proxy request failed",
    "PROXY_REQUEST_FAILED"
  );
  if (sanitized.errorCode === "proxy_unreachable") recordFinalTransportOutcome(proxyUrl, target);
  if (sanitized.causeCode) sanitized.message += ` (cause ${sanitized.causeCode})`;
  console.error(
    `[ProxyFetch] Proxy request failed (${source}, fail-closed; code=${sanitized.code}${sanitized.causeCode ? `; cause=${sanitized.causeCode}` : ""})`
  );
  return sanitized;
}

async function sendProxy(
  input: RequestInfo | URL,
  options: FetchWithDispatcherOptions,
  deps: ProxyFetchDeps,
  proxyUrl: string,
  trafficProxy: unknown,
  target: string,
  source: string
): Promise<Response> {
  const max = requestHasNonReplayableBody(input, options) ? 1 : 2;
  let lastError: unknown;
  for (let attempt = 0; attempt < max; attempt++) {
    try {
      const response = await withPayloadTraffic(
        rawUndici(deps),
        trafficProxy,
        deps.recordTraffic
      )(input, {
        ...options,
        dispatcher:
          attempt === 0 ? createProxyDispatcher(proxyUrl) : getProxyRetryDispatcher(proxyUrl),
      });
      recordProxiedSuccess(proxyUrl, target);
      return response;
    } catch (error) {
      if (getEffectiveSignal(input, options)?.aborted) throw error;
      if (attempt !== 0 || max <= 1 || !isProxyTransportFailure(error))
        throw finalProxyError(error, proxyUrl, target, source);
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, RETRY_BACKOFF_MS));
    }
  }
  throw lastError;
}
