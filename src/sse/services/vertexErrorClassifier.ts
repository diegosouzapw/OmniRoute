/**
 * Google's google.rpc.ErrorInfo proto reliably distinguishes a connection-wide
 * PERMISSION_DENIED (API not enabled, or a project-level IAM denial) from a
 * model-specific one (IAM denial scoped to a .../models/<id> resource) — see
 * https://cloud.google.com/apis/design/errors#error_info. Only returns true on
 * POSITIVE evidence of a connection-wide cause; any other shape (including a
 * missing/malformed resource field) falls through to the existing per-model
 * lockout behavior, since that's the safer default and the actual bug this
 * plan fixes (avoid defaulting BACK toward the connection-wide cooldown this
 * plan exists to avoid).
 *
 * Parses the body as JSON and inspects each ErrorInfo-shaped detail object so
 * `reason` and `resource` are correlated within the SAME detail entry — a
 * multi-detail error body (unusual but possible) must not let one detail's
 * resource leak into another detail's reason check. Falls back to a permissive
 * regex scan (pre-JSON-parsing behavior) only when the body isn't parseable
 * JSON or doesn't contain a `details` array, since Vertex error bodies aren't
 * guaranteed to always be well-formed JSON.
 *
 * Extracted to its own module so the single call site in
 * `./auth.ts::markAccountUnavailable()` stays thin wiring, without growing the
 * frozen `auth.ts` file (`config/quality/file-size-baseline.json`).
 */
export function isVertexConnectionWidePermissionDenied(
  errorText: string | null | undefined
): boolean {
  if (!errorText) return false;

  try {
    const parsed = JSON.parse(errorText);
    const details: unknown[] =
      parsed?.error?.details ?? parsed?.details ?? (Array.isArray(parsed) ? parsed : []);
    if (Array.isArray(details) && details.length > 0) {
      for (const detail of details) {
        if (!detail || typeof detail !== "object") continue;
        const reason = (detail as Record<string, unknown>).reason;
        if (reason === "SERVICE_DISABLED") return true;
        if (reason === "IAM_PERMISSION_DENIED") {
          const metadata = (detail as Record<string, unknown>).metadata;
          const resource =
            metadata && typeof metadata === "object"
              ? (metadata as Record<string, unknown>).resource
              : undefined;
          if (typeof resource === "string" && !resource.includes("/models/")) return true;
        }
      }
      // Well-formed details array present but no detail matched a connection-wide
      // pattern (e.g. IAM_PERMISSION_DENIED with a /models/ resource, or no
      // recognized reason at all) — per-model lockout is correct, don't fall
      // through to the regex heuristic (it would just re-derive the same answer
      // less precisely, or worse, could false-positive on stray substrings).
      return false;
    }
  } catch {
    // Not parseable JSON — fall through to the regex heuristic below.
  }

  // Fallback for non-JSON or unexpected-shape error bodies (regex-based,
  // pre-JSON-parsing heuristic — kept for robustness against malformed bodies).
  if (/"reason"\s*:\s*"SERVICE_DISABLED"/.test(errorText)) return true;
  if (/"reason"\s*:\s*"IAM_PERMISSION_DENIED"/.test(errorText)) {
    const resourceMatch = errorText.match(/"resource"\s*:\s*"([^"]*)"/);
    if (resourceMatch && !resourceMatch[1].includes("/models/")) return true;
  }
  return false;
}
