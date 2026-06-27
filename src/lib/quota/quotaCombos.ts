/**
 * quota/quotaCombos.ts — Auto-mint / prune `quotaShared-*` virtual combo models
 * when a quota pool gains or loses allocations (Phase B2).
 *
 * Each combo routes to a single {provider, model} target and is pinned to the
 * pool's connectionId via ComboModelStep.connectionId (supported by the combo
 * target schema). Phase B4 wires resolution — this module only keeps the combo
 * rows in sync with the pool's provider model list.
 *
 * Guard: combo-sync failures never propagate to pool CRUD callers.
 */

import { getPool } from "@/lib/db/quotaPools";
import { getGroupName } from "@/lib/db/quotaGroups";
import { getProviderConnectionById } from "@/lib/db/providers";
import {
  getCombos,
  createCombo,
  deleteComboByName,
  getComboByName,
  updateCombo,
} from "@/lib/db/combos";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry";
import {
  quotaModelName,
  parseQuotaModelName,
  isQuotaModelName,
  quotaGroupSlug,
} from "./quotaModelNaming";
import { createLogger } from "@/shared/utils/logger";
import type { AnyRoutingStrategyValue } from "@/shared/constants/routingStrategies";

/**
 * Routing strategy for every auto-minted quota-share (qtSd/) combo. Internal
 * only — resolves to the dedicated DRR + P2C in-flight + per-model gating
 * selection in combo.ts (Phase 3 #9). Was "fill-first" before the hardening.
 */
export const QUOTA_SHARE_STRATEGY: AnyRoutingStrategyValue = "quota-share";

const log = createLogger("quota/quotaCombos");

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Resolve the pool record for combo-sync purposes.
 * Returns null when the pool cannot be found.
 * Individual connection lookups are deferred to syncQuotaCombos so that a
 * single missing connection does not abort the whole sync.
 *
 * B4: also resolves the GROUP NAME so that combos are named
 * `qtSd/<groupSlug>/...` instead of `qtSd/<poolSlug>/...`.
 * Falls back to pool.name when the group record is missing.
 */
async function resolvePoolForSync(poolId: string): Promise<{
  pool: {
    id: string;
    connectionId: string;
    connectionIds: string[];
    name: string;
    groupId: string;
    groupName: string;
  };
} | null> {
  const pool = getPool(poolId);
  if (!pool) return null;

  // Defensive: ensure connectionIds is always a non-empty array.
  const connectionIds: string[] =
    Array.isArray(pool.connectionIds) && pool.connectionIds.length > 0
      ? pool.connectionIds
      : [pool.connectionId];

  // B4: resolve the group name for combo naming.
  // Fall back to pool.name when the group is missing (legacy / test isolation).
  const groupName = getGroupName(pool.groupId) ?? pool.name;

  return {
    pool: {
      id: pool.id,
      connectionId: pool.connectionId,
      connectionIds,
      name: pool.name,
      groupId: pool.groupId,
      groupName,
    },
  };
}

/**
 * Return the list of model IDs for a provider from the provider REGISTRY — the
 * SAME source `/v1/models` uses. PROVIDER_MODELS only covers plain API providers
 * and is empty for CLI/OAuth providers (codex, kimi, claude, …), which silently
 * produced ZERO quotaShared-* combos. REGISTRY has all of them.
 * Empty array when the provider is unknown or has no registered models.
 */
function getProviderModelIds(provider: string): string[] {
  const entry = REGISTRY[provider as keyof typeof REGISTRY] as { models?: unknown } | undefined;
  const models = entry && Array.isArray(entry.models) ? entry.models : [];
  if (models.length === 0) return [];
  return models
    .map((m) =>
      typeof m === "object" && m !== null && typeof (m as { id?: unknown }).id === "string"
        ? (m as { id: string }).id
        : null
    )
    .filter((id): id is string => id !== null && id.length > 0);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Synchronise `quotaShared-*` combos for a pool:
 *
 * 1. Resolve pool → connection → provider.
 * 2. For each model in PROVIDER_MODELS[provider], upsert a combo named
 *    `quotaModelName(pool.name, provider, model)` with a single model-step
 *    pinned to the pool's connectionId.
 * 3. Prune stale quota combos for this pool slug that are no longer in the
 *    desired set.
 *
 * Idempotent: running twice produces no changes on the second call.
 * Defensive: missing pool, missing connection, or empty model list → prune to
 * empty without throwing.
 */
export async function syncQuotaCombos(poolId: string): Promise<void> {
  const resolved = await resolvePoolForSync(poolId);

  if (!resolved) {
    // Pool gone — prune any leftover combos (best effort).
    await removeQuotaCombosForPool(poolId);
    return;
  }

  const { pool } = resolved;
  // B4: use the GROUP name for combo naming (qtSd/<groupSlug>/...).
  // Falls back to pool.name when the group record is missing.
  const groupName = pool.groupName;
  const groupSlug = quotaGroupSlug(groupName);

  // D2: build desired names as the UNION across ALL member connections.
  // A missing connection (no DB row / no provider field) is silently skipped —
  // it contributes nothing to the desired set but does NOT abort the whole sync.
  const desiredNames = new Set<string>();

  // Track (connId, provider, modelIds) tuples for upsert, in order.
  const upsertWork: Array<{ connId: string; provider: string; modelIds: string[] }> = [];

  for (const connId of pool.connectionIds) {
    let connection: Record<string, unknown> | null = null;
    try {
      connection = (await getProviderConnectionById(connId)) as Record<string, unknown> | null;
    } catch {
      // Connection lookup failure — skip this connection.
      continue;
    }
    if (!connection) continue;

    const provider = connection.provider;
    if (typeof provider !== "string" || provider.length === 0) continue;

    const modelIds = getProviderModelIds(provider);
    if (modelIds.length === 0) continue;

    for (const modelId of modelIds) {
      // B4: use groupName (not pool.name) as the first arg so combos carry the group slug.
      desiredNames.add(quotaModelName(groupName, provider, modelId));
    }
    upsertWork.push({ connId, provider, modelIds });
  }

  // B4: the pool is single-provider (guard enforced at pool creation).
  // Compute the pool's provider so the prune is scoped to group+provider only
  // (never touching another provider's combos in the same group).
  const poolProvider: string | undefined = upsertWork[0]?.provider;

  // Group steps by model across all connections (Task 3 guarantees a single provider).
  // This produces one combo per model with ALL connections' steps + the dedicated
  // "quota-share" strategy (Phase 3 #9), fixing the collision where two same-provider
  // connections would overwrite each other.
  const byModel = new Map<string, Array<{ connId: string; provider: string }>>();
  for (const { connId, provider, modelIds } of upsertWork) {
    for (const modelId of modelIds) {
      const arr = byModel.get(modelId) ?? [];
      arr.push({ connId, provider });
      byModel.set(modelId, arr);
    }
  }
  for (const [modelId, conns] of byModel) {
    const provider = conns[0].provider;
    // B4: use groupName for the combo name.
    const comboName = quotaModelName(groupName, provider, modelId);
    const steps = conns.map((c) => ({
      kind: "model" as const,
      model: `${provider}/${modelId}`,
      providerId: provider,
      connectionId: c.connId,
      weight: 100,
    }));
    try {
      const existing = await getComboByName(comboName);
      const payload = {
        name: comboName,
        models: steps,
        strategy: QUOTA_SHARE_STRATEGY,
        isHidden: true,
      };
      if (existing && typeof existing.id === "string") await updateCombo(existing.id, payload);
      else await createCombo(payload);
    } catch (err) {
      log.warn({ err: (err as Error)?.message, comboName, poolId }, "quota-combo upsert failed");
    }
  }

  // B4: Prune stale combos that belong to THIS pool's group+provider but are no
  // longer in the desired set. CRITICAL: must NOT prune another provider's combos
  // in the same group (e.g. syncing openrouter pool must not delete baidu combos).
  //
  // Prune condition: groupSlug matches AND provider matches AND name not in desiredNames.
  // If poolProvider is undefined (no valid connection), skip pruning to be safe.
  if (!poolProvider) {
    // No valid connections → nothing to prune (can't scope by provider).
    return;
  }

  let allCombos: Awaited<ReturnType<typeof getCombos>> = [];
  try {
    allCombos = await getCombos();
  } catch (err) {
    log.warn({ err: (err as Error)?.message, poolId }, "quota-combo prune: getCombos failed");
    return;
  }

  for (const combo of allCombos) {
    const name = typeof combo.name === "string" ? combo.name : null;
    if (!name) continue;
    if (!isQuotaModelName(name)) continue;

    const parsed = parseQuotaModelName(name);
    if (!parsed) continue;

    // B4: provider-scoped prune — only prune combos for THIS group+provider.
    if (parsed.groupSlug !== groupSlug) continue;
    if (parsed.provider !== poolProvider) continue;

    // Belongs to this group+provider but not produced by any current connection → prune.
    if (!desiredNames.has(name)) {
      try {
        await deleteComboByName(name);
      } catch (err) {
        log.warn(
          { err: (err as Error)?.message, comboName: name, poolId },
          "quota-combo prune failed"
        );
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Catalog filter helper (Phase B3)
// ---------------------------------------------------------------------------

/**
 * Given a flat model list and a set of pool slugs, return only the entries
 * whose `id` is a `quotaShared-*` virtual model name AND whose parsed
 * `poolSlug` is in `poolSlugs`.
 *
 * Fail-closed: an empty `poolSlugs` array returns an empty list — a
 * quota-exclusive API key with no resolvable pools sees NO models.
 *
 * Pure function — no I/O, easily unit-tested.
 */
export function filterModelsToQuotaPools<T extends { id: string }>(
  models: T[],
  poolSlugs: string[]
): T[] {
  if (poolSlugs.length === 0) return [];
  const slugSet = new Set(poolSlugs);
  return models.filter((m) => {
    if (!isQuotaModelName(m.id)) return false;
    const parsed = parseQuotaModelName(m.id);
    return parsed !== null && slugSet.has(parsed.groupSlug);
  });
}

/**
 * #4806 — Build the /v1/models catalog list for a quota-exclusive API key.
 *
 * The pool's qtSd/<group>/<provider>/<model> combos are isHidden:true, so the
 * base /v1/models list (which skips hidden combos) never contains them. Filtering
 * that base list therefore returned nothing and clients (e.g. Claude Desktop)
 * showed "0 modelo encontrado" once "Cota exclusiva" was enabled on the pool.
 *
 * This selects the (hidden) qtSd/* combos whose parsed group slug is in
 * `poolSlugs` and maps each through `toEntry` — the catalog's own combo-entry
 * builder — so it stays free of catalog-internal helpers and is unit-testable.
 *
 * Fail-closed: an empty `poolSlugs` array yields an empty list (a quota key with
 * no resolvable pools sees no models).
 */
export async function buildQuotaExclusiveModels<TCombo extends { name?: unknown }>(
  allowedQuotas: string[],
  combos: TCombo[],
  timestamp: number,
  metadataFor: (combo: TCombo) => Record<string, unknown>
): Promise<Array<Record<string, unknown>>> {
  const { resolveQuotaKeyScope } = await import("./quotaKey");
  const scope = await resolveQuotaKeyScope(allowedQuotas);
  if (scope.poolSlugs.length === 0) return [];
  const slugSet = new Set(scope.poolSlugs);
  const out: Array<Record<string, unknown>> = [];
  for (const combo of combos) {
    const name = typeof combo.name === "string" ? combo.name : "";
    if (!isQuotaModelName(name)) continue;
    const parsed = parseQuotaModelName(name);
    if (!parsed || !slugSet.has(parsed.groupSlug)) continue;
    out.push({
      id: name,
      object: "model",
      created: timestamp,
      owned_by: "combo",
      permission: [],
      root: name,
      parent: null,
      ...metadataFor(combo),
    });
  }
  return out;
}

/**
 * Delete ALL `quotaShared-*` combos that belong to the given pool.
 *
 * B4: scoped to this pool's group+provider so that removing one pool does not
 * accidentally delete another provider's combos that share the same group.
 *
 * Used on pool deletion. The pool record is looked up to resolve the group
 * name and provider. If the pool is already gone from the DB, this is a
 * best-effort no-op (nothing to match on provider).
 */
export async function removeQuotaCombosForPool(poolId: string): Promise<void> {
  // Resolve pool → groupName + provider for scoped deletion.
  const resolved = await resolvePoolForSync(poolId);

  // If the pool is already gone, we can't safely scope deletion.
  // Fall back: try to delete by provider-discovery from DB combos (best-effort).
  if (!resolved) {
    // Pool gone — nothing to scope by; skip (no partial prune without knowing the provider).
    return;
  }

  const { pool } = resolved;
  const groupName = pool.groupName;
  const groupSlug = quotaGroupSlug(groupName);

  // Resolve the pool's provider from its connections.
  let poolProvider: string | undefined;
  for (const connId of pool.connectionIds) {
    try {
      const connection = (await getProviderConnectionById(connId)) as Record<
        string,
        unknown
      > | null;
      if (connection && typeof connection.provider === "string" && connection.provider.length > 0) {
        poolProvider = connection.provider;
        break;
      }
    } catch {
      // skip
    }
  }

  if (!poolProvider) {
    // Can't scope by provider — skip to avoid nuking unrelated combos.
    return;
  }

  let allCombos: Awaited<ReturnType<typeof getCombos>> = [];
  try {
    allCombos = await getCombos();
  } catch (err) {
    log.warn(
      { err: (err as Error)?.message, poolId },
      "removeQuotaCombosForPool: getCombos failed"
    );
    return;
  }

  for (const combo of allCombos) {
    const name = typeof combo.name === "string" ? combo.name : null;
    if (!name) continue;
    if (!isQuotaModelName(name)) continue;

    const parsed = parseQuotaModelName(name);
    if (!parsed) continue;

    // B4: only delete combos for this group+provider.
    if (parsed.groupSlug !== groupSlug) continue;
    if (parsed.provider !== poolProvider) continue;

    try {
      await deleteComboByName(name);
    } catch (err) {
      log.warn(
        { err: (err as Error)?.message, comboName: name, poolId },
        "quota-combo remove failed"
      );
    }
  }
}
