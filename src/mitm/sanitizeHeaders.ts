import type { IncomingHttpHeaders } from "node:http";
import { isForbiddenUpstreamHeaderName } from "@/shared/constants/upstreamHeaders";
import { maskSecret } from "./maskSecrets";

/**
 * Header names whose values must be masked (case-insensitive).
 * These carry credentials/tokens that must not appear in logs or broadcasts.
 */
const SECRET_HEADER_NAMES = new Set([
  "authorization",
  "cookie",
  // `set-cookie` is the RESPONSE-side credential header — upstream session/CSRF
  // cookies must be masked too, else they leak verbatim into inspector JSON.
  "set-cookie",
  "x-api-key",
  "api-key",
  "bearer",
  "proxy-authorization",
]);

function isSecretHeader(name: string): boolean {
  return SECRET_HEADER_NAMES.has(name.toLowerCase());
}

/**
 * Sanitize HTTP headers for safe logging/broadcasting.
 *
 * - Removes headers in the upstream denylist (hop-by-hop, Host, etc.)
 * - Applies maskSecret() to values of authorization/cookie/key headers
 * - Coerces array values to comma-joined strings
 * - Returns a plain Record<string, string> (never undefined values)
 */
export function sanitizeHeaders(
  headers: IncomingHttpHeaders | Record<string, string | string[] | undefined>,
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(headers)) {
    if (value === undefined || value === null) continue;

    const lowerKey = key.toLowerCase();

    // Remove denylist headers (hop-by-hop, framing)
    if (isForbiddenUpstreamHeaderName(lowerKey)) continue;

    // Normalize array values
    const strValue = Array.isArray(value) ? value.join(", ") : String(value);

    // Mask secret header values
    if (isSecretHeader(lowerKey)) {
      // `set-cookie` carries an entire session/CSRF cookie value that maskSecret's
      // format heuristics (Bearer / sk- / ≥40-char) do NOT catch, so it would leak
      // verbatim into inspector JSON — fully redact it (SECURITY_AUDIT M6).
      result[lowerKey] = lowerKey === "set-cookie" ? "[REDACTED]" : maskSecret(strValue);
    } else {
      result[lowerKey] = strValue;
    }
  }

  return result;
}
