/**
 * Database module: seen_models — state behind the dashboard "New models" inbox.
 *
 * One row per (provider, model_id) ever observed by a successful model sync.
 * `acknowledged_at IS NULL` means the operator has not dismissed the model yet.
 *
 * Seeding is per provider: the first reconcile for a provider records its whole
 * listing as already acknowledged, so an existing install — or a provider that was
 * just connected — never floods the inbox. Rows are never deleted when a model
 * drops out of a listing, so a model that comes back is not flagged again.
 */

import { getDbInstance } from "./core";

export interface ObservedModel {
  modelId: string;
  isFree?: boolean;
}

export interface SeenModelEntry {
  provider: string;
  modelId: string;
  isFree: boolean;
  firstSeenAt: string;
}

export interface ReconcileSeenModelsResult {
  /** True when this call seeded the provider's baseline (nothing flagged). */
  seeded: boolean;
  /** Models recorded for the first time by this call and left unread. */
  added: SeenModelEntry[];
}

export interface SeenModelKey {
  provider: string;
  modelId: string;
}

interface SeenModelRow {
  provider: string;
  model_id: string;
  is_free: number;
  first_seen_at: string;
}

const DEFAULT_UNSEEN_LIMIT = 500;

function toEntry(row: SeenModelRow): SeenModelEntry {
  return {
    provider: row.provider,
    modelId: row.model_id,
    isFree: row.is_free === 1,
    firstSeenAt: row.first_seen_at,
  };
}

function normalizeObserved(observed: ObservedModel[]): ObservedModel[] {
  const byId = new Map<string, ObservedModel>();
  for (const model of observed) {
    const modelId = typeof model?.modelId === "string" ? model.modelId.trim() : "";
    if (!modelId || byId.has(modelId)) continue;
    byId.set(modelId, { modelId, isFree: model.isFree === true });
  }
  return [...byId.values()];
}

/**
 * Record a provider's current model listing. Returns the models that are new since
 * the provider's previous reconcile (empty on the seeding call).
 */
export function reconcileSeenModels(
  provider: string,
  observed: ObservedModel[]
): ReconcileSeenModelsResult {
  const providerId = typeof provider === "string" ? provider.trim() : "";
  const models = normalizeObserved(Array.isArray(observed) ? observed : []);
  if (!providerId || models.length === 0) return { seeded: false, added: [] };

  const db = getDbInstance();
  const countStmt = db.prepare("SELECT COUNT(*) AS cnt FROM seen_models WHERE provider = ?");
  const insertStmt = db.prepare(
    `INSERT OR IGNORE INTO seen_models (provider, model_id, is_free, first_seen_at, acknowledged_at)
     VALUES (?, ?, ?, ?, ?)`
  );

  const run = db.transaction((): ReconcileSeenModelsResult => {
    const existing = (countStmt.get(providerId) as { cnt: number } | undefined)?.cnt ?? 0;
    const seeded = existing === 0;
    const now = new Date().toISOString();
    const added: SeenModelEntry[] = [];
    for (const model of models) {
      const isFree = model.isFree === true;
      const info = insertStmt.run(
        providerId,
        model.modelId,
        isFree ? 1 : 0,
        now,
        seeded ? now : null
      );
      if (!seeded && Number(info?.changes ?? 0) > 0) {
        added.push({ provider: providerId, modelId: model.modelId, isFree, firstSeenAt: now });
      }
    }
    return { seeded, added };
  });

  return run();
}

/** Unread models, newest first. */
export function listUnseenModels(limit: number = DEFAULT_UNSEEN_LIMIT): SeenModelEntry[] {
  const safeLimit = Number.isInteger(limit) && limit > 0 ? limit : DEFAULT_UNSEEN_LIMIT;
  const rows = getDbInstance()
    .prepare(
      `SELECT provider, model_id, is_free, first_seen_at FROM seen_models
       WHERE acknowledged_at IS NULL
       ORDER BY first_seen_at DESC, provider ASC, model_id ASC
       LIMIT ?`
    )
    .all(safeLimit) as SeenModelRow[];
  return rows.map(toEntry);
}

export function countUnseenModels(): number {
  const row = getDbInstance()
    .prepare("SELECT COUNT(*) AS cnt FROM seen_models WHERE acknowledged_at IS NULL")
    .get() as { cnt: number } | undefined;
  return row?.cnt ?? 0;
}

/**
 * Mark models as read. Without `items` every unread model is acknowledged.
 * Returns how many rows changed.
 */
export function acknowledgeSeenModels(items?: SeenModelKey[]): number {
  const db = getDbInstance();
  const now = new Date().toISOString();
  if (!items) {
    const info = db
      .prepare("UPDATE seen_models SET acknowledged_at = ? WHERE acknowledged_at IS NULL")
      .run(now);
    return Number(info?.changes ?? 0);
  }

  const stmt = db.prepare(
    `UPDATE seen_models SET acknowledged_at = ?
     WHERE provider = ? AND model_id = ? AND acknowledged_at IS NULL`
  );
  const run = db.transaction((): number => {
    let changed = 0;
    for (const item of items) {
      changed += Number(stmt.run(now, item.provider, item.modelId)?.changes ?? 0);
    }
    return changed;
  });
  return run();
}
