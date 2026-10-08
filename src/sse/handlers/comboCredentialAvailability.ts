import type { ModelAvailabilityResult } from "@omniroute/open-sse/services/combo/types.ts";

/** Preserve an account timer without leaking credentials or weakening caller policy. */
export function getComboCredentialAvailability(
  credentials:
    | {
        allRateLimited?: boolean;
        waitingForCapacity?: boolean;
        retryAfter?: unknown;
      }
    | null
    | undefined,
  now = Date.now()
): ModelAvailabilityResult {
  if (!credentials || credentials.waitingForCapacity) return false;
  if (!credentials.allRateLimited) return true;

  // Auth returns an ISO deadline, not Retry-After header seconds. Missing,
  // malformed or expired hints must not fabricate a new cooldown deadline.
  const resetAt =
    typeof credentials.retryAfter === "string" ? Date.parse(credentials.retryAfter) : NaN;
  const retryAfterMs = resetAt - now;
  if (!Number.isFinite(retryAfterMs) || retryAfterMs <= 0) return false;
  return { available: false, reason: "connection_cooldown", retryAfterMs };
}
