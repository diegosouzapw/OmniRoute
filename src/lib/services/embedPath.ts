/**
 * Pure helpers for the embedded-service reverse proxy path handling.
 *
 * Kept dependency-free so the behavior can be unit-tested without pulling in
 * the registry / DB / htmlRewriter that `reverseProxy.ts` imports.
 */

/**
 * Map the `[[...path]]` catch-all segments to an upstream request path.
 *
 * The segment-less panel root (`/embed/`, matched only because the route is an
 * OPTIONAL catch-all — #6205) yields an empty segment array, which must map to
 * `"/"` so the embedded service serves its index page instead of `/undefined`.
 *
 * @param pathSegments The catch-all segments, e.g. `["ui", "index.html"]` or `[]`.
 */
export function toUpstreamPath(pathSegments: string[]): string {
  return pathSegments.length > 0 ? "/" + pathSegments.join("/") : "/";
}
