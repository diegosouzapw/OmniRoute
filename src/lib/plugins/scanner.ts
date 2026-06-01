/**
 * Plugin scanner — discovers plugins from the filesystem.
 *
 * Scans ~/.omniroute/plugins/ for subdirectories containing plugin.json manifests.
 * Returns validated manifests with directory paths.
 *
 * @module plugins/scanner
 */

import { readdir, stat, readFile } from "fs/promises";
import { join } from "path";
import { logger } from "../../../open-sse/utils/logger.ts";
import { safeValidateManifest, type PluginManifestWithDefaults } from "./manifest";

const log = logger("PLUGIN_SCANNER");

export interface DiscoveredPlugin {
  name: string;
  manifest: PluginManifestWithDefaults;
  pluginDir: string;
  entryPoint: string;
}

/**
 * Get the default plugin directory: ~/.omniroute/plugins/
 */
export function getDefaultPluginDir(): string {
  const home = process.env.HOME || process.env.USERPROFILE || "/tmp";
  return join(home, ".omniroute", "plugins");
}

/**
 * Scan a directory for plugin subdirectories containing plugin.json.
 * Skips hidden directories (.xxx) and non-directories.
 */
export async function scanPluginDir(
  dir: string
): Promise<{ plugins: DiscoveredPlugin[]; errors: Array<{ name: string; error: string }> }> {
  const plugins: DiscoveredPlugin[] = [];
  const errors: Array<{ name: string; error: string }> = [];

  let entries: string[];
  try {
    const dirEntries = await readdir(dir, { withFileTypes: true });
    entries = dirEntries
      .filter((e) => e.isDirectory() && !e.name.startsWith("."))
      .map((e) => e.name);
  } catch (err: any) {
    if (err.code === "ENOENT") {
      log.info("scanner.dir_not_found", { dir });
      return { plugins: [], errors: [] };
    }
    throw err;
  }

  for (const entry of entries) {
    const pluginDir = join(dir, entry);
    const manifestPath = join(pluginDir, "plugin.json");

    try {
      const manifestStat = await stat(manifestPath);
      if (!manifestStat.isFile()) {
        errors.push({ name: entry, error: "plugin.json is not a file" });
        continue;
      }
    } catch {
      errors.push({ name: entry, error: "no plugin.json found" });
      continue;
    }

    try {
      const raw = await readFile(manifestPath, "utf-8");
      const parsed = JSON.parse(raw);
      const result = safeValidateManifest(parsed);

      if (!result.success) {
        const failResult = result as { success: false; errors: string[] };
        errors.push({ name: entry, error: `invalid manifest: ${failResult.errors.join("; ")}` });
        continue;
      }

      const manifest = result.data;
      const entryPoint = join(pluginDir, manifest.main);

      // Verify entry point exists
      try {
        await stat(entryPoint);
      } catch {
        errors.push({
          name: entry,
          error: `entry point not found: ${manifest.main}`,
        });
        continue;
      }

      plugins.push({
        name: manifest.name,
        manifest,
        pluginDir,
        entryPoint,
      });

      log.info("scanner.discovered", { name: manifest.name, version: manifest.version });
    } catch (err: any) {
      errors.push({ name: entry, error: `failed to read manifest: ${err.message}` });
    }
  }

  return { plugins, errors };
}
