import { isIP } from "node:net";
import dns from "node:dns";
import { Agent, fetch as undiciFetch } from "undici";
import {
  type OutboundUrlGuardMode,
  isPrivateHost,
  parseAndValidatePublicUrl,
  parseOutboundUrl,
} from "@/shared/network/outboundUrlGuard";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuardPolicy";

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
  buffer: Buffer;
  contentType: string;
  url: string;
}

function validateRemoteImageUrl(input: string | URL, guard: OutboundUrlGuardMode) {
  return guard === "public-only" ? parseAndValidatePublicUrl(input) : parseOutboundUrl(input);
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
/**
 * Build a `fetch` bound to a single already-DNS-validated address, ignoring
 * whatever the hostname resolves to at connect time. Exported for direct
 * testing: this is the mechanism that closes the DNS-rebinding TOCTOU gap
 * (GHSA-cmhj-wh2f-9cgx) — a second, real DNS lookup at connect time could
 * otherwise return a different (possibly private) address than the one
 * `assertHostnameResolvesPublic` validated.
 */
export function createPinnedFetch(address: string, family: number): typeof fetch {
  const dispatcher = new Agent({
    connect: {
      // Node's `net.connect`/`tls.connect` invoke a custom `lookup` in one of
      // two incompatible shapes depending on `options.all`: modern Node
      // (autoSelectFamily / Happy Eyeballs, on by default since Node 18)
      // calls `lookup(hostname, { all: true, ... }, callback)` and requires
      // `callback(err, addresses[])` — an array of `{ address, family }`.
      // Only when `all` is falsy does it accept the single-address form
      // `callback(err, address, family)`. Handling only the single-address
      // form here (as an earlier draft did) throws `ERR_INVALID_IP_ADDRESS`
      // for every real request once autoSelectFamily kicks in, silently
      // breaking every pinned fetch — verified by
      // `tests/unit/remote-image-fetch-pin-dns-connection.test.ts`.
      lookup: (_hostname, options, callback) => {
        if (options && typeof options === "object" && "all" in options && options.all) {
          callback(null, [{ address, family }]);
          return;
        }
        callback(null, address, family);
      },
    },
  });
  return (async (input, init) => {
    try {
      return (await undiciFetch(input as string | URL, {
        ...(init as Parameters<typeof undiciFetch>[1]),
        dispatcher,
      })) as unknown as Response;
    } finally {
      await dispatcher.close();
    }
  }) as typeof fetch;
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

export async function fetchRemoteImage(
  input: string | URL,
  options: RemoteImageFetchOptions = {}
): Promise<RemoteImageFetchResult> {
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

  let currentUrl = validateRemoteImageUrl(input, guard);
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
      currentUrl = validateRemoteImageUrl(new URL(location, currentUrl), guard);
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
