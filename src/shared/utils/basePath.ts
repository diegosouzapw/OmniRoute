/**
 * Client/server helpers for Next.js `basePath` / `OMNIROUTE_BASE_PATH` deploys.
 *
 * Next.js rewrites Link/router automatically, but absolute browser calls like
 * `fetch("/api/...")` and `new EventSource("/api/...")` do not get the prefix.
 * Under a reverse-proxy subpath those hit the domain root instead of the app.
 */

/** Normalize to leading slash, no trailing slash. Empty / root → `""`. */
export function normalizeBasePath(value?: string | null): string {
  const trimmed = value?.trim() ?? "";
  if (!trimmed || trimmed === "/") return "";
  const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withSlash.replace(/\/+$/, "");
}

/**
 * Deploy basePath as seen by the client bundle.
 * Set via next.config `env.NEXT_PUBLIC_OMNIROUTE_BASE_PATH` from `OMNIROUTE_BASE_PATH`.
 */
export function getDeployBasePath(
  env: NodeJS.ProcessEnv = typeof process !== "undefined" ? process.env : ({} as NodeJS.ProcessEnv)
): string {
  return normalizeBasePath(
    env.NEXT_PUBLIC_OMNIROUTE_BASE_PATH || env.OMNIROUTE_BASE_PATH || ""
  );
}

/**
 * Prefix a same-origin app path with the deploy basePath when needed.
 *
 * - Relative absolute paths: `/api/health/ping` → `/omniroute/api/health/ping`
 * - Absolute same-origin URLs: `https://host/api/x` → `https://host/omniroute/api/x`
 * - Already-prefixed paths, external URLs, and protocol-relative URLs are unchanged
 */
export function withBasePath(
  input: string,
  basePath: string = getDeployBasePath(),
  origin?: string
): string {
  if (!basePath) return input;
  if (!input) return input;

  // Protocol-relative or non-path forms
  if (input.startsWith("//")) return input;

  // Absolute path on this origin
  if (input.startsWith("/")) {
    if (input === basePath || input.startsWith(`${basePath}/`)) return input;
    return `${basePath}${input}`;
  }

  // Absolute URL — only rewrite same-origin
  try {
    const baseOrigin =
      origin ||
      (typeof window !== "undefined" ? window.location.origin : "http://localhost");
    const url = new URL(input, baseOrigin);
    const currentOrigin = new URL(baseOrigin).origin;
    if (url.origin !== currentOrigin) return input;

    if (url.pathname === basePath || url.pathname.startsWith(`${basePath}/`)) {
      return url.toString();
    }
    url.pathname = `${basePath}${url.pathname.startsWith("/") ? url.pathname : `/${url.pathname}`}`;
    return url.toString();
  } catch {
    return input;
  }
}
