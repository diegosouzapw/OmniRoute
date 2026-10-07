const DEFAULT_TRAE_API_HOST = "https://api-us-east.trae.ai";

/**
 * Origin of a Trae API host, or null when the value is not an https origin under trae.ai.
 * The token refresh posts credentials to this host, so nothing else is accepted.
 */
export function parseTraeApiHost(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = new URL(value.trim());
    const hostname = url.hostname.toLowerCase();
    const isTraeHost = hostname === "trae.ai" || hostname.endsWith(".trae.ai");
    if (url.protocol === "https:" && isTraeHost && !url.username && !url.password && !url.port) {
      return url.origin;
    }
  } catch {
    // Not a URL.
  }
  return null;
}

/**
 * Base URL for Trae's API, taken from a stored `host` value. Anything that is not a
 * trae.ai https origin falls back to the default region so the token refresh can never be
 * pointed at an arbitrary server.
 */
export function resolveTraeApiHost(value: unknown): string {
  return parseTraeApiHost(value) ?? DEFAULT_TRAE_API_HOST;
}
