/**
 * Extract a human-readable message from an API error response body.
 *
 * OmniRoute's structured error envelope is `{ error: { code, message,
 * correlation_id } }`, but some routes return `{ error: "string" }` and
 * validation failures return `{ error: { message, details:
 * [{ field, message }] } }`. Rendering the raw `error` object in the
 * dashboard yields "[object Object]" (or nothing), which hid actionable
 * messages such as `INVALID_ORIGIN` (#5340) — the operator saw a silent
 * failure instead of guidance. Funnel API error bodies through this so the
 * message — and its actionable details — always surface.
 */
export function extractApiErrorMessage(body: unknown, fallback: string): string {
  const err = (body as { error?: unknown } | null | undefined)?.error;
  if (typeof err === "string" && err.trim()) return err.trim();
  if (err && typeof err === "object") {
    const details = formatValidationDetails((err as { details?: unknown }).details);
    const message = (err as { message?: unknown }).message;
    if (typeof message === "string" && message.trim()) {
      return details ? `${message.trim()}: ${details}` : message.trim();
    }
    if (details) return details;
  }
  return fallback;
}

function formatValidationDetails(details: unknown): string {
  if (!Array.isArray(details)) return "";
  const parts = details.map((detail) => {
    if (!detail || typeof detail !== "object") return "";
    const field = (detail as { field?: unknown }).field;
    const message = (detail as { message?: unknown }).message;
    if (typeof message !== "string" || !message.trim()) return "";
    return typeof field === "string" && field.trim()
      ? `${field.trim()}: ${message.trim()}`
      : message.trim();
  });
  return parts.filter(Boolean).join("; ");
}
