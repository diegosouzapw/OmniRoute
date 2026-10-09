import type { CredentialLeaseSelectionContext } from "./exclusiveConnectionLeasePolicy";

export interface CredentialSelectionOptions {
  /** Exclude credential-specific transports that cannot serve caller tools. */
  requireToolCalling?: boolean;
  allowSuppressedConnections?: boolean;
  allowRateLimitedConnections?: boolean;
  bypassQuotaPolicy?: boolean;
  forcedConnectionId?: string | null;
  /** API-key-scoped ordered preference. Only ranks connections that survived eligibility gates. */
  preferredConnectionIds?: string[] | null;
  excludeConnectionIds?: string[] | null;
  sessionKey?: string | null;
  sessionAffinityTtlMs?: number | null;
  reserveOAuthSession?: boolean;
  lease?: CredentialLeaseSelectionContext;
  materializeCredentials?: boolean;
  deferLeaseClaim?: boolean;
  /** Internal: a same-call UNIQUE retry already holds the provider/owner selection lock. */
  _leaseRetryWithLockHeld?: boolean;
  /** Internal: freeze the original policy-valid candidate set across lease race/preflight retry. */
  _leaseCandidateIds?: string[];
  /** Antigravity account lease (#10011): only the final chat dispatch opts in. */
  reserveAntigravityLease?: boolean;
  routingRequestId?: string | null;
}
