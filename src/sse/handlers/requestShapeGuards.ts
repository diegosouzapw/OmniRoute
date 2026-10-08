/**
 * Request-shape guards for the chat entry path.
 *
 * Extracted verbatim from chatHelpers.ts (a file-size-frozen file): the guards
 * below are pure request introspection, so they live outside the handler.
 */

/** Case-insensitive header read that tolerates array-valued headers. */
export function getHeaderValue(
  headers: Record<string, unknown> | null | undefined,
  name: string
): string {
  if (!headers || typeof headers !== "object") return "";
  const lowerName = name.toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() !== lowerName) continue;
    return Array.isArray(value) ? value.join(",") : String(value ?? "");
  }
  return "";
}

/** Whether a `/responses` request came from the Codex CLI (UA/headers/metadata). */
export function isCodexNativeResponsesRequest(
  body: any,
  endpointPath: string,
  headers: Record<string, unknown> | null | undefined
): boolean {
  const normalizedEndpoint = String(endpointPath || "").replace(/\/+$/, "");
  if (!/(^|\/)responses(?=\/|$)/i.test(normalizedEndpoint)) return false;
  if (/\/responses\/compact$/i.test(normalizedEndpoint)) return true;

  const userAgent = getHeaderValue(headers, "user-agent").toLowerCase();
  if (userAgent.includes("codex")) return true;
  if (getHeaderValue(headers, "x-codex-session-id")) return true;
  if (getHeaderValue(headers, "x-codex-window-id")) return true;
  if (getHeaderValue(headers, "x-codex-turn-metadata")) return true;

  const metadataSource =
    body && typeof body === "object" && body.metadata && typeof body.metadata === "object"
      ? String(body.metadata.source || "")
      : "";
  return metadataSource.toLowerCase().includes("codex");
}
