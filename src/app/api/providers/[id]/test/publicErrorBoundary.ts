import { projectProviderValidationResultForPublicResponse } from "@/lib/providers/validation/transport";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/errorSanitization.ts";
import { makeDiagnosis } from "./codexAppServerHealth";
import { classifyAmbiguousOrAuthError, type ClassifyFailureArgs } from "./mistralAmbiguousAuth";

export function toSafeMessage(value: unknown, fallback = "Unknown error"): string {
  const safeMessage = sanitizeErrorMessage(value).trim();
  return safeMessage || fallback;
}

/**
 * A provider/account that the upstream has deactivated (vs. a revoked/expired token).
 * #1444: a Codex account can have a perfectly healthy OAuth refresh while its ChatGPT
 * account is deactivated, in which case the API returns 401 — mislabeling that as
 * "Token invalid or revoked" hides the real cause. Mirrors the deactivation phrases the
 * account-fallback classifier already trusts.
 */
export function isAccountDeactivatedMessage(text: string): boolean {
  const normalized = (text || "").toLowerCase();
  return (
    normalized.includes("account_deactivated") ||
    (normalized.includes("deactivat") && normalized.includes("account"))
  );
}

export function classifyFailure({
  error,
  statusCode = null,
  refreshFailed = false,
  unsupported = false,
  provider,
}: ClassifyFailureArgs) {
  const message = toSafeMessage(error, "Connection test failed");
  const normalized = message.toLowerCase();
  const numericStatus = Number.isFinite(statusCode) ? Number(statusCode) : null;

  if (unsupported) {
    return makeDiagnosis("unsupported", "validation", message, "unsupported");
  }

  if (refreshFailed || normalized.includes("refresh failed")) {
    return makeDiagnosis("token_refresh_failed", "oauth", message, "refresh_failed");
  }

  // #1444: a deactivated account is distinct from a revoked/expired token — surface it
  // as account_deactivated (which the dashboard renders as "Account Deactivated") before
  // the generic 401/403 branch below would mark it "upstream_auth_error".
  if (isAccountDeactivatedMessage(normalized)) {
    return makeDiagnosis("account_deactivated", "account", message, "account_deactivated");
  }

  if (numericStatus === 401 || numericStatus === 403) {
    return classifyAmbiguousOrAuthError(provider, normalized, message, numericStatus);
  }

  if (numericStatus === 429) {
    return makeDiagnosis("upstream_rate_limited", "upstream", message, "429");
  }

  if (numericStatus && numericStatus >= 500) {
    return makeDiagnosis("upstream_unavailable", "upstream", message, String(numericStatus));
  }

  if (normalized.includes("token expired") || normalized.includes("expired")) {
    return makeDiagnosis("token_expired", "oauth", message, "token_expired");
  }

  if (
    normalized.includes("invalid api key") ||
    normalized.includes("token invalid") ||
    normalized.includes("revoked") ||
    normalized.includes("access denied") ||
    normalized.includes("unauthorized") ||
    normalized.includes("forbidden")
  ) {
    return makeDiagnosis(
      "upstream_auth_error",
      "upstream",
      message,
      numericStatus ? String(numericStatus) : "auth_failed"
    );
  }

  if (
    normalized.includes("rate limit") ||
    normalized.includes("quota") ||
    normalized.includes("too many requests")
  ) {
    return makeDiagnosis(
      "upstream_rate_limited",
      "upstream",
      message,
      numericStatus ? String(numericStatus) : "rate_limited"
    );
  }

  if (
    normalized.includes("fetch failed") ||
    normalized.includes("network") ||
    normalized.includes("timeout") ||
    normalized.includes("timed out") ||
    normalized.includes("econn") ||
    normalized.includes("enotfound") ||
    normalized.includes("socket")
  ) {
    return makeDiagnosis("network_error", "upstream", message, "network_error");
  }

  return makeDiagnosis(
    "upstream_error",
    "upstream",
    message,
    numericStatus ? String(numericStatus) : "upstream_error"
  );
}

/** Allowlist the CLI health fields safe to expose outside the local runtime boundary. */
export function projectProviderRuntimeForPublicResponse(
  runtime: unknown
): Record<string, unknown> | null {
  if (!runtime || typeof runtime !== "object" || Array.isArray(runtime)) return null;
  const record = runtime as Record<string, unknown>;
  const projected: Record<string, unknown> = {};

  for (const field of ["installed", "runnable", "requiresBinary"] as const) {
    if (typeof record[field] === "boolean") projected[field] = record[field];
  }
  for (const field of ["reason", "runtimeMode", "version", "command"] as const) {
    if (typeof record[field] !== "string") continue;
    const safeValue = sanitizeErrorMessage(record[field]).trim();
    if (safeValue) projected[field] = safeValue.slice(0, 512);
  }

  return projected;
}

/** Sanitize every connection-test result before health writes, logs, and HTTP responses. */
export function projectConnectionTestResultForPublicResponse<
  T extends { error?: unknown; warning?: unknown; diagnosis?: unknown },
>(result: T) {
  const projected = projectProviderValidationResultForPublicResponse(result);
  if (!projected.diagnosis || typeof projected.diagnosis !== "object") return projected;

  const diagnosis = projected.diagnosis as Record<string, unknown>;
  return {
    ...projected,
    diagnosis: {
      ...diagnosis,
      message:
        diagnosis.message === null || diagnosis.message === undefined
          ? null
          : toSafeMessage(diagnosis.message, "Connection test failed"),
    },
  };
}
