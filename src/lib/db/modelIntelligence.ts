/**
 * modelIntelligence.ts — DB domain module for model task-fitness scores.
 *
 * Persists per-model intelligence from arena ELO, models.dev tier rankings,
 * and user overrides. Resolution chain: user_override → arena_elo → models_dev_tier.
 *
 * @see Migration 097_model_intelligence.sql
 */

import { getDbInstance, rowToCamel } from "./core";

// ──────────────── Types ────────────────

export interface ModelIntelligenceEntry {
  model: string;
  source: string;
  category: string;
  score: number;
  eloRaw: number | null;
  confidence: string | null;
  syncedAt: string;
  expiresAt: string | null;
  votes?: number;
  rank?: number;
}

// ──────────────── Helpers ────────────────

function rowToEntry(row: Record<string, unknown>): ModelIntelligenceEntry {
  const camel = rowToCamel(row) ?? {};
  return {
    model: String(camel.model ?? ""),
    source: String(camel.source ?? ""),
    category: String(camel.category ?? ""),
    score: typeof camel.score === "number" ? camel.score : 0,
    eloRaw: typeof camel.eloRaw === "number" ? camel.eloRaw : null,
    confidence: typeof camel.confidence === "string" ? camel.confidence : null,
    syncedAt: String(camel.syncedAt ?? ""),
    expiresAt: typeof camel.expiresAt === "string" ? camel.expiresAt : null,
  };
}

// ──────────────── CRUD ────────────────

export function getModelIntelligence(
  model: string,
  category: string
): ModelIntelligenceEntry | null {
  const db = getDbInstance();
  const row = db
    .prepare(
      `SELECT * FROM model_intelligence
       WHERE model = ? AND category = ?
         AND source IN ('user_override', 'arena_elo', 'models_dev_tier')
         AND (expires_at IS NULL OR datetime(expires_at) > datetime('now'))
       ORDER BY CASE source
         WHEN 'user_override' THEN 1
         WHEN 'arena_elo' THEN 2
         WHEN 'models_dev_tier' THEN 3
       END
       LIMIT 1`
    )
    .get(model, category) as Record<string, unknown> | undefined;

  return row ? rowToEntry(row) : null;
}

export function getModelIntelligenceBySource(
  model: string,
  source: string,
  category: string
): ModelIntelligenceEntry | null {
  const db = getDbInstance();
  const row = db
    .prepare(
      `SELECT * FROM model_intelligence
       WHERE model = ? AND source = ? AND category = ?
         AND (expires_at IS NULL OR datetime(expires_at) > datetime('now'))`
    )
    .get(model, source, category) as Record<string, unknown> | undefined;

  return row ? rowToEntry(row) : null;
}

export function upsertModelIntelligence(entry: Omit<ModelIntelligenceEntry, "syncedAt">): void {
  const db = getDbInstance();

  db.prepare(
    `INSERT OR REPLACE INTO model_intelligence
       (model, source, category, score, elo_raw, confidence, synced_at, expires_at)
     VALUES (?, ?, ?, ?, ?, ?, datetime('now'), ?)`
  ).run(
    entry.model,
    entry.source,
    entry.category,
    entry.score,
    entry.eloRaw ?? null,
    entry.confidence ?? null,
    entry.expiresAt ?? null
  );
}

export function deleteModelIntelligence(model: string, source: string, category: string): boolean {
  const db = getDbInstance();
  const result = db
    .prepare(
      `DELETE FROM model_intelligence
       WHERE model = ? AND source = ? AND category = ?`
    )
    .run(model, source, category);
  return (result.changes ?? 0) > 0;
}

export function deleteExpiredIntelligence(source?: string): number {
  const db = getDbInstance();
  const conditions = ["expires_at IS NOT NULL", "datetime(expires_at) < datetime('now')"];
  const params: unknown[] = [];

  if (source) {
    conditions.push("source = ?");
    params.push(source);
  }

  const where = conditions.join(" AND ");
  const result = db.prepare(`DELETE FROM model_intelligence WHERE ${where}`).run(...params);
  return result.changes ?? 0;
}

export function deleteModelIntelligenceBySource(source: string): number {
  const db = getDbInstance();
  const result = db.prepare(`DELETE FROM model_intelligence WHERE source = ?`).run(source);
  return result.changes ?? 0;
}

export function listModelIntelligence(filters?: {
  source?: string;
  category?: string;
}): ModelIntelligenceEntry[] {
  const db = getDbInstance();

  const conditions: string[] = [];
  const params: unknown[] = [];

  if (filters?.source) {
    conditions.push("source = ?");
    params.push(filters.source);
  }
  if (filters?.category) {
    conditions.push("category = ?");
    params.push(filters.category);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const sql = `SELECT * FROM model_intelligence ${where} ORDER BY model ASC, source ASC, category ASC`;

  const rows = db.prepare(sql).all(...params) as Record<string, unknown>[];
  return rows.map(rowToEntry);
}

export function bulkUpsertModelIntelligence(
  entries: Array<Omit<ModelIntelligenceEntry, "syncedAt">>
): number {
  if (entries.length === 0) return 0;

  const db = getDbInstance();
  const stmt = db.prepare(
    `INSERT OR REPLACE INTO model_intelligence
       (model, source, category, score, elo_raw, confidence, synced_at, expires_at)
     VALUES (?, ?, ?, ?, ?, ?, datetime('now'), ?)`
  );

  const upsertAll = db.transaction(() => {
    let count = 0;
    for (const entry of entries) {
      stmt.run(
        entry.model,
        entry.source,
        entry.category,
        entry.score,
        entry.eloRaw ?? null,
        entry.confidence ?? null,
        entry.expiresAt ?? null
      );
      count++;
    }
    return count;
  });

  return upsertAll();
}

export function getResolvedTaskFitness(model: string, category: string): number | null {
  const entry = getModelIntelligence(model, category);
  return entry ? entry.score : null;
}

/**
 * Latest synced_at for a source, as an ISO string (or null when the source
 * has no rows). Backs the arenaEloSync freshness guard: a non-empty dataset
 * synced within the sync interval does not need re-fetching.
 */
export function getLatestSyncedAt(source: string): string | null {
  const db = getDbInstance();
  const row = db
    .prepare(`SELECT MAX(synced_at) as latest FROM model_intelligence WHERE source = ?`)
    .get(source) as { latest: string | null } | undefined;
  return row?.latest ?? null;
}

/**
 * Atomically replace a source's dataset: upsert every refreshed entry and
 * prune rows for that source that are not in the refreshed set — one
 * transaction, so a crash mid-refresh can never leave a half-replaced table.
 *
 * This is the safe replacement for the old delete-expired-then-upsert flow,
 * which lost data when a fetch failed after the delete (remediation 2026-09-12).
 */
export function applyArenaEloRefresh(
  entries: Array<Omit<ModelIntelligenceEntry, "syncedAt">>,
  source = "arena_elo"
): { upserted: number; pruned: number } {
  const db = getDbInstance();
  const upsertStmt = db.prepare(
    `INSERT OR REPLACE INTO model_intelligence
       (model, source, category, score, elo_raw, confidence, synced_at, expires_at)
     VALUES (?, ?, ?, ?, ?, ?, datetime('now'), ?)`
  );

  const refresh = db.transaction(() => {
    let upserted = 0;
    for (const entry of entries) {
      upsertStmt.run(
        entry.model,
        entry.source,
        entry.category,
        entry.score,
        entry.eloRaw ?? null,
        entry.confidence ?? null,
        entry.expiresAt ?? null
      );
      upserted++;
    }
    // Membership prune via a JSON array of "model\0category" pair keys:
    // correct for composite keys (a plain NOT IN over model names is not).
    const refreshedPairs = JSON.stringify(entries.map((e) => `${e.model}\u0000${e.category}`));
    const pruneByPair = db.prepare(
      `DELETE FROM model_intelligence
       WHERE source = ?
         AND model || char(0) || category NOT IN (
           SELECT value FROM json_each(?)
         )`
    );
    const pruneResult = pruneByPair.run(source, refreshedPairs);
    return { upserted, pruned: pruneResult.changes ?? 0 };
  });

  return refresh();
}

/**
 * Write a user_override entry for a model × category combination.
 * Used by taskFitness.ts resolution chain as Layer 1 (highest priority).
 *
 * @param model - Model identifier
 * @param category - Task category
 * @param score - Fitness score [0..1]
 */
export function setUserFitnessOverrideEntry(model: string, category: string, score: number): void {
  upsertModelIntelligence({
    model: model.toLowerCase(),
    source: "user_override",
    category: category.toLowerCase(),
    score: Math.max(0, Math.min(1, score)),
    eloRaw: null,
    confidence: null,
    expiresAt: null,
  });
}

/**
 * Delete a user_override entry for a model × category combination.
 *
 * @param model - Model identifier
 * @param category - Task category
 * @returns true if an entry was deleted
 */
export function deleteUserFitnessOverrideEntry(model: string, category: string): boolean {
  return deleteModelIntelligence(model.toLowerCase(), "user_override", category.toLowerCase());
}
