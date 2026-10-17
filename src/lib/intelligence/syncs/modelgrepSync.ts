/**
 * modelgrepSync.ts — Modelgrep benchmark snapshot sync.
 *
 * Fetches model intelligence data from the Modelgrep API and stores
 * normalized task-fit scores in the `model_intelligence` DB table.
 * Source literal: "modelgrep_intel"
 *
 * Schedule: daily at 06:00 UTC (cron: '0 6 * * *')
 * Expiry: 24 hours after sync.
 */

import { IntelligenceSync } from "./sharedSync";
import { transformModelgrep } from "../transforms/modelgrep";
import type { ModelIntelligenceEntry } from "@/lib/db/modelIntelligence";
import { getLatestSyncedAt, applyArenaEloRefresh } from "@/lib/db/modelIntelligence";

/** Modelgrep API response entry shape. */
export interface ModelgrepEntry {
  model?: string;
  name?: string;
  benchmarks?: Record<string, number> | null;
}

/** Modelgrep API response envelope. */
export interface ModelgrepResponse {
  models: ModelgrepEntry[];
  fetchedAt: string;
}

/** Sync result shape. */
export interface SyncResult {
  success: boolean;
  modelCount: number;
  source: string;
  error?: string;
}

/** Modelgrep API base URL (env-overridable for tests/staging). */
const MODELGREP_API_BASE = (typeof process !== "undefined" && process.env.MODELGREP_API_BASE) || "https://api.modelgrep.dev/v1/benchmark";

/** Default sync interval in ms (24h). */
const DEFAULT_INTERVAL_MS = 24 * 60 * 60 * 1000;

/** Backoff on failure: 6h (interval/4). */
const BACKOFF_MS = DEFAULT_INTERVAL_MS / 4;

/** Default sync schedule: daily at 06:00 UTC. */
const SCHEDULE_CRON = "0 6 * * *";

const KV_NAMESPACE = "modelgrep_intel";
const KV_LAST_FAILED_KEY = "lastFailedAt";
const KV_LAST_SYNC_KEY = "lastSyncAt";

let syncTimer: ReturnType<typeof setInterval> | null = null;
let lastSyncTime: string | null = null;
let lastSyncModelCount = 0;
let activeSyncIntervalMs = DEFAULT_INTERVAL_MS;
let firstSyncDone = false;
let syncInProgress = false;

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

async function getEffectiveModelgrepSyncEnabled(): Promise<boolean> {
  try {
    const { isFeatureFlagEnabled } = await import("@/shared/utils/featureFlags");
    return isFeatureFlagEnabled("MODEL_INTEL_MODELGREP_ENABLED");
  } catch (error) {
    console.warn(
      `[MODELGREP_SYNC] Failed to resolve MODEL_INTEL_MODELGREP_ENABLED feature flag: ${getErrorMessage(error)}`
    );
    return (typeof process !== "undefined" && process.env.MODEL_INTEL_MODELGREP_ENABLED !== "false");
  }
}

/**
 * Modelgrep sync implementation.
 */
export class ModelgrepSync extends IntelligenceSync<ModelgrepResponse, ModelgrepEntry> {
  constructor() {
    super("modelgrep_intel", KV_NAMESPACE, BACKOFF_MS);
  }

  /** Fetch modelgrep benchmark snapshot from API. */
  async fetch(): Promise<ModelgrepResponse> {
    const response = await fetch(MODELGREP_API_BASE, {
      signal: AbortSignal.timeout(30_000),
    });
    if (!response.ok) {
      throw new Error(
        `Modelgrep API fetch failed [${response.status}]: ${response.statusText}`
      );
    }
    const text = await response.text();
    try {
      return JSON.parse(text) as ModelgrepResponse;
    } catch {
      throw new Error(
        `Modelgrep API returned invalid JSON (${text.slice(0, 100)}...)`
      );
    }
  }

  /** Transform fetched response into normalized entries. */
  transform(response: ModelgrepResponse): Array<Omit<ModelIntelligenceEntry, "syncedAt">> {
    return transformModelgrep(response.models);
  }

  /** Determine if this sync is enabled. */
  async getEnabled(): Promise<boolean> {
    return getEffectiveModelgrepSyncEnabled();
  }

  /** Execute one sync cycle. */
  async sync(dryRun = false): Promise<SyncResult> {
    if (syncInProgress) {
      return {
        success: false,
        modelCount: 0,
        source: this.config.source,
        error: "Sync already in progress",
      };
    }
    syncInProgress = true;

    try {
      if (!firstSyncDone && !dryRun) {
        const { backupDbFile } = await import("@/lib/db/backup");
        backupDbFile("pre-modelgrep-sync");
        firstSyncDone = true;
      }

      if (!dryRun) {
        const latest = await getLatestSyncedAt("modelgrep_intel");
        if (latest) {
          const age = Date.now() - Date.parse(latest);
          if (Number.isFinite(age) && age >= 0 && age < activeSyncIntervalMs) {
            return {
              success: true,
              modelCount: lastSyncModelCount,
              source: this.config.source,
            };
          }
        }

        const failedAt = await this.readTimestamp(KV_LAST_FAILED_KEY);
        if (failedAt !== null && Date.now() - failedAt < BACKOFF_MS) {
          return {
            success: false,
            modelCount: 0,
            source: this.config.source,
            error: "Skipping sync: recent failure within backoff window",
          };
        }
      }

      const data = await this.fetch();
      const entries = this.transform(data);

      if (!dryRun && entries.length > 0) {
        try {
          await applyArenaEloRefresh(entries, "modelgrep_intel");
          await this.clearTimestamp(KV_LAST_FAILED_KEY);
        } catch (err) {
          const message = getErrorMessage(err);
          console.warn(`[MODELGREP_SYNC] Failed to apply intelligence refresh: ${message}`);
          this.recordFailure(err);
          return {
            success: false,
            modelCount: 0,
            source: this.config.source,
            error: message,
          };
        }
      }

      if (!dryRun) {
        lastSyncTime = new Date().toISOString();
        lastSyncModelCount = entries.length;
        await this.writeTimestamp(KV_LAST_SYNC_KEY, Date.now());
      }

      const countLabel = dryRun ? "would sync" : "synced";
      console.log(
        `[MODELGREP_SYNC] ${countLabel} ${entries.length} model intelligence entries from Modelgrep`
      );

      this.recordSuccess();
      return {
        success: true,
        modelCount: entries.length,
        source: this.config.source,
      };
    } catch (err) {
      const message = getErrorMessage(err);
      console.warn("[MODELGREP_SYNC] Sync failed:", message);
      if (!dryRun) {
        await this.writeTimestamp(KV_LAST_FAILED_KEY, Date.now());
      }
      this.recordFailure(err);
      return {
        success: false,
        modelCount: 0,
        source: this.config.source,
        error: message,
      };
    } finally {
      syncInProgress = false;
    }
  }

  /** Get current sync status. */
  async getStatus() {
    const enabled = await this.getEnabled();
    return {
      enabled,
      lastSync: lastSyncTime,
      lastSyncModelCount,
      nextSync:
        syncTimer !== null && lastSyncTime
          ? new Date(new Date(lastSyncTime).getTime() + activeSyncIntervalMs).toISOString()
          : null,
      intervalMs: activeSyncIntervalMs,
      sources: ["modelgrep_intel"],
      scheduleCron: SCHEDULE_CRON,
    };
  }
}

export function startPeriodicSync(intervalMs?: number): void {
  if (syncTimer !== null) return;

  const interval = intervalMs ?? DEFAULT_INTERVAL_MS;
  activeSyncIntervalMs = interval;
  console.log(`[MODELGREP_SYNC] Starting periodic sync every ${interval / 1000}s (cron: ${SCHEDULE_CRON})`);

  const modelgrepSync = new ModelgrepSync();
  modelgrepSync.sync().catch((err) => {
    console.warn(
      "[MODELGREP_SYNC] Initial sync error:",
      err instanceof Error ? err.message : err
    );
  });

  syncTimer = setInterval(() => {
    modelgrepSync
      .sync()
      .then((result) => {
        if (result.success) {
          console.log(`[MODELGREP_SYNC] Periodic sync complete: ${result.modelCount} entries`);
        }
      })
      .catch((err) => {
        console.warn(
          "[MODELGREP_SYNC] Periodic sync error:",
          err instanceof Error ? err.message : err
        );
      });
  }, interval);

  if (syncTimer && typeof syncTimer === "object" && "unref" in syncTimer) {
    syncTimer.unref?.();
  }
}

export function stopModelgrepSync(): void {
  if (syncTimer !== null) {
    clearInterval(syncTimer);
    syncTimer = null;
    console.log("[MODELGREP_SYNC] Periodic sync stopped");
  }
}

export async function initModelgrepSync(): Promise<boolean> {
  const enabled = await getEffectiveModelgrepSyncEnabled();
  if (!enabled) {
    console.log(
      "[MODELGREP_SYNC] Disabled by feature flag. Set MODEL_INTEL_MODELGREP_ENABLED=true to enable."
    );
    return false;
  }
  startPeriodicSync();
  return true;
}