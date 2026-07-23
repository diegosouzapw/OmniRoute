/**
 * Redact credentials from a subscription URL before it is returned to the
 * client (dashboard). The URL is stored intact in the DB so the server-side
 * fetch can still authenticate, but the operator UI must never receive
 * `user:pass@host`.
 */
export function redactSubscriptionUrl(url: string): string {
  if (!url) return url;
  try {
    const u = new URL(url);
    if (!u.username && !u.password) return url;
    u.username = "";
    u.password = "";
    return u.toString();
  } catch {
    // Not a parseable URL — return unchanged; the caller validates upstream.
    return url;
  }
}
