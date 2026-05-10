/**
 * Database compression scheduler - runs compression tasks based on settings.
 *
 * @module lib/db/compressionScheduler
 */

import { getDbInstance } from "./core";
import { getSettings } from "@/lib/localDb";

interface CompressionScheduleSettings {
  enabled: boolean;
  intervalHours: number;
  lastRun?: string;
}

/**
 * Run scheduled compression based on database settings.
 * Should be called on startup and periodically.
 */
export async function runScheduledCompression(): Promise<void> {
  const db = getDbInstance();
  const settings = await getSettings();

  const compressionSettings = (settings.databaseSettings as any)?.compression as
    | CompressionScheduleSettings
    | undefined;

  if (!compressionSettings?.enabled) {
    console.log("[CompressionScheduler] Compression scheduling is disabled");
    return;
  }

  const intervalHours = compressionSettings.intervalHours ?? 24;
  const lastRun = compressionSettings.lastRun ? new Date(compressionSettings.lastRun) : null;

  const now = new Date();
  const hoursSinceLastRun = lastRun
    ? (now.getTime() - lastRun.getTime()) / (1000 * 60 * 60)
    : Infinity;

  if (hoursSinceLastRun < intervalHours) {
    console.log(
      `[CompressionScheduler] Skipping compression - last run was ${hoursSinceLastRun.toFixed(1)}h ago (interval: ${intervalHours}h)`
    );
    return;
  }

  console.log("[CompressionScheduler] Running scheduled compression...");

  try {
    // Run VACUUM to reclaim space
    db.prepare("VACUUM").run();
    console.log("[CompressionScheduler] VACUUM completed");

    // Run ANALYZE to update statistics
    db.prepare("ANALYZE").run();
    console.log("[CompressionScheduler] ANALYZE completed");

    const updateStmt = db.prepare(`
      INSERT OR REPLACE INTO key_value (namespace, key, value)
      VALUES ('settings', 'databaseSettings', json_set(
        COALESCE((SELECT value FROM key_value WHERE namespace = 'settings' AND key = 'databaseSettings'), '{}'),
        '$.compression.lastRun',
        ?
      ))
    `);
    updateStmt.run(now.toISOString());

    console.log("[CompressionScheduler] Compression completed successfully");
  } catch (err: any) {
    console.error("[CompressionScheduler] Error during compression:", err);
    throw err;
  }
}

/**
 * Initialize compression scheduler on startup.
 * Call this once when the application starts.
 */
export async function initCompressionScheduler(): Promise<void> {
  console.log("[CompressionScheduler] Initializing compression scheduler...");

  try {
    await runScheduledCompression();
  } catch (err: any) {
    console.error("[CompressionScheduler] Failed to run initial compression:", err);
  }

  // Set up periodic check (every hour)
  setInterval(
    async () => {
      try {
        await runScheduledCompression();
      } catch (err: any) {
        console.error("[CompressionScheduler] Periodic compression check failed:", err);
      }
    },
    60 * 60 * 1000
  ); // 1 hour
}
