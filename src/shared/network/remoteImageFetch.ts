import { isIP } from "node:net";
import dns from "node:dns";
import {
  type OutboundUrlGuardMode,
  getProviderOutboundGuard,
  isPrivateHost,
  parseAndValidatePublicUrl,
  parseOutboundUrl,
} from "@/shared/network/outboundUrlGuard";

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

const defaultLookup: RemoteImageLookup = (hostname) =>
  dns.promises.lookup(hostname, { all: true });

/**
 * Defence against DNS-rebinding SSRF (GHSA-cmhj-wh2f-9cgx). The
 * `parseAndValidatePublicUrl` guard only inspects the hostname *string*, so a
 * public-looking host that resolves to a private/loopback/link-local /
 * cloud-metadata address would otherwise be fetched. Resolve the host up-front
 * and reject if ANY answer is private (defeats the multi-A trick). IP literals
 * are skipped — they're already covered by the URL guard. This narrows but
 * does not fully close the TOCTOU window with fetch's own DNS resolution;
 * pinning the connection to the validated IP via undici would close it for
 * good, but is deferred to a follow-up so this fix stays surgical and
 * dependency-free.
 */
async function assertHostnameResolvesPublic(
  url: URL,
  guard: OutboundUrlGuardMode,
  lookup: RemoteImageLookup
): Promise<void> {
  if (guard !== "public-only") return; // private-allowing modes skip this guard
  const hostname = url.hostname;
  const bare =
    hostname.startsWith("[") && hostname.endsWith("]") ? hostname.slice(1, -1) : hostname;
  if (!bare) return;
  if (isIP(bare)) return; // IP literal — already validated by the URL guard.

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
  const fetchImpl = options.fetchImpl ?? fetch;
  const guard = options.guard ?? getProviderOutboundGuard();
  const maxBytes = options.maxBytes ?? DEFAULT_MAX_REMOTE_IMAGE_BYTES;
  const maxRedirects = options.maxRedirects ?? DEFAULT_MAX_REDIRECTS;
  const signal = combineSignals(options.signal, options.timeoutMs ?? DEFAULT_TIMEOUT_MS);
  const lookup = options.lookup ?? defaultLookup;

  let currentUrl = validateRemoteImageUrl(input, guard);
  for (let redirectCount = 0; redirectCount <= maxRedirects; redirectCount++) {
    // DNS-rebinding guard: validate every hop's hostname against its resolved
    // IPs before issuing the request (GHSA-cmhj-wh2f-9cgx).
    await assertHostnameResolvesPublic(currentUrl, guard, lookup);
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
