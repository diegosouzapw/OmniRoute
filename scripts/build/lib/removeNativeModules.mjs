/**
 * Pure helper: remove native modules from a node_modules directory.
 *
 * Used by prepare-electron-standalone.mjs to strip stale Node-ABI native
 * modules that Next.js output tracing copied and that would shadow the
 * correctly rebuilt Electron-ABI copies at runtime.
 *
 * Extracted as a pure, side-effect-free module so it can be unit-tested
 * without importing the full Electron build harness.
 *
 * @param {string} baseDir  - directory to scan (e.g. .../node_modules)
 * @param {string[]} [prefixes=["keytar"]] - directory name prefixes to remove
 */
import { existsSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

export function removeNativeModules(baseDir, prefixes = ["keytar"]) {
  if (!existsSync(baseDir)) return;
  const dirs = readdirSync(baseDir);
  for (const dir of dirs) {
    if (prefixes.some((p) => dir.startsWith(p))) {
      const fullPath = join(baseDir, dir);
      rmSync(fullPath, { recursive: true, force: true });
    }
  }
}
