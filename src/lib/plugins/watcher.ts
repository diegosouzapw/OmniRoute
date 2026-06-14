/**
 * Plugin directory watcher — monitors plugin dirs for changes and auto-reloads.
 *
 * Uses fs.watch with 500ms debounce to avoid rapid reloads.
 *
 * @module plugins/watcher
 */

import { watch, type FSWatcher } from "fs";
import { logger } from "../../../open-sse/utils/logger.ts";

const log = logger("PLUGIN_WATCHER");

const DEBOUNCE_MS = 500;

interface WatcherEntry {
  watcher: FSWatcher;
  pluginName: string;
  debounceTimer: ReturnType<typeof setTimeout> | null;
}

const watchers = new Map<string, WatcherEntry>();

type ReloadFn = (name: string) => Promise<void>;

/**
 * Start watching a plugin directory for changes.
 * Calls reload(pluginName) when files change (debounced).
 */
export function startWatching(pluginDir: string, pluginName: string, reload: ReloadFn): void {
  if (watchers.has(pluginDir)) return;

  const entry: WatcherEntry = { watcher: null as unknown as FSWatcher, pluginName, debounceTimer: null };

  try {
    entry.watcher = watch(pluginDir, { recursive: false }, (eventType, filename) => {
      if (!filename) return;
      if (filename === "node_modules" || filename.startsWith(".")) return;

      log.info("watcher.change", { pluginName, file: filename, event: eventType });

      if (entry.debounceTimer) clearTimeout(entry.debounceTimer);
      entry.debounceTimer = setTimeout(async () => {
        entry.debounceTimer = null;
        try {
          await reload(pluginName);
          log.info("watcher.reloaded", { pluginName });
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          log.error("watcher.reload_failed", { pluginName, error: msg });
        }
      }, DEBOUNCE_MS);
    });

    watchers.set(pluginDir, entry);
    log.info("watcher.started", { pluginName, dir: pluginDir });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    log.error("watcher.start_failed", { pluginName, error: msg });
  }
}

/**
 * Stop watching a plugin directory.
 */
export function stopWatching(pluginDir: string): void {
  const entry = watchers.get(pluginDir);
  if (!entry) return;

  if (entry.debounceTimer) clearTimeout(entry.debounceTimer);
  try { entry.watcher.close(); } catch {}
  watchers.delete(pluginDir);
  log.info("watcher.stopped", { pluginName: entry.pluginName, dir: pluginDir });
}

/**
 * Stop all watchers.
 */
export function stopAllWatchers(): void {
  for (const dir of watchers.keys()) {
    stopWatching(dir);
  }
}

/**
 * Get count of active watchers (for diagnostics).
 */
export function getWatcherCount(): number {
  return watchers.size;
}
