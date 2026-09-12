import { isIP } from "node:net";
import dns from "node:dns";
import {
  type OutboundUrlGuardMode,
  isPrivateHost,
  parseAndValidateNonMetadataUrl,
  parseAndValidatePublicUrl,
  parseOutboundUrl,
} from "@/shared/network/outboundUrlGuard";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuardPolicy";
// #12569: `createPinnedFetch` now lives in the shared `dnsPinnedFetch.ts` module so the
// webhook outbound-URL guard can reuse the exact same connection-pinning mechanism instead of
// duplicating it. Re-exported here for backward compatibility with existing importers of
// `@/shared/network/remoteImageFetch`.
import { createPinnedFetch } from "@/shared/network/dnsPinnedFetch";

export { createPinnedFetch };

const DEFAULT_MAX_REMOTE_IMAGE_BYTES = 20 * 1024 * 1024;
const DEFAULT_MAX_REDIRECTS = 3;
const DEFAULT_TIMEOUT_MS = 15000;

/**
 * Minimal DNS lookup contract — matches the shape returned by
 * `node:dns/promises`.lookup(host, { all: true }). Exposed as an option so
 * tests can inject a fake resolver without touching real DNS.
 */
export type RemoteImageLookup = (
  hostname: string
) => Promise<Array<{ address: string; family: number }>>;

export interface RemoteImageFetchOptions {
  /** Require HTTPS for the initial URL and every redirect hop. Default false for compatibility. */
  enforceHttps?: boolean;
  fetchImpl?: typeof fetch;
  /** Pin the network connection to a DNS answer that passed validation. */
  pinDns?: boolean;
  guard?: OutboundUrlGuardMode;
  maxBytes?: number;
  maxRedirects?: number;
  signal?: AbortSignal;
  timeoutMs?: number;
  /**
   * DNS resolver used for the rebinding guard. Defaults to
   * `dns.promises.lookup(host, { all: true })`. Tests can pass a fake.
   */
  lookup?: RemoteImageLookup;
}

export interface RemoteImageFetchResult {
  buffer: Buffer<ArrayBuffer>;
  contentType: string;
  url: string;
}

/** Generic aliases for non-image callers that need the same SSRF/bounds policy. */
export type RemoteMediaFetchOptions = RemoteImageFetchOptions;
export type RemoteMediaFetchResult = RemoteImageFetchResult;

function validateRemoteImageUrl(input: string | URL, guard: OutboundUrlGuardMode) {
  if (guard === "public-only") return parseAndValidatePublicUrl(input);
  if (guard === "block-metadata") return parseAndValidateNonMetadataUrl(input);
  return parseOutboundUrl(input);
}

function requireHttps(url: URL, enabled: boolean): URL {
  if (enabled && url.protocol !== "https:") {
    throw new Error("Remote media requires HTTPS at every redirect hop");
  }
  return url;
}

const defaultLookup: RemoteImageLookup = (hostname) => dns.promises.lookup(hostname, { all: true });

/** Resolve every answer, reject the host if any answer is private, then return
 * the validated addresses so the caller can bind the connection to one of them. */
async function assertHostnameResolvesPublic(
  url: URL,
  guard: OutboundUrlGuardMode,
  lookup: RemoteImageLookup
): Promise<Array<{ address: string; family: number }>> {
  if (guard !== "public-only") return [];
  const hostname = url.hostname;
  const bare =
    hostname.startsWith("[") && hostname.endsWith("]") ? hostname.slice(1, -1) : hostname;
  if (!bare) return [];
  if (isIP(bare)) return [{ address: bare, family: isIP(bare) }];
  let resolved: Array<{ address: string; family: number }>;
  try {
    resolved = await lookup(bare);
  } catch {
    throw new Error("Remote image host could not be resolved (blocked)");
  }
  if (!resolved.length) {
    throw new Error("Remote image host could not be resolved (blocked)");
  }
  for (const { address } of resolved) {
    if (isPrivateHost(address)) {
      throw new Error("Remote image host resolves to a blocked private address (DNS rebinding)");
    }
  }
  return resolved;
}
function combineSignals(signal: AbortSignal | undefined, timeoutMs: number) {
  const timeoutSignal = AbortSignal.timeout(timeoutMs);
  if (!signal) return timeoutSignal;
  return AbortSignal.any([signal, timeoutSignal]);
}

async function readResponseBuffer(response: Response, maxBytes: number) {
  const contentLengthHeader = response.headers.get("content-length");
  const contentLength = contentLengthHeader ? Number.parseInt(contentLengthHeader, 10) : null;
  if (contentLength !== null && Number.isFinite(contentLength) && contentLength > maxBytes) {
    throw new Error(`Remote image exceeds ${maxBytes} byte limit`);
  }

  if (!response.body) {
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.byteLength > maxBytes) {
      throw new Error(`Remote image exceeds ${maxBytes} byte limit`);
    }
    return buffer;
  }

  const reader = response.body.getReader();
  const chunks: Buffer[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = Buffer.from(value);
      totalBytes += chunk.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        throw new Error(`Remote image exceeds ${maxBytes} byte limit`);
      }
      chunks.push(chunk);
    }
  } finally {
    reader.releaseLock();
  }

  return Buffer.concat(chunks, totalBytes);
}

export async function fetchRemoteMedia(
  input: string | URL,
  options: RemoteMediaFetchOptions = {}
): Promise<RemoteMediaFetchResult> {
  const injectedFetch = options.fetchImpl;
  // Default off: production callers that need connection pinning opt in. This keeps
  // globalThis.fetch mockable for image-generation tests and preserves the previous
  // DNS pre-check behavior for non-embedding callers.
  const pinDns = options.pinDns === true;
  const guard = options.guard ?? getProviderOutboundGuard();
  const maxBytes = options.maxBytes ?? DEFAULT_MAX_REMOTE_IMAGE_BYTES;
  const maxRedirects = options.maxRedirects ?? DEFAULT_MAX_REDIRECTS;
  const signal = combineSignals(options.signal, options.timeoutMs ?? DEFAULT_TIMEOUT_MS);
  const lookup = options.lookup ?? defaultLookup;

  let currentUrl = requireHttps(
    validateRemoteImageUrl(input, guard),
    options.enforceHttps === true
  );
  for (let redirectCount = 0; redirectCount <= maxRedirects; redirectCount++) {
    // DNS-rebinding guard: validate every hop's hostname against its resolved
    // IPs before issuing the request (GHSA-cmhj-wh2f-9cgx).
    const addresses = await assertHostnameResolvesPublic(currentUrl, guard, lookup);
    const fetchImpl =
      injectedFetch ??
      (pinDns && addresses.length
        ? createPinnedFetch(addresses[0].address, addresses[0].family)
        : fetch);
    const response = await fetchImpl(currentUrl.toString(), {
      method: "GET",
      redirect: "manual",
      signal,
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) {
        throw new Error(`Remote image redirect missing Location header (${response.status})`);
      }
      if (redirectCount >= maxRedirects) {
        throw new Error(`Remote image exceeded ${maxRedirects} redirect limit`);
      }
      currentUrl = requireHttps(
        validateRemoteImageUrl(new URL(location, currentUrl), guard),
        options.enforceHttps === true
      );
      continue;
    }

    if (!response.ok) {
      throw new Error(`Remote image fetch error ${response.status}`);
    }

    return {
      buffer: await readResponseBuffer(response, maxBytes),
      contentType: response.headers.get("content-type") || "application/octet-stream",
      url: currentUrl.toString(),
    };
  }

  throw new Error(`Remote image exceeded ${maxRedirects} redirect limit`);
}

/** Backward-compatible image-specific entry point. */
export async function fetchRemoteImage(
  input: string | URL,
  options: RemoteImageFetchOptions = {}
): Promise<RemoteImageFetchResult> {
  return fetchRemoteMedia(input, options);
}
