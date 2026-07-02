/**
 * Extract a human-readable message from an API error response body.
 *
 * OmniRoute's structured error envelope is `{ error: { code, message,
 * correlation_id } }`, but some routes return `{ error: "string" }`. Rendering
 * the raw `error` object in the dashboard yields "[object Object]" (or nothing),
 * which hid actionable messages such as `INVALID_ORIGIN` (#5340) — the operator
 * saw a silent failure instead of guidance. Funnel API error bodies through this
 * so the message (and its actionable hint) always surfaces.
 */
export function extractApiErrorMessage(body: unknown, fallback: string): string {
  const err = (body as { error?: unknown } | null | undefined)?.error;
  if (typeof err === "string" && err.trim()) return err.trim();
  if (err && typeof err === "object") {
    const message = (err as { message?: unknown }).message;
    if (typeof message === "string" && message.trim()) return message.trim();
  }
  return fallback;
}
