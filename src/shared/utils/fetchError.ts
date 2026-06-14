/**
 * Extract a human-readable message from a failed `fetch` Response body.
 *
 * Handles both response shapes OmniRoute routes emit:
 * - OpenAI-style `{ error: { message, type, code } }` (from `buildErrorBody`)
 * - legacy `{ error: "..." }` string bodies
 *
 * The server already sanitizes these messages (stack traces / absolute paths
 * stripped via `sanitizeErrorMessage`), so surfacing them in the UI is safe.
 * Falls back to `fallback` when the body is absent, unparseable, or carries no
 * usable message. Never throws -- safe to call directly inside a fetch guard.
 */
export async function readFetchErrorMessage(res: Response, fallback: string): Promise<string> {
  try {
    const body = (await res.json()) as unknown;
    const err = (body as { error?: unknown } | null)?.error;
    if (typeof err === "string" && err.trim()) return err.trim();
    if (err && typeof err === "object") {
      const message = (err as { message?: unknown }).message;
      if (typeof message === "string" && message.trim()) return message.trim();
    }
  } catch {
    // Non-JSON body (e.g. an HTML 500 page) or a read failure -> use the fallback.
  }
  return fallback;
}
