import { sanitizeErrorMessage } from "../../utils/error.ts";

export interface SearchProviderFailure {
  success: false;
  status: number;
  error: string;
}

/** Named 502/504 for /v1/search — provider id + sanitized cause, no hostnames/URLs. */
export function formatSearchProviderFailure(
  providerId: string,
  err: unknown,
  isTimeout: boolean
): SearchProviderFailure {
  const rec = err && typeof err === "object" ? (err as Record<string, unknown>) : {};
  const cause = rec.cause && typeof rec.cause === "object" ? (rec.cause as Record<string, unknown>) : {};
  const code =
    typeof cause.code === "string" && /^[A-Z][A-Z0-9_]{1,39}$/.test(cause.code) ? cause.code : "";
  const msg =
    sanitizeErrorMessage(typeof rec.message === "string" ? rec.message : "fetch failed") || "fetch failed";
  return {
    success: false,
    status: isTimeout ? 504 : 502,
    error: `Search provider ${providerId} ${isTimeout ? "timeout" : "error"}: ${code ? `${msg} (cause: ${code})` : msg}`,
  };
}
