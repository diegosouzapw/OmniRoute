/**
 * quota/quotaKey.ts — Resolve which connections and providers an API key may
 * use, based on its `allowedQuotas` pool-ID list.
 *
 * Also exports `reconcilePoolExclusivity` (Phase C3) which keeps each API
 * key's `allowedQuotas` in sync when a pool's allocations are saved with the
 * `exclusive` flag.
 */

import { getPool, getPoolsByGroup } from "@/lib/db/quotaPools";
import { getProviderConnectionById } from "@/lib/db/providers";
import { getApiKeyById, updateApiKeyPermissions } from "@/lib/db/apiKeys";
import { quotaGroupSlug } from "./quotaModelNaming";
import { getGroupName } from "@/lib/db/quotaGroups";

// ---------------------------------------------------------------------------
// Public interface
// ---------------------------------------------------------------------------

export interface QuotaKeyScope {
  /** Provider-connection IDs the key is allowed to use (the pools' connections). */
  connectionIds: string[];
  /** Provider slugs of those connections (deduplicated). */
  providers: string[];
  /**
   * Alphanumeric GROUP slugs the key is scoped to, deduplicated.
   * Each entry is quotaGroupSlug(groupName) — one per distinct group the
   * key's allowed pools belong to.
   *
   * NOTE: the field is still called `poolSlugs` to minimise churn across
   * callers; it now holds group slugs (not individual pool-name slugs).
   * Updated in Task B5 (real-group access).
   */
  poolSlugs: string[];
}

/**
 * Constrain an existing connection allow-list to the connections belonging to a
 * quota key's pool scope.
 *
 * Semantics mirror `intersectAllowedConnectionIds` in chat.ts:
 *  - Empty `quotaConnectionIds` (non-quota key)  → return `existing` unchanged.
 *  - Empty / null `existing` (no prior constraint) → return `quotaConnectionIds`.
 *  - Both non-empty                               → intersection.
 *  - Disjoint sets                               → empty array (no eligible connection).
 *
 * This is a pure, synchronous function — easy to unit-test without DB setup.
 */
export function constrainConnectionsToQuota(
  existing: string[],
  quotaConnectionIds: string[]
): string[] {
  if (quotaConnectionIds.length === 0) return existing;
  if (existing.length === 0) return quotaConnectionIds;
  return existing.filter((id) => quotaConnectionIds.includes(id));
}

/**
 * Given the `allowedQuotas` field of an API key (array of quota-pool IDs),
 * returns the set of connection IDs and provider slugs that the key is
 * permitted to use.
 *
 * Task B5 — Real-group access:
 * For each allowed pool, the scope expands to ALL pools in the same group:
 *   pool → pool.groupId → getPoolsByGroup(groupId) → aggregate their
 *   connections and providers.
 *
 * The returned `poolSlugs` field holds GROUP slugs (one per distinct group),
 * not individual pool-name slugs. This aligns with the `qtSd/<groupSlug>/...`
 * naming used by filterModelsToQuotaPools and the combo catalog.
 *
 * A group slug is only included when the group has at least one valid
 * connection across any of its pools (same "anyValidConnection" gate,
 * evaluated group-wide).
 *
 * Behaviour:
 * - Empty / falsy input → `{ connectionIds: [], providers: [], poolSlugs: [] }`.
 * - Pool IDs that do not resolve (missing pool, missing connection) are
 *   silently skipped — never throws.
 * - All arrays are deduplicated; order is not guaranteed.
 */
export async function resolveQuotaKeyScope(
  allowedQuotas: string[] | null | undefined
): Promise<QuotaKeyScope> {
  if (!allowedQuotas || allowedQuotas.length === 0) {
    return { connectionIds: [], providers: [], poolSlugs: [] };
  }

  const connectionIdSet = new Set<string>();
  const providerSet = new Set<string>();
  const groupSlugSet = new Set<string>();

  // Collect the distinct group IDs reachable from the key's allowed pools.
  // Deduplicate: a key in 2 pools of the same group expands once.
  const groupIdSet = new Set<string>();
  for (const poolId of allowedQuotas) {
    const pool = getPool(poolId);
    if (!pool) continue;
    groupIdSet.add(pool.groupId);
  }

  // For each distinct group, aggregate ALL pools in that group.
  for (const groupId of groupIdSet) {
    const groupPools = getPoolsByGroup(groupId);
    // Group-level "anyValidConnection" gate: include the group slug only when
    // at least one pool in the group has a usable connection.
    let groupHasValidConnection = false;

    for (const groupPool of groupPools) {
      // D2: iterate ALL member connections (defensive fallback for un-backfilled rows).
      const connIds: string[] =
        Array.isArray(groupPool.connectionIds) && groupPool.connectionIds.length > 0
          ? groupPool.connectionIds
          : [groupPool.connectionId];

      for (const connId of connIds) {
        const connection = await getProviderConnectionById(connId);
        if (!connection) continue; // missing connection contributes nothing

        const provider = (connection as Record<string, unknown>).provider;
        if (typeof provider !== "string" || provider.length === 0) continue;

        connectionIdSet.add(connId);
        providerSet.add(provider);
        groupHasValidConnection = true;
      }
    }

    // Only expose the group slug when the group has at least one usable
    // connection — a fully-orphaned group has no qtSd/<groupSlug>/... models.
    if (groupHasValidConnection) {
      const groupName = getGroupName(groupId) ?? groupId;
      groupSlugSet.add(quotaGroupSlug(groupName));
    }
  }

  return {
    connectionIds: Array.from(connectionIdSet),
    providers: Array.from(providerSet),
    poolSlugs: Array.from(groupSlugSet),
  };
}

// ---------------------------------------------------------------------------
// Phase C3 — Exclusivity reconciliation
// ---------------------------------------------------------------------------

/**
 * Reconcile each affected API key's `allowedQuotas` when a pool's allocations
 * are saved with an `exclusive` flag.
 *
 * Rules:
 * - `exclusive === true` → keys in `nextApiKeyIds` get `poolId` ADDED to their
 *   `allowedQuotas`; keys that were in `prevApiKeyIds` but are no longer in
 *   `nextApiKeyIds` get `poolId` REMOVED.
 * - `exclusive === false` → `poolId` is REMOVED from ALL keys in the union of
 *   `prevApiKeyIds` and `nextApiKeyIds`.
 *
 * Only writes when the set actually changed (avoids needless DB round-trips).
 * Missing keys are silently skipped — this function never throws.
 */
export async function reconcilePoolExclusivity(
  poolId: string,
  prevApiKeyIds: string[],
  nextApiKeyIds: string[],
  exclusive: boolean,
): Promise<void> {
  const affectedIds = new Set([...prevApiKeyIds, ...nextApiKeyIds]);

  for (const keyId of affectedIds) {
    try {
      const keyRow = await getApiKeyById(keyId);
      if (!keyRow) continue;

      const currentQuotas: string[] = Array.isArray(
        (keyRow as Record<string, unknown>).allowedQuotas,
      )
        ? ((keyRow as Record<string, unknown>).allowedQuotas as string[])
        : [];

      let nextQuotas: string[];

      if (exclusive && nextApiKeyIds.includes(keyId)) {
        // Key is in the new allocation AND pool is exclusive → ensure poolId present.
        if (currentQuotas.includes(poolId)) {
          continue; // no change needed
        }
        nextQuotas = [...currentQuotas, poolId];
      } else {
        // Pool is non-exclusive OR key was removed → ensure poolId absent.
        if (!currentQuotas.includes(poolId)) {
          continue; // no change needed
        }
        nextQuotas = currentQuotas.filter((q) => q !== poolId);
      }

      await updateApiKeyPermissions(keyId, { allowedQuotas: nextQuotas });
    } catch {
      // Defensive: a single key failure must never abort reconciliation for others.
    }
  }
}
