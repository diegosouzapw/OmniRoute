import { isLocalProvider, isSelfHostedChatProvider } from "@/shared/constants/providers";
import {
  parseAndValidateNonMetadataUrl,
  parseAndValidatePublicUrl,
} from "@/shared/network/outboundUrlGuard";
import { getProviderValidationGuard } from "@/shared/network/outboundUrlGuardPolicy";
import { getGuardedDispatcher } from "../utils/connectGuardDispatcher.ts";
import {
  hasAmbientProxyContext,
  isDirectFetchContext,
  isTlsFingerprintActive,
  resolveProxyForRequest,
} from "../utils/proxyFetch.ts";

/**
 * String-level SSRF guard for the runtime dispatch path (GHSA-4f49-hj64-448x) — moved verbatim
 * from `BaseExecutor.assertOutboundUrlAllowed()` (which now delegates here) so the guard and the
 * connect-time guard below live together and `base.ts` stays within its file-size ceiling.
 * Local / self-hosted providers are exempt; `public-only` blocks private + metadata, the default
 * mode blocks the cloud-metadata IMDS pivot. Throws on a blocked URL.
 */
export function assertDispatchUrlAllowed(provider: string, url: string): void {
  if (!url) return;
  if (isLocalProvider(provider) || isSelfHostedChatProvider(provider)) return;
  if (getProviderValidationGuard() === "public-only") {
    parseAndValidatePublicUrl(url);
    return;
  }
  parseAndValidateNonMetadataUrl(url);
}

/**
 * True when a request to `url`, issued from the current async scope, would take the ordinary
 * direct undici path of the patched fetch — so a caller-supplied guarded `dispatcher` can be
 * handed to it without skipping anything the patched fetch does for that request.
 *
 * Deliberately conservative — anything else answers `false` and the caller keeps its plain
 * (string-level) URL guard instead:
 * - a proxy applies (per-connection context proxy or env proxy): the proxy resolves the name
 *   itself, and a caller dispatcher would bypass it and leak the egress IP;
 * - the explicit direct sentinel is active: `patchedFetch` then uses the native fetch, which
 *   cannot drive an undici dispatcher;
 * - TLS-fingerprint impersonation would carry the request: a caller dispatcher short-circuits it;
 * - the proxy configuration cannot be resolved (`resolveProxyForRequest` throws).
 */
export function canGuardDirectConnection(provider: string, url: string): boolean {
  if (hasAmbientProxyContext() || isDirectFetchContext()) return false;
  if (isTlsFingerprintActive(provider, false)) return false;
  try {
    return resolveProxyForRequest(url).source === "direct";
  } catch {
    return false;
  }
}

type DispatchCredentials = { providerSpecificData?: { baseUrl?: unknown } } | null;

/**
 * `fetch(url, init)` for provider dispatch, with a connect-time DNS-rebinding guard
 * (GHSA-cmhj-wh2f-9cgx) on operator-supplied base URLs.
 *
 * `assertDispatchUrlAllowed()` validates the host NAME, but the real `fetch()` re-resolves DNS at
 * connect time — a short-TTL record can be public for the string check and private/metadata
 * moments later (classic TOCTOU). That is exploitable where the host is operator-controlled: the
 * `providerSpecificData.baseUrl` override (#6147), which is also where every `openai-compatible-*`
 * node gets its host. Built-in providers' hosts are fixed registry values, so they keep the
 * ordinary pooled dispatcher (and its retry policy).
 *
 * For an operator URL the call goes through the AMBIENT global `fetch` — the patched one from
 * `proxyFetch.ts`, or whatever a test stubbed in — carrying a `dispatcher` whose connections are
 * validated at connect time (`getGuardedDispatcher`). No DNS lookup happens here, so stubbed
 * fetches never touch DNS. Nothing is guarded (string-level check only) when the provider is
 * exempt, the guard is `"none"`, or {@link canGuardDirectConnection} says a proxy /
 * TLS-impersonation / explicit-direct route applies — when in doubt we do NOT swap the transport.
 */
export function dispatchGuarded(
  provider: string,
  url: string,
  init: RequestInit,
  credentials?: DispatchCredentials
): Promise<Response> {
  const override = credentials?.providerSpecificData?.baseUrl;
  const guard = getProviderValidationGuard();
  if (
    guard === "none" ||
    typeof override !== "string" ||
    override.trim() === "" ||
    isLocalProvider(provider) ||
    isSelfHostedChatProvider(provider) ||
    !canGuardDirectConnection(provider, url)
  ) {
    return fetch(url, init);
  }
  return fetch(url, { ...init, dispatcher: getGuardedDispatcher(guard) } as RequestInit);
}
