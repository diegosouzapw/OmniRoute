/**
 * modelImportWarning — pure helper (no React/store deps) so it is unit-testable in isolation.
 *
 * The model-import route (`/api/providers/[id]/models`) returns a `warning` field when it falls
 * back to the cached/local catalog (e.g. the provider's `/models` endpoint was unreachable —
 * "API unavailable — using local catalog"). The import hook previously read only `models`/`error`,
 * so the fallback was silent: the user saw imported models with no indication they came from the
 * local catalog instead of the live API (#5428, #5429, #5431). Returns the warning string to
 * surface as a log line, or null when the response carries no usable warning.
 */
export function extractImportWarning(data: unknown): string | null {
  if (data && typeof data === "object" && "warning" in data) {
    const warning = (data as { warning?: unknown }).warning;
    if (typeof warning === "string" && warning.trim()) return warning;
  }
  return null;
}
