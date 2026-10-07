import {
  acquireExclusiveConnectionLease,
  getActiveExclusiveConnectionLease,
  getExclusiveLeaseOccupancy,
  hashLeaseOwnerId,
  invalidateExclusiveConnectionLease,
  transitionExclusiveConnectionLease,
  type ExclusiveConnectionLease,
  type ExclusiveLeaseEndReason,
} from "@/lib/db/exclusiveConnectionLeases";
import type { ProviderConnectionView } from "@/lib/db/providers/lazyConnectionView";

import type { ManagedLeaseRequestContext } from "./leaseContext";

export interface CredentialLeaseSelectionContext {
  apiKeyId: string;
  context: ManagedLeaseRequestContext;
  mode: "acquire" | "request";
}

export interface LeaseSelectionOptions {
  forcedConnectionId?: string | null;
  lease?: CredentialLeaseSelectionContext;
}

export type LeaseCandidatePolicy = {
  connections: ProviderConnectionView[];
  activeLease: ExclusiveConnectionLease | null;
  retryAfter: string | null;
  error?: "leaseConnectionMismatch" | "leaseFenceStale" | "leaseRequired";
};

export async function applyExclusiveConnectionLeasePolicy(
  connections: ProviderConnectionView[],
  options: LeaseSelectionOptions
): Promise<LeaseCandidatePolicy> {
  const occupancy = getExclusiveLeaseOccupancy(connections.map((connection) => connection.id));
  if (!options.lease) {
    return {
      connections: connections.filter((connection) => !occupancy.has(connection.id)),
      activeLease: null,
      retryAfter: null,
    };
  }

  const { lease } = options;
  const activeLease = getActiveExclusiveConnectionLease(lease.context.leaseOwnerId);
  if (lease.mode === "request" && !activeLease) {
    return { connections: [], activeLease: null, retryAfter: null, error: "leaseRequired" };
  }
  if (lease.mode === "request" && activeLease?.generation !== lease.context.generation) {
    return { connections: [], activeLease, retryAfter: null, error: "leaseFenceStale" };
  }
  if (activeLease && activeLease.apiKeyId !== lease.apiKeyId) {
    return { connections: [], activeLease, retryAfter: null, error: "leaseFenceStale" };
  }
  const activeBinding = activeLease
    ? connections.find((connection) => connection.id === activeLease.connectionId)
    : undefined;
  if (!activeBinding && lease.mode === "request" && activeLease && options.forcedConnectionId) {
    return { connections: [], activeLease, retryAfter: null, error: "leaseConnectionMismatch" };
  }
  const ownerHash = hashLeaseOwnerId(lease.context.leaseOwnerId);
  const free = connections.filter((connection) =>
    occupancy.get(connection.id)?.leaseOwnerHash !== ownerHash && occupancy.has(connection.id)
      ? false
      : connection.id !== activeBinding?.id
  );
  return {
    connections: activeBinding ? [activeBinding, ...free] : free,
    activeLease,
    retryAfter:
      [...occupancy.values()]
        .filter((row) => row.leaseOwnerHash !== ownerHash)
        .map((row) => row.expiresAt)
        .sort()[0] ?? null,
  };
}

export function mutateExclusiveConnectionLease(
  connection: ProviderConnectionView,
  activeLease: ExclusiveConnectionLease | null,
  lease: CredentialLeaseSelectionContext,
  reason: ExclusiveLeaseEndReason = "CONNECTION_INELIGIBLE"
) {
  const result = activeLease
    ? transitionExclusiveConnectionLease({
        leaseOwnerId: lease.context.leaseOwnerId,
        generation: lease.mode === "acquire" ? activeLease.generation : lease.context.generation,
        apiKeyId: lease.apiKeyId,
        provider: connection.provider,
        connectionId: connection.id,
        reason,
      })
    : acquireExclusiveConnectionLease({
        leaseOwnerId: lease.context.leaseOwnerId,
        apiKeyId: lease.apiKeyId,
        provider: connection.provider,
        connectionId: connection.id,
      });
  if (result.kind === "CONNECTION_BUSY") {
    return { kind: "LOST" as const, retryAfter: result.retryAfter };
  }
  if (result.kind === "STALE" || result.kind === "OWNER_ALREADY_ACTIVE") {
    return { kind: "STALE" as const };
  }
  return { kind: "CLAIMED" as const, lease: result.lease };
}

export function invalidateManagedConnectionLease(
  lease: CredentialLeaseSelectionContext | undefined,
  reason: ExclusiveLeaseEndReason
): void {
  if (lease?.mode !== "request") return;
  invalidateExclusiveConnectionLease({
    leaseOwnerId: lease.context.leaseOwnerId,
    generation: lease.context.generation,
    apiKeyId: lease.apiKeyId,
    reason,
  });
}
