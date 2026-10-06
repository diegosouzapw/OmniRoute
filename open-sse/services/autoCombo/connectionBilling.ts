/**
 * Pure classifier over the curated connection-billing catalog
 * (`open-sse/config/connectionBillingCatalog.ts`).
 *
 * Kept dependency-light on purpose — the same constraint `paidModelFilter.ts`
 * and `strictZeroCostFilter.ts` state in their own headers — so subscription
 * routing is unit-testable without seeding the DB or the virtual factory. No
 * provider name appears in this file: a connection is classified purely from
 * the catalog plus the two facts the caller already has (`provider`,
 * `authType`), so curating a new provider needs no code change here.
 */
import {
  CONNECTION_BILLING_CATALOG,
  type ConnectionBillingClass,
  type ConnectionBillingEntry,
  type ConnectionOverageBehavior,
} from "@omniroute/open-sse/config/connectionBillingCatalog.ts";
import { SYNTHETIC_NOAUTH_CONNECTION_ID } from "./resilienceCandidateFilter";

/** The minimum a caller must know about a connection to classify it. */
export interface BillableConnection {
  provider: string;
  /** `provider_connections.auth_type` — `oauth` / `apikey` / `cookie` / … */
  authType?: string | null;
  /** Connection id; the synthetic no-auth sentinel classifies as `keyless`. */
  connectionId?: string | null;
}

export interface ConnectionBillingVerdict {
  billing: ConnectionBillingClass;
  overage: ConnectionOverageBehavior;
  reason: string;
}

const UNKNOWN_VERDICT: ConnectionBillingVerdict = {
  billing: "unknown",
  overage: "unknown",
  reason: "No curated billing entry for this provider/authType — assumed metered.",
};

const KEYLESS_VERDICT: ConnectionBillingVerdict = {
  billing: "keyless",
  overage: "hard-stop",
  reason:
    "Synthetic no-auth connection: no credential exists, so no request against it can be billed.",
};

/**
 * Classify one connection.
 *
 * Resolution order, first match wins:
 *   1. the synthetic no-auth sentinel → `keyless` (no credential can be billed);
 *   2. a catalog entry matching BOTH provider and `authType`;
 *   3. a provider-wide catalog entry (no `authType` declared);
 *   4. otherwise `unknown`.
 *
 * `unknown` is never treated as free by any caller — `isPlanIncluded()` below
 * returns false for it, so an uncurated provider stays outside the
 * subscription rung until someone curates it deliberately.
 */
export function classifyConnectionBilling(
  connection: BillableConnection,
  catalog: readonly ConnectionBillingEntry[] = CONNECTION_BILLING_CATALOG
): ConnectionBillingVerdict {
  if (connection.connectionId === SYNTHETIC_NOAUTH_CONNECTION_ID) return KEYLESS_VERDICT;

  const provider = connection.provider;
  if (!provider) return UNKNOWN_VERDICT;

  const providerEntries = catalog.filter((entry) => entry.provider === provider);
  if (providerEntries.length === 0) return UNKNOWN_VERDICT;

  const authType = typeof connection.authType === "string" ? connection.authType : null;
  const authMatch = authType
    ? providerEntries.find((entry) => entry.authType === authType)
    : undefined;
  const entry = authMatch ?? providerEntries.find((entry) => entry.authType === undefined);
  if (!entry) return UNKNOWN_VERDICT;

  return { billing: entry.billing, overage: entry.overage, reason: entry.reason };
}

/**
 * True when serving a request through this connection consumes an allowance
 * the operator already pays for, rather than adding incremental spend.
 * `keyless` qualifies: it costs nothing by construction.
 */
export function isPlanIncluded(verdict: ConnectionBillingVerdict): boolean {
  return verdict.billing === "subscription" || verdict.billing === "keyless";
}

/**
 * True when exhausting this connection's allowance cannot start costing money.
 * The strict `auto/subscription` grouping admits nothing else: an operator who
 * asked never to spend extra must not be surprised by a provider that meters
 * past the plan, nor by one whose terms simply are not established.
 */
export function isOverageSafe(verdict: ConnectionBillingVerdict): boolean {
  return verdict.overage === "hard-stop";
}
