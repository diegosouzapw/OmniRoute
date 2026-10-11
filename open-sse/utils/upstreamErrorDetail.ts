import { sanitizeErrorMessage } from "./error.ts";

export const MAX_UPSTREAM_ERROR_MESSAGE_LENGTH = 512;

export function withUpstreamErrorDetail(message: string, upstreamDetails: unknown): string {
  const base = sanitizeErrorMessage(message) || "Upstream stream failed before completion.";
  const parts: string[] = [];
  if (upstreamDetails && typeof upstreamDetails === "object" && !Array.isArray(upstreamDetails)) {
    const details = upstreamDetails as Record<string, unknown>;
    const nested =
      details.error && typeof details.error === "object" && !Array.isArray(details.error)
        ? (details.error as Record<string, unknown>)
        : null;
    for (const candidate of [details.detail, nested?.message, details.message]) {
      if (typeof candidate !== "string") continue;
      const safe = sanitizeErrorMessage(candidate);
      if (!safe || base.includes(safe) || parts.includes(safe)) continue;
      parts.push(safe);
    }
  }
  const full = parts.length ? `${base} (${parts.join("; ")})` : base;
  return full.length > MAX_UPSTREAM_ERROR_MESSAGE_LENGTH
    ? `${full.slice(0, MAX_UPSTREAM_ERROR_MESSAGE_LENGTH - 3)}...`
    : full;
}
