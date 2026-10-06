/**
 * Resolve caller-provided X-Correlation-Id for preservation (#11739).
 * Returns sanitized value when present and within bounds (1-256 chars), otherwise null.
 * Strips CRLF to prevent header injection, trims whitespace.
 */
export function resolveIncomingCorrelationId(
  headerValue: string | null | undefined
): string | null {
  const raw = (headerValue ?? "").trim().replace(/[\r\n]/g, "");
  if (raw.length === 0 || raw.length > 256) return null;
  return raw;
}
