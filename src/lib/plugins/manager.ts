/**
 * Plugin manager — lifecycle management for plugins.
 *
 * Singleton that coordinates scanner, loader, DB, and hook registry.
 * Handles install, activate, deactivate, uninstall, scan, and startup loading.
 *
 * @module plugins/manager
 */

import { mkdir, cp, rm } from "fs/promises";
import { join, dirname } from "path";
import { randomUUID } from "crypto";
import { logger } from "../../../open-sse/utils/logger.ts";
import { getDefaultPluginDir, scanPluginDir } from "./scanner";
import { loadPlugin, type LoadedPlugin } from "./loader";
import { registerPlugin, unregisterPlugin } from "./index";
import {
  insertPlugin,
  getPluginByName,
  listPlugins as dbListPlugins,
  updatePluginStatus,
  deletePlugin as dbDeletePlugin,
  pluginExists,
  type PluginRow,
} from "../db/plugins";
import type { PluginManifestWithDefaults } from "./manifest";

const log = logger("PLUGIN_MANAGER");

class PluginManager {
  private static instance: PluginManager;
  private loadedPlugins: Map<string, LoadedPlugin> = new Map();
  private pluginDir: string;

  private constructor() {
    this.pluginDir = getDefaultPluginDir();
  }

  static getInstance(): PluginManager {
    if (!PluginManager.instance) {
      PluginManager.instance = new PluginManager();
    }
    return PluginManager.instance;
  }

  /**
   * Install a plugin from a source directory.
   * Copies to plugin dir, validates manifest, registers in DB.
   */
  async install(sourceDir: string): Promise<PluginRow> {
    const { plugins, errors } = await scanPluginDir(sourceDir);
    if (plugins.length === 0) {
      throw new Error(
        `No valid plugin found in ${sourceDir}: ${errors.map((e) => e.error).join(", ")}`
      );
    }

    const discovered = plugins[0];
    const { name, manifest, pluginDir: srcDir } = discovered;

    // Check if already installed
    if (pluginExists(name)) {
      throw new Error(`Plugin '${name}' is already installed`);
    }

    // Copy to plugin directory
    const destDir = join(this.pluginDir, name);
    await mkdir(dirname(destDir), { recursive: true });
    await cp(srcDir, destDir, { recursive: true });

    // Register in DB
    const row = insertPlugin({
      id: randomUUID(),
      name,
      version: manifest.version,
      description: manifest.description,
      author: manifest.author,
      license: manifest.license,
      main: manifest.main,
      source: manifest.source,
      tags: manifest.tags,
      manifest: manifest as unknown as Record<string, unknown>,
      configSchema: manifest.configSchema as unknown as Record<string, unknown>,
      hooks: [
        manifest.hooks.onRequest && "onRequest",
        manifest.hooks.onResponse && "onResponse",
        manifest.hooks.onError && "onError",
      ].filter(Boolean) as string[],
      permissions: manifest.requires.permissions,
      pluginDir: destDir,
      enabled: manifest.enabledByDefault,
    });

    log.info("manager.installed", { name, version: manifest.version });

    // Auto-activate if enabledByDefault
    if (manifest.enabledByDefault) {
      await this.activate(name);
    }

    return row;
  }

  /**
   * Activate a plugin — load into VM, register hooks, update DB.
   */
  async activate(name: string): Promise<void> {
    const row = getPluginByName(name);
    if (!row) throw new Error(`Plugin '${name}' not found`);
    if (row.status === "active") return;

    const manifest = JSON.parse(row.manifest) as PluginManifestWithDefaults;
    const entryPoint = join(row.pluginDir, manifest.main);

    try {
      const loaded = await loadPlugin(entryPoint, manifest);

      // Register hooks with the existing plugin system
      registerPlugin(loaded.plugin);

      this.loadedPlugins.set(name, loaded);
      updatePluginStatus(name, "active");

      log.info("manager.activated", { name });
    } catch (err: any) {
      updatePluginStatus(name, "error", err.message);
      log.error("manager.activate_failed", { name, error: err.message });
      throw err;
    }
  }

  /**
   * Deactivate a plugin — unregister hooks, update DB.
   */
  async deactivate(name: string): Promise<void> {
    const loaded = this.loadedPlugins.get(name);
    if (loaded) {
      unregisterPlugin(name);
      loaded.cleanup();
      this.loadedPlugins.delete(name);
    }

    updatePluginStatus(name, "inactive");
    log.info("manager.deactivated", { name });
  }

  /**
   * Uninstall a plugin — deactivate, delete directory, remove from DB.
   */
  async uninstall(name: string): Promise<void> {
    const row = getPluginByName(name);
    if (!row) throw new Error(`Plugin '${name}' not found`);

    // Deactivate first if active
    if (row.status === "active") {
      await this.deactivate(name);
    }

    // Delete plugin directory
    try {
      await rm(row.pluginDir, { recursive: true, force: true });
    } catch (err: any) {
      log.warn("manager.uninstall_dir_error", { name, error: err.message });
    }

    // Remove from DB
    dbDeletePlugin(name);
    log.info("manager.uninstalled", { name });
  }

  /**
   * Scan plugin directory and sync with DB.
   * Discovers new plugins and marks missing ones.
   */
  async scan(): Promise<{ discovered: number; errors: Array<{ name: string; error: string }> }> {
    const { plugins, errors } = await scanPluginDir(this.pluginDir);

    // Register newly discovered plugins that aren't in DB
    for (const discovered of plugins) {
      if (!pluginExists(discovered.name)) {
        try {
          insertPlugin({
            id: randomUUID(),
            name: discovered.name,
            version: discovered.manifest.version,
            description: discovered.manifest.description,
            author: discovered.manifest.author,
            license: discovered.manifest.license,
            main: discovered.manifest.main,
            source: discovered.manifest.source,
            tags: discovered.manifest.tags,
            manifest: discovered.manifest as unknown as Record<string, unknown>,
            configSchema: discovered.manifest.configSchema as unknown as Record<string, unknown>,
            hooks: [
              discovered.manifest.hooks.onRequest && "onRequest",
              discovered.manifest.hooks.onResponse && "onResponse",
              discovered.manifest.hooks.onError && "onError",
            ].filter(Boolean) as string[],
            permissions: discovered.manifest.requires.permissions,
            pluginDir: discovered.pluginDir,
            enabled: discovered.manifest.enabledByDefault,
          });
        } catch (err: any) {
          errors.push({ name: discovered.name, error: `DB insert failed: ${err.message}` });
        }
      }
    }

    return { discovered: plugins.length, errors };
  }

  /**
   * Load all active plugins on startup.
   */
  async loadAll(): Promise<void> {
    const rows = dbListPlugins("active");
    log.info("manager.loadAll", { count: rows.length });

    for (const row of rows) {
      try {
        await this.activate(row.name);
      } catch (err: any) {
        log.error("manager.loadAll_failed", { name: row.name, error: err.message });
      }
    }
  }

  /**
   * Get a loaded plugin by name.
   */
  getLoaded(name: string): LoadedPlugin | undefined {
    return this.loadedPlugins.get(name);
  }

  /**
   * List all plugins from DB.
   */
  listAll(): PluginRow[] {
    return dbListPlugins();
  }

  /**
   * Get plugin by name from DB.
   */
  getPlugin(name: string): PluginRow | null {
    return getPluginByName(name);
  }
}

export const pluginManager = PluginManager.getInstance();
