import { randomUUID } from "crypto";

import { resolveAntigravityModelId } from "@omniroute/open-sse/config/antigravityModelAliases.ts";
import { resolveModelAlias } from "@/shared/constants/modelSpecs";

/**
 * Process-local Antigravity account lease (re-land of @Ardem2025's #10011).
 *
 * The account selected for a request is reserved for the whole streaming
 * lifecycle of that request, so a concurrent retry — or the credential handoff
 * inside `getProviderCredentialsWithQuotaPreflight` — cannot re-pick an account
 * that is already committed to an in-flight upstream stream.
 *
 * Scope is (connection, canonical upstream model), NOT the whole account: an
 * Antigravity account can serve two different upstream models at once, and
 * fencing the whole account would needlessly serialize unrelated traffic. Two
 * catalog ids that resolve to the SAME callable upstream id (e.g. the
 * `gemini-3.7-flash-{high,medium,low}` tiers, all `gemini-3.7-flash-tiered`)
 * therefore share one lease.
 *
 * This is a concurrency reservation only. It is deliberately orthogonal to
 * quota accounting (`selectAntigravityQuotaWindowNames` /
 * `antigravityQuotaFamily.ts`) and never reads or writes quota state.
 */
export type AntigravityLease = {
  id: string;
  connectionId: string;
  exactModel: string;
  acquiredAtMs: number;
  /**
   * Bounded `Retry-After` hint for a POOL_BUSY response — NOT an expiry. A lease
   * is released by its response lifecycle, never by elapsed time, so nothing in
   * this module ever compares this against the clock to free a lease.
   */
  retryHintAtMs: number;
};

export type LeaseAcquireResult =
  { kind: "acquired"; lease: AntigravityLease } | { kind: "busy"; retryHintAtMs: number };

export type LeaseAvailability = { available: true } | { available: false; retryHintAtMs: number };

/** Bounded POOL_BUSY `Retry-After` hint (ms). */
export const ANTIGRAVITY_LEASE_RETRY_HINT_MS = 30_000;

const leasesByKey = new Map<string, AntigravityLease>();
const keysByLeaseId = new Map<string, string>();

/**
 * Collapse a requested model id onto the callable upstream id, so every catalog
 * alias of one upstream model contends for the same lease.
 */
export function canonicalizeAntigravityExactModel(model: string | null | undefined): string {
  const requested = typeof model === "string" ? model.trim().toLowerCase() : "";
  if (!requested) return "";
  const unprefixed = requested.replace(/^(?:antigravity|agy)\//, "");
  // The Antigravity alias table is authoritative when it knows the requested id
  // verbatim: `gemini-3.1-pro-high` is callable only as `gemini-pro-agent`, and the
  // generic catalog alias would otherwise collapse it onto plain `gemini-3.1-pro`.
  const upstream = resolveAntigravityModelId(unprefixed);
  if (upstream !== unprefixed) return upstream;
  const canonical = resolveModelAlias(unprefixed);
  return resolveAntigravityModelId(canonical) || canonical;
}

function leaseKey(connectionId: string, exactModel: string): string {
  return `antigravity::${connectionId}::${exactModel}`;
}

export function getAntigravityLeaseAvailability({
  connectionId,
  requestedModel,
}: {
  connectionId: string;
  requestedModel: string | null | undefined;
}): LeaseAvailability {
  const held = leasesByKey.get(
    leaseKey(connectionId, canonicalizeAntigravityExactModel(requestedModel))
  );
  return held ? { available: false, retryHintAtMs: held.retryHintAtMs } : { available: true };
}

export function tryAcquireAntigravityLease({
  connectionId,
  requestedModel,
  requestId,
  now = Date.now(),
}: {
  connectionId: string;
  requestedModel: string | null | undefined;
  requestId?: string | null;
  now?: number;
}): LeaseAcquireResult {
  const exactModel = canonicalizeAntigravityExactModel(requestedModel);
  const key = leaseKey(connectionId, exactModel);
  const held = leasesByKey.get(key);
  if (held) return { kind: "busy", retryHintAtMs: held.retryHintAtMs };

  const lease: AntigravityLease = {
    id: `${requestId || "request"}:${randomUUID()}`,
    connectionId,
    exactModel,
    acquiredAtMs: now,
    retryHintAtMs: now + ANTIGRAVITY_LEASE_RETRY_HINT_MS,
  };
  leasesByKey.set(key, lease);
  keysByLeaseId.set(lease.id, key);
  return { kind: "acquired", lease };
}

/**
 * Release by lease id. The id fences a late `finally`: a stale id cannot free a
 * newer lease that has since claimed the same (connection, model) slot.
 */
export function releaseAntigravityLease(leaseId: string | null | undefined): boolean {
  if (!leaseId) return false;
  const key = keysByLeaseId.get(leaseId);
  if (key === undefined) return false;
  keysByLeaseId.delete(leaseId);
  if (leasesByKey.get(key)?.id === leaseId) {
    leasesByKey.delete(key);
    return true;
  }
  return false;
}

export function __resetAntigravityRoutingStateForTests(): void {
  leasesByKey.clear();
  keysByLeaseId.clear();
}
