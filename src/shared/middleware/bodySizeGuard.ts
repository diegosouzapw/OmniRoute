/**
 * Body Size Guard — E-1 Critical Fix
 *
 * Middleware helper that rejects oversized request bodies
 * before they are parsed, preventing OOM from malicious payloads.
 *
 * Usage:
 *   import { checkBodySize, MAX_BODY_BYTES } from "@/shared/middleware/bodySizeGuard";
 *
 *   const rejection = checkBodySize(request);
 *   if (rejection) return rejection;
 *
 * @module shared/middleware/bodySizeGuard
 */

/** Default maximum body size: 10 MB */
const DEFAULT_MAX_BODY_BYTES = 10 * 1024 * 1024;

/** Larger limit for backup/import routes: 100 MB */
export const MAX_BODY_BYTES_IMPORT = 100 * 1024 * 1024;

/** Larger limit for audio transcription uploads: 100 MB */
export const MAX_BODY_BYTES_AUDIO = 100 * 1024 * 1024;

/** Configured limit — reads from env or falls back to 10 MB */
export const MAX_BODY_BYTES = parseInt(
  process.env.MAX_BODY_SIZE_BYTES || String(DEFAULT_MAX_BODY_BYTES),
  10
);

type BodySizeRule = { prefix: string; limit: number };

const ROUTE_LIMITS: BodySizeRule[] = [
  { prefix: "/api/db-backups/import", limit: MAX_BODY_BYTES_IMPORT },
  { prefix: "/api/v1/audio/transcriptions", limit: MAX_BODY_BYTES_AUDIO },
];

/**
 * Resolve the body size limit for a request path.
 */
export function getBodySizeLimit(pathname: string): number {
  const customRule = ROUTE_LIMITS.find((rule) => pathname.startsWith(rule.prefix));
  return customRule?.limit ?? MAX_BODY_BYTES;
}

/**
 * Check Content-Length header against the configured limit.
 * Returns a 413 Response if the body is too large, or null if OK.
 */
export function checkBodySize(request: Request, limit: number = MAX_BODY_BYTES): Response | null {
  const contentLength = request.headers.get("content-length");

  if (contentLength) {
    const bytes = parseInt(contentLength, 10);
    if (!Number.isNaN(bytes) && bytes > limit) {
      return new Response(
        JSON.stringify({
          error: {
            message: `Request body too large. Maximum allowed: ${formatBytes(limit)}`,
            type: "payload_too_large",
            code: "PAYLOAD_TOO_LARGE",
          },
        }),
        {
          status: 413,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": process.env.CORS_ORIGIN || "*",
          },
        }
      );
    }
  }

  return null;
}

/** Format bytes as human-readable string */
function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(0)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${bytes} bytes`;
}
