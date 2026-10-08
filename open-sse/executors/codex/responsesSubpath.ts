/**
 * Extracts the `/v1/responses/<subpath>` suffix the Codex executor forwards upstream
 * (e.g. `/compact`, `/<id>/cancel`). Returns "" for the plain endpoint and null when the
 * path is not a Responses path or the subpath is unsafe to append.
 */

// The subpath comes from the request URL and is appended to the upstream URL verbatim, so
// anything the upstream (or fetch's URL parser) would read as path traversal or as the end of
// the path is refused. The caller then falls back to the plain /responses endpoint.
const UNSAFE_SUBPATH_ESCAPE = /%(?:2e|2f|5c|23|3f|00)/i;

function isSafeResponsesSubpath(subpath: string): boolean {
  if (subpath === "") return true;
  if (/[\\?#\u0000]/.test(subpath) || UNSAFE_SUBPATH_ESCAPE.test(subpath)) return false;
  return !subpath.split("/").some((segment) => segment === "." || segment === "..");
}

export function getResponsesSubpath(endpointPath: unknown): string | null {
  const subpath = findResponsesSubpath(endpointPath);
  return subpath !== null && isSafeResponsesSubpath(subpath) ? subpath : null;
}

function findResponsesSubpath(endpointPath: unknown): string | null {
  let normalizedEndpoint = String(endpointPath || "");
  while (normalizedEndpoint.endsWith("/") && normalizedEndpoint.length > 0) {
    normalizedEndpoint = normalizedEndpoint.slice(0, -1);
  }

  const lower = normalizedEndpoint.toLowerCase();
  if (lower === "responses" || lower.endsWith("/responses")) {
    return "";
  }

  const responsesSlash = "/responses/";
  const idx = lower.lastIndexOf(responsesSlash);
  if (idx !== -1) {
    return normalizedEndpoint.slice(idx + "/responses".length);
  }

  if (lower.startsWith("responses/")) {
    return normalizedEndpoint.slice("responses".length);
  }

  return null;
}
