export function getHeaderValueCaseInsensitive(
  headers: Record<string, unknown> | Headers | null | undefined,
  targetName: string
) {
  if (!headers || typeof headers !== "object") return null;
  if (headers instanceof Headers) {
    return headers.get(targetName);
  }
  const lowered = targetName.toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === lowered && typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return null;
}

/**
 * Per-request opt-out of memory (and skills) injection via the
 * `x-omniroute-no-memory` header. Mirrors the existing `x-omniroute-no-cache`
 * convention. Truthy values: `true` / `1` / `yes` (case-insensitive). Clients that
 * manage their own context (RAG/memory) send this to avoid the gateway injecting
 * up to `memorySettings.maxTokens` (~2k) tokens — and being billed for them — on
 * every chat call. See _tasks/PRD-2026-06-19-no-memory-header.md.
 */
export function isNoMemoryRequested(
  headers: Record<string, unknown> | Headers | null | undefined
): boolean {
  const value = (getHeaderValueCaseInsensitive(headers, "x-omniroute-no-memory") || "")
    .trim()
    .toLowerCase();
  return value === "true" || value === "1" || value === "yes";
}
