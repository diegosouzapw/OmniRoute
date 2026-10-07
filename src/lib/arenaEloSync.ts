/**
 * arenaEloSync.ts — Arena AI leaderboard ELO sync engine.
 *
 * Fetches model intelligence data from the Arena AI leaderboard API
 * (https://api.wulong.dev/arena-ai-leaderboards/v1/leaderboard) and stores
 * normalised task-fit scores in the `model_intelligence` DB table.
 *
 * Resolution order: user overrides > synced arena ELO > defaults
 *
 * On by default; opt out via Dashboard Feature Flags or ARENA_ELO_SYNC_ENABLED=false.
 */

import { resolveScoresAs } from "@omniroute/open-sse/services/autoCombo/scoresAs.ts";

import { isArenaEloSyncEnabled } from "@/shared/utils/featureFlags";

import { getDbInstance } from "./db/core";
import { backupDbFile } from "./db/backup";
import {
  applyArenaEloRefresh,
  deleteModelIntelligenceBySource,
  getLatestSyncedAt,
  type ModelIntelligenceEntry,
} from "./db/modelIntelligence";

// ─── Types ───────────────────────────────────────────────

/**
 * A single model entry from the Arena AI leaderboard.
 */
export interface ArenaModelEntry {
  /** Leaderboard rank (1-based). */
  rank: number;
  /** Model identifier (may include vendor prefix like "anthropic/claude-opus"). */
  model: string;
  /** Vendor / provider name (e.g. "Anthropic", "OpenAI"). */
  vendor: string;
  /** ELO score (higher = better). */
  score: number;
  /** Confidence interval half-width. */
  ci: number;
  /** Total number of human preference votes. */
  votes: number;
  /** License type (e.g. "proprietary", "open"). */
  license: string;
}

/**
 * Metadata + models for a single leaderboard category.
 */
export interface ArenaLeaderboardData {
  /** Leaderboard metadata. */
  meta: {
    /** Leaderboard category name (e.g. "text", "code"). */
    leaderboard: string;
    /** Total number of models in this leaderboard. */
    model_count: number;
  };
  /** Ranked model entries. */
  models: ArenaModelEntry[];
}

/**
 * Map of leaderboard category → leaderboard data.
 */
export interface ArenaLeaderboardMap {
  [category: string]: ArenaLeaderboardData;
}

/**
 * Result of a sync operation.
 */
export interface SyncResult {
  /** Whether the sync completed successfully. */
  success: boolean;
  /** Number of model intelligence entries stored. */
  modelCount: number;
  /** Source identifier (always "arena_elo"). */
  source: string;
  /** Error message if sync failed. */
  error?: string;
}

/**
 * Current status of the Arena ELO sync subsystem.
 */
export interface SyncStatus {
  /** Whether periodic sync is enabled via env var. */
  enabled: boolean;
  /** ISO timestamp of last successful sync, or null. */
  lastSync: string | null;
  /** Number of models stored in last successful sync. */
  lastSyncModelCount: number;
  /** ISO timestamp of next scheduled sync, or null. */
  nextSync: string | null;
  /** Configured sync interval in milliseconds. */
  intervalMs: number;
  /** Active data sources. */
  sources: string[];
}

// ─── Configuration ───────────────────────────────────────

const ARENA_ELO_API_BASE = "https://api.wulong.dev/arena-ai-leaderboards/v1/leaderboard";

/** Leaderboard categories to fetch from the Arena API. */
const FETCH_CATEGORIES = ["text", "code"] as const;

/**
 * Maps Arena leaderboard categories to OmniRoute task-type categories.
 *
 * - "text" leaderboard → default, review, documentation, debugging
 * - "code" leaderboard → coding
 * - "vision" leaderboard is intentionally skipped (not relevant for text fitness)
 */
const CATEGORY_TASK_MAP: Record<string, string[]> = {
  text: ["default", "review", "documentation", "debugging"],
  code: ["coding"],
};

/**
 * Known vendor prefixes to strip from model names.
 * E.g. "anthropic/claude-opus-4-6-thinking" → "claude-opus-4-6-thinking"
 */
const VENDOR_PREFIXES = [
  "anthropic/",
  "openai/",
  "google/",
  "meta/",
  "mistral/",
  "deepseek/",
  "xai/",
  "cohere/",
  "qwen/",
  "alibaba/",
  "nvidia/",
  "01-ai/",
  "zerox/",
  "together/",
  "fireworks/",
  "perplexity/",
  "ai21/",
] as const;

/** Votes threshold for "high" confidence. */
const HIGH_CONFIDENCE_VOTES = 5000;

/** Votes threshold for "medium" confidence. */
const MEDIUM_CONFIDENCE_VOTES = 1000;

/** Intelligence entry expiration: 7 days after sync. */
const EXPIRY_DAYS = 7;

const parsedInterval = parseInt(process.env.ARENA_ELO_SYNC_INTERVAL || "86400", 10);
const SYNC_INTERVAL_MS =
  Number.isFinite(parsedInterval) && parsedInterval > 0 ? parsedInterval * 1000 : 86400 * 1000;

// ─── Periodic sync state ─────────────────────────────────

let syncTimer: ReturnType<typeof setInterval> | null = null;
let lastSyncTime: string | null = null;
let lastSyncModelCount = 0;
let activeSyncIntervalMs = SYNC_INTERVAL_MS;
let firstSyncDone = false;
let syncInProgress = false;

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

// ─── Failure backoff (persisted in key_value) ────────────
// After a failed sync we stamp arena_elo/lastFailedAt so restarts and the
// periodic timer skip retrying a rate-limited/dead upstream within the
// window (remediation 2026-09-12: prevents boot-loop retry storms).
const BACKOFF_MS = SYNC_INTERVAL_MS / 4; // 6h for the default 24h interval

const KV_READ_SQL = `SELECT value FROM key_value WHERE namespace = ? AND key = ? LIMIT 1`;
const KV_WRITE_SQL = `INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)`;

function readLastFailedAt(): number | null {
  try {
    const db = getDbInstance();
    const row = db.prepare(KV_READ_SQL).get("arena_elo", "lastFailedAt") as
      { value: string } | undefined;
    if (!row?.value) return null;
    const ts = Date.parse(row.value);
    return Number.isFinite(ts) ? ts : null;
  } catch {
    return null; // kv problems must never break the sync itself
  }
}

function writeLastFailedAt(ts: number): void {
  try {
    const db = getDbInstance();
    db.prepare(KV_WRITE_SQL).run("arena_elo", "lastFailedAt", new Date(ts).toISOString());
  } catch (err) {
    console.warn(`[ARENA_ELO_SYNC] Failed to persist lastFailedAt: ${getErrorMessage(err)}`);
  }
}

function clearLastFailedAt(): void {
  try {
    const db = getDbInstance();
    db.prepare(`DELETE FROM key_value WHERE namespace = ? AND key = ?`).run(
      "arena_elo",
      "lastFailedAt"
    );
  } catch {
    // Swallow: a stuck kv row only costs one redundant fetch later.
  }
}

function getEffectiveArenaEloSyncEnabled(): boolean {
  try {
    return isArenaEloSyncEnabled();
  } catch (error) {
    console.warn(
      `[ARENA_ELO_SYNC] Failed to resolve ARENA_ELO_SYNC_ENABLED feature flag: ${getErrorMessage(
        error
      )}`
    );
    return process.env.ARENA_ELO_SYNC_ENABLED !== "false";
  }
}

// ─── Model name normalization ────────────────────────────

/**
 * Trailing harness annotation the Arena leaderboard appends to some entries,
 * e.g. "gpt-5.6-sol-xhigh (codex-harness)". It describes the scaffold the model
 * was measured under, not the model id, so it never belongs in a stored key.
 */
const HARNESS_ANNOTATION_RE = /\s*\([^)]*\)\s*$/;

/**
 * Normalize a model name from the Arena leaderboard.
 *
 * Lowercases the name, drops a trailing harness annotation
 * ("gpt-5.6-sol-xhigh (codex-harness)" → "gpt-5.6-sol-xhigh") and strips known
 * vendor prefixes ("anthropic/claude-opus-4" → "claude-opus-4").
 *
 * @param rawName - The raw model name from the API response.
 * @returns The cleaned, lowercase model name.
 */
export function normalizeModelName(rawName: string): string {
  let name = rawName.toLowerCase().replace(HARNESS_ANNOTATION_RE, "");
  for (const prefix of VENDOR_PREFIXES) {
    if (name.startsWith(prefix)) {
      name = name.slice(prefix.length);
      break;
    }
  }
  return name;
}

// ─── Core: Fetch ─────────────────────────────────────────

/**
 * How many consecutive per-category fetch failures to let through to
 * `console.warn` before going quiet again. Timeouts against the Arena API
 * repeat every sync cycle (see `startPeriodicSync()`), so logging every
 * single one turns into log spam within a few hours (#11500). Mirrors the
 * once-per-label dedup pattern used by `warnEmptyAutoPoolOnce()`
 * (`open-sse/services/autoCombo/virtualFactory.ts`), except here the streak
 * resets on the next successful fetch so a genuinely new outage warns again.
 */
const ARENA_ELO_FETCH_WARN_STREAK_INTERVAL = 10;

/** Consecutive fetch-failure count per leaderboard category, since the last success. */
const categoryFetchFailureStreak = new Map<string, number>();

/** Test-only: reset the per-category fetch-failure streak dedup state. */
export function resetArenaEloFetchFailureStreaksForTests(): void {
  categoryFetchFailureStreak.clear();
}

/**
 * Fetch leaderboards from the Arena AI API for all configured categories.
 *
 * Fetches "text" and "code" leaderboards concurrently and returns
 * a map of category → leaderboard data.
 *
 * @returns Map of leaderboard category to its data.
 * @throws If all category fetches fail (individual failures are logged and skipped).
 */
export async function fetchArenaLeaderboards(): Promise<ArenaLeaderboardMap> {
  const result: ArenaLeaderboardMap = {};
  const errors: string[] = [];

  const fetches = FETCH_CATEGORIES.map(async (category) => {
    const url = `${ARENA_ELO_API_BASE}?name=${category}`;
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(30000),
      });
      if (!response.ok) {
        throw new Error(
          `Arena API fetch failed for "${category}" [${response.status}]: ${response.statusText}`
        );
      }
      const text = await response.text();
      try {
        result[category] = JSON.parse(text) as ArenaLeaderboardData;
      } catch {
        throw new Error(
          `Arena API returned invalid JSON for "${category}" (${text.slice(0, 100)}...)`
        );
      }
      // Recovered: let the next failure streak warn from scratch again.
      categoryFetchFailureStreak.delete(category);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const streak = (categoryFetchFailureStreak.get(category) ?? 0) + 1;
      categoryFetchFailureStreak.set(category, streak);
      if (streak === 1 || streak % ARENA_ELO_FETCH_WARN_STREAK_INTERVAL === 0) {
        console.warn(
          `[ARENA_ELO_SYNC] Failed to fetch "${category}" leaderboard: ${message}` +
            (streak > 1 ? ` (${streak} consecutive failures; further warnings rate-limited)` : "")
        );
      }
      errors.push(message);
    }
  });

  await Promise.all(fetches);

  if (Object.keys(result).length === 0) {
    throw new Error(`All Arena leaderboard fetches failed: ${errors.join("; ")}`);
  }

  return result;
}

// ─── Core: Transform ─────────────────────────────────────

/**
 * Compute confidence level based on vote count.
 *
 * @param votes - Number of human preference votes.
 * @returns "high" (≥5000), "medium" (≥1000), or "low" (<1000).
 */
function computeConfidence(votes: number): "high" | "medium" | "low" {
  if (votes >= HIGH_CONFIDENCE_VOTES) return "high";
  if (votes >= MEDIUM_CONFIDENCE_VOTES) return "medium";
  return "low";
}

/**
 * Transform raw Arena leaderboard data into model intelligence entries.
 *
 * For each leaderboard category, normalizes ELO scores into task-fit values
 * in the range [0.4, 0.98] using the formula:
 *
 *   taskFit = 0.4 + 0.58 * ((elo - minElo) / (maxElo - minElo || 1))
 *
 * This ensures scores never reach 0 or 1, leaving room for user overrides.
 * Models with fewer than 100 votes are marked as confidence="low".
 *
 * Leaderboard categories are mapped to OmniRoute task types:
 * - "text" → default, review, documentation, debugging
 * - "code" → coding
 *
 * The leaderboard scores harness × effort combinations as separate entries
 * ("claude-opus-5-high", "claude-opus-5-max"), so a request for the bare id
 * would miss every row. Each variant that `resolveScoresAs()` resolves to a
 * routable base id therefore also contributes a synthesized base row carrying
 * the BEST task fit among that base's variants (the per-effort entries measure
 * the same weights at different budgets — the model's ceiling is the max, and
 * cost/latency are separate factors in the 12-factor score). An explicitly
 * measured base row is never lowered by synthesis.
 *
 * @param data - Map of leaderboard category → Arena leaderboard data.
 * @returns Array of model intelligence entries ready for DB upsert.
 */
export function transformToModelIntelligence(
  data: ArenaLeaderboardMap
): Array<Omit<ModelIntelligenceEntry, "syncedAt">> {
  const entries: Array<Omit<ModelIntelligenceEntry, "syncedAt">> = [];
  const expiresAt = new Date(Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000).toISOString();

  for (const [category, leaderboard] of Object.entries(data)) {
    const taskCategories = CATEGORY_TASK_MAP[category];
    if (!taskCategories) continue;

    const models = Array.isArray(leaderboard.models) ? leaderboard.models : [];
    if (models.length === 0) continue;

    // Compute ELO range for normalization
    const eloScores = models.map((m) => m.score);
    const minElo = Math.min(...eloScores);
    const maxElo = Math.max(...eloScores);
    const eloRange = maxElo - minElo || 1;

    for (const model of models) {
      const normalizedModel = normalizeModelName(model.model);
      const confidence = computeConfidence(model.votes);
      const taskFit = 0.4 + 0.58 * ((model.score - minElo) / eloRange);

      for (const taskCategory of taskCategories) {
        entries.push({
          model: normalizedModel,
          category: taskCategory,
          source: "arena_elo",
          score: Math.round(taskFit * 10000) / 10000,
          eloRaw: model.score,
          confidence,
          expiresAt,
        });
      }
    }
  }

  return withSynthesizedBaseRows(entries);
}

/**
 * Add one synthesized base row per (base, category) for every leaderboard entry
 * that is an effort/alias variant of a routable catalog id.
 *
 * Runs as a pass over the finished variant rows so that all variants of a base
 * are visible at once: the winner is the highest task fit, and it contributes
 * its own `eloRaw` and `confidence` (no invented confidence label — the column's
 * vocabulary stays high/medium/low). A base that the leaderboard measured
 * directly keeps its own row unless a variant scored strictly higher.
 *
 * Resolution never guesses: `resolveScoresAs` returning `via: null` means the
 * stripped base is not a catalog id, so nothing is synthesized for it.
 *
 * @param entries - Variant rows, one per (leaderboard entry, task category).
 * @returns The same rows plus the synthesized base rows.
 */
function withSynthesizedBaseRows(
  entries: Array<Omit<ModelIntelligenceEntry, "syncedAt">>
): Array<Omit<ModelIntelligenceEntry, "syncedAt">> {
  const keyOf = (model: string, category: string) => `${model}|${category}`;
  const indexByKey = new Map<string, number>();
  entries.forEach((entry, index) => indexByKey.set(keyOf(entry.model, entry.category), index));

  const best = new Map<string, Omit<ModelIntelligenceEntry, "syncedAt">>();
  for (const entry of entries) {
    const { base, via } = resolveScoresAs(entry.model);
    if (via === null || base === entry.model) continue;

    const key = keyOf(base, entry.category);
    const current = best.get(key);
    if (!current || entry.score > current.score) {
      best.set(key, { ...entry, model: base });
    }
  }

  const result = [...entries];
  for (const [key, candidate] of best) {
    const existingIndex = indexByKey.get(key);
    if (existingIndex === undefined) {
      result.push(candidate);
      continue;
    }
    // The leaderboard measured the base itself — only a strictly better variant wins.
    if (candidate.score > result[existingIndex].score) {
      result[existingIndex] = candidate;
    }
  }

  return result;
}

// ─── Main sync function ──────────────────────────────────

/**
 * Fetch, transform, and store Arena ELO intelligence data.
 *
 * Pipeline: delete expired → fetch leaderboards → transform → bulk upsert.
 * All errors are caught and logged — sync is never fatal.
 *
 * @param dryRun - If true, fetches and transforms but does not write to DB.
 * @returns Sync result with model count and success status.
 */
export async function syncArenaElo(dryRun = false): Promise<SyncResult> {
  if (syncInProgress) {
    return {
      success: false,
      modelCount: 0,
      source: "arena_elo",
      error: "Sync already in progress",
    };
  }
  syncInProgress = true;
  try {
    // Backup DB before first sync (same pattern as pricingSync)
    if (!firstSyncDone && !dryRun) {
      backupDbFile("pre-arena-elo-sync");
      firstSyncDone = true;
    }

    if (!dryRun) {
      // Freshness guard: a non-empty dataset synced within the interval is
      // still good — skip the fetch entirely (cheap fast path on boot).
      const latest = getLatestSyncedAt("arena_elo");
      if (latest) {
        const age = Date.now() - Date.parse(latest);
        if (Number.isFinite(age) && age >= 0 && age < SYNC_INTERVAL_MS) {
          return {
            success: true,
            modelCount: lastSyncModelCount,
            source: "arena_elo",
          };
        }
      }

      // Failure backoff: a recent failed sync means the upstream is probably
      // still rate-limited or down — skip instead of hammering it.
      const failedAt = readLastFailedAt();
      if (failedAt !== null && Date.now() - failedAt < BACKOFF_MS) {
        return {
          success: false,
          modelCount: 0,
          source: "arena_elo",
          error: "Skipping sync: recent failure within backoff window",
        };
      }
    }

    // Fetch FIRST — a failed fetch must never mutate stored intelligence
    // (the old delete-before-fetch order drained the table on every failed
    // sync while the upstream was rate-limiting; remediation 2026-09-12).
    const leaderboards = await fetchArenaLeaderboards();
    const entries = transformToModelIntelligence(leaderboards);

    if (!dryRun && entries.length > 0) {
      try {
        // Atomic replace: upsert all + prune not-in-refreshed-set in one tx.
        applyArenaEloRefresh(entries);
        clearLastFailedAt();
      } catch (err) {
        const message = getErrorMessage(err);
        console.warn(`[ARENA_ELO_SYNC] Failed to apply intelligence refresh: ${message}`);
        return {
          success: false,
          modelCount: 0,
          source: "arena_elo",
          error: message,
        };
      }
    }

    if (!dryRun) {
      lastSyncTime = new Date().toISOString();
      lastSyncModelCount = entries.length;
    }

    const countLabel = dryRun ? "would sync" : "synced";
    console.log(
      `[ARENA_ELO_SYNC] ${countLabel} ${entries.length} model intelligence entries from Arena leaderboards`
    );

    return {
      success: true,
      modelCount: entries.length,
      source: "arena_elo",
    };
  } catch (err) {
    const message = getErrorMessage(err);
    console.warn("[ARENA_ELO_SYNC] Sync failed:", message);
    if (!dryRun) {
      // Persist the failure so restarts/periodic ticks back off instead of
      // retrying a dead upstream in a loop.
      writeLastFailedAt(Date.now());
    }
    return {
      success: false,
      modelCount: 0,
      source: "arena_elo",
      error: message,
    };
  } finally {
    syncInProgress = false;
  }
}

// ─── Clear synced data ───────────────────────────────────

/**
 * Clear all synced intelligence data (arena_elo source).
 *
 * Iterates through all arena_elo entries and deletes them one by one,
 * since the DB module provides per-key deletion. This is used by the
 * DELETE /api/intelligence/sync endpoint.
 */
export function clearSyncedIntelligence(): void {
  const deleted = deleteModelIntelligenceBySource("arena_elo");
  console.log(`[ARENA_ELO_SYNC] Cleared ${deleted} arena_elo intelligence entries`);
}

// ─── Periodic sync ───────────────────────────────────────

/**
 * Start periodic Arena ELO sync (non-blocking).
 *
 * Performs an initial sync immediately, then schedules periodic syncs
 * at the configured interval. The timer is unref'd so it won't prevent
 * the Node.js process from exiting.
 *
 * @param intervalMs - Override interval in milliseconds (defaults to env or 86400s).
 */
function startPeriodicSync(intervalMs?: number): void {
  if (syncTimer) return; // Already running

  const interval = intervalMs ?? SYNC_INTERVAL_MS;
  activeSyncIntervalMs = interval;
  console.log(`[ARENA_ELO_SYNC] Starting periodic sync every ${interval / 1000}s`);

  // Initial sync (non-blocking)
  syncArenaElo()
    .then((result) => {
      if (result.success) {
        console.log(
          `[ARENA_ELO_SYNC] Initial sync complete: ${result.modelCount} model intelligence entries`
        );
      }
    })
    .catch((err) => {
      console.warn(
        "[ARENA_ELO_SYNC] Initial sync error:",
        err instanceof Error ? err.message : err
      );
    });

  syncTimer = setInterval(() => {
    syncArenaElo()
      .then((result) => {
        if (result.success) {
          console.log(`[ARENA_ELO_SYNC] Periodic sync complete: ${result.modelCount} entries`);
        }
      })
      .catch((err) => {
        console.warn(
          "[ARENA_ELO_SYNC] Periodic sync error:",
          err instanceof Error ? err.message : err
        );
      });
  }, interval);

  // Prevent the timer from keeping the process alive
  if (syncTimer && typeof syncTimer === "object" && "unref" in syncTimer) {
    (syncTimer as { unref?: () => void }).unref?.();
  }
}

/**
 * Stop periodic Arena ELO sync and clean up the timer.
 */
export function stopArenaEloSync(): void {
  if (syncTimer) {
    clearInterval(syncTimer);
    syncTimer = null;
    console.log("[ARENA_ELO_SYNC] Periodic sync stopped");
  }
}

/**
 * Get the current Arena ELO sync status.
 *
 * @returns Sync status including enabled flag, last sync time, model count,
 *   next scheduled sync time, interval, and active sources.
 */
export function getArenaEloSyncStatus(): SyncStatus {
  const enabled = getEffectiveArenaEloSyncEnabled();
  return {
    enabled,
    lastSync: lastSyncTime,
    lastSyncModelCount,
    nextSync:
      syncTimer && lastSyncTime
        ? new Date(new Date(lastSyncTime).getTime() + activeSyncIntervalMs).toISOString()
        : null,
    intervalMs: activeSyncIntervalMs,
    sources: ["arena_elo"],
  };
}

// ─── Init (called from instrumentation-node.ts) ───────────────────

/**
 * Initialize Arena ELO sync if enabled via feature flag configuration.
 *
 * Reads `ARENA_ELO_SYNC_ENABLED` (default: true; set to `false` to opt out)
 * through the feature flag resolver, so DB overrides from the dashboard apply.
 * When enabled, starts periodic sync with the interval from `ARENA_ELO_SYNC_INTERVAL`
 * (default: 86400 seconds / daily).
 *
 * All errors during initialization or the initial sync are caught and logged
 * — initialization is never fatal.
 */
export async function initArenaEloSync(): Promise<boolean> {
  if (!getEffectiveArenaEloSyncEnabled()) {
    console.log(
      "[ARENA_ELO_SYNC] Disabled by the effective ARENA_ELO_SYNC_ENABLED feature flag. Enable it from Dashboard Feature Flags, unset the env var, or set it to true to enable."
    );
    return false;
  }
  startPeriodicSync();
  return true;
}
