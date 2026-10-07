import {
  canonicalizeAntigravityExactModel,
  releaseAntigravityLease,
  tryAcquireAntigravityLease,
  type AntigravityLease,
} from "./antigravityRoutingState";

export type { AntigravityLease };

/** Returned instead of credentials when the selected account is already leased. */
export type AntigravityLeaseUnavailable = {
  leaseUnavailable: true;
  selectedConnectionId: string;
  retryHintAtMs: number;
};

type CredentialsWithRouting = { routing?: { leaseId?: string } };

/**
 * Selection-side glue for the Antigravity account lease. Kept out of auth.ts so the
 * selector only calls two functions and the lease stays a self-contained concern.
 */
export function reserveAntigravityLeaseForSelection(
  provider: string,
  connection: { id: string } | null | undefined,
  requestedModel: string | null | undefined,
  options: { reserveAntigravityLease?: boolean; routingRequestId?: string | null }
): { busy?: AntigravityLeaseUnavailable; lease?: AntigravityLease } {
  if (provider !== "antigravity" || !connection || options.reserveAntigravityLease !== true)
    return {};
  const acquired = tryAcquireAntigravityLease({
    connectionId: connection.id,
    requestedModel,
    requestId: options.routingRequestId,
  });
  if (acquired.kind === "busy") {
    return {
      busy: {
        leaseUnavailable: true,
        selectedConnectionId: connection.id,
        retryHintAtMs: acquired.retryHintAtMs,
      },
    };
  }
  return { lease: acquired.lease };
}

/** The `routing` descriptor carried on materialized credentials, or nothing. */
export function buildAntigravityRoutingFields(
  lease: AntigravityLease | undefined,
  connectionId: string,
  requestedModel: string | null | undefined
) {
  if (!lease) return {};
  return {
    routing: {
      provider: "antigravity" as const,
      connectionId,
      exactModel: canonicalizeAntigravityExactModel(requestedModel),
      leaseId: lease.id,
    },
  };
}

/**
 * Hand a routing lease back. Every selector path that abandons the connection it just
 * picked must call this — otherwise the account stays fenced for the rest of the process.
 */
export function releaseRoutingLeaseFromCredentials(credentials: unknown): void {
  releaseAntigravityLease((credentials as CredentialsWithRouting)?.routing?.leaseId);
}
