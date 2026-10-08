/**
 * Extract a human-readable message from a failed `fetch` Response body.
 *
 * Handles both response shapes OmniRoute routes emit:
 * - OpenAI-style `{ error: { message, type, code } }` (from `buildErrorBody`)
 * - legacy `{ error: "..." }` string bodies
 * - validation `{ error: { message: "Invalid request", details: [{ field, message }] } }`,
 *   where the first detail is surfaced as `field: message`
 *
 * The server already sanitizes these messages (stack traces / absolute paths
 * stripped via `sanitizeErrorMessage`), so surfacing them in the UI is safe.
 * Falls back to `fallback` when the body is absent, unparseable, or carries no
 * usable message. Never throws -- safe to call directly inside a fetch guard.
 */
export async function readFetchErrorMessage(res: Response, fallback: string): Promise<string> {
  try {
    const body = (await res.json()) as unknown;
    return errorMessageFromBody(body, fallback);
  } catch {
    // Non-JSON body (e.g. an HTML 500 page) or a read failure -> use the fallback.
  }
  return fallback;
}

/** Same extraction as {@link readFetchErrorMessage} for a body that has already been parsed. */
export function errorMessageFromBody(body: unknown, fallback: string): string {
  const err = (body as { error?: unknown } | null)?.error;
  if (typeof err === "string" && err.trim()) return err.trim();
  if (err && typeof err === "object") {
    // Validation failures (`validateBody` / `validatedJsonBody`) send the
    // generic "Invalid request" in `message` and the actual reason in
    // `details`, e.g. a reserved compatible-node prefix (#13939). Prefer the
    // first detail so the UI names the offending field instead.
    const details = (err as { details?: unknown }).details;
    const first = Array.isArray(details) ? (details[0] as unknown) : null;
    if (first && typeof first === "object") {
      const detailMessage = (first as { message?: unknown }).message;
      const field = (first as { field?: unknown }).field;
      if (typeof detailMessage === "string" && detailMessage.trim()) {
        return typeof field === "string" && field.trim()
          ? `${field.trim()}: ${detailMessage.trim()}`
          : detailMessage.trim();
      }
    }
    const message = (err as { message?: unknown }).message;
    if (typeof message === "string" && message.trim()) return message.trim();
  }
  return fallback;
}
