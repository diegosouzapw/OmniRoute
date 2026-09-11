import { isIP } from "node:net";
import dns from "node:dns";
import { Agent, fetch as undiciFetch } from "undici";
import { isCloudMetadataHost, isPrivateHost, type OutboundUrlGuardMode } from "./outboundUrlGuard";

/**
 * Minimal DNS lookup contract — matches the shape returned by
 * `node:dns/promises`.lookup(host, { all: true }). Exposed as an option so
 * tests can inject a fake resolver without touching real DNS.
 */
export type DnsLookupResult = { address: string; family: number };
export type DnsLookupFn = (hostname: string) => Promise<DnsLookupResult[]>;

export const defaultDnsLookup: DnsLookupFn = (hostname) =>
  dns.promises.lookup(hostname, { all: true });

/**
 * Resolve every DNS answer for `url`'s hostname and validate each resolved
 * address against `guard`, closing the DNS-rebinding TOCTOU window
 * (GHSA-cmhj-wh2f-9cgx): a hostname-string check performed at request
 * validation time can pass while a later, independent DNS lookup at connect
 * time returns a different — possibly private/metadata — address. Returns the
 * validated addresses so the caller can pin the connection to one of them via
 * {@link createPinnedFetch}.
 *
 * Returns `[]` (no pinning needed/possible) when:
 *  - `guard` is `"none"` (outbound guard disabled — explicit operator opt-in), or
 *  - the hostname is already a literal IP address (still returned as a single
 *    validated entry so the caller can pin to it).
 */
export async function resolveAndValidateAddresses(
  url: URL,
  guard: OutboundUrlGuardMode,
  lookup: DnsLookupFn = defaultDnsLookup
): Promise<DnsLookupResult[]> {
  if (guard === "none") return [];
  const hostname = url.hostname;
  const bare =
    hostname.startsWith("[") && hostname.endsWith("]") ? hostname.slice(1, -1) : hostname;
  if (!bare) return [];
  if (isIP(bare)) return [{ address: bare, family: isIP(bare) }];

  let resolved: DnsLookupResult[];
  try {
    resolved = await lookup(bare);
  } catch {
    throw new Error(`Outbound host could not be resolved (blocked): ${hostname}`);
  }
  if (!resolved.length) {
    throw new Error(`Outbound host could not be resolved (blocked): ${hostname}`);
  }

  for (const { address } of resolved) {
    if (guard === "public-only" && isPrivateHost(address)) {
      throw new Error(
        `Outbound host resolves to a blocked private address (DNS rebinding): ${hostname}`
      );
    }
    if (guard === "block-metadata" && isCloudMetadataHost(address)) {
      throw new Error(
        `Outbound host resolves to a blocked cloud-metadata address (DNS rebinding): ${hostname}`
      );
    }
  }

  return resolved;
}

/**
 * Build a `fetch` bound to a single already-DNS-validated address, ignoring
 * whatever the hostname resolves to at connect time. This is the mechanism
 * that closes the DNS-rebinding TOCTOU gap (GHSA-cmhj-wh2f-9cgx) — a second,
 * real DNS lookup at connect time could otherwise return a different
 * (possibly private/metadata) address than the one
 * {@link resolveAndValidateAddresses} validated.
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
