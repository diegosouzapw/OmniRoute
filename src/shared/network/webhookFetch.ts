import {
  createPinnedFetch,
  defaultDnsLookup,
  resolveHostnameAddresses,
  type DnsLookup,
  type DnsLookupResult,
} from "@/shared/network/dnsPinnedFetch";
import {
  isCloudMetadataHost,
  isPrivateHost,
  OutboundUrlGuardError,
  parseOutboundUrl,
  PROVIDER_URL_BLOCKED_MESSAGE,
} from "@/shared/network/outboundUrlGuard";
import { arePrivateProviderUrlsAllowed } from "@/shared/network/outboundUrlGuardPolicy";

/**
 * #12569 — DNS-resolve-then-pin fetch for webhook outbound calls (custom webhook delivery +
 * the webhook test-diagnostics endpoint). `parseAndValidateWebhookUrl` in
 * `outboundUrlGuardPolicy.ts` only classifies the literal hostname STRING, so a hostname an
 * attacker controls (DNS pointed at 169.254.169.254 / an RFC1918 address) passed that guard
 * and reached the real `fetch()` unmodified. This module resolves DNS up front, rejects any
 * resolved answer that is cloud-metadata (always) or private (unless the private-provider-URL
 * opt-in is on), pins the connection to a validated address, and revalidates every redirect
 * hop the same way — a public host answering 302 to an internal address no longer escapes
 * the guard.
 */

const DEFAULT_MAX_REDIRECTS = 3;

export interface WebhookFetchOptions {
  /** DNS resolver override. Tests inject a fake resolver to avoid real network lookups. */
  lookup?: DnsLookup;
  /** Fetch override. Takes priority over connection pinning — the mockable escape hatch used
   * by existing tests that stub `globalThis.fetch`. */
  fetchImpl?: typeof fetch;
  /** Pin the connection to the validated DNS answer. Default true — this is the mechanism
   * that closes the DNS-rebinding TOCTOU gap. */
  pinDns?: boolean;
  maxRedirects?: number;
  signal?: AbortSignal;
}

export interface WebhookFetchResult {
  response: Response;
  finalUrl: string;
  /** True when a resolved hop is a private address explicitly allowed via opt-in — the
   * caller must not surface the upstream response body for such a target (#3269). */
  redactBody: boolean;
}

/** Reject a resolved address set that includes a metadata or (non-opted-in) private IP. */
function assertAddressesAllowed(addresses: DnsLookupResult[], url: URL): boolean {
  const allowPrivate = arePrivateProviderUrlsAllowed();
  let sawPrivate = false;
  for (const { address } of addresses) {
    if (isCloudMetadataHost(address)) {
      throw new OutboundUrlGuardError(PROVIDER_URL_BLOCKED_MESSAGE, {
        code: "OUTBOUND_URL_GUARD_BLOCKED",
        url: url.toString(),
        hostname: address,
      });
    }
    if (isPrivateHost(address)) {
      if (!allowPrivate) {
        throw new OutboundUrlGuardError(PROVIDER_URL_BLOCKED_MESSAGE, {
          code: "OUTBOUND_URL_GUARD_BLOCKED",
          url: url.toString(),
          hostname: address,
        });
      }
      sawPrivate = true;
    }
  }
  return sawPrivate;
}

async function resolveHop(
  currentUrl: string | URL,
  lookup: DnsLookup
): Promise<{ url: URL; addresses: DnsLookupResult[]; redactBody: boolean }> {
  const url = parseOutboundUrl(currentUrl);
  let addresses: DnsLookupResult[];
  try {
    addresses = await resolveHostnameAddresses(url.hostname, lookup);
  } catch {
    throw new OutboundUrlGuardError("Webhook host could not be resolved (blocked)", {
      code: "OUTBOUND_URL_GUARD_BLOCKED",
      url: url.toString(),
      hostname: url.hostname || null,
    });
  }
  const redactBody = assertAddressesAllowed(addresses, url);
  return { url, addresses, redactBody };
}

function pickFetchImpl(
  fetchImpl: typeof fetch | undefined,
  pinDns: boolean,
  addresses: DnsLookupResult[]
): typeof fetch {
  if (fetchImpl) return fetchImpl;
  if (pinDns && addresses.length) return createPinnedFetch(addresses[0].address, addresses[0].family);
  return fetch;
}

function nextRedirectUrl(
  response: Response,
  currentUrl: URL,
  redirectCount: number,
  maxRedirects: number
): URL {
  const location = response.headers.get("location");
  if (!location) {
    throw new OutboundUrlGuardError("Webhook redirect missing Location header", {
      code: "OUTBOUND_URL_INVALID",
      url: currentUrl.toString(),
    });
  }
  if (redirectCount >= maxRedirects) {
    throw new OutboundUrlGuardError(`Webhook exceeded ${maxRedirects} redirect limit`, {
      code: "OUTBOUND_URL_GUARD_BLOCKED",
      url: currentUrl.toString(),
    });
  }
  return new URL(location, currentUrl);
}

/**
 * DNS-resolve-then-pin POST/GET for a webhook URL, following redirects manually and
 * revalidating DNS at every hop. Throws `OutboundUrlGuardError` when the target (or a
 * redirect target) resolves to a blocked address.
 */
export async function fetchWebhookUrl(
  input: string,
  init: RequestInit,
  options: WebhookFetchOptions = {}
): Promise<WebhookFetchResult> {
  const lookup = options.lookup ?? defaultDnsLookup;
  const maxRedirects = options.maxRedirects ?? DEFAULT_MAX_REDIRECTS;
  const pinDns = options.pinDns !== false;
  let currentUrl: string | URL = input;
  let redactBody = false;

  for (let redirectCount = 0; redirectCount <= maxRedirects; redirectCount++) {
    const hop = await resolveHop(currentUrl, lookup);
    redactBody = redactBody || hop.redactBody;
    const fetchImpl = pickFetchImpl(options.fetchImpl, pinDns, hop.addresses);
    const response = await fetchImpl(hop.url.toString(), {
      ...init,
      redirect: "manual",
      signal: options.signal,
    });

    if (response.status >= 300 && response.status < 400) {
      currentUrl = nextRedirectUrl(response, hop.url, redirectCount, maxRedirects);
      continue;
    }

    return { response, finalUrl: hop.url.toString(), redactBody };
  }

  throw new OutboundUrlGuardError(`Webhook exceeded ${maxRedirects} redirect limit`, {
    code: "OUTBOUND_URL_GUARD_BLOCKED",
    url: String(input),
  });
}
