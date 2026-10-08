/**
 * modelIntelligence.ts — DB domain module for model task-fitness scores.
 *
 * Persists per-model intelligence from arena ELO, models.dev tier rankings,
 * and user overrides. Resolution chain: user_override → arena_elo → models_dev_tier.
 *
 * All three sources are now written:
 * - `arena_elo`: written by arenaEloSync.ts on a 6-hour schedule with 7-day TTL.
 * - `models_dev_tier`: written by rebuildModelsDevTierIntelligence() after every
 *   successful capabilities sync and on-demand via POST /api/intelligence/sync
 *   { rebuildTier: true }. Rows have expires_at=NULL (no TTL).
 * - `user_override`: written by setUserFitnessOverrideEntry / the overrides API
 *   (POST/DELETE /api/intelligence/overrides). Rows have expires_at=NULL.
 *
 * @see Migration 097_model_intelligence.sql
 */

import fs from "fs";
import path from "path";
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

// ──────────────── models_dev_tier persistence ────────────────

/** Task categories the `models_dev_tier` source covers (mirrors TIER_TASK_FITNESS keys). */
const TIER_CATEGORIES = [
  "coding",
  "review",
  "planning",
  "analysis",
  "debugging",
  "documentation",
  "default",
] as const;

/**
 * Tier → task fitness scores. Must stay in sync with TIER_TASK_FITNESS in
 * `open-sse/services/autoCombo/taskFitness.ts`. The two maps are intentionally
 * kept in separate files (DB domain vs routing service) to avoid a cross-module
 * circular import at runtime.
 */
const TIER_TASK_FITNESS: Record<string, Record<string, number>> = {
  premium: {
    coding: 0.92,
    review: 0.93,
    planning: 0.94,
    analysis: 0.95,
    debugging: 0.9,
    documentation: 0.88,
    default: 0.85,
  },
  standard: {
    coding: 0.85,
    review: 0.84,
    planning: 0.85,
    analysis: 0.85,
    debugging: 0.82,
    documentation: 0.85,
    default: 0.78,
  },
  fast: {
    coding: 0.78,
    review: 0.72,
    planning: 0.7,
    analysis: 0.72,
    debugging: 0.75,
    documentation: 0.8,
    default: 0.72,
  },
  budget: {
    coding: 0.65,
    review: 0.6,
    planning: 0.55,
    analysis: 0.58,
    debugging: 0.6,
    documentation: 0.7,
    default: 0.55,
  },
};

/** Derive a tier label from capability booleans (mirrors deriveTierFromCapabilities). */
function deriveTierFromCapabilities(cap: {
  tool_call: boolean | null;
  reasoning: boolean | null;
  limit_context: number | null;
}): string {
  if (cap.reasoning === true) return "premium";
  if (cap.tool_call === true && (cap.limit_context ?? 0) >= 128000) return "standard";
  if (cap.tool_call === true) return "fast";
  return "budget";
}

/** Confidence label derived from tier. */
function tierToConfidence(tier: string): string {
  if (tier === "premium") return "high";
  if (tier === "standard") return "medium";
  return "low";
}

/** Capability row shape used for aggregation (subset of model_capabilities columns). */
interface ModelCapRow {
  tool_call: boolean | null;
  reasoning: boolean | null;
  limit_context: number | null;
}

/**
 * Aggregate `model_capabilities` rows into a per-model capability map using
 * capability-maximal booleans (any `true` wins) and max `limit_context`.
 * Returns null when the table does not exist or is empty.
 */
function loadAggregatedCapabilities(): Record<string, ModelCapRow> | null {
  const db = getDbInstance();

  const tableExists = db
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='model_capabilities'")
    .get();
  if (!tableExists) return null;

  const rows = db
    .prepare("SELECT model_id, tool_call, reasoning, limit_context FROM model_capabilities")
    .all() as Array<{
    model_id: string;
    tool_call: number | boolean | null;
    reasoning: number | boolean | null;
    limit_context: number | null;
  }>;

  if (rows.length === 0) return null;

  const acc = new Map<
    string,
    {
      toolTrue: boolean;
      toolSeen: boolean;
      toolFalse: boolean;
      reasonTrue: boolean;
      reasonSeen: boolean;
      reasonFalse: boolean;
      maxContext: number | null;
    }
  >();

  for (const row of rows) {
    const modelId = typeof row.model_id === "string" ? row.model_id.toLowerCase() : "";
    if (!modelId) continue;

    let entry = acc.get(modelId);
    if (!entry) {
      entry = {
        toolTrue: false,
        toolSeen: false,
        toolFalse: false,
        reasonTrue: false,
        reasonSeen: false,
        reasonFalse: false,
        maxContext: null,
      };
      acc.set(modelId, entry);
    }

    if (row.tool_call === true || row.tool_call === 1) {
      entry.toolTrue = true;
      entry.toolSeen = true;
    } else if (row.tool_call === false || row.tool_call === 0) {
      entry.toolFalse = true;
      entry.toolSeen = true;
    }
    if (row.reasoning === true || row.reasoning === 1) {
      entry.reasonTrue = true;
      entry.reasonSeen = true;
    } else if (row.reasoning === false || row.reasoning === 0) {
      entry.reasonFalse = true;
      entry.reasonSeen = true;
    }
    if (typeof row.limit_context === "number") {
      entry.maxContext =
        entry.maxContext === null
          ? row.limit_context
          : Math.max(entry.maxContext, row.limit_context);
    }
  }

  const result: Record<string, ModelCapRow> = {};
  for (const [modelId, a] of acc) {
    result[modelId] = {
      tool_call: a.toolTrue ? true : a.toolFalse ? false : null,
      reasoning: a.reasonTrue ? true : a.reasonFalse ? false : null,
      limit_context: a.maxContext,
    };
  }
  return result;
}

/**
 * Load the vendor-retired model IDs from `config/quality/model-lifecycle.json`.
 * Returns an empty Set when the file is missing or unreadable (neutral by design).
 */
function loadRetiredModelIds(): Set<string> {
  const retired = new Set<string>();
  try {
    const jsonPath = path.resolve(__dirname, "../../../config/quality/model-lifecycle.json");
    if (!fs.existsSync(jsonPath)) return retired;
    const parsed = JSON.parse(fs.readFileSync(jsonPath, "utf8")) as {
      retired?: Record<string, { status?: string }>;
    };
    for (const [id, entry] of Object.entries(parsed.retired ?? {})) {
      if (entry?.status === "retired") retired.add(id.toLowerCase());
    }
  } catch {
    // Missing / unreadable → no lifecycle veto (neutral).
  }
  return retired;
}

/**
 * Build the full set of `models_dev_tier` entries from the aggregated
 * `model_capabilities` table using the same capability → tier → fitness
 * derivation as `taskFitness.ts:getModelsDevTierFitnessWithSource`.
 *
 * Lifecycle veto: model IDs that appear as `retired` in
 * `config/quality/model-lifecycle.json` are excluded so dead rows never
 * accumulate. No-op (returns []) when `model_capabilities` is empty.
 *
 * @param caps - Pre-loaded capability map (pass null to load from DB).
 */
export function buildModelsDevTierEntries(
  caps?: Record<string, ModelCapRow> | null
): Array<Omit<ModelIntelligenceEntry, "syncedAt">> {
  const capabilities = caps !== undefined ? caps : loadAggregatedCapabilities();
  if (!capabilities || Object.keys(capabilities).length === 0) return [];

  const retired = loadRetiredModelIds();
  const entries: Array<Omit<ModelIntelligenceEntry, "syncedAt">> = [];

  for (const [modelId, cap] of Object.entries(capabilities)) {
    if (retired.has(modelId)) continue;

    const tier = deriveTierFromCapabilities(cap);
    const tierScores = TIER_TASK_FITNESS[tier];
    if (!tierScores) continue;

    const confidence = tierToConfidence(tier);

    for (const category of TIER_CATEGORIES) {
      const score = tierScores[category] ?? tierScores.default;
      if (score === undefined) continue;
      entries.push({
        model: modelId,
        source: "models_dev_tier",
        category,
        score,
        eloRaw: null,
        confidence,
        expiresAt: null,
      });
    }
  }

  return entries;
}

/**
 * Atomically replace the `models_dev_tier` dataset: upsert all derived entries
 * and prune rows whose `(model, category)` pair is no longer in the derived set,
 * in a single transaction. Mirrors `applyArenaEloRefresh` for the tier source.
 *
 * @returns `{ upserted, pruned }` counts.
 */
export function applyModelsDevTierRefresh(
  entries: Array<Omit<ModelIntelligenceEntry, "syncedAt">>
): { upserted: number; pruned: number } {
  const db = getDbInstance();
  const source = "models_dev_tier";

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
        source,
        entry.category,
        entry.score,
        entry.eloRaw ?? null,
        entry.confidence ?? null,
        entry.expiresAt ?? null
      );
      upserted++;
    }
    // Membership prune via composite "model\0category" keys (same as applyArenaEloRefresh).
    const refreshedPairs = JSON.stringify(entries.map((e) => `${e.model}\u0000${e.category}`));
    const pruneResult = db
      .prepare(
        `DELETE FROM model_intelligence
         WHERE source = ?
           AND model || char(0) || category NOT IN (
             SELECT value FROM json_each(?)
           )`
      )
      .run(source, refreshedPairs);
    return { upserted, pruned: pruneResult.changes ?? 0 };
  });

  return refresh();
}

/**
 * Full rebuild of the `models_dev_tier` dataset from the current
 * `model_capabilities` table. Called automatically after each successful
 * capabilities sync and on-demand via POST /api/intelligence/sync
 * { rebuildTier: true }.
 *
 * When `model_capabilities` is empty, all existing `models_dev_tier` rows are
 * pruned and `{ success: true, modelCount: 0, pruned: N }` is returned.
 * Updates `getLatestSyncedAt('models_dev_tier')` via the upsert timestamps.
 */
export function rebuildModelsDevTierIntelligence(): {
  success: boolean;
  source: "models_dev_tier";
  modelCount: number;
  pruned: number;
} {
  const entries = buildModelsDevTierEntries();
  const { upserted, pruned } = applyModelsDevTierRefresh(entries);
  const modelCount = new Set(entries.map((e) => e.model)).size;
  void upserted; // only modelCount (unique models) is surfaced; upserted is total row count
  return { success: true, source: "models_dev_tier", modelCount, pruned };
}

// ──────────────── Intelligence health ────────────────

/** Per-source aggregate health used by GET /api/intelligence/sync. */
export interface IntelligenceSourceHealth {
  count: number;
  lastSync: string | null;
  oldestExpiresAt: string | null;
}

/**
 * Aggregate health metrics for all declared intelligence sources.
 * Returns a record keyed by source name. Missing sources (zero rows) are
 * included with count:0, lastSync:null, oldestExpiresAt:null so callers
 * never need to handle absence.
 *
 * Read-only — no side effects.
 */
export function getIntelligenceSourcesHealth(): Record<string, IntelligenceSourceHealth> {
  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT source,
              COUNT(*) AS cnt,
              MAX(synced_at) AS last_sync,
              MIN(expires_at) AS oldest_expires_at
       FROM model_intelligence
       GROUP BY source`
    )
    .all() as Array<{
    source: string;
    cnt: number;
    last_sync: string | null;
    oldest_expires_at: string | null;
  }>;

  const result: Record<string, IntelligenceSourceHealth> = {
    arena_elo: { count: 0, lastSync: null, oldestExpiresAt: null },
    models_dev_tier: { count: 0, lastSync: null, oldestExpiresAt: null },
    user_override: { count: 0, lastSync: null, oldestExpiresAt: null },
  };

  for (const row of rows) {
    result[row.source] = {
      count: row.cnt,
      lastSync: row.last_sync,
      oldestExpiresAt: row.oldest_expires_at,
    };
  }

  return result;
}
