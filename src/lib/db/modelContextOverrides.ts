import { getDbInstance } from "./core";

/**
 * Feature 5004 — self-correcting context-window overrides.
 *
 * A persisted override of a model's real context window that wins over the static
 * catalog / models.dev sync in `getModelContextLimit()`. Two sources:
 * - `manual`: operator-set; never overwritten by the auto reconciler.
 * - `auto:discovery`: written by the reconciler when a provider's own `/models`
 *   discovery declares a window that diverges from the catalog.
 *
 * Cacheless on purpose: the read path already touches the DB (synced capabilities),
 * and a single indexed PK lookup is negligible — this avoids any cache-staleness
 * hazard with `resetDbInstance()` in tests.
 */

export type ModelContextOverrideSource = "manual" | "auto:discovery";

export interface ModelContextOverride {
  provider: string;
  modelId: string;
  realContext: number;
  source: ModelContextOverrideSource;
  refreshedAt: string;
}

interface OverrideRow {
  provider: string;
  model_id: string;
  real_context: number;
  source: string;
  refreshed_at: string;
}

function isPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

function normalizeKey(provider: unknown, modelId: unknown): { provider: string; modelId: string } | null {
  const p = typeof provider === "string" ? provider.trim() : "";
  const m = typeof modelId === "string" ? modelId.trim() : "";
  if (!p || !m) return null;
  return { provider: p, modelId: m };
}

function toOverride(row: OverrideRow): ModelContextOverride {
  return {
    provider: row.provider,
    modelId: row.model_id,
    realContext: row.real_context,
    source: row.source === "auto:discovery" ? "auto:discovery" : "manual",
    refreshedAt: row.refreshed_at,
  };
}

/** Full override record for (provider, modelId), or null. Never throws. */
export function getModelContextOverrideRecord(
  provider: string | null | undefined,
  modelId: string | null | undefined
): ModelContextOverride | null {
  const key = normalizeKey(provider, modelId);
  if (!key) return null;
  try {
    const row = getDbInstance()
      .prepare(
        "SELECT provider, model_id, real_context, source, refreshed_at " +
          "FROM model_context_overrides WHERE provider = ? AND model_id = ?"
      )
      .get(key.provider, key.modelId) as OverrideRow | undefined;
    return row ? toOverride(row) : null;
  } catch {
    // Table may not exist yet (pre-migration) — fall through to the catalog.
    return null;
  }
}

/** The overridden context window (tokens) for (provider, modelId), or null. Never throws. */
export function getModelContextOverride(
  provider: string | null | undefined,
  modelId: string | null | undefined
): number | null {
  const record = getModelContextOverrideRecord(provider, modelId);
  return record ? record.realContext : null;
}

/**
 * Upsert an override. `realContext` must be a positive integer (a token count);
 * anything else is rejected (no write). Returns true when a row was written.
 */
export function setModelContextOverride(
  provider: string,
  modelId: string,
  realContext: number,
  source: ModelContextOverrideSource = "manual"
): boolean {
  const key = normalizeKey(provider, modelId);
  if (!key || !isPositiveInteger(realContext)) return false;
  const normalizedSource: ModelContextOverrideSource =
    source === "auto:discovery" ? "auto:discovery" : "manual";
  getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO model_context_overrides " +
        "(provider, model_id, real_context, source, refreshed_at) " +
        "VALUES (?, ?, ?, ?, datetime('now'))"
    )
    .run(key.provider, key.modelId, realContext, normalizedSource);
  return true;
}

/** Remove an override. Returns true when a row was deleted. */
export function removeModelContextOverride(provider: string, modelId: string): boolean {
  const key = normalizeKey(provider, modelId);
  if (!key) return false;
  const info = getDbInstance()
    .prepare("DELETE FROM model_context_overrides WHERE provider = ? AND model_id = ?")
    .run(key.provider, key.modelId);
  return info.changes > 0;
}

/** All overrides, newest refresh first. Never throws. */
export function listModelContextOverrides(): ModelContextOverride[] {
  try {
    const rows = getDbInstance()
      .prepare(
        "SELECT provider, model_id, real_context, source, refreshed_at " +
          "FROM model_context_overrides ORDER BY refreshed_at DESC"
      )
      .all() as OverrideRow[];
    return rows.map(toOverride);
  } catch {
    return [];
  }
}
