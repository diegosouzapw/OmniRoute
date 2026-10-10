import { isForbiddenCustomHeaderName } from "@/shared/constants/upstreamHeaders";

/**
 * Send the connection-level `providerSpecificData.customHeaders` (#8369) on model discovery
 * too, so a key that needs a routing header on every request (e.g. `anthropic-workspace-id`
 * for an Anthropic key not scoped to a workspace) can list models, not only chat. Same rules
 * as the chat path: auth and hop-by-hop names are skipped, CR/LF is dropped, and a same-named
 * default is replaced case-insensitively instead of duplicated.
 */
export function applyConnectionCustomHeaders(
  headers: Record<string, string>,
  providerSpecificData: unknown
): Record<string, string> {
  const customHeaders =
    providerSpecificData && typeof providerSpecificData === "object"
      ? (providerSpecificData as { customHeaders?: unknown }).customHeaders
      : undefined;
  if (!customHeaders || typeof customHeaders !== "object" || Array.isArray(customHeaders)) {
    return headers;
  }
  for (const [name, value] of Object.entries(customHeaders as Record<string, unknown>)) {
    const trimmed = name.trim();
    if (!trimmed || typeof value !== "string") continue;
    if (isForbiddenCustomHeaderName(trimmed)) continue;
    if (/[\r\n\0]/.test(trimmed) || /[\r\n\0]/.test(value)) continue;
    const lower = trimmed.toLowerCase();
    for (const existing of Object.keys(headers)) {
      if (existing.toLowerCase() === lower) delete headers[existing];
    }
    headers[trimmed] = value;
  }
  return headers;
}
