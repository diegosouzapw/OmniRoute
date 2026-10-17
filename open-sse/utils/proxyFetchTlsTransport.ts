import { type TlsFetchOptions, guardTlsFirstByte } from "./tlsClient.ts";
import { meterTrafficSend } from "./proxyTrafficTransport.ts";
import { tlsFingerprintProviderAllowed } from "./tlsFingerprintExclusions.ts";
import { sanitizeTransportError } from "./proxyTransportError.ts";
import {
  activeTlsClient,
  isTlsFingerprintEnabled,
  tlsProfileForProvider,
  isTlsRequestEligible,
  isWreqProxySupported,
  getEffectiveSignal,
  isAmbiguousFailureReplaySafe,
} from "./proxyFetchTransportSupport.ts";
import type { ProxyFetchDeps, TlsFingerprintStore } from "./proxyFetchTransport.ts";

export function isTlsSendEligible(
  input: RequestInfo | URL,
  options: RequestInit,
  target: string,
  store: TlsFingerprintStore | undefined,
  proxyUrl: string | null
): boolean {
  if (
    !isTlsFingerprintEnabled() ||
    !activeTlsClient.available ||
    !isTlsRequestEligible(input, options)
  )
    return false;
  if (!tlsFingerprintProviderAllowed(store?.provider, proxyUrl !== null, target)) return false;
  if (proxyUrl === null) return true;
  return (
    typeof store?.sessionScope === "string" &&
    store.sessionScope.trim().length > 0 &&
    isWreqProxySupported(proxyUrl)
  );
}

/** Existing TLS fallback contract: never replay caller aborts, unsafe bodies or cookie sessions. */
export async function tryTlsSend(
  input: RequestInfo | URL,
  options: RequestInit,
  target: string,
  store: TlsFingerprintStore | undefined,
  proxyUrl: string | null,
  trafficProxy: unknown,
  deps: ProxyFetchDeps
): Promise<Response | null> {
  try {
    const response = await meterTrafficSend(
      trafficProxy,
      input,
      options,
      () =>
        activeTlsClient.fetch(target, {
          method: options.method,
          headers: options.headers,
          body: options.body as TlsFetchOptions["body"],
          redirect: options.redirect,
          signal: getEffectiveSignal(input, options),
          proxy: proxyUrl,
          sessionScope: store?.sessionScope,
          ...tlsProfileForProvider(store?.provider),
        }),
      deps.recordTraffic,
      async (raw) => {
        if (store) store.used = true;
        return guardTlsFirstByte(raw);
      }
    );
    return response;
  } catch (error) {
    if (getEffectiveSignal(input, options)?.aborted) throw error;
    const sessionHadCookies =
      !!error &&
      typeof error === "object" &&
      "sessionHadCookies" in error &&
      error.sessionHadCookies === true;
    if (!isAmbiguousFailureReplaySafe(input, options) || sessionHadCookies) {
      throw sanitizeTransportError(
        error,
        sessionHadCookies
          ? "TLS fingerprint request failed; stateful session cannot be replayed"
          : "TLS fingerprint request failed; request is not safe to replay",
        "TLS_FINGERPRINT_FAILED"
      );
    }
    console.warn(
      `[ProxyFetch] TLS fingerprint transport failed; using ${proxyUrl === null ? "direct" : "proxy"} dispatcher`
    );
    if (store) store.used = false;
    return null;
  }
}
