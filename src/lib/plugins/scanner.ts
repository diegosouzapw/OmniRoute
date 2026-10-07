/**
 * Plugin scanner — discovers plugins from the filesystem.
 *
 * Scans the plugin directory (`OMNIROUTE_PLUGINS_DIR`, else ~/.omniroute/plugins/) for
 * subdirectories containing plugin.json manifests.
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
 * Resolve the plugin scan directory, in order:
 *
 *  1. `OMNIROUTE_PLUGINS_DIR` — explicit override, used verbatim. Point it at the
 *     bind-mounted directory in Docker/K8s so discovery stops depending on `HOME`.
 *  2. `<HOME|USERPROFILE>/.omniroute/plugins` — the historical default.
 *  3. `/tmp/.omniroute/plugins` — last-resort fallback for a process with no home
 *     (an image that never exports `HOME`); the silent failure mode of #11827.
 *
 * A blank or whitespace-only override counts as unset, so an empty `- OMNIROUTE_PLUGINS_DIR=`
 * in a compose file cannot send the scanner to a nameless path.
 *
 * This is also the root `PluginManager` installs into, so an override moves discovery
 * and installation together. Not to be confused with `OMNIROUTE_PLUGIN_PATH`, which is
 * read only by the CLI command-plugin loader (`bin/cli/plugins.mjs`, `omniroute-cmd-*`
 * packages) and has no effect on this runtime scanner.
 *
 * Called once per process, by the `PluginManager` singleton constructor — hence the
 * startup log line: a misconfigured deployment says which input won instead of silently
 * scanning the wrong directory.
 */
export function getDefaultPluginDir(): string {
  const override = process.env.OMNIROUTE_PLUGINS_DIR?.trim();
  if (override) {
    log.info("scanner.dir_resolved", { dir: override, source: "OMNIROUTE_PLUGINS_DIR" });
    return override;
  }

  const home = process.env.HOME || process.env.USERPROFILE;
  const dir = join(home || "/tmp", ".omniroute", "plugins");
  log.info("scanner.dir_resolved", { dir, source: home ? "home" : "no-home-fallback" });
  return dir;
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
