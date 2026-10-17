/**
 * Connection-state terms of the p2c account score (moved out of src/sse/services/auth.ts so
 * the selector stays under its file-size ceiling). Lower is better.
 */
import { toNumber } from "@/shared/utils/numeric";
import type { ProviderConnectionView } from "@/lib/db/providers/lazyConnectionView";

function normalizeStatus(value: string | null): string {
  return (value || "").trim().toLowerCase();
}

export function getConnectionErrorPenalty(connection: ProviderConnectionView): number {
  const errorType = normalizeStatus(connection.lastErrorType);
  const errorSource = normalizeStatus(connection.lastErrorSource);
  const numericErrorCode = toNumber(connection.errorCode, 0);

  let penalty = 0;
  if (connection.lastError) penalty += 6;

  if (
    errorType === "rate_limited" ||
    errorType === "quota_exhausted" ||
    errorType === "quota" ||
    numericErrorCode === 429
  ) {
    penalty += 24;
  } else if (numericErrorCode === 401 || numericErrorCode === 403 || errorSource === "oauth") {
    penalty += 18;
  } else if (numericErrorCode >= 500) {
    penalty += 10;
  }

  return penalty;
}
export function getConnectionRecencyPenalty(connection: ProviderConnectionView): number {
  if (!connection.lastUsedAt) return 0;
  const ageMs = Date.now() - new Date(connection.lastUsedAt).getTime();
  if (!Number.isFinite(ageMs)) return 0;
  if (ageMs < 15_000) return 3;
  if (ageMs < 60_000) return 2;
  if (ageMs < 5 * 60_000) return 1;
  return 0;
}
