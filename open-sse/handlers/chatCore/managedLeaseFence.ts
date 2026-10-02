/**
 * chatCore managed-lease fence helpers (extracted from handleChatCoreInner, #3501).
 *
 * `assertManagedLeaseFenceFor` throws a 409 LEASE_* error when the exclusive-lease fence rejects
 * the connection of an upstream attempt; `managedLeaseFenceErrorCode` / `managedLeaseFenceErrorResult`
 * map such an error code onto the chatCore error result. `MUSE_OWNERSHIP_REJECTED` (a Muse session
 * whose owner/credential generation changed) is fenced the same way but needs no lease.
 */

import { assertExclusiveConnectionLeaseFence } from "@/lib/db/exclusiveConnectionLeases";
import { createErrorResult } from "../../utils/error.ts";

type ManagedLease = {
  apiKeyId: string;
  context: { leaseOwnerId: string; generation: number };
} | null;

const MUSE_OWNERSHIP_REJECTED = "MUSE_OWNERSHIP_REJECTED";

export function assertManagedLeaseFenceFor(
  managedLease: ManagedLease,
  attemptConnectionId: string | null | undefined
): void {
  if (!managedLease) return;
  if (!attemptConnectionId) {
    throw Object.assign(new Error("Managed lease connection is unavailable"), {
      code: "LEASE_CONNECTION_MISMATCH",
      status: 409,
    });
  }
  const fence = assertExclusiveConnectionLeaseFence({
    leaseOwnerId: managedLease.context.leaseOwnerId,
    generation: managedLease.context.generation,
    apiKeyId: managedLease.apiKeyId,
    connectionId: attemptConnectionId,
  });
  if (fence.kind === "VALID") return;
  const code =
    fence.kind === "REQUIRED"
      ? "LEASE_REQUIRED"
      : fence.kind === "STALE"
        ? "LEASE_FENCE_STALE"
        : fence.kind === "AUTHORIZATION_MISMATCH"
          ? "LEASE_AUTHORIZATION_MISMATCH"
          : "LEASE_CONNECTION_MISMATCH";
  throw Object.assign(new Error("Managed lease request fence rejected the dispatch"), {
    code,
    status: 409,
  });
}

export function managedLeaseFenceErrorCode(
  managedLease: ManagedLease,
  code: string | undefined
): string | undefined {
  if (code === MUSE_OWNERSHIP_REJECTED) return code;
  if (managedLease === null) return undefined;
  return code?.startsWith("LEASE_") ? code : undefined;
}

export function managedLeaseFenceErrorResult(code: string) {
  if (code === MUSE_OWNERSHIP_REJECTED) {
    return createErrorResult(
      409,
      "Muse session ownership or caller generation changed; continuation rejected.",
      null,
      code
    );
  }
  return {
    ...createErrorResult(409, "Managed lease request fence rejected the dispatch", null, code),
    errorType: "lease_error",
    errorCode: code,
  };
}
