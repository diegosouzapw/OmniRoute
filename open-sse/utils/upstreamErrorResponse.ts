import { buildErrorBody, sanitizeUpstreamDetails } from "./error.ts";

interface SanitizedUpstreamErrorResponseOptions {
  status: number;
  rawBody: string;
  fallbackMessage: string;
  headers?: Record<string, string>;
}

/**
 * Preserve a provider's JSON error shape while applying the canonical recursive sanitizer.
 * Providers sometimes label plain text as JSON; those bodies use OmniRoute's canonical error
 * envelope so the advertised content type always matches the response bytes.
 */
export function buildSanitizedUpstreamErrorResponse({
  status,
  rawBody,
  fallbackMessage,
  headers,
}: SanitizedUpstreamErrorResponseOptions): Response {
  const trimmedBody = rawBody.trim();

  if (trimmedBody) {
    try {
      const parsedBody: unknown = JSON.parse(trimmedBody);
      const serializedBody = JSON.stringify(sanitizeUpstreamDetails(parsedBody));
      if (serializedBody !== undefined) {
        return new Response(serializedBody, {
          status,
          headers: { ...headers, "Content-Type": "application/json" },
        });
      }
    } catch {
      // Upstreams commonly return text or HTML despite an application/json response header.
      // Treat it as an opaque message and use the canonical JSON envelope below.
    }
  }

  // Non-JSON is an opaque upstream body. Do not echo even sanitized fragments:
  // provider HTML/plaintext can contain credentials or implementation details
  // outside the patterns the canonical sanitizer knows about.
  return new Response(JSON.stringify(buildErrorBody(status, fallbackMessage)), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}
