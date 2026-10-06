import { LEASE_OWNER_PATTERN } from "@/lib/db/exclusiveConnectionLeases";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export const LEASE_EXCLUSIVE_SCOPE = "lease:exclusive",
  LEASE_OWNER_HEADER = "X-OmniRoute-Lease-Owner",
  LEASE_GENERATION_HEADER = "X-OmniRoute-Lease-Generation";

export type ManagedLeaseRequestContext = { leaseOwnerId: string; generation: number };
export type ManagedLeaseDispatchContext = {
  apiKeyId: string;
  context: ManagedLeaseRequestContext;
};
export const credentialLease = (lease: ManagedLeaseDispatchContext) => ({
  ...lease,
  mode: "request" as const,
});

export class LeaseContextError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string
  ) {
    super(message);
  }
}

type LeaseKeyMetadata = {
  scopes?: readonly string[] | null;
  allowedConnections?: readonly string[] | null;
};

export function isExclusiveLeaseManagedKey(metadata: LeaseKeyMetadata | null | undefined): boolean {
  return Array.isArray(metadata?.scopes) && metadata.scopes.includes(LEASE_EXCLUSIVE_SCOPE);
}

export function validateExclusiveLeaseKeyConfiguration(
  metadata: LeaseKeyMetadata | null | undefined
): void {
  if (!isExclusiveLeaseManagedKey(metadata)) return;
  if (!metadata?.allowedConnections?.length)
    throw new LeaseContextError(
      403,
      "LEASE_KEY_CONFIGURATION_INVALID",
      "Exclusive lease keys require explicit allowed connections"
    );
}

export function parseLeaseOwnerHeader(headers: Headers): string {
  const leaseOwnerId = headers.get(LEASE_OWNER_HEADER)?.trim() ?? "";
  if (!leaseOwnerId)
    throw new LeaseContextError(400, "LEASE_CONTEXT_REQUIRED", "Explicit lease owner required");
  if (!LEASE_OWNER_PATTERN.test(leaseOwnerId))
    throw new LeaseContextError(400, "LEASE_CONTEXT_INVALID", "Malformed lease owner");
  return leaseOwnerId;
}

export function parseManagedLeaseRequestContext(headers: Headers): ManagedLeaseRequestContext {
  const leaseOwnerId = parseLeaseOwnerHeader(headers);
  const rawGeneration = headers.get(LEASE_GENERATION_HEADER)?.trim() ?? "";
  if (!/^[1-9]\d*$/.test(rawGeneration))
    throw new LeaseContextError(400, "LEASE_CONTEXT_INVALID", "Positive lease generation required");
  const generation = Number(rawGeneration);
  if (!Number.isSafeInteger(generation))
    throw new LeaseContextError(
      400,
      "LEASE_CONTEXT_INVALID",
      "The lease generation header is invalid"
    );
  return { leaseOwnerId, generation };
}

export function buildManagedLeaseErrorResponse(error: LeaseContextError): Response {
  return new Response(
    JSON.stringify(
      buildErrorBody(error.status, error.message, undefined, {
        type: "lease_error",
        code: error.code,
      })
    ),
    { status: error.status, headers: { "Content-Type": "application/json" } }
  );
}

type ManagedLeaseSelectionFailure = {
  eligibleCount?: number;
  freeCount?: number;
  leaseConnectionMismatch?: boolean;
  leaseFenceStale?: boolean;
  leaseRequired?: boolean;
  retryAfter?: string | null;
  waitingForCapacity?: boolean;
  allRateLimited?: boolean;
};

export function buildManagedLeaseSelectionErrorResponse(
  selection: ManagedLeaseSelectionFailure
): Response | null {
  const code = selection.leaseRequired
    ? "LEASE_REQUIRED"
    : selection.leaseFenceStale
      ? "LEASE_FENCE_STALE"
      : selection.leaseConnectionMismatch
        ? "LEASE_CONNECTION_MISMATCH"
        : null;
  if (code)
    return buildManagedLeaseErrorResponse(
      new LeaseContextError(409, code, code.replaceAll("_", " "))
    );
  if (!selection.waitingForCapacity) return null;
  const expiryMs = Date.parse(selection.retryAfter ?? "");
  const retryAfterSeconds = Number.isFinite(expiryMs)
    ? Math.min(3600, Math.max(1, Math.ceil((expiryMs - Date.now()) / 1000)))
    : 1;
  return new Response(
    JSON.stringify({
      state: "WAITING_FOR_CAPACITY",
      error: {
        type: "lease_error",
        code: "LEASE_CAPACITY_UNAVAILABLE",
        message: "Exclusive managed session capacity is temporarily unavailable",
      },
      reason: "NO_FREE_ELIGIBLE_CONNECTION",
      retryAfter: retryAfterSeconds,
      eligibleCount: Math.max(0, selection.eligibleCount ?? 0),
      freeCount: Math.max(0, selection.freeCount ?? 0),
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfterSeconds),
      },
    }
  );
}
