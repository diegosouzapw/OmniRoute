/**
 * arenaEloSync.ts — Arena AI leaderboard ELO sync engine.
 *
 * Fetches model intelligence data from the Arena AI leaderboard API
 * (https://api.wulong.dev/arena-ai-leaderboards/v1/leaderboard) and stores
 * normalised task-fit scores in the `model_intelligence` DB table.
 *
 * Resolution order: user overrides > synced arena ELO > defaults
 *
 * Opt-in via ARENA_ELO_SYNC_ENABLED=true (default: false).
 */

import { backupDbFile } from "./db/backup";
import {
  bulkUpsertModelIntelligence,
  deleteExpiredIntelligence,
  deleteModelIntelligenceBySource,
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

const ARENA_ELO_API_BASE =
  "https://api.wulong.dev/arena-ai-leaderboards/v1/leaderboard";

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
  "phind/",
  "zerox/",
  "together/",
  "fireworks/",
  "perplexity/",
  "ai21/",
] as const;

/**
 * OmniRoute model aliases: canonical name → known aliases.
 * Creates additional DB entries for each alias so that models
 * are findable under any name OmniRoute uses internally.
 */
const MODEL_ALIAS_MAP: Record<string, string[]> = {
  "claude-opus-4-6-thinking": ["claude-opus-4", "anthropic/claude-opus-4"],
  "claude-sonnet-4-5": ["claude-sonnet-4.5", "anthropic/claude-sonnet-4.5"],
  "gpt-5.5": ["openai/gpt-5.5", "gpt-5"],
  "gemini-3-flash": ["google/gemini-3-flash", "gemini-flash"],
  "deepseek-r1": ["deepseek/deepseek-r1", "if/deepseek-r1"],
  "kimi-k2-thinking": ["moonshot/kimi-k2", "qw/kimi-k2"],
  "qwen3-coder-plus": ["qw/qwen3-coder-plus", "alibaba/qwen3-coder"],
  "llama-4": ["meta/llama-4", "llama4"],
};

/** Votes threshold for "high" confidence. */
const HIGH_CONFIDENCE_VOTES = 5000;

/** Votes threshold for "medium" confidence. */
const MEDIUM_CONFIDENCE_VOTES = 1000;

/** Intelligence entry expiration: 7 days after sync. */
const EXPIRY_DAYS = 7;

const parsedInterval = parseInt(process.env.ARENA_ELO_SYNC_INTERVAL || "86400", 10);
const SYNC_INTERVAL_MS =
  Number.isFinite(parsedInterval) && parsedInterval > 0
    ? parsedInterval * 1000
    : 86400 * 1000;

// ─── Periodic sync state ─────────────────────────────────

let syncTimer: ReturnType<typeof setInterval> | null = null;
let lastSyncTime: string | null = null;
let lastSyncModelCount = 0;
let activeSyncIntervalMs = SYNC_INTERVAL_MS;
let firstSyncDone = false;
let syncInProgress = false;

// ─── Model name normalization ────────────────────────────

/**
 * Normalize a model name from the Arena leaderboard.
 *
 * Lowercases the name and strips known vendor prefixes
 * (e.g. "anthropic/claude-opus-4" → "claude-opus-4").
 *
 * @param rawName - The raw model name from the API response.
 * @returns The cleaned, lowercase model name.
 */
export function normalizeModelName(rawName: string): string {
  let name = rawName.toLowerCase();
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
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn(`[ARENA_ELO_SYNC] Failed to fetch "${category}" leaderboard: ${message}`);
      errors.push(message);
    }
  });

  await Promise.all(fetches);

  if (Object.keys(result).length === 0) {
    throw new Error(
      `All Arena leaderboard fetches failed: ${errors.join("; ")}`
    );
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
 * Known OmniRoute model aliases are also expanded into additional entries.
 *
 * @param data - Map of leaderboard category → Arena leaderboard data.
 * @returns Array of model intelligence entries ready for DB upsert.
 */
export function transformToModelIntelligence(
  data: ArenaLeaderboardMap
): Array<Omit<ModelIntelligenceEntry, "syncedAt">> {
  const entries: Array<Omit<ModelIntelligenceEntry, "syncedAt">> = [];
  const expiresAt = new Date(
    Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();

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
        const entry: Omit<ModelIntelligenceEntry, "syncedAt"> = {
          model: normalizedModel,
          category: taskCategory,
          source: "arena_elo",
          score: Math.round(taskFit * 10000) / 10000,
          eloRaw: model.score,
          confidence,
          expiresAt,
        };
        entries.push(entry);

        // Expand known aliases
        const aliases = MODEL_ALIAS_MAP[normalizedModel];
        if (aliases) {
          for (const alias of aliases) {
            entries.push({
              ...entry,
              model: alias,
            });
          }
        }
      }
    }
  }

  return entries;
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

    // Clean up stale entries before writing new ones
    if (!dryRun) {
      try {
        deleteExpiredIntelligence();
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.warn(
          `[ARENA_ELO_SYNC] Failed to delete expired intelligence: ${message}`
        );
      }
    }

    const leaderboards = await fetchArenaLeaderboards();
    const entries = transformToModelIntelligence(leaderboards);

    if (!dryRun && entries.length > 0) {
      try {
        bulkUpsertModelIntelligence(entries);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.warn(
          `[ARENA_ELO_SYNC] Failed to bulk upsert intelligence: ${message}`
        );
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
    const message = err instanceof Error ? err.message : String(err);
    console.warn("[ARENA_ELO_SYNC] Sync failed:", message);
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
  console.log(
    `[ARENA_ELO_SYNC] Starting periodic sync every ${interval / 1000}s`
  );

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
          console.log(
            `[ARENA_ELO_SYNC] Periodic sync complete: ${result.modelCount} entries`
          );
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
  const enabled = process.env.ARENA_ELO_SYNC_ENABLED === "true";
  return {
    enabled,
    lastSync: lastSyncTime,
    lastSyncModelCount,
    nextSync:
      syncTimer && lastSyncTime
        ? new Date(
            new Date(lastSyncTime).getTime() + activeSyncIntervalMs
          ).toISOString()
        : null,
    intervalMs: activeSyncIntervalMs,
    sources: ["arena_elo"],
  };
}

// ─── Init (called from server-init.ts) ───────────────────

/**
 * Initialize Arena ELO sync if enabled via environment variable.
 *
 * Reads `ARENA_ELO_SYNC_ENABLED` (default: false). When enabled,
 * starts periodic sync with the interval from `ARENA_ELO_SYNC_INTERVAL`
 * (default: 86400 seconds / daily).
 *
 * All errors during initialization or the initial sync are caught and logged
 * — initialization is never fatal.
 */
export async function initArenaEloSync(): Promise<void> {
  if (process.env.ARENA_ELO_SYNC_ENABLED !== "true") {
    console.log(
      "[ARENA_ELO_SYNC] Disabled (set ARENA_ELO_SYNC_ENABLED=true to enable)"
    );
    return;
  }
  startPeriodicSync();
}
