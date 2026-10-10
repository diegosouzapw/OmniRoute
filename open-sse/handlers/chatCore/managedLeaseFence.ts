import { assertExclusiveConnectionLeaseFence } from "@/lib/db/exclusiveConnectionLeases";

export interface ManagedLeaseFenceInput {
  managedLease: { context: { leaseOwnerId?: string; generation?: string | number }; apiKeyId?: string } | null;
  createErrorResult: (status: number, message: string, body: unknown, code: string) => Record<string, unknown>;
}

export function createManagedLeaseFence(input: ManagedLeaseFenceInput) {
  const { managedLease, createErrorResult } = input;
  const assertManagedLeaseFence = (attemptConnectionId: string | null | undefined) => {
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
  };
  const getManagedLeaseFenceErrorCode = (code: string | undefined): string | undefined => {
    if (managedLease === null) return undefined;
    return code?.startsWith("LEASE_") ? code : undefined;
  };
  const managedLeaseFenceErrorResult = (code: string) => ({
    ...createErrorResult(409, "Managed lease request fence rejected the dispatch", null, code),
    errorType: "lease_error",
    errorCode: code,
  });
  return { assertManagedLeaseFence, getManagedLeaseFenceErrorCode, managedLeaseFenceErrorResult };
}
