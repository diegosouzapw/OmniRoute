import { isIP } from "node:net";
import dns from "node:dns";
import { Agent, fetch as undiciFetch } from "undici";

/**
 * Shared DNS-resolve-then-pin primitives (#12569). Originally written only for
 * `remoteImageFetch.ts` (GHSA-cmhj-wh2f-9cgx); extracted here so the webhook outbound-URL
 * guard (`webhookFetch.ts`) can reuse the exact same connection-pinning mechanism instead of
 * duplicating it. `remoteImageFetch.ts` re-exports `createPinnedFetch` from here for backward
 * compatibility with its existing import path.
 */

export interface DnsLookupResult {
  address: string;
  family: number;
}

/**
 * Minimal DNS lookup contract — matches the shape returned by
 * `node:dns/promises`.lookup(host, { all: true }). Exposed as an option so
 * tests can inject a fake resolver without touching real DNS.
 */
export type DnsLookup = (hostname: string) => Promise<DnsLookupResult[]>;

export const defaultDnsLookup: DnsLookup = (hostname) =>
  dns.promises.lookup(hostname, { all: true });

/** Strip literal IPv6 brackets: "[::1]" -> "::1". */
export function bareHostname(hostname: string): string {
  return hostname.startsWith("[") && hostname.endsWith("]") ? hostname.slice(1, -1) : hostname;
}

/**
 * Resolve every DNS answer for a hostname, short-circuiting for an IP literal (which needs no
 * lookup — it already IS the connect-time address). Fails closed: a lookup error or an empty
 * answer set throws rather than being treated as "no restriction applies".
 */
export async function resolveHostnameAddresses(
  hostname: string,
  lookup: DnsLookup = defaultDnsLookup
): Promise<DnsLookupResult[]> {
  const bare = bareHostname(hostname);
  if (!bare) return [];
  const literalFamily = isIP(bare);
  if (literalFamily) return [{ address: bare, family: literalFamily }];
  const resolved = await lookup(bare);
  if (!resolved.length) {
    throw new Error(`Host "${bare}" could not be resolved`);
  }
  return resolved;
}

/**
 * Build a `fetch` bound to a single already-DNS-validated address, ignoring
 * whatever the hostname resolves to at connect time. Exported for direct
 * testing: this is the mechanism that closes the DNS-rebinding TOCTOU gap
 * (GHSA-cmhj-wh2f-9cgx) — a second, real DNS lookup at connect time could
 * otherwise return a different (possibly private) address than the one
 * validated up-front.
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
