/**
 * Auto-aliases derived from synced (discovered) Antigravity-family models.
 *
 * Bare model names only resolve when something maps them; every new upstream
 * model used to need a hand-written alias (Gemini 3.7 Flash shipped with none,
 * so bare names mis-routed until a catalog refresh). The Antigravity backend
 * advertises tiered ids (…-high/-medium/-low) while users naturally ask for
 * the bare base name, so derive: bare base → default tier (high > medium >
 * low), mirroring the backend's own High default.
 *
 * Derived in memory from the synced store — no persistence, always consistent
 * with the latest discovery, and merged at the LOWEST precedence so explicit
 * human aliases (DB namespace, settings, wildcards) always win.
 */

import { getAllActiveSyncedModels } from "@/lib/db/models/activeSyncedCatalog";

/** Providers whose synced catalogs participate in auto-alias derivation. */
const AUTO_ALIAS_FAMILY_PROVIDERS = ["agy", "antigravity"] as const;

/** Preferred default tier when a bare base name is aliased onto a group. */
const TIER_PREFERENCE = ["-high", "-medium", "-low"] as const;

/**
 * Pure derivation (exported for tests): given per-provider synced model id
 * lists, produce bare-base → "provider/defaultTierId" alias entries.
 *
 * Rules:
 * - only tiered groups (ids carrying a -high/-medium/-low suffix) participate
 * - a base that is itself a callable synced id gets no alias (nothing to map)
 * - within one provider the first eligible group per base wins; across
 *   providers the AUTO_ALIAS_FAMILY_PROVIDERS order wins (agy first)
 */
export function deriveSyncedTierAliases(
  syncedIdsByProvider: Record<string, readonly string[]>
): Record<string, string> {
  const aliases: Record<string, string> = {};

  for (const provider of AUTO_ALIAS_FAMILY_PROVIDERS) {
    const ids = syncedIdsByProvider[provider];
    if (!Array.isArray(ids) || ids.length === 0) continue;

    const idSet = new Set(ids);
    const groups = new Map<string, string[]>();
    for (const id of ids) {
      if (typeof id !== "string" || !id) continue;
      const suffix = TIER_PREFERENCE.find((candidate) => id.endsWith(candidate));
      if (!suffix) continue;
      const base = id.slice(0, -suffix.length);
      if (!base) continue;
      const bucket = groups.get(base) ?? [];
      bucket.push(id);
      groups.set(base, bucket);
    }

    for (const [base, variants] of groups) {
      if (aliases[base]) continue; // earlier provider already claimed it
      if (idSet.has(base)) continue; // bare base itself is callable — no alias needed
      const chosen = TIER_PREFERENCE.map((suffix) => base + suffix).find((id) =>
        variants.includes(id)
      );
      if (chosen) aliases[base] = `${provider}/${chosen}`;
    }
  }

  return aliases;
}

/** Auto-aliases from the live synced catalog (empty on any read failure). */
export async function getSyncedAutoAliases(): Promise<Record<string, string>> {
  try {
    const syncedByProvider = await getAllActiveSyncedModels();
    const picked: Record<string, readonly string[]> = {};
    for (const provider of AUTO_ALIAS_FAMILY_PROVIDERS) {
      const rows = syncedByProvider[provider];
      if (!Array.isArray(rows)) continue;
      picked[provider] = rows
        .map((row) => (row && typeof row.id === "string" ? row.id : ""))
        .filter(Boolean);
    }
    return deriveSyncedTierAliases(picked);
  } catch {
    return {};
  }
}
