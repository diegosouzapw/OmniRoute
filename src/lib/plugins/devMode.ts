/**
 * Plugin dev mode — hot-reload on file changes.
 *
 * Watches plugin directory for changes and triggers deactivate+activate cycle.
 *
 * @module plugins/devMode
 */

import { watch, type FSWatcher } from "fs";
import { logger } from "../../../open-sse/utils/logger.ts";

const log = logger("PLUGIN_DEV_MODE");

let watcher: FSWatcher | null = null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
const DEBOUNCE_MS = 500;

type ReloadFn = (pluginName: string) => Promise<void>;

/**
 * Start dev mode — watch plugin directory for changes.
 */
export function startDevMode(pluginDir: string, reloadFn: ReloadFn): void {
  if (watcher) return;

  watcher = watch(pluginDir, { recursive: true }, (_eventType, filename) => {
    if (!filename) return;

    // Extract plugin name from path (first segment)
    const pluginName = filename.split("/")[0];
    if (!pluginName || pluginName.startsWith(".")) return;

    // Debounce rapid changes
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      log.info("devMode.file_changed", { pluginName, file: filename });
      try {
        await reloadFn(pluginName);
        log.info("devMode.reloaded", { pluginName });
      } catch (err: unknown) {
        log.error("devMode.reload_failed", {
          pluginName,
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }, DEBOUNCE_MS);
  });

  log.info("devMode.started", { pluginDir });
}

/**
 * Stop dev mode — clean up watcher and timers.
 */
export function stopDevMode(): void {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
  if (watcher) {
    watcher.close();
    watcher = null;
  }
  log.info("devMode.stopped");
}
