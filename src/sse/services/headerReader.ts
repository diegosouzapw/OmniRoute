export type AuthRequestHeaders = Headers | Record<string, string | string[] | undefined>;

/**
 * Safely read a header value from various request-like objects.
 *
 * Accepts:
 * - `Headers` (Web API / Fetch API)
 * - Objects with a `.get()` method (e.g. `IncomingMessage.headers`)
 * - Plain `Record<string, string | string[] | undefined>` objects
 *
 * Extracted to its own module to break the circular import between
 * `./auth.ts` and `./googApiKeyAuth.ts` — both import this function
 * without creating a cycle.
 */
export function readHeaderValue(
  headers:
    | Headers
    | { get?: (name: string) => string | null }
    | Record<string, string | string[] | undefined>
    | null
    | undefined,
  name: string
): string | null {
  if (!headers) return null;

  if (typeof (headers as Headers).get === "function") {
    const value = (headers as Headers).get(name) || (headers as Headers).get(name.toLowerCase());
    return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
  }

  const recordHeaders = headers as Record<string, string | string[] | undefined>;
  const value =
    recordHeaders[name] || recordHeaders[name.toLowerCase()] || recordHeaders[name.toUpperCase()];

  if (Array.isArray(value)) {
    return typeof value[0] === "string" && value[0].trim().length > 0 ? value[0].trim() : null;
  }

  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}