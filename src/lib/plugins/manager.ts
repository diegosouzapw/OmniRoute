/**
 * Plugin manager — lifecycle management for plugins.
 *
 * Singleton that coordinates scanner, loader, DB, and hook registry.
 * Handles install, activate, deactivate, uninstall, scan, and startup loading.
 *
 * @module plugins/manager
 */

import { mkdir, cp, rm, rename, realpath, readFile } from "fs/promises";
import { join, dirname, resolve, sep } from "path";
import { randomUUID } from "crypto";
import { logger } from "../../../open-sse/utils/logger.ts";
import { getDefaultPluginDir, scanPluginDir } from "./scanner";
import { loadPlugin, type LoadedPlugin } from "./loader";
import { registerHook, unregisterHooks } from "./hooks";
import {
  insertPlugin,
  getPluginByName,
  listPlugins as dbListPlugins,
  updatePluginStatus,
  updatePluginConfig,
  deletePlugin as dbDeletePlugin,
  pluginExists,
  type PluginRow,
} from "../db/plugins";
import type { PluginManifestWithDefaults } from "./manifest";

const log = logger("PLUGIN_MANAGER");

/**
 * Compare two semver strings. Returns positive if a > b, negative if a < b, 0 if equal.
 * Only handles simple MAJOR.MINOR.PATCH — no pre-release tags.
 *
 * NaN-safe: strips a `-prerelease` suffix before parsing so a legacy DB value like
 * `1.0.0-beta` doesn't produce NaN comparisons and silently compare equal to `1.0.0`.
 * Non-numeric segments (after stripping) are coerced to 0.
 *
 * Exported for unit testing only — prefer pluginManager methods for production use.
 */
export function compareSemver(a: string, b: string): number {
  // Strip optional pre-release suffix (e.g. "-beta", "-rc.1") before parsing
  const stripPreRelease = (v: string) => v.replace(/-.*$/, "");
  const parse = (v: string) =>
    stripPreRelease(v)
      .split(".")
      .map((s) => {
        const n = Number(s);
        return Number.isNaN(n) ? 0 : n;
      });
  const [aMaj, aMin, aPat] = parse(a);
  const [bMaj, bMin, bPat] = parse(b);
  if (aMaj !== bMaj) return aMaj - bMaj;
  if (aMin !== bMin) return aMin - bMin;
  return aPat - bPat;
}

// ── SECURITY: CRITICAL-2 ────────────────────────────────────────────────────
/**
 * Assert that `target` is strictly contained within `pluginRoot`.
 * Prevents a tampered/legacy DB `pluginDir` from causing deletion of an
 * arbitrary filesystem path when passed to `rm({ recursive: true })`.
 *
 * Throws immediately if `target` resolves outside `pluginRoot`.
 */
function assertWithinPluginDir(pluginRoot: string, target: string): void {
  const root = resolve(pluginRoot);
  const t = resolve(target);
  if (t !== root && !t.startsWith(root + sep)) {
    throw new Error(
      `Refusing to delete a path outside the plugin directory: "${t}" is not under "${root}"`
    );
  }
}

// ── SECURITY: CRITICAL-3 (shared) ──────────────────────────────────────────
/**
 * Assert that `entryPoint` is strictly within `destDir`.
 * Called at install/upgrade time to reject `manifest.main` values like
 * `"../../evil.js"` before the plugin is ever persisted to DB.
 *
 * Throws if the resolved entryPoint escapes `destDir`.
 */
function assertEntryPointWithinDest(destDir: string, entryPoint: string): void {
  const root = resolve(destDir);
  const ep = resolve(entryPoint);
  if (!ep.startsWith(root + sep)) {
    throw new Error(
      `Plugin manifest.main resolves outside plugin directory: "${ep}" escapes "${root}"`
    );
  }
}

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
   * Copies to a staging dir first, validates manifest.main containment, then
   * atomically renames into place. Cleans up staging dir on any failure.
   */
  async install(sourceDir: string): Promise<PluginRow> {
    // Check if sourceDir itself contains plugin.json (direct plugin dir)
    const { safeValidateManifest } = await import("./manifest");
    const { readFile: readFileFs } = await import("fs/promises");
    let directPlugin: {
      name: string;
      manifest: any;
      pluginDir: string;
      entryPoint: string;
    } | null = null;

    try {
      const manifestPath = join(sourceDir, "plugin.json");
      const raw = await readFileFs(manifestPath, "utf-8");
      const parsed = JSON.parse(raw);
      const result = safeValidateManifest(parsed);
      if (result.success) {
        const entryPoint = join(sourceDir, result.data.main);
        directPlugin = {
          name: result.data.name,
          manifest: result.data,
          pluginDir: sourceDir,
          entryPoint,
        };
      }
    } catch {}

    const { plugins, errors } = directPlugin
      ? { plugins: [directPlugin], errors: [] }
      : await scanPluginDir(sourceDir);

    if (plugins.length === 0) {
      throw new Error(
        `No valid plugin found in ${sourceDir}: ${errors.map((e) => e.error).join(", ")}`
      );
    }

    const discovered = plugins[0];
    const { name, manifest, pluginDir: srcDir } = discovered;

    // If already installed, auto-upgrade when source is strictly newer; reject otherwise.
    if (pluginExists(name)) {
      const existing = getPluginByName(name)!;
      if (compareSemver(manifest.version, existing.version) > 0) {
        // Source is newer — delegate to upgrade()
        return this.upgrade(sourceDir);
      }
      throw new Error(
        `Plugin '${name}' is already installed (${existing.version}) and source version ${manifest.version} is not newer`
      );
    }

    // CRITICAL-3: Copy to staging dir first, validate, then rename atomically.
    const destDir = join(this.pluginDir, name);
    const stagingDir = `${destDir}.staging-${randomUUID()}`;
    await mkdir(dirname(destDir), { recursive: true });
    await cp(srcDir, stagingDir, { recursive: true });

    try {
      // CRITICAL-3: Validate manifest.main is within the staging dir before persisting.
      const entryPoint = join(stagingDir, manifest.main || "index.js");
      assertEntryPointWithinDest(stagingDir, entryPoint);

      // Atomic: rename staging → final dest
      await rename(stagingDir, destDir);
    } catch (err) {
      // Cleanup staging dir so no half-installed directory is left behind.
      await rm(stagingDir, { recursive: true, force: true }).catch(() => {});
      throw err;
    }

    // Register in DB (destDir is now in place)
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
   * Upgrade an installed plugin to a newer version from sourceDir.
   * Preserves nothing (clean reinstall); config is reset to defaults.
   * Throws if the plugin is not installed or the source version is not strictly newer.
   *
   * Atomically: copy to staging → validate → rm old (containment-checked) → rename staging.
   * On any failure after staging copy, staging is cleaned up and old install is left intact.
   */
  async upgrade(sourceDir: string): Promise<PluginRow> {
    // Scan source to get new manifest
    const { safeValidateManifest } = await import("./manifest");
    const { readFile: readFileFs } = await import("fs/promises");

    let discovered: { name: string; manifest: any; pluginDir: string } | null = null;

    // Try direct plugin dir first
    try {
      const manifestPath = join(sourceDir, "plugin.json");
      const raw = await readFileFs(manifestPath, "utf-8");
      const parsed = JSON.parse(raw);
      const result = safeValidateManifest(parsed);
      if (result.success) {
        discovered = { name: result.data.name, manifest: result.data, pluginDir: sourceDir };
      }
    } catch {}

    if (!discovered) {
      const { plugins, errors } = await scanPluginDir(sourceDir);
      if (plugins.length === 0) {
        throw new Error(
          `No valid plugin found in ${sourceDir}: ${errors.map((e) => e.error).join(", ")}`
        );
      }
      discovered = plugins[0];
    }

    const { name, manifest } = discovered;

    // Must be already installed
    if (!pluginExists(name)) {
      throw new Error(`Plugin '${name}' is not installed — use install() instead`);
    }

    const existing = getPluginByName(name)!;

    // Source must be strictly newer
    if (compareSemver(manifest.version, existing.version) <= 0) {
      throw new Error(
        `Plugin '${name}' upgrade rejected: source version ${manifest.version} is not newer than installed ${existing.version}`
      );
    }

    log.info("manager.upgrading", { name, from: existing.version, to: manifest.version });

    // Deactivate if active before touching files
    if (existing.status === "active") {
      await this.deactivate(name);
    }

    // CRITICAL-3: Copy to staging dir first, validate manifest.main, then swap atomically.
    const destDir = join(this.pluginDir, name);
    const stagingDir = `${destDir}.staging-${randomUUID()}`;
    await mkdir(dirname(destDir), { recursive: true });
    await cp(discovered.pluginDir, stagingDir, { recursive: true });

    try {
      // CRITICAL-3: Validate manifest.main is within staging before we destroy old version.
      const entryPoint = join(stagingDir, manifest.main || "index.js");
      assertEntryPointWithinDest(stagingDir, entryPoint);

      // CRITICAL-2: Assert old install dir is within pluginDir before deleting it.
      assertWithinPluginDir(this.pluginDir, existing.pluginDir);

      // Only now remove old dir (after staging succeeded and was validated).
      try {
        await rm(existing.pluginDir, { recursive: true, force: true });
      } catch (err: any) {
        log.warn("manager.upgrade_dir_error", { name, error: err.message });
      }
      dbDeletePlugin(name);

      // Atomic rename staging → final dest
      await rename(stagingDir, destDir);
    } catch (err) {
      // Cleanup staging, leave old install intact.
      await rm(stagingDir, { recursive: true, force: true }).catch(() => {});
      throw err;
    }

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

    log.info("manager.upgraded", { name, version: manifest.version });

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

    // Path traversal guard: use realpath to resolve symlinks
    const entryPoint = join(row.pluginDir, manifest.main);
    let resolvedPluginDir: string;
    try {
      resolvedPluginDir = await realpath(row.pluginDir);
    } catch {
      throw new Error(`Plugin directory '${row.pluginDir}' does not exist`);
    }
    const resolvedEntry = await realpath(entryPoint).catch(() => null);
    if (
      !resolvedEntry ||
      (!resolvedEntry.startsWith(resolvedPluginDir + "/") && resolvedEntry !== resolvedPluginDir)
    ) {
      throw new Error(`Plugin '${name}' entry point escapes plugin directory`);
    }

    try {
      const loaded = await loadPlugin(entryPoint, manifest);

      // Register hooks individually via registerHook
      const hookNames = ["onRequest", "onResponse", "onError"] as const;
      for (const hookName of hookNames) {
        const handler = loaded.plugin[hookName];
        if (typeof handler === "function") {
          registerHook(hookName, name, handler as (payload: unknown) => void | Promise<void>);
        }
      }

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
      unregisterHooks(name);
      loaded.cleanup();
      this.loadedPlugins.delete(name);
    }

    updatePluginStatus(name, "inactive");
    log.info("manager.deactivated", { name });
  }

  /**
   * Uninstall a plugin — deactivate, delete directory (containment-checked), remove from DB.
   */
  async uninstall(name: string): Promise<void> {
    const row = getPluginByName(name);
    if (!row) throw new Error(`Plugin '${name}' not found`);

    // Deactivate first if active
    if (row.status === "active") {
      await this.deactivate(name);
    }

    // CRITICAL-2: Assert the pluginDir from DB is within our managed pluginDir root
    // before issuing a recursive delete. Prevents a tampered/legacy DB value from
    // causing deletion of an arbitrary path on the filesystem.
    assertWithinPluginDir(this.pluginDir, row.pluginDir);

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
