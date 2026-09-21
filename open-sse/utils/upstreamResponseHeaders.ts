/**
 * Header-strip helper for upstream provider responses.
 *
 * `fetch()` always decompresses the upstream body before exposing it via
 * `.text()` or the stream reader, so forwarding the upstream `content-encoding`
 * to the downstream client (e.g. `gzip`) makes the client attempt to gunzip
 * plain text and fail with `ZlibError: incorrect header check`.
 *
 * Similarly, `content-length` becomes stale once we transform or repack the
 * response stream, and `transfer-encoding` is managed by the runtime
 * (Next.js / Node), not us.
 */

const STRIP_HEADER_NAMES: ReadonlySet<string> = new Set([
  "content-encoding",
  "content-length",
  "transfer-encoding",
]);

/**
 * Return a new `Headers` instance with stale encoding/length headers removed.
 * Does not mutate the input.
 */
export function stripStaleEncodingHeaders(input: Headers): Headers {
  const out = new Headers(input);
  for (const name of STRIP_HEADER_NAMES) out.delete(name);
  return out;
}

/**
 * Return a new entries array with stale encoding/length headers removed and
 * (optionally) additional header names removed. Case-insensitive.
 */
export function filterUpstreamResponseHeaderEntries(
  entries: Iterable<[string, string]>,
  extraToStrip: ReadonlyArray<string> = []
): Array<[string, string]> {
  const drop = new Set<string>(STRIP_HEADER_NAMES);
  for (const h of extraToStrip) drop.add(h.toLowerCase());
  const result: Array<[string, string]> = [];
  for (const [k, v] of entries) {
    if (!drop.has(k.toLowerCase())) result.push([k, v]);
  }
  return result;
}

export const STRIP_UPSTREAM_HEADER_NAMES: ReadonlySet<string> = STRIP_HEADER_NAMES;

/**
 * Response headers that must never be relayed back to a client.
 *
 * A relay sends its own credential upstream (the bifrost route sends
 * `Authorization: Bearer ${BIFROST_API_KEY}` to the sidecar). If that upstream
 * echoes the header back — or sets its own session cookie — copying the response
 * headers wholesale hands it to whoever holds the relay token
 * (GHSA-9m72-44hg-w32g). `set-cookie` matters as much as `authorization`: it is
 * a session, and the browser would store it against OUR origin.
 */
const SENSITIVE_RESPONSE_HEADER_NAMES: ReadonlyArray<string> = [
  "authorization",
  "proxy-authorization",
  "x-api-key",
  "x-goog-api-key",
  "api-key",
  "cookie",
  "set-cookie",
];

/**
 * New Headers with the stale framing set AND any echoed credential/session
 * header removed. Use this instead of `new Headers(upstream.headers)` on every
 * path that relays an upstream response to a client. Does not mutate the input.
 */
export function stripSensitiveResponseHeaders(input: Headers): Headers {
  return new Headers(
    filterUpstreamResponseHeaderEntries(input.entries(), SENSITIVE_RESPONSE_HEADER_NAMES)
  );
}

export { SENSITIVE_RESPONSE_HEADER_NAMES };
